const Stripe = require('stripe');
const { applyCors } = require('./_lib/cors');
const { requireAuth } = require('./_lib/auth');
const { rateLimit } = require('./_lib/rateLimit');
const { parseBody, schemas } = require('./_lib/schemas');

module.exports = async function handler(req, res) {
  if (applyCors(req, res)) return;
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  if (rateLimit(req, res, { key: 'confirm-sub', windowMs: 60_000, max: 20 })) return;

  const session = await requireAuth(req, res);
  if (!session) return;

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'STRIPE_SECRET_KEY non configurée.' });
  }

  const data = parseBody(schemas.confirmSubscription, req, res);
  if (!data) return;

  const { sessionId } = data;

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
