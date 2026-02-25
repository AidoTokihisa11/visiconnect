import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const useSubscription = (user) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createCheckoutSession = async (priceId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}` // Assuming user object has token
        },
        body: JSON.stringify({
          priceId,
          userId: user.id,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/cancel`,
        }),
      });

      const session = await response.json();

      if (session.error) {
        throw new Error(session.error.message);
      }

      const stripe = await stripePromise;
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

    } catch (err) {
      setError(err.message);
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

        const limit = 40 * 60 * 1000; // 40 minutes in ms
        const interval = setInterval(() => {
            const elapsed = Date.now() - new Date(startTime).getTime();
            const remaining = limit - elapsed;

            if (remaining <= 0) {
                setIsLimitReached(true);
                clearInterval(interval);
            } else if (remaining < 5 * 60 * 1000) { // Warn at 5 mins
                setShowWarning(true);
            }
            
            setTimeLeft(Math.max(0, remaining));
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime, isPremium]);

    return { timeLeft, isLimitReached, showWarning };
};
