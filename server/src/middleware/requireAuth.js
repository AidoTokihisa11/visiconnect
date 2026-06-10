/**
 * Middleware d'authentification Clerk.
 *
 * V\u00e9rifie le JWT pr\u00e9sent dans `Authorization: Bearer <token>`. En cas de
 * succ\u00e8s, attache `req.auth = { userId, sessionId, claims }`. En cas d'\u00e9chec,
 * r\u00e9pond 401 avec un message neutre (sans fuite d'info).
 *
 * Pour Socket.IO, voir `src/socket/authMiddleware.js` qui r\u00e9utilise la m\u00eame
 * v\u00e9rification mais sur le handshake.
 */
'use strict';

const { logger } = require('../lib/logger');

let clerkClientPromise = null;

async function getClerkClient() {
  if (!clerkClientPromise) {
    clerkClientPromise = (async () => {
      const { createClerkClient } = await import('@clerk/backend');
      const { env } = require('../config/env');
      return createClerkClient({
        secretKey: env.CLERK_SECRET_KEY,
        publishableKey: env.CLERK_PUBLISHABLE_KEY,
      });
    })();
  }
  return clerkClientPromise;
}

async function verifyClerkToken(token) {
  const clerk = await getClerkClient();
  const { env } = require('../config/env');
  const result = await clerk.authenticateRequest(
    new Request('https://internal/', {
      headers: { authorization: `Bearer ${token}` },
    }),
    {
      secretKey: env.CLERK_SECRET_KEY,
      authorizedParties: env.ALLOWED_ORIGINS.split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    }
  );
  if (!result.isSignedIn) return null;
  const auth = result.toAuth();
  return { userId: auth.userId, sessionId: auth.sessionId, claims: auth.sessionClaims };
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const match = /^Bearer\s+(.+)$/i.exec(header);
  if (!match) {
    return res.status(401).json({ error: 'Authentification requise.' });
  }

  verifyClerkToken(match[1].trim())
    .then((auth) => {
      if (!auth) return res.status(401).json({ error: 'Session invalide.' });
      req.auth = auth;
      return next();
    })
    .catch((err) => {
      logger.warn({ err: err && err.message }, '[auth] verification failed');
      return res.status(401).json({ error: 'Session invalide.' });
    });
}

module.exports = { requireAuth, verifyClerkToken };
