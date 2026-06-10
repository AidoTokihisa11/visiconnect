/**
 * Netlify Function \u2014 POST /.netlify/functions/livekit-token
 *
 * Cible de fallback (la production tourne sur Vercel + serveur VPS).
 * Ce fichier reproduit les m\u00eames garanties que client/api/livekit-token.js :
 *   - CORS sur liste blanche (jamais '*').
 *   - Validation stricte de roomName.
 *   - Fail-fast si les cl\u00e9s LiveKit sont absentes (plus de mock token).
 *   - TTL 4h, identit\u00e9 al\u00e9atoire (Netlify ne dispose pas de Clerk ici).
 *
 * \u26a0\ufe0f Pour la production, pr\u00e9f\u00e9rer la version Vercel qui v\u00e9rifie le JWT
 * Clerk et utilise userId comme identit\u00e9 LiveKit.
 */
const { AccessToken } = require('livekit-server-sdk');

const ALLOWED_ORIGINS = [
  'https://visioconnect.pro',
  'https://www.visioconnect.pro',
  'https://visiconnect.pro',
  'https://www.visiconnect.pro',
  'http://localhost:5173',
  'http://localhost:3000',
];

function buildHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : '',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    Vary: 'Origin',
    'Content-Type': 'application/json',
  };
}

exports.handler = async (event) => {
  const origin = event.headers?.origin || event.headers?.Origin || '';
  const headers = buildHeaders(origin);

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'JSON invalide.' }) };
  }

  const { roomName, participantName } = body;
  if (
    typeof roomName !== 'string' ||
    roomName.length < 3 ||
    roomName.length > 64 ||
    !/^[a-zA-Z0-9_\-:.]+$/.test(roomName)
  ) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'roomName invalide.' }) };
  }

  if (!process.env.LIVEKIT_API_KEY || !process.env.LIVEKIT_API_SECRET) {
    console.error('[netlify livekit-token] Cl\u00e9s LiveKit absentes.');
    return { statusCode: 503, headers, body: JSON.stringify({ error: 'Service indisponible.' }) };
  }

  try {
    const at = new AccessToken(process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET, {
      identity: `guest_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      name: participantName || 'Guest',
      ttl: 4 * 60 * 60,
    });
    at.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
    });
    const token = await at.toJwt();
    return { statusCode: 200, headers, body: JSON.stringify({ token, ttl: 4 * 60 * 60 }) };
  } catch (err) {
    console.error('[netlify livekit-token] toJwt failed:', err && err.message ? err.message : err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Impossible de g\u00e9n\u00e9rer le token.' }),
    };
  }
};
