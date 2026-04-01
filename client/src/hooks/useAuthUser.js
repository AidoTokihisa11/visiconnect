import { useAuth } from '../contexts/AuthContext';

export const useAuthUser = () => {
  const { user, loading } = useAuth();
  return { user, loading };
};
