import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useRoomProtection = (roomId) => {
  const { user, session } = useAuth();
  
  // Pour le moment, tout le monde peut accéder à la salle (invités inclus).
  // Si plus tard tu as des salles privées, tu pourras ajouter une vérification ici
  // (ex: vérifier en BDD si la salle est privée).
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!roomId) return;
    setIsAuthorized(true);
    setLoading(false);
  }, [roomId]);

  return { isAuthorized, loading, user };
};
