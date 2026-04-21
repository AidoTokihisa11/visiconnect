import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Target, Users, Heart, Globe, Award, Shield, Building2 } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';
import CallToAction from '../components/CallToAction';

const COLORS = {
  primary:    '#2563eb',
  dark:       '#0f172a',
  text:       '#374151',
  secondary:  '#6b7280',
  lightText:  '#6b7280',
  background: '#ffffff',
  bg:         '#f8fbff',
  white:      '#ffffff',
  border:     '#e5e7eb',
  softBlue:   '#eff6ff',
  blueTint:   '#dbeafe',
  success:    '#2563eb',
};

const floatIn = keyframes`
  from { opacity: 0; transform: translateY(18px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0)    scale(1);    }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(37,99,235,0.08), transparent 30%),
    linear-gradient(180deg, ${COLORS.bg} 0%, #ffffff 25%, #ffffff 100%);
  color: ${COLORS.dark};
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

const HeroSection = styled.div`
  background: transparent;
  padding: 6rem 1.5rem 5rem;
  border-bottom: 1px solid ${COLORS.border};
`;

const HeroInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0,1.2fr) minmax(280px,.8fr);
  gap: 3rem;
  align-items: center;
  @media(max-width:900px){ grid-template-columns: 1fr; }
`;
const HeroContent = styled.div`
  animation: ${floatIn} .75s cubic-bezier(.22,1,.36,1) both;
`;
const HeroEyebrow = styled.div`
  display: inline-flex; align-items: center; gap: .5rem;
  padding: .45rem .85rem; border-radius: 9999px;
  background: ${COLORS.softBlue}; border: 1px solid ${COLORS.blueTint};
  color: ${COLORS.primary}; font-weight: 700; font-size: .82rem;
  margin-bottom: 1.25rem;
`;
const HeroPanel = styled.div`
  background: linear-gradient(180deg,#fff 0%,${COLORS.bg} 100%);
  border: 1px solid ${COLORS.border}; border-radius: 20px; padding: 1.75rem;
  box-shadow: 0 20px 50px rgba(15,23,42,.08);
  animation: ${floatIn} .9s .15s cubic-bezier(.22,1,.36,1) both;
`;
const HeroPanelLabel = styled.div`
  font-size: .75rem; font-weight: 800; text-transform: uppercase;
  letter-spacing: .1em; color: ${COLORS.lightText}; margin-bottom: 1.25rem;
`;
const StatGrid = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;`;
const HeroStatItem = styled.div`
  background: #fff; border: 1px solid ${COLORS.border}; border-radius: 12px;
  padding: 1.1rem; text-align: center;
`;
const HeroStatValue = styled.div`
  font-size: 1.6rem; font-weight: 800; color: ${COLORS.primary}; line-height: 1;
`;
const HeroStatLabel = styled.div`
  font-size: .76rem; color: ${COLORS.lightText}; margin-top: 4px;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4.2rem);
  font-weight: 800;
  color: ${COLORS.dark};
  line-height: 1.08;
  letter-spacing: -0.03em;
  margin: 0 0 1.25rem;
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: ${COLORS.lightText};
  max-width: 560px;
  margin: 0 0 2rem;
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
          <HeroInner>
            <HeroContent>
              <HeroEyebrow><Building2 size={14} />{t('about.eyebrow') || 'Notre histoire'}</HeroEyebrow>
              <HeroTitle>
                {t('about.hero.title_part1')}{' '}
                <span style={{color:COLORS.primary}}>{t('about.hero.title_part2')}</span>
              </HeroTitle>
              <HeroSubtitle>{t('about.hero.subtitle')}</HeroSubtitle>
            </HeroContent>
            <HeroPanel>
              <HeroPanelLabel>VisioConnect en chiffres</HeroPanelLabel>
              <StatGrid>
                {[['50 000+','Utilisateurs actifs'],['120+','Pays'],['99.9%','Uptime SLA'],['2021','Fondée'],].map(([v,l])=>(
                  <HeroStatItem key={l}><HeroStatValue>{v}</HeroStatValue><HeroStatLabel>{l}</HeroStatLabel></HeroStatItem>
                ))}
              </StatGrid>
            </HeroPanel>
          </HeroInner>
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
