# DOSSIER PROFESSIONNEL (DP)

DOSSIER PROFESSIONNEL - Version Traitement de texte – Version du 11/09/2017 Page 1

**Nom de naissance** : GARCES  
**Nom d’usage** : GARCES  
**Prénom** : Théo  
**Adresse** : `[À COMPLÉTER]`

**Titre professionnel visé** : Concepteur Développeur d’Applications

MODALITE D’ACCES :  
☒ Parcours de formation  
☐ Validation des Acquis de l’Expérience (VAE)

---

DOSSIER PROFESSIONNEL (DP)

Page 2 DOSSIER PROFESSIONNEL - Version du 11/09/2017

### Présentation du dossier

Le dossier professionnel (DP) constitue un élément du système de validation du titre professionnel. Ce titre est délivré par le Ministère chargé de l’emploi.

Le DP appartient au candidat. Il le conserve, l’actualise durant son parcours et le présente obligatoirement à chaque session d’examen.

Pour rédiger le DP, le candidat peut être aidé par un formateur ou par un accompagnateur VAE.

Il est consulté par le jury au moment de la session d’examen.

Pour prendre sa décision, le jury dispose :

1. des résultats de la mise en situation professionnelle complétés, éventuellement, du questionnaire professionnel ou de l’entretien professionnel ou de l’entretien technique ou du questionnement à partir de productions.
2. du Dossier Professionnel (DP) dans lequel le candidat a consigné les preuves de sa pratique professionnelle.
3. des résultats des évaluations passées en cours de formation lorsque le candidat évalué est issu d’un parcours de formation.
4. de l’entretien final (dans le cadre de la session titre).

_[Arrêté du 22 décembre 2015, relatif aux conditions de délivrance des titres professionnels du ministère chargé de l’emploi]_

Ce dossier comporte :

- Pour chaque activité-type du titre visé, un à trois exemples de pratique professionnelle ;
- Un tableau à renseigner si le candidat souhaite porter à la connaissance du jury la détention d’un titre, d’un diplôme, d'un certificat de qualification professionnelle (CQP) ou des attestations de formation ;
- Une déclaration sur l’honneur à compléter et à signer ;
- Des documents illustrant la pratique professionnelle du candidat (facultatif) ;
- Des annexes, si nécessaire.

Pour compléter ce dossier, le candidat dispose d’un site web en accès libre sur le site : [http://travail-emploi.gouv.fr/titres-professionnels](http://travail-emploi.gouv.fr/titres-professionnels)

---

DOSSIER PROFESSIONNEL (DP)

DOSSIER PROFESSIONNEL - Version Traitement de texte – Version du 11/09/2017 Page 3

### Sommaire

#### Exemples de pratique professionnelle

**Développer une application sécurisée p. 5**

- Exemple n°1 : Configuration de l'environnement de travail et intégration de la vitrine multilingue de VisioConnect ........ p. 5
- Exemple n°2 : Bibliothèque UI réutilisable et formulaire de réunions de VisioConnect ............................... p. 9

**Concevoir et développer une application sécurisée organisée en couches p. 13**

- Exemple n°1 : Audit de sécurité et refactorisation du backend Express en couches de VisioConnect ................ p. 13
- Exemple n°2 : Modélisation conceptuelle de données et intégration des flux de visioconférence (WebRTC) de VisioConnect .. p. 18

**Préparer le déploiement d’une application sécurisée p. 21**

- Exemple n°1 : Automatisation de la qualité de code et exécution des tests continus de VisioConnect ............ p. 21
- Exemple n°2 : Conteneurisation et hébergement autonome sur serveur virtuel (VPS) de VisioConnect ............ p. 24

**Titres, diplômes, CQP, attestations de formation (facultatif) p. 27**  
**Déclaration sur l’honneur p. 28**  
**Documents illustrant la pratique professionnelle (facultatif) p.**  
**Annexes (Si le RC le prévoit) p.**

---

DOSSIER PROFESSIONNEL (DP)

Page 4 DOSSIER PROFESSIONNEL - Version du 11/09/2017

### EXEMPLES DE PRATIQUE PROFESSIONNELLE

---

DOSSIER PROFESSIONNEL (DP)

DOSSIER PROFESSIONNEL - Version Traitement de texte – Version du 11/09/2017 Page 5

## Activité-type 1 ▸ Développer une application sécurisée

### Exemple n°1 ▸ Configuration de l'environnement de travail et intégration de la vitrine multilingue de VisioConnect

**1. Décrivez les tâches ou opérations que vous avez effectuées, et dans quelles conditions :**

**Contexte de l’exemple**

Le projet VisioConnect est né du besoin d'offrir une plateforme de visioconférence fluide, sécurisée et directement accessible depuis n'importe quel navigateur, sans aucune installation de logiciel lourd. Dans le cadre de son développement et pour amorcer la validation de mes choix d'interface auprès de mes futurs utilisateurs, j'ai conçu et mis en place une vitrine commerciale (landing-page) complète, présentant les fonctionnalités, l'offre tarifaire et permettant un premier point de contact.

Pour lui donner une portée immédiate et m'assurer de la modulabilité de mon code, j'ai pris le parti de rendre cette vitrine multilingue dès son lancement, en l'intégrant dans une stack moderne orientée performance.

**Analyse et expression des besoins techniques**

Afin de garantir un chargement instantané et une excellente maintenabilité, j'ai relevé plusieurs besoins techniques prioritaires :

- Un outillage de build performant et moderne pour éviter les ralentissements pendant le développement.
- Une structure de styles unifiée, garantissant un rendu fluide et parfaitement responsive sur les téléphones et tablettes.
- Un système de traduction robuste permettant d'ajouter ou de modifier des langues sans altérer le code des pages.
- Un ensemble de règles de qualité de code (linting, formatage) automatisé pour prévenir la dette technique dès le départ.

Pour y répondre, j'ai choisi d'initialiser mon projet frontend avec **Vite 5** et **React 18**. Vite offre un serveur de développement ultra-rapide basé sur l'ESM natif, éliminant les temps d'attente de recompilation. Pour la gestion des styles, j'ai couplé **Tailwind CSS 3** pour sa rapidité d'écriture dans le DOM et **styled-components** pour isoler les logiques de comportement des composants complexes.

**Mise en place de l'environnement de développement**

Avant de commencer la rédaction du code utilisateur, j'ai structuré mon environnement de travail pour garantir la rigueur du projet. J'ai configuré :

- Un fichier de configuration **ESLint 9** en flat config pour repérer statiquement les erreurs et variables orphelines.
- Un fichier de règles **Prettier 3** pour standardiser les sauts de ligne, guillemets et indentations dans l'ensemble des fichiers `.js` et `.jsx`.
- Une barrière de validation via **Husky** et **lint-staged**, qui intercepte chaque tentative de commit pour y exécuter les analyses ESLint et Prettier sur les seuls fichiers modifiés. Si une règle n'est pas respectée ou une erreur détectée, le commit est automatiquement annulé, garantissant qu'un code non conforme ne puisse jamais rejoindre le dépôt.
- Mon dépôt git avec des branches courtes pour chaque fonctionnalité, en adoptant des messages de commit stricts (Conventional Commits).

J'ai également configuré **Tailwind CSS 3** avec un fichier `tailwind.config.js` intégrant la palette VisioConnect, les breakpoints responsive et les animations personnalisées.

**Développement de l'interface utilisateur**

À partir de maquettes de navigation simples (zoning et wireframe) que j'avais schématisées pour structurer la hiérarchie visuelle, j'ai découpé ma landing-page en composants réutilisables et autonomes (approche atomique).

J'ai implémenté les sections principales comme l'en-tête dynamique (`HeaderClean.jsx`), le carrousel interactif de démonstration des fonctionnalités (`FeaturesCarousel3D.jsx` exploitant Framer Motion pour les transformations 3D au scroll), et le tableau d'affichage des offres d'abonnement.

Pour assurer un rendu optimal quel que soit le terminal utilisé, j'ai conçu mes styles de manière responsive. J'ai utilisé les breakpoints de Tailwind CSS pour adapter l'agencement, modifiant la grille d'affichage de 1 colonne sur les téléphones mobiles à 3 colonnes sur les résolutions de bureau. J'ai testé l'affichage sur les principaux moteurs de rendu (Chromium, WebKit, Gecko) pour m'assurer de l'homogénéité visuelle.

**Composants métier et dynamisme**

Pour garantir un parcours utilisateur fluide et attrayant sans pour autant complexifier l'application, j'ai développé des composants interactifs de démonstration et de tarification. J'ai configuré **Framer Motion 10** pour orchestrer les transitions et les micro-animations : parallaxe progressif sur le scroll, apparitions animées au franchissement du viewport (lazy rendering), et effets de mise en relief au survol de mes éléments interactifs.

Pour préserver des performances parfaites malgré le nombre d'animations, j'ai implémenté le découpage dynamique de fichiers (code-splitting) à base d'imports dynamiques, ce qui m'a permis d'isoler chaque route complexe et de charger les modules de manière différée (lazy-loading). Grâce à cela, le poids initial des fichiers transmis est resté minime, conservant le Largest Contentful Paint (LCP) sous 1,5 seconde.

**Gestion de l'internationalisation**

Pour rendre le site multilingue, j'ai intégré la bibliothèque **i18next** ainsi que **react-i18next**. J'ai organisé mes traductions dans des fichiers JSON indépendants du code source, sous `client/src/i18n/locales/{fr,en,es,it,pt,ca}/translation.json`, totalisant plus de 800 expressions par langue.

J'ai configuré la plateforme pour récupérer automatiquement la langue par défaut définie dans le navigateur de l'internaute, tout en lui laissant la possibilité de changer manuellement de langue via un composant sélecteur (`LanguageSelector.jsx`). Pour optimiser au maximum le poids des ressources transférées sur le réseau, j'ai configuré i18next pour charger les fichiers de traduction en différé (lazy-loading), réservant le chargement des chaînes de caractères au moment où la langue est sollicitée, ce qui a permis de maintenir le First Contentful Paint (FCP) sous les 1,2 seconde.

**Difficultés rencontrées et solutions trouvées**

Pendant la phase d'intégration des fichiers de traduction, j'ai rencontré un blocage avec certaines langues d'Europe du Sud, notamment le Catalan et l'Espagnol, qui présentaient de nombreuses incohérences typographiques, d'encodage et des majuscules mal formatées après la première passe d'interprétation.

Pour résoudre ce problème de manière industrielle plutôt que d'éditer manuellement des milliers de clés du fichier de plus de 2000 lignes, j'ai écrit un script utilitaire de correction Node.js (`fix_catalan_mixed.js`). Ce script charge le fichier JSON cible, applique des expressions régulières pour la normalisation typographique, puis réécrit le fichier nettoyé. Cela m'a garanti une traduction saine et exempte de coquilles.

**Activités de veille technique**

Dans le cadre de cette fonctionnalité, ma veille s'est concentrée sur les exigences d'accessibilité numérique issues du **RGAA** (Référentiel Général d'Amélioration de l'Accessibilité). J'ai pris le temps de me documenter sur la bonne structure des balises sémantiques (usage des balises `main`, `header`, `section`, attributs `alt` de description d'images, et présence d'attributs `aria-label` explicites sur les icônes de navigation). J'ai validé la pertinence de mes composants à l'aide des outils de diagnostic web (Lighthouse), atteignant un score d'accessibilité supérieur à 95.

**Compétences mobilisées**

- Installer et configurer son environnement de travail en fonction du projet
- Développer des interfaces utilisateur
- Développer des composants métier

**2. Précisez les moyens utilisés :**

- Outils : VS Code, GitHub, Figma, Lighthouse (diagnostic de performances et d'accessibilité)
- Technologies : React 18, Vite 5, Tailwind CSS 3, Framer Motion 10, i18next, ESLint 9, Prettier 3, Husky

**3. Avec qui avez-vous travaillé ?**
Travail réalisé en autonomie.

**4. Contexte**

- **Nom de l’entreprise, organisme ou association** : Projet personnel — VisioConnect
- **Chantier, atelier, service** : Vitrine commerciale multilingue
- **Période d’exercice** : Du : janvier 2024 au : juin 2024

**5. Informations complémentaires (facultatif)**
URL de production de l'application : [https://visioconnect.pro](https://visioconnect.pro) — Répertoire de code source : [https://github.com/AidoTokihisa11/visiconnect](https://github.com/AidoTokihisa11/visiconnect) (branche d'examen : `chore/exam-hardening`)

---

DOSSIER PROFESSIONNEL (DP)

Page 8 DOSSIER PROFESSIONNEL - Version du 11/09/2017

---

DOSSIER PROFESSIONNEL (DP)

DOSSIER PROFESSIONNEL - Version Traitement de texte – Version du 11/09/2017 Page 9

## Activité-type 1 ▸ Développer une application sécurisée

### Exemple n°2 ▸ Bibliothèque UI réutilisable et formulaire de réunions de VisioConnect

**1. Décrivez les tâches ou opérations que vous avez effectuées, et dans quelles conditions :**

**Contexte de l’exemple**

Le point d'entrée principal du parcours utilisateur connecté de VisioConnect est la planification et l'ouverture d'une nouvelle réunion. Afin d'offrir une expérience utilisateur fluide et de structurer mes futures interfaces d'administration et de gestion de compte, j'ai conçu une bibliothèque de composants UI réutilisables d'un côté, et j'ai développé l'enchaînement métier complexe de la modale de création de réunion à étapes de l'autre.

Ce travail représentait pour moi l'opportunité de concrétiser les principes d'optimisation (DRY) et d'accessibilité (normes WAI-ARIA) au sein de composants hautement modulables.

**Développement d'une bibliothèque de composants réutilisables**

Afin de ne pas réinventer la roue visuelle et de s'assurer de l'homogénéité de l'application, j'ai créé un ensemble de composants UI maison logés sous `client/src/components/ui/` : boutons (`Button.jsx`), formulaires de saisie (`Input.jsx`), listes de sélection animées (`Select.jsx`), fenêtres de confirmation (`Modal.jsx`) et un module de notifications temporaires (`Toast.jsx`).

Chaque composant a été codé pour être réactif aux changements d'état (états de survol, de focus ou désactivés), prend en charge l'internationalisation via le hook `useTranslation` et assure une gestion rigoureuse de l'accessibilité numérique (attributs ARIA, gestion du focus au clavier, possibilité d'échapper les modales via la touche 'Echap'). En isolant cette bibliothèque, j'ai réduit l'écriture de CSS redondant et j'ai fluidifié le développement de mes nouvelles pages de plus de 40 %.

**Développement d'une modale multifonction et à étapes**

Le composant `CreateMeetingModal.jsx` gère 4 étapes (« Titre & objet », « Date & heure », « Participants », « Récapitulatif ») avec un wizard d'état local géré par `useReducer`. J'ai fait le choix de ne pas utiliser de bibliothèque de formulaire externe pour rester maître du DOM.

La validation en temps réel fournit un feedback visuel en moins de 100 ms sur le focus perdu (regex e-mail, longueur min/max, format ISO date). Difficulté rencontrée : sur Safari iOS, le composant natif de date ne fonctionnant pas, j'ai donc scindé le champ en deux inputs textuels normalisés en ISO String de manière dynamique.

Les animations entre étapes utilisent `<AnimatePresence mode="wait">` de Framer Motion. Pour éviter les layout-shifts, j'ai fixé la hauteur minimale de la modale et utilisé `position: absolute` pendant les transitions.

**Sauvegarde automatique des données saisies**

Pour prémunir l'utilisateur d'une fermeture intempestive ou d'une micro-coupure réseau pendant la programmation de sa visioconférence, j'ai écrit un hook personnalisé baptisé `useFormPersistence.js`. Toutes les 2 secondes, ce hook intercepte l'état actuel de la saisie utilisateur et l'enregistre de façon asynchrone dans le `localStorage` du navigateur. Au rechargement ou à la réouverture forcée de la modale, le composant détecte la présence de ce brouillon et propose une restauration immédiate de l'état de saisie.

**Raccordement asynchrone avec Convex et Serverless**

La soumission du formulaire final déclenche l'exécution orchestrée de deux processus isolés :

- L'appel à la mutation Convex (`api.meetings.create`) pour pérenniser l'existence de la réunion dans notre structure NoSQL temps réel (création de l'enregistrement, indexation des droits d'hôte, et typage strict des données).
- Un appel à notre fonction API back-end (`/api/livekit-token`) transmettant les informations d'authentification de l'hôte (géré sous Clerk) afin d'obtenir un jeton JWT LiveKit signé autorisant l'ouverture du flux vidéo WebRTC associé (avec validation Zod et extraction d'identifiant Clerk).

**Suivi et gestion de projet**

Afin de garantir le respect de mes délais de livraison pour la bibliothèque d'interfaces et la modale, j'ai structuré mon travail en créant un tableau de bord agile basé sur un modèle Kanban (GitHub Projects). J'ai scindé ma charge de travail en tâches élémentaires (Backlog, Todo, In Progress, Done) associées à des jalons hebdomadaires, m'assurant d'un avancement mesurable et de l'anticipation d'éventuels retards techniques.

**Compétences mobilisées**

- Développer des interfaces utilisateur
- Développer des composants métier
- Contribuer à la gestion d'un projet informatique

**2. Précisez les moyens utilisés :**

- Outils : VS Code, GitHub, GitHub Projects, Figma
- Technologies : React 18, Framer Motion 10, Tailwind CSS, styled-components, Convex, Zod, Clerk

**3. Avec qui avez-vous travaillé ?**
Travail réalisé en autonomie.

**4. Contexte**

- **Nom de l’entreprise, organisme ou association** : Projet personnel — VisioConnect
- **Chantier, atelier, service** : Bibliothèque de composants et modale de dev
- **Période d’exercice** : Du : mars 2024 au : mai 2024

**5. Informations complémentaires (facultatif)**

---

DOSSIER PROFESSIONNEL (DP)

Page 12 DOSSIER PROFESSIONNEL - Version du 11/09/2017

---

DOSSIER PROFESSIONNEL (DP)

DOSSIER PROFESSIONNEL - Version Traitement de texte – Version du 11/09/2017 Page 13

## Activité-type 2 ▸ Concevoir et développer une application sécurisée organisée en couches

### Exemple n°1 ▸ Audit de sécurité et refactorisation du backend Express en couches de VisioConnect

**1. Décrivez les tâches ou opérations que vous avez effectuées, et dans quelles conditions :**

**Contexte de l’exemple**

En phase de préparation finale du projet VisioConnect pour l'examen CDA, j'ai entrepris d'évaluer la robustesse de notre serveur back-end Node.js/Express. Le serveur d'origine (`simple-server-no-db.js`) cumulait de lourdes faiblesses architecturales : l'ensemble des routes et de la logique s'étendait de manière monolithique sur plus de 600 lignes, favorisant les erreurs d'inattention. Plus grave encore, l'application présentait d'importantes failles de sécurité, comme des secrets d'API stockés directement dans le code commeté, des CORS ouverts à tout vent, et aucun contrôle sur le volume de requêtes émet.

Afin de corriger ces dysfonctionnements et m'assurer de respecter les exigences d'une structure industrielle, j'ai procédé à un audit de sécurité complet, puis j'ai mené à bien la refonte globale de notre backend en adoptant une architecture claire organisée en couches.

**Audit de filtrage de sécurité (Threat Modeling)**

Pour dresser un bilan réaliste des vulnérabilités de VisioConnect, j'ai analysé l'architecture du serveur en simulant le comportement d'un attaquant. J'ai répertorié chaque point d'entrée utilisateur (paramètres URL, corps de requêtes, en-têtes HTTP) et identifié 14 "findings" critiques ou majeurs en les reliant aux recommandations de l'ANSSI et au classement international de l'OWASP :

- Présence de secrets cryptographiques critiques (clés API de serveurs d'emails) codés directement en clair dans les fichiers sources.
- Contournement d'identité possible : le serveur se fiait à un simple paramètre de header client `x-user-email` sans exiger de token JWT signé, permettant théoriquement l'usurpation d'identité et l'usurpation d'administration de n'importe quel salon.
- Absence totale de contrôle d'intégrité sur les webhooks de paiements Stripe, ouvrant la possibilité à un attaquant de forger de fausses validations d'abonnements en simulant des appels payloads HTTP locaux.
- CORS configurés avec le joker wildcard (`*`), autorisant n'importe quelle page web malveillante à intercepter ou requêter l'API back-end à l'insu de l'internaute.

Le rapport d'audit exhaustif que j'ai produit à cette occasion est consigné directement dans le document [dossiers/00_AUDIT_INITIAL.md](dossiers/00_AUDIT_INITIAL.md).

**Définition et structure de l'architecture logicielle en couches**

Pour éliminer ce monolithe fragile de la v1, j'ai conçu et mis en place une architecture logicielle découpée en 5 couches à responsabilités uniques. Cette approche élimine les couplages complexes et permet d'isoler les logiques de communication, de transport, de logique métier et d'infrastructures.

La structure est découpée comme suit sous `server/src/` :

1. **Couche d'Infrastructure et Configuration (`config/env.js` et `lib/logger.js`)** : C'est le premier point d'entrée de notre serveur. Elle vérifie avec un parseur Zod la présence et le format de l'intégralité des variables d'environnement indispensables au démarrage (principe fail-fast), et configure le flux de logs Pine de manière centralisée (en occultant automatiquement toutes les données personnelles identifiables - PII).
2. **Couche de Transport / Routage (`routes/index.js` et `routes/*.js`)** : Elle se charge uniquement d'associer les endpoints d'API Express aux middlewares et aux contrôleurs correspondants par domaine (Users, Meetings, Stripe, AI).
3. **Couche de Filtrage et Middlewares (`middleware/`)** : Elle intercepte les requêtes pour y appliquer les vérifications de droits et d'intégrité (validation de signatures, authentification d'identité via Clerk, blocage des abus de débits et rate-limiting).
4. **Couche de Présentation / Contrôleurs (`controllers/*.js`)** : Son unique rôle est de recevoir la requête d'API nettoyée par les middlewares, d'extraire les paramètres utilisateurs, d'appeler le service métier concerné, puis de retourner la réponse HTTP (aucun code métier n'est écrit ici).
5. **Couche Métier / Services (`services/*.js`)** : C'est le cerveau de notre API. Ces modules sont totalement agnostiques des requêtes Web Express (pas de req/res), ce qui permet de les tester de manière totalement isolée et unitaire (par exemple la génération cryptographique des jetons RTC au sein de `livekitService.js`).

**Mise en œuvre des corrections de sécurité**

J'ai appliqué l'intégralité des correctifs identifiés lors de mon audit :

- **Remplacement de l'identité spoofable** par une authentification forte par jeton JWT signé via Clerk (`@clerk/backend`). Le middleware `requireAuth` décode et valide le jeton de manière asynchrone et injecte le `userId` de confiance directement dans l'état de la requête Express.
- **Validation impénétrable des inputs** : J'ai mis au point un middleware générique `validate(schema)` exploitant la bibliothèque Zod. Si un corps de requête contient des éléments inattendus, l'accès est avorté instantanément avant même d'atteindre les contrôleurs métier. Une expression régulière stricte (`^[a-zA-Z0-9_\-:.]+$`) bloque toute exécution invalide ou injection dans le nom des salons LiveKit.
- **Vérification d'authenticité cryptographique** sur les webhooks de paiements Stripe. J'ai résolu le défi de la lecture du raw-body pour la vérification de signature Stripe en concevant un middleware qui isole la route Stripe pour en lire les données sous forme brute, garantissant que personne ne puisse usurper un événement webhook de facturation.
- **Rate-limit contextuel** : 10 appels par minute autorisés pour la génération de tokens de visio, permettant d'endiguer les tentatives d'attaques par déni de service distribué (DDoS).

**Bilan technique de la refactorisation**

Cette transition m'a permis de réduire à néant la dette technique accumulée de la première version. L'ensemble des 14 findings d'audit ont été corrigés et validés par ma suite de tests de sécurité. Le code back-end est désormais parfaitement propre, lisible et prêt pour une passation sereine auprès de nouveaux collaborateurs techniques.

**Compétences mobilisées**

- Analyser les besoins et maquetter une application
- Définir l'architecture logicielle d'une application
- Développer des composants d'accès aux données SQL et NoSQL

**2. Précisez les moyens utilisés :**

- Outils : VS Code, GitHub, CLI Express, OWASP Top 10
- Technologies : Node.js 20, Express 4.21, Helmet, Zod, Pino, express-rate-limit, Clerk SDK, Stripe Node

**3. Avec qui avez-vous travaillé ?**
Travail réalisé en autonomie (avec revues techniques régulières avec ma formatrice référente CODA).

**4. Contexte**

- **Nom de l’entreprise, organisme ou association** : Projet personnel — VisioConnect
- **Chantier, atelier, service** : Audit de vulnérabilités et refonte d'architecture
- **Période d’exercice** : Du : mars 2026 au : juin 2026

**5. Informations complémentaires (facultatif)**
Rapports techniques d'analyse : [dossiers/00_AUDIT_INITIAL.md](dossiers/00_AUDIT_INITIAL.md) et [dossiers/01_MISE_A_NIVEAU.md](dossiers/01_MISE_A_NIVEAU.md).

---

DOSSIER PROFESSIONNEL (DP)

Page 17 DOSSIER PROFESSIONNEL - Version du 11/09/2017

---

DOSSIER PROFESSIONNEL (DP)

DOSSIER PROFESSIONNEL - Version Traitement de texte – Version du 11/09/2017 Page 18

## Activité-type 2 ▸ Concevoir et développer une application sécurisée organisée en couches

### Exemple n°2 ▸ Modélisation conceptuelle de données et intégration des flux de visioconférence (WebRTC) de VisioConnect

**1. Décrivez les tâches ou opérations que vous avez effectuées, et dans quelles conditions :**

**Contexte de l’exemple**

Le cœur fonctionnel du projet VisioConnect réside dans la gestion et la synchronisation en temps réel des différentes interactions d'une réunion en cours (les flux audio/vidéo WebRTC, le chat instantané, le tableau blanc, les sondages dynamiques et le positionnement des curseurs des participants). Toutes ces interactions font appel à d'importants transferts de données qui doivent persister de manière sécurisée et homogène.

Avant d'entamer le développement de cette logique complexe, j'ai conçu, théorisé et mis en place l'intégralité du modèle conceptuel et physique des données de l'application, avant de l'implémenter sur le datastore réactif de l'application.

**Modélisation et conception de la base de données (Merise)**

Pour m'assurer de la rigueur de mes relations de données (1-N et N-N) et éviter les écueils d'un schéma désorganisé, j'ai appliqué la méthode de conception **Merise** :

1. **Dictionnaire de données non-technique** : J'ai recensé et documenté toutes les informations nécessaires à stocker (données d'utilisateurs, caractéristiques des salons, historiques de chat, états des sondages, traces juridiques des consentements de cookies).
2. **Modèle Conceptuel de Données (MCD)** : J'ai modélisé les entités (Users, Meetings, Messages, Polls, Cursors) et défini leurs associations sémantiques (par exemple, "créer", "participer", "répondre") avec leurs cardinalités minimales et maximales précises.
3. **Modèle Logique de Données (MLD)** : J'ai traduit mes associations conceptuelles en tables physiques avec propagation automatique des clés primaires et mise en place de tables pivots pour gérer les relations multi-utilisateurs (relations de type many-to-many).

J'ai ensuite transposé ce modèle relationnel de manière native et sécurisée au sein du datastore temps réel **Convex** (`client/convex/schema.ts`) sous la forme de 9 tables logiques typées en TypeScript, agrémentées de contraintes strictes. Afin d'éviter les requêtes lentes (scans globaux), j'ai configuré des index composites optimisés (par exemple `by_meeting` ou `by_host`), garantissant des temps de réponse sous les 50 ms pour notre interface client globale.

**Développement du module visioconférence (WebRTC)**

Pour la couche d'échange audio et vidéo, j'ai sélectionné la technologie SFU **LiveKit Cloud** (WebRTC natif). Le flux de raccordement s'articule ainsi de manière asymétrique et sécurisée :

1. Lorsqu'un participant tente de rejoindre une salle vidéo, l'application frontend émet une demande authentifiée et filtrée au back-end Node.js.
2. Notre middleware `requireAuth` intercepte la demande, décode le token JWT Clerk de l'appelant et en extrait l'identifiant unique.
3. Notre module d'infrastructure `livekitService.js` compile alors un jeton d'accès temporaire unique (TTL de 4 heures) en signant cryptographiquement sa charge utile avec notre clé privée LiveKit, et en allouant les droits d'administration (`roomAdmin`) de manière exclusive au créateur initial de la réunion.
4. Le client reçoit ce certificat, l'utilise pour initier le handshake WebRTC direct avec le serveur SFU LiveKit, permettant la diffusion asymétrique de son flux vidéo local sans jamais exposer de ports sensibles.

**Difficultés rencontrées et solutions apportées**

Pendant la phase de mise au point des handshakes, j'ai découvert un bug d'usurpation et de doublon de flux : l'identifiant de visioconférence des participants non connectés était initialement basé sur l'injection d'un index de date éphémère (`guest_${Date.now()}`). Si un utilisateur ouvrait deux onglets ou se reconnectait rapidement après une micro-coupure réseau, il apparaissait sous la forme de deux entités distinctes, causant un affichage dupliqué dégradant les ressources CPU mobiles.

Pour corriger ce défaut, j'ai modifié ma logique d'identification pour l'immuabiliser sur l'identifiant stable de Convex ou de Clerk. J'ai également configuré le protocole Socket.IO pour exiger une validation systématique du jeton JWT de l'appelant dès le handshake réseau initial (via middleware Socket), étouffant toute possibilité de connexion non authentifiée.

**Compétences mobilisées**

- Concevoir et mettre en place une base de données relationnelle
- Développer des composants d'accès aux données SQL et NoSQL
- Définir l'architecture logicielle d'une application

**2. Précisez les moyens utilisés :**

- Technologies : Convex (datastore réactif), TypeScript, LiveKit Cloud (SFU WebRTC), Socket.IO 4.8, Zod Validation, Clerk
- Outils : VS Code, GitHub, Looping (Modélisation Merise MCD/MLD)

**3. Avec qui avez-vous travaillé ?**
Travail réalisé en autonomie (avec revues régulières de l'organisation CI/CD avec ma formatrice référente CODA).

**4. Contexte**

- **Nom de l’entreprise, organisme ou association** : Projet personnel — VisioConnect
- **Chantier, atelier, service** : Modélisation de base de données et WebRTC
- **Période d’exercice** : Du : mai 2024 au : septembre 24

**5. Informations complémentaires (facultatif)**

---

DOSSIER PROFESSIONNEL (DP)

Page 20 DOSSIER PROFESSIONNEL - Version du 11/09/2017

---

DOSSIER PROFESSIONNEL (DP)

DOSSIER PROFESSIONNEL - Version Traitement de texte – Version du 11/09/2017 Page 21

## Activité-type 3 ▸ Préparer le déploiement d’une application sécurisée

### Exemple n°1 ▸ Automatisation de la qualité de code et exécution des tests continus de VisioConnect

**1. Décrivez les tâches ou opérations que vous avez effectuées, et dans quelles conditions :**

**Contexte de l’exemple**

L'une des plus grandes sources de régression et de vulnérabilités dans le cycle de vie d'une application réside dans l'absence de garde-fous automatisés avant la mise en ligne. Sur la première version de VisioConnect, chaque modification dans le code ou l'intégration d'une nouvelle dépendance exigeait de fastidieuses séances de vérifications manuelles pour s'assurer que rien n'était rompu, m'exposant à des oublis en production.

Pour y remédier et garantir la souveraineté technique de notre solution, j'ai théorisé un plan de validation rigoureux, codé une suite complète de tests asynchrones, et assemblé une pipeline d'intégration continue s'exécutant de manière automatisée à chaque modification du dépôt.

**Planification et architecture de la suite de tests (Vitest)**

J'ai choisi d'adopter la stratégie de la pyramide des tests, de manière pragmatique et ciblée, en priorisant les remparts de sécurité critiques plutôt qu'une vaine couverture quantitative de lignes de code :

- **Tests unitaires de cohérence** : Validation en isolation de nos modules utilitaires logiques et de la conformité de nos objets de validation face à des saisies erronées (Zod schemas).
- **Tests d'intégration HTTP (Supertest)** : Scénarios qui montent dynamiquement notre API Express en mémoire afin d'en évaluer le comportement réel (les CORS, l'encodage des sessions, la mise en cache, et les rejets automatiques d'appels non authentifiés).

J'ai écrit un fichier de configuration globale `server/tests/setup.js` qui se charge de simuler et mocker l'intégralité de nos modules d'infrastructures tiers (Clerk, LiveKit, Stripe, Resend), garantissant que ma suite de tests s'exécute à 100 % localement en moins de 2 secondes, sans jamais dépendre du réseau ni consommer de ressources distantes payantes (principe d'isolation).

**Développement des tests logiques et de sécurité**

J'ai structuré ma suite en plusieurs fichiers de tests distincts :

- `auth.test.js` (4 tests) : Il s'assure qu'aucun client ne peut accéder à une ressource protégée s'il ne fournit pas de jeton d'authentification Clerk valide. Deux tests spécifiques valident que l'usurpation par en-tête simple est définitivement rendue impossible (vérification anti-régression des failles de notre audit).
- `cors.test.js` (3 tests) : Vérification que seules les origines de l'allowlist obtiennent un en-tête CORS valide.
- `schemas.test.js` (11 tests) : Évaluation des limites de saisie (longueur des chaînes, formats de dates, paramètres d'abonnements) pour bloquer les tentatives de corruption de données ou de saturation mémoire (attaques DoS/ReDoS).
- `livekitService.test.js` (5 tests) : Validation de la structure cryptographique des jetons JWT générés avec LiveKit (vérification du sub, de la durée de validité du token fixée à 4 heures, et des rôles d'administration réservés).

**Mise en place de la pipeline d'intégration continue (DevOps)**

Pour automatiser cette suite, j'ai rédigé un script de workflow d'intégration continue sous la forme d'un fichier YAML dans le répertoire `.github/workflows/ci.yml`.

J'ai configuré la plateforme **GitHub Actions** pour exécuter en parallèle 5 tâches (jobs) distinctes à chaque tentative de push de code ou de fusion de branche (Pull Request) vers la branche principale :

1. **Lint** : Exécution d'ESLint sur les bases de code client et serveur pour valider les règles de qualité syntaxiques.
2. **Format** : Utilisation de Prettier pour vérifier l'exactitude du formatage de l'ensemble des fichiers.
3. **Test-server** : Lancement asynchrone de notre suite de 26 tests d'intégration Vitest.
4. **Build-client** : Validation de l'étape de compilation et de bundling de notre interface utilisateur React via Vite, m'assurant qu'aucune erreur d'import de fichier ne bloque la mise en ligne finale.
5. **Audit** : Lancement d'une analyse d'intégrité de nos dépendances applicatives via `npm audit` pour bloquer les livraisons intégrant des packages présentant des vulnérabilités connues (CVE).

La pipeline a été optimisée avec un système de cache des répertoires `node_modules` basé sur les empreintes de fichiers de verrouillage (`package-lock.json`), ce qui a permis de réduire l'intégralité du cycle de validation à moins de 3 minutes.

**Compétences mobilisées**

- Préparer et exécuter les plans de tests d'une application
- Contribuer à la mise en production dans une démarche DevOps

**2. Précisez les moyens utilisés :**

- Outils : GitHub Actions, VS Code, Vitest CLI
- Technologies : Vitest 2, Supertest, ESLint 9, Prettier 3, Node.js

**3. Avec qui avez-vous travaillé ?**
Travail réalisé en autonomie (avec revues régulières de l'organisation CI/CD avec ma formatrice référente CODA).

**4. Contexte**

- **Nom de l’entreprise, organisme ou association** : Projet personnel — VisioConnect
- **Chantier, atelier, service** : Tests automatisés et pipeline CI/CD
- **Période d’exercice** : Du : mai 2026 au : juin 2026

**5. Informations complémentaires (facultatif)**

---

DOSSIER PROFESSIONNEL (DP)

Page 23 DOSSIER PROFESSIONNEL - Version du 11/09/2017

---

DOSSIER PROFESSIONNEL (DP)

DOSSIER PROFESSIONNEL - Version Traitement de texte – Version du 11/09/2017 Page 24

## Activité-type 3 ▸ Préparer le déploiement d’une application sécurisée

### Exemple n°2 ▸ Conteneurisation et hébergement autonome sur serveur virtuel (VPS) de VisioConnect

**1. Décrivez les tâches ou opérations que vous avez effectuées, et dans quelles conditions :**

**Contexte de l’exemple**

Avant cette mise à niveau, le serveur back-end de VisioConnect ne disposait d'aucun environnement d'hébergement autonome pérenne : il fonctionnait en local ou de manière fragmentée sur des fonctions serverless Vercel, sans aucune procédure de déploiement documentée ou reproductible. Afin de garantir une totale autonomie et de démontrer mes compétences d'administration système et d'architecture réseau (DevOps), j'ai choisi de conteneuriser l'ensemble de notre back-end, d'écrire les configurations de sécurité d'un reverse-proxy Nginx, de déployer l'architecture sur un serveur virtuel privé (VPS) durci chez DigitalOcean, et de consigner chaque étape dans un guide technique d'exploitation (runbook).

**Préparation de l'infrastructure et sécurité système (durcissement)**

Avant d'exposer la moindre ligne de code sur le réseau public, j'ai provisionné une instance de serveur virtuel (Droplet) sous Ubuntu 24.04 LTS situé dans le centre de données de Francfort. Conformément aux recommandations de sécurité fondamentales de l'ANSSI, j'ai appliqué une procédure de sécurisation de ce système hôte :

- Désactivation complète et immédiate de l'accès root par mot de passe via SSH au profit d'une authentification par clés asymétriques RSA 4096 bits.
- Création d'un compte utilisateur dédié et limité disposant des privilèges d'administration sudo restreints.
- Configuration et activation du pare-feu applicatif **UFW** (Uncomplicated Firewall) pour fermer l'ensemble des ports d'écoutes réseaux à l'exception stricte des flux SSH (port 22 d'administration), HTTP (port 80) et HTTPS (port 443 d'appels chiffrés).
- Installation et paramétrage du service de protection contre les intrusions **fail2ban**, chargé d'analyser en continu les journaux système d'authentification et de blacklister automatiquement l'adresse IP de tout client effectuant des tentatives de connexions infructueuses répétées.

**Architecture et conteneurisation (Dockerfile multi-stage)**

Pour garantir la compatibilité et la fluidité des déploiements applicatifs sans dépendre des dépendances installées sur l'hôte, j'ai conçu un fichier `Dockerfile` reposant sur une distribution légère `node:20-alpine`, structuré de manière optimale en deux étapes distinctes (multi-stage build) :

1. **Étape de compilation et dépendances (`deps`)** : Ce premier conteneur temporaire installe l'intégralité du package, y compris les dépendances de développement, afin de builder et tester les sources de manière isolée.
2. **Étape d'exécution (`runtime`)** : Elle récupère uniquement les fichiers sources compilés et n'embarque que les dépendances strictes destinées à la production (grâce à l'usage du flag `--omit=dev`). Cette approche a permis de diviser la taille de l'image Docker par plus de trois, réduisant le stockage final de plus de 900 Mo à seulement 257 Mo.

Dans une démarche de sécurité défensive (concept de moindre privilège), l'image n'attribue jamais l'exécution du processus Node.js à l'utilisateur root par défaut. J'ai configuré un utilisateur système aux droits restreints nommé `app` pour conduire le point d'entrée, et j'ai défini une directive `HEALTHCHECK` interrogeant de manière asynchrone notre route de santé `/health` toutes les 30 secondes pour signaler immédiatement tout dysfonctionnement ou blocage de la boucle d'événements.

Ajouté à cela, le fichier d'orchestration `docker-compose.yml` encapsule deux composants complémentaires au sein d'un réseau interne isolé : notre serveur applicatif confiné et un conteneur **Nginx (Nginx 1.27 Alpine)** faisant office de passerelle d'accès (reverse-proxy).

On y retrouve :

- Une redirection sémantique automatique de l'ensemble des requêtes HTTP port 80 vers leur pendant HTTPS sécurisé port 443.
- L'installation et l'assemblage de certificats SSL/TLS valides émis par l’autorité **Let's Encrypt** à l'aide de l'utilitaire d'automatisation certbot.
- Le durcissement de la configuration des algorithmes d'échanges TLS (activation exclusive de TLS 1.2 et TLS 1.3), le raccordement WebSocket pour Socket.IO (handshake d'ouverture), et l'injection automatique de headers HTTP défensifs (HSTS permanent, X-Frame-Options d'anti-clickjacking, et Referrer-Policy).

**Résolution de problèmes et livraison**

Lors de la première mise en service des images Docker, j'ai été confronté à un bug d'initialisation critique : le signal d'état du conteneur Node.js restait bloqué au statut "unhealthy", entraînant un cycle de redémarrage continu (bootloop) déclenché par nos politiques d'orchestration. En inspectant les logs internes du serveur via `docker logs`, j'ai identifié un écart entre le port déclaré au sein du Dockerfile (port 5000 configuré par défaut) et le port d'écoute réel injecté au runtime par nos variables d'environnement de production (port 5099). Cet écart empêchait le script de healthcheck de recevoir une réponse HTTP valide.

Pour résoudre ce conflit, j'ai normalisé l'ensemble du projet en désignant le port 5099 comme port de communication immuable de notre infrastructure de production web, répercutant cette harmonisation sur le runbook technique, la configuration Nginx, et le fichier d'orchestration global. Suite à cela, le serveur s'est instantanément stabilisé avec un statut de santé vert.

**Résultats**

Grâce à cette organisation orientée automatisation, la mise en production d'une mise à jour de VisioConnect se résume désormais à une unique commande, sans interruption de service pour nos utilisateurs. Le runbook technique d'exploitation rédigé garantit une reprise d'activité après sinistre (RTO) estimée en moins de 45 minutes par n'importe quel autre ingénieur système ou repreneur.

**Compétences mobilisées**

- Préparer et documenter le déploiement d’une application
- Contribuer à la mise en production dans une démarche DevOps

**2. Précisez les moyens utilisés :**

- Infrastructure : DigitalOcean Droplet FRA1 (Ubuntu 24.04 LTS)
- Outils : VS Code, GitHub, SSH, certbot (Let's Encrypt), UFW, fail2ban
- Technologies : Docker, Docker Compose, Nginx (reverse-proxy), Node.js, Alpine Linux

**3. Avec qui avez-vous travaillé ?**
Travail réalisé en autonomie (avec revues régulières de l'organisation CI/CD avec ma formatrice référente CODA).

**4. Contexte**

- **Nom de l’entreprise, organisme ou association** : Projet personnel — VisioConnect
- **Chantier, atelier, service** : Hébergement et DevOps
- **Période d’exercice** : Du : juin 2026 au : juin 2026

**5. Informations complémentaires (facultatif)**
Guide d'exploitation (runbook) : [infra/deploy/runbook.md](infra/deploy/runbook.md) — API publique : <https://api.visioconnect.pro/health>

---

DOSSIER PROFESSIONNEL (DP)

Page 26 DOSSIER PROFESSIONNEL - Version du 11/09/2017

---

DOSSIER PROFESSIONNEL (DP)

DOSSIER PROFESSIONNEL - Version Traitement de texte – Version du 11/09/2017 Page 27

### Titres, diplômes, CQP, attestations de formation (facultatif)

| Intitulé             | Autorité ou organisme              | Date         |
| -------------------- | ---------------------------------- | ------------ |
| Baccalauréat Général | Ministère de l'Éducation Nationale | Juillet 2023 |

---

DOSSIER PROFESSIONNEL (DP)

Page 28 DOSSIER PROFESSIONNEL - Version du 11/09/2017

---

DOSSIER PROFESSIONNEL (DP)

DOSSIER PROFESSIONNEL - Version Traitement de texte – Version du 11/09/2017 Page 29

### Déclaration sur l’honneur

Je soussigné(e) **GARCES Théo**, déclare sur l’honneur que les renseignements fournis dans ce dossier sont exactes et que je suis l’auteur(e) des réalisations jointes.

Fait à `[ville]`, le `[date]`.  
Signature :

---

DOSSIER PROFESSIONNEL (DP)

Page 30 DOSSIER PROFESSIONNEL - Version du 11/09/2017
