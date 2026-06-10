const Stripe = require('stripe');
const { applyCors } = require('./_lib/cors');
const { requireAuth } = require('./_lib/auth');
const { rateLimit } = require('./_lib/rateLimit');
const { parseBody, schemas } = require('./_lib/schemas');

module.exports = async function handler(req, res) {
  if (applyCors(req, res)) return;
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  if (rateLimit(req, res, { key: 'checkout', windowMs: 60_000, max: 10 })) return;

  const session = await requireAuth(req, res);
  if (!session) return;

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'STRIPE_SECRET_KEY non configurée.' });
  }

  const data = parseBody(schemas.checkout, req, res);
  if (!data) return;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY.trim());

  try {
    const { plan, billingCycle, userEmail, locale: rawLocale } = data;

    // Map UI locale to a Stripe-supported locale (https://stripe.com/docs/api/checkout/sessions/create#create_checkout_session-locale).
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
    const norm = (typeof rawLocale === 'string' ? rawLocale : '').trim();
    const candidate = norm.replace('_', '-');
    const checkoutLocale = STRIPE_LOCALES.has(candidate)
      ? candidate
      : STRIPE_LOCALES.has(candidate.split('-')[0])
        ? candidate.split('-')[0]
        : 'auto';

    // Starter is free — skip Stripe, activate directly
    if (plan === 'starter') {
      return res.status(200).json({ free: true, plan: 'starter', message: 'Plan Starter activé' });
    }

    let amount = 0;
    let name = '';

    if (plan === 'pro') {
      amount = billingCycle === 'annual' ? 14400 : 1500; // matches src/config/pricing.js PLANS.pro
      name = 'VisiConnect Pro';
    } else if (plan === 'business') {
      amount = billingCycle === 'annual' ? 34800 : 3500; // matches src/config/pricing.js PLANS.business
      name = 'VisiConnect Business';
    } else {
      return res
        .status(400)
        .json({ error: 'Plan invalide. Valeurs acceptées : starter, pro, business.' });
    }

    if (amount <= 0) {
      return res.status(400).json({ error: 'Montant invalide pour le plan sélectionné.' });
    }

    // Determine origin for redirect URLs
    const PROTOCOL = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const origin =
      req.headers.origin ||
      (req.headers.referer
        ? req.headers.referer.replace(/\/$/, '')
        : `${PROTOCOL}://${req.headers.host}`);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      ...(userEmail ? { customer_email: userEmail } : {}),
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: name,
            },
            unit_amount: amount,
            recurring: {
              interval: billingCycle === 'annual' ? 'year' : 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      metadata: {
        userId: session.userId || '',
        plan: plan,
        billingCycle: billingCycle || 'monthly',
      },
      locale: checkoutLocale,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
    });

    return res.status(200).json({ id: session.id, url: session.url });
  } catch (error) {
    console.error('Erreur création session Stripe:', error.message);
    return res.status(500).json({ error: error.message });
  }
};
