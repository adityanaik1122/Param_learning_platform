# Multi-Language Compiler Support

## Overview
The Param Learning compiler now supports multiple programming languages for code execution in a sandboxed environment.

## Supported Languages

### 1. Python
- **Language Code**: `python`
- **Features**: Full Python 3.11 support with scientific libraries
- **Libraries**: NumPy, Pandas, Matplotlib, Scikit-learn, PyTorch, TensorFlow
- **Special**: Matplotlib plot visualization support

**Example:**
```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.plot(x, y)
plt.title('Sine Wave')
plt.show()

print("Plot generated!")
```

### 2. Java
- **Language Code**: `java`
- **Version**: OpenJDK 17
- **Features**: Full Java SE support

**Example:**
```java
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
```

### 3. C# (.NET)
- **Language Code**: `csharp`, `c#`, `cs`, or `dotnet`
- **Version**: .NET 8.0
- **Features**: Full .NET SDK support

**Example:**
```csharp
using System;
using System.Linq;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Hello from C#!");
        
        var numbers = new[] { 1, 2, 3, 4, 5 };
        var sum = numbers.Sum();
        Console.WriteLine($"Sum: {sum}");
    }
}
```

**Simplified (auto-wrapped):**
```csharp
Console.WriteLine("Hello from C#!");
var numbers = new[] { 1, 2, 3, 4, 5 };
var sum = numbers.Sum();
Console.WriteLine($"Sum: {sum}");
```

### 4. JavaScript (Node.js)
- **Language Code**: `javascript`, `js`, or `node`
- **Version**: Node.js 20.x LTS
- **Features**: Full ES2020+ support

**Example:**
```javascript
console.log("Hello from JavaScript!");

const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((a, b) => a + b, 0);
console.log(`Sum: ${sum}`);

// Async/await support
async function fetchData() {
    return "Data fetched!";
}

fetchData().then(console.log);
```

### 5. TypeScript
- **Language Code**: `typescript` or `ts`
- **Version**: Latest TypeScript compiler
- **Features**: Full TypeScript support with type checking

**Example:**
```typescript
interface Person {
    name: string;
    age: number;
}

const greet = (person: Person): string => {
    return `Hello, ${person.name}! You are ${person.age} years old.`;
};

const user: Person = { name: "Alice", age: 25 };
console.log(greet(user));

const numbers: number[] = [1, 2, 3, 4, 5];
const sum: number = numbers.reduce((a, b) => a + b, 0);
console.log(`Sum: ${sum}`);
```

## API Usage

### Execute Code Endpoint

**POST** `/execute`

**Request Body:**
```json
{
    "code": "console.log('Hello World!');",
    "language": "javascript",
    "timeout": 10
}
```

**Response:**
```json
{
    "output": "Hello World!\n",
    "error": "",
    "execution_time": 0.123,
    "image": null
}
```

### Language Codes

| Language | Accepted Codes |
|----------|---------------|
| Python | `python` |
| Java | `java` |
| C# | `csharp`, `c#`, `cs`, `dotnet` |
| JavaScript | `javascript`, `js`, `node` |
| TypeScript | `typescript`, `ts` |

## Security Features

1. **Timeout Protection**: All executions have configurable timeout (default 10s)
2. **Temporary Files**: Code is executed in temporary directories that are cleaned up
3. **Process Isolation**: Each execution runs in a separate process
4. **Resource Limits**: Can be configured via Docker (memory, CPU limits)

## Docker Setup

### Build the Image
```bash
cd compiler
docker build -t param-learning-compiler .
```

### Run the Container
```bash
docker run -d \
  --name compiler \
  -p 8001:8000 \
  --memory="2g" \
  --cpus="1.0" \
  param-learning-compiler
```

### With Docker Compose
```yaml
services:
  compiler:
    build: ./compiler
    ports:
      - "8001:8000"
    environment:
      - DOTNET_CLI_TELEMETRY_OPTOUT=1
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: '1.0'
```

## Frontend Integration

### Update Language Selector

```typescript
const languages = [
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' }
];
```

### Execute Code

```typescript
const executeCode = async (code: string, language: string) => {
  const response = await fetch('http://localhost:8001/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, language, timeout: 10 })
  });
  
  const result = await response.json();
  return result;
};
```

## Monaco Editor Language Support

Update Monaco Editor configuration for syntax highlighting:

```typescript
const getMonacoLanguage = (lang: string): string => {
  const languageMap: Record<string, string> = {
    'python': 'python',
    'java': 'java',
    'csharp': 'csharp',
    'c#': 'csharp',
    'cs': 'csharp',
    'javascript': 'javascript',
    'js': 'javascript',
    'typescript': 'typescript',
    'ts': 'typescript'
  };
  return languageMap[lang.toLowerCase()] || 'plaintext';
};
```

## Performance Considerations

### Compilation Times
- **Python**: Instant (interpreted)
- **JavaScript**: Instant (interpreted)
- **TypeScript**: ~1-2s (compilation required)
- **Java**: ~2-3s (compilation required)
- **C#**: ~2-4s (compilation required)

### Optimization Tips
1. Cache compiled binaries for repeated executions
2. Use warm containers to reduce startup time
3. Implement request queuing for high load
4. Consider separate containers per language for better isolation

## Error Handling

### Compilation Errors
```json
{
    "output": "",
    "error": "Compilation Error:\nMain.java:5: error: ';' expected\n    System.out.println(\"Hello\")\n                                 ^\n1 error",
    "execution_time": 0.234,
    "image": null
}
```

### Runtime Errors
```json
{
    "output": "Starting execution...\n",
    "error": "TypeError: Cannot read property 'length' of undefined",
    "execution_time": 0.045,
    "image": null
}
```

### Timeout Errors
```json
{
    "output": "",
    "error": "Execution timed out after 10 seconds",
    "execution_time": 10.001,
    "image": null
}
```

## Future Enhancements

### Planned Language Support
- [ ] C/C++
- [ ] Go
- [ ] Rust
- [ ] Ruby
- [ ] PHP
- [ ] Kotlin
- [ ] Swift

### Planned Features
- [ ] Package/library installation support
- [ ] Multi-file project support
- [ ] Interactive input/output
- [ ] Debugging support
- [ ] Code linting and formatting
- [ ] Performance profiling
- [ ] Memory usage tracking

## Testing

### Test Python
```bash
curl -X POST http://localhost:8001/execute \
  -H "Content-Type: application/json" \
  -d '{"code": "print(\"Hello from Python!\")", "language": "python"}'
```

### Test Java
```bash
curl -X POST http://localhost:8001/execute \
  -H "Content-Type: application/json" \
  -d '{"code": "public class Main { public static void main(String[] args) { System.out.println(\"Hello from Java!\"); } }", "language": "java"}'
```

### Test JavaScript
```bash
curl -X POST http://localhost:8001/execute \
  -H "Content-Type: application/json" \
  -d '{"code": "console.log(\"Hello from JavaScript!\");", "language": "javascript"}'
```

### Test C#
```bash
curl -X POST http://localhost:8001/execute \
  -H "Content-Type: application/json" \
  -d '{"code": "Console.WriteLine(\"Hello from C#!\");", "language": "csharp"}'
```

### Test TypeScript
```bash
curl -X POST http://localhost:8001/execute \
  -H "Content-Type: application/json" \
  -d '{"code": "const message: string = \"Hello from TypeScript!\"; console.log(message);", "language": "typescript"}'
```

## Troubleshooting

### Java Not Found
```bash
# Check Java installation
docker exec -it compiler java -version
```

### .NET Not Found
```bash
# Check .NET installation
docker exec -it compiler dotnet --version
```

### Node.js Not Found
```bash
# Check Node.js installation
docker exec -it compiler node --version
```

### Permission Issues
Ensure the container has proper permissions to create temporary files:
```bash
docker run --user $(id -u):$(id -g) ...
```

## License
Same as main project license.
