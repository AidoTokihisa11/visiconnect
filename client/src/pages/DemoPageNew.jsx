import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';
import { 
  Play, Users, Shield, Zap, Globe, Check, 
  Laptop
} from 'lucide-react';

const COLORS = {
  primary: 'hsl(var(--primary))',    
  primaryDark: 'hsl(var(--primary))',
  secondary: 'hsl(var(--muted-foreground))',  
  dark: 'hsl(var(--foreground))',       
  text: 'hsl(var(--foreground))',       
  lightText: 'hsl(var(--muted-foreground))',  
  background: 'hsl(var(--background))', 
  white: 'hsl(var(--card))',
  border: 'hsl(var(--border))',     
  success: 'hsl(var(--primary))',    
  accent: 'hsl(var(--accent))'
};

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${COLORS.background};
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: ${COLORS.text};
  transition: background-color 0.3s ease, color 0.3s ease;
`;

// --- ANIMATIONS ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// --- COMPONENTS ---

const HeroSection = styled.section`
  background-color: hsl(var(--secondary)); /* Light blue solid / dark */
  padding: 8rem 2rem 6rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s ease;
`;

const HeroBadge = styled.span`
  background-color: #dbeafe;
  color: ${COLORS.primary};
  font-weight: 600;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  display: inline-block;
  margin-bottom: 1.5rem;
  animation: ${fadeIn} 0.6s ease-out;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  color: ${COLORS.dark};
  margin-bottom: 1.5rem;
  line-height: 1.1;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  animation: ${fadeIn} 0.6s ease-out 0.1s backwards;

  span {
    color: ${COLORS.primary};
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: ${COLORS.lightText};
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.6;
  animation: ${fadeIn} 0.6s ease-out 0.2s backwards;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 4rem;
  animation: ${fadeIn} 0.6s ease-out 0.3s backwards;
  
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const PrimaryButton = styled(Link)`
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.125rem;
  text-decoration: none;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);

  &:hover {
    background-color: ${COLORS.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
  }
`;

const SecondaryButton = styled(Link)`
  background-color: ${COLORS.white};
  color: ${COLORS.secondary};
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.125rem;
  text-decoration: none;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 1px solid ${COLORS.border};

  &:hover {
    background-color: #f1f5f9;
    color: ${COLORS.dark};
    border-color: #cbd5e1;
  }
`;

// --- INTERACTIVE DEMO PREVIEW ---
const PreviewContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  background: ${COLORS.dark};
  border-radius: 24px;
  padding: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  position: relative;
  animation: ${fadeIn} 0.8s ease-out 0.4s backwards;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const PreviewBrowser = styled.div`
  background: ${COLORS.background};
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  aspect-ratio: 16/9;
  display: flex;
  flex-direction: column;
`;

const BrowserHeader = styled.div`
  background: #e2e8f0;
  padding: 0.75rem 1rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;

  .dots {
    display: flex;
    gap: 6px;
    div {
      width: 10px; 
      height: 10px; 
      border-radius: 50%;
    }
    .red { background: #ef4444; }
    .yellow { background: #f59e0b; }
    .green { background: #10b981; }
  }

  .bar {
    background: ${COLORS.white};
    flex: 1;
    margin-left: 1rem;
    height: 24px;
    border-radius: 4px;
    font-size: 0.75rem;
    color: ${COLORS.lightText};
    display: flex;
    align-items: center;
    padding-left: 10px;
  }
`;

const PreviewContent = styled.div`
  flex: 1;
  background: #1e293b;
  position: relative;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr auto;
  gap: 1rem;
  padding: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FakeVideo = styled.div`
  background: #0f172a;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.lightText};
  
  &.main {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
  }

  &.secondary {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    @media (max-width: 600px) {
      display: none;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.7;
  }
`;

const OverlayControls = styled.div`
  grid-column: 1 / 3;
  height: 60px;
  background: rgba(15, 23, 42, 0.8);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const ControlDot = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  
  &.active {
    background: ${COLORS.primary};
  }
  &.danger {
    background: #ef4444;
  }
`;

// --- FEATURES SECTION ---
const FeaturesSection = styled.section`
  padding: 6rem 2rem;
  background-color: ${COLORS.white};
`;

const SectionTitle = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  
  h2 {
    font-size: 2.5rem;
    font-weight: 800;
    color: ${COLORS.dark};
    margin-bottom: 1rem;
  }
  
  p {
    color: ${COLORS.secondary};
    font-size: 1.125rem;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const Grid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureBox = styled.div`
  padding: 2rem;
  background: ${COLORS.background};
  border-radius: 16px;
  transition: all 0.3s ease;
  border: 1px solid transparent;

  &:hover {
    background: ${COLORS.white};
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
    border-color: ${COLORS.border};
    transform: translateY(-5px);
  }

  .icon {
    width: 48px;
    height: 48px;
    background: ${COLORS.white};
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    color: ${COLORS.primary};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    color: ${COLORS.dark};
  }

  p {
    color: ${COLORS.secondary};
    line-height: 1.6;
  }
`;

// --- TEST REPORT ---
const TechSpecs = styled.section`
  padding: 6rem 2rem;
  background-color: ${COLORS.dark};
  color: ${COLORS.white};
`;

const TechContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 4rem;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const TechText = styled.div`
  flex: 1;
  
  h2 {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    color: ${COLORS.primary}; /* Brand primary color */
  }
  
  p {
    margin-bottom: 2rem;
    font-size: 1.125rem;
    color: #94a3b8;
    line-height: 1.8;
  }

  ul {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #cbd5e1;
    font-weight: 500;
  }
`;

const TechVisual = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -20px;
    right: -20px;
    right: 20px;
    bottom: 20px;
    background: ${COLORS.primary};
    opacity: 0.1;
    border-radius: 20px;
    z-index: -1;
  }
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }

  span.label {
    color: #94a3b8;
  }
  
  span.value {
    color: ${COLORS.white};
    font-family: monospace;
    font-weight: 600;
  }
`;

// --- COMPONENT ---

export default function DemoPageNew() {
  return (
    <PageContainer>
      <HeaderClean />
      
      <HeroSection>
        <HeroBadge>Version 2.0 Maintenant Disponible</HeroBadge>
        <HeroTitle>
          La Visioconférence<br/>
          <span>Réinventée pour Vous</span>
        </HeroTitle>
        <HeroSubtitle>
          Testez instantanément notre technologie audio et vidéo HD. 
          Aucune installation. Latence ultra-faible. Collaboration en temps réel.
        </HeroSubtitle>
        
        <ActionButtons>
          <PrimaryButton to="/room/demo-pro-room">
            <Play size={20} fill="currentColor" />
            Lancer la Démo Live
          </PrimaryButton>
          <SecondaryButton to="/contact">
            Planifier une Présentation
          </SecondaryButton>
        </ActionButtons>

        {/* Interactive Pseudo-Preview */}
        <PreviewContainer>
          <PreviewBrowser>
            <BrowserHeader>
              <div className="dots">
                <div className="red"></div>
                <div className="yellow"></div>
                <div className="green"></div>
              </div>
              <div className="bar">visiconnect.com/room/demo-team-meeting</div>
            </BrowserHeader>
            <PreviewContent>
              <FakeVideo className="main">
                <div style={{ textAlign: 'center' }}>
                    <Users size={64} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                    <h3>Intervenant Principal</h3>
                </div>
              </FakeVideo>
              <FakeVideo className="secondary">
                 <div style={{ textAlign: 'center' }}>
                    <Users size={32} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
                    <small>Participant</small>
                </div>
              </FakeVideo>
              <OverlayControls>
                <ControlDot className="active"><Users size={20} /></ControlDot>
                <ControlDot><Globe size={20} /></ControlDot>
                <ControlDot className="danger"><Play size={20} style={{ transform: 'rotate(90deg)' }} /></ControlDot>
                <ControlDot><Zap size={20} /></ControlDot>
              </OverlayControls>
            </PreviewContent>
          </PreviewBrowser>
        </PreviewContainer>

      </HeroSection>

      <FeaturesSection>
        <SectionTitle>
          <h2>Pourquoi Choisir VisiConnect ?</h2>
          <p>Une suite complète d'outils conçus pour la productivité et la sécurité de vos échanges.</p>
        </SectionTitle>
        
        <Grid>
          <FeatureBox>
            <div className="icon">
              <Laptop />
            </div>
            <h3>Compatible Partout</h3>
            <p>Fonctionne sur tous les navigateurs modernes (Chrome, Firefox, Safari, Edge) et sur mobile sans application native.</p>
          </FeatureBox>
          <FeatureBox>
             <div className="icon">
              <Shield />
            </div>
            <h3>Chiffrement de Bout en Bout</h3>
            <p>Vos conversations sont sécurisées par défaut. Nous ne pouvons ni voir ni écouter vos réunions.</p>
          </FeatureBox>
          <FeatureBox>
             <div className="icon">
              <Zap />
            </div>
            <h3>Performance HD</h3>
            <p>Technologie adaptative qui ajuste la qualité vidéo en temps réel selon votre bande passante.</p>
          </FeatureBox>
          <FeatureBox>
             <div className="icon">
              <Users />
            </div>
            <h3>Salles jusqu'à 100 personnes</h3>
            <p>Réunissez toute votre équipe, vos clients ou votre classe sans limite technique.</p>
          </FeatureBox>
          <FeatureBox>
             <div className="icon">
              <Globe />
            </div>
            <h3>Traduction en Temps Réel</h3>
            <p>Brisez la barrière de la langue avec nos sous-titres traduits instantanément par IA.</p>
          </FeatureBox>
          <FeatureBox>
             <div className="icon">
              <Check />
            </div>
            <h3>Outils Collaboratifs</h3>
            <p>Tableau blanc partagé, chat, sondages et partage d'écran fluide inclus.</p>
          </FeatureBox>
        </Grid>
      </FeaturesSection>

      <TechSpecs>
        <TechContainer>
          <TechText>
            <h2>Sous le Capot</h2>
            <p>
              Notre infrastructure est basée sur WebRTC et des serveurs SFU (Selective Forwarding Unit) distribués mondialement pour garantir la latence la plus faible possible, où que vous soyez.
            </p>
            <ul>
              <li><Check size={18} color="#10b981" /> Architecture SFU Évolutive</li>
              <li><Check size={18} color="#10b981" /> Codec VP8/VP9 & AV1</li>
              <li><Check size={18} color="#10b981" /> Audio Opus 48kHz</li>
              <li><Check size={18} color="#10b981" /> Suppression de Bruit IA</li>
              <li><Check size={18} color="#10b981" /> Conformité RGPD</li>
              <li><Check size={18} color="#10b981" /> API REST Complète</li>
            </ul>
          </TechText>
          <TechVisual>
            <div style={{ marginBottom: '1.5rem', fontWeight: 'bold', color: 'white' }}>Métriques en Temps Réel (Simulé)</div>
            <StatRow>
              <span className="label">Bitrate Vidéo</span>
              <span className="value">2.5 Mbps</span>
            </StatRow>
            <StatRow>
              <span className="label">Latence (RTT)</span>
              <span className="value">32 ms</span>
            </StatRow>
            <StatRow>
              <span className="label">Perte de Paquets</span>
              <span className="value">0.01%</span>
            </StatRow>
            <StatRow>
              <span className="label">Résolution</span>
              <span className="value">1920x1080 @ 60fps</span>
            </StatRow>
            <StatRow>
              <span className="label">Codec Audio</span>
              <span className="value">Opus DTX</span>
            </StatRow>
            <div style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: '#64748b' }}>
              *Données basées sur une connexion fibre standard en Europe.
            </div>
          </TechVisual>
        </TechContainer>
      </TechSpecs>

      <div style={{ background: COLORS.background, padding: '6rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '800', color: COLORS.dark, marginBottom: '1rem' }}>Prêt à transformer vos réunions ?</h2>
        <p style={{ color: COLORS.secondary, marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>Essai gratuit de 14 jours, sans carte bancaire requise.</p>
        <PrimaryButton to="/signup">Créer un compte Gratuit</PrimaryButton>
      </div>

      <FooterClean />
    </PageContainer>
  );
}
