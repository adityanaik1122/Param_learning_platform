"""
Test Unity mock support in the compiler
"""

import requests
import json

BASE_URL = "http://localhost:8001"

def test_unity_code():
    """Test Unity C# code with mock classes"""
    
    unity_code = """
using UnityEngine;

public class Chapter10Exercise : MonoBehaviour
{
    [SerializeField] private bool baselineValidated = false;
    [SerializeField] private bool extensionImplemented = false;
    [SerializeField] private bool testLogCompleted = false;
    
    private void Start()
    {
        Debug.Log("Run chapter baseline and implement extension.");
    }
}
"""
    
    print("="*60)
    print("Testing Unity C# Mock Support")
    print("="*60)
    
    try:
        response = requests.post(
            f"{BASE_URL}/execute",
            json={"code": unity_code, "language": "csharp", "timeout": 15},
            timeout=20
        )
        
        if response.status_code == 200:
            result = response.json()
            print("\n✓ SUCCESS!")
            print("\nOutput:")
            print(result['output'])
            if result['error']:
                print("\nErrors:")
                print(result['error'])
            print(f"\nExecution Time: {result['execution_time']:.3f}s")
        else:
            print(f"\n✗ FAILED (HTTP {response.status_code})")
            print(f"Response: {response.text}")
            
    except Exception as e:
        print(f"\n✗ Exception: {str(e)}")
        print("\nMake sure the compiler service is running:")
        print("  cd compiler")
        print("  python main.py")


def test_vector_math():
    """Test Unity Vector3 operations"""
    
    vector_code = """
using UnityEngine;

public class VectorTest : MonoBehaviour
{
    private void Start()
    {
        Vector3 a = new Vector3(1, 2, 3);
        Vector3 b = new Vector3(4, 5, 6);
        
        Debug.Log($"Vector A: {a}");
        Debug.Log($"Vector B: {b}");
        Debug.Log($"A + B: {a + b}");
        Debug.Log($"A * 2: {a * 2}");
        
        Debug.Log($"Forward: {Vector3.forward}");
        Debug.Log($"Up: {Vector3.up}");
    }
}
"""
    
    print("\n" + "="*60)
    print("Testing Unity Vector Math")
    print("="*60)
    
    try:
        response = requests.post(
            f"{BASE_URL}/execute",
            json={"code": vector_code, "language": "csharp", "timeout": 15},
            timeout=20
        )
        
        if response.status_code == 200:
            result = response.json()
            print("\n✓ SUCCESS!")
            print("\nOutput:")
            print(result['output'])
        else:
            print(f"\n✗ FAILED")
            
    except Exception as e:
        print(f"\n✗ Exception: {str(e)}")


if __name__ == "__main__":
    # Check if server is running
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=5)
        if response.status_code == 200:
            print("✓ Compiler server is running\n")
        else:
            print("✗ Compiler server returned unexpected status\n")
    except Exception as e:
        print("✗ Cannot connect to compiler server")
        print("Please start the server first:")
        print("  cd compiler")
        print("  python main.py")
        print()
        exit(1)
    
    # Run tests
    test_unity_code()
    test_vector_math()
    
    print("\n" + "="*60)
    print("Unity Mock Testing Complete!")
    print("="*60)
