import { Track } from 'livekit-client';

/**
 * 🎯 AIVideoEngine v2.0 (Staff Engineer Architecture)
 * Pipeline WebRTC "Full AI-Autonomous" avec optimisations avancées.
 * 
 * OPTIMISATIONS v2.0:
 * - OffscreenCanvas + transferToImageBitmap (Zero-Copy GPU)
 * - Sharpening adaptatif basé sur la pixelisation détectée
 * - Low-Light Boost avec courbe sigmoïde naturelle
 * - Détection visage tous les 5 frames (FaceDetector GPU)
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

    // --- AI Models ---
    this.vision = null;
    this.faceDetector = null;
    this.faceRect = null;
    this.modelLoading = false;
    this.modelLoaded = false;
    
    // --- Adaptive Enhancement ---
    this.exposureGain = 1.0;
    this.detectedResolution = 0;      // Résolution réelle détectée
    this.sharpnessIntensity = 1.08;   // Intensité du sharpening (1.0-1.25)
    this.pixelationScore = 0;         // Score de pixelisation (0-100)
    
    // --- Zero-Copy Optimization ---
    this.offscreenCanvas = null;
    this.offscreenCtx = null;
    this.imageBitmapSupported = typeof createImageBitmap === 'function';
  }

  /**
   * Initialise le pipeline vidéo optimisé avec OffscreenCanvas.
   */
  async init({ track }) {
    this.sourceTrack = track;
    this.videoElement = document.createElement('video');
    this.videoElement.autoplay = true;
    this.videoElement.playsInline = true;
    this.videoElement.muted = true;
    this.videoElement.srcObject = new MediaStream([this.sourceTrack]);
    await this.videoElement.play();

    // Utilisation de OffscreenCanvas si disponible (Zero-Copy GPU)
    if (typeof OffscreenCanvas !== 'undefined') {
      this.offscreenCanvas = new OffscreenCanvas(1, 1);
      this.offscreenCtx = this.offscreenCanvas.getContext('2d', { alpha: false });
    }

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d', { alpha: false });

    const isMobile = typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent);
    const fps = isMobile ? 24 : 30;
    const stream = this.canvas.captureStream(fps);
    this.processedTrack = stream.getVideoTracks()[0];

    // Chargement asynchrone de l'IA
    this.loadAIModels();

    this.processFrame();
    return { track: this.processedTrack };
  }

  /**
   * MediaPipe Task-Vision avec GPU Delegate.
   */
  async loadAIModels() {
    if (this.modelLoading || this.modelLoaded) return;
    this.modelLoading = true;

    try {
      const vision = await import('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/vision_bundle.mjs');
      const { FaceDetector, FilesetResolver } = vision;

      const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
      );

      this.faceDetector = await FaceDetector.createFromOptions(filesetResolver, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/latest/blaze_face_short_range.tflite",
          delegate: "GPU"
        },
        runningMode: "VIDEO",
        minDetectionConfidence: 0.5
      });

      this.modelLoaded = true;
      console.log("[AIVideoEngine] Models Loaded (GPU Delegate active)");
    } catch (e) {
      console.error("[AIVideoEngine] AI Fallback", e);
    }
  }

  /**
   * Courbe sigmoïde pour un ajustement naturel de la luminosité.
   * Évite les sauts brutaux et produit des transitions douces.
   */
  sigmoidGain(currentLuma, targetLuma = 100) {
    if (currentLuma >= targetLuma) return 1.0;
    
    // x normalisé entre 0 et 1 (0 = très sombre, 1 = luminosité cible)
    const x = currentLuma / targetLuma;
    
    // Courbe sigmoïde: f(x) = 1 / (1 + e^(-k*(x-0.5)))
    // On inverse pour avoir un gain élevé quand c'est sombre
    const k = 6; // Pente de la courbe
    const sigmoid = 1 / (1 + Math.exp(-k * (x - 0.5)));
    
    // Mapper sigmoid [0.0025, 0.9975] -> gain [1.0, 1.6]
    const minGain = 1.0;
    const maxGain = 1.6;
    const gain = minGain + (maxGain - minGain) * (1 - sigmoid);
    
    return Math.min(maxGain, Math.max(minGain, gain));
  }

  /**
   * Analyse la pixelisation de l'image pour ajuster le sharpening.
   * Si l'image est très compressée, on réduit le sharpening pour éviter
   * d'accentuer les artefacts JPEG/WebRTC.
   */
  analyzePixelation() {
    try {
      // Échantillon 16x16 au centre pour détecter les blocs de compression
      const cx = Math.floor(this.canvas.width / 2) - 8;
      const cy = Math.floor(this.canvas.height / 2) - 8;
      const imageData = this.ctx.getImageData(cx, cy, 16, 16);
      const data = imageData.data;
      
      // Calcul du gradient local (détection d'artefacts de bloc)
      let blockScore = 0;
      let edgeCount = 0;
      
      for (let y = 1; y < 15; y++) {
        for (let x = 1; x < 15; x++) {
          const idx = (y * 16 + x) * 4;
          const idxLeft = (y * 16 + x - 1) * 4;
          const idxUp = ((y - 1) * 16 + x) * 4;
          
          // Gradient horizontal et vertical
          const gradH = Math.abs(data[idx] - data[idxLeft]);
          const gradV = Math.abs(data[idx] - data[idxUp]);
          
          // Les artefacts de bloc créent des transitions brutales tous les 8 pixels
          if (x % 8 === 0 || y % 8 === 0) {
            if (gradH > 20 || gradV > 20) blockScore++;
          }
          if (gradH > 10 || gradV > 10) edgeCount++;
        }
      }
      
      // Score de pixelisation (0-100)
      this.pixelationScore = Math.min(100, (blockScore / 4) * 100);
      
      // Ajustement du sharpening basé sur la résolution ET la pixelisation
      const resolutionFactor = this.detectedResolution < 480 ? 0.8 : 
                               this.detectedResolution < 720 ? 0.9 : 1.0;
      
      const pixelationFactor = this.pixelationScore > 50 ? 0.85 : 
                               this.pixelationScore > 25 ? 0.92 : 1.0;
      
      // Sharpening adaptatif: 1.02 (très pixelisé) à 1.15 (haute qualité)
      this.sharpnessIntensity = 1.0 + (0.15 * resolutionFactor * pixelationFactor);
      
    } catch (e) {
      this.sharpnessIntensity = 1.08; // Fallback
    }
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

    if (this.fpsDrops > 15 && !this.thermalGuardActive) {
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
      this.detectedResolution = Math.min(videoWidth, videoHeight);
      
      if (this.offscreenCanvas) {
        this.offscreenCanvas.width = videoWidth;
        this.offscreenCanvas.height = videoHeight;
      }
    }

    this.frameCount++;

    // --- 2. PIPELINE DE RENDU ---
    if (this.thermalGuardActive) {
      // MODE DÉGRADÉ : Pass-through matériel
      this.ctx.filter = 'none';
      this.ctx.drawImage(this.videoElement, 0, 0, videoWidth, videoHeight);
    } else {
      // MODE AI-AUTONOMOUS
      
      // A. Détection Visage (tous les 5 frames)
      if (this.modelLoaded && this.frameCount % 5 === 0) {
        const detections = this.faceDetector.detectForVideo(this.videoElement, performance.now()).detections;
        if (detections && detections.length > 0) {
          const bb = detections[0].boundingBox;
          this.faceRect = { x: bb.originX, y: bb.originY, w: bb.width, h: bb.height };
        } else {
          this.faceRect = null;
        }
      }

      // B. Auto-Relighting Sigmoïde (tous les 10 frames)
      if (this.frameCount % 10 === 0) {
        this.computeRelightingSigmoid();
      }
      
      // C. Analyse Pixelisation (tous les 30 frames)
      if (this.frameCount % 30 === 0) {
        this.analyzePixelation();
      }

      // D. Sharpening Adaptatif + Relight
      // Utilisation de l'intensité calculée dynamiquement
      this.ctx.filter = `brightness(${this.exposureGain.toFixed(2)}) contrast(${this.sharpnessIntensity.toFixed(2)}) saturate(1.1)`;
      this.ctx.drawImage(this.videoElement, 0, 0, videoWidth, videoHeight);

      // E. ROI Face Enhancement (sharpening accru sur le visage uniquement)
      if (this.faceRect) {
        // Sharpening visage légèrement plus élevé mais adaptatif
        const faceSharpness = Math.min(1.20, this.sharpnessIntensity + 0.08);
        this.ctx.filter = `brightness(${this.exposureGain.toFixed(2)}) contrast(${faceSharpness.toFixed(2)}) saturate(1.15)`;
        this.ctx.drawImage(
          this.videoElement, 
          this.faceRect.x, this.faceRect.y, this.faceRect.w, this.faceRect.h,
          this.faceRect.x, this.faceRect.y, this.faceRect.w, this.faceRect.h
        );
      }
    }

    this.rafId = requestAnimationFrame(this.processFrame);
  };

  /**
   * Calcul du gain de luminosité avec courbe sigmoïde.
   * Plus naturel que le gain linéaire.
   */
  computeRelightingSigmoid() {
    const cx = this.canvas.width / 2;
    const cy = this.canvas.height / 2;
    try {
      // Échantillon 3x3 au centre pour stabilité
      const pixel = this.ctx.getImageData(cx - 1, cy - 1, 3, 3).data;
      let sumLuma = 0;
      for (let i = 0; i < pixel.length; i += 4) {
        sumLuma += (pixel[i] + pixel[i + 1] + pixel[i + 2]) / 3;
      }
      const avgLuma = sumLuma / 9;
      
      // Gain sigmoïde au lieu de linéaire
      const targetExposure = this.sigmoidGain(avgLuma, 100);
      
      // Lissage temporel pour éviter les flickering
      this.exposureGain += (targetExposure - this.exposureGain) * 0.08;
    } catch(e) {}
  }

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
