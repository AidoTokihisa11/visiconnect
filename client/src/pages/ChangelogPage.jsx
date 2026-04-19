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
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
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

const SectionHeader = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;

  h1 {
    font-size: 3rem;
    font-weight: 800;
    color: ${COLORS.dark};
    margin-bottom: 16px;
  }

  p {
    font-size: 1.25rem;
    color: ${COLORS.lightText};
    max-width: 600px;
    margin: 0 auto;
    
    a {
        color: ${COLORS.primary};
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 60px auto;
  padding: 0 24px;
`;

const TimelineContainer = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  
  &::after {
    content: '';
    position: absolute;
    width: 2px;
    background-color: ${COLORS.border};
    top: 0;
    bottom: 0;
    left: 20px;
    margin-left: -1px;
    
    @media (min-width: 768px) {
        left: 50%;
    }
  }
`;

const TimelineItem = styled.div`
  padding: 10px 40px;
  position: relative;
  background-color: inherit;
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 768px) {
    width: 50%;
    left: ${props => props.position === 'left' ? '0' : '50%'};
    text-align: ${props => props.position === 'left' ? 'right' : 'left'};
    padding: ${props => props.position === 'left' ? '10px 40px 10px 0' : '10px 0 10px 40px'};
  }

  /* The circle on the timeline */
  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    right: auto;
    left: 10px; /* Adjusted for mobile line position */
    background-color: ${COLORS.white};
    border: 4px solid ${COLORS.primary};
    top: 15px;
    border-radius: 50%;
    z-index: 1;

    @media (min-width: 768px) {
        left: ${props => props.position === 'left' ? 'auto' : '-10px'};
        right: ${props => props.position === 'left' ? '-10px' : 'auto'};
    }
  }
`;

const Content = styled.div`
  padding: 20px 30px;
  background-color: ${COLORS.white};
  position: relative;
  border-radius: 8px;
  border: 1px solid ${COLORS.border};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  text-align: left; /* Always left align content inside the card */
  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

const VersionTag = styled.span`
  display: inline-block;
  padding: 4px 12px;
  background-color: ${props => props.latest ? COLORS.primary : COLORS.background};
  color: ${props => props.latest ? COLORS.white : COLORS.text};
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 8px;
`;

const DateText = styled.span`
  display: block;
  font-size: 0.875rem;
  color: ${COLORS.lightText};
  margin-bottom: 8px;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${COLORS.dark};
  margin-bottom: 12px;
`;

const List = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  margin: 0;
  
  li {
    color: ${COLORS.text};
    margin-bottom: 6px;
    font-size: 1rem;
    line-height: 1.5;
  }
`;

const ChangelogPage = () => {
    const { t } = useTranslation();

    const changes = [
        {
            version: t('changelog.versions.0.version'),
            date: t('changelog.versions.0.date'),
            title: t('changelog.versions.0.title'),
            notes: [
                t('changelog.versions.0.notes.0'),
                t('changelog.versions.0.notes.1'),
                t('changelog.versions.0.notes.2'),
                t('changelog.versions.0.notes.3'),
            ],
            latest: true
        },
        {
            version: t('changelog.versions.1.version'),
            date: t('changelog.versions.1.date'),
            title: t('changelog.versions.1.title'),
            notes: [
                t('changelog.versions.1.notes.0'),
                t('changelog.versions.1.notes.1'),
                t('changelog.versions.1.notes.2'),
            ],
            latest: false
        },
        {
            version: t('changelog.versions.2.version'),
            date: t('changelog.versions.2.date'),
            title: t('changelog.versions.2.title'),
            notes: [
                t('changelog.versions.2.notes.0'),
                t('changelog.versions.2.notes.1'),
                t('changelog.versions.2.notes.2'),
            ],
            latest: false
        },
        {
            version: t('changelog.versions.3.version'),
            date: t('changelog.versions.3.date'),
            title: t('changelog.versions.3.title'),
            notes: [
                t('changelog.versions.3.notes.0'),
                t('changelog.versions.3.notes.1'),
                t('changelog.versions.3.notes.2'),
                t('changelog.versions.3.notes.3'),
            ],
            latest: false
        }
    ];

    return (
        <PageContainer>
            <HeaderClean />
            <MainContent>
                <Hero>
                    <SectionHeader>
                        <h1>{t('changelog.hero.title')}</h1>
                        <p>
                            {t('changelog.hero.subtitle')}
                        </p>
                    </SectionHeader>
                </Hero>

                <TimelineContainer>
                    {changes.map((change, index) => (
                        <TimelineItem key={change.version} position={index % 2 === 0 ? 'left' : 'right'}>
                            <Content>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <VersionTag latest={change.latest}>{change.version}</VersionTag>
                                    <DateText>{change.date}</DateText>
                                </div>
                                <Title>{change.title}</Title>
                                <List>
                                    {change.notes.map((note, i) => (
                                        <li key={i}>{note}</li>
                                    ))}
                                </List>
                            </Content>
                        </TimelineItem>
                    ))}
                </TimelineContainer>

                <CallToAction 
                    title={t('changelog.cta.title')}
                    description={t('changelog.cta.description')}
                    buttonText={t('changelog.cta.button')}
                    buttonLink="/contact"
                />
            </MainContent>
            <FooterClean />
        </PageContainer>
    );
};

export default ChangelogPage;
