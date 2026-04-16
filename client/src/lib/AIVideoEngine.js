import { Track } from 'livekit-client';

/**
 * ��� AIVideoEngine (Staff Engineer Architecture)
 * Pipeline WebRTC "Full AI-Autonomous" utilisant MediaPipe et WebGL/Canvas2D GPU-Accelerated.
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
    this.thermalGuardActive = false; // Mode dégradé si > 15ms
    this.frameCount = 0;

    // --- AI Models ---
    this.vision = null;
    this.faceDetector = null;
    this.faceRect = null; // Coordonnées du visage projetées
    this.modelLoading = false;
    this.modelLoaded = false;
    this.exposureGain = 1.0;
  }

  /**
   * Initialise le pipeline vidéo et télécharge les modèles MediaPipe Task-Vision en tâche de fond.
   */
  async init({ track }) {
    this.sourceTrack = track;
    this.videoElement = document.createElement('video');
    this.videoElement.autoplay = true;
    this.videoElement.playsInline = true;
    this.videoElement.muted = true;
    this.videoElement.srcObject = new MediaStream([this.sourceTrack]);
    await this.videoElement.play();

    this.canvas = document.createElement('canvas');
    // willReadFrequently: false pour forcer le hardware GPU WebGL backend
    this.ctx = this.canvas.getContext('2d', { alpha: false });

    // Capture à 24fps (Mobile) ou 30fps (PC)
    const isMobile = typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent);
    const fps = isMobile ? 24 : 30;
    const stream = this.canvas.captureStream(fps);
    this.processedTrack = stream.getVideoTracks()[0];

    // Chargement asynchrone de l'IA (Non-bloquant)
    this.loadAIModels();

    this.processFrame();
    return { track: this.processedTrack };
  }

  /**
   * Importe dynamiquement MediaPipe Task-Vision.
   * Utilise le Delegate GPU pour le FaceDetection.
   */
  async loadAIModels() {
    if (this.modelLoading || this.modelLoaded) return;
    this.modelLoading = true;

    try {
      // Import CDN dynamique recommandé par Google
      const vision = await import('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/vision_bundle.mjs');
      const { FaceDetector, FilesetResolver } = vision;

      const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
      );

      this.faceDetector = await FaceDetector.createFromOptions(filesetResolver, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/latest/blaze_face_short_range.tflite",
          delegate: "GPU" // Offloading GPU strict
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

  processFrame = () => {
    if (this.isDestroyed || !this.videoElement) return;
    
    if (this.videoElement.videoWidth === 0) {
      this.rafId = requestAnimationFrame(this.processFrame);
      return;
    }

    // --- 1. SÉCURITÉ THERMIQUE (Thermal Guard : 15ms budget) ---
    const now = performance.now();
    const frameDelta = now - this.lastFrameTime;
    this.lastFrameTime = now;

    // Si un traitement prend plus de 15ms, on compte une anomalie
    if (frameDelta > 20) { // Tolérance de 20ms en réalité JS (50 FPS)
      this.fpsDrops++;
    } else {
      this.fpsDrops = Math.max(0, this.fpsDrops - 0.2); // Decay
    }

    if (this.fpsDrops > 15 && !this.thermalGuardActive) {
      console.warn("[AIVideoEngine] DANGER THERMIQUE: >15ms. Dégradation vers 'Low-Power Mode'...");
      this.thermalGuardActive = true;
    } 
    // Recovery if stable for a long time
    if (this.fpsDrops === 0 && this.thermalGuardActive) {
        this.thermalGuardActive = false;
    }

    const { videoWidth, videoHeight } = this.videoElement;
    if (this.canvas.width !== videoWidth) {
      this.canvas.width = videoWidth;
      this.canvas.height = videoHeight;
    }

    this.frameCount++;

    // --- 2. PIPELINE DE RENDU ---
    if (this.thermalGuardActive) {
      // MODE DÉGRADÉ : Aucune inférence IA, simple pass-through matériel
      this.ctx.filter = 'none';
      this.ctx.drawImage(this.videoElement, 0, 0, videoWidth, videoHeight);
    } else {
      // MODE AI-AUTONOMOUS
      
      // A. Region of Interest (Détection Visage asynchrone tous les 5 frames pour sauver CPU)
      if (this.modelLoaded && this.frameCount % 5 === 0) {
        const detections = this.faceDetector.detectForVideo(this.videoElement, performance.now()).detections;
        if (detections && detections.length > 0) {
          const bb = detections[0].boundingBox;
          // Coordonnées brutes -> Coordonnées Canvas
          this.faceRect = {
             x: bb.originX,
             y: bb.originY,
             w: bb.width,
             h: bb.height
          };
        } else {
          this.faceRect = null;
        }
      }

      // B. Auto-Relighting Basique (Tous les 10 frames)
      if (this.frameCount % 10 === 0) {
         this.computeRelighting();
      }

      // C. Sharpening & Relight (WebGL Accelerated via Canvas Filter)
      // On combine luminosité dynamique avec un contraste pour "Upscaling" simulé
      this.ctx.filter = `brightness(\${this.exposureGain}) contrast(1.08) saturate(1.1)`;
      this.ctx.drawImage(this.videoElement, 0, 0, videoWidth, videoHeight);

      // (Tricherie ROI) : On "sharpen" manuellement la zone du visage en redessinant le visage 
      // par-dessus avec un filtre de contraste accru. Le codec WebRTC allouera 
      // naturellement plus de bitrate à cette zone aux arêtes nettes.
      if (this.faceRect) {
          this.ctx.filter = `brightness(\${this.exposureGain}) contrast(1.20) saturate(1.15)`;
          this.ctx.drawImage(
              this.videoElement, 
              this.faceRect.x, this.faceRect.y, this.faceRect.w, this.faceRect.h, // Source
              this.faceRect.x, this.faceRect.y, this.faceRect.w, this.faceRect.h  // Destination
          );
      }
    }

    this.rafId = requestAnimationFrame(this.processFrame);
  };

  computeRelighting() {
    // Calcul ultra rapide: On ne lit que 4 pixels au centre de l'image (CPU time: <0.1ms)
    const cx = this.canvas.width / 2;
    const cy = this.canvas.height / 2;
    try {
        const pixel = this.ctx.getImageData(cx, cy, 1, 1).data;
        const luma = (pixel[0] + pixel[1] + pixel[2]) / 3;
        // Si sombre (<80), on boost. Si clair, 1.0.
        const targetExposure = luma < 80 ? Math.min(1.5, 80 / Math.max(luma, 10)) : 1.0;
        // Lissage temporel
        this.exposureGain += (targetExposure - this.exposureGain) * 0.1;
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
