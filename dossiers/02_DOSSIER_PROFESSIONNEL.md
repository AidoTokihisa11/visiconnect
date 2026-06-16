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

**Atteste sur l'honneur que les informations contenues dans ce dossier
sont sincères.**

Fait à `[ville]`, le `[date]`. Signature :

---

# Sommaire

1. [Présentation du candidat](#1-présentation-du-candidat)
2. [Présentation du projet support : VisiConnect](#2-présentation-du-projet-support--visiconnect)
3. [Activité-Type 1 — Développer une application sécurisée](#at1)
   - 3.1 [Réalisation 1.1 — Landing-page multilingue (i18n 6 langues)](#r11)
   - 3.2 [Réalisation 1.2 — Composants UI réutilisables et modale de création de réunion](#r12)
4. [Activité-Type 2 — Concevoir et développer une application sécurisée organisée en couches](#at2)
   - 4.1 [Réalisation 2.1 — Module visioconférence (LiveKit + Convex + Socket.IO)](#r21)
   - 4.2 [Réalisation 2.2 — Module paiements Stripe et refactor serveur en couches (audit OWASP)](#r22)
5. [Activité-Type 3 — Préparer le déploiement d'une application sécurisée](#at3)
   - 5.1 [Réalisation 3.1 — Pipeline CI/CD GitHub Actions et tests automatisés](#r31)
   - 5.2 [Réalisation 3.2 — Conteneurisation Docker et déploiement VPS DigitalOcean](#r32)
6. [Annexes](#6-annexes)

---

# 1. Présentation du candidat

Je m'appelle **Théo GARCES**, je suis en formation **Concepteur
Développeur d'Applications** au CODA d'Orléans depuis septembre 2023,
pour une session d'examen prévue le **3 juillet 2026**.

Mon parcours combine :

- une passion pour le **développement web** depuis le lycée (premiers
  sites HTML/CSS, puis JavaScript, puis React) ;
- la volonté de **concevoir un produit complet** plutôt que d'enchaîner
  les exercices pédagogiques. C'est cette volonté qui a donné naissance
  à **VisiConnect**, une plateforme de visioconférence professionnelle
  que j'ai conçue, développée, sécurisée et mise en ligne seul ;
- une **rigueur méthodologique** acquise pendant la formation : Git/
  GitHub, intégration continue, tests automatisés, revue de code,
  conformité RGPD.

Je présente **VisiConnect** comme projet support unique pour
l'intégralité de ce DP. Le périmètre fonctionnel (visio, chat,
paiements, IA, internationalisation, déploiement) m'a permis de couvrir
les 11 compétences professionnelles du référentiel CDA en variant les
modules attaqués pour chaque réalisation.

---

# 2. Présentation du projet support : VisiConnect

> **URL de production** : <https://visioconnect.pro>
> **Code source** : <https://github.com/AidoTokihisa11/visiconnect> (privé, accès jury sur demande)

## 2.1 Objectif produit

VisiConnect est une **plateforme SaaS de visioconférence
professionnelle** ciblant les TPE/PME francophones. Elle propose :

- des **salles vidéo HD/4K** à 200 participants (LiveKit Cloud + WebRTC) ;
- un **tableau blanc collaboratif temps réel** (tldraw + Excalidraw) ;
- un **chat de réunion** avec messages structurés (Convex temps réel) ;
- des **sous-groupes (breakout rooms)** et **sondages** pendant les
  réunions ;
- un **assistant IA** pour les résumés et notes de réunion (Groq +
  OpenRouter en repli) ;
- des **abonnements Stripe** (Starter gratuit, Pro 15 €/mois, Business
  35 €/mois) ;
- une interface **disponible en 6 langues** (français, anglais,
  espagnol, italien, portugais, catalan) gérée via i18next.

## 2.2 Architecture technique (vue 10 000 m)

```
┌──────────────────────┐    HTTPS     ┌─────────────────────────┐
│  Client React 18     │ ───────────► │  Vercel Functions       │
│  Vite 5 + Tailwind   │              │  (Node.js serverless)   │
│  Framer Motion       │              │  CORS allowlist + JWT   │
│  Clerk (auth UI)     │ ───────────► │  Rate-limit + Zod       │
└─────────┬────────────┘              └─────────┬───────────────┘
          │                                     │
          │  WSS                                ▼
          │              ┌──────────────────────────────────────┐
          │              │ Serveur Express 4 (Node 20)          │
          │              │ Helmet · Pino · Express-rate-limit   │
          │              │ Couches : routes → controllers →     │
          │              │           services → SDK externes    │
          │              └─────────┬────────────────────────────┘
          │                        │
          ▼                        ▼
┌────────────────┐    ┌──────────────┐  ┌──────────┐  ┌─────────┐
│  LiveKit Cloud │    │  Convex      │  │  Stripe  │  │  Resend │
│  (médias WebRTC│    │  (DB temps   │  │ (paiement│  │ (emails)│
│   + signaling) │    │   réel)      │  │  + abon.)│  │         │
└────────────────┘    └──────────────┘  └──────────┘  └─────────┘
```

## 2.3 Stack technique synthétique

| Couche          | Technologies                                                                                                                                               |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Front**       | React 18.3, Vite 5.2, Tailwind 3, Framer Motion 11, styled-components, i18next 25 (6 langues), Clerk @clerk/react v6, livekit-client 2, socket.io-client 4 |
| **API edge**    | Vercel Functions (Node 20) + Netlify Functions (fallback), @clerk/backend, Zod, in-memory rate-limit                                                       |
| **Backend**     | Node 20, Express 4.21, Socket.IO 4.8, helmet 8, express-rate-limit 7, pino 9, livekit-server-sdk 2, stripe 20, resend 6                                    |
| **Données**     | Convex (NoSQL temps réel) — schémas typés, mutations, queries réactives                                                                                    |
| **Auth**        | Clerk (OAuth Google/GitHub + email/password + JWT vérifié côté serveur)                                                                                    |
| **Médias**      | LiveKit Cloud (WebRTC, SFU, recording)                                                                                                                     |
| **Paiements**   | Stripe Checkout + webhook signé                                                                                                                            |
| **Emails**      | Resend + React-Email (templates JSX)                                                                                                                       |
| **Tests**       | Vitest 2 + Supertest 7                                                                                                                                     |
| **Qualité**     | ESLint 9 (flat config), Prettier 3, Husky + lint-staged                                                                                                    |
| **CI/CD**       | GitHub Actions (lint, tests, build, audit npm)                                                                                                             |
| **Déploiement** | Vercel (front + edge), DigitalOcean Droplet FRA1 (backend Express via Docker + Nginx + Let's Encrypt)                                                      |

## 2.4 Mon rôle

**Concepteur, développeur, intégrateur, mainteneur** — j'ai porté
l'intégralité du cycle de vie du logiciel :

1. **Conception** : étude des besoins, maquettes Figma, modélisation
   des données Convex, choix techniques argumentés.
2. **Développement** : front-end React, back-end Express, fonctions
   serverless, intégrations LiveKit / Stripe / Resend / Clerk.
3. **Qualité** : tests unitaires et d'intégration, lint, audit OWASP
   complet sur 14 findings, refactor en couches.
4. **Déploiement** : pipeline CI GitHub Actions, conteneurisation
   Docker, déploiement DigitalOcean Droplet FRA1, certificat TLS Let's Encrypt,
   pare-feu UFW, fail2ban.
5. **Maintenance** : suivi des retours bêta-testeurs (cf. document
   `BILAN_RETOURS_BETA.md` du dépôt), itérations correctives.

---

<a id="at1"></a>

# 3. Activité-Type 1 — Développer une application sécurisée

> **Compétences couvertes** : CP1 (maquetter une application), CP2
> (développer une interface utilisateur web statique et adaptable),
> CP3 (développer une interface utilisateur web dynamique), CP4
> (développer la partie front-end d'une application web).

<a id="r11"></a>

## 3.1 Réalisation 1.1 — Landing-page multilingue (i18n 6 langues)

### Intitulé

Conception et développement de la landing-page commerciale de
VisiConnect (Hero, sections fonctionnalités, démonstration vidéo,
preuves sociales, tarifs, FAQ) avec internationalisation complète en
6 langues.

### Période

Janvier 2024 → Juin 2024 (~5 mois en parallèle d'autres modules).

### Contexte

Pour valider l'intérêt commercial du produit avant de lourdement
investir dans le backend, j'avais besoin d'une **vitrine
professionnelle** capable de :

- présenter clairement la valeur du produit aux visiteurs hors-cible
  technique ;
- convertir les visiteurs en utilisateurs (CTA « Essayer
  gratuitement ») ;
- adresser les marchés FR, EN, ES, IT, PT, CA (catalan) — décision
  prise après une étude rapide des bassins francophones et latins
  où la concurrence Zoom/Meet est moins dominante.

### Démarche et compétences mises en œuvre

**Étape 1 — Maquettage (CP1)**

J'ai d'abord produit des **wireframes basse fidélité** sur papier puis
des **maquettes Figma** pour les pages clés (`/`, `/pricing`,
`/features`, `/contact`). J'ai validé les parcours sur 3 personas
fictifs : « Caroline, RH d'une PME 30 personnes », « Marc, freelance
formateur », « Lina, étudiante en visio-cours ».

**Étape 2 — Découpage en composants React réutilisables (CP2)**

J'ai conçu une bibliothèque de composants atomiques avec
**TailwindCSS** et **styled-components** pour les états complexes.
Exemples concrets dans le dépôt :

- [client/src/components/home/HeroConferenceDemo.jsx](client/src/components/home/HeroConferenceDemo.jsx) :
  démo animée du produit ;
- [client/src/components/home/FeaturesCarousel3D.jsx](client/src/components/home/FeaturesCarousel3D.jsx) :
  carrousel 3D des fonctionnalités (Framer Motion + transforms CSS) ;
- [client/src/components/home/InterfaceSlider.jsx](client/src/components/home/InterfaceSlider.jsx) ;
- [client/src/components/home/ProofArea.jsx](client/src/components/home/ProofArea.jsx) :
  bandeau de logos clients + témoignages.

Chaque composant respecte le **principe de responsabilité unique** et
expose une API de `props` documentée par défaut.

**Étape 3 — Interface dynamique (CP3)**

J'ai intégré **Framer Motion** pour les transitions et les
micro-interactions (parallaxe au scroll, fade-in au viewport,
animations de hover sur les cartes tarifs). Le **lazy-loading** des
images et le **code-splitting de routes** (React.lazy + Suspense)
maintiennent le LCP sous 2,5 s en 4G simulée (vérifié avec
Lighthouse).

**Étape 4 — Internationalisation (i18n)**

J'ai mis en place **i18next + react-i18next + i18next-http-backend**
pour charger les bundles de traduction à la demande. Architecture :

```
client/src/i18n/
  ├── locales/
  │   ├── fr/common.json
  │   ├── en/common.json
  │   ├── es/common.json
  │   ├── it/common.json
  │   ├── pt/common.json
  │   └── ca/common.json
  └── index.js   // configuration + détecteur de langue
```

J'ai écrit des **scripts Node.js de traduction automatisée**
(`client/scripts/translate_*.js`) qui passent par l'API Bing Translate
pour produire les premières versions, puis j'ai relu manuellement
les chaînes commerciales clés. Cela m'a fait gagner plusieurs jours.

### Résultats

- **6 langues** intégrées, **environ 850 clés** de traduction par
  langue.
- **Score Lighthouse Performance ≥ 90** sur la home (mesure prod).
- **Conversion bêta-testeurs** : 38 inscriptions sur les 3 premières
  semaines de campagne (cf. `BILAN_RETOURS_BETA.md`).
- Site **responsive** mobile/tablette/desktop, validé sur Chrome,
  Firefox, Safari, Edge.

### Difficultés rencontrées et solutions

| Difficulté                                                                                           | Solution apportée                                                                                                                                                                  |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bundle JavaScript trop volumineux au premier rendu (> 800 ko)                                        | Mise en place de **React.lazy** pour `PricingPage`, `FeaturesPage`, `ContactPage`, **dynamic import** des composants 3D lourds (Framer + Embla). Bundle initial ramené à ≈ 280 ko. |
| Traductions générées par IA parfois maladroites en catalan                                           | Relecture manuelle des chaînes marketing (Hero, CTA, prix), script `fix_catalan_mixed.js` pour homogénéiser les majuscules / ponctuation typique CA.                               |
| Détecteur de langue par défaut renvoyait `en` pour les utilisateurs `fr-FR` sur certains navigateurs | Ajout d'un **fallback explicite** dans `i18next-browser-languagedetector` (order: `localStorage → navigator → fallback fr`).                                                       |

### Apports personnels / bilan

J'ai appris à **équilibrer "wow effect" et performance** : il est très
facile d'empiler les animations qui semblent élégantes en local mais
détruisent le LCP en mobile. La discipline du code-splitting + audit
Lighthouse régulier a été décisive.

---

<a id="r12"></a>

## 3.2 Réalisation 1.2 — Composants UI réutilisables et modale de création de réunion

### Intitulé

Conception et développement de la **modale "Créer une réunion"**
multi-étapes, et de la bibliothèque de composants UI partagés (boutons,
inputs, modales, dropdown, toasts) utilisée dans tout le produit.

### Période

Mars 2024 → Mai 2024.

### Contexte

La modale "Créer une réunion" est le **point d'entrée critique** du
parcours utilisateur authentifié : c'est là qu'on choisit le titre, la
date/heure, le mode (instantané ou planifié), le mot de passe, les
invités, et qu'on lance la salle. Le mauvais design ici tue
l'adoption.

### Démarche et compétences mises en œuvre

**Composant principal** :
[client/src/components/CreateMeetingModal.jsx](client/src/components/CreateMeetingModal.jsx)
(+ son styles-module
[client/src/components/CreateMeetingModal.styles.js](client/src/components/CreateMeetingModal.styles.js)).

**1. Conception d'un composant complexe (CP2)**

La modale gère 4 étapes (« Titre & objet », « Date & heure »,
« Participants », « Récapitulatif »), un **wizard d'état local**
géré par `useReducer`, et un **système de validation côté client**
sur chaque champ. Pas de bibliothèque externe pour le formulaire :
choix volontaire pour rester maître du DOM et limiter la dette.

**2. UI dynamique réactive (CP3)**

- **Validation en temps réel** : feedback visuel < 100 ms sur le focus
  perdu (regex e-mail, longueur min/max, format ISO date).
- **Animations Framer Motion** entre les étapes (slide + fade).
- **Persistance locale** via le hook personnalisé
  [client/src/hooks/useFormPersistence.js](client/src/hooks/useFormPersistence.js)
  qui sauvegarde un brouillon dans `localStorage` toutes les 2 s
  (recouvrement après fermeture accidentelle).

**3. Couche de données (CP4)**

La création de la réunion appelle deux services :

- **Convex** pour stocker les métadonnées (`mutations.meetings.create`)
  — relation 1-N avec les invités, schéma typé dans
  [convex/schema.ts](convex/schema.ts).
- **Vercel function** `/api/livekit-token` (helper apiClient
  authentifié, voir réalisation 2.1) pour obtenir le jeton de la
  salle vidéo.

**4. Bibliothèque de composants partagés (CP2)**

Cette modale s'appuie sur la **lib UI maison** que j'ai construite en
parallèle, dossier
[client/src/components/ui/](client/src/components/ui/) :
`Button`, `Input`, `Select`, `Modal`, `Toast`, `Tooltip`,
`DropdownMenu`. Chacun :

- accepte un thème (light/dark via `next-themes`) ;
- est **accessible** (ARIA labels, focus trap dans les modales,
  navigation clavier).

### Résultats

- **Taux de complétion** de la modale (bêta) : 91 % une fois la
  première étape démarrée (mesuré via un événement Convex
  `meeting_created`).
- **Réutilisation** : la lib UI est consommée par 27 pages /
  composants distincts du produit.

### Difficultés rencontrées et solutions

| Difficulté                                                                                              | Solution apportée                                                                                                                        |
| ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Sur Safari iOS, le `<input type="datetime-local">` ne respectait pas le format ISO attendu côté serveur | Création d'un composant `DateTimePicker` maison basé sur deux `<input>` séparés + normalisation client en `new Date(...).toISOString()`. |
| Les animations Framer Motion entre étapes provoquaient des layout-shifts                                | Hauteur min figée + `<AnimatePresence mode="wait">` + `position: absolute` pendant la transition.                                        |
| Validation d'e-mails saisis pour les invités : regex trop laxiste laissait passer `bob@bob`             | Adoption d'une regex inspirée du RFC 5322 simplifié + double validation côté serveur Zod (cf. `client/api/_lib/schemas.js`).             |

### Apports personnels / bilan

J'ai compris la valeur d'une **bibliothèque UI interne** plutôt que de
piocher des composants tiers à chaque besoin. La cohérence visuelle et
la maîtrise du a11y deviennent immédiates.

---

<a id="at2"></a>

# 4. Activité-Type 2 — Concevoir et développer une application sécurisée organisée en couches

> **Compétences couvertes** : CP5 (développer la partie back-end
> d'une application web), CP6 (concevoir une base de données),
> CP7 (mettre en place une base de données), CP8 (développer des
> composants d'accès aux données).

<a id="r21"></a>

## 4.1 Réalisation 2.1 — Module visioconférence (LiveKit + Convex + Socket.IO)

### Intitulé

Conception et développement du **module visio temps réel** :
authentification dans la salle, négociation WebRTC via LiveKit, chat
en parallèle (Socket.IO + Convex pour la persistance), signalisation
des présences, modération (mute, kick).

### Période

Mai 2024 → Septembre 2024.

### Contexte

C'est le **cœur fonctionnel** du produit. Il faut être capable de
faire entrer un utilisateur authentifié dans une salle, lui faire
émettre/recevoir des flux audio/vidéo de qualité, sans rien révéler
des autres salles, et en respectant la vie privée (RGPD).

### Démarche et compétences mises en œuvre

**1. Architecture serveur en couches (CP6)**

Côté backend, j'ai conçu une **séparation stricte des
responsabilités** :

```
server/src/
  routes/index.js          ← URL → middleware → controller
  controllers/livekitController.js   ← HTTP only (validation, status codes)
  services/livekitService.js         ← logique métier pure (issueAccessToken)
  middleware/requireAuth.js          ← vérif JWT Clerk
  middleware/rateLimit.js            ← express-rate-limit
  schemas/index.js                   ← validation Zod
```

Cette structure rend chaque couche **testable en isolation**
(cf. réalisation 3.1) et **remplaçable** sans casser le reste (par
exemple, on pourrait passer de LiveKit à Daily.co en ne touchant
qu'au service).

**2. Sécurité applicative (CP8)**

J'ai appliqué les contrôles suivants sur chaque appel
`POST /api/livekit/token` :

- **Authentification** par JWT Clerk vérifié via `@clerk/backend`
  ([server/src/middleware/requireAuth.js](server/src/middleware/requireAuth.js))
  — le `userId` est _extrait du token_, jamais d'un header confiance ;
- **Rate-limit** : 10 demandes par minute et par IP
  ([server/src/middleware/rateLimit.js](server/src/middleware/rateLimit.js))
  pour empêcher l'extraction massive de jetons ;
- **Validation Zod** du `roomName` (regex `[a-zA-Z0-9_\-:.]+`, 3 à
  64 caractères) pour bloquer toute tentative d'injection
  ([server/src/schemas/index.js](server/src/schemas/index.js)) ;
- **TTL court** de 4 h sur le jeton LiveKit (limite la fenêtre
  d'usage si interception) ;
- **`identity` = `userId` Clerk** dans le JWT LiveKit — un utilisateur
  ne peut pas usurper l'identité d'un autre.

**3. Composants métier serveur (CP7)**

Le service
[server/src/services/livekitService.js](server/src/services/livekitService.js)
expose une fonction pure :

```js
async function issueAccessToken({ userId, roomName, displayName, role }) {
  const at = new AccessToken(env.LIVEKIT_API_KEY, env.LIVEKIT_API_SECRET, {
    identity: userId,
    name: displayName || 'Participant',
    ttl: 4 * 60 * 60,
    metadata: JSON.stringify({ role }),
  });
  at.addGrant({ roomJoin: true, room: roomName /* ... */, roomAdmin: role === 'host' });
  return { token: await at.toJwt(), ttl: 14400 };
}
```

Côté front-end, le hook
[client/src/hooks/useMeeting.js](client/src/hooks/useMeeting.js)
appelle `apiPostJson('/api/livekit/token', { roomName })` (auto-Bearer
via `window.Clerk?.session?.getToken()`) puis se connecte à la salle.

**4. Accès aux données temps réel (CP5)**

- **Convex** stocke la définition des réunions, les participants
  actifs, les messages de chat ([convex/messages.ts](convex/messages.ts),
  [convex/breakout.ts](convex/breakout.ts),
  [convex/polls.ts](convex/polls.ts)). J'ai défini les schémas typés
  dans [convex/schema.ts](convex/schema.ts) avec des index sur les
  champs `roomId` et `userId` pour les requêtes fréquentes.
- **Socket.IO** assure la signalisation temps réel (curseurs,
  whiteboard, présence). L'auth handshake est obligatoire
  ([server/src/socket/index.js](server/src/socket/index.js)) — le
  `userId` n'est jamais fourni par le client, il est extrait du JWT.

### Résultats

- **Réunions à 200 participants** simultanés supportées (test charge
  LiveKit Cloud).
- **Latence média < 200 ms** sur l'Europe (mesurée avec les outils de
  diagnostic LiveKit).
- **Aucun jeton LiveKit obtenu sans authentification valide** depuis
  la mise en production de la branche `chore/exam-hardening`.
- **Tests unitaires** du service LiveKit dans
  [server/tests/livekitService.test.js](server/tests/livekitService.test.js)
  (5 cas, dont vérification du `sub`, du TTL, des permissions admin).

### Difficultés rencontrées et solutions

| Difficulté                                                                                                                                                                                                 | Solution apportée                                                                                                                      |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Faille initiale critique (F-01 de l'audit)** : la route `/api/livekit/token` était publique et générait un jeton pour n'importe quel `roomName` — un attaquant pouvait rejoindre n'importe quelle salle. | Refonte complète avec `requireAuth` + identity côté serveur. Voir `dossiers/00_AUDIT_INITIAL.md` finding F-01.                         |
| Sur Firefox, certaines caméras déclenchaient un `getUserMedia` qui freezait pendant 30 s.                                                                                                                  | Ajout d'un timeout de 8 s dans [client/src/hooks/useLiveKit4K.js](client/src/hooks/useLiveKit4K.js) avec fallback sur la qualité 720p. |
| Le `identity` initialement basé sur `guest_${Date.now()}` permettait à plusieurs onglets du même user d'apparaître comme des inconnus.                                                                     | Bascule sur le `userId` Clerk stable.                                                                                                  |

### Apports personnels / bilan

J'ai pris la mesure de la **différence fondamentale entre
authentification et autorisation**. Un JWT valide ne suffit pas : il
faut aussi vérifier que l'utilisateur a le **droit** de rejoindre cette
salle (à venir : croisement avec la table `meetings` Convex).

---

<a id="r22"></a>

## 4.2 Réalisation 2.2 — Module paiements Stripe et refactor serveur en couches (audit OWASP)

### Intitulé

Mise en place du **système d'abonnements payants** (Stripe Checkout +
webhook), refactor complet du serveur Express **en couches** (614
lignes monolithiques → ~15 modules dédiés), et **audit de sécurité
OWASP Top 10** avec 14 findings corrigés.

### Période

Mars 2026 → Juin 2026 (sprint de mise à niveau pour l'examen,
documenté dans [dossiers/01_MISE_A_NIVEAU.md](dossiers/01_MISE_A_NIVEAU.md)).

### Contexte

Le serveur initial `simple-server-no-db.js` cumulait :

- une **clé API Resend en dur** dans le code
  (`re_f7CXkPZ1_FouifSQZycKkbcStAoZkGgW8`) — exposée dans
  l'historique Git ;
- une **authentification basée sur un header `x-user-email`** que le
  client peut forger librement (CVE équivalent : OWASP A07
  Identification and Authentication Failures) ;
- une **absence totale de validation** des bodies (OWASP A03
  Injection) ;
- une **CORS wildcard** (OWASP A05 Security Misconfiguration) ;
- un **webhook Stripe non vérifié** sur la signature.

C'est inacceptable pour un projet présenté à un titre RNCP niveau 6.

### Démarche et compétences mises en œuvre

**1. Audit complet (livrable consultable :
[dossiers/00_AUDIT_INITIAL.md](dossiers/00_AUDIT_INITIAL.md))**

J'ai produit un rapport de **14 findings** mappés sur OWASP Top 10 et
sur les compétences CDA, classés par sévérité (4 critiques, 5 élevés,
5 moyens). Chaque finding contient : description, impact, preuve de
concept (PoC), correction proposée, statut.

**2. Refactor en couches (CP6)** — détaillé dans la réalisation 2.1
ci-dessus, à laquelle s'ajoutent :

- [server/src/config/env.js](server/src/config/env.js) : validation
  Zod _fail-fast_ des variables d'environnement (le serveur refuse de
  démarrer si une variable critique manque) ;
- [server/src/lib/logger.js](server/src/lib/logger.js) : logger Pino
  avec **redact PII** (e-mails masqués, tokens redactés) — conformité
  RGPD article 32 ;
- [server/src/middleware/errorHandler.js](server/src/middleware/errorHandler.js) :
  jamais de stack-trace en production (corrige F-07).

**3. Composants métier serveur (CP7)**

- [server/src/services/stripeService.js](server/src/services/stripeService.js) :
  création de Checkout Sessions (Pro, Business — mensuel ou annuel) +
  fonction `verifyWebhook()` qui valide la signature avant tout
  traitement (corrige F-08).
- [server/src/controllers/stripeController.js](server/src/controllers/stripeController.js) :
  endpoint `/api/create-checkout-session` (auth + Zod + rate-limit) +
  `/api/stripe/webhook` monté avec `express.raw()` (sinon la
  signature ne peut pas être calculée).
- Bonus produit : `client/api/downgrade-subscription.js` vérifie
  l'**ownership** : si le `userId` du document Convex ne correspond
  pas au `userId` du JWT → **403 Forbidden** (corrige A01 Broken
  Access Control).

**4. Helpers partagés pour les Vercel Functions
([client/api/\_lib/](client/api/_lib/))**

- `cors.js` : allowlist d'origines (plus de wildcard) ;
- `auth.js` : vérification Clerk côté serverless via
  `authenticateRequest` ;
- `rateLimit.js` : limiteur in-memory par IP avec garbage collection ;
- `schemas.js` : schémas Zod centralisés pour les 8 endpoints
  serverless.

**5. Migration du client (CP3 + CP4)**

J'ai introduit
[client/src/lib/apiClient.js](client/src/lib/apiClient.js) qui injecte
automatiquement le `Authorization: Bearer <token>` Clerk dans toutes
les requêtes (récupéré via `window.Clerk?.session?.getToken()`).
**11 call-sites migrés** (hooks, services IA, pages).

### Résultats

- **14 findings traités** : 4 critiques résolus à 100 %, 5 élevés à
  100 %, 5 moyens à 100 %. Détail dans
  [dossiers/01_MISE_A_NIVEAU.md](dossiers/01_MISE_A_NIVEAU.md).
- **Clé Resend supprimée** du code + ajout d'une consigne de
  révocation dans le runbook.
- **Couverture de tests** : 26 tests verts (cf. réalisation 3.1).
- **0 erreur ESLint** dans le code refactoré.
- **Diff Git** : 78 fichiers, +11 269 / −9 888 lignes (commit
  `3cdc4ed` sur `chore/exam-hardening`).

### Difficultés rencontrées et solutions

| Difficulté                                                                                                                               | Solution apportée                                                                                                                                                                                  |
| ---------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Le webhook Stripe doit lire le body brut, mais Express applique `express.json()` globalement.                                            | Montage de `/api/stripe/webhook` **avant** le `express.json()` global, avec un middleware `express.raw({ type: 'application/json' })` dédié.                                                       |
| Le test `auth.test.js` initial essayait de mocker `verifyClerkToken` mais Vitest ESM + `require()` CJS posaient un problème de hoisting. | Refonte : tests d'intégration HTTP qui vérifient le **rejet 401** seul (suffisant pour prouver la protection), et **tests unitaires** isolés du service LiveKit en injectant des secrets factices. |
| Migration des 11 call-sites client : risque de régression.                                                                               | Adoption d'`apiFetch` comme fonction _drop-in replacement_ de `fetch`, validation manuelle en local de chaque flux (create meeting, ai chat, checkout, account).                                   |

### Apports personnels / bilan

Cet audit a été une **leçon d'humilité** : le code initial me semblait
correct alors qu'il accumulait des failles classiques évitables.
J'ai désormais le réflexe **« threat-model » avant `await`** :
qu'est-ce qu'un attaquant pourrait faire de cet input ?

---

<a id="at3"></a>

# 5. Activité-Type 3 — Préparer le déploiement d'une application sécurisée

> **Compétences couvertes** : CP9 (préparer et exécuter les plans
> de tests d'une application), CP10 (préparer et documenter le
> déploiement), CP11 (contribuer à la mise en production dans une
> démarche DevOps).

<a id="r31"></a>

## 5.1 Réalisation 3.1 — Pipeline CI/CD GitHub Actions et tests automatisés

### Intitulé

Mise en place de la **suite de tests automatisés** (Vitest + Supertest)
et du **pipeline d'intégration continue** GitHub Actions
(lint + format + tests + build + audit npm).

### Période

Mai 2026 → Juin 2026.

### Contexte

Le projet n'avait **aucun test automatisé** avant cette mise à niveau
et **aucune CI**. Toute régression était détectée manuellement,
souvent en production. Inacceptable pour un produit qui facture des
clients.

### Démarche et compétences mises en œuvre

**1. Stratégie de tests (CP9)**

J'ai privilégié une **pyramide de tests** :

| Niveau           | Outil     | Quantité | Rôle                                                          |
| ---------------- | --------- | -------- | ------------------------------------------------------------- |
| Unitaire         | Vitest    | 16 tests | Couvrir les services et schémas en isolation                  |
| Intégration HTTP | Supertest | 10 tests | Vérifier le pipeline complet Express (CORS, auth, validation) |

**Fichiers de tests créés** (`server/tests/`) :

- [auth.test.js](server/tests/auth.test.js) : 4 tests vérifiant que
  les routes protégées rejettent les requêtes non authentifiées
  (couvre F-05 : un client envoyant `x-user-email` reçoit désormais
  401, là où l'ancien code retournait 200).
- [cors.test.js](server/tests/cors.test.js) : 3 tests vérifiant que
  seules les origines de l'allowlist obtiennent un header
  `Access-Control-Allow-Origin`.
- [health.test.js](server/tests/health.test.js) : 3 tests sur
  `/health`, `/api/health` et le 404 générique.
- [schemas.test.js](server/tests/schemas.test.js) : 11 tests sur les
  schémas Zod (regex roomName, longueur max, anti-DoS sur l'IA,
  enums Stripe).
- [livekitService.test.js](server/tests/livekitService.test.js) :
  5 tests sur la génération de jetons LiveKit (identity = userId,
  TTL de 4 h, permissions admin réservées au rôle host).

**Configuration** : [server/vitest.config.js](server/vitest.config.js)

- [server/tests/setup.js](server/tests/setup.js) qui mocke les
  variables d'environnement pour ne jamais appeler Clerk / Stripe /
  LiveKit pendant les tests.

**2. Outillage qualité racine**

- [eslint.config.js](eslint.config.js) : flat config ESLint 9 avec
  scope strict sur le serveur et permissif sur le legacy client
  (pour ne pas bloquer la CI sur la dette technique hors périmètre).
- [.prettierrc.json](.prettierrc.json) + [.prettierignore](.prettierignore).
- [.husky/pre-commit](.husky/pre-commit) + `lint-staged` qui
  re-formatent automatiquement les fichiers stagés avant chaque
  commit.

**3. Pipeline CI** ([.github/workflows/ci.yml](.github/workflows/ci.yml))

5 jobs en parallèle :

```yaml
jobs:
  lint:        # ESLint sur tout le repo
  format:      # Prettier --check
  test-server: # cd server && npm test
  build-client:# cd client && npm run build (Vite)
  audit:       # npm audit --audit-level=high (non bloquant)
```

Déclencheurs : push sur `main` / `chore/**` / `feat/**` / `fix/**`,
et toutes les PR vers `main`. **Cache npm** activé sur les trois
lockfiles (root, client, server) pour des runs < 2 minutes.

### Résultats

- **26 tests verts** : `Tests 26 passed (26)` — sortie complète
  archivée en annexe.
- **0 erreur ESLint** dans le code refactoré.
- **CI déclenchée automatiquement** sur chaque commit, fournissant un
  retour < 3 minutes.
- **Pre-commit hook** : impossible de committer un fichier non
  formaté.

### Difficultés rencontrées et solutions

| Difficulté                                                                                                 | Solution apportée                                                                                       |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Vitest ne reconnaissait pas `process.env.LOG_LEVEL='silent'` (Pino accepte mais pas mon schéma Zod).       | Bascule sur `LOG_LEVEL='fatal'` dans `setup.js` (le minimum supporté par la valeur enum).               |
| Un premier test essayait de mocker `verifyClerkToken` mais le mock ESM ne couvrait pas le `require()` CJS. | Restructuration : test d'intégration _rejet 401_ (sans mock) + tests unitaires du service en isolation. |
| ESLint flat config refusait les fichiers de tests en `import/export` (parsing error).                      | Ajout d'un bloc `files: ['**/*.test.js', ...]` avec `sourceType: 'module'`.                             |

### Apports personnels / bilan

J'ai compris qu'un **test qui prouve une non-régression de sécurité**
(ex : "x-user-email n'est plus accepté") a infiniment plus de valeur
qu'un test qui couvre une métrique de coverage. Je teste maintenant
ce qui m'a fait peur, pas seulement ce qui est facile.

---

<a id="r32"></a>

## 5.2 Réalisation 3.2 — Conteneurisation Docker et déploiement VPS DigitalOcean

### Intitulé

**Dockerisation** du backend Node.js, mise en place d'un
**`docker-compose`** avec reverse-proxy Nginx, et rédaction d'un
**runbook complet de déploiement** sur VPS DigitalOcean Droplet FRA1
(Ubuntu 24.04, TLS Let's Encrypt, UFW, fail2ban).

### Période

Juin 2026.

### Contexte

Avant cette mise à niveau, le backend tournait en `node simple-server-no-db.js`
sur ma machine de dev, ou en cloud Vercel pour les fonctions
serverless. Aucun environnement de production pérenne, aucune
procédure reproductible.

### Démarche et compétences mises en œuvre

**1. Choix d'hébergeur argumenté (CP10)**

| Critère        | DigitalOcean Droplet        | Pourquoi                                              |
| -------------- | --------------------------- | ----------------------------------------------------- |
| Coût           | ~12 $/mois (≈ 11 € HT)      | Hébergement professionnel EU à budget maîtrisé        |
| Localisation   | Frankfurt, Allemagne (FRA1) | **Conformité RGPD** (article 44, transferts intra-UE) |
| Certifications | ISO 27001, SOC 2 Type II    | Sérieux infrastructure                                |
| Ressources     | 2 vCPU, 2 Go RAM, 60 Go SSD | Dimensionné pour la charge actuelle                   |

**2. Dockerfile multi-stage** ([Dockerfile](Dockerfile))

```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY server/package.json server/package-lock.json* ./
RUN npm install --omit=dev --no-audit --no-fund

FROM node:20-alpine AS runtime
WORKDIR /app
RUN addgroup -S app && adduser -S app -G app   # ← user non-root
ENV NODE_ENV=production PORT=5000
COPY --from=deps /app/node_modules ./node_modules
COPY server/src ./src
COPY server/package.json ./
USER app
EXPOSE 5000
HEALTHCHECK CMD wget -qO- http://127.0.0.1:5000/health || exit 1
CMD ["node", "src/server.js"]
```

Points de sécurité :

- Image **alpine** (taille finale ~ 180 Mo) ;
- Utilisateur **non-root** (`app`) — défense en profondeur ;
- **HEALTHCHECK** Docker pour redémarrage auto si l'API freeze ;
- `.dockerignore` exhaustif (pas de `.env`, pas de `node_modules` du
  host, pas de `dossiers/`).

**3. docker-compose** ([docker-compose.yml](docker-compose.yml))

Deux services :

- `api` : le conteneur Node (lié au `.env` du VPS, jamais commité) ;
- `nginx` : reverse-proxy HTTPS (ports 80/443), lit
  [infra/deploy/nginx.conf](infra/deploy/nginx.conf).

**4. Nginx HTTPS + WebSocket** ([infra/deploy/nginx.conf](infra/deploy/nginx.conf))

```nginx
# Redirection 301 HTTP → HTTPS
# Termination TLS avec certs Let's Encrypt
# Upgrade WebSocket pour Socket.IO et LiveKit
# Headers HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy
```

**5. Runbook complet** ([infra/deploy/runbook.md](infra/deploy/runbook.md))

Document qui décrit pas-à-pas :

- création du Droplet DigitalOcean FRA1 ;
- durcissement OS (création d'un utilisateur `deploy`, désactivation
  du login root, désactivation de l'auth par mot de passe SSH) ;
- pare-feu **UFW** (seuls 22/80/443 ouverts) ;
- **fail2ban** pour bannir les bruteforces SSH ;
- installation Docker + Compose ;
- émission du certificat **Let's Encrypt** via certbot
  (renouvellement auto par timer systemd) ;
- premier déploiement (`git pull && docker compose up -d`) ;
- procédure de **mise à jour** régulière ;
- politique de **sauvegarde** (Convex géré + logs + `.env` dans
  Bitwarden chiffré) ;
- surveillance (healthcheck Docker + UptimeRobot) ;
- procédure de **rollback** (`git checkout <SHA> && rebuild`).

**6. Maintenance (CP11)**

Le runbook + la CI assurent :

- mise à jour reproductible (1 commande) ;
- **traçabilité** complète (git log + CI run + logs Pino) ;
- **recovery** documenté (rollback, restore `.env`).

### Résultats

- **Image Docker** buildable en local et en CI.
- **Runbook validé** : un junior pourrait redéployer VisiConnect en
  ~ 45 minutes en suivant le document.
- **Empreinte mémoire** du conteneur : ~ 90 Mo en idle (mesuré
  localement).

### Difficultés rencontrées et solutions

| Difficulté                                                               | Solution apportée                                                                                                                                                                         |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Le webhook Stripe nécessite une URL publique HTTPS, impossible en local. | Documentation dans le runbook : utiliser `stripe listen --forward-to localhost:5000` pendant le dev, puis bascule directe vers `https://api.visioconnect.pro/api/stripe/webhook` en prod. |
| Premier `docker build` faisait ~ 900 Mo (image avec devDependencies).    | Multi-stage `deps` → `runtime` + `npm install --omit=dev` → image finale ~ 180 Mo.                                                                                                        |
| Le user non-root cassait l'écriture des logs dans `/app/logs`.           | Suppression de l'écriture fichier (Pino sortie stdout uniquement, capturée par `docker logs`).                                                                                            |

### Apports personnels / bilan

J'ai mesuré la **valeur d'un runbook écrit en clair** : il m'est arrivé
de devoir redéployer après un mois sans toucher au serveur, et le
document a remplacé toute mémoire perdue. Le réflexe « ce que je sais
faire aujourd'hui, je l'écris dans le runbook tout de suite » est
acquis.

---

# 6. Annexes

## A.1 — Lien vers le code source

- **GitHub** : <https://github.com/AidoTokihisa11/visiconnect>
- **Branche démontrant la conformité examen** : `chore/exam-hardening`
- **Site en production** : <https://visioconnect.pro>

## A.2 — Documents joints (consultables dans `dossiers/`)

- [dossiers/00_AUDIT_INITIAL.md](dossiers/00_AUDIT_INITIAL.md) :
  audit OWASP Top 10 — 14 findings détaillés.
- [dossiers/01_MISE_A_NIVEAU.md](dossiers/01_MISE_A_NIVEAU.md) :
  bilan technique de la mise à niveau (Stages A à H).
- [infra/deploy/runbook.md](infra/deploy/runbook.md) : procédure
  complète de déploiement et de maintenance.

## A.3 — Sortie de la suite de tests

```
> visiconnect-server@2.0.0 test
> vitest run

 ✓ tests/schemas.test.js          (11 tests)  6ms
 ✓ tests/livekitService.test.js   ( 5 tests) 10ms
 ✓ tests/health.test.js           ( 3 tests) 29ms
 ✓ tests/cors.test.js             ( 3 tests) 34ms
 ✓ tests/auth.test.js             ( 4 tests) 81ms

 Test Files  5 passed (5)
      Tests  26 passed (26)
```

## A.4 — Matrice de couverture compétences ↔ réalisations

| Compétence                                          | Réalisation principale | Réalisations secondaires |
| --------------------------------------------------- | ---------------------- | ------------------------ |
| CP1 — Maquetter une application                     | 1.1                    | 1.2                      |
| CP2 — Composants front réutilisables                | 1.2                    | 1.1, 2.1                 |
| CP3 — Interface utilisateur dynamique               | 1.1                    | 1.2                      |
| CP4 — Composants métier en interaction avec données | 1.2                    | 2.1, 2.2                 |
| CP5 — Composants d'accès aux données                | 2.1                    | 2.2                      |
| CP6 — Organisation du code en couches               | 2.2                    | 2.1, 3.1                 |
| CP7 — Composants métier serveur                     | 2.1                    | 2.2                      |
| CP8 — Sécurité applicative                          | 2.2                    | 2.1, 3.1                 |
| CP9 — Préparer les tests et le déploiement          | 3.1                    | 3.2                      |
| CP10 — Déployer                                     | 3.2                    | —                        |
| CP11 — Maintenir                                    | 3.2                    | 3.1                      |

## A.5 — Glossaire

| Terme     | Définition                                                                          |
| --------- | ----------------------------------------------------------------------------------- |
| **CDA**   | Concepteur Développeur d'Applications (titre RNCP niveau 6)                         |
| **CP**    | Compétence Professionnelle (du référentiel REAC)                                    |
| **AT**    | Activité-Type (regroupement de CP)                                                  |
| **JWT**   | JSON Web Token — jeton signé porteur de l'identité                                  |
| **OWASP** | Open Web Application Security Project — référentiel mondial de sécurité applicative |
| **SFU**   | Selective Forwarding Unit — relais média (architecture LiveKit)                     |
| **TLS**   | Transport Layer Security — chiffrement des connexions HTTPS                         |
| **RGPD**  | Règlement Général sur la Protection des Données                                     |
| **PII**   | Personally Identifiable Information (données personnelles)                          |

---

**Fin du Dossier Professionnel.**

_Document rédigé par Théo GARCES — version 1.0 du `[date]` —
session jury du 3 juillet 2026._
