# Phase 1: Foundations - The Building Blocks

## Overview

Phase 1 focuses on establishing a solid foundation in Unity's environment and C# programming fundamentals. This phase is critical because every advanced technique builds upon these core concepts.

**Learning Objectives:**
- Master the Unity Editor interface and workflow
- Understand proper asset management and organization
- Write clean, maintainable C# scripts
- Implement basic game mechanics using Unity's component system

**Time Estimate:** 2-3 weeks for beginners

---

## Module 1: Unity Interface & Workflow

### The "Big Four" Windows

Unity's interface is built around four essential windows that you'll use constantly:

#### 1. Hierarchy Window
**Purpose:** Shows all GameObjects in the current scene in a tree structure.

**Key Concepts:**
- Parent-child relationships (transforms are relative to parent)
- Scene organization using empty GameObjects as folders
- Search and filtering capabilities

**Best Practices:**
```
Scene Hierarchy Organization:
├── _Managers (empty GameObject)
│   ├── GameManager
│   ├── AudioManager
│   └── UIManager
├── Environment
│   ├── Terrain
│   ├── Buildings
│   └── Props
├── Lighting
│   ├── Directional Light
│   └── Point Lights
└── Player
    ├── Camera
    └── Character Model
```

**Pro Tip:** Prefix organizational GameObjects with underscore (_) to keep them at the top of the hierarchy.

#### 2. Scene Window
**Purpose:** Visual editor for positioning and manipulating GameObjects in 3D/2D space.

**Essential Shortcuts:**
- `Q` - Hand tool (pan view)
- `W` - Move tool
- `E` - Rotate tool
- `R` - Scale tool
- `F` - Frame selected object
- `Alt + Left Mouse` - Orbit camera
- `Scroll Wheel` - Zoom

**Gizmo Controls:**
- Global vs Local space (toggle in toolbar)
- Pivot vs Center (affects rotation point)
- Grid snapping (hold Ctrl while moving)


#### 3. Game Window
**Purpose:** Shows the game from the camera's perspective during Play mode.

**Key Features:**
- Aspect ratio selection (16:9, 4:3, etc.)
- Stats button (shows FPS, draw calls, batches)
- Maximize on Play option
- Gizmos toggle

**Testing Workflow:**
1. Enter Play mode (Ctrl/Cmd + P)
2. Test gameplay
3. Exit Play mode (changes made in Play mode are NOT saved!)
4. Make adjustments in Edit mode
5. Repeat

**Critical Warning:** Any changes made to GameObjects during Play mode will be lost when you exit Play mode. Always exit Play mode before making permanent changes.

#### 4. Inspector Window
**Purpose:** Displays and allows editing of all components attached to the selected GameObject.

**Component Anatomy:**
```
Transform Component (always present):
├── Position (X, Y, Z)
├── Rotation (X, Y, Z in Euler angles)
└── Scale (X, Y, Z)

Custom Script Component:
├── Public variables (automatically shown)
├── [SerializeField] private variables (shown but encapsulated)
├── Context menu options (right-click)
└── Component-specific buttons
```

**Inspector Pro Tips:**
- Right-click component header → "Copy Component" / "Paste Component Values"
- Lock inspector (🔒 icon) to keep it focused on one object
- Debug mode (⋮ menu) shows private variables
- Multi-object editing (select multiple objects)

### Customizing Editor Layouts

Unity allows you to create custom layouts for different workflows.

**Recommended Layouts:**

**1. Default Layout (General Work)**
- Scene view: Large, center-left
- Game view: Tabbed with Scene
- Hierarchy: Left sidebar
- Inspector: Right sidebar
- Project: Bottom

**2. Coding Layout**
- Scene view: Small, top-right
- Code editor: External (Visual Studio/Rider)
- Console: Bottom (for errors)
- Inspector: Right sidebar
- Hierarchy: Left sidebar, narrow

**3. Animation Layout**
- Scene view: Top-left
- Animation window: Bottom
- Animator window: Bottom-right
- Hierarchy: Left sidebar

**How to Save Layouts:**
1. Arrange windows as desired
2. Window → Layouts → Save Layout
3. Name it (e.g., "My Coding Layout")
4. Switch between layouts via Window → Layouts

---

## Module 2: Asset Management

### Proper Folder Organization

A well-organized project structure is essential for team collaboration and long-term maintainability.

**Standard Folder Structure:**
```
Assets/
├── _Project/
│   ├── Scenes/
│   │   ├── MainMenu.unity
│   │   ├── Level01.unity
│   │   └── Level02.unity
│   ├── Scripts/
│   │   ├── Player/
│   │   ├── Enemies/
│   │   ├── Managers/
│   │   └── Utilities/
│   ├── Prefabs/
│   │   ├── Characters/
│   │   ├── Environment/
│   │   └── UI/
│   ├── Materials/
│   ├── Textures/
│   ├── Models/
│   │   ├── Characters/
│   │   └── Environment/
│   ├── Audio/
│   │   ├── Music/
│   │   ├── SFX/
│   │   └── Ambience/
│   ├── Animations/
│   ├── Fonts/
│   └── Resources/
├── Plugins/
└── StreamingAssets/
```

**Naming Conventions:**
- Use PascalCase for folders: `PlayerScripts`, `EnemyPrefabs`
- Use descriptive names: `PlayerController.cs` not `PC.cs`
- Prefix related assets: `Player_Idle.anim`, `Player_Walk.anim`
- Version important assets: `Level01_v2.unity`


### FBX Format for Meshes

**Why FBX?**
- Industry standard for 3D models
- Preserves hierarchy, materials, and animations
- Better control over import settings
- Maintains scale consistency

**FBX vs OBJ:**
| Feature | FBX | OBJ |
|---------|-----|-----|
| Animations | ✅ Yes | ❌ No |
| Materials | ✅ Embedded | ⚠️ Separate MTL file |
| Hierarchy | ✅ Preserved | ❌ Flattened |
| Scale Control | ✅ Adjustable | ⚠️ Fixed |
| File Size | Larger | Smaller |

**FBX Import Settings (Unity):**
```
Model Tab:
├── Scale Factor: 1.0 (important!)
├── Convert Units: Enabled
├── Bake Axis Conversion: Enabled
├── Import BlendShapes: As needed
└── Import Visibility: Enabled

Rig Tab:
├── Animation Type: Generic/Humanoid/Legacy
└── Avatar Definition: Create From This Model

Animation Tab:
├── Import Animation: Enabled
└── Bake Animations: Enabled

Materials Tab:
├── Material Creation Mode: Standard
├── Location: Use Embedded Materials
└── Naming: By Base Texture Name
```

### Automating Asset Imports

Unity allows you to automate import settings using AssetPostprocessor scripts.

**Example: Force Mesh Scale to 1.0**

```csharp
using UnityEngine;
using UnityEditor;

public class MeshImportProcessor : AssetPostprocessor
{
    // Called before importing a model
    void OnPreprocessModel()
    {
        ModelImporter modelImporter = assetImporter as ModelImporter;
        
        // Force scale factor to 1.0
        modelImporter.globalScale = 1.0f;
        
        // Disable import of materials (we'll create our own)
        modelImporter.materialImportMode = ModelImporterMaterialImportMode.None;
        
        // Enable mesh compression for smaller builds
        modelImporter.meshCompression = ModelImporterMeshCompression.Medium;
        
        Debug.Log($"Preprocessing model: {assetPath}");
    }
    
    // Called after importing a model
    void OnPostprocessModel(GameObject gameObject)
    {
        // Add custom components or modify the imported model
        Debug.Log($"Postprocessed model: {gameObject.name}");
    }
}
```

**Example: Auto-Configure Texture Import Settings**

```csharp
using UnityEngine;
using UnityEditor;

public class TextureImportProcessor : AssetPostprocessor
{
    void OnPreprocessTexture()
    {
        TextureImporter textureImporter = assetImporter as TextureImporter;
        
        // Detect texture type by folder name
        if (assetPath.Contains("/Textures/UI/"))
        {
            // UI textures: no compression, no mipmaps
            textureImporter.textureType = TextureImporterType.Sprite;
            textureImporter.spriteImportMode = SpriteImportMode.Single;
            textureImporter.mipmapEnabled = false;
            textureImporter.textureCompression = TextureImporterCompression.Uncompressed;
        }
        else if (assetPath.Contains("/Textures/Environment/"))
        {
            // Environment textures: compressed, with mipmaps
            textureImporter.textureType = TextureImporterType.Default;
            textureImporter.mipmapEnabled = true;
            textureImporter.textureCompression = TextureImporterCompression.Compressed;
            textureImporter.maxTextureSize = 2048;
        }
        else if (assetPath.Contains("/Textures/Characters/"))
        {
            // Character textures: high quality
            textureImporter.textureType = TextureImporterType.Default;
            textureImporter.mipmapEnabled = true;
            textureImporter.textureCompression = TextureImporterCompression.CompressedHQ;
            textureImporter.maxTextureSize = 4096;
        }
    }
}
```

**Benefits of Automation:**
- Consistency across all assets
- Saves time on repetitive tasks
- Reduces human error
- Enforces team standards

---

## Module 3: Basic C# in Unity

### Structure of a C# Program

Every C# script in Unity follows a standard structure:

```csharp
// 1. Using Directives (imports)
using UnityEngine;
using System.Collections;
using System.Collections.Generic;

// 2. Namespace (optional but recommended for organization)
namespace MyGame.Player
{
    // 3. Class Declaration
    public class PlayerController : MonoBehaviour
    {
        // 4. Fields (variables)
        [SerializeField] private float moveSpeed = 5f;
        private Rigidbody rb;
        
        // 5. Unity Magic Methods
        private void Awake()
        {
            // Called when script instance is loaded
            rb = GetComponent<Rigidbody>();
        }
        
        private void Start()
        {
            // Called before first frame update
            Debug.Log("Player initialized");
        }
        
        private void Update()
        {
            // Called once per frame
            HandleInput();
        }
        
        private void FixedUpdate()
        {
            // Called at fixed time intervals (physics)
            ApplyMovement();
        }
        
        // 6. Custom Methods
        private void HandleInput()
        {
            // Your code here
        }
        
        private void ApplyMovement()
        {
            // Your code here
        }
    }
}
```


### Using Namespaces

Namespaces prevent naming conflicts and organize code logically.

```csharp
// Without namespaces (can cause conflicts)
public class GameManager { }
public class AudioManager { }

// With namespaces (organized and conflict-free)
namespace MyGame.Core
{
    public class GameManager { }
}

namespace MyGame.Audio
{
    public class AudioManager { }
}

// Using the classes
using MyGame.Core;
using MyGame.Audio;

public class Startup : MonoBehaviour
{
    private GameManager gameManager;
    private AudioManager audioManager;
}
```

**Namespace Best Practices:**
- Use company/project name as root: `CompanyName.ProjectName.Feature`
- Keep namespaces shallow (2-3 levels max)
- Match folder structure: `Scripts/Player/` → `namespace MyGame.Player`
- Don't use `using` for Unity's built-in namespaces in every file

### Variables in Unity

**Variable Types:**

```csharp
// Value Types (stored on stack)
int health = 100;                    // Integer
float speed = 5.5f;                  // Floating point (note the 'f')
bool isAlive = true;                 // Boolean
Vector3 position = new Vector3(0, 0, 0);  // Struct

// Reference Types (stored on heap)
string playerName = "Hero";          // String
GameObject player;                   // GameObject reference
Transform playerTransform;           // Component reference
int[] scores = new int[10];          // Array

// Unity-Specific Types
Color playerColor = Color.red;
Quaternion rotation = Quaternion.identity;
LayerMask groundLayer = LayerMask.GetMask("Ground");
```

**Variable Visibility:**

```csharp
public class VariableExample : MonoBehaviour
{
    // PUBLIC: Visible in Inspector and other classes
    public float publicSpeed = 5f;
    
    // PRIVATE: Not visible anywhere (default)
    private float privateSpeed = 5f;
    
    // SERIALIZEFIELD: Private but visible in Inspector
    [SerializeField] private float serializedSpeed = 5f;
    
    // PROTECTED: Visible to derived classes
    protected float protectedSpeed = 5f;
    
    // STATIC: Shared across all instances
    public static int instanceCount = 0;
    
    // CONST: Compile-time constant
    private const float MAX_SPEED = 10f;
    
    // READONLY: Runtime constant (set in constructor)
    private readonly float startSpeed;
    
    public VariableExample()
    {
        startSpeed = 5f;
        instanceCount++;
    }
}
```

**Best Practice: Use [SerializeField] instead of public**

```csharp
// ❌ BAD: Exposes implementation details
public float speed = 5f;
public Rigidbody rb;

// ✅ GOOD: Encapsulated but Inspector-visible
[SerializeField] private float speed = 5f;
private Rigidbody rb;

// ✅ BETTER: With tooltips for designers
[SerializeField]
[Tooltip("Movement speed in units per second")]
private float speed = 5f;

[SerializeField]
[Range(0f, 10f)]
[Tooltip("Jump force multiplier")]
private float jumpForce = 5f;
```

### Functions (Methods)

**Method Anatomy:**

```csharp
// Access Modifier | Return Type | Method Name | Parameters
public            void          TakeDamage    (int amount)
{
    // Method body
    health -= amount;
    
    if (health <= 0)
    {
        Die();
    }
}
```

**Common Method Patterns:**

```csharp
public class MethodExamples : MonoBehaviour
{
    // Void method (no return value)
    public void PrintMessage(string message)
    {
        Debug.Log(message);
    }
    
    // Method with return value
    public int CalculateDamage(int baseDamage, float multiplier)
    {
        return Mathf.RoundToInt(baseDamage * multiplier);
    }
    
    // Method with optional parameters
    public void Heal(int amount = 10)
    {
        health += amount;
    }
    
    // Method with out parameter (returns multiple values)
    public bool TryGetComponent<T>(out T component) where T : Component
    {
        component = GetComponent<T>();
        return component != null;
    }
    
    // Method with ref parameter (modifies original)
    public void ModifyValue(ref int value)
    {
        value *= 2;
    }
    
    // Coroutine (special Unity method)
    private IEnumerator DelayedAction(float delay)
    {
        yield return new WaitForSeconds(delay);
        Debug.Log("Action executed after delay");
    }
}
```

### Unity "Magic Methods"

Unity's MonoBehaviour class provides special methods that are called automatically:

```csharp
public class UnityLifecycle : MonoBehaviour
{
    // INITIALIZATION PHASE
    
    private void Awake()
    {
        // Called when script instance is loaded (before Start)
        // Use for: Getting component references, initializing variables
        // Execution order: Before all Start() calls
    }
    
    private void OnEnable()
    {
        // Called when object becomes enabled and active
        // Use for: Subscribing to events, registering with managers
    }
    
    private void Start()
    {
        // Called before first frame update (after Awake)
        // Use for: Initialization that depends on other objects
        // Execution order: After all Awake() calls
    }
    
    // UPDATE PHASE
    
    private void Update()
    {
        // Called once per frame (variable time)
        // Use for: Input handling, non-physics updates
        // Frequency: ~60 FPS (depends on performance)
    }
    
    private void FixedUpdate()
    {
        // Called at fixed time intervals
        // Use for: Physics calculations, Rigidbody movement
        // Frequency: 50 FPS (default, configurable)
    }
    
    private void LateUpdate()
    {
        // Called after all Update() calls
        // Use for: Camera following, final position adjustments
    }
    
    // PHYSICS PHASE
    
    private void OnCollisionEnter(Collision collision)
    {
        // Called when this collider/rigidbody touches another
        Debug.Log($"Collided with: {collision.gameObject.name}");
    }
    
    private void OnTriggerEnter(Collider other)
    {
        // Called when this trigger collider touches another
        Debug.Log($"Triggered by: {other.gameObject.name}");
    }
    
    // RENDERING PHASE
    
    private void OnBecameVisible()
    {
        // Called when renderer becomes visible to any camera
    }
    
    private void OnBecameInvisible()
    {
        // Called when renderer is no longer visible
    }
    
    // CLEANUP PHASE
    
    private void OnDisable()
    {
        // Called when object becomes disabled
        // Use for: Unsubscribing from events, cleanup
    }
    
    private void OnDestroy()
    {
        // Called when object is destroyed
        // Use for: Final cleanup, releasing resources
    }
}
```

**Execution Order Diagram:**

```
Scene Load
    ↓
Awake() [All objects]
    ↓
OnEnable() [All objects]
    ↓
Start() [All objects]
    ↓
┌─────────────────────────┐
│   GAME LOOP (Repeats)   │
│                         │
│  FixedUpdate()          │
│       ↓                 │
│  Physics Calculations   │
│       ↓                 │
│  Update()               │
│       ↓                 │
│  LateUpdate()           │
│       ↓                 │
│  Rendering              │
└─────────────────────────┘
    ↓
OnDisable()
    ↓
OnDestroy()
```

---

## Practical Example: Simple Player Controller

Let's combine everything we've learned into a complete, working example:

```csharp
using UnityEngine;

namespace MyGame.Player
{
    /// <summary>
    /// Basic player controller demonstrating Phase 1 concepts
    /// </summary>
    [RequireComponent(typeof(Rigidbody))]
    public class BasicPlayerController : MonoBehaviour
    {
        #region Serialized Fields
        
        [Header("Movement Settings")]
        [SerializeField]
        [Tooltip("Movement speed in units per second")]
        private float moveSpeed = 5f;
        
        [SerializeField]
        [Range(0f, 20f)]
        [Tooltip("Jump force applied to rigidbody")]
        private float jumpForce = 10f;
        
        [Header("Ground Detection")]
        [SerializeField]
        private LayerMask groundLayer;
        
        [SerializeField]
        private float groundCheckDistance = 0.1f;
        
        #endregion
        
        #region Private Fields
        
        private Rigidbody rb;
        private bool isGrounded;
        private Vector3 moveDirection;
        
        #endregion
        
        #region Unity Lifecycle
        
        private void Awake()
        {
            // Cache component reference (do this once, not every frame!)
            rb = GetComponent<Rigidbody>();
            
            // Validate required components
            if (rb == null)
            {
                Debug.LogError("Rigidbody component missing!");
            }
        }
        
        private void Start()
        {
            Debug.Log($"Player initialized at position: {transform.position}");
        }
        
        private void Update()
        {
            // Handle input (runs every frame)
            HandleInput();
            
            // Check if grounded
            CheckGrounded();
        }
        
        private void FixedUpdate()
        {
            // Apply physics-based movement (runs at fixed intervals)
            ApplyMovement();
        }
        
        #endregion
        
        #region Custom Methods
        
        private void HandleInput()
        {
            // Get input axes (-1 to 1)
            float horizontal = Input.GetAxisRaw("Horizontal");
            float vertical = Input.GetAxisRaw("Vertical");
            
            // Calculate move direction
            moveDirection = new Vector3(horizontal, 0f, vertical).normalized;
            
            // Handle jump input
            if (Input.GetKeyDown(KeyCode.Space) && isGrounded)
            {
                Jump();
            }
        }
        
        private void ApplyMovement()
        {
            // Calculate target velocity
            Vector3 targetVelocity = moveDirection * moveSpeed;
            
            // Preserve vertical velocity (don't interfere with gravity/jumping)
            targetVelocity.y = rb.velocity.y;
            
            // Apply velocity to rigidbody
            rb.velocity = targetVelocity;
        }
        
        private void Jump()
        {
            // Apply upward force
            rb.velocity = new Vector3(rb.velocity.x, jumpForce, rb.velocity.z);
            
            Debug.Log("Player jumped!");
        }
        
        private void CheckGrounded()
        {
            // Raycast downward to check if touching ground
            isGrounded = Physics.Raycast(
                transform.position,
                Vector3.down,
                groundCheckDistance,
                groundLayer
            );
        }
        
        #endregion
        
        #region Debug Visualization
        
        private void OnDrawGizmos()
        {
            // Visualize ground check ray in Scene view
            Gizmos.color = isGrounded ? Color.green : Color.red;
            Gizmos.DrawLine(
                transform.position,
                transform.position + Vector3.down * groundCheckDistance
            );
        }
        
        #endregion
    }
}
```

**Setup Instructions:**
1. Create new GameObject in scene
2. Add Rigidbody component (Freeze Rotation X, Z)
3. Add Capsule Collider
4. Attach BasicPlayerController script
5. Set Ground Layer in Inspector
6. Create ground plane with Ground layer
7. Press Play and use WASD + Space

---

## Summary & Next Steps

**Phase 1 Checklist:**
- ✅ Understand Unity's interface and workflow
- ✅ Organize assets properly
- ✅ Write clean C# scripts
- ✅ Use Unity's lifecycle methods correctly
- ✅ Implement basic player movement

**Common Mistakes to Avoid:**
- Making changes in Play mode (they won't save!)
- Using public variables instead of [SerializeField]
- Calling GetComponent() every frame (cache it!)
- Not organizing assets into folders
- Ignoring console errors and warnings

**Ready for Phase 2?**
Once you're comfortable with these foundations, you're ready to move on to Phase 2: Core Mechanics, where you'll learn about physics, collisions, and building interactive game entities.

**Resources:**
- Unity Manual: https://docs.unity3d.com/Manual/
- C# Programming Guide: https://docs.microsoft.com/en-us/dotnet/csharp/
- Unity Learn: https://learn.unity.com/
