/**
 * Controllers d'envoi d'email transactionnel.
 */
'use strict';

const { sendEmail } = require('../services/emailService');
const { logger, maskEmail } = require('../lib/logger');

async function postSendEmail(req, res) {
  try {
    const { to, subject, html } = req.validBody;
    await sendEmail({ to, subject, html });
    return res.status(200).json({ ok: true });
  } catch (err) {
    logger.error({ err: err.message, to: maskEmail(req.validBody?.to) }, '[email] send failed');
    return res.status(500).json({ error: 'Envoi d\u2019email impossible.' });
  }
}

module.exports = { postSendEmail };
