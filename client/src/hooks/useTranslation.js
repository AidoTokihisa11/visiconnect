import { useTranslation as useI18Next } from 'react-i18next';

const AVAILABLE_LANGUAGES = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

export const useTranslation = () => {
  const { t, i18n } = useI18Next();

  return {
    t,
    language: i18n.language,
    changeLanguage: i18n.changeLanguage,
    getAvailableLanguages: () => AVAILABLE_LANGUAGES,
  };
};