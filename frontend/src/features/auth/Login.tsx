import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../../shared/contexts/AuthContext';
import Button from '../../components/Button';
import Input from '../../components/Input';
import './Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Clear any old tokens first
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    
    try {
      await login(email, password);
      // Force a small delay to ensure state updates
      setTimeout(() => {
        navigate('/dashboard');
      }, 100);
    } catch (err: any) {
      setError(err.response?.data?.error || err.response?.data?.detail || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    window.location.href = `${apiUrl}/api/auth/google/`;
  };

  return (
    <div className="auth-page" style={{ position: 'relative', zIndex: 10 }}>
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">
              <img 
                src="/param_png.png" 
                alt="Logo" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  padding: '0'
                }}
              />
            </div>
            <h1>Welcome Back</h1>
            <p className="auth-subtitle">Sign in to continue your learning journey</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && (
              <div className="error-message" role="alert">
                <span className="error-icon" aria-hidden="true">⚠️</span>
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            <div className="form-footer" style={{ justifyContent: 'flex-end' }}>
              <button type="button" className="forgot-password" onClick={() => alert('Password reset coming soon. Please contact support.')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit' }}>Forgot password?</button>
            </div>

            <Button type="submit" disabled={loading} className="btn-primary-full">
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>

            <div className="divider">
              <span>or continue with</span>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="btn-google"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
                <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"/>
                <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z"/>
                <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z"/>
              </svg>
              Sign in with Google
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="auth-link">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
