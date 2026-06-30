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

module.exports = async function handler(req, res) {
  if (applyCors(req, res)) return;
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (rateLimit(req, res, { key: 'livekit-token', windowMs: 60_000, max: 10 })) return;

  const session = await requireAuth(req, res);
  if (!session) return;

  const data = parseBody(schemas.livekitToken, req, res);
  if (!data) return;

  const apiKey = String(process.env.LIVEKIT_API_KEY || '').trim();
  const apiSecret = String(process.env.LIVEKIT_API_SECRET || '').trim();
  if (!apiKey || !apiSecret) {
    console.error('[livekit-token] LIVEKIT_API_KEY ou LIVEKIT_API_SECRET manquante.');
    return res.status(503).json({ error: 'Service de visio temporairement indisponible.' });
  }

  // TODO: replace with a Convex authorization check (open room / passcode / host).
  console.info('[livekit-token] grant', { userId: session.userId, room: data.roomName });

  try {
    const at = new AccessToken(apiKey, apiSecret, {
      identity: session.userId, // identit\u00e9 forte = userId Clerk
      name: data.participantName || 'Participant',
      ttl: TOKEN_TTL_SECONDS,
    });

    at.addGrant({
      roomJoin: true,
      room: data.roomName,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
    });

    const token = await Promise.resolve(at.toJwt());
    return res.status(200).json({ token, ttl: TOKEN_TTL_SECONDS });
  } catch (err) {
    console.error('[livekit-token] toJwt failed:', err && err.message ? err.message : err);
    return res.status(500).json({ error: 'Impossible de g\u00e9n\u00e9rer le token.' });
  }
};
