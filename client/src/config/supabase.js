// Fichier de compatibilité mock pour retirer les erreurs de build
export const supabase = {
  auth: {
    getUser: async () => ({ data: { user: null } }),
    getSession: async () => ({ data: { session: null } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signOut: async () => ({ error: null }),
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: null }),
        order: () => ({ limit: () => ({ data: [], error: null }) })
      }),
      order: () => ({ limit: async () => ({ data: [], error: null }) })
    }),
    insert: () => ({ select: async () => ({ data: null, error: null }) }),
    update: () => ({ eq: async () => ({ data: null, error: null }) }),
    delete: () => ({ eq: async () => ({ data: null, error: null }) })
  })
};