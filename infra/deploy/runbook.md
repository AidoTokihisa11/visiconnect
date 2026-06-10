# Runbook — Déploiement VisiConnect sur Hetzner CX22

> **Public visé** : Théo Garces (CDA Orléans). Document servant à
> argumenter la compétence **CP10 — Préparer et exécuter le déploiement**
> du référentiel REAC.

## 1. Coût & dimensionnement

| Ressource     | Choix                              | Justification                                                                  |
| ------------- | ---------------------------------- | ------------------------------------------------------------------------------ |
| Hébergeur     | **Hetzner CX22** (Falkenstein, DE) | 4 € HT / mois — RGPD UE — datacenter Hetzner certifié ISO 27001                |
| vCPU / RAM    | 2 / 4 Go                           | Suffit pour 200 utilisateurs concurrents (API stateless + LiveKit externalisé) |
| Disque        | 40 Go SSD                          | Logs + images Docker + sauvegardes                                             |
| OS            | Ubuntu 22.04 LTS                   | Cycle de support jusqu'en 2027                                                 |
| Reverse-proxy | Nginx 1.27 (alpine)                | Faible empreinte mémoire, support WebSocket natif                              |

## 2. Préparation du serveur (procédure unique)

> Toutes les commandes sont à exécuter en tant que `root` puis on basculera
> sur l'utilisateur applicatif `deploy`.

### 2.1 Création du serveur Hetzner

1. Console Hetzner → _Add Server_ → CX22 / Ubuntu 22.04 / clé SSH ajoutée.
2. Récupérer l'IP publique (ex. `5.75.xxx.xxx`).
3. Configurer un enregistrement DNS A : `api.visioconnect.pro → 5.75.xxx.xxx`.

### 2.2 Durcissement initial

```bash
# Mise à jour
apt update && apt upgrade -y

# Création de l'utilisateur applicatif (jamais root au quotidien)
adduser --disabled-password --gecos "" deploy
usermod -aG sudo deploy
mkdir -p /home/deploy/.ssh
cp ~/.ssh/authorized_keys /home/deploy/.ssh/
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh && chmod 600 /home/deploy/.ssh/authorized_keys

# SSH : interdire root + mots de passe
sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
systemctl restart ssh

# Pare-feu UFW : SSH + HTTP + HTTPS uniquement
apt install -y ufw
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# fail2ban : bannir les bruteforce SSH
apt install -y fail2ban
systemctl enable --now fail2ban
```

### 2.3 Installation Docker + Compose

```bash
apt install -y ca-certificates curl gnupg
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
  > /etc/apt/sources.list.d/docker.list
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

usermod -aG docker deploy
```

### 2.4 Certificat TLS (Let's Encrypt)

```bash
apt install -y certbot
# Stop éventuel d'un nginx déjà installé puis émission du cert :
certbot certonly --standalone -d api.visioconnect.pro \
  --agree-tos -m contact@visioconnect.pro --non-interactive
# Renouvellement automatique : la timer systemd est active par défaut.
systemctl status certbot.timer
```

## 3. Premier déploiement

```bash
su - deploy
git clone https://github.com/AidoTokihisa/visiconnect.git
cd visiconnect

# Variables d'environnement de production
cp server/.env.example .env
nano .env   # remplir CLERK_SECRET_KEY, LIVEKIT_*, STRIPE_*, RESEND_API_KEY, ALLOWED_ORIGINS

# Build + démarrage
docker compose build
docker compose up -d
docker compose logs -f api    # vérifier "🚀 Serveur VisiConnect démarré"
```

Tester :

```bash
curl -I https://api.visioconnect.pro/health
# Attendu : HTTP/2 200
```

## 4. Mises à jour (workflow régulier)

```bash
ssh deploy@5.75.xxx.xxx
cd visiconnect
git pull origin main
docker compose build api
docker compose up -d --no-deps api
docker compose ps
```

## 5. Sauvegardes

| Donnée               | Stratégie                           | Fréquence                    |
| -------------------- | ----------------------------------- | ---------------------------- |
| Base Convex          | Snapshot intégré Convex Cloud       | Continu (Convex géré)        |
| Logs API             | Volume Docker + rotation logrotate  | Quotidien, conservation 14 j |
| Configuration `.env` | Vault personnel chiffré (Bitwarden) | À chaque modification        |

## 6. Surveillance

- **Healthcheck Docker** : redémarrage automatique si `/health` ne répond pas pendant 90 s.
- **uptimerobot.com** (gratuit) ping toutes les 5 min sur `https://api.visioconnect.pro/health`.
- **Logs Pino** consultables via `docker compose logs --tail=200 api`.

## 7. Rollback

```bash
git log --oneline -10
git checkout <SHA précédent>
docker compose build api && docker compose up -d --no-deps api
```

## 8. Points de conformité (CDA / RGPD)

- **Hébergement UE** : conformité RGPD article 44 (transferts internationaux).
- **TLS 1.2+ uniquement** : article 32 (intégrité et confidentialité).
- **Logs pseudonymisés** (Pino redact + maskEmail) : article 5 (minimisation).
- **Sauvegarde + rollback documentés** : continuité d'activité.
- **Utilisateur non-root dans le conteneur** : défense en profondeur.

---

_Document maintenu à jour à chaque modification de l'infrastructure._
