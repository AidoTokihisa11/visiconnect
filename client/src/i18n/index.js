// Main i18n export file
import translationService from './translationService';

export { default as translationService } from './translationService';
export { useTranslation } from '../hooks/useTranslation';

// Language translations
export { default as frTranslations } from './locales/fr';
export { default as enTranslations } from './locales/en';
export { default as deTranslations } from './locales/de';
export { default as esTranslations } from './locales/es';
export { default as ruTranslations } from './locales/ru';

// Ensure translations are loaded
translationService.loadTranslations();

export default translationService;