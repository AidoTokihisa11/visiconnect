/**
 * Middleware CORS sur liste blanche.
 *
 * Aucun usage de `cors({ origin: '*' })`. L'origine de la requ\u00eate doit \u00eatre
 * explicitement \u00e9num\u00e9r\u00e9e dans `ALLOWED_ORIGINS` (CSV).
 */
'use strict';

const { env } = require('../config/env');

const allowedOrigins = new Set(
  env.ALLOWED_ORIGINS.split(',')
    .map((s) => s.trim())
    .filter(Boolean)
);

function corsMiddleware(req, res, next) {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '600');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  return next();
}

function isOriginAllowed(origin) {
  return Boolean(origin && allowedOrigins.has(origin));
}

module.exports = { corsMiddleware, isOriginAllowed, allowedOrigins };
