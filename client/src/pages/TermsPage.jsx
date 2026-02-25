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
  padding: 80px 20px;
  display: flex;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  background-color: ${COLORS.white};
  padding: 60px;
  border-radius: 16px;
  border: 1px solid ${COLORS.border};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s ease, border-color 0.3s ease;

  @media (max-width: 768px) {
    padding: 30px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${COLORS.dark};
  margin-bottom: 40px;
  border-bottom: 2px solid ${COLORS.border};
  padding-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${COLORS.secondary};
  margin-top: 40px;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  color: ${COLORS.text};
  line-height: 1.8;
  margin-bottom: 20px;
  font-size: 1.05rem;
`;

const List = styled.ul`
  margin-left: 20px;
  margin-bottom: 20px;
  color: ${COLORS.text};
`;

const ListItem = styled.li`
  margin-bottom: 10px;
  line-height: 1.6;
`;

const TermsPage = () => {
  return (
    <PageContainer>
      <HeaderClean />
      <MainContent>
        <ContentWrapper>
          <Title>Conditions d'Utilisation</Title>
          
          <Paragraph>
            Dernière mise à jour : 21 Février 2026
          </Paragraph>

          <Paragraph>
            Bienvenue sur VisiConnect. En accédant ou en utilisant notre site web et nos services, vous acceptez d'être lié par les présentes Conditions d'Utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.
          </Paragraph>

          <SectionTitle>1. Accès aux Services</SectionTitle>
          <Paragraph>
            VisiConnect vous accorde une licence limitée, non exclusive et révocable pour utiliser ses services conformément à ces conditions. Vous vous engagez à ne pas utiliser le service à des fins illégales ou interdites par ces conditions.
          </Paragraph>

          <SectionTitle>2. Comptes Utilisateurs</SectionTitle>
          <Paragraph>
            Pour accéder à certaines fonctionnalités, vous devez créer un compte. Vous êtes responsable de la confidentialité de votre compte et de votre mot de passe, ainsi que de toutes les activités qui se produisent sous votre compte.
          </Paragraph>

          <SectionTitle>3. Utilisation Acceptable</SectionTitle>
          <Paragraph>
            Vous acceptez de ne pas :
          </Paragraph>
          <List>
            <ListItem>Utiliser le service pour transmettre du contenu illégal ou nuisible.</ListItem>
            <ListItem>Tenter d'accéder sans autorisation à nos systèmes ou réseaux.</ListItem>
            <ListItem>Interférer avec l'utilisation du service par d'autres utilisateurs.</ListItem>
            <ListItem>Revendre ou exploiter commercialement le service sans autorisation.</ListItem>
          </List>

          <SectionTitle>4. Propriété Intellectuelle</SectionTitle>
          <Paragraph>
            Le service et son contenu original, ses caractéristiques et ses fonctionnalités sont et resteront la propriété exclusive de VisiConnect et de ses concédants de licence.
          </Paragraph>

          <SectionTitle>5. Limitation de Responsabilité</SectionTitle>
          <Paragraph>
            En aucun cas VisiConnect ne pourra être tenu responsable des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs, y compris, sans s'y limiter, la perte de profits, de données, d'utilisation, de clientèle ou d'autres pertes intangibles.
          </Paragraph>

          <SectionTitle>6. Modifications des Conditions</SectionTitle>
          <Paragraph>
            Nous nous réservons le droit, à notre seule discrétion, de modifier ou de remplacer ces conditions à tout moment. Si une révision est importante, nous essaierons de fournir un préavis d'au moins 30 jours avant l'entrée en vigueur des nouvelles conditions.
          </Paragraph>
        </ContentWrapper>
      </MainContent>
      <FooterClean />
    </PageContainer>
  );
};

export default TermsPage;
