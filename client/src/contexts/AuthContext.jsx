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
  const user = clerkUser
    ? {
        id: clerkUser.id,
        email: clerkUser.primaryEmailAddress?.emailAddress,
        name: clerkUser.fullName || clerkUser.firstName || 'User',
        imageUrl: clerkUser.imageUrl,
      }
    : null;

  // Helper de gestion d'erreur réseau
  const handleNetworkError = (err) => {
    if (
      err.message &&
      (err.message.includes('Failed to fetch') || err.message.includes('Network error'))
    ) {
      return 'Erreur réseau. Vérifiez votre connexion à internet.';
    }
    return (
      err.errors?.[0]?.message || err.message || "Une erreur est survenue avec l'authentification."
    );
  };

  // Clerk Core 3 (@clerk/react v6) — OAuth via authenticateWithRedirect (stable API).
  const signInWithProvider = async (provider) => {
    if (!clerkSignIn) {
      const msg =
        'Authentification non prête — veuillez patienter quelques secondes puis réessayer.';
      console.error('[OAuth] clerkSignIn is null/undefined');
      return { error: { message: msg } };
    }
    try {
      const origin = window.location.origin;
      // The official method on Core 3 SignIn resource.
      if (typeof clerkSignIn.authenticateWithRedirect === 'function') {
        await clerkSignIn.authenticateWithRedirect({
          strategy: `oauth_${provider}`,
          redirectUrl: `${origin}/sso-callback`,
          redirectUrlComplete: `${origin}/account`,
        });
        return { success: true };
      }
      // Fallback pour les anciennes versions de Clerk.
      if (typeof clerkSignIn.sso === 'function') {
        const { error } = await clerkSignIn.sso({
          strategy: `oauth_${provider}`,
          redirectCallbackUrl: `${origin}/sso-callback`,
          redirectUrl: `${origin}/`,
        });
        if (error) return { error: { message: handleNetworkError(error) } };
        return { success: true };
      }
      console.error(
        '[OAuth] No OAuth method available on signIn resource',
        Object.keys(clerkSignIn || {})
      );
      return {
        error: {
          message:
            'Méthode OAuth indisponible. Vérifiez la configuration Clerk (provider activé dans le dashboard).',
        },
      };
    } catch (err) {
      console.error('[signInWithProvider] caught error:', err, err?.errors);
      // Clerk surfaces errors via err.errors[0]
      const clerkMsg = err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message;
      return { error: { message: clerkMsg || handleNetworkError(err) } };
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
        if (code === 'form_password_incorrect')
          return { error: { message: 'Mot de passe incorrect.' } };
        if (code === 'form_identifier_not_found')
          return { error: { message: 'Aucun compte trouvé avec cet email.' } };
        return { error: { message: error.errors?.[0]?.message || 'Erreur de connexion.' } };
      }
      if (clerkSignIn.status === 'complete') {
        await clerkSignIn.finalize({ navigate: () => {} });
        return { data: { user: clerkSignIn }, success: true };
      }
      if (
        clerkSignIn.status === 'needs_second_factor' ||
        clerkSignIn.status === 'needs_client_trust'
      ) {
        return {
          error: {
            message:
              'Votre compte a la double authentification (2FA) activée. Veuillez la désactiver depuis les paramètres de votre compte.',
          },
        };
      }
      return {
        error: {
          message: `Connexion incomplète (statut: ${clerkSignIn.status}). Veuillez réessayer.`,
        },
      };
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
        if (code === 'form_identifier_exists')
          return { error: { message: 'Un compte existe déjà avec cet email.' } };
        if (code === 'form_password_pwned')
          return { error: { message: 'Ce mot de passe est trop commun. Choisissez-en un autre.' } };
        if (code === 'form_password_length_too_short')
          return { error: { message: 'Le mot de passe est trop court.' } };
        return {
          error: {
            message: pwdError.errors?.[0]?.message || 'Erreur lors de la création du compte.',
          },
        };
      }

      if (clerkSignUp.status === 'complete') {
        await clerkSignUp.finalize({ navigate: () => {} });
        return { data: { user: clerkSignUp }, success: true };
      }

      // Statut missing_requirements → l'email doit être vérifié
      const { error: sendError } = await clerkSignUp.verifications.sendEmailCode();
      if (sendError) {
        return {
          error: {
            message:
              sendError.errors?.[0]?.message || "Impossible d'envoyer le code de vérification.",
          },
        };
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
        if (errCode === 'form_code_incorrect')
          return { error: { message: 'Code incorrect. Vérifiez votre email.' } };
        if (errCode === 'verification_expired')
          return { error: { message: "Code expiré. Veuillez recommencer l'inscription." } };
        return { error: { message: error.errors?.[0]?.message || 'Code invalide.' } };
      }

      if (clerkSignUp.status === 'complete') {
        await clerkSignUp.finalize({ navigate: () => {} });
        return { data: { user: clerkSignUp }, success: true };
      }
      if (clerkSignUp.status === 'missing_requirements') {
        const missing = clerkSignUp.missingFields?.join(', ') ?? 'inconnu';
        return {
          error: {
            message: `Champs obligatoires manquants dans Clerk Dashboard : [ ${missing} ]. Allez dans User & Authentication → passez-les en "Optionnel".`,
          },
        };
      }
      return {
        error: {
          message: `Vérification incomplète (statut: ${clerkSignUp.status}). Veuillez réessayer.`,
        },
      };
    } catch (err) {
      return { error: { message: handleNetworkError(err) } };
    }
  };

  const logout = async () => {
    await signOut();
    return { success: true };
  };

  // Clerk Core 3 (@clerk/react v6) — password reset flow:
  //   1) signIn.create({ identifier })            → populates the identifier
  //   2) signIn.resetPasswordEmailCode.sendCode() → sends the email code
  //   3) signIn.resetPasswordEmailCode.verifyCode({ code }) → status: 'needs_new_password'
  //   4) signIn.resetPasswordEmailCode.submitPassword({ password }) → status: 'complete'
  //   5) signIn.finalize()                        → activates session
  const requestPasswordReset = async (email) => {
    if (!clerkSignIn) return { error: { message: "Clerk n'est pas prêt." } };
    try {
      // Step 1: populate identifier on the sign-in attempt.
      const createRes = await clerkSignIn.create({ identifier: email });
      if (createRes?.error) {
        const code = createRes.error.errors?.[0]?.code;
        if (code === 'form_identifier_not_found') {
          return { error: { message: 'Aucun compte trouvé avec cet email.' } };
        }
        if (code === 'form_param_format_invalid') {
          return { error: { message: "Format d'email invalide." } };
        }
        return { error: { message: handleNetworkError(createRes.error) } };
      }

      // Step 2: send the reset password email code.
      if (!clerkSignIn.resetPasswordEmailCode?.sendCode) {
        return {
          error: {
            message: 'Cette version de Clerk ne supporte pas la réinitialisation par email.',
          },
        };
      }
      const sendRes = await clerkSignIn.resetPasswordEmailCode.sendCode();
      if (sendRes?.error) {
        const code = sendRes.error.errors?.[0]?.code;
        if (code === 'form_identifier_not_found') {
          return { error: { message: 'Aucun compte trouvé avec cet email.' } };
        }
        return { error: { message: handleNetworkError(sendRes.error) } };
      }
      return { success: true };
    } catch (err) {
      console.warn('[Clerk] requestPasswordReset error:', err);
      return { error: { message: handleNetworkError(err) } };
    }
  };

  // Clerk Core 3 — verifies the code and sets a new password.
  const confirmPasswordReset = async (code, newPassword) => {
    if (!clerkSignIn) return { error: { message: "Clerk n'est pas prêt." } };
    if (!clerkSignIn.resetPasswordEmailCode?.verifyCode) {
      return {
        error: {
          message: "Réinitialisation indisponible. Veuillez recommencer depuis l'étape précédente.",
        },
      };
    }
    try {
      // Step 3: verify the code from the email.
      const verifyRes = await clerkSignIn.resetPasswordEmailCode.verifyCode({ code });
      if (verifyRes?.error) {
        const c = verifyRes.error.errors?.[0]?.code;
        if (c === 'form_code_incorrect')
          return { error: { message: 'Code incorrect. Vérifiez votre email.' } };
        if (c === 'verification_expired')
          return { error: { message: 'Code expiré. Veuillez recommencer.' } };
        return { error: { message: handleNetworkError(verifyRes.error) } };
      }

      // Step 4: submit the new password.
      const submitRes = await clerkSignIn.resetPasswordEmailCode.submitPassword({
        password: newPassword,
      });
      if (submitRes?.error) {
        const c = submitRes.error.errors?.[0]?.code;
        if (c === 'form_password_pwned')
          return { error: { message: 'Ce mot de passe est trop commun. Choisissez-en un autre.' } };
        if (c === 'form_password_length_too_short')
          return { error: { message: 'Le mot de passe est trop court (minimum 8 caractères).' } };
        if (c === 'form_password_validation_failed')
          return {
            error: { message: 'Mot de passe invalide. Respectez les critères de sécurité.' },
          };
        return { error: { message: handleNetworkError(submitRes.error) } };
      }

      // Step 5: activate the new session.
      if (clerkSignIn.status === 'complete') {
        try {
          await clerkSignIn.finalize({ navigate: () => {} });
        } catch (e) {
          console.warn('[Clerk] finalize after reset failed:', e);
        }
      }
      return { success: true };
    } catch (err) {
      console.warn('[Clerk] confirmPasswordReset error:', err);
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
