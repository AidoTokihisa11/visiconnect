import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import styled from 'styled-components';
import {
  Video,
  Shield,
  Users,
  Paintbrush,
  Cloud,
  Zap,
  ArrowRight,
  Check
} from 'lucide-react';

const FeaturesContainer = styled.section`
  padding: 6rem 1rem;
  background: linear-gradient(180deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
  position: relative;
  overflow: hidden;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.03;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(circle at 2px 2px, white 1px, transparent 0);
    background-size: 40px 40px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 5rem;
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
  margin-bottom: 1.5rem;
  
  span {
    color: #60a5fa;
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

const Title = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: bold;
  color: #3b82f6;
  margin-bottom: 1rem;
  line-height: 1.1;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: #60a5fa;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const FeaturesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(59, 130, 246, 0.3);
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(59, 130, 246, 0.1);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const FeatureIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  position: relative;
  
  &.blue { 
    background: linear-gradient(135deg, #3b82f6, #60a5fa);
    box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
  }
  &.purple { 
    background: linear-gradient(135deg, #8b5cf6, #a78bfa);
    box-shadow: 0 8px 32px rgba(139, 92, 246, 0.3);
  }
  &.green { 
    background: linear-gradient(135deg, #10b981, #34d399);
    box-shadow: 0 8px 32px rgba(16, 185, 129, 0.3);
  }
  &.orange { 
    background: linear-gradient(135deg, #f59e0b, #fbbf24);
    box-shadow: 0 8px 32px rgba(245, 158, 11, 0.3);
  }
  &.red { 
    background: linear-gradient(135deg, #ef4444, #f87171);
    box-shadow: 0 8px 32px rgba(239, 68, 68, 0.3);
  }
  &.indigo { 
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    box-shadow: 0 8px 32px rgba(99, 102, 241, 0.3);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #3b82f6;
  margin-bottom: 0.75rem;
`;

const FeatureDescription = styled.p`
  color: #60a5fa;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #3b82f6;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    svg {
      width: 16px;
      height: 16px;
      color: #10b981;
      flex-shrink: 0;
    }
  }
`;

const CTASection = styled(motion.div)`
  text-align: center;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 3rem 2rem;
  backdrop-filter: blur(20px);
`;

const CTATitle = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  color: #3b82f6;
  margin-bottom: 1rem;
`;

const CTADescription = styled.p`
  color: #60a5fa;
  font-size: 1.125rem;
  margin-bottom: 2rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: #3b82f6;
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 25px rgba(59, 130, 246, 0.25);
  }
`;

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const features = [
    {
      icon: Video,
      iconColor: 'blue',
      title: 'Vidéo Ultra HD',
      description: 'Profitez d\'une qualité vidéo exceptionnelle jusqu\'en 4K avec notre technologie de compression avancée.',
      benefits: [
        'Résolution jusqu\'à 4K',
        'Adaptation automatique de la bande passante',
        'Optimisation en temps réel'
      ]
    },
    {
      icon: Shield,
      iconColor: 'green',
      title: 'Sécurité Maximale',
      description: 'Vos données sont protégées par un chiffrement de bout en bout et des protocoles de sécurité avancés.',
      benefits: [
        'Chiffrement AES-256',
        'Authentification à deux facteurs',
        'Conformité RGPD'
      ]
    },
    {
      icon: Users,
      iconColor: 'purple',
      title: 'Collaboration Sans Limites',
      description: 'Réunissez jusqu\'à 100 participants avec des outils de collaboration intégrés.',
      benefits: [
        'Jusqu\'à 100 participants',
        'Salles de sous-groupes',
        'Gestion des permissions'
      ]
    },
    {
      icon: Paintbrush,
      iconColor: 'orange',
      title: 'Tableau Blanc Interactif',
      description: 'Créez, dessinez et collaborez en temps réel sur un tableau blanc partagé.',
      benefits: [
        'Dessin collaboratif',
        'Modèles prédéfinis',
        'Sauvegarde automatique'
      ]
    },
    {
      icon: Cloud,
      iconColor: 'indigo',
      title: 'Enregistrement Cloud',
      description: 'Enregistrez et partagez vos réunions avec un stockage cloud illimité.',
      benefits: [
        'Stockage illimité',
        'Transcription automatique',
        'Partage sécurisé'
      ]
    },
    {
      icon: Zap,
      iconColor: 'red',
      title: 'Performance Optimale',
      description: 'Expérience fluide avec une latence minimale et une disponibilité de 99.9%.',
      benefits: [
        'Latence < 50ms',
        'Uptime 99.9%',
        'CDN mondial'
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <FeaturesContainer ref={ref}>
      <BackgroundPattern />
      <Container>
        <Header>
          <Badge
            initial={{ y: 30, opacity: 0 }}
            animate={controls}
            variants={itemVariants}
          >
            <Zap size={16} />
            <span>Fonctionnalités</span>
          </Badge>
          
          <Title
            initial={{ y: 30, opacity: 0 }}
            animate={controls}
            variants={itemVariants}
          >
            Tout ce dont vous avez besoin
          </Title>
          
          <Subtitle
            initial={{ y: 30, opacity: 0 }}
            animate={controls}
            variants={itemVariants}
          >
            Une plateforme complète qui révolutionne votre façon de collaborer
          </Subtitle>
        </Header>

        <FeaturesGrid
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <FeatureIcon className={feature.iconColor}>
                <feature.icon size={28} color="#3b82f6" />
              </FeatureIcon>
              
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              
              <FeatureList>
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx}>
                    <Check size={16} />
                    {benefit}
                  </li>
                ))}
              </FeatureList>
            </FeatureCard>
          ))}
        </FeaturesGrid>

        <CTASection
          initial={{ y: 50, opacity: 0 }}
          animate={controls}
          variants={{
            visible: {
              y: 0,
              opacity: 1,
              transition: {
                delay: 0.8,
                duration: 0.6,
                ease: "easeOut"
              }
            }
          }}
        >
          <CTATitle>Prêt à transformer vos réunions ?</CTATitle>
          <CTADescription>
            Rejoignez plus de 50 000 utilisateurs qui font confiance à notre plateforme
          </CTADescription>
          <CTAButton
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Commencer gratuitement
            <ArrowRight size={18} />
          </CTAButton>
        </CTASection>
      </Container>
    </FeaturesContainer>
  );
};

export default FeaturesSection;