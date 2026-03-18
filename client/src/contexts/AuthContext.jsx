import React, { createContext, useContext } from 'react';
import { useUser, useAuth as useClerkAuth, useClerk, useSignIn, useSignUp } from '@clerk/react';
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
  const { isSignedIn, signOut, setActive } = useClerkAuth();
  const clerk = useClerk();
  const { signIn, isLoaded: isSignInLoaded } = useSignIn();
  const { signUp, isLoaded: isSignUpLoaded } = useSignUp();
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
      return "Erreur réseau (CORS). Désactivez votre bloqueur de pub (Brave Shields, uBlock) ou videz les cookies de localhost.";
    }
    return err.errors?.[0]?.message || err.message || "Une erreur est survenue avec l'authentification.";
  };

  // Implémentation réelle de la méthode attendue par tes templates (Google/Github)
  const signInWithProvider = async (provider) => {
    if (!isSignInLoaded) return { error: { message: "Clerk n'a pas pu se charger. Désactivez votre bloqueur de pub (Brave Shields, uBlock) pour localhost." } };
    try {
      await signIn.authenticateWithRedirect({
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
    if (!isSignInLoaded) return { error: { message: "Clerk n'a pas pu se charger. Désactivez votre bloqueur de pub (Brave Shields, uBlock) pour localhost." } };
    try {
      const res = await signIn.create({ identifier: email, password });
      if (res.status === "complete") {
        await setActive({ session: res.createdSessionId });
        return { success: true };
      }
      return { error: { message: "Information manquante" } };
    } catch (err) {
      return { error: { message: handleNetworkError(err) } };
    }
  };

  const signUpWithEmail = async (email, password) => {
    if (!isSignUpLoaded) return { error: { message: "Clerk n'a pas pu se charger. Désactivez votre bloqueur de pub pour localhost." } };
    try {
      await signUp.create({ emailAddress: email, password });
      // L'utilisateur devra vérifier son email, ça dépend de ton Dashboard Clerk
      return { success: true };
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
    loading: !(clerkLoaded && !isConvexLoading),
    signIn: signInWithEmail,   // Alias requis pour les vieilles pages
    signUp: signUpWithEmail,   // Alias requis pour les vieilles pages
    signInWithGoogle,
    signInWithGithub,
    signInWithDiscord,
    signInWithProvider,
    signInWithEmail,
    signUpWithEmail,
    logout
  };

  // On bloque seulement le chargement critique (l'utilisateur et la BD) pour éviter une page blanche infinie
  if (!clerkLoaded || isConvexLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
