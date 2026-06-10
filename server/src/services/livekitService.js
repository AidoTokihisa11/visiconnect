/**
 * LivekitService \u2014 \u00e9met les AccessToken JWT pour rejoindre une room LiveKit.
 *
 * Cette couche service est *seule* \u00e0 manipuler le SDK LiveKit. Les
 * controllers ne d\u00e9pendent que de l'API publique de ce module, ce qui :
 *   1. simplifie les tests (on stubbe AccessToken une seule fois) ;
 *   2. permet de changer de provider plus tard sans toucher aux routes ;
 *   3. concentre la politique de s\u00e9curit\u00e9 (TTL, grants) en un seul endroit.
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
