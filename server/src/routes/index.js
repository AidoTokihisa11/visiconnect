/**
 * Routes API \u2014 assemblage centralis\u00e9.
 *
 * Convention : un sous-router par domaine m\u00e9tier (livekit, ai, email, stripe,
 * user). Toutes les routes sensibles passent obligatoirement par
 * `requireAuth` puis (optionnellement) un rate-limiter sp\u00e9cifique.
 */
'use strict';

const express = require('express');

const { requireAuth } = require('../middleware/requireAuth');
const { validateBody } = require('../middleware/validate');
const { tokenLimiter, emailLimiter } = require('../middleware/rateLimit');
const { livekitTokenSchema, emailSchema, aiChatSchema, checkoutSchema } = require('../schemas');

const { postLivekitToken } = require('../controllers/livekitController');
const { postAiChat } = require('../controllers/aiController');
const { postSendEmail } = require('../controllers/emailController');
const { postCheckoutSession } = require('../controllers/stripeController');
const { postUserSync, getUserProfile } = require('../controllers/userController');
const { getHealth } = require('../controllers/healthController');

function buildRouter() {
  const router = express.Router();

  // Sant\u00e9 (publique \u2014 utilis\u00e9e par les load-balancers)
  router.get('/health', getHealth);

  // LiveKit
  router.post(
    '/livekit/token',
    tokenLimiter,
    requireAuth,
    validateBody(livekitTokenSchema),
    postLivekitToken
  );

  // IA
  router.post('/ai/chat', requireAuth, validateBody(aiChatSchema), postAiChat);

  // Email transactionnel
  router.post('/send-email', emailLimiter, requireAuth, validateBody(emailSchema), postSendEmail);

  // Stripe
  router.post(
    '/create-checkout-session',
    requireAuth,
    validateBody(checkoutSchema),
    postCheckoutSession
  );

  // Utilisateur
  router.post('/user/sync', requireAuth, postUserSync);
  router.get('/user/profile', requireAuth, getUserProfile);

  return router;
}

module.exports = { buildRouter };
