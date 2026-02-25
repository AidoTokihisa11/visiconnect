import { supabase } from '../config/supabase';

const UserAPIService = {
  getUserProfile: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        // If user not in DB yet, return basic auth info
        if (error.code === 'PGRST116') {
             return {
                id: user.id,
                email: user.email,
                displayName: user.user_metadata?.display_name || user.email?.split('@')[0],
                avatarUrl: user.user_metadata?.avatar_url,
                created_at: user.created_at
             };
        }
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Error in getUserProfile:', error);
      throw error;
    }
  },

  updateUserProfile: async (updates) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();
      
      if (error) throw error;
      return { user: data };
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  updateNotificationSettings: async (settings) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('User not authenticated');
      
      // Map frontend settings to potentially different DB column names if needed
      // Assuming 1:1 mapping based on server/routes/user.js context
      const updates = {
        email_notifications: settings.emailNotifications,
        push_notifications: settings.pushNotifications,
        desktop_notifications: settings.desktopNotifications,
        marketing_emails: settings.marketingEmails
      };

      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();
        
      if (error) throw error;
      return { settings: data };
    } catch (error) {
        console.error('Error updating notification settings:', error);
        throw error;
    }
  },

  updatePrivacySettings: async (settings) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('User not authenticated');

      const updates = {
        show_online_status: settings.showOnlineStatus,
        allow_contact_by_email: settings.allowContactByEmail,
        allow_contact_by_phone: settings.allowContactByPhone,
        data_processing_consent: settings.dataProcessingConsent,
        analytics_consent: settings.analyticsConsent
      };

      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();
        
      if (error) throw error;
      return { settings: data };
    } catch (error) {
        console.error('Error updating privacy settings:', error);
        throw error;
    }
  },

  syncUser: async (userData) => {
    try {
       // This mirrors SupabaseUserService behavior but perhaps exposed differently
       // For now, let's reuse the logic but call it via supabase
       // Assuming 'userData' has email etc.
       // However, to sync, we often need the user ID which we get from auth context
       
       const { data, error } = await supabase
        .from('users')
        .upsert({
            email: userData.email,
            display_name: userData.displayName,
            first_name: userData.firstName,
            last_name: userData.lastName,
            avatar_url: userData.avatarUrl || userData.avatar_url,
            updated_at: new Date().toISOString()
        }, { onConflict: 'email' });
        
       if (error) throw error;
       return data;
    } catch (error) {
       console.error('Error syncing user:', error);
       // robust fallback
       return null;
    }
  }
};

export default UserAPIService;
