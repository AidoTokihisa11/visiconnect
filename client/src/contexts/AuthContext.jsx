import React, { createContext, useContext } from 'react';
import { useUser, useAuth as useClerkAuth, useClerk } from '@clerk/react';
import { useConvexAuth } from 'convex/react';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const { user: clerkUser, isLoaded: clerkLoaded } = useUser();
  const { isSignedIn, signOut, setActive, isLoaded: isAuthLoaded } = useClerkAuth();
  const clerk = useClerk();
  const { isAuthenticated: isConvexAuthed, isLoading: isConvexLoading } = useConvexAuth();

  const isLoggedIn = !!isSignedIn;

  // Adaptateur pour la compatibilité avec le reste du code
  const user = clerkUser ? {
    id: clerkUser.id,
    email: clerkUser.primaryEmailAddress?.emailAddress,
    name: clerkUser.fullName || clerkUser.firstName || "User",
    imageUrl: clerkUser.imageUrl
  } : null;

  // Helper de gestion d'erreur réseau
  const handleNetworkError = (err) => {
    if (err.message && (err.message.includes("Failed to fetch") || err.message.includes("Network error"))) {
      return "Erreur réseau. Vérifiez votre connexion à internet.";
    }
    return err.errors?.[0]?.message || err.message || "Une erreur est survenue avec l'authentification.";
  };

  // Implémentation via l'objet client global (Clerk instance) pour éviter les hooks asynchrones bloquants
  const signInWithProvider = async (provider) => {
    if (!clerk.client) return { error: { message: "Clerk n'est pas prêt." } };
    try {
      await clerk.client.signIn.authenticateWithRedirect({
        strategy: `oauth_${provider}`, // ex: "oauth_google"
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/'
      });
      return { success: true };
    } catch (err) {
      console.error(err);
      return { error: { message: handleNetworkError(err) } };
    }
  };

  const signInWithGoogle = () => signInWithProvider('google');
  const signInWithGithub = () => signInWithProvider('github');
  const signInWithDiscord = () => signInWithProvider('discord');

  const signInWithEmail = async (email, password) => {
    if (!clerk.client) return { error: { message: "Clerk n'est pas prêt." } };
    try {
      const res = await clerk.client.signIn.create({ identifier: email, password });
      if (res.status === "complete") {
        await setActive({ session: res.createdSessionId });
        return { data: { user: res }, success: true };
      }
      return { error: { message: "Information manquante" } };
    } catch (err) {
      return { error: { message: handleNetworkError(err) } };
    }
  };

  const signUpWithEmail = async (email, password) => {
    if (!clerk.client) return { error: { message: "Clerk n'est pas prêt." } };
    try {
      const res = await clerk.client.signUp.create({ emailAddress: email, password });
      
      if (res.status === "complete") {
        await setActive({ session: res.createdSessionId });
        return { data: { user: res }, success: true };
      } else {
        // Le statut n'est pas complet (probablement en attente de vérification d'email)
        return { 
          error: { 
            message: "Action requise : Clerk demande une vérification d'email. Pour autoriser les adresses aléatoires sans vérification, vous devez désactiver la vérification d'email et de mot de passe dans les paramètres de votre dashboard Clerk (Email, Phone, Web3)." 
          } 
        };
      }
    } catch (err) {
      return { error: { message: handleNetworkError(err) } };
    }
  };

  const logout = async () => {
    await signOut();
    return { success: true };
  };

  const value = {
    user,
    isLoggedIn,
    loading: !(clerkLoaded && isAuthLoaded && !isConvexLoading),
    signIn: signInWithEmail,   
    signUp: signUpWithEmail,   
    signInWithGoogle,
    signInWithGithub,
    signInWithDiscord,
    signInWithProvider,
    signInWithEmail,
    signUpWithEmail,
    logout
  };

  // On bloque seulement le chargement critique global pour éviter un rendu prématuré
  if (!clerkLoaded || !isAuthLoaded || isConvexLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

