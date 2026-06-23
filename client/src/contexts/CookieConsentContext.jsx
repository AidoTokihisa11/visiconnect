import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useAuth } from '@clerk/react';

const CookieConsentContext = createContext();

export function CookieConsentProvider({ children }) {
  const auth = useAuth();
  const userId = auth?.userId;
  const saveConsentMutation = useMutation(api.cookies.saveConsent);

  const [consentState, setConsentState] = useState(() => {
    try {
      const saved = localStorage.getItem('visiconnect_cookie_consent');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [sessionId, setSessionId] = useState(() => {
    let sid = localStorage.getItem('visiconnect_session_id');
    if (!sid) {
      sid =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : Math.random().toString(36).substring(2) + Date.now().toString(36);
      localStorage.setItem('visiconnect_session_id', sid);
    }
    return sid;
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
    const state = {
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true,
      timestamp: new Date().toISOString(),
    };
    saveAndApply(state, true);
  };

  const rejectAll = () => {
    const state = {
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false,
      timestamp: new Date().toISOString(),
    };
    saveAndApply(state, false);
  };

  const saveCustomChoices = (customState) => {
    const state = {
      ...customState,
      essential: true,
      timestamp: new Date().toISOString(),
    };
    saveAndApply(state, 'custom');
  };

  const saveAndApply = async (state, type) => {
    // 1. Sauvegarde Locale Front-End
    localStorage.setItem('visiconnect_cookie_consent', JSON.stringify(state));
    setConsentState(state);
    setShowBanner(false);
    applyConsentMetrics(state);

    // 2. Notification Visuelle Utilisateur
    let message = 'Vos préférences de confidentialité ont bien été enregistrées.';
    if (type === true) message = '✅ Tous les cookies essentiels et analytiques ont été acceptés.';
    if (type === false)
      message = '🛡️ Refus enregistré. Seuls les cookies strictement essentiels seront utilisés.';

    // Déclenche une notification locale (capter par App.jsx)
    window.dispatchEvent(
      new CustomEvent('app-notify', {
        detail: {
          type: 'success',
          title: 'Mise à jour de confidentialité',
          message: message,
          duration: 4000,
        },
      })
    );

    // 3. Archivage RGPD sur la Base de Données Convex
    try {
      if (saveConsentMutation) {
        await saveConsentMutation({
          sessionId,
          userId: userId || undefined,
          essential: state.essential,
          analytics: !!state.analytics,
          marketing: !!state.marketing,
          preferences: !!state.preferences,
        });
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du consentement dans Convex:', error);
    }
  };

  const applyConsentMetrics = (state) => {
    // Active ou désactive les scripts tiers selon les choix utilisateur.
    if (state.analytics) {
      // placeholder : activer Google Analytics, Hotjar, etc.
    }
    if (state.marketing) {
      // placeholder : activer pixels publicitaires, etc.
    }
  };

  return (
    <CookieConsentContext.Provider
      value={{ consentState, showBanner, acceptAll, rejectAll, saveCustomChoices, setShowBanner }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export const useCookieConsent = () => useContext(CookieConsentContext);
