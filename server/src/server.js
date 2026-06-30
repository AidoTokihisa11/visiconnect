/**
 * Point d'entr\u00e9e du serveur VisioConnect.
 *
 * 1. Charge .env (dotenv) AVANT toute lecture de process.env.
 * 2. Valide la configuration (fail-fast via src/config/env.js).
 * 3. Cr\u00e9e l'application Express + Socket.IO et d\u00e9marre l'\u00e9coute.
 * 4. Gestion gracieuse de SIGTERM / SIGINT pour les conteneurs.
 */
'use strict';

require('dotenv').config();

const http = require('http');
const { buildApp } = require('./app');
const { attachSocketIo } = require('./socket');
const { env } = require('./config/env');
const { logger } = require('./lib/logger');

const app = buildApp();
const httpServer = http.createServer(app);
const io = attachSocketIo(httpServer);

httpServer.listen(env.PORT, () => {
  logger.info(
    { port: env.PORT, env: env.NODE_ENV },
    `\ud83d\ude80 Serveur VisioConnect d\u00e9marr\u00e9`
  );
});

function gracefulShutdown(signal) {
  logger.info({ signal }, 'Arr\u00eat gracieux');
  io.close(() => {
    httpServer.close((err) => {
      if (err) {
        logger.error({ err: err.message }, 'Erreur lors de la fermeture');
        process.exit(1);
      }
      process.exit(0);
    });
  });
  // Filet de s\u00e9curit\u00e9 si une connexion s'\u00e9ternise.
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('unhandledRejection', (reason) => {
  logger.error({ reason: String(reason) }, 'unhandledRejection');
});
process.on('uncaughtException', (err) => {
  logger.fatal({ err: err.message, stack: err.stack }, 'uncaughtException');
  process.exit(1);
});
