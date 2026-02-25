import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Server, Globe, Cpu, Lock } from 'lucide-react';

const COLORS = {
  primary: '#2563eb',    // Blue-600
  background: '#f8fafc', // Slate-50
  white: '#ffffff',      // White
  border: '#e2e8f0',     // Slate-200
  text: '#0f172a',       // Slate-900 (Dark text)
  muted: '#64748b'       // Slate-500
};

const Section = styled.section`
  padding: 5rem 1.5rem;
  background: ${COLORS.background};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const BentoWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, minmax(200px, auto));
  }
`;

const BentoCard = styled(motion.div)`
  background: ${COLORS.white};
  border: 1px solid ${COLORS.border};
  border-radius: 24px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${COLORS.primary};
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    transform: translateY(-4px);
  }

  &.large {
    grid-column: span 1;
    
    @media (min-width: 768px) {
      grid-column: span 2;
    }
  }
  
  &.tall {
    grid-row: span 1;
    
    @media (min-width: 768px) {
      grid-row: span 2;
    }
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const IconPill = styled.div`
  background: #eff6ff;
  color: ${COLORS.primary};
  padding: 0.5rem;
  border-radius: 12px;
  display: inline-flex;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${COLORS.text};
  margin-bottom: 0.5rem;
`;

const CardText = styled.p`
  color: ${COLORS.muted};
  line-height: 1.6;
`;

const Visualization = styled.div`
  margin-top: auto;
  height: 100px;
  background: linear-gradient(180deg, rgba(255,255,255,0) 0%, #eff6ff 100%);
  border-radius: 12px;
  border: 1px dashed ${COLORS.border};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: monospace;
  font-size: 0.75rem;
  color: ${COLORS.muted};
`;

const TechBentoGrid = () => {
    return (
        <Section>
            <Container>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-0.025em', color: COLORS.text }}>
                        Architecture Robuste
                    </h2>
                    <p style={{ color: COLORS.muted, fontSize: '1.125rem' }}>
                        Construit sur les standards ouverts les plus performants.
                    </p>
                </div>

                <BentoWrapper>
                    <BentoCard 
                        className="large"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <CardHeader>
                            <IconPill><Globe size={24} /></IconPill>
                        </CardHeader>
                        <div>
                            <CardTitle>Powered by WebRTC</CardTitle>
                            <CardText>
                                Le standard mondial pour la communication temps réel. Pas de plugins, pas d'installation, juste le navigateur.
                            </CardText>
                        </div>
                        <Visualization>PeerConnection API • ICE Candidates • DTLS</Visualization>
                    </BentoCard>

                    <BentoCard 
                        className="tall"
                         initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <CardHeader>
                            <IconPill><Server size={24} /></IconPill>
                        </CardHeader>
                        <div>
                            <CardTitle>SFU Architecture</CardTitle>
                            <CardText>
                                Un serveur de forwarding sélectif qui optimise la bande passante pour chaque participant, permettant des appels de groupe massifs sans surcharge client.
                            </CardText>
                        </div>
                         <Visualization style={{ height: '200px', flexDirection: 'column', gap: '8px' }}>
                            <div>Client A ⬆️</div>
                            <div style={{ padding: '4px 12px', background: '#eff6ff', borderRadius: '4px' }}>SFU Core</div>
                            <div>⬇️ Client B, C, D</div>
                         </Visualization>
                    </BentoCard>

                    <BentoCard
                         initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <CardHeader>
                            <IconPill><Cpu size={24} /></IconPill>
                        </CardHeader>
                        <div>
                            <CardTitle>Low Latency</CardTitle>
                            <CardText>
                                Latence &lt; 50ms sur réseau local grâce à l'optimisation UDP first.
                            </CardText>
                        </div>
                    </BentoCard>

                    <BentoCard
                         initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <CardHeader>
                             <IconPill><Lock size={24} /></IconPill>
                        </CardHeader>
                        <div>
                            <CardTitle>E2E Encrypted</CardTitle>
                            <CardText>
                                Vos flux médias sont chiffrés de bout en bout.
                            </CardText>
                        </div>
                    </BentoCard>
                </BentoWrapper>
            </Container>
        </Section>
    );
};

export default TechBentoGrid;
