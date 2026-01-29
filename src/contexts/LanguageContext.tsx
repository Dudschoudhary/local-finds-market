import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations, getTranslation } from '@/lib/translations';
import { getCategoryName } from '@/data/categories';

const STORAGE_KEY = 'localmart_language';

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => string;
  getCategoryLabel: (category: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return (stored === 'hi' || stored === 'en') ? stored : 'hi';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (path: string): string => {
    return getTranslation(path, language);
  };

  const getCategoryLabel = (category: string): string => {
    // First try the new category system
    const newCategoryName = getCategoryName(category, language);
    if (newCategoryName !== category) {
      return newCategoryName;
    }
    
    // Fallback to old translations for backward compatibility
    const categoryTranslations = translations.categories as Record<string, { en: string; hi: string }>;
    if (categoryTranslations[category]) {
      return categoryTranslations[category][language];
    }
    return category;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getCategoryLabel }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
