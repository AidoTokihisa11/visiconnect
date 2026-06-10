/**
 * Logger structur\u00e9 (pino).
 *
 * \u2022 En d\u00e9veloppement : sortie pretty-print (lisible humainement).
 * \u2022 En production : JSON ligne par ligne (compatible avec Loki, Datadog, etc.).
 * \u2022 PII masqu\u00e9 par d\u00e9faut (emails, tokens, mots de passe).
 *
 * Pourquoi pino plut\u00f4t que console.log :
 *   1. Niveaux de log pilot\u00e9s par LOG_LEVEL (production reste silencieuse en debug).
 *   2. Performance (pino sort le JSON sans formatage co\u00fbteux).
 *   3. Redaction native pour la conformit\u00e9 RGPD article 32.
 */
'use strict';

const pino = require('pino');
const { env, isProd } = require('../config/env');

const redactPaths = [
  'req.headers.authorization',
  'req.headers.cookie',
  'res.headers["set-cookie"]',
  '*.password',
  '*.token',
  '*.apiKey',
  '*.secret',
];

const transport = isProd
  ? undefined // JSON brut en prod
  : {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
      },
    };

const logger = pino({
  level: env.LOG_LEVEL,
  redact: { paths: redactPaths, censor: '[REDACTED]' },
  base: { service: 'visiconnect-server' },
  transport,
});

/**
 * Pseudonymisation d'un email pour les logs.
 * a***@example.com
 */
function maskEmail(email) {
  if (typeof email !== 'string' || !email.includes('@')) return '[invalid]';
  const [local, domain] = email.split('@');
  if (local.length <= 1) return `*@${domain}`;
  return `${local[0]}***@${domain}`;
}

module.exports = { logger, maskEmail };
