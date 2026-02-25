import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jhlvpxtvtcuwkhdqvyhu.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpobHZweHR2dGN1d2toZHF2eWh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNDc5ODcsImV4cCI6MjA3NDkyMzk4N30.qZkWE2dg1Qlmx1Yt2V8tWc363KSqtLAITGNSPyBLTbs'

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
    storageKey: 'visiconnect.auth.token',
    flowType: 'pkce'
  },
  db: {
    schema: 'public'
  },
  realtime: {
    params: {
      log_level: 'info' // Enable Realtime logging for debugging
    }
  },
  global: {
    headers: {
      'x-client-info': 'visiconnect-client'
    }
  }
})

// Helper functions for common operations
export const supabaseHelpers = {
  // Get current user
  getCurrentUser: async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw error
      return user
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  },

  // Get current session
  getCurrentSession: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw error
      return session
    } catch (error) {
      console.error('Error getting session:', error)
      return null
    }
  },

  // Sign in with email and password
  signInWithEmail: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error signing in:', error)
      return { data: null, error }
    }
  },

  // Sign up with email and password
  signUpWithEmail: async (email, password, metadata = {}) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error signing up:', error)
      return { data: null, error }
    }
  },

  // Sign out
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Error signing out:', error)
      return { error }
    }
  },

  // Sign in with OAuth provider
  signInWithOAuth: async (provider) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error signing in with OAuth:', error)
      return { data: null, error }
    }
  },

  // Reset password
  resetPassword: async (email) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error resetting password:', error)
      return { data: null, error }
    }
  },

  // Update user
  updateUser: async (updates) => {
    try {
      const { data, error } = await supabase.auth.updateUser(updates)
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error updating user:', error)
      return { data: null, error }
    }
  }
}

export default supabase
