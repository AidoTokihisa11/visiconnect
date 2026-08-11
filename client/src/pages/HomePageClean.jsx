import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';
import { useTranslation } from '../hooks/useTranslation';
import { useHomePageData } from '../hooks/useHomePageData';
import FeaturesCarousel3D from '../components/home/FeaturesCarousel3D';
import KeyStats from '../components/home/KeyStats';
import TechBentoGrid from '../components/home/TechBentoGrid';
import { EditableText } from '../components/Admin/EditableContent';
import FeaturesTabs from '../components/home/FeaturesTabs';
import FeatureCard from '../components/home/FeatureCard';
import TestimonialCard from '../components/home/TestimonialCard';
import PricingCard from '../components/home/PricingCard';
import HeroConferenceDemo from '../components/home/HeroConferenceDemo';
import SEO from '../components/SEO';

import {
  Video,
  Users,
  Shield,
  Zap,
  ArrowRight,
  Sparkles,
  Globe,
  Check,
  Menu,
  X,
  Play,
  Code,
  Heart,
  Calendar,
  Mail,
  Github,
  Linkedin,
  Eye,
  Server,
  ChevronLeft,
  ChevronRight,
  BarChart,
  Smartphone,
  Laptop,
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
  altBackground: 'hsl(var(--muted))', // visually distinct from background
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
  font-family:
    'Inter',
    system-ui,
    -apple-system,
    sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
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

  ${(props) =>
    props.$variant === 'primary'
      ? `
    background-color: ${COLORS.primary};
    color: ${COLORS.white};
    border: 1px solid ${COLORS.primary};
    &:hover {
      background-color: #1d4ed8; 
      border-color: #1d4ed8;
    }
  `
      : props.$variant === 'ghost'
        ? `
    background-color: ${COLORS.white};
    color: ${COLORS.secondary};
    border: 1px solid ${COLORS.border};
    &:hover {
      background-color: ${COLORS.background};
      border-color: #cbd5e1;
      color: ${COLORS.dark};
    }
  `
        : `
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
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;

  @media (max-width: 640px) {
    padding: 3rem 1rem;
  }

  @media (max-width: 420px) {
    padding: 2rem 0.9rem;
  }
`;

const HeroContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 4rem;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
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
  min-width: 0;
  width: 100%;
  max-width: 100%;

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
  max-width: 100%;
  overflow-wrap: break-word;
  word-break: break-word;
  hyphens: auto;

  span {
    color: ${COLORS.primary};
  }

  @media (max-width: 900px) {
    font-size: 3rem;
    white-space: normal;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
    white-space: normal;
  }

  @media (max-width: 480px) {
    font-size: 1.9rem;
    white-space: normal;
    letter-spacing: -0.03em;
  }
`;

const HeroSubhead = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  color: ${COLORS.lightText};
  max-width: 600px;
  width: 100%;
  overflow-wrap: break-word;
  word-break: break-word;
  hyphens: auto;

  @media (max-width: 640px) {
    font-size: 1rem;
    line-height: 1.55;
  }
`;

const HeroActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  max-width: 520px;
  min-width: 0;

  @media (max-width: 900px) {
    align-items: stretch;
    margin: 0 auto;
  }
`;

const CtaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.625rem;
  }
`;

const CtaButton = styled(Link)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none;
  padding: 0.6875rem 1.125rem;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: -0.005em;
  line-height: 1;
  white-space: nowrap;
  border: 1px solid transparent;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease,
    box-shadow 0.15s ease,
    transform 0.1s ease;

  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateX(2px);
  }

  &:active {
    transform: translateY(0.5px);
  }

  &:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }

  ${(props) =>
    props.$variant === 'primary'
      ? `
    background-color: #2563eb;
    color: #ffffff;
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.1) inset,
      0 1px 2px rgba(15, 23, 42, 0.08),
      0 4px 12px -4px rgba(37, 99, 235, 0.4);
    &:hover {
      background-color: #1d4ed8;
      box-shadow:
        0 1px 0 rgba(255, 255, 255, 0.1) inset,
        0 2px 4px rgba(15, 23, 42, 0.1),
        0 8px 20px -6px rgba(37, 99, 235, 0.5);
    }
  `
      : `
    background-color: transparent;
    color: #0f172a;
    border-color: #e2e8f0;
    &:hover {
      background-color: #f8fafc;
      border-color: #cbd5e1;
    }
  `}
`;

const HeroMeta = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.8125rem;
  color: #64748b;
  line-height: 1.4;

  li {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
  }

  svg {
    color: #16a34a;
    flex-shrink: 0;
  }
`;

const CtaTertiary = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0;
  color: #475569;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.15s ease;
  align-self: flex-start;
  border-bottom: 1px dashed transparent;

  svg {
    transition: transform 0.2s ease;
  }

  &:hover {
    color: #0f172a;
    border-bottom-color: #cbd5e1;
  }

  &:hover svg {
    transform: scale(1.15);
  }

  @media (max-width: 900px) {
    align-self: center;
  }
`;

const HeroImage = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  min-height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 640px) {
    min-height: 300px;
  }

  @media (max-width: 420px) {
    min-height: 260px;
  }
`;

// --- TRUSTED SECTION ---
const TrustedSection = styled.section`
  padding: 4rem 1.5rem;
  background-color: ${COLORS.altBackground};
  border-bottom: 1px solid ${COLORS.border};

  @media (max-width: 640px) {
    padding: 2.5rem 1rem;
  }
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

  @media (max-width: 640px) {
    gap: 1.5rem;
  }

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

    @media (max-width: 480px) {
      height: 26px;
    }
  }
`;

// --- STATS SECTION ---
const StatsSection = styled.section`
  padding: 4rem 1.5rem;
  background-color: ${COLORS.white};
  border-bottom: 1px solid ${COLORS.border};

  @media (max-width: 640px) {
    padding: 2.5rem 1rem;
  }
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

  @media (max-width: 640px) {
    white-space: normal;
    padding: 0.75rem 1rem;
  }

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
    transition={{ type: 'spring', stiffness: 100 }}
    viewport={{ once: true }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: 'rgba(37, 99, 235, 0.1)',
          color: COLORS.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
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
  background-color: ${COLORS.altBackground};

  @media (max-width: 640px) {
    padding: 3rem 1rem;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem auto;

  @media (max-width: 640px) {
    margin: 0 auto 2.25rem auto;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  color: ${COLORS.dark};
  margin-bottom: 1rem;
  letter-spacing: -0.025em;

  @media (max-width: 640px) {
    font-size: 1.75rem;
  }

  @media (max-width: 420px) {
    font-size: 1.5rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.125rem;
  color: ${COLORS.lightText};
  line-height: 1.6;

  @media (max-width: 640px) {
    font-size: 1rem;
  }
`;

const FeaturesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
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

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 640px) {
    gap: 1.25rem;
  }
`;

// --- PRICING SECTION ---
const PricingSectionWrapper = styled.section`
  padding: 5rem 1.5rem;
  background-color: ${COLORS.altBackground};
  border-top: 1px solid ${COLORS.border};

  @media (max-width: 640px) {
    padding: 3rem 1rem;
  }
`;

const PricingGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
`;

// --- ABOUT SECTION ---
const AboutSection = styled.section`
  padding: 5rem 1.5rem;
  background-color: ${COLORS.background};
  border-top: 1px solid ${COLORS.border};

  @media (max-width: 640px) {
    padding: 3rem 1rem;
  }
`;

const AboutContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (max-width: 640px) {
    gap: 2rem;
  }
`;

const AboutText = styled.p`
  font-size: 1.125rem;
  line-height: 1.8;
  color: ${COLORS.secondary};
  text-align: center;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 640px) {
    font-size: 1rem;
    line-height: 1.7;
  }
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 640px) {
    gap: 1.25rem;
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

  @media (max-width: 640px) {
    padding: 1.25rem;
  }
`;

const AboutCardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${COLORS.dark};
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 640px) {
    font-size: 1.2rem;
  }
`;

const AboutStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 420px) {
    gap: 0.75rem;
  }
`;

const AboutStat = styled.div`
  background-color: ${COLORS.white};
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  border: 1px solid ${COLORS.border};
  box-shadow: ${SHADOWS.sm};

  @media (max-width: 640px) {
    padding: 1rem 0.75rem;
  }
`;

// --- CONTACT SECTION ---
const ContactSection = styled.section`
  padding: 5rem 1.5rem;
  background-color: ${COLORS.altBackground};
  border-top: 1px solid ${COLORS.border};

  @media (max-width: 640px) {
    padding: 3rem 1rem;
  }
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

  @media (max-width: 640px) {
    gap: 0.75rem;
    margin-top: 1.75rem;
  }
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

  @media (max-width: 640px) {
    width: 100px;
    padding: 1rem 0.5rem;
    font-size: 0.9rem;
  }
`;

// --- COMPONENT IMPLEMENTATION ---

export default function HomePageClean() {
  const { t } = useTranslation();
  const { featuresData, testimonialsData, pricingData, contactLinks } = useHomePageData();

  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'VisioConnect',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'VideoConferencingApplication',
    operatingSystem: 'Web, iOS, Android',
    url: 'https://www.visioconnect.pro/',
    image: 'https://www.visioconnect.pro/og-default.png',
    inLanguage: ['fr-FR', 'en-US'],
    description:
      'Plateforme de visioconférence sécurisée P2P avec chiffrement de bout en bout, tableau blanc collaboratif, enregistrements et sous-titres temps réel.',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'EUR',
      lowPrice: '0',
      highPrice: '35',
      offerCount: 3,
      offers: [
        {
          '@type': 'Offer',
          name: 'Starter',
          price: '0',
          priceCurrency: 'EUR',
          category: 'Freemium',
          availability: 'https://schema.org/InStock',
        },
        {
          '@type': 'Offer',
          name: 'Pro',
          price: '15',
          priceCurrency: 'EUR',
          category: 'Subscription',
          availability: 'https://schema.org/InStock',
        },
        {
          '@type': 'Offer',
          name: 'Business',
          price: '35',
          priceCurrency: 'EUR',
          category: 'Subscription',
          availability: 'https://schema.org/InStock',
        },
      ],
    },
    publisher: { '@id': 'https://www.visioconnect.pro/#organization' },
  };

  return (
    <>
      <SEO
        title="Visioconférence en ligne sécurisée & RGPD"
        description="Visioconférence en ligne sécurisée, sans installation. Chiffrement bout en bout, tableau blanc collaboratif. Alternative française à Zoom, conforme RGPD."
        keywords="visioconférence, visioconférence en ligne, visioconférence sécurisée, alternative Zoom, visioconférence française, visio RGPD, réunion en ligne sans installation, tableau blanc collaboratif"
        path="/"
        jsonLd={homeJsonLd}
      />
      <PageContainer>
        <HeaderClean />

        {/* HERO SECTION */}
        <HeroSection>
          <HeroContainer>
            <HeroContent>
              <HeroHeadline>
                <EditableText
                  translationKey="hero.titleLine1"
                  defaultValue={t('hero.titleLine1')}
                />
                <br />
                <span>
                  <EditableText
                    translationKey="hero.titleLine2"
                    defaultValue={t('hero.titleLine2')}
                  />
                </span>
              </HeroHeadline>
              <HeroSubhead>
                <EditableText
                  translationKey="hero.subtitle"
                  defaultValue={t('hero.subtitle')}
                  type="textarea"
                />
              </HeroSubhead>
              <HeroActions>
                <CtaRow>
                  <CtaButton to="/signup" $variant="primary" aria-label={t('hero.startFree')}>
                    {t('hero.startFree')}
                    <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" />
                  </CtaButton>

                  <CtaButton to="/demo?join=1" aria-label={t('hero.testRoom')}>
                    {t('hero.testRoom')}
                  </CtaButton>
                </CtaRow>

                <HeroMeta aria-label="Avantages">
                  <li>
                    <Check size={14} strokeWidth={2.75} aria-hidden="true" />
                    Gratuit
                  </li>
                  <li>
                    <Check size={14} strokeWidth={2.75} aria-hidden="true" />
                    Aucune carte bancaire
                  </li>
                  <li>
                    <Check size={14} strokeWidth={2.75} aria-hidden="true" />
                    30 s pour démarrer
                  </li>
                </HeroMeta>

                <CtaTertiary to="/demo">
                  <Play size={12} fill="currentColor" />
                  {t('hero.watchDemo')} · {t('hero.watchDemoSub')}
                </CtaTertiary>
              </HeroActions>
            </HeroContent>

            <HeroImage>
              <HeroConferenceDemo />
            </HeroImage>
          </HeroContainer>
        </HeroSection>

        <FeaturesCarousel3D />

        {/* FEATURES TABS SECTION */}
        <FeaturesTabs t={t} />

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
              <SectionSubtitle>{t('homeFeatures.subtitle')}</SectionSubtitle>
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
            <SectionSubtitle>{t('testimonials.subtitle')}</SectionSubtitle>
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
            <SectionSubtitle>{t('pricing.subtitle')}</SectionSubtitle>
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
            <AboutText>{t('projectDescription')}</AboutText>
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
                <p style={{ color: COLORS.lightText, lineHeight: '1.6' }}>{t('techDescription')}</p>
              </AboutCard>
            </AboutGrid>

            <AboutStatsGrid>
              <AboutStat>
                <Calendar size={28} color={COLORS.primary} style={{ marginBottom: '0.5rem' }} />
                <div style={{ fontWeight: '700', fontSize: '1.25rem', color: COLORS.dark }}>
                  2024
                </div>
                <div style={{ fontSize: '0.875rem', color: COLORS.lightText }}>
                  {t('creationYear')}
                </div>
              </AboutStat>
              <AboutStat>
                <Code size={28} color={COLORS.primary} style={{ marginBottom: '0.5rem' }} />
                <div style={{ fontWeight: '700', fontSize: '1.25rem', color: COLORS.dark }}>
                  {t('philosophyValue')}
                </div>
                <div style={{ fontSize: '0.875rem', color: COLORS.lightText }}>
                  {t('philosophy')}
                </div>
              </AboutStat>
              <AboutStat>
                <Heart size={28} color={COLORS.primary} style={{ marginBottom: '0.5rem' }} />
                <div style={{ fontWeight: '700', fontSize: '1.25rem', color: COLORS.dark }}>
                  100%
                </div>
                <div style={{ fontSize: '0.875rem', color: COLORS.lightText }}>
                  {t('passionLabel')}
                </div>
              </AboutStat>
              <AboutStat>
                <Globe size={28} color={COLORS.primary} style={{ marginBottom: '0.5rem' }} />
                <div style={{ fontWeight: '700', fontSize: '1.25rem', color: COLORS.dark }}>
                  {t('globalValue')}
                </div>
                <div style={{ fontSize: '0.875rem', color: COLORS.lightText }}>
                  {t('scopeLabel')}
                </div>
              </AboutStat>
            </AboutStatsGrid>
          </AboutContent>
        </AboutSection>

        {/* CONTACT SECTION */}
        <ContactSection id="contact">
          <ContactContainer>
            <SectionTitle>{t('contactTitle')}</SectionTitle>
            <SectionSubtitle>{t('contactDescription')}</SectionSubtitle>

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

        <FooterClean />
      </PageContainer>
    </>
  );
}
