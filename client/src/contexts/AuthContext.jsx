import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { auth, googleProvider, githubProvider } from '../config/firebase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Si Firebase n'est pas initialisé correctement (auth est un objet vide ou incomplet)
    if (!auth || !auth.app) {
       console.warn("AuthContext: Firebase Auth not initialized. Skipping auth listener.");
       setLoading(false);
       return;
    }

    try {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
          setIsLoggedIn(!!user);
          setLoading(false);
        });
        return unsubscribe;
    } catch (error) {
        console.error("AuthContext Error:", error);
        setLoading(false);
    }
  }, []);

  // Connexion avec Google
  const signInWithGoogle = async () => {
    if (!auth || !auth.app) return { success: false, error: "Firebase not configured" };
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return { success: true, user: result.user };
    } catch (error) {
      console.error('Erreur connexion Google:', error);
      return { success: false, error: error.message };
    }
  };

  // Connexion avec GitHub
  const signInWithGithub = async () => {
    if (!auth || !auth.app) return { success: false, error: "Firebase not configured" };
    try {
      const result = await signInWithPopup(auth, githubProvider);
      return { success: true, user: result.user };
    } catch (error) {
      console.error('Erreur connexion GitHub:', error);
      return { success: false, error: error.message };
    }
  };

  // Connexion avec Discord (simulée - Discord nécessite OAuth2 custom)
  const signInWithDiscord = async () => {
    // Pour Discord, vous devrez implémenter un flow OAuth2 custom
    // ou utiliser une solution comme Supabase qui le supporte nativement
    console.log('Discord auth - À implémenter avec OAuth2 custom');
    alert('Authentification Discord bientôt disponible');
    return { success: false, error: 'Discord auth non encore implémenté' };
  };

  // Connexion email/password
  const signInWithEmail = async (email, password) => {
    if (!auth || !auth.app) return { success: false, error: "Firebase not configured" };
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: result.user };
    } catch (error) {
      console.error('Erreur connexion email:', error);
      return { success: false, error: error.message };
    }
  };

  // Inscription email/password
  const signUpWithEmail = async (email, password) => {
    if (!auth || !auth.app) return { success: false, error: "Firebase not configured" };
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return { success: true, user: result.user };
    } catch (error) {
      console.error('Erreur inscription email:', error);
      return { success: false, error: error.message };
    }
  };

  // Déconnexion
  const logout = async () => {
    if (!auth || !auth.app) return { success: true };
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      console.error('Erreur déconnexion:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    isLoggedIn,
    loading,
    signInWithGoogle,
    signInWithGithub,
    signInWithDiscord,
    signInWithEmail,
    signUpWithEmail,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;