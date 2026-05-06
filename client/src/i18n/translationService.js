// Translation service for VisiConnect
import frTranslations from './fr.json';
import enTranslations from './en.json';
import deTranslations from './de.json';
import esTranslations from './es.json';
import ruTranslations from './ru.json';
import caTranslations from './ca.json';

class TranslationService {
  constructor() {
    this.currentLanguage = localStorage.getItem('visiconnect_language') || 'fr';
    this.fallbackLanguage = 'fr';
    this.translations = {
      'fr': frTranslations,
      'en': enTranslations,
      'de': deTranslations,
      'es': esTranslations,
      'ru': ruTranslations,
      'ca': caTranslations
    };
  }

  // Load all translation files (now synchronous)
  loadTranslations() {
    // Translations are already loaded in constructor
    return Promise.resolve();
  }

  // Get translated text. Second arg can be:
  //  - a string  -> used as the fallback if the key is missing in all locales
  //  - an object -> interpolation params (and { returnObjects: true } to get arrays/objects)
  t(key, paramsOrFallback = {}) {
    const isStringFallback = typeof paramsOrFallback === 'string';
    const params = isStringFallback ? {} : (paramsOrFallback || {});
    const stringFallback = isStringFallback ? paramsOrFallback : null;

    const keys = key.split('.');
    let translation = this.translations[this.currentLanguage];

    // Navigate through nested object
    for (const k of keys) {
      translation = translation?.[k];
    }

    // Fallback to default language if translation not found
    if (translation == null && this.currentLanguage !== this.fallbackLanguage) {
      translation = this.translations[this.fallbackLanguage];
      for (const k of keys) {
        translation = translation?.[k];
      }
    }

    // Use provided string fallback if no translation found
    if (translation == null) {
      if (stringFallback != null) {
        return this.replaceParams(stringFallback, params);
      }
      if (typeof console !== 'undefined' && console.warn) {
        console.warn(`Translation not found for key: ${key}`);
      }
      return key;
    }

    // Check if translation is an object or array (return as is if returnObjects is true)
    if (typeof translation === 'object' && params.returnObjects) {
      return translation;
    }

    // Replace parameters in translation
    return this.replaceParams(translation, params);
  }

  // Replace parameters in translation string
  replaceParams(text, params) {
    if (typeof text !== 'string') return text;
    return Object.keys(params).reduce((result, key) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      return result.replace(regex, params[key]);
    }, text);
  }

  // Change language
  setLanguage(language) {
    this.currentLanguage = language;
    localStorage.setItem('visiconnect_language', language);
    
    // Trigger language change event
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language } 
    }));
  }

  // Get current language
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  // Get available languages
  getAvailableLanguages() {
    return [
      { code: 'fr', name: 'Français', flag: '🇫🇷' },
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
      { code: 'es', name: 'Español', flag: '🇪🇸' },
      { code: 'ru', name: 'Русский', flag: '🇷🇺' },
      { code: 'ca', name: 'Català', flag: '🏴󠁥󠁳󠁣󠁴󠁿' }
    ];
  }

  // Format date according to current language
  formatDate(date, options = {}) {
    const locales = {
      'fr': 'fr-FR',
      'en': 'en-US',
      'de': 'de-DE',
      'es': 'es-ES',
      'ru': 'ru-RU',
      'ca': 'ca-ES'
    };

    return new Intl.DateTimeFormat(
      locales[this.currentLanguage] || locales['fr'], 
      options
    ).format(date);
  }

  // Format number according to current language
  formatNumber(number, options = {}) {
    const locales = {
      'fr': 'fr-FR',
      'en': 'en-US',
      'de': 'de-DE',
      'es': 'es-ES',
      'ru': 'ru-RU',
      'ca': 'ca-ES'
    };

    return new Intl.NumberFormat(
      locales[this.currentLanguage] || locales['fr'], 
      options
    ).format(number);
  }

  // Format currency according to current language
  formatCurrency(amount, currency = 'EUR') {
    const currencyMap = {
      'fr': 'EUR',
      'en': 'USD',
      'de': 'EUR',
      'es': 'EUR',
      'ru': 'RUB',
      'ca': 'EUR'
    };

    return this.formatNumber(amount, {
      style: 'currency',
      currency: currency || currencyMap[this.currentLanguage] || 'EUR'
    });
  }
}

// Create singleton instance
const translationService = new TranslationService();

export default translationService;