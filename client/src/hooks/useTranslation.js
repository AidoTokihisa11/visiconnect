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

  // Helper functions that might be used elsewhere
  const formatDate = (date, options = {}) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString(i18n.language, options);
  };

  const formatNumber = (number, options = {}) => {
    if (isNaN(number)) return number;
    return new Intl.NumberFormat(i18n.language, options).format(number);
  };

  const formatCurrency = (amount, currency = 'EUR') => {
    if (isNaN(amount)) return amount;
    return new Intl.NumberFormat(i18n.language, { style: 'currency', currency }).format(amount);
  };

  return {
    t,
    language: i18n.language,
    changeLanguage,
    getAvailableLanguages,
    formatDate,
    formatNumber,
    formatCurrency
  };
};