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
  warning: '#f59e0b',
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
  padding: 80px 20px 60px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const HeaderSection = styled.div`
  margin-bottom: 60px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${COLORS.dark};
  margin-bottom: 16px;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: ${COLORS.lightText};
  max-width: 600px;
  margin: 0 auto 32px;
`;

const SearchBar = styled.div`
  max-width: 500px;
  margin: 0 auto;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 16px 24px;
  padding-right: 50px;
  border-radius: 9999px;
  border: 1px solid ${COLORS.border};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  font-size: 1rem;
  box-sizing: border-box;
  background-color: ${COLORS.white};
  color: ${COLORS.text};
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${COLORS.primary};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: ${COLORS.lightText};
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 30px;
  margin-bottom: 60px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const CategoryCard = styled.div`
  background: ${COLORS.white};
  padding: 32px;
  border-radius: 12px;
  border: 1px solid ${COLORS.border};
  transition: all 0.2s, background-color 0.3s ease, border-color 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &:hover {
    border-color: ${COLORS.primary};
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
  }
`;

const IconBox = styled.div`
  width: 48px;
  height: 48px;
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${COLORS.dark};
  margin-bottom: 8px;
`;

const CardDesc = styled.p`
  color: ${COLORS.lightText};
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 20px;
  flex: 1;
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const LinkItem = styled.li`
  margin-bottom: 8px;
  
  a {
    color: ${COLORS.primary};
    text-decoration: none;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    
    &:before {
        content: '→';
        margin-right: 8px;
        transition: transform 0.2s;
    }

    &:hover {
        text-decoration: underline;
        &:before {
            transform: translateX(4px);
        }
    }
  }
`;

const HelpSection = styled.div`
  background-color: hsl(var(--muted));
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  border: 1px solid ${COLORS.border};
  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

const DocsPage = () => {
    return (
        <PageContainer>
            <HeaderClean />
            <MainContent>
                <HeaderSection>
                    <Title>Documentation</Title>
                    <Subtitle>
                        Tout ce dont vous avez besoin pour configurer, utiliser et intégrer Visiconnect dans votre entreprise.
                    </Subtitle>
                    <SearchBar>
                        <SearchInput type="text" placeholder="Rechercher dans la documentation..." />
                        <SearchIcon>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </SearchIcon>
                    </SearchBar>
                </HeaderSection>

                <CategoriesGrid>
                    <CategoryCard>
                        <IconBox bgColor="#ecfdf5" color="#059669">📚</IconBox>
                        <CardTitle>Manuel Utilisateur</CardTitle>
                        <CardDesc>
                            Guides pas à pas pour maîtriser les fonctionnalités de base : appels, messagerie, partage d'écran.
                        </CardDesc>
                        <LinkList>
                            <LinkItem><a href="#start">Premiers pas</a></LinkItem>
                            <LinkItem><a href="#meetings">Gérer une réunion</a></LinkItem>
                            <LinkItem><a href="#account">Gestion du compte</a></LinkItem>
                        </LinkList>
                    </CategoryCard>

                    <CategoryCard>
                        <IconBox bgColor="#eff6ff" color="#2563eb">⚙️</IconBox>
                        <CardTitle>API & Intégrations</CardTitle>
                        <CardDesc>
                            Documentation technique pour les développeurs souhaitant intégrer Visiconnect à leurs outils.
                        </CardDesc>
                        <LinkList>
                            <LinkItem><a href="#api-ref">Référence API REST</a></LinkItem>
                            <LinkItem><a href="#webhooks">Webhooks</a></LinkItem>
                            <LinkItem><a href="#auth">Authentification</a></LinkItem>
                        </LinkList>
                    </CategoryCard>

                    <CategoryCard>
                        <IconBox bgColor="#fff7ed" color="#ea580c">🛡️</IconBox>
                        <CardTitle>Administration & Sécurité</CardTitle>
                        <CardDesc>
                            Ressources pour les administrateurs système : déploiement, SSO, et gestion des utilisateurs.
                        </CardDesc>
                        <LinkList>
                            <LinkItem><a href="#deploy">Guide de déploiement</a></LinkItem>
                            <LinkItem><a href="#security">Protocoles de sécurité</a></LinkItem>
                            <LinkItem><a href="#sso">Configuration SSO</a></LinkItem>
                        </LinkList>
                    </CategoryCard>
                </CategoriesGrid>

                <HelpSection>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: COLORS.dark, marginBottom: '16px' }}>
                        Besoin d'aide supplémentaire ?
                    </h3>
                    <p style={{ color: COLORS.text, marginBottom: '24px' }}>
                        Si vous ne trouvez pas la réponse à votre question, notre équipe de support est là pour vous aider 24/7.
                    </p>
                    <button style={{ 
                        backgroundColor: COLORS.white, 
                        color: COLORS.primary, 
                        border: `1px solid ${COLORS.primary}`, 
                        padding: '10px 24px', 
                        borderRadius: '6px',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}>
                        Contacter le Support
                    </button>
                </HelpSection>
            </MainContent>
            <FooterClean />
        </PageContainer>
    );
};

export default DocsPage;
