module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  if (!process.env.CLERK_SECRET_KEY) {
    return res.status(500).json({ error: 'CLERK_SECRET_KEY non configurée.' });
  }

  const { userId } = req.body || {};
  if (!userId) return res.status(400).json({ error: 'userId requis.' });

  try {
    // This endpoint can only set plan to 'starter' (downgrade-only = no privilege escalation risk)
    const clerkRes = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
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
