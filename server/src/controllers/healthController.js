/**
 * Controller "health" \u2014 utilis\u00e9 par les load-balancers / monitoring.
 */
'use strict';

const { env } = require('../config/env');

function getHealth(_req, res) {
  return res.status(200).json({
    status: 'ok',
    service: 'visiconnect-server',
    nodeEnv: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
}

module.exports = { getHealth };
