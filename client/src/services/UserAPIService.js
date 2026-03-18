const UserAPIService = {
  getUserProfile: async () => {
    const saved = localStorage.getItem('visiconnect_user_profile');
    if (saved) return JSON.parse(saved);
    return {
      id: localStorage.getItem('convex_user_id') || 'demo_user',
      email: 'user@visiconnect.com',
      displayName: 'Utilisateur Méta',
      bio: '', phone: '', company: '', jobTitle: '', location: '', website: '',
      avatarUrl: null,
      created_at: new Date().toISOString()
    };
  },

  updateUserProfile: async (updates) => {
    const current = await UserAPIService.getUserProfile();
    const updated = { ...current, ...updates };
    localStorage.setItem('visiconnect_user_profile', JSON.stringify(updated));
    return { user: updated };
  },

  updateNotificationSettings: async (settings) => {
    return { settings };
  },

  updatePrivacySettings: async (settings) => {
    return { settings };
  },

  syncUser: async (userData) => {
    return userData;
  },

  formatUserStats: (stats) => {
    if (!stats) return [];
    return [
      { label: 'Réunions', value: stats.meetings_count || 0 },
      { label: 'Heures', value: Math.round((stats.total_minutes || 0) / 60) },
      { label: 'Contacts', value: stats.contacts_count || 0 }
    ];
  }
};

export default UserAPIService;
