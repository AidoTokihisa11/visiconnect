// Singleton Manager — unifie le Worker IA et évite la surcharge VRAM.
// Le Worker est créé en différé (à l'appel de init()) pour ne pas bloquer le thread principal au chargement.
export class AIEngineManager {
  static instance = null;

  constructor() {
    if (AIEngineManager.instance) {
      return AIEngineManager.instance;
    }

    // Worker créé uniquement à l'appel de init() pour ne pas bloquer le chargement initial.
    this.worker = null;
    this.isReady = false;
    this.callbacks = [];
    this.isInitializing = false;

    AIEngineManager.instance = this;
  }

  static getInstance() {
    if (!AIEngineManager.instance) {
      AIEngineManager.instance = new AIEngineManager();
    }
    return AIEngineManager.instance;
  }

  init() {
    // Évite les initialisations multiples
    if (this.isReady || this.isInitializing) {
      return;
    }

    this.isInitializing = true;

    this.worker = new Worker(new URL('./videoWorker.js', import.meta.url), { type: 'module' });

    this.worker.onmessage = (e) => {
      if (e.data.type === 'READY') {
        this.isReady = true;
        this.isInitializing = false;
        this.callbacks.forEach((cb) => cb(true));
      }
      if (e.data.type === 'ERROR') {
        this.isInitializing = false;
        console.error('[AIEngineManager] Erreur Worker:', e.data.error);
      }
    };

    this.worker.postMessage({ type: 'INIT' });
  }

  onReady(callback) {
    if (this.isReady) {
      callback(true);
    } else {
      this.callbacks.push(callback);
    }
  }

  // Permet de savoir si l'IA est dispo sans déclencher le chargement
  static isAvailable() {
    return AIEngineManager.instance?.isReady || false;
  }
}
