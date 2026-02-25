import React from 'react';
import styled from 'styled-components';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';

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
  padding-top: 80px; /* Header height */
`;

const Hero = styled.section`
  background-color: hsl(var(--secondary));
  padding: 80px 24px;
  text-align: center;
  border-bottom: 1px solid ${COLORS.border};
  transition: background-color 0.3s ease;
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

const JOBS = [
  { id: 1, title: 'Développeur Full Stack Senior', department: 'Ingéniosité', location: 'Paris / Télétravail', type: 'CDI' },
  { id: 2, title: 'Product Manager', department: 'Produit', location: 'Paris', type: 'CDI' },
  { id: 3, title: 'Customer Success Manager', department: 'Sales', location: 'Lyon', type: 'CDI' },
  { id: 4, title: 'DevOps Engineer', department: 'Infrastructure', location: 'Télétravail', type: 'Freelance' },
];

const CareersPageNew = () => {
  return (
    <PageContainer>
      <HeaderClean />
      <MainContent>
        <Hero>
          <Title>Rejoignez l'aventure Visiconnect</Title>
          <Subtitle>Construisez avec nous le futur de la collaboration vidéo.</Subtitle>
        </Hero>

        <Section>
          <SectionTitle>Nos Valeurs</SectionTitle>
          <CultureGrid>
            <CultureCard>
              <CultureIcon>🚀</CultureIcon>
              <CultureTitle>Innovation</CultureTitle>
              <CultureText>Nous repoussons constamment les limites de la technologie pour offrir la meilleure expérience.</CultureText>
            </CultureCard>
            <CultureCard>
              <CultureIcon>🤝</CultureIcon>
              <CultureTitle>Transparence</CultureTitle>
              <CultureText>Nous croyons en une communication ouverte et honnête, tant en interne qu'avec nos utilisateurs.</CultureText>
            </CultureCard>
            <CultureCard>
              <CultureIcon>🌍</CultureIcon>
              <CultureTitle>Impact</CultureTitle>
              <CultureText>Nous cherchons à avoir un impact positif sur la façon dont le monde travaille et communique.</CultureText>
            </CultureCard>
          </CultureGrid>
        </Section>

        <Section>
          <SectionTitle>Postes Ouverts</SectionTitle>
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
                <ApplyButton>Postuler</ApplyButton>
              </JobCard>
            ))}
          </JobList>
        </Section>
      </MainContent>
      <FooterClean />
    </PageContainer>
  );
};

export default CareersPageNew;
