import { useTranslate, useTolgee } from '@tolgee/react';

const AVAILABLE_LANGUAGES = [
  { code: 'fr', name: 'FranÃ§ais', flag: 'í·«í··' },
  { code: 'en', name: 'English', flag: 'í·ºí·¸' },
  { code: 'de', name: 'Deutsch', flag: 'í·©í·ª' },
  { code: 'es', name: 'EspaÃ±ol', flag: 'í·ªí·¸' },
  { code: 'ru', name: 'Ð ÑƒÑÑÐºÐ¸Ð¹', flag: 'í··í·º' },
];

export const useTranslation = () => {
  const { t } = useTranslate();
  const tolgee = useTolgee(['language']);

  return {
    t,
    language: tolgee.getLanguage(),
    changeLanguage: (lang) => tolgee.changeLanguage(lang),
    getAvailableLanguages: () => AVAILABLE_LANGUAGES,
  };
};
