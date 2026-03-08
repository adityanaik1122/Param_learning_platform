import { useState } from 'react';
import axios from 'axios';
// Translation feature disabled - will be enabled later
// import { useLanguage } from '../shared/contexts/LanguageContext';

interface SearchResult {
  definition: string;
  videos: Array<{
    title: string;
    videoId: string;
    thumbnail: string;
    channelTitle: string;
    description?: string;
  }>;
  source?: string;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  
  // Translation feature disabled - will be enabled later
  // const { currentLanguage, translateBatch } = useLanguage();
  // const [translations, setTranslations] = useState<Record<string, string>>({});

  // Translation disabled - using English only for now
  // useEffect(() => {
  //   ... translation code ...
  // }, [currentLanguage, translateBatch]);

  // Helper function - returns original text (no translation)
  const t = (text: string) => text;

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setError('');
    setSearchResult(null);
    setSelectedVideo(null);

    try {
      // Call backend API to search
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await axios.post(`${apiUrl}/api/search/`, {
        query: searchQuery
      });

      setSearchResult(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to search. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="container" style={{ position: 'relative', zIndex: 10 }}>
      <div className="hero">
        <h1>{t('Master AI with Personalized Learning')}</h1>
        <p className="subtitle">{t('Your intelligent companion on the journey to becoming an AI expert')}</p>
        
        <div className="search-box">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input 
            type="text" 
            placeholder={t('Search AI/ML topics (e.g., What is NLP?...)')}
            aria-label="Search AI and ML topics"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isSearching}
          />
          <button 
            className="btn" 
            onClick={handleSearch}
            disabled={isSearching || !searchQuery.trim()}
          >
            {isSearching ? t('Searching...') : t('Search')}
          </button>
        </div>

        {error && (
          <div role="alert" style={{ 
            marginTop: '1rem', 
            padding: '1rem', 
            background: 'rgba(239, 68, 68, 0.1)', 
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            color: '#ef4444'
          }}>
            {error}
          </div>
        )}

        {searchResult && (
          <div style={{ marginTop: '2rem', textAlign: 'left' }}>
            {/* Definition Section */}
            <div style={{
              background: 'rgba(30, 41, 59, 0.5)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <h3 style={{ color: '#3b82f6', fontSize: '1.5rem', margin: 0 }}>
                  📖 {t('Definition')}
                </h3>
                {searchResult.source === 'llm_generated' && (
                  <span style={{ 
                    fontSize: '0.75rem', 
                    color: '#10b981', 
                    background: 'rgba(16, 185, 129, 0.1)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px'
                  }}>
                    {t('AI-Generated')}
                  </span>
                )}
              </div>
              <div style={{ 
                color: '#e5e7eb', 
                lineHeight: '1.8', 
                fontSize: '1.05rem',
                whiteSpace: 'pre-line'
              }}>
                {searchResult.definition}
              </div>
            </div>

            {/* Video Player Section */}
            {selectedVideo && (
              <div style={{ marginBottom: '2rem' }}>
                <div style={{
                  background: 'rgba(30, 41, 59, 0.5)',
                  padding: '1rem',
                  borderRadius: '16px',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '1rem'
                  }}>
                    <h3 style={{ color: '#3b82f6', margin: 0 }}>
                      ▶️ {t('Now Playing')}
                    </h3>
                    <button
                      onClick={() => setSelectedVideo(null)}
                      style={{
                        background: 'rgba(239, 68, 68, 0.2)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#ef4444',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}
                    >
                      {t('Close Player')}
                    </button>
                  </div>
                  <div style={{ 
                    position: 'relative',
                    paddingBottom: '56.25%',
                    height: 0,
                    overflow: 'hidden',
                    borderRadius: '12px'
                  }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                      title="Educational video player"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 'none'
                      }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            )}

            {/* YouTube Videos Section */}
            {searchResult.videos && searchResult.videos.length > 0 && (
              <div>
                <h3 style={{ color: '#3b82f6', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                  🎥 {t('Educational Videos')}
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))',
                  gap: '2rem'
                }}>
                  {searchResult.videos.map((video, idx) => (
                    <div
                      key={idx}
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedVideo(video.videoId)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedVideo(video.videoId); } }}
                      style={{
                        background: 'rgba(30, 41, 59, 0.5)',
                        borderRadius: '16px',
                        border: selectedVideo === video.videoId 
                          ? '2px solid rgba(59, 130, 246, 0.8)' 
                          : '1px solid rgba(59, 130, 246, 0.2)',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        transform: selectedVideo === video.videoId ? 'scale(1.02)' : 'scale(1)'
                      }}
                      onMouseEnter={(e) => {
                        if (selectedVideo !== video.videoId) {
                          e.currentTarget.style.transform = 'translateY(-8px)';
                          e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedVideo !== video.videoId) {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                        }
                      }}
                    >
                      <div style={{ position: 'relative' }}>
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                        />
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          background: 'rgba(0, 0, 0, 0.7)',
                          borderRadius: '50%',
                          width: '60px',
                          height: '60px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '24px'
                        }}>
                          ▶️
                        </div>
                      </div>
                      <div style={{ padding: '1.5rem' }}>
                        <h4 style={{ 
                          color: '#ffffff', 
                          marginBottom: '0.75rem',
                          fontSize: '1.1rem',
                          lineHeight: '1.4',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          minHeight: '2.8rem'
                        }}>
                          {video.title}
                        </h4>
                        <p style={{ 
                          color: '#3b82f6', 
                          fontSize: '0.9rem',
                          marginBottom: '0.5rem',
                          fontWeight: '500'
                        }}>
                          {video.channelTitle}
                        </p>
                        {video.description && (
                          <p style={{ 
                            color: '#9ca3af', 
                            fontSize: '0.85rem',
                            lineHeight: '1.5',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {video.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="features">
        <h2>{t('About Param Learning Hub')}</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>{t('Structured Curriculum')}</h3>
            <p>{t('Follow a carefully designed learning path that takes you from fundamentals to advanced AI concepts with hands-on projects.')}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💻</div>
            <h3>{t('Live AI Compiler')}</h3>
            <p>{t('Write and execute code directly in your browser with our integrated development environment and instant feedback.')}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>{t('Career Readiness')}</h3>
            <p>{t('Build real-world projects and develop skills that employers are actively seeking in the AI and machine learning industry.')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
