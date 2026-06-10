/**
 * Controllers user \u2014 anciennement sur `simple-server-no-db.js`.
 *
 * IMPORTANT s\u00e9curit\u00e9 : on ne fait plus confiance au header `x-user-email`
 * envoy\u00e9 par le client (faille F-05 du dossier d'audit). L'identit\u00e9 est
 * exclusivement extraite du JWT Clerk via `requireAuth`.
 */
'use strict';

const { logger, maskEmail } = require('../lib/logger');

function postUserSync(req, res) {
  const userId = req.auth.userId;
  const claims = req.auth.claims || {};
  const email = claims.email || claims.email_address || null;

  logger.info({ userId, email: maskEmail(email || '') }, '[user] sync');
  return res.json({
    success: true,
    user: {
      id: userId,
      email,
      displayName: claims.name || (email ? email.split('@')[0] : 'utilisateur'),
    },
  });
}

function getUserProfile(req, res) {
  const userId = req.auth.userId;
  const claims = req.auth.claims || {};
  const email = claims.email || claims.email_address || null;

  return res.json({
    id: userId,
    email,
    displayName: claims.name || (email ? email.split('@')[0] : 'utilisateur'),
    stats: {
      totalMeetings: 0,
      totalParticipants: 0,
      totalMinutes: 0,
      meetingsThisMonth: 0,
    },
  });
}

module.exports = { postUserSync, getUserProfile };
