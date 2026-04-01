import React from 'react';
import styled, { keyframes } from 'styled-components';
import { 
  Code2, Layout, Server, Zap, Shield, Heart, 
  Terminal, ArrowRight, CheckCircle2, Compass, Layers,
  Database, Wrench, MonitorSmartphone, Github, ExternalLink,
  Briefcase, GraduationCap, Coffee, Rocket, Star, Code, Play
} from 'lucide-react';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4); }
  70% { box-shadow: 0 0 0 20px rgba(37, 99, 235, 0); }
  100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #ffffff;
  color: #0f172a;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  overflow-x: hidden;
`;

/* --- HERO SECTION --- */
const HeroSection = styled.section`
  padding: 10rem 2rem 8rem;
  background: radial-gradient(120% 100% at 50% 0%, #eff6ff 0%, #ffffff 100%);
  position: relative;
  overflow: hidden;
`;

const AnimatedBackgroundGrid = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: linear-gradient(rgba(37, 99, 235, 0.03) 1px, transparent 1px),
  linear-gradient(90deg, rgba(37, 99, 235, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  z-index: 0;
`;

const HeroGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  animation: ${fadeUp} 0.8s ease-out;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #bfdbfe;
  color: #1e40af;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 2rem;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.1);
`;

const Title = styled.h1`
  font-size: clamp(3rem, 5vw, 5rem);
  font-weight: 800;
  line-height: 1.1;
  color: #0f172a;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;

  span {
    background: linear-gradient(135deg, #1d4ed8, #3b82f6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: block;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #475569;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  max-width: 600px;

  @media (max-width: 992px) {
    margin: 0 auto 2.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled.button`
  background: #2563eb;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;
  box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.3);

  &:hover {
    background: #1d4ed8;
    transform: translateY(-2px);
    box-shadow: 0 15px 35px -5px rgba(37, 99, 235, 0.4);
  }
`;

const SecondaryButton = styled.button`
  background: white;
  color: #0f172a;
  border: 1px solid #cbd5e1;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background: #f8fafc;
    border-color: #94a3b8;
  }
`;

const HeroVisual = styled.div`
  position: relative;
  height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${float} 6s ease-in-out infinite;

  @media (max-width: 992px) {
    display: none;
  }
`;

const CircleGraphic = styled.div`
  width: 380px;
  height: 380px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, #eff6ff, #93c5fd, #2563eb, #eff6ff);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 40px rgba(37, 99, 235, 0.15);

  &::before {
    content: '';
    position: absolute;
    width: 350px;
    height: 350px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 50%;
  }
`;

const CenterIcon = styled.div`
  position: relative;
  z-index: 2;
  color: white;
  background: #2563eb;
  padding: 2rem;
  border-radius: 50%;
  box-shadow: 0 10px 30px rgba(37, 99, 235, 0.4);
  animation: ${pulseGlow} 2s infinite;
`;

/* --- GLOBAL SECTIONS --- */
const Section = styled.section`
  padding: 8rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionAlt = styled.section`
  padding: 8rem 2rem;
  background-color: #f8fafc;
  border-top: 1px solid #f1f5f9;
  border-bottom: 1px solid #f1f5f9;
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 5rem;

  h2 {
    font-size: 2.8rem;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 1.5rem;
    letter-spacing: -0.02em;
  }

  p {
    color: #475569;
    font-size: 1.15rem;
    line-height: 1.7;
  }
`;

/* --- ABOUT ME TIMELINE --- */
const TimelineWrapper = styled.div`
  position: relative;
  max-width: 900px;
  margin: 0 auto;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: calc(50% - 1px);
    height: 100%;
    width: 2px;
    background: #e2e8f0;

    @media (max-width: 768px) {
      left: 28px;
    }
  }
`;

const TimelineItem = styled.div`
  position: relative;
  width: 50%;
  padding-right: 3rem;
  margin-bottom: 4rem;
  
  &:nth-child(even) {
    margin-left: auto;
    padding-right: 0;
    padding-left: 3rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding-left: 5rem !important;
    padding-right: 0 !important;
    margin-left: 0 !important;
  }

  &:last-child {
    margin-bottom: 0;
  }

  .dot {
    position: absolute;
    right: -14px;
    top: 0;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #2563eb;
    border: 4px solid #eff6ff;
    box-shadow: 0 0 0 4px white;
    z-index: 2;

    @media (max-width: 768px) {
      left: 14px;
      right: auto;
    }
  }

  &:nth-child(even) .dot {
    left: -14px;
    right: auto;

    @media (max-width: 768px) {
      left: 14px;
    }
  }

  .content-box {
    background: white;
    padding: 2.5rem;
    border-radius: 24px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05);
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-5px);
      border-color: #bfdbfe;
      box-shadow: 0 20px 40px -10px rgba(37, 99, 235, 0.1);
    }
  }

  .year {
    display: inline-block;
    background: #eff6ff;
    color: #2563eb;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 700;
    margin-bottom: 1rem;
    border: 1px solid #bfdbfe;
  }

  h4 {
    font-size: 1.5rem;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 1rem;
  }

  p {
    color: #475569;
    line-height: 1.7;
    margin: 0;
    font-size: 1.05rem;
  }
`;

/* --- SKILLS GRID --- */
const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SkillCategory = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 24px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px -10px rgba(37, 99, 235, 0.1);
    border-color: #bfdbfe;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #f1f5f9;

    .icon-box {
      width: 50px;
      height: 50px;
      background: #eff6ff;
      color: #2563eb;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h3 {
      font-size: 1.3rem;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #475569;
      font-weight: 500;

      .bar-bg {
        width: 120px;
        height: 6px;
        background: #f1f5f9;
        border-radius: 999px;
        overflow: hidden;

        .bar-fill {
          height: 100%;
          background: #2563eb;
          border-radius: 999px;
        }
      }
    }
  }
`;

/* --- PREMIUM PROJECTS SHOWCASE (ALTERNATING LAYOUT) --- */
const ProjectsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8rem;
  margin-top: 3rem;
`;

const FeatureProject = styled.div`
  display: flex;
  align-items: center;
  gap: 5rem;
  flex-direction: ${props => props.reverse ? 'row-reverse' : 'row'};

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 3rem;
  }
`;

const ProjectVisual = styled.div`
  flex: 1.2;
  position: relative;
  width: 100%;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 20px;
    ${props => props.reverse ? 'left: -20px;' : 'right: -20px;'}
    background: ${props => props.glowColor || '#eff6ff'};
    border-radius: 24px;
    z-index: -1;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover::after {
    transform: translate(${props => props.reverse ? '10px, -10px' : '-10px, -10px'});
  }

  @media (max-width: 1024px) {
    &::after {
      top: 15px;
      left: 15px;
      right: auto;
    }
    &:hover::after {
      transform: translate(-5px, -5px);
    }
  }
`;

const BrowserFrame = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.15);

  .header {
    height: 48px;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    padding: 0 1.2rem;
    gap: 0.5rem;

    .dot { width: 12px; height: 12px; border-radius: 50%; }
    .red { background: #ef4444; border: 1px solid #d83c31; }
    .yellow { background: #f59e0b; border: 1px solid #dda021; }
    .green { background: #10b981; border: 1px solid #23a076; }
    
    .url-bar {
      margin-left: 1rem;
      background: white;
      height: 28px;
      flex: 1;
      max-width: 300px;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      padding: 0 1rem;
      font-size: 0.75rem;
      color: #94a3b8;
      font-family: monospace;
    }
  }

  .img-wrapper {
    position: relative;
    overflow: hidden;
    background: #f1f5f9;

    img {
      width: 100%;
      height: 400px;
      object-fit: cover;
      object-position: top;
      display: block;
      transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .overlay {
      position: absolute;
      inset: 0;
      background: rgba(15,23,42,0.6);
      backdrop-filter: blur(2px);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: all 0.4s ease;

      span {
        background: white;
        color: #0f172a;
        padding: 1rem 2rem;
        border-radius: 999px;
        font-weight: 700;
        font-size: 1.1rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        transform: translateY(20px);
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      }
    }
  }

  &:hover {
    .img-wrapper img { transform: scale(1.05); }
    .img-wrapper .overlay { opacity: 1; }
    .img-wrapper .overlay span { transform: translateY(0); }
  }
`;

const ProjectInfo = styled.div`
  flex: 1;

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: #eff6ff;
    color: #2563eb;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    border: 1px solid #bfdbfe;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  h3 {
    font-size: 2.8rem;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 1.5rem;
    line-height: 1.1;
    letter-spacing: -0.02em;
  }

  p {
    color: #475569;
    font-size: 1.15rem;
    line-height: 1.8;
    margin-bottom: 2.5rem;
  }

  .stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 3rem;

    span {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 1.2rem;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      font-size: 0.9rem;
      font-weight: 600;
      color: #334155;
      box-shadow: 0 2px 4px rgba(0,0,0,0.02);
      transition: all 0.2s;

      &:hover {
        border-color: #cbd5e1;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      }

      svg { color: #64748b; }
    }
  }

  .actions {
    display: flex;
    gap: 1.25rem;
    flex-wrap: wrap;

    a {
      padding: 1rem 2rem;
      border-radius: 14px;
      font-weight: 600;
      font-size: 1rem;
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      text-decoration: none;

      &.btn-primary {
        background: #0f172a;
        color: white;
        box-shadow: 0 10px 25px -5px rgba(15,23,42,0.3);

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px -5px rgba(15,23,42,0.4);
          background: #1e293b;
        }
      }

      &.btn-secondary {
        background: white;
        color: #0f172a;
        border: 2px solid #e2e8f0;

        &:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
          transform: translateY(-3px);
        }
      }
    }
  }
`;

/* --- STATS SECTION --- */
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  background: linear-gradient(135deg, #1e40af, #2563eb);
  border-radius: 32px;
  padding: 5rem 2rem;
  color: white;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(37, 99, 235, 0.4);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%; left: -50%; right: -50%; bottom: -50%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
    pointer-events: none;
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 4rem 2rem;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }

  .stat-item {
    position: relative;
    z-index: 1;

    .icon-wrapper {
      width: 64px;
      height: 64px;
      background: rgba(255,255,255,0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
      backdrop-filter: blur(10px);
    }

    h5 {
      font-size: 3.5rem;
      font-weight: 800;
      margin-bottom: 0.5rem;
      letter-spacing: -0.05em;
    }
    span {
      color: #bfdbfe;
      font-size: 1.1rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }
`;

/* --- PHILOSOPHY --- */
const PhilosophyCard = styled.div`
  display: flex;
  gap: 4rem;
  align-items: center;
  background: white;
  padding: 4rem;
  border-radius: 32px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 20px 40px -15px rgba(0,0,0,0.05);

  @media (max-width: 992px) {
    flex-direction: column;
    padding: 3rem 2rem;
  }

  .content {
    flex: 1;
    
    h3 {
      font-size: 2.5rem;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 1.5rem;
    }

    p {
      color: #475569;
      font-size: 1.15rem;
      line-height: 1.8;
      margin-bottom: 2rem;
    }

    ul {
      list-style: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      li {
        display: flex;
        gap: 1.25rem;
        align-items: flex-start;

        .check-box {
          background: #eff6ff;
          color: #2563eb;
          padding: 0.75rem;
          border-radius: 12px;
          display: flex;
        }

        .text {
          strong {
            display: block;
            color: #0f172a;
            font-size: 1.15rem;
            margin-bottom: 0.25rem;
          }
          span {
            color: #64748b;
            font-size: 1rem;
            line-height: 1.6;
            display: block;
          }
        }
      }
    }
  }

  .visual {
    flex: 1;
    position: relative;
    img {
      width: 100%;
      border-radius: 20px;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.15);
    }
    
    .floating-badge {
      position: absolute;
      bottom: -20px;
      right: -20px;
      background: white;
      padding: 1.5rem;
      border-radius: 16px;
      box-shadow: 0 15px 30px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
      
      strong {
        font-size: 1.5rem;
        font-weight: 800;
        color: #0f172a;
      }
      span {
        color: #64748b;
        font-size: 0.9rem;
        font-weight: 500;
      }
    }
  }
`;

export default function DeveloperPageV2() {
  return (
    <PageWrapper>
      <HeaderClean />
      
      {/* 1. HERO SECTION */}
      <HeroSection>
        <AnimatedBackgroundGrid />
        <HeroGrid>
          <HeroContent>
            <Badge>
              <Rocket size={18} />
              Développeur Full-Stack & UI/UX Autodidacte
            </Badge>
            <Title>
              Bâtir des interfaces 
              <span>qui ont du sens.</span>
            </Title>
            <Subtitle>
              Passionné, acharné et 100% autodidacte. Je transforme des idées complexes en applications web fluides, performantes et centrées sur l'utilisateur. Du design Figma jusqu'au déploiement en production.
            </Subtitle>
            <ButtonGroup>
              <PrimaryButton>
                Voir mes projets
                <ArrowRight size={18} />
              </PrimaryButton>
              <SecondaryButton>
                Me contacter
              </SecondaryButton>
            </ButtonGroup>
          </HeroContent>

          <HeroVisual>
            <CircleGraphic>
              <CenterIcon>
                <Code size={56} strokeWidth={2} />
              </CenterIcon>
            </CircleGraphic>
          </HeroVisual>
        </HeroGrid>
      </HeroSection>

      {/* 2. HISTOIRE & TIMELINE */}
      <SectionAlt>
        <SectionHeader>
          <h2>Comment Tout a Commencé</h2>
          <p>Je n'ai pas suivi la voie traditionnelle. Mon parcours est fait de passion pure, de longues nuits d'apprentissage et d'une détermination sans faille. Voici mon évolution.</p>
        </SectionHeader>

        <TimelineWrapper>
          <TimelineItem>
            <div className="dot" />
            <div className="content-box">
              <span className="year">L'Étincelle</span>
              <h4>La découverte du Web</h4>
              <p>Au commencement, c'était le besoin de comprendre. Je voulais savoir ce qu'il se passait derrière les sites que je visitais tous les jours. J'ai écrit ma première balise HTML, puis mon premier fichier CSS. L'écran de mon navigateur a changé de couleur, et cette magie immédiate m'a rendu accro.</p>
            </div>
          </TimelineItem>

          <TimelineItem>
            <div className="dot" />
            <div className="content-box">
              <span className="year">L'Immersion</span>
              <h4>Maîtrise du JavaScript & de l'UI</h4>
              <p>Le statique c'est bien, le dynamique c'est mieux. J'ai plongé tête la première dans le JavaScript. Au lieu de survoler la théorie, j'ai cloné des dizaines d'interfaces complexes. J'ai passé des heures à peaufiner des animations et ajuster le pixel-perfect.</p>
            </div>
          </TimelineItem>

          <TimelineItem>
            <div className="dot" />
            <div className="content-box">
              <span className="year">La Révolution</span>
              <h4>L'écosystème React & Modern web</h4>
              <p>Découverte de l'écosystème React et changement complet de paradigme. J'ai appris à penser en "composants". J'ai absorbé les concepts de Hooks, les state managers et la création de vastes Single Page Applications.</p>
            </div>
          </TimelineItem>

          <TimelineItem>
            <div className="dot" />
            <div className="content-box">
              <span className="year">L'Architecture</span>
              <h4>Le Back-End & Les Données</h4>
              <p>Pour construire de vrais produits, je devais maîtriser la mécanique sous le capot. J'ai alors attaqué Node.js, Express, les schémas de BDD complexes, PostgreSQL et le temps réel. Sécuriser les API est devenu passionnant.</p>
            </div>
          </TimelineItem>

          <TimelineItem>
            <div className="dot" />
            <div className="content-box">
              <span className="year">Aujourd'hui</span>
              <h4>Full-Stack & Ingénierie</h4>
              <p>Aujourd'hui, je crée des plateformes entières et exigeantes. Je suis capable de concevoir, développer, et déployer des architectures complètes en m'assurant que le code final est performant, sécurisé, et testé.</p>
            </div>
          </TimelineItem>
        </TimelineWrapper>
      </SectionAlt>

      {/* 3. COMPETENCES REELLES (BENTO GRID) */}
      <Section>
        <SectionHeader>
          <h2>Mon Arsenal Technique</h2>
          <p>Des compétences acquises sur le terrain et en résolvant de vrais problèmes. Voici mes outils de prédilection.</p>
        </SectionHeader>

        <SkillsContainer>
          {/* Frontend */}
          <SkillCategory>
            <div className="header">
              <div className="icon-box"><MonitorSmartphone size={28} /></div>
              <h3>Front-End & UI</h3>
            </div>
            <ul>
              <li>React / Next.js <div className="bar-bg"><div className="bar-fill" style={{width: '95%'}}/></div></li>
              <li>Javascript / ES6+ <div className="bar-bg"><div className="bar-fill" style={{width: '90%'}}/></div></li>
              <li>Tailwind / Styled-Comp <div className="bar-bg"><div className="bar-fill" style={{width: '95%'}}/></div></li>
              <li>HTML5 / CSS3 <div className="bar-bg"><div className="bar-fill" style={{width: '98%'}}/></div></li>
              <li>Framer Motion / GSAP <div className="bar-bg"><div className="bar-fill" style={{width: '80%'}}/></div></li>
              <li>Zustand / Context API <div className="bar-bg"><div className="bar-fill" style={{width: '88%'}}/></div></li>
            </ul>
          </SkillCategory>

          {/* Backend */}
          <SkillCategory>
            <div className="header">
              <div className="icon-box"><Database size={28} /></div>
              <h3>Back-End & DB</h3>
            </div>
            <ul>
              <li>Node.js / Express <div className="bar-bg"><div className="bar-fill" style={{width: '85%'}}/></div></li>
              <li>PostgreSQL / SQL <div className="bar-bg"><div className="bar-fill" style={{width: '80%'}}/></div></li>
              <li>Convex (BaaS Temps Réel) <div className="bar-bg"><div className="bar-fill" style={{width: '90%'}}/></div></li>
              <li>APIs REST / Webhooks <div className="bar-bg"><div className="bar-fill" style={{width: '92%'}}/></div></li>
              <li>WebRTC / LiveKit <div className="bar-bg"><div className="bar-fill" style={{width: '80%'}}/></div></li>
              <li>JWT / OAuth / Auth <div className="bar-bg"><div className="bar-fill" style={{width: '85%'}}/></div></li>
            </ul>
          </SkillCategory>

          {/* Outils & DevOps */}
          <SkillCategory>
            <div className="header">
              <div className="icon-box"><Wrench size={28} /></div>
              <h3>Outils & Workflow</h3>
            </div>
            <ul>
              <li>Git / GitHub <div className="bar-bg"><div className="bar-fill" style={{width: '90%'}}/></div></li>
              <li>Vite / Webpack Pipeline <div className="bar-bg"><div className="bar-fill" style={{width: '85%'}}/></div></li>
              <li>Figma / UX-UI Design <div className="bar-bg"><div className="bar-fill" style={{width: '85%'}}/></div></li>
              <li>Vercel / Netlify <div className="bar-bg"><div className="bar-fill" style={{width: '90%'}}/></div></li>
              <li>Postman / API Testing <div className="bar-bg"><div className="bar-fill" style={{width: '90%'}}/></div></li>
              <li>VS Code / CLI Bash <div className="bar-bg"><div className="bar-fill" style={{width: '95%'}}/></div></li>
            </ul>
          </SkillCategory>
        </SkillsContainer>
      </Section>

      {/* 4. PREMIUM PROJECTS (STRIPE/VERCEL STYLE) */}
      <SectionAlt>
        <SectionHeader>
          <h2>Projets Majeurs & Réalisations</h2>
          <p>Plongez dans les détails de mes créations les plus techniques. Des architectures complexes aux interfaces pixel-perfect.</p>
        </SectionHeader>

        <ProjectsList>
          
          {/* Projet 1 */}
          <FeatureProject>
            <ProjectVisual glowColor="#dbeafe">
              <BrowserFrame>
                <div className="header">
                  <div className="dot red" />
                  <div className="dot yellow" />
                  <div className="dot green" />
                  <div className="url-bar">app.visioconnect.com</div>
                </div>
                <div className="img-wrapper">
                  <img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="VisioConnect Dashboard" />
                  <div className="overlay">
                    <span><Play size={20} /> Aperçu Live</span>
                  </div>
                </div>
              </BrowserFrame>
            </ProjectVisual>
            
            <ProjectInfo>
              <div className="badge">Application SaaS Complète</div>
              <h3>VisioConnect Platform</h3>
              <p>Une infrastructure de visioconférence et de collaboration en temps réel redoutablement performante. De la conception du player vidéo WebRTC au tableau blanc bidirectionnel, chaque pixel a été pensé pour réduire la latence et maximiser l'expérience utilisateur.</p>
              
              <div className="stack">
                <span><Layout size={16}/> React.js</span>
                <span><Server size={16}/> Node.js</span>
                <span><Zap size={16}/> LiveKit</span>
                <span><Database size={16}/> Convex</span>
                <span><MonitorSmartphone size={16}/> Tailwind CSS</span>
              </div>

              <div className="actions">
                <a href="#" className="btn-primary">Découvrir le projet <ArrowRight size={18}/></a>
                <a href="#" className="btn-secondary"><Github size={18}/> Code source</a>
              </div>
            </ProjectInfo>
          </FeatureProject>

          {/* Projet 2 */}
          <FeatureProject reverse>
            <ProjectVisual glowColor="#f3e8ff">
              <BrowserFrame>
                <div className="header">
                  <div className="dot red" />
                  <div className="dot yellow" />
                  <div className="dot green" />
                  <div className="url-bar">dashboard.financeflow.io</div>
                </div>
                <div className="img-wrapper">
                  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="E-Commerce Interface" />
                  <div className="overlay">
                    <span><Play size={20} /> Aperçu Live</span>
                  </div>
                </div>
              </BrowserFrame>
            </ProjectVisual>
            
            <ProjectInfo>
              <div className="badge">Big Data & Architecture</div>
              <h3>FinanceFlow Analytics</h3>
              <p>Une interface d'administration ultra-rapide capable de traiter et visualiser des milliers de lignes de base de données sans broncher. Des graphiques interactifs en temps réel, un système de filtres complexe et une API de traitement lourd construite pour la haute disponibilité.</p>
              
              <div className="stack">
                <span><Layout size={16}/> Next.js</span>
                <span><Code2 size={16}/> TypeScript</span>
                <span><Database size={16}/> PostgreSQL</span>
                <span><Database size={16}/> Prisma ORM</span>
                <span><Layout size={16}/> Recharts</span>
              </div>

              <div className="actions">
                <a href="#" className="btn-primary">Explorer la démo <ArrowRight size={18}/></a>
                <a href="#" className="btn-secondary"><Github size={18}/> Architecture</a>
              </div>
            </ProjectInfo>
          </FeatureProject>

          {/* Projet 3 */}
          <FeatureProject>
            <ProjectVisual glowColor="#dcfce7">
              <BrowserFrame>
                <div className="header">
                  <div className="dot red" />
                  <div className="dot yellow" />
                  <div className="dot green" />
                  <div className="url-bar">studio.nexusai.dev</div>
                </div>
                <div className="img-wrapper">
                  <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="AI Agent Builder" />
                  <div className="overlay">
                    <span><Play size={20} /> Aperçu Live</span>
                  </div>
                </div>
              </BrowserFrame>
            </ProjectVisual>
            
            <ProjectInfo>
              <div className="badge">Intelligence Artificielle</div>
              <h3>Nexus AI Studio</h3>
              <p>Un générateur de composants et un assistant de productivité dopé à l'intelligence artificielle. Connexion directe aux modèles d'OpenAI pour générer des interfaces à la volée, gérer des prompts complexes et intégrer de l'automatisation dans le workflow des développeurs.</p>
              
              <div className="stack">
                <span><Layout size={16}/> React.js</span>
                <span><Zap size={16}/> OpenAI API</span>
                <span><Server size={16}/> Express</span>
                <span><Wrench size={16}/> Vite</span>
                <span><Code2 size={16}/> AI Engineering</span>
              </div>

              <div className="actions">
                <a href="#" className="btn-primary">Lancer le Studio <ArrowRight size={18}/></a>
                <a href="#" className="btn-secondary"><Github size={18}/> Repository</a>
              </div>
            </ProjectInfo>
          </FeatureProject>

        </ProjectsList>
      </SectionAlt>

      {/* 5. PHILOSOPHIE DU CODE */}
      <Section>
        <PhilosophyCard>
          <div className="content">
            <h3>Ma Philosophie du Code</h3>
            <p>Être autodidacte m'a appris la règle la plus capitale : ce n'est pas le framework qui compte, c'est l'approche pour résoudre le problème. Un beau code est un choix architectural assumé. Voici mes 3 règles d'or.</p>
            
            <ul>
              <li>
                <div className="check-box"><Star size={24} /></div>
                <div className="text">
                  <strong>Qualité, Solidité & Lisibilité</strong>
                  <span>Le code est lu beaucoup plus souvent qu'il n'est écrit. J'écris pour mes pairs et pour mon « moi » du futur. Les nommages doivent être limpides, les composants strictement isolés et DRY.</span>
                </div>
              </li>
              <li>
                <div className="check-box"><Zap size={24} /></div>
                <div className="text">
                  <strong>Performance Pure</strong>
                  <span>Une fonction ne doit pas juste "marcher". Optimiser les algorithmes, réduire les re-renders inutiles, lazzy-loader les immenses assets et bien structurer son bundle est ce qui fait la différence.</span>
                </div>
              </li>
              <li>
                <div className="check-box"><Heart size={24} /></div>
                <div className="text">
                  <strong>Focus sur l'Utilisateur Final (UX)</strong>
                  <span>Une application parfaitement codée au backend ne sert à rien si l'interface frustre l'utilisateur. Feedback visuels, accessibilité, loaders, gestion chirurgicale des erreurs... Je soigne les détails.</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="visual">
            <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Code Philosophy setup" />
            <div className="floating-badge">
              <strong>100%</strong>
              <span>Apprentissage Continu</span>
            </div>
          </div>
        </PhilosophyCard>
      </Section>

      {/* 6. STATISTIQUES MASSIVES */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 10rem' }}>
        <StatsGrid>
          <div className="stat-item">
            <div className="icon-wrapper"><GraduationCap size={36} /></div>
            <h5>0</h5>
            <span>Bootcamps, 100% Autodidacte</span>
          </div>
          <div className="stat-item">
            <div className="icon-wrapper"><Code2 size={36} /></div>
            <h5>100k+</h5>
            <span>Lignes de code écrites</span>
          </div>
          <div className="stat-item">
            <div className="icon-wrapper"><Briefcase size={36} /></div>
            <h5>15+</h5>
            <span>Projets & Prototypes</span>
          </div>
          <div className="stat-item">
            <div className="icon-wrapper"><Coffee size={36} /></div>
            <h5>∞</h5>
            <span>Tasses de café & Bugs résolus</span>
          </div>
        </StatsGrid>
      </div>

      <FooterClean />
    </PageWrapper>
  );
}
