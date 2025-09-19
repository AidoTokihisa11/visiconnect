import { useState, useEffect } from 'react';

export const useSystemMetrics = () => {
  const [metrics, setMetrics] = useState({
    // Métriques du navigateur/client
    memory: {
      used: 0,
      total: 0,
      percentage: 0
    },
    connection: {
      type: 'unknown',
      effectiveType: 'unknown',
      downlink: 0,
      rtt: 0
    },
    performance: {
      loadTime: 0,
      domContentLoaded: 0,
      firstPaint: 0
    },
    battery: {
      level: 0,
      charging: false,
      chargingTime: 0,
      dischargingTime: 0
    },
    screen: {
      width: window.screen.width,
      height: window.screen.height,
      colorDepth: window.screen.colorDepth,
      pixelRatio: window.devicePixelRatio
    },
    userAgent: {
      browser: '',
      os: '',
      device: ''
    }
  });

  const [serverMetrics, setServerMetrics] = useState({
    uptime: 0,
    responseTime: 0,
    activeConnections: 0,
    memoryUsage: 0,
    cpuUsage: 0,
    networkLatency: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Détecter le navigateur et l'OS
  const detectUserAgent = () => {
    const ua = navigator.userAgent;
    let browser = 'Unknown';
    let os = 'Unknown';
    let device = 'Desktop';

    // Détecter le navigateur
    if (ua.includes('Chrome')) browser = 'Chrome';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Safari')) browser = 'Safari';
    else if (ua.includes('Edge')) browser = 'Edge';

    // Détecter l'OS
    if (ua.includes('Windows')) os = 'Windows';
    else if (ua.includes('Mac')) os = 'macOS';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('iOS')) os = 'iOS';

    // Détecter le type d'appareil
    if (/Mobi|Android/i.test(ua)) device = 'Mobile';
    else if (/Tablet|iPad/i.test(ua)) device = 'Tablet';

    return { browser, os, device };
  };

  // Récupérer les métriques de performance
  const getPerformanceMetrics = () => {
    if (window.performance) {
      const navigation = performance.getEntriesByType('navigation')[0];
      const paint = performance.getEntriesByType('paint');
      
      return {
        loadTime: navigation ? Math.round(navigation.loadEventEnd - navigation.loadEventStart) : 0,
        domContentLoaded: navigation ? Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart) : 0,
        firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0
      };
    }
    return { loadTime: 0, domContentLoaded: 0, firstPaint: 0 };
  };

  // Récupérer les informations de connexion
  const getConnectionInfo = () => {
    if (navigator.connection) {
      return {
        type: navigator.connection.type || 'unknown',
        effectiveType: navigator.connection.effectiveType || 'unknown',
        downlink: navigator.connection.downlink || 0,
        rtt: navigator.connection.rtt || 0
      };
    }
    return { type: 'unknown', effectiveType: 'unknown', downlink: 0, rtt: 0 };
  };

  // Récupérer les informations de batterie
  const getBatteryInfo = async () => {
    if (navigator.getBattery) {
      try {
        const battery = await navigator.getBattery();
        return {
          level: Math.round(battery.level * 100),
          charging: battery.charging,
          chargingTime: battery.chargingTime,
          dischargingTime: battery.dischargingTime
        };
      } catch (error) {
        console.log('Battery API not available');
      }
    }
    return { level: 0, charging: false, chargingTime: 0, dischargingTime: 0 };
  };

  // Récupérer l'utilisation mémoire
  const getMemoryInfo = () => {
    if (performance.memory) {
      const used = performance.memory.usedJSHeapSize;
      const total = performance.memory.totalJSHeapSize;
      return {
        used: Math.round(used / 1024 / 1024), // MB
        total: Math.round(total / 1024 / 1024), // MB
        percentage: Math.round((used / total) * 100)
      };
    }
    return { used: 0, total: 0, percentage: 0 };
  };

  // Mesurer la latence réseau
  const measureNetworkLatency = async () => {
    const start = performance.now();
    try {
      await fetch('/api/ping', { method: 'HEAD' });
      return Math.round(performance.now() - start);
    } catch (error) {
      return 0;
    }
  };

  // Récupérer les métriques du serveur
  const fetchServerMetrics = async () => {
    try {
      const response = await fetch('/api/metrics');
      if (response.ok) {
        const data = await response.json();
        setServerMetrics(data);
      }
    } catch (error) {
      console.log('Server metrics not available, using mock data');
      // Utiliser des données simulées si le serveur ne répond pas
      setServerMetrics({
        uptime: Date.now() - (Math.random() * 86400000), // Uptime aléatoire
        responseTime: Math.random() * 100 + 20,
        activeConnections: Math.floor(Math.random() * 50),
        memoryUsage: Math.random() * 80 + 10,
        cpuUsage: Math.random() * 60 + 5,
        networkLatency: Math.random() * 50 + 10
      });
    }
  };

  useEffect(() => {
    const updateMetrics = async () => {
      try {
        setLoading(true);
        
        const [batteryInfo, networkLatency] = await Promise.all([
          getBatteryInfo(),
          measureNetworkLatency()
        ]);

        setMetrics({
          memory: getMemoryInfo(),
          connection: getConnectionInfo(),
          performance: getPerformanceMetrics(),
          battery: batteryInfo,
          screen: {
            width: window.screen.width,
            height: window.screen.height,
            colorDepth: window.screen.colorDepth,
            pixelRatio: window.devicePixelRatio
          },
          userAgent: detectUserAgent(),
          networkLatency
        });

        await fetchServerMetrics();
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    updateMetrics();

    // Mettre à jour les métriques toutes les 5 secondes
    const interval = setInterval(updateMetrics, 5000);

    // Écouter les changements de connexion
    if (navigator.connection) {
      navigator.connection.addEventListener('change', updateMetrics);
    }

    // Écouter les changements de batterie
    if (navigator.getBattery) {
      navigator.getBattery().then(battery => {
        battery.addEventListener('chargingchange', updateMetrics);
        battery.addEventListener('levelchange', updateMetrics);
      });
    }

    return () => {
      clearInterval(interval);
      if (navigator.connection) {
        navigator.connection.removeEventListener('change', updateMetrics);
      }
    };
  }, []);

  return { metrics, serverMetrics, loading, error };
};
