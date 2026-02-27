import { useTranslation as useI18Next } from 'react-i18next';

// Wrapper hook to keep API compatibility but use i18next
export const useTranslation = () => {
  const { t, i18n } = useI18Next();

  const changeLanguage = (newLanguage) => {
    i18n.changeLanguage(newLanguage);
  };
  
  const getAvailableLanguages = () => [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ];

  return {
    t,
    language: i18n.language,
    changeLanguage,
    getAvailableLanguages,
  };
};
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