import React from 'react';
import styled from 'styled-components';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';

const COLORS = {
  primary: 'hsl(var(--primary))',    
  primaryHover: 'hsl(var(--primary))',
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
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 50px;
  width: 100%;
  max-width: 800px;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: ${COLORS.dark};
  margin-bottom: 20px;

  span {
    color: ${COLORS.primary};
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${COLORS.lightText};
  margin-bottom: 40px;
`;

const SearchContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 16px 24px;
  padding-right: 50px;
  border-radius: 50px;
  border: 1px solid ${COLORS.border};
  font-size: 1.1rem;
  outline: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  background-color: ${COLORS.white};
  color: ${COLORS.text};
  transition: all 0.2s ease, background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;

  &:focus {
    border-color: ${COLORS.primary};
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: ${COLORS.lightText};
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  width: 100%;
  max-width: 1000px;
  margin-top: 60px;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryCard = styled.a`
  background-color: ${COLORS.white};
  padding: 30px;
  border-radius: 16px;
  border: 1px solid ${COLORS.border};
  text-decoration: none;
  transition: all 0.2s ease, background-color 0.3s ease, border-color 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 15px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
    border-color: ${COLORS.primary};
  }
`;

const IconBox = styled.div`
  width: 48px;
  height: 48px;
  background-color: ${props => props.bgColor || '#eff6ff'};
  color: ${props => props.color || COLORS.primary};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;

const CategoryTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${COLORS.dark};
  margin: 0;
`;

const CategoryDesc = styled.p`
  color: ${COLORS.lightText};
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
`;

const ContactSection = styled.div`
  background-color: ${COLORS.white};
  width: 100%;
  max-width: 800px;
  padding: 40px;
  border-radius: 20px;
  border: 1px solid ${COLORS.border};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

const ContactTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${COLORS.dark};
`;

const ContactText = styled.p`
  color: ${COLORS.lightText};
  max-width: 500px;
  margin-bottom: 10px;
`;

const ContactButton = styled.button`
  background-color: ${COLORS.dark};
  color: ${COLORS.white};
  padding: 14px 28px;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1e293b;
  }
`;

const SupportPageNew = () => {
  return (
    <PageContainer>
      <HeaderClean />
      <MainContent>
        <HeroSection>
          <Title>Centre d'<span>Aide</span></Title>
          <Subtitle>Comment pouvons-nous vous aider aujourd'hui ?</Subtitle>
          <SearchContainer>
            <SearchInput placeholder="Rechercher des articles, des guides..." />
            <SearchIcon>🔍</SearchIcon>
          </SearchContainer>
        </HeroSection>

        <CategoriesGrid>
          <CategoryCard href="#getting-started">
            <IconBox bgColor="#eff6ff" color="#2563eb">🚀</IconBox>
            <CategoryTitle>Premiers Pas</CategoryTitle>
            <CategoryDesc>Tout ce qu'il faut savoir pour bien démarrer avec VisiConnect.</CategoryDesc>
          </CategoryCard>
          
          <CategoryCard href="#troubleshooting">
            <IconBox bgColor="#fef2f2" color="#dc2626">🛠️</IconBox>
            <CategoryTitle>Dépannage</CategoryTitle>
            <CategoryDesc>Solutions aux problèmes communs et erreurs techniques.</CategoryDesc>
          </CategoryCard>

          <CategoryCard href="#account">
            <IconBox bgColor="#f0fdf4" color="#16a34a">👤</IconBox>
            <CategoryTitle>Compte & Profil</CategoryTitle>
            <CategoryDesc>Gérer vos paramètres de compte, mot de passe et préférences.</CategoryDesc>
          </CategoryCard>

          <CategoryCard href="#billing">
            <IconBox bgColor="#fff7ed" color="#ea580c">💳</IconBox>
            <CategoryTitle>Facturation</CategoryTitle>
            <CategoryDesc>Comprendre vos factures, abonnements et méthodes de paiement.</CategoryDesc>
          </CategoryCard>
        </CategoriesGrid>

        <ContactSection>
          <ContactTitle>Vous ne trouvez pas votre réponse ?</ContactTitle>
          <ContactText>
            Notre équipe de support est disponible 24/7 pour vous aider à résoudre vos problèmes les plus complexes.
          </ContactText>
          <ContactButton>Contacter le Support</ContactButton>
        </ContactSection>
      </MainContent>
      <FooterClean />
    </PageContainer>
  );
};

export default SupportPageNew;
