import { useState, useEffect } from 'react';
import UserAPIService from '../services/UserAPIService';
import { useAuthUser } from './useAuthUser';

// Hook pour gérer les données utilisateur complètes depuis la base de données
export const useUserProfile = () => {
  const { user: authUser, loading: authLoading } = useAuthUser();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!authUser?.email) {
        setUserProfile(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const profile = await UserAPIService.getUserProfile();
        setUserProfile(profile);
        
      } catch (error) {
        console.error('❌ Erreur chargement profil:', error);
        setError(error.message);
        
        // En cas d'erreur, utiliser les données d'authentification de base
        if (authUser) {
          setUserProfile({
            ...authUser,
            stats: {
              totalMeetings: 0,
              totalParticipants: 0,
              totalMinutes: 0,
              meetingsThisMonth: 0
            }
          });
        }
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchUserProfile();
    }
  }, [authUser, authLoading]);

  // Fonction pour mettre à jour le profil
  const updateProfile = async (updates) => {
    try {
      setError(null);
      const result = await UserAPIService.updateUserProfile(updates);
      
      // Mettre à jour l'état local
      setUserProfile(prev => ({
        ...prev,
        ...result.user
      }));
      
      return result;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Fonction pour mettre à jour les notifications
  const updateNotifications = async (settings) => {
    try {
      setError(null);
      const result = await UserAPIService.updateNotificationSettings(settings);
      
      // Mettre à jour l'état local
      setUserProfile(prev => ({
        ...prev,
        ...result.settings
      }));
      
      return result;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Fonction pour mettre à jour la confidentialité
  const updatePrivacy = async (settings) => {
    try {
      setError(null);
      const result = await UserAPIService.updatePrivacySettings(settings);
      
      // Mettre à jour l'état local
      setUserProfile(prev => ({
        ...prev,
        ...result.settings
      }));
      
      return result;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Fonction pour mettre à jour le 2FA
  const updateTwoFactor = async (enabled) => {
    try {
      setError(null);
      const result = await UserAPIService.updateTwoFactorAuth(enabled);
      
      // Mettre à jour l'état local
      setUserProfile(prev => ({
        ...prev,
        twoFactorEnabled: result.twoFactorEnabled
      }));
      
      return result;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Fonction pour rafraîchir le profil
  const refreshProfile = async () => {
    if (!authUser?.email) return;
    
    try {
      setLoading(true);
      setError(null);
      const profile = await UserAPIService.getUserProfile();
      setUserProfile(profile);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    userProfile,
    loading: loading || authLoading,
    error,
    updateProfile,
    updateNotifications,
    updatePrivacy,
    updateTwoFactor,
    refreshProfile
  };
};