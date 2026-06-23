/**
 * Services IA VisiConnect - Export Principal
 *
 * Pipeline d'intelligence gratuit:
 * - Transcription: Web Speech API (100% client)
 * - Smart Notes: OpenRouter (modèles gratuits)
 * - Background Blur: MediaPipe (100% client)
 * - Video Enhancement: CSS/Canvas (100% client)
 * - Translation: OpenRouter (modèles gratuits)
 */

export { default as TranscriptionService, getTranscriptionService } from './TranscriptionService';
export {
  default as SmartNotesService,
  getSmartNotesService,
  FREE_MODELS,
} from './SmartNotesService';
export {
  default as TranslationService,
  getTranslationService,
  SUPPORTED_LANGUAGES,
} from './TranslationService';
export {
  default as BackgroundBlurService,
  getBackgroundBlurService,
} from './BackgroundBlurService';
export {
  default as VideoEnhancementService,
  getVideoEnhancementService,
} from './VideoEnhancementService';

/**
 * Vérifie la disponibilité des fonctionnalités IA
 */
export const checkAICapabilities = () => {
  const capabilities = {
    transcription: {
      available: !!(window.SpeechRecognition || window.webkitSpeechRecognition),
      name: 'Transcription Live',
      description: 'Web Speech API - gratuit, local',
    },
    smartNotes: {
      available: true, // Toujours dispo via API
      name: 'Smart Notes',
      description: 'OpenRouter - modèles gratuits',
    },
    backgroundBlur: {
      available: 'OffscreenCanvas' in window && 'createImageBitmap' in window,
      name: 'Fond Flou IA',
      description: 'MediaPipe - gratuit, local',
    },
    videoEnhancement: {
      available: true,
      name: 'Amélioration Vidéo',
      description: 'CSS Filters - gratuit, local',
    },
    translation: {
      available: true, // Toujours dispo via API
      name: 'Traduction Instantanée',
      description: 'OpenRouter - modèles gratuits',
    },
  };

  return capabilities;
};

/**
 * Initialise tous les services IA (lazy loading)
 */
export const initializeAIServices = async (options = {}) => {
  const results = {
    transcription: false,
    backgroundBlur: false,
  };

  // Transcription (seulement si demandé)
  if (options.transcription) {
    const transcription = getTranscriptionService();
    results.transcription = transcription.init({
      language: options.language || 'fr-FR',
    });
  }

  // Background Blur (seulement si demandé et supporté)
  if (options.backgroundBlur) {
    const bgBlur = getBackgroundBlurService();
    results.backgroundBlur = await bgBlur.init();
  }

  return results;
};

/**
 * Préférences IA par défaut
 */
export const DEFAULT_AI_SETTINGS = {
  transcription: {
    enabled: false,
    language: 'fr-FR',
    autoStart: false,
  },
  smartNotes: {
    enabled: true,
    autoGenerate: false,
    model: 'meta-llama/llama-3.1-8b-instruct:free',
  },
  backgroundBlur: {
    enabled: false,
    mode: 'blur', // 'blur' | 'image' | 'none'
    blurAmount: 10,
    backgroundImage: null,
  },
  videoEnhancement: {
    enabled: false,
    preset: 'natural',
  },
  translation: {
    enabled: false,
    autoTranslate: false,
    targetLanguage: 'fr',
  },
  noiseSuppression: {
    enabled: true, // Activé par défaut via LiveKit
    level: 'moderate', // 'low' | 'moderate' | 'high'
  },
};

/**
 * Stocke/récupère les préférences IA dans localStorage
 */
export const AISettingsStorage = {
  KEY: 'visiconnect_ai_settings',

  get() {
    try {
      const stored = localStorage.getItem(this.KEY);
      return stored ? { ...DEFAULT_AI_SETTINGS, ...JSON.parse(stored) } : DEFAULT_AI_SETTINGS;
    } catch {
      return DEFAULT_AI_SETTINGS;
    }
  },

  set(settings) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('[AI Settings] Failed to save:', e);
    }
  },

  update(key, value) {
    const current = this.get();
    current[key] = { ...current[key], ...value };
    this.set(current);
    return current;
  },

  reset() {
    localStorage.removeItem(this.KEY);
    return DEFAULT_AI_SETTINGS;
  },
};
