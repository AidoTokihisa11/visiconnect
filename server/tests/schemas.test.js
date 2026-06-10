/**
 * Tests unitaires des sch\u00e9mas Zod \u2014 v\u00e9rifie la couche de validation
 * en isolation (sans Express).
 */
import { describe, it, expect } from 'vitest';
import {
  livekitTokenSchema,
  emailSchema,
  aiChatSchema,
  checkoutSchema,
} from '../src/schemas/index.js';

describe('livekitTokenSchema', () => {
  it('accepte un payload valide', () => {
    const result = livekitTokenSchema.safeParse({
      roomName: 'room-abc-123',
      participantName: 'Th\u00e9o',
    });
    expect(result.success).toBe(true);
  });

  it('refuse un roomName trop court', () => {
    const result = livekitTokenSchema.safeParse({ roomName: 'a' });
    expect(result.success).toBe(false);
  });

  it('refuse un roomName avec caract\u00e8res sp\u00e9ciaux (anti-injection)', () => {
    const result = livekitTokenSchema.safeParse({ roomName: 'room<script>' });
    expect(result.success).toBe(false);
  });

  it('refuse un roomName de plus de 64 caract\u00e8res', () => {
    const result = livekitTokenSchema.safeParse({ roomName: 'a'.repeat(65) });
    expect(result.success).toBe(false);
  });

  it('accepte uniquement [a-zA-Z0-9_-:.]', () => {
    expect(livekitTokenSchema.safeParse({ roomName: 'team:meeting_2026.01' }).success).toBe(true);
    expect(livekitTokenSchema.safeParse({ roomName: 'room with space' }).success).toBe(false);
  });
});

describe('emailSchema', () => {
  it('refuse un email mal form\u00e9', () => {
    const result = emailSchema.safeParse({
      to: 'pas-un-email',
      subject: 'Test',
      html: '<p>hi</p>',
    });
    expect(result.success).toBe(false);
  });

  it('refuse un sujet vide', () => {
    const result = emailSchema.safeParse({
      to: 'a@b.com',
      subject: '',
      html: '<p>hi</p>',
    });
    expect(result.success).toBe(false);
  });
});

describe('aiChatSchema', () => {
  it('exige au moins un message', () => {
    const result = aiChatSchema.safeParse({ messages: [] });
    expect(result.success).toBe(false);
  });

  it('refuse plus de 30 messages (anti-DoS)', () => {
    const result = aiChatSchema.safeParse({
      messages: Array.from({ length: 31 }, () => ({ role: 'user', content: 'x' })),
    });
    expect(result.success).toBe(false);
  });

  it('refuse un r\u00f4le invalide', () => {
    const result = aiChatSchema.safeParse({
      messages: [{ role: 'admin', content: 'hi' }],
    });
    expect(result.success).toBe(false);
  });
});

describe('checkoutSchema', () => {
  it('accepte uniquement les plans connus', () => {
    expect(checkoutSchema.safeParse({ plan: 'pro' }).success).toBe(true);
    expect(checkoutSchema.safeParse({ plan: 'enterprise' }).success).toBe(false);
  });
});
