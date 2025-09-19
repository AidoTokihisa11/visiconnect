import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { 
  Play,
  ArrowRight,
  Check,
  Users,
  Shield,
  Zap,
  Sparkles,
  Star
} from 'lucide-react';

const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
`;

const BackgroundEffects = styled.div`
  position: absolute;
  inset: 0;
  
  .orb1 {
    position: absolute;
    top: 25%;
    left: 25%;
    width: 384px;
    height: 384px;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.2), transparent);
    border-radius: 50%;
    filter: blur(60px);
  }
  
  .orb2 {
    position: absolute;
    bottom: 25%;
    right: 25%;
    width: 320px;
    height: 320px;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.2), transparent);
    border-radius: 50%;
    filter: blur(60px);
  }
  
  .floating-icon {
    position: absolute;
    opacity: 0.1;
    color: #3b82f6;
  }
  
  .floating-icon.sparkle1 {
    top: 80px;
    right: 80px;
  }
  
  .floating-icon.star1 {
    bottom: 128px;
    left: 80px;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 1rem;
  text-align: center;
`;

const Badge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2));
  backdrop-filter: blur(10px);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 50px;
  padding: 0.5rem 1rem;
  margin-bottom: 2rem;
  
  span {
    color: #3b82f6;
    font-size: 0.875rem;
    font-weight: 500;
  }
  
  .pulse {
    width: 8px;
    height: 8px;
    background: #10b981;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: bold;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  
  .gradient-text {
    background: linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: #3b82f6;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  
  .highlight {
    color: #60a5fa;
    font-weight: 600;
  }
`;

const CTAButtons = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 4rem;
  
  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const Button = styled(motion.button)`
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  font-size: 1rem;
  
  &.primary {
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    color: #3b82f6;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 20px 25px rgba(59, 130, 246, 0.25);
    }
  }
  
  &.secondary {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #3b82f6;
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const FeaturesList = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const FeatureItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
  
  .check-icon {
    width: 24px;
    height: 24px;
    background: linear-gradient(135deg, #10b981, #34d399);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  span {
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
  }
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-5px);
  }
  
  .icon {
    width: 48px;
    height: 48px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    
    &.blue { background: linear-gradient(135deg, #3b82f6, #60a5fa); }
    &.green { background: linear-gradient(135deg, #10b981, #34d399); }
    &.purple { background: linear-gradient(135deg, #8b5cf6, #a78bfa); }
  }
  
  .value {
    font-size: 2rem;
    font-weight: bold;
    color: #3b82f6;
    margin-bottom: 0.5rem;
  }
  
  .label {
    color: #60a5fa;
    font-size: 0.875rem;
  }
`;

const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const features = [
    "Qualité vidéo 4K Ultra HD",
    "Jusqu'à 100 participants",
    "Chiffrement de bout en bout",
    "Tableau blanc collaboratif",
    "Enregistrement cloud illimité"
  ];

  const stats = [
    { icon: Users, value: "50K+", label: "Utilisateurs actifs", color: "blue" },
    { icon: Shield, value: "99.9%", label: "Uptime garanti", color: "green" },
    { icon: Zap, value: "<50ms", label: "Latence moyenne", color: "purple" },
  ];

  return (
    <HeroContainer ref={ref}>
      <BackgroundEffects>
        <motion.div
          className="orb1"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="orb2"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        
        <motion.div
          className="floating-icon sparkle1"
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles size={32} />
        </motion.div>
        <motion.div
          className="floating-icon star1"
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <Star size={24} />
        </motion.div>
      </BackgroundEffects>

      <Content>
        <motion.div
          initial={{ opacity: 0 }}
          animate={mainControls}
          variants={{
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2, duration: 0.6 }
            }
          }}
        >
          {/* Badge */}
          <Badge
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Sparkles size={16} color="#60a5fa" />
            <span>Nouvelle génération de visioconférence</span>
            <div className="pulse" />
          </Badge>

          {/* Main Title */}
          <Title
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <div style={{ color: 'white', marginBottom: '0.5rem' }}>
              Révolutionnez vos
            </div>
            <div className="gradient-text">
              réunions virtuelles
            </div>
          </Title>
          
          <Subtitle
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            Découvrez la plateforme qui combine{' '}
            <span className="highlight">qualité 4K</span>,{' '}
            <span className="highlight">sécurité avancée</span> et{' '}
            <span className="highlight">collaboration intuitive</span>.
          </Subtitle>

          {/* CTA Buttons */}
          <CTAButtons
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          >
            <Button
              as={Link}
              to="/signup"
              className="primary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play size={18} />
              Démarrer gratuitement
              <ArrowRight size={16} />
            </Button>
            
            <Button
              as={Link}
              to="/features"
              className="secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Voir les fonctionnalités
            </Button>
          </CTAButtons>

          {/* Features List */}
          <FeaturesList
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          >
            {features.map((feature, index) => (
              <FeatureItem
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              >
                <div className="check-icon">
                  <Check size={14} color="#3b82f6" />
                </div>
                <span>{feature}</span>
              </FeatureItem>
            ))}
          </FeaturesList>

          {/* Stats */}
          <StatsGrid
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          >
            {stats.map((stat, index) => (
              <StatCard
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className={`icon ${stat.color}`}>
                  <stat.icon size={24} color="#3b82f6" />
                </div>
                <div className="value">{stat.value}</div>
                <div className="label">{stat.label}</div>
              </StatCard>
            ))}
          </StatsGrid>
        </motion.div>
      </Content>
    </HeroContainer>
  );
};

export default HeroSection;