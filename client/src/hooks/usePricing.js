import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

const FREE_PLAN_LIMIT_MINUTES = 40;

export const usePricing = (onTimeLimitReached) => {
  const { user } = useAuth(); // Assuming this context provides user data including plan info
  const userPlan = user?.app_metadata?.plan;
  const [timeLeft, setTimeLeft] = useState(FREE_PLAN_LIMIT_MINUTES * 60);
  const [isPro, setIsPro] = useState(false); // Default to Free
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    setIsPro(userPlan === 'pro');
  }, [userPlan]);

  useEffect(() => {
    if (isPro) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeLimitReached?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPro, onTimeLimitReached]);

  const upgradeToPro = useCallback(async () => {
    // Simulate Stripe checkout redirection
    // In a real app, you would call your backend to create a Checkout Session
    // const response = await fetch('/api/create-checkout-session', { method: 'POST' });
    // const session = await response.json();
    // stripe.redirectToCheckout({ sessionId: session.id });
    
    // Simulating success for demo
    alert('Simulating upgrade to PRO...');
    setIsPro(true);
    setShowUpgradeModal(false);
  }, []);

  return {
    isPro,
    timeLeft,
    showUpgradeModal,
    setShowUpgradeModal,
    upgradeToPro
  };
};
