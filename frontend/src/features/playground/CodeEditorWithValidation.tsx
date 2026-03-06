import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import apiClient from '../../shared/api/axios';
import { executePythonCode, initPyodide, isPyodideReady, isPyodideLoading } from '../../utils/pyodideRunner';
import { validateCode, parseTestCases, ValidationResult } from '../../utils/validationEngine';
import ValidationModal from '../../components/ValidationModal';

interface CodeEditorWithValidationProps {
  lessonId?: number;
  lessonTitle?: string;
  initialCode?: string;
  testCases?: any[];
  hasValidation?: boolean;
  onLessonComplete?: (nextLessonId?: number) => void;
}

export default function CodeEditorWithValidation({
  lessonId,
  lessonTitle,
  initialCode = '# Write your Python code here\nprint("Hello, World!")',
  testCases = [],
  hasValidation = false,
  onLessonComplete,
}: CodeEditorWithValidationProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [pyodideStatus, setPyodideStatus] = useState('Not loaded');
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [showModal, setShowModal] = useState(false);

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

  // Update code when initialCode changes
  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

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

  const handleSubmit = async () => {
    if (!isPyodideReady()) {
      setOutput('⚠️ Python environment is still loading. Please wait...');
      return;
    }

    if (!hasValidation || testCases.length === 0) {
      setOutput('⚠️ No validation tests configured for this lesson.');
      return;
    }

    setIsValidating(true);
    setOutput('🔍 Validating your code against test cases...\n');

    try {
      const parsedTestCases = parseTestCases(testCases);
      const result = await validateCode(code, parsedTestCases);
      
      setValidationResult(result);
      setShowModal(true);

      // Send validation result to backend
      if (lessonId) {
        try {
          await apiClient.post('/syllabus/validate_submission/', {
            lesson_id: lessonId,
            validation_result: result,
          });
        } catch (error) {
          console.error('Failed to save validation result:', error);
        }
      }

      // Update output
      if (result.success) {
        setOutput(
          `✅ All tests passed! (${result.passedTests}/${result.totalTests})\n\n` +
          `Execution time: ${result.executionTime.toFixed(3)}s\n\n` +
          `🎉 Congratulations! You can now proceed to the next lesson.`
        );
      } else {
        setOutput(
          `❌ ${result.failedTests.length} test(s) failed\n\n` +
          `Passed: ${result.passedTests}/${result.totalTests}\n` +
          `Execution time: ${result.executionTime.toFixed(3)}s\n\n` +
          `Please review the failed tests and try again.`
        );
      }
    } catch (error: any) {
      setOutput(`❌ Validation Error:\n${error.message || String(error)}`);
    } finally {
      setIsValidating(false);
    }
  };

  const handleNextLesson = () => {
    setShowModal(false);
    if (onLessonComplete && validationResult?.success) {
      onLessonComplete();
    }
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', height: '80vh', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ marginBottom: '0.25rem' }}>
              {lessonTitle || 'Code Playground'}
            </h2>
            <p style={{ 
              fontSize: '0.85rem', 
              color: isPyodideReady() ? '#10b981' : isPyodideLoading() ? '#f59e0b' : '#ef4444',
              margin: 0 
            }}>
              🐍 Pyodide Status: {pyodideStatus}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {hasValidation && testCases.length > 0 && (
              <span style={{ 
                fontSize: '0.85rem', 
                color: '#10b981',
                padding: '0.5rem 1rem',
                background: 'rgba(16, 185, 129, 0.1)',
                borderRadius: '6px',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}>
                ✓ {testCases.length} Test Case{testCases.length !== 1 ? 's' : ''}
              </span>
            )}
            <button
              onClick={handleRunCode}
              disabled={isRunning || !isPyodideReady()}
              style={{
                padding: '0.75rem 1.5rem',
                background: isRunning || !isPyodideReady() 
                  ? 'rgba(107, 114, 128, 0.3)' 
                  : 'rgba(59, 130, 246, 0.2)',
                color: isRunning || !isPyodideReady() ? '#9ca3af' : '#3b82f6',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '8px',
                cursor: isRunning || !isPyodideReady() ? 'not-allowed' : 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
            >
              {isRunning ? '⚡ Running...' : '▶️ Run'}
            </button>
            {hasValidation && testCases.length > 0 && (
              <button
                onClick={handleSubmit}
                disabled={isValidating || !isPyodideReady()}
                style={{
                  padding: '0.75rem 2rem',
                  background: isValidating || !isPyodideReady() 
                    ? 'rgba(107, 114, 128, 0.3)' 
                    : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: isValidating || !isPyodideReady() ? 'not-allowed' : 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600',
                  boxShadow: isValidating || !isPyodideReady() ? 'none' : '0 4px 12px rgba(16, 185, 129, 0.4)',
                  transition: 'all 0.2s ease'
                }}
              >
                {isValidating ? '🔍 Validating...' : '✓ Submit'}
              </button>
            )}
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
            {output || '💡 Click "Run" to test your code or "Submit" to validate against test cases'}
          </pre>
        </div>
      </div>

      <ValidationModal
        isOpen={showModal}
        result={validationResult}
        onClose={() => setShowModal(false)}
        onNextLesson={validationResult?.success ? handleNextLesson : undefined}
        lessonTitle={lessonTitle}
      />
    </>
  );
}
