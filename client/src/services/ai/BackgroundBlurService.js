/**
 * BackgroundBlurService - Floutage arrière-plan via MediaPipe
 *
 * Utilise @mediapipe/selfie_segmentation pour un traitement 100% côté client
 * Alternative gratuite à @livekit/track-processors
 */

// Note: Ce service utilise la version CDN de MediaPipe pour éviter les problèmes de bundling
const MEDIAPIPE_CDN = 'https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation';

class BackgroundBlurService {
  constructor() {
    this.segmenter = null;
    this.isReady = false;
    this.isProcessing = false;
    this.canvas = null;
    this.ctx = null;
    this.offscreenCanvas = null;
    this.offscreenCtx = null;
    this.videoElement = null;
    this.animationFrame = null;
    this.blurAmount = 10; // pixels
    this.backgroundImage = null;
    this.mode = 'blur'; // 'blur' | 'image' | 'none'
    this.onFrameCallback = null;
  }

  /**
   * Vérifie si MediaPipe est supporté
   */
  static isSupported() {
    return (
      typeof window !== 'undefined' && 'OffscreenCanvas' in window && 'createImageBitmap' in window
    );
  }

  /**
   * Charge MediaPipe dynamiquement
   */
  async init() {
    if (this.isReady) return true;

    try {
      // Charge le script MediaPipe depuis CDN
      if (!window.SelfieSegmentation) {
        await this._loadScript(`${MEDIAPIPE_CDN}/selfie_segmentation.js`);
      }

      // Initialise le segmenteur
      this.segmenter = new window.SelfieSegmentation({
        locateFile: (file) => `${MEDIAPIPE_CDN}/${file}`,
      });

      this.segmenter.setOptions({
        modelSelection: 1, // 0 = general, 1 = landscape (meilleur pour vidéo)
        selfieMode: true,
      });

      this.segmenter.onResults((results) => this._onResults(results));

      // Crée les canvas de traitement
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.offscreenCanvas = document.createElement('canvas');
      this.offscreenCtx = this.offscreenCanvas.getContext('2d');

      this.isReady = true;
      return true;
    } catch (error) {
      console.error("[BackgroundBlur] Erreur d'initialisation:", error);
      return false;
    }
  }

  /**
   * Charge un script externe
   */
  _loadScript(src) {
    return new Promise((resolve, reject) => {
      // Vérifie si déjà chargé
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.crossOrigin = 'anonymous';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  /**
   * Traite les résultats de segmentation
   */
  _onResults(results) {
    if (!this.ctx || !results.segmentationMask) return;

    const { width, height } = this.canvas;

    // Dessine l'image originale
    this.ctx.save();
    this.ctx.clearRect(0, 0, width, height);

    // Dessine le fond (flou ou image)
    if (this.mode === 'blur') {
      this.ctx.filter = `blur(${this.blurAmount}px)`;
      this.ctx.drawImage(results.image, 0, 0, width, height);
      this.ctx.filter = 'none';
    } else if (this.mode === 'image' && this.backgroundImage) {
      this.ctx.drawImage(this.backgroundImage, 0, 0, width, height);
    } else {
      // Mode 'none' - fond transparent/noir
      this.ctx.fillStyle = '#000';
      this.ctx.fillRect(0, 0, width, height);
    }

    // Applique le masque pour la personne
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.drawImage(results.segmentationMask, 0, 0, width, height);

    // Dessine la personne nette par-dessus
    this.ctx.globalCompositeOperation = 'destination-over';
    this.ctx.drawImage(results.image, 0, 0, width, height);

    this.ctx.restore();

    // Callback avec le frame traité
    if (this.onFrameCallback) {
      this.onFrameCallback(this.canvas);
    }
  }

  /**
   * Démarre le traitement sur un MediaStream
   */
  async startProcessing(videoElement, options = {}) {
    if (!this.isReady) {
      const initialized = await this.init();
      if (!initialized) return null;
    }

    this.videoElement = videoElement;
    this.mode = options.mode || 'blur';
    this.blurAmount = options.blurAmount || 10;

    // Configure les dimensions
    this.canvas.width = videoElement.videoWidth || 640;
    this.canvas.height = videoElement.videoHeight || 480;
    this.offscreenCanvas.width = this.canvas.width;
    this.offscreenCanvas.height = this.canvas.height;

    // Charge l'image de fond si fournie
    if (options.backgroundImage) {
      await this.setBackgroundImage(options.backgroundImage);
    }

    this.isProcessing = true;
    this._processFrame();

    // Retourne un MediaStream depuis le canvas
    return this.canvas.captureStream(30);
  }

  /**
   * Boucle de traitement des frames
   */
  async _processFrame() {
    if (!this.isProcessing || !this.videoElement) return;

    if (this.videoElement.readyState >= 2) {
      try {
        await this.segmenter.send({ image: this.videoElement });
      } catch (e) {
        // Ignore les erreurs de frame skip
      }
    }

    this.animationFrame = requestAnimationFrame(() => this._processFrame());
  }

  /**
   * Définit une image de fond personnalisée
   */
  async setBackgroundImage(imageUrl) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        this.backgroundImage = img;
        this.mode = 'image';
        resolve(img);
      };
      img.onerror = reject;
      img.src = imageUrl;
    });
  }

  /**
   * Change le niveau de flou
   */
  setBlurAmount(pixels) {
    this.blurAmount = Math.max(0, Math.min(50, pixels));
  }

  /**
   * Change le mode de fond
   */
  setMode(mode) {
    if (['blur', 'image', 'none'].includes(mode)) {
      this.mode = mode;
    }
  }

  /**
   * Configure un callback pour chaque frame traitée
   */
  onFrame(callback) {
    this.onFrameCallback = callback;
  }

  /**
   * Arrête le traitement
   */
  stopProcessing() {
    this.isProcessing = false;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  /**
   * Nettoie toutes les ressources
   */
  destroy() {
    this.stopProcessing();
    this.segmenter?.close();
    this.segmenter = null;
    this.canvas = null;
    this.ctx = null;
    this.offscreenCanvas = null;
    this.offscreenCtx = null;
    this.videoElement = null;
    this.backgroundImage = null;
    this.isReady = false;
  }
}

// Singleton
let instance = null;

export const getBackgroundBlurService = () => {
  if (!instance) {
    instance = new BackgroundBlurService();
  }
  return instance;
};

export default BackgroundBlurService;
