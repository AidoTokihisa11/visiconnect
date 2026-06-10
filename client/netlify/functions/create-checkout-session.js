/**
 * Netlify Function \u2014 POST /.netlify/functions/create-checkout-session
 *
 * Cible de fallback (production sur Vercel). M\u00eame garde-fous CORS et
 * validation que la version Vercel.
 */
const stripeFactory = require('stripe');

const ALLOWED_ORIGINS = [
  'https://visioconnect.pro',
  'https://www.visioconnect.pro',
  'https://visiconnect.pro',
  'https://www.visiconnect.pro',
  'http://localhost:5173',
  'http://localhost:3000',
];

function buildHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : '',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    Vary: 'Origin',
    'Content-Type': 'application/json',
  };
}

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

const PLAN_PRICES = {
  pro: { monthly: 1500, annual: 14400, name: 'VisiConnect Pro' },
  business: { monthly: 3500, annual: 34800, name: 'VisiConnect Business' },
};

exports.handler = async (event) => {
  const origin = event.headers?.origin || event.headers?.Origin || '';
  const headers = buildHeaders(origin);

  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers, body: '' };
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'STRIPE_SECRET_KEY non configur\u00e9e.' }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'JSON invalide.' }) };
  }

  const { plan, billingCycle, locale: rawLocale } = body;

  if (plan === 'starter') {
    return { statusCode: 200, headers, body: JSON.stringify({ free: true, plan: 'starter' }) };
  }

  const tier = PLAN_PRICES[plan];
  if (!tier) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Plan invalide.' }) };
  }
  const cycle = billingCycle === 'annual' ? 'annual' : 'monthly';
  const amount = tier[cycle];
  if (!amount || amount <= 0) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Montant invalide.' }) };
  }

  const norm = (typeof rawLocale === 'string' ? rawLocale : '').trim().replace('_', '-');
  const checkoutLocale = STRIPE_LOCALES.has(norm)
    ? norm
    : STRIPE_LOCALES.has(norm.split('-')[0])
      ? norm.split('-')[0]
      : 'auto';

  const stripe = stripeFactory(process.env.STRIPE_SECRET_KEY.trim());

  try {
    const checkoutOrigin =
      (ALLOWED_ORIGINS.includes(origin) ? origin : null) ||
      event.headers?.referer?.replace(/\/$/, '') ||
      'https://visioconnect.pro';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
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
      locale: checkoutLocale,
      success_url: `${checkoutOrigin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${checkoutOrigin}/pricing`,
    });

    return { statusCode: 200, headers, body: JSON.stringify({ id: session.id, url: session.url }) };
  } catch (err) {
    console.error('[netlify checkout] Stripe error:', err && err.message ? err.message : err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Erreur Stripe.' }) };
  }
};
