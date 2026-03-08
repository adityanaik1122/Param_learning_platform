# Phase 3: Advanced Systems - Professional Polish

## Overview

Phase 3 covers the architecture and systems required for a polished, production-ready game. You'll learn event-driven programming, AI systems, architectural patterns, and optimization techniques used in professional game development.

**Learning Objectives:**
- Implement event-driven architecture for decoupled systems
- Build AI with NavMesh and Finite State Machines
- Use design patterns (Singleton, Observer, Object Pool)
- Implement save/load systems with data persistence
- Optimize performance and visual quality

**Time Estimate:** 4-5 weeks

---

## Module 1: Event-Driven Programming

### The Problem with Tight Coupling

```csharp
// ❌ BAD: Tight coupling - Enemy directly references UI
public class Enemy : MonoBehaviour
{
    private UIManager uiManager;
    
    private void Start()
    {
        uiManager = FindObjectOfType<UIManager>();
    }
    
    private void Die()
    {
        uiManager.UpdateScore(100);  // Enemy knows about UI!
        Destroy(gameObject);
    }
}
```

**Problems:**
- Enemy depends on UIManager existing
- Can't test Enemy without UI
- Hard to add new systems that react to enemy death
- Breaks Single Responsibility Principle

### Solution: Event System

```csharp
using System;
using UnityEngine;

// Event arguments for passing data
public class EnemyDeathEventArgs : EventArgs
{
    public int ScoreValue { get; set; }
    public Vector3 Position { get; set; }
    public GameObject Enemy { get; set; }
}

// Centralized event manager
public class GameEvents : MonoBehaviour
{
    // Singleton instance
    public static GameEvents Instance { get; private set; }
    
    private void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }
        else
        {
            Destroy(gameObject);
        }
    }
    
    // Define events
    public event EventHandler<EnemyDeathEventArgs> OnEnemyDeath;
    public event EventHandler OnPlayerDeath;
    public event EventHandler<int> OnScoreChanged;
    public event EventHandler<string> OnLevelComplete;
    
    // Methods to trigger events
    public void EnemyDied(GameObject enemy, int scoreValue, Vector3 position)
    {
        OnEnemyDeath?.Invoke(this, new EnemyDeathEventArgs
        {
            Enemy = enemy,
            ScoreValue = scoreValue,
            Position = position
        });
    }
    
    public void PlayerDied()
    {
        OnPlayerDeath?.Invoke(this, EventArgs.Empty);
    }
    
    public void ScoreChanged(int newScore)
    {
        OnScoreChanged?.Invoke(this, newScore);
    }
    
    public void LevelComplete(string levelName)
    {
        OnLevelComplete?.Invoke(this, levelName);
    }
}
```

### Using the Event System

```csharp
// Publisher: Enemy posts events
public class Enemy : MonoBehaviour
{
    [SerializeField] private int scoreValue = 100;
    
    private void Die()
    {
        // Post event - Enemy doesn't know who's listening!
        GameEvents.Instance.EnemyDied(gameObject, scoreValue, transform.position);
        Destroy(gameObject);
    }
}

// Listener: UI subscribes to events
public class UIManager : MonoBehaviour
{
    private int currentScore = 0;
    
    private void OnEnable()
    {
        // Subscribe to events
        GameEvents.Instance.OnEnemyDeath += HandleEnemyDeath;
        GameEvents.Instance.OnScoreChanged += HandleScoreChanged;
    }
    
    private void OnDisable()
    {
        // CRITICAL: Unsubscribe to prevent memory leaks!
        GameEvents.Instance.OnEnemyDeath -= HandleEnemyDeath;
        GameEvents.Instance.OnScoreChanged -= HandleScoreChanged;
    }
    
    private void HandleEnemyDeath(object sender, EnemyDeathEventArgs e)
    {
        currentScore += e.ScoreValue;
        GameEvents.Instance.ScoreChanged(currentScore);
    }
    
    private void HandleScoreChanged(object sender, int newScore)
    {
        UpdateScoreDisplay(newScore);
    }
    
    private void UpdateScoreDisplay(int score)
    {
        // Update UI
    }
}

// Another listener: VFX system also reacts to enemy death
public class VFXManager : MonoBehaviour
{
    [SerializeField] private GameObject explosionPrefab;
    
    private void OnEnable()
    {
        GameEvents.Instance.OnEnemyDeath += HandleEnemyDeath;
    }
    
    private void OnDisable()
    {
        GameEvents.Instance.OnEnemyDeath -= HandleEnemyDeath;
    }
    
    private void HandleEnemyDeath(object sender, EnemyDeathEventArgs e)
    {
        // Spawn explosion at enemy position
        Instantiate(explosionPrefab, e.Position, Quaternion.identity);
    }
}
```

### Unity's SendMessage Alternative

```csharp
// SendMessage: Call method by name (slower, no compile-time checking)
public class MessageExample : MonoBehaviour
{
    private void TriggerDamage()
    {
        // Calls TakeDamage on this GameObject and all children
        BroadcastMessage("TakeDamage", 10f, SendMessageOptions.DontRequireReceiver);
        
        // Calls TakeDamage only on this GameObject
        SendMessage("TakeDamage", 10f, SendMessageOptions.DontRequireReceiver);
        
        // Calls TakeDamage on parent GameObjects
        SendMessageUpwards("TakeDamage", 10f, SendMessageOptions.DontRequireReceiver);
    }
    
    // This method will be called by SendMessage
    private void TakeDamage(float amount)
    {
        Debug.Log($"Took {amount} damage");
    }
}
```

**SendMessage vs Events:**

| Feature | SendMessage | Events |
|---------|-------------|--------|
| Performance | Slower (reflection) | Faster |
| Type safety | No (string-based) | Yes |
| Compile-time checking | No | Yes |
| Scope | GameObject hierarchy | Global |
| Use case | Quick prototypes | Production code |

---

## Module 2: AI & Navigation

### NavMesh Basics

NavMesh (Navigation Mesh) defines walkable areas for AI agents.

#### Setting Up NavMesh

1. **Bake NavMesh:**
   - Window → AI → Navigation
   - Select environment objects → Mark as "Navigation Static"
   - Bake tab → Adjust Agent Radius/Height → Bake

2. **Add NavMeshAgent:**

```csharp
using UnityEngine;
using UnityEngine.AI;

[RequireComponent(typeof(NavMeshAgent))]
public class AIMovement : MonoBehaviour
{
    private NavMeshAgent agent;
    [SerializeField] private Transform target;
    
    private void Awake()
    {
        agent = GetComponent<NavMeshAgent>();
        
        // Configure agent
        agent.speed = 3.5f;
        agent.acceleration = 8f;
        agent.angularSpeed = 120f;
        agent.stoppingDistance = 2f;
        agent.autoBraking = true;
    }
    
    private void Update()
    {
        if (target != null)
        {
            agent.SetDestination(target.position);
        }
    }
    
    // Check if agent reached destination
    private bool HasReachedDestination()
    {
        if (!agent.pathPending)
        {
            if (agent.remainingDistance <= agent.stoppingDistance)
            {
                if (!agent.hasPath || agent.velocity.sqrMagnitude == 0f)
                {
                    return true;
                }
            }
        }
        return false;
    }
}
```

### Finite State Machine (FSM)

FSM manages AI behavior by transitioning between discrete states.

```csharp
using UnityEngine;
using UnityEngine.AI;

public class EnemyAI : MonoBehaviour
{
    // State enum
    private enum State
    {
        Patrol,
        Chase,
        Attack,
        Dead
    }
    
    [Header("References")]
    [SerializeField] private Transform player;
    [SerializeField] private NavMeshAgent agent;
    
    [Header("Patrol")]
    [SerializeField] private Transform[] patrolPoints;
    [SerializeField] private float patrolWaitTime = 2f;
    
    [Header("Detection")]
    [SerializeField] private float detectionRange = 10f;
    [SerializeField] private float loseTargetRange = 15f;
    
    [Header("Attack")]
    [SerializeField] private float attackRange = 2f;
    [SerializeField] private float attackCooldown = 1f;
    [SerializeField] private int attackDamage = 10;
    
    private State currentState = State.Patrol;
    private int currentPatrolIndex = 0;
    private float patrolTimer = 0f;
    private float attackTimer = 0f;
    
    private void Update()
    {
        // State machine logic
        switch (currentState)
        {
            case State.Patrol:
                PatrolBehavior();
                CheckForPlayer();
                break;
                
            case State.Chase:
                ChaseBehavior();
                CheckAttackRange();
                CheckLostPlayer();
                break;
                
            case State.Attack:
                AttackBehavior();
                CheckLostPlayer();
                break;
                
            case State.Dead:
                // Do nothing
                break;
        }
    }
    
    #region Patrol State
    private void PatrolBehavior()
    {
        if (patrolPoints.Length == 0) return;
        
        // Move to current patrol point
        agent.SetDestination(patrolPoints[currentPatrolIndex].position);
        
        // Check if reached patrol point
        if (!agent.pathPending && agent.remainingDistance < 0.5f)
        {
            patrolTimer += Time.deltaTime;
            
            if (patrolTimer >= patrolWaitTime)
            {
                // Move to next patrol point
                currentPatrolIndex = (currentPatrolIndex + 1) % patrolPoints.Length;
                patrolTimer = 0f;
            }
        }
    }
    
    private void CheckForPlayer()
    {
        float distanceToPlayer = Vector3.Distance(transform.position, player.position);
        
        if (distanceToPlayer <= detectionRange)
        {
            // Check line of sight
            if (HasLineOfSight(player.position))
            {
                TransitionToState(State.Chase);
            }
        }
    }
    #endregion
    
    #region Chase State
    private void ChaseBehavior()
    {
        agent.SetDestination(player.position);
    }
    
    private void CheckAttackRange()
    {
        float distanceToPlayer = Vector3.Distance(transform.position, player.position);
        
        if (distanceToPlayer <= attackRange)
        {
            TransitionToState(State.Attack);
        }
    }
    
    private void CheckLostPlayer()
    {
        float distanceToPlayer = Vector3.Distance(transform.position, player.position);
        
        if (distanceToPlayer > loseTargetRange || !HasLineOfSight(player.position))
        {
            TransitionToState(State.Patrol);
        }
    }
    #endregion
    
    #region Attack State
    private void AttackBehavior()
    {
        // Stop moving
        agent.SetDestination(transform.position);
        
        // Face player
        Vector3 direction = (player.position - transform.position).normalized;
        Quaternion lookRotation = Quaternion.LookRotation(new Vector3(direction.x, 0f, direction.z));
        transform.rotation = Quaternion.Slerp(transform.rotation, lookRotation, Time.deltaTime * 5f);
        
        // Attack on cooldown
        attackTimer += Time.deltaTime;
        if (attackTimer >= attackCooldown)
        {
            PerformAttack();
            attackTimer = 0f;
        }
        
        // Check if player moved out of range
        float distanceToPlayer = Vector3.Distance(transform.position, player.position);
        if (distanceToPlayer > attackRange)
        {
            TransitionToState(State.Chase);
        }
    }
    
    private void PerformAttack()
    {
        Debug.Log("Enemy attacks!");
        
        // Deal damage to player
        Health playerHealth = player.GetComponent<Health>();
        if (playerHealth != null)
        {
            playerHealth.TakeDamage(attackDamage);
        }
        
        // Trigger attack animation
        // animator.SetTrigger("Attack");
    }
    #endregion
    
    #region Utility
    private bool HasLineOfSight(Vector3 targetPosition)
    {
        Vector3 direction = targetPosition - transform.position;
        
        if (Physics.Raycast(transform.position, direction, out RaycastHit hit, detectionRange))
        {
            return hit.transform == player;
        }
        
        return false;
    }
    
    private void TransitionToState(State newState)
    {
        // Exit current state
        OnStateExit(currentState);
        
        // Enter new state
        currentState = newState;
        OnStateEnter(newState);
    }
    
    private void OnStateEnter(State state)
    {
        switch (state)
        {
            case State.Patrol:
                agent.speed = 2f;
                break;
            case State.Chase:
                agent.speed = 4f;
                break;
            case State.Attack:
                agent.speed = 0f;
                break;
        }
    }
    
    private void OnStateExit(State state)
    {
        // Cleanup when leaving state
    }
    
    public void Die()
    {
        TransitionToState(State.Dead);
        agent.enabled = false;
        // Play death animation, disable colliders, etc.
    }
    #endregion
    
    // Visualize detection range in editor
    private void OnDrawGizmosSelected()
    {
        Gizmos.color = Color.yellow;
        Gizmos.DrawWireSphere(transform.position, detectionRange);
        
        Gizmos.color = Color.red;
        Gizmos.DrawWireSphere(transform.position, attackRange);
    }
}
```

---

## Module 3: System Architecture

### Singleton Pattern

Ensures only one instance of a class exists globally.

```csharp
using UnityEngine;

public class GameManager : MonoBehaviour
{
    // Singleton instance
    public static GameManager Instance { get; private set; }
    
    // Game state
    public enum GameState { Menu, Playing, Paused, GameOver }
    public GameState CurrentState { get; private set; } = GameState.Menu;
    
    // Game data
    public int Score { get; private set; } = 0;
    public int Lives { get; private set; } = 3;
    public float GameTime { get; private set; } = 0f;
    
    private void Awake()
    {
        // Singleton pattern
        if (Instance == null)
        {
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }
        else
        {
            Destroy(gameObject);
            return;
        }
        
        Initialize();
    }
    
    private void Initialize()
    {
        // Initialize game systems
        Application.targetFrameRate = 60;
        QualitySettings.vSyncCount = 1;
    }
    
    private void Update()
    {
        if (CurrentState == GameState.Playing)
        {
            GameTime += Time.deltaTime;
        }
    }
    
    #region State Management
    public void StartGame()
    {
        CurrentState = GameState.Playing;
        Score = 0;
        Lives = 3;
        GameTime = 0f;
        
        GameEvents.Instance?.ScoreChanged(Score);
    }
    
    public void PauseGame()
    {
        if (CurrentState == GameState.Playing)
        {
            CurrentState = GameState.Paused;
            Time.timeScale = 0f;
        }
    }
    
    public void ResumeGame()
    {
        if (CurrentState == GameState.Paused)
        {
            CurrentState = GameState.Playing;
            Time.timeScale = 1f;
        }
    }
    
    public void GameOver()
    {
        CurrentState = GameState.GameOver;
        SaveHighScore();
    }
    #endregion
    
    #region Score Management
    public void AddScore(int points)
    {
        Score += points;
        GameEvents.Instance?.ScoreChanged(Score);
    }
    
    public void LoseLife()
    {
        Lives--;
        
        if (Lives <= 0)
        {
            GameOver();
        }
    }
    #endregion
    
    #region Persistence
    private void SaveHighScore()
    {
        int highScore = PlayerPrefs.GetInt("HighScore", 0);
        
        if (Score > highScore)
        {
            PlayerPrefs.SetInt("HighScore", Score);
            PlayerPrefs.Save();
        }
    }
    
    public int GetHighScore()
    {
        return PlayerPrefs.GetInt("HighScore", 0);
    }
    #endregion
}
```

### Object Pool Pattern

Reuse objects instead of constantly creating/destroying them.

```csharp
using System.Collections.Generic;
using UnityEngine;

public class ObjectPool : MonoBehaviour
{
    [System.Serializable]
    public class Pool
    {
        public string tag;
        public GameObject prefab;
        public int size;
    }
    
    public static ObjectPool Instance { get; private set; }
    
    [SerializeField] private List<Pool> pools;
    private Dictionary<string, Queue<GameObject>> poolDictionary;
    
    private void Awake()
    {
        Instance = this;
        InitializePools();
    }
    
    private void InitializePools()
    {
        poolDictionary = new Dictionary<string, Queue<GameObject>>();
        
        foreach (Pool pool in pools)
        {
            Queue<GameObject> objectPool = new Queue<GameObject>();
            
            for (int i = 0; i < pool.size; i++)
            {
                GameObject obj = Instantiate(pool.prefab);
                obj.SetActive(false);
                obj.transform.SetParent(transform);
                objectPool.Enqueue(obj);
            }
            
            poolDictionary.Add(pool.tag, objectPool);
        }
    }
    
    public GameObject SpawnFromPool(string tag, Vector3 position, Quaternion rotation)
    {
        if (!poolDictionary.ContainsKey(tag))
        {
            Debug.LogWarning($"Pool with tag {tag} doesn't exist");
            return null;
        }
        
        GameObject objectToSpawn = poolDictionary[tag].Dequeue();
        
        objectToSpawn.SetActive(true);
        objectToSpawn.transform.position = position;
        objectToSpawn.transform.rotation = rotation;
        
        // Call OnObjectSpawn on all IPooledObject components
        IPooledObject[] pooledObjects = objectToSpawn.GetComponents<IPooledObject>();
        foreach (IPooledObject pooledObject in pooledObjects)
        {
            pooledObject.OnObjectSpawn();
        }
        
        poolDictionary[tag].Enqueue(objectToSpawn);
        
        return objectToSpawn;
    }
    
    public void ReturnToPool(GameObject obj)
    {
        obj.SetActive(false);
    }
}

// Interface for pooled objects
public interface IPooledObject
{
    void OnObjectSpawn();
}

// Example pooled object
public class Projectile : MonoBehaviour, IPooledObject
{
    [SerializeField] private float speed = 10f;
    [SerializeField] private float lifetime = 3f;
    
    private float timer = 0f;
    
    public void OnObjectSpawn()
    {
        timer = 0f;
    }
    
    private void Update()
    {
        transform.Translate(Vector3.forward * speed * Time.deltaTime);
        
        timer += Time.deltaTime;
        if (timer >= lifetime)
        {
            ObjectPool.Instance.ReturnToPool(gameObject);
        }
    }
    
    private void OnCollisionEnter(Collision collision)
    {
        // Handle collision
        ObjectPool.Instance.ReturnToPool(gameObject);
    }
}
```

### Save/Load System with XML

```csharp
using System.IO;
using System.Xml.Serialization;
using UnityEngine;

[System.Serializable]
public class GameData
{
    public int highScore;
    public int level;
    public float[] playerPosition;
    public string lastPlayedDate;
    
    public GameData()
    {
        highScore = 0;
        level = 1;
        playerPosition = new float[3];
        lastPlayedDate = System.DateTime.Now.ToString();
    }
}

public class SaveSystem : MonoBehaviour
{
    private static string SavePath => Path.Combine(Application.persistentDataPath, "savegame.xml");
    
    public static void SaveGame(GameData data)
    {
        try
        {
            XmlSerializer serializer = new XmlSerializer(typeof(GameData));
            
            using (FileStream stream = new FileStream(SavePath, FileMode.Create))
            {
                serializer.Serialize(stream, data);
            }
            
            Debug.Log($"Game saved to {SavePath}");
        }
        catch (System.Exception e)
        {
            Debug.LogError($"Failed to save game: {e.Message}");
        }
    }
    
    public static GameData LoadGame()
    {
        if (!File.Exists(SavePath))
        {
            Debug.Log("No save file found, creating new game data");
            return new GameData();
        }
        
        try
        {
            XmlSerializer serializer = new XmlSerializer(typeof(GameData));
            
            using (FileStream stream = new FileStream(SavePath, FileMode.Open))
            {
                GameData data = serializer.Deserialize(stream) as GameData;
                Debug.Log("Game loaded successfully");
                return data;
            }
        }
        catch (System.Exception e)
        {
            Debug.LogError($"Failed to load game: {e.Message}");
            return new GameData();
        }
    }
    
    public static void DeleteSave()
    {
        if (File.Exists(SavePath))
        {
            File.Delete(SavePath);
            Debug.Log("Save file deleted");
        }
    }
}

// Usage example
public class SaveLoadExample : MonoBehaviour
{
    private void SaveCurrentGame()
    {
        GameData data = new GameData
        {
            highScore = GameManager.Instance.Score,
            level = 5,
            playerPosition = new float[] 
            { 
                transform.position.x, 
                transform.position.y, 
                transform.position.z 
            },
            lastPlayedDate = System.DateTime.Now.ToString()
        };
        
        SaveSystem.SaveGame(data);
    }
    
    private void LoadSavedGame()
    {
        GameData data = SaveSystem.LoadGame();
        
        // Restore game state
        GameManager.Instance.AddScore(data.highScore);
        transform.position = new Vector3(
            data.playerPosition[0],
            data.playerPosition[1],
            data.playerPosition[2]
        );
        
        Debug.Log($"Last played: {data.lastPlayedDate}");
    }
}
```

---

## Module 4: Visual Polish & Optimization

### Lightmapping

Bake lighting into textures for realistic shadows without performance cost.

**Setup:**
1. Mark static objects as "Lightmap Static"
2. Window → Rendering → Lighting
3. Configure lightmap settings:
   - Lightmap Resolution: 40 (higher = better quality, larger file size)
   - Lightmap Padding: 2
   - Compress Lightmaps: Yes
4. Click "Generate Lighting"

**Benefits:**
- Realistic indirect lighting (light bounces)
- Soft shadows
- No runtime performance cost
- Smaller than real-time shadows

**Limitations:**
- Only works for static objects
- Long bake times for complex scenes
- Large file sizes for high-resolution lightmaps

### Performance Optimization

```csharp
using UnityEngine;

public class PerformanceMonitor : MonoBehaviour
{
    [SerializeField] private bool showStats = true;
    
    private float deltaTime = 0f;
    private int frameCount = 0;
    private float fps = 0f;
    private float updateInterval = 0.5f;
    private float timeSinceUpdate = 0f;
    
    private void Update()
    {
        // Calculate FPS
        deltaTime += (Time.unscaledDeltaTime - deltaTime) * 0.1f;
        frameCount++;
        timeSinceUpdate += Time.unscaledDeltaTime;
        
        if (timeSinceUpdate >= updateInterval)
        {
            fps = frameCount / timeSinceUpdate;
            frameCount = 0;
            timeSinceUpdate = 0f;
        }
    }
    
    private void OnGUI()
    {
        if (!showStats) return;
        
        int w = Screen.width, h = Screen.height;
        GUIStyle style = new GUIStyle();
        
        Rect rect = new Rect(0, 0, w, h * 2 / 100);
        style.alignment = TextAnchor.UpperLeft;
        style.fontSize = h * 2 / 100;
        style.normal.textColor = fps < 30 ? Color.red : fps < 50 ? Color.yellow : Color.green;
        
        float msec = deltaTime * 1000.0f;
        string text = string.Format("{0:0.0} ms ({1:0.} fps)", msec, fps);
        
        GUI.Label(rect, text, style);
    }
}
```

**Optimization Checklist:**

✅ **CPU Optimization:**
- Cache GetComponent calls in Awake/Start
- Use object pooling for frequently spawned objects
- Avoid Find/FindObjectOfType in Update
- Use FixedUpdate only for physics
- Minimize allocations in Update (no `new`, string concatenation)

✅ **GPU Optimization:**
- Use texture atlases to reduce draw calls
- Enable GPU Instancing on materials
- Use LOD (Level of Detail) for distant objects
- Bake lighting for static objects
- Optimize shader complexity

✅ **Memory Optimization:**
- Compress textures appropriately
- Use texture streaming for large textures
- Unload unused assets with Resources.UnloadUnusedAssets()
- Profile memory with Unity Profiler

---

## Best Practices

### Architecture Principles

1. **Single Responsibility** - Each class does one thing well
2. **Dependency Injection** - Pass dependencies, don't find them
3. **Event-Driven** - Decouple systems with events
4. **Data-Driven** - Separate data from logic (ScriptableObjects)
5. **Testable** - Write code that can be unit tested

### Code Organization

```
Assets/
├── Scripts/
│   ├── Core/           # GameManager, SaveSystem, etc.
│   ├── Player/         # Player-specific scripts
│   ├── Enemies/        # Enemy AI and behaviors
│   ├── UI/             # UI controllers
│   ├── Utilities/      # Helper classes, extensions
│   └── Data/           # ScriptableObjects
├── Prefabs/
├── Scenes/
├── Materials/
├── Textures/
└── Audio/
```

### Performance Testing

Use Unity Profiler (Window → Analysis → Profiler):
- **CPU Usage** - Identify expensive scripts
- **Rendering** - Check draw calls, batches
- **Memory** - Find memory leaks
- **Physics** - Optimize collision checks
- **Audio** - Monitor audio performance

**Target Metrics:**
- 60 FPS minimum (16.6ms per frame)
- < 100 draw calls for mobile
- < 500 draw calls for desktop
- < 500MB memory for mobile
- < 2GB memory for desktop

---

## Exercises

### Exercise 1: Event System
Build a complete event-driven game:
- GameEvents manager with 5+ events
- 3+ systems listening to events (UI, Audio, VFX)
- No direct references between systems
- Document event flow diagram

### Exercise 2: AI State Machine
Create an enemy with 4-state FSM:
- Patrol with waypoints
- Chase with NavMesh
- Attack with cooldown
- Flee when low health
- Visualize state transitions in Inspector

### Exercise 3: Save System
Implement complete save/load:
- Save player position, score, inventory
- Load on game start
- Handle corrupted save files
- Support multiple save slots

### Exercise 4: Optimization
Optimize a provided scene:
- Profile and identify bottlenecks
- Implement object pooling
- Reduce draw calls by 50%
- Achieve 60 FPS on target hardware
- Document before/after metrics

---

## Resources

- [Unity Events Documentation](https://docs.unity3d.com/Manual/UnityEvents.html)
- [NavMesh and Pathfinding](https://docs.unity3d.com/Manual/nav-NavigationSystem.html)
- [Design Patterns in Unity](https://github.com/QianMo/Unity-Design-Pattern)
- [Unity Optimization Guide](https://docs.unity3d.com/Manual/OptimizingGraphicsPerformance.html)
- [Profiler Manual](https://docs.unity3d.com/Manual/Profiler.html)

---

**Previous:** [Phase 2: Core Mechanics](Phase2_Core_Mechanics.md)
**Next:** Apply these systems to your capstone project!
