const UserAPIService = {
  getUserProfile: async () => {
    // Mock pour Convex / transition
    return {
      id: localStorage.getItem('convex_user_id') || 'demo_user',
      email: 'user@visiconnect.com',
      displayName: 'Utilisateur Convex',
      avatarUrl: null,
      created_at: new Date().toISOString()
    };
  },

  updateUserProfile: async (updates) => {
    console.log('Update profile mock', updates);
    return { user: { id: 'demo_user', ...updates } };
  },

  updateNotificationSettings: async (settings) => {
    console.log('Update notif module mock', settings);
    return { settings };
  },

  updatePrivacySettings: async (settings) => {
    console.log('Update privacy mock', settings);
    return { settings };
  },

  syncUser: async (userData) => {
    console.log('Sync user mock', userData);
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
