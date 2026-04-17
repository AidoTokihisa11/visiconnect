/**
 * Vercel Serverless Function - AI Chat Proxy
 * 
 * Route: /api/ai/chat
 * 
 * Supports:
 * - GROQ API (primary - fast, free tier)
 * - OpenRouter API (fallback)
 * 
 * Environment Variables Required:
 * - GROQ_API_KEY: Your GROQ API key
 * - GROQ_MODEL: Model to use (default: llama-3.3-70b-versatile)
 * - OPENROUTER_API_KEY: Your OpenRouter API key (fallback)
 * - OPENROUTER_MODEL: OpenRouter model (default: meta-llama/llama-3.1-8b-instruct:free)
 */

// CORS headers for all responses
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// System prompts for different purposes
const SYSTEM_PROMPTS = {
  chat: `Tu es un assistant intelligent pour une plateforme de visioconférence professionnelle appelée VisiConnect. 
Tu aides les utilisateurs avec:
- Questions techniques (caméra, micro, qualité vidéo, latence)
- Fonctionnalités de la plateforme (chat, sondages, partage d'écran, tableau blanc)
- Bonnes pratiques pour les réunions en ligne
- Résolution de problèmes courants

Réponds en français, de manière concise et professionnelle. Si tu ne connais pas la réponse, dis-le honnêtement.`,
  
  summary: `Tu es un assistant de réunion professionnel. Produis un résumé STRICTEMENT basé sur le transcript fourni (sans inventer).
Format attendu:
- Sections claires avec titres
- Puces courtes et précises
- Ton professionnel

Sections obligatoires:
1. Vue d'ensemble (2-3 phrases)
2. Décisions prises
3. Actions à faire (avec responsable si mentionné)
4. Questions ouvertes

Réponds en français.`,

  translation: `Tu es un traducteur professionnel. Traduis le texte fourni vers la langue demandée.
Règles strictes:
- Préserve le ton, le style et les nuances
- Garde les noms propres, URLs, mentions @ et emojis intacts
- Réponds UNIQUEMENT avec la traduction, sans commentaire ni explication
- Si le texte est déjà dans la langue cible, retourne-le tel quel`,

  actionItems: `Tu es un assistant qui extrait les actions à faire d'une réunion.
Format de sortie JSON strict:
{
  "actions": [
    {"task": "description", "assignee": "nom ou null", "deadline": "date ou null", "priority": "high|medium|low"}
  ]
}
Réponds UNIQUEMENT avec le JSON valide, sans texte autour.`,

  keyNotes: `Tu es un assistant qui identifie les points clés d'une discussion.
Règles:
- Extrais les 5-10 points les plus importants
- Utilise des puces courtes et précises
- Priorise: décisions, problèmes, solutions, questions
- Sois factuel, ne suppose pas`,
};

/**
 * Call GROQ API
 */
async function callGroq(messages, model) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('GROQ_API_KEY not configured');

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model || process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
      messages,
      max_tokens: 1024,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`GROQ API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

/**
 * Call OpenRouter API (fallback)
 */
async function callOpenRouter(messages, model) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error('OPENROUTER_API_KEY not configured');

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://visiconnect.vercel.app',
      'X-Title': 'VisiConnect AI Assistant',
    },
    body: JSON.stringify({
      model: model || process.env.OPENROUTER_MODEL || 'meta-llama/llama-3.1-8b-instruct:free',
      messages,
      max_tokens: 1024,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

/**
 * Main handler
 */
export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Set CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  try {
    const { messages, style = 'balanced', purpose = 'chat' } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // Build conversation with system prompt
    const systemPrompt = SYSTEM_PROMPTS[purpose] || SYSTEM_PROMPTS.chat;
    const fullMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.slice(-15), // Limit context window
    ];

    let content = '';
    let provider = '';

    // Try GROQ first (faster, better free tier)
    try {
      content = await callGroq(fullMessages);
      provider = 'groq';
    } catch (groqError) {
      console.error('[AI Chat] GROQ failed:', groqError.message);
      
      // Fallback to OpenRouter
      try {
        content = await callOpenRouter(fullMessages);
        provider = 'openrouter';
      } catch (openRouterError) {
        console.error('[AI Chat] OpenRouter failed:', openRouterError.message);
        throw new Error('All AI providers unavailable');
      }
    }

    return res.status(200).json({
      content,
      provider,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('[AI Chat] Error:', error.message);
    
    return res.status(503).json({
      error: 'AI service temporarily unavailable',
      message: "L'IA est momentanément indisponible. Veuillez réessayer dans quelques instants.",
      fallback: true,
    });
  }
}
