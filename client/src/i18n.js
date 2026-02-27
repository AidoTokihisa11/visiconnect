import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import local JS files
import fr from './i18n/locales/fr';
import en from './i18n/locales/en';
import de from './i18n/locales/de';
import es from './i18n/locales/es';
import ru from './i18n/locales/ru';

const resources = {
  fr: {
    translation: fr
  },
  en: {
    translation: en
  },
  de: {
    translation: de
  },
  es: {
    translation: es
  },
  ru: {
    translation: ru
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;