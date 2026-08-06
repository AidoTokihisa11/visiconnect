import React, { createContext, useContext } from 'react';
import { useUser, useAuth as useClerkAuth, useSignIn, useSignUp } from '@clerk/react';
// Clerk JS (@clerk/react v6) — SignIn / SignUp resource API:
//   signIn.create({ identifier, password })                → returns SignInResource
//   signUp.create({ emailAddress, password })              → returns SignUpResource
//   signUp.prepareEmailAddressVerification({ strategy })   → sends the code
//   signUp.attemptEmailAddressVerification({ code })       → verifies the code
//   setActive({ session: <createdSessionId> })             → activates the session
// Errors are thrown (try/catch) and exposed on err.errors[].code / .message.
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
  const { signIn: clerkSignIn, setActive: setActiveSignIn } = useSignIn();
  const { signUp: clerkSignUp, setActive: setActiveSignUp } = useSignUp();
  const { isLoading: isConvexLoading } = useConvexAuth();

  const isLoggedIn = !!isSignedIn;

  const user = clerkUser
    ? {
        id: clerkUser.id,
        email: clerkUser.primaryEmailAddress?.emailAddress,
        name: clerkUser.fullName || clerkUser.firstName || 'User',
        imageUrl: clerkUser.imageUrl,
      }
    : null;

  const extractClerkError = (err) => {
    if (err?.errors?.[0]) {
      return {
        code: err.errors[0].code,
        message: err.errors[0].longMessage || err.errors[0].message,
      };
    }
    if (
      err?.message &&
      (err.message.includes('Failed to fetch') || err.message.includes('Network'))
    ) {
      return {
        code: 'network_error',
        message: 'Erreur réseau. Vérifiez votre connexion à internet.',
      };
    }
    return {
      code: 'unknown',
      message: err?.message || "Une erreur est survenue avec l'authentification.",
    };
  };

  const mapSignInError = (err) => {
    const { code, message } = extractClerkError(err);
    if (code === 'form_password_incorrect') return 'Mot de passe incorrect.';
    if (code === 'form_identifier_not_found') return 'Aucun compte trouvé avec cet email.';
    if (code === 'form_param_format_invalid') return "Format d'email invalide.";
    if (code === 'strategy_for_user_invalid')
      return 'Ce compte utilise une connexion externe (Google/GitHub).';
    return message || 'Erreur de connexion.';
  };

  const mapSignUpError = (err) => {
    const { code, message } = extractClerkError(err);
    if (code === 'form_identifier_exists') return 'Un compte existe déjà avec cet email.';
    if (code === 'form_password_pwned')
      return 'Ce mot de passe est trop commun. Choisissez-en un autre.';
    if (code === 'form_password_length_too_short')
      return 'Le mot de passe est trop court (minimum 8 caractères).';
    if (code === 'form_password_validation_failed')
      return 'Mot de passe invalide. Respectez les critères de sécurité.';
    return message || 'Erreur lors de la création du compte.';
  };

  // OAuth via authenticateWithRedirect (Clerk stable API).
  const signInWithProvider = async (provider) => {
    if (!clerkSignIn) {
      return {
        error: {
          message:
            'Authentification non prête — veuillez patienter quelques secondes puis réessayer.',
        },
      };
    }
    try {
      const origin = window.location.origin;
      await clerkSignIn.authenticateWithRedirect({
        strategy: `oauth_${provider}`,
        redirectUrl: `${origin}/sso-callback`,
        redirectUrlComplete: `${origin}/account`,
      });
      return { success: true };
    } catch (err) {
      console.error('[signInWithProvider] error:', err);
      return { error: { message: extractClerkError(err).message } };
    }
  };

  const signInWithGoogle = () => signInWithProvider('google');
  const signInWithGithub = () => signInWithProvider('github');
  const signInWithDiscord = () => signInWithProvider('discord');

  const signInWithEmail = async (email, password) => {
    if (!clerkSignIn || !setActiveSignIn) {
      return { error: { message: "Clerk n'est pas prêt." } };
    }
    try {
      const result = await clerkSignIn.create({ identifier: email, password });

      if (result.status === 'complete') {
        await setActiveSignIn({ session: result.createdSessionId });
        return { data: { user: clerkUser }, success: true };
      }

      if (result.status === 'needs_second_factor') {
        return {
          error: {
            message:
              "Votre compte utilise la double authentification (2FA). Cette étape n'est pas encore prise en charge ici.",
          },
        };
      }

      return {
        error: { message: `Connexion incomplète (statut: ${result.status}).` },
      };
    } catch (err) {
      return { error: { message: mapSignInError(err) } };
    }
  };

  const signUpWithEmail = async (email, password) => {
    if (!clerkSignUp || !setActiveSignUp) {
      return { error: { message: "Clerk n'est pas prêt." } };
    }
    try {
      const result = await clerkSignUp.create({ emailAddress: email, password });

      if (result.status === 'complete') {
        await setActiveSignUp({ session: result.createdSessionId });
        return { data: { user: clerkUser }, success: true };
      }

      // Email verification required.
      await clerkSignUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      return { data: { requiresVerification: true, email }, success: true };
    } catch (err) {
      return { error: { message: mapSignUpError(err) } };
    }
  };

  const verifyEmailCode = async (code) => {
    if (!clerkSignUp || !setActiveSignUp) {
      return { error: { message: "Clerk n'est pas prêt." } };
    }
    try {
      const result = await clerkSignUp.attemptEmailAddressVerification({ code });

      if (result.status === 'complete') {
        await setActiveSignUp({ session: result.createdSessionId });
        return { data: { user: clerkUser }, success: true };
      }

      if (result.status === 'missing_requirements') {
        const missing = result.missingFields?.join(', ') ?? 'inconnu';
        return {
          error: {
            message: `Champs obligatoires manquants dans le Clerk Dashboard : [${missing}]. Passez-les en optionnel.`,
          },
        };
      }

      return { error: { message: `Vérification incomplète (statut: ${result.status}).` } };
    } catch (err) {
      const { code: errCode, message } = extractClerkError(err);
      if (errCode === 'form_code_incorrect')
        return { error: { message: 'Code incorrect. Vérifiez votre email.' } };
      if (errCode === 'verification_expired')
        return { error: { message: "Code expiré. Veuillez recommencer l'inscription." } };
      return { error: { message: message || 'Code invalide.' } };
    }
  };

  const logout = async () => {
    await signOut();
    return { success: true };
  };

  // Password reset — Clerk JS SignIn resource flow:
  //   1) signIn.create({ strategy: 'reset_password_email_code', identifier: email }) → sends code
  //   2) signIn.attemptFirstFactor({ strategy: 'reset_password_email_code', code, password })
  //   3) setActive({ session: createdSessionId })
  const requestPasswordReset = async (email) => {
    if (!clerkSignIn) return { error: { message: "Clerk n'est pas prêt." } };
    try {
      await clerkSignIn.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      });
      return { success: true };
    } catch (err) {
      const { code, message } = extractClerkError(err);
      if (code === 'form_identifier_not_found')
        return { error: { message: 'Aucun compte trouvé avec cet email.' } };
      if (code === 'form_param_format_invalid')
        return { error: { message: "Format d'email invalide." } };
      return { error: { message: message } };
    }
  };

  const confirmPasswordReset = async (code, newPassword) => {
    if (!clerkSignIn || !setActiveSignIn) {
      return { error: { message: "Clerk n'est pas prêt." } };
    }
    try {
      const result = await clerkSignIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password: newPassword,
      });

      if (result.status === 'complete') {
        await setActiveSignIn({ session: result.createdSessionId });
        return { success: true };
      }
      return { error: { message: `Réinitialisation incomplète (statut: ${result.status}).` } };
    } catch (err) {
      const { code: errCode, message } = extractClerkError(err);
      if (errCode === 'form_code_incorrect')
        return { error: { message: 'Code incorrect. Vérifiez votre email.' } };
      if (errCode === 'verification_expired')
        return { error: { message: 'Code expiré. Veuillez recommencer.' } };
      if (errCode === 'form_password_pwned')
        return { error: { message: 'Ce mot de passe est trop commun. Choisissez-en un autre.' } };
      if (errCode === 'form_password_length_too_short')
        return { error: { message: 'Le mot de passe est trop court (minimum 8 caractères).' } };
      return { error: { message: message } };
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
    signOut: logout,
    requestPasswordReset,
    confirmPasswordReset,
  };

  // On bloque seulement le chargement critique global pour éviter un rendu prématuré
  if (!clerkLoaded || !isAuthLoaded) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '3px solid #f3f3f3',
            borderTop: '3px solid #2563eb',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        ></div>
        <p style={{ marginTop: '20px', color: '#64748b' }}>
          Chargement de l'authentification (Clerk)...
        </p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
