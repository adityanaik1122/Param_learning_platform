import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import paramLogo from '../assests/param-logo.png';
import { useAuthContext } from '../shared/contexts/AuthContext';
import { useTheme } from '../shared/contexts/ThemeContext';
// Translation feature disabled - will be enabled later
// import { LanguageSelector } from './LanguageSelector';
// import { useLanguage } from '../shared/contexts/LanguageContext';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthContext();
  const { mode, toggleMode } = useTheme();
  // const { supportedLanguages } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setMenuOpen(false);
      setMobileNavOpen(false);
    }
  }, []);

  // Close dropdown on click outside
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleKeyDown, handleClickOutside]);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileNavOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/login');
  };

  const handleProfile = () => {
    setMenuOpen(false);
    navigate('/dashboard');
  };

  const navLinks = [
    { to: '/', label: 'Home', isActive: location.pathname === '/' },
    { to: '/dashboard', label: 'Dashboard', isActive: location.pathname === '/dashboard' },
    { to: '/courses', label: 'Learning Path', isActive: location.pathname === '/courses' || location.pathname.startsWith('/learning-path') },
    { to: '/aptitude', label: 'Aptitude', isActive: location.pathname === '/aptitude' },
    { to: '/pricing', label: 'Pricing', isActive: location.pathname === '/pricing' },
  ];

  return (
    <>
      <nav className="navbar plh-navbar" role="navigation" aria-label="Main navigation">
        <Link to="/" className="navbar-brand plh-navbar-brand">
          <img
            src={paramLogo}
            alt="Param Learning Hub Logo"
            style={{ height: '32px', width: 'auto', marginRight: '0.5rem' }}
          />
          <span
            style={{
              fontFamily: '"Poppins", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              letterSpacing: '0.06em',
              fontWeight: 700,
              fontSize: '1.05rem',
            }}
          >
            Param Learning Hub
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="navbar-menu plh-navbar-links navbar-desktop">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} className={link.isActive ? 'active' : ''}>
              {link.label}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', pointerEvents: 'auto' }}>
          {/* Theme toggle switch */}
          <button
            type="button"
            className="theme-toggle"
            aria-label={mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            onClick={toggleMode}
          >
            <span className="theme-toggle-thumb">
              {mode === 'dark' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </span>
          </button>

          {/* Hamburger button - mobile only */}
          <button
            type="button"
            className="navbar-hamburger"
            aria-label={mobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileNavOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileNavOpen(prev => !prev)}
          >
            <span className={`hamburger-line ${mobileNavOpen ? 'open' : ''}`} />
            <span className={`hamburger-line ${mobileNavOpen ? 'open' : ''}`} />
            <span className={`hamburger-line ${mobileNavOpen ? 'open' : ''}`} />
          </button>

          {/* User menu */}
          <div className="user-menu-wrapper" style={{ pointerEvents: 'auto' }} ref={dropdownRef}>
            <button
              type="button"
              className="user-icon"
              aria-label="User menu"
              aria-haspopup="true"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
            {menuOpen && (
              <div className="user-dropdown" role="menu">
                {isAuthenticated ? (
                  <>
                    <div className="user-dropdown-header">
                      <div className="user-name">
                        {user?.first_name || 'User'} {user?.last_name || ''}
                      </div>
                      <div className="user-email">{user?.email}</div>
                    </div>
                    <button type="button" className="user-dropdown-item" role="menuitem" onClick={handleProfile}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{ marginRight: '0.5rem' }}>
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      Profile
                    </button>
                    <button type="button" className="user-dropdown-item" role="menuitem" onClick={handleLogout} style={{ color: '#ef4444' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{ marginRight: '0.5rem' }}>
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="user-dropdown-item"
                      role="menuitem"
                      onClick={() => {
                        setMenuOpen(false);
                        navigate('/login');
                      }}
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      className="user-dropdown-item"
                      role="menuitem"
                      onClick={() => {
                        setMenuOpen(false);
                        navigate('/signup');
                      }}
                    >
                      Sign up
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile navigation overlay */}
      {mobileNavOpen && (
        <div className="mobile-nav-overlay" id="mobile-nav" role="navigation" aria-label="Mobile navigation">
          <div className="mobile-nav-links">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`mobile-nav-link ${link.isActive ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="plh-navbar-spacer" />
    </>
  );
}
