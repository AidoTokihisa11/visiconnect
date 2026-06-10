/**
 * Gestionnaire d'erreurs Express centralis\u00e9.
 *
 * R\u00e8gle d'or : ne jamais r\u00e9v\u00e9ler la stack-trace au client en production.
 * Les d\u00e9tails sont logg\u00e9s c\u00f4t\u00e9 serveur, le client re\u00e7oit un message g\u00e9n\u00e9rique.
 */
'use strict';

const { isProd } = require('../config/env');
const { logger } = require('../lib/logger');

function errorHandler(err, _req, res, _next) {
  const status = err.status && Number.isInteger(err.status) ? err.status : 500;
  logger.error({ err: err.message, stack: err.stack, status }, '[error]');
  if (status >= 500) {
    return res.status(500).json({
      error: isProd ? 'Erreur interne.' : err.message,
    });
  }
  return res.status(status).json({ error: err.message || 'Requ\u00eate invalide.' });
}

function notFoundHandler(_req, res) {
  return res.status(404).json({ error: 'Route inconnue.' });
}

module.exports = { errorHandler, notFoundHandler };
