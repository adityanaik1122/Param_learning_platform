import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Code, 
  Brain, 
  Smartphone, 
  BarChart3, 
  Cpu, 
  Database,
  Globe,
  Coffee
} from 'lucide-react';
import { courseProgressAPI } from '../services/courseProgressApi';

interface Course {
  id: string;
  title: string;
  description: string;
  icon: any;
  progress: number;
  isCurrent?: boolean;
  color: string;
}

export default function LearningPathCatalog() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  const baseCourses: Course[] = [
    {
      id: 'mern',
      title: 'Full Stack Web Development',
      description: 'React, Node - MERN Stack',
      icon: Code,
      progress: 0,
      color: '#8B5CF6'
    },
    {
      id: 'python-fullstack',
      title: 'Full Stack Web Development',
      description: 'Python (Django/Flask)',
      icon: Database,
      progress: 0,
      color: '#A78BFA'
    },
    {
      id: 'java-fullstack',
      title: 'Full Stack Web Development',
      description: 'Java (Spring Boot)',
      icon: Coffee,
      progress: 0,
      color: '#8B5CF6'
    },
    {
      id: 'mean',
      title: 'Full Stack Web Development',
      description: '.Net & Angular - MEAN Stack',
      icon: Globe,
      progress: 0,
      color: '#A78BFA'
    },
    {
      id: 'react-native',
      title: 'Mobile App Development',
      description: 'React Native',
      icon: Smartphone,
      progress: 0,
      color: '#8B5CF6'
    },
    {
      id: 'data-analytics',
      title: 'Data Analytics',
      description: 'Python (Pandas, NumPy)',
      icon: BarChart3,
      progress: 0,
      color: '#A78BFA'
    },
    {
      id: 'ai-ml',
      title: 'Data Science and AI/ML',
      description: 'Python (TensorFlow, PyTorch)',
      icon: Brain,
      progress: 0,
      isCurrent: false,
      color: '#8B5CF6'
    },
    {
      id: 'iot-ai',
      title: 'AI/ML Integration with IOT',
      description: 'Edge Computing & Smart Devices',
      icon: Cpu,
      progress: 0,
      color: '#A78BFA'
    }
  ];

  const [courses, setCourses] = useState<Course[]>(baseCourses);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    fetchCourseProgress();
  }, []);

  const fetchCourseProgress = async () => {
    try {
      const progressData = await courseProgressAPI.getCourseProgress();
      
      // Update courses with real progress
      const updatedCourses = baseCourses.map(course => {
        const courseData = progressData.find(p => p.id === course.id);
        return {
          ...course,
          progress: courseData?.progress || 0,
          isCurrent: courseData?.is_current || false,
        };
      });
      
      setCourses(updatedCourses);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch course progress:', error);
      // Fall back to dummy data if API fails
      setCourses(baseCourses);
      setLoading(false);
    }
  };

  const handleStartLearning = async (courseId: string) => {
    // Only AI/ML course is available
    if (courseId === 'ai-ml') {
      try {
        // Set this course as current
        await courseProgressAPI.setCurrentCourse(courseId);
        navigate('/learning-path');
      } catch (error) {
        console.error('Failed to set current course:', error);
        navigate('/learning-path');
      }
    } else {
      navigate(`/coming-soon/${courseId}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0B0E14' }}>
        <div className="text-gray-400">Loading courses...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#0B0E14' }}>
      {/* Header */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 
            className="text-5xl font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #3B82F6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 30px rgba(139, 92, 246, 0.5)',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '0.02em'
            }}
          >
            Courses
          </h1>
          <p className="text-gray-400 text-lg">
            Choose your path and master cutting-edge technologies
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => {
            const Icon = course.icon;
            const isHovered = hoveredCard === course.id;
            
            return (
              <div
                key={course.id}
                className={`plh-card relative group`}
                role="button"
                tabIndex={0}
                onMouseEnter={() => setHoveredCard(course.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleStartLearning(course.id)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleStartLearning(course.id); } }}
                style={{
                  padding: '1.5rem',
                  cursor: 'pointer',
                  ...(course.isCurrent ? {
                    border: '2px solid rgba(139, 92, 246, 0.6)',
                    background: 'rgba(139, 92, 246, 0.1)'
                  } : {})
                }}
              >
                {/* Current Course Badge */}
                {course.isCurrent && (
                  <div
                    className="absolute -top-3 -right-3 px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
                      boxShadow: '0 0 20px rgba(139, 92, 246, 0.8)',
                      textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
                    }}
                  >
                    CURRENT
                  </div>
                )}

                {/* Icon */}
                <div
                  className="mb-4 inline-flex p-3 rounded-lg"
                  style={{
                    background: `${course.color}20`,
                    border: `1px solid ${course.color}40`
                  }}
                >
                  <Icon 
                    size={32} 
                    style={{ 
                      color: course.color,
                      filter: isHovered ? 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.8))' : 'none'
                    }} 
                  />
                </div>

                {/* Title */}
                <h3 
                  className="text-xl font-bold mb-2"
                  style={{ 
                    color: '#E5E7EB',
                    textShadow: course.isCurrent ? '0 0 10px rgba(139, 92, 246, 0.5)' : 'none'
                  }}
                >
                  {course.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 min-h-[40px]">
                  {course.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500">Progress</span>
                    <span 
                      className="text-xs font-bold"
                      style={{ color: course.color }}
                    >
                      {course.progress}%
                    </span>
                  </div>
                  <div
                    className="w-full h-2 rounded-full overflow-hidden"
                    style={{ background: 'rgba(139, 92, 246, 0.1)' }}
                  >
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${course.progress}%`,
                        background: 'linear-gradient(90deg, #06B6D4 0%, #22D3EE 100%)',
                        boxShadow: '0 0 10px rgba(6, 182, 212, 0.5)'
                      }}
                    />
                  </div>
                </div>

                {/* Start Learning Button */}
                <button
                  onClick={() => handleStartLearning(course.id)}
                  className="plh-button-primary w-full py-1.5 rounded-md font-medium text-xs transition-all duration-300"
                >
                  {course.isCurrent ? 'Continue Learning' : 'Start Learning'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
