/**
 * 🎯 AIImageEnhancer v2.0 (Lightweight Alternative)
 * Pipeline de traitement vidéo léger sans MediaPipe.
 *
 * OPTIMISATIONS v2.0:
 * - Courbe sigmoïde pour Low-Light Boost naturel
 * - Sharpening adaptatif basé sur la pixelisation
 * - Échantillonnage intelligent pour économie CPU
 */
export class AIImageEnhancer {
  constructor() {
    this.name = 'AIImageEnhancer';
    this.processedTrack = null;
    this.sourceTrack = null;
    this.canvas = null;
    this.ctx = null;
    this.videoElement = null;
    this.rafId = null;
    this.isDestroyed = false;

    // 1. Contrôle Thermique
    this.lastFrameTime = performance.now();
    this.fpsDrops = 0;
    this.isThermalThrottling = false;

    // 2. Adaptive Enhancement
    this.brightnessLevel = 1.0;
    this.sharpnessIntensity = 1.1; // Intensité du sharpening adaptatif
    this.pixelationScore = 0;
    this.detectedResolution = 0;
    this.frameCount = 0;
  }

  /**
   * Courbe sigmoïde pour un ajustement naturel de la luminosité.
   */
  sigmoidGain(currentLuma, targetLuma = 100) {
    if (currentLuma >= targetLuma) return 1.0;

    const x = currentLuma / targetLuma;
    const k = 6;
    const sigmoid = 1 / (1 + Math.exp(-k * (x - 0.5)));

    const minGain = 1.0;
    const maxGain = 1.6;
    const gain = minGain + (maxGain - minGain) * (1 - sigmoid);

    return Math.min(maxGain, Math.max(minGain, gain));
  }

  async init(options) {
    this.sourceTrack = options.track;

    const isMobile = typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent);
    if (isMobile && navigator.hardwareConcurrency <= 4) {
      console.warn("[AIImageEnhancer] Low-end CPU. Bypass de l'IA pour préserver la batterie.");
      this.processedTrack = this.sourceTrack;
      return;
    }

    this.videoElement = document.createElement('video');
    this.videoElement.autoplay = true;
    this.videoElement.playsInline = true;
    this.videoElement.muted = true;
    this.videoElement.srcObject = new MediaStream([this.sourceTrack]);
    await this.videoElement.play();

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true, alpha: false });

    const stream = this.canvas.captureStream(isMobile ? 24 : 30);
    this.processedTrack = stream.getVideoTracks()[0];

    this.processFrame();
  }

  /**
   * Analyse la pixelisation pour ajuster le sharpening.
   */
  analyzePixelation() {
    try {
      const cx = Math.floor(this.canvas.width / 2) - 8;
      const cy = Math.floor(this.canvas.height / 2) - 8;
      const imageData = this.ctx.getImageData(cx, cy, 16, 16);
      const data = imageData.data;

      let blockScore = 0;

      for (let y = 1; y < 15; y++) {
        for (let x = 1; x < 15; x++) {
          const idx = (y * 16 + x) * 4;
          const idxLeft = (y * 16 + x - 1) * 4;
          const idxUp = ((y - 1) * 16 + x) * 4;

          const gradH = Math.abs(data[idx] - data[idxLeft]);
          const gradV = Math.abs(data[idx] - data[idxUp]);

          if (x % 8 === 0 || y % 8 === 0) {
            if (gradH > 20 || gradV > 20) blockScore++;
          }
        }
      }

      this.pixelationScore = Math.min(100, (blockScore / 4) * 100);

      // Sharpening adaptatif
      const resolutionFactor =
        this.detectedResolution < 480 ? 0.8 : this.detectedResolution < 720 ? 0.9 : 1.0;
      const pixelationFactor =
        this.pixelationScore > 50 ? 0.85 : this.pixelationScore > 25 ? 0.92 : 1.0;

      this.sharpnessIntensity = 1.0 + 0.15 * resolutionFactor * pixelationFactor;
    } catch (e) {
      this.sharpnessIntensity = 1.1;
    }
  }

  processFrame = () => {
    if (this.isDestroyed) return;

    if (!this.videoElement.videoWidth) {
      this.rafId = requestAnimationFrame(this.processFrame);
      return;
    }

    // A. SÉCURITÉ THERMIQUE
    const now = performance.now();
    const frameDelta = now - this.lastFrameTime;
    this.lastFrameTime = now;

    if (frameDelta > 55) {
      this.fpsDrops++;
    } else {
      this.fpsDrops = Math.max(0, this.fpsDrops - 0.5);
    }

    if (this.fpsDrops > 30 && !this.isThermalThrottling) {
      console.error("[AIImageEnhancer] ALERTE THERMIQUE : Arrêt d'urgence du GPU IA.");
      this.isThermalThrottling = true;
    }

    if (this.canvas.width !== this.videoElement.videoWidth) {
      this.canvas.width = this.videoElement.videoWidth;
      this.canvas.height = this.videoElement.videoHeight;
      this.detectedResolution = Math.min(
        this.videoElement.videoWidth,
        this.videoElement.videoHeight
      );
    }

    if (this.isThermalThrottling) {
      // BYPASS THERMIQUE
      this.ctx.filter = 'none';
      this.ctx.drawImage(this.videoElement, 0, 0, this.canvas.width, this.canvas.height);
    } else {
      // PIPELINE INTELLIGENT
      this.frameCount++;

      // Analyse luminosité avec sigmoïde (toutes les 30 frames)
      if (this.frameCount % 30 === 0) {
        this.calculateAutoLightingSigmoid();
      }

      // Analyse pixelisation (toutes les 60 frames)
      if (this.frameCount % 60 === 0) {
        this.analyzePixelation();
      }

      // Sharpening adaptatif + Auto-Lighting sigmoïde
      this.ctx.filter = `brightness(${this.brightnessLevel.toFixed(2)}) contrast(${this.sharpnessIntensity.toFixed(2)}) saturate(1.15)`;

      this.ctx.drawImage(this.videoElement, 0, 0, this.canvas.width, this.canvas.height);
    }

    this.rafId = requestAnimationFrame(this.processFrame);
  };

  /**
   * Calcul de luminosité avec courbe sigmoïde.
   */
  calculateAutoLightingSigmoid() {
    try {
      const sw = this.canvas.width / 4;
      const sh = this.canvas.height / 4;
      const cx = this.canvas.width / 2 - sw / 2;
      const cy = this.canvas.height / 2 - sh / 2;

      const imageData = this.ctx.getImageData(cx, cy, sw, sh);
      let sumLuma = 0;

      for (let i = 0; i < imageData.data.length; i += 16) {
        sumLuma += (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
      }

      const avgBrightness = sumLuma / (imageData.data.length / 16);

      // Gain sigmoïde au lieu de linéaire
      const targetBrightness = this.sigmoidGain(avgBrightness, 100);

      // Lissage temporel
      this.brightnessLevel += (targetBrightness - this.brightnessLevel) * 0.08;
    } catch (e) {}
  }

  async restart(options) {
    await this.destroy();
    await this.init(options);
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
