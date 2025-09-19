import React from "react";
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Video, 
  Rocket, 
  Crown, 
  Star, 
  Check, 
  ArrowRight
} from 'lucide-react';

const PageContainer = styled.div`
  min-height: 100vh;
  background: var(--bg-primary, #ffffff);
  color: var(--text-primary, #1e293b);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

// HEADER IDENTIQUE À LA HOMEPAGE
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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

const PricingSection = styled.section`
  padding: 8rem 2rem 4rem;
  max-width: 1400px;
  margin: 0 auto;
  text-align: center;
`;

const SectionTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 800;
  background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: var(--text-secondary, #475569);
  max-width: 600px;
  margin: 0 auto 4rem;
  line-height: 1.6;
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const PricingCard = styled(motion.div)`
  background: var(--bg-card, rgba(255, 255, 255, 0.95));
  backdrop-filter: blur(20px);
  border: 2px solid ${props => props.popular ? 'var(--accent-cyan, #06b6d4)' : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 24px;
  padding: 2.5rem;
  position: relative;
  transform: ${props => props.popular ? 'scale(1.05)' : 'scale(1)'};
  box-shadow: ${props => props.popular ? 
    'var(--shadow-xl, 0 20px 40px rgba(0, 0, 0, 0.15))' : 
    'var(--shadow-lg, 0 8px 25px rgba(0, 0, 0, 0.1))'};
  
  &:hover {
    transform: ${props => props.popular ? 'scale(1.07)' : 'scale(1.02)'};
    box-shadow: var(--shadow-xl, 0 20px 40px rgba(0, 0, 0, 0.15));
  }
  
  transition: all 0.3s ease;
`;

const PopularBadge = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--accent-cyan, #06b6d4);
  color: white;
  padding: 0.5rem 2rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
`;

const PlanIcon = styled.div`
  width: 60px;
  height: 60px;
  background: ${props => props.gradient || 'var(--primary-gradient, #2563eb)'};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
`;

const PlanName = styled.h3`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary, #1e293b);
  margin-bottom: 0.5rem;
`;

const PlanDescription = styled.p`
  color: var(--text-secondary, #475569);
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const PlanPrice = styled.div`
  margin-bottom: 2rem;
  
  .price {
    font-size: 3rem;
    font-weight: 800;
    color: var(--text-primary, #1e293b);
    line-height: 1;
  }
  
  .period {
    color: var(--text-secondary, #475569);
    font-size: 1rem;
    margin-left: 0.5rem;
  }
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 2.5rem;
  text-align: left;
`;

const Feature = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  color: var(--text-secondary, #475569);
  
  .check-icon {
    color: var(--accent-emerald, #10b981);
    flex-shrink: 0;
  }
`;

const PlanButton = styled(motion.button)`
  width: 100%;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &.primary {
    background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
    color: white;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4);
    }
  }
  
  &.secondary {
    background: var(--bg-secondary, #f8fafc);
    color: var(--text-primary, #1e293b);
    border: 1px solid rgba(0, 0, 0, 0.1);
    
    &:hover {
      background: var(--bg-tertiary, #f1f5f9);
      transform: translateY(-2px);
    }
  }
`;

const PricingPage = () => {
  const pricingPlans = [
    {
      name: "Starter",
      description: "Parfait pour les équipes débutantes et les projets personnels",
      price: "0",
      period: "gratuit",
      icon: Rocket,
      iconGradient: "linear-gradient(135deg, #10b981, #34d399)",
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
      iconGradient: "linear-gradient(135deg, #60a5fa, #a78bfa)",
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
      iconGradient: "linear-gradient(135deg, #f59e0b, #fbbf24)",
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
    <PageContainer>
      {/* Header avec navigation */}
      <Header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Nav>
          <Logo
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
              <div className="logo-icon">
                <Video size={24} color="white" />
              </div>
              <div className="logo-text">VisiConnect</div>
            </Link>
          </Logo>

          <NavLinks>
            <NavLink to="/">Accueil</NavLink>
            <NavLink to="/features">Fonctionnalités</NavLink>
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
      </Header>

      {/* Section Tarifs */}
      <PricingSection>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Nos Tarifs
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Choisissez le plan parfait pour votre équipe, de l'usage personnel aux grandes entreprises
        </SectionSubtitle>

        <PricingGrid>
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={plan.name}
              popular={plan.popular}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              {plan.popular && <PopularBadge>Le plus populaire</PopularBadge>}
              
              <PlanIcon gradient={plan.iconGradient}>
                <plan.icon size={28} />
              </PlanIcon>
              
              <PlanName>{plan.name}</PlanName>
              <PlanDescription>{plan.description}</PlanDescription>
              
              <PlanPrice>
                <span className="price">{plan.price}€</span>
                <span className="period">{plan.period}</span>
              </PlanPrice>
              
              <FeaturesList>
                {plan.features.map((feature, i) => (
                  <Feature key={i}>
                    <Check size={16} className="check-icon" />
                    {feature}
                  </Feature>
                ))}
              </FeaturesList>
              
              <PlanButton
                className={plan.buttonClass}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (plan.name === 'Starter') {
                    window.location.href = '/signup';
                  } else if (plan.name === 'Pro') {
                    window.location.href = '/checkout';
                  } else {
                    window.location.href = '/contact';
                  }
                }}
              >
                {plan.buttonText}
                <ArrowRight size={16} />
              </PlanButton>
            </PricingCard>
          ))}
        </PricingGrid>
      </PricingSection>
    </PageContainer>
  );
};

export default PricingPage;
