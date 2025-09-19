import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  Video, 
  ArrowLeft, 
  Users, 
  Shield, 
  Zap, 
  Globe, 
  MessageSquare, 
  Share2, 
  Monitor, 
  Smartphone, 
  Headphones, 
  Settings, 
  Cloud, 
  Lock, 
  Wifi, 
  Camera, 
  Mic, 
  ScreenShare, 
  FileText, 
  Calendar, 
  Bell, 
  Star, 
  CheckCircle 
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
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 6rem;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
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
  font-size: 1.3rem;
  color: #888;
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
`;

const FeatureCard = styled(motion.div)`
  background: #111;
  border: 1px solid #222;
  border-radius: 20px;
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #00ff88, transparent);
  }

  &:hover {
    transform: translateY(-4px);
    border-color: #333;
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: rgba(0, 255, 136, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: #00ff88;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
`;

const FeatureDescription = styled.p`
  color: #888;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FeatureListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ccc;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 3rem;
  color: #333;
  text-align: center;
`;

const FeaturesPage = () => {
  const navigate = useNavigate();

  // Scroll vers le haut quand la page se charge
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: <Video size={32} />,
      title: "Visioconférence HD",
      description: "Qualité vidéo haute définition jusqu'à 4K avec optimisation automatique selon la bande passante.",
      items: [
        "Résolution jusqu'à 4K",
        "Optimisation automatique",
        "Faible latence",
        "Stabilisation d'image"
      ]
    },
    {
      icon: <Users size={32} />,
      title: "Réunions illimitées",
      description: "Organisez des réunions avec un nombre illimité de participants sans restriction de durée.",
      items: [
        "Participants illimités",
        "Durée illimitée",
        "Salles de réunion virtuelles",
        "Gestion des invitations"
      ]
    },
    {
      icon: <ScreenShare size={32} />,
      title: "Partage d'écran",
      description: "Partagez votre écran, une application ou un onglet spécifique en temps réel.",
      items: [
        "Partage d'écran complet",
        "Partage d'application",
        "Partage d'onglet",
        "Contrôle à distance"
      ]
    },
    {
      icon: <MessageSquare size={32} />,
      title: "Chat intégré",
      description: "Système de chat en temps réel avec support des fichiers et émojis.",
      items: [
        "Messages en temps réel",
        "Partage de fichiers",
        "Émojis et réactions",
        "Historique des messages"
      ]
    },
    {
      icon: <Shield size={32} />,
      title: "Sécurité avancée",
      description: "Chiffrement de bout en bout et authentification multi-facteurs pour une sécurité maximale.",
      items: [
        "Chiffrement E2E",
        "Authentification 2FA",
        "Salles protégées par mot de passe",
        "Conformité RGPD"
      ]
    },
    {
      icon: <Cloud size={32} />,
      title: "Enregistrement cloud",
      description: "Enregistrez vos réunions dans le cloud avec transcription automatique.",
      items: [
        "Enregistrement HD",
        "Stockage cloud sécurisé",
        "Transcription automatique",
        "Partage facile"
      ]
    },
    {
      icon: <Calendar size={32} />,
      title: "Planification",
      description: "Planifiez vos réunions avec intégration calendrier et rappels automatiques.",
      items: [
        "Intégration calendrier",
        "Rappels automatiques",
        "Récurrence des réunions",
        "Invitations par email"
      ]
    },
    {
      icon: <Monitor size={32} />,
      title: "Multi-plateforme",
      description: "Accessible depuis n'importe quel appareil : ordinateur, tablette ou smartphone.",
      items: [
        "Web, iOS, Android",
        "Synchronisation multi-appareils",
        "Interface adaptative",
        "Hors ligne partiel"
      ]
    },
    {
      icon: <Settings size={32} />,
      title: "Personnalisation",
      description: "Personnalisez votre expérience avec des thèmes, arrière-plans et paramètres avancés.",
      items: [
        "Arrière-plans virtuels",
        "Thèmes personnalisés",
        "Paramètres audio/vidéo",
        "Raccourcis clavier"
      ]
    }
  ];

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
            Fonctionnalités
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Découvrez toutes les fonctionnalités avancées de Visio Pro 
            pour des communications professionnelles exceptionnelles.
          </Subtitle>
        </HeroSection>

        <SectionTitle>Toutes les fonctionnalités</SectionTitle>
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <FeatureList>
                {feature.items.map((item, itemIndex) => (
                  <FeatureListItem key={itemIndex}>
                    <CheckCircle size={16} style={{ color: '#00ff88' }} />
                    {item}
                  </FeatureListItem>
                ))}
              </FeatureList>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </MainContent>
    </Container>
  );
};

export default FeaturesPage;
