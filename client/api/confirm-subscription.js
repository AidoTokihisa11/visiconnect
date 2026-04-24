const Stripe = require('stripe');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'STRIPE_SECRET_KEY non configurée.' });
  }

  const { sessionId } = req.body || {};
  if (!sessionId) return res.status(400).json({ error: 'sessionId requis.' });

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY.trim());

    // Verify payment server-side via Stripe (cannot be forged by the client)
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid' && session.status !== 'complete') {
      return res.status(400).json({ error: 'Paiement non confirmé.' });
    }

    const { plan, billingCycle } = session.metadata || {};
    if (!plan) {
      return res.status(400).json({ error: 'Metadata Stripe incomplètes (plan manquant).' });
    }

    // Return verified plan to the client — the client updates its own Clerk metadata
    // using user.update() from the Clerk frontend SDK (no CLERK_SECRET_KEY needed)
    return res.status(200).json({
      success: true,
      plan,
      billingCycle: billingCycle || 'monthly',
      subscribedAt: new Date().toISOString(),
    });

  } catch (err) {
    console.error('confirm-subscription error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};

