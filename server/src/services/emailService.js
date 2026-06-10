/**
 * EmailService \u2014 envoi transactionnel via Resend.
 *
 * Centralise le client Resend ; rejette les envois si la cl\u00e9 d'API n'est pas
 * configur\u00e9e plut\u00f4t que d'\u00e9chouer silencieusement.
 */
'use strict';

const { Resend } = require('resend');
const { env } = require('../config/env');
const { logger, maskEmail } = require('../lib/logger');

let resendInstance = null;
function getResend() {
  if (!resendInstance) {
    if (!env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY non configur\u00e9e \u2014 envoi d\u2019email impossible.');
    }
    resendInstance = new Resend(env.RESEND_API_KEY);
  }
  return resendInstance;
}

const FROM_DEFAULT = 'VisiConnect <contact@visioconnect.pro>';

async function sendEmail({ to, subject, html, attachments, from = FROM_DEFAULT }) {
  const resend = getResend();
  const result = await resend.emails.send({ from, to, subject, html, attachments });
  if (result.error) {
    logger.error({ err: result.error.message, to: maskEmail(to) }, '[email] Resend rejected');
    throw new Error(result.error.message || 'Erreur Resend');
  }
  logger.info({ to: maskEmail(to), id: result.data?.id }, '[email] sent');
  return result.data;
}

module.exports = { sendEmail };
