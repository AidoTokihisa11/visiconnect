
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';
import { useTranslation } from '../hooks/useTranslation';
import { useHomePageData } from '../hooks/useHomePageData';
import FeaturesCarousel3D from '../components/home/FeaturesCarousel3D';
import KeyStats from '../components/home/KeyStats';
import TechBentoGrid from '../components/home/TechBentoGrid';
import IndieBadge from '../components/home/IndieBadge';
import ProofArea from '../components/home/ProofArea';
import { EditableText } from '../components/Admin/EditableContent';
import BannerSlider from '../components/home/BannerSlider';
import FeatureCard from '../components/home/FeatureCard';
import TestimonialCard from '../components/home/TestimonialCard';
import PricingCard from '../components/home/PricingCard';

import { 
  Video, Users, Shield, Zap, Globe, Check, 
  Menu, X, Play, Code, Heart, Calendar, 
  Mail, Github, Linkedin, Eye, Server,
  ChevronLeft, ChevronRight, BarChart, Smartphone, Laptop
} from 'lucide-react';

/* --- DESIGN SYSTEM CONSTANTS --- */
const COLORS = {
  primary: 'hsl(var(--primary))',    
  secondary: 'hsl(var(--muted-foreground))',
  dark: 'hsl(var(--foreground))',       
  text: 'hsl(var(--foreground))',       
  lightText: 'hsl(var(--muted-foreground))',
  background: 'hsl(var(--background))', 
  white: 'hsl(var(--card))',
  border: 'hsl(var(--border))',     
  success: 'hsl(var(--primary))',    
};

const SHADOWS = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)',
  glow: '0 0 20px rgba(37, 99, 235, 0.15)',
};

/* --- STYLED COMPONENTS --- */

const PageContainer = styled.div`
  background-color: ${COLORS.background};
  color: ${COLORS.text};
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

// --- HEADER ---
const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: ${COLORS.white};
  border-bottom: 1px solid ${COLORS.border};
  box-shadow: ${SHADOWS.sm};
  padding: 0 1.5rem;
  height: 72px;
  display: flex;
  align-items: center;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
`;

const LogoIcon = styled.div`
  width: 36px;
  height: 36px;
  background-color: ${COLORS.primary};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.white};
`;

const LogoText = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${COLORS.dark};
  letter-spacing: -0.025em;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${COLORS.secondary};
  font-weight: 500;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s;

  &:hover {
    color: ${COLORS.primary};
  }
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Button = styled(Link)`
  padding: 0.625rem 1.25rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;

  ${props => props.$variant === 'primary' ? `
    background-color: ${COLORS.primary};
    color: ${COLORS.white};
    border: 1px solid ${COLORS.primary};
    &:hover {
      background-color: #1d4ed8; 
      border-color: #1d4ed8;
    }
  ` : props.$variant === 'ghost' ? `
    background-color: ${COLORS.white};
    color: ${COLORS.secondary};
    border: 1px solid ${COLORS.border};
    &:hover {
      background-color: ${COLORS.background};
      border-color: #cbd5e1;
      color: ${COLORS.dark};
    }
  ` : `
    background-color: transparent;
    color: ${COLORS.secondary};
    &:hover {
      color: ${COLORS.primary};
    }
  `}
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: ${COLORS.secondary};
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

// --- HERO SECTION ---
const HeroSection = styled.section`
  background-color: ${COLORS.white};
  padding: 5rem 1.5rem;
  border-bottom: 1px solid ${COLORS.border};
  
  @media (max-width: 640px) {
    padding: 3rem 1rem;
  }
`;

const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 3rem;
  }
  
  @media (max-width: 640px) {
    gap: 2rem;
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (max-width: 900px) {
    align-items: center;
  }
`;

const HeroHeadline = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  color: ${COLORS.dark};
  letter-spacing: -0.05em;

  span {
    color: ${COLORS.primary};
  }

  @media (max-width: 900px) {
    font-size: 3rem;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const HeroSubhead = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  color: ${COLORS.lightText};
  max-width: 600px;
`;

const HeroImage = styled.div`
  position: relative;
  background-color: ${COLORS.background};
  border-radius: 12px;
  border: 1px solid ${COLORS.border};
  aspect-ratio: 16/10;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: ${SHADOWS.md};
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(${COLORS.border} 1px, transparent 1px);
    background-size: 24px 24px;
    opacity: 0.5;
    z-index: 0;
  }
`;

const PlaceholderBadge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: ${COLORS.white};
  border: 1px solid ${COLORS.border};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${COLORS.success};
  box-shadow: ${SHADOWS.sm};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 2;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${SHADOWS.md};
  }
`;

const LiveSessionCard = styled.div`
  position: absolute;
  bottom: -20px;
  right: -20px;
  background: ${COLORS.white};
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: ${SHADOWS.lg};
  border: 1px solid ${COLORS.border};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 240px;
  z-index: 4;
  animation: float 6s ease-in-out infinite;

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const ParticipantRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AvatarGroup = styled.div`
  display: flex;
  
  div {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid ${COLORS.white};
    background-color: #cbd5e1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 600;
    color: ${COLORS.secondary};
    margin-left: -8px;
    
    &:first-child {
      margin-left: 0;
      background-color: #3b82f6;
      color: white;
    }
    
    &:nth-child(2) { background-color: #ef4444; color: white; }
    &:nth-child(3) { background-color: #10b981; color: white; }
  }
`;

const LiveIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${COLORS.success};
  
  span {
    position: relative;
    display: flex;
    height: 8px;
    width: 8px;
    
    &::before {
      content: '';
      position: absolute;
      display: inline-flex;
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-color: ${COLORS.success};
      opacity: 0.75;
      animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
    }
    
    &::after {
      position: relative;
      display: inline-flex;
      height: 8px;
      width: 8px;
      border-radius: 50%;
      background-color: ${COLORS.success};
    }
  }

  @keyframes ping {
    75%, 100% {
      transform: scale(2);
      opacity: 0;
    }
  }
`;

// --- TRUSTED SECTION ---
const TrustedSection = styled.section`
  padding: 4rem 1.5rem;
  background-color: ${COLORS.white};
  border-bottom: 1px solid ${COLORS.border};
`;

const TrustedContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const TrustedLabel = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${COLORS.lightText};
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const LogosGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  flex-wrap: wrap;
  opacity: 0.6;
  
  svg {
    height: 32px;
    width: auto;
    filter: grayscale(100%);
    transition: all 0.2s;
    
    &:hover {
      filter: grayscale(0%);
      opacity: 1;
      transform: scale(1.05);
    }
  }
`;

// --- STATS SECTION ---
const StatsSection = styled.section`
  padding: 4rem 1.5rem;
  background-color: ${COLORS.white};
  border-bottom: 1px solid ${COLORS.border};
`;

const StatsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
`;

const CounterBadge = styled(motion.div)`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 1rem 1.5rem;
  border-radius: 8px;
  text-align: center;
  white-space: nowrap;
  
  .highlight {
    font-weight: 700;
    font-size: 1.25rem;
    color: ${COLORS.primary};
  }
`;

const StatItemPill = ({ icon: Icon, value, label }) => (
  <CounterBadge
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ type: "spring", stiffness: 100 }}
    viewport={{ once: true }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ 
        width: 32, height: 32, borderRadius: '50%', 
        background: 'rgba(37, 99, 235, 0.1)', color: COLORS.primary,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <Icon size={16} />
      </div>
      <div>
        <span className="highlight">{value}</span> {label}
      </div>
    </div>
  </CounterBadge>
);

// --- FEATURES SECTION ---
const FeaturesSection = styled.section`
  padding: 5rem 1.5rem;
  background-color: ${COLORS.background};
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  color: ${COLORS.dark};
  margin-bottom: 1rem;
  letter-spacing: -0.025em;
`;

const SectionSubtitle = styled.p`
  font-size: 1.125rem;
  color: ${COLORS.lightText};
  line-height: 1.6;
`;

const FeaturesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

// --- TESTIMONIALS SECTION ---
const TestimonialsSection = styled.section`
  padding: 5rem 1.5rem;
  background-color: ${COLORS.white};
  border-bottom: 1px solid ${COLORS.border};
  
  @media (max-width: 640px) {
    padding: 3rem 1rem;
  }
`;

const TestimonialsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

// --- PRICING SECTION ---
const PricingSectionWrapper = styled.section`
  padding: 5rem 1.5rem;
  background-color: ${COLORS.white};
  border-top: 1px solid ${COLORS.border};
`;

const PricingGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
`;

// --- ABOUT SECTION ---
const AboutSection = styled.section`
  padding: 5rem 1.5rem;
  background-color: ${COLORS.background};
  border-top: 1px solid ${COLORS.border};
`;

const AboutContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const AboutText = styled.p`
  font-size: 1.125rem;
  line-height: 1.8;
  color: ${COLORS.secondary};
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AboutCard = styled.div`
  background-color: ${COLORS.white};
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid ${COLORS.border};
  box-shadow: ${SHADOWS.sm};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AboutCardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${COLORS.dark};
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const AboutStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const AboutStat = styled.div`
  background-color: ${COLORS.white};
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  border: 1px solid ${COLORS.border};
  box-shadow: ${SHADOWS.sm};
`;

// --- CONTACT SECTION ---
const ContactSection = styled.section`
  padding: 5rem 1.5rem;
  background-color: ${COLORS.white};
  border-top: 1px solid ${COLORS.border};
`;

const ContactContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const ContactActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2.5rem;
  flex-wrap: wrap;
`;

const ContactLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: ${COLORS.secondary};
  transition: all 0.2s;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid transparent;
  width: 120px;

  &:hover {
    color: ${COLORS.primary};
    background-color: ${COLORS.background};
    border-color: ${COLORS.border};
    transform: translateY(-2px);
  }
`;

// --- COMPONENT IMPLEMENTATION ---

export default function HomePageClean() {
  const { t } = useTranslation();
  const { sliderData, featuresData, testimonialsData, pricingData, contactLinks } = useHomePageData();

  return (
    <PageContainer>
      <HeaderClean />

      {/* HERO SECTION */}
      <HeroSection>
        <HeroContainer>
          <HeroContent>
            <HeroHeadline>
              <EditableText translationKey="hero.titleLine1" defaultValue={t('hero.titleLine1')} /> <br/>
              <span><EditableText translationKey="hero.titleLine2" defaultValue={t('hero.titleLine2')} /></span>
            </HeroHeadline>
            <HeroSubhead>
              <EditableText translationKey="hero.subtitle" defaultValue={t('hero.subtitle')} type="textarea" />
            </HeroSubhead>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button to="/signup" $variant="primary" style={{ padding: '0.875rem 1.5rem', fontSize: '1.125rem' }}>
                {t('hero.startFree')}
              </Button>
              <Button to={`/room/demo-${Math.random().toString(36).substring(2, 9)}`} style={{ padding: '0.875rem 1.5rem', fontSize: '1.125rem', backgroundColor: '#0f172a', color: 'white', border: '1px solid #0f172a', display: 'flex', alignItems: 'center' }}>
                <Zap size={18} style={{ marginRight: '8px' }} />
                {t('hero.testRoom')}
              </Button>
              <Button to="/demo" $variant="ghost" style={{ padding: '0.875rem 1.5rem', fontSize: '1.125rem' }}>
                <Play size={18} style={{ marginRight: '8px' }} fill={COLORS.secondary} />
                {t('hero.watchDemo')}
              </Button>
            </div>
          </HeroContent>

          <HeroImage>
             <div style={{ position: 'relative', width: '90%', height: '80%', background: '#fff', borderRadius: '8px', boxShadow: SHADOWS.sm, border: `1px solid ${COLORS.border}`, overflow: 'hidden', zIndex: 1 }}>
                <div style={{ height: '40px', borderBottom: `1px solid ${COLORS.border}`, display: 'flex', alignItems: 'center', padding: '0 1rem', gap: '0.5rem', background: '#f8fafc' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></div>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></div>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }}></div>
                    <div style={{ flex: 1, padding: '0 1rem', display: 'flex', justifyContent: 'center' }}>
                      <div style={{ width: '60%', height: '8px', background: '#cbd5e1', borderRadius: '4px', opacity: 0.5 }}></div>
                    </div>
                </div>
                <div style={{ padding: '1rem', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', height: 'calc(100% - 40px)' }}>
                     <div style={{ background: '#f1f5f9', borderRadius: '6px', height: '100%', position: 'relative', overflow: 'hidden' }}>
                         <div style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: '4px', color: 'white', fontSize: '10px' }}>
                           {t('ui.presentation')}
                         </div>
                         <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ width: '60%', height: '60%', border: '2px dashed #cbd5e1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                               <span style={{ fontSize: '12px', color: '#94a3b8' }}>{t('ui.screenShare')}</span>
                            </div>
                         </div>
                     </div>
                     <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '1rem' }}>
                        <div style={{ background: '#e2e8f0', borderRadius: '6px', position: 'relative' }}>
                           <div style={{ position: 'absolute', bottom: '5px', right: '5px', width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%', border: '1px solid white' }}></div>
                        </div>
                        <div style={{ background: '#e2e8f0', borderRadius: '6px', position: 'relative' }}>
                           <div style={{ position: 'absolute', bottom: '5px', right: '5px', width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%', border: '1px solid white' }}></div>
                        </div>
                     </div>
                </div>
             </div>
             
             <PlaceholderBadge style={{ top: 'auto', bottom: '50px', left: '-20px', right: 'auto' }}>
                <Globe size={16} />
                <span>{t('ui.network')}</span>
             </PlaceholderBadge>

             <LiveSessionCard>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{t('ui.meeting')}</div>
                  <LiveIndicator>
                    <span></span>
                    {t('ui.live')}
                  </LiveIndicator>
                </div>
                
                <ParticipantRow>
                  <AvatarGroup>
                    <div>JD</div>
                    <div>AS</div>
                    <div>MR</div>
                    <div style={{ backgroundColor: '#f1f5f9', color: '#64748b', fontSize: '10px' }}>+5</div>
                  </AvatarGroup>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>
                    {t('ui.time')}
                  </div>
                </ParticipantRow>
                
                <div style={{ height: '4px', width: '100%', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden' }}>
                   <div style={{ height: '100%', width: '65%', background: '#22c55e' }}></div>
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', color: '#64748b' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Video size={12} /> HD
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Users size={12} /> 8
                   </div>
                </div>
             </LiveSessionCard>
          </HeroImage>
        </HeroContainer>
      </HeroSection>

      <ProofArea />

      <FeaturesCarousel3D />

      <KeyStats />

      {/* BANNER SLIDER SECTION */}
      <BannerSlider slides={sliderData} />

      {/* FEATURES SECTION */}
      <FeaturesSection id="features">
        <SectionHeader>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionTitle>{t('homeFeatures.title')}</SectionTitle>
            <SectionSubtitle>
                {t('homeFeatures.subtitle')}
            </SectionSubtitle>
          </motion.div>
        </SectionHeader>

        <FeaturesGrid>
            {featuresData?.map((feature, index) => (
                <FeatureCard
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    items={Array.isArray(feature.items) ? feature.items : []}
                    iconBg={feature.iconBg}
                    iconColor={feature.iconColor}
                    delay={index * 0.1}
                />
            ))}
        </FeaturesGrid>
      </FeaturesSection>

      <TechBentoGrid />

      {/* TESTIMONIALS SECTION */}
      <TestimonialsSection>
        <SectionHeader>
            <SectionTitle>{t('testimonials.title')}</SectionTitle>
            <SectionSubtitle>
                {t('testimonials.subtitle')}
            </SectionSubtitle>
        </SectionHeader>

        <TestimonialsGrid>
            {testimonialsData?.map((testimonial, index) => (
                <TestimonialCard
                    key={index}
                    quote={testimonial.quote}
                    author={testimonial.author}
                    title={testimonial.title}
                    avatar={testimonial.avatar}
                />
            ))}
        </TestimonialsGrid>
      </TestimonialsSection>

      {/* PRICING SECTION */}
      <PricingSectionWrapper id="pricing">
        <SectionHeader>
            <SectionTitle>{t('pricing.title')}</SectionTitle>
            <SectionSubtitle>
                {t('pricing.subtitle')}
            </SectionSubtitle>
        </SectionHeader>

        <PricingGrid>
            {pricingData?.map((plan, index) => (
                <PricingCard
                    key={index}
                    planName={plan.planName}
                    price={plan.price}
                    description={plan.description}
                    features={Array.isArray(plan.features) ? plan.features : []}
                    ctaText={plan.ctaText}
                    ctaLink={plan.ctaLink}
                    isPopular={plan.isPopular}
                />
            ))}
        </PricingGrid>
      </PricingSectionWrapper>

      {/* ABOUT SECTION */}
      <AboutSection id="about">
        <SectionHeader>
          <SectionTitle>{t('aboutProject')}</SectionTitle>
          <AboutText>
            {t('projectDescription')}
          </AboutText>
        </SectionHeader>

        <AboutContent>
          <AboutGrid>
            <AboutCard>
              <AboutCardTitle>
                <Eye size={24} color={COLORS.primary} />
                {t('myVision')}
              </AboutCardTitle>
              <p style={{ color: COLORS.lightText, lineHeight: '1.6' }}>
                {t('visionDescription')}
              </p>
            </AboutCard>
            <AboutCard>
              <AboutCardTitle>
                <Server size={24} color={COLORS.primary} />
                {t('technologiesUsed')}
              </AboutCardTitle>
              <p style={{ color: COLORS.lightText, lineHeight: '1.6' }}>
                {t('techDescription')}
              </p>
            </AboutCard>
          </AboutGrid>

          <AboutStatsGrid>
            <AboutStat>
              <Calendar size={28} color={COLORS.primary} style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontWeight: '700', fontSize: '1.25rem', color: COLORS.dark }}>2024</div>
              <div style={{ fontSize: '0.875rem', color: COLORS.lightText }}>{t('creationYear')}</div>
            </AboutStat>
            <AboutStat>
              <Code size={28} color={COLORS.primary} style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontWeight: '700', fontSize: '1.25rem', color: COLORS.dark }}>{t('philosophyValue')}</div>
              <div style={{ fontSize: '0.875rem', color: COLORS.lightText }}>{t('philosophy')}</div>
            </AboutStat>
            <AboutStat>
              <Heart size={28} color={COLORS.primary} style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontWeight: '700', fontSize: '1.25rem', color: COLORS.dark }}>100%</div>
              <div style={{ fontSize: '0.875rem', color: COLORS.lightText }}>{t('passionLabel')}</div>
            </AboutStat>
            <AboutStat>
              <Globe size={28} color={COLORS.primary} style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontWeight: '700', fontSize: '1.25rem', color: COLORS.dark }}>{t('globalValue')}</div>
              <div style={{ fontSize: '0.875rem', color: COLORS.lightText }}>{t('scopeLabel')}</div>
            </AboutStat>
          </AboutStatsGrid>
        </AboutContent>
      </AboutSection>

      {/* CONTACT SECTION */}
      <ContactSection id="contact">
        <ContactContainer>
          <SectionTitle>{t('contactTitle')}</SectionTitle>
          <SectionSubtitle>
             {t('contactDescription')}
          </SectionSubtitle>
          
         <ContactActions>
            {contactLinks?.map((link, index) => (
                <ContactLink key={index} href={link.href} target={link.target} rel={link.rel}>
                  {link.icon && <link.icon size={24} />}
                  <span>{link.label}</span>
                </ContactLink>
            ))}
          </ContactActions>
        </ContactContainer>
      </ContactSection>

      <IndieBadge />

      <FooterClean />
    </PageContainer>
  );
}
