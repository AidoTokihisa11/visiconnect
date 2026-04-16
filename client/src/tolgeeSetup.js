import { Tolgee, DevTools, FormatSimple } from "@tolgee/react";

import fr from "./i18n/fr.json";
import en from "./i18n/en.json";
import de from "./i18n/de.json";
import es from "./i18n/es.json";
import ru from "./i18n/ru.json";

// Check if we are in development mode (Vite feature)
const isDev = import.meta.env.DEV;

const tolgee = Tolgee()
  .use(FormatSimple())
  // Use DevTools ONLY in development. This saves bundle size and networking in prod.
  .use(isDev ? DevTools() : [])
  .init({
    defaultLanguage: 'fr',
    availableLanguages: ['fr', 'en', 'es', 'de', 'ru'],

    // For development: Fetch translations from the Tolgee Platform
    // For Production: apiUrl and apiKey won't be set, ensuring zero latency
    apiUrl: import.meta.env.VITE_TOLGEE_API_URL,
    apiKey: import.meta.env.VITE_TOLGEE_API_KEY,

    // Static data bundled directly: zero latency rendering
    staticData: {
      fr,
      en,
      es,
      de,
      ru
    }
  });

export default tolgee;
