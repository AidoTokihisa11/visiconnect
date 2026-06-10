const { applyCors } = require('./_lib/cors');
const { requireAuth } = require('./_lib/auth');
const { rateLimit } = require('./_lib/rateLimit');
const { parseBody, schemas } = require('./_lib/schemas');

module.exports = async function handler(req, res) {
  if (applyCors(req, res)) return;
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  if (rateLimit(req, res, { key: 'downgrade', windowMs: 60_000, max: 5 })) return;

  const session = await requireAuth(req, res);
  if (!session) return;

  if (!process.env.CLERK_SECRET_KEY) {
    return res.status(500).json({ error: 'CLERK_SECRET_KEY non configurée.' });
  }

  const data = parseBody(schemas.downgrade, req, res);
  if (!data) return;

  // 🔐 Vérification d'autorisation : un utilisateur ne peut downgrader que son propre compte.
  if (data.userId !== session.userId) {
    return res.status(403).json({ error: 'Opération interdite.' });
  }

  const { userId } = data;

  try {
    // This endpoint can only set plan to 'starter' (downgrade-only = no privilege escalation risk)
    const clerkRes = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        public_metadata: {
          plan: 'starter',
          billingCycle: null,
          subscribedAt: null,
          downgradedAt: new Date().toISOString(),
        },
      }),
    });

    if (!clerkRes.ok) {
      const clerkErr = await clerkRes.json();
      console.error('Clerk downgrade error:', clerkErr);
      return res.status(500).json({ error: 'Erreur mise à jour profil.', details: clerkErr });
    }

    return res.status(200).json({ success: true, plan: 'starter' });
  } catch (err) {
    console.error('downgrade-subscription error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
