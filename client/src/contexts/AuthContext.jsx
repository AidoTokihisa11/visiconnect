import React, { createContext, useContext } from 'react';
import { useUser, useAuth as useClerkAuth, useSignIn, useSignUp } from '@clerk/react';
// Clerk React v6 correct API:
// signUp.create({ emailAddress, password })
// signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
// signUp.attemptEmailAddressVerification({ code })
// setActive({ session: signUp.createdSessionId })
// signIn.create({ strategy: 'password', identifier: email, password })
// setActive({ session: signIn.createdSessionId })
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
  const { signIn: clerkSignIn, setActive: setSignInActive } = useSignIn();
  const { signUp: clerkSignUp, setActive: setSignUpActive } = useSignUp();
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

  // Clerk Core 2 (v6) : signIn.create({ strategy:'password', identifier, password })
  const signInWithEmail = async (email, password) => {
    if (!clerkSignIn) return { error: { message: "Clerk n'est pas prêt." } };
    try {
      const result = await clerkSignIn.create({
        strategy: 'password',
        identifier: email,
        password,
      });
      if (result.status === 'complete') {
        await setSignInActive({ session: result.createdSessionId });
        return { data: { user: result }, success: true };
      }
      if (result.status === 'needs_second_factor') {
        return { error: { message: "Votre compte a la double authentification (2FA) activée. Veuillez la désactiver depuis les paramètres de votre compte." } };
      }
      return { error: { message: `Connexion incomplète (statut: ${result.status}). Veuillez réessayer.` } };
    } catch (err) {
      const code = err.errors?.[0]?.code;
      if (code === 'form_password_incorrect') return { error: { message: "Mot de passe incorrect." } };
      if (code === 'form_identifier_not_found') return { error: { message: "Aucun compte trouvé avec cet email." } };
      return { error: { message: handleNetworkError(err) } };
    }
  };

  // Clerk Core 2 (v6) : signUp.create() + prepareEmailAddressVerification()
  const signUpWithEmail = async (email, password) => {
    if (!clerkSignUp) return { error: { message: "Clerk n'est pas prêt." } };
    try {
      const result = await clerkSignUp.create({ emailAddress: email, password });

      if (result.status === 'complete') {
        await setSignUpActive({ session: result.createdSessionId });
        return { data: { user: result }, success: true };
      }

      // Envoyer le code de vérification par email
      await clerkSignUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      return { data: { requiresVerification: true, email }, success: true };
    } catch (err) {
      const code = err.errors?.[0]?.code;
      if (code === 'form_identifier_exists') return { error: { message: "Un compte existe déjà avec cet email." } };
      if (code === 'form_password_pwned') return { error: { message: "Ce mot de passe est trop commun. Choisissez-en un autre." } };
      if (code === 'form_password_length_too_short') return { error: { message: "Le mot de passe est trop court." } };
      return { error: { message: handleNetworkError(err) } };
    }
  };

  // Clerk Core 2 (v6) : signUp.attemptEmailAddressVerification({ code })
  const verifyEmailCode = async (code) => {
    if (!clerkSignUp) return { error: { message: "Clerk n'est pas prêt." } };
    try {
      const result = await clerkSignUp.attemptEmailAddressVerification({ code });

      if (result.status === 'complete') {
        await setSignUpActive({ session: result.createdSessionId });
        return { data: { user: result }, success: true };
      }
      if (result.status === 'missing_requirements') {
        const missing = result.missingFields?.join(', ') ?? 'inconnu';
        return { error: { message: `Champs obligatoires manquants dans Clerk Dashboard : [ ${missing} ]. Allez dans User & Authentication → passez-les en "Optionnel".` } };
      }
      return { error: { message: `Vérification incomplète (statut: ${result.status}). Veuillez réessayer.` } };
    } catch (err) {
      const code = err.errors?.[0]?.code;
      if (code === 'form_code_incorrect') return { error: { message: "Code incorrect. Vérifiez votre email." } };
      if (code === 'verification_expired') return { error: { message: "Code expiré. Veuillez recommencer l'inscription." } };
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

