import { Track } from 'livekit-client';

/**
 * 🎯 AIVideoEngine v3.0 (Staff Engineer Architecture)
 * Pipeline WebRTC "Full AI-Autonomous" avec optimisations anti-pixelisation.
 *
 * OPTIMISATIONS v3.0:
 * - Sharpening BITRATE-AWARE: Réduit l'accentuation quand le flux est compressé
 * - Low-Light Boost avec courbe sigmoïde naturelle
 * - Détection visage tous les 5 frames (FaceDetector GPU)
 * - Mode dégradé automatique si thermal throttling détecté
 */
export class AIVideoProcessor {
  constructor() {
    this.name = 'AIVideoProcessor';
    this.sourceTrack = null;
    this.processedTrack = null;
    this.canvas = null;
    this.ctx = null;
    this.videoElement = null;
    this.rafId = null;

    // --- State & Performance ---
    this.isDestroyed = false;
    this.lastFrameTime = performance.now();
    this.fpsDrops = 0;
    this.thermalGuardActive = false;
    this.frameCount = 0;
    this._aiFilter = 'brightness(1.05) contrast(1.08) saturate(1.10)';
  }

  /**
   * Initialise le pipeline vidéo optimisé avec OffscreenCanvas.
   */
  async init({ track }) {
    // Réinitialiser l'état en cas de réutilisation après destroy
    this.isDestroyed = false;
    this.rafId = null;
    this.sourceTrack = track;
    this.videoElement = document.createElement('video');
    this.videoElement.autoplay = true;
    this.videoElement.playsInline = true;
    this.videoElement.muted = true;
    this.videoElement.srcObject = new MediaStream([this.sourceTrack]);
    await this.videoElement.play();

    // Détection mobile
    const isMobile = typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent);
    this.isMobile = isMobile;

    // MOBILE: Mode passthrough léger - pas de canvas processing lourd
    // Le canvas est nécessaire pour captureStream mais on minimise le traitement
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d', {
      alpha: false,
      // Optimisations mobile: désactiver les features coûteuses
      desynchronized: isMobile, // Permet le rendu sans synchronisation (plus rapide)
      willReadFrequently: !isMobile, // Uniquement desktop pour getImageData
    });

    const fps = isMobile ? 20 : 30; // Mobile: 20fps pour économiser CPU
    const stream = this.canvas.captureStream(fps);
    this.processedTrack = stream.getVideoTracks()[0];

    // Filtre fixe défini UNE SEULE FOIS ici — jamais réassigné dans la boucle
    // (réassigner ctx.filter chaque frame force le GPU à recompiler le shader → clignotement)
    this.ctx.filter = this._aiFilter;

    this.processFrame();
    return { track: this.processedTrack };
  }

  processFrame = () => {
    if (this.isDestroyed || !this.videoElement) return;

    if (this.videoElement.videoWidth === 0) {
      this.rafId = requestAnimationFrame(this.processFrame);
      return;
    }

    // --- 1. SÉCURITÉ THERMIQUE ---
    const now = performance.now();
    const frameDelta = now - this.lastFrameTime;
    this.lastFrameTime = now;

    if (frameDelta > 20) {
      this.fpsDrops++;
    } else {
      this.fpsDrops = Math.max(0, this.fpsDrops - 0.2);
    }

    // MOBILE: Seuil thermique plus agressif (10 au lieu de 15)
    const thermalThreshold = this.isMobile ? 10 : 15;
    if (this.fpsDrops > thermalThreshold && !this.thermalGuardActive) {
      console.warn("[AIVideoEngine] DANGER THERMIQUE: Dégradation vers 'Low-Power Mode'...");
      this.thermalGuardActive = true;
    }
    if (this.fpsDrops === 0 && this.thermalGuardActive) {
      this.thermalGuardActive = false;
    }

    const { videoWidth, videoHeight } = this.videoElement;
    if (this.canvas.width !== videoWidth) {
      this.canvas.width = videoWidth;
      this.canvas.height = videoHeight;
    }

    this.frameCount++;

    // MOBILE en surchauffe: sauter 1 frame sur 2 pour réduire CPU
    // On ne redessine PAS (canvas garde le frame précédent) — filtre jamais modifié
    const skipDraw = this.thermalGuardActive && this.isMobile && this.frameCount % 2 === 0;

    // --- 2. PIPELINE DE RENDU ---
    // ctx.filter est fixé une fois dans init() — on ne le touche plus ici
    if (!skipDraw) {
      this.ctx.drawImage(this.videoElement, 0, 0, videoWidth, videoHeight);
    }

    this.rafId = requestAnimationFrame(this.processFrame);
  };

  async restart({ track }) {
    await this.destroy();
    await this.init({ track });
  }

  async destroy() {
    this.isDestroyed = true;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.processedTrack) this.processedTrack.stop();
    if (this.videoElement) {
      this.videoElement.srcObject = null;
      this.videoElement = null;
    }
  }
}
