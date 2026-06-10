/**
 * Application Express \u2014 factory pour permettre les tests Supertest.
 *
 * Ordre du pipeline (important) :
 *   helmet                     \u2192 en-t\u00eates de s\u00e9curit\u00e9
 *   corsMiddleware             \u2192 liste blanche d'origines
 *   express.raw (Stripe only)  \u2192 le webhook Stripe a besoin du raw body
 *   express.json               \u2192 toutes les autres routes
 *   globalLimiter              \u2192 filet de s\u00e9curit\u00e9
 *   /api routes                \u2192 sous-routers
 *   notFoundHandler            \u2192 404 g\u00e9n\u00e9rique
 *   errorHandler               \u2192 fallback g\u00e9n\u00e9ral
 */
'use strict';

const express = require('express');
const helmet = require('helmet');

const { corsMiddleware } = require('./middleware/cors');
const { globalLimiter } = require('./middleware/rateLimit');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const { postStripeWebhook } = require('./controllers/stripeController');
const { buildRouter } = require('./routes');

function buildApp() {
  const app = express();

  // 1. En-t\u00eates s\u00e9curit\u00e9
  app.use(
    helmet({
      contentSecurityPolicy: false, // r\u00e9activable en mode "API only"
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    })
  );

  // 2. CORS allowlist
  app.use(corsMiddleware);

  // 3. Webhook Stripe \u2014 doit \u00eatre AVANT json() car la signature est calcul\u00e9e
  //    sur le body brut.
  app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), postStripeWebhook);

  // 4. JSON parser pour le reste
  app.use(express.json({ limit: '1mb' }));

  // 5. Rate-limit global
  app.use(globalLimiter);

  // 6. Routes m\u00e9tier
  app.use('/api', buildRouter());

  // 7. Sant\u00e9 hors-API (compat ancien chemin)
  app.get('/health', (_req, res) => res.json({ status: 'OK', uptime: process.uptime() }));

  // 8. 404 + erreur
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

module.exports = { buildApp };
