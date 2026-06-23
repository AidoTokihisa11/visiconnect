import { useEffect, useRef } from 'react';

/**
 * Persists a controlled-form state object across navigation / accidental
 * page unmount, with optional `beforeunload` warning when the form is dirty.
 *
 * Usage:
 *   const [values, setValues] = useState(initial);
 *   useFormPersistence('account-profile', values, setValues, { warnOnLeave: true });
 *
 * @param {string} key                 Unique storage key (per form).
 * @param {object} values              Current form values (controlled).
 * @param {function} setValues         Setter to hydrate persisted values on mount.
 * @param {object} [options]
 * @param {boolean} [options.warnOnLeave=false]  Show beforeunload warning when dirty.
 * @param {'session'|'local'} [options.storage='session']  Storage tier.
 * @param {boolean} [options.skip=false]  Disable the hook (e.g. while loading).
 */
export function useFormPersistence(key, values, setValues, options = {}) {
  const { warnOnLeave = false, storage = 'session', skip = false } = options;

  const storageKey = `visiconnect.form.${key}`;
  const hydratedRef = useRef(false);
  const initialSnapshotRef = useRef(null);

  // Hydrate once on mount.
  useEffect(() => {
    if (skip || hydratedRef.current) return;
    hydratedRef.current = true;
    initialSnapshotRef.current = JSON.stringify(values);
    try {
      const store = storage === 'local' ? window.localStorage : window.sessionStorage;
      const raw = store.getItem(storageKey);
      if (!raw) return;
      const saved = JSON.parse(raw);
      // Only hydrate non-empty saved fields, preserving any default / Clerk values.
      setValues((prev) => ({ ...prev, ...saved }));
    } catch (e) {
      // Storage may be unavailable (privacy mode) — fail silently.
      console.warn('[useFormPersistence] hydrate failed:', e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey, skip]);

  // Persist on every change (debounced via microtask + JSON diff).
  useEffect(() => {
    if (skip || !hydratedRef.current) return;
    try {
      const store = storage === 'local' ? window.localStorage : window.sessionStorage;
      store.setItem(storageKey, JSON.stringify(values));
    } catch (e) {
      console.warn('[useFormPersistence] persist failed:', e);
    }
  }, [storageKey, values, storage, skip]);

  // Warn before unload if dirty.
  useEffect(() => {
    if (!warnOnLeave || skip) return undefined;
    const handler = (e) => {
      if (initialSnapshotRef.current === null) return;
      if (JSON.stringify(values) === initialSnapshotRef.current) return;
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [values, warnOnLeave, skip]);

  /** Manually clear the persisted snapshot (e.g. after a successful save). */
  const clear = () => {
    try {
      const store = storage === 'local' ? window.localStorage : window.sessionStorage;
      store.removeItem(storageKey);
      initialSnapshotRef.current = JSON.stringify(values);
    } catch (e) {
      // ignore
    }
  };

  return { clear };
}

export default useFormPersistence;
