import { useState, useEffect } from 'react';
import translationService from '../i18n/translationService';

// Custom hook for translations
export const useTranslation = () => {
  const [language, setLanguage] = useState(translationService.getCurrentLanguage());
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const handleLanguageChange = (event) => {
      setLanguage(event.detail.language);
      forceUpdate({}); // Force re-render when language changes
    };

    window.addEventListener('languageChanged', handleLanguageChange);

    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);

  const t = (key, params = {}) => {
    return translationService.t(key, params);
  };

  const changeLanguage = (newLanguage) => {
    translationService.setLanguage(newLanguage);
  };

  const formatDate = (date, options = {}) => {
    return translationService.formatDate(date, options);
  };

  const formatNumber = (number, options = {}) => {
    return translationService.formatNumber(number, options);
  };

  const formatCurrency = (amount, currency) => {
    return translationService.formatCurrency(amount, currency);
  };

  const getAvailableLanguages = () => {
    return translationService.getAvailableLanguages();
  };

  return {
    t,
    language,
    changeLanguage,
    formatDate,
    formatNumber,
    formatCurrency,
    getAvailableLanguages
  };
};