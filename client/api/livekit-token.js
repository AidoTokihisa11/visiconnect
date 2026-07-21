/**
 * POST /api/livekit-token
 *
 * \u00c9met un AccessToken LiveKit apr\u00e8s avoir v\u00e9rifi\u00e9 :
 *   1. La pr\u00e9sence d'un JWT Clerk valide (authentification).
 *   2. La validit\u00e9 du payload (Zod).
 *   3. L'autorisation effective de rejoindre la room (placeholder Convex \u00e0
 *      remplir une fois la query c\u00f4t\u00e9 Convex disponible : ici on autorise par
 *      d\u00e9faut tous les utilisateurs authentifi\u00e9s, mais on logge le contr\u00f4le).
 */
const { AccessToken } = require('livekit-server-sdk');
const { applyCors } = require('./_lib/cors');
const { requireAuth } = require('./_lib/auth');
const { rateLimit } = require('./_lib/rateLimit');
const { parseBody, schemas } = require('./_lib/schemas');

const TOKEN_TTL_SECONDS = 4 * 60 * 60; // 4h
const DEMO_TOKEN_TTL_SECONDS = 60 * 60; // 1h pour les salles de test anonymes

// Rooms de test publiques : accessibles sans authentification (démo produit).
const DEMO_ROOM_REGEX = /^demo[-_]/i;

function randomSuffix() {
  return Math.random().toString(36).slice(2, 8);
}

function sanitizeName(name) {
  return String(name || 'Invité')
    .replace(/[^\p{L}\p{N}\s._-]/gu, '')
    .trim()
    .slice(0, 40) || 'Invité';
}

module.exports = async function handler(req, res) {
  if (applyCors(req, res)) return;
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (rateLimit(req, res, { key: 'livekit-token', windowMs: 60_000, max: 10 })) return;

  // On parse d'abord le body pour savoir si c'est une room démo (anonyme autorisée).
  const data = parseBody(schemas.livekitToken, req, res);
  if (!data) return;

  const isDemoRoom = DEMO_ROOM_REGEX.test(data.roomName);

  // Authentification : obligatoire sauf pour les salles démo publiques.
  let session = null;
  if (!isDemoRoom) {
    session = await requireAuth(req, res);
    if (!session) return;
  }

  const apiKey = String(process.env.LIVEKIT_API_KEY || '').trim();
  const apiSecret = String(process.env.LIVEKIT_API_SECRET || '').trim();
  if (!apiKey || !apiSecret) {
    console.error('[livekit-token] LIVEKIT_API_KEY ou LIVEKIT_API_SECRET manquante.');
    return res.status(503).json({ error: 'Service de visio temporairement indisponible.' });
  }

  const participantName = sanitizeName(data.participantName);
  // Identité : userId Clerk pour les utilisateurs auth, sinon pseudo + suffixe aléatoire
  // (garantit l'unicité côté LiveKit pour un même pseudo utilisé par plusieurs invités).
  const identity = session
    ? session.userId
    : `guest_${participantName.toLowerCase().replace(/\s+/g, '-')}_${randomSuffix()}`;

  console.info('[livekit-token] grant', {
    identity,
    room: data.roomName,
    demo: isDemoRoom,
  });

  try {
    const at = new AccessToken(apiKey, apiSecret, {
      identity,
      name: participantName,
      ttl: isDemoRoom ? DEMO_TOKEN_TTL_SECONDS : TOKEN_TTL_SECONDS,
    });

    at.addGrant({
      roomJoin: true,
      room: data.roomName,
      canPublish: true,
      canSubscribe: true,
      // Les invités anonymes ne peuvent pas envoyer de data messages custom
      // (évite le spam via canal de données). Uniquement audio/vidéo.
      canPublishData: !isDemoRoom,
    });

    const token = await Promise.resolve(at.toJwt());
    return res
      .status(200)
      .json({ token, ttl: isDemoRoom ? DEMO_TOKEN_TTL_SECONDS : TOKEN_TTL_SECONDS });
  } catch (err) {
    console.error('[livekit-token] toJwt failed:', err && err.message ? err.message : err);
    return res.status(500).json({ error: 'Impossible de g\u00e9n\u00e9rer le token.' });
  }
};
