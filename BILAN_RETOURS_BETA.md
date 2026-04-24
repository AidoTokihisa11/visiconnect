# Bilan des retours bêta — VisiConnect
*Réponse aux remarques du bêta-testeur — Mise à jour : avril 2026 (v2)*

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
