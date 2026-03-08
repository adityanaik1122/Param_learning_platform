import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ textAlign: 'center', padding: '6rem 2rem' }}>
      <div style={{
        maxWidth: '500px',
        margin: '0 auto',
        background: 'rgba(30, 41, 59, 0.5)',
        padding: '3rem',
        borderRadius: '16px',
        border: '1px solid rgba(139, 92, 246, 0.3)',
      }}>
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>404</div>
        <h1 style={{
          fontSize: '2rem',
          marginBottom: '1rem',
          color: '#8B5CF6',
        }}>
          Page Not Found
        </h1>
        <p style={{ color: '#9ca3af', marginBottom: '2rem', lineHeight: 1.6 }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn" onClick={() => navigate('/')}>
            Go Home
          </button>
          <button
            className="btn-secondary"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
