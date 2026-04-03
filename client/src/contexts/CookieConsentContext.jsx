import React, { createContext, useContext, useState, useEffect } from 'react';

const CookieConsentContext = createContext();

export function CookieConsentProvider({ children }) {
  const [consentState, setConsentState] = useState(() => {
    const saved = localStorage.getItem('visiconnect_cookie_consent');
    return saved ? JSON.parse(saved) : null;
  });

  const [showBanner, setShowBanner] = useState(!consentState);

  useEffect(() => {
    if (!consentState) {
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    } else {
      applyConsentMetrics(consentState);
    }
  }, [consentState]);

  const acceptAll = () => {
    const state = { analytics: true, marketing: true, timestamp: new Date().toISOString() };
    saveAndApply(state);
  };

  const rejectAll = () => {
    const state = { analytics: false, marketing: false, timestamp: new Date().toISOString() };
    saveAndApply(state);
  };

  const saveAndApply = (state) => {
    localStorage.setItem('visiconnect_cookie_consent', JSON.stringify(state));
    setConsentState(state);
    setShowBanner(false);
    applyConsentMetrics(state);
  };

  // Centralisation : Active ou désactive le tracking selon les choix
  const applyConsentMetrics = (state) => {
    if (state.analytics) {
      console.log('✅ Cookies Analytics acceptés : initialisation des trackers facultatifs.');
      // window['ga-disable-UA-XXXX'] = false;
    } else {
      console.log('⛔ Cookies Analytics refusés : aucun tracker lancé.');
      // window['ga-disable-UA-XXXX'] = true;
    }
  };

  return (
    <CookieConsentContext.Provider value={{ consentState, showBanner, acceptAll, rejectAll, setShowBanner }}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export const useCookieConsent = () => useContext(CookieConsentContext);
