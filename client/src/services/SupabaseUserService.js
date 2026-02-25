import { supabase } from '../config/supabase';

const SupabaseUserService = {
  getUserProfile: async (email) => {
    try {
      if (!email) return null;
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();
      
      if (error) {
        // If user not found, it's not a critical error, just return null
        if (error.code === 'PGRST116') return null;
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Error in SupabaseUserService.getUserProfile:', error);
      throw error;
    }
  },

  syncUser: async (userData) => {
    try {
      // Map standard fields to database schema if needed
      // ensuring we don't send undefined values for required fields
      const dbUser = {
        email: userData.email,
        display_name: userData.display_name || userData.email.split('@')[0],
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        avatar_url: userData.avatar_url || '',
        updated_at: new Date().toISOString(),
        last_login: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('users')
        .upsert(dbUser, { onConflict: 'email' })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error in SupabaseUserService.syncUser:', error);
      // Don't throw, just log, so auth flow continues even if sync fails
      return null;
    }
  }
};

export default SupabaseUserService;
