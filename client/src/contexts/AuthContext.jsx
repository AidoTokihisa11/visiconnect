import React, { createContext, useContext } from 'react';
import { useUser, useAuth as useClerkAuth, useSignIn, useSignUp } from '@clerk/react';
// @clerk/react v6 uses the SIGNAL-based Future API (NOT the classic @clerk/clerk-react API).
//   useSignIn()  → { signIn, errors, fetchStatus }   where signIn is SignInFutureResource
//   useSignUp()  → { signUp, errors, fetchStatus }   where signUp is SignUpFutureResource
// All method calls return { error } (no throw). Session activation uses .finalize().
//
// Sign in (password):  signIn.password({ emailAddress, password }) → signIn.finalize()
// Sign up (password):  signUp.password({ emailAddress, password }) → signUp.verifications.sendEmailCode()
//                      → signUp.verifications.verifyEmailCode({ code }) → signUp.finalize()
// OAuth:               signIn.sso({ strategy: 'oauth_google', redirectUrl, redirectCallbackUrl })
// Password reset:      signIn.resetPasswordEmailCode.sendCode()  (identifier set via signIn.create first)
//                      → .verifyCode({ code }) → .submitPassword({ password }) → signIn.finalize()
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

  const user = clerkUser
    ? {
        id: clerkUser.id,
        email: clerkUser.primaryEmailAddress?.emailAddress,
        name: clerkUser.fullName || clerkUser.firstName || 'User',
        imageUrl: clerkUser.imageUrl,
      }
    : null;

  // Signal-Future API returns { error } objects (ClerkError instances). It only THROWS on network/unexpected issues.
  const extractClerkError = (errOrCaught) => {
    if (!errOrCaught) return { code: 'unknown', message: 'Erreur inconnue.' };
    // ClerkError (Signal-Future returned error)
    if (errOrCaught.clerkError || typeof errOrCaught.code === 'string') {
      return {
        code: errOrCaught.code || 'unknown',
        message: errOrCaught.longMessage || errOrCaught.message || 'Erreur.',
      };
    }
    // Classic thrown error with `.errors[]`
    if (errOrCaught?.errors?.[0]) {
      return {
        code: errOrCaught.errors[0].code,
        message: errOrCaught.errors[0].longMessage || errOrCaught.errors[0].message,
      };
    }
    if (
      errOrCaught?.message &&
      (errOrCaught.message.includes('Failed to fetch') || errOrCaught.message.includes('Network'))
    ) {
      return {
        code: 'network_error',
        message: 'Erreur réseau. Vérifiez votre connexion à internet.',
      };
    }
    return {
      code: 'unknown',
      message: errOrCaught?.message || "Une erreur est survenue avec l'authentification.",
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

  // OAuth via the Signal-Future `sso()` method.
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
      const { error } = await clerkSignIn.sso({
        strategy: `oauth_${provider}`,
        redirectUrl: `${origin}/sso-callback`,
        redirectCallbackUrl: `${origin}/sso-callback`,
      });
      if (error) {
        return { error: { message: extractClerkError(error).message } };
      }
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
    if (!clerkSignIn) {
      return { error: { message: "Clerk n'est pas prêt." } };
    }
    try {
      const { error } = await clerkSignIn.password({ emailAddress: email, password });
      if (error) return { error: { message: mapSignInError(error) } };

      const { error: finalizeError } = await clerkSignIn.finalize();
      if (finalizeError) return { error: { message: mapSignInError(finalizeError) } };

      return { data: { user: clerkUser }, success: true };
    } catch (err) {
      return { error: { message: mapSignInError(err) } };
    }
  };

  const signUpWithEmail = async (email, password) => {
    if (!clerkSignUp) {
      return { error: { message: "Clerk n'est pas prêt." } };
    }
    try {
      const { error } = await clerkSignUp.password({ emailAddress: email, password });
      if (error) return { error: { message: mapSignUpError(error) } };

      // If sign-up is already complete (email verification disabled), finalize.
      if (clerkSignUp.status === 'complete') {
        await clerkSignUp.finalize();
        return { data: { user: clerkUser }, success: true };
      }

      // Otherwise, send the email verification code.
      const { error: sendError } = await clerkSignUp.verifications.sendEmailCode();
      if (sendError) return { error: { message: mapSignUpError(sendError) } };

      return { data: { requiresVerification: true, email }, success: true };
    } catch (err) {
      return { error: { message: mapSignUpError(err) } };
    }
  };

  const verifyEmailCode = async (code) => {
    if (!clerkSignUp) {
      return { error: { message: "Clerk n'est pas prêt." } };
    }
    try {
      const { error } = await clerkSignUp.verifications.verifyEmailCode({ code });
      if (error) {
        const { code: errCode, message } = extractClerkError(error);
        if (errCode === 'form_code_incorrect')
          return { error: { message: 'Code incorrect. Vérifiez votre email.' } };
        if (errCode === 'verification_expired')
          return { error: { message: "Code expiré. Veuillez recommencer l'inscription." } };
        return { error: { message: message || 'Code invalide.' } };
      }

      if (clerkSignUp.status === 'complete') {
        const { error: finalizeError } = await clerkSignUp.finalize();
        if (finalizeError) return { error: { message: extractClerkError(finalizeError).message } };
        return { data: { user: clerkUser }, success: true };
      }

      if (clerkSignUp.status === 'missing_requirements') {
        const missing = clerkSignUp.missingFields?.join(', ') ?? 'inconnu';
        return {
          error: {
            message: `Champs obligatoires manquants dans le Clerk Dashboard : [${missing}]. Passez-les en optionnel.`,
          },
        };
      }

      return { error: { message: `Vérification incomplète (statut: ${clerkSignUp.status}).` } };
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

  // Password reset — Signal-Future API:
  //   1) signIn.create({ strategy: 'reset_password_email_code', identifier })  (sets identifier + sends code)
  //   2) signIn.resetPasswordEmailCode.verifyCode({ code })
  //   3) signIn.resetPasswordEmailCode.submitPassword({ password })
  //   4) signIn.finalize()
  const requestPasswordReset = async (email) => {
    if (!clerkSignIn) return { error: { message: "Clerk n'est pas prêt." } };
    try {
      const { error } = await clerkSignIn.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      });
      if (error) {
        const { code, message } = extractClerkError(error);
        if (code === 'form_identifier_not_found')
          return { error: { message: 'Aucun compte trouvé avec cet email.' } };
        if (code === 'form_param_format_invalid')
          return { error: { message: "Format d'email invalide." } };
        return { error: { message } };
      }
      return { success: true };
    } catch (err) {
      const { code, message } = extractClerkError(err);
      if (code === 'form_identifier_not_found')
        return { error: { message: 'Aucun compte trouvé avec cet email.' } };
      if (code === 'form_param_format_invalid')
        return { error: { message: "Format d'email invalide." } };
      return { error: { message } };
    }
  };

  const confirmPasswordReset = async (code, newPassword) => {
    if (!clerkSignIn) {
      return { error: { message: "Clerk n'est pas prêt." } };
    }
    try {
      const { error: verifyError } = await clerkSignIn.resetPasswordEmailCode.verifyCode({ code });
      if (verifyError) {
        const { code: errCode, message } = extractClerkError(verifyError);
        if (errCode === 'form_code_incorrect')
          return { error: { message: 'Code incorrect. Vérifiez votre email.' } };
        if (errCode === 'verification_expired')
          return { error: { message: 'Code expiré. Veuillez recommencer.' } };
        return { error: { message } };
      }

      const { error: submitError } = await clerkSignIn.resetPasswordEmailCode.submitPassword({
        password: newPassword,
      });
      if (submitError) {
        const { code: errCode, message } = extractClerkError(submitError);
        if (errCode === 'form_password_pwned')
          return { error: { message: 'Ce mot de passe est trop commun. Choisissez-en un autre.' } };
        if (errCode === 'form_password_length_too_short')
          return { error: { message: 'Le mot de passe est trop court (minimum 8 caractères).' } };
        return { error: { message } };
      }

      await clerkSignIn.finalize();
      return { success: true };
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
      return { error: { message } };
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
