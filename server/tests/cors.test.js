/**
 * Tests CORS \u2014 v\u00e9rifie que l'allowlist refuse les origines non autoris\u00e9es.
 */
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { buildApp } from '../src/app.js';

describe('CORS allowlist', () => {
  it('autorise une origine listee dans ALLOWED_ORIGINS', async () => {
    const app = buildApp();
    const res = await request(app).get('/api/health').set('Origin', 'http://localhost:5173');
    expect(res.status).toBe(200);
    expect(res.headers['access-control-allow-origin']).toBe('http://localhost:5173');
  });

  it('refuse une origine non listee (header CORS absent)', async () => {
    const app = buildApp();
    const res = await request(app).get('/api/health').set('Origin', 'https://attacker.example.com');
    // La requ\u00eate r\u00e9pond 200 mais sans header Allow-Origin \u2192 le navigateur bloque.
    expect(res.headers['access-control-allow-origin']).toBeUndefined();
  });

  it('preflight OPTIONS renvoie 204', async () => {
    const app = buildApp();
    const res = await request(app)
      .options('/api/livekit/token')
      .set('Origin', 'http://localhost:5173')
      .set('Access-Control-Request-Method', 'POST');
    expect(res.status).toBe(204);
  });
});
