/**
 * Controllers IA (chat / r\u00e9sum\u00e9 / traduction).
 */
'use strict';

const { chat } = require('../services/aiService');
const { logger } = require('../lib/logger');

async function postAiChat(req, res) {
  try {
    const { messages, purpose, locale } = req.validBody;
    const result = await chat({ messages, purpose, locale });
    return res.status(200).json({ message: result.content, provider: result.provider });
  } catch (err) {
    logger.warn({ err: err.message }, '[ai] chat failed');
    return res.status(503).json({ error: 'Service IA temporairement indisponible.' });
  }
}

module.exports = { postAiChat };
