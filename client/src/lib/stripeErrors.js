/**
 * Stripe error code → user-friendly localized message mapping.
 * Used everywhere we surface a Stripe-originated error to avoid
 * generic fallback messages.
 *
 * @see https://stripe.com/docs/error-codes
 */

const FR_MESSAGES = {
  // Card errors
  expired_card:
    "Votre carte a expiré. Utilisez une autre carte ou mettez à jour sa date d'expiration.",
  card_declined:
    'Votre carte a été refusée par votre banque. Contactez-la ou essayez une autre carte.',
  incorrect_cvc: 'Le code de sécurité (CVC) est incorrect.',
  invalid_cvc: "Le code de sécurité (CVC) saisi n'est pas valide.",
  incorrect_number: 'Le numéro de carte saisi est incorrect.',
  invalid_number: "Le numéro de carte n'est pas valide.",
  invalid_expiry_month: "Le mois d'expiration de la carte est invalide.",
  invalid_expiry_year: "L'année d'expiration de la carte est invalide.",
  insufficient_funds: 'Fonds insuffisants sur la carte.',
  processing_error: "Une erreur s'est produite lors du traitement. Veuillez réessayer.",
  authentication_required: 'Une authentification 3D-Secure est requise par votre banque.',
  // Decline codes returned via decline_code
  generic_decline: 'Carte refusée par votre banque sans motif précis.',
  lost_card: 'Cette carte est signalée comme perdue.',
  stolen_card: 'Cette carte est signalée comme volée.',
  pickup_card: 'Cette carte ne peut pas être utilisée. Contactez votre banque.',
  // Server / config
  rate_limit: 'Trop de tentatives. Veuillez patienter quelques secondes.',
  api_connection_error:
    'Connexion au service de paiement impossible. Vérifiez votre connexion internet.',
  api_error: 'Erreur du service de paiement. Veuillez réessayer plus tard.',
  // Default
  _default:
    "Le paiement n'a pas pu être finalisé. Vérifiez vos informations ou essayez une autre carte.",
};

const EN_MESSAGES = {
  expired_card: 'Your card has expired. Please use another card or update its expiration date.',
  card_declined: 'Your card was declined by the bank. Contact them or try another card.',
  incorrect_cvc: 'The security code (CVC) is incorrect.',
  invalid_cvc: 'The security code (CVC) you entered is invalid.',
  incorrect_number: 'The card number you entered is incorrect.',
  invalid_number: 'The card number is invalid.',
  invalid_expiry_month: "The card's expiration month is invalid.",
  invalid_expiry_year: "The card's expiration year is invalid.",
  insufficient_funds: 'Insufficient funds on the card.',
  processing_error: 'A processing error occurred. Please try again.',
  authentication_required: '3D-Secure authentication is required by your bank.',
  generic_decline: 'Card declined by your bank without a specific reason.',
  lost_card: 'This card is reported lost.',
  stolen_card: 'This card is reported stolen.',
  pickup_card: 'This card cannot be used. Contact your bank.',
  rate_limit: 'Too many attempts. Please wait a few seconds.',
  api_connection_error: 'Could not reach the payment service. Check your internet connection.',
  api_error: 'Payment service error. Please try again later.',
  _default: 'Payment could not be completed. Check your details or try another card.',
};

const DICTIONARIES = { fr: FR_MESSAGES, en: EN_MESSAGES };

/**
 * Resolve the most user-friendly message from a Stripe error object.
 * Accepts either a Stripe error (with `code` / `decline_code` / `type`),
 * a backend error envelope `{ code, message }`, or a plain string.
 *
 * @param {object|string} stripeError
 * @param {string} [locale='fr']
 * @returns {string}
 */
export function resolveStripeError(stripeError, locale = 'fr') {
  const lang = (locale || 'fr').toLowerCase().startsWith('en') ? 'en' : 'fr';
  const dict = DICTIONARIES[lang];

  if (!stripeError) return dict._default;

  // Plain string passthrough (legacy callers).
  if (typeof stripeError === 'string') {
    // If the string already matches a known code → translate, else return as-is.
    return dict[stripeError] || stripeError;
  }

  // Stripe surfaces decline_code (specific) and code (generic).
  const code =
    stripeError.decline_code ||
    stripeError.code ||
    stripeError.error?.code ||
    stripeError.error?.decline_code;

  if (code && dict[code]) return dict[code];

  // Some backends forward the raw `type` (e.g. `card_error`) without code.
  if (stripeError.type === 'StripeCardError' || stripeError.type === 'card_error') {
    return dict.card_declined;
  }
  if (stripeError.type === 'StripeConnectionError') return dict.api_connection_error;
  if (stripeError.type === 'StripeAPIError') return dict.api_error;
  if (stripeError.type === 'StripeRateLimitError') return dict.rate_limit;

  // Fallback to a localized message when the original is in the wrong language
  // or generic ("card invalid"), otherwise keep Stripe's wording (more precise).
  const msg = stripeError.message || stripeError.error?.message;
  if (msg && msg.length > 4 && !/invalid|generic/i.test(msg)) return msg;

  return dict._default;
}

export default resolveStripeError;
