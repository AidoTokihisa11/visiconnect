import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  Video, 
  ArrowLeft, 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  UserCheck, 
  FileText, 
  Mail, 
  Calendar,
  MapPin
} from 'lucide-react';

const Container = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
  color: #333;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid #1a1a1a;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 800;
  color: #00ff88;
  cursor: pointer;
`;

const BackButton = styled.button`
  background: transparent;
  border: 2px solid #333;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 16px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    border-color: #00ff88;
    color: #00ff88;
  }
`;

const MainContent = styled.main`
  padding: 8rem 2rem 4rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #00ff88, #00e67a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #888;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const LastUpdated = styled.div`
  background: #111;
  border: 1px solid #333;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 3rem;
  text-align: center;
  color: #00ff88;
  font-weight: 600;
`;

const Section = styled.section`
  background: #111;
  border: 1px solid #222;
  border-radius: 24px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #00ff88, transparent);
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const SectionIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(0, 255, 136, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00ff88;
`;

const Text = styled.p`
  color: #ccc;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-size: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const List = styled.ul`
  color: #ccc;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;

  li {
    margin-bottom: 0.5rem;
  }
`;

const ContactInfo = styled.div`
  background: #0a0a0a;
  border: 2px solid #222;
  border-radius: 16px;
  padding: 2rem;
  margin-top: 2rem;
`;

const ContactTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #00ff88;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  color: #ccc;

  &:last-child {
    margin-bottom: 0;
  }
`;

const PrivacyPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <Nav>
          <Logo onClick={() => navigate('/')}>
            <Video size={24} />
            Visio Pro
          </Logo>
          <BackButton onClick={() => navigate('/')}>
            <ArrowLeft size={16} />
            Retour
          </BackButton>
        </Nav>
      </Header>

      <MainContent>
        <HeroSection>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Politique de Confidentialité
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Votre vie privée est importante pour nous. Cette politique explique comment nous collectons, utilisons et protégeons vos données.
          </Subtitle>
        </HeroSection>

        <LastUpdated>
          Dernière mise à jour : 6 décembre 2025
        </LastUpdated>

        <Section>
          <SectionTitle>
            <SectionIcon>
              <UserCheck size={20} />
            </SectionIcon>
            Responsable du traitement
          </SectionTitle>
          <Text>
            Le responsable du traitement des données personnelles est :
          </Text>
          <ContactInfo>
            <ContactTitle>Théo Garcès</ContactTitle>
            <ContactItem>
              <MapPin size={16} />
              France
            </ContactItem>
            <ContactItem>
              <Mail size={16} />
              Contact disponible via l'application
            </ContactItem>
          </ContactInfo>
        </Section>

        <Section>
          <SectionTitle>
            <SectionIcon>
              <Database size={20} />
            </SectionIcon>
            Données collectées
          </SectionTitle>
          <Text>
            Dans le cadre de ce projet de démonstration technique, nous collectons uniquement :
          </Text>
          <List>
            <li>Les données de session temporaires nécessaires au fonctionnement de l'application</li>
            <li>Les informations de connexion WebRTC pour établir les communications</li>
            <li>Les données audio/vidéo traitées localement dans votre navigateur</li>
            <li>Aucune donnée personnelle n'est stockée de manière permanente</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>
            <SectionIcon>
              <Eye size={20} />
            </SectionIcon>
            Utilisation des données
          </SectionTitle>
          <Text>
            Les données collectées sont utilisées exclusivement pour :
          </Text>
          <List>
            <li>Permettre le fonctionnement des fonctionnalités de visioconférence</li>
            <li>Établir les connexions peer-to-peer entre utilisateurs</li>
            <li>Assurer la qualité de la communication audio et vidéo</li>
            <li>Tester et améliorer les fonctionnalités de l'application</li>
          </List>
          <Text>
            <strong>Important :</strong> Il s'agit d'un environnement de développement local. Aucune donnée n'est transmise à des serveurs externes ou à des tiers.
          </Text>
        </Section>

        <Section>
          <SectionTitle>
            <SectionIcon>
              <Lock size={20} />
            </SectionIcon>
            Sécurité et protection
          </SectionTitle>
          <Text>
            Nous mettons en œuvre les mesures de sécurité suivantes :
          </Text>
          <List>
            <li>Chiffrement des communications WebRTC de bout en bout</li>
            <li>Traitement local des données dans votre navigateur</li>
            <li>Aucun stockage permanent des données sensibles</li>
            <li>Connexions sécurisées via HTTPS (en production)</li>
            <li>Respect des standards de sécurité web modernes</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>
            <SectionIcon>
              <Shield size={20} />
            </SectionIcon>
            Vos droits RGPD
          </SectionTitle>
          <Text>
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
          </Text>
          <List>
            <li><strong>Droit d'accès :</strong> Vous pouvez demander l'accès aux données vous concernant</li>
            <li><strong>Droit de rectification :</strong> Vous pouvez demander la correction de données inexactes</li>
            <li><strong>Droit à l'effacement :</strong> Vous pouvez demander la suppression de vos données</li>
            <li><strong>Droit à la portabilité :</strong> Vous pouvez demander le transfert de vos données</li>
            <li><strong>Droit d'opposition :</strong> Vous pouvez vous opposer au traitement de vos données</li>
          </List>
          <Text>
            Pour exercer ces droits, vous pouvez nous contacter via les informations fournies ci-dessus.
          </Text>
        </Section>

        <Section>
          <SectionTitle>
            <SectionIcon>
              <FileText size={20} />
            </SectionIcon>
            Cookies et technologies similaires
          </SectionTitle>
          <Text>
            Cette application utilise uniquement :
          </Text>
          <List>
            <li>Le stockage local du navigateur pour les préférences utilisateur</li>
            <li>Les sessions temporaires pour maintenir les connexions</li>
            <li>Aucun cookie de suivi ou de publicité</li>
            <li>Aucun outil d'analyse tiers</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>
            <SectionIcon>
              <Calendar size={20} />
            </SectionIcon>
            Conservation des données
          </SectionTitle>
          <Text>
            Dans le cadre de ce projet de démonstration :
          </Text>
          <List>
            <li>Les données de session sont supprimées à la fermeture de l'application</li>
            <li>Aucune donnée n'est conservée au-delà de la session active</li>
            <li>Les communications audio/vidéo ne sont pas enregistrées</li>
            <li>Le cache du navigateur peut être vidé à tout moment</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>
            <SectionIcon>
              <Mail size={20} />
            </SectionIcon>
            Contact et réclamations
          </SectionTitle>
          <Text>
            Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, vous pouvez :
          </Text>
          <List>
            <li>Nous contacter directement via l'application</li>
            <li>Signaler tout problème de confidentialité</li>
            <li>Déposer une réclamation auprès de la CNIL si nécessaire</li>
          </List>
          <Text>
            <strong>Note importante :</strong> Cette application étant un projet de démonstration technique en environnement local, 
            la plupart des traitements de données sont temporaires et limités à votre session de navigation.
          </Text>
        </Section>
      </MainContent>
    </Container>
  );
};

export default PrivacyPage;
