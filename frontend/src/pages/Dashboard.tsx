import { useEffect, useState } from 'react';
import { useAuth } from '../shared/hooks/useAuth';
import { useSubscription } from '../shared/hooks/useSubscription';
import { useNavigate } from 'react-router-dom';
import apiClient from '../shared/api/axios';

export default function Dashboard() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const { subscription, loading: subLoading } = useSubscription();
  const navigate = useNavigate();

  // Real progress data from API
  const [progressData, setProgressData] = useState<any>(null);
  const [loadingProgress, setLoadingProgress] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    const fetchProgressData = async () => {
      if (!isAuthenticated) return;
      
      // Only fetch progress data for premium users or staff/superusers
      const hasAccess = subscription.active || user?.is_staff || user?.is_superuser;
      
      if (!hasAccess) {
        // Set empty data for free users
        setProgressData({
          learningPath: { completed: 0, total: 45, currentTopic: 'Get Started', lastAccessed: 'Never', streak: 0 },
          aptitude: { testsCompleted: 0, totalTests: 31, averageScore: 0, lastTest: 'None', bestCategory: 'N/A' },
          playground: { codeRuns: 0, totalTime: '0h 0m', lastSession: 'Never', favoriteLanguage: 'Python' },
          weeklyActivity: Array(7).fill(0).map((_, i) => ({ day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i], hours: 0 })),
          skillProgress: [
            { skill: 'Python', level: 0 },
            { skill: 'Machine Learning', level: 0 },
            { skill: 'Data Analysis', level: 0 },
            { skill: 'Deep Learning', level: 0 },
            { skill: 'NLP', level: 0 }
          ]
        });
        setLoadingProgress(false);
        return;
      }
      
      try {
        const { data } = await apiClient.get('/progress/dashboard/');
        setProgressData(data);
      } catch (error) {
        console.error('Failed to fetch progress data:', error);
        // Set default data if API fails
        setProgressData({
          learningPath: { completed: 0, total: 45, currentTopic: 'Get Started', lastAccessed: 'Never', streak: 0 },
          aptitude: { testsCompleted: 0, totalTests: 31, averageScore: 0, lastTest: 'None', bestCategory: 'N/A' },
          playground: { codeRuns: 0, totalTime: '0h 0m', lastSession: 'Never', favoriteLanguage: 'Python' },
          weeklyActivity: Array(7).fill(0).map((_, i) => ({ day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i], hours: 0 })),
          skillProgress: [
            { skill: 'Python', level: 0 },
            { skill: 'Machine Learning', level: 0 },
            { skill: 'Data Analysis', level: 0 },
            { skill: 'Deep Learning', level: 0 },
            { skill: 'NLP', level: 0 }
          ]
        });
      } finally {
        setLoadingProgress(false);
      }
    };

    fetchProgressData();
  }, [isAuthenticated, subscription.active, user?.is_staff, user?.is_superuser]);

  const hasAccess = subscription.active || user?.is_staff || user?.is_superuser;

  if (authLoading || subLoading || loadingProgress) {
    return <div className="container" aria-live="polite" aria-busy="true">Loading...</div>;
  }

  if (!progressData) {
    return <div className="container" aria-live="polite" aria-busy="true">Loading progress data...</div>;
  }

  const learningProgress = (progressData.learningPath.completed / progressData.learningPath.total) * 100;
  const aptitudeProgress = (progressData.aptitude.testsCompleted / progressData.aptitude.totalTests) * 100;
  const maxHours = Math.max(...progressData.weeklyActivity.map((d: any) => d.hours), 1);

  return (
    <div className="container" style={{ paddingBottom: '3rem', position: 'relative', zIndex: 10 }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            Welcome back, {user?.first_name || 'User'}! 👋
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '1rem' }}>
            Track your learning progress and achievements
          </p>
        </div>
        {hasAccess && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '1rem 1.5rem',
          background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(234, 88, 12, 0.1) 100%)',
          border: '2px solid rgba(249, 115, 22, 0.3)',
          borderRadius: '12px'
        }}>
          <span style={{ fontSize: '2rem' }}>🔥</span>
          <div>
            <div style={{ fontSize: '0.85rem', color: '#9ca3af' }}>Current Streak</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#f97316' }}>
              {progressData.learningPath.streak} Days
            </div>
          </div>
        </div>
        )}
      </div>

      {/* Stats Overview */}
      {hasAccess ? (
        // Premium/Admin User - Show Real Stats
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
        <div className="dashboard-card" style={{
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)',
          border: '2px solid rgba(139, 92, 246, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '2.5rem' }}>📚</span>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#9ca3af' }}>Learning Progress</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#8B5CF6' }}>
                {progressData.learningPath.completed}/{progressData.learningPath.total}
              </div>
            </div>
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            background: 'rgba(139, 92, 246, 0.2)',
            borderRadius: '4px',
            overflow: 'hidden'
          }}
            role="progressbar"
            aria-valuenow={Math.round(learningProgress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Learning progress"
          >
            <div style={{
              width: `${learningProgress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #06B6D4 0%, #22D3EE 100%)',
              transition: 'width 0.5s ease'
            }} />
          </div>
          <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: '0.5rem' }}>
            {Math.round(learningProgress)}% Complete
          </div>
        </div>

        <div className="dashboard-card" style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)',
          border: '2px solid rgba(16, 185, 129, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '2.5rem' }}>🎯</span>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#9ca3af' }}>Aptitude Tests</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#10b981' }}>
                {progressData.aptitude.testsCompleted}/{progressData.aptitude.totalTests}
              </div>
            </div>
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            background: 'rgba(16, 185, 129, 0.2)',
            borderRadius: '4px',
            overflow: 'hidden'
          }}
            role="progressbar"
            aria-valuenow={Math.round(aptitudeProgress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Aptitude test progress"
          >
            <div style={{
              width: `${aptitudeProgress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
              transition: 'width 0.5s ease'
            }} />
          </div>
          <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: '0.5rem' }}>
            Avg Score: {progressData.aptitude.averageScore}%
          </div>
        </div>

        <div className="dashboard-card" style={{
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
          border: '2px solid rgba(168, 85, 247, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '2.5rem' }}>💻</span>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#9ca3af' }}>Code Runs</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#A78BFA' }}>
                {progressData.playground.codeRuns}
              </div>
            </div>
          </div>
          <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: '0.5rem' }}>
            Total Time: {progressData.playground.totalTime}
          </div>
          <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: '0.25rem' }}>
            Last: {progressData.playground.lastSession}
          </div>
        </div>
      </div>
      ) : (
        // Free User - Show Locked Stats
        <div style={{
          padding: '3rem',
          background: 'rgba(30, 36, 51, 0.5)',
          border: '2px solid rgba(139, 92, 246, 0.3)',
          borderRadius: '16px',
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔒</div>
          <h2 style={{ color: '#8B5CF6', marginBottom: '1rem', fontSize: '1.8rem' }}>
            Unlock Your Progress Dashboard
          </h2>
          <p style={{ color: '#9ca3af', marginBottom: '2rem', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Upgrade to Premium to track your learning progress, view detailed analytics, and access all features.
          </p>
          <button 
            className="btn" 
            onClick={() => navigate('/pricing')}
            style={{
              background: '#8B5CF6',
              padding: '1rem 2.5rem',
              fontSize: '1.1rem',
              fontWeight: '600',
              boxShadow: '0 4px 16px rgba(139, 92, 246, 0.4)'
            }}
          >
            View Plans & Upgrade
          </button>
        </div>
      )}

      {/* Weekly Activity Chart */}
      {hasAccess && (
      <div className="dashboard-card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>📊</span>
          <span>Weekly Activity</span>
        </h2>
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '1rem',
          height: '200px',
          padding: '1rem 0'
        }}>
          {progressData.weeklyActivity.map((day: any, idx: number) => (
            <div key={idx} style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              height: '100%'
            }}>
              <div style={{
                fontSize: '0.85rem',
                color: '#9ca3af',
                fontWeight: '600'
              }}>
                {day.hours.toFixed(1)}h
              </div>
              <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <div style={{
                  width: '70%',
                  maxWidth: '40px',
                  height: `${Math.max((day.hours / maxHours) * 100, 4)}%`,
                  background: 'linear-gradient(180deg, #A78BFA 0%, #8B5CF6 100%)',
                  borderRadius: '6px 6px 0 0',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(180deg, #C4B5FD 0%, #A78BFA 100%)';
                  e.currentTarget.style.transform = 'scaleY(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(180deg, #A78BFA 0%, #8B5CF6 100%)';
                  e.currentTarget.style.transform = 'scaleY(1)';
                }}
              />
              </div>
              <div style={{
                fontSize: '0.85rem',
                color: '#e5e7eb',
                fontWeight: '600'
              }}>
                {day.day}
              </div>
            </div>
          ))}
        </div>
      </div>
      )}

      {/* Skills Progress */}
      {hasAccess && (
      <div className="dashboard-card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>🚀</span>
          <span>Skills Progress</span>
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {progressData.skillProgress.map((skill: any, idx: number) => (
            <div key={idx}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.5rem'
              }}>
                <span style={{ fontSize: '0.95rem', fontWeight: '600', color: '#e5e7eb' }}>
                  {skill.skill}
                </span>
                <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#8B5CF6' }}>
                  {skill.level}%
                </span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: '10px',
                  background: 'rgba(139, 92, 246, 0.2)',
                  borderRadius: '5px',
                  overflow: 'hidden'
                }}
                role="progressbar"
                aria-valuenow={skill.level}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${skill.skill} progress`}
              >
                <div style={{
                  width: `${skill.level}%`,
                  height: '100%',
                  background: `${skill.level >= 80 ? '#10b981' : skill.level >= 60 ? '#8B5CF6' : '#f59e0b'}`,
                  transition: 'width 0.5s ease'
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      )}

      {/* Subscription Status */}
      {!hasAccess ? (
        // Free User - Show Upgrade Card
        <div className="dashboard-card" style={{ 
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)',
          border: '2px solid rgba(139, 92, 246, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '250px' }}>
              <h2 style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>📦</span>
                <span>Subscription Status</span>
              </h2>
              <div style={{ 
                display: 'inline-block',
                padding: '0.5rem 1rem',
                background: 'rgba(107, 114, 128, 0.2)',
                border: '1px solid rgba(107, 114, 128, 0.3)',
                borderRadius: '8px',
                marginBottom: '1rem'
              }}>
                <span style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Current Plan: </span>
                <strong style={{ color: '#e5e7eb', fontSize: '1rem' }}>FREE</strong>
              </div>
              <p style={{ color: '#9ca3af', marginBottom: '1rem', lineHeight: '1.6' }}>
                Upgrade to unlock all features:
              </p>
              <ul style={{ 
                color: '#9ca3af', 
                marginLeft: '1.5rem',
                marginBottom: '1.5rem',
                lineHeight: '1.8'
              }}>
                <li>✨ Unlimited code execution</li>
                <li>📚 Access to all ML courses</li>
                <li>🎯 Advanced aptitude tests</li>
                <li>🤖 AI-powered code assistance</li>
                <li>🏆 Certificate of completion</li>
              </ul>
              <button 
                className="btn" 
                onClick={() => navigate('/pricing')}
                style={{
                  background: '#8B5CF6',
                  padding: '0.45rem 1.25rem',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  boxShadow: '0 4px 16px rgba(139, 92, 246, 0.4)'
                }}
              >
                View Plans & Upgrade
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Premium User - Show Premium Status
        <div className="dashboard-card" style={{ 
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)',
          border: '2px solid rgba(16, 185, 129, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>👑</span>
                <span>Premium Subscription</span>
              </h2>
              <div style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                  padding: '0.4rem 1rem',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%)',
                border: '2px solid rgba(16, 185, 129, 0.4)',
                borderRadius: '8px',
                marginBottom: '1rem'
              }}>
                <span style={{ fontSize: '1.2rem' }}>✓</span>
                <div>
                  <div style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: '600' }}>Active</div>
                  <div style={{ color: '#e5e7eb', fontSize: '1rem', fontWeight: '700' }}>
                    {user?.is_staff || user?.is_superuser ? 'ADMIN ACCESS' : subscription.plan.toUpperCase() + ' PLAN'}
                  </div>
                </div>
              </div>
              {subscription.expires_at && !user?.is_staff && !user?.is_superuser && (
                <p style={{ color: '#9ca3af', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#10b981' }}>●</span> Renews on: {new Date(subscription.expires_at).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              )}
              {(user?.is_staff || user?.is_superuser) && (
                <p style={{ color: '#9ca3af', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#10b981' }}>●</span> Full administrative access - No subscription required
                </p>
              )}
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '1rem' }}>
                You have access to all premium features including unlimited code execution, 
                all courses, and priority support.
              </p>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              minWidth: '180px'
            }}>
              <button 
                onClick={() => navigate('/pricing')}
                style={{
                  padding: '0.45rem 1.15rem',
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  borderRadius: '6px',
                  color: '#3b82f6',
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                }}
              >
                View Plans
              </button>
              <button 
                onClick={() => navigate('/pricing')}
                style={{
                  padding: '0.45rem 1.15rem',
                  background: 'transparent',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '6px',
                  color: '#ef4444',
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                Manage Subscription
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="dashboard-grid">
        <div className="dashboard-card" style={{
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)',
          border: '2px solid rgba(139, 92, 246, 0.3)'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📚</div>
          <h3>Learning Path</h3>
          <p style={{ color: '#9ca3af', marginBottom: '0.5rem' }}>
            Current: {progressData.learningPath.currentTopic}
          </p>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '1rem' }}>
            Last accessed: {progressData.learningPath.lastAccessed}
          </p>
          <button className="btn" onClick={() => navigate('/learning-path')}>
            Continue Learning
          </button>
        </div>

        <div className="dashboard-card" style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)',
          border: '2px solid rgba(16, 185, 129, 0.3)'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎯</div>
          <h3>Aptitude Tests</h3>
          <p style={{ color: '#9ca3af', marginBottom: '0.5rem' }}>
            Best: {progressData.aptitude.bestCategory}
          </p>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '1rem' }}>
            Last test: {progressData.aptitude.lastTest}
          </p>
          <button className="btn" style={{ background: '#10b981' }} onClick={() => navigate('/aptitude')}>
            Take Test
          </button>
        </div>
      </div>
    </div>
  );
}
