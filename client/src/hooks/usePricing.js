import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

const FREE_PLAN_LIMIT_MINUTES = 40;

export const usePricing = (onTimeLimitReached) => {
  const { user } = useAuth();
  const userPlan = user?.app_metadata?.plan;
  const [timeLeft, setTimeLeft] = useState(FREE_PLAN_LIMIT_MINUTES * 60);
  const [isPro, setIsPro] = useState(false);
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

  const upgradeToPro = useCallback(() => {
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
