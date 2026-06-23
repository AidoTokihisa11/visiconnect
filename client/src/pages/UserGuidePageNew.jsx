import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Rocket, Video as VideoIcon, Zap, Settings, LifeBuoy } from 'lucide-react';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';
import { useTranslation } from '../hooks/useTranslation';

// Map each (sectionIndex, itemIndex) to a real route or anchor.
// External anchors (with #) point to the relevant section of an existing page.
// Routes/anchors that don't exist yet fall back to the most relevant existing page.
const GUIDE_LINK_MAP = {
  // Premiers pas
  '0-0': '/signup',
  '0-1': '/account',
  '0-2': '/demo',
  '0-3': '/account#meetings',
  // Pendant la réunion
  '1-0': '/user-guide#screen-share',
  '1-1': '/user-guide#whiteboard',
  '1-2': '/user-guide#recording',
  '1-3': '/user-guide#participants',
  // Fonctionnalités avancées
  '2-0': '/user-guide#transcription',
  '2-1': '/user-guide#translation',
  '2-2': '/integrations',
  '2-3': '/user-guide#webinar',
  // Paramètres & Compte
  '3-0': '/account#notifications',
  '3-1': '/account#billing',
  '3-2': '/security',
  '3-3': '/account#delete',
  // Résolution de problèmes
  '4-0': '/support#audio-video',
  '4-1': '/support#connection',
  '4-2': '/support#browsers',
  '4-3': '/contact',
};

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
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 80px;
`;

const Hero = styled.section`
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
  padding: 60px 24px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 16px;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
`;

const SearchBar = styled.input`
  width: 100%;
  max-width: 500px;
  padding: 16px 24px;
  border-radius: 9999px;
  border: none;
  margin-top: 32px;
  font-size: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  outline: none;
  background-color: ${COLORS.white};
  color: ${COLORS.text};
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  &::placeholder {
    color: #94a3b8;
  }
`;

const Section = styled.div`
  max-width: 1000px;
  margin: 64px auto;
  padding: 0 24px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 32px;
`;

const Card = styled.div`
  background: ${COLORS.white};
  border-radius: 12px;
  border: 1px solid ${COLORS.border};
  padding: 24px;
  transition:
    transform 0.2s,
    background-color 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px -10px rgba(0, 0, 0, 0.15);
  }
`;

const CategoryIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
  background: rgba(37, 99, 235, 0.08);
  color: ${COLORS.primary};
`;

const CategoryTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${COLORS.dark};
  margin-bottom: 12px;
`;

const GuideList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const GuideLink = styled(Link)`
  padding: 10px 0;
  border-bottom: 1px solid #f1f5f9;
  color: ${COLORS.text};
  font-size: 0.95rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  transition:
    color 0.2s,
    padding-left 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    color: ${COLORS.primary};
    padding-left: 4px;
  }

  &::after {
    content: '→';
    opacity: 0.3;
    transition:
      opacity 0.2s,
      transform 0.2s;
  }

  &:hover::after {
    opacity: 1;
    transform: translateX(2px);
  }
`;

const SECTION_ICONS = [Rocket, VideoIcon, Zap, Settings, LifeBuoy];
const itemCounts = [4, 4, 4, 4, 4];

const UserGuidePageNew = () => {
  const { t } = useTranslation();
  return (
    <PageContainer>
      <HeaderClean />
      <MainContent>
        <Hero>
          <Title>{t('userGuide.hero.title')}</Title>
          <Subtitle>{t('userGuide.hero.subtitle')}</Subtitle>
          <SearchBar placeholder={t('userGuide.search')} />
        </Hero>

        <Section>
          <Grid>
            {SECTION_ICONS.map((Icon, idx) => (
              <Card key={idx}>
                <CategoryIcon>
                  <Icon size={22} strokeWidth={2} />
                </CategoryIcon>
                <CategoryTitle>{t(`userGuide.sections.${idx}.title`)}</CategoryTitle>
                <GuideList>
                  {Array.from({ length: itemCounts[idx] }).map((_, i) => {
                    const target = GUIDE_LINK_MAP[`${idx}-${i}`] || '/support';
                    return (
                      <GuideLink key={i} to={target}>
                        {t(`userGuide.sections.${idx}.items.${i}`)}
                      </GuideLink>
                    );
                  })}
                </GuideList>
              </Card>
            ))}
          </Grid>
        </Section>
      </MainContent>
      <FooterClean />
    </PageContainer>
  );
};

export default UserGuidePageNew;
