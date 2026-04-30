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
  const { isSignedIn, signOut, isLoaded: isAuthLoaded } = useClerkAuth();
  const clerk = useClerk();
  const { signIn: clerkSignIn, setActive: setSignInActive } = useSignIn();
  const { signUp: clerkSignUp, setActive: setSignUpActive } = useSignUp();
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
    if (!clerkSignIn) return { error: { message: "Clerk n'est pas prêt." } };
    try {
      await clerkSignIn.authenticateWithRedirect({
        strategy: `oauth_${provider}`,
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
    if (!clerkSignIn) return { error: { message: "Clerk n'est pas prêt." } };
    try {
      const res = await clerkSignIn.create({ identifier: email, password });
      if (res.status === "complete") {
        await setSignInActive({ session: res.createdSessionId });
        return { data: { user: res }, success: true };
      }
      if (res.status === "needs_second_factor") {
        return { error: { message: "Votre compte a la double authentification (2FA) activée. Veuillez désactiver le 2FA depuis les paramètres de votre compte, ou contactez le support." } };
      }
      if (res.status === "needs_first_factor") {
        return { error: { message: "Ce compte utilise une connexion sociale (Google, GitHub...). Veuillez utiliser le bouton de connexion sociale correspondant." } };
      }
      return { error: { message: `Connexion incomplète (statut: ${res.status}). Veuillez réessayer ou contacter le support.` } };
    } catch (err) {
      return { error: { message: handleNetworkError(err) } };
    }
  };

  const signUpWithEmail = async (email, password, options = {}) => {
    if (!clerkSignUp) return { error: { message: "Clerk n'est pas prêt." } };
    
    const attemptSignUp = async (withOptions) => {
      const payload = { emailAddress: email, password };
      if (withOptions) {
        if (options.firstName) payload.firstName = options.firstName;
        if (options.lastName) payload.lastName = options.lastName;
        if (options.username) payload.username = options.username;
      }
      return await clerkSignUp.create(payload);
    };

    try {
      let res;
      try {
        res = await attemptSignUp(true);
      } catch (initialErr) {
        // Si Clerk rejette à cause d'un paramètre non configuré (ex: Prénom/Nom désactivés)
        const errMsg = initialErr.errors?.[0]?.message || "";
        if (errMsg.toLowerCase().includes("unknown") || errMsg.toLowerCase().includes("inconnu")) {
          res = await attemptSignUp(false);
        } else {
          throw initialErr;
        }
      }
      
      if (res.status === "complete") {
        await setSignUpActive({ session: res.createdSessionId });
        return { data: { user: res }, success: true };
      } else {
        return { data: { requiresVerification: true, email }, success: true };
      }
    } catch (err) {
      return { error: { message: handleNetworkError(err) } };
    }
  };

  const prepareVerification = async () => {
    if (!clerkSignUp) return { error: { message: "Clerk n'est pas prêt." } };
    try {
      await clerkSignUp.prepareEmailAddressVerification({ strategy: "email_code" });
      return { success: true };
    } catch (err) {
      return { error: { message: handleNetworkError(err) } };
    }
  };

  const verifyEmailCode = async (code) => {
    if (!clerkSignUp) return { error: { message: "Clerk n'est pas prêt." } };
    try {
      const res = await clerkSignUp.attemptEmailAddressVerification({ code });
      
      if (res.status === "complete") {
        await setSignUpActive({ session: res.createdSessionId });
        return { data: { user: res }, success: true };
      } else if (res.status === "missing_requirements") {
        const missing = res.missingFields ? res.missingFields.join(", ") : "inconnu";
        return { 
          error: { 
            message: `Le code est valide, mais certains champs obligatoires sont configurés dans votre panel Clerk : [ ${missing} ]. Allez dans Clerk Dashboard → User & Authentication → Email, Phone, Username et passez ces champs en "Optionnel".`
          } 
        };
      } else if (res.status === "abandoned") {
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
    prepareVerification,
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

