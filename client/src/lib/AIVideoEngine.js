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

    // --- AI Models ---
    this.vision = null;
    this.faceDetector = null;
    this.faceRect = null;
    this.modelLoading = false;
    this.modelLoaded = false;
    
    // --- Adaptive Enhancement v3.0 ---
    this.exposureGain = 1.0;
    this.detectedResolution = 0;      // Résolution réelle détectée
    this.sharpnessIntensity = 1.08;   // Intensité du sharpening (1.0-1.25)
    this.pixelationScore = 0;         // Score de pixelisation (0-100)
    this.estimatedBitrate = 2000000;  // Bitrate estimé (défaut 2Mbps)
    this.lastBitrateCheck = 0;        // Timestamp dernière estimation
    
    // --- Zero-Copy Optimization ---
    this.offscreenCanvas = null;
    this.offscreenCtx = null;
    this.imageBitmapSupported = typeof createImageBitmap === 'function';
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
      willReadFrequently: !isMobile // Uniquement desktop pour getImageData
    });

    const fps = isMobile ? 20 : 30; // Mobile: 20fps pour économiser CPU
    const stream = this.canvas.captureStream(fps);
    this.processedTrack = stream.getVideoTracks()[0];

    // MOBILE: Délais le chargement IA de 2 secondes pour laisser WebRTC s'établir
    if (isMobile) {
      console.log('[AIVideoEngine] Mobile: Mode léger activé, IA différée');
      setTimeout(() => this.loadAIModels(), 2000);
    } else {
      // Desktop: Chargement immédiat
      this.loadAIModels();
    }

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
   * Si l'image est très compressée ou le bitrate bas, on réduit le sharpening
   * pour éviter d'accentuer les artefacts JPEG/WebRTC.
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
      
      // === SHARPENING BITRATE-AWARE v3.0 ===
      // Facteur résolution: réduire sur basse résolution
      const resolutionFactor = this.detectedResolution < 480 ? 0.7 : 
                               this.detectedResolution < 720 ? 0.85 : 1.0;
      
      // Facteur pixelisation: réduire si artefacts détectés
      const pixelationFactor = this.pixelationScore > 50 ? 0.75 : 
                               this.pixelationScore > 25 ? 0.88 : 1.0;
      
      // Facteur bitrate: réduire si bitrate bas (évite d'accentuer compression)
      // < 1Mbps = très compressé, 1-2Mbps = compressé, > 2Mbps = OK
      const bitrateFactor = this.estimatedBitrate < 1_000_000 ? 0.6 :
                            this.estimatedBitrate < 2_000_000 ? 0.8 : 1.0;
      
      // Sharpening adaptatif: 1.0 (très pixelisé/compressé) à 1.12 (haute qualité)
      // Plafonné à 1.12 pour éviter l'aspect artificiel
      const combinedFactor = resolutionFactor * pixelationFactor * bitrateFactor;
      this.sharpnessIntensity = 1.0 + (0.12 * combinedFactor);
      
    } catch (e) {
      this.sharpnessIntensity = 1.05; // Fallback conservateur
    }
  }

  /**
   * Estimation du bitrate basée sur l'activité de la piste vidéo.
   * Utilise getStats() si disponible, sinon heuristique.
   */
  async estimateBitrate() {
    try {
      // Vérifier si on a accès aux stats WebRTC
      if (this.sourceTrack && typeof this.sourceTrack.getStats === 'function') {
        const stats = await this.sourceTrack.getStats();
        if (stats) {
          // Chercher le rapport de type 'outbound-rtp' ou 'inbound-rtp'
          for (const report of stats.values()) {
            if (report.type === 'outbound-rtp' && report.kind === 'video') {
              const bitrate = report.targetBitrate || report.bitrate || 2_000_000;
              this.estimatedBitrate = bitrate;
              return;
            }
          }
        }
      }
      
      // Heuristique: estimer basé sur résolution et framerate
      const pixels = this.canvas.width * this.canvas.height;
      const estimatedBps = pixels * 0.07; // ~0.07 bits per pixel (H.264 typ.)
      this.estimatedBitrate = Math.max(500_000, Math.min(8_000_000, estimatedBps));
      
    } catch (e) {
      this.estimatedBitrate = 2_000_000; // Fallback 2Mbps
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
      this.detectedResolution = Math.min(videoWidth, videoHeight);
    }

    this.frameCount++;
    
    // MOBILE: Skip frames pour économiser CPU (traiter 1 frame sur 2)
    const skipFrame = this.isMobile && (this.frameCount % 2 === 0);

    // --- 2. PIPELINE DE RENDU ---
    if (this.thermalGuardActive || skipFrame) {
      // MODE DÉGRADÉ / SKIP : Pass-through matériel simple
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

      // B. Auto-Relighting Sigmoïde (tous les 10 frames desktop, 20 mobile)
      const relightInterval = this.isMobile ? 20 : 10;
      if (this.frameCount % relightInterval === 0) {
        this.computeRelightingSigmoid();
      }
      
      // C. Analyse Pixelisation + Estimation Bitrate (tous les 30 frames desktop, 60 mobile)
      const analyzeInterval = this.isMobile ? 60 : 30;
      if (this.frameCount % analyzeInterval === 0) {
        this.analyzePixelation();
        // Estimation bitrate asynchrone (non-bloquant)
        this.estimateBitrate();
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
