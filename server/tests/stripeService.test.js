/**
 * Unit tests du stripeService — chemins isolés qui ne touchent pas au SDK.
 */
import { describe, it, expect } from 'vitest';
import { createCheckoutSession, PLAN_PRICES } from '../src/services/stripeService.js';

describe('stripeService.PLAN_PRICES', () => {
  it('expose pro + business avec montants cohérents (cents)', () => {
    expect(PLAN_PRICES.pro.monthly).toBe(1500);
    expect(PLAN_PRICES.pro.annual).toBe(14400);
    expect(PLAN_PRICES.business.monthly).toBe(3500);
    expect(PLAN_PRICES.business.annual).toBe(34800);
  });

  it('l’annuel de chaque plan est cohérent avec ~12 mois (remise possible)', () => {
    for (const p of Object.values(PLAN_PRICES)) {
      expect(p.annual).toBeLessThanOrEqual(p.monthly * 12);
      expect(p.annual).toBeGreaterThan(p.monthly * 8);
    }
  });
});

describe('stripeService.createCheckoutSession — early returns (pas d’appel Stripe)', () => {
  it('plan="starter" court-circuite Stripe et renvoie { free: true }', async () => {
    const result = await createCheckoutSession({ plan: 'starter' });
    expect(result).toEqual({ free: true, plan: 'starter' });
  });

  it('plan inconnu → jette une erreur 400', async () => {
    await expect(createCheckoutSession({ plan: 'phantom' })).rejects.toMatchObject({
      status: 400,
      message: expect.stringMatching(/invalide/i),
    });
  });
});
