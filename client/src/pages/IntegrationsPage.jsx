import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Puzzle } from 'lucide-react';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';
import CallToAction from '../components/CallToAction';
import { useTranslation } from '../hooks/useTranslation';
import SEO from '../components/SEO';

const COLORS = {
  primary: '#2563eb',
  dark: '#0f172a',
  text: '#374151',
  lightText: '#6b7280',
  background: '#ffffff',
  bg: '#f8fbff',
  white: '#ffffff',
  border: '#e5e7eb',
  softBlue: '#eff6ff',
  blueTint: '#dbeafe',
  success: '#16a34a',
};

const floatIn = keyframes`
  from { opacity:0; transform:translateY(18px) scale(0.98); }
  to   { opacity:1; transform:translateY(0) scale(1); }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(37, 99, 235, 0.08), transparent 30%),
    linear-gradient(180deg, ${COLORS.bg} 0%, #fff 25%, #fff 100%);
  color: ${COLORS.dark};
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

const Hero = styled.section`
  background: transparent;
  padding: 6rem 1.5rem 5rem;
  border-bottom: 1px solid ${COLORS.border};

  @media (max-width: 768px) {
    padding: 4rem 1.1rem 3rem;
  }

  @media (max-width: 480px) {
    padding: 2.6rem 1rem 2rem;
  }
`;

const HeroInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
  gap: 3rem;
  align-items: center;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;
const HeroLeft = styled.div`
  animation: ${floatIn} 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;
`;
const HeroEyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.85rem;
  border-radius: 9999px;
  background: ${COLORS.softBlue};
  border: 1px solid ${COLORS.blueTint};
  color: ${COLORS.primary};
  font-weight: 700;
  font-size: 0.82rem;
  margin-bottom: 1.25rem;
`;
const HeroPanel = styled.div`
  background: linear-gradient(180deg, #fff 0%, ${COLORS.bg} 100%);
  border: 1px solid ${COLORS.border};
  border-radius: 20px;
  padding: 1.75rem;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.08);
  animation: ${floatIn} 0.9s 0.15s cubic-bezier(0.22, 1, 0.36, 1) both;
`;
const PanelTitle = styled.div`
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${COLORS.lightText};
  margin-bottom: 1rem;
`;
const StatRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.75rem;
`;
const StatBox = styled.div`
  background: #fff;
  border: 1px solid ${COLORS.border};
  border-radius: 12px;
  padding: 0.9rem;
  text-align: center;
  strong {
    display: block;
    font-size: 1.4rem;
    font-weight: 800;
    color: ${COLORS.primary};
  }
  span {
    font-size: 0.72rem;
    color: ${COLORS.lightText};
  }
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4.2rem);
  font-weight: 700;
  color: ${COLORS.dark};
  margin: 0 0 1.25rem;
  letter-spacing: -0.03em;
  line-height: 1.08;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${COLORS.lightText};
  max-width: 520px;
  margin: 0 0 2rem;
  line-height: 1.65;
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
  transition:
    transform 0.2s,
    box-shadow 0.2s,
    background-color 0.3s ease,
    border-color 0.3s ease;

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
  background: ${(props) => (props.active ? COLORS.dark : COLORS.white)};
  color: ${(props) => (props.active ? COLORS.white : COLORS.text)};
  border: 1px solid ${(props) => (props.active ? COLORS.dark : COLORS.border)};
  padding: 8px 24px;
  border-radius: 9999px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.active ? COLORS.dark : '#f1f5f9')};
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
    <>
      <SEO
        title="Intégrations"
        description="Connectez VisioConnect à vos outils favoris : Slack, Google Agenda, Notion et plus."
        path="/integrations"
      />
      <PageContainer>
        <HeaderClean />
        <MainContent>
          <Hero>
            <HeroInner>
              <HeroLeft>
                <HeroEyebrow>
                  <Puzzle size={14} />
                  Intégrations
                </HeroEyebrow>
                <Title>{t('integrations.hero.title')}</Title>
                <Subtitle>{t('integrations.hero.subtitle')}</Subtitle>
                <CategoryFilter>
                  <FilterButton active>{t('integrations.filters.all')}</FilterButton>
                  <FilterButton>{t('integrations.filters.communication')}</FilterButton>
                  <FilterButton>{t('integrations.filters.productivity')}</FilterButton>
                  <FilterButton>{t('integrations.filters.crm')}</FilterButton>
                  <FilterButton>{t('integrations.filters.development')}</FilterButton>
                </CategoryFilter>
              </HeroLeft>
              <HeroPanel>
                <PanelTitle>Écosystème</PanelTitle>
                <StatRow>
                  <StatBox>
                    <strong>50+</strong>
                    <span>Intégrations</span>
                  </StatBox>
                  <StatBox>
                    <strong>5</strong>
                    <span>Catégories</span>
                  </StatBox>
                  <StatBox>
                    <strong>API</strong>
                    <span>Ouverte</span>
                  </StatBox>
                </StatRow>
              </HeroPanel>
            </HeroInner>
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
    </>
  );
};

export default IntegrationsPage;
