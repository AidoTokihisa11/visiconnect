/**
 * TranscriptionService - Transcription Live via Web Speech API
 *
 * 100% gratuit, côté client uniquement (Chrome/Edge/Safari)
 * Pas de serveur, pas de latence réseau
 */

class TranscriptionService {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.transcript = [];
    this.currentSession = '';
    this.callbacks = {
      onResult: null,
      onInterim: null,
      onError: null,
      onEnd: null,
    };
    this.language = 'fr-FR';
    this.continuous = true;
  }

  /**
   * Vérifie si Web Speech API est disponible
   */
  static isSupported() {
    return !!(
      typeof window !== 'undefined' &&
      (window.SpeechRecognition || window.webkitSpeechRecognition)
    );
  }

  /**
   * Initialise le service de reconnaissance vocale
   */
  init(options = {}) {
    if (!TranscriptionService.isSupported()) {
      console.warn('[Transcription] Web Speech API non supportée par ce navigateur');
      return false;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();

    // Configuration
    this.recognition.continuous = options.continuous ?? true;
    this.recognition.interimResults = options.interimResults ?? true;
    this.recognition.maxAlternatives = 1;
    this.language = options.language || 'fr-FR';
    this.recognition.lang = this.language;

    // Event handlers
    this.recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        const entry = {
          text: finalTranscript.trim(),
          timestamp: Date.now(),
          speaker: 'local', // Peut être étendu avec identification
        };
        this.transcript.push(entry);
        this.currentSession += finalTranscript + ' ';
        this.callbacks.onResult?.(entry, this.transcript);
      }

      if (interimTranscript && this.callbacks.onInterim) {
        this.callbacks.onInterim(interimTranscript);
      }
    };

    this.recognition.onerror = (event) => {
      console.error('[Transcription] Erreur:', event.error);

      // Redémarrer automatiquement sur certaines erreurs
      if (['no-speech', 'aborted'].includes(event.error) && this.isListening) {
        setTimeout(() => this.start(), 100);
        return;
      }

      this.callbacks.onError?.(event.error);
    };

    this.recognition.onend = () => {
      // Redémarrer automatiquement si on était en écoute
      if (this.isListening && this.continuous) {
        setTimeout(() => {
          try {
            this.recognition?.start();
          } catch (e) {
            // Ignorer si déjà en cours
          }
        }, 100);
      } else {
        this.callbacks.onEnd?.(this.transcript);
      }
    };

    return true;
  }

  /**
   * Configure les callbacks
   */
  on(event, callback) {
    if (this.callbacks.hasOwnProperty(`on${event.charAt(0).toUpperCase() + event.slice(1)}`)) {
      this.callbacks[`on${event.charAt(0).toUpperCase() + event.slice(1)}`] = callback;
    }
    return this;
  }

  /**
   * Démarre la transcription
   */
  start() {
    if (!this.recognition) {
      console.warn('[Transcription] Service non initialisé');
      return false;
    }

    if (this.isListening) {
      return true;
    }

    try {
      this.isListening = true;
      this.recognition.start();
      return true;
    } catch (error) {
      console.error('[Transcription] Erreur au démarrage:', error);
      this.isListening = false;
      return false;
    }
  }

  /**
   * Arrête la transcription
   */
  stop() {
    if (!this.recognition || !this.isListening) {
      return;
    }

    this.isListening = false;
    this.continuous = false;

    try {
      this.recognition.stop();
    } catch (e) {
      // Ignorer silencieusement
    }
  }

  /**
   * Change la langue de reconnaissance
   */
  setLanguage(langCode) {
    this.language = langCode;
    if (this.recognition) {
      this.recognition.lang = langCode;
    }
  }

  /**
   * Retourne le transcript complet
   */
  getTranscript() {
    return [...this.transcript];
  }

  /**
   * Retourne le texte brut de la session
   */
  getSessionText() {
    return this.currentSession.trim();
  }

  /**
   * Efface le transcript
   */
  clear() {
    this.transcript = [];
    this.currentSession = '';
  }

  /**
   * Exporte la transcription en format texte
   */
  export(format = 'text') {
    if (format === 'json') {
      return JSON.stringify(this.transcript, null, 2);
    }

    return this.transcript
      .map((entry) => {
        const time = new Date(entry.timestamp).toLocaleTimeString();
        return `[${time}] ${entry.text}`;
      })
      .join('\n');
  }

  /**
   * Nettoie les ressources
   */
  destroy() {
    this.stop();
    this.recognition = null;
    this.transcript = [];
    this.currentSession = '';
  }
}

// Singleton instance
let instance = null;

export const getTranscriptionService = () => {
  if (!instance) {
    instance = new TranscriptionService();
  }
  return instance;
};

export default TranscriptionService;
