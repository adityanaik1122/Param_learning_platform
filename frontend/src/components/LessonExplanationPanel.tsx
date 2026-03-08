import MarkdownRenderer from './MarkdownRenderer';

interface LessonExplanationPanelProps {
  title: string;
  content: string;
  duration?: number;
}

export default function LessonExplanationPanel({
  title,
  content,
  duration,
}: LessonExplanationPanelProps) {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)',
        border: '2px solid rgba(59, 130, 246, 0.3)',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          paddingBottom: '1rem',
          borderBottom: '2px solid rgba(59, 130, 246, 0.2)',
        }}
      >
        <h1
          style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            color: '#3b82f6',
            margin: 0,
          }}
        >
          📚 {title}
        </h1>
        {duration && (
          <span
            style={{
              padding: '0.5rem 1rem',
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '8px',
              color: '#60a5fa',
              fontSize: '0.9rem',
              fontWeight: '600',
            }}
          >
            ⏱️ {duration} min
          </span>
        )}
      </div>

      {/* Content with Markdown & LaTeX */}
      <MarkdownRenderer content={content} />
    </div>
  );
}
