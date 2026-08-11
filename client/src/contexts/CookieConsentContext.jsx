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
    if (type === true) message = 'Tous les cookies essentiels et analytiques ont été acceptés.';
    if (type === false)
      message = 'Refus enregistré. Seuls les cookies strictement essentiels seront utilisés.';

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
    // Effective gating: inject/remove third-party scripts based on consent.
    // Must be called BOTH on initial load and after preference change.
    const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
    const HOTJAR_ID = import.meta.env.VITE_HOTJAR_ID;
    const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;

    const removeScript = (id) => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };

    // --- Analytics ---
    if (state.analytics && GA_ID && !document.getElementById('ga-script')) {
      const s = document.createElement('script');
      s.id = 'ga-script';
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(s);

      const inline = document.createElement('script');
      inline.id = 'ga-inline';
      inline.text = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`;
      document.head.appendChild(inline);
    } else if (!state.analytics) {
      removeScript('ga-script');
      removeScript('ga-inline');
      // Also drop any GA cookies already set.
      document.cookie.split(';').forEach((c) => {
        const n = c.split('=')[0].trim();
        if (n.startsWith('_ga') || n === '_gid') {
          document.cookie = `${n}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        }
      });
    }

    if (state.analytics && HOTJAR_ID && !document.getElementById('hotjar-script')) {
      const s = document.createElement('script');
      s.id = 'hotjar-script';
      s.text = `(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:${HOTJAR_ID},hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`;
      document.head.appendChild(s);
    } else if (!state.analytics) {
      removeScript('hotjar-script');
    }

    // --- Marketing ---
    if (state.marketing && META_PIXEL_ID && !document.getElementById('meta-pixel')) {
      const s = document.createElement('script');
      s.id = 'meta-pixel';
      s.text = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`;
      document.head.appendChild(s);
    } else if (!state.marketing) {
      removeScript('meta-pixel');
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
