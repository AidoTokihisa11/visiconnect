import React from 'react';
import styled from 'styled-components';
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

const Section = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: 64px 24px;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: ${COLORS.dark};
  margin-bottom: 40px;
  text-align: center;
`;

const JobList = styled.div`
  display: grid;
  gap: 24px;
`;

const JobCard = styled.div`
  background: ${COLORS.white};
  border: 1px solid ${COLORS.border};
  border-radius: 12px;
  padding: 32px;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const JobInfo = styled.div``;

const JobTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${COLORS.dark};
  margin-bottom: 8px;
`;

const JobMeta = styled.div`
  display: flex;
  gap: 16px;
  color: ${COLORS.lightText};
  font-size: 0.875rem;
`;

const JobTag = styled.span`
  background-color: #eff6ff;
  color: ${COLORS.primary};
  padding: 4px 12px;
  border-radius: 9999px;
  font-weight: 500;
`;

const ApplyButton = styled.button`
  background-color: ${COLORS.white};
  color: ${COLORS.primary};
  border: 1px solid ${COLORS.primary};
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: ${COLORS.primary};
    color: ${COLORS.white};
  }
`;

const CultureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-top: 48px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CultureCard = styled.div`
  background: ${COLORS.white};
  padding: 32px;
  border-radius: 12px;
  border: 1px solid ${COLORS.border};
  text-align: center;
`;

const CultureIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 16px;
  color: ${COLORS.primary};
`;

const CultureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${COLORS.dark};
  margin-bottom: 12px;
`;

const CultureText = styled.p`
  color: ${COLORS.lightText};
  line-height: 1.6;
`;

const CareersPageNew = () => {
  const { t } = useTranslation();

  const JOBS = [
    { id: 1, title: t('careers.jobs.0.title'), department: t('careers.jobs.0.dept'), location: t('careers.jobs.0.location'), type: t('careers.jobs.0.type') },
    { id: 2, title: t('careers.jobs.1.title'), department: t('careers.jobs.1.dept'), location: t('careers.jobs.1.location'), type: t('careers.jobs.1.type') },
    { id: 3, title: t('careers.jobs.2.title'), department: t('careers.jobs.2.dept'), location: t('careers.jobs.2.location'), type: t('careers.jobs.2.type') },
    { id: 4, title: t('careers.jobs.3.title'), department: t('careers.jobs.3.dept'), location: t('careers.jobs.3.location'), type: t('careers.jobs.3.type') },
  ];

  return (
    <PageContainer>
      <HeaderClean />
      <MainContent>
        <Hero>
          <Title>{t('careers.hero.title')}</Title>
          <Subtitle>{t('careers.hero.subtitle')}</Subtitle>
        </Hero>

        <Section>
          <SectionTitle>{t('careers.values.title')}</SectionTitle>
          <CultureGrid>
            <CultureCard>
              <CultureIcon>🚀</CultureIcon>
              <CultureTitle>{t('careers.values.0.title')}</CultureTitle>
              <CultureText>{t('careers.values.0.desc')}</CultureText>
            </CultureCard>
            <CultureCard>
              <CultureIcon>🤝</CultureIcon>
              <CultureTitle>{t('careers.values.1.title')}</CultureTitle>
              <CultureText>{t('careers.values.1.desc')}</CultureText>
            </CultureCard>
            <CultureCard>
              <CultureIcon>🌍</CultureIcon>
              <CultureTitle>{t('careers.values.2.title')}</CultureTitle>
              <CultureText>{t('careers.values.2.desc')}</CultureText>
            </CultureCard>
          </CultureGrid>
        </Section>

        <Section>
          <SectionTitle>{t('careers.jobs.title')}</SectionTitle>
          <JobList>
            {JOBS.map((job) => (
              <JobCard key={job.id}>
                <JobInfo>
                  <JobTitle>{job.title}</JobTitle>
                  <JobMeta>
                    <span>{job.department}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                    <JobTag>{job.type}</JobTag>
                  </JobMeta>
                </JobInfo>
                <ApplyButton>{t('careers.jobs.apply')}</ApplyButton>
              </JobCard>
            ))}
          </JobList>
        </Section>

      <CallToAction 
        title={t('careers.cta.title')}
        description={t('careers.cta.description')}
        buttonText={t('careers.cta.button')}
        buttonLink="/contact"
      />
      </MainContent>
       
      <FooterClean />
    </PageContainer>
  );
};

export default CareersPageNew;
