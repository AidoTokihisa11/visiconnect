# 🎥 Visio Pro - Plateforme de Visioconférence Avancée

Une application de visioconférence moderne et complète construite avec React, WebRTC, Socket.io et Node.js.

## ✨ Fonctionnalités

### 🎯 Fonctionnalités Principales
- **Appels vidéo multi-participants** (jusqu'à 100 participants)
- **Partage d'écran** en temps réel
- **Chat intégré** avec émojis et fichiers
- **Enregistrement de sessions** (simulation)
- **Salles virtuelles** avec IDs personnalisés
- **Whiteboard collaboratif** avec outils de dessin

### 🔐 Authentification & Sécurité
- **Système d'inscription/connexion** complet
- **Stockage local** des identifiants
- **Notifications** en temps réel
- **Validation** des formulaires avancée
- **Interface responsive** et moderne

### 🎨 Interface Utilisateur
- **Design moderne** avec animations fluides
- **Thème sombre** optimisé
- **Composants réutilisables** avec Styled Components
- **Animations** avec Framer Motion
- **Icônes** avec Lucide React

### 🤖 Fonctionnalités Avancées
- **Chatbot IA** intégré
- **Paramètres** personnalisables
- **Gestion des participants** avec rôles
- **Qualité vidéo** adaptative
- **Optimisation** des performances

## 🚀 Technologies Utilisées

### Frontend
- **React 18** - Framework principal
- **React Router** - Navigation
- **Styled Components** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icônes
- **WebRTC** - Communication vidéo/audio

### Backend
- **Node.js** - Runtime serveur
- **Express.js** - Framework web
- **Socket.io** - Communication temps réel
- **CORS** - Gestion des origines croisées

### Outils de Développement
- **Vite** - Build tool moderne
- **ESLint** - Linting du code
- **Prettier** - Formatage du code

## 📁 Structure du Projet

```
Visio-projet/
├── client/                     # Application React
│   ├── public/
│   │   └── index.html         # Template HTML
│   ├── src/
│   │   ├── components/        # Composants réutilisables
│   │   │   ├── AIChatbot.jsx
│   │   │   ├── Chat.jsx
│   │   │   ├── Notification.jsx
│   │   │   ├── ParticipantsList.jsx
│   │   │   ├── Settings.jsx
│   │   │   ├── VideoGrid.jsx
│   │   │   └── Whiteboard.jsx
│   │   ├── contexts/          # Contextes React
│   │   │   ├── SocketContext.jsx
│   │   │   └── WebRTCContext.jsx
│   │   ├── pages/             # Pages principales
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RoomPage.jsx
│   │   │   └── SignupPage.jsx
│   │   ├── App.jsx            # Composant principal
│   │   ├── index.jsx          # Point d'entrée
│   │   └── index.js           # Configuration
│   ├── package.json           # Dépendances client
│   └── vite.config.js         # Configuration Vite
├── server/                    # Serveur Node.js
│   ├── index.js              # Serveur principal
│   └── package.json          # Dépendances serveur
└── README.md                 # Documentation
```

## 🛠️ Installation et Configuration

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn
- Navigateur moderne avec support WebRTC

### Installation

1. **Cloner le projet**
```bash
git clone <url-du-repo>
cd Visio-projet
```

2. **Installer les dépendances du serveur**
```bash
cd server
npm install
```

3. **Installer les dépendances du client**
```bash
cd ../client
npm install
```

### Démarrage

1. **Démarrer le serveur** (Terminal 1)
```bash
cd server
npm start
```
Le serveur démarre sur `http://localhost:3001`

2. **Démarrer le client** (Terminal 2)
```bash
cd client
npm run dev
```
L'application démarre sur `http://localhost:5173`

## 🎮 Utilisation

### Première Utilisation

1. **Accéder à l'application** : Ouvrez `http://localhost:5173`
2. **Créer un compte** : Cliquez sur "S'inscrire" et remplissez le formulaire
3. **Se connecter** : Utilisez vos identifiants pour vous connecter
4. **Créer une salle** : Entrez votre nom et cliquez sur "Créer une nouvelle salle"
5. **Inviter des participants** : Partagez l'ID de la salle

### Fonctionnalités de la Salle

- **Vidéo/Audio** : Activez/désactivez votre caméra et microphone
- **Partage d'écran** : Partagez votre écran avec les participants
- **Chat** : Communiquez par messages texte
- **Whiteboard** : Dessinez et collaborez en temps réel
- **Paramètres** : Ajustez la qualité vidéo et les préférences

## 🔧 Configuration Avancée

### Variables d'Environnement

Créez un fichier `.env` dans le dossier `server/` :
```env
PORT=3001
NODE_ENV=development
```

Créez un fichier `.env` dans le dossier `client/` :
```env
VITE_SERVER_URL=http://localhost:3001
```

### Personnalisation

- **Thèmes** : Modifiez les couleurs dans `client/src/App.jsx`
- **Composants** : Personnalisez les composants dans `client/src/components/`
- **API** : Étendez les fonctionnalités dans `server/index.js`

## 📱 Fonctionnalités Détaillées

### Système d'Authentification
- Inscription avec validation complète
- Connexion avec mémorisation des identifiants
- Déconnexion sécurisée
- Gestion des sessions utilisateur

### Communication Vidéo
- WebRTC peer-to-peer
- Qualité adaptative
- Support multi-navigateurs
- Gestion des erreurs de connexion

### Chat en Temps Réel
- Messages instantanés
- Support des émojis
- Horodatage des messages
- Historique persistant

### Tableau Blanc Collaboratif
- Outils de dessin multiples
- Couleurs personnalisables
- Synchronisation temps réel
- Effacement et annulation

### Notifications
- Système de notifications élégant
- Types multiples (succès, erreur, info, warning)
- Animations fluides
- Auto-disparition configurable

## 🚀 Déploiement

### Déploiement Local
L'application est prête pour un déploiement local avec les instructions ci-dessus.

### Déploiement Production
Pour un déploiement en production :

1. **Build du client**
```bash
cd client
npm run build
```

2. **Configuration du serveur**
- Configurez les variables d'environnement
- Utilisez un reverse proxy (nginx)
- Configurez HTTPS pour WebRTC

3. **Services recommandés**
- **Frontend** : Vercel, Netlify
- **Backend** : Heroku, DigitalOcean
- **Base de données** : MongoDB, PostgreSQL

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Pour obtenir de l'aide :

1. **Issues GitHub** : Ouvrez une issue pour les bugs
2. **Discussions** : Utilisez les discussions pour les questions
3. **Documentation** : Consultez ce README et les commentaires du code

## 🔮 Roadmap

### Fonctionnalités Prévues
- [ ] Authentification OAuth (Google, GitHub)
- [ ] Base de données persistante
- [ ] Enregistrement vidéo réel
- [ ] Salles privées avec mots de passe
- [ ] Intégration calendrier
- [ ] Application mobile (React Native)
- [ ] API REST complète
- [ ] Tableau de bord administrateur
- [ ] Analytics et statistiques
- [ ] Support multilingue

### Améliorations Techniques
- [ ] Tests unitaires et d'intégration
- [ ] CI/CD avec GitHub Actions
- [ ] Monitoring et logging
- [ ] Optimisation des performances
- [ ] PWA (Progressive Web App)
- [ ] WebAssembly pour le traitement vidéo

## 📊 Statistiques du Projet

- **Lignes de code** : ~5000+
- **Composants React** : 15+
- **Pages** : 4
- **Contextes** : 2
- **Dépendances** : 25+

## 🙏 Remerciements

- **React Team** pour le framework
- **Socket.io** pour la communication temps réel
- **WebRTC** pour la technologie vidéo
- **Styled Components** pour le styling
- **Framer Motion** pour les animations
- **Lucide** pour les icônes

---

**Développé avec ❤️ par l'équipe Visio Pro**

*Pour toute question ou suggestion, n'hésitez pas à nous contacter !*
