import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Cookie, Settings, Shield, BarChart } from 'lucide-react';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f0f, #1a1a2e, #16213e);
  color: #333;
  padding: 2rem;
`;

const Header = styled.header`
  max-width: 1200px;
  margin: 0 auto 3rem;
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #1e40af;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(-5px);
  }
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.7;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #60a5fa, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Section = styled(motion.section)`
  margin-bottom: 3rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const SectionTitle = styled.h2`
  color: #60a5fa;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CookieType = styled.div`
  margin: 1.5rem 0;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border-left: 4px solid #60a5fa;

  h4 {
    color: #a78bfa;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
`;

const LastUpdated = styled.p`
  color: #60a5fa;
  font-style: italic;
  text-align: center;
  margin-top: 3rem;
`;

const CookiesPage = () => {
  return (
    <PageContainer>
      <Header>
        <BackButton to="/">
          <ArrowLeft size={20} />
          Retour à l'accueil
        </BackButton>
      </Header>

      <Content>
        <Title
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Cookie size={48} />
          Politique des cookies
        </Title>

        <Section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <SectionTitle>
            <Shield size={24} />
            Qu'est-ce qu'un cookie ?
          </SectionTitle>
          <p>
            Les cookies sont de petits fichiers texte stockés sur votre appareil 
            lorsque vous visitez VisioMeet. Ils nous aident à améliorer votre 
            expérience en mémorisant vos préférences et en analysant l'utilisation 
            du site.
          </p>
        </Section>

        <Section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <SectionTitle>
            <Settings size={24} />
            Types de cookies utilisés
          </SectionTitle>
          
          <CookieType>
            <h4>Cookies essentiels</h4>
            <p>
              Ces cookies sont nécessaires au fonctionnement de VisioMeet. Ils 
              permettent la navigation de base, l'authentification et la sécurité.
            </p>
          </CookieType>

          <CookieType>
            <h4>Cookies de préférences</h4>
            <p>
              Ces cookies mémorisent vos choix (langue, qualité vidéo, thème) 
              pour personnaliser votre expérience lors de vos prochaines visites.
            </p>
          </CookieType>

          <CookieType>
            <h4>Cookies analytiques</h4>
            <p>
              Ces cookies nous aident à comprendre comment vous utilisez VisioMeet 
              en collectant des informations anonymes sur votre navigation.
            </p>
          </CookieType>
        </Section>

        <Section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <SectionTitle>
            <BarChart size={24} />
            Gestion des cookies
          </SectionTitle>
          <p>
            <strong>Paramètres du navigateur :</strong> Vous pouvez configurer votre 
            navigateur pour refuser les cookies, mais cela peut affecter le 
            fonctionnement de VisioMeet.
          </p>
          <p>
            <strong>Cookies tiers :</strong> Nous utilisons des services tiers 
            (analytics, support client) qui peuvent placer leurs propres cookies 
            selon leurs politiques respectives.
          </p>
        </Section>

        <Section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <SectionTitle>Durée de conservation</SectionTitle>
          <p>
            <strong>Cookies de session :</strong> Supprimés à la fermeture de votre navigateur.
          </p>
          <p>
            <strong>Cookies persistants :</strong> Conservés jusqu'à leur expiration 
            (généralement 12 mois maximum) ou jusqu'à ce que vous les supprimiez manuellement.
          </p>
        </Section>

        <Section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <SectionTitle>Vos droits</SectionTitle>
          <p>
            Vous avez le droit de :
          </p>
          <ul style={{ marginTop: '1rem', paddingLeft: '2rem' }}>
            <li>Accepter ou refuser les cookies non essentiels</li>
            <li>Modifier vos préférences cookies à tout moment</li>
            <li>Supprimer les cookies de votre navigateur</li>
            <li>Demander des informations sur nos cookies</li>
          </ul>
        </Section>

        <Section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <SectionTitle>Contact</SectionTitle>
          <p>
            Pour toute question concernant notre utilisation des cookies, contactez-nous :
            <br />
            <strong>contact.visiomeet@gmail.com</strong>
          </p>
        </Section>

        <LastUpdated>
          Dernière mise à jour : Septembre 2025
        </LastUpdated>
      </Content>
    </PageContainer>
  );
};

export default CookiesPage;