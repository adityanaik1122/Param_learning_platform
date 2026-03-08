import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Playground from './pages/Playground';
import Pricing from './pages/Pricing';
import Login from './features/auth/Login';
import Signup from './features/auth/Signup';
import LearningPath from './features/learning-path/LearningPath';
import LearningPathCatalog from './pages/LearningPathCatalog';
import ComingSoon from './pages/ComingSoon';
import Aptitude from './features/aptitude/Aptitude';
import TestPage from './pages/TestPage';
import NotFound from './pages/NotFound';
import { AuthProvider } from './shared/contexts/AuthContext';
import { ThemeProvider } from './shared/contexts/ThemeContext';
import './App.css';

function App() {
  // Prevent extension interference
  useEffect(() => {
    const stopExtensionEvents = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target?.id?.includes('extension') || 
          target?.className?.includes('extension') ||
          target?.closest('[id*="extension"]') ||
          target?.closest('[class*="extension"]')) {
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    };

    document.addEventListener('click', stopExtensionEvents, true);
    document.addEventListener('mousedown', stopExtensionEvents, true);
    document.addEventListener('mouseup', stopExtensionEvents, true);

    return () => {
      document.removeEventListener('click', stopExtensionEvents, true);
      document.removeEventListener('mousedown', stopExtensionEvents, true);
      document.removeEventListener('mouseup', stopExtensionEvents, true);
    };
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <div
            className="app plh-app-shell"
            style={{ 
              pointerEvents: 'auto', 
              position: 'relative', 
              zIndex: 1,
              isolation: 'isolate',
              minHeight: '100vh',
            }}
          >
            <a href="#main-content" className="skip-nav">Skip to main content</a>
            <Navbar />
            <main id="main-content" className="main-content" style={{ pointerEvents: 'auto' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/courses" element={<LearningPathCatalog />} />
                <Route path="/learning-path" element={<LearningPath />} />                <Route path="/learning-path/:courseId" element={<LearningPath />} />
                <Route path="/coming-soon/:courseId" element={<ComingSoon />} />
                <Route path="/playground" element={<Playground />} />
                <Route path="/aptitude" element={<Aptitude />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
