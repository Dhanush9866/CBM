import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translationService, StaticTranslations } from '@/services/translationService';

interface TranslationContextType {
  currentLanguage: string;
  translations: StaticTranslations | null;
  isLoading: boolean;
  error: string | null;
  changeLanguage: (language: string) => Promise<void>;
  supportedLanguages: string[];
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
  defaultLanguage?: string;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ 
  children, 
  defaultLanguage = 'en' 
}) => {
  const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage);
  const [translations, setTranslations] = useState<StaticTranslations | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [supportedLanguages] = useState(['en', 'fr', 'pt', 'es', 'ru']);

  // Debug currentLanguage changes
  useEffect(() => {
    console.log('currentLanguage state changed to:', currentLanguage);
  }, [currentLanguage]);

  const changeLanguage = async (language: string) => {
    console.log('changeLanguage called with:', language);
    if (!supportedLanguages.includes(language)) {
      setError(`Unsupported language: ${language}`);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Check cache first
      const cached = translationService.getCachedTranslations(language);
      if (cached) {
        console.log('Using cached translations for:', language);
        setTranslations(cached);
        setCurrentLanguage(language);
        localStorage.setItem('preferredLanguage', language);
        return;
      }

      // Fetch from API
      console.log('Fetching new translations for:', language);
      const newTranslations = await translationService.getStaticTranslations(language);
      setTranslations(newTranslations);
      setCurrentLanguage(language);
      localStorage.setItem('preferredLanguage', language);
      console.log('Language changed to:', language);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to change language');
      console.error('Error changing language:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize translations on mount
  useEffect(() => {
    const initializeTranslations = async () => {
      const savedLanguage = localStorage.getItem('preferredLanguage') || defaultLanguage;
      
      // Check if we have cached translations
      const cached = translationService.getCachedTranslations(savedLanguage);
      if (cached) {
        setTranslations(cached);
        setCurrentLanguage(savedLanguage);
        return;
      }

      // Fetch translations
      await changeLanguage(savedLanguage);
    };

    initializeTranslations();
  }, [defaultLanguage]);

  const value: TranslationContextType = {
    currentLanguage,
    translations,
    isLoading,
    error,
    changeLanguage,
    supportedLanguages,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

export default TranslationContext;

