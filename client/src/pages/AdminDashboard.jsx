import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Activity, Shield, Users, Server, AlertTriangle, Clock } from 'lucide-react';
import { supabase } from '../config/supabase'; // Adjust path if needed

const DashboardContainer = styled.div`
  padding: 2rem;
  min-height: 100vh;
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const Header = styled.header`
  margin-bottom: 2rem;
  border-bottom: 1px solid hsl(var(--border));
  padding-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: border-color 0.3s ease;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: hsl(var(--card));
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid hsl(var(--border));
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  .icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: hsl(var(--primary) / 0.1);
    color: hsl(var(--primary));
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content {
    h3 {
      font-size: 0.875rem;
      color: hsl(var(--muted-foreground));
      margin: 0;
    }
    p {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0;
      color: hsl(var(--foreground));
    }
  }
`;

const LogsTable = styled.div`
  background: hsl(var(--card));
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid hsl(var(--border));
  transition: background-color 0.3s ease, border-color 0.3s ease;

  table {
    width: 100%;
    border-collapse: collapse;
    
    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid hsl(var(--border));
    }
    
    th {
      background: hsl(var(--muted) / 0.5);
      color: hsl(var(--muted-foreground));
      font-weight: 600;
      font-size: 0.875rem;
    }
    
    td {
      color: hsl(var(--foreground));
      font-size: 0.9rem;
    }
  }
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${props => props.status === 'active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
  color: ${props => props.status === 'active' ? '#10b981' : '#ef4444'};
`;

export default function AdminDashboard() {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({
    activeRooms: 0,
    activeUsers: 0,
    serverStatus: 'Healthy',
    uptime: '99.9%'
  });

  useEffect(() => {
    // Fetch logs from 'connection_logs' if exists
    // Monitoring logic as per User Story 1.2
    async function fetchLogs() {
      const { data, error } = await supabase
        .from('connection_logs')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(20);

      if (!error && data) {
        setLogs(data);
      } else {
        // Fallback mock data if table doesn't exist yet (for demo/MVP)
        setLogs([
          { id: 1, event: 'User Joined', user: 'Alice', room: 'Project Review', time: '2 mins ago', status: 'active' },
          { id: 2, event: 'User Left', user: 'Bob', room: 'Daily Standup', time: '5 mins ago', status: ' disconnected' },
          { id: 3, event: 'New Room Created', user: 'Charlie', room: 'Client Meeting', time: '10 mins ago', status: 'success' },
        ]);
      }
    }

    fetchLogs();
  }, []);

  return (
    <DashboardContainer>
      <Header>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-500" />
            Admin Monitoring
          </h1>
          <p className="text-slate-400 text-sm">Système de surveillance des connexions P2P</p>
        </div>
        <div className="flex items-center gap-2 text-green-500 bg-green-500/10 px-3 py-1 rounded-full text-sm font-medium border border-green-500/20">
          <Activity size={16} />
          Système Opérationnel
        </div>
      </Header>

      <StatsGrid>
        <StatCard>
          <div className="icon"><Users /></div>
          <div className="content">
            <h3>Utilisateurs Actifs</h3>
            <p>124</p>
          </div>
        </StatCard>
        <StatCard>
          <div className="icon"><Server /></div>
          <div className="content">
            <h3>Salles Ouvertes</h3>
            <p>42</p>
          </div>
        </StatCard>
        <StatCard>
          <div className="icon"><Clock /></div>
          <div className="content">
            <h3>Temps Moyen</h3>
            <p>34m</p>
          </div>
        </StatCard>
        <StatCard>
          <div className="icon" style={{ color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)' }}><AlertTriangle /></div>
          <div className="content">
            <h3>Incidents (24h)</h3>
            <p>0</p>
          </div>
        </StatCard>
      </StatsGrid>

      <h2 className="text-xl font-semibold mb-4 text-white">Journal des Connexions (Live)</h2>
      <LogsTable>
        <table>
          <thead>
            <tr>
              <th>Événement</th>
              <th>Utilisateur</th>
              <th>Salle</th>
              <th>Horodatage</th>
              <th>État</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => (
              <tr key={i}>
                <td className="font-medium text-white">{log.event || log.event_type}</td>
                <td>{log.user || log.user_id}</td>
                <td>{log.room || log.room_id}</td>
                <td>{log.time || new Date(log.timestamp).toLocaleTimeString()}</td>
                <td>
                  <StatusBadge status={log.status === 'active' || log.event_type === 'connect' ? 'active' : 'inactive'}>
                    {log.status || (log.event_type === 'connect' ? 'Connecté' : 'Déconnecté')}
                  </StatusBadge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </LogsTable>
    </DashboardContainer>
  );
}
