import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import {
  Sparkles, Users, CheckCircle2, ArrowLeft, Send, Loader2, AlertCircle,
  Bug, Zap, Rocket, Shield, Clock, Star, MessageCircle,
  Heart, Target, FileText, ArrowRight, Activity, Code2, Cpu, Layers,
} from 'lucide-react';
import { useSafeLayout } from '../hooks/useSafeLayout';

/* ═══════════════════════════════════════════════════════════════
   PALETTE — bleu / blanc uniquement, zéro dégradé
═══════════════════════════════════════════════════════════════ */
const C = {
  primary:     '#2563eb',
  primaryDark: '#1d4ed8',
  navy:        '#0f172a',
  navyMid:     '#1e293b',
  text:        '#374151',
  muted:       '#6b7280',
  border:      '#e5e7eb',
  card:        '#ffffff',
  softBlue:    '#eff6ff',
  blueTint:    '#dbeafe',
  bg:          '#f8fbff',
  success:     '#16a34a',
  successBg:   '#f0fdf4',
  successBdr:  '#bbf7d0',
};

/* ═══════════════════════════════════════════════════════════════
   KEYFRAMES
═══════════════════════════════════════════════════════════════ */
const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0);    }
`;
const pulseDot = keyframes`
  0%,100% { transform: scale(1);   opacity: 1; }
  50%      { transform: scale(1.4); opacity: .5; }
`;
const barReveal = keyframes`
  from { width: 0; }
`;
const checkPop = keyframes`
  0%   { transform: scale(0) rotate(-30deg); opacity: 0; }
  65%  { transform: scale(1.15) rotate(3deg); }
  100% { transform: scale(1) rotate(0deg);    opacity: 1; }
`;
const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

/* ═══════════════════════════════════════════════════════════════
   SCROLL-REVEAL (via data-reveal attribute)
═══════════════════════════════════════════════════════════════ */
const revealCss = css`
  opacity: 0;
  transform: translateY(22px);
  transition: opacity .6s ease, transform .6s cubic-bezier(.22,1,.36,1);
  transition-delay: var(--d, 0ms);
  will-change: opacity, transform;
  &.visible { opacity: 1; transform: translateY(0); }
  @media (prefers-reduced-motion: reduce) { opacity: 1; transform: none; transition: none; }
`;

/* ═══════════════════════════════════════════════════════════════
   PAGE SHELL
═══════════════════════════════════════════════════════════════ */
const Page = styled.div`
  min-height: 100vh;
  background: ${C.bg};
  color: ${C.navy};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow-x: hidden;
`;
/* Dot pattern — texture, pas un dégradé visuel */
const DotPattern = styled.div`
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background-image: radial-gradient(circle, #cbd5e1 1px, transparent 1px);
  background-size: 26px 26px;
  opacity: .38;
`;

/* ═══════════════════════════════════════════════════════════════
   NAV
═══════════════════════════════════════════════════════════════ */
const Nav = styled.nav`
  position: sticky; top: 0; z-index: 100;
  background: rgba(255,255,255,.97);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid ${C.border};
  box-shadow: 0 1px 0 ${C.border};
`;
const NavInner = styled.div`
  max-width: 1240px; margin: 0 auto; padding: .85rem 1.75rem;
  display: flex; align-items: center; justify-content: space-between;
`;
const NavLeft = styled.div`display: flex; align-items: center; gap: 1.25rem;`;
const NavLogo = styled.button`
  background: none; border: none; cursor: pointer; padding: 0;
  display: flex; align-items: center; gap: .55rem;
  font-weight: 800; font-size: 1rem; color: ${C.navy};
  letter-spacing: -.025em;
  .dot { width: 8px; height: 8px; border-radius: 50%; background: ${C.primary}; }
  &:hover .txt { color: ${C.primary}; }
  .txt { transition: color .2s; }
`;
const NavCrumb = styled.div`
  display: flex; align-items: center; gap: .35rem;
  font-size: .78rem; color: ${C.muted};
  .sep { color: ${C.border}; }
  .cur { color: ${C.primary}; font-weight: 600; }
`;
const NavRight = styled.div`display: flex; align-items: center; gap: .75rem;`;
const NavPill = styled.div`
  display: inline-flex; align-items: center; gap: .35rem;
  padding: .3rem .7rem; border-radius: 999px;
  background: ${C.softBlue}; border: 1px solid ${C.blueTint};
  color: ${C.primary}; font-size: .73rem; font-weight: 700;
`;
const NavBtn = styled.button`
  display: inline-flex; align-items: center; gap: .45rem;
  padding: .58rem 1.15rem; border-radius: 10px; border: none;
  background: ${C.primary}; color: #fff;
  font-weight: 700; font-size: .85rem; cursor: pointer;
  box-shadow: 0 4px 12px rgba(37,99,235,.28);
  transition: background .18s, transform .15s, box-shadow .18s;
  &:hover { background: ${C.primaryDark}; transform: translateY(-1px); box-shadow: 0 7px 18px rgba(37,99,235,.38); }
`;

/* ═══════════════════════════════════════════════════════════════
   HERO — 2 colonnes
═══════════════════════════════════════════════════════════════ */
const HeroSection = styled.section`
  background: #fff;
  border-bottom: 1px solid ${C.border};
  padding: 5rem 1.75rem 4.5rem;
  position: relative; z-index: 1;
`;
const HeroGrid = styled.div`
  max-width: 1240px; margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(320px, .85fr);
  gap: 4.5rem; align-items: center;
  @media(max-width: 920px) { grid-template-columns: 1fr; gap: 2.5rem; }
`;
const HeroLeft = styled.div`animation: ${slideUp} .7s cubic-bezier(.22,1,.36,1) both;`;
const Eyebrow = styled.div`
  display: inline-flex; align-items: center; gap: .45rem;
  padding: .38rem .85rem; border-radius: 999px;
  background: ${C.softBlue}; border: 1px solid ${C.blueTint};
  color: ${C.primary}; font-weight: 700; font-size: .78rem;
  margin-bottom: 1.35rem; letter-spacing: .03em;
  .live { width: 6px; height: 6px; border-radius: 50%; background: ${C.primary}; animation: ${pulseDot} 1.8s ease infinite; }
`;
const HeroTitle = styled.h1`
  font-size: clamp(2.4rem, 4.5vw, 3.9rem);
  font-weight: 800; letter-spacing: -.045em; line-height: 1.07;
  color: ${C.navy}; margin: 0 0 1.15rem;
  /* Zéro dégradé — couleur solide */
  strong { color: ${C.primary}; }
`;
const HeroSub = styled.p`
  font-size: 1.1rem; color: ${C.muted}; line-height: 1.78;
  margin: 0 0 2.25rem; max-width: 530px;
`;
const HeroActions = styled.div`display: flex; gap: 1rem; flex-wrap: wrap;`;
const BtnPrimary = styled.button`
  display: inline-flex; align-items: center; gap: .55rem;
  padding: .88rem 1.6rem; border-radius: 12px; border: none;
  background: ${C.primary}; color: #fff;
  font-weight: 700; font-size: .95rem; cursor: pointer;
  box-shadow: 0 8px 22px -4px rgba(37,99,235,.38);
  transition: background .18s, transform .15s, box-shadow .18s;
  &:hover { background: ${C.primaryDark}; transform: translateY(-2px); box-shadow: 0 14px 30px -4px rgba(37,99,235,.46); }
`;
const BtnOutline = styled.button`
  display: inline-flex; align-items: center; gap: .55rem;
  padding: .88rem 1.5rem; border-radius: 12px;
  border: 1.5px solid ${C.border}; background: #fff; color: ${C.navy};
  font-weight: 700; font-size: .95rem; cursor: pointer;
  transition: border-color .18s, color .18s, transform .15s;
  &:hover { border-color: ${C.primary}; color: ${C.primary}; transform: translateY(-2px); }
`;

/* Hero panel droit — rapport bêta style dashboard */
const HeroPanel = styled.div`
  background: #fff;
  border: 1px solid ${C.border};
  border-top: 3px solid ${C.primary};
  border-radius: 18px; padding: 1.6rem;
  box-shadow: 0 24px 56px rgba(15,23,42,.09);
  animation: ${slideUp} .8s .12s cubic-bezier(.22,1,.36,1) both;
  @media(max-width: 920px) { display: none; }
`;
const PanelHead = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 1.25rem; padding-bottom: .9rem;
  border-bottom: 1px solid ${C.border};
`;
const PanelTitle = styled.div`font-size: .82rem; font-weight: 800; color: ${C.navy}; letter-spacing: -.01em;`;
const StatusBadgeGreen = styled.div`
  display: inline-flex; align-items: center; gap: .35rem;
  font-size: .72rem; font-weight: 700; color: ${C.success};
  &::before { content: ''; display: block; width: 6px; height: 6px; border-radius: 50%; background: ${C.success}; animation: ${pulseDot} 2s ease infinite; }
`;
const BarSection = styled.div`margin-bottom: 1.35rem;`;
const BarRow = styled.div`margin-bottom: .65rem;`;
const BarLabel = styled.div`
  display: flex; justify-content: space-between;
  margin-bottom: .3rem;
  .lbl { font-size: .76rem; color: ${C.muted}; }
  .val { font-size: .76rem; font-weight: 700; color: ${C.navy}; }
`;
const BarTrack = styled.div`
  height: 5px; background: ${C.softBlue}; border-radius: 99px; overflow: hidden;
`;
const BarFill = styled.div`
  height: 100%; border-radius: 99px;
  background: ${C.primary};
  width: ${p => p.$pct}%;
  animation: ${barReveal} 1.1s ${p => p.$delay || 0}s cubic-bezier(.22,1,.36,1) both;
`;
const MiniGrid = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: .6rem;`;
const MiniCard = styled.div`
  background: ${C.softBlue}; border: 1px solid ${C.blueTint};
  border-radius: 10px; padding: .8rem;
  .n { font-size: 1.3rem; font-weight: 900; color: ${C.primary}; line-height: 1; }
  .l { font-size: .7rem; color: ${C.muted}; margin-top: 2px; }
`;

/* ═══════════════════════════════════════════════════════════════
   STATS BAND — fond navy pour contraste fort
═══════════════════════════════════════════════════════════════ */
const StatsBand = styled.section`
  background: ${C.navy};
  position: relative; z-index: 1;
`;
const StatsBandInner = styled.div`
  max-width: 1240px; margin: 0 auto;
  display: grid; grid-template-columns: repeat(4, 1fr);
  @media(max-width: 640px) { grid-template-columns: repeat(2,1fr); }
`;
const StatCell = styled.div`
  padding: 2.25rem 1.5rem; text-align: center;
  border-right: 1px solid rgba(255,255,255,.07);
  &:last-child { border-right: none; }
  @media(max-width:640px) {
    &:nth-child(2) { border-right: none; }
    &:nth-child(3) { border-right: 1px solid rgba(255,255,255,.07); }
  }
`;
const StatBig = styled.div`
  font-size: clamp(2rem,3.5vw,2.9rem); font-weight: 900;
  color: #fff; letter-spacing: -.04em; line-height: 1; margin-bottom: .35rem;
  em { color: ${C.primary}; font-style: normal; font-size: .65em; }
`;
const StatSmall = styled.div`font-size: .78rem; color: rgba(255,255,255,.45); font-weight: 500;`;

/* ═══════════════════════════════════════════════════════════════
   SECTION HELPERS
═══════════════════════════════════════════════════════════════ */
const SectionWhite = styled.section`
  background: #fff;
  border-bottom: 1px solid ${C.border};
  padding: 5rem 1.75rem;
  position: relative; z-index: 1;
`;
const SectionBlue = styled.section`
  background: ${C.softBlue};
  border-top: 1px solid ${C.blueTint};
  border-bottom: 1px solid ${C.blueTint};
  padding: 5rem 1.75rem;
  position: relative; z-index: 1;
`;
const Inner = styled.div`max-width: 1240px; margin: 0 auto;`;

const SectionTag = styled.div.attrs(() => ({ 'data-reveal': 'true' }))`
  ${revealCss}
  display: inline-flex; align-items: center; gap: .4rem;
  background: ${C.softBlue}; border: 1px solid ${C.blueTint};
  color: ${C.primary}; font-size: .75rem; font-weight: 700;
  padding: .3rem .7rem; border-radius: 999px;
  margin-bottom: .7rem; text-transform: uppercase; letter-spacing: .07em;
`;
const SectionTitle = styled.h2.attrs(() => ({ 'data-reveal': 'true' }))`
  ${revealCss}
  font-size: clamp(1.65rem, 3vw, 2.45rem);
  font-weight: 800; letter-spacing: -.035em; color: ${C.navy};
  margin: 0 0 .6rem; line-height: 1.18;
`;
const SectionSub = styled.p.attrs(() => ({ 'data-reveal': 'true' }))`
  ${revealCss}
  font-size: .98rem; color: ${C.muted}; line-height: 1.75;
  max-width: 560px; margin: 0 0 2.75rem;
`;

/* ═══════════════════════════════════════════════════════════════
   BENTO GRID — bilan section
═══════════════════════════════════════════════════════════════ */
const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  gap: 1rem;
  @media(max-width: 768px) { grid-template-columns: 1fr; }
`;
const BentoBase = styled.div.attrs(() => ({ 'data-reveal': 'true' }))`
  ${revealCss}
  background: #fff;
  border: 1px solid ${C.border};
  border-radius: 18px;
  padding: 1.85rem;
  box-shadow: 0 2px 8px rgba(15,23,42,.04);
  transition: transform .22s, box-shadow .22s, border-color .22s;
  &:hover { transform: translateY(-3px); box-shadow: 0 16px 36px rgba(15,23,42,.09); border-color: ${C.blueTint}; }
`;
const BentoWide = styled(BentoBase)`
  grid-column: span 2;
  border-left: 4px solid ${C.primary};
  display: flex; gap: 2rem; align-items: flex-start;
  @media(max-width: 768px) { grid-column: span 1; flex-direction: column; gap: 1.25rem; }
`;
const BentoIconBox = styled.div`
  width: 50px; height: 50px; border-radius: 14px;
  background: ${C.softBlue}; border: 1px solid ${C.blueTint};
  display: flex; align-items: center; justify-content: center;
  color: ${C.primary}; flex-shrink: 0;
`;
const BentoNum = styled.div`
  font-size: 2.9rem; font-weight: 900; color: ${C.primary};
  letter-spacing: -.05em; line-height: 1; margin-bottom: .3rem;
`;
const BentoTitle = styled.div`font-size: .95rem; font-weight: 700; color: ${C.navy}; margin-bottom: .4rem;`;
const BentoDesc = styled.div`font-size: .83rem; color: ${C.muted}; line-height: 1.65;`;
/* Mini barre CSS pure — remplace les SVG */
const MiniBars = styled.div`
  display: flex; align-items: flex-end; gap: 3px;
  height: 30px; margin-top: 1rem;
`;
const MiniBar = styled.div`
  flex: 1; border-radius: 3px 3px 0 0;
  background: ${p => p.$hi ? C.primary : C.blueTint};
  height: ${p => p.$h}%;
`;

/* ═══════════════════════════════════════════════════════════════
   CHANGEMENTS — cartes à bordure gauche colorée
═══════════════════════════════════════════════════════════════ */
const ChangesGrid = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: .85rem;
  @media(max-width: 700px) { grid-template-columns: 1fr; }
`;
const ChangeCard = styled.div.attrs(() => ({ 'data-reveal': 'true' }))`
  ${revealCss}
  background: #fff;
  border: 1px solid ${C.border};
  border-left: 4px solid ${p => p.$accent || C.primary};
  border-radius: 0 14px 14px 0;
  padding: 1.2rem 1.3rem;
  display: flex; gap: .95rem; align-items: flex-start;
  transition: box-shadow .2s, transform .18s;
  &:hover { box-shadow: 0 8px 22px rgba(15,23,42,.08); transform: translateX(3px); }
`;
const ChangeIcon = styled.div`
  width: 36px; height: 36px; border-radius: 9px;
  background: ${p => p.$bg || C.softBlue};
  display: flex; align-items: center; justify-content: center;
  color: ${p => p.$color || C.primary}; flex-shrink: 0;
`;
const ChangeBody = styled.div`flex: 1;`;
const ChangeTitleRow = styled.div`display: flex; align-items: center; gap: .5rem; margin-bottom: .25rem;`;
const ChangeTitle = styled.div`font-size: .88rem; font-weight: 700; color: ${C.navy};`;
const Tag = styled.span`
  font-size: .67rem; font-weight: 800; padding: .15rem .5rem;
  border-radius: 999px; white-space: nowrap;
  background: ${p => p.$bg}; color: ${p => p.$color}; border: 1px solid ${p => p.$bdr};
`;
const ChangeDesc = styled.div`font-size: .8rem; color: ${C.muted}; line-height: 1.58;`;

/* ═══════════════════════════════════════════════════════════════
   VAGUE 2 FEATURES — 2×2
═══════════════════════════════════════════════════════════════ */
const FeatGrid = styled.div`
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem;
  @media(max-width: 680px) { grid-template-columns: 1fr; }
`;
const FeatCard = styled.div.attrs(() => ({ 'data-reveal': 'true' }))`
  ${revealCss}
  background: #fff; border: 1px solid ${C.border};
  border-top: 3px solid ${C.primary};
  border-radius: 0 0 18px 18px; padding: 2rem 1.75rem;
  display: flex; flex-direction: column; gap: 1rem;
  transition: transform .22s, box-shadow .22s;
  &:hover { transform: translateY(-4px); box-shadow: 0 18px 44px rgba(15,23,42,.09); }
`;
const FeatIconWrap = styled.div`
  width: 52px; height: 52px; border-radius: 14px;
  background: ${C.softBlue}; border: 1px solid ${C.blueTint};
  display: flex; align-items: center; justify-content: center; color: ${C.primary};
`;
const FeatTagLine = styled.div`
  display: inline-flex; align-items: center; gap: .35rem;
  font-size: .72rem; font-weight: 700; color: ${C.primary};
  background: ${C.softBlue}; border: 1px solid ${C.blueTint};
  padding: .2rem .6rem; border-radius: 999px; width: fit-content;
`;
const FeatTitle = styled.div`font-size: 1.02rem; font-weight: 700; color: ${C.navy};`;
const FeatDesc = styled.div`font-size: .84rem; color: ${C.muted}; line-height: 1.68;`;
const FeatDots = styled.ul`
  list-style: none; margin: 0; padding: 0;
  display: flex; flex-direction: column; gap: .4rem;
`;
const FeatDot = styled.li`
  display: flex; align-items: center; gap: .55rem;
  font-size: .81rem; color: ${C.text};
  &::before { content: ''; display: block; width: 6px; height: 6px; border-radius: 50%; background: ${C.primary}; flex-shrink: 0; }
`;

/* ═══════════════════════════════════════════════════════════════
   QUOTES — masonry offset
═══════════════════════════════════════════════════════════════ */
const QuotesGrid = styled.div`
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem;
  @media(max-width: 720px) { grid-template-columns: 1fr; }
`;
const QuoteCard = styled.div.attrs(() => ({ 'data-reveal': 'true' }))`
  ${revealCss}
  background: #fff; border: 1px solid ${C.border};
  border-radius: 18px; padding: 1.75rem;
  margin-top: ${p => p.$mt || 0}px;
  box-shadow: 0 4px 16px rgba(15,23,42,.05);
  transition: transform .22s, box-shadow .22s;
  &:hover { transform: translateY(-4px); box-shadow: 0 14px 36px rgba(15,23,42,.1); }
`;
const QuoteMark = styled.div`
  font-size: 2.8rem; color: ${C.blueTint}; font-family: Georgia, serif;
  line-height: 1; margin-bottom: .4rem; user-select: none;
`;
const QuoteText = styled.p`
  font-size: .9rem; color: ${C.text}; line-height: 1.72;
  font-style: italic; margin: 0 0 1.25rem;
`;
const QuoteAuthor = styled.div`display: flex; align-items: center; gap: .65rem;`;
const QuoteAvatar = styled.div`
  width: 38px; height: 38px; border-radius: 50%;
  background: ${C.softBlue}; border: 2px solid ${C.blueTint};
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: .84rem; color: ${C.primary}; flex-shrink: 0;
`;
const QuoteName = styled.div`font-size: .82rem; font-weight: 700; color: ${C.navy};`;
const QuoteRole = styled.div`font-size: .74rem; color: ${C.muted};`;
const QuoteStars = styled.div`
  display: flex; gap: 2px; margin-bottom: .8rem;
  svg { color: #f59e0b; fill: #f59e0b; }
`;

/* ═══════════════════════════════════════════════════════════════
   CRITÈRES — numérotés
═══════════════════════════════════════════════════════════════ */
const CriteriaList = styled.div`display: flex; flex-direction: column; gap: 1rem;`;
const CriteriaItem = styled.div.attrs(() => ({ 'data-reveal': 'true' }))`
  ${revealCss}
  background: #fff; border: 1px solid ${C.border};
  border-radius: 16px; padding: 1.75rem 1.75rem;
  display: flex; gap: 1.5rem; align-items: flex-start;
  transition: border-color .2s, box-shadow .18s, transform .18s;
  &:hover { border-color: ${C.blueTint}; box-shadow: 0 8px 26px rgba(15,23,42,.07); transform: translateX(4px); }
`;
const CriteriaNum = styled.div`
  width: 48px; height: 48px; border-radius: 13px;
  background: ${C.primary}; color: #fff;
  font-size: 1.05rem; font-weight: 900; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
`;
const CriteriaBody = styled.div`flex: 1;`;
const CriteriaTitle = styled.div`font-size: 1.05rem; font-weight: 700; color: ${C.navy}; margin-bottom: .4rem;`;
const CriteriaDesc = styled.div`font-size: .87rem; color: ${C.muted}; line-height: 1.68;`;

/* ═══════════════════════════════════════════════════════════════
   FORM SECTION
═══════════════════════════════════════════════════════════════ */
const FormOuter = styled.section`
  background: ${C.navy};
  padding: 5rem 1.75rem;
  position: relative; z-index: 1;
`;
const FormCard = styled.div`
  max-width: 840px; margin: 0 auto;
  background: #fff; border: 1px solid ${C.border};
  border-radius: 22px;
  box-shadow: 0 40px 100px rgba(0,0,0,.2);
  overflow: hidden;
`;
const FormTop = styled.div`
  background: ${C.softBlue};
  border-bottom: 1px solid ${C.blueTint};
  padding: 2rem 2.5rem 1.75rem;
  display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem;
  @media(max-width: 600px) { flex-direction: column; }
`;
const FormTopLeft = styled.div``;
const FormTopTitle = styled.h2`font-size: 1.35rem; font-weight: 800; color: ${C.navy}; margin: 0 0 .3rem; letter-spacing: -.025em;`;
const FormTopSub = styled.p`font-size: .85rem; color: ${C.muted}; margin: 0;`;
const SlotsBadge = styled.div`
  display: inline-flex; align-items: center; gap: .4rem;
  background: #fff; border: 1px solid ${C.border};
  border-radius: 10px; padding: .55rem .9rem;
  font-size: .78rem; font-weight: 700; color: ${C.navy};
  white-space: nowrap; flex-shrink: 0;
  span { color: ${C.primary}; }
`;
const FormBody = styled.div`padding: 2rem 2.5rem 2.5rem;`;
const FieldRow = styled.div`
  display: grid; grid-template-columns: ${p => p.$cols || '1fr'}; gap: 1rem;
  margin-bottom: 1.2rem;
  @media(max-width: 560px) { grid-template-columns: 1fr; }
`;
const FieldGroup = styled.div`display: flex; flex-direction: column; gap: .4rem;`;
const Lbl = styled.label`font-size: .8rem; font-weight: 700; color: ${C.navyMid};`;
const Req = styled.span`color: ${C.primary}; margin-left: 2px;`;
const Inp = styled.input`
  width: 100%; padding: .75rem 1rem; box-sizing: border-box;
  border: 1.5px solid ${p => p.$err ? '#ef4444' : C.border};
  border-radius: 10px; background: #fff; color: ${C.navy};
  font-size: .9rem; font-family: inherit;
  transition: border-color .18s, box-shadow .18s; outline: none;
  &:focus { border-color: ${C.primary}; box-shadow: 0 0 0 3px rgba(37,99,235,.12); }
  &::placeholder { color: ${C.muted}; }
`;
const Sel = styled.select`
  width: 100%; padding: .75rem 1rem; box-sizing: border-box;
  border: 1.5px solid ${p => p.$err ? '#ef4444' : C.border};
  border-radius: 10px; background: #fff; color: ${C.navy};
  font-size: .9rem; font-family: inherit; cursor: pointer; appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right .9rem center;
  transition: border-color .18s, box-shadow .18s; outline: none;
  &:focus { border-color: ${C.primary}; box-shadow: 0 0 0 3px rgba(37,99,235,.12); }
`;
const Txt = styled.textarea`
  width: 100%; padding: .82rem 1rem; box-sizing: border-box;
  border: 1.5px solid ${p => p.$err ? '#ef4444' : C.border};
  border-radius: 10px; background: #fff; color: ${C.navy};
  font-size: .9rem; font-family: inherit; resize: vertical; min-height: 115px;
  transition: border-color .18s, box-shadow .18s; outline: none;
  &:focus { border-color: ${C.primary}; box-shadow: 0 0 0 3px rgba(37,99,235,.12); }
  &::placeholder { color: ${C.muted}; }
`;
const FieldHint = styled.div`font-size: .74rem; color: ${p => p.$err ? '#ef4444' : C.muted};`;
const CharCount = styled.div`font-size: .74rem; color: ${p => p.$ok ? C.success : C.muted}; text-align: right;`;
const ChipsRow = styled.div`display: flex; flex-wrap: wrap; gap: .5rem;`;
const Chip = styled.button`
  padding: .42rem .88rem; border-radius: 8px; cursor: pointer;
  font-size: .81rem; font-weight: 600; border: 1.5px solid;
  transition: background .14s, border-color .14s, color .14s, transform .1s;
  background: ${p => p.$on ? C.primary : '#fff'};
  border-color: ${p => p.$on ? C.primary : C.border};
  color: ${p => p.$on ? '#fff' : C.text};
  &:hover { border-color: ${C.primary}; transform: translateY(-1px); }
`;
const Divider = styled.hr`border: none; border-top: 1px solid ${C.border}; margin: 1.5rem 0;`;
const SubmitRow = styled.div`display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;`;
const SubmitNote = styled.div`font-size: .77rem; color: ${C.muted}; display: flex; align-items: center; gap: .4rem;`;
const SubmitBtn = styled.button`
  display: inline-flex; align-items: center; gap: .6rem;
  padding: .92rem 2rem; border-radius: 12px; border: none;
  background: ${C.primary}; color: #fff; font-weight: 700; font-size: .95rem; cursor: pointer;
  box-shadow: 0 8px 22px -4px rgba(37,99,235,.38);
  transition: background .18s, transform .15s, box-shadow .18s;
  &:hover:not(:disabled) { background: ${C.primaryDark}; transform: translateY(-2px); box-shadow: 0 14px 30px -4px rgba(37,99,235,.46); }
  &:disabled { opacity: .62; cursor: not-allowed; }
`;
const SpinIcon = styled(Loader2)`animation: ${spin} 1s linear infinite;`;
const ErrBox = styled.div`
  display: flex; align-items: center; gap: .55rem;
  background: #fef2f2; border: 1px solid #fecaca; border-radius: 10px;
  padding: .75rem 1rem; margin-bottom: 1rem;
  font-size: .84rem; color: #dc2626; font-weight: 500;
`;

/* Success */
const SuccessWrap = styled.div`
  padding: 4rem 2.5rem; text-align: center;
  display: flex; flex-direction: column; align-items: center; gap: 1rem;
`;
const SuccessCircle = styled.div`
  width: 70px; height: 70px; border-radius: 50%;
  background: ${C.successBg}; border: 2px solid ${C.successBdr};
  display: flex; align-items: center; justify-content: center; color: ${C.success};
  animation: ${checkPop} .5s cubic-bezier(.22,1,.36,1) both;
`;
const SuccessTitle = styled.h3`font-size: 1.4rem; font-weight: 800; color: ${C.navy}; margin: 0;`;
const SuccessText = styled.p`font-size: .94rem; color: ${C.muted}; margin: 0; line-height: 1.65;`;

/* ═══════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════ */
const FooterBar = styled.footer`background: ${C.navyMid}; padding: 1.75rem; position: relative; z-index: 1;`;
const FooterInner = styled.div`
  max-width: 1240px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;
`;
const FooterLogo = styled.div`
  display: flex; align-items: center; gap: .5rem;
  font-weight: 800; font-size: .95rem; color: #fff;
  .dot { width: 7px; height: 7px; border-radius: 50%; background: ${C.primary}; }
`;
const FooterLinks = styled.div`display: flex; gap: 1.5rem;`;
const FooterLink = styled.button`
  background: none; border: none; cursor: pointer; font-family: inherit;
  font-size: .8rem; color: rgba(255,255,255,.45);
  transition: color .18s;
  &:hover { color: #fff; }
`;
const FooterCopy = styled.div`font-size: .76rem; color: rgba(255,255,255,.25);`;

/* ═══════════════════════════════════════════════════════════════
   DONNÉES STATIQUES
═══════════════════════════════════════════════════════════════ */
const TOOLS = ['Figma', 'Notion', 'Slack', 'Jira', 'GitHub', 'Linear', 'Discord', 'VS Code', 'Miro', 'Loom'];

const CHANGES = [
  {
    accent: '#2563eb', iconBg: C.softBlue, iconColor: '#2563eb',
    icon: <Shield size={15} />,
    title: 'Auth Clerk Core 3 migrée',
    tag: { label: 'Livré', bg: '#eff6ff', color: '#2563eb', bdr: '#dbeafe' },
    desc: 'Migration complète vers le nouveau SDK — plus stable, 0 régression signalée depuis le déploiement.',
  },
  {
    accent: '#16a34a', iconBg: '#f0fdf4', iconColor: '#16a34a',
    icon: <Bug size={15} />,
    title: 'Crashs WebRTC corrigés',
    tag: { label: 'Corrigé', bg: '#f0fdf4', color: '#16a34a', bdr: '#bbf7d0' },
    desc: 'Les déconnexions aléatoires en salle ont été tracées et éliminées sur Chrome et Firefox.',
  },
  {
    accent: '#d97706', iconBg: '#fffbeb', iconColor: '#d97706',
    icon: <Zap size={15} />,
    title: 'Performance ×3 sur mobile',
    tag: { label: 'Amélioré', bg: '#fffbeb', color: '#d97706', bdr: '#fde68a' },
    desc: 'Réduction du bundle JS, lazy-loading des composants lourds, optimisation des re-renders.',
  },
  {
    accent: '#7c3aed', iconBg: '#f5f3ff', iconColor: '#7c3aed',
    icon: <Layers size={15} />,
    title: 'Interface salle redessinée',
    tag: { label: 'Livré', bg: '#f5f3ff', color: '#7c3aed', bdr: '#ddd6fe' },
    desc: 'Contrôles réorganisés, chat repositionné, indicateurs de présence ajoutés selon vos retours.',
  },
  {
    accent: '#0891b2', iconBg: '#ecfeff', iconColor: '#0891b2',
    icon: <Activity size={15} />,
    title: 'Statuts de présence live',
    tag: { label: 'Nouveau', bg: '#ecfeff', color: '#0891b2', bdr: '#a5f3fc' },
    desc: 'Qui est actif, qui a coupé son micro, qui partage son écran — visible en temps réel.',
  },
  {
    accent: '#2563eb', iconBg: '#eff6ff', iconColor: '#2563eb',
    icon: <FileText size={15} />,
    title: 'Export transcription',
    tag: { label: 'Vague 2', bg: '#eff6ff', color: '#2563eb', bdr: '#dbeafe' },
    desc: 'Très demandé. En cours de développement — les candidats Vague 2 seront les premiers à tester.',
  },
];

const FEATURES = [
  {
    icon: <Cpu size={22} />, tag: 'Nouveau',
    title: 'IA intégrée en salle',
    desc: 'Transcription automatique, résumés post-réunion et suggestions contextuelles via un assistant natif.',
    items: ['Transcription live', 'Résumé automatique', 'Suggestions de tâches'],
  },
  {
    icon: <Users size={22} />, tag: 'Refonte',
    title: 'Salles de breakout v2',
    desc: 'Rejoindre/quitter sans interruption, minuteur partagé visible par tous, retour automatique.',
    items: ['Entrée/sortie fluide', 'Minuteur partagé', 'Retour automatique'],
  },
  {
    icon: <Shield size={22} />, tag: 'Sécurité',
    title: 'Chiffrement bout-en-bout',
    desc: 'Optionnel par salle, pour les organisations qui traitent des données sensibles ou médicales.',
    items: ['E2E activable par salle', 'Logs RGPD', 'Mode confidentiel'],
  },
  {
    icon: <Code2 size={22} />, tag: 'Beta 2 only',
    title: 'API développeur',
    desc: 'Premiers endpoints REST publics. Webhooks, SDK JS, embeds iFrame — testés en avant-première.',
    items: ['Webhooks events', 'SDK JavaScript', 'Embeds iFrame'],
  },
];

const QUOTES = [
  {
    mt: 0,
    text: "C'est rare d'avoir un fondateur qui répond en moins d'une heure à chaque retour. Le produit avance vite et on se sent vraiment utile.",
    name: 'Marion L.', role: 'Designer UX, Paris', initials: 'ML',
  },
  {
    mt: 36,
    text: "La qualité audio sur mobile m'a bluffé. Des coupures la première semaine, tout corrigé deux semaines après. Réactivité remarquable.",
    name: 'Théo M.', role: 'Dev React, Lyon', initials: 'TM',
  },
  {
    mt: 18,
    text: "VisiConnect a une direction claire. Ce n'est pas un clone Zoom — les choix UX montrent qu'ils comprennent vraiment les équipes tech.",
    name: 'Sara B.', role: 'Product Manager, Bordeaux', initials: 'SB',
  },
];

/* ═══════════════════════════════════════════════════════════════
   COMPOSANT PRINCIPAL
═══════════════════════════════════════════════════════════════ */
export default function RoomPageNew() {
  const navigate = useNavigate();
  useSafeLayout();

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    profile: '', usage: '', tools: [], motivation: '',
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /* — Scroll-reveal global via data-reveal — */
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver(
      entries => entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
      }),
      { threshold: 0.1 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  function setField(key, val) {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: '' }));
  }

  function toggleTool(t) {
    setForm(f => ({ ...f, tools: f.tools.includes(t) ? f.tools.filter(x => x !== t) : [...f.tools, t] }));
  }

  function validate() {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Requis';
    if (!form.lastName.trim())  e.lastName  = 'Requis';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email invalide';
    if (!form.profile) e.profile = 'Requis';
    if (!form.usage)   e.usage   = 'Requis';
    if (form.motivation.trim().length < 40) e.motivation = 'Minimum 40 caractères';
    return e;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true); setApiError('');
    try {
      const res  = await fetch('/api/beta-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur serveur');
      setSuccess(true);
    } catch (err) {
      setApiError(err.message || 'Une erreur est survenue. Réessayez dans quelques instants.');
    } finally {
      setLoading(false);
    }
  }

  function scrollToForm() {
    document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
  }

  const miniBarHeights = [45,60,38,72,55,80,42,90,65,70,58,85,40,75,68,50,88,78,62,55,72,60,80,92,48];

  return (
    <Page>
      <DotPattern />

      {/* ── NAV ─────────────────────────────────────────── */}
      <Nav>
        <NavInner>
          <NavLeft>
            <NavLogo onClick={() => navigate('/')}>
              <span className="dot" /><span className="txt">VisiConnect</span>
            </NavLogo>
            <NavCrumb>
              <span className="sep">/</span>
              <span className="cur">Bêta — Vague 2</span>
            </NavCrumb>
          </NavLeft>
          <NavRight>
            <NavPill><Sparkles size={12} /> 15 places</NavPill>
            <NavBtn onClick={scrollToForm}><ArrowRight size={14} />Candidater</NavBtn>
          </NavRight>
        </NavInner>
      </Nav>

      {/* ── HERO ────────────────────────────────────────── */}
      <HeroSection>
        <HeroGrid>
          <HeroLeft>
            <Eyebrow><span className="live" /> Bêta Vague 2 — Sélection ouverte</Eyebrow>
            <HeroTitle>
              La Vague&nbsp;1 est<br />
              <strong>terminée.</strong><br />
              La Vague&nbsp;2 commence.
            </HeroTitle>
            <HeroSub>
              22 testeurs ont façonné VisiConnect pendant plusieurs semaines.
              Leurs retours ont transformé le produit. Maintenant, 15 places s'ouvrent
              pour aller encore plus loin ensemble.
            </HeroSub>
            <HeroActions>
              <BtnPrimary onClick={scrollToForm}><Rocket size={16} />Candidater maintenant</BtnPrimary>
              <BtnOutline onClick={() => navigate('/')}><ArrowLeft size={16} />Retour au site</BtnOutline>
            </HeroActions>
          </HeroLeft>

          {/* ── Panel droit — rapport bêta ── */}
          <HeroPanel>
            <PanelHead>
              <PanelTitle>Rapport Bêta · Vague 1</PanelTitle>
              <StatusBadgeGreen>Clôturée</StatusBadgeGreen>
            </PanelHead>
            <BarSection>
              {[
                { label: 'Bugs identifiés',        val: '47 / 50',  pct: 94, delay: 0.3  },
                { label: 'Participation',           val: '22 / 25',  pct: 88, delay: 0.45 },
                { label: 'Satisfaction',            val: '4.2 / 5',  pct: 84, delay: 0.6  },
                { label: 'Fonctionnalités testées', val: '12 / 14',  pct: 86, delay: 0.75 },
              ].map(m => (
                <BarRow key={m.label}>
                  <BarLabel><span className="lbl">{m.label}</span><span className="val">{m.val}</span></BarLabel>
                  <BarTrack><BarFill $pct={m.pct} $delay={m.delay} /></BarTrack>
                </BarRow>
              ))}
            </BarSection>
            <MiniGrid>
              <MiniCard><div className="n">127</div><div className="l">retours reçus</div></MiniCard>
              <MiniCard><div className="n">38</div><div className="l">corrections</div></MiniCard>
              <MiniCard><div className="n">15</div><div className="l">places Vague 2</div></MiniCard>
              <MiniCard><div className="n">4.2★</div><div className="l">note moy.</div></MiniCard>
            </MiniGrid>
          </HeroPanel>
        </HeroGrid>
      </HeroSection>

      {/* ── STATS BAND ──────────────────────────────────── */}
      <StatsBand>
        <StatsBandInner>
          <StatCell><StatBig>22<em>+</em></StatBig><StatSmall>testeurs actifs</StatSmall></StatCell>
          <StatCell><StatBig>47<em>+</em></StatBig><StatSmall>bugs identifiés</StatSmall></StatCell>
          <StatCell><StatBig>15</StatBig><StatSmall>places Vague 2</StatSmall></StatCell>
          <StatCell><StatBig>4.2<em>★</em></StatBig><StatSmall>satisfaction globale</StatSmall></StatCell>
        </StatsBandInner>
      </StatsBand>

      {/* ── BENTO BILAN ─────────────────────────────────── */}
      <SectionWhite>
        <Inner>
          <SectionTag style={{ '--d': '0ms' }}><CheckCircle2 size={12} /> Le bilan</SectionTag>
          <SectionTitle style={{ '--d': '60ms' }}>Ce que vous avez vraiment accompli</SectionTitle>
          <SectionSub style={{ '--d': '120ms' }}>
            En quelques semaines, la communauté bêta a généré plus d'impact qu'une équipe QA complète.
          </SectionSub>
          <BentoGrid>
            <BentoWide style={{ '--d': '0ms' }}>
              <BentoIconBox><Bug size={22} /></BentoIconBox>
              <div style={{ flex: 1 }}>
                <BentoNum>47</BentoNum>
                <BentoTitle>bugs critiques identifiés et documentés</BentoTitle>
                <BentoDesc>
                  Auth Clerk, crashs WebRTC, fuites mémoire — chaque rapport a compté.
                  La majorité a été corrigée avant la fin de la vague.
                </BentoDesc>
                <MiniBars>
                  {miniBarHeights.map((h, i) => (
                    <MiniBar key={i} $h={h} $hi={i > 16} />
                  ))}
                </MiniBars>
              </div>
            </BentoWide>
            <BentoBase style={{ '--d': '80ms' }}>
              <BentoIconBox><MessageCircle size={22} /></BentoIconBox>
              <BentoNum>127</BentoNum>
              <BentoTitle>retours détaillés reçus</BentoTitle>
              <BentoDesc>Chaque retour a été lu, catégorisé et priorisé. Aucun n'est passé à la corbeille.</BentoDesc>
            </BentoBase>
            <BentoBase style={{ '--d': '160ms' }}>
              <BentoIconBox><Heart size={22} /></BentoIconBox>
              <BentoNum>100<span style={{ fontSize: '1.5rem' }}>%</span></BentoNum>
              <BentoTitle>implication bénévole</BentoTitle>
              <BentoDesc>Pas de rémunération, pas d'obligation — que de la passion et de la curiosité. Ça change tout.</BentoDesc>
            </BentoBase>
          </BentoGrid>
        </Inner>
      </SectionWhite>

      {/* ── CHANGEMENTS ─────────────────────────────────── */}
      <SectionBlue>
        <Inner>
          <SectionTag style={{ '--d': '0ms' }}><Zap size={12} /> Améliorations</SectionTag>
          <SectionTitle style={{ '--d': '60ms' }}>Ce qui a changé grâce à vous</SectionTitle>
          <SectionSub style={{ '--d': '120ms' }}>
            Les retours de la Vague 1 ont directement alimenté la feuille de route. Voici ce qui a été livré.
          </SectionSub>
          <ChangesGrid>
            {CHANGES.map((c, i) => (
              <ChangeCard key={i} $accent={c.accent} style={{ '--d': `${i * 55}ms` }}>
                <ChangeIcon $bg={c.iconBg} $color={c.iconColor}>{c.icon}</ChangeIcon>
                <ChangeBody>
                  <ChangeTitleRow>
                    <ChangeTitle>{c.title}</ChangeTitle>
                    <Tag $bg={c.tag.bg} $color={c.tag.color} $bdr={c.tag.bdr}>{c.tag.label}</Tag>
                  </ChangeTitleRow>
                  <ChangeDesc>{c.desc}</ChangeDesc>
                </ChangeBody>
              </ChangeCard>
            ))}
          </ChangesGrid>
        </Inner>
      </SectionBlue>

      {/* ── VAGUE 2 ─────────────────────────────────────── */}
      <SectionWhite>
        <Inner>
          <SectionTag style={{ '--d': '0ms' }}><Rocket size={12} /> Vague 2</SectionTag>
          <SectionTitle style={{ '--d': '60ms' }}>Ce qui arrive dans la Vague 2</SectionTitle>
          <SectionSub style={{ '--d': '120ms' }}>
            Plus ciblée, plus structurée — avec un produit significativement amélioré sous le capot.
          </SectionSub>
          <FeatGrid>
            {FEATURES.map((f, i) => (
              <FeatCard key={i} style={{ '--d': `${i * 80}ms` }}>
                <FeatIconWrap>{f.icon}</FeatIconWrap>
                <FeatTagLine><Star size={10} /> {f.tag}</FeatTagLine>
                <FeatTitle>{f.title}</FeatTitle>
                <FeatDesc>{f.desc}</FeatDesc>
                <FeatDots>
                  {f.items.map((it, j) => <FeatDot key={j}>{it}</FeatDot>)}
                </FeatDots>
              </FeatCard>
            ))}
          </FeatGrid>
        </Inner>
      </SectionWhite>

      {/* ── QUOTES ──────────────────────────────────────── */}
      <SectionBlue>
        <Inner>
          <SectionTag style={{ '--d': '0ms' }}><MessageCircle size={12} /> Témoignages</SectionTag>
          <SectionTitle style={{ '--d': '60ms' }}>Ce qu'ils en ont pensé</SectionTitle>
          <SectionSub style={{ '--d': '120ms' }}>Les vrais mots des testeurs — pas une ligne de marketing.</SectionSub>
          <QuotesGrid>
            {QUOTES.map((q, i) => (
              <QuoteCard key={i} $mt={q.mt} style={{ '--d': `${i * 100}ms` }}>
                <QuoteStars>{[0,1,2,3,4].map(s => <Star key={s} size={13} />)}</QuoteStars>
                <QuoteMark>"</QuoteMark>
                <QuoteText>{q.text}</QuoteText>
                <QuoteAuthor>
                  <QuoteAvatar>{q.initials}</QuoteAvatar>
                  <div><QuoteName>{q.name}</QuoteName><QuoteRole>{q.role}</QuoteRole></div>
                </QuoteAuthor>
              </QuoteCard>
            ))}
          </QuotesGrid>
        </Inner>
      </SectionBlue>

      {/* ── CRITÈRES ────────────────────────────────────── */}
      <SectionWhite>
        <Inner>
          <SectionTag style={{ '--d': '0ms' }}><Target size={12} /> Sélection</SectionTag>
          <SectionTitle style={{ '--d': '60ms' }}>Ce que je cherche dans la Vague 2</SectionTitle>
          <SectionSub style={{ '--d': '120ms' }}>15 places. Des critères clairs, pas une loterie.</SectionSub>
          <CriteriaList>
            {[
              {
                n: '01', title: 'Engagement régulier',
                desc: "Des testeurs qui utilisent vraiment le produit, même imparfait, et qui reviennent d'une semaine à l'autre. Pas une inscription puis plus rien.",
              },
              {
                n: '02', title: 'Retours structurés',
                desc: "Pas besoin d'être développeur. Mais un retour du type « ça marche pas » ne m'aide pas. Reproduire un bug, expliquer le contexte, proposer une piste — c'est précieux.",
              },
              {
                n: '03', title: "Cas d'usage réel",
                desc: "Une startup qui fait ses réunions hebdo, une agence qui brief ses clients, une équipe remote — vos vrais usages font évoluer un vrai produit.",
              },
            ].map((c, i) => (
              <CriteriaItem key={i} style={{ '--d': `${i * 100}ms` }}>
                <CriteriaNum>{c.n}</CriteriaNum>
                <CriteriaBody>
                  <CriteriaTitle>{c.title}</CriteriaTitle>
                  <CriteriaDesc>{c.desc}</CriteriaDesc>
                </CriteriaBody>
              </CriteriaItem>
            ))}
          </CriteriaList>
        </Inner>
      </SectionWhite>

      {/* ── FORMULAIRE ──────────────────────────────────── */}
      <FormOuter id="form-section">
        <div style={{ maxWidth: 840, margin: '0 auto', marginBottom: '2rem', textAlign: 'center' }}>
          <SectionTag style={{ '--d': '0ms', display: 'inline-flex', marginBottom: '.75rem' }}>
            <Sparkles size={12} /> Candidature
          </SectionTag>
          <div style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 800, letterSpacing: '-.035em', color: '#fff', lineHeight: 1.2, marginBottom: '.65rem' }}>
            Rejoindre la Vague 2
          </div>
          <div style={{ fontSize: '.95rem', color: 'rgba(255,255,255,.55)', lineHeight: 1.7 }}>
            Dossier lu personnellement · Réponse sous 72h · 15 places disponibles
          </div>
        </div>

        <FormCard>
          {success ? (
            <SuccessWrap>
              <SuccessCircle><CheckCircle2 size={30} /></SuccessCircle>
              <SuccessTitle>Candidature envoyée !</SuccessTitle>
              <SuccessText>
                Merci pour votre intérêt. Je lis chaque dossier personnellement<br />
                et vous recontacte sous 72h par email.
              </SuccessText>
              <BtnPrimary onClick={() => navigate('/')} style={{ marginTop: '.5rem' }}>
                <ArrowLeft size={15} /> Retour à l'accueil
              </BtnPrimary>
            </SuccessWrap>
          ) : (
            <>
              <FormTop>
                <FormTopLeft>
                  <FormTopTitle>Formulaire de candidature</FormTopTitle>
                  <FormTopSub>Vague 2 — sélection en cours · Réponse sous 72h</FormTopSub>
                </FormTopLeft>
                <SlotsBadge>
                  <Clock size={13} />
                  <span><span>15</span> places · {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</span>
                </SlotsBadge>
              </FormTop>

              <FormBody>
                <form onSubmit={handleSubmit} noValidate>
                  {apiError && (
                    <ErrBox><AlertCircle size={15} />{apiError}</ErrBox>
                  )}

                  <FieldRow $cols="1fr 1fr">
                    <FieldGroup>
                      <Lbl>Prénom<Req>*</Req></Lbl>
                      <Inp $err={errors.firstName} value={form.firstName}
                        onChange={ev => setField('firstName', ev.target.value)}
                        placeholder="Votre prénom" />
                      {errors.firstName && <FieldHint $err>{errors.firstName}</FieldHint>}
                    </FieldGroup>
                    <FieldGroup>
                      <Lbl>Nom<Req>*</Req></Lbl>
                      <Inp $err={errors.lastName} value={form.lastName}
                        onChange={ev => setField('lastName', ev.target.value)}
                        placeholder="Votre nom" />
                      {errors.lastName && <FieldHint $err>{errors.lastName}</FieldHint>}
                    </FieldGroup>
                  </FieldRow>

                  <FieldRow>
                    <FieldGroup>
                      <Lbl>Email<Req>*</Req></Lbl>
                      <Inp type="email" $err={errors.email} value={form.email}
                        onChange={ev => setField('email', ev.target.value)}
                        placeholder="votre@email.com" />
                      {errors.email && <FieldHint $err>{errors.email}</FieldHint>}
                    </FieldGroup>
                  </FieldRow>

                  <FieldRow $cols="1fr 1fr">
                    <FieldGroup>
                      <Lbl>Profil<Req>*</Req></Lbl>
                      <Sel $err={errors.profile} value={form.profile}
                        onChange={ev => setField('profile', ev.target.value)}>
                        <option value="">Sélectionner…</option>
                        <option value="developer">Développeur·se</option>
                        <option value="designer">Designer UX/UI</option>
                        <option value="pm">Product Manager</option>
                        <option value="founder">Fondateur·trice</option>
                        <option value="other">Autre</option>
                      </Sel>
                      {errors.profile && <FieldHint $err>{errors.profile}</FieldHint>}
                    </FieldGroup>
                    <FieldGroup>
                      <Lbl>Usage principal<Req>*</Req></Lbl>
                      <Sel $err={errors.usage} value={form.usage}
                        onChange={ev => setField('usage', ev.target.value)}>
                        <option value="">Sélectionner…</option>
                        <option value="team-meetings">Réunions d'équipe</option>
                        <option value="client-calls">Appels clients</option>
                        <option value="education">Enseignement / formation</option>
                        <option value="dev-collab">Collaboration dev</option>
                        <option value="other">Autre</option>
                      </Sel>
                      {errors.usage && <FieldHint $err>{errors.usage}</FieldHint>}
                    </FieldGroup>
                  </FieldRow>

                  <FieldRow>
                    <FieldGroup>
                      <Lbl>Outils que vous utilisez au quotidien</Lbl>
                      <ChipsRow>
                        {TOOLS.map(t => (
                          <Chip key={t} type="button" $on={form.tools.includes(t)}
                            onClick={() => toggleTool(t)}>{t}</Chip>
                        ))}
                      </ChipsRow>
                    </FieldGroup>
                  </FieldRow>

                  <Divider />

                  <FieldRow>
                    <FieldGroup>
                      <Lbl>Pourquoi voulez-vous rejoindre la Vague 2 ?<Req>*</Req></Lbl>
                      <Txt $err={errors.motivation} value={form.motivation}
                        onChange={ev => setField('motivation', ev.target.value)}
                        placeholder="Décrivez votre contexte, votre utilisation envisagée et ce que vous pouvez apporter comme testeur…"
                        rows={5} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {errors.motivation
                          ? <FieldHint $err>{errors.motivation}</FieldHint>
                          : <FieldHint>Minimum 40 caractères — plus c'est détaillé, mieux c'est.</FieldHint>}
                        <CharCount $ok={form.motivation.trim().length >= 40}>
                          {form.motivation.trim().length} / 40+
                        </CharCount>
                      </div>
                    </FieldGroup>
                  </FieldRow>

                  <SubmitRow>
                    <SubmitNote><Shield size={13} /> Données confidentielles — aucune revente, aucun spam.</SubmitNote>
                    <SubmitBtn type="submit" disabled={loading}>
                      {loading
                        ? <><SpinIcon size={16} /> Envoi en cours…</>
                        : <><Send size={16} /> Envoyer ma candidature</>}
                    </SubmitBtn>
                  </SubmitRow>
                </form>
              </FormBody>
            </>
          )}
        </FormCard>
      </FormOuter>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <FooterBar>
        <FooterInner>
          <FooterLogo><span className="dot" /> VisiConnect</FooterLogo>
          <FooterLinks>
            <FooterLink onClick={() => navigate('/legal/privacy')}>Confidentialité</FooterLink>
            <FooterLink onClick={() => navigate('/legal/terms')}>CGU</FooterLink>
            <FooterLink onClick={() => navigate('/contact')}>Contact</FooterLink>
          </FooterLinks>
          <FooterCopy>© {new Date().getFullYear()} VisiConnect</FooterCopy>
        </FooterInner>
      </FooterBar>
    </Page>
  );
}
