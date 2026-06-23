import React from 'react';
import styled from 'styled-components';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';
import { useTranslation } from '../hooks/useTranslation';

const COLORS = {
  primary: 'hsl(var(--primary))',
  secondary: 'hsl(var(--secondary))',
  dark: 'hsl(var(--foreground))',
  text: 'hsl(var(--foreground))',
  lightText: 'hsl(var(--muted-foreground))',
  background: 'hsl(var(--background))',
  white: 'hsl(var(--card))',
  border: 'hsl(var(--border))',
  success: '#16a34a',
  warning: '#f59e0b',
  danger: '#ef4444',
};

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${COLORS.background};
  color: ${COLORS.text};
  display: flex;
  flex-direction: column;
  font-family: 'Inter', sans-serif;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 80px;
`;

const Hero = styled.section`
  background-color: ${COLORS.white};
  padding: 60px 24px;
  text-align: center;
  border-bottom: 1px solid ${COLORS.border};
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${COLORS.dark};
  margin-bottom: 16px;
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #dcfce7;
  color: ${COLORS.success};
  padding: 8px 24px;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 1.125rem;
  margin-bottom: 24px;

  &::before {
    content: '';
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: currentColor;
  }
`;

const LastUpdated = styled.p`
  color: ${COLORS.lightText};
  font-size: 0.875rem;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 48px auto;
  padding: 0 24px;
`;

const SystemGrid = styled.div`
  display: grid;
  gap: 16px;
  margin-bottom: 48px;
`;

const SystemCard = styled.div`
  background: ${COLORS.white};
  padding: 24px;
  border-radius: 12px;
  border: 1px solid ${COLORS.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
`;

const SystemName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${COLORS.dark};
`;

const StatusIndicator = styled.span`
  color: ${(props) =>
    props.status === 'operational'
      ? COLORS.success
      : props.status === 'degraded'
        ? COLORS.warning
        : COLORS.danger};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: currentColor;
  }
`;

const UptimeSection = styled.section`
  background: ${COLORS.white};
  padding: 32px;
  border-radius: 12px;
  border: 1px solid ${COLORS.border};
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${COLORS.dark};
  margin-bottom: 24px;
`;

const UptimeGraph = styled.div`
  height: 200px;
  background-color: hsl(var(--muted));
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.lightText};
  font-style: italic;
  transition: background-color 0.3s ease;
`;

const IncidentHistory = styled.div`
  margin-top: 48px;
`;

const IncidentCard = styled.div`
  padding: 24px 0;
  border-bottom: 1px solid ${COLORS.border};

  &:last-child {
    border-bottom: none;
  }
`;

const IncidentDate = styled.div`
  font-size: 0.875rem;
  color: ${COLORS.lightText};
  margin-bottom: 8px;
`;

const IncidentTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${COLORS.dark};
  margin-bottom: 8px;
`;

const IncidentDesc = styled.p`
  color: ${COLORS.text};
  line-height: 1.5;
`;

const StatusPageNew = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <HeaderClean />
      <MainContent>
        <Hero>
          <StatusBadge>{t('status.allOperational')}</StatusBadge>
          <Title>{t('status.title')}</Title>
          <LastUpdated>{t('status.lastUpdate')}</LastUpdated>
        </Hero>

        <Container>
          <SystemGrid>
            <SystemCard>
              <SystemName>{t('status.services.api')}</SystemName>
              <StatusIndicator status="operational">{t('status.operational')}</StatusIndicator>
            </SystemCard>
            <SystemCard>
              <SystemName>{t('status.services.video')}</SystemName>
              <StatusIndicator status="operational">{t('status.operational')}</StatusIndicator>
            </SystemCard>
            <SystemCard>
              <SystemName>{t('status.services.web')}</SystemName>
              <StatusIndicator status="operational">{t('status.operational')}</StatusIndicator>
            </SystemCard>
            <SystemCard>
              <SystemName>{t('status.services.db')}</SystemName>
              <StatusIndicator status="operational">{t('status.operational')}</StatusIndicator>
            </SystemCard>
            <SystemCard>
              <SystemName>{t('status.services.ai')}</SystemName>
              <StatusIndicator status="operational">{t('status.operational')}</StatusIndicator>
            </SystemCard>
          </SystemGrid>

          <UptimeSection>
            <SectionTitle>{t('status.uptimeTitle')}</SectionTitle>
            <UptimeGraph>{t('status.uptimeChart')}</UptimeGraph>
          </UptimeSection>

          <IncidentHistory>
            <SectionTitle>{t('status.incidents.title')}</SectionTitle>
            <IncidentCard>
              <IncidentDate>{t('status.incidents.0.date')}</IncidentDate>
              <IncidentTitle>{t('status.incidents.0.title')}</IncidentTitle>
              <IncidentDesc>{t('status.incidents.0.desc')}</IncidentDesc>
            </IncidentCard>
            <IncidentCard>
              <IncidentDate>{t('status.incidents.1.date')}</IncidentDate>
              <IncidentTitle>{t('status.incidents.1.title')}</IncidentTitle>
              <IncidentDesc>{t('status.incidents.1.desc')}</IncidentDesc>
            </IncidentCard>
          </IncidentHistory>
        </Container>
      </MainContent>
      <FooterClean />
    </PageContainer>
  );
};

export default StatusPageNew;
