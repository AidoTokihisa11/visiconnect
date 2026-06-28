const USER_PROFILE_KEY = 'visiconnect_user_profile';

const createDefaultUserProfile = () => ({
  id: localStorage.getItem('convex_user_id') || 'demo_user',
  email: '',
  displayName: 'Meta User',
  bio: '',
  phone: '',
  company: '',
  jobTitle: '',
  location: '',
  website: '',
  avatarUrl: null,
  created_at: new Date().toISOString(),
});

const getStoredUserProfile = () => {
  const serializedProfile = localStorage.getItem(USER_PROFILE_KEY);
  if (!serializedProfile) return null;

  try {
    return JSON.parse(serializedProfile);
  } catch {
    localStorage.removeItem(USER_PROFILE_KEY);
    return null;
  }
};

const UserAPIService = {
  getUserProfile: async () => getStoredUserProfile() || createDefaultUserProfile(),

  updateUserProfile: async (updates) => {
    const currentProfile = await UserAPIService.getUserProfile();
    const nextProfile = { ...currentProfile, ...updates };
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(nextProfile));
    return { user: nextProfile };
  },

  updateNotificationSettings: async (settings) => ({ settings }),

  updatePrivacySettings: async (settings) => ({ settings }),

  syncUser: async (userProfile) => userProfile,

  formatUserStats: (stats) => {
    if (!stats) return [];

    return [
      { label: 'Réunions', value: stats.meetings_count || 0 },
      { label: 'Heures', value: Math.round((stats.total_minutes || 0) / 60) },
      { label: 'Contacts', value: stats.contacts_count || 0 },
    ];
  },
};

export default UserAPIService;
