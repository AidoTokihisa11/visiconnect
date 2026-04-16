import { Tolgee, devTools, TolgeeProvider, FormatSimple } from "@tolgee/react";

import fr from "./i18n/locales/fr.js";
import en from "./i18n/locales/en.js";
import de from "./i18n/locales/de.js";
import es from "./i18n/locales/es.js";
import ru from "./i18n/locales/ru.js";

const tolgee = Tolgee()
  .use(devTools())
  .use(FormatSimple())
  .init({
    defaultLanguage: 'fr',
    availableLanguages: ['fr', 'en', 'es', 'de', 'ru'],

    apiUrl: import.meta.env.VITE_TOLGEE_API_URL, 
    apiKey: import.meta.env.VITE_TOLGEE_API_KEY,

    staticData: {
      fr,
      en,
      es,
      de,
      ru
    }
  });

export default tolgee;
