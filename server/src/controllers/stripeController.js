/**
 * Controllers Stripe : Checkout Session + r\u00e9ception du webhook.
 */
'use strict';

const { createCheckoutSession, verifyWebhook } = require('../services/stripeService');
const { logger } = require('../lib/logger');

async function postCheckoutSession(req, res) {
  try {
    const { plan, billingCycle } = req.validBody;
    const origin = req.headers.origin || 'https://visioconnect.pro';
    const userId = req.auth?.userId;
    const userEmail = req.auth?.claims?.email || null;

    const result = await createCheckoutSession({
      plan,
      billingCycle,
      userEmail,
      userId,
      locale: req.headers['accept-language']?.split(',')[0],
      originUrl: origin,
    });
    return res.status(200).json(result);
  } catch (err) {
    const status = err.status || 500;
    logger.warn({ err: err.message }, '[stripe] checkout failed');
    return res.status(status).json({ error: status === 500 ? 'Erreur Stripe.' : err.message });
  }
}

/**
 * Webhook Stripe \u2014 v\u00e9rifie la signature avant de traiter.
 * /!\\ Cette route doit \u00eatre mont\u00e9e avec express.raw() (pas de JSON body parser).
 */
function postStripeWebhook(req, res) {
  const signature = req.headers['stripe-signature'];
  let event;
  try {
    event = verifyWebhook(req.body, signature);
  } catch (err) {
    logger.warn({ err: err.message }, '[stripe] webhook signature invalid');
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // TODO traitement m\u00e9tier (mise \u00e0 jour Convex), hors scope court terme.
  logger.info({ type: event.type, id: event.id }, '[stripe] webhook received');
  return res.status(200).json({ received: true });
}

module.exports = { postCheckoutSession, postStripeWebhook };
