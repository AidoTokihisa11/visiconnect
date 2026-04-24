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
  if (!process.env.CLERK_SECRET_KEY) {
    return res.status(500).json({ error: 'CLERK_SECRET_KEY non configurée.' });
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

    const { userId, plan, billingCycle } = session.metadata || {};
    if (!userId || !plan) {
      return res.status(400).json({ error: 'Metadata Stripe incomplètes (userId ou plan manquant).' });
    }

    // Update Clerk user public_metadata via Clerk Management REST API
    const clerkRes = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        public_metadata: {
          plan,
          billingCycle: billingCycle || 'monthly',
          subscribedAt: new Date().toISOString(),
          stripeSessionId: sessionId,
        },
      }),
    });

    if (!clerkRes.ok) {
      const clerkErr = await clerkRes.json();
      console.error('Clerk update error:', clerkErr);
      return res.status(500).json({ error: 'Erreur mise à jour profil.', details: clerkErr });
    }

    return res.status(200).json({ success: true, plan });

  } catch (err) {
    console.error('confirm-subscription error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
