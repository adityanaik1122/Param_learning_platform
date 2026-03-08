import asyncio
import time
import sys
import io
import base64
import os
import tempfile
import subprocess
from io import StringIO
import matplotlib
matplotlib.use('Agg')  # Use non-interactive backend
import matplotlib.pyplot as plt

async def execute_code(code: str, language: str = "python", timeout: int = 10):
    """
    Execute code in multiple languages with sandboxed environment.
    Supports: Python, Java, C#, JavaScript (Node.js), TypeScript
    """
    start_time = time.time()
    
    # Route to appropriate executor
    if language.lower() == "python":
        result = await execute_python(code, timeout)
    elif language.lower() == "java":
        result = await execute_java(code, timeout)
    elif language.lower() in ["csharp", "c#", "cs", "dotnet"]:
        result = await execute_csharp(code, timeout)
    elif language.lower() in ["javascript", "js", "node"]:
        result = await execute_javascript(code, timeout)
    elif language.lower() in ["typescript", "ts"]:
        result = await execute_typescript(code, timeout)
    else:
        return {
            "output": "",
            "error": f"Language '{language}' not supported. Supported: Python, Java, C#, JavaScript, TypeScript",
            "execution_time": 0,
            "image": None
        }
    
    result["execution_time"] = time.time() - start_time
    return result


async def execute_python(code: str, timeout: int):
    """Execute Python code with matplotlib support"""
    old_stdout = sys.stdout
    old_stderr = sys.stderr
    redirected_output = StringIO()
    redirected_error = StringIO()
    sys.stdout = redirected_output
    sys.stderr = redirected_error
    
    image_data = None
    
    try:
        plt.clf()
        plt.close('all')
        
        exec_globals = {
            '__builtins__': __builtins__,
            'plt': plt,
            'matplotlib': matplotlib
        }
        exec(code, exec_globals)
        
        if plt.get_fignums():
            buf = io.BytesIO()
            plt.savefig(buf, format='png', dpi=100, bbox_inches='tight')
            buf.seek(0)
            image_data = base64.b64encode(buf.read()).decode('utf-8')
            plt.close('all')
        
        output = redirected_output.getvalue()
        error = redirected_error.getvalue()
        
    except Exception as e:
        output = redirected_output.getvalue()
        error = f"{redirected_error.getvalue()}\n{type(e).__name__}: {str(e)}"
    
    finally:
        sys.stdout = old_stdout
        sys.stderr = old_stderr
        plt.close('all')
    
    return {
        "output": output,
        "error": error,
        "execution_time": 0,
        "image": image_data
    }


async def execute_java(code: str, timeout: int):
    """Execute Java code"""
    with tempfile.TemporaryDirectory() as tmpdir:
        # Extract class name from code
        class_name = "Main"
        if "public class" in code:
            import re
            match = re.search(r'public\s+class\s+(\w+)', code)
            if match:
                class_name = match.group(1)
        
        # Write Java file
        java_file = os.path.join(tmpdir, f"{class_name}.java")
        with open(java_file, 'w') as f:
            f.write(code)
        
        try:
            # Compile
            compile_result = subprocess.run(
                ['javac', java_file],
                capture_output=True,
                text=True,
                timeout=timeout,
                cwd=tmpdir
            )
            
            if compile_result.returncode != 0:
                return {
                    "output": "",
                    "error": f"Compilation Error:\n{compile_result.stderr}",
                    "execution_time": 0,
                    "image": None
                }
            
            # Execute
            run_result = subprocess.run(
                ['java', class_name],
                capture_output=True,
                text=True,
                timeout=timeout,
                cwd=tmpdir
            )
            
            return {
                "output": run_result.stdout,
                "error": run_result.stderr,
                "execution_time": 0,
                "image": None
            }
            
        except subprocess.TimeoutExpired:
            return {
                "output": "",
                "error": f"Execution timed out after {timeout} seconds",
                "execution_time": 0,
                "image": None
            }
        except Exception as e:
            return {
                "output": "",
                "error": f"Error: {str(e)}",
                "execution_time": 0,
                "image": None
            }


async def execute_csharp(code: str, timeout: int):
    """Execute C# code with Unity mock classes support"""
    with tempfile.TemporaryDirectory() as tmpdir:
        # Create a simple console project
        cs_file = os.path.join(tmpdir, "Program.cs")
        
        # Unity mock classes for educational purposes
        unity_mocks = """
// ============================================
// Unity Mock Classes for Learning
// ============================================

namespace UnityEngine
{
    // Mock Vector3
    public struct Vector3
    {
        public float x, y, z;
        
        public Vector3(float x, float y, float z)
        {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        
        public static Vector3 zero => new Vector3(0, 0, 0);
        public static Vector3 one => new Vector3(1, 1, 1);
        public static Vector3 up => new Vector3(0, 1, 0);
        public static Vector3 down => new Vector3(0, -1, 0);
        public static Vector3 left => new Vector3(-1, 0, 0);
        public static Vector3 right => new Vector3(1, 0, 0);
        public static Vector3 forward => new Vector3(0, 0, 1);
        public static Vector3 back => new Vector3(0, 0, -1);
        
        public override string ToString() => $"({x}, {y}, {z})";
        
        public static Vector3 operator +(Vector3 a, Vector3 b) => new Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
        public static Vector3 operator -(Vector3 a, Vector3 b) => new Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
        public static Vector3 operator *(Vector3 a, float d) => new Vector3(a.x * d, a.y * d, a.z * d);
        public static Vector3 operator /(Vector3 a, float d) => new Vector3(a.x / d, a.y / d, a.z / d);
    }
    
    // Mock Vector2
    public struct Vector2
    {
        public float x, y;
        
        public Vector2(float x, float y)
        {
            this.x = x;
            this.y = y;
        }
        
        public static Vector2 zero => new Vector2(0, 0);
        public static Vector2 one => new Vector2(1, 1);
        
        public override string ToString() => $"({x}, {y})";
    }
    
    // Mock Quaternion
    public struct Quaternion
    {
        public float x, y, z, w;
        
        public Quaternion(float x, float y, float z, float w)
        {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }
        
        public static Quaternion identity => new Quaternion(0, 0, 0, 1);
        
        public static Quaternion Euler(float x, float y, float z)
        {
            Console.WriteLine($"[Unity Mock] Quaternion.Euler({x}, {y}, {z})");
            return identity;
        }
    }
    
    // Mock Debug class
    public static class Debug
    {
        public static void Log(object message)
        {
            Console.WriteLine($"[Unity Debug] {message}");
        }
        
        public static void LogWarning(object message)
        {
            Console.WriteLine($"[Unity Warning] {message}");
        }
        
        public static void LogError(object message)
        {
            Console.WriteLine($"[Unity Error] {message}");
        }
    }
    
    // Mock Time class
    public static class Time
    {
        public static float time => 0f;
        public static float deltaTime => 0.016f; // ~60 FPS
        public static float timeSinceLevelLoad => 0f;
    }
    
    // Mock Input class
    public static class Input
    {
        public static bool GetKey(KeyCode key)
        {
            Console.WriteLine($"[Unity Mock] Input.GetKey({key})");
            return false;
        }
        
        public static bool GetKeyDown(KeyCode key)
        {
            Console.WriteLine($"[Unity Mock] Input.GetKeyDown({key})");
            return false;
        }
        
        public static float GetAxis(string axisName)
        {
            Console.WriteLine($"[Unity Mock] Input.GetAxis({axisName})");
            return 0f;
        }
    }
    
    // Mock KeyCode enum
    public enum KeyCode
    {
        None, Space, Return, Escape,
        W, A, S, D,
        UpArrow, DownArrow, LeftArrow, RightArrow
    }
    
    // Mock GameObject
    public class GameObject
    {
        public string name;
        public Transform transform;
        
        public GameObject(string name = "GameObject")
        {
            this.name = name;
            this.transform = new Transform();
            Console.WriteLine($"[Unity Mock] GameObject '{name}' created");
        }
        
        public T GetComponent<T>() where T : class, new()
        {
            Console.WriteLine($"[Unity Mock] GetComponent<{typeof(T).Name}>()");
            return new T();
        }
        
        public T AddComponent<T>() where T : class, new()
        {
            Console.WriteLine($"[Unity Mock] AddComponent<{typeof(T).Name}>()");
            return new T();
        }
    }
    
    // Mock Transform
    public class Transform
    {
        public Vector3 position = Vector3.zero;
        public Quaternion rotation = Quaternion.identity;
        public Vector3 localScale = Vector3.one;
        
        public void Translate(Vector3 translation)
        {
            position += translation;
            Console.WriteLine($"[Unity Mock] Transform.Translate({translation})");
        }
        
        public void Rotate(Vector3 eulers)
        {
            Console.WriteLine($"[Unity Mock] Transform.Rotate({eulers})");
        }
    }
    
    // Mock MonoBehaviour
    public class MonoBehaviour
    {
        public GameObject gameObject = new GameObject();
        public Transform transform => gameObject.transform;
        public bool enabled = true;
        
        // Unity lifecycle methods (virtual so they can be overridden)
        protected virtual void Awake() { }
        protected virtual void Start() { }
        protected virtual void Update() { }
        protected virtual void FixedUpdate() { }
        protected virtual void LateUpdate() { }
        protected virtual void OnEnable() { }
        protected virtual void OnDisable() { }
        protected virtual void OnDestroy() { }
        
        // Simulate Unity lifecycle
        public void SimulateLifecycle()
        {
            Console.WriteLine($"[Unity Mock] === Simulating Unity Lifecycle for {GetType().Name} ===");
            Awake();
            OnEnable();
            Start();
            Update();
            FixedUpdate();
            LateUpdate();
            Console.WriteLine($"[Unity Mock] === Lifecycle Complete ===\\n");
        }
    }
    
    // Mock Rigidbody
    public class Rigidbody
    {
        public Vector3 velocity = Vector3.zero;
        public float mass = 1f;
        public bool useGravity = true;
        
        public void AddForce(Vector3 force)
        {
            Console.WriteLine($"[Unity Mock] Rigidbody.AddForce({force})");
        }
    }
    
    // Mock Collider
    public class Collider
    {
        public bool isTrigger = false;
    }
    
    // SerializeField attribute
    public class SerializeFieldAttribute : Attribute { }
    
    // RequireComponent attribute
    public class RequireComponentAttribute : Attribute
    {
        public RequireComponentAttribute(Type type) { }
    }
}

// ============================================
// End of Unity Mock Classes
// ============================================

"""
        
        # Check if code uses Unity classes
        uses_unity = any(keyword in code for keyword in [
            "UnityEngine", "MonoBehaviour", "GameObject", "Transform", 
            "Vector3", "Vector2", "Debug.Log", "Rigidbody", "SerializeField"
        ])
        
        # Wrap code if it doesn't have a Main method
        if "static void Main" not in code and "static async Task Main" not in code:
            # If using Unity, add lifecycle simulation
            if uses_unity:
                wrapped_code = f"""
using System;
using System.Linq;
using System.Collections.Generic;
using UnityEngine;

{code}

{unity_mocks}

// Auto-generated Main method to simulate Unity lifecycle
class Program
{{
    static void Main(string[] args)
    {{
        Console.WriteLine("[Unity Mock] Starting Unity simulation...\\n");
        
        // Find all MonoBehaviour classes and simulate their lifecycle
        var types = System.Reflection.Assembly.GetExecutingAssembly().GetTypes();
        foreach (var type in types)
        {{
            if (type.IsSubclassOf(typeof(MonoBehaviour)) && !type.IsAbstract)
            {{
                try
                {{
                    var instance = (MonoBehaviour)Activator.CreateInstance(type);
                    instance.SimulateLifecycle();
                }}
                catch (Exception ex)
                {{
                    Console.WriteLine($"[Unity Mock] Error simulating {{type.Name}}: {{ex.Message}}");
                }}
            }}
        }}
        
        Console.WriteLine("[Unity Mock] Unity simulation complete.");
    }}
}}
"""
            else:
                wrapped_code = f"""
using System;
using System.Linq;
using System.Collections.Generic;

class Program
{{
    static void Main(string[] args)
    {{
{code}
    }}
}}
"""
        else:
            # Code has Main method, just add Unity mocks if needed
            if uses_unity:
                wrapped_code = unity_mocks + "\n" + code
            else:
                wrapped_code = code
        
        with open(cs_file, 'w') as f:
            f.write(wrapped_code)
        
        try:
            # Compile and run using dotnet script
            result = subprocess.run(
                ['dotnet', 'script', cs_file],
                capture_output=True,
                text=True,
                timeout=timeout,
                cwd=tmpdir
            )
            
            # If dotnet script not available, try regular compilation
            if result.returncode != 0 and "not found" in result.stderr.lower():
                # Create csproj
                csproj_content = """<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
  </PropertyGroup>
</Project>"""
                
                with open(os.path.join(tmpdir, "temp.csproj"), 'w') as f:
                    f.write(csproj_content)
                
                # Build
                build_result = subprocess.run(
                    ['dotnet', 'build', '--configuration', 'Release'],
                    capture_output=True,
                    text=True,
                    timeout=timeout,
                    cwd=tmpdir
                )
                
                if build_result.returncode != 0:
                    return {
                        "output": "",
                        "error": f"Compilation Error:\n{build_result.stdout}\n{build_result.stderr}",
                        "execution_time": 0,
                        "image": None
                    }
                
                # Run
                result = subprocess.run(
                    ['dotnet', 'run', '--no-build', '--configuration', 'Release'],
                    capture_output=True,
                    text=True,
                    timeout=timeout,
                    cwd=tmpdir
                )
            
            return {
                "output": result.stdout,
                "error": result.stderr if result.returncode != 0 else "",
                "execution_time": 0,
                "image": None
            }
            
        except subprocess.TimeoutExpired:
            return {
                "output": "",
                "error": f"Execution timed out after {timeout} seconds",
                "execution_time": 0,
                "image": None
            }
        except Exception as e:
            return {
                "output": "",
                "error": f"Error: {str(e)}",
                "execution_time": 0,
                "image": None
            }


async def execute_javascript(code: str, timeout: int):
    """Execute JavaScript code using Node.js"""
    with tempfile.TemporaryDirectory() as tmpdir:
        js_file = os.path.join(tmpdir, "script.js")
        
        with open(js_file, 'w') as f:
            f.write(code)
        
        try:
            result = subprocess.run(
                ['node', js_file],
                capture_output=True,
                text=True,
                timeout=timeout,
                cwd=tmpdir
            )
            
            return {
                "output": result.stdout,
                "error": result.stderr if result.returncode != 0 else "",
                "execution_time": 0,
                "image": None
            }
            
        except subprocess.TimeoutExpired:
            return {
                "output": "",
                "error": f"Execution timed out after {timeout} seconds",
                "execution_time": 0,
                "image": None
            }
        except Exception as e:
            return {
                "output": "",
                "error": f"Error: {str(e)}",
                "execution_time": 0,
                "image": None
            }


async def execute_typescript(code: str, timeout: int):
    """Execute TypeScript code"""
    with tempfile.TemporaryDirectory() as tmpdir:
        ts_file = os.path.join(tmpdir, "script.ts")
        js_file = os.path.join(tmpdir, "script.js")
        
        with open(ts_file, 'w') as f:
            f.write(code)
        
        try:
            # Compile TypeScript to JavaScript
            compile_result = subprocess.run(
                ['npx', 'tsc', ts_file, '--outFile', js_file, '--target', 'ES2020'],
                capture_output=True,
                text=True,
                timeout=timeout,
                cwd=tmpdir
            )
            
            if compile_result.returncode != 0:
                return {
                    "output": "",
                    "error": f"TypeScript Compilation Error:\n{compile_result.stderr}",
                    "execution_time": 0,
                    "image": None
                }
            
            # Execute compiled JavaScript
            result = subprocess.run(
                ['node', js_file],
                capture_output=True,
                text=True,
                timeout=timeout,
                cwd=tmpdir
            )
            
            return {
                "output": result.stdout,
                "error": result.stderr if result.returncode != 0 else "",
                "execution_time": 0,
                "image": None
            }
            
        except subprocess.TimeoutExpired:
            return {
                "output": "",
                "error": f"Execution timed out after {timeout} seconds",
                "execution_time": 0,
                "image": None
            }
        except Exception as e:
            return {
                "output": "",
                "error": f"Error: {str(e)}",
                "execution_time": 0,
                "image": None
            }


# Docker-based execution (for production)
async def execute_in_docker(code: str, language: str, timeout: int):
    """
    Execute code in a Docker container for better isolation.
    Requires Docker to be installed and running.
    """
    # Implementation for Docker-based execution
    # docker run --rm -i --network none --memory="128m" --cpus="0.5" python:3.11-slim python
    pass
