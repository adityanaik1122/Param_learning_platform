# Multi-Language Compiler Setup Guide

## Quick Start

### Option 1: Docker (Recommended)

1. **Build the Docker image:**
```bash
cd compiler
docker build -t param-learning-compiler .
```

2. **Run the container:**
```bash
docker run -d \
  --name param-compiler \
  -p 8001:8000 \
  --memory="2g" \
  --cpus="1.0" \
  param-learning-compiler
```

3. **Test the setup:**
```bash
# Install requests if needed
pip install requests

# Run test suite
python test_languages.py
```

### Option 2: Local Development (Linux/Mac)

**Prerequisites:**
- Python 3.11+
- Java 17+
- .NET SDK 8.0+
- Node.js 20.x+

**Install Python dependencies:**
```bash
cd compiler
pip install -r requirements.txt
```

**Install Java (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install openjdk-17-jdk
```

**Install .NET SDK:**
```bash
wget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
sudo apt-get update
sudo apt-get install dotnet-sdk-8.0
```

**Install Node.js:**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Install TypeScript globally:**
```bash
npm install -g typescript
```

**Run the server:**
```bash
python main.py
# or
uvicorn main:app --host 0.0.0.0 --port 8001 --reload
```

### Option 3: Docker Compose

Create `docker-compose.yml` in your project root:

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/paramlearning
    depends_on:
      - db
      - compiler

  compiler:
    build: ./compiler
    ports:
      - "8001:8000"
    environment:
      - DOTNET_CLI_TELEMETRY_OPTOUT=1
      - DOTNET_SKIP_FIRST_TIME_EXPERIENCE=1
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: '1.0'
    restart: unless-stopped

  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=paramlearning
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

**Start all services:**
```bash
docker-compose up -d
```

## Verification

### 1. Check Server Health
```bash
curl http://localhost:8001/health
```

Expected response:
```json
{"status": "healthy"}
```

### 2. Test Python
```bash
curl -X POST http://localhost:8001/execute \
  -H "Content-Type: application/json" \
  -d '{
    "code": "print(\"Hello from Python!\")",
    "language": "python"
  }'
```

### 3. Test Java
```bash
curl -X POST http://localhost:8001/execute \
  -H "Content-Type: application/json" \
  -d '{
    "code": "public class Main { public static void main(String[] args) { System.out.println(\"Hello from Java!\"); } }",
    "language": "java"
  }'
```

### 4. Test JavaScript
```bash
curl -X POST http://localhost:8001/execute \
  -H "Content-Type: application/json" \
  -d '{
    "code": "console.log(\"Hello from JavaScript!\");",
    "language": "javascript"
  }'
```

### 5. Test C#
```bash
curl -X POST http://localhost:8001/execute \
  -H "Content-Type: application/json" \
  -d '{
    "code": "Console.WriteLine(\"Hello from C#!\");",
    "language": "csharp"
  }'
```

### 6. Test TypeScript
```bash
curl -X POST http://localhost:8001/execute \
  -H "Content-Type: application/json" \
  -d '{
    "code": "const message: string = \"Hello from TypeScript!\"; console.log(message);",
    "language": "typescript"
  }'
```

### 7. Run Full Test Suite
```bash
python test_languages.py
```

## Frontend Integration

### Update API Client

In `frontend/src/shared/api/axios.ts`, ensure the compiler client is configured:

```typescript
export const compilerClient = axios.create({
  baseURL: import.meta.env.VITE_COMPILER_API_URL || 'http://localhost:8001',
  timeout: 30000, // 30 seconds for compilation
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Update Environment Variables

In `frontend/.env`:
```env
VITE_COMPILER_API_URL=http://localhost:8001
```

### Add Language Selector to Learning Path

Update `LearningPath.tsx` to include language selection:

```typescript
const [selectedLanguage, setSelectedLanguage] = useState('python');

const languages = [
  { value: 'python', label: 'Python', icon: '🐍' },
  { value: 'java', label: 'Java', icon: '☕' },
  { value: 'csharp', label: 'C#', icon: '#️⃣' },
  { value: 'javascript', label: 'JavaScript', icon: '🟨' },
  { value: 'typescript', label: 'TypeScript', icon: '🔷' },
];

// In your JSX:
<select 
  value={selectedLanguage}
  onChange={(e) => setSelectedLanguage(e.target.value)}
  className="language-selector"
>
  {languages.map(lang => (
    <option key={lang.value} value={lang.value}>
      {lang.icon} {lang.label}
    </option>
  ))}
</select>
```

### Update Monaco Editor Language

```typescript
const getMonacoLanguage = (lang: string): string => {
  const map: Record<string, string> = {
    'python': 'python',
    'java': 'java',
    'csharp': 'csharp',
    'javascript': 'javascript',
    'typescript': 'typescript',
  };
  return map[lang] || 'python';
};

<Editor
  language={getMonacoLanguage(selectedLanguage)}
  value={code}
  onChange={(value) => setCode(value || '')}
  theme="vs-dark"
  options={{
    minimap: { enabled: false },
    fontSize: 14,
  }}
/>
```

## Troubleshooting

### Issue: Docker build fails

**Solution:** Ensure you have enough disk space and Docker is running:
```bash
docker system prune -a
docker info
```

### Issue: Java compilation fails

**Solution:** Check Java installation in container:
```bash
docker exec -it param-compiler java -version
docker exec -it param-compiler javac -version
```

### Issue: .NET not found

**Solution:** Verify .NET installation:
```bash
docker exec -it param-compiler dotnet --version
docker exec -it param-compiler dotnet --list-sdks
```

### Issue: Node.js not found

**Solution:** Check Node.js installation:
```bash
docker exec -it param-compiler node --version
docker exec -it param-compiler npm --version
```

### Issue: Timeout errors

**Solution:** Increase timeout in request:
```json
{
  "code": "...",
  "language": "java",
  "timeout": 30
}
```

### Issue: Memory errors

**Solution:** Increase Docker memory limit:
```bash
docker run -d \
  --name param-compiler \
  -p 8001:8000 \
  --memory="4g" \
  --cpus="2.0" \
  param-learning-compiler
```

## Performance Optimization

### 1. Use Build Cache
Keep compiled binaries in cache for repeated executions.

### 2. Warm Containers
Keep containers running to avoid cold start delays.

### 3. Load Balancing
Run multiple compiler instances behind a load balancer:

```yaml
services:
  compiler-1:
    build: ./compiler
    ports:
      - "8001:8000"
  
  compiler-2:
    build: ./compiler
    ports:
      - "8002:8000"
  
  compiler-3:
    build: ./compiler
    ports:
      - "8003:8000"
  
  nginx:
    image: nginx:alpine
    ports:
      - "8000:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - compiler-1
      - compiler-2
      - compiler-3
```

### 4. Resource Limits
Set appropriate limits per language:
- Python: 512MB RAM, 0.5 CPU
- Java: 1GB RAM, 1.0 CPU (compilation overhead)
- C#: 1GB RAM, 1.0 CPU (compilation overhead)
- JavaScript: 256MB RAM, 0.5 CPU
- TypeScript: 512MB RAM, 0.5 CPU (compilation overhead)

## Security Considerations

### 1. Network Isolation
Run compiler in isolated network:
```bash
docker network create compiler-network
docker run --network compiler-network ...
```

### 2. Read-Only Filesystem
Mount filesystem as read-only where possible:
```bash
docker run --read-only --tmpfs /tmp ...
```

### 3. User Permissions
Run as non-root user:
```dockerfile
RUN useradd -m -u 1000 compiler
USER compiler
```

### 4. Resource Limits
Always set memory and CPU limits:
```bash
docker run --memory="1g" --cpus="0.5" ...
```

### 5. Timeout Protection
Always enforce execution timeouts (default: 10s, max: 30s).

## Monitoring

### Health Check Endpoint
```bash
curl http://localhost:8001/health
```

### Metrics (Future)
- Execution count per language
- Average execution time
- Error rate
- Resource usage

## Next Steps

1. ✅ Build and test the compiler
2. ✅ Verify all languages work
3. ⬜ Update frontend to support language selection
4. ⬜ Add language-specific code templates
5. ⬜ Implement code linting
6. ⬜ Add syntax error highlighting
7. ⬜ Implement code formatting
8. ⬜ Add package/library support

## Support

For issues or questions:
1. Check the logs: `docker logs param-compiler`
2. Run the test suite: `python test_languages.py`
3. Review the documentation: `MULTI_LANGUAGE_SUPPORT.md`
