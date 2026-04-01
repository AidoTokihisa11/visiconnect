import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useRoomProtection = (roomId) => {
  const { user, session } = useAuth();
  const hasAccessIdentity = Boolean(user || session);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roomId) return;
    setIsAuthorized(hasAccessIdentity);
    setLoading(false);
  }, [hasAccessIdentity, roomId]);

  return { isAuthorized, loading, user };
};
