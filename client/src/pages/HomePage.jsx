import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import EpicLoader from '../components/EpicLoader';
import {
  Video,
  Users,
  Shield,
  Zap,
  Globe,
  Play,
  ArrowRight,
  Check,
  Sparkles,
  ChevronDown,
  Eye,
  Menu,
  X,
  Star,
  Crown,
  Rocket,
  Mail,
  Github,
  Linkedin
} from 'lucide-react';

const AppContainer = styled.div`
  min-height: 100vh;
  background: white;
  color: #333;
  overflow-x: hidden;
  position: relative;
`;

// HEADER MODERNE
const Header = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
`;

const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 800;
  text-decoration: none;
  color: #333;
  
  .logo-icon {
    width: 40px;
    height: 40px;
    background: #2563eb;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 10px rgba(37, 99, 235, 0.3);
  }
  
  .logo-text {
    color: #2563eb;
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

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  padding: 0.5rem;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 2rem;
  z-index: 999;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const MobileNavLink = styled(motion.div)`
  color: #333;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  padding: 1rem 0;
  border: "1px solid rgba(0, 0, 0, 0.1)"
  text-align: center;
  
  &:hover {
    color: #60a5fa;
  }
`;

// PRICING SECTION
const PricingSection = styled(motion.section)`
  padding: 8rem 2rem;
  background: linear-gradient(135deg, #f8fafc, #e2e8f0, #ffffff);
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
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const PricingCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 3rem 2rem;
  border: "1px solid rgba(0, 0, 0, 0.1)"
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, 
      ${props => props.gradient || 'transparent'});
    opacity: 0.1;
    border-radius: 24px;
  }
  
  &.popular {
    border: 2px solid #60a5fa;
    transform: scale(1.05);
    
    &::after {
      content: 'POPULAIRE';
      position: absolute;
      top: 1rem;
      right: -2rem;
      background: linear-gradient(135deg, #60a5fa, #a78bfa);
      color: #333;
      padding: 0.5rem 3rem;
      font-size: 0.8rem;
      font-weight: 700;
      transform: rotate(45deg);
      box-shadow: 0 4px 12px rgba(96, 165, 250, 0.4);
    }
  }
  
  .plan-icon {
    width: 60px;
    height: 60px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    background: ${props => props.iconBg || 'rgba(96, 165, 250, 0.2)'};
  }
  
  .plan-name {
    font-size: 1.8rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  .plan-description {
    color: #3b82f6;
    margin-bottom: 2rem;
    line-height: 1.6;
  }
  
  .plan-price {
    font-size: 3rem;
    font-weight: 800;
    color: #333;
    margin-bottom: 0.5rem;
    
    .currency {
      font-size: 1.5rem;
      vertical-align: top;
    }
    
    .period {
      font-size: 1rem;
      color: #60a5fa;
      font-weight: 400;
    }
  }
  
  .plan-features {
    list-style: none;
    margin: 2rem 0;
    
    li {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem 0;
      color: #1e40af;
      
      .check-icon {
        color: #10b981;
        flex-shrink: 0;
      }
    }
  }
`;

const PricingButton = styled(motion.button)`
  width: 100%;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  position: relative;
  overflow: hidden;
  
  &.primary {
    background: linear-gradient(135deg, #60a5fa, #a78bfa);
    color: #333;
    box-shadow: 0 8px 32px rgba(96, 165, 250, 0.4);
  }
  
  &.secondary {
    background: rgba(255, 255, 255, 0.1);
    color: #333;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const NavLink = styled(motion.div)`
  color: #1e40af;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #60a5fa, #a78bfa);
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: #333;
    &::after {
      width: 100%;
    }
  }
`;

// HERO SECTION PARALLAX
const HeroSection = styled.section`
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ParallaxBackground = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
    linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%);
`;

const FloatingElements = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  
  .floating-icon {
    position: absolute;
    opacity: 0.1;
    animation: float 6s ease-in-out infinite;
  }
`;

const HeroContent = styled(motion.div)`
  text-align: center;
  z-index: 10;
  position: relative;
  max-width: 1000px;
  padding: 0 2rem;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 2rem;
  color: #1e40af;
  
  .gradient-text {
    background: linear-gradient(135deg, #1e40af, #3b82f6, #1d4ed8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.2));
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: #1e40af;
  margin-bottom: 3rem;
  line-height: 1.6;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 4rem;
  
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled(motion.button)`
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: translateX(-100%);
    transition: transform 0.5s ease;
  }
  
  &:hover::before {
    transform: translateX(100%);
  }
  
  &.primary {
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
    box-shadow: 0 8px 32px rgba(59, 130, 246, 0.4);
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 40px rgba(59, 130, 246, 0.6);
    }
  }
  
  &.secondary {
    background: white;
    color: #1e40af;
    border: 2px solid #3b82f6;
    backdrop-filter: blur(10px);
    
    &:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateY(-3px);
    }
  }
`;

// FEATURES CARDS 3D
const FeaturesSection = styled(motion.section)`
  padding: 8rem 2rem;
  position: relative;
  background: linear-gradient(180deg, transparent, rgba(26, 26, 46, 0.5));
`;

const FeaturesGrid = styled(motion.div)`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(20px);
  border: "1px solid rgba(0, 0, 0, 0.1)"
  border-radius: 20px;
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #60a5fa, transparent);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover::after {
    transform: scaleX(1);
  }
`;

const FeatureIcon = styled(motion.div)`
  width: 80px;
  height: 80px;
  border-radius: 16px;
  background: linear-gradient(135deg, ${props => props.gradient});
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 32px ${props => props.shadowColor};
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
`;

const FeatureDescription = styled.p`
  color: #3b82f6;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    color: #1e40af;
    font-size: 0.9rem;
  }
`;

// STATS SECTION ANIMÉE
const StatsSection = styled(motion.section)`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
`;

const StatsGrid = styled(motion.div)`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const StatCard = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 16px;
  border: "1px solid rgba(0, 0, 0, 0.1)"
  backdrop-filter: blur(10px);
  
  .stat-value {
    font-size: 3rem;
    font-weight: 900;
    background: linear-gradient(135deg, #60a5fa, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
    display: block;
  }
  
  .stat-label {
    color: #3b82f6;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

// Footer Components
const FooterContainer = styled(motion.footer)`
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  padding: 4rem 2rem 2rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: white;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      margin-bottom: 0.75rem;
      
      a {
        color: rgba(255, 255, 255, 0.8);
        text-decoration: none;
        transition: all 0.3s ease;
        
        &:hover {
          color: white;
          transform: translateX(5px);
        }
      }
    }
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
    margin-bottom: 1rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: #3b82f6;
    text-decoration: none;
    transition: all 0.3s ease;
    border: "1px solid rgba(0, 0, 0, 0.1)"
    
    &:hover {
      background: rgba(96, 165, 250, 0.2);
      color: #60a5fa;
      transform: translateY(-2px);
      border-color: rgba(96, 165, 250, 0.3);
    }
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
  margin-top: 3rem;
  border: "1px solid rgba(0, 0, 0, 0.1)"
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
  
  p {
    color: #93c5fd;
    margin: 0;
  }
  
  .footer-links {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    
    @media (max-width: 768px) {
      justify-content: center;
    }
    
    a {
      color: #93c5fd;
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.3s ease;
      
      &:hover {
        color: #60a5fa;
      }
    }
  }
`;

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const heroRef = useRef(null);
  
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const springY = useSpring(y1, { stiffness: 100, damping: 30 });

  const features = [
    {
      icon: Video,
      title: "Vidéo 4K Ultra HD",
      description: "Expérience visuelle révolutionnaire avec une qualité d'image exceptionnelle.",
      gradient: "#667eea, #764ba2",
      shadowColor: "rgba(102, 126, 234, 0.3)",
      benefits: ["Résolution 4K native", "HDR adaptatif", "Compression IA avancée"]
    },
    {
      icon: Shield,
      title: "Sécurité Quantique",
      description: "Protection maximale avec chiffrement quantique et authentification biométrique.",
      gradient: "#10b981, #34d399",
      shadowColor: "rgba(16, 185, 129, 0.3)",
      benefits: ["Chiffrement post-quantique", "Zero-Knowledge", "Blockchain sécurisée"]
    },
    {
      icon: Users,
      title: "Collaboration Infinie",
      description: "Réunissez jusqu'à 1000 participants avec IA de modération automatique.",
      gradient: "#f59e0b, #fbbf24",
      shadowColor: "rgba(245, 158, 11, 0.3)",
      benefits: ["1000 participants max", "IA collaborative", "Salles dynamiques"]
    },
    {
      icon: Zap,
      title: "Performance Quantique",
      description: "Latence ultra-faible et optimisations IA pour une expérience fluide.",
      gradient: "#ef4444, #f87171",
      shadowColor: "rgba(239, 68, 68, 0.3)",
      benefits: ["< 10ms latence", "Edge computing", "IA prédictive"]
    },
    {
      icon: Globe,
      title: "Métavers Intégré",
      description: "Réunions 3D immersives avec avatars et environnements virtuels.",
      gradient: "#8b5cf6, #a78bfa",
      shadowColor: "rgba(139, 92, 246, 0.3)",
      benefits: ["Avatars 3D", "Mondes virtuels", "Réalité mixte"]
    },
    {
      icon: Sparkles,
      title: "IA Générative",
      description: "Assistant IA intégré avec génération de contenu en temps réel.",
      gradient: "#06b6d4, #67e8f9",
      shadowColor: "rgba(6, 182, 212, 0.3)",
      benefits: ["GPT intégré", "Traduction temps réel", "Résumés automatiques"]
    }
  ];

  const stats = [
    { value: "2-4", label: "Participants moyens par réunion" },
    { value: "99.9%", label: "Satisfaction utilisateurs" },
    { value: "< 50ms", label: "Latence ultra-rapide" },
    { value: "AES-256", label: "Sécurité militaire" }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      description: "Parfait pour les équipes débutantes et les projets personnels",
      price: "0",
      period: "gratuit",
      icon: Rocket,
      iconBg: "linear-gradient(135deg, #10b981, #34d399)",
      gradient: "rgba(16, 185, 129, 0.1)",
      features: [
        "Jusqu'à 3 participants",
        "Réunions de 40 minutes max",
        "Qualité HD 720p",
        "Chat intégré",
        "Enregistrement local",
        "Support communautaire"
      ],
      buttonText: "Commencer gratuitement",
      buttonClass: "secondary"
    },
    {
      name: "Pro",
      description: "Idéal pour les équipes professionnelles et les entreprises moyennes",
      price: "29",
      period: "/mois",
      icon: Crown,
      iconBg: "linear-gradient(135deg, #60a5fa, #a78bfa)",
      gradient: "rgba(96, 165, 250, 0.1)",
      popular: true,
      features: [
        "Jusqu'à 10 participants",
        "Réunions illimitées",
        "Qualité 4K Ultra HD",
        "Chat + Partage d'écran",
        "Enregistrement cloud 100GB",
        "Salle d'attente personnalisée",
        "Intégrations avancées",
        "Support prioritaire"
      ],
      buttonText: "Commencer l'essai Pro",
      buttonClass: "primary"
    },
    {
      name: "Enterprise",
      description: "Solution complète pour les grandes organisations et entreprises",
      price: "99",
      period: "/mois",
      icon: Star,
      iconBg: "linear-gradient(135deg, #f59e0b, #fbbf24)",
      gradient: "rgba(245, 158, 11, 0.1)",
      features: [
        "Jusqu'à 50 participants",
        "Réunions illimitées",
        "Qualité 8K + IA améliorée",
        "Suite collaboration complète",
        "Stockage illimité",
        "Branding personnalisé",
        "API et webhooks",
        "Support dédié 24/7",
        "Formation équipe incluse"
      ],
      buttonText: "Contacter l'équipe",
      buttonClass: "secondary"
    }
  ];

  return (
    <AppContainer>
      <AnimatePresence>
        {isLoading && (
          <EpicLoader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* HEADER */}
          <Header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Nav>
              <Logo
                as={Link}
                to="/"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="logo-icon">
                  <Video size={24} color="#3b82f6" />
                </div>
                <div className="logo-text">VisioMeet</div>
              </Logo>

              <NavLinks>
                <NavLink 
                  as={Link}
                  to="/features"
                  whileHover={{ scale: 1.05 }}
                >
                  Fonctionnalités
                </NavLink>
                <NavLink 
                  as={Link}
                  to="/pricing"
                  whileHover={{ scale: 1.05 }}
                >
                  Tarifs
                </NavLink>
                <NavLink 
                  as={Link}
                  to="/about"
                  whileHover={{ scale: 1.05 }}
                >
                  À propos
                </NavLink>
                <NavLink 
                  as={Link}
                  to="/login"
                  whileHover={{ scale: 1.05 }}
                >
                  Connexion
                </NavLink>
                <Button
                  as={Link}
                  to="/signup"
                  className="primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  S'inscrire
                </Button>
              </NavLinks>

              <MobileMenuButton
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </MobileMenuButton>
            </Nav>
          </Header>

          {/* MOBILE MENU */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <MobileMenu
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <MobileNavLink 
                  as={Link}
                  to="/features"
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Fonctionnalités
                </MobileNavLink>
                <MobileNavLink 
                  as={Link}
                  to="/pricing"
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Tarifs
                </MobileNavLink>
                <MobileNavLink 
                  as={Link}
                  to="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  À propos
                </MobileNavLink>
                <MobileNavLink 
                  as={Link}
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Connexion
                </MobileNavLink>
                <Button
                  as={Link}
                  to="/signup"
                  className="primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ alignSelf: 'center', marginTop: '1rem' }}
                >
                  S'inscrire
                </Button>
              </MobileMenu>
            )}
          </AnimatePresence>

          {/* HERO SECTION */}
          <HeroSection ref={heroRef}>
            <ParallaxBackground style={{ y: springY }} />
            
            <FloatingElements>
              <motion.div 
                className="floating-icon" 
                style={{ top: "10%", left: "10%" }}
                animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                <Sparkles size={40} />
              </motion.div>
              <motion.div 
                className="floating-icon" 
                style={{ top: "20%", right: "15%" }}
                animate={{ y: [0, 30, 0], rotate: [360, 180, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
              >
                <Globe size={50} />
              </motion.div>
              <motion.div 
                className="floating-icon" 
                style={{ bottom: "20%", left: "20%" }}
                animate={{ y: [0, -25, 0], rotate: [0, 270, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <Shield size={35} />
              </motion.div>
            </FloatingElements>

            <HeroContent>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <HeroTitle>
                  <div style={{ color: '#3b82f6', marginBottom: '1rem' }}>
                    L'avenir des
                  </div>
                  <div className="gradient-text">
                    réunions virtuelles
                  </div>
                </HeroTitle>
              </motion.div>

              <HeroSubtitle
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Découvrez la plateforme révolutionnaire qui combine IA générative, 
                sécurité quantique et expériences métavers immersives.
              </HeroSubtitle>

              <HeroButtons
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <Button
                  as={Link}
                  to="/signup"
                  className="primary"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play size={20} />
                  Démarrer l'expérience
                  <ArrowRight size={18} />
                </Button>
                
                <Button
                  as={Link}
                  to="/features"
                  className="secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Eye size={20} />
                  Voir les fonctionnalités
                </Button>
              </HeroButtons>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <ChevronDown 
                  size={24} 
                  style={{ 
                    opacity: 0.6,
                    animation: 'bounce 2s infinite'
                  }} 
                />
              </motion.div>
            </HeroContent>
          </HeroSection>

          {/* FEATURES SECTION */}
          <FeaturesSection
            id="features"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <FeaturesGrid>
              {features.map((feature, index) => (
                <FeatureCard
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.02, 
                    y: -10,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
                  }}
                >
                  <FeatureIcon
                    gradient={feature.gradient}
                    shadowColor={feature.shadowColor}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon size={32} color="#3b82f6" />
                  </FeatureIcon>
                  
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                  
                  <FeatureList>
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx}>
                        <Check size={16} color="#10b981" />
                        {benefit}
                      </li>
                    ))}
                  </FeatureList>
                </FeatureCard>
              ))}
            </FeaturesGrid>
          </FeaturesSection>

          {/* PRICING SECTION */}
          <PricingSection
            id="pricing"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              style={{ textAlign: 'center', marginBottom: '4rem' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2
                style={{
                  fontSize: '3rem',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '1rem'
                }}
              >
                Choisissez votre plan
              </motion.h2>
              <motion.p
                style={{
                  fontSize: '1.2rem',
                  color: '#3b82f6',
                  maxWidth: '600px',
                  margin: '0 auto'
                }}
              >
                Des solutions flexibles adaptées à tous vos besoins, 
                de l'usage personnel aux grandes entreprises
              </motion.p>
            </motion.div>

            <PricingGrid>
              {pricingPlans.map((plan, index) => (
                <PricingCard
                  key={plan.name}
                  className={plan.popular ? 'popular' : ''}
                  gradient={plan.gradient}
                  iconBg={plan.iconBg}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className="plan-icon">
                    <plan.icon size={28} color="#3b82f6" />
                  </div>
                  
                  <div className="plan-name">{plan.name}</div>
                  <div className="plan-description">{plan.description}</div>
                  
                  <div className="plan-price">
                    <span className="currency">€</span>
                    {plan.price}
                    <span className="period">{plan.period}</span>
                  </div>
                  
                  <ul className="plan-features">
                    {plan.features.map((feature, idx) => (
                      <li key={idx}>
                        <Check className="check-icon" size={20} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <PricingButton
                    as={Link}
                    to={plan.name === 'Gratuit' ? '/signup' : plan.name === 'Pro' ? '/checkout' : '/contact'}
                    className={plan.buttonClass}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {plan.buttonText}
                  </PricingButton>
                </PricingCard>
              ))}
            </PricingGrid>
          </PricingSection>

          {/* STATS SECTION */}
          <StatsSection
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <StatsGrid>
              {stats.map((stat, index) => (
                <StatCard
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="stat-value"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="stat-label">{stat.label}</div>
                </StatCard>
              ))}
            </StatsGrid>
          </StatsSection>

          {/* ABOUT SECTION */}
          <StatsSection
            id="about"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ background: 'linear-gradient(135deg, #f8fafc, #e2e8f0, #ffffff)' }}
          >
            <motion.div
              style={{ textAlign: 'center', marginBottom: '4rem' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2
                style={{
                  fontSize: '3rem',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '1rem'
                }}
              >
                À propos du projet
              </motion.h2>
              <motion.p
                style={{
                  fontSize: '1.2rem',
                  color: '#3b82f6',
                  maxWidth: '800px',
                  margin: '0 auto 2rem',
                  lineHeight: '1.6'
                }}
              >
                VisioMeet est né de ma passion pour les technologies de communication moderne. 
                En tant que développeur full-stack, j'ai voulu créer une solution qui combine 
                innovation technologique et expérience utilisateur exceptionnelle.
              </motion.p>
              
              <motion.div
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                  gap: '2rem',
                  maxWidth: '1000px',
                  margin: '0 auto',
                  textAlign: 'left'
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  padding: '2rem',
                  border: "1px solid rgba(0, 0, 0, 0.1)"
                }}>
                  <h3 style={{ 
                    color: '#60a5fa', 
                    marginBottom: '1rem', 
                    fontSize: '1.4rem',
                    fontWeight: '600'
                  }}>
                    Ma vision
                  </h3>
                  <p style={{ 
                    color: '#1e40af', 
                    lineHeight: '1.6' 
                  }}>
                    Démocratiser l'accès à des outils de communication professionnels de haute qualité. 
                    Chaque équipe, quelle que soit sa taille, mérite une technologie qui amplifie sa collaboration.
                  </p>
                </div>
                
                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  padding: '2rem',
                  border: "1px solid rgba(0, 0, 0, 0.1)"
                }}>
                  <h3 style={{ 
                    color: '#a78bfa', 
                    marginBottom: '1rem', 
                    fontSize: '1.4rem',
                    fontWeight: '600'
                  }}>
                    Technologies utilisées
                  </h3>
                  <p style={{ 
                    color: '#1e40af', 
                    lineHeight: '1.6' 
                  }}>
                    React.js, WebRTC, Socket.io, Node.js, MongoDB, AI/ML pour l'optimisation vidéo, 
                    et bien d'autres technologies cutting-edge pour une expérience fluide.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <StatsGrid style={{ marginTop: '3rem' }}>
              <StatCard whileHover={{ scale: 1.05 }}>
                <div className="stat-value" style={{ color: '#60a5fa' }}>2024</div>
                <div className="stat-label">Année de création</div>
              </StatCard>
              <StatCard whileHover={{ scale: 1.05 }}>
                <div className="stat-value" style={{ color: '#a78bfa' }}>Open Source</div>
                <div className="stat-label">Philosophie</div>
              </StatCard>
              <StatCard whileHover={{ scale: 1.05 }}>
                <div className="stat-value" style={{ color: '#10b981' }}>99.9%</div>
                <div className="stat-label">Disponibilité visée</div>
              </StatCard>
              <StatCard whileHover={{ scale: 1.05 }}>
                <div className="stat-value" style={{ color: '#f59e0b' }}>♥</div>
                <div className="stat-label">Fait avec passion</div>
              </StatCard>
            </StatsGrid>
            
            <motion.div
              style={{ 
                textAlign: 'center', 
                marginTop: '4rem',
                padding: '2rem',
                background: 'rgba(96, 165, 250, 0.1)',
                borderRadius: '16px',
                border: '1px solid rgba(96, 165, 250, 0.2)'
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 style={{ 
                color: '#3b82f6', 
                marginBottom: '1rem', 
                fontSize: '1.5rem' 
              }}>
                Contactez-moi
              </h3>
              <p style={{ 
                color: '#1e40af', 
                marginBottom: '1.5rem' 
              }}>
                Une question, une suggestion, ou envie de collaborer ? 
                N'hésitez pas à me contacter !
              </p>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '2rem',
                flexWrap: 'wrap'
              }}>
                <motion.a
                  href="mailto:contact.visiomeet@gmail.com"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#3b82f6',
                    textDecoration: 'none',
                    padding: '0.75rem 1.5rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail size={20} />
                  Email
                </motion.a>
                <motion.a
                  href="https://github.com/visiomeet-project"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#3b82f6',
                    textDecoration: 'none',
                    padding: '0.75rem 1.5rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={20} />
                  GitHub
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/company/visiomeet"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#3b82f6',
                    textDecoration: 'none',
                    padding: '0.75rem 1.5rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin size={20} />
                  LinkedIn
                </motion.a>
              </div>
            </motion.div>
          </StatsSection>

          {/* FOOTER */}
          <FooterContainer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <FooterContent>
              <FooterSection>
                <h3>VisioMeet</h3>
                <p>
                  La plateforme de visioconférence nouvelle génération qui transforme 
                  vos réunions en expériences collaboratives exceptionnelles.
                </p>
                <SocialLinks>
                  <motion.a
                    href="https://github.com/visiomeet-project"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={20} />
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/company/visiomeet"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin size={20} />
                  </motion.a>
                  <motion.a
                    href="mailto:contact.visiomeet@gmail.com"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail size={20} />
                  </motion.a>
                </SocialLinks>
              </FooterSection>

              <FooterSection>
                <h3>Produit</h3>
                <ul>
                  <motion.li whileHover={{ x: 5 }}>
                    <a href="#features" onClick={(e) => { e.preventDefault(); document.getElementById('features').scrollIntoView({ behavior: 'smooth' }); }}>
                      Fonctionnalités
                    </a>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }}>
                    <a href="#pricing" onClick={(e) => { e.preventDefault(); document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' }); }}>
                      Tarifs
                    </a>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }}>
                    <Link to="/integrations">Intégrations</Link>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }}>
                    <Link to="/api-docs">API</Link>
                  </motion.li>
                </ul>
              </FooterSection>

              <FooterSection>
                <h3>Ressources</h3>
                <ul>
                  <motion.li whileHover={{ x: 5 }}>
                    <Link to="/user-guide">Guide utilisateur</Link>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }}>
                    <Link to="/support">Support</Link>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }}>
                    <Link to="/community">Communauté</Link>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }}>
                    <Link to="/status">Statut</Link>
                  </motion.li>
                </ul>
              </FooterSection>

              <FooterSection>
                <h3>Société</h3>
                <ul>
                  <motion.li whileHover={{ x: 5 }}>
                    <a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById('about').scrollIntoView({ behavior: 'smooth' }); }}>
                      À propos
                    </a>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }}>
                    <Link to="/contact">Contact</Link>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }}>
                    <Link to="/privacy">Confidentialité</Link>
                  </motion.li>
                  <motion.li whileHover={{ x: 5 }}>
                    <Link to="/security">Sécurité</Link>
                  </motion.li>
                </ul>
              </FooterSection>
            </FooterContent>

            <FooterBottom>
              <p>&copy; 2025 VisioMeet. Tous droits réservés.</p>
              <div className="footer-links">
                <Link to="/privacy">Politique de confidentialité</Link>
                <Link to="/terms">Conditions d'utilisation</Link>
                <Link to="/cookies">Cookies</Link>
              </div>
            </FooterBottom>
          </FooterContainer>
        </motion.div>
      )}
    </AppContainer>
  );
};

export default HomePage;