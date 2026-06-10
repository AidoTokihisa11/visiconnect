/**
 * Tests unitaires du LivekitService \u2014 v\u00e9rifie la g\u00e9n\u00e9ration de tokens
 * en isolation (pas d'Express, pas de Clerk).
 *
 * Couvre : structure du JWT, TTL, identity, role admin/host.
 */
import { describe, it, expect } from 'vitest';
import { issueAccessToken, TOKEN_TTL_SECONDS } from '../src/services/livekitService.js';

function decodePayload(jwt) {
  const [, payload] = jwt.split('.');
  return JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
}

describe('issueAccessToken', () => {
  it('exige un userId', async () => {
    await expect(issueAccessToken({ userId: '', roomName: 'r1' })).rejects.toThrow(/userId/);
  });

  it('produit un JWT au format header.payload.signature', async () => {
    const { token, ttl } = await issueAccessToken({
      userId: 'user_42',
      roomName: 'r1',
      displayName: 'Th\u00e9o',
    });
    expect(token.split('.').length).toBe(3);
    expect(ttl).toBe(TOKEN_TTL_SECONDS);
  });

  it('encode le userId comme identity du JWT (pas le pseudo client)', async () => {
    const { token } = await issueAccessToken({
      userId: 'user_42',
      roomName: 'r1',
      displayName: 'fakename',
    });
    const payload = decodePayload(token);
    expect(payload.sub).toBe('user_42');
    expect(payload.name).toBe('fakename');
  });

  it('limite les permissions admin au r\u00f4le host', async () => {
    const { token: participantToken } = await issueAccessToken({
      userId: 'u1',
      roomName: 'r1',
    });
    const { token: hostToken } = await issueAccessToken({
      userId: 'u2',
      roomName: 'r1',
      role: 'host',
    });
    const participant = decodePayload(participantToken);
    const host = decodePayload(hostToken);
    expect(participant.video?.roomAdmin).toBeFalsy();
    expect(host.video?.roomAdmin).toBe(true);
  });

  it('respecte la TTL de 4h', async () => {
    const before = Math.floor(Date.now() / 1000);
    const { token } = await issueAccessToken({ userId: 'u1', roomName: 'r1' });
    const payload = decodePayload(token);
    const lifetime = payload.exp - before;
    // Tol\u00e9rance de \u00b15 secondes (latence de tests).
    expect(lifetime).toBeGreaterThanOrEqual(4 * 60 * 60 - 5);
    expect(lifetime).toBeLessThanOrEqual(4 * 60 * 60 + 5);
  });
});
