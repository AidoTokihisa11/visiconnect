/**
 * Unit tests des controllers — appelés directement avec des req/res factices.
 * Cible : logique HTTP pure (auth guard, mapping des erreurs, formatage réponse).
 *
 * Note : les "happy paths" qui exigent un service qui renvoie un succès ne
 * peuvent pas être mockés ici (les controllers CJS destructurent au top-level
 * du require, ce que vi.mock ne peut intercepter dans un test ESM). Ils sont
 * couverts par les tests d'intégration existants.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { postLivekitToken } from '../src/controllers/livekitController.js';
import { postAiChat } from '../src/controllers/aiController.js';
import { postSendEmail } from '../src/controllers/emailController.js';
import { postCheckoutSession, postStripeWebhook } from '../src/controllers/stripeController.js';
import { postUserSync, getUserProfile } from '../src/controllers/userController.js';
import { getHealth } from '../src/controllers/healthController.js';

function makeRes() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  res.send = vi.fn().mockReturnValue(res);
  return res;
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('healthController.getHealth', () => {
  it('renvoie 200 + status ok + nodeEnv issu de env', () => {
    const res = makeRes();
    getHealth({}, res);
    expect(res.status).toHaveBeenCalledWith(200);
    const body = res.json.mock.calls[0][0];
    expect(body.status).toBe('ok');
    expect(body.service).toBe('visiconnect-server');
    expect(body.nodeEnv).toBe('test');
    expect(body.timestamp).toBeDefined();
  });
});

describe('userController — identité issue exclusivement du JWT (finding F-05)', () => {
  it('postUserSync renvoie id + email + displayName issus de req.auth.claims', () => {
    const req = { auth: { userId: 'user_123', claims: { email: 'a@b.com', name: 'Alice' } } };
    const res = makeRes();
    postUserSync(req, res);
    const body = res.json.mock.calls[0][0];
    expect(body.success).toBe(true);
    expect(body.user).toEqual({ id: 'user_123', email: 'a@b.com', displayName: 'Alice' });
  });

  it('postUserSync fallback displayName = local-part de l’email si claims.name absent', () => {
    const req = { auth: { userId: 'u1', claims: { email: 'bob@corp.io' } } };
    const res = makeRes();
    postUserSync(req, res);
    expect(res.json.mock.calls[0][0].user.displayName).toBe('bob');
  });

  it('postUserSync accepte claims.email_address (alias Clerk)', () => {
    const req = { auth: { userId: 'u1', claims: { email_address: 'c@d.io' } } };
    const res = makeRes();
    postUserSync(req, res);
    expect(res.json.mock.calls[0][0].user.email).toBe('c@d.io');
  });

  it('postUserSync fallback displayName="utilisateur" si aucun email dispo', () => {
    const req = { auth: { userId: 'u1', claims: {} } };
    const res = makeRes();
    postUserSync(req, res);
    expect(res.json.mock.calls[0][0].user.displayName).toBe('utilisateur');
  });

  it('getUserProfile expose des stats initialisées à zéro', () => {
    const req = { auth: { userId: 'u1', claims: { email: 'x@y.z' } } };
    const res = makeRes();
    getUserProfile(req, res);
    expect(res.json.mock.calls[0][0].stats).toEqual({
      totalMeetings: 0,
      totalParticipants: 0,
      totalMinutes: 0,
      meetingsThisMonth: 0,
    });
  });
});

describe('livekitController.postLivekitToken — auth guard', () => {
  it('refuse (401) si req.auth.userId manquant', async () => {
    const req = { validBody: { roomName: 'r1', participantName: 'p1' }, auth: {} };
    const res = makeRes();
    await postLivekitToken(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json.mock.calls[0][0].error).toMatch(/authentification/i);
  });

  it('refuse (401) si req.auth entièrement absent', async () => {
    const req = { validBody: { roomName: 'r1' } };
    const res = makeRes();
    await postLivekitToken(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
  });
});

describe('aiController.postAiChat — gestion d’erreur', () => {
  it('mappe une panne service vers 503 avec message neutre', async () => {
    const req = { validBody: { messages: [] } };
    const res = makeRes();
    await postAiChat(req, res);
    expect(res.status).toHaveBeenCalledWith(503);
    expect(res.json.mock.calls[0][0].error).toMatch(/indisponible/i);
  });
});

describe('emailController.postSendEmail — gestion d’erreur', () => {
  it('mappe une panne service vers 500 avec message générique (pas de fuite)', async () => {
    const req = { validBody: { to: 'a@b.com', subject: 's', html: 'x' } };
    const res = makeRes();
    await postSendEmail(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json.mock.calls[0][0].error).toMatch(/impossible/i);
  });
});

describe('stripeController.postCheckoutSession — gestion d’erreur', () => {
  it('renvoie 500 avec un message générique quand Stripe n’est pas configuré', async () => {
    const req = { validBody: { plan: 'pro', billingCycle: 'monthly' }, headers: {}, auth: {} };
    const res = makeRes();
    await postCheckoutSession(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json.mock.calls[0][0].error).toBe('Erreur Stripe.');
  });
});

describe('stripeController.postStripeWebhook — signature invalide', () => {
  it('rejette 400 si le webhook secret ne peut vérifier la signature', () => {
    const req = { headers: { 'stripe-signature': 'sig_x' }, body: Buffer.from('{}') };
    const res = makeRes();
    postStripeWebhook(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(expect.stringContaining('Webhook Error'));
  });
});
