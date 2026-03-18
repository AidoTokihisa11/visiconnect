import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MessageSquare, Video, ShieldCheck } from 'lucide-react';

const PanelContainer = styled.div`
  flex: 1;
  display: none;
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
  position: relative;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  padding: 4rem;

  @media (min-width: 1024px) {
    display: flex;
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
  border-radius: 20px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

const ContentText = styled(motion.div)`
  z-index: 10;
  max-width: 550px;
  position: relative;
  
  h2 {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    line-height: 1.1;
    background: linear-gradient(to right, #ffffff 0%, #93c5fd 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.02em;
  }
  
  p {
    font-size: 1.25rem;
    color: #94a3b8;
    line-height: 1.7;
    margin-bottom: 2rem;
  }
`;

const CircleDecoration = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  filter: blur(40px);
  opacity: 0.4;
  z-index: 0;
`;

const IconBox = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${props => props.$bg || 'rgba(59, 130, 246, 0.2)'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ElementText = styled.div`
  h4 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 0.25rem 0;
  }
  span {
    font-size: 0.85rem;
    color: #94a3b8;
  }
`;

export const AuthRightPanel = ({ title, description }) => {
  return (
    <PanelContainer>
      <DarkOverlay />
      
      {/* Decorative Orbs */}
      <CircleDecoration 
        style={{ width: '400px', height: '400px', top: '-10%', right: '-5%' }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <CircleDecoration 
        style={{ width: '300px', height: '300px', bottom: '-5%', left: '10%' }}
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Floating UI Elements */}
      <FloatingElement
        initial={{ opacity: 0, x: 50, y: -50 }}
        animate={{ opacity: 1, x: 0, y: [0, -15, 0] }}
        transition={{ opacity: { duration: 0.8 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
        style={{ top: '15%', right: '10%' }}
      >
        <IconBox $bg="rgba(16, 185, 129, 0.2)"><Video color="#34d399" size={24} /></IconBox>
        <ElementText>
          <h4>Appels 4K Ultra HD</h4>
          <span>Latence minimale garantie</span>
        </ElementText>
      </FloatingElement>

      <FloatingElement
        initial={{ opacity: 0, x: -50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: [0, 20, 0] }}
        transition={{ opacity: { duration: 0.8, delay: 0.3 }, y: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}
        style={{ bottom: '20%', left: '5%' }}
      >
        <IconBox $bg="rgba(245, 158, 11, 0.2)"><ShieldCheck color="#fbbf24" size={24} /></IconBox>
        <ElementText>
          <h4>Chiffrement de bout en bout</h4>
          <span>Sécurité maximale</span>
        </ElementText>
      </FloatingElement>

      <FloatingElement
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
        transition={{ opacity: { duration: 0.8, delay: 0.6 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 } }}
        style={{ top: '40%', right: '5%', padding: '1rem', borderRadius: '50%' }}
      >
        <IconBox style={{ width: '60px', height: '60px', borderRadius: '50%' }} $bg="rgba(139, 92, 246, 0.2)">
          <MessageSquare color="#a78bfa" size={28} />
        </IconBox>
      </FloatingElement>

      <ContentText
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
      >
        <h2>{title}</h2>
        <p>{description}</p>
        
        <motion.div 
          style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <div style={{ display: 'flex', border: '2px solid rgba(255,255,255,0.1)', padding: '0.2rem', borderRadius: '2rem', background: 'rgba(0,0,0,0.2)' }}>
            {[1,2,3,4].map((i) => (
              <img 
                key={i} 
                src={`https://i.pravatar.cc/100?img=${i+10}`} 
                alt="user" 
                style={{ width: '38px', height: '38px', borderRadius: '50%', border: '2px solid #0f172a', marginLeft: i === 1 ? '0' : '-12px' }}
              />
            ))}
          </div>
          <span style={{ fontSize: '0.95rem', fontWeight: '500', color: '#cbd5e1' }}>+10,000 équipes connectées</span>
        </motion.div>
      </ContentText>

    </PanelContainer>
  );
};
