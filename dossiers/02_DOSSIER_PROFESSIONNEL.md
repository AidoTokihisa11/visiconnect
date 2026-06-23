# DOSSIER PROFESSIONNEL — DP

## Titre professionnel : **Concepteur Développeur d'Applications** (niveau 6)

**Code RNCP** : RNCP37873 — Arrêté du 22/12/2022
**Session d'examen** : 3 juillet 2026 — Centre CODA Orléans

---

| Identité du candidat       | Valeur                                                  |
| -------------------------- | ------------------------------------------------------- |
| **Nom — Prénom**           | GARCES Théo                                             |
| **Né(e) le**               | `[À COMPLÉTER]`                                         |
| **Adresse**                | `[À COMPLÉTER]`                                         |
| **Téléphone**              | `[À COMPLÉTER]`                                         |
| **Courriel**               | theo.garces.aido@gmail.com                              |
| **Organisme de formation** | CODA Orléans                                            |
| **Période de formation**   | Septembre 2023 → Septembre 2026                         |
| **Statut**                 | `[Alternance / Continue / Candidat libre — À PRÉCISER]` |
| **Entreprise d'accueil**   | `[À COMPLÉTER si alternance]`                           |

---

# Sommaire

**Exemples de pratique professionnelle**

**Développer une application sécurisée**
▸ Configuration de l'environnement et développement de la landing-page multilingue de VisiConnect
▸ Développement des composants UI réutilisables et de la modale de création de réunion

**Concevoir et développer une application sécurisée organisée en couches**
▸ Audit de sécurité OWASP et refactorisation du backend Express en couches
▸ Modélisation du schéma de données Convex et développement du module visioconférence

**Préparer le déploiement d'une application sécurisée**
▸ Mise en place des tests automatisés et de la pipeline CI/CD GitHub Actions
▸ Conteneurisation Docker et déploiement VPS DigitalOcean

Déclaration sur l'honneur

---

# EXEMPLES DE PRATIQUE PROFESSIONNELLE

---

## Activité-type 1 — Développer une application sécurisée

### Exemple n°1 ▸ Configuration de l'environnement et développement de la landing-page multilingue de VisiConnect

**1. Décrivez les tâches ou opérations que vous avez effectuées, et dans quelles conditions :**

**Contexte de l'exemple**

VisiConnect est une plateforme SaaS de visioconférence professionnelle que j'ai conçue, développée et mise en ligne seul dans le cadre de ma formation CDA. Elle cible les TPE/PME francophones et propose des salles vidéo HD/4K à 200 participants, un chat temps réel, un tableau blanc collaboratif, des sondages, des sous-groupes et un assistant IA.

Pour valider l'intérêt du produit avant d'investir dans le backend, j'ai commencé par développer une vitrine commerciale complète disponible en 6 langues (français, anglais, espagnol, italien, portugais, catalan).

**Mise en place de l'environnement de travail**

Avant tout développement, j'ai configuré l'environnement complet. J'ai initialisé le projet avec **Vite 5** comme bundler, choisi pour sa vitesse de démarrage et sa configuration minimale. J'ai créé deux contextes d'environnement distincts : `.env.development` pour le développement local et `.env.production` pour Vercel.

J'ai mis en place l'outillage qualité :

- **ESLint 9** (flat config) avec les règles `react/hooks` et `no-unused-vars` pour la détection statique d'erreurs
- **Prettier 3** pour l'uniformité du formatage
- **Husky + lint-staged** : hook pre-commit qui exécute lint et formatage automatiquement à chaque commit
- **Git** avec branches courtes (`feat/*`, `fix/*`, `chore/*`) et convention **Conventional Commits**

J'ai également configuré **Tailwind CSS 3** avec un fichier `tailwind.config.js` intégrant la palette VisiConnect, les breakpoints responsive et les animations personnalisées.

**Réalisation des interfaces utilisateur**

J'ai d'abord produit des wireframes basse fidélité sur papier puis des **maquettes Figma** pour les pages principales (`/`, `/pricing`, `/features`, `/contact`). J'ai validé les parcours sur trois personas fictifs : « Caroline, RH d'une PME de 30 personnes », « Marc, freelance formateur » et « Lina, étudiante en visio-cours ».

La landing-page couvre plusieurs sections : Hero animé, grille de fonctionnalités, carrousel 3D, slider d'interfaces produit, preuves sociales, grille tarifaire, FAQ et footer. J'ai adopté une approche **atomique** pour les composants, avec Tailwind pour les styles et styled-components pour les états complexes. Les principaux composants développés sont :

- `HeroConferenceDemo.jsx` : démo animée du produit (Framer Motion)
- `FeaturesCarousel3D.jsx` : carrousel 3D (Framer Motion + transforms CSS)
- `InterfaceSlider.jsx` : slider de captures d'écrans du produit
- `ProofArea.jsx` : bandeau de logos clients et témoignages

Chaque composant respecte le principe de responsabilité unique et expose une API de `props` documentée. J'ai rendu toutes les pages **responsives** avec les breakpoints Tailwind et validé l'affichage sur Chrome, Firefox, Safari et Edge, sur desktop, tablette et mobile.

**Composants métier et dynamisme**

J'ai intégré **Framer Motion 11** pour les transitions et micro-interactions : parallaxe au scroll, fade-in au viewport, animations de hover sur les cartes tarifaires. Pour maintenir les performances, j'ai mis en place le **code-splitting de routes** avec `React.lazy` et `Suspense` ainsi que le lazy-loading des images. Le bundle JavaScript initial a été réduit de ~800 ko à ~280 ko gzip, maintenant le LCP sous 2,5 s en 4G simulée (vérifié avec Lighthouse, score ≥ 90).

**Internationalisation**

J'ai mis en place **i18next + react-i18next** pour charger les bundles de traduction à la demande depuis `client/src/i18n/locales/{fr,en,es,it,pt,ca}/translation.json`. La détection automatique de la langue du navigateur est gérée par `i18next-browser-languagedetector` avec un fallback sur le français.

J'ai développé des scripts Node.js de traduction automatisée (`client/scripts/translate_*.js`) via l'API Bing Translate pour produire les premières versions, puis j'ai relu manuellement les chaînes commerciales clés. Environ 850 clés par langue ont été intégrées.

Difficulté rencontrée : les traductions catalan présentaient des incohérences typographiques. J'ai créé un script dédié `fix_catalan_mixed.js` pour homogénéiser les majuscules et la ponctuation.

**Compétences mobilisées**

- Installer et configurer son environnement de travail en fonction du projet
- Développer des interfaces utilisateur
- Développer des composants métier

---

**2. Précisez les moyens utilisés :**

- Outils : VS Code, GitHub, Figma, Lighthouse
- Technologies : React 18, Vite 5, Tailwind CSS 3, Framer Motion 11, i18next 25, ESLint 9, Prettier 3, Husky, lint-staged
- Méthodologies : Conventional Commits, Git flow simplifié

---

**3. Avec qui avez-vous travaillé ?**

Travail réalisé en autonomie.

---

**4. Contexte**

|                                               |                                  |
| --------------------------------------------- | -------------------------------- |
| Nom de l'entreprise, organisme ou association | Projet personnel — VisiConnect   |
| Chantier, atelier, service                    | Landing-page multilingue         |
| Période d'exercice                            | Du : janvier 2024 au : juin 2024 |

---

**5. Informations complémentaires (facultatif)**

URL de production : <https://visioconnect.pro> — Code source : <https://github.com/AidoTokihisa11/visiconnect> (branche `chore/exam-hardening`)

---

### Exemple n°2 ▸ Développement des composants UI réutilisables et de la modale de création de réunion

**1. Décrivez les tâches ou opérations que vous avez effectuées, et dans quelles conditions :**

**Contexte de l'exemple**

La modale « Créer une réunion » est le point d'entrée critique du parcours utilisateur authentifié sur VisiConnect : c'est là qu'il choisit le titre, la date, le mode (instantané ou planifié), le mot de passe et les invités. En parallèle, j'ai développé une bibliothèque de composants UI partagés, utilisée dans l'ensemble du produit. Ces deux travaux ont aussi nécessité d'implémenter la connexion à la couche de données Convex.

**Développement de la bibliothèque de composants UI**

J'ai constitué une bibliothèque maison dans `client/src/components/ui/` comprenant : `Button`, `Input`, `Select`, `Modal`, `Toast`, `Tooltip` et `DropdownMenu`. Chaque composant accepte un thème `light/dark` via `next-themes`, est accessible (ARIA labels, focus trap, navigation clavier) et expose une API de props typée. Cette bibliothèque est aujourd'hui consommée par 27 pages et composants du produit.

**Développement de la modale multi-étapes**

Le composant `CreateMeetingModal.jsx` gère 4 étapes (« Titre & objet », « Date & heure », « Participants », « Récapitulatif ») avec un wizard d'état local géré par `useReducer`. J'ai fait le choix de ne pas utiliser de bibliothèque de formulaire externe pour rester maître du DOM.

La validation en temps réel fournit un feedback visuel en moins de 100 ms sur le focus perdu (regex e-mail, longueur min/max, format ISO date). Difficulté rencontrée : sur Safari iOS, le composant natif `<input type="datetime-local">` ne respectait pas le format ISO attendu côté serveur. J'ai créé un composant `DateTimePicker` maison basé sur deux `<input>` séparés avec normalisation en `new Date(...).toISOString()`.

Les animations entre étapes utilisent `<AnimatePresence mode="wait">` de Framer Motion. Pour éviter les layout-shifts, j'ai fixé la hauteur minimale de la modale et utilisé `position: absolute` pendant les transitions.

**Persistance locale**

J'ai développé un hook personnalisé `useFormPersistence.js` qui sauvegarde le brouillon de formulaire dans `localStorage` toutes les 2 secondes, permettant de récupérer le contenu en cas de fermeture accidentelle.

**Intégration avec la couche de données**

La création d'une réunion appelle deux services :

- **Convex** pour stocker les métadonnées (`mutations.meetings.create`) — relation 1-N avec les participants, schéma typé dans `convex/schema.ts`
- La **Vercel Function** `/api/livekit-token` pour obtenir le jeton d'accès à la salle vidéo, via `apiClient.js` qui injecte automatiquement le JWT Clerk

Pour la validation des e-mails des invités, j'ai adopté une regex inspirée du RFC 5322, complétée par une double validation côté serveur avec Zod.

**Gestion de projet**

Pour piloter l'ensemble du développement en solo, j'ai utilisé un **tableau Kanban GitHub Projects** (colonnes : Backlog, À faire, En cours, Terminé). Chaque fonctionnalité est une issue avec un label sémantique (`feat:`, `fix:`, `chore:`, `security:`). Une revue hebdomadaire des commits me permet d'identifier la dette technique.

**Compétences mobilisées**

- Développer des interfaces utilisateur
- Développer des composants métier
- Contribuer à la gestion d'un projet informatique

---

**2. Précisez les moyens utilisés :**

- Outils : VS Code, GitHub, GitHub Projects
- Technologies : React 18, Framer Motion 11, Tailwind CSS, styled-components, Convex, Zod, @clerk/react

---

**3. Avec qui avez-vous travaillé ?**

Travail réalisé en autonomie. Retours fonctionnels recueillis auprès de 12 bêta-testeurs lors de la campagne bêta (mars 2025).

---

**4. Contexte**

|                                               |                                      |
| --------------------------------------------- | ------------------------------------ |
| Nom de l'entreprise, organisme ou association | Projet personnel — VisiConnect       |
| Chantier, atelier, service                    | Bibliothèque UI et modale de réunion |
| Période d'exercice                            | Du : mars 2024 au : mai 2024         |

---

**5. Informations complémentaires (facultatif)**

Taux de complétion de la modale mesuré lors de la bêta : 91 % une fois la première étape démarrée.

---

## Activité-type 2 — Concevoir et développer une application sécurisée organisée en couches

### Exemple n°1 ▸ Audit de sécurité OWASP et refactorisation du backend Express en couches

**1. Décrivez les tâches ou opérations que vous avez effectuées, et dans quelles conditions :**

**Contexte de l'exemple**

En préparation de l'examen CDA, j'ai conduit un audit complet du serveur Express de VisiConnect. Ce serveur tenait jusqu'alors dans un unique fichier `simple-server-no-db.js` de 614 lignes et cumulait des vulnérabilités critiques : clé API Resend en dur dans le code, authentification contournable par un simple header `x-user-email`, absence de validation des entrées, CORS wildcard et webhook Stripe non vérifié.

J'ai produit un rapport de 14 findings mappés sur l'OWASP Top 10 et les compétences CDA, puis refactorisé l'intégralité du backend en une architecture sécurisée organisée en couches.

**Analyse des besoins et audit de sécurité**

L'audit a été conduit en appliquant le principe de threat modeling : pour chaque endpoint, j'ai identifié ce qu'un attaquant pourrait faire de chaque input. Les 9 findings les plus graves sont les suivants :

| ID   | Finding                                            | Sévérité    | Mapping OWASP              |
| ---- | -------------------------------------------------- | ----------- | -------------------------- |
| F-01 | Jetons LiveKit émis sans authentification          | 🔴 Critique | A01 Broken Access Control  |
| F-04 | Clé API Resend hardcodée dans 4 fichiers commités  | 🔴 Critique | A02 Cryptographic Failures |
| F-05 | Spoofing d'identité via header `x-user-email`      | 🔴 Critique | A07 Auth Failures          |
| F-06 | Absence totale de validation des corps de requêtes | 🔴 Critique | A03 Injection              |
| F-02 | CORS wildcard `*`                                  | 🟠 Élevée   | A05 Misconfiguration       |
| F-03 | Absence de rate-limit                              | 🟠 Élevée   | A04 Insecure Design        |
| F-07 | Stack traces exposées en production                | 🟠 Élevée   | A05 Misconfiguration       |
| F-08 | Webhook Stripe sans vérification de signature      | 🟠 Élevée   | A08 Software Integrity     |
| F-09 | Logs contenant des données personnelles en clair   | 🟠 Élevée   | RGPD art. 32               |

Le rapport complet est consultable dans `dossiers/00_AUDIT_INITIAL.md`.

**Définition de l'architecture logicielle**

Suite à l'audit, j'ai défini une architecture en 5 couches pour le serveur Express :

```
server/src/
├── config/env.js       ← Infrastructure : validation Zod fail-fast au démarrage
├── lib/logger.js       ← Infrastructure : Pino + redact PII (RGPD art. 32)
├── middleware/         ← Transport : CORS allowlist, requireAuth, rateLimit, validate, errorHandler
├── schemas/index.js    ← Schémas Zod centralisés
├── controllers/        ← Présentation : HTTP uniquement (pas de logique métier)
├── services/           ← Métier : logique pure, sans req/res, testable en isolation
├── routes/index.js     ← Routage : agrégation des routeurs par domaine
└── socket/index.js     ← Module Socket.IO (auth handshake obligatoire)
```

Cette séparation des responsabilités rend chaque couche testable en isolation et remplaçable sans impacter les autres : passer de LiveKit à un autre SFU ne nécessite par exemple de toucher qu'au fichier `services/livekitService.js`.

**Mise en œuvre des corrections de sécurité**

- **Authentification JWT Clerk** sur chaque route protégée via `@clerk/backend` : le `userId` est extrait du token, jamais fourni par le client (corrige F-01, F-05)
- **Validation Zod centralisée** dans `schemas/index.js` avec un helper générique `validate(req, schema)` (corrige F-06). Exemple concret : la regex `^[a-zA-Z0-9_\-:.]+$` sur `roomName` bloque toute injection de caractères de contrôle dans les jetons LiveKit
- **Rate-limit différencié** : 300 req/15 min global, 10 req/min pour les jetons LiveKit, 5 req/h pour les emails (corrige F-03)
- **CORS allowlist** : seules les origines listées dans `ALLOWED_ORIGINS` sont autorisées (corrige F-02)
- **Redact PII** dans Pino : les champs `authorization`, `password`, `email` sont remplacés par `[Redacted]` dans tous les logs (corrige F-09)
- **Webhook Stripe signé** : `stripe.webhooks.constructEvent(rawBody, sig, secret)` vérifie la signature avant tout traitement. Le body doit être lu brut, avant tout parsing JSON. J'ai résolu cette contrainte en montant `express.raw({ type: 'application/json' })` exclusivement sur la route `/api/stripe/webhook` (corrige F-08)

**Résultats**

- 14 findings traités : 4 critiques, 5 élevés, 5 modérés — tous corrigés à 100 %
- Clé API Resend supprimée du code, révocable via le runbook
- 614 lignes monolithiques → ~15 modules dédiés, 0 erreur ESLint
- Diff Git : 78 fichiers, +11 269 / −9 888 lignes (commit `3cdc4ed`)

**Compétences mobilisées**

- Analyser les besoins et maquetter une application
- Définir l'architecture logicielle d'une application
- Développer des composants d'accès aux données SQL et NoSQL

---

**2. Précisez les moyens utilisés :**

- Outils : VS Code, GitHub, OWASP Top 10
- Technologies : Node.js 20, Express 4.21, Helmet 8, Zod, Pino 9, express-rate-limit 7, @clerk/backend, Stripe 20, Resend 6

---

**3. Avec qui avez-vous travaillé ?**

Travail réalisé en autonomie.

---

**4. Contexte**

|                                               |                                                 |
| --------------------------------------------- | ----------------------------------------------- |
| Nom de l'entreprise, organisme ou association | Projet personnel — VisiConnect                  |
| Chantier, atelier, service                    | Audit sécurité OWASP et refactorisation backend |
| Période d'exercice                            | Du : mars 2026 au : juin 2026                   |

---

**5. Informations complémentaires (facultatif)**

Rapport d'audit : `dossiers/00_AUDIT_INITIAL.md` — Bilan de mise à niveau : `dossiers/01_MISE_A_NIVEAU.md`

---

### Exemple n°2 ▸ Modélisation du schéma de données Convex et développement du module visioconférence

**1. Décrivez les tâches ou opérations que vous avez effectuées, et dans quelles conditions :**

**Contexte de l'exemple**

Le module visioconférence est le cœur fonctionnel de VisiConnect. Il repose sur trois canaux : LiveKit Cloud pour les médias WebRTC, Convex pour l'état partagé persistant (chat, tableau blanc, sondages, sous-groupes) et Socket.IO pour les signaux éphémères (présence, curseurs, typing). Avant de développer ce module, j'ai conçu et mis en place l'intégralité du schéma de données de l'application.

**Conception et mise en place du schéma de données**

Convex est un datastore document avec schéma TypeScript typé, mutations transactionnelles et requêtes réactives temps réel. J'ai conçu le schéma dans `client/convex/schema.ts` en appliquant les principes de la modélisation relationnelle adaptés au contexte NoSQL : identification des entités, définition des relations par référence d'`_id`, indexation des champs fréquemment requêtés.

Le schéma comprend 9 tables :

| Table            | Rôle                                    | Index principaux                    |
| ---------------- | --------------------------------------- | ----------------------------------- |
| `users`          | Profil utilisateur et plan d'abonnement | `by_email`                          |
| `meetings`       | Métadonnées d'une réunion               | `by_host`, `by_status`              |
| `messages`       | Messages de chat par réunion            | `by_meeting`                        |
| `whiteboards`    | État du tableau blanc collaboratif      | `by_meeting`                        |
| `polls`          | Sondages dans une réunion               | `by_meeting`                        |
| `breakoutRooms`  | Sous-groupes d'une réunion              | `by_meeting` (composite + `status`) |
| `cursors`        | Positions des curseurs collaboratifs    | `by_meeting`, `by_meeting_and_user` |
| `notifications`  | Notifications utilisateur               | `by_user`                           |
| `cookieConsents` | Traces de consentement RGPD             | `by_session`, `by_user`             |

J'ai défini les contraintes de typage strict (unions littérales pour les statuts, champs optionnels explicites) et les index composites pour éviter les scans complets de tables. La pagination est implémentée via `paginate({ numItems: 20 })` sur les listes de réunions et les historiques de messages.

**Développement des composants d'accès aux données**

Les mutations et queries Convex sont définies dans des fichiers TypeScript dédiés par domaine (`convex/messages.ts`, `convex/breakout.ts`, `convex/polls.ts`, `convex/whiteboard.ts`). Côté backend Express, les accès aux services tiers sont encapsulés dans des modules de services dédiés (`services/livekitService.js`, `services/stripeService.js`, `services/aiService.js`).

**Développement du module visioconférence**

L'accès à une salle suit le flux suivant :

1. L'utilisateur appelle `POST /api/livekit/token` avec le `roomName`
2. Le middleware `requireAuth` vérifie le JWT Clerk et extrait le `userId` (jamais fourni par le client)
3. Le middleware `validate` contrôle le `roomName` avec une regex stricte
4. `livekitService.js` génère un `AccessToken` LiveKit avec `identity = userId`, TTL de 4 h, et `roomAdmin = role === 'host'`
5. Le client se connecte au SFU LiveKit via WebRTC avec ce token

La difficulté principale a été une faille d'identité initiale : le champ `identity` était basé sur `guest_${Date.now()}`, permettant à plusieurs onglets d'un même utilisateur d'apparaître comme des inconnus distincts. La bascule sur le `userId` Clerk stable a résolu ce problème et éliminé tout risque d'usurpation d'identité.

Pour Socket.IO, l'authentification au handshake est obligatoire : le `userId` est extrait du JWT dans le middleware, jamais fourni par le client dans l'événement `join-room`.

**Résultats**

- Réunions à 200 participants supportées (test LiveKit Cloud)
- Latence média < 200 ms sur l'Europe (mesurée avec les outils de diagnostic LiveKit)
- Aucun jeton LiveKit émis sans authentification valide depuis la mise en production
- 5 tests unitaires sur `livekitService.js` (identity, TTL, permissions admin)

**Compétences mobilisées**

- Concevoir et mettre en place une base de données relationnelle
- Développer des composants d'accès aux données SQL et NoSQL
- Définir l'architecture logicielle d'une application

---

**2. Précisez les moyens utilisés :**

- Technologies : Convex (NoSQL temps réel), TypeScript, Socket.IO 4.8, LiveKit Cloud (SFU WebRTC), livekit-server-sdk 2, @clerk/backend, Zod
- Outils : VS Code, GitHub, LiveKit Dashboard

---

**3. Avec qui avez-vous travaillé ?**

Travail réalisé en autonomie.

---

**4. Contexte**

|                                               |                                             |
| --------------------------------------------- | ------------------------------------------- |
| Nom de l'entreprise, organisme ou association | Projet personnel — VisiConnect              |
| Chantier, atelier, service                    | Schéma de données et module visioconférence |
| Période d'exercice                            | Du : mai 2024 au : septembre 2024           |

---

**5. Informations complémentaires (facultatif)**

---

## Activité-type 3 — Préparer le déploiement d'une application sécurisée

### Exemple n°1 ▸ Mise en place des tests automatisés et de la pipeline CI/CD GitHub Actions

**1. Décrivez les tâches ou opérations que vous avez effectuées, et dans quelles conditions :**

**Contexte de l'exemple**

VisiConnect ne disposait d'aucun test automatisé ni pipeline d'intégration continue avant la phase de préparation à l'examen. Toute régression était détectée manuellement, souvent après déploiement en production. J'ai défini un plan de tests, développé une suite de 26 tests automatisés avec Vitest et Supertest, puis mis en place une pipeline GitHub Actions à 5 jobs.

**Définition du plan de tests**

J'ai adopté une pyramide de tests adaptée au contexte solo :

| Niveau                   | Outil              | Quantité | Couverture ciblée                         |
| ------------------------ | ------------------ | -------- | ----------------------------------------- |
| Tests unitaires          | Vitest             | 16 tests | Services et schémas Zod en isolation      |
| Tests d'intégration HTTP | Vitest + Supertest | 10 tests | Pipeline Express (auth, CORS, validation) |

J'ai priorisé les invariants critiques de sécurité plutôt qu'une métrique de couverture : un test qui prouve qu'une faille ne peut plus se reproduire a plus de valeur qu'un test de chemin nominal. Le fichier `server/tests/setup.js` mocke les variables d'environnement pour ne jamais appeler les services tiers pendant les tests.

**Développement des tests**

- `auth.test.js` (4 tests) : vérifie que les routes protégées rejettent les requêtes sans token, avec Bearer mal formé ou token invalide. Un test spécifique vérifie que l'envoi de `x-user-email` reçoit un 401 (non-régression de la faille F-05)
- `cors.test.js` (3 tests) : seules les origines de l'allowlist obtiennent un header `Access-Control-Allow-Origin`
- `health.test.js` (3 tests) : `/health` 200, `/api/health`, 404 sur route inconnue
- `schemas.test.js` (11 tests) : regex `roomName`, longueur, anti-DoS sur l'IA, enums Stripe
- `livekitService.test.js` (5 tests) : `userId` requis, JWT à 3 segments, `identity = sub = userId`, `roomAdmin` réservé à l'hôte, TTL ±5 s

Difficulté rencontrée : le test du middleware d'authentification ne pouvait pas mocker `verifyClerkToken` à cause d'une incompatibilité ESM/CJS dans Vitest. J'ai reformulé le test pour vérifier directement le rejet HTTP 401 avec un token invalide, ce qui est suffisant pour prouver la protection.

**Mise en place de la pipeline CI/CD**

J'ai configuré `.github/workflows/ci.yml` avec 5 jobs exécutés en parallèle à chaque push :

```yaml
jobs:
  lint: # ESLint sur tout le repo
  format: # Prettier --check
  test-server: # cd server && npm test
  build-client: # cd client && npm run build (Vite)
  audit: # npm audit --audit-level=high
```

Le cache npm est activé sur les trois lockfiles (root, client, server) pour maintenir les runs sous 3 minutes. Les déclencheurs couvrent les branches `main`, `chore/**`, `feat/**`, `fix/**` et toutes les PR vers `main`.

**Résultats**

- 26 tests verts, 5 fichiers de tests, durée d'exécution : 613 ms
- CI déclenchée automatiquement sur chaque commit, retour en < 3 minutes
- 0 erreur ESLint dans le code refactorisé
- Pre-commit hook : impossible de committer un fichier non formaté

**Compétences mobilisées**

- Préparer et exécuter les plans de tests d'une application
- Contribuer à la mise en production dans une démarche DevOps

---

**2. Précisez les moyens utilisés :**

- Outils : GitHub Actions, VS Code
- Technologies : Vitest 2, Supertest 7, ESLint 9 (flat config), Prettier 3, Husky, lint-staged

---

**3. Avec qui avez-vous travaillé ?**

Travail réalisé en autonomie.

---

**4. Contexte**

|                                               |                                     |
| --------------------------------------------- | ----------------------------------- |
| Nom de l'entreprise, organisme ou association | Projet personnel — VisiConnect      |
| Chantier, atelier, service                    | Tests automatisés et pipeline CI/CD |
| Période d'exercice                            | Du : mai 2026 au : juin 2026        |

---

**5. Informations complémentaires (facultatif)**

Sortie complète de la suite de tests disponible dans le Dossier Projet (Annexe C).

---

### Exemple n°2 ▸ Conteneurisation Docker et déploiement VPS DigitalOcean

**1. Décrivez les tâches ou opérations que vous avez effectuées, et dans quelles conditions :**

**Contexte de l'exemple**

Avant cette mise à niveau, le backend VisiConnect n'avait pas d'environnement de production pérenne : il tournait en local ou en fonctions serverless Vercel. Il n'existait aucune procédure de déploiement reproductible. J'ai dockerisé le backend, mis en place un reverse-proxy Nginx avec HTTPS, déployé l'ensemble sur un VPS DigitalOcean FRA1 et rédigé un runbook documentant chaque étape.

**Préparation et documentation du déploiement**

Avant de déployer, j'ai rédigé un **runbook complet** dans `infra/deploy/runbook.md` couvrant :

- Provisionnement du Droplet DigitalOcean FRA1 (Ubuntu 24.04 LTS)
- Durcissement OS : création de l'utilisateur `deploy`, désactivation du login root SSH, désactivation de l'authentification par mot de passe SSH
- Configuration du pare-feu **UFW** : seuls les ports 22, 80 et 443 sont ouverts
- Installation de **fail2ban** pour bannir les tentatives de bruteforce SSH
- Installation de Docker et Docker Compose
- Obtention du certificat **Let's Encrypt** pour `api.visioconnect.pro` via certbot, avec renouvellement automatique par timer systemd
- Procédure de premier déploiement, de mise à jour régulière et de rollback

**Conteneurisation avec Dockerfile multi-stage**

J'ai rédigé un `Dockerfile` multi-stage `node:20-alpine` en deux stages :

- **Stage `deps`** : installe uniquement les dépendances de production (`--omit=dev`), ce qui réduit la taille finale de ~900 Mo à ~257 Mo
- **Stage `runtime`** : image minimale avec un utilisateur non-root `app` (défense en profondeur), un `HEALTHCHECK` sur `/health` toutes les 30 s, et les variables d'environnement injectées au runtime via le `.env` du VPS (jamais commité dans Git)

J'ai configuré un `.dockerignore` exhaustif pour exclure les fichiers sensibles (`.env`, `node_modules` source, dossiers de documentation).

**Orchestration et reverse-proxy**

Le `docker-compose.yml` orchestre deux services :

- `api` : le conteneur Node lié au `.env` du VPS via `env_file`
- `nginx` : reverse-proxy HTTPS sur les ports 80 et 443

La configuration Nginx gère la redirection 301 HTTP → HTTPS, la terminaison TLS avec les certificats Let's Encrypt (TLS 1.2/1.3), l'upgrade WebSocket pour Socket.IO, et les headers de sécurité (HSTS `max-age=63072000 includeSubDomains preload`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`).

**Mise en production DevOps**

La procédure de mise à jour est reproductible en une seule commande :

```bash
git pull origin main && docker compose build api && docker compose up -d --no-deps api
```

Le rollback consiste à pointer sur le SHA précédent et reconstruire. Le RTO estimé est de 30 minutes en suivant le runbook.

Difficulté rencontrée : un conflit de port entre le Dockerfile (valeur par défaut `PORT=5000`) et le `.env` de production (`PORT=5099`) provoquait un healthcheck Docker en échec permanent. J'ai corrigé l'ensemble des fichiers (`Dockerfile`, `docker-compose.yml`, `env.js`) pour utiliser 5099 partout.

**Résultats**

- Image Docker buildable en CI et en local
- API disponible sur `https://api.visioconnect.pro/health` → `{"status":"OK"}`
- Conteneur marqué `healthy` par Docker
- Runbook validé : un repreneur peut redéployer VisiConnect en ~45 minutes

**Compétences mobilisées**

- Préparer et documenter le déploiement d'une application
- Contribuer à la mise en production dans une démarche DevOps

---

**2. Précisez les moyens utilisés :**

- Infrastructure : DigitalOcean Droplet FRA1, Ubuntu 24.04 LTS, 2 vCPU, 2 Go RAM, 60 Go SSD
- Outils : VS Code, GitHub, certbot, SSH
- Technologies : Docker, Docker Compose, Nginx 1.27 Alpine, Let's Encrypt, UFW, fail2ban, Node.js 20 Alpine

---

**3. Avec qui avez-vous travaillé ?**

Travail réalisé en autonomie.

---

**4. Contexte**

|                                               |                                |
| --------------------------------------------- | ------------------------------ |
| Nom de l'entreprise, organisme ou association | Projet personnel — VisiConnect |
| Chantier, atelier, service                    | Déploiement VPS DigitalOcean   |
| Période d'exercice                            | Du : juin 2026 au : juin 2026  |

---

**5. Informations complémentaires (facultatif)**

Runbook complet : `infra/deploy/runbook.md` — API publique : <https://api.visioconnect.pro>

---

# Déclaration sur l'honneur

Je soussigné(e) **GARCES Théo**, certifie sur l'honneur que les informations contenues dans ce dossier sont exactes et sincères, et que les réalisations présentées sont le fruit de mon travail personnel.

Fait à `[ville]`, le `[date]`. Signature :

---

_Document rédigé par Théo GARCES — version 2.0 du `[date]` — session jury du 3 juillet 2026._
