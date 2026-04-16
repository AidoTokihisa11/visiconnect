const fs = require('fs');

// 1. Apporter isAiReady à MeetingRoom et le repasser
let roomCode = fs.readFileSync('client/src/components/room/MeetingRoom.jsx', 'utf8');
if (!roomCode.includes('isAiReady,')) {
    roomCode = roomCode.replace("    isAIEnhanced,\n    toggleAIVideoEngine,", "    isAiReady,\n    isAIEnhanced,\n    toggleAIVideoEngine,");
    roomCode = roomCode.replace("         isAIEnhanced={isAIEnhanced}", "         isAiReady={isAiReady}\n         isAIEnhanced={isAIEnhanced}");
    fs.writeFileSync('client/src/components/room/MeetingRoom.jsx', roomCode);
}

// 2. Griser les boutons de flou et d'IA dans BottomControlBar
let barCode = fs.readFileSync('client/src/components/room/BottomControlBar.jsx', 'utf8');
if (!barCode.includes('isAiReady,')) {
    barCode = barCode.replace("  isAIEnhanced,\n  toggleAIVideoEngine,", "  isAiReady,\n  isAIEnhanced,\n  toggleAIVideoEngine,");
}

// Inject disability on Blue and AI logic 
const blurDisabledStr = "disabled={!isCameraEnabled}";
if (!barCode.includes("disabled={!isCameraEnabled || !isAiReady}")) {
     barCode = barCode.replace(/disabled=\{\!isCameraEnabled\}/g, "disabled={!isCameraEnabled || !isAiReady}");
}

const aiButtonStr = "disabled={!isCameraEnabled}";
if (barCode.includes('const iaButtonStr = "<ControlButton\\n            $active={isAIEnhanced}"')) {
   // Skip if already done
} else {
    // Modify AIEngine Button
    barCode = barCode.replace("<ControlButton\n            $active={isAIEnhanced}", "<ControlButton\n            disabled={!isAiReady}\n            $active={isAIEnhanced}");
    
    // Add glowing effect only if it's loading
    barCode = barCode.replace('title={isAIEnhanced ? "Désactiver l\'IA (Auto-Lighting & Upscaling)" : "Activer l\'IA vidéo (Netteté & Auto-Lighting)"}', 'title={!isAiReady ? "Modèles d\'IA en cours de chargement..." : (isAIEnhanced ? "Désactiver l\'IA" : "Activer l\'IA vidéo")}');
}

fs.writeFileSync('client/src/components/room/BottomControlBar.jsx', barCode);
