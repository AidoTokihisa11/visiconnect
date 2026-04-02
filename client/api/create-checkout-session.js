const Stripe = require('stripe');

module.exports = async function handler(req, res) {
  // 1. Configuration CORS pour Vercel
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Gérer la requête preflight (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Vérifier la méthode POST
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'STRIPE_SECRET_KEY non configurée dans Vercel.' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY.trim());

  try {
    const { plan, billingCycle } = req.body || {};

    let amount = 0;
    let name = '';

    if (plan === 'starter') {
      amount = 0;
      name = 'VisiConnect Starter';
    } else if (plan === 'pro') {
      amount = billingCycle === 'annual' ? 14400 : 1500;
      name = 'VisiConnect Pro';
    } else if (plan === 'business') {
      amount = billingCycle === 'annual' ? 34800 : 3500;
      name = 'VisiConnect Business';
    } else {
      return res.status(400).json({ error: 'Plan invalide' });
    }

    // Default to the referring origin or host
    const PROTOCOL = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const origin = req.headers.origin || (req.headers.referer ? req.headers.referer.replace(/\/$/, '') : `${PROTOCOL}://${req.headers.host}`);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
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
      success_url: `${origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
    });

    return res.status(200).json({ id: session.id, url: session.url });

  } catch (error) {
    console.error('Erreur création session Stripe:', error.message);
    return res.status(500).json({ error: error.message });
  }
};