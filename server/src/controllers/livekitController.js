/**
 * Controllers de l'API LiveKit.
 *
 * R\u00f4le strictement HTTP : valider, appeler le service, formatter la r\u00e9ponse.
 * Aucune logique m\u00e9tier ici.
 */
'use strict';

const { issueAccessToken } = require('../services/livekitService');
const { logger } = require('../lib/logger');

async function postLivekitToken(req, res) {
  try {
    const { roomName, participantName } = req.validBody;
    const userId = req.auth?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Authentification requise.' });
    }

    // TODO: verify in Convex that the user is allowed to join this room (host / passcode / open).
    logger.info({ userId, room: roomName }, '[livekit-token] grant');

    const result = await issueAccessToken({
      userId,
      roomName,
      displayName: participantName,
      role: 'participant',
    });
    return res.status(200).json(result);
  } catch (err) {
    logger.error({ err: err.message }, '[livekit-token] failed');
    return res.status(500).json({ error: 'Impossible de g\u00e9n\u00e9rer le token.' });
  }
}

module.exports = { postLivekitToken };
