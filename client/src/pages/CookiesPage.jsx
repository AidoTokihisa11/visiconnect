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

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 80px 24px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${COLORS.dark};
  margin-bottom: 16px;
`;

const Section = styled.section`
  background: ${COLORS.white};
  padding: 40px;
  border-radius: 12px;
  border: 1px solid ${COLORS.border};
  margin-top: 32px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

const SubHeading = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${COLORS.dark};
  margin-top: 32px;
  margin-bottom: 16px;

  &:first-child {
    margin-top: 0;
  }
`;

const Text = styled.p`
  color: ${COLORS.text};
  line-height: 1.7;
  margin-bottom: 16px;
`;

const List = styled.ul`
  margin-left: 24px;
  margin-bottom: 24px;
  color: ${COLORS.text};
  line-height: 1.7;
`;

const ListItem = styled.li`
  margin-bottom: 8px;
`;

const ContactInfo = styled.div`
  margin-top: 24px;
  padding: 16px;
  background-color: hsl(var(--muted));
  border-radius: 8px;
  color: ${COLORS.secondary};
  transition: background-color 0.3s ease;
`;

const CookiesPage = () => {
  return (
    <PageContainer>
      <HeaderClean />
      <MainContent>
        <ContentWrapper>
          <Title>Politique des Cookies</Title>
          <p style={{ color: COLORS.lightText, fontSize: '1.1rem' }}>
            Dernière mise à jour : 21 Février 2026
          </p>

          <Section>
            <SubHeading>1. Introduction</SubHeading>
            <Text>
              Chez Visiconnect, nous croyons en la transparence sur la façon dont nous utilisons vos données. Cette politique fournit des informations détaillées sur la manière et le moment où nous utilisons des cookies.
            </Text>

            <SubHeading>2. Qu'est-ce qu'un cookie ?</SubHeading>
            <Text>
              Les cookies sont de petits fichiers texte envoyés par nous à votre ordinateur ou appareil mobile. Ils sont propres à votre compte ou à votre navigateur. Les cookies basés sur la session durent uniquement tant que votre navigateur est ouvert et sont automatiquement supprimés lorsque vous le fermez. Les cookies persistants durent jusqu'à ce que vous ou votre navigateur les supprimiez ou jusqu'à leur expiration.
            </Text>

            <SubHeading>3. Comment utilisons-nous les cookies ?</SubHeading>
            <Text>
              Nous utilisons des cookies pour les objectifs suivants :
            </Text>
            <List>
              <ListItem><strong>Authentification :</strong> Pour vous identifier lorsque vous visitez notre site et que vous vous connectez.</ListItem>
              <ListItem><strong>Sécurité :</strong> Pour prévenir les risques de sécurité et détecter les activités malveillantes.</ListItem>
              <ListItem><strong>Préférences :</strong> Pour mémoriser vos paramètres et préférences, comme votre langue préférée.</ListItem>
              <ListItem><strong>Performance :</strong> Pour comprendre comment vous utilisez nos services et améliorer l'expérience utilisateur.</ListItem>
            </List>

            <SubHeading>4. Vos choix</SubHeading>
            <Text>
              Vous avez le droit de décider d'accepter ou de refuser les cookies. Vous pouvez exercer vos préférences en matière de cookies via les paramètres de votre navigateur. Notez que si vous choisissez de refuser les cookies, vous pourrez toujours utiliser notre site web, bien que votre accès à certaines fonctionnalités et zones de notre site puisse être restreint.
            </Text>

            <SubHeading>5. Nous contacter</SubHeading>
            <Text>
              Si vous avez des questions concernant notre utilisation des cookies ou d'autres technologies, veuillez nous envoyer un e-mail :
            </Text>
            <ContactInfo>
              <strong>Email :</strong> privacy@visiconnect.com<br />
              <strong>Adresse :</strong> 123 Avenue de l'Innovation, 75001 Paris, France
            </ContactInfo>
          </Section>
        </ContentWrapper>
      </MainContent>
      <FooterClean />
    </PageContainer>
  );
};

export default CookiesPage;
