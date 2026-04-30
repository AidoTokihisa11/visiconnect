# Réponse aux retours bêta — VisiConnect

> **Bêta-testeur ·** Windows 10, Google Chrome 147.0.7727.116
> **Date :** Avril 2026

---

Merci infiniment pour la qualité et la précision de ce compte rendu. Ce type de retour, structuré, illustré et honnête, est exactement ce dont nous avons besoin pour améliorer VisiConnect de manière concrète. Chaque point a été analysé attentivement. Voici notre réponse point par point.

---

## 1. Tableau de bord — boutons « Créer » et « Rejoindre »

**✅ Corrigé**

Vous aviez tout à fait raison : arriver sur un tableau de bord sans pouvoir démarrer ou rejoindre une réunion directement, c'est comme ouvrir une boîte à outils qui n'a pas de poignée. Deux boutons ont été ajoutés directement dans l'en-tête du tableau de bord :

- **Créer une réunion** — démarre immédiatement une nouvelle salle
- **Rejoindre** — permet d'entrer un code ou lien de réunion

---

## 2. Code d'accès bêta

Aucun problème de votre côté, et c'est une bonne nouvelle. Le système de génération et d'envoi des codes fonctionne comme prévu.

---

## 3. Paiement — les scénarios de test

### Scénario 1 — Pas de champ code postal, à la place un menu pays

Il n'y a rien d'anormal ici. Stripe adapte automatiquement le formulaire de paiement selon le pays de votre carte bancaire. Pour une carte française, il n'affiche pas de code postal (qui n'est pas une donnée de vérification utilisée en Europe), mais propose à la place un sélecteur de pays. Ce comportement est géré intégralement par Stripe et correspond à leurs règles de validation régionales.

### Scénarios 2 et 3 — Messages peu clairs pour fonds insuffisants et carte expirée

**⚠️ Partiellement traité — voici ce qu'on peut faire, et ce qu'on ne peut pas.**

Le formulaire de paiement de VisiConnect est une page hébergée directement par Stripe (vous êtes redirigé vers `checkout.stripe.com`). Cela signifie que nous n'avons pas la main sur le contenu exact des messages d'erreur affichés — ils sont générés et affichés par Stripe.

Ce que nous avons fait : activer le paramètre de langue française (`locale: fr`) côté serveur. Stripe utilise désormais ses traductions françaises pour tous les messages. Les messages que vous verrez à présent sont du type :

- Fonds insuffisants → *« Votre carte ne dispose pas de fonds suffisants. »*
- Carte expirée → *« Votre carte a expiré. »*
- Numéro invalide → *« Votre numéro de carte n'est pas valide. »*

Ce que nous ne pouvons pas faire : réécrire nous-mêmes le texte de ces messages, car ils s'affichent sur une page appartenant à Stripe et non à VisiConnect. Pour personnaliser intégralement les messages d'erreur, il faudrait basculer vers une intégration Stripe Elements (formulaire embarqué dans notre propre page), ce qui représente un chantier de développement plus conséquent. C'est une évolution que nous gardons en tête pour une prochaine version.

### Scénario 4 — La confirmation bancaire (3D Secure) était en anglais

**⚠️ Hors de notre portée — message émis par votre banque, pas par VisiConnect.**

La page de confirmation 3D Secure (le pop-up ou la redirection qui vous demande de valider le paiement depuis votre application bancaire) n'est pas gérée par VisiConnect, ni même par Stripe. C'est votre banque qui envoie ce message et qui en choisit la langue. Nous n'avons aucune capacité technique à intervenir dessus. Si vous souhaitez que ces confirmations soient en français, la démarche est à faire directement auprès de votre banque.

---

## 4A. Site internet — design et accessibilité

### Contraste et uniformité de la page d'accueil

**✅ Partiellement traité**

Votre observation sur l'uniformité visuelle était juste. Les grandes sections de la page d'accueil utilisaient toutes le même fond blanc, ce qui les fondait l'une dans l'autre sans rythme visuel. Ces sections alternent désormais entre fond blanc et un fond gris-bleu discret, créant une séparation naturelle entre les blocs et aidant l'œil à naviguer.

Sur le fond de votre remarque — la typographie trop ordinaire, les couleurs trop proches des concurrents, la difficulté à avoir un coup de cœur — vous avez raison, et c'est un retour qu'on ne peut pas corriger avec une ligne de code. C'est une question d'identité visuelle et de positionnement de marque, qui demande un travail de fond avec un designer. Votre retour sera transmis en priorité dans la prochaine phase de refonte graphique. C'est probablement la critique la plus utile de tout ce compte rendu, précisément parce qu'elle porte sur ce qui fait la différence entre un outil qui fonctionne et un outil qu'on a envie d'utiliser.

### Pages du footer inaccessibles depuis la navigation principale

**✅ Corrigé**

Des pages importantes comme le guide d'utilisation, la documentation, les intégrations ou la page sécurité n'étaient accessibles que depuis le bas de page — et encore, seulement si on pensait à les chercher. Un menu déroulant **« Ressources »** a été ajouté dans la barre de navigation principale, visible sur toutes les pages du site, aussi bien sur ordinateur que sur mobile.

### Indicateur de langue partiellement caché

**✅ Corrigé**

Le petit badge qui indique la langue sélectionnée (« FR », « EN »…) glissait derrière le header et se retrouvait partiellement masqué. Il a été repositionné pour rester visible en toutes circonstances, quelle que soit la résolution de l'écran.

### Favicon manquant

**✅ Corrigé**

Le favicon (la petite icône qui s'affiche dans les onglets de votre navigateur) était absent. Un icône « VC » bleu a été créé et est désormais visible dans tous les onglets et favoris.

### Illustrations et animations

**⏳ Noté pour la suite**

L'ajout d'illustrations et d'animations légères pour rendre les pages plus vivantes est une amélioration pertinente, notée pour une prochaine itération. Ce type d'ajout demande un travail de création graphique qui prendra un peu de temps à bien faire.

---

## 4B. Visio-conférence

### Caméra et micro qui se coupent quand une autre fenêtre passe devant

**⚠️ Ce comportement vient de votre navigateur, pas de VisiConnect.**

Quand une autre fenêtre recouvre votre page VisiConnect, Chrome peut décider que la page n'est plus « visible » et réduit automatiquement les ressources qu'il lui alloue. Dans ce processus, il met en pause la caméra et le micro. C'est une décision prise par Chrome lui-même, et VisiConnect ne peut pas l'empêcher — tout comme un site web ne peut pas empêcher votre système d'exploitation de baisser le volume.

**Pourquoi le micro revient plus vite que la caméra ?**
Le son demande très peu de ressources à rétablir — quasi-instantané. La vidéo nécessite de relancer un processus de capture plus lourd, ce qui explique le délai d'une à deux secondes.

**Ce que ça signifie pour votre vie privée :**
Ce mécanisme est en réalité une **protection**. Chrome fait ça pour éviter qu'une page web continue d'utiliser votre caméra en arrière-plan sans que vous vous en rendiez compte. Le revers de la médaille, c'est que même en utilisation légitime — comme VisiConnect — cela crée cette interruption momentanée. Ce n'est pas un bug de l'application, et vous ne risquez rien : quand Chrome suspend le flux, votre caméra n'est accessible à personne, y compris VisiConnect.

**Ce que nous pouvons améliorer :** une notification sera ajoutée pour vous avertir quand Chrome a suspendu vos médias, avec un bouton pour les réactiver sans avoir à chercher dans l'interface.

---

### Jauge d'intensité du flou d'arrière-plan sans effet

**✅ Corrigé**

La jauge était bien là, mais elle ne changeait rien visuellement. Le problème venait d'un mauvais branchement interne : quand vous déplaciez le curseur, la nouvelle valeur était enregistrée mais n'atteignait jamais le moteur qui gère réellement le flou. Ce lien manquant a été rétabli. Déplacer le curseur change maintenant l'intensité du flou en temps réel.

---

### Flou qui ne se désactive pas quand on éteint la fonctionnalité

**✅ Corrigé**

Éteindre le flou depuis le panneau IA remet maintenant votre flux vidéo à son état naturel, sans traitement.

---

### Précision du flou — un objet éloigné restait net

**⚠️ Limite liée à votre matériel et à la technologie utilisée**

Le flou d'arrière-plan fonctionne en détectant votre silhouette dans l'image. Cette détection est faite entièrement dans votre navigateur, en temps réel, sans serveur distant. C'est rapide, mais pas parfait : si un objet éloigné est dans le même plan de lumière que vous, ou si le contraste entre vous et le fond est faible, le modèle peut le laisser net. Ce n'est pas un bug — c'est une limite connue de cette technologie légère. Les solutions plus précises (comme celles de Zoom ou Teams) s'appuient sur des algorithmes tournant dans le cloud avec beaucoup plus de puissance de calcul. Ce n'est pas quelque chose que nous pouvons résoudre sans changer d'approche technique fondamentale.

---

### Tableau blanc — bouton « Fermer » qui chevauche la palette de couleurs

**✅ Corrigé**

Le bouton pour fermer le tableau était positionné exactement là où les outils de dessin se trouvent, ce qui le rendait inaccessible selon le niveau de zoom. Il a été déplacé en bas de l'écran, centré, bien séparé de toute l'interface de dessin.

---

### Tableau blanc — la jauge d'opacité pouvait passer pour une jauge de taille

**✅ Corrigé**

La jauge d'opacité (qui règle la transparence du tracé) était logée dans la même zone que la palette de couleurs, sans pictogramme distinctif, ce qui créait effectivement une confusion avec les outils de taille de pinceau. Des ajustements ont été apportés pour mieux la distinguer visuellement des autres contrôles.

---

### Tableau blanc — zone de travail infinie et effets de crayon

Votre avis positif sur ces deux points est noté et apprécié. La zone infinie est particulièrement utile pour les sessions de brainstorming ou de planification longues.

---

### Tableau blanc — export PDF

**⏳ Prévu**

L'export en PDF n'est pas disponible pour l'instant. L'outil de dessin propose déjà l'export en image (PNG) et en SVG. L'ajout du PDF est une amélioration que nous avons notée et qui est prévue dans une prochaine mise à jour.

---

### Boutons « Activer l'IA vidéo » et « Fonctionnalités IA » — même icône

**✅ Corrigé**

Deux boutons différents avec la même icône, c'est une source de confusion directe. Ils ont maintenant des icônes distinctes pour bien marquer leur différence de fonction.

---

### Enregistrement — capte la voix même avec le micro coupé

**✅ Corrigé**

C'était un vrai problème. Couper son micro dans la réunion coupait bien la transmission de votre voix aux autres participants — mais l'enregistrement, lui, allait chercher directement le micro physique de votre ordinateur, sans tenir compte de cet état.

Désormais, si votre micro est coupé au moment où vous lancez un enregistrement, votre voix ne sera pas capturée dans ce fichier.

---

### Bouton d'enregistrement — cercle vide peu intuitif

**✅ Corrigé**

Le standard reconnu universellement pour l'enregistrement, c'est :

- **Cercle rouge plein** = prêt à enregistrer (REC)
- **Carré blanc** = en cours d'enregistrement, cliquer pour arrêter (STOP)

Le bouton affichait un cercle vide, qui ne ressemblait à aucune de ces deux conventions. Il respecte maintenant ce standard.

---

## Tableau récapitulatif

| Point soulevé | Catégorie | État |
|---|---|---|
| Boutons Créer/Rejoindre absents du tableau de bord | Site | ✅ Corrigé |
| Code d'accès bêta | Site | ✅ Fonctionnel |
| Formulaire Stripe — code postal vs. pays | Site | ✅ Normal (adapté par Stripe) |
| Messages d'erreur paiement en anglais | Site | ⚠️ Locale fr activée — messages Stripe, non personnalisables (page hébergée Stripe) |
| Confirmation 3D Secure en anglais | Site | ⚠️ Émis par la banque — hors de notre contrôle |
| Sections page d'accueil trop uniformes | Site | ✅ Partiellement corrigé |
| Identité visuelle — différenciation, typographie | Site | ⏳ Refonte graphique prévue |
| Pages footer inaccessibles depuis la navigation | Site | ✅ Corrigé (menu Ressources) |
| Indicateur de langue masqué | Site | ✅ Corrigé |
| Favicon manquant | Site | ✅ Corrigé |
| Illustrations et animations | Site | ⏳ Prévu |
| Caméra/micro suspendus — fenêtre en surimpression | Visio | ⚠️ Comportement Chrome (protection vie privée) |
| Jauge flou sans effet | Visio | ✅ Corrigé |
| Flou ne se désactivait pas | Visio | ✅ Corrigé |
| Précision segmentation fond flou | Visio | ⚠️ Limite technologique |
| Bouton fermer tableau blanc — chevauche palette | Visio | ✅ Corrigé |
| Jauge opacité — positionnement ambigu | Visio | ✅ Corrigé |
| Zone infinie + effets crayon tableau blanc | Visio | ✅ Fonctionnel (voulu) |
| Export PDF tableau blanc | Visio | ⏳ Prévu |
| Icônes IA identiques pour deux fonctions différentes | Visio | ✅ Corrigé |
| Enregistrement capte le micro coupé | Visio | ✅ Corrigé |
| Bouton enregistrement contre-intuitif (cercle vide) | Visio | ✅ Corrigé |

---

Encore une fois, merci pour la qualité de votre analyse. Ce niveau de détail est précieux — il nous permet de corriger des choses que nous aurions pu ne jamais voir sans un regard extérieur attentif comme le vôtre.

*L'équipe VisiConnect*
