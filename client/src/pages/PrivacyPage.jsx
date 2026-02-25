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

const PrivacyPage = () => {
  return (
    <PageContainer>
      <HeaderClean />
      <MainContent>
        <ContentWrapper>
          <Title>Politique de Confidentialité</Title>
          
          <Paragraph>
            Dernière mise à jour : 21 Février 2026
          </Paragraph>

          <Paragraph>
            Chez VisiConnect, nous prenons votre confidentialité très au sérieux. Cette politique décrit comment nous recueillons, utilisons et protégeons vos informations personnelles lorsque vous utilisez nos services de visioconférence et de collaboration.
          </Paragraph>

          <SectionTitle>1. Collecte des Informations</SectionTitle>
          <Paragraph>
            Nous recueillons différents types d'informations pour vous fournir et améliorer notre Service :
          </Paragraph>
          <List>
            <ListItem>Des informations d'identification personnelle (Nom, adresse email, numéro de téléphone, etc.).</ListItem>
            <ListItem>Des données d'utilisation (adresse IP, type de navigateur, pages visitées).</ListItem>
            <ListItem>Des cookies et technologies de suivi pour améliorer votre expérience utilisateur.</ListItem>
          </List>

          <SectionTitle>2. Utilisation des Données</SectionTitle>
          <Paragraph>
            VisiConnect utilise les données collectées pour diverses finalités :
          </Paragraph>
          <List>
            <ListItem>Pour fournir et maintenir notre Service.</ListItem>
            <ListItem>Pour vous notifier des changements apportés à notre Service.</ListItem>
            <ListItem>Pour vous permettre d'utiliser les fonctionnalités interactives de notre Service.</ListItem>
            <ListItem>Pour fournir un support client et technique.</ListItem>
            <ListItem>Pour recueillir des analyses ou des informations précieuses afin d'améliorer notre Service.</ListItem>
          </List>

          <SectionTitle>3. Sécurité des Données</SectionTitle>
          <Paragraph>
            La sécurité de vos données est importante pour nous. Nous utilisons des protocoles de chiffrement avancés (tels que TLS/SSL) pour protéger vos informations lors de leur transmission sur Internet. Cependant, n'oubliez pas qu'aucune méthode de transmission sur Internet ou de stockage électronique n'est sûre à 100 %.
          </Paragraph>

          <SectionTitle>4. Vos Droits</SectionTitle>
          <Paragraph>
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez de droits concernant vos données personnelles, notamment le droit d'accès, de rectification, de suppression et de limitation du traitement. Pour exercer ces droits, veuillez nous contacter via notre page de support.
          </Paragraph>

          <SectionTitle>5. Modifications de cette Politique</SectionTitle>
          <Paragraph>
            Nous pouvons mettre à jour notre Politique de Confidentialité de temps à autre. Nous vous informerons de tout changement en publiant la nouvelle Politique de Confidentialité sur cette page.
          </Paragraph>
        </ContentWrapper>
      </MainContent>
      <FooterClean />
    </PageContainer>
  );
};

export default PrivacyPage;
