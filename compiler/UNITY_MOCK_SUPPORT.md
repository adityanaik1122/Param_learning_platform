# Unity C# Mock Support

## Overview

The compiler now includes **Unity mock classes** that allow students to write Unity-style C# code and execute it for learning purposes. This enables practicing Unity syntax and concepts without requiring a full Unity installation.

## What's Included

### Mock Classes

The following Unity classes are mocked:

#### Core Classes
- `MonoBehaviour` - Base class for Unity scripts
- `GameObject` - Represents game objects
- `Transform` - Position, rotation, and scale
- `Debug` - Logging functionality
- `Time` - Time-related properties
- `Input` - Input handling (keyboard, mouse)

#### Math Classes
- `Vector3` - 3D vectors with operators
- `Vector2` - 2D vectors
- `Quaternion` - Rotations

#### Physics Classes
- `Rigidbody` - Physics body
- `Collider` - Collision detection

#### Attributes
- `[SerializeField]` - Expose private fields in Inspector
- `[RequireComponent]` - Component dependencies

### Lifecycle Simulation

When you write a MonoBehaviour class, the compiler automatically simulates Unity's lifecycle:

1. `Awake()` - Called when script instance is loaded
2. `OnEnable()` - Called when object becomes enabled
3. `Start()` - Called before first frame update
4. `Update()` - Called once per frame
5. `FixedUpdate()` - Called at fixed time intervals
6. `LateUpdate()` - Called after all Update functions

## Usage Examples

### Example 1: Basic MonoBehaviour

```csharp
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    [SerializeField] private float speed = 5f;
    private Vector3 position;
    
    private void Start()
    {
        Debug.Log("Player initialized!");
        position = Vector3.zero;
    }
    
    private void Update()
    {
        Debug.Log($"Player position: {position}");
        position += Vector3.forward * speed * Time.deltaTime;
    }
}
```

**Output:**
```
[Unity Mock] Starting Unity simulation...

[Unity Mock] GameObject 'GameObject' created
[Unity Mock] === Simulating Unity Lifecycle for PlayerController ===
[Unity Debug] Player initialized!
[Unity Debug] Player position: (0, 0, 0)
[Unity Mock] === Lifecycle Complete ===

[Unity Mock] Unity simulation complete.
```

### Example 2: Multiple Components

```csharp
using UnityEngine;

public class Enemy : MonoBehaviour
{
    [SerializeField] private float health = 100f;
    [SerializeField] private float damage = 10f;
    
    private void Awake()
    {
        Debug.Log("Enemy spawned!");
    }
    
    private void Start()
    {
        Debug.Log($"Enemy health: {health}");
    }
    
    public void TakeDamage(float amount)
    {
        health -= amount;
        Debug.Log($"Enemy took {amount} damage. Health: {health}");
        
        if (health <= 0)
        {
            Die();
        }
    }
    
    private void Die()
    {
        Debug.LogWarning("Enemy died!");
    }
}

public class GameManager : MonoBehaviour
{
    private void Start()
    {
        Debug.Log("Game started!");
        
        // Simulate enemy taking damage
        var enemy = new Enemy();
        enemy.SimulateLifecycle();
        enemy.TakeDamage(30f);
        enemy.TakeDamage(80f);
    }
}
```

### Example 3: Vector Math

```csharp
using UnityEngine;

public class VectorExample : MonoBehaviour
{
    private void Start()
    {
        Vector3 playerPos = new Vector3(1, 0, 1);
        Vector3 enemyPos = new Vector3(5, 0, 5);
        
        Debug.Log($"Player: {playerPos}");
        Debug.Log($"Enemy: {enemyPos}");
        
        Vector3 direction = enemyPos - playerPos;
        Debug.Log($"Direction: {direction}");
        
        // Vector operations
        Vector3 forward = Vector3.forward * 2;
        Debug.Log($"Forward * 2: {forward}");
        
        Vector3 sum = Vector3.one + Vector3.up;
        Debug.Log($"One + Up: {sum}");
    }
}
```

### Example 4: Input Handling

```csharp
using UnityEngine;

public class InputController : MonoBehaviour
{
    private Vector3 position = Vector3.zero;
    
    private void Update()
    {
        float horizontal = Input.GetAxis("Horizontal");
        float vertical = Input.GetAxis("Vertical");
        
        if (Input.GetKeyDown(KeyCode.Space))
        {
            Debug.Log("Jump!");
        }
        
        position += new Vector3(horizontal, 0, vertical) * Time.deltaTime;
        Debug.Log($"Position: {position}");
    }
}
```

### Example 5: Physics

```csharp
using UnityEngine;

[RequireComponent(typeof(Rigidbody))]
public class PhysicsObject : MonoBehaviour
{
    private Rigidbody rb;
    
    private void Awake()
    {
        rb = GetComponent<Rigidbody>();
        rb.mass = 2f;
        rb.useGravity = true;
    }
    
    private void Start()
    {
        Debug.Log($"Rigidbody mass: {rb.mass}");
        Debug.Log($"Using gravity: {rb.useGravity}");
    }
    
    private void FixedUpdate()
    {
        // Apply force
        rb.AddForce(Vector3.up * 10f);
        Debug.Log($"Velocity: {rb.velocity}");
    }
}
```

## Limitations

### What Works ✅
- Basic Unity syntax and structure
- MonoBehaviour lifecycle methods
- Vector math operations
- Debug logging
- SerializeField attributes
- Component references (mocked)

### What Doesn't Work ❌
- Actual rendering (no visual output)
- Real physics simulation (just logs)
- Coroutines
- Unity Editor features
- Asset loading
- Scene management
- Actual input detection (returns mock values)
- Networking
- Audio

## Educational Purpose

These mocks are designed for **learning Unity C# syntax and concepts**, not for actual game development. Students should:

1. ✅ Use this to practice Unity code structure
2. ✅ Learn MonoBehaviour lifecycle
3. ✅ Understand component-based architecture
4. ✅ Practice vector math
5. ❌ Don't expect actual game functionality
6. ❌ Don't use for production code

## API Reference

### Debug Class

```csharp
Debug.Log(object message)        // Normal log
Debug.LogWarning(object message) // Warning log
Debug.LogError(object message)   // Error log
```

### Vector3 Struct

```csharp
// Constructors
new Vector3(float x, float y, float z)

// Static properties
Vector3.zero      // (0, 0, 0)
Vector3.one       // (1, 1, 1)
Vector3.up        // (0, 1, 0)
Vector3.down      // (0, -1, 0)
Vector3.left      // (-1, 0, 0)
Vector3.right     // (1, 0, 0)
Vector3.forward   // (0, 0, 1)
Vector3.back      // (0, 0, -1)

// Operators
Vector3 + Vector3
Vector3 - Vector3
Vector3 * float
Vector3 / float
```

### MonoBehaviour Lifecycle

```csharp
protected virtual void Awake()       // Initialization
protected virtual void Start()       // Before first frame
protected virtual void Update()      // Every frame
protected virtual void FixedUpdate() // Fixed time step
protected virtual void LateUpdate()  // After Update
protected virtual void OnEnable()    // When enabled
protected virtual void OnDisable()   // When disabled
protected virtual void OnDestroy()   // When destroyed
```

### GameObject Class

```csharp
new GameObject(string name)
T GetComponent<T>()
T AddComponent<T>()
```

### Transform Class

```csharp
Vector3 position
Quaternion rotation
Vector3 localScale

void Translate(Vector3 translation)
void Rotate(Vector3 eulers)
```

### Time Class

```csharp
float Time.time              // Current time
float Time.deltaTime         // Time since last frame (~0.016s)
float Time.timeSinceLevelLoad // Time since level loaded
```

### Input Class

```csharp
bool GetKey(KeyCode key)
bool GetKeyDown(KeyCode key)
float GetAxis(string axisName)
```

## Testing Your Code

### Quick Test

```csharp
using UnityEngine;

public class TestScript : MonoBehaviour
{
    private void Start()
    {
        Debug.Log("Hello from Unity!");
    }
}
```

Expected output:
```
[Unity Mock] Starting Unity simulation...
[Unity Mock] GameObject 'GameObject' created
[Unity Mock] === Simulating Unity Lifecycle for TestScript ===
[Unity Debug] Hello from Unity!
[Unity Mock] === Lifecycle Complete ===
[Unity Mock] Unity simulation complete.
```

## Troubleshooting

### Issue: "Type or namespace 'UnityEngine' could not be found"

**Solution:** The compiler automatically detects Unity code. Make sure you're using `using UnityEngine;` at the top of your file.

### Issue: "No output shown"

**Solution:** Make sure your MonoBehaviour class has lifecycle methods (Start, Update, etc.) that call Debug.Log().

### Issue: "Method not found"

**Solution:** Check the API reference above. Not all Unity methods are mocked - only the most common ones for learning.

## Comparison: Mock vs Real Unity

| Feature | Mock (Compiler) | Real Unity |
|---------|----------------|------------|
| Syntax learning | ✅ Perfect | ✅ Perfect |
| Lifecycle understanding | ✅ Good | ✅ Perfect |
| Visual output | ❌ No | ✅ Yes |
| Physics simulation | ❌ Logged only | ✅ Real |
| Performance testing | ❌ No | ✅ Yes |
| Asset management | ❌ No | ✅ Yes |
| Deployment | ❌ No | ✅ Yes |

## Best Practices

1. **Use for learning syntax** - Perfect for understanding Unity code structure
2. **Test logic** - Verify your code compiles and runs
3. **Practice patterns** - Learn component-based architecture
4. **Understand lifecycle** - See when methods are called
5. **Move to real Unity** - Once comfortable, transition to actual Unity projects

## Future Enhancements

Planned additions:
- [ ] More Unity classes (Camera, Light, Renderer)
- [ ] Collision event simulation
- [ ] Coroutine support
- [ ] More complete Input system
- [ ] Animation state machine mocks
- [ ] UI system mocks

## Support

For issues or questions about Unity mock support:
1. Check this documentation
2. Review the examples above
3. Test with simple code first
4. Gradually add complexity

---

**Remember:** This is a learning tool, not a replacement for Unity. Use it to practice syntax and concepts, then apply your knowledge in real Unity projects!
