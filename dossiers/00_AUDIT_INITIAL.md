# Audit initial — VisiConnect

**Candidat :** Théo GARCES
**Centre :** CODA Orléans (sept. 2023 → sept. 2026)
**Session jury visée :** 3 juillet 2026
**Périmètre fonctionnel cible (AT2) :** _Création + rejoindre une réunion vidéo sécurisée_
**Date de l'audit :** {{date du jour}}

> Cet audit prépare l'étape de **mise à niveau du code** avant rédaction du DP et du Dossier Projet.
> Il sera réutilisé tel quel dans la **section 11 du Dossier Projet — Veille sécurité & failles corrigées**.

---

## 1. Méthodologie d'audit

L'audit s'appuie sur trois référentiels :

| Référentiel                                              | Usage                                                    |
| -------------------------------------------------------- | -------------------------------------------------------- |
| **OWASP Top 10 — 2021**                                  | Identifier les vulnérabilités d'application web.         |
| **REAC CDA — CP3 / CP6 / CP7 / CP8 / CP9 / CP10 / CP11** | Vérifier la conformité aux compétences attendues.        |
| **RGPD — articles 5, 25, 32**                            | Privacy by design, minimisation, sécurité du traitement. |

Outils mobilisés : revue de code statique, recherche par expression rationnelle des secrets (`re_`, `sk_`, `pk_`, `AIza`, `whsec_`), inspection du `.gitignore` et de l'arborescence, lecture des points d'entrée HTTP/WebSocket.

---

## 2. Synthèse exécutive

| Domaine                    | Constat                                                                                                                                                        |  Sévérité   |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------: |
| **Secrets**                | Clé API Resend (`re_f7CXkPZ1…`) **hardcodée dans 4 fichiers** committés.                                                                                       | 🔴 Critique |
| **Auth API LiveKit**       | Endpoint `/api/livekit-token` **sans authentification** : un attaquant peut générer un token pour n'importe quelle salle, sous n'importe quelle identité.      | 🔴 Critique |
| **CORS**                   | `Access-Control-Allow-Origin: *` sur les fonctions Vercel. Pas de liste blanche d'origines.                                                                    |  🟠 Élevée  |
| **Auth WebSocket**         | Socket.IO `join-room` accepte n'importe quel `user` envoyé par le client, sans vérification serveur.                                                           |  🟠 Élevée  |
| **Auth API métier**        | Header `x-user-email` utilisé comme identification. Spoofable trivialement.                                                                                    |  🟠 Élevée  |
| **Mock token silencieux**  | Si les clés LiveKit sont absentes, le serveur renvoie `"mock_token_due_to_missing_keys"` avec HTTP 200 → fail open.                                            |  🟠 Élevée  |
| **Rate limiting**          | Aucun rate-limit (Express ni Vercel).                                                                                                                          |  🟠 Élevée  |
| **Headers de sécurité**    | Pas de Helmet → manque CSP, HSTS, X-Frame-Options, X-Content-Type-Options.                                                                                     | 🟡 Modérée  |
| **Validation des entrées** | Pas de schéma de validation (Zod / Joi) sur les payloads.                                                                                                      | 🟡 Modérée  |
| **Logs**                   | `console.log` d'identifiants utilisateur (RGPD). Pas de logger structuré.                                                                                      | 🟡 Modérée  |
| **Tests**                  | Aucun test unitaire, aucun test d'intégration.                                                                                                                 |  🟠 Élevée  |
| **CI/CD**                  | Aucune GitHub Action, aucun lint, aucun audit npm automatisé.                                                                                                  |  🟠 Élevée  |
| **Conteneurisation**       | Pas de Dockerfile, pas de docker-compose.                                                                                                                      | 🟡 Modérée  |
| **Déploiement**            | Backend serverless (Vercel/Netlify) : la fiche officielle CDA précise que ce mode **ne permet pas** de démontrer la maîtrise du déploiement attendue par CP10. |  🟠 Élevée  |

> **Verdict :** la base de code est riche fonctionnellement (visio HD + chat + whiteboard + breakout + paiements + i18n 6 langues + privacy guard caméra/micro), mais **plusieurs points la rendent immédiatement disqualifiante en l'état pour la session jury** — en premier lieu les secrets en clair dans le repo et l'absence d'authentification serveur sur l'émission des tokens LiveKit.

---

## 3. Findings détaillés

### F-01 🔴 Clé API Resend hardcodée dans 4 fichiers committés

**Mapping :** OWASP A02 (Cryptographic Failures) + A05 (Security Misconfiguration), **CP3** (sécuriser une application).

**Localisations détectées :**

| Fichier                                                                    | Ligne | Pattern                                              |
| -------------------------------------------------------------------------- | ----: | ---------------------------------------------------- |
| [server/simple-server-no-db.js](server/simple-server-no-db.js#L83)         |    83 | `new Resend('re_f7CXkPZ1_FouifSQZycKkbcStAoZkGgW8')` |
| [scripts/send-invites.tsx](scripts/send-invites.tsx#L9)                    |     9 | `new Resend('re_f7CXkPZ1_FouifSQZycKkbcStAoZkGgW8')` |
| [client/api/send-meeting-invite.js](client/api/send-meeting-invite.js#L20) |    20 | `process.env.RESEND_API_KEY \|\| 're_f7CXkPZ1…'`     |
| [client/api/send-beta-code.js](client/api/send-beta-code.js#L61)           |    61 | `process.env.RESEND_API_KEY \|\| 're_f7CXkPZ1…'`     |

**Risque :** la clé est par construction présente dans l'historique Git public. Un attaquant peut envoyer des emails depuis `contact@visioconnect.pro` (phishing, usurpation), épuiser le quota Resend, ou consulter les logs d'envoi.

**Correction prévue :**

1. **Révoquer immédiatement** la clé dans le dashboard Resend.
2. Générer une nouvelle clé, la stocker uniquement dans `.env` (déjà ignoré par Git — vérifié au point 4 ci-dessous).
3. Supprimer les fallbacks `process.env.X || 'valeur_en_clair'` qui contournent l'isolation.
4. Échec rapide (`fail fast`) au démarrage si `RESEND_API_KEY` est absente : `throw new Error('RESEND_API_KEY is required')`.
5. Documenter la marche à suivre dans la **section 11 du Dossier Projet** comme exemple concret de veille de sécurité ayant abouti à un correctif.

> Une **purge du Git history** (`git filter-repo`) sera proposée à part — c'est destructif et nécessite votre validation.

---

### F-02 🔴 Émission de tokens LiveKit sans authentification

**Mapping :** OWASP A01 (Broken Access Control) + A07 (Identification and Authentication Failures), **CP3** + **CP6** (architecture en couches — couche service manquante).

**Localisation :** [client/api/livekit-token.js](client/api/livekit-token.js#L1-L62) et [server/simple-server-no-db.js](server/simple-server-no-db.js#L277-L295).

**Comportement actuel :**

```js
// client/api/livekit-token.js
const { roomName, participantName } = body || {};
// Aucune vérification de session.
// Aucune vérification que l'utilisateur a le droit de rejoindre cette room.
// canPublish: true pour TOUT LE MONDE → pas de distinction host/guest.
at.addGrant({ roomJoin: true, room: String(roomName), canPublish: true, canSubscribe: true });
```

**Risque :** un attaquant peut, avec un simple `curl`, obtenir un token valide pour rejoindre n'importe quelle réunion en cours, écouter, parler et publier de la vidéo, sous n'importe quel pseudo. C'est un **bypass total du modèle d'autorisation**.

**Correction prévue :**

1. Vérifier le **JWT Clerk** (`Authorization: Bearer …`) côté serveur via `@clerk/backend` → on récupère le vrai `userId`.
2. Vérifier dans Convex que l'utilisateur a bien le droit de rejoindre la room demandée :
   - Soit il est `hostId` du document `meetings`.
   - Soit la salle n'est pas `isProtected`.
   - Soit il a fourni le bon `passcode` (et le passcode est comparé en _constant time_).
3. Distinguer les grants : `canPublish` réservé aux participants confirmés (pas aux salles d'attente).
4. Forcer un `ttl` raisonnable (ex. 4 h) au lieu du défaut 6 h LiveKit.
5. Ne plus utiliser `participantName` envoyé par le client comme identité : utiliser le `userId` Clerk.

---

### F-03 🟠 CORS wildcard sur les fonctions serverless

**Mapping :** OWASP A05, **CP3**.

**Localisation :** [client/api/livekit-token.js](client/api/livekit-token.js#L4) (`Access-Control-Allow-Origin: *`).

**Correction prévue :** liste blanche d'origines via `ALLOWED_ORIGINS` (ex. `https://visioconnect.pro,https://www.visioconnect.pro,http://localhost:5173`), avec écho contrôlé de l'`Origin` après vérification, et `Vary: Origin` ajouté à la réponse.

---

### F-04 🟠 Authentification Socket.IO basée sur la confiance client

**Mapping :** OWASP A01, **CP3**, **CP6**.

**Localisation :** [server/simple-server-no-db.js](server/simple-server-no-db.js#L17-L24).

**Comportement actuel :**

```js
socket.on('join-room', ({ roomId, user }) => {
  socket.join(roomId);
  socket.to(roomId).emit('user-connected', user); // ← user vient du client, jamais validé
});
```

**Risque :** un attaquant peut prétendre être Alice dans la room d'Alice et déclencher la réception de messages whiteboard/chat sensibles, voire injecter des `user-connected` avec des identités forgées.

**Correction prévue :** middleware Socket.IO `io.use((socket, next) => …)` qui vérifie le JWT Clerk depuis `socket.handshake.auth.token`, attache `socket.data.userId` côté serveur, ignore tout `user` envoyé par le client.

---

### F-05 🟠 Header `x-user-email` utilisé comme authentification

**Mapping :** OWASP A07, **CP3**.

**Localisation :** [server/simple-server-no-db.js](server/simple-server-no-db.js#L405-L420) (route `/api/user/profile`).

**Risque :** trivialement spoofable (`curl -H "x-user-email: victim@example.com"`).

**Correction prévue :** middleware Express `requireAuth` qui vérifie le JWT Clerk et attache `req.userId`. Le header `x-user-email` est rejeté.

---

### F-06 🟠 Mock token silencieux en cas de configuration manquante

**Mapping :** OWASP A05, **CP3**, **CP9** (qualité — fail-open masqué).

**Localisation :** [client/api/livekit-token.js](client/api/livekit-token.js#L33-L36) et [server/simple-server-no-db.js](server/simple-server-no-db.js#L255-L259).

**Comportement actuel :** si les variables d'environnement LiveKit sont absentes, le serveur **répond HTTP 200 avec `"mock_token_due_to_missing_keys"`**. Le front consomme une réponse réussie sans aucun signal d'erreur. C'est un anti-pattern _fail open_.

**Correction prévue :** au démarrage du serveur, vérifier la présence de toutes les variables d'environnement requises et arrêter le processus si l'une manque (`fail fast`). En production, supprimer totalement le fallback ; en développement, retourner HTTP 503 avec un message explicite.

---

### F-07 🟠 Aucun rate limiting

**Mapping :** OWASP A04 (Insecure Design), **CP3**.

**Risque :** brute-force des passcodes de salle, inondation de Resend (déni de service indirect via épuisement de quota), spam d'emails depuis `/api/send-email`.

**Correction prévue :** `express-rate-limit` avec stratégies différenciées (10 req/min sur `/api/livekit/token`, 5 req/h par IP sur `/api/send-email`, 3 req/min par IP sur les routes anonymes).

---

### F-08 🟡 Pas d'en-têtes de sécurité

**Mapping :** OWASP A05, **CP3**.

**Correction prévue :** `helmet()` en première position dans la chaîne Express, avec CSP adaptée (LiveKit, Stripe, Clerk, Convex), HSTS, `Referrer-Policy: strict-origin-when-cross-origin`.

---

### F-09 🟡 Pas de validation des entrées

**Mapping :** OWASP A03 (Injection — préventif), **CP3**.

**Correction prévue :** `zod` côté serveur avec un schéma par route. Refus 400 explicite sur entrées invalides.

---

### F-10 🟡 Logs en clair de PII (Personally Identifiable Information)

**Mapping :** RGPD art. 32, **CP3**.

**Localisations :** plusieurs `console.log('✅ Utilisateur synchronisé:', email)`.

**Correction prévue :** logger structuré `pino`, pseudonymisation des emails (`a***@example.com`), niveau `info` en prod, `debug` masqué.

---

### F-11 🟠 Aucun test automatisé

**Mapping :** **CP9** (élaborer le plan de tests, écrire des tests).

**Correction prévue :**

- `vitest` côté client (composants critiques + hooks `useRoomToken`, `useMeeting`).
- `vitest` + `supertest` côté serveur (routes `/api/livekit/token`, `/api/user/sync`, `/api/stripe/webhook`).
- Tests de sécurité explicites : appel sans token → 401, CORS interdit → bloqué, rate-limit déclenché → 429.
- Cible : couverture > 60 % sur le module visio (le périmètre AT2).

---

### F-12 🟠 Aucune CI/CD

**Mapping :** **CP4** (collaborer + qualité), **CP11** (préparer et documenter le déploiement).

**Correction prévue :** `.github/workflows/ci.yml` avec jobs `lint` (ESLint), `test` (Vitest), `build` (Vite), `audit` (`npm audit --audit-level=high`). Cache npm. Branch protection sur `main`.

---

### F-13 🟡 Pas de conteneurisation

**Mapping :** **CP10** (déployer), **CP11** (CI/CD).

**Correction prévue :** `Dockerfile` multi-stage (build → runtime distroless), `docker-compose.yml` (front + back + nginx reverse-proxy), `.dockerignore`.

---

### F-14 🟠 Cible de déploiement Vercel/Netlify insuffisante pour CP10

**Mapping :** **CP10** — explicitement signalé dans la fiche officielle AT3.

> _« Les solutions serverless comme Vercel ne permettent pas de démontrer la maîtrise des notions de déploiement attendues, contrairement aux VPS. »_

**Correction prévue :** documenter et **mettre en œuvre** un déploiement VPS (cible recommandée : Hetzner CX22 — 4 € / mois) :

- Ubuntu 22.04 LTS durci (UFW, fail2ban, SSH par clé uniquement).
- Reverse-proxy Nginx + Let's Encrypt (certbot).
- Docker Compose pour les services applicatifs.
- Déploiement par GitHub Action via SSH (clé déploiement dédiée).

Le frontend Vercel reste utilisable comme cible secondaire (CDN + preview deployments par PR), mais le backend doit tourner sur VPS pour valider CP10.

---

## 4. Points positifs à valoriser dans les dossiers

Ces éléments existent déjà dans le code et seront mis en avant tels quels :

- **`.gitignore` rigoureux** ([.gitignore](.gitignore#L1-L100)) — exclut `.env`, configs Firebase, secrets, dumps SQL, logs. Bon point CP3.
- **Privacy Guard caméra/micro** ([client/src/hooks/useMeeting.js](client/src/hooks/useMeeting.js#L130-L200)) — coupe automatiquement caméra et micro quand l'onglet est masqué (`document.visibilityState === 'hidden'`), avec restauration conditionnelle. Bon exemple RGPD _privacy by design_.
- **Internationalisation native (6 langues)** via `i18next` — exigence du référentiel sur les compétences transversales (français + anglais).
- **Authentification déléguée à Clerk** — pas de stockage de mot de passe, pas de gestion manuelle de la session, OAuth multi-provider, MFA disponible. Bon choix pour CP3.
- **Schéma Convex typé** ([convex/schema.ts](convex/schema.ts#L1-L60)) — `defineTable` + `v.union(v.literal(…))` apporte une validation forte des documents au moment de l'écriture (NoSQL typé).
- **Architecture hybride SQL + NoSQL cohérente** — Supabase Postgres (transactionnel : utilisateurs, abonnements Stripe) + Convex (temps réel : messages, whiteboard, curseurs, notifications). Réponse parfaite à CP8.
- **Webhook Stripe avec vérification de signature** ([server/simple-server-no-db.js](server/simple-server-no-db.js#L52-L74)) — `constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET)` avec `express.raw()`. À garder tel quel.

---

## 5. Plan d'exécution proposé (étape 1)

> Toutes les modifications seront effectuées sur une **branche `chore/exam-hardening`** pour permettre une revue propre.
> Aucune publication, aucun `git push --force`, aucune purge d'historique sans validation explicite.

|   # | Action                                                                                    | Fichiers principaux                                  | Couvre           |
| --: | ----------------------------------------------------------------------------------------- | ---------------------------------------------------- | ---------------- |
|   1 | Externaliser tous les secrets, supprimer les fallbacks                                    | server, client/api, scripts                          | F-01             |
|   2 | Middleware d'authentification Clerk côté serveur (Express + Socket.IO + Vercel functions) | nouveau `server/middleware/requireAuth.js`           | F-02, F-04, F-05 |
|   3 | Liste blanche CORS configurable                                                           | `server/middleware/cors.js`, `client/api/_shared.js` | F-03             |
|   4 | `fail fast` sur env manquant + suppression des mock tokens                                | `server/config/env.js`                               | F-06             |
|   5 | `helmet()` + `express-rate-limit` + validation `zod`                                      | `server/index.js`, schémas dans `server/schemas/`    | F-07, F-08, F-09 |
|   6 | Logger `pino` + masquage PII                                                              | `server/lib/logger.js`                               | F-10             |
|   7 | ESLint + Prettier + lint-staged + husky                                                   | racine + sous-projets                                | F-12 partiel     |
|   8 | Tests unitaires + intégration (Vitest + Supertest)                                        | `server/tests/`, `client/src/**/__tests__/`          | F-11             |
|   9 | Workflow GitHub Actions (`lint` → `test` → `build` → `audit`)                             | `.github/workflows/ci.yml`                           | F-12             |
|  10 | `Dockerfile` + `docker-compose.yml` + `.dockerignore`                                     | racine                                               | F-13             |
|  11 | Procédure VPS documentée (script `infra/deploy.sh` + runbook)                             | `infra/`                                             | F-14             |

**À valider avant que je commence la correction :**

1. ✅ J'ai votre autorisation pour modifier le code sur une branche dédiée `chore/exam-hardening` ?
2. ✅ Vous révoquez la clé Resend `re_f7CXkPZ1…` côté dashboard pendant que je réécris le code (aucune commande Git destructive de mon côté) ?
3. ✅ Vous validez la cible VPS (Hetzner CX22 ou autre — OVH VPS Starter ~4 €/mois est équivalent) ?
4. ✅ On met en place les actions 1 à 6 (sécurité) avant les actions 7 à 11 (qualité / déploiement), ou bien tout en une seule passe ?
