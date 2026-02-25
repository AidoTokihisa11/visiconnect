import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import UserService from '../services/UserService';
import UserAPIService from '../services/UserAPIService';

export const useAuthUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkAuthState = async () => {
      try {
        const { data: { user: supabaseUser }, error } = await supabase.auth.getUser();
        
        if (error || !supabaseUser) {
          if (isMounted) {
            const savedUser = UserService.getUser();
            setUser(savedUser);
            setLoading(false);
          }
          return;
        }

        const userData = {
          id: supabaseUser.id,
          email: supabaseUser.email,
          displayName: supabaseUser.user_metadata?.display_name || supabaseUser.email?.split('@')[0] || 'Utilisateur',
          profileImageUrl: supabaseUser.user_metadata?.avatar_url || null,
          isEmailVerified: !!supabaseUser.email_confirmed_at
        };

        UserService.saveUser(userData);
        
        try {
          // Ne synchroniser que si l'email est présent
          if (userData.email) {
            await UserAPIService.syncUser({
              email: userData.email,
              displayName: userData.displayName,
              firstName: supabaseUser.user_metadata?.first_name,
              lastName: supabaseUser.user_metadata?.last_name,
              avatarUrl: userData.profileImageUrl
            });
          } else {
            console.warn('Impossible de synchroniser: email manquant');
          }
        } catch (err) {
          console.warn('Sync error:', err.message);
        }
        
        if (isMounted) {
          setUser(userData);
          setLoading(false);
        }
      } catch (error) {
        console.error('Auth error:', error);
        if (isMounted) {
          setUser(null);
          setLoading(false);
        }
      }
    };

    checkAuthState();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        UserService.clearUser();
        if (isMounted) { setUser(null); setLoading(false); }
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        checkAuthState();
      }
    });

    const handleStorageChange = () => checkAuthState();
    const handleUserUpdated = (evt) => {
      if (evt?.detail === null && isMounted) {
        setUser(null);
        setLoading(false);
      } else {
        checkAuthState();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userUpdated', handleUserUpdated);

    return () => {
      isMounted = false;
      subscription.unsubscribe();
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userUpdated', handleUserUpdated);
    };
  }, []);

  const refreshUser = () => {
    setLoading(true);
    window.dispatchEvent(new Event('storage'));
  };

  return { user, loading, refreshUser };
};
