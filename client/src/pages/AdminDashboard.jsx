import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Activity, Database, Server, Settings, RefreshCw, 
  Trash2, Shield, Search, Bell, Menu, X, Globe, Cpu,
  Wifi, HardDrive, Terminal, AlertTriangle
} from 'lucide-react';
import { supabase } from '../config/supabase';
import { useAuthUser } from '../hooks/useAuthUser';
import { useSystemMetrics } from '../hooks/useSystemMetrics';
import UserService from '../services/UserService';
import { useTranslation } from '../hooks/useTranslation';

/* --- THEME CONSTANTS --- */
const COLORS = {
  primary: '#2563eb',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  background: '#f8fafc',
  card: '#ffffff',
  text: '#0f172a',
  muted: '#64748b',
  border: '#e2e8f0'
};

/* --- LAYOUT COMPONENTS --- */
const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${COLORS.background};
`;

const Sidebar = styled(motion.aside)`
  width: 260px;
  background-color: #ffffff;
  border-right: 1px solid ${COLORS.border};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  top: 0;
  bottom: 0;
  z-index: 50;

  @media (max-width: 1024px) {
    transform: translateX(-100%);
    &.open {
      transform: translateX(0);
    }
  }
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 260px;
  padding: 2rem;
  
  @media (max-width: 1024px) {
    margin-left: 0;
  }
`;

const NavItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: none;
  background: ${props => props.$active ? '#eff6ff' : 'transparent'};
  color: ${props => props.$active ? COLORS.primary : COLORS.muted};
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  margin-bottom: 0.5rem;

  &:hover {
    background: #f1f5f9;
    color: ${COLORS.text};
  }
`;

const Card = styled(motion.div)`
  background: ${COLORS.card};
  border-radius: 12px;
  border: 1px solid ${COLORS.border};
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatusIndicator = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.color};
  box-shadow: 0 0 8px ${props => props.color};
  margin-right: 8px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const MobileToggle = styled.button`
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  
  @media (max-width: 1024px) {
    display: block;
  }
`;

/* --- CHART MOCK COMPONENT --- */
const BarChart = ({ value, label, color }) => (
  <div style={{ marginTop: '1rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
      <span style={{ fontSize: '0.75rem', color: COLORS.muted }}>{label}</span>
      <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>{Math.round(value)}%</span>
    </div>
    <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, type: "spring" }}
        style={{ height: '100%', background: color, borderRadius: '3px' }}
      />
    </div>
  </div>
);

/* --- TOGGLE SWITCH --- */
const Switch = ({ isOn, onToggle }) => (
  <div 
    onClick={onToggle}
    style={{
      width: '40px',
      height: '24px',
      background: isOn ? COLORS.primary : COLORS.border,
      borderRadius: '12px',
      position: 'relative',
      cursor: 'pointer',
      transition: 'background 0.3s'
    }}
  >
    <motion.div
      layout
      style={{
        width: '20px',
        height: '20px',
        background: '#fff',
        borderRadius: '50%',
        position: 'absolute',
        top: '2px',
        left: isOn ? '18px' : '2px',
      }}
    />
  </div>
);

export default function AdminDashboard() {
  const { user, loading } = useAuthUser();
  const { metrics, serverMetrics } = useSystemMetrics();
  const [activeTab, setActiveTab] = useState('overview');
  const [features, setFeatures] = useState({
    maintenance: false,
    debugMode: true,
    betaFeatures: false,
    analytics: true
  });
  const [stats, setStats] = useState({
    latency: 0,
    memory: 0,
    storage: 0
  });
  const [logs, setLogs] = useState([]);

  // Mock real-time updates
  useEffect(() => {
    const updateStats = () => {
      setStats({
        latency: serverMetrics?.networkLatency || Math.floor(Math.random() * (150 - 20) + 20),
        memory: serverMetrics?.memoryUsage || Math.floor(Math.random() * (80 - 30) + 30),
        storage: 42
      });
      
      // Add a fake log entry occasionally
      if (Math.random() > 0.7) {
        const actions = ['User Login', 'Database Sync', 'Cache Clear', 'API Request', 'Error Log'];
        const newLog = {
          id: Date.now(),
          action: actions[Math.floor(Math.random() * actions.length)],
          time: new Date().toLocaleTimeString(),
          status: Math.random() > 0.9 ? 'error' : 'success'
        };
        setLogs(prev => [newLog, ...prev].slice(0, 10));
      }
    };

    updateStats();
    const interval = setInterval(updateStats, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleToggle = (key) => {
    setFeatures(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const clearCache = () => {
    if (window.confirm('Voulez-vous vraiment vider le cache et vous déconnecter ?')) {
        UserService.clearUser();
        localStorage.clear();
        window.location.href = '/login';
    }
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <>
            <Grid>
                <Card>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                            <Activity size={24} />
                        </div>
                        <div>
                            <h3 className="text-sm text-slate-500 font-medium">Latence API</h3>
                            <div className="text-2xl font-bold text-slate-900">{stats.latency} ms</div>
                        </div>
                    </div>
                    <BarChart value={(stats.latency / 200) * 100} label="Charge Réseau" color={COLORS.primary} />
                </Card>

                <Card>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                            <Users size={24} />
                        </div>
                        <div>
                            <h3 className="text-sm text-slate-500 font-medium">Session Active</h3>
                            <div className="text-2xl font-bold text-slate-900">{user ? 'Admin' : 'Invité'}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-sm text-green-600 font-medium">
                        <StatusIndicator color={COLORS.success} /> Connecté
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                            <Cpu size={24} />
                        </div>
                        <div>
                            <h3 className="text-sm text-slate-500 font-medium">Ressources System</h3>
                            <div className="text-2xl font-bold text-slate-900">{stats.memory}%</div>
                        </div>
                    </div>
                    <BarChart value={stats.memory} label="Utilisation Mémoire" color="#a855f7" />
                </Card>
            </Grid>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="col-span-1">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Terminal size={20} className="text-slate-400" />
                        Live Logs
                    </h3>
                    <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-green-400 h-64 overflow-y-auto">
                        {logs.map(log => (
                            <div key={log.id} className="mb-2 border-b border-slate-800 pb-2 last:border-0">
                                <span className="text-slate-500">[{log.time}]</span>{' '}
                                <span className={log.status === 'error' ? 'text-red-400' : 'text-blue-400'}>{log.status.toUpperCase()}</span>:{' '}
                                <span className="text-slate-300">{log.action}</span>
                            </div>
                        ))}
                        {logs.length === 0 && <div className="text-slate-600 italic">Waiting for events...</div>}
                    </div>
                </Card>

                <Card className="col-span-1">
                    <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                        <Settings size={20} className="text-slate-400" />
                        Quick Settings
                    </h3>
                    
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-medium">Maintenance Mode</h4>
                                <p className="text-sm text-slate-500">Désactive l'accès public</p>
                            </div>
                            <Switch isOn={features.maintenance} onToggle={() => handleToggle('maintenance')} />
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-medium">Debug Overlay</h4>
                                <p className="text-sm text-slate-500">Affiche les infos techniques</p>
                            </div>
                            <Switch isOn={features.debugMode} onToggle={() => handleToggle('debugMode')} />
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-medium">Beta Features</h4>
                                <p className="text-sm text-slate-500">Active les fonctionnalités expérimentales</p>
                            </div>
                            <Switch isOn={features.betaFeatures} onToggle={() => handleToggle('betaFeatures')} />
                        </div>
                    </div>
                </Card>
            </div>
          </>
        );
      
      case 'database':
        return (
            <Card>
                <h2 className="text-xl font-bold mb-4">Base de Données & Stockage</h2>
                <div className="space-y-4">
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                            <AlertTriangle size={18} /> Cache Local
                        </h4>
                        <p className="text-sm text-yellow-700 mb-4">
                            Gérez les données stockées localement sur ce navigateur. Effacer le cache vous déconnectera.
                        </p>
                        <button 
                            onClick={clearCache}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                        >
                            <Trash2 size={16} /> Vider le Cache Totalement
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                         <div className="p-4 border border-slate-200 rounded-lg">
                             <div className="text-sm text-slate-500 mb-1">Total Clés</div>
                             <div className="text-2xl font-bold">{Object.keys(localStorage).length}</div>
                         </div>
                         <div className="p-4 border border-slate-200 rounded-lg">
                             <div className="text-sm text-slate-500 mb-1">Taille Estimée</div>
                             <div className="text-2xl font-bold">{stats.storage} KB</div>
                         </div>
                    </div>
                </div>
            </Card>
        );
      
      default:
        return <div>Section en construction</div>;
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <Layout>
      <Sidebar 
        initial={{ x: -260 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">V</div>
            <span className="font-bold text-xl text-slate-800">VisioAdmin</span>
        </div>

        <nav className="flex-1 space-y-2">
            <NavItem $active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
                <Activity size={20} /> Vue d'ensemble
            </NavItem>
            {/* <NavItem $active={activeTab === 'users'} onClick={() => setActiveTab('users')}>
                <Users size={20} /> Utilisateurs
            </NavItem> */}
            <NavItem $active={activeTab === 'database'} onClick={() => setActiveTab('database')}>
                <Database size={20} /> Base de Données
            </NavItem>
            {/* <NavItem $active={activeTab === 'settings'} onClick={() => setActiveTab('settings')}>
                <Settings size={20} /> Paramètres
            </NavItem> */}
        </nav>

        <div className="p-4 bg-slate-50 rounded-xl mb-4 border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                    {user?.email?.charAt(0).toUpperCase() || '?'}
                </div>
                <div className="overflow-hidden">
                    <div className="text-sm font-bold truncate">{user?.email?.split('@')[0]}</div>
                    <div className="text-xs text-slate-500 truncate">{user?.role || 'Admin'}</div>
                </div>
            </div>
            <button onClick={() => window.location.href = '/login'} className="w-full text-xs text-slate-600 hover:text-red-500 flex items-center justify-center gap-1 py-1">
                Déconnexion
            </button>
        </div>
      </Sidebar>

      <MainContent>
        <Header>
            <div className="flex items-center gap-4">
                <MobileToggle>
                    <Menu size={24} />
                </MobileToggle>
                <div>
                   <h1 className="text-2xl font-bold text-slate-900">
                       {activeTab === 'overview' ? 'Tableau de Bord' : activeTab === 'database' ? 'Gestion des Données' : 'Admin'}
                   </h1>
                   <p className="text-slate-500 text-sm">Bienvenue dans le panneau de contrôle v2.0</p>
                </div>
            </div>
            <div className="flex gap-3">
                <button className="p-2 bg-white border border-slate-200 rounded-full hover:bg-slate-50 text-slate-600">
                    <Search size={20} />
                </button>
                <button className="p-2 bg-white border border-slate-200 rounded-full hover:bg-slate-50 text-slate-600 relative">
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
            </div>
        </Header>

        <AnimatePresence mode="wait">
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
            >
                {renderContent()}
            </motion.div>
        </AnimatePresence>
      </MainContent>
    </Layout>
  );
}

// Helper icons needed usually
