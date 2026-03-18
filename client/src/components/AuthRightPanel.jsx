import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MessageSquare, Video, ShieldCheck } from 'lucide-react';

const PanelContainer = styled.div`
  flex: 1;
  display: flex;
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
  position: relative;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  min-height: 400px; /* for mobile */

  @media (min-width: 1024px) {
    padding: 4rem;
    min-height: 100vh;
  }
`;

const DarkOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 80% 20%, rgba(37, 99, 235, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 20% 80%, rgba(56, 189, 248, 0.1) 0%, transparent 50%);
  z-index: 1;
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1rem;
  display: none; /* hide on very small default */
  align-items: center;
  gap: 1rem;
  color: white;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  z-index: 2;
  
  @media (min-width: 640px) {
     display: flex; /* show on tablets+ */
  }
`;

const ContentText = styled(motion.div)`
  z-index: 10;
  max-width: 550px;
  position: relative;
  text-align: center;
  
  @media (min-width: 1024px) {
    text-align: left;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1.5rem;
  line-height: 1.2;

  @media (min-width: 1024px) {
    font-size: 3rem;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 2rem;

  @media (min-width: 1024px) {
    font-size: 1.25rem;
  }
`;

const DecorativeOrb = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  z-index: 0;
`;

const AuthRightPanel = ({ title, description }) => {
  return (
    <PanelContainer>
      <DarkOverlay />
      
      <DecorativeOrb 
        style={{ top: '10%', right: '20%', width: '300px', height: '300px', background: 'rgba(59, 130, 246, 0.3)' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <DecorativeOrb 
        style={{ bottom: '10%', left: '10%', width: '250px', height: '250px', background: 'rgba(16, 185, 129, 0.2)' }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <ContentText
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Title>{title}</Title>
        <Description>{description}</Description>
      </ContentText>

      { /* Floating elements to add dimension - hidden on small mobile to avoid clutter */ }
      <FloatingElement
        style={{ top: '15%', left: '10%' }}
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Video color="#3b82f6" size={24} />
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e2e8f0' }}>Vidéo 4K</div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Qualité ultra-nette</div>
        </div>
      </FloatingElement>

      <FloatingElement
        style={{ top: '45%', right: '5%' }}
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <ShieldCheck color="#10b981" size={24} />
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e2e8f0' }}>100% Sécurisé</div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Chiffrement de bout en bout</div>
        </div>
      </FloatingElement>

      <FloatingElement
        style={{ bottom: '20%', left: '15%' }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <MessageSquare color="#8b5cf6" size={24} />
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e2e8f0' }}>Chat en direct</div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Collaboration instantanée</div>
        </div>
      </FloatingElement>

    </PanelContainer>
  );
};

export default AuthRightPanel;
