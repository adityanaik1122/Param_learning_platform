import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Bell } from 'lucide-react';

export default function ComingSoon() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  // If game development is actually available, redirect to the learning path
  if (courseId === 'game-development') {
    navigate('/learning-path/game-development');
    return null;
  }

  const courseNames: { [key: string]: string } = {
    'mern': 'Full Stack Web Development (MERN)',
    'python-fullstack': 'Full Stack Web Development (Python)',
    'java-fullstack': 'Full Stack Web Development (Java)',
    'mean': 'Full Stack Web Development (.Net & Angular)',
    'react-native': 'Mobile App Development (React Native)',
    'data-analytics': 'Data Analytics (Python)',
    'iot-ai': 'AI/ML Integration with IOT',
    'game-development': 'Game Development (C#)',    'design-engineering': 'Design Engineering',
    'aptitude': 'Technical Aptitude & Logical Reasoning'
  };

  const courseName = courseNames[courseId || ''] || 'This Course';

  const [toast, setToast] = useState<string | null>(null);
  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0B0E14' }}>
      <div className="container mx-auto px-6">
        {/* Toast notification */}
        {toast && (
          <div
            role="status"
            aria-live="polite"
            style={{
              position: 'fixed',
              top: '5rem',
              right: '2rem',
              zIndex: 1000,
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              background: 'rgba(139, 92, 246, 0.15)',
              border: '1px solid rgba(139, 92, 246, 0.5)',
              color: '#A78BFA',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              maxWidth: '400px',
              animation: 'slideDown 0.3s ease-out',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span aria-hidden="true">🔔</span>
              <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{toast}</span>
              <button
                onClick={() => setToast(null)}
                style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '1.2rem' }}
                aria-label="Dismiss notification"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <div
          className="max-w-2xl mx-auto text-center p-12 rounded-2xl"
          style={{
            background: 'rgba(15, 20, 25, 0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
          }}
        >
          {/* Icon */}
          <div
            className="inline-flex p-6 rounded-full mb-6"
            style={{
              background: 'rgba(139, 92, 246, 0.1)',
              border: '2px solid rgba(139, 92, 246, 0.3)'
            }}
          >
            <Clock 
              size={64} 
              style={{ 
                color: '#8B5CF6',
                filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.8))'
              }} 
            />
          </div>

          {/* Title */}
          <h1 
            className="text-4xl font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #3B82F6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 30px rgba(139, 92, 246, 0.5)'
            }}
          >
            Coming Soon
          </h1>

          {/* Course Name */}
          <h2 className="text-2xl font-semibold mb-4" style={{ color: '#E5E7EB' }}>
            {courseName}
          </h2>

          {/* Description */}
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            We're working hard to bring you this amazing course. 
            Stay tuned for updates and be the first to know when it launches!
          </p>

          {/* Notify Button */}
          <button
            className="inline-flex items-center gap-2 px-5 py-2 rounded-md font-semibold text-sm text-white mb-6 transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #3B82F6 100%)',
              boxShadow: '0 0 20px rgba(139, 92, 246, 0.6), 0 0 40px rgba(139, 92, 246, 0.3)',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
            }}
            onClick={() => {
              showToast(`We'll notify you when ${courseName} is available! Email notifications coming soon.`);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(139, 92, 246, 0.8), 0 0 60px rgba(139, 92, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.6), 0 0 40px rgba(139, 92, 246, 0.3)';
            }}
          >
            <Bell size={20} />
            Notify Me When Available
          </button>

          {/* Back Button */}
          <button
            onClick={() => navigate('/courses')}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
          >
            <ArrowLeft size={20} />
            Back to Courses
          </button>

          {/* Available Course Notice */}
          <div 
            className="mt-8 p-4 rounded-lg"
            style={{
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.3)'
            }}
          >
            <p className="text-sm" style={{ color: '#A78BFA' }}>
              💡 <strong>Data Science and AI/ML with Python</strong> is currently available!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
