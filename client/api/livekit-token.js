import { AccessToken } from 'livekit-server-sdk';

export default async function handler(req, res) {
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
    const { roomName, participantName } = req.body || {};

    if (!roomName || !participantName) {
      return res.status(400).json({ error: 'Missing roomName or participantName' });
    }

    if (!process.env.LIVEKIT_API_KEY || !process.env.LIVEKIT_API_SECRET) {
      console.warn('⚠️ Missing LiveKit API Keys - Returning mock token for local dev');
      return res.status(200).json({ token: "mock_token_due_to_missing_keys" });
    }

    const at = new AccessToken(
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
      {
        identity: `guest_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        name: participantName || 'Guest',
      }
    );

    at.addGrant({ 
      roomJoin: true, 
      room: roomName, 
      canPublish: true, 
      canSubscribe: true 
    });
    
    const token = await at.toJwt();

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Token creation failed:", error);
    return res.status(500).json({ error: 'Could not create token', details: error.message });
  }
}
