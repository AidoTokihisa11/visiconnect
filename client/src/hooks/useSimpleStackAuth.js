import { useState, useEffect } from 'react';
import { stackClientApp } from '../config/stack';

// Hook personnalisé simplifié pour React 18.2
export const useSimpleUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkUser = async () => {
      try {
        // Pour l'instant, on retourne null et on laisse les composants
        // gérer l'authentification directement via stackClientApp
        if (isMounted) {
          setUser(null);
          setLoading(false);
        }
      } catch (error) {
        console.log('Erreur vérification utilisateur:', error);
        if (isMounted) {
          setUser(null);
          setLoading(false);
        }
      }
    };

    checkUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return { user, loading };
};

// Hook pour Stack App
export const useSimpleStackApp = () => {
  return stackClientApp;
};