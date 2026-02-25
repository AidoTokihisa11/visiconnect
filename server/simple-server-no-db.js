require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost", "http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('join-room', ({ roomId, user }) => {
    socket.join(roomId);
    console.log(`User ${user.username} joined room ${roomId}`);
    socket.to(roomId).emit('user-connected', user);
  });

  socket.on('send-message', (data) => {
    io.to(data.roomId).emit('receive-message', data);
  });

  socket.on('whiteboard-update', (data) => {
    socket.to(data.roomId).emit('whiteboard-update', data);
  });

  socket.on('cursor-update', (data) => {
    socket.to(data.roomId).emit('cursor-update', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const { AccessToken } = require('livekit-server-sdk');

// Configuration CORS
app.use(cors({
  origin: ["http://localhost", "http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true
}));

app.use(express.json());

// Helper function for LiveKit token
const createToken = (roomName, participantName) => {
  // Check for missing keys and return a mock token or error gracefully
  if (!process.env.LIVEKIT_API_KEY || !process.env.LIVEKIT_API_SECRET) {
      console.warn('⚠️ Missing LiveKit API Keys - Returning mock token for local dev');
      // For local dev, return a valid-looking JWT string that won't work on real LiveKit but prevents crash
      return "mock_token_due_to_missing_keys"; 
  }

  try {
    const at = new AccessToken(
      process.env.LIVEKIT_API_KEY, 
      process.env.LIVEKIT_API_SECRET, 
      {
        identity: participantName,
      }
    );
    at.addGrant({ roomJoin: true, room: roomName, canPublish: true, canSubscribe: true });
    return at.toJwt();
  } catch (error) {
     console.error("Token creation failed:", error);
     throw error;
  }
};

app.post('/api/livekit/token', (req, res) => {
  const { roomName, participantName } = req.body;
  
  if (!roomName || !participantName) {
    return res.status(400).json({ error: 'Missing roomName or participantName' });
  }

  try {
    const token = createToken(roomName, participantName);
    res.json({ token });
  } catch (err) {
    console.error('Error creating token:', err);
    res.status(500).json({ error: 'Could not create token' });
  }
});


// Routes API simplifiées (sans base de données)
const userRouter = express.Router();

// POST /api/user/sync - Version simplifiée sans DB
userRouter.post('/sync', async (req, res) => {
  try {
    const { email, displayName, firstName, lastName, avatarUrl } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email requis' });
    }
    
    // Simuler une synchronisation réussie
    console.log('✅ Utilisateur synchronisé (en mémoire):', email);
    
    res.json({
      success: true,
      message: 'Utilisateur synchronisé avec succès',
      user: {
        id: `user_${Date.now()}`,
        email,
        displayName: displayName || email.split('@')[0],
        firstName,
        lastName,
        avatarUrl
      }
    });
  } catch (error) {
    console.error('Erreur synchronisation utilisateur:', error);
    res.status(500).json({ error: 'Erreur lors de la synchronisation' });
  }
});

// GET /api/user/profile - Version simplifiée
userRouter.get('/profile', async (req, res) => {
  const email = req.headers['x-user-email'];
  
  if (!email) {
    return res.status(401).json({ error: 'Non authentifié' });
  }
  
  res.json({
    id: `user_${Date.now()}`,
    email,
    displayName: email.split('@')[0],
    stats: {
      totalMeetings: 0,
      totalParticipants: 0,
      totalMinutes: 0,
      meetingsThisMonth: 0
    }
  });
});


app.use('/api/user', userRouter);

// Route de santé
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    database: 'Supabase (Direct Client Access)',
    note: 'Backend simplifié - Pas de DB PostgreSQL directe'
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Serveur VisiConnect démarré sur le port ${PORT}`);
  console.log(`📊 Interface de santé: http://localhost:${PORT}/health`);
  console.log(`🔐 Authentification: Supabase (client-side)`);
  console.log(`💾 Stockage: Supabase (pas de DB PostgreSQL directe sur backend)`);
  console.log(`🌍 Environnement: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📱 Client attendu sur: http://localhost:3000`);
});

// Gestion de l'arrêt gracieux
process.on('SIGTERM', () => {
  console.log('SIGTERM reçu, arrêt gracieux du serveur...');
  server.close(() => {
    console.log('Serveur arrêté');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT reçu, arrêt gracieux du serveur...');
  server.close(() => {
    console.log('Serveur arrêté');
    process.exit(0);
  });
});
