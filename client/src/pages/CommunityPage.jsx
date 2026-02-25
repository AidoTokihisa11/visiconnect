import React from 'react';
import styled from 'styled-components';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';

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
  discord: '#5865F2',
  twitter: '#1DA1F2',
  linkedin: '#0A66C2',
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
  padding-top: 80px;
`;

const Hero = styled.section`
  background-color: ${COLORS.white};
  padding: 80px 24px;
  text-align: center;
  border-bottom: 1px solid ${COLORS.border};
  transition: background-color 0.3s ease, border-color 0.3s ease;
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

const CommunityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  max-width: 1000px;
  margin: 64px auto;
  padding: 0 24px;
`;

const CommunityCard = styled.div`
  background: ${COLORS.white};
  border: 1px solid ${COLORS.border};
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  transition: transform 0.2s, background-color 0.3s ease, border-color 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${props => props.bgColor || '#f1f5f9'};
  color: ${COLORS.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  margin: 0 auto 24px auto;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${COLORS.dark};
  margin-bottom: 12px;
`;

const CardText = styled.p`
  color: ${COLORS.text};
  margin-bottom: 24px;
  line-height: 1.5;
`;

const ActionButton = styled.a`
  display: inline-block;
  background-color: ${props => props.color || COLORS.primary};
  color: ${COLORS.white};
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const ForumSection = styled.div`
  background-color: ${COLORS.white};
  max-width: 800px;
  margin: 0 auto 64px auto;
  padding: 40px;
  border-radius: 16px;
  border: 1px solid ${COLORS.border};
`;

const ForumHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${COLORS.border};
`;

const TopicList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TopicItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #f8fafc;
  border-radius: 8px;
  
  &:hover {
    background-color: #f1f5f9;
  }
`;

const TopicTitle = styled.div`
  font-weight: 500;
  color: ${COLORS.primary};
  cursor: pointer;
`;

const TopicMeta = styled.div`
  color: ${COLORS.lightText};
  font-size: 0.875rem;
`;

const CommunityPage = () => {
  return (
    <PageContainer>
      <HeaderClean />
      <MainContent>
        <Hero>
          <Title>Communauté Visiconnect</Title>
          <Subtitle>Rejoignez des milliers de créateurs, développeurs et professionnels.</Subtitle>
        </Hero>

        <CommunityGrid>
          <CommunityCard>
            <IconWrapper bgColor={COLORS.discord}>💬</IconWrapper>
            <CardTitle>Discord</CardTitle>
            <CardText>Rejoignez notre serveur pour discuter en direct avec l'équipe et la communauté.</CardText>
            <ActionButton href="#" color={COLORS.discord}>Rejoindre le serveur</ActionButton>
          </CommunityCard>

          <CommunityCard>
            <IconWrapper bgColor={COLORS.twitter}>🐦</IconWrapper>
            <CardTitle>X / Twitter</CardTitle>
            <CardText>Suivez-nous pour les dernières nouvelles et mises à jour.</CardText>
            <ActionButton href="#" color={COLORS.twitter}>Suivre @visiconnect</ActionButton>
          </CommunityCard>

          <CommunityCard>
            <IconWrapper bgColor={COLORS.linkedin}>💼</IconWrapper>
            <CardTitle>LinkedIn</CardTitle>
            <CardText>Restez connecté avec notre actualité professionnelle.</CardText>
            <ActionButton href="#" color={COLORS.linkedin}>Nous suivre</ActionButton>
          </CommunityCard>
        </CommunityGrid>

        <ForumSection>
          <ForumHeader>
            <CardTitle style={{ marginBottom: 0 }}>Dernières discussions du Forum</CardTitle>
            <ActionButton href="#" style={{ fontSize: '0.9rem', padding: '8px 16px' }}>Voir tout</ActionButton>
          </ForumHeader>
          <TopicList>
            <TopicItem>
              <TopicTitle>Comment intégrer Visiconnect dans une app React ?</TopicTitle>
              <TopicMeta>32 rép • il y a 2h</TopicMeta>
            </TopicItem>
            <TopicItem>
              <TopicTitle>Meilleures pratiques pour les webinaires de +500 personnes</TopicTitle>
              <TopicMeta>15 rép • il y a 4h</TopicMeta>
            </TopicItem>
            <TopicItem>
              <TopicTitle>Idée de fonctionnalité : Tableau blanc infini</TopicTitle>
              <TopicMeta>89 rép • il y a 1j</TopicMeta>
            </TopicItem>
            <TopicItem>
              <TopicTitle>Partagez vos configurations de télétravail !</TopicTitle>
              <TopicMeta>124 rép • il y a 2j</TopicMeta>
            </TopicItem>
          </TopicList>
        </ForumSection>
      </MainContent>
      <FooterClean />
    </PageContainer>
  );
};

export default CommunityPage;
