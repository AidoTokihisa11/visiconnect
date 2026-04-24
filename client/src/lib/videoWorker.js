// videoWorker.js - Web Worker dédié pour l'IA (Initialisation et Inférence)
// Ce Worker tourne sur un thread séparé pour ne jamais bloquer l'UI React.

// ============================================================================
// FIX POUR VITE ET MODULE WORKERS
// Un Worker lancé avec { type: 'module' } (comme le force Vite) ne peut pas
// utiliser "importScripts". Or, Mediapipe l'utilise en interne pour charger
// son runner WASM. Ce polyfill intercepte les appels et met en cache chaque
// script afin de ne le télécharger qu'une seule fois.
// Note: le XHR synchrone est autorisé dans les Web Workers (pas sur main thread).
// ============================================================================
const _scriptCache = new Map();
self.importScripts = function (...urls) {
  urls.forEach((url) => {
    if (_scriptCache.has(url)) {
      // Replay cached code — no network round-trip
      const globalEval = eval;
      globalEval(_scriptCache.get(url));
      return;
    }
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false); // synchronous — allowed inside Workers
    xhr.send(null);
    if (xhr.status >= 200 && xhr.status < 300) {
      const code =
        xhr.responseText +
        '\nif(typeof ModuleFactory !== "undefined") { self.ModuleFactory = ModuleFactory; }';
      _scriptCache.set(url, code);
      const globalEval = eval;
      globalEval(code);
    } else {
      throw new Error(`[Worker Polyfill] Échec du téléchargement ${url}: ${xhr.statusText}`);
    }
  });
};

let faceDetector = null;
let selfieSegmentation = null;
let isReady = false;

self.onmessage = async (e) => {
    const { type, payload } = e.data;

    switch (type) {
        case 'INIT':
            await initializeAIModels();
            break;
        case 'REQUEST_INFERENCE':
            // Logique future pour traiter les frames vidéo via OffscreenCanvas
            break;
    }
};

async function initializeAIModels() {
    if (isReady) {
        self.postMessage({ type: 'READY' });
        return;
    }

    try {
        console.log("[Worker] Démarrage du chargement et compilation WASM/WebGL...");
        
        // 1. Import dynamique des CDN MediaPipe (Vite Module compatible)
        const vision = await import('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/vision_bundle.mjs');
        
        const { FaceDetector, ImageSegmenter, FilesetResolver } = vision;

        // 2. Compilation des Wasm Resolvers
        const visionFileset = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
        );

        // 3. Pré-chargement du Face Detector (AIVideoEngine)
        faceDetector = await FaceDetector.createFromOptions(visionFileset, {
            baseOptions: {
                modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/latest/blaze_face_short_range.tflite",
                delegate: "GPU" 
            },
            runningMode: "VIDEO",
            minDetectionConfidence: 0.5
        });

        // 4. Pré-chargement de la Segmentation (BackgroundBlur)
        selfieSegmentation = await ImageSegmenter.createFromOptions(visionFileset, {
            baseOptions: {
                modelAssetPath: "https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter/float16/latest/selfie_segmenter.tflite",
                delegate: "GPU"
            },
            runningMode: "VIDEO"
        });

        isReady = true;
        console.log("[Worker] Modèles compilés en VRAM avec succès !");
        self.postMessage({ type: 'READY' });

    } catch (error) {
        console.error("[Worker] Erreur lors de l'initialisation", error);
        self.postMessage({ type: 'ERROR', error: error.message });
    }
}
