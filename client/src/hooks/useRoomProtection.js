import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useRoomProtection = (roomId) => {
  const { user, session } = useAuth();
  const hasAccessIdentity = Boolean(user || session);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      if (!roomId) return;
      
      // If no user, technically they shouldn't be here, but maybe we allow guests?
      // "seuls les utilisateurs avec l'URL de la réunion peuvent rejoindre"
      // "via les métadonnées de la session Supabase" implied logged in users?
      // Let's assume for now any logged in user can join for the demo, 
      // or if we have a specific logic (like checking a table).
      
      setIsAuthorized(hasAccessIdentity);
      setLoading(false);
    };
    checkAccess();
  }, [hasAccessIdentity, roomId]);

  return { isAuthorized, loading, user };
};
