/**
 * StripeService \u2014 gestion des abonnements VisiConnect.
 *
 * Encapsule la cr\u00e9ation des Checkout Sessions et la v\u00e9rification des
 * webhooks (signature). Pas de logique m\u00e9tier dans les controllers : ils
 * appellent uniquement les m\u00e9thodes expos\u00e9es ici.
 */
'use strict';

const stripeFactory = require('stripe');
const { env } = require('../config/env');

let stripeInstance = null;
function getStripe() {
  if (!env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY non configur\u00e9e.');
  }
  if (!stripeInstance) {
    stripeInstance = stripeFactory(env.STRIPE_SECRET_KEY.trim());
  }
  return stripeInstance;
}

const PLAN_PRICES = {
  pro: { monthly: 1500, annual: 14400, name: 'VisiConnect Pro' },
  business: { monthly: 3500, annual: 34800, name: 'VisiConnect Business' },
};

const STRIPE_LOCALES = new Set([
  'auto',
  'bg',
  'cs',
  'da',
  'de',
  'el',
  'en',
  'en-GB',
  'es',
  'es-419',
  'et',
  'fi',
  'fil',
  'fr',
  'fr-CA',
  'hr',
  'hu',
  'id',
  'it',
  'ja',
  'ko',
  'lt',
  'lv',
  'ms',
  'mt',
  'nb',
  'nl',
  'pl',
  'pt',
  'pt-BR',
  'ro',
  'ru',
  'sk',
  'sl',
  'sv',
  'th',
  'tr',
  'vi',
  'zh',
  'zh-HK',
  'zh-TW',
]);

function normalizeLocale(rawLocale) {
  const norm = (typeof rawLocale === 'string' ? rawLocale : '').trim().replace('_', '-');
  if (STRIPE_LOCALES.has(norm)) return norm;
  if (STRIPE_LOCALES.has(norm.split('-')[0])) return norm.split('-')[0];
  return 'auto';
}

async function createCheckoutSession({
  plan,
  billingCycle = 'monthly',
  userEmail,
  userId,
  locale,
  originUrl,
}) {
  if (plan === 'starter') {
    return { free: true, plan: 'starter' };
  }

  const tier = PLAN_PRICES[plan];
  if (!tier) throw Object.assign(new Error('Plan invalide.'), { status: 400 });

  const cycle = billingCycle === 'annual' ? 'annual' : 'monthly';
  const amount = tier[cycle];
  if (!amount || amount <= 0) {
    throw Object.assign(new Error('Montant invalide.'), { status: 400 });
  }

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    ...(userEmail ? { customer_email: userEmail } : {}),
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: { name: tier.name },
          unit_amount: amount,
          recurring: { interval: cycle === 'annual' ? 'year' : 'month' },
        },
        quantity: 1,
      },
    ],
    mode: 'subscription',
    metadata: { userId: userId || '', plan, billingCycle: cycle },
    locale: normalizeLocale(locale),
    success_url: `${originUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${originUrl}/pricing`,
  });

  return { id: session.id, url: session.url };
}

function verifyWebhook(rawBody, signature) {
  if (!env.STRIPE_WEBHOOK_SECRET) {
    throw new Error('STRIPE_WEBHOOK_SECRET non configur\u00e9.');
  }
  const stripe = getStripe();
  return stripe.webhooks.constructEvent(rawBody, signature, env.STRIPE_WEBHOOK_SECRET);
}

module.exports = { createCheckoutSession, verifyWebhook, PLAN_PRICES };
