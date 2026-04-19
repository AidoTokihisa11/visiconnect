import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Video, Shield, Zap, Users, Globe, Smartphone, Lock, Mic, Layout, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';
import CallToAction from '../components/CallToAction';
import { useTranslation } from '../hooks/useTranslation';

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
  background-color: hsl(var(--card));
  padding: 5rem 1.5rem;
  text-align: center;
  border-bottom: 1px solid ${COLORS.border};
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: ${COLORS.dark};
  margin-bottom: 1.5rem;
  letter-spacing: -0.025em;

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

const FeaturesGridSection = styled.section`
  padding: 5rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background-color: ${COLORS.white};
  border: 1px solid ${COLORS.border};
  border-radius: 12px;
  padding: 2rem;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    border-color: ${COLORS.primary};
  }
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  background-color: ${COLORS.background};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: ${COLORS.primary};
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${COLORS.dark};
  margin-bottom: 0.75rem;
`;

const FeatureDescription = styled.p`
  color: ${COLORS.lightText};
  line-height: 1.6;
`;

const CTASection = styled.section`
  background-color: ${COLORS.primary};
  padding: 5rem 1.5rem;
  text-align: center;
  color: ${COLORS.white};
`;

const CTATitle = styled.h2`
  font-size: 2.25rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background-color: ${COLORS.white};
  color: ${COLORS.primary};
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  font-size: 1.125rem;
  transition: all 0.2s;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
    background-color: #f8fafc;
  }
`;

const FeaturesPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    { icon: <Video size={24} />, title: t('featuresPage.items.hd_video.title'), description: t('featuresPage.items.hd_video.desc') },
    { icon: <Shield size={24} />, title: t('featuresPage.items.security.title'), description: t('featuresPage.items.security.desc') },
    { icon: <Zap size={24} />, title: t('featuresPage.items.performance.title'), description: t('featuresPage.items.performance.desc') },
    { icon: <Users size={24} />, title: t('featuresPage.items.group.title'), description: t('featuresPage.items.group.desc') },
    { icon: <Globe size={24} />, title: t('featuresPage.items.global.title'), description: t('featuresPage.items.global.desc') },
    { icon: <Smartphone size={24} />, title: t('featuresPage.items.mobile.title'), description: t('featuresPage.items.mobile.desc') },
    { icon: <Lock size={24} />, title: t('featuresPage.items.admin.title'), description: t('featuresPage.items.admin.desc') },
    { icon: <Mic size={24} />, title: t('featuresPage.items.audio.title'), description: t('featuresPage.items.audio.desc') },
    { icon: <Layout size={24} />, title: t('featuresPage.items.ui.title'), description: t('featuresPage.items.ui.desc') }
  ];

  return (
    <PageContainer>
      <HeaderClean />
      
      <MainContent>
        <HeroSection>
          <HeroTitle>{t('featuresPage.hero.title')}</HeroTitle>
          <HeroSubtitle>{t('featuresPage.hero.subtitle')}</HeroSubtitle>
        </HeroSection>

        <FeaturesGridSection>
          <Grid>
            {features.map((feature, index) => (
              <FeatureCard key={index}>
                <IconWrapper>{feature.icon}</IconWrapper>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </Grid>
        </FeaturesGridSection>

        <CallToAction 
             title={t('featuresPage.cta.title')}
             description={t('featuresPage.cta.description')}
             buttonText={t('featuresPage.cta.button')}
             buttonLink="/register"
        />
      </MainContent>

      <FooterClean />
    </PageContainer>
  );
};

export default FeaturesPage;
