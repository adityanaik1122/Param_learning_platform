import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient } from '../api/axios';

interface Language {
  code: string;
  name: string;
  native_name: string;
  indic_code: string;
  is_active: boolean;
}

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  supportedLanguages: Language[];
  translate: (text: string, contentType?: string) => Promise<string>;
  translateBatch: (texts: string[], contentType?: string) => Promise<string[]>;
  loading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  const [supportedLanguages, setSupportedLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(false);
  const [translationCache, setTranslationCache] = useState<Map<string, string>>(new Map());

  // Load supported languages on mount
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await apiClient.get('/translation/supported_languages/');
        setSupportedLanguages(response.data);
      } catch (error) {
        console.error('Failed to fetch supported languages:', error);
        // Set default English if fetch fails - this prevents blocking
        setSupportedLanguages([{
          code: 'en',
          name: 'English',
          native_name: 'English',
          indic_code: 'eng_Latn',
          is_active: true
        }]);
      }
    };

    // Don't block rendering - fetch in background
    fetchLanguages().catch(err => {
      console.error('Language fetch error:', err);
    });
  }, []);

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Save language preference
  const setLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  // Translate single text
  const translate = async (text: string, contentType: string = 'general'): Promise<string> => {
    if (!text || !text.trim()) return text;
    if (currentLanguage === 'en') return text;

    // Check cache
    const cacheKey = `${text}:${currentLanguage}`;
    if (translationCache.has(cacheKey)) {
      return translationCache.get(cacheKey)!;
    }

    setLoading(true);
    try {
      const response = await apiClient.post('/translation/translate/', {
        text,
        target_language: currentLanguage,
        content_type: contentType
      });

      const translated = response.data.translated_text;
      
      // Update cache
      setTranslationCache(prev => new Map(prev).set(cacheKey, translated));
      
      return translated;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Return original text on error
    } finally {
      setLoading(false);
    }
  };

  // Translate multiple texts
  const translateBatch = async (texts: string[], contentType: string = 'general'): Promise<string[]> => {
    if (!texts || texts.length === 0) return texts;
    if (currentLanguage === 'en') return texts;

    setLoading(true);
    try {
      const response = await apiClient.post('/translation/translate_batch/', {
        texts,
        target_language: currentLanguage,
        content_type: contentType
      });

      const translations = response.data.translations.map((t: any) => t.translated);
      
      // Update cache
      texts.forEach((text, idx) => {
        const cacheKey = `${text}:${currentLanguage}`;
        setTranslationCache(prev => new Map(prev).set(cacheKey, translations[idx]));
      });
      
      return translations;
    } catch (error) {
      console.error('Batch translation error:', error);
      return texts; // Return original texts on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setLanguage,
      supportedLanguages,
      translate,
      translateBatch,
      loading
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
