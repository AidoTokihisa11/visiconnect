/**
 * Validation centralis\u00e9e des variables d'environnement.
 *
 * Comportement *fail-fast* : si une variable obligatoire manque, le serveur
 * refuse de d\u00e9marrer plut\u00f4t que de servir des r\u00e9ponses partiellement cass\u00e9es.
 *
 * En d\u00e9veloppement (NODE_ENV !== 'production'), un avertissement non bloquant
 * est affich\u00e9 pour les variables optionnelles manquantes.
 */
'use strict';

const { z } = require('zod');

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z
    .string()
    .regex(/^\d+$/, 'PORT doit \u00eatre num\u00e9rique')
    .default('5099')
    .transform((v) => parseInt(v, 10)),

  // CORS — liste blanche d'origines (CSV)
  ALLOWED_ORIGINS: z.string().min(1).default('http://localhost:5173,http://localhost:3000'),

  // Clerk (authentification)
  CLERK_SECRET_KEY: z.string().min(1, 'CLERK_SECRET_KEY est obligatoire'),
  CLERK_PUBLISHABLE_KEY: z.string().optional(),

  // LiveKit (visio)
  LIVEKIT_API_KEY: z.string().min(1, 'LIVEKIT_API_KEY est obligatoire'),
  LIVEKIT_API_SECRET: z.string().min(1, 'LIVEKIT_API_SECRET est obligatoire'),
  LIVEKIT_URL: z.string().url('LIVEKIT_URL doit \u00eatre une URL valide').optional(),

  // Stripe (paiements) — optionnel en local mais requis pour les routes /api/stripe/*
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),

  // Resend (emails) — optionnel en local
  RESEND_API_KEY: z.string().optional(),

  // OpenRouter / Groq (IA) — optionnels
  GROQ_API_KEY: z.string().optional(),
  GROQ_MODEL: z.string().default('llama-3.3-70b-versatile'),
  OPENROUTER_API_KEY: z.string().optional(),
  OPENROUTER_MODEL: z.string().default('meta-llama/llama-3.1-8b-instruct:free'),

  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
});

function loadEnv() {
  const parsed = schema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  \u2022 ${i.path.join('.')} : ${i.message}`)
      .join('\n');
    // Pas de logger ici (c'est lui qui d\u00e9pend de cette config) \u2192 console.
    console.error('\u274c Configuration invalide :\n' + issues);
    process.exit(1);
  }
  return parsed.data;
}

const env = loadEnv();
const isProd = env.NODE_ENV === 'production';

module.exports = { env, isProd };
