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

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Requiert une vraie clé Stripe test dans le .env

// Stripe requiert le body raw pour vérifier la signature du webhook
app.post('/api/stripe/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Remplacer par votre secret de webhook de test (STRIPE_WEBHOOK_SECRET)
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Gérer l'événement de paiement réussi
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('✅ Paiement confirmé pour la session:', session.id);
    console.log('Utilisateur:', session.customer_details.email);
    // TODO: Mettre à jour la base de données pour donner accès au service (ex: activer le plan PRO)
  }

  res.json({received: true});
});

app.use(express.json());
  // === EMAIL LOGIC (RESEND) ===
  const { Resend } = require('resend');
  const fs = require('fs');
  const path = require('path');
  // Le token est mis en dur pour l'instant selon ta demande, 
  // mais idéalement il faudra le passer dans process.env.RESEND_API_KEY
  const resend = new Resend('re_f7CXkPZ1_FouifSQZycKkbcStAoZkGgW8');

  app.post('/api/send-email', async (req, res) => {
    try {
      const { to, subject, html } = req.body;

      // 1. Préparation de la pièce jointe (PDF)
      const attachments = [];
      const pdfPath = path.join(__dirname, 'public', 'Guide_Beta_VisioConnect.pdf');
      
      // On vérifie si le fichier existe pour éviter que le serveur plante
      // s'il n'y est pas encore
      if (fs.existsSync(pdfPath)) {
        const pdfBuffer = fs.readFileSync(pdfPath);
        attachments.push({
          filename: 'Guide_Beta_VisioConnect.pdf', // Le nom affiché dans la boîte mail
          content: pdfBuffer,
        });
      }

      // 2. Envoi de l'email avec Resend
      const data = await resend.emails.send({
        from: 'VisioConnect <contact@visioconnect.pro>', // Votre nouveau domaine officiel
        to: to || 'theo.garces.aido@gmail.com', // Ton email par défaut
        subject: subject || 'Votre accès Bêta VisioConnect',
        html: html || '<p>Bienvenue sur <strong>VisioConnect</strong> !</p>',
        attachments: attachments.length > 0 ? attachments : undefined
      });

      res.status(200).json({ success: true, data });
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email :', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });
app.post('/api/ai/chat', async (req, res) => {
  const { messages = [], style = 'balanced', purpose = 'chat' } = req.body || {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages is required' });
  }

  const openRouterKey = process.env.OPENROUTER_API_KEY;
  const openRouterModel = process.env.OPENROUTER_MODEL || 'meta-llama/llama-3.1-8b-instruct:free';
  const groqKey = process.env.GROQ_API_KEY;
  const groqModel = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

  const stylePrompt =
    style === 'concise'
      ? 'Reponds en francais de maniere concise (2-4 lignes).'
      : style === 'deep'
        ? 'Reponds en francais de maniere detaillee, structurée et actionnable.'
        : 'Reponds en francais de maniere claire et utile.';

  const systemPrompt =
    purpose === 'summary'
      ? `Tu es un assistant de reunion. Produis un resume strictement base sur le transcript. ${stylePrompt} Sections: Vue d'ensemble, Decisions, Actions, Questions ouvertes.`
      : `Tu es l'assistant IA de VisioConnect. ${stylePrompt}`;

  const payload = {
    messages: [{ role: 'system', content: systemPrompt }, ...messages],
    temperature: 0.35,
  };

  const tryProvider = async (url, key, model) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({ ...payload, model }),
    });

    if (!response.ok) {
      const details = await response.text().catch(() => 'provider_error');
      throw new Error(details || `Provider call failed (${response.status})`);
    }

    const data = await response.json();
    return data?.choices?.[0]?.message?.content || '';
  };

  try {
    let content = '';
    let provider = '';

    if (openRouterKey) {
      try {
        content = await tryProvider('https://openrouter.ai/api/v1/chat/completions', openRouterKey, openRouterModel);
        provider = 'openrouter';
      } catch (openRouterErr) {
        if (groqKey) {
          content = await tryProvider('https://api.groq.com/openai/v1/chat/completions', groqKey, groqModel);
          provider = 'groq';
        } else {
          throw openRouterErr;
        }
      }
    } else if (groqKey) {
      content = await tryProvider('https://api.groq.com/openai/v1/chat/completions', groqKey, groqModel);
      provider = 'groq';
    } else {
      return res.status(503).json({ error: 'No AI provider key configured on server' });
    }

    return res.json({ content, provider });
  } catch (err) {
    console.error('AI route error:', err.message || err);
    return res.status(500).json({ error: 'AI provider request failed' });
  }
});

app.post('/api/create-checkout-session', async (req, res) => {
  const { plan, billingCycle } = req.body;
  
  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'STRIPE_SECRET_KEY non configurée sur le serveur.' });
  }

  let amount = 0;
  let name = '';
  
  // Utiliser les ID de prix créés dans le dashboard Stripe (recommandé pour les abonnements)
  // ou utiliser des prix dynamiques comme ici pour le test
  if (plan === 'starter') {
    amount = 0; // 0.00 EUR
    name = 'VisioConnect Starter';
  } else if (plan === 'pro') {
    amount = billingCycle === 'annual' ? 14400 : 1500; // 144.00 ou 15.00 EUR
    name = 'VisioConnect Pro';
  } else if (plan === 'business') {
    amount = billingCycle === 'annual' ? 34800 : 3500; // 348.00 ou 35.00 EUR
    name = 'VisioConnect Business';
  } else {
    return res.status(400).json({ error: 'Plan invalide' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: name,
            },
            unit_amount: amount,
            recurring: {
              interval: billingCycle === 'annual' ? 'year' : 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.origin || 'http://localhost:5173'}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin || 'http://localhost:5173'}/pricing`,
    });

    res.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error('Erreur création session Stripe:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Helper function for LiveKit token
const createToken = async (roomName, participantName) => {
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
        identity: `guest_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        name: participantName,
      }
    );
    at.addGrant({ roomJoin: true, room: roomName, canPublish: true, canSubscribe: true });
    return await at.toJwt();
  } catch (error) {
     console.error("Token creation failed:", error);
     throw error;
  }
};

app.post('/api/livekit/token', async (req, res) => {
  const { roomName, participantName } = req.body;
  
  console.log(`[Token Request] roomName="${roomName}", participantName="${participantName}"`);
  
  if (!roomName || !participantName) {
    return res.status(400).json({ error: 'Missing roomName or participantName' });
  }

  try {
    const token = await createToken(roomName, participantName);
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
  console.log(`🚀 Serveur VisioConnect démarré sur le port ${PORT}`);
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
