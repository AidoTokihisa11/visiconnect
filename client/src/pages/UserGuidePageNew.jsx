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
  transition: background-color 0.3s ease, color 0.3s ease;

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
  transition: transform 0.2s, background-color 0.3s ease, border-color 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
  }
`;

const CategoryIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 16px;
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

const GuideLink = styled.li`
  padding: 8px 0;
  border-bottom: 1px solid #f1f5f9;
  color: ${COLORS.text};
  font-size: 0.95rem;
  display: flex;
  justify-content: space-between;
  
  &:last-child {
    border-bottom: none;
  }

  &:hover {
    color: ${COLORS.primary}; 
  }

  &::after {
    content: '→';
    opacity: 0;
    transition: opacity 0.2s;
  }

  ${Card}:hover &::after {
    opacity: 0.5;
  }
`;

const guides = [
  {
    category: "Premiers pas",
    icon: "🚀",
    articles: [
      "Créer votre compte",
      "Configurer votre profil",
      "Lancer votre première réunion",
      "Inviter des participants"
    ]
  },
  {
    category: "Pendant la réunion",
    icon: "🎥",
    articles: [
      "Partager votre écran",
      "Utiliser le tableau blanc",
      "Enregistrer la session",
      "Gérer les participants"
    ]
  },
  {
    category: "Fonctionnalités avancées",
    icon: "⚡",
    articles: [
      "Transcription en direct",
      "Traduction automatique",
      "Intégrations (Slack, Calendar)",
      "Mode webinaire"
    ]
  },
  {
    category: "Paramètres & Compte",
    icon: "⚙️",
    articles: [
      "Gérer les notifications",
      "Facturation et abonnements",
      "Sécurité et confidentialité",
      "Supprimer mon compte"
    ]
  },
  {
    category: "Résolution de problèmes",
    icon: "🔧",
    articles: [
      "Problèmes audio/vidéo",
      "Problèmes de connexion",
      "Navigateurs supportés",
      "Contacter le support"
    ]
  }
];

const UserGuidePageNew = () => {
  return (
    <PageContainer>
      <HeaderClean />
      <MainContent>
        <Hero>
          <Title>Guide Utilisateur</Title>
          <Subtitle>Tout ce que vous devez savoir pour maîtriser VisioConnect.</Subtitle>
          <SearchBar placeholder="Rechercher un article..." />
        </Hero>

        <Section>
          <Grid>
            {guides.map((section, idx) => (
              <Card key={idx}>
                <CategoryIcon>{section.icon}</CategoryIcon>
                <CategoryTitle>{section.category}</CategoryTitle>
                <GuideList>
                  {section.articles.map((article, i) => (
                    <GuideLink key={i}>{article}</GuideLink>
                  ))}
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
