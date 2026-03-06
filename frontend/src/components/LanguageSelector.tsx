import React from 'react';
import { useLanguage } from '../shared/contexts/LanguageContext';

export const LanguageSelector: React.FC = () => {
  const { currentLanguage, setLanguage, supportedLanguages } = useLanguage();

  // Don't render if no languages loaded yet
  if (!supportedLanguages || supportedLanguages.length === 0) {
    return null;
  }

  return (
    <div style={{ position: 'relative' }}>
      <select
        value={currentLanguage}
        onChange={(e) => setLanguage(e.target.value)}
        style={{
          padding: '0.5rem 2.5rem 0.5rem 1rem',
          background: 'rgba(31, 41, 55, 0.8)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '8px',
          color: '#e5e7eb',
          fontSize: '0.9rem',
          cursor: 'pointer',
          outline: 'none',
          appearance: 'none',
          WebkitAppearance: 'none',
          MozAppearance: 'none',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.6)';
          e.currentTarget.style.background = 'rgba(31, 41, 55, 1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
          e.currentTarget.style.background = 'rgba(31, 41, 55, 0.8)';
        }}
      >
        {supportedLanguages.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.native_name}
          </option>
        ))}
      </select>
      
      {/* Custom dropdown arrow */}
      <div style={{
        position: 'absolute',
        right: '0.75rem',
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        color: '#3b82f6',
        fontSize: '0.75rem'
      }}>
        ▼
      </div>
    </div>
  );
};
