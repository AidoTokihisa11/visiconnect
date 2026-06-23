# 🎥 VisiConnect

> Modern video conferencing platform with real-time chat and collaborative features. **Secure by design** with encrypted backups and zero secrets in Git.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-18.x-61dafb.svg)](https://reactjs.org/)
[![Supabase](https://img.shields.io/badge/supabase-realtime-green.svg)](https://supabase.com/)
[![Security](https://img.shields.io/badge/security-AES--256-red.svg)](SECURITY_GUIDE.md)

## ✨ Features

- 🎥 HD Video Conferencing with WebRTC
- 💬 Real-time Chat with **Supabase Realtime**
- 🎨 Collaborative Whiteboard
- 🔐 Secure Authentication (Stack Auth + Supabase)
- 🌍 Multi-language Support (6 languages)
- 📱 Fully Responsive Design
- 🔔 Real-time Notifications
- 👥 Participant Management
- 🌐 **WebSocket via Supabase** (Production-ready)
- 🔒 **Encrypted Secrets Backup** (AES-256)

## 🏗️ Architecture

**VisiConnect utilise Supabase Realtime pour le signaling WebRTC**, éliminant le besoin d'un serveur Socket.io local.

- **Frontend:** React 18, Framer Motion, Styled Components
- **Backend:** Supabase (Auth, Database, Realtime)
- **WebRTC:** Peer-to-peer video/audio avec signaling via Supabase Realtime
- **WebSocket:** Supabase Realtime channels
- **Security:** AES-256 encrypted backups, Git hooks, no secrets in repo

📚 **Documentation complète:** [SUPABASE_REALTIME_MIGRATION.md](SUPABASE_REALTIME_MIGRATION.md)

## 🚀 Quick Start

### 🎯 Option 1 : Installation Automatique (Recommandé)

**Configuration complète en UNE commande :**

```bash
# Clone the repository
git clone https://github.com/AidoTokihisa11/visiconnect.git
cd visiconnect

# Configuration automatique (demande vos clés de manière interactive)
node scripts/quick-setup.js

# Démarrer l'application
cd server && npm start     # Terminal 1
cd client && npm start      # Terminal 2
```

**✅ C'est tout ! Application accessible sur http://localhost:3000**

---

### 🔐 Option 2 : Restauration depuis Backup Chiffré

**Si vous avez déjà un backup :**

```bash
# Clone the repository
git clone https://github.com/AidoTokihisa11/visiconnect.git
cd visiconnect

# Restaurer les configurations (UNE commande)
node scripts/secure-backup.js restore

# Installer les dépendances
npm install
cd server && npm install
cd ../client && npm install

# Démarrer
cd server && npm start
cd client && npm start
```

**⚡ Temps total : ~5 minutes**

---

### Prerequisites

- Node.js >= 16.0.0
- npm or yarn
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Supabase account (free tier available)
- Stack Auth account (optional, for authentication)

### Manual Installation (Alternative)

**If you prefer manual setup:**

```bash
# 1. Copy environment templates
cp server/.env.example server/.env
cp client/.env.example client/.env

# 2. Edit .env files with your API keys
nano server/.env  # or use your favorite editor
nano client/.env

# 3. Install dependencies
npm install
cd server && npm install
cd ../client && npm install

# 4. Start the application
cd server && npm start     # Terminal 1
cd client && npm start     # Terminal 2
```

**📝 Get your API keys:**

- **Supabase:** https://app.supabase.com/project/_/settings/api
- **Stack Auth:** https://app.stack-auth.com/projects

---

## 🔒 Security Features

### 🛡️ Built-in Protection

- ✅ **No secrets in Git** - All sensitive files blocked by `.gitignore`
- ✅ **Pre-commit hooks** - Automatic secret scanning before each commit
- ✅ **Encrypted backups** - AES-256 encryption for `.env` files
- ✅ **Template configs** - `.env.example` files for easy sharing

### 🔐 Backup System

**Save your configurations securely:**

```bash
# Create encrypted backup
node scripts/secure-backup.js backup

# Restore on new machine
node scripts/secure-backup.js restore
```

**Protected with:**

- AES-256-CBC encryption
- PBKDF2 key derivation (100,000 iterations)
- Password protection

📚 **Full guide:** [BACKUP_GUIDE.md](BACKUP_GUIDE.md)

---

## 📖 Documentation

| Document                                                         | Description              |
| ---------------------------------------------------------------- | ------------------------ |
| [START_HERE.md](START_HERE.md)                                   | Quick start guide        |
| [BACKUP_GUIDE.md](BACKUP_GUIDE.md)                               | Encrypted backup system  |
| [SECURITY_GUIDE.md](SECURITY_GUIDE.md)                           | Security best practices  |
| [TESTING_E2E_WEBRTC.md](TESTING_E2E_WEBRTC.md)                   | End-to-end testing guide |
| [SUPABASE_REALTIME_MIGRATION.md](SUPABASE_REALTIME_MIGRATION.md) | Technical architecture   |

---

## 🛠️ Tech Stack

### Frontend

- React 18
- Tailwind CSS
- Framer Motion
- WebRTC
- React Router
- Supabase Client

### Backend

- Node.js + Express
- Supabase (Auth, Database, Realtime)
- Stack Auth
- PostgreSQL (via Supabase)

### Real-time Communication

- **WebRTC** - Peer-to-peer video/audio
- **Supabase Realtime** - WebSocket signaling
- **Presence** - User tracking
- **Broadcast** - Message distribution

### Backend

- Node.js
- Express
- Socket.IO
- PostgreSQL

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting a Pull Request.

## 🐛 Bug Reports

Found a bug? Please open an issue with:

- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**AidoTokihisa**

- GitHub: [@AidoTokihisa11](https://github.com/AidoTokihisa11)

## 🙏 Acknowledgments

- React and Node.js communities
- All contributors who help improve this project

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

⭐ If you find this project useful, please consider giving it a star!
