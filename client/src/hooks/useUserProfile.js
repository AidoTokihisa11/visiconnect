import { useState, useEffect } from 'react';
import UserAPIService from '../services/UserAPIService';
import { useAuthUser } from './useAuthUser';

const buildFallbackProfile = (authUser) => ({
  ...authUser,
  stats: {
    totalMeetings: 0,
    totalParticipants: 0,
    totalMinutes: 0,
    meetingsThisMonth: 0,
  },
});

export const useUserProfile = () => {
  const { user: authUser, loading: authLoading } = useAuthUser();
  const authEmail = authUser?.email;
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mergeProfile = (nextValues) => {
    setUserProfile((previousProfile) => ({
      ...previousProfile,
      ...nextValues,
    }));
  };

  useEffect(() => {
    if (authLoading) return;

    const fetchUserProfile = async () => {
      if (!authEmail) {
        setUserProfile(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const profile = await UserAPIService.getUserProfile();
        setUserProfile(profile);
      } catch (loadError) {
        console.error('Erreur chargement profil:', loadError);
        setError(loadError.message);

        if (authUser) {
          setUserProfile(buildFallbackProfile(authUser));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [authEmail, authLoading, authUser]);

  const updateProfile = async (updates) => {
    try {
      setError(null);
      const result = await UserAPIService.updateUserProfile(updates);
      mergeProfile(result.user);
      return result;
    } catch (updateError) {
      setError(updateError.message);
      throw updateError;
    }
  };

  const updateNotifications = async (settings) => {
    try {
      setError(null);
      const result = await UserAPIService.updateNotificationSettings(settings);
      mergeProfile(result.settings);
      return result;
    } catch (updateError) {
      setError(updateError.message);
      throw updateError;
    }
  };

  const updatePrivacy = async (settings) => {
    try {
      setError(null);
      const result = await UserAPIService.updatePrivacySettings(settings);
      mergeProfile(result.settings);
      return result;
    } catch (updateError) {
      setError(updateError.message);
      throw updateError;
    }
  };

  const updateTwoFactor = async (enabled) => {
    try {
      setError(null);
      const result = await UserAPIService.updateTwoFactorAuth(enabled);
      mergeProfile({ twoFactorEnabled: result.twoFactorEnabled });
      return result;
    } catch (updateError) {
      setError(updateError.message);
      throw updateError;
    }
  };

  const refreshProfile = async () => {
    if (!authEmail) return;

    try {
      setLoading(true);
      setError(null);
      const profile = await UserAPIService.getUserProfile();
      setUserProfile(profile);
    } catch (refreshError) {
      setError(refreshError.message);
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