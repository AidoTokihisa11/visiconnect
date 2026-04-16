import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Target, Users, Heart, Globe, Award, Shield } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';
import CallToAction from '../components/CallToAction';

const COLORS = {
  primary: 'hsl(var(--primary))',    
  secondary: 'hsl(var(--muted-foreground))',  
  dark: 'hsl(var(--foreground))',       
  text: 'hsl(var(--foreground))',       
  lightText: 'hsl(var(--muted-foreground))',  
  background: 'hsl(var(--background))', 
  white: 'hsl(var(--card))',
  border: 'hsl(var(--border))',     
  success: 'hsl(var(--primary))',    
};

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${COLORS.background};
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: ${COLORS.text};
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const MainContent = styled.main`
  flex: 1;
`;

const HeroSection = styled.div`
  background: linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--background)) 100%);
  padding: 8rem 1.5rem 6rem;
  text-align: center;
  border-bottom: 1px solid ${COLORS.border};
  position: relative;
  overflow: hidden;

  @media (max-width: 640px) {
    padding: 6rem 1rem 4rem;
  }

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

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: ${COLORS.dark};
  margin-bottom: 1.5rem;
  letter-spacing: -0.025em;

  span {
    color: ${COLORS.primary};
  }

  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: ${COLORS.lightText};
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Section = styled.section`
  padding: 5rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const StoryContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  color: ${COLORS.dark};
  margin-bottom: 2rem;
  text-align: center;
`;

const TextBlock = styled.p`
  font-size: 1.125rem;
  line-height: 1.8;
  color: ${COLORS.secondary};
  margin-bottom: 1.5rem;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  margin-top: 3rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ValueCard = styled.div`
  background-color: ${COLORS.white};
  padding: 2.5rem;
  border-radius: 12px;
  border: 1px solid ${COLORS.border};
  text-align: left;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
    border-color: ${COLORS.primary};
  }
`;

const IconBox = styled.div`
  width: 50px;
  height: 50px;
  background-color: #eff6ff;
  color: ${COLORS.primary};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const ValueTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${COLORS.dark};
  margin-bottom: 1rem;
`;

const ValueText = styled.p`
  color: ${COLORS.lightText};
  line-height: 1.6;
`;

const StatsSection = styled.section`
  background-color: ${COLORS.dark};
  color: ${COLORS.white};
  padding: 4rem 1.5rem;
  margin-top: 2rem;
`;

const StatsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 800;
  color: ${COLORS.primary};
`;

const StatLabel = styled.div`
  font-size: 1.125rem;
  font-weight: 500;
  color: #94a3b8;
`;

const AboutPageNew = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer>
      <HeaderClean />
      <MainContent>
        <HeroSection>
          <HeroTitle>
            {t('about.hero.title_part1')} <br />
            <span>{t('about.hero.title_part2')}</span>
          </HeroTitle>
          <HeroSubtitle>
            {t('about.hero.subtitle')}
          </HeroSubtitle>
        </HeroSection>

        <Section>
          <SectionTitle>{t('about.story.title')}</SectionTitle>
          <StoryContainer>
            <TextBlock>
              {t('about.story.paragraph1')}
            </TextBlock>
            <TextBlock>
              {t('about.story.paragraph2')}
            </TextBlock>
            <TextBlock>
              {t('about.story.paragraph3')}
            </TextBlock>
          </StoryContainer>
        </Section>

        <Section style={{ backgroundColor: '#fff', borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}` }}>
          <SectionTitle>{t('about.values.title')}</SectionTitle>
          <ValuesGrid>
            <ValueCard>
              <IconBox><Target size={24} /></IconBox>
              <ValueTitle>{t('about.values.simplicity.title')}</ValueTitle>
              <ValueText>
                {t('about.values.simplicity.description')}
              </ValueText>
            </ValueCard>

            <ValueCard>
              <IconBox><Shield size={24} /></IconBox>
              <ValueTitle>{t('about.values.privacy.title')}</ValueTitle>
              <ValueText>
                {t('about.values.privacy.description')}
              </ValueText>
            </ValueCard>

            <ValueCard>
              <IconBox><Heart size={24} /></IconBox>
              <ValueTitle>{t('about.values.accessibility.title')}</ValueTitle>
              <ValueText>
                {t('about.values.accessibility.description')}
              </ValueText>
            </ValueCard>
          </ValuesGrid>
        </Section>

        <StatsSection>
          <StatsGrid>
            <StatItem>
              <StatNumber>1M+</StatNumber>
              <StatLabel>{t('about.stats.users')}</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>150+</StatNumber>
              <StatLabel>{t('about.stats.countries')}</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>99.9%</StatNumber>
              <StatLabel>{t('about.stats.uptime')}</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>24/7</StatNumber>
              <StatLabel>{t('about.stats.support')}</StatLabel>
            </StatItem>
          </StatsGrid>
        </StatsSection>

        <CallToAction
            title={t('about.cta.title')}
            description={t('about.cta.description')}
            buttonText={t('about.cta.button')}          />      </MainContent>
      <FooterClean />
    </PageContainer>
  );
};

export default AboutPageNew;
