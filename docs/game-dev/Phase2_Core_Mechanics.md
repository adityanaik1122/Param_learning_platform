# Phase 2: Core Mechanics - Building the Game World

## Overview

Phase 2 transitions from basic scripting to creating interactive game entities. You'll learn how to make objects interact through physics, build responsive player controllers, and create modular, reusable game components.

**Learning Objectives:**
- Master Unity's physics system (Rigidbodies, Colliders, Triggers)
- Build a professional First-Person Controller
- Implement advanced movement techniques (head bobbing, cross-platform input)
- Create modular environments using Prefabs
- Understand the difference between static and dynamic objects

**Time Estimate:** 3-4 weeks

---

## Module 1: Physics and Collision

### Understanding Unity's Physics System

Unity uses NVIDIA PhysX for 3D physics and Box2D for 2D physics. The system simulates real-world physics including gravity, friction, and collisions.

**Core Components:**

#### 1. Rigidbody Component

The Rigidbody component makes a GameObject respond to physics.

```csharp
public class RigidbodyExample : MonoBehaviour
{
    private Rigidbody rb;
    
    private void Awake()
    {
        rb = GetComponent<Rigidbody>();
        
        // Configure rigidbody properties
        rb.mass = 1f;                    // Mass in kg
        rb.drag = 0f;                    // Air resistance
        rb.angularDrag = 0.05f;          // Rotation resistance
        rb.useGravity = true;            // Affected by gravity
        rb.isKinematic = false;          // Responds to physics
        rb.interpolation = RigidbodyInterpolation.Interpolate;  // Smooth movement
        rb.collisionDetectionMode = CollisionDetectionMode.Continuous;  // Better collision detection
        
        // Freeze rotation on X and Z axes (common for characters)
        rb.constraints = RigidbodyConstraints.FreezeRotationX | 
                        RigidbodyConstraints.FreezeRotationZ;
    }
    
    private void FixedUpdate()
    {
        // Always modify rigidbody in FixedUpdate, not Update!
        
        // Apply force (gradual acceleration)
        rb.AddForce(Vector3.forward * 10f);
        
        // Apply impulse force (instant velocity change)
        rb.AddForce(Vector3.up * 10f, ForceMode.Impulse);
        
        // Set velocity directly (immediate)
        rb.velocity = new Vector3(5f, rb.velocity.y, 0f);
        
        // Apply torque (rotation force)
        rb.AddTorque(Vector3.up * 10f);
    }
}
```

**Rigidbody Types:**

| Property | Dynamic | Kinematic | Static (No Rigidbody) |
|----------|---------|-----------|----------------------|
| Affected by forces | ✅ Yes | ❌ No | ❌ No |
| Affected by collisions | ✅ Yes | ❌ No | ❌ No |
| Can move | ✅ Yes | ✅ Yes (via Transform) | ✅ Yes (expensive!) |
| Performance cost | Medium | Low | Lowest |
| Use case | Player, enemies, projectiles | Moving platforms, doors | Walls, floors, scenery |



#### 2. Collider Components

Colliders define the shape for collision detection.

**Common Collider Types:**

```csharp
public class ColliderTypes : MonoBehaviour
{
    private void Start()
    {
        // Box Collider - Best for rectangular objects
        BoxCollider boxCol = gameObject.AddComponent<BoxCollider>();
        boxCol.center = Vector3.zero;
        boxCol.size = new Vector3(1f, 1f, 1f);
        boxCol.isTrigger = false;  // Physical collision
        
        // Sphere Collider - Best for round objects, cheapest performance
        SphereCollider sphereCol = gameObject.AddComponent<SphereCollider>();
        sphereCol.center = Vector3.zero;
        sphereCol.radius = 0.5f;
        
        // Capsule Collider - Best for characters (smooth sliding)
        CapsuleCollider capsuleCol = gameObject.AddComponent<CapsuleCollider>();
        capsuleCol.center = Vector3.zero;
        capsuleCol.radius = 0.5f;
        capsuleCol.height = 2f;
        capsuleCol.direction = 1;  // 0=X, 1=Y, 2=Z
        
        // Mesh Collider - Exact shape, expensive performance
        MeshCollider meshCol = gameObject.AddComponent<MeshCollider>();
        meshCol.sharedMesh = GetComponent<MeshFilter>().mesh;
        meshCol.convex = true;  // Required for Rigidbody interaction
    }
}
```

**Collider Performance Comparison:**

| Collider Type | Performance | Use Case |
|---------------|-------------|----------|
| Sphere | Fastest | Projectiles, simple objects |
| Capsule | Fast | Characters, cylindrical objects |
| Box | Fast | Walls, floors, rectangular objects |
| Mesh (Convex) | Medium | Complex shapes that need physics |
| Mesh (Non-convex) | Slowest | Static environment only |

#### 3. Triggers vs Collisions

**Collision** - Physical interaction (objects bounce/block)
**Trigger** - Detection only (objects pass through)

```csharp
public class TriggerVsCollision : MonoBehaviour
{
    // COLLISION EVENTS - Requires both objects have colliders, at least one has Rigidbody
    private void OnCollisionEnter(Collision collision)
    {
        Debug.Log($"Collision started with {collision.gameObject.name}");
        
        // Access collision details
        ContactPoint contact = collision.contacts[0];
        Vector3 hitPoint = contact.point;
        Vector3 hitNormal = contact.normal;
        float impactForce = collision.impulse.magnitude;
        
        // Example: Damage based on impact force
        if (impactForce > 5f)
        {
            TakeDamage(impactForce);
        }
    }
    
    private void OnCollisionStay(Collision collision)
    {
        // Called every frame while colliding
        Debug.Log("Still colliding");
    }
    
    private void OnCollisionExit(Collision collision)
    {
        Debug.Log("Collision ended");
    }
    
    // TRIGGER EVENTS - Requires at least one collider has isTrigger = true
    private void OnTriggerEnter(Collider other)
    {
        Debug.Log($"Trigger entered by {other.gameObject.name}");
        
        // Example: Collectible pickup
        if (other.CompareTag("Player"))
        {
            CollectItem();
            Destroy(gameObject);
        }
    }
    
    private void OnTriggerStay(Collider other)
    {
        // Called every frame while inside trigger
        // Example: Damage zone
        if (other.CompareTag("Player"))
        {
            other.GetComponent<Health>()?.TakeDamage(1f * Time.deltaTime);
        }
    }
    
    private void OnTriggerExit(Collider other)
    {
        Debug.Log("Trigger exited");
    }
    
    private void TakeDamage(float amount) { }
    private void CollectItem() { }
}
```

**When to Use Each:**

| Scenario | Use |
|----------|-----|
| Walls, floors, obstacles | Collision (isTrigger = false) |
| Collectible items | Trigger (isTrigger = true) |
| Damage zones | Trigger |
| Doors, moving platforms | Collision |
| Detection zones (enemy vision) | Trigger |
| Projectiles | Collision (with OnCollisionEnter) |

---

## Module 2: The Player Controller

### Building a First-Person Controller

A responsive player controller is the foundation of game feel. Players interact with movement every second, so it must feel perfect.

#### Basic Movement Structure

```csharp
using UnityEngine;

[RequireComponent(typeof(CharacterController))]
public class FirstPersonController : MonoBehaviour
{
    [Header("Movement")]
    [SerializeField] private float walkSpeed = 5f;
    [SerializeField] private float runSpeed = 8f;
    [SerializeField] private float jumpHeight = 2f;
    [SerializeField] private float gravity = -9.81f;
    
    [Header("Look")]
    [SerializeField] private float mouseSensitivity = 2f;
    [SerializeField] private float maxLookAngle = 80f;
    [SerializeField] private Transform cameraTransform;
    
    [Header("Ground Check")]
    [SerializeField] private Transform groundCheck;
    [SerializeField] private float groundDistance = 0.4f;
    [SerializeField] private LayerMask groundMask;
    
    private CharacterController controller;
    private Vector3 velocity;
    private bool isGrounded;
    private float cameraPitch = 0f;
    
    private void Awake()
    {
        controller = GetComponent<CharacterController>();
        
        // Lock and hide cursor for FPS
        Cursor.lockState = CursorLockMode.Locked;
        Cursor.visible = false;
    }
    
    private void Update()
    {
        HandleGroundCheck();
        HandleMovement();
        HandleLook();
        HandleJump();
    }
    
    private void HandleGroundCheck()
    {
        // Check if player is on ground using sphere cast
        isGrounded = Physics.CheckSphere(groundCheck.position, groundDistance, groundMask);
        
        // Reset falling velocity when grounded
        if (isGrounded && velocity.y < 0)
        {
            velocity.y = -2f;  // Small negative value keeps player grounded
        }
    }
    
    private void HandleMovement()
    {
        // Get input
        float horizontal = Input.GetAxis("Horizontal");  // A/D or Left/Right
        float vertical = Input.GetAxis("Vertical");      // W/S or Up/Down
        
        // Calculate movement direction relative to where player is looking
        Vector3 move = transform.right * horizontal + transform.forward * vertical;
        
        // Determine speed (walk or run)
        float currentSpeed = Input.GetKey(KeyCode.LeftShift) ? runSpeed : walkSpeed;
        
        // Move the character
        controller.Move(move * currentSpeed * Time.deltaTime);
    }
    
    private void HandleLook()
    {
        // Get mouse input
        float mouseX = Input.GetAxis("Mouse X") * mouseSensitivity;
        float mouseY = Input.GetAxis("Mouse Y") * mouseSensitivity;
        
        // Rotate player body left/right
        transform.Rotate(Vector3.up * mouseX);
        
        // Rotate camera up/down (with clamping)
        cameraPitch -= mouseY;
        cameraPitch = Mathf.Clamp(cameraPitch, -maxLookAngle, maxLookAngle);
        cameraTransform.localRotation = Quaternion.Euler(cameraPitch, 0f, 0f);
    }
    
    private void HandleJump()
    {
        // Jump when grounded and space pressed
        if (Input.GetButtonDown("Jump") && isGrounded)
        {
            // Calculate jump velocity using physics formula: v = sqrt(h * -2 * g)
            velocity.y = Mathf.Sqrt(jumpHeight * -2f * gravity);
        }
        
        // Apply gravity
        velocity.y += gravity * Time.deltaTime;
        
        // Apply vertical velocity
        controller.Move(velocity * Time.deltaTime);
    }
}
```

### Advanced: Head Bobbing

Head bobbing adds realism by simulating natural head movement during walking.

```csharp
using UnityEngine;

public class HeadBobbing : MonoBehaviour
{
    [Header("Bobbing Settings")]
    [SerializeField] private float bobbingSpeed = 14f;
    [SerializeField] private float bobbingAmount = 0.05f;
    [SerializeField] private float midpoint = 1.5f;  // Camera's default Y position
    
    private float timer = 0f;
    private Vector3 originalPosition;
    
    private void Start()
    {
        originalPosition = transform.localPosition;
    }
    
    private void Update()
    {
        // Only bob when moving
        float horizontal = Input.GetAxis("Horizontal");
        float vertical = Input.GetAxis("Vertical");
        bool isMoving = Mathf.Abs(horizontal) > 0.1f || Mathf.Abs(vertical) > 0.1f;
        
        if (isMoving)
        {
            // Increment timer based on speed
            timer += Time.deltaTime * bobbingSpeed;
            
            // Calculate bobbing using sine wave
            float waveslice = Mathf.Sin(timer);
            float translateChange = waveslice * bobbingAmount;
            float totalAxes = Mathf.Abs(horizontal) + Mathf.Abs(vertical);
            totalAxes = Mathf.Clamp(totalAxes, 0f, 1f);
            translateChange = totalAxes * translateChange;
            
            // Apply bobbing to camera position
            transform.localPosition = new Vector3(
                originalPosition.x,
                midpoint + translateChange,
                originalPosition.z
            );
        }
        else
        {
            // Reset to original position when not moving
            timer = 0f;
            transform.localPosition = Vector3.Lerp(
                transform.localPosition,
                originalPosition,
                Time.deltaTime * bobbingSpeed
            );
        }
    }
}
```

**Mathematical Explanation:**

The sine wave creates smooth up-and-down motion:
- `Mathf.Sin(timer)` oscillates between -1 and 1
- Multiplying by `bobbingAmount` scales the movement
- `bobbingSpeed` controls how fast the head bobs
- The wave creates natural acceleration/deceleration

### Cross-Platform Input

Use Platform Dependent Compilation to support different input methods:

```csharp
using UnityEngine;

public class CrossPlatformInput : MonoBehaviour
{
    private Vector2 GetMovementInput()
    {
        #if UNITY_STANDALONE || UNITY_EDITOR
            // Desktop: Keyboard input
            float horizontal = Input.GetAxis("Horizontal");
            float vertical = Input.GetAxis("Vertical");
            return new Vector2(horizontal, vertical);
        
        #elif UNITY_IOS || UNITY_ANDROID
            // Mobile: Touch joystick (requires UI joystick setup)
            return GetMobileJoystickInput();
        
        #else
            return Vector2.zero;
        #endif
    }
    
    private bool GetJumpInput()
    {
        #if UNITY_STANDALONE || UNITY_EDITOR
            return Input.GetButtonDown("Jump");
        
        #elif UNITY_IOS || UNITY_ANDROID
            return GetMobileJumpButton();
        
        #else
            return false;
        #endif
    }
    
    private Vector2 GetMobileJoystickInput()
    {
        // Implement mobile joystick logic
        // This would read from a UI joystick component
        return Vector2.zero;
    }
    
    private bool GetMobileJumpButton()
    {
        // Implement mobile jump button logic
        return false;
    }
}
```

**Platform Compilation Directives:**

| Directive | Platform |
|-----------|----------|
| `UNITY_EDITOR` | Unity Editor |
| `UNITY_STANDALONE` | Desktop (Windows, Mac, Linux) |
| `UNITY_IOS` | iOS |
| `UNITY_ANDROID` | Android |
| `UNITY_WEBGL` | WebGL |

---

## Module 3: Prefabs & Modular Design

### Understanding Prefabs

Prefabs are reusable GameObject templates. Changes to the prefab automatically update all instances.

#### Creating and Using Prefabs

```csharp
using UnityEngine;

public class PrefabSpawner : MonoBehaviour
{
    [SerializeField] private GameObject enemyPrefab;
    [SerializeField] private Transform spawnPoint;
    [SerializeField] private float spawnInterval = 2f;
    
    private float timer = 0f;
    
    private void Update()
    {
        timer += Time.deltaTime;
        
        if (timer >= spawnInterval)
        {
            SpawnEnemy();
            timer = 0f;
        }
    }
    
    private void SpawnEnemy()
    {
        // Instantiate creates a copy of the prefab
        GameObject enemy = Instantiate(
            enemyPrefab,
            spawnPoint.position,
            spawnPoint.rotation
        );
        
        // Optionally parent to keep hierarchy clean
        enemy.transform.SetParent(transform);
        
        // Configure the spawned instance
        Enemy enemyScript = enemy.GetComponent<Enemy>();
        if (enemyScript != null)
        {
            enemyScript.SetDifficulty(GetCurrentDifficulty());
        }
    }
    
    private int GetCurrentDifficulty()
    {
        // Increase difficulty over time
        return Mathf.FloorToInt(Time.timeSinceLevelLoad / 30f) + 1;
    }
}
```

### Modular Environment Design

Build levels from reusable "building block" pieces:

```csharp
using UnityEngine;

public class ModularLevelBuilder : MonoBehaviour
{
    [Header("Building Block Prefabs")]
    [SerializeField] private GameObject floorTile;
    [SerializeField] private GameObject wallTile;
    [SerializeField] private GameObject cornerTile;
    [SerializeField] private GameObject doorTile;
    
    [Header("Level Configuration")]
    [SerializeField] private int roomWidth = 10;
    [SerializeField] private int roomLength = 10;
    [SerializeField] private float tileSize = 2f;
    
    private void Start()
    {
        BuildRoom();
    }
    
    private void BuildRoom()
    {
        // Build floor
        for (int x = 0; x < roomWidth; x++)
        {
            for (int z = 0; z < roomLength; z++)
            {
                Vector3 position = new Vector3(x * tileSize, 0f, z * tileSize);
                Instantiate(floorTile, position, Quaternion.identity, transform);
            }
        }
        
        // Build walls
        for (int x = 0; x < roomWidth; x++)
        {
            // Front wall
            Vector3 frontPos = new Vector3(x * tileSize, 0f, 0f);
            Instantiate(wallTile, frontPos, Quaternion.identity, transform);
            
            // Back wall
            Vector3 backPos = new Vector3(x * tileSize, 0f, (roomLength - 1) * tileSize);
            Instantiate(wallTile, backPos, Quaternion.Euler(0f, 180f, 0f), transform);
        }
        
        for (int z = 1; z < roomLength - 1; z++)
        {
            // Left wall
            Vector3 leftPos = new Vector3(0f, 0f, z * tileSize);
            Instantiate(wallTile, leftPos, Quaternion.Euler(0f, 90f, 0f), transform);
            
            // Right wall
            Vector3 rightPos = new Vector3((roomWidth - 1) * tileSize, 0f, z * tileSize);
            Instantiate(wallTile, rightPos, Quaternion.Euler(0f, -90f, 0f), transform);
        }
    }
}
```

### Prefab Variants

Create variations of prefabs without duplicating:

1. Create base prefab (e.g., "Enemy_Base")
2. Right-click prefab → Create → Prefab Variant
3. Modify variant (e.g., "Enemy_Fast" with higher speed)
4. Changes to base prefab propagate to variants
5. Variant-specific changes override base values

**Benefits:**
- Reduce duplication
- Maintain consistency across variants
- Easy to update all variants at once
- Clear inheritance hierarchy

---

## Best Practices

### Physics Optimization

```csharp
// ✅ GOOD: Cache Rigidbody reference
private Rigidbody rb;

private void Awake()
{
    rb = GetComponent<Rigidbody>();
}

private void FixedUpdate()
{
    rb.AddForce(Vector3.forward * 10f);
}

// ❌ BAD: GetComponent every frame
private void FixedUpdate()
{
    GetComponent<Rigidbody>().AddForce(Vector3.forward * 10f);
}
```

### Layer-Based Collision

Set up physics layers to control what collides with what:

1. Edit → Project Settings → Tags and Layers
2. Create layers: Player, Enemy, Projectile, Environment
3. Edit → Project Settings → Physics → Layer Collision Matrix
4. Uncheck boxes to disable collisions (e.g., Player projectiles don't hit Player)

```csharp
// Check collision with specific layer
private void OnCollisionEnter(Collision collision)
{
    if (collision.gameObject.layer == LayerMask.NameToLayer("Enemy"))
    {
        DealDamage(collision.gameObject);
    }
}

// Raycast against specific layers
int layerMask = LayerMask.GetMask("Enemy", "Environment");
if (Physics.Raycast(transform.position, transform.forward, out RaycastHit hit, 100f, layerMask))
{
    Debug.Log($"Hit {hit.collider.name}");
}
```

### Prefab Workflow Tips

1. **Organize prefabs in folders** by type (Characters/, Enemies/, Projectiles/, Environment/)
2. **Use nested prefabs** for complex objects (Character prefab contains Weapon prefab)
3. **Override sparingly** - too many overrides make prefabs hard to maintain
4. **Test prefab changes** in isolation before updating all instances
5. **Version control prefabs** carefully - conflicts are hard to resolve

---

## Common Pitfalls

1. **Moving static colliders** - Expensive! Use Rigidbody (kinematic) instead
2. **Too many physics objects** - Use object pooling for projectiles/enemies
3. **Ignoring FixedUpdate** - Physics code must run in FixedUpdate, not Update
4. **Forgetting ground check** - Leads to infinite jumping
5. **Not clamping camera rotation** - Player can flip upside down
6. **Hardcoding prefab references** - Use SerializeField for flexibility

---

## Exercises

### Exercise 1: Physics Playground
Create a scene demonstrating all collision types:
- Static objects (walls, floor)
- Dynamic objects (balls, boxes)
- Kinematic objects (moving platform)
- Trigger zones (damage area, collectible)

### Exercise 2: Advanced Player Controller
Build a first-person controller with:
- WASD movement with run (Shift)
- Mouse look with clamping
- Jump with ground detection
- Head bobbing when walking
- Smooth acceleration/deceleration

### Exercise 3: Modular Level
Design a modular level system:
- Create 5 building block prefabs
- Build a complete room using only those blocks
- Add prefab variants (damaged wall, locked door)
- Implement procedural room generation

---

## Resources

- [Unity Physics Best Practices](https://docs.unity3d.com/Manual/PhysicsBestPractices.html)
- [Character Controller vs Rigidbody](https://docs.unity3d.com/Manual/class-CharacterController.html)
- [Prefab Workflow](https://docs.unity3d.com/Manual/Prefabs.html)
- [Layer-Based Collision Detection](https://docs.unity3d.com/Manual/LayerBasedCollision.html)

---

**Next:** [Phase 3: Advanced Systems](Phase3_Advanced_Systems.md) - Event-driven programming, AI, and system architecture
