import { describe, it, expect } from 'vitest';
import { resolveStripeError } from '../src/lib/stripeErrors';

describe('resolveStripeError — Stripe error → localized user message', () => {
  it('returns the default message for null / undefined', () => {
    expect(resolveStripeError(null)).toMatch(/n'a pas pu être finalisé/i);
    expect(resolveStripeError(undefined)).toMatch(/n'a pas pu être finalisé/i);
  });

  it('maps a known card error code to its FR translation', () => {
    const msg = resolveStripeError({ code: 'expired_card' });
    expect(msg).toContain('expiré');
  });

  it('maps insufficient_funds correctly', () => {
    expect(resolveStripeError({ code: 'insufficient_funds' })).toContain('Fonds insuffisants');
  });

  it('honours the EN locale when requested', () => {
    const en = resolveStripeError({ code: 'expired_card' }, 'en');
    expect(en.toLowerCase()).toContain('expired');
    // "en-US" should also route to EN.
    expect(resolveStripeError({ code: 'insufficient_funds' }, 'en-US')).toContain(
      'Insufficient funds'
    );
  });

  it('falls back to the default message when the code is unknown', () => {
    const msg = resolveStripeError({ code: 'not_a_real_code_xyz' });
    expect(msg).toMatch(/n'a pas pu être finalisé/i);
  });

  it('accepts a plain string that matches a known code and translates it', () => {
    expect(resolveStripeError('expired_card')).toContain('expiré');
  });
});
