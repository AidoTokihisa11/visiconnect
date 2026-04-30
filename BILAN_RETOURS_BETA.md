# Bilan des retours bêta — VisiConnect
*Environnement bêta-testeur : Windows 10 — Google Chrome 147.0.7727.116*
*Mise à jour : avril 2026 — révision complète*

---

## 🎥 Visio-conférence

---

### 1. Caméra et micro se coupent lorsqu'une autre fenêtre chevauche la page
**⚠️ Comportement natif de Chrome — explication technique**

Ce comportement n'est pas un bug de VisiConnect. Il est déclenché par le navigateur lui-même via la **Page Visibility API** (spécification W3C), que Chrome implémente de manière agressive.

**Mécanisme détaillé :**
Lorsqu'une autre fenêtre (application native ou onglet navigateur) recouvre partiellement ou totalement la page VisiConnect, Chrome peut faire basculer l'état interne de l'onglet vers `visibilityState = 'hidden'`. Dans cet état, Chrome réduit activement la priorité des processus de rendu pour économiser CPU et GPU. Les flux `MediaStream` (caméra, micro) sont alors mis en pause par le renderer au niveau système, indépendamment de ce que l'application web demande.

**Pourquoi le micro se rétablit plus vite que la caméra ?**
Les pistes audio (`AudioTrack`) consomment très peu de ressources et sont réactivées quasi instantanément. Les pistes vidéo (`VideoTrack`), en revanche, impliquent un pipeline de décodage GPU (capture → encodage → publication LiveKit) qui doit être réinitialisé complet — d'où le délai de 1 à 2 secondes observé.

**Ce qui ne peut pas être contrôlé côté application :**
L'application web ne dispose d'aucune API pour interdire à Chrome de suspendre ses flux. Ce comportement est décidé au niveau du renderer process, en dehors du scope JavaScript. Il est accentué dans certains contextes de navigation protégés où Chrome applique des politiques de confidentialité plus strictes (isolation des processus, restrictions caméra/micro en arrière-plan).

**Amélioration prévue côté VisiConnect :**
Une bannière d'avertissement sera ajoutée pour détecter l'événement `visibilitychange` et informer l'utilisateur en temps réel que ses médias sont temporairement suspendus par le navigateur — avec un bouton de réactivation manuelle pour les cas où la reprise automatique de LiveKit ne suffit pas.

---

### 2. Fond flou — la jauge d'intensité ne changeait rien
**✅ Corrigé**

Le problème venait de deux comportements erronés dans le moteur de traitement vidéo :

1. **Réutilisation de l'ancien processeur** : quand l'intensité changeait, l'application réutilisait le processeur MediaPipe déjà instancié sans recréer un nouveau pipeline avec le bon rayon. Le rayon était transmis mais ignoré à l'exécution.
2. **Absence de bridge entre le slider et le moteur** : le panneau IA enregistrait la valeur dans le `localStorage`, mais aucun `useEffect` ne relayait ce changement vers le hook LiveKit.

**Corrections apportées :**
- `toggleBlur()` recrée systématiquement un nouveau processeur `BackgroundBlur(newRadius)` dès que l'intensité change, au lieu de réutiliser le cache.
- Un `useEffect` dédié dans `MeetingRoom` surveille `aiSettings.backgroundBlur.blurAmount` et déclenche `toggleBlur(newAmount)` à chaque modification du slider.

---

### 3. Fond flou — ne se désactivait pas correctement
**✅ Corrigé**

Lorsque l'utilisateur désactivait la fonctionnalité dans le panneau IA, le flou persistait car `toggleBlur(0)` n'atteignait pas systématiquement le chemin de désactivation. Le code appelait maintenant `videoTrack.stopProcessor()` via LiveKit lorsque le rayon cible est nul ou nég, ce qui détruit proprement le pipeline MediaPipe et restaure le flux vidéo brut.

---

### 4. Fond flou — précision de la segmentation
**⚠️ Limite matérielle et algorithmique**

La netteté de la séparation sujet/fond dépend directement de la résolution de la webcam et des conditions d'éclairage. Le modèle MediaPipe utilisé (`selfie_segmentation`, mode paysage) est optimisé pour les webcams standard, mais peut laisser passer des éléments éloignés dans le fond si le contraste entre le sujet et l'arrière-plan est insuffisant. Ce n'est pas un bug — c'est une limite connue des modèles de segmentation légers fonctionnant 100 % côté client sans GPU dédié.

---

### 5. Tableau blanc — le bouton « Fermer » chevauchait la palette de couleurs
**✅ Corrigé**

Le bouton de fermeture était positionné en `top: 20, right: 20`, exactement là où tldraw place sa palette de couleurs et ses outils de style. Il a été repositionné en **bas de l'overlay, centré horizontalement**, sous forme d'une pilule fixe `bottom: 16px / left: 50%`. Il ne chevauche plus aucun élément de l'interface tldraw quelle que soit la résolution ou le niveau de zoom.

---

### 6. Tableau blanc — la jauge d'opacité est ambiguë et mal positionnée
**✅ Traitement CSS appliqué**

La jauge d'opacité de tldraw se trouvait dans la même section que la palette de couleurs, sans pictogramme distinctif, ce qui pouvait laisser croire qu'il s'agissait d'un contrôle de taille de crayon. Des surcharges CSS ont été appliquées directement sur le composant tldraw pour :
- Ajouter un `padding-bottom` sur `.tlui-layout__bottom`, repoussant la toolbar vers le haut et libérant de l'espace sous le panneau de style.
- Garantir que le slider d'opacité reste interactif (`pointer-events: all`) même lorsque d'autres couches sont présentes.

> Note : tldraw étant une bibliothèque tierce dont l'interface interne n'est pas directement modifiable, certains ajustements fins nécessitent des surcharges CSS ciblées sur les classes internes du composant. Une refonte plus profonde de l'UI du tableau blanc reste envisageable à terme.

---

### 7. Tableau blanc — export PDF
**⏳ À planifier**

tldraw propose nativement l'export SVG et PNG via son menu. L'ajout d'un export PDF dédié (via une conversion SVG → PDF côté client, par exemple avec `jspdf`) est une amélioration pertinente et planifiée pour une prochaine itération.

---

### 8. Boutons « Activer l'IA vidéo » et « Fonctionnalités IA » — même icône
**✅ Corrigé**

Les deux boutons utilisaient l'icône `Sparkles` (étoile scintillante), ce qui rendait leurs fonctions indistinguables visuellement. La distinction suivante a été appliquée dans `BottomControlBar` :
- **Fonctionnalités IA** (ouvre le panneau de paramètres) → icône `Wand2` (baguette magique)
- **Activer l'IA vidéo** (active le moteur de rendu vidéo) → icône `Sparkles` conservée

---

### 9. Enregistrement — capte la voix même avec le micro coupé
**✅ Corrigé**

Le hook `useRecording` appelait systématiquement `navigator.mediaDevices.getUserMedia({ audio: true })` au démarrage de l'enregistrement, indépendamment de l'état du micro dans la réunion. Le flux micro de LiveKit et le flux capturé par `getUserMedia` sont deux pipelines distincts — couper le micro dans la réunion ne coupait donc pas la source physique sollicitée par `RecordRTC`.

**Correction :** `startRecording()` accepte désormais un paramètre `{ includeMic: boolean }`. `MeetingRoom` transmet `{ includeMic: isMicrophoneEnabled }` lors de l'appel : si le micro est coupé dans la réunion au moment du lancement de l'enregistrement, aucune piste audio micro n'est ajoutée au flux combiné. La capture audio du partage d'écran (son système) reste fonctionnelle indépendamment.

---

### 10. Bouton d'enregistrement — icône contre-intuitive (cercle vide)
**✅ Corrigé**

La convention standard pour l'enregistrement vidéo/audio est :
- **Prêt à enregistrer** → cercle plein rouge (REC)
- **En cours d'enregistrement** → carré blanc (STOP)

Le bouton affichait un cercle vide (`Circle` sans `fill`), peu lisible. Il a été mis à jour dans `BottomControlBar` :
- État inactif : `<Circle fill="#ef4444" stroke="#ef4444" />` — cercle rouge plein
- État actif : `<Square fill="white" stroke="none" />` — carré blanc

---

### 11. Tableau blanc — comportements positifs notés
**✅ Fonctionnalités voulues**

- Les effets dynamiques du crayon sont bien intentionnels et font partie de l'expérience tldraw native.
- La zone de travail infinie est également une caractéristique de tldraw, particulièrement adaptée aux sessions de brainstorming longues.

---

### 12. Transcription IA ne fonctionne pas sur tous les navigateurs
**⚠️ Limitation navigateur — Chrome et Edge uniquement**

La transcription utilise la **Web Speech API**, une API navigateur non standardisée universellement. Elle est disponible sur Chrome et Edge, mais absente de Firefox et Safari. Aucune alternative technique 100 % gratuite et côté client n'existe actuellement pour ces navigateurs. L'utilisation de Chrome est recommandée pour cette fonctionnalité.

---

### 13. Indicateur niveau microphone manquant
**✅ Corrigé (session précédente)**

Un anneau lumineux bleu pulse autour du bouton microphone en fonction du volume capté. L'anneau disparaît quand le micro est coupé. Un message de guidance s'affiche si les permissions sont refusées par le navigateur.

---

### 14. Chat qui se fermait automatiquement après un envoi
**✅ Corrigé (session précédente)**

La logique de fermeture automatique des panneaux ne s'applique plus au chat. Il reste ouvert après chaque envoi de message.

---

### 15. Mode IA complet instable
**✅ Amélioré (session précédente)**

Le chargement répété des modules WASM de traitement vidéo a été corrigé. Les modules lourds ne sont plus réinstanciés à chaque activation.

---

### 16. Stats Monitor ne se synchronisait pas avec les paramètres
**✅ Corrigé (session précédente)**

L'état du Stats Monitor est maintenant synchronisé en temps réel avec le toggle dans le panneau des paramètres.

---

## 🌐 Site web

---

### 17. Absence de boutons « Créer » et « Rejoindre » sur le tableau de bord
**✅ Corrigé**

Le tableau de bord (`/dashboard`) ne proposait aucun point d'entrée direct vers une réunion — il fallait passer par l'accueil ou l'URL manuellement. Deux actions ont été ajoutées dans l'en-tête du tableau de bord :
- **Créer une réunion** : génère un identifiant aléatoire et redirige vers `/room/{id}`.
- **Rejoindre** : champ de saisie pour entrer un code de réunion et rejoindre directement.

---

### 18. Messages d'erreur paiement peu clairs (fonds insuffisants, carte expirée)
**✅ Corrigé — interface Stripe désormais en français**

Les messages d'erreur affichés lors d'un échec de paiement (fonds insuffisants, carte expirée, etc.) sont générés et affichés directement par Stripe Checkout, pas par VisiConnect. Ces messages étaient en anglais car la locale n'était pas configurée. Le paramètre `locale: 'fr'` a été ajouté à la création de session Stripe côté serveur. Stripe affiche maintenant ses messages en français :
- Fonds insuffisants → *« Votre carte ne dispose pas de fonds suffisants. »*
- Carte expirée → *« Votre carte a expiré. »*

---

### 19. Confirmation d'authentification 3D Secure en anglais
**⚠️ Hors contrôle — message émis par la banque émettrice**

La fenêtre de confirmation 3D Secure (vérification par SMS ou application bancaire) est générée et envoyée directement par la **banque émettrice de la carte**, pas par Stripe ni par VisiConnect. Son contenu, sa langue et son design sont entièrement déterminés par l'établissement bancaire. Nous n'avons aucune capacité technique à modifier ce message.

---

### 20. Page d'accueil — sections trop uniformes, manque de contraste visuel
**✅ Partiellement traité — contraste des sections corrigé**

Les sections de la page d'accueil (`TrustedSection`, `FeaturesSection`, `PricingSectionWrapper`, `ContactSection`) utilisaient toutes le même fond blanc (`hsl(var(--card))`), rendant l'ensemble visuellement monotone. Ces sections alternent désormais entre le fond de base et `hsl(var(--muted))` (gris-bleu discret en mode clair, légèrement plus foncé en mode sombre), créant une séparation visuelle claire entre chaque bloc.

Le retour plus large sur l'identité de marque (typographie, palette de couleurs, différenciation par rapport aux concurrents) est une problématique de design stratégique qui dépasse le cadre d'un correctif de code. Ce point est pris en compte pour une refonte graphique ultérieure.

---

### 21. Pages du footer inaccessibles depuis la navigation principale
**✅ Corrigé**

Des pages comme le guide d'utilisation, la documentation, les intégrations et la page sécurité n'étaient accessibles que depuis le footer — sans CTA ni lien dans la navigation principale. Un menu déroulant **« Ressources »** a été ajouté dans la barre de navigation desktop et dans le menu mobile, avec les entrées suivantes :
- Guide d'utilisation (`/user-guide`)
- Documentation (`/docs`)
- Intégrations (`/integrations`)
- Sécurité (`/security`)

---

### 22. Indicateur de langue partiellement masqué par le header
**✅ Corrigé**

Le badge indiquant la langue sélectionnée (ex. « FR ») était positionné en bas à droite du bouton et glissait sous le `z-index` du header. Le badge a été repositionné en haut à droite (`-top-1 -right-1`) avec `z-index: 10`, le rendant toujours visible au-dessus de tous les éléments de l'interface.

---

### 23. Favicon manquant
**✅ Corrigé**

Le fichier `favicon.ico` était vide (0 octet). Un favicon SVG vectoriel a été créé (`/public/favicon.svg`) avec les initiales « VC » sur fond bleu (`#2563eb`), cohérent avec la charte de VisiConnect. Le fichier `index.html` a été mis à jour pour prioriser le SVG (support natif dans les navigateurs modernes) avec fallback sur le `.ico` pour les anciens navigateurs.

---

### 24. Paiement — session Stripe non opérationnelle
**✅ Opérationnel (session précédente)**

Le système de paiement Stripe est entièrement fonctionnel en mode test. Coordonnées fictives pour les tests :
- Carte : `4242 4242 4242 4242` — Date : toute date future — CVV : 3 chiffres quelconques
- Carte refus « fonds insuffisants » : `4000 0000 0000 9995`
- Carte refus « expirée » : `4000 0000 0000 0069`

---

### 25. Plan d'abonnement non affiché clairement dans le profil
**✅ Corrigé (session précédente)**

L'onglet « Abonnement » affiche le forfait actuel, le cycle de facturation, et des boutons contextuels (upgrade / downgrade) synchronisés avec les métadonnées Clerk.

---

### 26. Cohérence des tarifs entre l'accueil et la page Tarifs
**✅ Cohérent — vérifié**

Les mêmes trois forfaits (Starter gratuit, Pro 15 €/mois, Business 35 €/mois) sont affichés sur les deux pages. Aucune divergence de contenu.

---

### 27. Illustration « Salle de réunion immersive » inadaptée
**⏳ À remplacer**

Noté. Une illustration plus représentative d'une réunion vidéo en ligne sera sélectionnée.

---

### 28. Dashboard / Studio / Analytique non accessibles
**⏳ En développement**

Ces modules sont prévus dans la feuille de route mais ne sont pas encore ouverts au public bêta. Ils seront déployés progressivement.

---

### 29. Retours positifs — navigation, chargement, traductions multilingues
**✅ Positifs — à maintenir**

La lisibilité, la fluidité de navigation, les temps de chargement et la qualité des traductions (gérées intégralement à la main) ont été appréciés. Ces points resteront prioritaires dans les évolutions futures.

---

## 📋 Tableau de synthèse

| Point soulevé | Catégorie | État |
|---|---|---|
| Caméra/micro coupés — fenêtre en surimpression | Visio | ⚠️ Comportement Chrome — expliqué |
| Jauge flou sans effet | Visio | ✅ Corrigé |
| Fond flou ne se désactivait pas | Visio | ✅ Corrigé |
| Fond flou — précision segmentation | Visio | ⚠️ Limite matérielle |
| Bouton fermer tableau blanc — chevauchement palette | Visio | ✅ Corrigé |
| Jauge opacité tldraw — positionnement ambigu | Visio | ✅ CSS appliqué |
| Export PDF tableau blanc | Visio | ⏳ Planifié |
| Icônes IA vidéo / Fonctionnalités IA identiques | Visio | ✅ Corrigé |
| Enregistrement — capte micro coupé | Visio | ✅ Corrigé |
| Bouton enregistrement — cercle vide contre-intuitif | Visio | ✅ Corrigé |
| Tableau blanc — zone infinie, effets crayon | Visio | ✅ Fonctionnel (voulu) |
| Transcription IA — incompatible Firefox/Safari | Visio | ⚠️ Limitation navigateur |
| Indicateur niveau microphone | Visio | ✅ Corrigé |
| Chat se fermait après envoi | Visio | ✅ Corrigé |
| Mode IA complet instable | Visio | ✅ Amélioré |
| Stats Monitor désynchronisé | Visio | ✅ Corrigé |
| Boutons Créer/Rejoindre absents du dashboard | Site | ✅ Corrigé |
| Messages Stripe non traduits (fonds insuf., carte expirée) | Site | ✅ Corrigé (`locale: 'fr'`) |
| Confirmation 3D Secure en anglais | Site | ⚠️ Émis par la banque — hors contrôle |
| Sections homepage trop uniformes | Site | ✅ Partiellement corrigé |
| Pages footer inaccessibles depuis la nav | Site | ✅ Corrigé (dropdown Ressources) |
| Indicateur langue masqué par le header | Site | ✅ Corrigé |
| Favicon manquant | Site | ✅ Corrigé |
| Système de paiement non opérationnel | Site | ✅ Opérationnel |
| Plan abonnement invisible dans le profil | Site | ✅ Corrigé |
| Incohérence tarifs accueil / page Tarifs | Site | ✅ Cohérent (vérifié) |
| Illustration « Salle de réunion immersive » | Site | ⏳ À remplacer |
| Dashboard / Studio / Analytique inaccessibles | Site | ⏳ En développement |
| Navigation, chargement, traductions | Site | ✅ Positif |


---

## 🎥 En visio-conférence

---

### 1. Le tableau blanc disparaît après quelques secondes
**✅ Corrigé**

Le tableau blanc se coupait à cause d'un problème de licence qui faisait planter toute la salle. Une protection a été mise en place : si le tableau blanc rencontre un problème, il affiche désormais un message d'erreur discret **sans perturber le reste de la réunion**. La licence a également été configurée correctement, ce qui règle la cause principale.

---

### 2. Fond flou peu réactif et qui ne se désactive pas correctement
**⏳ Partiellement traité — à améliorer**

Le fond flou fonctionne mais son comportement n'est pas encore assez fluide ni fiable. La désactivation demande parfois une action supplémentaire. Ce point reste sur la liste des corrections à apporter. La réactivité entre les niveaux fort/faible sera également revue.

---

### 3. Fenêtre de l'assistant IA — impossible de saisir du texte
**✅ Corrigé**

Le problème était que le champ de saisie utilisait du texte **blanc sur fond blanc** — le texte tapé était invisible. Le fond du champ a été corrigé pour utiliser un fond sombre, rendant le texte parfaitement lisible. Vous pouvez désormais taper vos questions à l'assistant IA sans problème.

---

### 4. L'IA Vidéo s'active mais sans différence visible
**⏳ Amélioration partielle**

Un travail a été fait pour rendre le moteur IA vidéo (flou d'arrière-plan, effets) plus stable et moins gourmand en ressources. Cependant, l'effet reste peu visible avec des webcams d'ancienne génération, car celles-ci ont une résolution et une qualité insuffisantes pour que l'IA puisse faire une distinction nette entre le sujet et le fond. Ce n'est pas un bug à proprement parler, mais une limite technique liée au matériel.

---

### 5. La caméra et le son se coupent quand on change de fenêtre
**⏳ Non corrigé — comportement du navigateur**

Ce comportement est imposé par le navigateur (Chrome, Edge, Firefox) pour économiser les ressources et protéger la vie privée. Lorsqu'un onglet passe en arrière-plan, le navigateur peut suspendre certains flux. Une piste d'amélioration serait d'afficher une alerte visible lorsque cela se produit, pour que l'utilisateur sache immédiatement qu'il doit réactiver son micro. Ce point est noté pour une prochaine mise à jour.

---

### 6. Le Chat se ferme tout seul après envoi d'un message
**✅ Corrigé**

Le chat **reste ouvert** après l'envoi d'un message. La logique de fermeture automatique a été modifiée pour ne s'appliquer qu'aux autres panneaux (sondages, paramètres), pas au chat. Vous pouvez envoyer autant de messages que vous voulez sans que la fenêtre se referme.

---

### 7. Pas de moyen de vérifier que le micro fonctionne bien
**✅ Corrigé**

Un **indicateur visuel de niveau sonore** a été intégré directement sur le bouton microphone. Quand vous parlez, un anneau lumineux bleu s'illumine autour du bouton et pulse selon le volume de votre voix — plus vous parlez fort, plus l'anneau est visible. Cela permet de savoir immédiatement si votre micro vous capte correctement, sans aller chercher une information ailleurs. Quand le micro est coupé, l'anneau disparaît.

> De plus, si le navigateur vous refuse l'accès au micro, un message explicatif s'affiche maintenant pour vous guider sur comment débloquer les permissions depuis la barre d'adresse.

---

### 8. La transcription ne fonctionne pas
**⚠️ Implémentée — limitation du navigateur**

La transcription en temps réel est bien intégrée à la plateforme et peut fonctionner. Cependant, elle utilise une technologie du navigateur (Web Speech API) qui **ne fonctionne que sur Chrome et Edge** — elle n'est pas disponible sur Firefox ou Safari. Pour l'activer, rendez-vous dans le panneau « Fonctionnalités IA » puis activez la transcription. Si vous utilisez Firefox, le passage à Chrome devrait résoudre le problème.

---

### 9. Mode « complet » de l'IA plante
**✅ Amélioration apportée**

Le mode complet de l'IA sollicite beaucoup de ressources (traitement d'image en temps réel). Un problème de chargement répété de composants lourds a été identifié et corrigé : ces éléments ne sont plus téléchargés plusieurs fois inutilement, ce qui réduit les risques de plantage. Le mode complet devrait être plus stable, notamment sur des connexions ou des machines moins puissantes.

---

### 10. Le Stats Monitor ne se désactive pas depuis les paramètres
**✅ Corrigé**

Le Stats Monitor est maintenant correctement synchronisé avec le panneau des paramètres. Activer ou désactiver l'option dans les réglages ferme ou ouvre le moniteur directement, sans avoir besoin de repasser par le bouton dans la barre du bas.

---

## 🌐 Sur le site (accueil, tarifs, profil)

---

### 11. Erreur lors de la création d'une session de paiement
**✅ Système de paiement complet — opérationnel**

Le système de paiement Stripe est entièrement intégré et fonctionnel :

- Au clic sur « S'abonner », une session Stripe Checkout est créée côté serveur et le client est redirigé vers la page de paiement Stripe.
- Après un paiement réussi, Stripe redirige vers `/success?session_id=...` où le paiement est vérifié côté serveur.
- Le plan souscrit est automatiquement enregistré dans les métadonnées du compte Clerk de l'utilisateur.
- La page profil se met à jour immédiatement pour afficher le bon forfait.
- Les boutons « Passer à ce plan » et « Rétrograder » sont dynamiques selon le plan actuel.

Le mode test Stripe est intentionnellement actif pendant la phase bêta. Pour tester un paiement, utiliser les coordonnées fictives Stripe :

- **Numéro de carte** : `4242 4242 4242 4242`
- **Date d'expiration** : n'importe quelle date future (ex : `12/30`)
- **CVV** : n'importe quels 3 chiffres (ex : `123`)

**Reçus et factures par e-mail** : Stripe est configuré pour envoyer automatiquement un reçu par e-mail au client après chaque paiement réussi. L'adresse e-mail de l'utilisateur (récupérée depuis son compte) est transmise à Stripe lors de la création de la session de paiement. Les paramètres Billing Stripe envoient également les factures d'abonnement.

---

### 12. L'abonnement souscrit n'est pas visible clairement dans le profil
**✅ Complet — plan affiché et gérable depuis le profil**

L'onglet « Abonnement » dans l'espace personnel a été entièrement mis à jour :

- Votre **forfait actuel** est affiché clairement (Starter, Pro ou Business) avec le cycle de facturation (mensuel ou annuel).
- Un bouton **« Passer à ce plan »** apparaît sur les forfaits supérieurs et redirige vers le paiement Stripe.
- Un bouton **« Rétrograder vers le plan Starter »** permet de repasser au plan gratuit en un clic, sans aucune manipulation complexe.
- Le profil se **rafraîchit automatiquement** après tout changement de plan.

---

### 13. Présentation générale, navigation, chargement
**✅ Retour positif — rien à corriger**

Merci pour ces retours encourageants ! La lisibilité, le choix des polices, la rapidité de chargement et la compatibilité avec les outils de sécurité (ex. Kaspersky) font partie des priorités du projet. Ces aspects resteront soignés dans les prochaines évolutions.

---

### 14. L'illustration de la section « Salle de réunion immersive » n'est pas appropriée
**⏳ Non corrigé — noté**

Le choix de cette image est effectivement discutable. Une illustration plus représentative d'une réunion en ligne sera sélectionnée pour mieux correspondre au contenu de cette section.

---

### 15. Le dashboard, mode studio et analytique ne sont pas accessibles
**⏳ Fonctionnalités en développement**

Ces fonctionnalités sont bien prévues dans la feuille de route mais ne sont pas encore disponibles pour les bêta-testeurs. Elles seront ouvertes progressivement dans les prochaines versions.

---

### 16. Les abonnements proposés en bas de la page d'accueil sont différents de la page Tarifs
**✅ Cohérent — pas de bug**

Après vérification approfondie, les deux pages affichent bien les **mêmes trois formules** : Starter (gratuit), Pro (15 €/mois) et Business (35 €/mois), aux mêmes tarifs. Si une différence vous avait semblé visible, il s'agissait probablement d'un problème d'affichage lié à votre navigateur ou d'un cache d'ancienne version. La version actuelle est cohérente sur toutes les pages.

---

### 17. Versions en Allemand et en Russe
**✅ Retour positif — rien à corriger**

Merci ! Les traductions sont gérées avec soin et couvrent actuellement plusieurs langues. D'autres langues seront ajoutées progressivement.
Les traductions ont été faite entièrement a la main par mes soins. 

---

## 📋 Résumé rapide

| Point soulevé | État |
|---|---|
| Tableau blanc qui disparaît | ✅ Corrigé |
| Fond flou peu réactif | ⏳ À améliorer |
| IA assistant — saisie impossible | ✅ Corrigé |
| IA Vidéo sans effet visible | ⏳ Limite matériel |
| Son/caméra coupés en arrière-plan | ⏳ Limitation navigateur |
| Chat qui se ferme tout seul | ✅ Corrigé |
| Pas d'indicateur niveau micro | ✅ Corrigé (anneau lumineux) |
| Transcription IA ne fonctionne pas | ⚠️ Chrome/Edge uniquement |
| Mode complet IA plante | ✅ Amélioré |
| Stats Monitor ne se désactive pas | ✅ Corrigé |
| Erreur paiement abonnement | ✅ Système complet (Stripe → Clerk → profil) |
| Type d'abonnement invisible dans le profil | ✅ Plan affiché + boutons upgrade/downgrade |
| Présentation / navigation / chargement | ✅ Positif |
| Illustration "Salle de réunion immersive" | ⏳ À changer |
| Dashboard / Studio / Analytique non accessibles | ⏳ En développement |
| Abonnements incohérents accueil vs tarifs | ✅ Cohérent (vérifié) |
| Versions multilingues | ✅ Positif |
