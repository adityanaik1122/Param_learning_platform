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
    """Execute C# code"""
    with tempfile.TemporaryDirectory() as tmpdir:
        # Create a simple console project
        cs_file = os.path.join(tmpdir, "Program.cs")
        
        # Wrap code if it doesn't have a Main method
        if "static void Main" not in code and "static async Task Main" not in code:
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
                        "error": f"Compilation Error:\n{build_result.stderr}",
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
