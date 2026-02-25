import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';
import { motion } from 'framer-motion';
import { Activity, Clock, Users, Zap, Signal } from 'lucide-react';

const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: rgb(15 23 42 / 0.5);
  backdrop-filter: blur(8px);
  padding: 1.5rem;
  overflow-y: auto;
  gap: 2rem;
  color: white;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
`;

const KPIGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const KPICard = styled(motion.div)`
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .label {
    font-size: 0.8rem;
    color: #94a3b8;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .value {
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
  }

  .trend {
    font-size: 0.75rem;
    color: #10b981;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
`;

const ChartContainer = styled.div`
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.25rem;
  height: 250px;
  position: relative;

  h4 {
    margin: 0 0 1rem 0;
    font-size: 0.95rem;
    font-weight: 600;
    color: #cbd5e1;
  }
`;

// Mock Data
const INVOLVEMENT_DATA = [
  { time: '10:00', value: 45 },
  { time: '10:05', value: 52 },
  { time: '10:10', value: 78 },
  { time: '10:15', value: 65 },
  { time: '10:20', value: 89 },
  { time: '10:25', value: 94 },
  { time: '10:30', value: 82 },
];

const AUDIO_QUALITY_DATA = [
  { time: '10:00', bitrate: 120, loss: 0.1 },
  { time: '10:05', bitrate: 125, loss: 0.2 },
  { time: '10:10', bitrate: 118, loss: 0.5 }, // slight dip
  { time: '10:15', bitrate: 128, loss: 0.0 },
  { time: '10:20', bitrate: 126, loss: 0.1 },
  { time: '10:25', bitrate: 124, loss: 0.1 },
  { time: '10:30', bitrate: 127, loss: 0.0 },
];

export const AnalyticsPanel = () => {
    // Simulate real-time updates
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <PanelContainer>
            <KPIGrid>
                <KPICard whileHover={{ scale: 1.02 }}>
                    <div className="label"><Users size={14} /> Participants Actifs</div>
                    <div className="value">12</div>
                    <div className="trend">↑ 2 depuis 5 min</div>
                </KPICard>
                <KPICard whileHover={{ scale: 1.02 }}>
                    <div className="label"><Clock size={14} /> Durée Session</div>
                    <div className="value">34m</div>
                    <div className="trend">En cours</div>
                </KPICard>
                <KPICard whileHover={{ scale: 1.02 }}>
                    <div className="label"><Zap size={14} /> Engagement</div>
                    <div className="value">87%</div>
                    <div className="trend">Excellent</div>
                </KPICard>
                <KPICard whileHover={{ scale: 1.02 }}>
                    <div className="label"><Signal size={14} /> Qualité Moy.</div>
                    <div className="value">4.9/5</div>
                    <div className="trend">Stable</div>
                </KPICard>
            </KPIGrid>

            <ChartContainer>
                <h4>Taux d'Engagement en Temps Réel</h4>
                <ResponsiveContainer width="100%" height="85%">
                    <AreaChart data={INVOLVEMENT_DATA}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}
                            itemStyle={{ color: '#e2e8f0' }}
                        />
                        <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                </ResponsiveContainer>
            </ChartContainer>

            <ChartContainer>
                <h4>Stabilité du Réseau (Bitrate Audio)</h4>
                <ResponsiveContainer width="100%" height="85%">
                    <LineChart data={AUDIO_QUALITY_DATA}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                            itemStyle={{ color: '#e2e8f0' }}
                        />
                        <Line type="monotone" dataKey="bitrate" stroke="#10b981" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                    </LineChart>
                </ResponsiveContainer>
            </ChartContainer>
            
            <div style={{ marginTop: 'auto', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', fontSize: '0.8rem', color: '#64748b', textAlign: 'center' }}>
                <Activity size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                Données mises à jour en temps réel via WebSocket
            </div>
        </PanelContainer>
    );
};
