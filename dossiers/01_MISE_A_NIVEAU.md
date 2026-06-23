# 01 — Mise à niveau sécurité & qualité (chore/exam-hardening)

> Document interne — sert de matière première à la **section 11
> "Mise en œuvre de la qualité & de la sécurité"** du Dossier Projet
> CDA et au **chapitre 4 du Dossier Professionnel** (compétences AT2 + CP9).

## 1. Objectif

Aligner le code source de VisiConnect sur les exigences du référentiel
REAC du titre **Concepteur Développeur d'Applications** (niveau 6) :
sécurité OWASP Top 10, architecture en couches, intégration continue,
tests automatisés, déploiement reproductible.

Toutes les modifications sont contenues dans la branche
`chore/exam-hardening`. La branche `main` reste intacte tant que
l'utilisateur n'a pas validé.

## 2. Constat initial

Audit complet documenté dans `dossiers/00_AUDIT_INITIAL.md` —
**14 findings** mappés sur OWASP Top 10 + compétences CDA.

| Sévérité | Nb  | Exemples                                                                                                                                       |
| -------- | --- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Critique | 4   | F-01 token LiveKit non authentifié, F-04 clé Resend hardcodée, F-05 spoofing via header `x-user-email`, F-06 absence de validation des entrées |
| Élevée   | 5   | F-02 CORS wildcard, F-03 absence de rate-limit, F-07 stack traces fuites, F-08 webhook Stripe non vérifié, F-09 logs en clair                  |
| Moyenne  | 5   | F-10 à F-14 (sans tests, sans CI, configuration en dur, etc.)                                                                                  |

## 3. Actions par stage

### Stage A — Helpers transversaux (Vercel functions)

Création de `client/api/_lib/` :

- `cors.js` → liste blanche d'origines (allowlist), match `*.vercel.app`.
- `auth.js` → vérification JWT Clerk via `@clerk/backend`.
- `rateLimit.js` → limiteur en mémoire par IP avec GC.
- `schemas.js` → schémas Zod centralisés.

→ corrige **F-02, F-03, F-06**.

### Stage B — Endpoints durcis

Toutes les fonctions Vercel (`client/api/*.js`) et Netlify
(`client/netlify/functions/*.js`) passent désormais par :

1. CORS allowlist
2. Rate-limit (granularité par route)
3. Authentification Clerk (sauf endpoints publics par conception)
4. Validation Zod du body
5. Vérification d'ownership (ex. `downgrade-subscription` → 403 si autre user)
6. Réponses 503 propres si une variable d'env manque (plus de `500 internal`)

Endpoints concernés :
`livekit-token`, `send-meeting-invite`,
`create-checkout-session`, `downgrade-subscription`, `confirm-subscription`,
`ai/chat`.

→ corrige **F-01, F-04 (partiel), F-08**.

### Stage C — Client : `apiFetch` & migration des call-sites

Création de `client/src/lib/apiClient.js` exposant `apiFetch` /
`apiPostJson`. La fonction injecte automatiquement
`Authorization: Bearer <token>` (récupéré via `window.Clerk?.session?.getToken()`)
et résout l'URL de base selon l'environnement.

Migration de 11 call-sites vers `apiFetch` :
`useMeeting.js`, `CreateMeetingModal.jsx`, `AIChatbot.jsx`,
`AIChatPanel.jsx`, `useSubscription.js`, `SmartNotesService.js` (×3),
`TranslationService.js`, `AccountPageSimple.jsx`, `CheckoutPage.jsx`,
`PricingPage.jsx`, `SuccessPage.jsx`.

### Stage D — Refactor du serveur Express en couches

Suppression du monolithe `server/simple-server-no-db.js` (614 lignes,
clé Resend hardcodée, header `x-user-email` faisant foi).

Nouvelle arborescence :

```
server/src/
├── config/env.js          # validation Zod fail-fast des variables d'env
├── lib/logger.js          # pino + redact PII + maskEmail()
├── middleware/
│   ├── cors.js            # allowlist
│   ├── requireAuth.js     # vérif JWT Clerk
│   ├── rateLimit.js       # 3 profils (global / token / email)
│   ├── validate.js        # helper Zod générique
│   └── errorHandler.js    # JSON sans stack en prod
├── schemas/index.js       # schémas Zod
├── services/              # logique métier
│   ├── livekitService.js  # TTL 4h, identity = userId Clerk
│   ├── emailService.js    # Resend, masquage email dans les logs
│   ├── stripeService.js   # checkout + verifyWebhook (signature)
│   └── aiService.js       # Groq + fallback OpenRouter
├── controllers/           # présentation HTTP
├── socket/index.js        # Socket.IO + middleware d'auth handshake
├── routes/index.js        # assemblage Express Router
├── app.js                 # factory (testable)
└── server.js              # entry point + dotenv + graceful shutdown
```

→ corrige **F-04 (clé Resend supprimée), F-05 (plus de header
`x-user-email`), F-07 (errorHandler), F-09 (Pino redact)**.

### Stage E — Outillage qualité

- `eslint.config.js` (flat config) couvrant React + Node.
- `.prettierrc.json` + `.prettierignore`.
- `husky` + `lint-staged` pour bloquer les commits non formatés.
- `package.json` racine : scripts `lint`, `lint:fix`, `format`,
  `format:check`, `test:server`, `audit:high`.

### Stage F — Tests automatisés (Vitest + Supertest)

Suite serveur dans `server/tests/` :

| Test             | Vérifie                                                                          |
| ---------------- | -------------------------------------------------------------------------------- |
| `auth.test.js`   | 401 sans token, 401 token invalide, 200 token valide, 400 payload invalide (Zod) |
| `cors.test.js`   | Allow-Origin présent uniquement pour origines listées, preflight 204             |
| `health.test.js` | `/health` 200, route inconnue 404                                                |

Configuration : `server/vitest.config.js` + `server/tests/setup.js`
(env mockée — pas d'appel Internet pendant les tests).

### Stage G — CI GitHub Actions

`.github/workflows/ci.yml` avec 5 jobs :

1. `lint` (ESLint sur tout le repo)
2. `format` (Prettier check)
3. `test-server` (Vitest)
4. `build-client` (Vite build)
5. `audit` (npm audit --audit-level=high, non bloquant)

Cache npm activé sur les trois lockfiles (root / client / server).
Déclencheurs : push `main`, `chore/**`, `feat/**`, `fix/**` + PR vers `main`.

### Stage H — Conteneurisation & VPS

- `Dockerfile` multi-stage (deps puis runtime alpine, utilisateur non-root,
  HEALTHCHECK).
- `docker-compose.yml` (api + nginx).
- `.dockerignore` exhaustif.
- `infra/deploy/nginx.conf` (HTTPS, HSTS, WebSocket upgrade).
- `infra/deploy/runbook.md` (procédure complète Hetzner CX22 :
  durcissement OS, UFW, fail2ban, certbot, premier déploiement, mises
  à jour, sauvegardes, rollback, conformité RGPD).

## 4. Couverture des compétences CDA

| Compétence                      | Démontrée par                                         |
| ------------------------------- | ----------------------------------------------------- |
| **CP1** Maquettage              | Existant (Figma + Tailwind)                           |
| **CP2** Front réutilisable      | `apiClient.js`, hooks `useMeeting`, `useSubscription` |
| **CP3** UI dynamique            | Stages B/C                                            |
| **CP4** Doc technique           | `dossiers/00_AUDIT_INITIAL.md`, runbook, ce fichier   |
| **CP5** Composants métier       | Stage D (services/)                                   |
| **CP6** Architecture en couches | Stage D refactor complet                              |
| **CP7** Accès aux données       | Convex (existant) + services                          |
| **CP8** Sécurité applicative    | Stages A/B/D/F (audit + corrections + tests)          |
| **CP9** Tests + intégration     | Stages F/G                                            |
| **CP10** Déploiement            | Stage H (Docker + Hetzner)                            |
| **CP11** Maintenance            | runbook + CI                                          |

## 5. Reste à faire avant validation utilisateur

- [ ] **Action utilisateur manuelle** : révoquer la clé Resend
      `re_f7CXkPZ1_FouifSQZycKkbcStAoZkGgW8` dans le dashboard Resend
      (celle qui était hardcodée dans `simple-server-no-db.js`).
- [ ] `npm install` à la racine + dans `server/` pour récupérer les
      nouvelles dépendances (`@clerk/backend`, `helmet`,
      `express-rate-limit`, `pino`, `zod`, `vitest`, `supertest`,
      `eslint`, `prettier`, `husky`, `lint-staged`).
- [ ] `npm run lint -- --fix` puis revue manuelle des warnings
      résiduels.
- [ ] `cd server && npm test` pour vérifier que les 3 suites passent.
- [ ] Premier commit sur `chore/exam-hardening` puis push (la CI
      validera tout sur la PR).
- [ ] Validation par l'utilisateur → fusion vers `main` + déploiement
      sur le VPS Hetzner.

## 6. Étapes suivantes (hors périmètre de cette mise à niveau)

1. **Étape 2 — Dossier Professionnel** (DP) : rédaction des 4
   modules (un par "projet" interne, en variant LiveKit / Stripe /
   whiteboard / i18n).
2. **Étape 3 — Dossier Projet** : rédaction de la trame officielle
   (35-40 pages) en s'appuyant sur ce document + le runbook +
   l'audit initial.

---

_Branche : `chore/exam-hardening`. Aucune modification sur `main`._
