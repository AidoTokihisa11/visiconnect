import React, { createContext, useContext } from 'react';
import { useUser, useAuth as useClerkAuth, useSignIn, useSignUp } from '@clerk/react';
// Clerk Core 3 (@clerk/react v6) correct API:
// signUp.password({ emailAddress, password })  → returns { error }
// signUp.verifications.sendEmailCode()          → returns { error }
// signUp.verifications.verifyEmailCode({ code })→ returns { error }
// signUp.finalize()                             → activates session
// signIn.password({ emailAddress, password })  → returns { error }
// signIn.finalize()                             → activates session
// useSignUp() → { signUp }  (no setActive)
// useSignIn() → { signIn }  (no setActive)
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

  // Clerk v6 (Core 3) : signIn.sso() avec redirectCallbackUrl
  const signInWithProvider = async (provider) => {
    if (!clerkSignIn) return { error: { message: "Clerk n'est pas prêt. Veuillez rafraîchir la page." } };
    try {
      const origin = window.location.origin;
      const { error } = await clerkSignIn.sso({
        strategy: `oauth_${provider}`,
        redirectCallbackUrl: `${origin}/sso-callback`,
        redirectUrl: `${origin}/`,
      });
      if (error) {
        return { error: { message: handleNetworkError(error) } };
      }
      return { success: true };
    } catch (err) {
      console.error('[signInWithProvider]', err);
      return { error: { message: handleNetworkError(err) } };
    }
  };

  const signInWithGoogle = () => signInWithProvider('google');
  const signInWithGithub = () => signInWithProvider('github');
  const signInWithDiscord = () => signInWithProvider('discord');

  // Clerk Core 3 (v6) : signIn.password({ emailAddress, password }) + signIn.finalize()
  const signInWithEmail = async (email, password) => {
    if (!clerkSignIn) return { error: { message: "Clerk n'est pas prêt." } };
    try {
      const { error } = await clerkSignIn.password({ emailAddress: email, password });
      if (error) {
        const code = error.errors?.[0]?.code;
        if (code === 'form_password_incorrect') return { error: { message: "Mot de passe incorrect." } };
        if (code === 'form_identifier_not_found') return { error: { message: "Aucun compte trouvé avec cet email." } };
        return { error: { message: error.errors?.[0]?.message || "Erreur de connexion." } };
      }
      if (clerkSignIn.status === 'complete') {
        await clerkSignIn.finalize({ navigate: () => {} });
        return { data: { user: clerkSignIn }, success: true };
      }
      if (clerkSignIn.status === 'needs_second_factor' || clerkSignIn.status === 'needs_client_trust') {
        return { error: { message: "Votre compte a la double authentification (2FA) activée. Veuillez la désactiver depuis les paramètres de votre compte." } };
      }
      return { error: { message: `Connexion incomplète (statut: ${clerkSignIn.status}). Veuillez réessayer.` } };
    } catch (err) {
      return { error: { message: handleNetworkError(err) } };
    }
  };

  // Clerk Core 3 (v6) : signUp.password() + verifications.sendEmailCode()
  const signUpWithEmail = async (email, password) => {
    if (!clerkSignUp) return { error: { message: "Clerk n'est pas prêt." } };
    try {
      const { error: pwdError } = await clerkSignUp.password({ emailAddress: email, password });
      if (pwdError) {
        const code = pwdError.errors?.[0]?.code;
        if (code === 'form_identifier_exists') return { error: { message: "Un compte existe déjà avec cet email." } };
        if (code === 'form_password_pwned') return { error: { message: "Ce mot de passe est trop commun. Choisissez-en un autre." } };
        if (code === 'form_password_length_too_short') return { error: { message: "Le mot de passe est trop court." } };
        return { error: { message: pwdError.errors?.[0]?.message || "Erreur lors de la création du compte." } };
      }

      if (clerkSignUp.status === 'complete') {
        await clerkSignUp.finalize({ navigate: () => {} });
        return { data: { user: clerkSignUp }, success: true };
      }

      // Statut missing_requirements → l'email doit être vérifié
      const { error: sendError } = await clerkSignUp.verifications.sendEmailCode();
      if (sendError) {
        return { error: { message: sendError.errors?.[0]?.message || "Impossible d'envoyer le code de vérification." } };
      }
      return { data: { requiresVerification: true, email }, success: true };
    } catch (err) {
      return { error: { message: handleNetworkError(err) } };
    }
  };

  // Clerk Core 3 (v6) : signUp.verifications.verifyEmailCode({ code }) + signUp.finalize()
  const verifyEmailCode = async (code) => {
    if (!clerkSignUp) return { error: { message: "Clerk n'est pas prêt." } };
    try {
      const { error } = await clerkSignUp.verifications.verifyEmailCode({ code });
      if (error) {
        const errCode = error.errors?.[0]?.code;
        if (errCode === 'form_code_incorrect') return { error: { message: "Code incorrect. Vérifiez votre email." } };
        if (errCode === 'verification_expired') return { error: { message: "Code expiré. Veuillez recommencer l'inscription." } };
        return { error: { message: error.errors?.[0]?.message || "Code invalide." } };
      }

      if (clerkSignUp.status === 'complete') {
        await clerkSignUp.finalize({ navigate: () => {} });
        return { data: { user: clerkSignUp }, success: true };
      }
      if (clerkSignUp.status === 'missing_requirements') {
        const missing = clerkSignUp.missingFields?.join(', ') ?? 'inconnu';
        return { error: { message: `Champs obligatoires manquants dans Clerk Dashboard : [ ${missing} ]. Allez dans User & Authentication → passez-les en "Optionnel".` } };
      }
      return { error: { message: `Vérification incomplète (statut: ${clerkSignUp.status}). Veuillez réessayer.` } };
    } catch (err) {
      return { error: { message: handleNetworkError(err) } };
    }
  };

  const logout = async () => {
    await signOut();
    return { success: true };
  };

  // Clerk Core 3 : envoie un code de réinitialisation par email
  const requestPasswordReset = async (email) => {
    if (!clerkSignIn) return { error: { message: "Clerk n'est pas prêt." } };
    try {
      const result = await clerkSignIn.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      });
      // Si create() ne lève pas d'erreur, le code a été envoyé.
      // Le statut attendu est 'needs_first_factor' mais on accepte tout statut non-erreur.
      if (result.status === 'needs_first_factor' || result.status) {
        return { success: true };
      }
      return { error: { message: "Impossible d'envoyer l'email de réinitialisation." } };
    } catch (err) {
      const code = err.errors?.[0]?.code;
      if (code === 'form_identifier_not_found') return { error: { message: "Aucun compte trouvé avec cet email." } };
      return { error: { message: handleNetworkError(err) } };
    }
  };

  // Clerk Core 3 : vérifie le code et définit le nouveau mot de passe
  const confirmPasswordReset = async (code, newPassword) => {
    if (!clerkSignIn) return { error: { message: "Clerk n'est pas prêt." } };
    try {
      const result = await clerkSignIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password: newPassword,
      });
      if (result.status === 'complete') {
        await clerkSignIn.finalize({ navigate: () => {} });
        return { success: true };
      }
      return { error: { message: `Réinitialisation incomplète (statut: ${result.status}).` } };
    } catch (err) {
      const code = err.errors?.[0]?.code;
      if (code === 'form_code_incorrect') return { error: { message: "Code incorrect. Vérifiez votre email." } };
      if (code === 'verification_expired') return { error: { message: "Code expiré. Veuillez recommencer." } };
      if (code === 'form_password_pwned') return { error: { message: "Ce mot de passe est trop commun. Choisissez-en un autre." } };
      if (code === 'form_password_length_too_short') return { error: { message: "Le mot de passe est trop court (minimum 8 caractères)." } };
      return { error: { message: handleNetworkError(err) } };
    }
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
    signInWithDiscord,
    logout,
    requestPasswordReset,
    confirmPasswordReset,
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

