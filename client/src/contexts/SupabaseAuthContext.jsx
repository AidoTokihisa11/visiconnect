import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from '../config/supabase'
import SupabaseUserService from '../services/SupabaseUserService'
import UserService from '../services/UserService' // Add UserService import

const SupabaseAuthContext = createContext({})

export const useSupabaseAuth = () => {
  const context = useContext(SupabaseAuthContext)
  if (!context) {
    throw new Error('useSupabaseAuth must be used within SupabaseAuthProvider')
  }
  return context
}

export const SupabaseAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [session, setSession] = useState(null)

  // Function to handle local dev login
  const loginAsDev = () => {
    const devUser = {
      id: 'dev-user-123',
      email: 'admin@local.dev',
      user_metadata: {
        display_name: 'Admin Local',
        full_name: 'Admin Local',
        avatar_url: 'https://ui-avatars.com/api/?name=Admin+Local&background=0D8ABC&color=fff'
      },
      role: 'admin',
      aud: 'authenticated',
      created_at: new Date().toISOString()
    };
    
    // Save to local storage via UserService
    UserService.saveUser(devUser);
    
    // Update state
    setUser(devUser);
    setSession({ 
      user: devUser, 
      access_token: 'dev-token', 
      token_type: 'bearer',
      expires_in: 3600 
    });
    
    return { data: { user: devUser }, error: null };
  };

  // Fetch user profile from database
  const fetchUserProfile = useCallback(async (email) => {
    try {
      // If it's the dev user, return mock profile
      if (email === 'admin@local.dev') {
        const mockProfile = {
          id: 'dev-user-123',
          email: 'admin@local.dev',
          display_name: 'Admin Local',
          avatar_url: 'https://ui-avatars.com/api/?name=Admin+Local&background=0D8ABC&color=fff',
          role: 'admin'
        };
        setUserProfile(mockProfile);
        return mockProfile;
      }

      const profile = await SupabaseUserService.getUserProfile(email)
      setUserProfile(profile)
      return profile
    } catch (err) {
      console.error('Error in fetchUserProfile:', err)
      setError(err.message)
      return null
    }
  }, [])

  // Initialize auth state
  useEffect(() => {
    let mounted = true

    const initializeAuth = async () => {
      try {
        // Check for local dev user first
        const localUser = UserService.getUser();
        if (localUser && localUser.email === 'admin@local.dev') {
             if (mounted) {
                setUser(localUser);
                setSession({ user: localUser, access_token: 'dev-token' });
                // Also set profile
                 const mockProfile = {
                    id: 'dev-user-123',
                    email: 'admin@local.dev',
                    display_name: 'Admin Local',
                    avatar_url: 'https://ui-avatars.com/api/?name=Admin+Local&background=0D8ABC&color=fff',
                    role: 'admin'
                };
                setUserProfile(mockProfile);
             }
             setLoading(false);
             return; // Skip supabase check
        }

        // Get current session
        const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) throw sessionError

        if (currentSession?.user && mounted) {
          setUser(currentSession.user)
          setSession(currentSession)
          
          // Sync user profile
          await SupabaseUserService.syncUser({
            email: currentSession.user.email,
            display_name: currentSession.user.user_metadata?.display_name || currentSession.user.user_metadata?.full_name,
            first_name: currentSession.user.user_metadata?.first_name,
            last_name: currentSession.user.user_metadata?.last_name,
            avatar_url: currentSession.user.user_metadata?.avatar_url
          })
          
          // Fetch user profile
          await fetchUserProfile(currentSession.user.email)
        }
      } catch (err) {
        console.error('Error initializing auth:', err)
        setError(err.message)
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    initializeAuth()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        // Only log important auth events in development
        if (import.meta.env.DEV && (event === 'SIGNED_OUT' || event === 'USER_DELETED')) {
          console.log('🔐 Supabase Auth event:', event)
        }
        
        if (currentSession?.user && mounted) {
          setUser(currentSession.user)
          setSession(currentSession)
          
          // Sync user profile on sign in
          if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
            await SupabaseUserService.syncUser({
              email: currentSession.user.email,
              display_name: currentSession.user.user_metadata?.display_name || currentSession.user.user_metadata?.full_name,
              first_name: currentSession.user.user_metadata?.first_name,
              last_name: currentSession.user.user_metadata?.last_name,
              avatar_url: currentSession.user.user_metadata?.avatar_url
            })
          }
          
          // Fetch profile
          await fetchUserProfile(currentSession.user.email)
        } else if (event === 'SIGNED_OUT' && mounted) {
          setUser(null)
          setUserProfile(null)
          setSession(null)
        }
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [fetchUserProfile])

  // Sign in with email and password
  const signIn = async (email, password) => {
    try {
      setError(null)
      setLoading(true)
      
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (signInError) throw signInError
      
      return { data, error: null }
    } catch (err) {
      console.error('Sign in error:', err)
      setError(err.message)
      return { data: null, error: err }
    } finally {
      setLoading(false)
    }
  }

  // Sign up with email and password
  const signUp = async (email, password, metadata = {}) => {
    try {
      setError(null)
      setLoading(true)
      
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: metadata.display_name || metadata.full_name || email.split('@')[0],
            first_name: metadata.first_name,
            last_name: metadata.last_name,
            ...metadata
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })
      
      if (signUpError) throw signUpError
      
      return { data, error: null }
    } catch (err) {
      console.error('Sign up error:', err)
      setError(err.message)
      return { data: null, error: err }
    } finally {
      setLoading(false)
    }
  }

  // Sign out
  const signOut = async () => {
    try {
      setError(null)
      const { error: signOutError } = await supabase.auth.signOut()
      
      if (signOutError) throw signOutError
      
      setUser(null)
      setUserProfile(null)
      setSession(null)
      
      return { error: null }
    } catch (err) {
      console.error('Sign out error:', err)
      setError(err.message)
      return { error: err }
    }
  }

  // Sign in with OAuth provider (Google, GitHub, etc.)
  const signInWithProvider = async (provider) => {
    try {
      setError(null)
      
      const { data, error: oauthError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      
      if (oauthError) throw oauthError
      
      return { data, error: null }
    } catch (err) {
      console.error('OAuth sign in error:', err)
      setError(err.message)
      return { data: null, error: err }
    }
  }

  // Reset password
  const resetPassword = async (email) => {
    try {
      setError(null)
      
      const { data, error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })
      
      if (resetError) throw resetError
      
      return { data, error: null }
    } catch (err) {
      console.error('Reset password error:', err)
      setError(err.message)
      return { data: null, error: err }
    }
  }

  // Update password
  const updatePassword = async (newPassword) => {
    try {
      setError(null)
      
      const { data, error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      })
      
      if (updateError) throw updateError
      
      return { data, error: null }
    } catch (err) {
      console.error('Update password error:', err)
      setError(err.message)
      return { data: null, error: err }
    }
  }

  // Update user profile
  const updateProfile = async (updates) => {
    try {
      setError(null)
      
      // Update profile in database
      const { data, error: profileError } = await SupabaseUserService.updateUserProfile(updates)
      
      if (profileError) throw profileError
      
      // Update local state
      setUserProfile(data)
      
      // Update auth metadata if needed
      if (updates.display_name || updates.avatar_url) {
        await supabase.auth.updateUser({
          data: {
            display_name: updates.display_name,
            avatar_url: updates.avatar_url
          }
        })
      }
      
      return { data, error: null }
    } catch (err) {
      console.error('Update profile error:', err)
      setError(err.message)
      return { data: null, error: err }
    }
  }

  // Refresh user profile
  const refreshProfile = async () => {
    if (user?.email) {
      await fetchUserProfile(user.email)
    }
  }

  const value = {
    // Auth state
    user,
    userProfile,
    session,
    loading,
    error,
    isAuthenticated: !!user,
    
    // Auth methods
    signIn,
    signUp,
    signOut: async () => {
        // Clear local storage if dev user
        UserService.clearUser();
        // Clear state
        setUser(null);
        setSession(null);
        setUserProfile(null);
        // Supabase sign out
        return supabase.auth.signOut();
    },
    loginAsDev, // Expose helper
    signInWithProvider,
    resetPassword,
    updatePassword,
    updateProfile,
    refreshProfile,
    
    // User service methods (exposed for convenience)
    getUserMeetings: SupabaseUserService.getUserMeetings,
    createMeeting: SupabaseUserService.createMeeting,
    updateMeeting: SupabaseUserService.updateMeeting,
    deleteMeeting: SupabaseUserService.deleteMeeting,
    updateUserStats: SupabaseUserService.updateUserStats,
    getPublicMeetings: SupabaseUserService.getPublicMeetings,
    searchUsers: SupabaseUserService.searchUsers,
    updateUserPreferences: SupabaseUserService.updateUserPreferences
  }

  return (
    <SupabaseAuthContext.Provider value={value}>
      {children}
    </SupabaseAuthContext.Provider>
  )
}

export default SupabaseAuthContext
