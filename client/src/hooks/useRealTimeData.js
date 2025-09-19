import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';

export const useRealTimeData = (endpoint, interval = 5000) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      let result;
      
      switch (endpoint) {
        case 'stats':
          result = await apiService.getStats();
          break;
        case 'rooms':
          result = await apiService.getRooms();
          break;
        case 'recent-rooms':
          result = await apiService.getRecentRooms();
          break;
        case 'recent-activity':
          result = await apiService.getRecentActivity();
          break;
        case 'health':
          result = await apiService.getHealth();
          break;
        default:
          throw new Error(`Endpoint non supporté: ${endpoint}`);
      }
      
      setData(result);
      setLastUpdate(new Date());
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    // Charger les données immédiatement
    fetchData();

    // Configurer l'intervalle de mise à jour
    const intervalId = setInterval(fetchData, interval);

    // Nettoyer l'intervalle au démontage
    return () => clearInterval(intervalId);
  }, [fetchData, interval]);

  const refresh = useCallback(() => {
    setLoading(true);
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    lastUpdate,
    refresh
  };
};

export const useRealTimeStats = () => {
  return useRealTimeData('stats', 3000); // Mise à jour toutes les 3 secondes
};

export const useRealTimeRooms = () => {
  return useRealTimeData('rooms', 5000); // Mise à jour toutes les 5 secondes
};

export const useRealTimeActivity = () => {
  return useRealTimeData('recent-activity', 10000); // Mise à jour toutes les 10 secondes
};

export const useServerHealth = () => {
  return useRealTimeData('health', 30000); // Mise à jour toutes les 30 secondes
};
