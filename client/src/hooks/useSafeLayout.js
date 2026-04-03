import { useEffect, useState } from 'react';

/**
 * Hook to manage cross-browser compatibility layout issues.
 * Features:
 * - Dynamic 100dvh fallback for Safari/iOS (calculates --vh CSS variable)
 * - Screen Wake Lock API management for Safari/Firefox fallback
 */
export const useSafeLayout = () => {
  const [dvhCalculated, setDvhCalculated] = useState(false);

  useEffect(() => {
    // ---- 1. Dynamic Viewport Height (100dvh Polyfill) ----
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      setDvhCalculated(true);
    };

    setVh();
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);

    // ---- 2. Screen Wake Lock API ----
    let wakeLock = null;

    const requestWakeLock = async () => {
      // Feature detect
      if ('wakeLock' in navigator) {
        try {
          wakeLock = await navigator.wakeLock.request('screen');
          
          wakeLock.addEventListener('release', () => {
            console.log('✅ Screen Wake Lock relâché');
          });
        } catch (err) {
          console.warn(`[SafeLayout] Impossible d'activer WakeLock: ${err.message}`);
        }
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        requestWakeLock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    requestWakeLock();

    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (wakeLock !== null) {
        wakeLock.release().catch(() => {});
      }
    };
  }, []);

  return { dvhCalculated };
};