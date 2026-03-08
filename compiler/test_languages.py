"""
Test script to verify all language compilers are working correctly.
Run this after building the Docker container.
"""

import requests
import json

BASE_URL = "http://localhost:8001"

def test_language(language: str, code: str, expected_output: str = None):
    """Test a specific language"""
    print(f"\n{'='*60}")
    print(f"Testing {language.upper()}")
    print(f"{'='*60}")
    
    try:
        response = requests.post(
            f"{BASE_URL}/execute",
            json={"code": code, "language": language, "timeout": 10},
            timeout=15
        )
        
        if response.status_code == 200:
            result = response.json()
            print(f"✓ Status: SUCCESS")
            print(f"Output:\n{result['output']}")
            if result['error']:
                print(f"Errors:\n{result['error']}")
            print(f"Execution Time: {result['execution_time']:.3f}s")
            
            if expected_output and expected_output in result['output']:
                print(f"✓ Output matches expected")
            
            return True
        else:
            print(f"✗ Status: FAILED (HTTP {response.status_code})")
            print(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"✗ Exception: {str(e)}")
        return False


def main():
    print("="*60)
    print("MULTI-LANGUAGE COMPILER TEST SUITE")
    print("="*60)
    
    # Check if server is running
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=5)
        if response.status_code == 200:
            print("✓ Compiler server is running")
        else:
            print("✗ Compiler server returned unexpected status")
            return
    except Exception as e:
        print(f"✗ Cannot connect to compiler server: {e}")
        print("Make sure the server is running on http://localhost:8001")
        return
    
    results = {}
    
    # Test Python
    python_code = """
import numpy as np
print("Hello from Python!")
arr = np.array([1, 2, 3, 4, 5])
print(f"Array sum: {arr.sum()}")
"""
    results['Python'] = test_language('python', python_code, "Hello from Python!")
    
    # Test Java
    java_code = """
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from Java!");
        int[] numbers = {1, 2, 3, 4, 5};
        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }
        System.out.println("Sum: " + sum);
    }
}
"""
    results['Java'] = test_language('java', java_code, "Hello from Java!")
    
    # Test C#
    csharp_code = """
using System;
using System.Linq;

Console.WriteLine("Hello from C#!");
var numbers = new[] { 1, 2, 3, 4, 5 };
var sum = numbers.Sum();
Console.WriteLine($"Sum: {sum}");
"""
    results['C#'] = test_language('csharp', csharp_code, "Hello from C#!")
    
    # Test JavaScript
    javascript_code = """
console.log("Hello from JavaScript!");
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((a, b) => a + b, 0);
console.log(`Sum: ${sum}`);
"""
    results['JavaScript'] = test_language('javascript', javascript_code, "Hello from JavaScript!")
    
    # Test TypeScript
    typescript_code = """
interface Person {
    name: string;
    age: number;
}

const greet = (person: Person): string => {
    return `Hello, ${person.name}!`;
};

const user: Person = { name: "TypeScript", age: 5 };
console.log(greet(user));

const numbers: number[] = [1, 2, 3, 4, 5];
const sum: number = numbers.reduce((a, b) => a + b, 0);
console.log(`Sum: ${sum}`);
"""
    results['TypeScript'] = test_language('typescript', typescript_code, "Hello, TypeScript!")
    
    # Summary
    print(f"\n{'='*60}")
    print("TEST SUMMARY")
    print(f"{'='*60}")
    
    passed = sum(1 for v in results.values() if v)
    total = len(results)
    
    for lang, success in results.items():
        status = "✓ PASS" if success else "✗ FAIL"
        print(f"{lang:15} {status}")
    
    print(f"\nTotal: {passed}/{total} tests passed")
    
    if passed == total:
        print("\n🎉 All tests passed! Multi-language support is working correctly.")
    else:
        print(f"\n⚠️  {total - passed} test(s) failed. Check the logs above for details.")


if __name__ == "__main__":
    main()
