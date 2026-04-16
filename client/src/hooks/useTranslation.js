import { useLanguage } from '../contexts/LanguageContext';

export const useTranslation = () => {
  const { t, currentLanguage, changeLanguage, availableLanguages } = useLanguage();

  return {
    t,
    language: currentLanguage,
    changeLanguage,
    getAvailableLanguages: () => availableLanguages,
  };
};