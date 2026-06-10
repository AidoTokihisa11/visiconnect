/**
 * V\u00e9rification d'un JWT Clerk c\u00f4t\u00e9 serveur (Vercel Functions).
 *
 * On utilise @clerk/backend (l\u00e9ger, sans d\u00e9pendance Express) pour valider
 * un token transmis dans l'en-t\u00eate `Authorization: Bearer <jwt>`.
 *
 * Variables d'environnement requises (lues automatiquement par Clerk) :
 *   - CLERK_SECRET_KEY
 *   - CLERK_PUBLISHABLE_KEY (optionnel, pour les checks d'audience)
 *
 * Usage :
 *   const { requireAuth } = require('./_lib/auth');
 *   const session = await requireAuth(req, res);
 *   if (!session) return; // 401 d\u00e9j\u00e0 envoy\u00e9
 *   const userId = session.userId;
 */

let clerkClientPromise = null;

async function getClerkClient() {
  if (!clerkClientPromise) {
    clerkClientPromise = (async () => {
      const { createClerkClient } = await import('@clerk/backend');
      if (!process.env.CLERK_SECRET_KEY) {
        throw new Error('CLERK_SECRET_KEY manquante');
      }
      return createClerkClient({
        secretKey: process.env.CLERK_SECRET_KEY,
        publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
      });
    })();
  }
  return clerkClientPromise;
}

/**
 * V\u00e9rifie le token Clerk et retourne `{ userId, sessionId }` ou `null`.
 * En cas d'\u00e9chec, r\u00e9pond 401 avec un message g\u00e9n\u00e9rique (pas de fuite d'info).
 */
async function requireAuth(req, res) {
  try {
    const header = req.headers.authorization || '';
    const match = /^Bearer\s+(.+)$/i.exec(header);
    if (!match) {
      res.status(401).json({ error: 'Authentification requise.' });
      return null;
    }
    const token = match[1].trim();

    const clerk = await getClerkClient();
    const authState = await clerk.authenticateRequest(
      new Request('https://internal/', {
        headers: { authorization: `Bearer ${token}` },
      }),
      {
        secretKey: process.env.CLERK_SECRET_KEY,
        authorizedParties: (process.env.ALLOWED_ORIGINS || '')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      }
    );

    if (!authState.isSignedIn) {
      res.status(401).json({ error: 'Session invalide.' });
      return null;
    }

    const auth = authState.toAuth();
    return {
      userId: auth.userId,
      sessionId: auth.sessionId,
      claims: auth.sessionClaims,
    };
  } catch (err) {
    console.error('[auth] verification failed:', err && err.message ? err.message : err);
    res.status(401).json({ error: 'Session invalide.' });
    return null;
  }
}

module.exports = { requireAuth };
