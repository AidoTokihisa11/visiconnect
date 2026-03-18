import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

const FREE_PLAN_LIMIT_MINUTES = 40;

export const usePricing = (onTimeLimitReached) => {
  const { user } = useAuth(); // Assuming this context provides user data including plan info
  const [timeLeft, setTimeLeft] = useState(FREE_PLAN_LIMIT_MINUTES * 60);
  const [isPro, setIsPro] = useState(false); // Default to Free
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    // Check user plan status via Supabase metadata or API
    // For now, simulate based on a simple check (e.g., metadata)
    const checkPlan = async () => {
      if (user?.app_metadata?.plan === 'pro') {
        setIsPro(true);
      } else {
        setIsPro(false);
      }
    };
    checkPlan();
  }, [user]);

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
    console.log('Redirecting to Stripe checkout...');
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
