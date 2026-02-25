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
  background: hsl(var(--card));
  color: hsl(var(--foreground));
  padding: 80px 24px;
  text-align: center;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 24px;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${COLORS.lightText}; // Will look grey on dark bg, maybe adjust
  color: #94a3b8; /* Slate 400 for contrast on dark bg */
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Section = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: 80px 24px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 48px;
  margin-bottom: 64px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background: ${COLORS.white};
  padding: 40px;
  border-radius: 16px;
  border: 1px solid ${COLORS.border};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

const FeatureIcon = styled.div`
  width: 48px;
  height: 48px;
  background-color: #eff6ff;
  color: ${COLORS.primary};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 24px;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${COLORS.dark};
  margin-bottom: 16px;
`;

const FeatureText = styled.p`
  color: ${COLORS.text};
  line-height: 1.7;
`;

const CertificationsSection = styled.div`
  background: ${COLORS.white};
  padding: 64px;
  border-radius: 24px;
  border: 1px solid ${COLORS.border};
  text-align: center;
`;

const BadgeGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 40px;
  flex-wrap: wrap;
`;

const Badge = styled.div`
  width: 120px;
  height: 120px;
  background-color: #f1f5f9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: ${COLORS.secondary};
  border: 4px solid #e2e8f0;
`;

const ContactBox = styled.div`
  background-color: ${COLORS.dark};
  color: ${COLORS.white};
  border-radius: 16px;
  padding: 48px;
  text-align: center;
  margin-top: 64px;
`;

const Button = styled.button`
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
  border: none;
  padding: 12px 32px;
  border-radius: 8px;
  font-weight: 600;
  margin-top: 24px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }
`;

const SecurityPage = () => {
  return (
    <PageContainer>
      <HeaderClean />
      <MainContent>
        <Hero>
          <Title>Sécurité et Conformité</Title>
          <Subtitle>
            La confidentialité de vos données est notre priorité absolue. Nous utilisons des technologies de pointe pour garantir que vos communications restent privées et sécurisées.
          </Subtitle>
        </Hero>

        <Section>
          <Grid>
            <FeatureCard>
              <FeatureIcon>🔒</FeatureIcon>
              <FeatureTitle>Chiffrement de bout en bout</FeatureTitle>
              <FeatureText>
                Toutes les conversations vidéo et audio sont chiffrées de bout en bout (E2EE) utilisant le protocole DTLS-SRTP. Personne, pas même Visiconnect, ne peut écouter vos réunions.
              </FeatureText>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>🛡️</FeatureIcon>
              <FeatureTitle>Infrastructure Sécurisée</FeatureTitle>
              <FeatureText>
                Nos serveurs sont hébergés dans des centres de données certifiés SOC 2 et ISO 27001, avec une surveillance 24/7 et des protections anti-DDoS robustes.
              </FeatureText>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>⚖️</FeatureIcon>
              <FeatureTitle>Conformité RGPD</FeatureTitle>
              <FeatureText>
                Nous respectons strictement le Règlement Général sur la Protection des Données (RGPD). Vos données personnelles vous appartiennent et nous offrons des outils complets pour les gérer.
              </FeatureText>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>🔑</FeatureIcon>
              <FeatureTitle>Contrôle d'accès avancé</FeatureTitle>
              <FeatureText>
                L'authentification multi-facteurs (MFA), le SSO (Single Sign-On) et la gestion granulaire des permissions permettent de sécuriser l'accès à votre organisation.
              </FeatureText>
            </FeatureCard>
          </Grid>

          <CertificationsSection>
            <FeatureTitle>Nos Certifications</FeatureTitle>
            <p style={{ color: COLORS.lightText }}>
              Nous sommes régulièrement audités par des tiers indépendants pour garantir le respect des normes de sécurité internationales les plus strictes.
            </p>
            <BadgeGrid>
              <Badge>ISO 27001</Badge>
              <Badge>SOC 2</Badge>
              <Badge>RGPD</Badge>
              <Badge>HIPAA</Badge>
            </BadgeGrid>
          </CertificationsSection>

          <ContactBox>
            <FeatureTitle style={{ color: 'white' }}>Une question sur la sécurité ?</FeatureTitle>
            <p style={{ color: '#94a3b8' }}>Notre équipe de sécurité est disponible pour répondre à vos questions techniques et de conformité.</p>
            <Button>Contacter l'équipe Sécurité</Button>
          </ContactBox>
        </Section>
      </MainContent>
      <FooterClean />
    </PageContainer>
  );
};

export default SecurityPage;
