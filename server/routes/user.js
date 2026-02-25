const express = require('express');
const router = express.Router();
const UserDatabaseService = require('../services/UserDatabaseService');

// Middleware pour vérifier l'authentification (simplifié pour l'exemple)
const authenticateUser = async (req, res, next) => {
  try {
    // Ici vous devriez intégrer avec Stack Auth pour vérifier le token
    // Pour l'instant, on simule avec l'email dans les headers
    const userEmail = req.headers['x-user-email'];
    
    if (!userEmail) {
      return res.status(401).json({ error: 'Non authentifié' });
    }

    const user = await UserDatabaseService.getUserByEmail(userEmail);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    res.status(500).json({ error: 'Erreur d\'authentification' });
  }
};

// GET /api/user/profile - Récupérer le profil utilisateur
router.get('/profile', authenticateUser, async (req, res) => {
  try {
    const user = req.user;
    
    // Récupérer les statistiques d'activité
    const activityStats = await UserDatabaseService.getUserActivityStats(user.id);
    
    const userProfile = {
      id: user.id,
      email: user.email,
      displayName: user.display_name,
      firstName: user.first_name,
      lastName: user.last_name,
      avatarUrl: user.avatar_url,
      phone: user.phone,
      company: user.company,
      jobTitle: user.job_title,
      bio: user.bio,
      location: user.location,
      website: user.website,
      timezone: user.timezone,
      language: user.language,
      
      // Paramètres
      emailVerified: user.email_verified,
      phoneVerified: user.phone_verified,
      twoFactorEnabled: user.two_factor_enabled,
      profileVisibility: user.profile_visibility,
      
      // Notifications
      emailNotifications: user.email_notifications,
      pushNotifications: user.push_notifications,
      desktopNotifications: user.desktop_notifications,
      marketingEmails: user.marketing_emails,
      
      // Confidentialité
      showOnlineStatus: user.show_online_status,
      allowContactByEmail: user.allow_contact_by_email,
      allowContactByPhone: user.allow_contact_by_phone,
      dataProcessingConsent: user.data_processing_consent,
      analyticsConsent: user.analytics_consent,
      
      // Statistiques
      stats: {
        totalMeetings: user.total_meetings,
        totalParticipants: user.total_participants,
        totalMinutes: user.total_minutes,
        meetingsThisMonth: user.meetings_this_month,
        meetingsLastWeek: parseInt(activityStats.meetings_last_week),
        meetingsLastMonth: parseInt(activityStats.meetings_last_month)
      },
      
      // Dates
      createdAt: user.created_at,
      updatedAt: user.updated_at,
      lastLogin: user.last_login
    };
    
    res.json(userProfile);
  } catch (error) {
    console.error('Erreur récupération profil:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du profil' });
  }
});

// PUT /api/user/profile - Mettre à jour le profil utilisateur
router.put('/profile', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;
    
    // Convertir les noms de champs du frontend vers la base de données
    const dbUpdates = {};
    if (updates.displayName !== undefined) dbUpdates.display_name = updates.displayName;
    if (updates.firstName !== undefined) dbUpdates.first_name = updates.firstName;
    if (updates.lastName !== undefined) dbUpdates.last_name = updates.lastName;
    if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
    if (updates.company !== undefined) dbUpdates.company = updates.company;
    if (updates.jobTitle !== undefined) dbUpdates.job_title = updates.jobTitle;
    if (updates.bio !== undefined) dbUpdates.bio = updates.bio;
    if (updates.location !== undefined) dbUpdates.location = updates.location;
    if (updates.website !== undefined) dbUpdates.website = updates.website;
    if (updates.timezone !== undefined) dbUpdates.timezone = updates.timezone;
    if (updates.language !== undefined) dbUpdates.language = updates.language;
    
    const updatedUser = await UserDatabaseService.updateUserProfile(userId, dbUpdates);
    
    res.json({
      success: true,
      message: 'Profil mis à jour avec succès',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        displayName: updatedUser.display_name,
        firstName: updatedUser.first_name,
        lastName: updatedUser.last_name,
        phone: updatedUser.phone,
        company: updatedUser.company,
        jobTitle: updatedUser.job_title,
        bio: updatedUser.bio,
        location: updatedUser.location,
        website: updatedUser.website,
        timezone: updatedUser.timezone,
        language: updatedUser.language
      }
    });
  } catch (error) {
    console.error('Erreur mise à jour profil:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du profil' });
  }
});

// PUT /api/user/notifications - Mettre à jour les paramètres de notification
router.put('/notifications', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const settings = req.body;
    
    const updatedUser = await UserDatabaseService.updateNotificationSettings(userId, settings);
    
    res.json({
      success: true,
      message: 'Paramètres de notification mis à jour',
      settings: {
        emailNotifications: updatedUser.email_notifications,
        pushNotifications: updatedUser.push_notifications,
        desktopNotifications: updatedUser.desktop_notifications,
        marketingEmails: updatedUser.marketing_emails
      }
    });
  } catch (error) {
    console.error('Erreur mise à jour notifications:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour des notifications' });
  }
});

// PUT /api/user/privacy - Mettre à jour les paramètres de confidentialité
router.put('/privacy', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const settings = req.body;
    
    const updatedUser = await UserDatabaseService.updatePrivacySettings(userId, settings);
    
    res.json({
      success: true,
      message: 'Paramètres de confidentialité mis à jour',
      settings: {
        profileVisibility: updatedUser.profile_visibility,
        showOnlineStatus: updatedUser.show_online_status,
        allowContactByEmail: updatedUser.allow_contact_by_email,
        allowContactByPhone: updatedUser.allow_contact_by_phone,
        dataProcessingConsent: updatedUser.data_processing_consent,
        analyticsConsent: updatedUser.analytics_consent
      }
    });
  } catch (error) {
    console.error('Erreur mise à jour confidentialité:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la confidentialité' });
  }
});

// PUT /api/user/2fa - Activer/désactiver l'authentification à deux facteurs
router.put('/2fa', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { enabled } = req.body;
    
    const updatedUser = await UserDatabaseService.updateTwoFactorAuth(userId, enabled);
    
    res.json({
      success: true,
      message: `Authentification à deux facteurs ${enabled ? 'activée' : 'désactivée'}`,
      twoFactorEnabled: updatedUser.two_factor_enabled
    });
  } catch (error) {
    console.error('Erreur mise à jour 2FA:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'authentification à deux facteurs' });
  }
});

// POST /api/user/sync - Synchroniser un utilisateur Stack Auth avec la base de données
router.post('/sync', async (req, res) => {
  try {
    const { email, displayName, firstName, lastName, avatarUrl } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email requis' });
    }
    
    const userData = {
      email,
      displayName: displayName || email.split('@')[0],
      firstName,
      lastName,
      avatarUrl
    };
    
    const user = await UserDatabaseService.createOrUpdateUser(userData);
    
    res.json({
      success: true,
      message: 'Utilisateur synchronisé avec succès',
      user: {
        id: user.id,
        email: user.email,
        displayName: user.display_name,
        firstName: user.first_name,
        lastName: user.last_name,
        avatarUrl: user.avatar_url
      }
    });
  } catch (error) {
    console.error('Erreur synchronisation utilisateur:', error);
    res.status(500).json({ error: 'Erreur lors de la synchronisation' });
  }
});

module.exports = router;