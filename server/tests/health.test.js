/**
 * Tests sant\u00e9 + 404.
 */
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { buildApp } from '../src/app.js';

describe('Routes publiques', () => {
  it('GET /health renvoie 200', async () => {
    const app = buildApp();
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('OK');
  });

  it('GET /api/health renvoie 200 + nodeEnv=test', async () => {
    const app = buildApp();
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.nodeEnv).toBe('test');
  });

  it('Une route inconnue renvoie 404', async () => {
    const app = buildApp();
    const res = await request(app).get('/api/inexistant');
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });
});
