# DOSSIER PROJET

## Titre professionnel : **Concepteur Développeur d'Applications** (niveau 6)

**Code RNCP** : RNCP37873 — Arrêté du 22/12/2022
**Session d'examen** : 3 juillet 2026 — Centre CODA Orléans
**Candidat** : Théo GARCES — theo.garces.aido@gmail.com
**Projet support** : **VisiConnect** — Plateforme SaaS de visioconférence professionnelle
**URL de production** : <https://visioconnect.pro>
**Code source** : <https://github.com/AidoTokihisa11/visiconnect>

---

# Sommaire

1. [Présentation du candidat](#1-présentation-du-candidat)
2. [Présentation de l'entreprise et du contexte](#2-présentation-de-lentreprise-et-du-contexte)
3. [Présentation du projet](#3-présentation-du-projet)
4. [Cahier des charges](#4-cahier-des-charges)
5. [Gestion de projet](#5-gestion-de-projet)
6. [Spécifications fonctionnelles](#6-spécifications-fonctionnelles)
7. [Conception technique](#7-conception-technique)
8. [Modèle de données](#8-modèle-de-données)
9. [Réalisation logicielle](#9-réalisation-logicielle)
10. [Tests et qualité](#10-tests-et-qualité)
11. [Mise en œuvre de la qualité et de la sécurité](#11-mise-en-œuvre-de-la-qualité-et-de-la-sécurité)
12. [Déploiement](#12-déploiement)
13. [Veille technologique et sécurité](#13-veille-technologique-et-sécurité)
14. [Maintenance et exploitation](#14-maintenance-et-exploitation)
15. [Conformité (RGPD, accessibilité)](#15-conformité-rgpd-accessibilité)
16. [Bilan personnel et perspectives](#16-bilan-personnel-et-perspectives)
17. [Bibliographie / sitographie](#17-bibliographie--sitographie)
18. [Annexes](#18-annexes)

---

# 1. Présentation du candidat

Je m'appelle **Théo GARCES**, je suis en formation **Concepteur
Développeur d'Applications** (titre professionnel de niveau 6
enregistré au RNCP sous le code RNCP37873) au centre **CODA Orléans**
depuis septembre 2023, pour une session d'examen prévue le **3 juillet
2026**.

Mon parcours est celui d'un autodidacte du développement web devenu
candidat à un titre professionnel reconnu par l'État. J'ai commencé à
écrire du HTML/CSS au lycée par curiosité, puis du JavaScript, puis du
React. La formation CDA m'a apporté ce qui me manquait : la
**méthodologie d'ingénieur** (architecture en couches, tests, CI/CD,
sécurité applicative, conformité réglementaire) et le **vocabulaire
technique structuré** qui permet de communiquer en équipe et avec un
jury professionnel.

J'ai choisi pour ce dossier un projet **personnel et de bout en bout**
plutôt qu'un travail d'alternance fragmenté : **VisiConnect**, une
plateforme SaaS de visioconférence professionnelle que j'ai conçue,
développée, sécurisée, déployée et publiée en ligne **seul**, sur la
durée de la formation. Ce choix volontaire m'engage : il signifie que
je porte la responsabilité de chaque ligne de code, de chaque choix
d'architecture, de chaque vulnérabilité corrigée — mais aussi de
chaque gain pédagogique.

---

# 2. Présentation de l'entreprise et du contexte

## 2.1 Cadre du projet

VisiConnect est un **projet personnel** mené à titre de candidat
libre/individuel. Il n'a pas été commandé par une entreprise tierce. Le
contexte économique est celui de la **généralisation du télétravail**
post-2020 : la visioconférence est devenue un outil quotidien pour les
TPE/PME mais le marché reste dominé par des acteurs américains
(Zoom, Google Meet, Microsoft Teams) dont les modèles économiques sont
opaques (free-tier dégradé, montée tarifaire à l'usage) et la
conformité RGPD régulièrement contestée (Schrems II, Privacy Shield
invalidé, transferts hors UE).

L'occasion m'a paru intéressante de proposer une alternative
**européenne, simple, transparente et conforme** : datacenter en
Allemagne (Hetzner, Falkenstein), médiacontent WebRTC routé via
LiveKit Cloud (Frankfurt), tarification claire et sans rétention de
quota artificielle.

## 2.2 Acteurs

| Rôle                       | Personne            | Mission                                                                                |
| -------------------------- | ------------------- | -------------------------------------------------------------------------------------- |
| Concepteur-développeur     | Théo GARCES         | Conception, développement, tests, déploiement, maintenance — toutes les couches.       |
| Référente pédagogique      | Formatrice CODA     | Suivi, validation des jalons, revues techniques.                                       |
| Bêta-testeurs              | 12 personnes        | Tests fonctionnels, feedback UX (cf. `BILAN_RETOURS_BETA.md`).                         |
| Hébergeur d'infrastructure | Hetzner Online GmbH | VPS Falkenstein (Allemagne) — sous-traitant RGPD documenté.                            |
| Médiacontent WebRTC        | LiveKit Inc.        | SFU géré + TURN — région Europe — sous-traitant RGPD.                                  |
| Paiements                  | Stripe Payments EU  | Encaissement abonnements — Stripe Payments Europe Ltd, conformité PCI-DSS niveau 1.    |
| Routeur d'emails           | Resend Inc.         | Envoi des emails transactionnels (invitations, codes bêta) — sous-traitant documenté.  |
| Identité utilisateur       | Clerk Inc.          | Authentification, gestion des sessions — sous-traitant RGPD.                           |

## 2.3 Contraintes spécifiques

- **Contrainte budgétaire** : projet auto-financé, le coût mensuel
  d'exploitation doit rester sous **10 € HT/mois**.
- **Contrainte juridique** : RGPD (UE), datacenter UE obligatoire pour
  les données identifiantes.
- **Contrainte temporelle** : compatible avec la formation CDA — pas
  d'astreinte 24/7, déploiements automatisés, journalisation
  exploitable a posteriori.
- **Contrainte technique** : exigence de couvrir les **11 compétences
  professionnelles** du référentiel REAC pour soutenir l'examen.

---

# 3. Présentation du projet

## 3.1 Origine et besoin

Le besoin part de trois constats personnels, recoupés par les retours
des bêta-testeurs :

1. **Les solutions grand public** (Zoom gratuit, Google Meet gratuit)
   imposent des limites artificielles (40 minutes, 100 participants
   max, watermark, contenu publicitaire).
2. **Les solutions entreprise** (Teams, Webex) sont sur-équipées,
   complexes à administrer et contractualisées au siège — inutilisables
   pour un freelance ou une TPE de 3 personnes.
3. **Les solutions open source** (Jitsi auto-hébergé, BigBlueButton)
   exigent une compétence systeme/réseau forte et un investissement
   matériel disproportionné.

Le **positionnement de VisiConnect** est entre ces trois mondes : le
confort du SaaS commercial, la transparence de l'open source, la
conformité européenne, et un tarif lisible (gratuit → 15 € → 35 €).

## 3.2 Objectifs

| ID    | Objectif                                                                              | Mesure                                                                  |
| ----- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| OBJ-1 | Permettre à un utilisateur de **créer** une réunion vidéo en moins de **30 secondes** | Mesuré au chronomètre lors des sessions bêta (résultat : 22 s en moy.). |
| OBJ-2 | Permettre à un invité de **rejoindre** une réunion sans installer de logiciel         | WebRTC pur, fonctionne dans Chrome / Firefox / Safari / Edge.           |
| OBJ-3 | Garantir la **confidentialité** des médias et des messages                            | Médias E2EE possibles via LiveKit (option), TLS 1.3 sur la signalisation. |
| OBJ-4 | Permettre l'**internationalisation** au lancement                                     | 6 langues livrées dès la v1 (fr/en/es/it/pt/ca).                        |
| OBJ-5 | Tenir un **coût d'infrastructure** sous **10 € HT/mois** hors paiements clients       | Hetzner CX22 (4 €) + LiveKit Cloud (free tier) + Resend (free tier).    |
| OBJ-6 | **Couvrir les 11 CP du référentiel CDA** pour soutenir l'examen                       | Matrice de traçabilité dans le DP (annexe A.4).                          |

## 3.3 Périmètre fonctionnel livré

- **Authentification** : email + mot de passe, OAuth Google, magic
  link (via Clerk).
- **Tableau de bord** : liste des réunions à venir, abonnement courant,
  consommation, historique.
- **Création de réunion** : modale en 3 étapes (titre, options,
  partage du lien) — wizard avec persistance locale en cas de fermeture
  accidentelle.
- **Salle de réunion** : vidéo HD/4K, chat texte temps réel, tableau
  blanc collaboratif (tldraw), sondages, sous-groupes (breakout
  rooms), assistant IA pour les notes.
- **Paiements** : trois plans Stripe (Starter 0 € / Pro 15 € / Business
  35 €), upgrade et downgrade en self-service, succès page de
  redirection.
- **Internationalisation** : 6 langues, détection automatique du
  navigateur, sélecteur visible.
- **Privacy** : caméra/micro coupés au démarrage tant que l'utilisateur
  n'a pas explicitement autorisé (privacy guard).

## 3.4 Hors-périmètre (volontairement exclu)

- L'**enregistrement serveur** des appels (coût de stockage, complexité
  RGPD : exigerait une politique de rétention spécifique). Reporté à
  une v2.
- L'**application mobile native** : la PWA progressive est conservée,
  pas d'app native iOS/Android pour la session jury.
- Le **streaming RTMP** vers YouTube/Twitch.

---

# 4. Cahier des charges

## 4.1 Exigences fonctionnelles

| ID    | Exigence                                                                       | Priorité |
| ----- | ------------------------------------------------------------------------------ | -------- |
| EF-01 | L'utilisateur s'inscrit via Clerk (email/mot de passe ou Google).              | MUST     |
| EF-02 | L'utilisateur authentifié peut créer une réunion (titre, protection passcode). | MUST     |
| EF-03 | Le créateur reçoit un **lien partageable** unique.                             | MUST     |
| EF-04 | L'invité peut rejoindre via le lien sans compte (mode invité limité 60 min).   | SHOULD   |
| EF-05 | Vidéo HD jusqu'à 200 participants par salle.                                   | MUST     |
| EF-06 | Chat texte temps réel par salle (≤ 200 ms latence p95).                        | MUST     |
| EF-07 | Tableau blanc collaboratif synchronisé temps réel.                             | SHOULD   |
| EF-08 | Sondages live (créés par l'hôte).                                              | COULD    |
| EF-09 | Sous-groupes (breakout rooms) gérés par l'hôte.                                | COULD    |
| EF-10 | Abonnements Stripe — upgrade / downgrade self-service.                         | MUST     |
| EF-11 | Interface en **6 langues** dès le lancement.                                   | MUST     |
| EF-12 | Privacy guard : caméra/micro coupés à l'entrée.                                | MUST     |

> Méthode MoSCoW : MUST = sans quoi le produit n'est pas livrable ;
> SHOULD = important mais reportable ; COULD = nice-to-have.

## 4.2 Exigences non fonctionnelles

| ID     | Exigence                                                                   | Cible                                  |
| ------ | -------------------------------------------------------------------------- | -------------------------------------- |
| ENF-01 | Disponibilité de l'API                                                     | 99 % mensuel (≈ 7 h d'indispo / mois). |
| ENF-02 | Time-to-first-byte (page d'accueil)                                        | < 800 ms p95 (mesuré Lighthouse).      |
| ENF-03 | Latence de chat                                                            | < 200 ms p95 entre deux participants.  |
| ENF-04 | Sécurité OWASP Top 10                                                      | 0 finding critique restant.            |
| ENF-05 | Conformité RGPD                                                            | Datacenter UE, sous-traitants listés. |
| ENF-06 | Accessibilité                                                              | WCAG 2.1 niveau AA visé.               |
| ENF-07 | Coût d'infra mensuel                                                       | < 10 € HT.                             |

## 4.3 Contraintes techniques imposées par moi-même (justifications)

| Contrainte                                          | Justification                                                                                   |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Frontend en **React 18 + Vite 5**                   | Compétence demandée par le référentiel CDA + écosystème mature.                                 |
| Backend en **Node.js Express**                      | Permet de réutiliser JavaScript/TypeScript de bout en bout. Démontre CP6 (architecture en couches). |
| Médiacontent en **LiveKit Cloud**                   | Auto-hébergement WebRTC à 200 utilisateurs = serveur dédié 50 €/mois minimum → hors budget.      |
| Données temps réel en **Convex**                    | Backend-as-a-service réactif, schéma typé, plus simple qu'un Redis Pub/Sub à maintenir seul.    |
| Authentification déléguée à **Clerk**               | Réduction du périmètre attaqué (pas de hash maison, pas de gestion de sessions à risque).       |
| Paiements via **Stripe**                            | Conformité PCI-DSS gérée par Stripe → réduction radicale du risque réglementaire.                |
| Déploiement sur **Hetzner CX22** + Docker Compose   | Tient le budget, démontre la maîtrise CP10 (déploiement) sans dépendance à un PaaS.             |

---

# 5. Gestion de projet

## 5.1 Méthodologie

J'ai adopté une **approche Kanban allégée**, adaptée à un développeur
solo. La méthode Scrum classique (sprints, dailys, rétrospectives en
groupe) a peu de sens à une seule personne ; j'ai gardé seulement les
rituels qui apportent une valeur :

- **Tableau Kanban GitHub Projects** : 4 colonnes — _Backlog_, _À
  faire_, _En cours_, _Terminé_.
- **Issue par fonctionnalité** : chaque carte porte un libellé
  (`feat:`, `fix:`, `chore:`, `docs:`, `security:`).
- **Convention de commit** : `Conventional Commits` (ex.
  `feat(meeting): add breakout rooms`, `fix(auth): clerk token expired
  handler`).
- **Branches courtes** : `feat/*`, `fix/*`, `chore/*` — fusion sur
  `main` après revue (auto-revue en mode solo).
- **Revue de fin de semaine** : chaque vendredi, je relis les commits
  de la semaine et je note dans un journal personnel les points de
  dette technique.

## 5.2 Outils

| Catégorie       | Outil                                | Usage                                                                |
| --------------- | ------------------------------------ | -------------------------------------------------------------------- |
| Versionnement   | Git + GitHub                         | Source unique de vérité, branches courtes, PR avec auto-revue.       |
| Suivi de tâches | GitHub Projects                      | Kanban, traçabilité commit ↔ issue.                                  |
| IDE             | VS Code + ESLint + Prettier          | Linter automatique, formatage à la sauvegarde.                       |
| Maquettage      | Figma                                | Wireframes, palette, composants, prototypes interactifs.             |
| Communication   | Discord (groupe bêta)                | Feedback bêta-testeurs.                                              |
| CI              | GitHub Actions                       | Lint + tests + build + audit npm sur chaque push.                    |
| Déploiement     | SSH + Docker Compose                 | Procédure manuelle versionnée dans `infra/deploy/runbook.md`.        |
| Monitoring      | `pm2` + journaux Pino + Hetzner Cloud | Suivi processus + logs applicatifs structurés JSON.                  |

## 5.3 Planning macro

Le projet s'est étalé sur ~30 mois (oct. 2023 → juin 2026). Les phases
ne sont pas strictement séquentielles : la sécurité, la documentation
et les tests se sont intensifiés sur les 3 derniers mois en
préparation de l'examen.

| Phase                                  | Période               | Livrable principal                                                      |
| -------------------------------------- | --------------------- | ----------------------------------------------------------------------- |
| Cadrage & maquettes                    | oct. 2023 → déc. 2023 | Wireframes Figma, prototype navigable, choix techniques validés.        |
| Front-end MVP (auth + dashboard)       | janv. 2024 → mars 2024 | Page d'accueil, inscription Clerk, dashboard, modale création réunion.  |
| i18n (6 langues)                       | avr. 2024 → juin 2024 | Système i18next, scripts de traduction, sélecteur de langue.            |
| Module visio (LiveKit + Convex)        | mai 2024 → sept. 2024 | Salle de réunion, chat, whiteboard, breakout, polls.                    |
| Module IA + outils annexes             | oct. 2024 → janv. 2025 | Assistant IA (Groq + OpenRouter en repli), export PDF.                  |
| Phase bêta + retours                   | févr. 2025 → mars 2025 | 12 testeurs, `BILAN_RETOURS_BETA.md`, ajustements UX.                   |
| Paiements Stripe                       | avr. 2025 → mai 2025  | 3 plans, upgrade/downgrade, webhook signé.                              |
| Mise en production v1                  | juin 2025             | Domaine `visioconnect.pro`, certificat Let's Encrypt, premiers clients. |
| **Audit + hardening + tests + CI/CD**  | mars 2026 → mai 2026  | Branche `chore/exam-hardening`, 14 findings corrigés, 26 tests verts.   |
| **Préparation examen (DP + Dossier)**  | mai 2026 → juin 2026  | Dossier Professionnel + Dossier Projet.                                 |

## 5.4 Risques projet et mitigations

| Risque                                    | Probabilité | Impact   | Mitigation                                                                                            |
| ----------------------------------------- | :---------: | :------: | ----------------------------------------------------------------------------------------------------- |
| Indisponibilité de LiveKit Cloud          |   Faible    |  Élevé   | Périmètre testable en local avec un container LiveKit. Plan de bascule vers self-hosted documenté.    |
| Fuite de clé API                          |   Moyenne   | Critique | `.env` ignoré par Git, validation Zod fail-fast au démarrage, `git secrets` en pre-commit (à venir).  |
| Coût Stripe explose                       |    Faible    |  Élevé   | Tarification fixe par plan (pas d'usage variable). Webhook signé pour éviter les fausses upgrades.    |
| Faille XSS dans le tableau blanc           |   Moyenne   |  Élevé   | tldraw rend en SVG/Canvas — pas d'`innerHTML`. CSP stricte côté Nginx.                                |
| Indisponibilité du VPS                     |    Faible    |  Moyen   | Sauvegarde quotidienne du volume `data` (cron + rsync vers stockage externe), runbook de redéploiement. |
| Abandon du projet par moi-même             |    Faible    |  Élevé   | Documentation complète (DP + Dossier + runbook) → un repreneur peut redémarrer en moins de 2 jours.   |

---

# 6. Spécifications fonctionnelles

## 6.1 Acteurs (UML)

```
┌─────────────────┐         ┌─────────────────┐
│   Visiteur      │         │   Utilisateur   │
│  (anonyme)      │         │  authentifié    │
└────────┬────────┘         └────────┬────────┘
         │                           │
         │ s'inscrit                 │ crée réunion / paie / IA
         │                           │
         ▼                           ▼
┌────────────────────────────────────────────┐
│              Plateforme VisiConnect        │
└────────┬───────────────────┬───────────────┘
         │                   │
         ▼                   ▼
┌────────────────┐    ┌──────────────────┐
│     Hôte       │    │  Participant     │
│  (modérateur)  │    │  (invité ou user)│
└────────────────┘    └──────────────────┘
```

- **Visiteur** : peut consulter la landing, les CGU, la documentation
  publique. Peut s'inscrire.
- **Utilisateur authentifié** : peut créer des réunions, gérer son
  abonnement, accéder au dashboard.
- **Hôte** : utilisateur authentifié qui possède une réunion. Peut la
  modérer (mute, kick, polls, breakout).
- **Participant** : invité ou utilisateur qui rejoint une réunion. Pas
  de privilège d'administration.

## 6.2 Cas d'utilisation principaux

### UC-01 — Créer une réunion

- **Préconditions** : utilisateur authentifié (Clerk), abonnement actif
  (Free, Pro ou Business).
- **Scénario nominal** :
  1. L'utilisateur clique sur _Créer une réunion_ dans le dashboard.
  2. La modale `CreateMeetingModal` s'ouvre (étape 1 : titre, mot de passe optionnel).
  3. L'utilisateur valide → étape 2 : options (caméra/micro coupés à
     l'entrée par défaut, langue de l'IA, autorisation chat invité).
  4. L'utilisateur valide → étape 3 : récapitulatif et bouton _Créer_.
  5. Côté client : appel `apiPostJson("/api/meetings/create", payload)`.
  6. Côté serveur : authentification du JWT Clerk → validation Zod →
     insertion Convex → renvoi de l'objet `meeting`.
  7. La modale ferme, le lien est copié dans le presse-papiers, un
     toast confirme la création.
- **Scénarios alternatifs** :
  - 6a. JWT invalide → 401 → l'utilisateur est redirigé vers la page de
    connexion.
  - 6b. Quota Stripe atteint (Free limité à 3 réunions actives) → 402
    → toast d'upgrade.
  - 6c. Validation Zod échoue (titre vide) → 400 → message d'erreur
    inline dans la modale.

### UC-02 — Rejoindre une réunion

- **Préconditions** : lien valide, salle non terminée.
- **Scénario nominal** :
  1. L'invité ouvre le lien `https://visioconnect.pro/meeting/<id>`.
  2. La page demande le nom (et le passcode si protégé).
  3. Côté client : appel `apiPostJson("/api/livekit/token", {roomName, identity, role})`.
  4. Côté serveur : authentification → validation Zod du roomName
     (regex `^[a-zA-Z0-9_\-:.]+$` pour empêcher injection) → émission
     d'un AccessToken LiveKit signé (TTL 4 h, identity = userId Clerk
     ou identité invitée).
  5. Le client se connecte au SFU LiveKit avec ce token, négocie
     WebRTC, rejoint la salle.
- **Scénarios alternatifs** :
  - 4a. Salle terminée (`status === "ended"`) → 410 → message _Réunion
    terminée_.
  - 4b. Passcode invalide → 403 → message d'erreur.

### UC-03 — Souscrire à un abonnement Pro

- **Préconditions** : utilisateur authentifié, sur le plan _Free_.
- **Scénario nominal** :
  1. L'utilisateur clique _Passer en Pro_ sur la page _Pricing_.
  2. Côté client : appel `apiPostJson("/api/checkout/create-session", {plan: "pro"})`.
  3. Côté serveur : auth → validation → appel
     `stripe.checkout.sessions.create()` avec le `priceId` du plan Pro
     et l'identifiant client Stripe (créé à la volée si besoin) →
     renvoi de l'URL hébergée Stripe.
  4. Le client redirige sur l'URL Stripe.
  5. Paiement réussi → Stripe redirige sur `/success` côté client.
  6. **En parallèle** : Stripe envoie un événement
     `checkout.session.completed` au webhook
     `/api/stripe/webhook` → le serveur **vérifie la signature**
     (`stripe.webhooks.constructEvent` avec le secret) → met à jour
     `users.subscriptionPlan = "pro"` dans Convex.

## 6.3 Maquettes (extraits)

> Maquettes Figma complètes disponibles dans le dossier `maquettes/`.
> Captures d'écran finales en annexe.

- **Landing-page** : héros animé (Framer Motion), grille de
  fonctionnalités, slider d'interfaces, preuves sociales, footer.
- **Dashboard** : sidebar gauche (navigation), zone centrale
  (réunions à venir, statistiques), bandeau supérieur (langue,
  notifications, profil).
- **Modale _Créer une réunion_** : 3 étapes wizard, indicateur de
  progression, bouton _Précédent_ persistant.
- **Salle de réunion** : grille vidéo redimensionnable, panneau latéral
  (chat / whiteboard / polls), barre d'outils inférieure (mute,
  caméra, partage écran, raccrocher).

---

# 7. Conception technique

## 7.1 Architecture en couches (vue d'ensemble)

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (React)                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   Pages      │  │  Components  │  │  Hooks (état & I/O)  │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────┬───────────┘  │
│         │                 │                      │             │
│         └─────────────────┼──────────────────────┘             │
│                           ▼                                    │
│              ┌────────────────────────┐                        │
│              │   apiClient.js         │ ── JWT auto (Clerk)    │
│              └─────────┬──────────────┘                        │
└────────────────────────┼───────────────────────────────────────┘
                         │ HTTPS + Bearer
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                  SERVEUR (Express + Socket.IO)                  │
│  ┌──────────────┐  → helmet → CORS allowlist → rate-limit       │
│  │ Middlewares  │  → requireAuth (Clerk) → validate (Zod)       │
│  └──────┬───────┘  → errorHandler                               │
│         │                                                       │
│         ▼                                                       │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │ Controllers  │ ─► │   Services   │ ─► │   Schémas    │      │
│  │ (HTTP layer) │    │  (métier)    │    │   (Zod)      │      │
│  └──────────────┘    └──────┬───────┘    └──────────────┘      │
│                             │                                   │
│  ┌──────────────────────────┼─────────────────────────────┐    │
│  │ services/livekit.js      │     services/email.js       │    │
│  │ services/stripe.js       │     services/ai.js          │    │
│  └──────────────────────────┼─────────────────────────────┘    │
└─────────────────────────────┼───────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────────┐   ┌──────────────────┐
│ Convex (BDD  │    │   LiveKit Cloud  │   │  Stripe / Resend │
│ temps réel)  │    │   (SFU WebRTC)   │   │  / Groq / Clerk  │
└──────────────┘    └──────────────────┘   └──────────────────┘
```

Les **5 couches** côté serveur (du haut vers le bas) :

1. **Couche transport** (`app.js`) : Express, Helmet, CORS, JSON
   parser, rate-limit, montage des routes.
2. **Couche routage** (`routes/index.js`) : agrège les routeurs par
   domaine.
3. **Couche présentation** (`controllers/`) : transforme la requête
   HTTP en appel métier. Aucun appel direct à un SDK externe.
4. **Couche métier** (`services/`) : logique pure (pas d'objet
   `req`/`res`). Réutilisable depuis Socket.IO ou des scripts.
5. **Couche infrastructure** (`config/env.js`, `lib/logger.js`) :
   configuration validée et observabilité.

> Cette séparation est **testable** par construction : les tests unitaires
> appellent directement les services sans instancier Express.

## 7.2 Choix technologiques (justifications)

| Couche               | Technologie                | Alternative envisagée    | Justification du choix retenu                                                                                       |
| -------------------- | -------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| Front-end            | React 18 + Vite 5          | Next.js 14 / Remix       | Vite = HMR rapide, build minimal. Next.js apporterait du SSR mais ajoute une complexité (App Router, RSC) non utile. |
| Style                | Tailwind CSS 3             | CSS Modules / Emotion    | Productivité, classes utilitaires, purge automatique → CSS final < 30 ko gzip.                                       |
| Animation            | Framer Motion 11           | GSAP                     | API React-first, intégration prop-by-prop, déclaratif.                                                              |
| Auth                 | Clerk                      | Auth maison + bcrypt     | Sortir l'auth du périmètre attaqué : pas de fuite de hash, MFA, OAuth fournis. Coût acceptable au volume cible.     |
| BDD temps réel        | Convex                     | Firebase / Supabase      | Schéma typé, transactions ACID, fonctions serveur déployées avec le code, pas de règles de sécurité YAML à maintenir. |
| Médiacontent WebRTC   | LiveKit Cloud              | Jitsi / mediasoup auto-hébergés | Auto-hébergement = serveur dédié 50 €/mois mini + maintenance kernel/coturn. LiveKit Cloud reste sous le budget.    |
| Paiements            | Stripe                     | Mollie / PayPal          | Webhook signé, dashboard mature, conformité PCI-DSS niveau 1, doc française.                                         |
| Emails               | Resend                     | SendGrid / Postmark      | API React Email, templates JSX réutilisables (cohérent avec mon stack).                                              |
| IA                   | Groq (Llama 3) + OpenRouter (fallback) | OpenAI direct  | Groq = inférence très rapide (≤ 600 ms p95), prix < OpenAI. OpenRouter en repli si Groq HS.                          |
| i18n                 | i18next + react-i18next    | next-intl / FormatJS     | Mature, ressources JSON simples à versionner, scripts de traduction faciles.                                          |
| Reverse-proxy         | Nginx 1.27 (alpine)        | Traefik / Caddy          | Standard de fait, ressources mémoire faibles, support WebSocket natif, certbot bien intégré.                         |
| Hébergement           | Hetzner CX22 (DE)          | OVH / Scaleway           | Meilleur rapport perf/prix UE (4 € HT/mois), datacenter Falkenstein ISO 27001.                                       |
| Conteneurisation     | Docker + Docker Compose    | Kubernetes (k3s)         | k8s sur 1 VPS = sur-ingénierie. Compose suffit jusqu'à 5 services.                                                  |

## 7.3 Diagrammes de séquence

### Séquence — Création d'une réunion

```
Client          API serveur       Clerk      Convex      LiveKit Cloud
  │                 │                │          │              │
  │── POST /api/meetings/create ───►│          │              │
  │   (Bearer JWT)   │                │          │              │
  │                 │── verifyToken ►│          │              │
  │                 │◄── userId ─────│          │              │
  │                 │── validate Zod │          │              │
  │                 │── insert ─────────────────►│              │
  │                 │◄── meeting ───────────────│              │
  │                 │── (lazy) createRoom ─────────────────────►│
  │                 │◄── room ack ─────────────────────────────│
  │◄── 201 + payload│                │          │              │
  │                 │                │          │              │
```

### Séquence — Webhook Stripe (paiement réussi)

```
Stripe              API serveur                  Convex
  │                     │                           │
  │── POST /api/stripe/webhook ──►│                  │
  │   (header Stripe-Signature)   │                  │
  │                     │── constructEvent(raw, sig) │
  │                     │   ► OK / throw 400         │
  │                     │── parse: checkout.session.completed
  │                     │── update users.subscriptionPlan ──►│
  │                     │◄── ok ────────────────────────────│
  │◄── 200 ──────────────│                           │
```

L'**utilisation du payload _raw_** est cruciale : Express doit lire le
corps brut (pas du JSON déjà parsé) pour que la signature soit
valide. C'est le rôle du middleware `express.raw({ type: "application/json" })`
appliqué uniquement à la route `/api/stripe/webhook`.

---

# 8. Modèle de données

## 8.1 Choix Convex (NoSQL réactif)

Convex est un **datastore document avec schéma typé** + **fonctions
serveur** + **temps réel par défaut**. Le schéma est défini dans
`client/convex/schema.ts` en TypeScript. Les requêtes réactives
notifient le client à chaque écriture sans gestion manuelle de
WebSocket.

## 8.2 Tables (collections)

| Table             | Rôle                                          | Index principaux                          |
| ----------------- | --------------------------------------------- | ----------------------------------------- |
| `users`           | Profil utilisateur, plan d'abonnement          | `by_email`                                |
| `meetings`        | Métadonnées d'une réunion                     | `by_host`, `by_status`                    |
| `messages`        | Messages de chat                              | `by_meeting`                              |
| `whiteboards`     | État du tableau blanc                         | `by_meeting`                              |
| `cursors`         | Positions des curseurs collaboratifs          | `by_meeting`, `by_meeting_and_user`       |
| `notifications`   | Notifications utilisateur                      | `by_user`                                 |
| `cookieConsents`  | Traces de consentement RGPD                   | `by_session`, `by_user`                   |
| `polls`           | Sondages dans une réunion                     | `by_meeting`                              |
| `breakoutRooms`   | Sous-groupes d'une réunion                    | `by_meeting` (composite avec `status`)    |

## 8.3 Schéma physique extrait

```typescript
// client/convex/schema.ts
users: defineTable({
  name: v.string(),
  email: v.string(),
  avatarUrl: v.optional(v.string()),
  role: v.union(v.literal("user"), v.literal("admin")),
  subscriptionPlan: v.union(
    v.literal("free"),
    v.literal("pro"),
    v.literal("entreprise"),
  ),
  stripeCustomerId: v.optional(v.string()),
  createdAt: v.number(),
}).index("by_email", ["email"]),

meetings: defineTable({
  title: v.string(),
  hostId: v.string(),                           // userId Clerk
  livekitRoomName: v.string(),                  // identifiant SFU LiveKit
  status: v.union(
    v.literal("waiting"),
    v.literal("active"),
    v.literal("ended"),
  ),
  isProtected: v.boolean(),
  passcode: v.optional(v.string()),
  startedAt: v.optional(v.number()),
  endedAt: v.optional(v.number()),
})
  .index("by_host", ["hostId"])
  .index("by_status", ["status"]),
```

## 8.4 Diagramme entité-relation simplifié

```
┌──────────┐ 1     n ┌──────────┐ 1     n ┌──────────┐
│  users   ├────────►│ meetings ├────────►│ messages │
└──────────┘         └────┬─────┘         └──────────┘
                          │ 1
                          ├──n► whiteboards
                          ├──n► polls
                          ├──n► breakoutRooms
                          └──n► cursors
```

Convex étant un magasin de documents, les "relations" sont implémentées
par référence d'`_id`. Les index permettent d'éviter les scans en
table.

## 8.5 Stratégie de pagination

Convex propose une pagination paginée via `paginate({ numItems: 20 })`.
Les écrans concernés :

- Liste des réunions de l'utilisateur (dashboard) : 20 par page,
  ordre antéchronologique.
- Historique des messages d'une réunion : 50 par page, ordre
  chronologique inversé (les plus récents d'abord), index
  `by_meeting`.

---

# 9. Réalisation logicielle

## 9.1 Front-end : structure

```
client/src/
├── App.jsx                    # router racine
├── index.jsx                  # bootstrap React + Clerk + Convex providers
├── pages/                     # pages routées
│   ├── HomePage.jsx
│   ├── PricingPage.jsx
│   ├── DashboardOverview.jsx
│   ├── MeetingRoom.jsx
│   ├── CheckoutPage.jsx
│   └── SuccessPage.jsx
├── components/                # composants réutilisables
│   ├── HeroConferenceDemo.jsx
│   ├── FeaturesCarousel3D.jsx
│   ├── InterfaceSlider.jsx
│   ├── CreateMeetingModal.jsx
│   ├── AIChatbot.jsx
│   └── (~50 composants)
├── hooks/                     # logique d'état + I/O
│   ├── useMeeting.js
│   ├── useSubscription.js
│   ├── useFormPersistence.js
│   └── …
├── lib/
│   └── apiClient.js           # apiFetch + apiPostJson + Bearer auto
├── i18n/
│   ├── i18n.js                # configuration i18next
│   └── locales/{fr,en,es,it,pt,ca}/translation.json
└── services/                  # appels Convex / Stripe / IA / médias
```

### Extrait — `apiClient.js` (transport unifié)

```javascript
// client/src/lib/apiClient.js
const BASE = import.meta.env.VITE_API_BASE_URL || "";

async function getAuthHeader() {
  // Récupère le JWT Clerk depuis la session courante
  const token = await window.Clerk?.session?.getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function apiFetch(path, init = {}) {
  const auth = await getAuthHeader();
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { ...auth, ...(init.headers || {}) },
    credentials: "include",
  });
  if (!res.ok) throw new ApiError(res.status, await res.text());
  return res;
}

export async function apiPostJson(path, body, init = {}) {
  return apiFetch(path, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json", ...(init.headers || {}) },
  });
}
```

> **Pourquoi cet helper ?** Avant le refactor, 11 call-sites
> appelaient `fetch` directement, parfois sans header
> `Authorization`, parfois avec une URL en dur. La centralisation
> élimine la classe entière de bugs _"j'ai oublié le token"_ et permet
> d'ajouter retries / tracing / instrumentation à un seul endroit.

## 9.2 Back-end : structure en couches

```
server/src/
├── server.js                  # entry point + dotenv + graceful shutdown
├── app.js                     # factory Express (testable)
├── config/
│   └── env.js                 # validation Zod fail-fast
├── lib/
│   └── logger.js              # Pino + redact PII
├── middleware/
│   ├── cors.js                # allowlist (regex *.vercel.app + visioconnect.pro)
│   ├── requireAuth.js         # vérification JWT Clerk via @clerk/backend
│   ├── rateLimit.js           # 3 profils : global / token / email
│   ├── validate.js            # helper Zod générique
│   └── errorHandler.js        # JSON sans stack trace en prod
├── schemas/
│   └── index.js               # schémas Zod centralisés
├── services/
│   ├── livekitService.js      # issueAccessToken() — TTL 4 h
│   ├── emailService.js        # Resend wrapper, masque les emails dans les logs
│   ├── stripeService.js       # createCheckoutSession + verifyWebhook
│   └── aiService.js           # Groq primaire → OpenRouter fallback
├── controllers/
│   ├── livekitController.js
│   ├── stripeController.js
│   ├── emailController.js
│   ├── aiController.js
│   ├── userController.js
│   └── healthController.js
├── socket/
│   └── index.js               # Socket.IO + middleware d'auth handshake
└── routes/
    └── index.js               # Express Router agrégateur
```

### Extrait — `config/env.js` (validation fail-fast)

```javascript
import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(5099),
  ALLOWED_ORIGINS: z.string().min(1),
  CLERK_SECRET_KEY: z.string().startsWith("sk_"),
  LIVEKIT_API_KEY: z.string().min(1),
  LIVEKIT_API_SECRET: z.string().min(1),
  LIVEKIT_URL: z.string().url(),
  STRIPE_SECRET_KEY: z.string().startsWith("sk_"),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith("whsec_"),
  RESEND_API_KEY: z.string().startsWith("re_").optional(),
  GROQ_API_KEY: z.string().min(1).optional(),
  OPENROUTER_API_KEY: z.string().min(1).optional(),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]).default("info"),
});

const parsed = schema.safeParse(process.env);
if (!parsed.success) {
  // eslint-disable-next-line no-console
  console.error("❌ Invalid environment variables:", parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
```

### Extrait — `services/livekitService.js` (cœur métier visio)

```javascript
import { AccessToken } from "livekit-server-sdk";
import { env } from "../config/env.js";

const TTL_SECONDS = 4 * 60 * 60; // 4 h

export function issueAccessToken({ userId, roomName, role = "participant", name }) {
  if (!userId) {
    throw new Error("issueAccessToken: userId requis");
  }
  const at = new AccessToken(env.LIVEKIT_API_KEY, env.LIVEKIT_API_SECRET, {
    identity: userId,             // identité = userId Clerk (non-spoofable)
    name,                         // pseudo affiché
    ttl: TTL_SECONDS,
  });
  at.addGrant({
    roomJoin: true,
    room: roomName,
    canPublish: true,
    canSubscribe: true,
    roomAdmin: role === "host",   // privilèges modération réservés à l'hôte
  });
  return at.toJwt();
}
```

> **Décisions clefs** :
> - `identity = userId` (pas `email`) : impossibilité d'usurper l'identité
>   d'un autre utilisateur.
> - `roomAdmin` réservé à `role === "host"` : un participant ne peut pas
>   couper le micro des autres.
> - TTL borné à 4 h : si le token fuit, sa fenêtre d'utilisation est
>   limitée.

### Extrait — `middleware/requireAuth.js`

```javascript
import { verifyToken } from "@clerk/backend";
import { env } from "../config/env.js";
import { logger } from "../lib/logger.js";

export async function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "missing_bearer" });
  }
  try {
    const payload = await verifyToken(header.slice(7), {
      secretKey: env.CLERK_SECRET_KEY,
    });
    req.session = { userId: payload.sub, claims: payload };
    next();
  } catch (err) {
    logger.warn({ err: err.message }, "auth_invalid_token");
    res.status(401).json({ error: "invalid_token" });
  }
}
```

## 9.3 Module visioconférence (LiveKit + Convex + Socket.IO)

Le module visio combine **trois canaux** :

1. **Médiacontent** (audio + vidéo + partage écran) : LiveKit Cloud,
   protocole WebRTC via SFU. Le client VisiConnect ne voit jamais les
   flux directement, il négocie avec le SFU une fois le token validé.
2. **État partagé persistant** (chat, whiteboard, polls, breakout) :
   Convex. Les composants React s'abonnent aux requêtes Convex et
   re-render dès qu'une mutation a lieu.
3. **Présence et signaux éphémères** (cursor moves, typing, raise
   hand) : Socket.IO côté serveur Express. Les événements ne sont pas
   persistés.

### Extrait — `socket/index.js` (auth handshake)

```javascript
import { Server } from "socket.io";
import { verifyToken } from "@clerk/backend";
import { env } from "../config/env.js";

export function attachSocketIo(httpServer) {
  const io = new Server(httpServer, {
    cors: { origin: env.ALLOWED_ORIGINS.split(","), credentials: true },
  });

  io.use(async (socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("unauthorized"));
    try {
      const payload = await verifyToken(token, { secretKey: env.CLERK_SECRET_KEY });
      socket.data.userId = payload.sub;
      socket.data.joinedRooms = new Set();
      next();
    } catch {
      next(new Error("unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    socket.on("join-room", (roomId) => {
      // L'autorisation effective de rejoindre est vérifiée côté Convex
      socket.join(roomId);
      socket.data.joinedRooms.add(roomId);
    });
    // … cursor, typing, raise-hand
  });
  return io;
}
```

> Avant le refactor, le serveur acceptait `socket.on("join-room", ({user, roomId}) => …)`
> en faisant confiance au `user` envoyé par le client. C'est une faille
> classique d'authentification (CWE-287). Désormais l'identité est dérivée
> du JWT validé au handshake.

## 9.4 Module paiements Stripe

### Webhook signé (extrait `stripeController.js`)

```javascript
export async function postStripeWebhook(req, res) {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripeService.verifyWebhook(req.body, sig);
  } catch (err) {
    logger.warn({ err: err.message }, "stripe_webhook_signature_invalid");
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed":
      await stripeService.handleCheckoutCompleted(event.data.object);
      break;
    case "customer.subscription.deleted":
      await stripeService.handleSubscriptionDeleted(event.data.object);
      break;
  }
  res.json({ received: true });
}
```

Le `req.body` est ici un `Buffer` (pas un objet JSON), grâce à
`express.raw({ type: "application/json" })` monté **avant** la route et
**uniquement** pour cette route. Le `express.json()` global est monté
après.

## 9.5 Internationalisation

Configuration `i18next` avec détection automatique du navigateur :

```javascript
// client/src/i18n/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import fr from "./locales/fr/translation.json";
import en from "./locales/en/translation.json";
// … es, it, pt, ca

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { fr: { translation: fr }, en: { translation: en } /* … */ },
    fallbackLng: "fr",
    supportedLngs: ["fr", "en", "es", "it", "pt", "ca"],
    detection: { order: ["querystring", "localStorage", "navigator"], caches: ["localStorage"] },
    interpolation: { escapeValue: false }, // React échappe déjà
  });
```

Les fichiers JSON sont éditables sans recompiler. Plusieurs scripts
d'aide à la traduction sont fournis dans `client/scripts/` pour
synchroniser les clés entre langues (`add_room_i18n.js`,
`fix_catalan_mixed.js`, etc.).

---

# 10. Tests et qualité

## 10.1 Stratégie de tests

> Pyramide adaptée à un projet solo : peu de tests E2E (coûteux),
> beaucoup de tests d'unité (rapides), un noyau de tests d'intégration
> ciblant les middlewares de sécurité.

| Niveau                     | Outil                       | Couverture cible                               |
| -------------------------- | --------------------------- | ---------------------------------------------- |
| Tests unitaires (services) | Vitest                      | `livekitService`, schémas Zod                  |
| Tests d'intégration HTTP   | Vitest + Supertest          | Auth Clerk, CORS allowlist, routes santé       |
| Tests manuels              | Bêta-testeurs (12 personnes) | Parcours utilisateur complets, multi-navigateur |
| Lint statique              | ESLint flat config + Prettier | 100 % des fichiers .js/.jsx                  |
| Audit dépendances          | `npm audit --audit-level=high` | À chaque pipeline CI                        |

## 10.2 Suite Vitest+Supertest livrée

26 tests verts, exécutés en ~600 ms, organisés en 5 fichiers :

| Fichier                       | Tests | Vérifie                                                                                            |
| ----------------------------- | ----: | -------------------------------------------------------------------------------------------------- |
| `tests/auth.test.js`          |     4 | 401 sans header, 401 Bearer mal formé, 401 token invalide, 401 sur `/api/user/profile`             |
| `tests/cors.test.js`          |     3 | Allow-Origin pour origine listée, refus origine inconnue, OPTIONS 204 (preflight)                  |
| `tests/health.test.js`        |     3 | `/health` 200, `/api/health` (`nodeEnv === "test"`), 404 sur route inconnue                        |
| `tests/schemas.test.js`       |    11 | livekitTokenSchema (regex, longueur), emailSchema, aiChatSchema (min 1, max 30), checkoutSchema    |
| `tests/livekitService.test.js` |     5 | userId requis, JWT 3-parts, identity = sub = userId, roomAdmin host only, TTL ±5 s                  |

### Extrait — `tests/livekitService.test.js`

```javascript
import { describe, it, expect } from "vitest";
import { decodeJwt } from "jose";
import { issueAccessToken } from "../src/services/livekitService.js";

describe("livekitService", () => {
  it("rejette une demande sans userId", () => {
    expect(() => issueAccessToken({ roomName: "r1" })).toThrow(/userId/);
  });

  it("émet un JWT à 3 segments dont l'identité est le userId", async () => {
    const token = await issueAccessToken({ userId: "user_123", roomName: "r1" });
    expect(token.split(".")).toHaveLength(3);
    const payload = decodeJwt(token);
    expect(payload.sub).toBe("user_123");
  });

  it("accorde roomAdmin uniquement à l'hôte", async () => {
    const hostToken = await issueAccessToken({ userId: "u1", roomName: "r1", role: "host" });
    const guestToken = await issueAccessToken({ userId: "u2", roomName: "r1", role: "participant" });
    expect(decodeJwt(hostToken).video.roomAdmin).toBe(true);
    expect(decodeJwt(guestToken).video.roomAdmin).toBeFalsy();
  });
});
```

### Sortie de `npm test`

```
 ✓ tests/auth.test.js (4 tests) 142 ms
 ✓ tests/cors.test.js (3 tests) 78 ms
 ✓ tests/health.test.js (3 tests) 64 ms
 ✓ tests/schemas.test.js (11 tests) 31 ms
 ✓ tests/livekitService.test.js (5 tests) 89 ms

 Test Files  5 passed (5)
      Tests  26 passed (26)
   Duration  613 ms
```

## 10.3 Pipeline CI/CD GitHub Actions

`.github/workflows/ci.yml` — 5 jobs en parallèle :

```yaml
on:
  push:
    branches: [main, 'chore/**', 'feat/**', 'fix/**']
  pull_request:
    branches: [main]

jobs:
  lint:           # ESLint flat config sur tout le repo
  format:         # Prettier --check
  test-server:    # cd server && npm test
  build-client:   # cd client && npm run build (Vite)
  audit:          # npm audit --audit-level=high (continue-on-error)
```

Cache `npm` activé sur les **trois** lockfiles (root / client /
server). Durée moyenne d'un run complet : **~3 min**.

## 10.4 Outillage qualité local

- `eslint.config.js` (flat) : strict pour `server/`, permissif pour le
  client (legacy code) avec `no-undef` en warn et
  `react/no-unescaped-entities` désactivé.
- `.prettierrc.json` + `.prettierignore` : formatage automatique au
  save (VS Code) et au commit (lint-staged).
- `husky` + `lint-staged` : hook pre-commit qui exécute
  `eslint --fix` + `prettier --write` sur les fichiers stagés. Empêche
  de committer du code mal formé.
- `npm audit --audit-level=high` : exécuté en CI et en local
  (`npm run audit:high`).

---

# 11. Mise en œuvre de la qualité et de la sécurité

> **Cette section reprend et synthétise** le contenu des documents
> internes `dossiers/00_AUDIT_INITIAL.md` et `dossiers/01_MISE_A_NIVEAU.md`,
> qui retracent l'audit OWASP et les corrections apportées.

## 11.1 Démarche

J'ai mené un **audit OWASP Top 10 (2021) + REAC CDA (CP3, CP6, CP7,
CP8, CP9, CP10, CP11) + RGPD (art. 5, 25, 32)** sur la base de code
existante au début de l'année 2026. L'audit a produit **14 findings**
classés par sévérité (4 critiques, 5 élevés, 5 modérés). Tous les
findings critiques et élevés ont été corrigés sur la branche
`chore/exam-hardening`, avec preuves de tests automatisés.

## 11.2 Synthèse des findings

| ID    | Finding                                              | Sévérité     | Mapping OWASP / CWE             | Statut     |
| ----- | ---------------------------------------------------- | ------------ | ------------------------------- | ---------- |
| F-01  | Émission de tokens LiveKit sans authentification     | 🔴 Critique  | A01 BAC / CWE-862               | Corrigé    |
| F-04  | Clé API Resend hardcodée dans 4 fichiers committés    | 🔴 Critique  | A02 / CWE-798                   | Corrigé    |
| F-05  | Spoofing d'identité via header `x-user-email`         | 🔴 Critique  | A07 / CWE-287                   | Corrigé    |
| F-06  | Absence de validation des entrées (Zod)               | 🔴 Critique  | A03 / CWE-20                    | Corrigé    |
| F-02  | CORS wildcard `*`                                     | 🟠 Élevée    | A05 / CWE-942                   | Corrigé    |
| F-03  | Absence de rate-limit                                 | 🟠 Élevée    | A04 / CWE-770                   | Corrigé    |
| F-07  | Stack traces fuite en prod                            | 🟠 Élevée    | A05 / CWE-209                   | Corrigé    |
| F-08  | Webhook Stripe sans vérification de signature         | 🟠 Élevée    | A08 / CWE-345                   | Corrigé    |
| F-09  | Logs en clair (PII utilisateur)                       | 🟠 Élevée    | RGPD art. 32                    | Corrigé    |
| F-10  | Aucun test automatisé                                 | 🟡 Modérée   | CDA CP9                         | Corrigé    |
| F-11  | Aucune CI/CD                                          | 🟡 Modérée   | CDA CP9                         | Corrigé    |
| F-12  | Pas de Helmet (CSP / HSTS / X-Frame-Options absents)  | 🟡 Modérée   | A05                             | Corrigé    |
| F-13  | Mock LiveKit silencieux (`fail open`)                 | 🟡 Modérée   | CWE-754                         | Corrigé    |
| F-14  | Backend 100 % serverless (CDA CP10 mal couvert)       | 🟡 Modérée   | CDA CP10                        | Corrigé    |

## 11.3 Mesures de sécurité applicative implémentées

### Authentification systématique
- JWT Clerk vérifié par `@clerk/backend` sur **chaque** route
  authentifiée (Express + Vercel Functions + Socket.IO handshake).
- Identité dérivée du `sub` du JWT, jamais d'un header client.

### Validation systématique
- Schémas Zod centralisés dans `server/src/schemas/index.js`.
- Helper générique `validate(req, schema)` dans
  `middleware/validate.js`.
- Cas concret : la regex `^[a-zA-Z0-9_\-:.]+$` sur `roomName` empêche
  une injection de caractères de contrôle ou d'espaces dans le token
  LiveKit.

### Rate-limit
- 3 profils différenciés via `express-rate-limit` :
  - `globalLimiter` : 300 req / 15 min / IP (toutes routes).
  - `tokenLimiter` : 10 req / min / IP (endpoint `/livekit/token`,
    le plus sensible).
  - `emailLimiter` : 5 req / heure / IP (endpoints d'envoi d'emails,
    pour bloquer le spam transactionnel).

### Headers de sécurité
- `helmet` activé : CSP, HSTS, X-Frame-Options, X-Content-Type-Options,
  Referrer-Policy.
- HSTS également en niveau Nginx (`max-age=63072000; includeSubDomains; preload`).

### Webhook signé
- Vérification stricte de la signature Stripe via
  `stripe.webhooks.constructEvent(rawBody, sig, secret)`. En cas
  d'échec : 400 et log warn avec corrélation IP.

### Journalisation conforme RGPD
- Logger `pino` avec **redact** sur les chemins `req.headers.authorization`,
  `req.body.password`, `req.body.email` (remplacés par `[Redacted]`).
- Helper `maskEmail("contact@visioconnect.pro")` → `c***@v******.pro`
  pour les logs métier où il faut tracer un identifiant approximatif.

### Secrets
- `.env` ignoré par Git, validé au démarrage par `config/env.js` :
  fail-fast si une variable obligatoire manque ou est mal formée.
- `git secrets` + revue manuelle avant commit (procédure documentée
  dans le runbook).

## 11.4 Mesures de sécurité d'infrastructure

| Mesure                      | Mise en œuvre                                                                            |
| --------------------------- | ----------------------------------------------------------------------------------------- |
| Pare-feu OS                 | UFW : ports 22 (SSH) / 80 (HTTP redir) / 443 (HTTPS) seuls ouverts.                        |
| Bruteforce SSH              | `fail2ban` activé (jail `sshd`).                                                          |
| Accès SSH                    | Authentification par clé uniquement, root login désactivé, utilisateur applicatif `deploy`. |
| Chiffrement transport        | TLS 1.3 via Let's Encrypt (renouvellement automatique certbot).                            |
| Image Docker                | Multi-stage `node:20-alpine`, utilisateur non-root `app`, HEALTHCHECK intégré.             |
| Surface d'attaque conteneur  | `.dockerignore` exhaustif (pas de `.git`, pas de `node_modules` source).                   |
| Mises à jour OS              | `unattended-upgrades` configuré (security only).                                           |
| Sauvegardes                  | Cron quotidien `rsync` du volume `data/` vers stockage externe + rétention 14 jours.       |

---

# 12. Déploiement

## 12.1 Vue d'ensemble

```
                  ┌─────────────────────┐
                  │   Cloudflare DNS    │
                  │ visioconnect.pro    │
                  │ api.visioconnect.pro│
                  └──────────┬──────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │   Vercel (front)    │
                  │ visioconnect.pro    │ ← build statique Vite
                  └──────────┬──────────┘
                             │ XHR
                             ▼
            ┌─────────────────────────────┐
            │   Hetzner CX22 (Falkenstein) │
            │  Nginx 1.27 (TLS 1.3)        │
            │  ↓                           │
            │  Docker Compose              │
            │   ├─ api (Node 20 + Express) │
            │   └─ nginx (reverse-proxy)   │
            └──────────┬───────────────────┘
                       │
        ┌──────────────┼──────────────┬───────────────┐
        ▼              ▼              ▼               ▼
   LiveKit Cloud   Convex Cloud   Stripe API     Resend / Groq
   (SFU EU)        (BDD)          (UE)            (UE)
```

## 12.2 Conteneurisation

### `Dockerfile` (multi-stage, non-root)

```dockerfile
# Stage 1 — install deps with build tools
FROM node:20-alpine AS deps
WORKDIR /app
COPY server/package*.json ./
RUN apk add --no-cache python3 make g++ \
 && npm ci --omit=dev --no-audit --no-fund \
 && apk del python3 make g++

# Stage 2 — runtime, non-root
FROM node:20-alpine AS runtime
WORKDIR /app
RUN addgroup -S app && adduser -S app -G app
COPY --from=deps --chown=app:app /app/node_modules ./node_modules
COPY --chown=app:app server/src ./src
COPY --chown=app:app server/package.json ./

USER app
EXPOSE 5099
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:5099/health || exit 1

CMD ["node", "src/server.js"]
```

### `docker-compose.yml`

```yaml
services:
  api:
    build: .
    container_name: visiconnect-api
    restart: unless-stopped
    env_file: .env
    networks: [visiconnect]

  nginx:
    image: nginx:1.27-alpine
    container_name: visiconnect-nginx
    restart: unless-stopped
    depends_on: [api]
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./infra/deploy/nginx.conf:/etc/nginx/conf.d/default.conf:ro
      - /etc/letsencrypt:/etc/letsencrypt:ro
    networks: [visiconnect]

networks:
  visiconnect:
    driver: bridge
```

## 12.3 Reverse-proxy Nginx (extrait HTTPS + WebSocket)

```nginx
server {
  listen 443 ssl http2;
  server_name api.visioconnect.pro;

  ssl_certificate     /etc/letsencrypt/live/api.visioconnect.pro/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/api.visioconnect.pro/privkey.pem;
  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_prefer_server_ciphers off;
  add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;

  location / {
    proxy_pass http://api:5099;
    proxy_http_version 1.1;
    proxy_set_header Upgrade        $http_upgrade;
    proxy_set_header Connection     "upgrade";
    proxy_set_header Host           $host;
    proxy_set_header X-Real-IP      $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

> **`proxy_set_header Upgrade` + `Connection "upgrade"`** indispensables
> pour Socket.IO (mode `websocket`).

## 12.4 Procédure de déploiement (synthèse)

> Procédure complète versionnée dans
> [infra/deploy/runbook.md](../infra/deploy/runbook.md).

1. **Pre-vol** : `git pull` sur `main`, vérifier que CI verte.
2. **Sur le serveur (utilisateur `deploy`)** :
   ```bash
   cd /home/deploy/visiconnect
   git fetch origin && git checkout main && git pull
   docker compose pull          # si registry distant
   docker compose build --pull  # sinon build local
   docker compose up -d --remove-orphans
   docker compose logs -f --tail=50 api
   ```
3. **Vérification fonctionnelle** : `curl https://api.visioconnect.pro/health`
   → `{"status":"ok"}`.
4. **Rollback** (si nécessaire) :
   ```bash
   git checkout <sha-précédent>
   docker compose up -d --build
   ```
5. **Post-déploiement** : surveiller les logs Pino pendant 10 min,
   vérifier l'absence de spike `error`.

## 12.5 Sauvegardes et plan de reprise

- **Volumétrie** : la BDD principale est Convex (managé). Le serveur
  Hetzner ne stocke que des logs et un éventuel volume `data/`
  applicatif (configurations runtime).
- **Sauvegarde quotidienne** : cron 03:00 → snapshot Hetzner +
  rsync chiffré du volume `data/` vers un stockage externe (Backblaze
  B2, ~0,005 €/Go/mois).
- **Durée de rétention** : 14 jours.
- **Procédure de reprise** : provisionner un nouveau VPS Hetzner CX22,
  appliquer le runbook `infra/deploy/runbook.md` (durcissement →
  Docker → Compose → restore volume `data/` depuis B2). RTO estimé :
  **~ 30 min**.

---

# 13. Veille technologique et sécurité

## 13.1 Sources suivies

| Source                             | Fréquence       | Type d'information               |
| ---------------------------------- | --------------- | -------------------------------- |
| **OWASP Top 10**                    | Tous les 3 ans  | Vulnérabilités web majeures      |
| **CVE Details / GitHub Advisories** | Hebdomadaire    | Failles dans les dépendances     |
| **The Hacker News**                 | Quotidienne     | Actualité cybersécurité          |
| **Risky Business**                  | Hebdomadaire    | Podcast — analyse géopolitique   |
| **Mozilla Security Blog**           | Bimensuel       | Nouveautés navigateurs / WebRTC  |
| **CNIL (newsletter)**               | Mensuel         | Droit du numérique français      |
| **EFF (Electronic Frontier Foundation)** | Bimensuel  | Droits numériques                |
| **Stripe Engineering Blog**         | Mensuel         | Sécurité paiement                |
| **LiveKit Changelog**                | Push GitHub     | Mises à jour SDK WebRTC          |
| **Clerk Docs / Changelog**           | Push GitHub     | Évolutions SDK auth              |

## 13.2 Application concrète (exemple — incident clé Resend)

**Constat** (mars 2026, audit interne) : la clé API Resend
`re_f7CXkPZ1_FouifSQZycKkbcStAoZkGgW8` était hardcodée dans 4 fichiers
committés sur GitHub. Mapping CWE-798 _Use of Hard-coded Credentials_,
classifié 🔴 Critique.

**Réaction**:

1. Documentation immédiate du finding dans
   `dossiers/00_AUDIT_INITIAL.md` — section F-04.
2. **Action manuelle** : révocation de la clé dans le dashboard
   Resend.
3. **Correction code** : suppression des 4 occurrences, migration vers
   `process.env.RESEND_API_KEY` strict (sans fallback en clair).
4. **Validation** : ajout de `RESEND_API_KEY` dans `config/env.js`
   (Zod `z.string().startsWith("re_")`) → si absente, le serveur ne
   démarre pas.
5. **Prévention** : ajout du pattern `re_*` à la liste de motifs de
   `git secrets` (à venir).

Cet incident est cité tel quel dans la **section 11** comme exemple
concret de veille de sécurité aboutissant à un correctif immédiat.

## 13.3 Veille technologique (hors sécurité)

- **WebRTC** : évolution des codecs (AV1, VP9), suivi des
  recommandations IETF.
- **React** : passage de React 18 → 19 envisagé pour la v2 (Server
  Components évalués mais reportés car CSR suffit).
- **Convex** : suivi des nouveautés (full-text search natif,
  sharding).
- **Vite** : suivi des releases majeures.

---

# 14. Maintenance et exploitation

## 14.1 Niveaux de maintenance assurés

| Type                             | Description                                                                              | Fréquence cible      |
| -------------------------------- | ---------------------------------------------------------------------------------------- | -------------------- |
| **Maintenance corrective**       | Correction des bugs signalés (issues GitHub).                                            | Hebdomadaire.        |
| **Maintenance préventive**       | Mise à jour des dépendances (`npm outdated`, Renovate à venir).                          | Mensuelle.           |
| **Maintenance évolutive**        | Nouvelles fonctionnalités (roadmap publique GitHub Projects).                            | Trimestrielle.       |
| **Maintenance sécurité**         | Application des patches CVE (`npm audit fix`), revue OWASP annuelle.                     | Continu + annuel.    |
| **Maintenance d'infrastructure** | `apt upgrade` Ubuntu, renouvellement Let's Encrypt (automatique), rotation des secrets.  | Mensuelle / annuelle. |

## 14.2 Observabilité

- **Logs applicatifs** : Pino, format JSON, niveau configurable via
  `LOG_LEVEL`. Stockés dans le volume Docker, rotation par
  `logrotate`.
- **Logs Nginx** : `access.log` + `error.log`, rotation `logrotate`
  hebdomadaire (compression gzip, rétention 30 jours).
- **Métriques système** : Hetzner Cloud Console (CPU, RAM, réseau,
  disque) — alerting automatique si CPU > 80 % pendant 10 min.
- **Healthcheck** : route `/health` interrogée toutes les 30 s par le
  HEALTHCHECK Docker. Si KO 3 fois → conteneur marqué unhealthy.

## 14.3 Procédure de gestion d'incident

1. **Détection** : alerte Hetzner ou erreur signalée (utilisateur,
   monitoring, log).
2. **Triage** : niveau de sévérité (P1 — service en panne / P2 —
   dégradation / P3 — anomalie isolée).
3. **Communication** : si P1, message sur la page de statut
   (à venir — `status.visioconnect.pro`).
4. **Résolution** : application du runbook (rollback si récent
   déploiement ; sinon investigation logs + correctif chaud).
5. **Post-mortem** : pour tout P1, rédaction d'un post-mortem dans
   `docs/postmortems/AAAA-MM-JJ-titre.md` (cause racine, leçons
   apprises, action correctrice).

---

# 15. Conformité (RGPD, accessibilité)

## 15.1 RGPD

### 15.1.1 Responsable de traitement

VisiConnect est un projet personnel. Pour la phase de bêta et la mise
en ligne sous personne physique, **Théo GARCES** est responsable de
traitement au sens de l'article 4(7) du RGPD. La transformation en
structure juridique (auto-entreprise / SASU) est planifiée pour
**post-examen** en cas de poursuite du projet.

### 15.1.2 Bases légales

| Traitement                          | Base légale (art. 6)             |
| ----------------------------------- | -------------------------------- |
| Création de compte (email, nom)     | Exécution du contrat (1.b)       |
| Abonnement payant                   | Exécution du contrat (1.b)       |
| Cookies analytiques                 | Consentement (1.a) — bandeau     |
| Cookies marketing                   | Consentement (1.a) — bandeau     |
| Logs techniques (IP, user-agent)    | Intérêt légitime (1.f)           |
| Communications transactionnelles    | Exécution du contrat (1.b)       |

### 15.1.3 Sous-traitants documentés (article 28)

| Sous-traitant       | Rôle                       | Localisation des données    | Engagement RGPD              |
| ------------------- | -------------------------- | --------------------------- | ---------------------------- |
| Hetzner Online GmbH | VPS                        | Falkenstein (DE)            | DPA disponible, certif. ISO 27001 |
| Cloudflare          | DNS                        | Globale (entry EU)          | DPA + SCC                    |
| Vercel              | Hébergement front          | UE (région auto)            | DPA standard                 |
| LiveKit Inc.        | SFU média                  | Région EU configurée        | DPA + SCC (Schrems II)       |
| Convex              | Base de données            | Configurable EU             | DPA disponible               |
| Stripe Payments Europe Ltd | Paiements           | UE (Irlande)                | DPA + PCI-DSS niveau 1       |
| Resend Inc.         | Emails transactionnels     | UE (configurable)           | DPA + SCC                    |
| Clerk Inc.          | Identité utilisateur       | UE                          | DPA + SCC                    |
| Groq                | IA (notes de réunion)      | US (clause SCC + redaction) | SCC, données minimisées       |
| OpenRouter          | IA (fallback)              | US                          | SCC, données minimisées       |

### 15.1.4 Mesures techniques (art. 32)

- **Chiffrement en transit** : TLS 1.2+/1.3 sur toutes les
  communications.
- **Chiffrement au repos** : géré par les sous-traitants (Convex,
  Hetzner block storage chiffré).
- **Pseudonymisation** : `identity = userId Clerk` (opaque) plutôt que
  `email` dans les tokens et les logs.
- **Minimisation** : pas de stockage des messages chat plus de 30 jours
  (purge automatique cron à venir).
- **Journalisation** : Pino + redact sur les champs PII.

### 15.1.5 Droits des personnes

Une page **/privacy** liste les droits :

- Accès (export JSON via dashboard).
- Rectification (édition profil dashboard).
- Effacement (bouton _Supprimer mon compte_ → déclenche cascade
  Convex + Stripe + Clerk).
- Portabilité (export JSON).
- Opposition / limitation (formulaire de contact).

### 15.1.6 Registre des traitements

Tenu dans `docs/rgpd/registre.md` (gabarit CNIL). Mis à jour à chaque
nouvelle fonctionnalité touchant des données personnelles.

## 15.2 Accessibilité (WCAG 2.1 niveau AA)

### Mesures implémentées

- **Contrastes** vérifiés via Lighthouse → score Accessibilité ≥ 95.
- **Hiérarchie sémantique** : un seul `<h1>` par page, ordre des
  titres respecté.
- **Navigation clavier** : focus visible, `tabindex` cohérent, modales
  piégeant le focus avec `react-focus-lock`.
- **Lecteurs d'écran** : `aria-label` sur tous les boutons icône,
  `aria-live` sur les notifications.
- **Mouvement** : `prefers-reduced-motion` respecté → animations
  Framer Motion désactivées si l'utilisateur le préfère.
- **Multilinguisme** : attribut `lang` du `<html>` mis à jour
  dynamiquement par i18next.

### Limites connues (à corriger v1.1)

- Le tableau blanc (tldraw) n'est pas encore pleinement accessible au
  lecteur d'écran (limitation upstream).
- L'écran de création de réunion ne dispose pas encore de raccourcis
  clavier de navigation entre les étapes (Esc, Ctrl+Enter).

---

# 16. Bilan personnel et perspectives

## 16.1 Ce que j'ai appris

**Sur le plan technique** :

- La **différence entre faire fonctionner** un produit et le **rendre
  professionnel**. Le code de janvier 2024 _fonctionnait_ : on pouvait
  s'inscrire, créer une réunion, parler, payer. Mais il n'aurait pas
  passé une revue de sécurité d'entreprise. L'audit OWASP m'a fait
  passer du **mode hobbyiste** au **mode ingénieur** : test, validation
  Zod, rate-limit, headers, CSP, redact PII, webhook signé, identité
  vérifiée.
- **L'architecture en couches n'est pas une formalité scolaire**.
  Avant, mon serveur était un fichier `simple-server-no-db.js` de
  614 lignes. Refactor en `app.js` / `routes/` / `controllers/` /
  `services/` / `schemas/` / `lib/` : le code est testable, lisible,
  réutilisable depuis Socket.IO, et — surprise pédagogique — **plus
  court** au final (~30 % de lignes en moins après suppression des
  duplications).
- **Le déploiement reproductible change tout**. Avant Docker, je
  faisais `pm2 start src/server.js` sur le VPS et je priais. Avec
  `docker compose up -d`, le déploiement est idempotent, rollbackable
  en 30 s, documenté dans un runbook qu'un repreneur pourrait
  appliquer sans moi.
- **Tests automatisés** : 26 tests verts ne semblent pas grand-chose,
  mais ils couvrent **les invariants critiques** (auth, CORS, schémas,
  émission de tokens). Le _coût marginal_ d'une régression est
  désormais nul : la CI échoue avant le merge.

**Sur le plan méthodologique** :

- **Le Kanban + Conventional Commits** suffit pour un solo. Inutile de
  forcer Scrum.
- **La documentation est un livrable**, pas un sous-produit. Le DP, le
  Dossier Projet, l'audit, la mise à niveau, le runbook : ces 5
  documents constituent ~150 pages que je suis fier de présenter.
- **L'audit a été le déclic**. C'est en faisant l'inventaire ouvert
  des findings que j'ai compris qu'un projet "fini" peut être
  simultanément _en marche_ et _disqualifiant_. Cette tension entre
  les deux est exactement le métier de concepteur-développeur.

## 16.2 Ce que je referais différemment

- **Tests dès le jour 1**, pas à la fin. La rétro-couverture coûte
  cher en effort mental.
- **Schéma Convex versionné depuis le départ**, plutôt qu'introduit
  après plusieurs fonctionnalités.
- **Conventional Commits dès le 1er commit** plutôt qu'à partir de la
  phase de hardening.
- **`.env.example` dès le 1er commit** plutôt que des secrets en
  clair "temporairement".

## 16.3 Perspectives v2

- **Enregistrement serveur** des appels (avec consentement explicite
  RGPD).
- **Application mobile native** (React Native ou Capacitor).
- **Streaming RTMP** vers YouTube/Twitch pour les webinars.
- **Sous-titrage temps réel** par IA (Whisper ou équivalent).
- **Tableau de bord analytics** pour les organisateurs (durée moyenne,
  taux de prise de parole, sentiment).

---

# 17. Bibliographie / sitographie

## Référentiels et normes

- **REAC du titre Concepteur Développeur d'Applications** (RNCP37873) — France Compétences, arrêté du 22/12/2022.
- **OWASP Top 10 — 2021**. <https://owasp.org/Top10/>
- **CWE Top 25**. <https://cwe.mitre.org/top25/>
- **WCAG 2.1**. <https://www.w3.org/TR/WCAG21/>
- **RGPD** — Règlement (UE) 2016/679. <https://eur-lex.europa.eu/eli/reg/2016/679/oj>
- **Recommandations CNIL — cookies et traceurs** (octobre 2020).

## Documentation technique consultée

- **React 18** — <https://react.dev>
- **Vite 5** — <https://vitejs.dev>
- **Tailwind CSS 3** — <https://tailwindcss.com>
- **Framer Motion** — <https://www.framer.com/motion/>
- **Clerk** — <https://clerk.com/docs>
- **Convex** — <https://docs.convex.dev>
- **LiveKit** — <https://docs.livekit.io>
- **Stripe (Node.js + Webhooks)** — <https://stripe.com/docs>
- **Resend** — <https://resend.com/docs>
- **Helmet.js** — <https://helmetjs.github.io>
- **Zod** — <https://zod.dev>
- **Pino** — <https://getpino.io>
- **Vitest** — <https://vitest.dev>
- **Supertest** — <https://github.com/ladjs/supertest>
- **GitHub Actions** — <https://docs.github.com/actions>
- **Docker / Compose** — <https://docs.docker.com>
- **Nginx** — <https://nginx.org/en/docs/>
- **Let's Encrypt / certbot** — <https://eff-certbot.readthedocs.io>
- **Hetzner Cloud Docs** — <https://docs.hetzner.com/cloud/>

## Lectures de fond (sécurité)

- **The Tangled Web** — Michał Zalewski (No Starch Press, 2011).
- **Web Application Hacker's Handbook** — Stuttard & Pinto.
- **Designing Data-Intensive Applications** — Martin Kleppmann (O'Reilly).
- **Site Reliability Engineering** — Google (livre gratuit en ligne).

---

# 18. Annexes

## Annexe A — Liens code source

| Élément                   | URL                                                                                          |
| ------------------------- | -------------------------------------------------------------------------------------------- |
| Repository                | <https://github.com/AidoTokihisa11/visiconnect>                                              |
| Branche de hardening      | `chore/exam-hardening`                                                                       |
| Production                | <https://visioconnect.pro>                                                                   |
| API publique              | <https://api.visioconnect.pro/health>                                                        |

## Annexe B — Documents joints (au dossier candidat)

1. `dossiers/00_AUDIT_INITIAL.md` — audit OWASP + CDA + RGPD (14 findings).
2. `dossiers/01_MISE_A_NIVEAU.md` — bilan technique des stages A-H.
3. `dossiers/02_DOSSIER_PROFESSIONNEL.md` — DP (livrable distinct).
4. `infra/deploy/runbook.md` — runbook de déploiement Hetzner.
5. `BILAN_RETOURS_BETA.md` — synthèse phase bêta (12 testeurs).
6. `GUIDE_BETA_TESTEUR.md` — guide remis aux testeurs.
7. Captures d'écran (dossier `captures website/`).

## Annexe C — Sortie complète de la suite de tests

```
> visiconnect-server@2.0.0 test
> vitest run

 RUN  v2.1.5 /app/server

 ✓ tests/auth.test.js (4 tests) 142 ms
   ✓ requireAuth: 401 sans header Authorization
   ✓ requireAuth: 401 si Bearer mal formé
   ✓ requireAuth: 401 si token invalide
   ✓ /api/user/profile: 401 quand on tente x-user-email (régression F-05)

 ✓ tests/cors.test.js (3 tests) 78 ms
   ✓ CORS: Access-Control-Allow-Origin pour origine listée
   ✓ CORS: refus pour origine inconnue
   ✓ CORS: OPTIONS preflight renvoie 204

 ✓ tests/health.test.js (3 tests) 64 ms
   ✓ /health: 200 et { status: "ok" }
   ✓ /api/health: nodeEnv = "test"
   ✓ route inconnue: 404

 ✓ tests/schemas.test.js (11 tests) 31 ms
   ✓ livekitTokenSchema: rejette caractères spéciaux dans roomName
   ✓ livekitTokenSchema: rejette roomName trop court
   ✓ livekitTokenSchema: rejette roomName trop long
   ✓ livekitTokenSchema: accepte roomName valide
   ✓ emailSchema: rejette email invalide
   ✓ emailSchema: accepte email valide
   ✓ aiChatSchema: rejette historique vide (min 1)
   ✓ aiChatSchema: rejette historique > 30 messages
   ✓ aiChatSchema: accepte historique de 5 messages
   ✓ checkoutSchema: rejette plan inconnu
   ✓ checkoutSchema: accepte starter / pro / business

 ✓ tests/livekitService.test.js (5 tests) 89 ms
   ✓ rejette une demande sans userId
   ✓ émet un JWT à 3 segments
   ✓ identity = sub = userId
   ✓ accorde roomAdmin uniquement à l'hôte
   ✓ TTL ~ 4 h (±5 s tolérance)

 Test Files  5 passed (5)
      Tests  26 passed (26)
   Duration  613 ms
```

## Annexe D — Matrice de traçabilité Compétences ↔ Sections du Dossier Projet

| CP    | Intitulé                                                                  | Démontré section(s)              |
| ----- | ------------------------------------------------------------------------- | --------------------------------- |
| CP1   | Maquetter une application                                                  | §6.3                              |
| CP2   | Développer une interface utilisateur web statique et adaptable            | §6.3, §9.1                        |
| CP3   | Développer une interface utilisateur web dynamique                        | §9.1, §9.5                        |
| CP4   | Développer la partie front-end d'une application web                      | §9.1, §9.3                        |
| CP5   | Développer la partie back-end d'une application web                       | §9.2, §9.3, §9.4                  |
| CP6   | Concevoir une base de données                                             | §8                                |
| CP7   | Mettre en place une base de données                                       | §8.3, §8.4                        |
| CP8   | Développer des composants d'accès aux données                             | §9.2 (services/), §8.5            |
| CP9   | Préparer et exécuter les plans de tests d'une application                 | §10                               |
| CP10  | Préparer et documenter le déploiement d'une application                   | §12                               |
| CP11  | Contribuer à la mise en production dans une démarche DevOps               | §10.3, §12.4, §14                 |

## Annexe E — Glossaire

| Terme       | Définition                                                                                          |
| ----------- | --------------------------------------------------------------------------------------------------- |
| **AT**      | Activité-Type (référentiel REAC).                                                                   |
| **CDA**     | Concepteur Développeur d'Applications (titre professionnel niveau 6).                              |
| **CP**      | Compétence Professionnelle (REAC CDA).                                                              |
| **CSP**     | Content Security Policy — header HTTP contre XSS.                                                   |
| **CWE**     | Common Weakness Enumeration — taxonomie MITRE des faiblesses logicielles.                          |
| **DPA**     | Data Processing Agreement — contrat de sous-traitance RGPD (art. 28).                              |
| **HSTS**    | HTTP Strict Transport Security — force le navigateur à utiliser HTTPS.                              |
| **JWT**     | JSON Web Token — jeton signé, format standard d'authentification stateless.                         |
| **MoSCoW**  | Méthode de priorisation : Must / Should / Could / Won't.                                            |
| **OWASP**   | Open Web Application Security Project — référence sécurité applicative.                            |
| **PII**     | Personally Identifiable Information — donnée à caractère personnel.                                 |
| **PWA**     | Progressive Web App.                                                                                |
| **REAC**    | Référentiel Emploi Activités Compétences (cadre du titre professionnel).                            |
| **RGPD**    | Règlement Général sur la Protection des Données (UE 2016/679).                                      |
| **RNCP**    | Répertoire National des Certifications Professionnelles.                                            |
| **RTO**     | Recovery Time Objective — temps maximal pour restaurer un service.                                  |
| **SCC**     | Standard Contractual Clauses (clauses-types européennes pour transferts hors UE).                  |
| **SFU**     | Selective Forwarding Unit — architecture WebRTC où le serveur relaie les flux sans les transcoder. |
| **TLS**     | Transport Layer Security — chiffrement du transport (successeur de SSL).                            |
| **TTL**     | Time To Live — durée de validité d'un token.                                                        |
| **WCAG**    | Web Content Accessibility Guidelines — normes d'accessibilité W3C.                                  |
| **WebRTC**  | Web Real-Time Communication — protocoles audio/vidéo P2P standardisés W3C/IETF.                    |

---

_Dossier rédigé par Théo GARCES — session jury du 3 juillet 2026 — CODA Orléans._
