import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Users, MonitorPlay, Zap, Activity } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

const COLORS = {
  primary: '#2563eb', // Blue-600
  lightText: '#64748b', // Slate-500
  dark: '#0f172a', // Slate-900
  white: '#ffffff', // White
  border: '#e2e8f0', // Slate-200
  background: '#ffffff', // White
};

const SectionWrapper = styled.section`
  padding: 4rem 1.5rem;
  background-color: ${COLORS.background};
  border-bottom: 1px solid ${COLORS.border};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
`;

const StatCard = styled(motion.div)`
  background: ${COLORS.white};
  padding: 1.5rem 2rem;
  border-radius: 9999px; // Pill shape
  border: 1px solid ${COLORS.border};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    border-color: ${COLORS.primary};
  }
`;

const IconBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #eff6ff;
  color: ${COLORS.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatValue = styled.span`
  font-size: 1.25rem;
  font-weight: 800;
  color: ${COLORS.dark};
  line-height: 1.2;
`;

const StatLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${COLORS.lightText};
`;

export default function KeyStats() {
  const { t } = useTranslation();
  const stats = [
    { icon: Users, value: '3+', label: t('keyStats.teams') },
    { icon: MonitorPlay, value: '4K', label: t('keyStats.native') },
    { icon: Zap, value: '< 50ms', label: t('keyStats.latency') },
    { icon: Activity, value: '99.9%', label: t('keyStats.uptime') },
  ];

  return (
    <SectionWrapper>
      <Container>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
            viewport={{ once: true }}
          >
            <IconBox>
              <stat.icon size={20} />
            </IconBox>
            <StatInfo>
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatInfo>
          </StatCard>
        ))}
      </Container>
    </SectionWrapper>
  );
}
