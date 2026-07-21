import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Briefcase } from 'lucide-react';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';
import CallToAction from '../components/CallToAction';
import { useTranslation } from '../hooks/useTranslation';

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
  success: '#2563eb',
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
const HeroContent = styled.div`
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
const PanelLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${COLORS.lightText};
  margin-bottom: 1.25rem;
`;
const HeroCultureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
`;
const HeroCultureCard = styled.div`
  background: #fff;
  border: 1px solid ${COLORS.border};
  border-radius: 12px;
  padding: 0.85rem;
  text-align: center;
  font-size: 0.82rem;
  font-weight: 600;
  color: ${COLORS.dark};
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
  line-height: 1.6;
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
  transition:
    transform 0.2s,
    box-shadow 0.2s;
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
    {
      id: 1,
      title: t('careers.jobs.0.title'),
      department: t('careers.jobs.0.dept'),
      location: t('careers.jobs.0.location'),
      type: t('careers.jobs.0.type'),
    },
    {
      id: 2,
      title: t('careers.jobs.1.title'),
      department: t('careers.jobs.1.dept'),
      location: t('careers.jobs.1.location'),
      type: t('careers.jobs.1.type'),
    },
    {
      id: 3,
      title: t('careers.jobs.2.title'),
      department: t('careers.jobs.2.dept'),
      location: t('careers.jobs.2.location'),
      type: t('careers.jobs.2.type'),
    },
    {
      id: 4,
      title: t('careers.jobs.3.title'),
      department: t('careers.jobs.3.dept'),
      location: t('careers.jobs.3.location'),
      type: t('careers.jobs.3.type'),
    },
  ];

  return (
    <PageContainer>
      <HeaderClean />
      <MainContent>
        <Hero>
          <HeroInner>
            <HeroContent>
              <HeroEyebrow>
                <Briefcase size={14} />
                {t('careers.eyebrow') || 'Rejoignez-nous'}
              </HeroEyebrow>
              <Title style={{ color: COLORS.dark }}>{t('careers.hero.title')}</Title>
              <Subtitle>{t('careers.hero.subtitle')}</Subtitle>
            </HeroContent>
            <HeroPanel>
              <PanelLabel>Notre culture</PanelLabel>
              <HeroCultureGrid>
                {[
                  ['🌍', 'Remote First'],
                  ['🚀', 'Croissance rapide'],
                  ['🎯', 'Impact direct'],
                  ['❤️', 'Bien-être'],
                ].map(([e, l]) => (
                  <HeroCultureCard key={l}>
                    <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>{e}</div>
                    {l}
                  </HeroCultureCard>
                ))}
              </HeroCultureGrid>
            </HeroPanel>
          </HeroInner>
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
