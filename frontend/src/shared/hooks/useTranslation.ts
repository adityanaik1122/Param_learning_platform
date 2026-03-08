import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const useTranslation = (text: string, contentType: string = 'general') => {
  const { currentLanguage, translate } = useLanguage();
  const [translatedText, setTranslatedText] = useState(text);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!text) {
      setTranslatedText('');
      return;
    }

    if (currentLanguage === 'en') {
      setTranslatedText(text);
      return;
    }

    let isMounted = true;
    setLoading(true);

    translate(text, contentType)
      .then(translated => {
        if (isMounted) {
          setTranslatedText(translated);
        }
      })
      .catch(error => {
        console.error('Translation error:', error);
        if (isMounted) {
          setTranslatedText(text); // Fallback to original
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [text, currentLanguage, translate, contentType]);

  return { translatedText, loading };
};

export const useBatchTranslation = (texts: string[], contentType: string = 'general') => {
  const { currentLanguage, translateBatch } = useLanguage();
  const [translatedTexts, setTranslatedTexts] = useState<string[]>(texts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!texts || texts.length === 0) {
      setTranslatedTexts([]);
      return;
    }

    if (currentLanguage === 'en') {
      setTranslatedTexts(texts);
      return;
    }

    let isMounted = true;
    setLoading(true);

    translateBatch(texts, contentType)
      .then(translated => {
        if (isMounted) {
          setTranslatedTexts(translated);
        }
      })
      .catch(error => {
        console.error('Batch translation error:', error);
        if (isMounted) {
          setTranslatedTexts(texts); // Fallback to original
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [texts, currentLanguage, translateBatch, contentType]);

  return { translatedTexts, loading };
};
