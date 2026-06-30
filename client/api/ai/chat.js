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
 * - GROQ_API_KEY
 * - GROQ_MODEL (optional, default: llama-3.3-70b-versatile)
 * - OPENROUTER_API_KEY (optional fallback)
 * - OPENROUTER_MODEL (optional, default: meta-llama/llama-3.1-8b-instruct:free)
 */

const { applyCors } = require('../_lib/cors');
const { requireAuth } = require('../_lib/auth');
const { rateLimit } = require('../_lib/rateLimit');
const { parseBody, schemas } = require('../_lib/schemas');

// System prompts for different purposes
const SYSTEM_PROMPTS = {
  chat: `You are an intelligent assistant for VisioConnect, a professional video-conferencing platform.
You help users with:
- Technical questions (camera, mic, video quality, latency)
- Platform features (chat, polls, screen share, whiteboard)
- Best practices for online meetings
- Troubleshooting common issues

LANGUAGE RULES (STRICT):
1. Detect the language of the user's latest message and ALWAYS reply in that exact language.
2. If detection is ambiguous, fall back to the locale hint provided by the client.
3. NEVER default to French unless the user wrote in French or the locale hint is fr.
4. NEVER state that you are "configured" for a specific language. Just answer.
5. Never mix two languages in one reply.

Be concise and professional. If you don't know, say so honestly.`,

  summary: `You are a professional meeting assistant. Produce a summary STRICTLY based on the provided transcript (do not invent).
Expected format:
- Clear sections with titles
- Short, precise bullets
- Professional tone

Mandatory sections:
1. Overview (2-3 sentences)
2. Decisions made
3. Action items (with owner if mentioned)
4. Open questions

Respond in the SAME language as the source transcript (auto-detect). Default to the locale hint if the transcript is empty.`,

  translation: `You are a professional translator. Translate the provided text to the requested target language.
Strict rules:
- Preserve tone, style and nuances
- Keep proper nouns, URLs, @mentions and emojis intact
- Reply ONLY with the translation, no commentary or explanation
- If the text is already in the target language, return it as-is`,

  actionItems: `You are an assistant that extracts action items from a meeting.
Strict JSON output format:
{
  "actions": [
    {"task": "description", "assignee": "name or null", "deadline": "date or null", "priority": "high|medium|low"}
  ]
}
Reply ONLY with valid JSON, no surrounding text. Use the same language as the input for the task descriptions.`,

  keyNotes: `You are an assistant that identifies key points of a discussion.
Rules:
- Extract the 5-10 most important points
- Use short, precise bullets
- Prioritize: decisions, problems, solutions, questions
- Be factual, do not assume
- Respond in the SAME language as the input.`,
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
      Authorization: `Bearer ${apiKey}`,
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
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://visiconnect.vercel.app',
      'X-Title': 'VisioConnect AI Assistant',
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
module.exports = async function handler(req, res) {
  if (applyCors(req, res)) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // 20 requêtes / minute / IP. L'IA est coûteuse, on protège.
  if (rateLimit(req, res, { key: 'ai-chat', windowMs: 60_000, max: 20 })) return;

  const session = await requireAuth(req, res);
  if (!session) return;

  const data = parseBody(schemas.aiChat, req, res);
  if (!data) return;

  try {
    const { messages, purpose = 'chat', locale } = data;

    // Inject locale hint so the model can fall back to it when language detection is ambiguous.
    const baseSystemPrompt = SYSTEM_PROMPTS[purpose] || SYSTEM_PROMPTS.chat;
    const localeHint =
      typeof locale === 'string' && locale.length <= 16
        ? `\n\n[Client locale hint: "${locale}". Use this language as a fallback only if the user's intended language cannot be detected from their message.]`
        : '';
    const systemPrompt = baseSystemPrompt + localeHint;

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
};
