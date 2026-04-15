# ��� Guide Officiel - Bêta Privée VisioConnect

Bienvenue dans la Bêta Privée de **VisioConnect** ! 
Si vous lisez ce document, c'est que vous avez été sélectionné pour faire partie de nos tous premiers utilisateurs informés. Ce guide a pour but de vous accompagner pas à pas durant toute la phase de test, des fonctionnalités de base jusqu'aux options premium.

---

## 1. ���️ Comment accéder à la plateforme et créer un compte

### A. Se rendre sur la plateforme
Rendez-vous sur l'adresse officielle de notre environnement de test :
��� **[https://visioconnect-1.vercel.app/](https://visioconnect-1.vercel.app/)**

### B. Créer votre compte
Pour la sécurité des réunions, la création d'un compte personnel est requise.
1. **Méthode rapide (Recommandé) :** Cliquez sur l'inscription rapide via **Google** ou **GitHub**. Votre compte sera créé instantanément sans confirmation requise.
2. **Méthode classique (E-mail) :** 
   - Renseignez votre adresse e-mail valide.
   - Un **code de sécurité à 6 chiffres** vous sera envoyé par e-mail.
   - Recopiez ce code sur le site pour valider définitivement votre inscription.

---

## 2. ��� L'accès VIP : Le Code Bêta

L'application n'est pas encore ouverte au grand public. Lors de votre parcours, un **Code d'Accès Bêta** vous sera demandé pour déverrouiller la plateforme.
- Vous trouverez ce code unique et confidentiel dans votre e-mail d'invitation (format : `VC-XXXX-XXXX`).
- Une fois saisi et validé, vous accéderez au portail complet.

---

## 3. ��� Tester le système d'Abonnement (Stripe)

Nous avons besoin de vous pour tester notre flux de paiement (amélioration vers un forfait Pro/Premium). 
⚠️ **L'application est configurée en mode TEST. AUCUN ARGENT RÉEL NE SERA DÉBITÉ. Il est d'ailleurs impossible d'utiliser une vraie carte.**

Rendez-vous sur la page de facturation (Premium) et utilisez ces cartes bancaires fictives fournies par Stripe pour simuler différents scénarios d'achat :

### ✅ Scénario 1 : Paiement Réussi (À tester en priorité)
Vérifiez que votre compte obtient bien les avantages "Premium" après le paiement.
- **Numéro de carte :** `4242 4242 4242 4242`
- **Date d'expiration :** N'importe quelle date dans le futur (ex: `12 / 28`)
- **CVC (Cryptogramme) :** N'importe quels 3 chiffres (ex: `123`)
- **Nom sur la carte :** Testeur VisioConnect
- **Code postal :** N'importe lequel (ex: `75001`)

### ❌ Scénario 2 : Paiement Refusé (Fonds insuffisants)
Vérifiez que le site vous affiche correctement un message d'erreur indiquant que la carte n'a pas assez de fonds.
- **Numéro de carte :** `4000 0000 0000 0002`

### ❌ Scénario 3 : Carte Expirée
Simulez l'utilisation d'une carte dont la date est dépassée.
- **Numéro de carte :** `4000 0000 0000 0003`

### ��� Scénario 4 : Vérification 3D Secure (Confirmation SMS de banque)
Idéal pour voir comment réagit VisioConnect lorsqu'une page de banque s'ouvre pour vérifier l'identité.
- **Numéro de carte :** `4000 0000 0000 3063`

---

## 4. ��� Vos missions de test principales

Outre le paiement, voici les aspects de la plateforme que nous cherchons à éprouver :

### A. L'Expérience Globale & Le Design (Critique)
- **Navigation sur tout le site :** Ne vous limitez surtout pas à la page de visioconférence ! Explorez la page d'accueil, votre tableau de bord, la gestion de profil, les tarifs, et toutes les autres pages annexes. 
- **L'Ergonomie (UX) :** Le parcours global vous semble-t-il fluide et logique ? Est-ce facile de s'y retrouver sans aide ?
- **Le Visuel (UI) :** Que pensez-vous du rendu général, des couleurs, du thème et des polices ? L'interface fait-elle "Premium" ? Toute suggestion d'amélioration esthétique est la bienvenue !

### B. Le Cœur Technique (La Visioconférence)
- **La qualité Vidéo & Audio :** Allumez/coupez votre caméra. Mutez votre micro. Le temps de latence est-il bon ?
- **Les Effets (Nouveau) :** Testez la fonctionnalité de *flou d'arrière-plan* en utilisant la nouvelle jauge d'intensité personnalisable.
- **Le Partage d'écran :** Partagez un onglet et vérifiez la netteté du texte pour les autres.
- **Le Tableau Blanc interactif (Whiteboard) :** Dessinez à plusieurs en simultané et observez la synchronisation.
- **Le système de Chat :** Envoyez des messages pendant la réunion.

---

## 5. ��� Comment signaler un Bug ou proposer une Amélioration ?

Votre retour d'expérience est notre atout numéro un. Nous attendons deux types de retours de votre part :

### ��� 1. Retours Design & Expérience Utilisateur
Soyez critiques et n'hésitez pas à nous dire spontanément : *"Je trouverais ça plus joli si...", "J'ai eu du mal à trouver comment...", "Cette page fait un peu vide"*. Chaque remarque nous aide à perfectionner le rendu visuel.

### ���️ 2. Signalement de Bugs Techniques
Si une vidéo fige, qu'un bouton de paiement ne répond pas ou qu'une image ne s'affiche pas, merci de nous fournir un maximum d'indices :
1. **Sur quelle page l'erreur s'est-elle produite ?** (Page de paiement, Salle d'attente, Tableau blanc...)
2. **Sur quel matériel ?** (PC Windows, Mac, iPhone, Android...)
3. **Sur quel navigateur ?** (Chrome version X, Safari, Edge...)
4. **Description de l'erreur :** "J'ai cliqué sur le bouton de la carte 4242... et la page est restée blanche."
5. *(Optionnel mais génial)* : Une **capture d'écran** ou une photo de la console développeur (`Touche F12` > Onglet `Console`).

��� **Où envoyer vos retours ?**
1. **Le formulaire de contact (Recommandé) :** Utilisez la section contact de notre plateforme pour nous expliquer tout en détail.
2. **Par e-mail :** À l'adresse directe **theo.garces.aido@gmail.com**.

---

## 6. ❓ Foire Aux Questions (FAQ)

**Q. Je suis bloqué sur l'erreur "La caméra est utilisée par une autre application" (Device in Use).**
> Assurez-vous d'avoir fermé Microsoft Teams, Zoom, Discord, Google Meet ou OBS. Ces logiciels peuvent monopoliser l'accès matériel à votre webcam en arrière-plan.

**Q. J'ai simulé le paiement avec la carte `4242...` mais mon compte n'a pas changé de statut.**
> Les webhooks (le pont entre Stripe et nos serveurs) peuvent parfois prendre quelques secondes à se déclencher en mode "Test". Actualisez la page au bout d'une minute !

**Q. Dois-je payer quelque chose à la fin de la période de test ?**
> Non. Votre compte "Bêta-Testeur" est 100% gratuit et vous conserverez les fonctionnalités premium testées à vie en guise de remerciement pour votre aide.

**Q. Le système refuse mon Code Bêta.**
> Vérifiez qu'il n'y ait pas d'espace vide (copié par erreur) avant ou après le code, et veillez à bien inclure les tirets du format `VC-XXXX-XXXX`.

---

*Nous vous remercions infiniment de consacrer de votre temps à bâtir le futur de la collaboration en ligne avec nous.* 

*— L'Équipe Fondatrice de VisioConnect.*
