import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const FREE_PLAN_DURATION_MS = 40 * 60 * 1000;
const WARNING_THRESHOLD_MS = 5 * 60 * 1000;

const buildCheckoutPayload = (priceId, subscriberId) => ({
  priceId,
  userId: subscriberId,
  successUrl: `${window.location.origin}/success`,
  cancelUrl: `${window.location.origin}/cancel`,
});

export const useSubscription = (subscriber) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createCheckoutSession = async (priceId) => {
    if (!subscriber?.id || !subscriber?.token) {
      setError('Utilisateur non authentifie pour le checkout.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${subscriber.token}`,
        },
        body: JSON.stringify(buildCheckoutPayload(priceId, subscriber.id)),
      });

      if (!response.ok) {
        throw new Error(`Erreur checkout (${response.status})`);
      }

      const session = await response.json();

      if (session.error) {
        throw new Error(session.error.message);
      }

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe indisponible dans ce contexte.');
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

    } catch (checkoutError) {
      setError(checkoutError.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    createCheckoutSession,
    loading,
    error,
  };
};

export const useUsageLimit = (startTime, isPremium) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (isPremium || !startTime) return;

    const meetingStartTime = new Date(startTime).getTime();
    const interval = setInterval(() => {
      const elapsedMs = Date.now() - meetingStartTime;
      const remainingMs = FREE_PLAN_DURATION_MS - elapsedMs;

      if (remainingMs <= 0) {
        setIsLimitReached(true);
        setTimeLeft(0);
        clearInterval(interval);
        return;
      }

      if (remainingMs < WARNING_THRESHOLD_MS) {
        setShowWarning(true);
      }

      setTimeLeft(remainingMs);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPremium, startTime]);

  return { timeLeft, isLimitReached, showWarning };
};
