# Unity C# Support - Quick Start

## ⚡ 3-Step Setup

### 1. Start Compiler
```bash
cd compiler
python main.py
```
Server runs on `http://localhost:8001`

### 2. Test It Works
```bash
python test_unity_mock.py
```
Should see Unity mock messages ✅

### 3. Use in Platform
Select "C#" language and write Unity code!

## 📝 Example Code

```csharp
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    [SerializeField] private float speed = 5f;
    
    private void Start()
    {
        Debug.Log("Player initialized!");
    }
    
    private void Update()
    {
        Vector3 movement = Vector3.forward * speed * Time.deltaTime;
        transform.Translate(movement);
        Debug.Log($"Position: {transform.position}");
    }
}
```

## ✅ What Works

- `MonoBehaviour` lifecycle (Awake, Start, Update, etc.)
- `Debug.Log()` / `LogWarning()` / `LogError()`
- `Vector3` / `Vector2` math
- `GameObject` / `Transform`
- `[SerializeField]` attribute
- `Time.deltaTime`
- `Input.GetKey()` (mocked)

## ❌ What Doesn't

- Actual rendering
- Real physics
- Coroutines
- Asset loading
- Real input detection

## 🎯 Purpose

**Learning tool** for Unity C# syntax, not a Unity replacement!

## 📚 Full Docs

- `compiler/UNITY_MOCK_SUPPORT.md` - Complete guide
- `UNITY_MOCK_SETUP.md` - Detailed setup
- `UNITY_SUPPORT_COMPLETE.md` - Technical details

## 🐛 Troubleshooting

**Compiler not starting?**
```bash
cd compiler
pip install -r requirements.txt
python main.py
```

**Code not compiling?**
- Check `using UnityEngine;` at top
- Inherit from `MonoBehaviour`
- Use `private void` for lifecycle methods

**No output?**
- Make sure compiler is running
- Check browser console for errors
- Verify endpoint is `http://localhost:8001/execute`

## 🎉 You're Ready!

Your students can now write and run Unity C# code!
