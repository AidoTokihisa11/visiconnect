const { AccessToken } = require('livekit-server-sdk');

// --- CONFIGURATION ---
// Récupérez ces clés sur https://cloud.livekit.io/ -> Settings -> Keys & Tokens
const LIVEKIT_API_KEY = "devkey";      // REMPLACEZ CECI
const LIVEKIT_API_SECRET = "secret";   // REMPLACEZ CECI

const roomName = "test-4k-room";
const participantName = "Admin-Tester";

const createToken = () => {
  const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
    identity: participantName,
    ttl: '1h' // Valide 1 heure
  });

  // Permissions pour publier de la vidéo (nécessaire pour le test)
  at.addGrant({
    roomJoin: true,
    room: roomName,
    canPublish: true,
    canSubscribe: true,
  });

  return at.toJwt();
};

try {
  const token = createToken();
  console.log("\n✅ VOTRE TOKEN LIVEKIT (Copiez tout le texte ci-dessous) :\n");
  console.log(token);
  console.log("\n-------------------------------------------------------\n");
} catch (error) {
  console.error("Erreur lors de la génération du token:", error);
}
