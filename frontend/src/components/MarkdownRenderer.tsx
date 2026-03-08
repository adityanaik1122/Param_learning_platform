import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github-dark.css';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex, rehypeHighlight]}
        components={{
          // Custom heading styles
          h1: ({ node, ...props }) => (
            <h1
              style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#e5e7eb',
                marginTop: '2rem',
                marginBottom: '1rem',
                borderBottom: '2px solid rgba(59, 130, 246, 0.3)',
                paddingBottom: '0.5rem',
              }}
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#e5e7eb',
                marginTop: '1.5rem',
                marginBottom: '0.75rem',
              }}
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#d1d5db',
                marginTop: '1.25rem',
                marginBottom: '0.5rem',
              }}
              {...props}
            />
          ),
          // Custom paragraph styles
          p: ({ node, ...props }) => (
            <p
              style={{
                color: '#9ca3af',
                lineHeight: '1.8',
                marginBottom: '1rem',
                fontSize: '1rem',
              }}
              {...props}
            />
          ),
          // Custom list styles
          ul: ({ node, ...props }) => (
            <ul
              style={{
                color: '#9ca3af',
                marginLeft: '1.5rem',
                marginBottom: '1rem',
                lineHeight: '1.8',
              }}
              {...props}
            />
          ),
          ol: ({ node, ...props }) => (
            <ol
              style={{
                color: '#9ca3af',
                marginLeft: '1.5rem',
                marginBottom: '1rem',
                lineHeight: '1.8',
              }}
              {...props}
            />
          ),
          li: ({ node, ...props }) => (
            <li
              style={{
                marginBottom: '0.5rem',
              }}
              {...props}
            />
          ),
          // Custom code block styles
          code: ({ node, inline, className, children, ...props }: any) => {
            if (inline) {
              return (
                <code
                  style={{
                    background: 'rgba(59, 130, 246, 0.1)',
                    color: '#60a5fa',
                    padding: '0.2rem 0.4rem',
                    borderRadius: '4px',
                    fontSize: '0.9em',
                    fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                  }}
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code
                className={className}
                style={{
                  display: 'block',
                  background: 'rgba(17, 24, 39, 0.8)',
                  padding: '1rem',
                  borderRadius: '8px',
                  overflow: 'auto',
                  fontSize: '0.9rem',
                  lineHeight: '1.5',
                  fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                }}
                {...props}
              >
                {children}
              </code>
            );
          },
          // Custom blockquote styles
          blockquote: ({ node, ...props }) => (
            <blockquote
              style={{
                borderLeft: '4px solid #3b82f6',
                paddingLeft: '1rem',
                marginLeft: '0',
                marginBottom: '1rem',
                color: '#9ca3af',
                fontStyle: 'italic',
                background: 'rgba(59, 130, 246, 0.05)',
                padding: '1rem',
                borderRadius: '4px',
              }}
              {...props}
            />
          ),
          // Custom table styles
          table: ({ node, ...props }) => (
            <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  color: '#e5e7eb',
                }}
                {...props}
              />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead
              style={{
                background: 'rgba(59, 130, 246, 0.1)',
                borderBottom: '2px solid rgba(59, 130, 246, 0.3)',
              }}
              {...props}
            />
          ),
          th: ({ node, ...props }) => (
            <th
              style={{
                padding: '0.75rem',
                textAlign: 'left',
                fontWeight: '600',
                borderBottom: '1px solid rgba(156, 163, 175, 0.2)',
              }}
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td
              style={{
                padding: '0.75rem',
                borderBottom: '1px solid rgba(156, 163, 175, 0.1)',
                color: '#9ca3af',
              }}
              {...props}
            />
          ),
          // Custom link styles
          a: ({ node, ...props }) => (
            <a
              style={{
                color: '#3b82f6',
                textDecoration: 'none',
                borderBottom: '1px solid transparent',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderBottomColor = '#3b82f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderBottomColor = 'transparent';
              }}
              {...props}
            />
          ),
          // Custom horizontal rule
          hr: ({ node, ...props }) => (
            <hr
              style={{
                border: 'none',
                borderTop: '1px solid rgba(156, 163, 175, 0.2)',
                marginTop: '2rem',
                marginBottom: '2rem',
              }}
              {...props}
            />
          ),
          // Custom image styles
          img: ({ node, ...props }) => (
            <img
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '8px',
                marginTop: '1rem',
                marginBottom: '1rem',
              }}
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
