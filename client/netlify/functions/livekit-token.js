const { AccessToken } = require('livekit-server-sdk');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

exports.handler = async (event, context) => {
  // Gérer la requête de preflight de CORS (OPTIONS)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { roomName, participantName } = body;

    if (!roomName || !participantName) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing roomName or participantName' })
      };
    }

    if (!process.env.LIVEKIT_API_KEY || !process.env.LIVEKIT_API_SECRET) {
      console.warn('⚠️ Missing LiveKit API Keys - Returning mock token for local dev');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ token: "mock_token_due_to_missing_keys" })
      };
    }

    const at = new AccessToken(
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
      {
        identity: `guest_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
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

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    };
  } catch (error) {
    console.error("Token creation failed:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Could not create token', details: error.message })
    };
  }
};