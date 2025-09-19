import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Shield, Users } from 'lucide-react';

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

const LastUpdated = styled.p`
  color: #60a5fa;
  font-style: italic;
  text-align: center;
  margin-top: 3rem;
`;

const TermsPage = () => {
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
          <FileText size={48} />
          Conditions d'utilisation
        </Title>

        <Section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <SectionTitle>
            <Users size={24} />
            Acceptation des conditions
          </SectionTitle>
          <p>
            En accédant et en utilisant VisioMeet, vous acceptez d'être lié par ces 
            Conditions d'utilisation. Si vous n'acceptez pas ces termes, veuillez ne 
            pas utiliser notre service.
          </p>
        </Section>

        <Section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <SectionTitle>
            <Shield size={24} />
            Utilisation du service
          </SectionTitle>
          <p>
            <strong>Utilisation autorisée :</strong> Vous pouvez utiliser VisioMeet pour 
            des réunions professionnelles, des appels personnels et des collaborations 
            conformément à nos politiques.
          </p>
          <p>
            <strong>Utilisation interdite :</strong> Il est interdit d'utiliser le service 
            pour des activités illégales, harcelement, spam ou toute activité nuisant à 
            d'autres utilisateurs.
          </p>
        </Section>

        <Section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <SectionTitle>Comptes utilisateur</SectionTitle>
          <p>
            Vous êtes responsable de maintenir la confidentialité de votre compte et de 
            votre mot de passe. Vous acceptez de nous notifier immédiatement de toute 
            utilisation non autorisée de votre compte.
          </p>
        </Section>

        <Section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <SectionTitle>Limitation de responsabilité</SectionTitle>
          <p>
            VisioMeet est fourni "tel quel" sans garanties d'aucune sorte. Nous ne 
            garantissons pas que le service sera ininterrompu ou exempt d'erreurs.
          </p>
        </Section>

        <Section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <SectionTitle>Modifications</SectionTitle>
          <p>
            Nous nous réservons le droit de modifier ces conditions à tout moment. 
            Les modifications prendront effet immédiatement après leur publication 
            sur cette page.
          </p>
        </Section>

        <Section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <SectionTitle>Contact</SectionTitle>
          <p>
            Pour toute question concernant ces Conditions d'utilisation, contactez-nous à :
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

export default TermsPage;