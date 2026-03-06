import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import apiClient from '../../shared/api/axios';
import { executePythonCode, initPyodide, isPyodideReady, isPyodideLoading } from '../../utils/pyodideRunner';

export default function CodeEditor() {
  const [code, setCode] = useState(`# Python with ML Libraries (NumPy, Pandas, Matplotlib, Scikit-learn)
import numpy as np
import pandas as pd

# Example: Create and analyze data
data = np.array([1, 2, 3, 4, 5])
print("Array:", data)
print("Mean:", np.mean(data))
print("Std Dev:", np.std(data))

# Create a DataFrame
df = pd.DataFrame({
    'A': [1, 2, 3],
    'B': [4, 5, 6]
})
print("\\nDataFrame:")
print(df)`);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [pyodideStatus, setPyodideStatus] = useState('Not loaded');

  // Initialize Pyodide on component mount
  useEffect(() => {
    const loadPyodide = async () => {
      setPyodideStatus('Loading Python environment...');
      try {
        await initPyodide();
        setPyodideStatus('Ready ✓');
      } catch (error) {
        setPyodideStatus('Failed to load');
        console.error('Pyodide initialization error:', error);
      }
    };
    loadPyodide();
  }, []);

  const handleRunCode = async () => {
    if (!isPyodideReady()) {
      setOutput('⚠️ Python environment is still loading. Please wait...');
      return;
    }

    setIsRunning(true);
    setOutput('🔄 Executing code...\n');
    
    try {
      const result = await executePythonCode(code);
      
      let displayOutput = '';
      
      if (result.error) {
        displayOutput = `❌ Error:\n${result.error}`;
      } else {
        displayOutput = `✅ Success (${result.executionTime.toFixed(3)}s)\n\n${result.output}`;
      }
      
      setOutput(displayOutput);
      
      // Track playground session
      try {
        await apiClient.post('/playground-sessions/', {
          code,
          language: 'python',
          execution_time_seconds: result.executionTime,
          success: result.success
        });
      } catch (trackError) {
        console.error('Failed to track session:', trackError);
      }
    } catch (error: any) {
      setOutput(`❌ Execution Error:\n${error.message || String(error)}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '80vh', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ marginBottom: '0.25rem' }}>Code Playground</h2>
          <p style={{ 
            fontSize: '0.85rem', 
            color: isPyodideReady() ? '#10b981' : isPyodideLoading() ? '#f59e0b' : '#ef4444',
            margin: 0 
          }}>
            🐍 Pyodide Status: {pyodideStatus}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <span style={{ 
            fontSize: '0.85rem', 
            color: '#9ca3af',
            padding: '0.5rem 1rem',
            background: 'rgba(59, 130, 246, 0.1)',
            borderRadius: '6px',
            border: '1px solid rgba(59, 130, 246, 0.3)'
          }}>
            📦 NumPy • Pandas • Matplotlib • Scikit-learn
          </span>
          <button
            onClick={handleRunCode}
            disabled={isRunning || !isPyodideReady()}
            style={{
              padding: '0.75rem 2rem',
              background: isRunning || !isPyodideReady() 
                ? 'rgba(107, 114, 128, 0.3)' 
                : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: isRunning || !isPyodideReady() ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              boxShadow: isRunning || !isPyodideReady() ? 'none' : '0 4px 12px rgba(16, 185, 129, 0.4)',
              transition: 'all 0.2s ease'
            }}
          >
            {isRunning ? '⚡ Running...' : '▶️ Run Code'}
          </button>
        </div>
      </div>
      
      <div style={{ flex: 1, border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
        <Editor
          height="100%"
          defaultLanguage="python"
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
          }}
        />
      </div>
      
      <div style={{ 
        height: '250px', 
        border: '2px solid rgba(59, 130, 246, 0.3)', 
        borderRadius: '8px', 
        padding: '1rem', 
        background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)',
        color: '#e5e7eb', 
        overflow: 'auto', 
        fontFamily: 'Consolas, Monaco, "Courier New", monospace',
        fontSize: '0.9rem',
        lineHeight: '1.5'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          marginBottom: '0.75rem',
          paddingBottom: '0.5rem',
          borderBottom: '1px solid rgba(59, 130, 246, 0.2)'
        }}>
          <span style={{ fontSize: '1.1rem' }}>📟</span>
          <strong style={{ color: '#3b82f6' }}>Console Output</strong>
        </div>
        <pre style={{ 
          margin: 0, 
          whiteSpace: 'pre-wrap', 
          wordWrap: 'break-word',
          color: output.includes('❌') ? '#ef4444' : output.includes('✅') ? '#10b981' : '#e5e7eb'
        }}>
          {output || '💡 Click "Run Code" to execute your Python code with ML libraries'}
        </pre>
      </div>
    </div>
  );
}
