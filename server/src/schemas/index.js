/**
 * Schemas de validation Zod pour les endpoints du serveur Express.
 *
 * Ces schemas sont *parall\u00e8les* \u00e0 ceux de client/api/_lib/schemas.js. Le
 * d\u00e9doublement est accept\u00e9 ici pour conserver un d\u00e9couplage strict entre
 * les deux d\u00e9ploiements (Vercel functions ind\u00e9pendantes du serveur Express).
 */
'use strict';

const { z } = require('zod');

const livekitTokenSchema = z.object({
  roomName: z
    .string()
    .min(3)
    .max(64)
    .regex(/^[a-zA-Z0-9_\-:.]+$/, 'roomName contient des caract\u00e8res interdits'),
  participantName: z.string().min(1).max(60).optional(),
});

const emailSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1).max(200),
  html: z.string().min(1).max(50_000),
});

const aiChatSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(['system', 'user', 'assistant']),
        content: z.string().min(1).max(8000),
      })
    )
    .min(1)
    .max(30),
  style: z.enum(['concise', 'balanced', 'deep']).optional(),
  purpose: z.enum(['chat', 'summary', 'translation', 'actionItems', 'keyNotes']).optional(),
  locale: z.string().max(16).optional(),
});

const checkoutSchema = z.object({
  plan: z.enum(['starter', 'pro', 'business']),
  billingCycle: z.enum(['monthly', 'annual']).optional(),
});

module.exports = {
  livekitTokenSchema,
  emailSchema,
  aiChatSchema,
  checkoutSchema,
};
