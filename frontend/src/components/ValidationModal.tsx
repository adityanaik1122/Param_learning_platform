import { ValidationResult } from '../utils/validationEngine';

interface ValidationModalProps {
  isOpen: boolean;
  result: ValidationResult | null;
  onClose: () => void;
  onNextLesson?: () => void;
  lessonTitle?: string;
}

export default function ValidationModal({
  isOpen,
  result,
  onClose,
  onNextLesson,
  lessonTitle,
}: ValidationModalProps) {
  if (!isOpen || !result) return null;

  const isSuccess = result.success;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.98) 0%, rgba(31, 41, 55, 0.98) 100%)',
          border: `3px solid ${isSuccess ? '#10b981' : '#ef4444'}`,
          borderRadius: '16px',
          padding: '2.5rem',
          maxWidth: '600px',
          width: '90%',
          maxHeight: '80vh',
          overflow: 'auto',
          boxShadow: isSuccess
            ? '0 20px 60px rgba(16, 185, 129, 0.4)'
            : '0 20px 60px rgba(239, 68, 68, 0.4)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
            {isSuccess ? '🎉' : '❌'}
          </div>
          <h2
            style={{
              fontSize: '2rem',
              color: isSuccess ? '#10b981' : '#ef4444',
              marginBottom: '0.5rem',
            }}
          >
            {isSuccess ? 'Success!' : 'Tests Failed'}
          </h2>
          {lessonTitle && (
            <p style={{ color: '#9ca3af', fontSize: '1rem' }}>
              {lessonTitle}
            </p>
          )}
        </div>

        {/* Results Summary */}
        <div
          style={{
            background: isSuccess
              ? 'rgba(16, 185, 129, 0.1)'
              : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${isSuccess ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              textAlign: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.25rem' }}>
                Total Tests
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#e5e7eb' }}>
                {result.totalTests}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.25rem' }}>
                Passed
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10b981' }}>
                {result.passedTests}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.25rem' }}>
                Failed
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#ef4444' }}>
                {result.failedTests.length}
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid rgba(156, 163, 175, 0.2)',
              fontSize: '0.9rem',
              color: '#9ca3af',
              textAlign: 'center',
            }}
          >
            Execution Time: {result.executionTime.toFixed(3)}s
          </div>
        </div>

        {/* Success Message */}
        {isSuccess && (
          <div style={{ marginBottom: '2rem' }}>
            <p
              style={{
                color: '#10b981',
                fontSize: '1.1rem',
                textAlign: 'center',
                lineHeight: '1.6',
              }}
            >
              🎊 Congratulations! All test cases passed successfully.
              {onNextLesson && ' You can now proceed to the next lesson!'}
            </p>
          </div>
        )}

        {/* Failed Tests Details */}
        {!isSuccess && result.failedTests.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h3
              style={{
                fontSize: '1.2rem',
                color: '#ef4444',
                marginBottom: '1rem',
              }}
            >
              Failed Tests:
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {result.failedTests.filter(test => !test.hidden).map((test, index) => (
                <div
                  key={test.id}
                  style={{
                    background: 'rgba(239, 68, 68, 0.05)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    borderRadius: '8px',
                    padding: '1rem',
                  }}
                >
                  <div
                    style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: '#ef4444',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {index + 1}. {test.name}
                  </div>
                  <div
                    style={{
                      fontSize: '0.9rem',
                      color: '#9ca3af',
                      lineHeight: '1.5',
                    }}
                  >
                    {test.description}
                  </div>
                </div>
              ))}
            </div>

            {result.failedTests.some(test => test.hidden) && (
              <p
                style={{
                  marginTop: '1rem',
                  fontSize: '0.9rem',
                  color: '#9ca3af',
                  fontStyle: 'italic',
                }}
              >
                Note: Some hidden test cases also failed.
              </p>
            )}
          </div>
        )}

        {/* Error Message */}
        {result.error && (
          <div
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '2rem',
            }}
          >
            <div
              style={{
                fontSize: '0.9rem',
                color: '#ef4444',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
              }}
            >
              {result.error}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {isSuccess && onNextLesson && (
            <button
              onClick={onNextLesson}
              style={{
                padding: '0.75rem 2rem',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.4)';
              }}
            >
              Next Lesson →
            </button>
          )}
          <button
            onClick={onClose}
            style={{
              padding: '0.75rem 2rem',
              background: isSuccess
                ? 'rgba(59, 130, 246, 0.1)'
                : 'rgba(239, 68, 68, 0.1)',
              color: isSuccess ? '#3b82f6' : '#ef4444',
              border: `1px solid ${isSuccess ? 'rgba(59, 130, 246, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isSuccess
                ? 'rgba(59, 130, 246, 0.2)'
                : 'rgba(239, 68, 68, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = isSuccess
                ? 'rgba(59, 130, 246, 0.1)'
                : 'rgba(239, 68, 68, 0.1)';
            }}
          >
            {isSuccess ? 'Close' : 'Try Again'}
          </button>
        </div>
      </div>
    </div>
  );
}
