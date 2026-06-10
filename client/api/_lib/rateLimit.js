/**
 * Rate-limiting m\u00e9moire pour Vercel Serverless Functions.
 *
 * \u26a0\ufe0f Vercel instancie plusieurs containers en parall\u00e8le : la fen\u00eatre
 * appliqu\u00e9e ici est *best-effort* (par container). Pour un v\u00e9ritable
 * rate-limit distribu\u00e9, on basculerait sur Upstash Redis ou Vercel KV.
 * En l'\u00e9tat actuel du projet (trafic limit\u00e9), ce filet de s\u00e9curit\u00e9 suffit
 * \u00e0 bloquer les scripts de brute-force simples.
 *
 * Usage :
 *   const { rateLimit } = require('./_lib/rateLimit');
 *   if (rateLimit(req, res, { windowMs: 60_000, max: 10 })) return;
 */

const buckets = new Map();

function getClientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.length > 0) {
    return fwd.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

function rateLimit(req, res, { windowMs = 60_000, max = 30, key = '' } = {}) {
  const ip = getClientIp(req);
  const bucketKey = `${key}:${ip}`;
  const now = Date.now();
  const entry = buckets.get(bucketKey);

  if (!entry || now - entry.start > windowMs) {
    buckets.set(bucketKey, { start: now, count: 1 });
    return false;
  }

  entry.count += 1;

  if (entry.count > max) {
    const retryAfter = Math.ceil((entry.start + windowMs - now) / 1000);
    res.setHeader('Retry-After', String(retryAfter));
    res.status(429).json({ error: 'Trop de requ\u00eates. R\u00e9essayez plus tard.' });
    return true;
  }

  return false;
}

// Garbage collection toutes les 5 minutes pour \u00e9viter une fuite m\u00e9moire
setInterval(() => {
  const now = Date.now();
  for (const [k, v] of buckets) {
    if (now - v.start > 10 * 60_000) buckets.delete(k);
  }
}, 5 * 60_000).unref?.();

module.exports = { rateLimit };
