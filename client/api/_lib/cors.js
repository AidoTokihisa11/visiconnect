/**
 * CORS allowlist pour les Vercel Serverless Functions.
 *
 * Le wildcard `*` n'est jamais utilis\u00e9. L'origine de la requ\u00eate est compar\u00e9e
 * \u00e0 la liste blanche issue de :
 *   1. ALLOWED_ORIGINS (CSV) — pilot\u00e9 depuis Vercel.
 *   2. Une liste par d\u00e9faut s\u00fbre (production + previews + localhost).
 *
 * Usage :
 *   const { applyCors } = require('./_lib/cors');
 *   if (applyCors(req, res)) return; // termine la r\u00e9ponse si OPTIONS
 */

const DEFAULT_ORIGINS = [
  'https://visioconnect.pro',
  'https://www.visioconnect.pro',
  'https://visiconnect.pro',
  'https://www.visiconnect.pro',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
];

function getAllowedOrigins() {
  const fromEnv = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  return new Set([...DEFAULT_ORIGINS, ...fromEnv]);
}

function isOriginAllowed(origin) {
  if (!origin) return false;
  const allowed = getAllowedOrigins();
  if (allowed.has(origin)) return true;
  // Autorise *.vercel.app pour les previews du projet uniquement.
  try {
    const { hostname } = new URL(origin);
    if (hostname.endsWith('.vercel.app') && hostname.startsWith('visiconnect')) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

/**
 * \u00c9crit les en-t\u00eates CORS appropri\u00e9es et g\u00e8re la pr\u00e9-vol OPTIONS.
 * Retourne `true` si la r\u00e9ponse a \u00e9t\u00e9 termin\u00e9e (l'appelant doit `return`).
 */
function applyCors(req, res, methods = 'POST, OPTIONS') {
  const origin = req.headers.origin;

  if (isOriginAllowed(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', methods);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '600');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return true;
  }
  return false;
}

module.exports = { applyCors, isOriginAllowed };
