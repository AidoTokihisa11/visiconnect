import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import CommonFooter from '../components/CommonFooter';
import { 
  Shield, 
  Lock, 
  Eye, 
  Server, 
  Key, 
  FileCheck, 
  Globe, 
  Video,
  CheckCircle,
  ArrowLeft,
  Award,
  Database
} from 'lucide-react';

const Container = styled.div`
  min-height: 100vh;
  background: white;
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
  color: #60a5fa;
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
    border-color: #60a5fa;
    color: #60a5fa;
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
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #60a5fa, #60a5fa);
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
`;

const SecurityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const SecurityCard = styled(motion.div)`
  background: #111;
  border: 1px solid #222;
  border-radius: 24px;
  padding: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #60a5fa, transparent);
  }

  &:hover {
    border-color: #333;
    transform: translateY(-4px);
  }
`;

const CardIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: rgba(0, 255, 136, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: #60a5fa;
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
`;

const CardDescription = styled.p`
  color: #888;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  color: #ccc;
  font-size: 0.95rem;
`;

const CertificationSection = styled.section`
  background: #111;
  border: 1px solid #222;
  border-radius: 24px;
  padding: 3rem;
  margin-bottom: 4rem;
  text-align: center;
`;

const CertificationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const CertificationBadge = styled(motion.div)`
  background: white;
  border: 2px solid #333;
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: #60a5fa;
    transform: translateY(-2px);
  }
`;

const BadgeIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: rgba(0, 255, 136, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: #60a5fa;
`;

const BadgeTitle = styled.h4`
  color: #333;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const BadgeDescription = styled.p`
  color: #888;
  font-size: 0.9rem;
  margin: 0;
`;

const SecurityPage = () => {
  const navigate = useNavigate();

  const securityFeatures = [
    {
      icon: <Lock size={24} />,
      title: "Chiffrement de bout en bout",
      description: "Toutes vos communications sont protégées par un chiffrement AES-256 de niveau militaire.",
      features: [
        "Chiffrement AES-256",
        "Clés uniques par session",
        "Protection des métadonnées",
        "Authentification forte"
      ]
    },
    {
      icon: <Server size={24} />,
      title: "Infrastructure sécurisée",
      description: "Nos serveurs sont hébergés dans des centres de données certifiés avec une sécurité physique maximale.",
      features: [
        "Centres de données ISO 27001",
        "Redondance géographique",
        "Surveillance 24/7",
        "Accès biométrique"
      ]
    },
    {
      icon: <Eye size={24} />,
      title: "Confidentialité des données",
      description: "Nous ne stockons aucune donnée personnelle et respectons strictement le RGPD.",
      features: [
        "Zéro stockage de données",
        "Conformité RGPD",
        "Audit de sécurité régulier",
        "Transparence totale"
      ]
    },
    {
      icon: <Key size={24} />,
      title: "Authentification multi-facteurs",
      description: "Protégez votre compte avec une authentification à deux facteurs et des tokens sécurisés.",
      features: [
        "2FA obligatoire",
        "Tokens JWT sécurisés",
        "Sessions limitées",
        "Déconnexion automatique"
      ]
    },
    {
      icon: <Database size={24} />,
      title: "Sauvegarde sécurisée",
      description: "Vos données sont sauvegardées de manière chiffrée avec une récupération garantie.",
      features: [
        "Sauvegarde chiffrée",
        "Récupération rapide",
        "Versioning automatique",
        "Tests de restauration"
      ]
    },
    {
      icon: <Globe size={24} />,
      title: "Réseau privé virtuel",
      description: "Connexions sécurisées via VPN avec protection contre les attaques DDoS.",
      features: [
        "VPN intégré",
        "Protection DDoS",
        "Filtrage IP avancé",
        "Monitoring en temps réel"
      ]
    }
  ];

  const certifications = [
    {
      icon: <Award size={24} />,
      title: "ISO 27001",
      description: "Certification de sécurité de l'information"
    },
    {
      icon: <Shield size={24} />,
      title: "SOC 2 Type II",
      description: "Audit de sécurité et disponibilité"
    },
    {
      icon: <FileCheck size={24} />,
      title: "RGPD",
      description: "Conformité européenne des données"
    },
    {
      icon: <Lock size={24} />,
      title: "HIPAA",
      description: "Protection des données de santé"
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
            Sécurité & Confidentialité
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Votre sécurité est notre priorité absolue. Découvrez comment nous protégeons vos données et communications.
          </Subtitle>
        </HeroSection>

        <SecurityGrid>
          {securityFeatures.map((feature, index) => (
            <SecurityCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <CardIcon>{feature.icon}</CardIcon>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
              <FeatureList>
                {feature.features.map((item, idx) => (
                  <FeatureItem key={idx}>
                    <CheckCircle size={16} color="#60a5fa" />
                    {item}
                  </FeatureItem>
                ))}
              </FeatureList>
            </SecurityCard>
          ))}
        </SecurityGrid>

        <CertificationSection>
          <motion.h2
            style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', color: '#3b82f6' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Certifications & Conformité
          </motion.h2>
          <motion.p
            style={{ fontSize: '1.1rem', color: '#888', marginBottom: '2rem' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Nous respectons les plus hauts standards de sécurité internationaux
          </motion.p>
          
          <CertificationGrid>
            {certifications.map((cert, index) => (
              <CertificationBadge
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <BadgeIcon>{cert.icon}</BadgeIcon>
                <BadgeTitle>{cert.title}</BadgeTitle>
                <BadgeDescription>{cert.description}</BadgeDescription>
              </CertificationBadge>
            ))}
          </CertificationGrid>
        </CertificationSection>
      </MainContent>
      <CommonFooter />
    </Container>
  );
};

export default SecurityPage;
