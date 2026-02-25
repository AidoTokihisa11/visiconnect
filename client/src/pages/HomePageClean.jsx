import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';
import { useAuthUser } from '../hooks/useAuthUser';
import FeaturesCarousel3D from '../components/home/FeaturesCarousel3D';
import KeyStats from '../components/home/KeyStats';
import TechBentoGrid from '../components/home/TechBentoGrid';
import IndieBadge from '../components/home/IndieBadge';
import ProofArea from '../components/home/ProofArea';

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

/* --- NEW COMPONENTS & STYLES --- */

const GlassCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: ${SHADOWS.lg};
  border-radius: 16px;
  overflow: hidden;
`;

const FeatureCardPremium = styled(motion.div)`
  background: linear-gradient(145deg, ${COLORS.white}, #fcfcfc);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: ${SHADOWS.md}, inset 0 0 0 1px rgba(255,255,255,0.5);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${SHADOWS.xl}, ${SHADOWS.glow};
    border-color: ${COLORS.primary}; // Slight active border
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: linear-gradient(90deg, ${COLORS.primary}, #60a5fa);
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const IconWrapperPremium = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: ${props => props.bg || 'rgba(37, 99, 235, 0.1)'};
  color: ${props => props.color || COLORS.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.2);
`;

const CounterBadge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${COLORS.white};
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  box-shadow: ${SHADOWS.sm};
  border: 1px solid ${COLORS.border};
  font-weight: 600;
  font-size: 0.875rem;
  color: ${COLORS.dark};
  
  span.highlight {
    color: ${COLORS.primary};
    font-weight: 800;
  }
`;

const SliderContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 24px;
  box-shadow: ${SHADOWS.xl};
`;

const SlideTrack = styled(motion.div)`
  display: flex;
  cursor: grab;
  &:active { cursor: grabbing; }
`;

const SlideItem = styled.div`
  min-width: 100%;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  position: relative;
  
  /* Mock UI Preview */
  .preview-ui {
    width: 100%;
    max-width: 800px;
    height: 400px;
    background: ${COLORS.white};
    border-radius: 16px;
    box-shadow: ${SHADOWS.lg};
    border: 1px solid ${COLORS.border};
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    
    .ui-header {
      height: 40px;
      border-bottom: 1px solid ${COLORS.border};
      display: flex;
      align-items: center;
      padding: 0 1rem;
      gap: 0.5rem;
      background: #f1f5f9;
      
      .dot { width: 8px; height: 8px; border-radius: 50%; background: #cbd5e1; }
    }
    
    .ui-body {
      flex: 1;
      padding: 2rem;
      display: grid;
      place-items: center;
      background: radial-gradient(circle at center, #f8fafc 0%, #ffffff 100%);
      
      h3 { font-size: 2rem; color: ${COLORS.primary}; margin-bottom: 1rem; }
      p { color: ${COLORS.lightText}; max-width: 400px; }
    }
  }
`;

const SliderNav = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 10;
`;

const SliderDot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? COLORS.primary : 'rgba(0,0,0,0.2)'};
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    transform: scale(1.2);
  }
`;

const SliderArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(4px);
  border: 1px solid ${COLORS.border};
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 10;
  color: ${COLORS.dark};
  box-shadow: ${SHADOWS.md};
  
  &:hover {
    background: ${COLORS.white};
    transform: translateY(-50%) scale(1.1);
  }
  
  &.prev { left: 1rem; }
  &.next { right: 1rem; }
`;

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

  @media (max-width: 768px) {
    font-size: 2.5rem;
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
  
  /* Add a subtle pattern overlay */
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

const BannerSlider = () => {
  const [current, setCurrent] = useState(0);
  const slides = [
    { title: "Dashboard Intuitif", desc: "Contrôlez vos réunions en un clic.", color: "#3b82f6" },
    { title: "Mode Studio", desc: "Qualité 4K sans compromis.", color: "#8b5cf6" },
    { title: "Analytiques", desc: "Suivez l'engagement en temps réel.", color: "#10b981" },
  ];

  const handleNext = () => setCurrent(prev => (prev + 1) % slides.length);
  const handlePrev = () => setCurrent(prev => (prev - 1 + slides.length) % slides.length);

  return (
    <SliderContainer>
       <AnimatePresence mode='wait'>
          <SlideTrack
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <SlideItem>
              <div className="preview-ui">
                <div className="ui-header">
                  <div className="dot" style={{ background: '#ef4444' }} />
                  <div className="dot" style={{ background: '#f59e0b' }} />
                  <div className="dot" style={{ background: '#10b981' }} />
                </div>
                <div className="ui-body">
                  <motion.h3 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{ color: slides[current].color }}
                  >
                    {slides[current].title}
                  </motion.h3>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {slides[current].desc}
                  </motion.p>
                </div>
              </div>
            </SlideItem>
          </SlideTrack>
      </AnimatePresence>
      
      <SliderArrow className="prev" onClick={handlePrev}><ChevronLeft size={24} /></SliderArrow>
      <SliderArrow className="next" onClick={handleNext}><ChevronRight size={24} /></SliderArrow>

      <SliderNav>
        {slides.map((_, idx) => (
          <SliderDot key={idx} active={idx === current} onClick={() => setCurrent(idx)} />
        ))}
      </SliderNav>
    </SliderContainer>
  );
};

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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;



const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${COLORS.dark};
  margin-bottom: 0.75rem;
`;

const FeatureText = styled.p`
  color: ${COLORS.lightText};
  line-height: 1.6;
`;

// --- TESTIMONIALS SECTION ---
const TestimonialsSection = styled.section`
  padding: 5rem 1.5rem;
  background-color: ${COLORS.white};
  border-bottom: 1px solid ${COLORS.border};
`;

const TestimonialsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
`;

const TestimonialCard = styled.div`
  background-color: ${COLORS.background};
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid ${COLORS.border};
`;

const QuoteIcon = styled.div`
  color: ${COLORS.primary};
  margin-bottom: 1.5rem;
  opacity: 0.2;
`;

const TestimonialText = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  color: ${COLORS.text};
  font-style: italic;
  margin-bottom: 2rem;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AuthorAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${COLORS.dark};
  color: ${COLORS.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.div`
  font-weight: 700;
  color: ${COLORS.dark};
`;

const AuthorTitle = styled.div`
  font-size: 0.875rem;
  color: ${COLORS.lightText};
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

const PricingCard = styled.div`
  background-color: ${COLORS.white};
  border: 1px solid ${props => props.$popular ? COLORS.primary : COLORS.border};
  border-radius: 16px;
  padding: 2.5rem;
  position: relative;
  box-shadow: ${props => props.$popular ? SHADOWS.lg : SHADOWS.sm};
  display: flex;
  flex-direction: column;
`;

const PopularBadge = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
  padding: 0.25rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
`;

const PlanName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${COLORS.dark};
  margin-bottom: 0.5rem;
`;

const PlanPrice = styled.div`
  font-size: 3rem;
  font-weight: 800;
  color: ${COLORS.dark};
  margin-bottom: 2rem;
  
  span {
    font-size: 1rem;
    font-weight: 500;
    color: ${COLORS.lightText};
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  flex-grow: 1;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  color: ${COLORS.text};
  font-size: 1rem;
  
  svg {
    color: ${COLORS.success};
    flex-shrink: 0;
  }
`;

const PricingButton = styled.button`
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  
  background-color: ${props => props.$primary ? COLORS.primary : COLORS.white};
  color: ${props => props.$primary ? COLORS.white : COLORS.primary};
  border: 1px solid ${COLORS.primary};
  
  &:hover {
    background-color: ${props => props.$primary ? '#1d4ed8' : '#eff6ff'};
    border-color: ${props => props.$primary ? '#1d4ed8' : COLORS.primary};
  }
`;

// --- ABOUT SECTION ---
const AboutSection = styled.section`
  padding: 5rem 1.5rem;
  background-color: ${COLORS.background}; // Slate 50 as requested
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

  return (
    <PageContainer>
      <HeaderClean />

      {/* HERO SECTION */}
      <HeroSection>
        <HeroContainer>
          <HeroContent>
            <HeroHeadline>
              Visioconférence <br/>
              <span>simplement professionnelle.</span>
            </HeroHeadline>
            <HeroSubhead>
              Connectez-vous avec vos équipes, clients et partenaires avec une qualité vidéo et audio exceptionnelle. Aucun téléchargement requis. Sécurisé, simple et rapide.
            </HeroSubhead>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button to="/signup" $variant="primary" style={{ padding: '0.875rem 1.5rem', fontSize: '1.125rem' }}>
                Démarrer gratuitement
              </Button>
              <Button to="/room/demo-pro-room" style={{ padding: '0.875rem 1.5rem', fontSize: '1.125rem', backgroundColor: '#0f172a', color: 'white', border: '1px solid #0f172a', display: 'flex', alignItems: 'center' }}>
                <Zap size={18} style={{ marginRight: '8px' }} />
                Test Room Pro
              </Button>
              <Button to="/demo" $variant="ghost" style={{ padding: '0.875rem 1.5rem', fontSize: '1.125rem' }}>
                <Play size={18} style={{ marginRight: '8px' }} fill={COLORS.secondary} />
                Voir la démo
              </Button>
            </div>
          </HeroContent>

          <HeroImage>
             {/* Enhanced UI representation */}
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
                           Présentation Q3
                         </div>
                         <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ width: '60%', height: '60%', border: '2px dashed #cbd5e1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                               <span style={{ fontSize: '12px', color: '#94a3b8' }}>Partage d'écran</span>
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
                <span>Réseau Global Optimisé</span>
             </PlaceholderBadge>

             <LiveSessionCard>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Daily Standup</div>
                  <LiveIndicator>
                    <span></span>
                    EN DIRECT
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
                    il y a 24 min
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

      {/* FEATURES SECTION */}
      <FeaturesSection id="features">
        <SectionHeader>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionTitle>Tout pour des réunions réussies</SectionTitle>
            <SectionSubtitle>
                Des fonctionnalités puissantes conçues pour les équipes modernes. Sécurisé, fiable et facile à utiliser.
            </SectionSubtitle>
          </motion.div>
        </SectionHeader>

        <FeaturesGrid>
            {[
                { 
                    icon: Video, 
                    title: "Vidéo HD & Audio", 
                    text: "Qualité vidéo et audio cristalline avec suppression du bruit et réduction de l'écho activées automatiquement.",
                    items: ["Jusqu'à 4k pris en charge", "Suppression de bruit AI", "Codec VP9 / AV1"],
                    color: "#3b82f6"
                },
                { 
                    icon: Shield, 
                    title: "Sécurité Bancaire", 
                    text: "Chiffrement de bout en bout pour tous les appels. Vos conversations restent privées et sécurisées à tout moment.",
                    items: ["Chiffrement E2E", "Conforme RGPD", "Aucune donnée stockée"],
                    color: "#10b981"
                },
                { 
                    icon: Zap, 
                    title: "Réunions Instantanées", 
                    text: "Démarrez en quelques secondes avec un lien partageable. Aucun téléchargement ni installation requis pour les invités.",
                    items: ["Liens en 1-clic", "Pas de compte requis", "Compatible mobile"],
                    color: "#f59e0b"
                },
                { 
                    icon: Users, 
                    title: "Collaboration d'Équipe", 
                    text: "Partage d'écran simple, tableau blanc collaboratif et chat intégré pour améliorer la productivité de votre équipe.",
                    items: ["Partage d'écran", "Tableau blanc", "Chat en temps réel"],
                    color: "#8b5cf6"
                }
            ].map((feature, index) => (
                <FeatureCardPremium
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                >
                    <IconWrapperPremium bg={`${feature.color}15`} color={feature.color}>
                        <feature.icon size={28} />
                    </IconWrapperPremium>
                    <FeatureTitle>{feature.title}</FeatureTitle>
                    <FeatureText>
                        {feature.text}
                    </FeatureText>
                    <div style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
                        {feature.items.map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.875rem', color: COLORS.lightText }}>
                                <Check size={14} color={feature.color} /> {item}
                            </div>
                        ))}
                    </div>
                </FeatureCardPremium>
            ))}
        </FeaturesGrid>
      </FeaturesSection>

      <TechBentoGrid />

      {/* TESTIMONIALS SECTION */}
      <TestimonialsSection>
        <SectionHeader>
            <SectionTitle>Ce que disent nos utilisateurs</SectionTitle>
            <SectionSubtitle>
                Ils ont transformé leur manière de travailler grâce à VisioConnect.
            </SectionSubtitle>
        </SectionHeader>

        <TestimonialsGrid>
            <TestimonialCard>
                <div style={{ color: COLORS.primary, fontSize: '3rem', lineHeight: '1rem', marginBottom: '1rem', fontFamily: 'serif' }}>"</div>
                <TestimonialText>
                    "La qualité vidéo est incomparable, même avec une connexion 4G. C'est devenu notre outil indispensable pour les réunions d'équipe quotidiennes."
                </TestimonialText>
                <TestimonialAuthor>
                    <AuthorAvatar>JB</AuthorAvatar>
                    <AuthorInfo>
                        <AuthorName>Jean Benoit</AuthorName>
                        <AuthorTitle>CTO @ StartupFlow</AuthorTitle>
                    </AuthorInfo>
                </TestimonialAuthor>
            </TestimonialCard>

            <TestimonialCard>
                <div style={{ color: COLORS.primary, fontSize: '3rem', lineHeight: '1rem', marginBottom: '1rem', fontFamily: 'serif' }}>"</div>
                <TestimonialText>
                    "Simple, efficace et surtout sécurisé. On a pu l'adopter en 5 minutes sans formation. Le partage d'écran est ultra fluide."
                </TestimonialText>
                <TestimonialAuthor>
                    <AuthorAvatar style={{ background: COLORS.primary }}>AL</AuthorAvatar>
                    <AuthorInfo>
                        <AuthorName>Alice Lambert</AuthorName>
                        <AuthorTitle>Freelance Designer</AuthorTitle>
                    </AuthorInfo>
                </TestimonialAuthor>
            </TestimonialCard>

            <TestimonialCard>
                <div style={{ color: COLORS.primary, fontSize: '3rem', lineHeight: '1rem', marginBottom: '1rem', fontFamily: 'serif' }}>"</div>
                <TestimonialText>
                    "Enfin une alternative européenne crédible qui respecte nos données. Le support est réactif et les fonctionnalités s'améliorent chaque semaine."
                </TestimonialText>
                <TestimonialAuthor>
                    <AuthorAvatar style={{ background: '#10b981' }}>MS</AuthorAvatar>
                    <AuthorInfo>
                        <AuthorName>Marc Simon</AuthorName>
                        <AuthorTitle>Manager @ BigCorp</AuthorTitle>
                    </AuthorInfo>
                </TestimonialAuthor>
            </TestimonialCard>
        </TestimonialsGrid>
      </TestimonialsSection>

      {/* PRICING SECTION */}
      <PricingSectionWrapper id="pricing">
        <SectionHeader>
            <SectionTitle>Prix simples et transparents</SectionTitle>
            <SectionSubtitle>
                Choisissez le plan qui vous correspond. Sans frais cachés.
            </SectionSubtitle>
        </SectionHeader>

        <PricingGrid>
            <PricingCard>
                <PlanName>Gratuit</PlanName>
                <PlanPrice>0€ <span>/ mois</span></PlanPrice>
                <FeatureList>
                    <FeatureItem><Check size={18} /> Jusqu'à 40 min par réunion</FeatureItem>
                    <FeatureItem><Check size={18} /> Jusqu'à 100 participants</FeatureItem>
                    <FeatureItem><Check size={18} /> Chat Privé & Groupe</FeatureItem>
                    <FeatureItem><Check size={18} /> Tableau Blanc Basique</FeatureItem>
                </FeatureList>
                <PricingButton as={Link} to="/signup">Démarrer Gratuitement</PricingButton>
            </PricingCard>

            <PricingCard $popular>
                <PopularBadge>Populaire</PopularBadge>
                <PlanName>Pro</PlanName>
                <PlanPrice>12€ <span>/ mois</span></PlanPrice>
                <FeatureList>
                    <FeatureItem><Check size={18} /> Durée de réunion illimitée</FeatureItem>
                    <FeatureItem><Check size={18} /> Jusqu'à 150 participants</FeatureItem>
                    <FeatureItem><Check size={18} /> Enregistrement Cloud (1Go)</FeatureItem>
                    <FeatureItem><Check size={18} /> Gestion Utilisateurs Avancée</FeatureItem>
                    <FeatureItem><Check size={18} /> Branding Personnalisé</FeatureItem>
                </FeatureList>
                <PricingButton $primary as={Link} to="/signup?plan=pro">Essayer Pro</PricingButton>
            </PricingCard>

            <PricingCard>
                <PlanName>Entreprise</PlanName>
                <PlanPrice>Sur mesure</PlanPrice>
                <FeatureList>
                    <FeatureItem><Check size={18} /> Tout ce qui est inclus dans Pro</FeatureItem>
                    <FeatureItem><Check size={18} /> Jusqu'à 300 participants</FeatureItem>
                    <FeatureItem><Check size={18} /> Enregistrement Illimité</FeatureItem>
                    <FeatureItem><Check size={18} /> Intégration SSO</FeatureItem>
                    <FeatureItem><Check size={18} /> Support Dédié 24/7</FeatureItem>
                </FeatureList>
                <PricingButton as={Link} to="/contact">Contacter les Ventes</PricingButton>
            </PricingCard>
        </PricingGrid>
      </PricingSectionWrapper>

      {/* ABOUT SECTION */}
      <AboutSection id="about">
        <SectionHeader>
          <SectionTitle>À propos du projet</SectionTitle>
          <AboutText>
            VisioConnect est né de ma passion pour les technologies de communication moderne. 
            En tant que développeur full-stack, j'ai voulu créer une solution qui combine innovation technologique et expérience utilisateur exceptionnelle.
          </AboutText>
        </SectionHeader>

        <AboutContent>
          <AboutGrid>
            <AboutCard>
              <AboutCardTitle>
                <Eye size={24} color={COLORS.primary} />
                Ma vision
              </AboutCardTitle>
              <p style={{ color: COLORS.lightText, lineHeight: '1.6' }}>
                Démocratiser l'accès à des outils de communication professionnels de haute qualité. 
                Chaque équipe, quelle que soit sa taille, mérite une technologie qui amplifie sa collaboration.
              </p>
            </AboutCard>
            <AboutCard>
              <AboutCardTitle>
                <Server size={24} color={COLORS.primary} />
                Technologies
              </AboutCardTitle>
              <p style={{ color: COLORS.lightText, lineHeight: '1.6' }}>
                React.js, WebRTC, Supabase Realtime, Node.js, AI/ML pour l'optimisation vidéo, 
                et bien d'autres technologies cutting-edge pour une expérience fluide.
              </p>
            </AboutCard>
          </AboutGrid>

          <AboutStatsGrid>
            <AboutStat>
              <Calendar size={28} color={COLORS.primary} style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontWeight: '700', fontSize: '1.25rem', color: COLORS.dark }}>2024</div>
              <div style={{ fontSize: '0.875rem', color: COLORS.lightText }}>Année de création</div>
            </AboutStat>
            <AboutStat>
              <Code size={28} color={COLORS.primary} style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontWeight: '700', fontSize: '1.25rem', color: COLORS.dark }}>Open Source</div>
              <div style={{ fontSize: '0.875rem', color: COLORS.lightText }}>Philosophie</div>
            </AboutStat>
            <AboutStat>
              <Heart size={28} color={COLORS.primary} style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontWeight: '700', fontSize: '1.25rem', color: COLORS.dark }}>100%</div>
              <div style={{ fontSize: '0.875rem', color: COLORS.lightText }}>Passion</div>
            </AboutStat>
            <AboutStat>
              <Globe size={28} color={COLORS.primary} style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontWeight: '700', fontSize: '1.25rem', color: COLORS.dark }}>Global</div>
              <div style={{ fontSize: '0.875rem', color: COLORS.lightText }}>Portée</div>
            </AboutStat>
          </AboutStatsGrid>
        </AboutContent>
      </AboutSection>

      {/* CONTACT SECTION */}
      <ContactSection id="contact">
        <ContactContainer>
          <SectionTitle>Restons connectés</SectionTitle>
          <SectionSubtitle>
             Une question, une suggestion, ou envie de collaborer ? N'hésitez pas à me contacter !
          </SectionSubtitle>
          
          <ContactActions>
             <ContactLink href="mailto:contact.visioconnect@gmail.com">
                <Mail size={32} />
                <span>Email</span>
             </ContactLink>
             <ContactLink href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github size={32} />
                <span>GitHub</span>
             </ContactLink>
             <ContactLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin size={32} />
                <span>LinkedIn</span>
             </ContactLink>
          </ContactActions>
        </ContactContainer>
      </ContactSection>

      <IndieBadge />

      <FooterClean />
    </PageContainer>
  );
}
