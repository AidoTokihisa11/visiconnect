import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useAuth } from '@clerk/react';

/**
 * CookieConsentProvider — CNIL / RGPD compliant.
 *
 * Bump COOKIE_POLICY_VERSION whenever cookies list, finalities, or partners change.
 * This invalidates existing consents and re-prompts users (art. 7 RGPD).
 */
export const COOKIE_POLICY_VERSION = '2.0.0';
const CONSENT_TTL_MS = 1000 * 60 * 60 * 24 * 180; // 6 months — CNIL guideline
const STORAGE_KEY = 'visiconnect_cookie_consent';
const SESSION_KEY = 'visiconnect_session_id';

const CookieConsentContext = createContext(null);

const readStoredConsent = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.policyVersion !== COOKIE_POLICY_VERSION) return null;
    if (typeof parsed.expiresAt === 'number' && parsed.expiresAt < Date.now()) return null;
    return parsed;
  } catch {
    return null;
  }
};

const readOrCreateSessionId = () => {
  try {
    let sid = localStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
      localStorage.setItem(SESSION_KEY, sid);
    }
    return sid;
  } catch {
    return `anon-${Date.now()}`;
  }
};

const isDoNotTrackEnabled = () => {
  if (typeof navigator === 'undefined') return false;
  const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
  return dnt === '1' || dnt === 'yes';
};

/** Purge all cookies matching a prefix or exact name, for current domain and parent domain. */
const purgeCookies = (matchers) => {
  if (typeof document === 'undefined') return;
  const host = window.location.hostname;
  const domains = new Set(['', host]);
  const parts = host.split('.');
  if (parts.length > 1) {
    domains.add(`.${parts.slice(-2).join('.')}`);
  }
  document.cookie.split(';').forEach((raw) => {
    const name = raw.split('=')[0].trim();
    if (!name) return;
    const shouldDrop = matchers.some((m) =>
      typeof m === 'string' ? name === m : m.test(name)
    );
    if (!shouldDrop) return;
    domains.forEach((d) => {
      const domainAttr = d ? `; domain=${d}` : '';
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT${domainAttr}`;
    });
  });
};

const removeScript = (id) => {
  const el = document.getElementById(id);
  if (el) el.remove();
};

const applyConsentEffects = (state) => {
  if (typeof document === 'undefined') return;

  const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
  const HOTJAR_ID = import.meta.env.VITE_HOTJAR_ID;
  const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;

  // ─── Analytics ─────────────────────────────────────────────
  if (state.analytics && GA_ID && !document.getElementById('ga-script')) {
    const s = document.createElement('script');
    s.id = 'ga-script';
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s);

    const inline = document.createElement('script');
    inline.id = 'ga-inline';
    inline.text = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true,allow_google_signals:false,allow_ad_personalization_signals:false});`;
    document.head.appendChild(inline);
  } else if (!state.analytics) {
    removeScript('ga-script');
    removeScript('ga-inline');
    purgeCookies([/^_ga/, '_gid', '_gat', /^_gac_/]);
  }

  if (state.analytics && HOTJAR_ID && !document.getElementById('hotjar-script')) {
    const s = document.createElement('script');
    s.id = 'hotjar-script';
    s.text = `(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:${HOTJAR_ID},hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`;
    document.head.appendChild(s);
  } else if (!state.analytics) {
    removeScript('hotjar-script');
    purgeCookies([/^_hj/]);
  }

  // ─── Marketing ─────────────────────────────────────────────
  if (state.marketing && META_PIXEL_ID && !document.getElementById('meta-pixel')) {
    const s = document.createElement('script');
    s.id = 'meta-pixel';
    s.text = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`;
    document.head.appendChild(s);
  } else if (!state.marketing) {
    removeScript('meta-pixel');
    purgeCookies(['_fbp', '_fbc', 'fr']);
  }
};

export function CookieConsentProvider({ children }) {
  const auth = useAuth();
  const userId = auth?.userId;
  const saveConsentMutation = useMutation(api.cookies.saveConsent);
  const revokeConsentMutation = useMutation(api.cookies.revokeConsent);

  const [sessionId] = useState(readOrCreateSessionId);
  const [consentState, setConsentState] = useState(readStoredConsent);
  const [showBanner, setShowBanner] = useState(false);

  // Initial evaluation: show banner if no valid consent, honor DNT signal.
  useEffect(() => {
    if (consentState) {
      applyConsentEffects(consentState);
      return;
    }
    if (isDoNotTrackEnabled()) {
      // DNT = auto-refusal but no server proof (implicit signal, not explicit consent).
      // The banner still opens so the user can override if desired.
      applyConsentEffects({
        essential: true,
        analytics: false,
        marketing: false,
        preferences: false,
      });
    }
    const timer = setTimeout(() => setShowBanner(true), 1500);
    return () => clearTimeout(timer);
  }, [consentState]);

  // bfcache restore: re-apply effects when the page is restored from back/forward cache.
  useEffect(() => {
    const onPageShow = (event) => {
      if (event.persisted && consentState) applyConsentEffects(consentState);
    };
    window.addEventListener('pageshow', onPageShow);
    return () => window.removeEventListener('pageshow', onPageShow);
  }, [consentState]);

  const persistLocal = useCallback((state) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage disabled — consent still applies for this session */
    }
  }, []);

  const notify = useCallback((message) => {
    window.dispatchEvent(
      new CustomEvent('app-notify', {
        detail: {
          type: 'success',
          title: 'Préférences de confidentialité',
          message,
          duration: 4000,
        },
      })
    );
  }, []);

  const commit = useCallback(
    async (partial, method) => {
      const now = Date.now();
      const state = {
        essential: true,
        analytics: false,
        marketing: false,
        preferences: false,
        ...partial,
        timestamp: new Date(now).toISOString(),
        expiresAt: now + CONSENT_TTL_MS,
        policyVersion: COOKIE_POLICY_VERSION,
        method,
      };

      persistLocal(state);
      setConsentState(state);
      setShowBanner(false);
      applyConsentEffects(state);

      const messages = {
        accept_all: 'Vous avez accepté l’ensemble des cookies.',
        reject_all: 'Refus enregistré. Seuls les cookies strictement nécessaires seront utilisés.',
        custom: 'Vos préférences ont bien été enregistrées.',
      };
      notify(messages[method]);

      try {
        await saveConsentMutation({
          sessionId,
          userId: userId || undefined,
          essential: state.essential,
          analytics: state.analytics,
          marketing: state.marketing,
          preferences: state.preferences,
          policyVersion: COOKIE_POLICY_VERSION,
          method,
          userAgent: navigator.userAgent?.slice(0, 250),
          language: navigator.language,
        });
      } catch (error) {
        // Server unreachable: consent is still enforced client-side.
        // Do NOT block the user; log for ops.
        // eslint-disable-next-line no-console
        console.error('[consent] server persistence failed', error);
      }
    },
    [persistLocal, notify, saveConsentMutation, sessionId, userId]
  );

  const acceptAll = useCallback(
    () => commit({ analytics: true, marketing: true, preferences: true }, 'accept_all'),
    [commit]
  );

  const rejectAll = useCallback(
    () => commit({ analytics: false, marketing: false, preferences: false }, 'reject_all'),
    [commit]
  );

  const saveCustomChoices = useCallback(
    (choices) =>
      commit(
        {
          analytics: !!choices.analytics,
          marketing: !!choices.marketing,
          preferences: !!choices.preferences,
        },
        'custom'
      ),
    [commit]
  );

  const revokeConsent = useCallback(async () => {
    const state = {
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false,
      timestamp: new Date().toISOString(),
      expiresAt: Date.now() + CONSENT_TTL_MS,
      policyVersion: COOKIE_POLICY_VERSION,
      method: 'revoked',
    };
    persistLocal(state);
    setConsentState(state);
    applyConsentEffects(state);
    notify('Votre consentement a été révoqué.');

    try {
      await revokeConsentMutation({
        sessionId,
        userId: userId || undefined,
        policyVersion: COOKIE_POLICY_VERSION,
        userAgent: navigator.userAgent?.slice(0, 250),
        language: navigator.language,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[consent] revocation server persistence failed', error);
    }
  }, [persistLocal, notify, revokeConsentMutation, sessionId, userId]);

  const openPreferences = useCallback(() => setShowBanner(true), []);

  return (
    <CookieConsentContext.Provider
      value={{
        consentState,
        showBanner,
        acceptAll,
        rejectAll,
        saveCustomChoices,
        revokeConsent,
        openPreferences,
        setShowBanner,
        policyVersion: COOKIE_POLICY_VERSION,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export const useCookieConsent = () => {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error('useCookieConsent must be used within CookieConsentProvider');
  }
  return ctx;
};
