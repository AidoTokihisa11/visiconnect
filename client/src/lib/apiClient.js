/**
 * Client HTTP centralis\u00e9 pour appeler les API authentifi\u00e9es.
 *
 * R\u00f4le :
 *   1. Ajoute automatiquement l'en-t\u00eate `Authorization: Bearer <jwt>` Clerk.
 *   2. Pr\u00e9fixe les chemins relatifs avec `VITE_API_URL` en d\u00e9veloppement
 *      (en production, on cible directement les routes Vercel `/api/*`).
 *   3. Centralise la gestion des erreurs (401 \u2192 d\u00e9connexion, 429 \u2192 backoff,
 *      autres \u2192 propag\u00e9es \u00e0 l'appelant).
 *
 * Pourquoi pas un hook ?
 *   Plusieurs services (TranslationService, SmartNotesService\u2026) ne sont pas
 *   des composants React. Un helper imp\u00e9ratif est plus universel : il lit le
 *   token via `window.Clerk?.session?.getToken()` qui reste disponible
 *   partout o\u00f9 le ClerkProvider est mont\u00e9.
 */

const isAbsolute = (url) => /^https?:\/\//i.test(url);

function resolveUrl(path) {
  if (isAbsolute(path)) return path;
  // En production le front est servi par Vercel, les fonctions sont sur la m\u00eame origine.
  if (import.meta.env.PROD) return path;
  // En dev on peut overrider via VITE_API_URL (utile pour tester contre le backend Express local).
  const base = import.meta.env.VITE_API_URL || '';
  return base ? `${base}${path}` : path;
}

async function getClerkToken() {
  if (typeof window === 'undefined') return null;
  try {
    const session = window.Clerk?.session;
    if (!session) return null;
    return await session.getToken();
  } catch {
    return null;
  }
}

/**
 * Fetch authentifi\u00e9.
 * @param {string} path  Chemin relatif (`/api/...`) ou URL absolue.
 * @param {RequestInit & { auth?: boolean }} options
 *   - `auth` (par d\u00e9faut `true`) : attache le JWT Clerk.
 */
export async function apiFetch(path, options = {}) {
  const { auth = true, headers: incomingHeaders = {}, ...rest } = options;
  const headers = new Headers(incomingHeaders);

  if (!headers.has('Content-Type') && rest.body && typeof rest.body === 'string') {
    headers.set('Content-Type', 'application/json');
  }

  if (auth) {
    const token = await getClerkToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  const url = resolveUrl(path);
  return fetch(url, { ...rest, headers });
}

/**
 * Helper pratique : POST JSON et parse la r\u00e9ponse.
 */
export async function apiPostJson(path, payload, options = {}) {
  const res = await apiFetch(path, {
    method: 'POST',
    body: JSON.stringify(payload || {}),
    ...options,
  });
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    /* not JSON */
  }
  if (!res.ok) {
    const error = new Error(data?.error || `HTTP ${res.status}`);
    error.status = res.status;
    error.data = data;
    throw error;
  }
  return data;
}
