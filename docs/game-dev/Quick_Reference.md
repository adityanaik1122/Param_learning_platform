# Unity Game Development - Quick Reference Guide

## Unity Shortcuts

### Scene View
| Shortcut | Action |
|----------|--------|
| `Q` | Hand tool (pan) |
| `W` | Move tool |
| `E` | Rotate tool |
| `R` | Scale tool |
| `T` | Rect tool (2D) |
| `F` | Frame selected object |
| `Alt + Left Mouse` | Orbit camera |
| `Alt + Right Mouse` | Zoom |
| `Middle Mouse` | Pan view |
| `Ctrl + D` | Duplicate |
| `Ctrl + Shift + F` | Align with view |
| `Shift + Space` | Maximize window |

### General
| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + P` | Play/Pause |
| `Ctrl/Cmd + Shift + P` | Pause |
| `Ctrl/Cmd + S` | Save scene |
| `Ctrl/Cmd + Shift + S` | Save scene as |
| `Ctrl/Cmd + N` | New scene |
| `Ctrl/Cmd + O` | Open scene |

---

## Common Code Patterns

### Getting Components
```csharp
// Cache in Awake (best performance)
private Rigidbody rb;
private void Awake() => rb = GetComponent<Rigidbody>();

// Try get component (safe)
if (TryGetComponent<Rigidbody>(out var rb))
{
    // Use rb
}

// Get component in children
Transform child = GetComponentInChildren<Transform>();

// Get component in parent
Canvas canvas = GetComponentInParent<Canvas>();

// Get all components
Collider[] colliders = GetComponents<Collider>();
```

### Input Handling
```csharp
// Old Input System
float horizontal = Input.GetAxis("Horizontal");        // Smooth (-1 to 1)
float vertical = Input.GetAxisRaw("Vertical");         // Raw (-1, 0, 1)
bool jump = Input.GetKeyDown(KeyCode.Space);           // Press
bool shooting = Input.GetKey(KeyCode.Mouse0);          // Hold
bool released = Input.GetKeyUp(KeyCode.E);             // Release

// Mouse
Vector3 mousePos = Input.mousePosition;
bool leftClick = Input.GetMouseButtonDown(0);
float scroll = Input.mouseScrollDelta.y;
```

### Movement
```csharp
// Transform movement (simple, no physics)
transform.position += Vector3.forward * speed * Time.deltaTime;
transform.Translate(Vector3.forward * speed * Time.deltaTime);

// Rigidbody movement (physics-based)
rb.velocity = new Vector3(x, rb.velocity.y, z) * speed;
rb.AddForce(Vector3.forward * force);
rb.MovePosition(rb.position + movement * Time.fixedDeltaTime);

// Character Controller
controller.Move(movement * speed * Time.deltaTime);
```

### Rotation
```csharp
// Look at target
transform.LookAt(target.position);

// Rotate towards
Vector3 direction = target.position - transform.position;
Quaternion rotation = Quaternion.LookRotation(direction);
transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * rotSpeed);

// Rotate around axis
transform.Rotate(Vector3.up * rotSpeed * Time.deltaTime);
transform.RotateAround(pivot.position, Vector3.up, rotSpeed * Time.deltaTime);
```

### Coroutines
```csharp
// Start coroutine
StartCoroutine(MyCoroutine());
StartCoroutine(DelayedAction(2f));

// Coroutine examples
IEnumerator MyCoroutine()
{
    yield return null;                              // Wait one frame
    yield return new WaitForSeconds(2f);            // Wait 2 seconds
    yield return new WaitForFixedUpdate();          // Wait for physics update
    yield return new WaitUntil(() => condition);    // Wait until condition true
    yield return StartCoroutine(OtherCoroutine());  // Wait for other coroutine
}

// Stop coroutine
StopCoroutine(myCoroutine);
StopAllCoroutines();
```

### Instantiate & Destroy
```csharp
// Instantiate
GameObject obj = Instantiate(prefab);
GameObject obj = Instantiate(prefab, position, rotation);
GameObject obj = Instantiate(prefab, parent);

// Destroy
Destroy(gameObject);
Destroy(gameObject, 2f);  // Destroy after 2 seconds
DestroyImmediate(gameObject);  // Immediate (use sparingly!)
```

---

## Physics Cheat Sheet

### Collision Detection
```csharp
// Collision (requires Rigidbody on one object)
private void OnCollisionEnter(Collision collision)
{
    Debug.Log($"Hit: {collision.gameObject.name}");
    ContactPoint contact = collision.contacts[0];
    Vector3 hitPoint = contact.point;
    Vector3 hitNormal = contact.normal;
}

private void OnCollisionStay(Collision collision) { }
private void OnCollisionExit(Collision collision) { }

// Trigger (requires "Is Trigger" checked)
private void OnTriggerEnter(Collider other)
{
    if (other.CompareTag("Player"))
    {
        // Do something
    }
}

private void OnTriggerStay(Collider other) { }
private void OnTriggerExit(Collider other) { }
```

### Raycasting
```csharp
// Simple raycast
if (Physics.Raycast(origin, direction, out RaycastHit hit, maxDistance))
{
    Debug.Log($"Hit: {hit.collider.name} at {hit.point}");
}

// Raycast with layer mask
LayerMask mask = LayerMask.GetMask("Ground", "Enemy");
if (Physics.Raycast(origin, direction, out hit, maxDistance, mask))
{
    // Hit something on Ground or Enemy layer
}

// Raycast all
RaycastHit[] hits = Physics.RaycastAll(origin, direction, maxDistance);
foreach (var hit in hits)
{
    Debug.Log(hit.collider.name);
}

// Sphere cast (thick raycast)
if (Physics.SphereCast(origin, radius, direction, out hit, maxDistance))
{
    // Hit something
}
```

---

## Vector Math Quick Reference

```csharp
// Common vectors
Vector3.zero        // (0, 0, 0)
Vector3.one         // (1, 1, 1)
Vector3.up          // (0, 1, 0)
Vector3.down        // (0, -1, 0)
Vector3.left        // (-1, 0, 0)
Vector3.right       // (1, 0, 0)
Vector3.forward     // (0, 0, 1)
Vector3.back        // (0, 0, -1)

// Operations
Vector3 sum = a + b;                    // Addition
Vector3 diff = a - b;                   // Subtraction
Vector3 scaled = a * 2f;                // Scalar multiplication
float distance = Vector3.Distance(a, b); // Distance between points
Vector3 direction = (b - a).normalized;  // Direction from a to b
float dot = Vector3.Dot(a, b);          // Dot product
Vector3 cross = Vector3.Cross(a, b);    // Cross product
Vector3 lerp = Vector3.Lerp(a, b, t);   // Linear interpolation
Vector3 slerp = Vector3.Slerp(a, b, t); // Spherical interpolation
```

---

## Debugging Tips

```csharp
// Console logging
Debug.Log("Normal message");
Debug.LogWarning("Warning message");
Debug.LogError("Error message");
Debug.Log($"Value: {variable}");  // String interpolation

// Conditional logging
Debug.Assert(condition, "Assertion failed!");

// Draw debug lines (visible in Scene view)
Debug.DrawLine(start, end, Color.red, duration);
Debug.DrawRay(origin, direction, Color.green, duration);

// Gizmos (visible in Scene view)
private void OnDrawGizmos()
{
    Gizmos.color = Color.yellow;
    Gizmos.DrawSphere(transform.position, 0.5f);
    Gizmos.DrawWireCube(transform.position, Vector3.one);
    Gizmos.DrawLine(start, end);
}

// Conditional compilation
#if UNITY_EDITOR
    Debug.Log("This only runs in editor");
#endif

#if DEVELOPMENT_BUILD
    Debug.Log("This only runs in development builds");
#endif
```

---

## Performance Optimization

### Do's ✅
- Cache component references in Awake()
- Use object pooling for frequently spawned objects
- Use FixedUpdate() for physics
- Use CompareTag() instead of tag == "string"
- Disable unused components
- Use static batching for static objects
- Bake lighting when possible

### Don'ts ❌
- Don't use Find() or FindObjectOfType() in Update()
- Don't use Camera.main in Update() (cache it!)
- Don't instantiate/destroy every frame
- Don't use SendMessage() (use events instead)
- Don't allocate memory in Update() (use object pools)
- Don't use string concatenation in loops (use StringBuilder)

---

## Common Attributes

```csharp
[SerializeField]                    // Show private field in Inspector
[HideInInspector]                   // Hide public field from Inspector
[Header("Section Name")]            // Add header in Inspector
[Tooltip("Description")]            // Add tooltip on hover
[Range(0f, 10f)]                    // Add slider in Inspector
[RequireComponent(typeof(Rigidbody))] // Auto-add required component
[ExecuteInEditMode]                 // Run in Edit mode
[DisallowMultipleComponent]         // Prevent multiple instances
[ContextMenu("Method Name")]        // Add right-click menu option
```

---

## Layer Mask Operations

```csharp
// Get layer mask by name
LayerMask mask = LayerMask.GetMask("Ground", "Enemy");

// Check if layer is in mask
bool isInMask = ((1 << gameObject.layer) & mask) != 0;

// Add layer to mask
mask |= (1 << LayerMask.NameToLayer("Player"));

// Remove layer from mask
mask &= ~(1 << LayerMask.NameToLayer("Player"));

// Invert mask
mask = ~mask;
```

---

## Time & Delta Time

```csharp
Time.time               // Time since game started
Time.deltaTime          // Time since last frame (use in Update)
Time.fixedDeltaTime     // Fixed time step (use in FixedUpdate)
Time.timeScale          // Game speed multiplier (1 = normal, 0 = paused)
Time.realtimeSinceStartup // Unscaled time since startup
```

---

## String Formatting

```csharp
// String interpolation (modern, preferred)
string message = $"Health: {health}/{maxHealth}";

// String.Format (older style)
string message = string.Format("Health: {0}/{1}", health, maxHealth);

// Concatenation (avoid in loops!)
string message = "Health: " + health + "/" + maxHealth;

// StringBuilder (use in loops)
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 100; i++)
{
    sb.Append(i);
}
string result = sb.ToString();
```

---

## Useful Extensions

```csharp
// Add these to a static class for reusability
public static class Extensions
{
    // Check if layer is in mask
    public static bool IsInLayerMask(this GameObject obj, LayerMask mask)
    {
        return ((1 << obj.layer) & mask) != 0;
    }
    
    // Get or add component
    public static T GetOrAddComponent<T>(this GameObject obj) where T : Component
    {
        T component = obj.GetComponent<T>();
        if (component == null)
            component = obj.AddComponent<T>();
        return component;
    }
    
    // Destroy all children
    public static void DestroyChildren(this Transform transform)
    {
        foreach (Transform child in transform)
        {
            Object.Destroy(child.gameObject);
        }
    }
}
```

---

This quick reference covers the most commonly used Unity patterns and APIs. Keep it handy while coding!
