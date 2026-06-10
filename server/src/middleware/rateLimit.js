/**
 * Configurations de rate-limiting.
 *
 * Trois profils :
 *   - `globalLimiter` : 300 req / 15 min / IP (filet de s\u00e9curit\u00e9 g\u00e9n\u00e9ral)
 *   - `tokenLimiter`  : 10 req / min / IP (route LiveKit token)
 *   - `emailLimiter`  : 5 req / heure / IP (envoi d'emails)
 *
 * En production, la m\u00e9moire est partag\u00e9e par instance Node : si plusieurs
 * workers tournent (PM2 cluster), brancher un store Redis ici.
 */
'use strict';

const rateLimit = require('express-rate-limit');

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Trop de requ\u00eates depuis cette IP.' },
});

const tokenLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Trop de demandes de token. R\u00e9essayez dans une minute.' },
});

const emailLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Trop d\u2019emails envoy\u00e9s. R\u00e9essayez plus tard.' },
});

module.exports = { globalLimiter, tokenLimiter, emailLimiter };
