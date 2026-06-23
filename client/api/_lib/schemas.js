/**
 * Schemas de validation Zod pour les payloads d'API.
 * Centralis\u00e9 ici pour rester DRY et r\u00e9utilisable c\u00f4t\u00e9 tests.
 */
const { z } = require('zod');

const livekitTokenSchema = z.object({
  roomName: z
    .string()
    .min(3, 'roomName trop court')
    .max(64, 'roomName trop long')
    .regex(/^[a-zA-Z0-9_\-:.]+$/, 'roomName contient des caract\u00e8res interdits'),
  participantName: z.string().min(1).max(60).optional(),
  passcode: z.string().min(4).max(64).optional(),
});

const meetingInviteSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(80).optional(),
  meetingId: z.string().min(1).max(64).optional(),
  meetingTitle: z.string().min(1).max(140).optional(),
  meetingLink: z.string().url(),
  date: z.string().optional(),
  startTime: z.string().optional(),
});

const checkoutSchema = z.object({
  plan: z.enum(['starter', 'pro', 'business']),
  billingCycle: z.enum(['monthly', 'annual']).optional(),
  userId: z.string().optional(),
  userEmail: z.string().email().optional(),
  locale: z.string().max(16).optional(),
});

const downgradeSchema = z.object({
  userId: z.string().min(1).max(64),
});

const confirmSubscriptionSchema = z.object({
  sessionId: z.string().min(1).max(120),
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

/**
 * Helper : valide `req.body` contre un schema et envoie 400 si erreur.
 */
function parseBody(schema, req, res) {
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      res.status(400).json({ error: 'JSON invalide.' });
      return null;
    }
  }
  const parsed = schema.safeParse(body || {});
  if (!parsed.success) {
    res.status(400).json({
      error: 'Payload invalide.',
      issues: parsed.error.issues.map((i) => ({
        path: i.path.join('.'),
        message: i.message,
      })),
    });
    return null;
  }
  return parsed.data;
}

module.exports = {
  parseBody,
  schemas: {
    livekitToken: livekitTokenSchema,
    meetingInvite: meetingInviteSchema,
    checkout: checkoutSchema,
    downgrade: downgradeSchema,
    confirmSubscription: confirmSubscriptionSchema,
    aiChat: aiChatSchema,
  },
};
