/**
 * Tests d'authentification \u2014 niveau int\u00e9gration HTTP.
 *
 * On v\u00e9rifie ici uniquement le *rejet* (401) car le happy-path n\u00e9cessiterait
 * un vrai JWT Clerk. La g\u00e9n\u00e9ration du token est test\u00e9e en isolation dans
 * livekitService.test.js, et la validation du payload dans schemas.test.js.
 */
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { buildApp } from '../src/app.js';

describe('Authentification sur /api/livekit/token', () => {
  it('rejette une requ\u00eate sans Authorization header (401)', async () => {
    const app = buildApp();
    const res = await request(app).post('/api/livekit/token').send({ roomName: 'room-abc' });
    expect(res.status).toBe(401);
    expect(res.body.error).toBeDefined();
  });

  it('rejette un Bearer mal form\u00e9 (401)', async () => {
    const app = buildApp();
    const res = await request(app)
      .post('/api/livekit/token')
      .set('Authorization', 'NotBearer xxx')
      .send({ roomName: 'room-abc' });
    expect(res.status).toBe(401);
  });

  it('rejette un token Clerk invalide (401)', async () => {
    const app = buildApp();
    const res = await request(app)
      .post('/api/livekit/token')
      .set('Authorization', 'Bearer faketoken')
      .send({ roomName: 'room-abc' });
    expect(res.status).toBe(401);
  });
});

describe('Authentification sur /api/user/profile', () => {
  it('refuse le header legacy x-user-email (plus accept\u00e9 \u2014 finding F-05)', async () => {
    const app = buildApp();
    const res = await request(app)
      .get('/api/user/profile')
      .set('x-user-email', 'attaquant@example.com');
    // Avant le refactor : 200. Apr\u00e8s : 401 strict (l'identit\u00e9 vient du JWT).
    expect(res.status).toBe(401);
  });
});
