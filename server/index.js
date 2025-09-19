const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const os = require('os');
const process = require('process');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);

// Configuration CORS
app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3003", "http://127.0.0.1:3003"],
  credentials: true
}));

app.use(express.json());

// Configuration Socket.io avec CORS
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3003", "http://127.0.0.1:3003"],
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['websocket', 'polling']
});

// Stockage en mémoire des salles et utilisateurs
const rooms = new Map();
const users = new Map();

// Classe pour gérer une salle
class Room {
  constructor(id, name, hostId) {
    this.id = id;
    this.name = name;
    this.hostId = hostId;
    this.participants = new Map();
    this.messages = [];
    this.whiteboardData = [];
    this.isRecording = false;
    this.createdAt = new Date();
  }

  addParticipant(userId, userData) {
    this.participants.set(userId, {
      ...userData,
      joinedAt: new Date(),
      isHost: userId === this.hostId
    });
  }

  removeParticipant(userId) {
    this.participants.delete(userId);
  }

  addMessage(message) {
    this.messages.push({
      ...message,
      id: uuidv4(),
      timestamp: new Date()
    });
  }

  getParticipants() {
    return Array.from(this.participants.values());
  }

  isEmpty() {
    return this.participants.size === 0;
  }
}

// Classe pour gérer un utilisateur
class User {
  constructor(id, name, socketId) {
    this.id = id;
    this.name = name;
    this.socketId = socketId;
    this.currentRoom = null;
    this.isConnected = true;
    this.hasAudio = true;
    this.hasVideo = true;
    this.isSpeaking = false;
  }
}

// Middleware pour authentifier les sockets
io.use((socket, next) => {
  const { userName, roomId } = socket.handshake.query;
  if (userName) {
    socket.userName = userName;
    socket.roomId = roomId;
    next();
  } else {
    next(new Error('Authentication error'));
  }
});

// Gestion des connexions Socket.io
io.on('connection', (socket) => {
  console.log(`Nouvelle connexion: ${socket.id}`);

  // Créer un utilisateur
  const userId = uuidv4();
  const user = new User(userId, socket.userName, socket.id);
  users.set(socket.id, user);

  socket.emit('user-connected', { userId, userName: user.name });

  // Créer une nouvelle salle
  socket.on('create-room', ({ roomName, userName }) => {
    const roomId = uuidv4();
    const room = new Room(roomId, roomName, userId);
    rooms.set(roomId, room);

    // Ajouter l'utilisateur à la salle
    room.addParticipant(userId, {
      id: userId,
      name: userName,
      socketId: socket.id
    });

    user.currentRoom = roomId;
    socket.join(roomId);

    socket.emit('room-created', {
      roomId,
      roomName,
      isHost: true
    });

    console.log(`Salle créée: ${roomId} par ${userName}`);
  });

  // Rejoindre une salle
  socket.on('join-room', ({ roomId, userName }) => {
    const room = rooms.get(roomId);
    
    if (!room) {
      socket.emit('error', { message: 'Salle introuvable' });
      return;
    }

    // Ajouter l'utilisateur à la salle
    room.addParticipant(userId, {
      id: userId,
      name: userName,
      socketId: socket.id
    });

    user.currentRoom = roomId;
    user.name = userName;
    socket.join(roomId);

    // Notifier les autres participants
    socket.to(roomId).emit('user-joined', {
      id: userId,
      name: userName,
      socketId: socket.id
    });

    // Envoyer la liste des participants à l'utilisateur qui rejoint
    socket.emit('users-list', room.getParticipants());
    
    // Envoyer l'historique des messages
    socket.emit('message-history', room.messages);

    console.log(`${userName} a rejoint la salle ${roomId}`);
  });

  // Quitter une salle
  socket.on('leave-room', (roomId) => {
    const room = rooms.get(roomId);
    if (room) {
      room.removeParticipant(userId);
      socket.leave(roomId);
      
      // Notifier les autres participants
      socket.to(roomId).emit('user-left', userId);
      
      // Supprimer la salle si elle est vide
      if (room.isEmpty()) {
        rooms.delete(roomId);
        console.log(`Salle ${roomId} supprimée (vide)`);
      }
    }
    
    user.currentRoom = null;
    console.log(`Utilisateur ${user.name} a quitté la salle ${roomId}`);
  });

  // Gestion des messages de chat
  socket.on('send-message', (messageData) => {
    const room = rooms.get(user.currentRoom);
    if (room) {
      const message = {
        content: messageData.content,
        sender: user.name,
        senderId: userId,
        timestamp: new Date()
      };
      
      room.addMessage(message);
      io.to(user.currentRoom).emit('message', message);
    }
  });

  // Gestion des signaux WebRTC
  socket.on('offer', ({ offer, to }) => {
    socket.to(user.currentRoom).emit('offer', {
      offer,
      from: userId
    });
  });

  socket.on('answer', ({ answer, to }) => {
    socket.to(user.currentRoom).emit('answer', {
      answer,
      from: userId
    });
  });

  socket.on('ice-candidate', ({ candidate, to }) => {
    socket.to(user.currentRoom).emit('ice-candidate', {
      candidate,
      from: userId
    });
  });

  // Gestion des états média
  socket.on('toggle-audio', (isEnabled) => {
    user.hasAudio = isEnabled;
    if (user.currentRoom) {
      socket.to(user.currentRoom).emit('user-audio-toggle', {
        userId,
        hasAudio: isEnabled
      });
    }
  });

  socket.on('toggle-video', (isEnabled) => {
    user.hasVideo = isEnabled;
    if (user.currentRoom) {
      socket.to(user.currentRoom).emit('user-video-toggle', {
        userId,
        hasVideo: isEnabled
      });
    }
  });

  socket.on('screen-share-start', () => {
    if (user.currentRoom) {
      socket.to(user.currentRoom).emit('user-screen-share-start', {
        userId,
        userName: user.name
      });
    }
  });

  socket.on('screen-share-stop', () => {
    if (user.currentRoom) {
      socket.to(user.currentRoom).emit('user-screen-share-stop', {
        userId
      });
    }
  });

  // Gestion du tableau blanc
  socket.on('whiteboard-draw', (drawData) => {
    if (user.currentRoom) {
      socket.to(user.currentRoom).emit('whiteboard-draw', {
        ...drawData,
        userId,
        timestamp: new Date()
      });
      
      // Sauvegarder dans l'historique de la salle
      const room = rooms.get(user.currentRoom);
      if (room) {
        room.whiteboardData.push({
          ...drawData,
          userId,
          timestamp: new Date()
        });
      }
    }
  });

  socket.on('whiteboard-clear', () => {
    if (user.currentRoom) {
      socket.to(user.currentRoom).emit('whiteboard-clear', { userId });
      
      // Vider l'historique du tableau blanc
      const room = rooms.get(user.currentRoom);
      if (room) {
        room.whiteboardData = [];
      }
    }
  });

  // Gestion de l'enregistrement
  socket.on('start-recording', () => {
    const room = rooms.get(user.currentRoom);
    if (room && room.hostId === userId) {
      room.isRecording = true;
      io.to(user.currentRoom).emit('recording-started', {
        startedBy: user.name,
        timestamp: new Date()
      });
    }
  });

  socket.on('stop-recording', () => {
    const room = rooms.get(user.currentRoom);
    if (room && room.hostId === userId) {
      room.isRecording = false;
      io.to(user.currentRoom).emit('recording-stopped', {
        stoppedBy: user.name,
        timestamp: new Date()
      });
    }
  });

  // Gestion de la déconnexion
  socket.on('disconnect', () => {
    console.log(`Déconnexion: ${socket.id}`);
    
    const user = users.get(socket.id);
    if (user && user.currentRoom) {
      const room = rooms.get(user.currentRoom);
      if (room) {
        room.removeParticipant(userId);
        socket.to(user.currentRoom).emit('user-left', userId);
        
        // Supprimer la salle si elle est vide
        if (room.isEmpty()) {
          rooms.delete(user.currentRoom);
          console.log(`Salle ${user.currentRoom} supprimée (vide)`);
        }
      }
    }
    
    users.delete(socket.id);
  });

  // Ping pour maintenir la connexion
  socket.on('ping', () => {
    socket.emit('pong');
  });
});

// Fonction pour obtenir les métriques système
const getSystemMetrics = () => {
  const cpus = os.cpus();
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  
  // Calculer l'utilisation CPU moyenne
  let totalIdle = 0;
  let totalTick = 0;
  
  cpus.forEach(cpu => {
    for (type in cpu.times) {
      totalTick += cpu.times[type];
    }
    totalIdle += cpu.times.idle;
  });
  
  const idle = totalIdle / cpus.length;
  const total = totalTick / cpus.length;
  const cpuUsage = 100 - ~~(100 * idle / total);
  
  return {
    uptime: process.uptime(),
    memory: {
      total: Math.round(totalMem / 1024 / 1024), // MB
      used: Math.round(usedMem / 1024 / 1024), // MB
      free: Math.round(freeMem / 1024 / 1024), // MB
      percentage: Math.round((usedMem / totalMem) * 100)
    },
    cpu: {
      usage: cpuUsage,
      cores: cpus.length,
      model: cpus[0].model,
      speed: cpus[0].speed
    },
    system: {
      platform: os.platform(),
      arch: os.arch(),
      hostname: os.hostname(),
      version: os.version(),
      loadavg: os.loadavg()
    },
    network: {
      interfaces: Object.keys(os.networkInterfaces()).length
    },
    process: {
      pid: process.pid,
      version: process.version,
      memoryUsage: process.memoryUsage(),
      cpuUsage: process.cpuUsage()
    }
  };
};

// Routes API REST
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date(),
    rooms: rooms.size,
    users: users.size
  });
});

// Endpoint pour les métriques système
app.get('/api/metrics', (req, res) => {
  const metrics = getSystemMetrics();
  res.json({
    ...metrics,
    server: {
      activeRooms: rooms.size,
      activeUsers: users.size,
      totalConnections: users.size,
      uptime: process.uptime(),
      responseTime: Math.random() * 50 + 10 // Simulé pour l'instant
    },
    timestamp: new Date()
  });
});

// Endpoint pour ping (mesure de latence)
app.head('/api/ping', (req, res) => {
  res.status(200).end();
});

app.get('/api/ping', (req, res) => {
  res.json({ 
    pong: true, 
    timestamp: new Date(),
    server: 'visio-pro'
  });
});

app.get('/api/rooms', (req, res) => {
  const roomsList = Array.from(rooms.values()).map(room => ({
    id: room.id,
    name: room.name,
    participants: room.participants.size,
    createdAt: room.createdAt,
    isRecording: room.isRecording
  }));
  
  res.json(roomsList);
});

app.get('/api/rooms/:roomId', (req, res) => {
  const room = rooms.get(req.params.roomId);
  if (!room) {
    return res.status(404).json({ error: 'Salle introuvable' });
  }
  
  res.json({
    id: room.id,
    name: room.name,
    participants: room.getParticipants(),
    messageCount: room.messages.length,
    createdAt: room.createdAt,
    isRecording: room.isRecording
  });
});

// Middleware de gestion d'erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur interne du serveur' });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5003;
server.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📡 Socket.io prêt pour les connexions`);
  console.log(`🌐 API disponible sur http://localhost:${PORT}/api`);
});

// Nettoyage périodique des salles vides
setInterval(() => {
  const emptyRooms = [];
  rooms.forEach((room, roomId) => {
    if (room.isEmpty()) {
      emptyRooms.push(roomId);
    }
  });
  
  emptyRooms.forEach(roomId => {
    rooms.delete(roomId);
    console.log(`🧹 Salle vide supprimée: ${roomId}`);
  });
}, 5 * 60 * 1000); // Toutes les 5 minutes

module.exports = { app, server, io };
