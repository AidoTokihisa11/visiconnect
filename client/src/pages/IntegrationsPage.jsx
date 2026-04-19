import React from 'react';
import styled from 'styled-components';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';
import CallToAction from '../components/CallToAction';
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
};

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${COLORS.background};
  color: ${COLORS.text};
  display: flex;
  flex-direction: column;
  font-family: 'Inter', sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const MainContent = styled.main`
  flex: 1;
`;

const Hero = styled.section`
  background: linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--background)) 100%);
  padding: 100px 24px 80px;
  text-align: center;
  border-bottom: 1px solid ${COLORS.border};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(37, 99, 235, 0.05) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: ${COLORS.dark};
  margin-bottom: 16px;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${COLORS.lightText};
  max-width: 600px;
  margin: 0 auto;
`;

const IntegrationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 32px;
  max-width: 1200px;
  margin: 64px auto;
  padding: 0 24px;
`;

const IntegrationCard = styled.div`
  background: ${COLORS.white};
  border: 1px solid ${COLORS.border};
  border-radius: 12px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s, background-color 0.3s ease, border-color 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 20px -8px rgba(0, 0, 0, 0.1);
  }
`;

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  background-color: hsl(var(--muted));
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  font-size: 32px;
  transition: background-color 0.3s ease;
`;

const IntegrationName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${COLORS.dark};
  margin-bottom: 12px;
`;

const IntegrationDesc = styled.p`
  color: ${COLORS.lightText};
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 24px;
`;

const InstallButton = styled.button`
  margin-top: auto;
  background-color: ${COLORS.white};
  color: ${COLORS.primary};
  border: 1px solid ${COLORS.primary};
  padding: 8px 20px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s;

  &:hover {
    background-color: ${COLORS.primary};
    color: ${COLORS.white};
  }
`;

const CategoryFilter = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 40px;
  padding: 0 24px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background: ${props => props.active ? COLORS.dark : COLORS.white};
  color: ${props => props.active ? COLORS.white : COLORS.text};
  border: 1px solid ${props => props.active ? COLORS.dark : COLORS.border};
  padding: 8px 24px;
  border-radius: 9999px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: ${props => props.active ? COLORS.dark : '#f1f5f9'};
  }
`;

const IntegrationsPage = () => {
  const { t } = useTranslation();

  const INTEGRATIONS = [
    { name: 'Slack', desc: t('integrations.items.slack.desc'), icon: '💬' },
    { name: 'Google Calendar', desc: t('integrations.items.google_calendar.desc'), icon: '📅' },
    { name: 'Microsoft Teams', desc: t('integrations.items.teams.desc'), icon: '👥' },
    { name: 'Trello', desc: t('integrations.items.trello.desc'), icon: '📋' },
    { name: 'Notion', desc: t('integrations.items.notion.desc'), icon: '📝' },
    { name: 'Figma', desc: t('integrations.items.figma.desc'), icon: '🎨' },
    { name: 'Zapier', desc: t('integrations.items.zapier.desc'), icon: '⚡' },
    { name: 'Salesforce', desc: t('integrations.items.salesforce.desc'), icon: '☁️' },
  ];

  return (
    <PageContainer>
      <HeaderClean />
      <MainContent>
        <Hero>
          <Title>{t('integrations.hero.title')}</Title>
          <Subtitle>{t('integrations.hero.subtitle')}</Subtitle>
          
          <CategoryFilter>
            <FilterButton active>{t('integrations.filters.all')}</FilterButton>
            <FilterButton>{t('integrations.filters.communication')}</FilterButton>
            <FilterButton>{t('integrations.filters.productivity')}</FilterButton>
            <FilterButton>{t('integrations.filters.crm')}</FilterButton>
            <FilterButton>{t('integrations.filters.development')}</FilterButton>
          </CategoryFilter>
        </Hero>

        <IntegrationsGrid>
          {INTEGRATIONS.map((app, index) => (
            <IntegrationCard key={index}>
              <IconWrapper>{app.icon}</IconWrapper>
              <IntegrationName>{app.name}</IntegrationName>
              <IntegrationDesc>{app.desc}</IntegrationDesc>
              <InstallButton>{t('integrations.install')}</InstallButton>
            </IntegrationCard>
          ))}
        </IntegrationsGrid>

        <CallToAction 
             title={t('integrations.cta.title')}
             description={t('integrations.cta.description')}
             buttonText={t('integrations.cta.button')}
             buttonLink="/contact"
        />

      </MainContent>
      <FooterClean />
    </PageContainer>
  );
};

export default IntegrationsPage;
