/**
 * AiService \u2014 proxy de chat vers les fournisseurs LLM externes.
 *
 * R\u00f4le : isoler les controllers du choix de provider (Groq prim\u00e9, OpenRouter
 * en repli) et des nuances de leurs API.
 */
'use strict';

const { env } = require('../config/env');

const SYSTEM_PROMPTS = {
  chat: `You are an intelligent assistant for VisiConnect, a professional video-conferencing platform. Be concise and professional. If you don't know, say so honestly.`,
  summary: `You are a meeting assistant. Produce a structured summary STRICTLY based on the provided transcript.`,
  translation: `You are a professional translator. Reply ONLY with the translation, no commentary.`,
  actionItems: `Extract action items from the transcript. Output JSON: {"actions":[{"task","assignee","deadline","priority"}]}.`,
  keyNotes: `Extract the 5-10 most important points as concise bullets.`,
};

async function callGroq(messages) {
  if (!env.GROQ_API_KEY) throw new Error('GROQ_API_KEY non configur\u00e9e');
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: env.GROQ_MODEL,
      messages,
      max_tokens: 1024,
      temperature: 0.7,
    }),
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`GROQ API ${response.status} ${detail}`);
  }
  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

async function callOpenRouter(messages) {
  if (!env.OPENROUTER_API_KEY) throw new Error('OPENROUTER_API_KEY non configur\u00e9e');
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://visioconnect.pro',
      'X-Title': 'VisiConnect AI Assistant',
    },
    body: JSON.stringify({
      model: env.OPENROUTER_MODEL,
      messages,
      max_tokens: 1024,
      temperature: 0.7,
    }),
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`OpenRouter API ${response.status} ${detail}`);
  }
  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

async function chat({ messages, purpose = 'chat', locale }) {
  const systemPrompt = SYSTEM_PROMPTS[purpose] || SYSTEM_PROMPTS.chat;
  const localeHint =
    typeof locale === 'string' && locale.length <= 16 ? `\n[Client locale hint: "${locale}".]` : '';
  const fullMessages = [
    { role: 'system', content: systemPrompt + localeHint },
    ...messages.slice(-15),
  ];

  // Strat\u00e9gie : Groq d'abord (rapide), OpenRouter en fallback.
  try {
    const content = await callGroq(fullMessages);
    return { content, provider: 'groq' };
  } catch (groqErr) {
    if (!env.OPENROUTER_API_KEY) throw groqErr;
    const content = await callOpenRouter(fullMessages);
    return { content, provider: 'openrouter' };
  }
}

module.exports = { chat };
