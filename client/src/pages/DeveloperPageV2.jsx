import React, { useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import {
  Code2,
  Layout,
  Server,
  Zap,
  Heart,
  Terminal,
  ArrowRight,
  Compass,
  Database,
  Wrench,
  MonitorSmartphone,
  Github,
  Briefcase,
  GraduationCap,
  Coffee,
  Rocket,
  Star,
  Code,
  Play,
  BadgeCheck,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';
import { useTranslation } from '../hooks/useTranslation';

const businessContactAddress = ['contact', 'visiconnect.app'].join('@');

// ─── Palette ──────────────────────────────────────────────────────────────────
const C = {
  primary: '#2563eb',
  navy: '#0f172a',
  text: '#374151',
  muted: '#6b7280',
  border: '#e5e7eb',
  bg: '#f8fbff',
  card: '#ffffff',
  softBlue: '#eff6ff',
  blueTint: '#dbeafe',
};

// ─── Keyframes ────────────────────────────────────────────────────────────────
const floatIn = keyframes`
  from { opacity:0; transform:translateY(22px) scale(0.97); }
  to   { opacity:1; transform:translateY(0)    scale(1);    }
`;

const pulseGlow = keyframes`
  0%,100% { transform:scale(1);    opacity:.45; }
  50%      { transform:scale(1.09); opacity:.72; }
`;

const revealStyles = css`
  opacity: 0;
  transform: translateY(36px) scale(0.985);
  transition:
    opacity 0.75s ease,
    transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--reveal-delay, 0ms);
  will-change: opacity, transform;
  &.is-visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
    transition: none;
  }
`;

// ─── Layout ───────────────────────────────────────────────────────────────────
const Page = styled.div`
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(37, 99, 235, 0.08), transparent 28%),
    radial-gradient(circle at bottom right, rgba(37, 99, 235, 0.04), transparent 38%),
    linear-gradient(180deg, ${C.bg} 0%, #fff 25%, #fff 100%);
  display: flex;
  flex-direction: column;
  color: ${C.navy};
  overflow-x: hidden;
`;
const Main = styled.main`
  flex: 1;
`;

// ─── Hero ─────────────────────────────────────────────────────────────────────
const HeroSection = styled.section`
  padding: 7rem 1.5rem 5rem;
  border-bottom: 1px solid ${C.border};
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 4rem 1.1rem 3rem;
  }

  @media (max-width: 480px) {
    padding: 2.6rem 1rem 2rem;
  }
`;
const BgGrid = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(37, 99, 235, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(37, 99, 235, 0.03) 1px, transparent 1px);
  background-size: 44px 44px;
`;
const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(300px, 0.8fr);
  gap: 3rem;
  align-items: center;
  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;
const HeroContent = styled.div`
  animation: ${floatIn} 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;
`;
const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  background: ${C.softBlue};
  border: 1px solid ${C.blueTint};
  color: ${C.primary};
  font-weight: 700;
  font-size: 0.82rem;
  margin-bottom: 1.25rem;
`;
const HeroTitle = styled.h1`
  font-size: clamp(2.8rem, 5.5vw, 4.5rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.05;
  margin: 0 0 1.1rem;
  color: ${C.navy};
  span {
    background: linear-gradient(135deg, ${C.primary}, #3b82f6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: block;
  }
`;
const HeroSubtitle = styled.p`
  font-size: 1.15rem;
  color: ${C.muted};
  line-height: 1.75;
  margin: 0 0 2.25rem;
  max-width: 580px;
  @media (max-width: 980px) {
    margin-left: auto;
    margin-right: auto;
  }
`;
const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  @media (max-width: 980px) {
    justify-content: center;
  }
`;
const PrimaryBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.9rem 1.5rem;
  border-radius: 12px;
  border: none;
  background: ${C.primary};
  color: #fff;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.3);
  transition:
    transform 0.2s,
    box-shadow 0.2s,
    background 0.2s;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 35px -5px rgba(37, 99, 235, 0.4);
    background: #1d4ed8;
  }
`;
const SecondaryBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.9rem 1.5rem;
  border-radius: 12px;
  border: 1.5px solid ${C.border};
  background: #fff;
  color: ${C.navy};
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition:
    border-color 0.2s,
    color 0.2s,
    transform 0.2s;
  &:hover {
    border-color: ${C.primary};
    color: ${C.primary};
    transform: translateY(-2px);
  }
`;

// ─── Hero panel ───────────────────────────────────────────────────────────────
const HeroPanel = styled.div`
  position: relative;
  overflow: hidden;
  background: linear-gradient(160deg, #fff 0%, ${C.bg} 100%);
  border: 1px solid ${C.border};
  border-radius: 24px;
  padding: 1.75rem;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
  animation: ${floatIn} 0.9s 0.15s cubic-bezier(0.22, 1, 0.36, 1) both;
  &::before {
    content: '';
    position: absolute;
    top: -60px;
    right: -30px;
    width: 160px;
    height: 160px;
    border-radius: 999px;
    background: radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, transparent 70%);
    animation: ${pulseGlow} 7s ease-in-out infinite;
    pointer-events: none;
  }
  @media (max-width: 980px) {
    display: none;
  }
`;
const PanelTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  color: ${C.navy};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
`;
const MetricCard = styled.div`
  padding: 1.15rem;
  background: #fff;
  border: 1px solid ${C.border};
  border-radius: 14px;
  transition:
    border-color 0.2s,
    box-shadow 0.2s,
    transform 0.2s;
  &:hover {
    border-color: ${C.blueTint};
    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.09);
    transform: translateY(-2px);
  }
  .val {
    font-size: 1.5rem;
    font-weight: 800;
    color: ${C.primary};
  }
  .lbl {
    font-size: 0.75rem;
    color: ${C.muted};
    margin-top: 2px;
    line-height: 1.4;
  }
`;

// ─── Proof band ───────────────────────────────────────────────────────────────
const ProofBand = styled.section`
  border-bottom: 1px solid ${C.border};
  background: linear-gradient(180deg, rgba(239, 246, 255, 0.9) 0%, rgba(255, 255, 255, 0.5) 100%);
`;
const ProofGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  @media (max-width: 760px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const ProofCard = styled.div`
  text-align: center;
  padding: 1.5rem 1rem;
  background: #fff;
  border: 1px solid ${C.border};
  border-radius: 16px;
  box-shadow: 0 4px 18px rgba(15, 23, 42, 0.04);
  transition:
    transform 0.28s ease,
    border-color 0.28s ease,
    box-shadow 0.28s ease;
  ${revealStyles}
  &:hover {
    transform: translateY(-4px);
    border-color: ${C.blueTint};
    box-shadow: 0 14px 32px rgba(37, 99, 235, 0.1);
  }
  .icon {
    color: ${C.primary};
    margin-bottom: 0.6rem;
  }
  .val {
    font-size: 1.9rem;
    font-weight: 800;
    color: ${C.navy};
  }
  .lbl {
    font-size: 0.8rem;
    color: ${C.muted};
    margin-top: 0.35rem;
  }
`;

// ─── Section helpers ──────────────────────────────────────────────────────────
const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 5.5rem 1.5rem;
`;
const SectionAlt = styled.section`
  background: ${C.softBlue};
  border-top: 1px solid ${C.blueTint};
  border-bottom: 1px solid ${C.blueTint};
  padding: 5.5rem 1.5rem;
`;
const SectionInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const SectionHeader = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3.5rem;
`;
const SectionEyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  background: ${C.softBlue};
  border: 1px solid ${C.blueTint};
  color: ${C.primary};
  font-weight: 700;
  font-size: 0.78rem;
  margin-bottom: 0.85rem;
  ${revealStyles}
`;
const SectionTitle = styled.h2`
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${C.navy};
  margin: 0 0 0.75rem;
  ${revealStyles}
`;
const SectionSub = styled.p`
  font-size: 1rem;
  color: ${C.muted};
  line-height: 1.7;
  margin: 0;
  ${revealStyles}
`;

// ─── Timeline ─────────────────────────────────────────────────────────────────
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
    background: ${C.blueTint};
    @media (max-width: 768px) {
      left: 14px;
    }
  }
`;
const TItem = styled.div`
  position: relative;
  width: 50%;
  padding-right: 2.5rem;
  margin-bottom: 3rem;
  &:nth-child(even) {
    margin-left: auto;
    padding-right: 0;
    padding-left: 2.5rem;
  }
  @media (max-width: 768px) {
    width: 100%;
    padding-left: 3.5rem !important;
    padding-right: 0 !important;
    margin-left: 0 !important;
  }
  &:last-child {
    margin-bottom: 0;
  }
  .dot {
    position: absolute;
    right: -13px;
    top: 10px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${C.primary};
    border: 3px solid ${C.softBlue};
    box-shadow: 0 0 0 3px #fff;
    z-index: 2;
    @media (max-width: 768px) {
      left: 0;
      right: auto;
    }
  }
  &:nth-child(even) .dot {
    left: -13px;
    right: auto;
    @media (max-width: 768px) {
      left: 0;
    }
  }
  ${revealStyles}
`;
const TCard = styled.div`
  background: #fff;
  padding: 1.75rem 2rem;
  border-radius: 20px;
  border: 1px solid ${C.border};
  box-shadow: 0 6px 22px rgba(15, 23, 42, 0.05);
  position: relative;
  overflow: hidden;
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 3px;
    background: linear-gradient(90deg, ${C.primary}, rgba(37, 99, 235, 0.3));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  &:hover {
    transform: translateY(-4px);
    border-color: ${C.blueTint};
    box-shadow: 0 16px 40px rgba(37, 99, 235, 0.1);
  }
  &:hover::after {
    transform: scaleX(1);
  }
  .year {
    display: inline-block;
    background: ${C.softBlue};
    color: ${C.primary};
    padding: 0.3rem 0.8rem;
    border-radius: 8px;
    font-size: 0.8rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    border: 1px solid ${C.blueTint};
  }
  h4 {
    font-size: 1.2rem;
    font-weight: 800;
    color: ${C.navy};
    margin: 0 0 0.6rem;
  }
  p {
    color: ${C.muted};
    line-height: 1.7;
    font-size: 0.92rem;
    margin: 0;
  }
`;

// ─── Skills ───────────────────────────────────────────────────────────────────
const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
  ${revealStyles}
`;
const SkillCard = styled.div`
  background: #fff;
  border: 1px solid ${C.border};
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 18px rgba(15, 23, 42, 0.04);
  position: relative;
  overflow: hidden;
  transition:
    transform 0.3s,
    border-color 0.3s,
    box-shadow 0.3s;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 3px;
    background: linear-gradient(90deg, ${C.primary}, rgba(37, 99, 235, 0.3));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s;
  }
  &:hover {
    transform: translateY(-4px);
    border-color: ${C.blueTint};
    box-shadow: 0 18px 36px rgba(37, 99, 235, 0.1);
  }
  &:hover::after {
    transform: scaleX(1);
  }
`;
const SkillHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding-bottom: 1.25rem;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid ${C.border};
`;
const SkillIconBox = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${C.softBlue};
  color: ${C.primary};
  flex-shrink: 0;
  transition:
    transform 0.3s,
    background 0.3s;
  ${SkillCard}:hover & {
    transform: scale(1.05);
    background: rgba(37, 99, 235, 0.12);
  }
`;
const SkillList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const SkillItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.88rem;
  color: ${C.text};
  font-weight: 500;
`;
const BarBg = styled.div`
  width: 100px;
  height: 5px;
  background: ${C.border};
  border-radius: 999px;
  overflow: hidden;
`;
const BarFill = styled.div`
  height: 100%;
  background: ${C.primary};
  border-radius: 999px;
  width: ${({ $w }) => $w || '0%'};
`;

// ─── Projects ─────────────────────────────────────────────────────────────────
const ProjectsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6rem;
`;
const FeatureProject = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
  flex-direction: ${({ $reverse }) => ($reverse ? 'row-reverse' : 'row')};
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 2.5rem;
  }
  ${revealStyles}
`;
const ProjectVisual = styled.div`
  flex: 1.2;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 18px;
    ${({ $reverse }) => ($reverse ? 'left:-18px;' : 'right:-18px;')}
    background:${C.softBlue};
    border-radius: 22px;
    z-index: -1;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  &:hover::after {
    transform: translate(${({ $reverse }) => ($reverse ? '8px,-8px' : '-8px,-8px')});
  }
  @media (max-width: 1024px) {
    width: 100%;
    &::after {
      top: 12px;
      left: 12px;
      right: auto;
    }
    &:hover::after {
      transform: translate(-4px, -4px);
    }
  }
`;
const BrowserFrame = styled.div`
  background: #fff;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid ${C.border};
  box-shadow: 0 24px 50px -12px rgba(15, 23, 42, 0.14);
  .browser-header {
    height: 44px;
    background: #f8fafc;
    border-bottom: 1px solid ${C.border};
    display: flex;
    align-items: center;
    padding: 0 1.2rem;
    gap: 0.5rem;
    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }
    .red {
      background: #ef4444;
    }
    .yellow {
      background: #f59e0b;
    }
    .green {
      background: #22c55e;
    }
    .url {
      margin-left: 1rem;
      background: #fff;
      height: 26px;
      flex: 1;
      max-width: 280px;
      border-radius: 6px;
      border: 1px solid ${C.border};
      display: flex;
      align-items: center;
      padding: 0 0.75rem;
      font-size: 0.72rem;
      color: ${C.muted};
      font-family: monospace;
    }
  }
  .img-wrapper {
    position: relative;
    overflow: hidden;
    background: ${C.bg};
    img {
      width: 100%;
      height: 380px;
      object-fit: cover;
      object-position: top;
      display: block;
      transition: transform 0.6s ease;
    }
    .overlay {
      position: absolute;
      inset: 0;
      background: rgba(15, 23, 42, 0.55);
      backdrop-filter: blur(2px);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.35s ease;
      span {
        background: #fff;
        color: ${C.navy};
        padding: 0.85rem 1.75rem;
        border-radius: 999px;
        font-weight: 700;
        font-size: 1rem;
        display: flex;
        align-items: center;
        gap: 0.6rem;
        transform: translateY(16px);
        transition: transform 0.35s ease;
        box-shadow: 0 8px 24px rgba(15, 23, 42, 0.18);
      }
    }
  }
  &:hover .img-wrapper img {
    transform: scale(1.04);
  }
  &:hover .img-wrapper .overlay {
    opacity: 1;
  }
  &:hover .img-wrapper .overlay span {
    transform: translateY(0);
  }
`;
const ProjectInfo = styled.div`
  flex: 1;
  .proj-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 1rem;
    background: ${C.softBlue};
    color: ${C.primary};
    border: 1px solid ${C.blueTint};
    border-radius: 999px;
    font-size: 0.78rem;
    font-weight: 700;
    margin-bottom: 1.25rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  h3 {
    font-size: clamp(1.8rem, 3vw, 2.6rem);
    font-weight: 800;
    color: ${C.navy};
    margin: 0 0 1.1rem;
    letter-spacing: -0.025em;
    line-height: 1.1;
  }
  p {
    color: ${C.muted};
    font-size: 1.05rem;
    line-height: 1.8;
    margin-bottom: 2rem;
  }
  .stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
    margin-bottom: 2.25rem;
    span {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.5rem 1rem;
      background: #fff;
      border: 1px solid ${C.border};
      border-radius: 10px;
      font-size: 0.85rem;
      font-weight: 600;
      color: ${C.text};
      transition:
        border-color 0.2s,
        transform 0.2s;
      svg {
        color: ${C.muted};
      }
      &:hover {
        border-color: ${C.blueTint};
        transform: translateY(-2px);
      }
    }
  }
  .actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    a {
      padding: 0.85rem 1.6rem;
      border-radius: 12px;
      font-weight: 600;
      font-size: 0.95rem;
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      text-decoration: none;
      transition: all 0.2s ease;
      &.btn-primary {
        background: ${C.navy};
        color: #fff;
        box-shadow: 0 8px 20px rgba(15, 23, 42, 0.25);
        &:hover {
          background: #1e293b;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(15, 23, 42, 0.3);
        }
      }
      &.btn-secondary {
        background: #fff;
        color: ${C.navy};
        border: 1.5px solid ${C.border};
        &:hover {
          border-color: ${C.primary};
          color: ${C.primary};
          transform: translateY(-2px);
        }
      }
    }
  }
`;

// ─── Philosophy ───────────────────────────────────────────────────────────────
const PhiloCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  background: #fff;
  border: 1px solid ${C.border};
  border-radius: 28px;
  padding: 4rem;
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.06);
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: -80px;
    right: -40px;
    width: 200px;
    height: 200px;
    border-radius: 999px;
    background: radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%);
    pointer-events: none;
  }
  ${revealStyles}
  @media(max-width:900px) {
    grid-template-columns: 1fr;
    padding: 2.5rem;
    gap: 2.5rem;
  }
`;
const PhiloContent = styled.div`
  h3 {
    font-size: clamp(1.8rem, 2.5vw, 2.4rem);
    font-weight: 800;
    color: ${C.navy};
    margin: 0 0 1rem;
    letter-spacing: -0.025em;
  }
  p {
    color: ${C.muted};
    font-size: 1rem;
    line-height: 1.8;
    margin-bottom: 2rem;
  }
`;
const PhiloPrinciples = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;
const Principle = styled.li`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  .icon-box {
    background: ${C.softBlue};
    color: ${C.primary};
    padding: 0.65rem;
    border-radius: 12px;
    display: flex;
    flex-shrink: 0;
  }
  .txt strong {
    display: block;
    color: ${C.navy};
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 0.2rem;
  }
  .txt span {
    color: ${C.muted};
    font-size: 0.9rem;
    line-height: 1.6;
  }
`;
const PhiloVisual = styled.div`
  position: relative;
  img {
    width: 100%;
    border-radius: 18px;
    box-shadow: 0 24px 50px rgba(15, 23, 42, 0.12);
    display: block;
  }
  .badge {
    position: absolute;
    bottom: -18px;
    right: -18px;
    background: #fff;
    padding: 1.25rem 1.5rem;
    border-radius: 16px;
    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.1);
    text-align: center;
    border: 1px solid ${C.border};
    strong {
      display: block;
      font-size: 1.5rem;
      font-weight: 800;
      color: ${C.navy};
    }
    span {
      color: ${C.muted};
      font-size: 0.82rem;
    }
  }
  @media (max-width: 900px) {
    .badge {
      bottom: -14px;
      right: 0;
    }
  }
`;

// ─── Stats band ───────────────────────────────────────────────────────────────
const StatsWrap = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem 6rem;
`;
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  background: linear-gradient(135deg, #1e40af 0%, ${C.primary} 100%);
  border-radius: 28px;
  padding: 4rem 2.5rem;
  color: #fff;
  text-align: center;
  box-shadow: 0 24px 50px rgba(37, 99, 235, 0.35);
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: -60%;
    left: -30%;
    right: -30%;
    height: 140%;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.07) 0%, transparent 60%);
    pointer-events: none;
  }
  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
  ${revealStyles}
`;
const StatItem = styled.div`
  position: relative;
  z-index: 1;
  .icon-wrap {
    width: 56px;
    height: 56px;
    background: rgba(255, 255, 255, 0.12);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    backdrop-filter: blur(8px);
  }
  .val {
    font-size: 3rem;
    font-weight: 800;
    line-height: 1;
    margin-bottom: 0.35rem;
    letter-spacing: -0.04em;
  }
  .lbl {
    color: #bfdbfe;
    font-size: 0.88rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
`;

// ─── Services ─────────────────────────────────────────────────────────────────
const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;
const ServiceCard = styled.div`
  background: #fff;
  border: 1px solid ${C.border};
  border-radius: 20px;
  padding: 2rem 1.75rem;
  box-shadow: 0 4px 18px rgba(15, 23, 42, 0.04);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.3s,
    border-color 0.3s,
    box-shadow 0.3s;
  ${revealStyles}
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 3px;
    background: linear-gradient(90deg, ${C.primary}, rgba(37, 99, 235, 0.3));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s;
  }
  &:hover {
    transform: translateY(-5px);
    border-color: ${C.blueTint};
    box-shadow: 0 22px 44px rgba(37, 99, 235, 0.13);
  }
  &:hover::after {
    transform: scaleX(1);
  }
`;
const ServiceIconWrap = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${C.softBlue}, ${C.blueTint});
  color: ${C.primary};
  margin-bottom: 1.25rem;
  flex-shrink: 0;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  ${ServiceCard}:hover & {
    transform: scale(1.12) rotate(-6deg);
    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.22);
  }
`;
const ServiceTitle = styled.h4`
  font-size: 1.05rem;
  font-weight: 800;
  color: ${C.navy};
  margin: 0 0 0.55rem;
`;
const ServiceDesc = styled.p`
  font-size: 0.875rem;
  color: ${C.muted};
  line-height: 1.65;
  margin: 0 0 1.25rem;
  flex: 1;
`;
const ServiceFeats = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  li {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    font-size: 0.82rem;
    color: ${C.text};
    font-weight: 500;
    &::before {
      content: '';
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: ${C.primary};
      flex-shrink: 0;
      opacity: 0.65;
    }
  }
`;

// ─── Process ──────────────────────────────────────────────────────────────────
const ProcessOuter = styled.div`
  position: relative;
`;
const ProcessLine = styled.div`
  position: absolute;
  top: 36px;
  left: calc(10% + 36px);
  right: calc(10% + 36px);
  height: 2px;
  background: linear-gradient(90deg, ${C.primary}, ${C.blueTint});
  @media (max-width: 900px) {
    display: none;
  }
`;
const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    max-width: 420px;
    margin: 0 auto;
  }
`;
const ProcessItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 0.5rem;
  ${revealStyles}
`;
const StepNum = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  z-index: 2;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $hi }) => ($hi ? `linear-gradient(135deg,${C.primary},#3b82f6)` : '#fff')};
  border: 2px solid ${({ $hi }) => ($hi ? C.primary : C.border)};
  box-shadow: ${({ $hi }) =>
    $hi ? `0 8px 24px rgba(37,99,235,.35)` : '0 4px 14px rgba(15,23,42,.07)'};
  color: ${({ $hi }) => ($hi ? '#fff' : C.primary)};
  font-size: 1.3rem;
  font-weight: 800;
  margin-bottom: 1.1rem;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  ${ProcessItem}:hover & {
    transform: scale(1.12);
    box-shadow: 0 14px 30px rgba(37, 99, 235, 0.3);
  }
`;
const StepLabel = styled.div`
  font-size: 0.95rem;
  font-weight: 800;
  color: ${C.navy};
  margin-bottom: 0.4rem;
`;
const StepDesc = styled.div`
  font-size: 0.8rem;
  color: ${C.muted};
  line-height: 1.6;
`;
const ProcessCard = styled.div`
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
  background: #fff;
  border: 1px solid ${C.border};
  border-radius: 18px;
  padding: 1.5rem;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);
  @media (min-width: 901px) {
    display: none;
  }
`;

// ─── TechStack ─────────────────────────────────────────────────────────────────
const TechBand = styled.div`
  background: #fff;
  border-top: 1px solid ${C.border};
  border-bottom: 1px solid ${C.border};
  padding: 5rem 1.5rem;
`;
const TechInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const TechGroups = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;
const TechGroup = styled.div`
  ${revealStyles}
`;
const TechGroupTitle = styled.div`
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${C.primary};
  margin-bottom: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;
const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;
const TechTag = styled.span`
  padding: 0.38rem 0.8rem;
  border-radius: 8px;
  background: ${C.softBlue};
  border: 1px solid ${C.blueTint};
  color: ${C.navy};
  font-size: 0.8rem;
  font-weight: 600;
  transition:
    background 0.2s,
    border-color 0.2s,
    transform 0.2s;
  &:hover {
    background: ${C.blueTint};
    border-color: ${C.primary};
    transform: translateY(-1px);
  }
`;

// ─── CTA ──────────────────────────────────────────────────────────────────────
const CtaSection = styled.section`
  background: linear-gradient(135deg, #1e40af 0%, ${C.primary} 55%, #3b82f6 100%);
  padding: 7rem 1.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 4rem 1.1rem;
  }

  @media (max-width: 480px) {
    padding: 2.8rem 1rem;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  &::after {
    content: '';
    position: absolute;
    top: -25%;
    left: 50%;
    transform: translateX(-50%);
    width: 700px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.07) 0%, transparent 60%);
    pointer-events: none;
  }
`;
const CtaInner = styled.div`
  max-width: 760px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;
const CtaAvail = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.45rem 1.2rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.22);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(8px);
  .dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: #4ade80;
    box-shadow: 0 0 8px #4ade80;
    animation: ${pulseGlow} 2s ease-in-out infinite;
  }
`;
const CtaTitle = styled.h2`
  font-size: clamp(2.2rem, 4.5vw, 3.4rem);
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.04em;
  line-height: 1.1;
  margin: 0 0 1.25rem;
`;
const CtaSub = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.75;
  margin: 0 0 2.5rem;
`;
const CtaActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;
const CtaBtnPrimary = styled.a`
  padding: 1.1rem 2.25rem;
  border-radius: 14px;
  background: #fff;
  color: ${C.primary};
  font-weight: 700;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  text-decoration: none;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.22);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 18px 44px rgba(0, 0, 0, 0.28);
  }
`;
const CtaBtnSecondary = styled.a`
  padding: 1.1rem 2.25rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  text-decoration: none;
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(8px);
  transition:
    transform 0.2s,
    background 0.2s,
    border-color 0.2s;
  &:hover {
    transform: translateY(-3px);
    background: rgba(255, 255, 255, 0.18);
    border-color: rgba(255, 255, 255, 0.45);
  }
`;
const CtaEmail = styled.div`
  margin-top: 2rem;
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  span {
    color: rgba(255, 255, 255, 0.85);
    font-weight: 600;
  }
`;

// ─── Page component ───────────────────────────────────────────────────────────
export default function DeveloperPageV2() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const nodes = Array.from(document.querySelectorAll('[data-reveal]'));
    if (!nodes.length) return undefined;
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
      nodes.forEach((n) => n.classList.add('is-visible'));
      return undefined;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.13, rootMargin: '0px 0px -8% 0px' }
    );
    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  return (
    <Page>
      <HeaderClean />
      <Main>
        {/* ── Hero ── */}
        <HeroSection>
          <BgGrid />
          <HeroContainer>
            <HeroContent>
              <Eyebrow>
                <Rocket size={14} />
                {t('developer.hero.role')}
              </Eyebrow>
              <HeroTitle>
                {t('developer.hero.title1')}
                <span>{t('developer.hero.title2')}</span>
              </HeroTitle>
              <HeroSubtitle>{t('developer.hero.desc')}</HeroSubtitle>
              <HeroActions>
                <PrimaryBtn>
                  {t('developer.hero.ctaProjects')} <ArrowRight size={17} />
                </PrimaryBtn>
                <SecondaryBtn>{t('developer.hero.ctaContact')}</SecondaryBtn>
              </HeroActions>
            </HeroContent>

            <HeroPanel>
              <PanelTitle>
                En quelques chiffres
                <BadgeCheck size={18} color={C.primary} />
              </PanelTitle>
              <MetricGrid>
                {[
                  { val: t('developer.stats.0.value'), lbl: t('developer.stats.0.label') },
                  { val: t('developer.stats.1.value'), lbl: t('developer.stats.1.label') },
                  { val: t('developer.stats.2.value'), lbl: t('developer.stats.2.label') },
                  { val: t('developer.stats.3.value'), lbl: t('developer.stats.3.label') },
                ].map(({ val, lbl }) => (
                  <MetricCard key={lbl}>
                    <div className="val">{val}</div>
                    <div className="lbl">{lbl}</div>
                  </MetricCard>
                ))}
              </MetricGrid>
            </HeroPanel>
          </HeroContainer>
        </HeroSection>

        {/* ── Proof band ── */}
        <ProofBand>
          <ProofGrid>
            {[
              { icon: <Code2 size={22} />, val: 'Full-Stack', lbl: 'React · Node.js · TypeScript' },
              { icon: <Zap size={22} />, val: 'Temps Réel', lbl: 'WebRTC · LiveKit · Socket.io' },
              { icon: <ShieldCheck size={22} />, val: 'Sécurisé', lbl: 'OWASP · JWT · Auth2' },
              {
                icon: <Rocket size={22} />,
                val: 'CI/CD Ready',
                lbl: 'Vercel · Docker · GitHub Actions',
              },
            ].map(({ icon, val, lbl }, i) => (
              <ProofCard key={val} data-reveal style={{ '--reveal-delay': `${i * 80}ms` }}>
                <div className="icon">{icon}</div>
                <div className="val">{val}</div>
                <div className="lbl">{lbl}</div>
              </ProofCard>
            ))}
          </ProofGrid>
        </ProofBand>

        {/* ── Services ── */}
        <Section>
          <SectionHeader>
            <SectionEyebrow data-reveal>
              <Zap size={13} />
              &nbsp;Services
            </SectionEyebrow>
            <SectionTitle data-reveal style={{ '--reveal-delay': '80ms' }}>
              Ce que je peux faire pour vous
            </SectionTitle>
            <SectionSub data-reveal style={{ '--reveal-delay': '140ms' }}>
              Du design à la mise en production, je vous accompagne avec rigueur et passion à chaque
              étape de votre projet.
            </SectionSub>
          </SectionHeader>
          <ServicesGrid>
            {[
              {
                icon: <MonitorSmartphone size={28} />,
                title: 'Développement Frontend',
                desc: 'Interfaces modernes, réactives et accessibles construites avec React, Next.js et des animations soignées qui convertissent.',
                feats: [
                  'React / Next.js / Vite',
                  'Animations & micro-interactions',
                  'Responsive & accessibilité WCAG',
                ],
              },
              {
                icon: <Server size={28} />,
                title: 'Développement Backend',
                desc: 'APIs robustes, sécurisées et scalables avec Node.js, Express et des bases de données adaptées à vos besoins.',
                feats: [
                  'Node.js / Express / REST & GraphQL',
                  'PostgreSQL · Convex · Redis',
                  'Auth JWT / OAuth2 / RBAC',
                ],
              },
              {
                icon: <Zap size={28} />,
                title: 'Applications Temps Réel',
                desc: 'Vidéo-conférence, chat live, tableaux blancs collaboratifs et tout ce qui demande des mises à jour instantanées.',
                feats: [
                  'WebRTC / LiveKit / Socket.io',
                  'Rooms & breakout sessions',
                  'Enregistrement & streaming HLS',
                ],
              },
              {
                icon: <Layout size={28} />,
                title: 'Design UI/UX',
                desc: 'Maquettes Figma haute-fidélité, design systems cohérents et prototypes interactifs pour valider vos idées rapidement.',
                feats: [
                  'Maquettes Figma haute-fidélité',
                  'Design system & tokens CSS',
                  'Tests utilisateurs & itération',
                ],
              },
              {
                icon: <ShieldCheck size={28} />,
                title: 'Performance & Sécurité',
                desc: 'Audit complet, optimisation des Core Web Vitals, sécurisation OWASP et revue de code pour des applications solides.',
                feats: [
                  'Lighthouse & Core Web Vitals',
                  'Protection OWASP Top 10',
                  'Code review & refactoring',
                ],
              },
              {
                icon: <Rocket size={28} />,
                title: 'Déploiement & DevOps',
                desc: 'Mise en production automatisée, CI/CD, monitoring et scalabilité pour que votre application reste toujours en ligne.',
                feats: [
                  'CI/CD GitHub Actions',
                  'Vercel / Netlify / Docker',
                  'Monitoring & alertes Sentry',
                ],
              },
            ].map(({ icon, title, desc, feats }, i) => (
              <ServiceCard key={title} data-reveal style={{ '--reveal-delay': `${i * 70}ms` }}>
                <ServiceIconWrap>{icon}</ServiceIconWrap>
                <ServiceTitle>{title}</ServiceTitle>
                <ServiceDesc>{desc}</ServiceDesc>
                <ServiceFeats>
                  {feats.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ServiceFeats>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </Section>

        {/* ── Timeline ── */}
        <SectionAlt>
          <SectionInner>
            <SectionHeader>
              <SectionEyebrow data-reveal>
                <Compass size={13} />
                &nbsp;Parcours
              </SectionEyebrow>
              <SectionTitle data-reveal style={{ '--reveal-delay': '80ms' }}>
                {t('developer.journey.title')}
              </SectionTitle>
              <SectionSub data-reveal style={{ '--reveal-delay': '140ms' }}>
                {t('developer.journey.subtitle')}
              </SectionSub>
            </SectionHeader>
            <TimelineWrapper>
              {[0, 1, 2, 3, 4].map((i) => (
                <TItem key={i} data-reveal style={{ '--reveal-delay': `${i * 100}ms` }}>
                  <div className="dot" />
                  <TCard>
                    <span className="year">{t(`developer.journey.stages.${i}.era`)}</span>
                    <h4>{t(`developer.journey.stages.${i}.title`)}</h4>
                    <p>{t(`developer.journey.stages.${i}.desc`)}</p>
                  </TCard>
                </TItem>
              ))}
            </TimelineWrapper>
          </SectionInner>
        </SectionAlt>

        {/* ── Skills ── */}
        <Section style={{ paddingBottom: '3rem' }}>
          <SectionHeader>
            <SectionEyebrow data-reveal>
              <Code size={13} />
              &nbsp;Compétences
            </SectionEyebrow>
            <SectionTitle data-reveal style={{ '--reveal-delay': '80ms' }}>
              {t('developer.skills.title')}
            </SectionTitle>
            <SectionSub data-reveal style={{ '--reveal-delay': '140ms' }}>
              {t('developer.skills.subtitle')}
            </SectionSub>
          </SectionHeader>
          <SkillsGrid data-reveal style={{ '--reveal-delay': '100ms' }}>
            <SkillCard>
              <SkillHeader>
                <SkillIconBox>
                  <MonitorSmartphone size={26} />
                </SkillIconBox>
                <strong style={{ fontSize: '1.1rem', fontWeight: 800, color: C.navy }}>
                  {t('developer.skills.categories.0')}
                </strong>
              </SkillHeader>
              <SkillList>
                {[
                  ['React / Next.js', '95%'],
                  ['Javascript / ES6+', '90%'],
                  ['Tailwind / Styled-Comp', '95%'],
                  ['HTML5 / CSS3', '98%'],
                  ['Framer Motion / GSAP', '80%'],
                  ['Zustand / Context API', '88%'],
                ].map(([n, w]) => (
                  <SkillItem key={n}>
                    <span>{n}</span>
                    <BarBg>
                      <BarFill $w={w} />
                    </BarBg>
                  </SkillItem>
                ))}
              </SkillList>
            </SkillCard>

            <SkillCard>
              <SkillHeader>
                <SkillIconBox>
                  <Database size={26} />
                </SkillIconBox>
                <strong style={{ fontSize: '1.1rem', fontWeight: 800, color: C.navy }}>
                  {t('developer.skills.categories.1')}
                </strong>
              </SkillHeader>
              <SkillList>
                {[
                  ['Node.js / Express', '85%'],
                  ['PostgreSQL / SQL', '80%'],
                  ['Convex (BaaS)', '90%'],
                  ['APIs REST / Webhooks', '92%'],
                  ['WebRTC / LiveKit', '80%'],
                  ['JWT / OAuth / Auth', '85%'],
                ].map(([n, w]) => (
                  <SkillItem key={n}>
                    <span>{n}</span>
                    <BarBg>
                      <BarFill $w={w} />
                    </BarBg>
                  </SkillItem>
                ))}
              </SkillList>
            </SkillCard>

            <SkillCard>
              <SkillHeader>
                <SkillIconBox>
                  <Wrench size={26} />
                </SkillIconBox>
                <strong style={{ fontSize: '1.1rem', fontWeight: 800, color: C.navy }}>
                  {t('developer.skills.categories.2')}
                </strong>
              </SkillHeader>
              <SkillList>
                {[
                  ['Git / GitHub', '90%'],
                  ['Vite / Webpack', '85%'],
                  ['Figma / UX-UI Design', '85%'],
                  ['Vercel / Netlify', '90%'],
                  ['Postman / API Testing', '90%'],
                  ['VS Code / CLI Bash', '95%'],
                ].map(([n, w]) => (
                  <SkillItem key={n}>
                    <span>{n}</span>
                    <BarBg>
                      <BarFill $w={w} />
                    </BarBg>
                  </SkillItem>
                ))}
              </SkillList>
            </SkillCard>
          </SkillsGrid>
        </Section>

        {/* ── TechStack ── */}
        <TechBand>
          <TechInner>
            <SectionHeader style={{ marginBottom: '3rem' }}>
              <SectionEyebrow data-reveal>
                <Code size={13} />
                &nbsp;Stack technique
              </SectionEyebrow>
              <SectionTitle data-reveal style={{ '--reveal-delay': '80ms' }}>
                Technologies maîtrisées
              </SectionTitle>
              <SectionSub data-reveal style={{ '--reveal-delay': '140ms' }}>
                Un panorama complet des outils et langages que j'utilise au quotidien pour
                construire des produits robustes.
              </SectionSub>
            </SectionHeader>
            <TechGroups>
              <TechGroup data-reveal>
                <TechGroupTitle>
                  <MonitorSmartphone size={14} />
                  Frontend
                </TechGroupTitle>
                <TechTags>
                  {[
                    'React',
                    'Next.js',
                    'TypeScript',
                    'JavaScript ES2024',
                    'HTML5',
                    'CSS3',
                    'Tailwind CSS',
                    'Styled-Components',
                    'Framer Motion',
                    'GSAP',
                    'Zustand',
                    'React Query',
                    'Vite',
                    'Webpack',
                    'Storybook',
                  ].map((tag) => (
                    <TechTag key={tag}>{tag}</TechTag>
                  ))}
                </TechTags>
              </TechGroup>
              <TechGroup data-reveal style={{ '--reveal-delay': '80ms' }}>
                <TechGroupTitle>
                  <Database size={14} />
                  Backend & BDD
                </TechGroupTitle>
                <TechTags>
                  {[
                    'Node.js',
                    'Express',
                    'NestJS',
                    'PostgreSQL',
                    'MySQL',
                    'Redis',
                    'Convex',
                    'Prisma ORM',
                    'Drizzle',
                    'REST API',
                    'GraphQL',
                    'WebSockets',
                    'JWT',
                    'OAuth2',
                    'Bcrypt',
                  ].map((tag) => (
                    <TechTag key={tag}>{tag}</TechTag>
                  ))}
                </TechTags>
              </TechGroup>
              <TechGroup data-reveal style={{ '--reveal-delay': '160ms' }}>
                <TechGroupTitle>
                  <Zap size={14} />
                  Temps Réel & Media
                </TechGroupTitle>
                <TechTags>
                  {[
                    'LiveKit',
                    'WebRTC',
                    'Socket.io',
                    'HLS Streaming',
                    'Canvas API',
                    'Fabric.js',
                    'OpenAI API',
                    'Stripe',
                    'Webhooks',
                    'SSE',
                    'CRDT',
                    'Y.js',
                    'Liveblocks',
                  ].map((tag) => (
                    <TechTag key={tag}>{tag}</TechTag>
                  ))}
                </TechTags>
              </TechGroup>
              <TechGroup data-reveal style={{ '--reveal-delay': '240ms' }}>
                <TechGroupTitle>
                  <Wrench size={14} />
                  DevOps & Outils
                </TechGroupTitle>
                <TechTags>
                  {[
                    'Git',
                    'GitHub',
                    'GitHub Actions',
                    'Docker',
                    'Vercel',
                    'Netlify',
                    'AWS S3',
                    'Sentry',
                    'Postman',
                    'Figma',
                    'VS Code',
                    'Bash',
                    'Linux',
                    'Lighthouse',
                    'OWASP ZAP',
                  ].map((tag) => (
                    <TechTag key={tag}>{tag}</TechTag>
                  ))}
                </TechTags>
              </TechGroup>
            </TechGroups>
          </TechInner>
        </TechBand>

        {/* ── Projects ── */}
        <SectionAlt>
          <SectionInner>
            <SectionHeader>
              <SectionEyebrow data-reveal>
                <Terminal size={13} />
                &nbsp;Projets
              </SectionEyebrow>
              <SectionTitle data-reveal style={{ '--reveal-delay': '80ms' }}>
                {t('developer.projects.title')}
              </SectionTitle>
              <SectionSub data-reveal style={{ '--reveal-delay': '140ms' }}>
                {t('developer.projects.subtitle')}
              </SectionSub>
            </SectionHeader>
            <ProjectsList>
              <FeatureProject data-reveal>
                <ProjectVisual>
                  <BrowserFrame>
                    <div className="browser-header">
                      <div className="dot red" />
                      <div className="dot yellow" />
                      <div className="dot green" />
                      <div className="url">app.visioconnect.com</div>
                    </div>
                    <div className="img-wrapper">
                      <img
                        src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                        alt="VisioConnect"
                      />
                      <div className="overlay">
                        <span>
                          <Play size={18} /> {t('developer.livePreview')}
                        </span>
                      </div>
                    </div>
                  </BrowserFrame>
                </ProjectVisual>
                <ProjectInfo>
                  <div className="proj-badge">{t('developer.projects.items.0.category')}</div>
                  <h3>{t('developer.projects.items.0.title')}</h3>
                  <p>{t('developer.projects.items.0.desc')}</p>
                  <div className="stack">
                    <span>
                      <Layout size={14} />
                      React.js
                    </span>
                    <span>
                      <Server size={14} />
                      Node.js
                    </span>
                    <span>
                      <Zap size={14} />
                      LiveKit
                    </span>
                    <span>
                      <Database size={14} />
                      Convex
                    </span>
                    <span>
                      <MonitorSmartphone size={14} />
                      Tailwind CSS
                    </span>
                  </div>
                  <div className="actions">
                    <a href="#" className="btn-primary">
                      {t('developer.projects.items.0.cta')} <ArrowRight size={16} />
                    </a>
                    <a href="#" className="btn-secondary">
                      <Github size={16} />
                      Code source
                    </a>
                  </div>
                </ProjectInfo>
              </FeatureProject>

              <FeatureProject $reverse data-reveal style={{ '--reveal-delay': '60ms' }}>
                <ProjectVisual $reverse>
                  <BrowserFrame>
                    <div className="browser-header">
                      <div className="dot red" />
                      <div className="dot yellow" />
                      <div className="dot green" />
                      <div className="url">dashboard.financeflow.io</div>
                    </div>
                    <div className="img-wrapper">
                      <img
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                        alt="Finance Dashboard"
                      />
                      <div className="overlay">
                        <span>
                          <Play size={18} /> {t('developer.livePreview')}
                        </span>
                      </div>
                    </div>
                  </BrowserFrame>
                </ProjectVisual>
                <ProjectInfo>
                  <div className="proj-badge">{t('developer.projects.items.1.category')}</div>
                  <h3>{t('developer.projects.items.1.title')}</h3>
                  <p>{t('developer.projects.items.1.desc')}</p>
                  <div className="stack">
                    <span>
                      <Layout size={14} />
                      Next.js
                    </span>
                    <span>
                      <Code2 size={14} />
                      TypeScript
                    </span>
                    <span>
                      <Database size={14} />
                      PostgreSQL
                    </span>
                    <span>
                      <Database size={14} />
                      Prisma ORM
                    </span>
                    <span>
                      <Layout size={14} />
                      Recharts
                    </span>
                  </div>
                  <div className="actions">
                    <a href="#" className="btn-primary">
                      {t('developer.projects.items.1.cta')} <ArrowRight size={16} />
                    </a>
                    <a href="#" className="btn-secondary">
                      <Github size={16} />
                      Architecture
                    </a>
                  </div>
                </ProjectInfo>
              </FeatureProject>

              <FeatureProject data-reveal style={{ '--reveal-delay': '60ms' }}>
                <ProjectVisual>
                  <BrowserFrame>
                    <div className="browser-header">
                      <div className="dot red" />
                      <div className="dot yellow" />
                      <div className="dot green" />
                      <div className="url">studio.nexusai.dev</div>
                    </div>
                    <div className="img-wrapper">
                      <img
                        src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                        alt="AI Builder"
                      />
                      <div className="overlay">
                        <span>
                          <Play size={18} /> {t('developer.livePreview')}
                        </span>
                      </div>
                    </div>
                  </BrowserFrame>
                </ProjectVisual>
                <ProjectInfo>
                  <div className="proj-badge">{t('developer.projects.items.2.category')}</div>
                  <h3>{t('developer.projects.items.2.title')}</h3>
                  <p>{t('developer.projects.items.2.desc')}</p>
                  <div className="stack">
                    <span>
                      <Layout size={14} />
                      React.js
                    </span>
                    <span>
                      <Zap size={14} />
                      OpenAI API
                    </span>
                    <span>
                      <Server size={14} />
                      Express
                    </span>
                    <span>
                      <Wrench size={14} />
                      Vite
                    </span>
                    <span>
                      <Code2 size={14} />
                      AI Engineering
                    </span>
                  </div>
                  <div className="actions">
                    <a href="#" className="btn-primary">
                      {t('developer.projects.items.2.cta')} <ArrowRight size={16} />
                    </a>
                    <a href="#" className="btn-secondary">
                      <Github size={16} />
                      Repository
                    </a>
                  </div>
                </ProjectInfo>
              </FeatureProject>
            </ProjectsList>
          </SectionInner>
        </SectionAlt>

        {/* ── Process ── */}
        <Section>
          <SectionHeader>
            <SectionEyebrow data-reveal>
              <Compass size={13} />
              &nbsp;Méthode
            </SectionEyebrow>
            <SectionTitle data-reveal style={{ '--reveal-delay': '80ms' }}>
              Comment je travaille
            </SectionTitle>
            <SectionSub data-reveal style={{ '--reveal-delay': '140ms' }}>
              Un processus éprouvé en 5 étapes pour transformer votre idée en produit fini, livré
              dans les délais et sans surprise.
            </SectionSub>
          </SectionHeader>
          <ProcessOuter>
            <ProcessLine />
            <ProcessGrid>
              {[
                {
                  num: '01',
                  label: 'Découverte',
                  desc: 'Analyse des besoins, objectifs, contraintes techniques et rédaction du cahier des charges.',
                  hi: true,
                },
                {
                  num: '02',
                  label: 'Design',
                  desc: 'Maquettes Figma, wireframes, design system et validation visuelle avant tout code.',
                  hi: false,
                },
                {
                  num: '03',
                  label: 'Développement',
                  desc: 'Code propre, composants réutilisables, commits Git réguliers et revues de code.',
                  hi: true,
                },
                {
                  num: '04',
                  label: 'Tests & QA',
                  desc: 'Tests unitaires, cross-browser, optimisation Lighthouse, sécurité et corrections.',
                  hi: false,
                },
                {
                  num: '05',
                  label: 'Livraison',
                  desc: 'Déploiement CI/CD, documentation technique, formation et support post-lancement.',
                  hi: true,
                },
              ].map(({ num, label, desc, hi }, i) => (
                <ProcessItem key={num} data-reveal style={{ '--reveal-delay': `${i * 80}ms` }}>
                  <StepNum $hi={hi}>{num}</StepNum>
                  <StepLabel>{label}</StepLabel>
                  <StepDesc>{desc}</StepDesc>
                </ProcessItem>
              ))}
            </ProcessGrid>
          </ProcessOuter>
        </Section>

        {/* ── Philosophy ── */}
        <Section>
          <PhiloCard data-reveal>
            <PhiloContent>
              <h3>{t('developer.philosophy.title')}</h3>
              <p>{t('developer.philosophy.desc')}</p>
              <PhiloPrinciples>
                {[
                  {
                    icon: <Star size={20} />,
                    title: t('developer.philosophy.principles.0.title'),
                    desc: t('developer.philosophy.principles.0.desc'),
                  },
                  {
                    icon: <Zap size={20} />,
                    title: t('developer.philosophy.principles.1.title'),
                    desc: t('developer.philosophy.principles.1.desc'),
                  },
                  {
                    icon: <Heart size={20} />,
                    title: t('developer.philosophy.principles.2.title'),
                    desc: t('developer.philosophy.principles.2.desc'),
                  },
                ].map(({ icon, title, desc }) => (
                  <Principle key={title}>
                    <div className="icon-box">{icon}</div>
                    <div className="txt">
                      <strong>{title}</strong>
                      <span>{desc}</span>
                    </div>
                  </Principle>
                ))}
              </PhiloPrinciples>
            </PhiloContent>
            <PhiloVisual>
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Code setup"
              />
              <div className="badge">
                <strong>100%</strong>
                <span>Apprentissage Continu</span>
              </div>
            </PhiloVisual>
          </PhiloCard>
        </Section>

        {/* ── CTA ── */}
        <CtaSection>
          <CtaInner>
            <CtaAvail data-reveal>
              <div className="dot" />
              Disponible pour de nouveaux projets
            </CtaAvail>
            <CtaTitle data-reveal style={{ '--reveal-delay': '60ms' }}>
              Prêt à donner vie
              <br />à votre projet&nbsp;?
            </CtaTitle>
            <CtaSub data-reveal style={{ '--reveal-delay': '120ms' }}>
              Que vous ayez besoin d'un site vitrine, d'une application web complexe, d'une API
              robuste ou simplement d'un conseil technique, je suis là pour vous accompagner de A à
              Z.
            </CtaSub>
            <CtaActions data-reveal style={{ '--reveal-delay': '180ms' }}>
              <CtaBtnPrimary href={`mailto:${businessContactAddress}`}>
                <Rocket size={18} />
                Démarrer un projet
              </CtaBtnPrimary>
              <CtaBtnSecondary href="#">
                <FileText size={18} />
                Télécharger le CV
              </CtaBtnSecondary>
            </CtaActions>
            <CtaEmail data-reveal style={{ '--reveal-delay': '240ms' }}>
              Réponse sous 24h&nbsp;·&nbsp;<span>{businessContactAddress}</span>
            </CtaEmail>
          </CtaInner>
        </CtaSection>

        {/* ── Stats ── */}
        <StatsWrap>
          <StatsGrid data-reveal>
            {[
              {
                icon: <GraduationCap size={28} />,
                val: t('developer.stats.0.value'),
                lbl: t('developer.stats.0.label'),
              },
              {
                icon: <Code2 size={28} />,
                val: t('developer.stats.1.value'),
                lbl: t('developer.stats.1.label'),
              },
              {
                icon: <Briefcase size={28} />,
                val: t('developer.stats.2.value'),
                lbl: t('developer.stats.2.label'),
              },
              {
                icon: <Coffee size={28} />,
                val: t('developer.stats.3.value'),
                lbl: t('developer.stats.3.label'),
              },
            ].map(({ icon, val, lbl }) => (
              <StatItem key={lbl}>
                <div className="icon-wrap">{icon}</div>
                <div className="val">{val}</div>
                <div className="lbl">{lbl}</div>
              </StatItem>
            ))}
          </StatsGrid>
        </StatsWrap>
      </Main>
      <FooterClean />
    </Page>
  );
}
