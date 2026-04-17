/**
 * TranslationService - Traduction instantanée via OpenRouter
 * 
 * Détecte automatiquement les langues différentes dans le chat
 * et traduit à la volée avec des modèles gratuits
 */

const AI_ENDPOINT = '/api/ai/chat';

// Cache pour éviter les traductions répétées
const translationCache = new Map();
const CACHE_MAX_SIZE = 500;

// Langues supportées avec leurs codes
export const SUPPORTED_LANGUAGES = {
  fr: { name: 'Français', flag: '🇫🇷' },
  en: { name: 'English', flag: '🇬🇧' },
  es: { name: 'Español', flag: '🇪🇸' },
  de: { name: 'Deutsch', flag: '🇩🇪' },
  it: { name: 'Italiano', flag: '🇮🇹' },
  pt: { name: 'Português', flag: '🇵🇹' },
  ru: { name: 'Русский', flag: '🇷🇺' },
  zh: { name: '中文', flag: '🇨🇳' },
  ja: { name: '日本語', flag: '🇯🇵' },
  ko: { name: '한국어', flag: '🇰🇷' },
  ar: { name: 'العربية', flag: '🇸🇦' },
};

class TranslationService {
  constructor() {
    this.userLanguage = 'fr';
    this.autoTranslate = false;
    this.model = 'meta-llama/llama-3.1-8b-instruct:free';
  }

  /**
   * Détecte la langue d'un texte (heuristique simple)
   */
  detectLanguage(text) {
    if (!text || text.length < 3) return null;

    // Patterns caractéristiques par langue
    const patterns = {
      fr: /\b(le|la|les|de|du|des|est|sont|pour|avec|dans|sur|que|qui|une?|et)\b/i,
      en: /\b(the|is|are|for|with|this|that|have|has|will|can|and|or|to|of|in)\b/i,
      es: /\b(el|la|los|las|es|son|para|con|que|una?|y|de|en)\b/i,
      de: /\b(der|die|das|ist|sind|für|mit|und|oder|ein|eine|auf|in)\b/i,
      it: /\b(il|la|gli|le|è|sono|per|con|che|una?|e|di|in)\b/i,
      pt: /\b(o|a|os|as|é|são|para|com|que|uma?|e|de|em)\b/i,
      ru: /[а-яА-ЯёЁ]/,
      zh: /[\u4e00-\u9fff]/,
      ja: /[\u3040-\u309f\u30a0-\u30ff]/,
      ko: /[\uac00-\ud7af\u1100-\u11ff]/,
      ar: /[\u0600-\u06ff]/,
    };

    // Compte les correspondances
    const scores = {};
    for (const [lang, pattern] of Object.entries(patterns)) {
      const matches = text.match(new RegExp(pattern, 'g'));
      scores[lang] = matches ? matches.length : 0;
    }

    // Retourne la langue avec le plus haut score
    const detected = Object.entries(scores)
      .filter(([, score]) => score > 0)
      .sort((a, b) => b[1] - a[1])[0];

    return detected ? detected[0] : null;
  }

  /**
   * Traduit un texte vers la langue cible
   */
  async translate(text, targetLang = this.userLanguage, sourceLang = null) {
    if (!text || text.length < 2) return text;

    // Détecte la langue source si non fournie
    const detected = sourceLang || this.detectLanguage(text);
    
    // Pas de traduction si même langue
    if (detected === targetLang) {
      return text;
    }

    // Check cache
    const cacheKey = `${text}|${targetLang}`;
    if (translationCache.has(cacheKey)) {
      return translationCache.get(cacheKey);
    }

    try {
      const response = await fetch(AI_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: `Tu es un traducteur professionnel. Traduis le texte en ${SUPPORTED_LANGUAGES[targetLang]?.name || targetLang}.
Règles:
- Préserve le ton et le style original
- Garde les noms propres, URLs et mentions @
- Réponds UNIQUEMENT avec la traduction, sans commentaire`,
            },
            {
              role: 'user',
              content: text,
            },
          ],
          model: this.model,
        }),
      });

      if (!response.ok) {
        console.warn('[Translation] API error, returning original');
        return text;
      }

      const data = await response.json();
      const translation = data.content?.trim() || text;

      // Cache la traduction
      if (translationCache.size >= CACHE_MAX_SIZE) {
        // Supprime les plus anciennes
        const firstKey = translationCache.keys().next().value;
        translationCache.delete(firstKey);
      }
      translationCache.set(cacheKey, translation);

      return translation;
    } catch (error) {
      console.error('[Translation] Error:', error);
      return text;
    }
  }

  /**
   * Traduit un message de chat avec métadonnées
   */
  async translateChatMessage(message) {
    const sourceLang = this.detectLanguage(message.text);
    
    // Pas de traduction nécessaire
    if (sourceLang === this.userLanguage) {
      return {
        ...message,
        translated: false,
        originalLang: sourceLang,
      };
    }

    const translatedText = await this.translate(message.text, this.userLanguage, sourceLang);

    return {
      ...message,
      originalText: message.text,
      text: translatedText,
      translated: true,
      originalLang: sourceLang,
      targetLang: this.userLanguage,
    };
  }

  /**
   * Traduit plusieurs messages en batch
   */
  async translateBatch(messages) {
    const results = await Promise.all(
      messages.map((msg) => this.translateChatMessage(msg))
    );
    return results;
  }

  /**
   * Configure la langue de l'utilisateur
   */
  setUserLanguage(langCode) {
    if (SUPPORTED_LANGUAGES[langCode]) {
      this.userLanguage = langCode;
    }
  }

  /**
   * Active/désactive la traduction automatique
   */
  setAutoTranslate(enabled) {
    this.autoTranslate = enabled;
  }

  /**
   * Vérifie si un texte nécessite une traduction
   */
  needsTranslation(text) {
    const detected = this.detectLanguage(text);
    return detected && detected !== this.userLanguage;
  }

  /**
   * Retourne la langue détectée avec son drapeau
   */
  getLanguageInfo(langCode) {
    return SUPPORTED_LANGUAGES[langCode] || { name: langCode, flag: '🌐' };
  }

  /**
   * Vide le cache
   */
  clearCache() {
    translationCache.clear();
  }
}

// Singleton
let instance = null;

export const getTranslationService = () => {
  if (!instance) {
    instance = new TranslationService();
  }
  return instance;
};

export default TranslationService;
