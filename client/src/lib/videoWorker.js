// videoWorker.js - Web Worker dédié pour l'IA (Initialisation et Inférence)
// Ce Worker tourne sur un thread séparé pour ne jamais bloquer l'UI React.

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
        
        // 1. Import dynamique des CDN MediaPipe
        importScripts('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/vision_bundle.js');
        
        const { FaceDetector, ImageSegmenter, FilesetResolver } = self.MediaPipeTasksVision;

        // 2. Compilation des Wasm Resolvers
        const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
        );

        // 3. Pré-chargement du Face Detector (AIVideoEngine)
        faceDetector = await FaceDetector.createFromOptions(vision, {
            baseOptions: {
                modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/latest/blaze_face_short_range.tflite",
                delegate: "GPU" 
            },
            runningMode: "VIDEO",
            minDetectionConfidence: 0.5
        });

        // 4. Pré-chargement de la Segmentation (BackgroundBlur)
        selfieSegmentation = await ImageSegmenter.createFromOptions(vision, {
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
