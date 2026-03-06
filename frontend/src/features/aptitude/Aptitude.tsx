import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../shared/contexts/AuthContext';
import { useSubscription } from '../../shared/hooks/useSubscription';
import CyberpunkLayout from '../../components/CyberpunkLayout';

export default function Aptitude() {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useAuthContext();
  const { subscription, loading: subLoading } = useSubscription();
  
  const [selectedSection, setSelectedSection] = useState<'logical' | 'mathematics' | 'technical'>('logical');
  const [selectedTopic, setSelectedTopic] = useState(0);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  if (authLoading || subLoading) {
    return <div className="container">Loading...</div>;
  }

  // Allow access for superusers/staff or premium subscribers
  const hasAccess = isAuthenticated && (subscription.active || user?.is_staff || user?.is_superuser);

  if (!hasAccess) {
    return (
      <CyberpunkLayout>
        <div className="plh-card mx-auto max-w-xl text-center p-10">
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🔒</div>
          <h2 className="text-3xl font-semibold mb-3" style={{ color: '#8B5CF6' }}>
            Premium Feature
          </h2>
          <p style={{ color: '#D1D5DB' }} className="mb-6 text-base">
            Aptitude Assessment is available only for premium subscribers.
          </p>
          <button 
            className="plh-button-primary"
            onClick={() => navigate('/pricing')}
          >
            Upgrade Now
          </button>
        </div>
      </CyberpunkLayout>
    );
  }

  const aptitudeSections = {
    logical: {
      title: 'Logical Reasoning',
      icon: '🧠',
      color: '#3b82f6',
      topics: [
        {
          title: 'Pattern Recognition',
          description: 'Identify patterns in sequences, shapes, and numbers',
          questions: 15,
          difficulty: 'Easy',
          timeLimit: '20 min'
        },
        {
          title: 'Logical Sequences',
          description: 'Complete number and letter sequences',
          questions: 12,
          difficulty: 'Medium',
          timeLimit: '15 min'
        },
        {
          title: 'Analogies & Relationships',
          description: 'Find relationships between concepts',
          questions: 10,
          difficulty: 'Medium',
          timeLimit: '12 min'
        },
        {
          title: 'Syllogisms',
          description: 'Logical deduction from given statements',
          questions: 15,
          difficulty: 'Hard',
          timeLimit: '18 min'
        },
        {
          title: 'Blood Relations',
          description: 'Solve family relationship puzzles',
          questions: 10,
          difficulty: 'Easy',
          timeLimit: '10 min'
        },
        {
          title: 'Direction & Distance',
          description: 'Calculate positions and distances',
          questions: 12,
          difficulty: 'Medium',
          timeLimit: '15 min'
        },
        {
          title: 'Coding-Decoding',
          description: 'Decode patterns in letters and numbers',
          questions: 15,
          difficulty: 'Medium',
          timeLimit: '18 min'
        },
        {
          title: 'Puzzles & Arrangements',
          description: 'Solve seating arrangements and scheduling',
          questions: 20,
          difficulty: 'Hard',
          timeLimit: '25 min'
        }
      ]
    },
    mathematics: {
      title: 'Mathematics',
      icon: '📐',
      color: '#10b981',
      topics: [
        {
          title: 'Number Systems',
          description: 'HCF, LCM, divisibility rules, prime numbers',
          questions: 15,
          difficulty: 'Easy',
          timeLimit: '15 min'
        },
        {
          title: 'Percentages & Ratios',
          description: 'Calculate percentages, ratios, and proportions',
          questions: 12,
          difficulty: 'Easy',
          timeLimit: '12 min'
        },
        {
          title: 'Profit & Loss',
          description: 'Business mathematics and profit calculations',
          questions: 10,
          difficulty: 'Medium',
          timeLimit: '12 min'
        },
        {
          title: 'Simple & Compound Interest',
          description: 'Interest calculations and time value of money',
          questions: 10,
          difficulty: 'Medium',
          timeLimit: '15 min'
        },
        {
          title: 'Time & Work',
          description: 'Work efficiency and time management problems',
          questions: 12,
          difficulty: 'Medium',
          timeLimit: '15 min'
        },
        {
          title: 'Time, Speed & Distance',
          description: 'Motion problems and relative speed',
          questions: 15,
          difficulty: 'Medium',
          timeLimit: '18 min'
        },
        {
          title: 'Algebra & Equations',
          description: 'Linear equations, quadratic equations, inequalities',
          questions: 15,
          difficulty: 'Hard',
          timeLimit: '20 min'
        },
        {
          title: 'Geometry & Mensuration',
          description: 'Areas, volumes, angles, and shapes',
          questions: 12,
          difficulty: 'Medium',
          timeLimit: '15 min'
        },
        {
          title: 'Probability & Statistics',
          description: 'Basic probability, mean, median, mode',
          questions: 10,
          difficulty: 'Medium',
          timeLimit: '12 min'
        },
        {
          title: 'Data Interpretation',
          description: 'Analyze charts, graphs, and tables',
          questions: 20,
          difficulty: 'Hard',
          timeLimit: '25 min'
        }
      ]
    },
    technical: {
      title: 'Technical Aptitude',
      icon: '💻',
      color: '#f59e0b',
      topics: [
        {
          title: 'Python Fundamentals',
          description: 'Variables, data types, operators, control flow',
          questions: 20,
          difficulty: 'Easy',
          timeLimit: '20 min'
        },
        {
          title: 'Python Data Structures',
          description: 'Lists, tuples, dictionaries, sets',
          questions: 18,
          difficulty: 'Medium',
          timeLimit: '20 min'
        },
        {
          title: 'Python Functions & OOP',
          description: 'Functions, classes, inheritance, polymorphism',
          questions: 15,
          difficulty: 'Medium',
          timeLimit: '18 min'
        },
        {
          title: 'NumPy & Arrays',
          description: 'Array operations, broadcasting, indexing',
          questions: 15,
          difficulty: 'Medium',
          timeLimit: '18 min'
        },
        {
          title: 'Pandas & DataFrames',
          description: 'Data manipulation, filtering, grouping',
          questions: 20,
          difficulty: 'Medium',
          timeLimit: '25 min'
        },
        {
          title: 'Data Visualization',
          description: 'Matplotlib, Seaborn, plotting techniques',
          questions: 12,
          difficulty: 'Easy',
          timeLimit: '15 min'
        },
        {
          title: 'Machine Learning Basics',
          description: 'Supervised vs unsupervised, model evaluation',
          questions: 15,
          difficulty: 'Medium',
          timeLimit: '18 min'
        },
        {
          title: 'Scikit-learn',
          description: 'ML algorithms, preprocessing, pipelines',
          questions: 18,
          difficulty: 'Hard',
          timeLimit: '22 min'
        },
        {
          title: 'Deep Learning Concepts',
          description: 'Neural networks, activation functions, backpropagation',
          questions: 15,
          difficulty: 'Hard',
          timeLimit: '20 min'
        },
        {
          title: 'TensorFlow & Keras',
          description: 'Building and training neural networks',
          questions: 15,
          difficulty: 'Hard',
          timeLimit: '20 min'
        },
        {
          title: 'Natural Language Processing',
          description: 'Text processing, tokenization, embeddings',
          questions: 12,
          difficulty: 'Hard',
          timeLimit: '18 min'
        },
        {
          title: 'Computer Vision',
          description: 'Image processing, CNNs, object detection',
          questions: 12,
          difficulty: 'Hard',
          timeLimit: '18 min'
        },
        {
          title: 'Model Deployment',
          description: 'Flask, FastAPI, Docker, cloud deployment',
          questions: 10,
          difficulty: 'Medium',
          timeLimit: '15 min'
        }
      ]
    }
  };

  const currentSection = aptitudeSections[selectedSection];
  const currentTopic = currentSection.topics[selectedTopic];

  // ── Sidebar content ──────────────────────────────────────────────
  const sidebarContent = (
    <>
      {/* Section Tabs */}
      <div style={{ marginBottom: '1.5rem' }}>
        {Object.entries(aptitudeSections).map(([key, section]) => (
          <div
            key={key}
            className={`plh-sidebar-card${selectedSection === key ? ' active' : ''}`}
            role="button"
            tabIndex={0}
            onClick={() => {
              setSelectedSection(key as any);
              setSelectedTopic(0);
            }}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedSection(key as any); setSelectedTopic(0); } }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem' }}
          >
            <span style={{ fontSize: '1.5rem' }}>{section.icon}</span>
            <div>
              <div style={{ color: '#F9FAFB', fontWeight: selectedSection === key ? 600 : 500, fontSize: '0.95rem' }}>
                {section.title}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.25rem' }}>
                {section.topics.length} Topics
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Topics List */}
      <h4 style={{ color: '#8B5CF6', marginBottom: '0.75rem', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {currentSection.title} Topics
      </h4>
      {currentSection.topics.map((topic, idx) => (
        <div
          key={idx}
          className={`plh-sidebar-card${selectedTopic === idx ? ' active' : ''}`}
          role="button"
          tabIndex={0}
          onClick={() => setSelectedTopic(idx)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedTopic(idx); } }}
        >
          <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#F9FAFB', marginBottom: '0.25rem' }}>
            {topic.title}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#9CA3AF', display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <span>📝 {topic.questions}Q</span>
            <span>⏱️ {topic.timeLimit}</span>
            <span style={{ color: topic.difficulty === 'Easy' ? '#10b981' : topic.difficulty === 'Medium' ? '#f59e0b' : '#ef4444' }}>
              {topic.difficulty}
            </span>
          </div>
        </div>
      ))}
    </>
  );

  // ── Render ────────────────────────────────────────────────────────
  return (
    <CyberpunkLayout sidebar={sidebarContent} sidebarTitle="Aptitude Sections">
      {/* Topic Header Card */}
      <div className="plh-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '2.5rem' }}>{currentSection.icon}</span>
          <div>
            <div style={{ fontSize: '0.85rem', color: '#8B5CF6', fontWeight: 600, marginBottom: '0.25rem' }}>
              {currentSection.title}
            </div>
            <h2 style={{ fontSize: '1.875rem', color: '#8B5CF6', margin: 0 }}>
              {currentTopic.title}
            </h2>
          </div>
        </div>

        <p style={{ color: '#D1D5DB', fontSize: '1.05rem', marginBottom: '1.5rem' }}>
          {currentTopic.description}
        </p>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {[
            { icon: '📝', label: 'Questions', value: currentTopic.questions },
            { icon: '⏱️', label: 'Time Limit', value: currentTopic.timeLimit },
            { icon: '📊', label: 'Difficulty', value: currentTopic.difficulty,
              color: currentTopic.difficulty === 'Easy' ? '#10b981' : currentTopic.difficulty === 'Medium' ? '#f59e0b' : '#ef4444' },
          ].map((stat) => (
            <div key={stat.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', background: '#161B22', borderRadius: '8px', border: '1px solid #374151' }}>
              <span style={{ fontSize: '1.2rem' }}>{stat.icon}</span>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{stat.label}</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, color: stat.color || '#F9FAFB' }}>{stat.value}</div>
              </div>
            </div>
          ))}
        </div>

        <button className="plh-button-primary" style={{ marginTop: '1.5rem' }}>
          Start Test
        </button>
      </div>

      {/* Learning Roadmap */}
      <div className="plh-card" style={{ padding: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', color: '#8B5CF6', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span>🗺️</span><span>Learning Roadmap</span>
        </h3>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {currentSection.topics.map((topic, idx) => (
            <div
              key={idx}
              className={`plh-sidebar-card${idx === selectedTopic ? ' active' : ''}`}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedTopic(idx)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedTopic(idx); } }}
              style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}
            >
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: `linear-gradient(135deg, #8B5CF6, #6D28D9)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                {idx + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: '#F9FAFB', marginBottom: '0.25rem' }}>{topic.title}</div>
                <div style={{ fontSize: '0.85rem', color: '#D1D5DB' }}>{topic.description}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'flex-end', fontSize: '0.75rem', color: '#9CA3AF' }}>
                <span>{topic.questions} Questions</span>
                <span>{topic.timeLimit}</span>
                <span style={{ color: topic.difficulty === 'Easy' ? '#10b981' : topic.difficulty === 'Medium' ? '#f59e0b' : '#ef4444', fontWeight: 600 }}>
                  {topic.difficulty}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CyberpunkLayout>
  );
}
