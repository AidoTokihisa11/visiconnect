import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import FooterUnified from '../components/FooterUnified';
import {
  Video,
  Shield,
  Users,
  ArrowRight,
  Check,
  Play,
  Globe,
  Share2,
  FileText,
  MessageSquare,
  Calendar,
  Smartphone,
  Database,
  Settings
} from 'lucide-react';

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: var(--bg-primary, #ffffff);
  color: var(--text-primary, #1e293b);
  overflow-x: hidden;
`;

// Header de navigation
const NavigationHeader = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
`;

const NavLogo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 800;
  text-decoration: none;
  color: var(--text-primary, #1e293b);
  
  .logo-icon {
    width: 40px;
    height: 40px;
    background: var(--primary-gradient, #2563eb);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 10px rgba(37, 99, 235, 0.3);
  }
  
  .logo-text {
    background: var(--primary-gradient, #2563eb);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: var(--text-primary, #1e293b);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--accent-cyan, #06b6d4);
  }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem 0;
  background: 
    radial-gradient(ellipse at top, rgba(37, 99, 235, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse at bottom, rgba(6, 182, 212, 0.1) 0%, transparent 50%);
`;

const HeroContent = styled(motion.div)`
  text-align: center;
  z-index: 10;
  max-width: 1000px;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 800;
  background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.3rem;
  color: var(--text-secondary, #475569);
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.6;
`;

const FeaturesGrid = styled.section`
  padding: 8rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
`;

const SectionSubtitle = styled(motion.p)`
  text-align: center;
  color: var(--text-secondary, #475569);
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto 4rem;
`;

const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.5), transparent);
  }
  
  &:hover {
    border-color: rgba(96, 165, 250, 0.3);
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #60a5fa, #a78bfa);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  
  svg {
    color: white;
    width: 28px;
    height: 28px;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary, #1e293b);
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: #3b82f6;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const FeatureBenefits = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #1e40af;
    margin-bottom: 0.75rem;
    
    svg {
      color: #10b981;
      width: 16px;
      height: 16px;
    }
  }
`;

const CTASection = styled.section`
  padding: 8rem 2rem;
  text-align: center;
  background: linear-gradient(135deg, rgba(96, 165, 250, 0.1), rgba(167, 139, 250, 0.1));
`;

const CTAButton = styled(motion.button)`
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, #60a5fa, #a78bfa);
  border: none;
  border-radius: 50px;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 40px rgba(96, 165, 250, 0.4);
  }
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  gap: 1rem;
  flex-wrap: wrap;
`;

const TabButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background: ${props => props.active ? 'linear-gradient(135deg, #60a5fa, #a78bfa)' : 'rgba(255, 255, 255, 0.1)'};
  border: 1px solid ${props => props.active ? 'rgba(96, 165, 250, 0.5)' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 50px;
  color: ${props => props.active ? 'white' : 'var(--text-primary, #1e293b)'};
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(96, 165, 250, 0.5);
    background: ${props => props.active ? 'linear-gradient(135deg, #60a5fa, #a78bfa)' : 'rgba(255, 255, 255, 0.15)'};
  }
`;

// Features data
const featuresData = {
  core: [
    {
      icon: <Video />,
      title: "Vidéoconférence HD 4K",
      description: "Qualité vidéo cristalline jusqu'à 4K avec optimisation automatique selon votre bande passante.",
      benefits: ["Résolution jusqu'à 4K", "Optimisation automatique", "Faible latence", "Support multi-écrans"]
    },
    {
      icon: <Users />,
      title: "Réunions illimitées",
      description: "Organisez des réunions sans limite de participants avec notre technologie de mise à l'échelle dynamique.",
      benefits: ["Participants illimités", "Mise à l'échelle automatique", "Gestion des rôles", "Salles virtuelles"]
    },
    {
      icon: <Shield />,
      title: "Sécurité renforcée",
      description: "Chiffrement end-to-end et conformité aux standards de sécurité internationaux.",
      benefits: ["Chiffrement AES-256", "Authentification 2FA", "Conformité RGPD", "Audit de sécurité"]
    },
    {
      icon: <Share2 />,
      title: "Partage d'écran avancé",
      description: "Partagez votre écran, applications spécifiques ou tableaux blancs interactifs.",
      benefits: ["Partage sélectif", "Contrôle à distance", "Annotations", "Enregistrement"]
    }
  ],
  collaboration: [
    {
      icon: <FileText />,
      title: "Tableau blanc interactif",
      description: "Collaborez en temps réel sur des tableaux blancs avec outils de dessin avancés.",
      benefits: ["Outils de dessin", "Collaboration temps réel", "Templates intégrés", "Export multiple formats"]
    },
    {
      icon: <MessageSquare />,
      title: "Chat intégré",
      description: "Communication textuelle enrichie avec fichiers, emojis et traduction automatique.",
      benefits: ["Messages enrichis", "Partage de fichiers", "Traduction auto", "Historique persistent"]
    },
    {
      icon: <Calendar />,
      title: "Planification intelligente",
      description: "Intégration calendrier avec suggestions automatiques de créneaux optimaux.",
      benefits: ["Sync calendrier", "Suggestions IA", "Rappels automatiques", "Gestion des fuseaux"]
    },
    {
      icon: <FileText />,
      title: "Prise de notes IA",
      description: "Transcription automatique et génération de résumés intelligents de vos réunions.",
      benefits: ["Transcription temps réel", "Résumés IA", "Points d'action", "Recherche sémantique"]
    }
  ],
  technical: [
    {
      icon: <Globe />,
      title: "CDN mondial",
      description: "Infrastructure distribuée pour une performance optimale partout dans le monde.",
      benefits: ["Latence minimale", "Disponibilité 99.9%", "Auto-scaling", "Edge computing"]
    },
    {
      icon: <Smartphone />,
      title: "Multi-plateforme",
      description: "Compatible sur tous les appareils : desktop, mobile, tablette, navigateur web.",
      benefits: ["iOS & Android", "Apps natives", "PWA", "Navigateurs modernes"]
    },
    {
      icon: <Database />,
      title: "Analytics avancés",
      description: "Métriques détaillées sur l'engagement, la qualité et l'utilisation de vos réunions.",
      benefits: ["Métriques temps réel", "Rapports détaillés", "Insights IA", "Export données"]
    },
    {
      icon: <Settings />,
      title: "API complète",
      description: "Intégrez VisioMeet dans vos applications avec notre API REST et SDK complets.",
      benefits: ["API RESTful", "SDK JavaScript", "Webhooks", "Documentation complète"]
    }
  ]
};

const FeaturesPage = () => {
  const [activeTab, setActiveTab] = useState('core');
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <PageContainer ref={containerRef}>
      {/* Header de navigation */}
      <NavigationHeader
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Nav>
          <NavLogo
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
              <div className="logo-icon">
                <Video size={24} color="white" />
              </div>
              <div className="logo-text">VisiConnect</div>
            </Link>
          </NavLogo>

          <NavLinks>
            <NavLink to="/">Accueil</NavLink>
            <NavLink to="/features" style={{ color: 'var(--accent-cyan, #06b6d4)' }}>Fonctionnalités</NavLink>
            <NavLink to="/pricing">Tarifs</NavLink>
            <NavLink to="/about">À propos</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/login">
              <motion.div
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'var(--primary-gradient, #2563eb)',
                  borderRadius: '8px',
                  color: 'white'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Connexion
              </motion.div>
            </NavLink>
          </NavLinks>
        </Nav>
      </NavigationHeader>

      <HeroSection>
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20"
        />
        
        <HeroContent>
          <Title
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Fonctionnalités
          </Title>
          
          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Découvrez toutes les capacités de VisioMeet pour transformer 
            vos réunions en expériences collaboratives exceptionnelles.
          </Subtitle>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <CTAButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play size={20} />
              Voir la démo
            </CTAButton>
          </motion.div>
        </HeroContent>
      </HeroSection>

      <FeaturesGrid>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Toutes nos fonctionnalités
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Une suite complète d'outils pour révolutionner vos communications
        </SectionSubtitle>

        <TabContainer>
          <TabButton
            active={activeTab === 'core'}
            onClick={() => setActiveTab('core')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Fonctionnalités principales
          </TabButton>
          <TabButton
            active={activeTab === 'collaboration'}
            onClick={() => setActiveTab('collaboration')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Collaboration
          </TabButton>
          <TabButton
            active={activeTab === 'technical'}
            onClick={() => setActiveTab('technical')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Technique
          </TabButton>
        </TabContainer>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <FeaturesContainer>
              {featuresData[activeTab].map((feature, index) => (
                <FeatureCard
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <FeatureIcon>
                    {feature.icon}
                  </FeatureIcon>
                  
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  
                  <FeatureDescription>
                    {feature.description}
                  </FeatureDescription>
                  
                  <FeatureBenefits>
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx}>
                        <Check size={16} />
                        {benefit}
                      </li>
                    ))}
                  </FeatureBenefits>
                </FeatureCard>
              ))}
            </FeaturesContainer>
          </motion.div>
        </AnimatePresence>
      </FeaturesGrid>

      <CTASection>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionTitle style={{ marginBottom: '1.5rem' }}>
            Prêt à commencer ?
          </SectionTitle>
          
          <SectionSubtitle style={{ marginBottom: '2rem' }}>
            Découvrez comment VisioMeet peut transformer votre façon de collaborer
          </SectionSubtitle>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <CTAButton
              as={Link}
              to="/signup"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Commencer gratuitement
              <ArrowRight size={20} />
            </CTAButton>
            
            <CTAButton
              as={Link}
              to="/contact"
              style={{ 
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Demander une démo
              <Play size={20} />
            </CTAButton>
          </div>
        </motion.div>
      </CTASection>

      <FooterUnified />
    </PageContainer>
  );
};

export default FeaturesPage;