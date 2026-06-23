import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { motion } from 'framer-motion';
import { ROOM_THEME as THEME } from '../../styles/roomTheme';
import { Activity, Clock, Users, Zap, Signal } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${THEME.panelBg};
  backdrop-filter: blur(8px);
  padding: 1.5rem;
  overflow-y: auto;
  gap: 2rem;
  color: ${THEME.text};

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${THEME.border};
    border-radius: 3px;
  }
`;

const KPIGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const KPICard = styled(motion.div)`
  background: ${THEME.cardBg};
  box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.05);
  border: 1px solid #e0e7ff;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .label {
    font-size: 0.8rem;
    color: ${THEME.textDim};
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .value {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${THEME.text};
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
  background: ${THEME.cardBg};
  box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.05);
  border: 1px solid #e0e7ff;
  border-radius: 16px;
  padding: 1.25rem;
  min-height: 250px;
  position: relative;

  h4 {
    margin: 0 0 1rem 0;
    font-size: 0.95rem;
    font-weight: 600;
    color: ${THEME.text};
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
  const { t } = useTranslation();
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );

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
          <div className="label">
            <Users size={14} /> {t('room.analytics.activeParticipants', 'Participants Actifs')}
          </div>
          <div className="value">12</div>
          <div className="trend">{t('room.analytics.trendParticipants', '↑ 2 depuis 5 min')}</div>
        </KPICard>
        <KPICard whileHover={{ scale: 1.02 }}>
          <div className="label">
            <Clock size={14} /> {t('room.analytics.sessionDuration', 'Durée Session')}
          </div>
          <div className="value">34m</div>
          <div className="trend">{t('room.analytics.inProgress', 'En cours')}</div>
        </KPICard>
        <KPICard whileHover={{ scale: 1.02 }}>
          <div className="label">
            <Zap size={14} /> {t('room.analytics.engagement', 'Engagement')}
          </div>
          <div className="value">87%</div>
          <div className="trend">{t('room.analytics.excellent', 'Excellent')}</div>
        </KPICard>
        <KPICard whileHover={{ scale: 1.02 }}>
          <div className="label">
            <Signal size={14} /> {t('room.analytics.avgQuality', 'Qualité Moy.')}
          </div>
          <div className="value">4.9/5</div>
          <div className="trend">{t('room.analytics.stable', 'Stable')}</div>
        </KPICard>
      </KPIGrid>

      <ChartContainer>
        <h4>{t('room.analytics.engagementRateTitle', "Taux d'Engagement en Temps Réel")}</h4>
        <ResponsiveContainer width="100%" height={190} minWidth={0}>
          <AreaChart data={INVOLVEMENT_DATA}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="time"
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
              }}
              itemStyle={{ color: '#1e293b' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#8b5cf6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>

      <ChartContainer>
        <h4>{t('room.analytics.networkStabilityTitle', 'Stabilité du Réseau (Bitrate Audio)')}</h4>
        <ResponsiveContainer width="100%" height={190} minWidth={0}>
          <LineChart data={AUDIO_QUALITY_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="time"
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#ffffff', border: 'none', borderRadius: '8px' }}
              itemStyle={{ color: '#1e293b' }}
            />
            <Line
              type="monotone"
              dataKey="bitrate"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      <div
        style={{
          marginTop: 'auto',
          padding: '1rem',
          background: THEME.panelBg,
          borderRadius: '8px',
          fontSize: '0.8rem',
          color: THEME.textDim,
          textAlign: 'center',
        }}
      >
        <Activity
          size={14}
          style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}
        />
        {t('room.analytics.realtimeFooter', 'Données mises à jour en temps réel via WebSocket')}
      </div>
    </PanelContainer>
  );
};
