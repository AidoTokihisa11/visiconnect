/**
 * Configuration de Socket.IO avec authentification JWT Clerk.
 *
 * \u00c9volution majeure par rapport \u00e0 l'ancien serveur :
 *   1. Authentification au handshake (`io.use(...)`) \u2014 pas de connexion
 *      anonyme. Le client doit envoyer son JWT Clerk via
 *      `auth: { token }` dans `io({ ... })`.
 *   2. L'`identity` (userId) est tir\u00e9e du JWT, jamais du payload client \u2014
 *      \u00e9limine la faille F-05 (usurpation par header).
 *   3. Les \u00e9v\u00e9nements `whiteboard-update` et `cursor-update` sont restreints
 *      aux rooms o\u00f9 l'utilisateur a explicitement rejoint (anti-spam).
 */
'use strict';

const { Server } = require('socket.io');
const { verifyClerkToken } = require('../middleware/requireAuth');
const { allowedOrigins } = require('../middleware/cors');
const { logger } = require('../lib/logger');

function attachSocketIo(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: (origin, cb) => {
        if (!origin || allowedOrigins.has(origin)) return cb(null, true);
        return cb(new Error('CORS Socket.IO bloqu\u00e9'));
      },
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // \ud83d\udd10 Middleware d'authentification : rejette les sockets non sign\u00e9s.
  io.use(async (socket, next) => {
    try {
      const token =
        socket.handshake.auth?.token ||
        (socket.handshake.headers.authorization || '').replace(/^Bearer\s+/i, '');
      if (!token) return next(new Error('Token manquant'));
      const auth = await verifyClerkToken(token);
      if (!auth) return next(new Error('Token invalide'));
      socket.data.userId = auth.userId;
      return next();
    } catch (err) {
      logger.warn({ err: err.message }, '[socket] auth failed');
      return next(new Error('Authentification refus\u00e9e'));
    }
  });

  io.on('connection', (socket) => {
    const userId = socket.data.userId;
    logger.info({ userId, sid: socket.id }, '[socket] connected');

    // Rooms auxquelles le socket a effectivement rejoint (cleanup automatique).
    const joinedRooms = new Set();

    socket.on('join-room', ({ roomId }) => {
      if (typeof roomId !== 'string' || roomId.length === 0 || roomId.length > 64) return;
      socket.join(roomId);
      joinedRooms.add(roomId);
      socket.to(roomId).emit('user-connected', { userId });
    });

    socket.on('send-message', (data) => {
      if (!data || typeof data.roomId !== 'string' || !joinedRooms.has(data.roomId)) return;
      io.to(data.roomId).emit('receive-message', { ...data, userId });
    });

    socket.on('whiteboard-update', (data) => {
      if (!data || typeof data.roomId !== 'string' || !joinedRooms.has(data.roomId)) return;
      socket.to(data.roomId).emit('whiteboard-update', data);
    });

    socket.on('cursor-update', (data) => {
      if (!data || typeof data.roomId !== 'string' || !joinedRooms.has(data.roomId)) return;
      socket.to(data.roomId).emit('cursor-update', data);
    });

    socket.on('disconnect', () => {
      logger.info({ userId, sid: socket.id }, '[socket] disconnected');
    });
  });

  return io;
}

module.exports = { attachSocketIo };
