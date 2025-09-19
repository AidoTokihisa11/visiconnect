import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Zap, Globe, Shield } from 'lucide-react';

// Animations keyframes
const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(120deg); }
  66% { transform: translateY(10px) rotate(240deg); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const wave = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const LoaderContainer = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 9999;
  overflow: hidden;
`;

// Particules d'arrière-plan
const ParticlesContainer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

const Particle = styled(motion.div)`
  position: absolute;
  width: ${props => props.size || 4}px;
  height: ${props => props.size || 4}px;
  background: ${props => props.color || '#60a5fa'};
  border-radius: 50%;
  box-shadow: 0 0 10px ${props => props.color || '#60a5fa'};
`;

// Logo principal animé
const LogoContainer = styled(motion.div)`
  position: relative;
  margin-bottom: 3rem;
  filter: drop-shadow(0 0 30px rgba(96, 165, 250, 0.5));
`;

const LogoCore = styled(motion.div)`
  width: 120px;
  height: 120px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 30px;
  box-shadow: 
    0 0 60px rgba(102, 126, 234, 0.6),
    inset 0 0 20px rgba(255, 255, 255, 0.1);
`;

const LogoRings = styled.div`
  position: absolute;
  inset: -20px;
  border-radius: 50%;
  
  &::before, &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 2px solid;
    animation: ${rotate} 3s linear infinite;
  }
  
  &::before {
    border-color: #60a5fa transparent #a78bfa transparent;
    animation-duration: 3s;
  }
  
  &::after {
    border-color: transparent #f472b6 transparent #34d399;
    animation-duration: 4s;
    animation-direction: reverse;
  }
`;

// Barre de progression futuriste
const ProgressContainer = styled.div`
  width: 400px;
  max-width: 80vw;
  position: relative;
  margin-bottom: 2rem;
`;

const ProgressTrack = styled.div`
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(96, 165, 250, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    animation: ${wave} 2s ease-in-out infinite;
  }
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6);
  border-radius: 8px;
  position: relative;
  box-shadow: 0 0 20px rgba(96, 165, 250, 0.8);
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent 0%, #60a5fa 50%, transparent 100%);
    background-size: 200% 100%;
    animation: ${shimmer} 2s ease-in-out infinite;
    border-radius: inherit;
  }
`;

// Textes et statistiques
const LoadingText = styled(motion.div)`
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-align: center;
  background: linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 10px rgba(96, 165, 250, 0.3));
`;

const LoadingSubtext = styled(motion.div)`
  color: #60a5fa;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const StatsContainer = styled(motion.div)`
  display: flex;
  gap: 3rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    gap: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const StatItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  
  .icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, ${props => props.gradient});
    animation: ${float} 4s ease-in-out infinite;
    animation-delay: ${props => props.delay}s;
  }
  
  .value {
    color: #333;
    font-size: 1.25rem;
    font-weight: bold;
  }
  
  .label {
    color: #93c5fd;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

// Messages de chargement dynamiques
const loadingMessages = [
  "Initialisation de la plateforme...",
  "Connexion aux serveurs sécurisés...",
  "Chargement des fonctionnalités IA...",
  "Configuration de la qualité 4K...",
  "Activation du chiffrement avancé...",
  "Optimisation des performances...",
  "Préparation de l'expérience ultime...",
  "Finalisation..."
];

const EpicLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const particlesRef = useRef([]);

  // Génération des particules
  useEffect(() => {
    const generateParticles = () => {
      return Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        color: ['#60a5fa', '#a78bfa', '#f472b6', '#34d399'][Math.floor(Math.random() * 4)],
        duration: Math.random() * 10 + 5,
        delay: Math.random() * 2
      }));
    };

    particlesRef.current = generateParticles();
  }, []);

  // Animation du progress et changement de messages
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15 + 5;
        if (newProgress >= 100) {
          setIsComplete(true);
          clearInterval(interval);
          setTimeout(() => onComplete?.(), 1000);
          return 100;
        }
        return newProgress;
      });

      setMessageIndex(prev => (prev + 1) % loadingMessages.length);
    }, 800);

    return () => clearInterval(interval);
  }, [onComplete]);

  const stats = [
    { icon: Video, value: "4K", label: "Ultra HD", gradient: "#60a5fa, #8b5cf6", delay: 0 },
    { icon: Shield, value: "256", label: "Sécurité", gradient: "#10b981, #34d399", delay: 0.5 },
    { icon: Zap, value: "<50ms", label: "Latence", gradient: "#f59e0b, #fbbf24", delay: 1 },
    { icon: Globe, value: "99.9%", label: "Uptime", gradient: "#ef4444, #f87171", delay: 1.5 }
  ];

  return (
    <AnimatePresence>
      {!isComplete && (
        <LoaderContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Particules d'arrière-plan */}
          <ParticlesContainer>
            {particlesRef.current.map((particle) => (
              <Particle
                key={particle.id}
                size={particle.size}
                color={particle.color}
                initial={{ 
                  x: particle.x, 
                  y: particle.y,
                  opacity: 0,
                  scale: 0
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: particle.y - 100
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "easeOut"
                }}
              />
            ))}
          </ParticlesContainer>

          {/* Logo principal avec anneaux */}
          <LogoContainer
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <LogoRings />
            <LogoCore
              animate={{ 
                rotateY: [0, 360],
                boxShadow: [
                  "0 0 60px rgba(102, 126, 234, 0.6)",
                  "0 0 80px rgba(167, 139, 250, 0.8)",
                  "0 0 60px rgba(102, 126, 234, 0.6)"
                ]
              }}
              transition={{
                rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <Video size={48} color="#3b82f6" />
            </LogoCore>
          </LogoContainer>

          {/* Textes de chargement */}
          <LoadingText
            key={messageIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {loadingMessages[messageIndex]}
          </LoadingText>

          <LoadingSubtext
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            VisioMeet - Expérience Nouvelle Génération
          </LoadingSubtext>

          {/* Barre de progression futuriste */}
          <ProgressContainer>
            <ProgressTrack>
              <ProgressFill
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </ProgressTrack>
          </ProgressContainer>

          {/* Statistiques animées */}
          <StatsContainer
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {stats.map((stat, index) => (
              <StatItem
                key={stat.label}
                gradient={stat.gradient}
                delay={stat.delay}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
              >
                <div className="icon">
                  <stat.icon size={20} color="#3b82f6" />
                </div>
                <div className="value">{stat.value}</div>
                <div className="label">{stat.label}</div>
              </StatItem>
            ))}
          </StatsContainer>
        </LoaderContainer>
      )}
    </AnimatePresence>
  );
};

export default EpicLoader;