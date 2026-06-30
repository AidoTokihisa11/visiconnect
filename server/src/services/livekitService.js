/**
 * LivekitService — seul point de contact avec le SDK LiveKit.
 *
 * Centralise la politique de sécurité (TTL, grants) et isole les controllers
 * du SDK, ce qui simplifie les tests et facilite un éventuel changement de provider.
 */
'use strict';

const { AccessToken } = require('livekit-server-sdk');
const { env } = require('../config/env');

const TOKEN_TTL_SECONDS = 4 * 60 * 60;

/**
 * \u00c9met un token LiveKit pour `userId` (l'identit\u00e9 forte) avec le pseudo
 * d'affichage `displayName`.
 *
 * @param {Object} params
 * @param {string} params.userId      identifiant Clerk (jamais issu du client).
 * @param {string} params.roomName    nom de la room valid\u00e9 par le schema Zod.
 * @param {string} [params.displayName]
 * @param {string} [params.role='participant'] r\u00f4le m\u00e9tier ('host' | 'participant').
 */
async function issueAccessToken({ userId, roomName, displayName, role = 'participant' }) {
  if (!userId) {
    throw new Error('userId requis');
  }

  const at = new AccessToken(env.LIVEKIT_API_KEY, env.LIVEKIT_API_SECRET, {
    identity: userId,
    name: displayName || 'Participant',
    ttl: TOKEN_TTL_SECONDS,
    metadata: JSON.stringify({ role }),
  });

  at.addGrant({
    roomJoin: true,
    room: roomName,
    canPublish: true,
    canSubscribe: true,
    canPublishData: true,
    // Les actions admin (mute / kick) restent r\u00e9serv\u00e9es au r\u00f4le 'host'.
    roomAdmin: role === 'host',
  });

  const token = await Promise.resolve(at.toJwt());
  return { token, ttl: TOKEN_TTL_SECONDS };
}

module.exports = { issueAccessToken, TOKEN_TTL_SECONDS };
