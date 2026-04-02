const { AccessToken } = require('livekit-server-sdk');

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

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (e) {}
    }
    const { roomName, participantName } = body || {};

    if (!roomName || !participantName) {
      return res.status(400).json({ error: 'Missing roomName or participantName' });
    }

    const apiKey = String(process.env.LIVEKIT_API_KEY || '').replace(/['"]+/g, '').trim();
    const apiSecret = String(process.env.LIVEKIT_API_SECRET || '').replace(/['"]+/g, '').trim();

    if (!apiKey || !apiSecret) {
      console.warn('⚠️ Missing LiveKit API Keys - Returning mock token for local dev');
      return res.status(200).json({ token: "mock_token_due_to_missing_keys" });
    }

    const at = new AccessToken(
      apiKey,
      apiSecret,
      {
        identity: participantName || `guest_${String(Date.now()).slice(-6)}_${Math.random().toString(36).substring(2, 6)}`,
        name: participantName || 'Guest',
      }
    );

    at.addGrant({ 
      roomJoin: true, 
      room: String(roomName), 
      canPublish: true, 
      canSubscribe: true 
    });
    
    // Résolution compatible avec toutes les versions du SDK
    const token = await Promise.resolve(at.toJwt());

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Token creation failed:", error);
    return res.status(500).json({ error: 'Could not create token', details: String(error) });
  }
};
