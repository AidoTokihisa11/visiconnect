import { useAuth } from '../contexts/AuthContext';

export const useAuthUser = () => {
  const { user, loading } = useAuth();

  const refreshUser = () => {
    // Dans le système Convex (ou mock), la réactivité est automatique.
    console.log("refreshUser appelé");
  };

  return { user, loading, refreshUser };
};
