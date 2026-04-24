const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: 'OK' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'STRIPE_SECRET_KEY non configurée sur le serveur Netlify.' })
    };
  }

  try {
    const { plan, billingCycle } = JSON.parse(event.body);

    // Starter is free — skip Stripe
    if (plan === 'starter') {
      return { statusCode: 200, headers, body: JSON.stringify({ free: true, plan: 'starter', message: 'Plan Starter activé' }) };
    }

    let amount = 0;
    let name = '';

    if (plan === 'pro') {
      amount = billingCycle === 'annual' ? 14400 : 1500;
      name = 'VisiConnect Pro';
    } else if (plan === 'business') {
      amount = billingCycle === 'annual' ? 34800 : 3500;
      name = 'VisiConnect Business';
    } else {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Plan invalide. Valeurs acceptées : starter, pro, business.' }) };
    }

    if (amount <= 0) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Montant invalide pour le plan sélectionné.' }) };
    }

    // Default to the referring origin, fallback to Netlify or localhost
    const origin = event.headers.origin || event.headers.referer?.replace(/\/$/, '') || 'http://localhost:5173';

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

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ id: session.id, url: session.url }),
    };

  } catch (error) {
    console.error('Erreur création session Stripe:', error.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
