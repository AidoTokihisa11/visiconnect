import React, { createContext, useContext } from 'react';
import { useUser, useAuth as useClerkAuth, useSignIn, useSignUp } from '@clerk/react';
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
  const { isSignedIn, signOut, isLoaded: isAuthLoaded } = useClerkAuth();
  const { signIn: clerkSignIn } = useSignIn();
  const { signUp: clerkSignUp } = useSignUp();
  const { isLoading: isConvexLoading } = useConvexAuth();

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

  // Nouvelle API Clerk Core 3 : signIn.sso() remplace authenticateWithRedirect()
  const signInWithProvider = async (provider) => {
    if (!clerkSignIn) return { error: { message: "Clerk n'est pas prêt." } };
    try {
      const { error } = await clerkSignIn.sso({
        strategy: `oauth_${provider}`,
        redirectCallbackUrl: '/sso-callback',
        redirectUrl: '/'
      });
      if (error) {
        return { error: { message: error.errors?.[0]?.message || error.message || "Erreur OAuth." } };
      }
      return { success: true };
    } catch (err) {
      console.error(err);
      return { error: { message: handleNetworkError(err) } };
    }
  };

  const signInWithGoogle = () => signInWithProvider('google');
  const signInWithGithub = () => signInWithProvider('github');
  const signInWithDiscord = () => signInWithProvider('discord');

  // Nouvelle API Clerk Core 3 : signIn.password() + signIn.finalize()
  const signInWithEmail = async (email, password) => {
    if (!clerkSignIn) return { error: { message: "Clerk n'est pas prêt." } };
    try {
      const { error } = await clerkSignIn.password({ emailAddress: email, password });
      if (error) {
        const code = error.errors?.[0]?.code;
        if (code === 'form_password_incorrect') {
          return { error: { message: "Mot de passe incorrect." } };
        }
        return { error: { message: error.errors?.[0]?.message || "Identifiants incorrects." } };
      }
      if (clerkSignIn.status === "complete") {
        await clerkSignIn.finalize();
        return { data: { user: clerkSignIn }, success: true };
      }
      if (clerkSignIn.status === "needs_second_factor") {
        return { error: { message: "Votre compte a la double authentification (2FA) activée. Veuillez désactiver le 2FA depuis les paramètres de votre compte, ou contactez le support." } };
      }
      if (clerkSignIn.status === "needs_first_factor") {
        return { error: { message: "Ce compte utilise une connexion sociale (Google, GitHub...). Veuillez utiliser le bouton de connexion sociale correspondant." } };
      }
      return { error: { message: `Connexion incomplète (statut: ${clerkSignIn.status}). Veuillez réessayer ou contacter le support.` } };
    } catch (err) {
      return { error: { message: handleNetworkError(err) } };
    }
  };

  // Nouvelle API Clerk Core 3 : signUp.password() + signUp.verifications.sendEmailCode()
  const signUpWithEmail = async (email, password) => {
    if (!clerkSignUp) return { error: { message: "Clerk n'est pas prêt." } };
    try {
      const { error } = await clerkSignUp.password({ emailAddress: email, password });
      if (error) {
        return { error: { message: error.errors?.[0]?.message || "Erreur lors de l'inscription." } };
      }

      if (clerkSignUp.status === "complete") {
        await clerkSignUp.finalize();
        return { data: { user: clerkSignUp }, success: true };
      }

      // Envoi du code de vérification par email
      await clerkSignUp.verifications.sendEmailCode();
      return { data: { requiresVerification: true, email }, success: true };
    } catch (err) {
      return { error: { message: handleNetworkError(err) } };
    }
  };

  // Nouvelle API Clerk Core 3 : signUp.verifications.verifyEmailCode() + signUp.finalize()
  const verifyEmailCode = async (code) => {
    if (!clerkSignUp) return { error: { message: "Clerk n'est pas prêt." } };
    try {
      const { error } = await clerkSignUp.verifications.verifyEmailCode({ code });
      if (error) {
        return { error: { message: error.errors?.[0]?.message || "Code incorrect ou expiré." } };
      }

      if (clerkSignUp.status === "complete") {
        await clerkSignUp.finalize();
        return { data: { user: clerkSignUp }, success: true };
      } else if (clerkSignUp.status === "missing_requirements") {
        const missing = clerkSignUp.missingFields ? clerkSignUp.missingFields.join(", ") : "inconnu";
        return { 
          error: { 
            message: `Le code est valide, mais certains champs obligatoires sont configurés dans votre panel Clerk : [ ${missing} ]. Allez dans Clerk Dashboard → User & Authentication → Email, Phone, Username et passez ces champs en "Optionnel".`
          } 
        };
      } else if (clerkSignUp.status === "abandoned") {
        return { error: { message: "La session d'inscription a expiré. Veuillez recommencer l'inscription depuis le début." } };
      } else {
        return { error: { message: "Vérification incomplète. Veuillez réessayer ou recommencer l'inscription." } };
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
    verifyEmailCode,
    signInWithProvider,
    signInWithGoogle,
    signInWithGithub,
    signInWithDiscord,    logout
  };

  // On bloque seulement le chargement critique global pour éviter un rendu prématuré
  if (!clerkLoaded || !isAuthLoaded) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', fontFamily: 'sans-serif' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #f3f3f3', borderTop: '3px solid #2563eb', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <p style={{ marginTop: '20px', color: '#64748b' }}>Chargement de l'authentification (Clerk)...</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

