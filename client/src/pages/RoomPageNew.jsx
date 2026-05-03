import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import {
  Sparkles, Users, CheckCircle2, ArrowLeft, Send, Loader2, AlertCircle,
  Bug, Zap, Rocket, Shield, Clock, Code2, Cpu, Layers, Activity,
  Check, X, ChevronRight, FileText, Target, ArrowRight, Globe,
} from 'lucide-react';
import { useSafeLayout } from '../hooks/useSafeLayout';

/* ─────────────────────────────────────────────────────────────
   PALETTE — solide, zéro gradient
───────────────────────────────────────────────────────────── */
const C = {
  primary:     '#2563eb',
  primaryDark: '#1d4ed8',
  navy:        '#0f172a',
  navyMid:     '#1e293b',
  slate:       '#334155',
  text:        '#374151',
  muted:       '#6b7280',
  border:      '#e5e7eb',
  borderStrong:'#d1d5db',
  bg:          '#f8fbff',
  softBlue:    '#eff6ff',
  blueTint:    '#dbeafe',
  green:       '#16a34a',
  greenBg:     '#f0fdf4',
  greenBdr:    '#bbf7d0',
  amber:       '#d97706',
  amberBg:     '#fffbeb',
  amberBdr:    '#fde68a',
  purple:      '#7c3aed',
  purpleBg:    '#f5f3ff',
  purpleBdr:   '#ddd6fe',
  cyan:        '#0891b2',
  cyanBg:      '#ecfeff',
  cyanBdr:     '#a5f3fc',
};

/* ─────────────────────────────────────────────────────────────
   ANIMATIONS
───────────────────────────────────────────────────────────── */
const fadeUp = keyframes`
  from { opacity:0; transform:translateY(18px); }
  to   { opacity:1; transform:translateY(0); }
`;
const pulseDot = keyframes`
  0%,100% { transform:scale(1);   }
  50%      { transform:scale(1.5); opacity:.4; }
`;
const barIn = keyframes`from { width:0; }`;
const spin  = keyframes`to { transform:rotate(360deg); }`;
const popIn = keyframes`
  0%   { transform:scale(0) rotate(-20deg); opacity:0; }
  65%  { transform:scale(1.12) rotate(2deg); }
  100% { transform:scale(1); opacity:1; }
`;

const reveal = css`
  opacity:0; transform:translateY(20px);
  transition:opacity .55s ease, transform .55s cubic-bezier(.22,1,.36,1);
  transition-delay:var(--d,0ms); will-change:opacity,transform;
  &.on { opacity:1; transform:translateY(0); }
  @media(prefers-reduced-motion:reduce){ opacity:1; transform:none; transition:none; }
`;

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
const Page = styled.div`
  min-height:100vh;
  background:#ffffff;
  color:${C.navy};
  font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;
  overflow-x:hidden;
`;
/* Grille de points en position fixe — texture subtile */
const Grid = styled.div`
  position:fixed; inset:0; pointer-events:none; z-index:0;
  background-image:radial-gradient(circle,#cbd5e1 1px,transparent 1px);
  background-size:28px 28px; opacity:.22;
`;

/* ─────────────────────────────────────────────────────────────
   NAV
───────────────────────────────────────────────────────────── */
const Nav = styled.nav`
  position:sticky; top:0; z-index:200;
  background:rgba(255,255,255,.97); backdrop-filter:blur(14px);
  border-bottom:1px solid ${C.border};
`;
const NavInner = styled.div`
  max-width:1280px; margin:0 auto; padding:.85rem 2rem;
  display:flex; align-items:center; justify-content:space-between;
  @media(max-width:600px){ padding:.85rem 1.25rem; }
`;
const NavBrand = styled.button`
  background:none; border:none; cursor:pointer; padding:0;
  display:flex; align-items:center; gap:.5rem;
  font-weight:800; font-size:.98rem; letter-spacing:-.025em; color:${C.navy};
  .d { width:8px; height:8px; border-radius:50%; background:${C.primary}; }
  &:hover .t { color:${C.primary}; }
  .t { transition:color .15s; }
`;
const NavMeta = styled.div`
  display:flex; align-items:center; gap:.75rem;
  @media(max-width:480px){ display:none; }
`;
const Pill = styled.span`
  display:inline-flex; align-items:center; gap:.35rem;
  font-size:.72rem; font-weight:700; padding:.28rem .65rem;
  border-radius:999px; background:${C.softBlue}; border:1px solid ${C.blueTint};
  color:${C.primary};
  .live { width:5px; height:5px; border-radius:50%; background:${C.green}; animation:${pulseDot} 2s ease infinite; }
`;
const NavCta = styled.button`
  display:inline-flex; align-items:center; gap:.4rem;
  padding:.52rem 1.1rem; border-radius:9px; border:none;
  background:${C.primary}; color:#fff;
  font-weight:700; font-size:.83rem; cursor:pointer;
  box-shadow:0 3px 10px rgba(37,99,235,.28);
  transition:background .15s, transform .13s;
  &:hover { background:${C.primaryDark}; transform:translateY(-1px); }
`;

/* ─────────────────────────────────────────────────────────────
   HERO — 2 colonnes
───────────────────────────────────────────────────────────── */
const Hero = styled.section`
  background:#fff; border-bottom:1px solid ${C.border};
  padding:5.5rem 2rem 5rem; position:relative; z-index:1;
`;
const HeroWrap = styled.div`
  max-width:1280px; margin:0 auto;
  display:grid; grid-template-columns:minmax(0,1.2fr) minmax(300px,.8fr);
  gap:5rem; align-items:center;
  @media(max-width:900px){ grid-template-columns:1fr; gap:2.5rem; }
`;
const HeroLeft = styled.div`animation:${fadeUp} .65s cubic-bezier(.22,1,.36,1) both;`;
const Eyebrow = styled.div`
  display:inline-flex; align-items:center; gap:.42rem;
  font-size:.75rem; font-weight:700; letter-spacing:.06em; text-transform:uppercase;
  color:${C.primary}; margin-bottom:1.25rem;
  .bar { width:18px; height:2px; background:${C.primary}; display:inline-block; }
`;
const HeroH1 = styled.h1`
  font-size:clamp(2.5rem,4.5vw,4rem);
  font-weight:900; letter-spacing:-.05em; line-height:1.05;
  color:${C.navy}; margin:0 0 1.1rem;
  em { color:${C.primary}; font-style:normal; }
`;
const HeroP = styled.p`
  font-size:1.05rem; color:${C.muted}; line-height:1.8;
  max-width:500px; margin:0 0 2.25rem;
`;
const HeroActions = styled.div`display:flex; gap:.85rem; flex-wrap:wrap;`;
const BtnBlue = styled.button`
  display:inline-flex; align-items:center; gap:.5rem;
  padding:.82rem 1.55rem; border-radius:10px; border:none;
  background:${C.primary}; color:#fff; font-weight:700; font-size:.9rem; cursor:pointer;
  box-shadow:0 6px 18px -2px rgba(37,99,235,.35);
  transition:background .15s,transform .13s,box-shadow .15s;
  &:hover{ background:${C.primaryDark}; transform:translateY(-2px); box-shadow:0 12px 28px -2px rgba(37,99,235,.42); }
`;
const BtnGhost = styled.button`
  display:inline-flex; align-items:center; gap:.5rem;
  padding:.82rem 1.4rem; border-radius:10px;
  border:1.5px solid ${C.borderStrong}; background:#fff; color:${C.slate};
  font-weight:700; font-size:.9rem; cursor:pointer;
  transition:border-color .15s,color .15s,transform .13s;
  &:hover{ border-color:${C.primary}; color:${C.primary}; transform:translateY(-2px); }
`;

/* Panel droit — dashboard bêta */
const Panel = styled.div`
  background:#fff; border:1px solid ${C.border};
  border-top:3px solid ${C.primary};
  border-radius:14px; padding:1.5rem;
  box-shadow:0 20px 50px rgba(15,23,42,.1);
  animation:${fadeUp} .7s .1s cubic-bezier(.22,1,.36,1) both;
  @media(max-width:900px){ display:none; }
`;
const PanelTopRow = styled.div`
  display:flex; align-items:center; justify-content:space-between;
  padding-bottom:.9rem; border-bottom:1px solid ${C.border}; margin-bottom:1.15rem;
`;
const PanelLabel = styled.div`font-size:.78rem; font-weight:800; color:${C.navy}; letter-spacing:-.01em;`;
const ClosedTag = styled.div`
  font-size:.7rem; font-weight:700; padding:.22rem .6rem;
  border-radius:6px; background:${C.softBlue}; color:${C.primary};
  border:1px solid ${C.blueTint};
`;
const PBar = styled.div`margin-bottom:.75rem;`;
const PBarHead = styled.div`
  display:flex; justify-content:space-between; margin-bottom:.28rem;
  span { font-size:.72rem; }
  .l { color:${C.muted}; } .v { color:${C.navy}; font-weight:700; }
`;
const PBarTrack = styled.div`
  height:4px; background:${C.softBlue}; border-radius:99px; overflow:hidden;
`;
const PBarFill = styled.div`
  height:100%; background:${C.primary}; border-radius:99px;
  width:${p=>p.$p}%;
  animation:${barIn} 1s ${p=>p.$d||0}s cubic-bezier(.22,1,.36,1) both;
`;
const PGrid = styled.div`display:grid; grid-template-columns:1fr 1fr; gap:.55rem; margin-top:1rem;`;
const PCell = styled.div`
  background:${C.softBlue}; border:1px solid ${C.blueTint};
  border-radius:9px; padding:.7rem;
  .n { font-size:1.25rem; font-weight:900; color:${C.primary}; line-height:1; }
  .l { font-size:.68rem; color:${C.muted}; margin-top:2px; }
`;

/* ─────────────────────────────────────────────────────────────
   BANDE DARK
───────────────────────────────────────────────────────────── */
const DarkBand = styled.div`
  background:${C.navy}; position:relative; z-index:1;
`;
const DarkBandInner = styled.div`
  max-width:1280px; margin:0 auto;
  display:grid; grid-template-columns:repeat(4,1fr);
  @media(max-width:600px){ grid-template-columns:repeat(2,1fr); }
`;
const DarkCell = styled.div`
  padding:2.25rem 1.25rem; text-align:center;
  border-right:1px solid rgba(255,255,255,.07);
  &:last-child { border-right:none; }
  @media(max-width:600px){
    &:nth-child(2){ border-right:none; }
    border-bottom:1px solid rgba(255,255,255,.07);
    &:nth-child(3),&:nth-child(4){ border-bottom:none; }
  }
`;
const BigNum = styled.div`
  font-size:clamp(1.9rem,3.2vw,2.75rem); font-weight:900;
  letter-spacing:-.045em; line-height:1; color:#fff; margin-bottom:.3rem;
  sup { font-size:.5em; color:${C.primary}; vertical-align:super; }
`;
const SmLbl = styled.div`font-size:.75rem; color:rgba(255,255,255,.42); font-weight:500;`;

/* ─────────────────────────────────────────────────────────────
   LAYOUT SECTION
───────────────────────────────────────────────────────────── */
const SecWhite = styled.section`
  background:#fff; border-bottom:1px solid ${C.border};
  padding:5rem 2rem; position:relative; z-index:1;
  @media(max-width:600px){ padding:3.5rem 1.25rem; }
`;
const SecBlue = styled.section`
  background:${C.softBlue}; border-top:1px solid ${C.blueTint}; border-bottom:1px solid ${C.blueTint};
  padding:5rem 2rem; position:relative; z-index:1;
  @media(max-width:600px){ padding:3.5rem 1.25rem; }
`;
const SecNavy = styled.section`
  background:${C.navy}; padding:5rem 2rem; position:relative; z-index:1;
  @media(max-width:600px){ padding:3.5rem 1.25rem; }
`;
const W = styled.div`max-width:1280px; margin:0 auto;`;

/* Entête de section */
const SecLabel = styled.div`
  ${reveal}
  font-size:.72rem; font-weight:800; text-transform:uppercase; letter-spacing:.1em;
  color:${C.primary}; margin-bottom:.55rem; display:flex; align-items:center; gap:.5rem;
  &::before { content:''; display:block; width:14px; height:2px; background:${C.primary}; }
`;
const SecH2 = styled.h2`
  ${reveal}
  font-size:clamp(1.7rem,2.8vw,2.5rem); font-weight:900;
  letter-spacing:-.04em; color:${C.navy}; margin:0 0 .5rem; line-height:1.15;
`;
const SecH2W = styled(SecH2)` color:#fff; `;
const SecP = styled.p`
  ${reveal}
  font-size:.95rem; color:${C.muted}; line-height:1.75; max-width:540px; margin:0 0 2.75rem;
`;
const SecPW = styled(SecP)` color:rgba(255,255,255,.5); `;

/* ─────────────────────────────────────────────────────────────
   TIMELINE DE CHANGELOG
───────────────────────────────────────────────────────────── */
const TimelineLayout = styled.div`
  display:grid; grid-template-columns:220px 1fr; gap:4rem;
  @media(max-width:800px){ grid-template-columns:1fr; gap:2rem; }
`;
const TimelineSidebar = styled.div`
  @media(max-width:800px){ display:none; }
`;
const TimelineStickyBox = styled.div`
  position:sticky; top:5rem;
  background:${C.softBlue}; border:1px solid ${C.blueTint};
  border-left:3px solid ${C.primary};
  border-radius:0 12px 12px 0; padding:1.35rem;
`;
const SBTitle = styled.div`font-size:.77rem; font-weight:800; color:${C.navy}; margin-bottom:.9rem; letter-spacing:-.01em;`;
const SBItem = styled.div`
  display:flex; align-items:center; gap:.55rem;
  font-size:.76rem; font-weight:600; color:${C.muted};
  padding:.35rem 0; border-bottom:1px solid ${C.blueTint};
  &:last-child{ border-bottom:none; }
  .dot { width:7px; height:7px; border-radius:50%; background:${p=>p.$c||C.primary}; flex-shrink:0; }
  .cnt { margin-left:auto; font-size:.69rem; color:${C.primary}; font-weight:700; }
`;
const TimelineItems = styled.div`display:flex; flex-direction:column; gap:1px;`;
/* Chaque entrée changelog */
const TEntry = styled.div`
  ${reveal}
  background:#fff; border:1px solid ${C.border};
  border-left:3px solid ${p=>p.$accent||C.primary};
  border-radius:0 12px 12px 0;
  padding:1.35rem 1.5rem;
  margin-bottom:.7rem;
  transition:transform .18s, box-shadow .18s;
  &:hover { transform:translateX(4px); box-shadow:0 8px 24px rgba(15,23,42,.07); }
`;
const TEntryTop = styled.div`display:flex; align-items:flex-start; justify-content:space-between; gap:.75rem; margin-bottom:.55rem;`;
const TEntryLeft = styled.div`flex:1;`;
const TEntryDate = styled.div`
  font-size:.69rem; font-weight:700; letter-spacing:.05em;
  text-transform:uppercase; color:${C.muted}; margin-bottom:.28rem;
`;
const TEntryTitle = styled.div`font-size:.94rem; font-weight:700; color:${C.navy};`;
const TBadge = styled.span`
  font-size:.67rem; font-weight:800; padding:.2rem .55rem; border-radius:6px;
  white-space:nowrap; flex-shrink:0;
  background:${p=>p.$bg}; color:${p=>p.$c}; border:1px solid ${p=>p.$bdr};
`;
const TEntryDesc = styled.div`font-size:.82rem; color:${C.muted}; line-height:1.65;`;

/* ─────────────────────────────────────────────────────────────
   TABLE DE COMPARAISON
───────────────────────────────────────────────────────────── */
const CompareWrap = styled.div`
  ${reveal}
  border:1px solid ${C.border}; border-radius:14px; overflow:hidden;
  box-shadow:0 8px 30px rgba(15,23,42,.06);
`;
const CompareHead = styled.div`
  display:grid; grid-template-columns:1fr 1fr 1fr;
  background:${C.navy};
`;
const CH = styled.div`
  padding:.9rem 1.25rem; font-size:.78rem; font-weight:800;
  text-transform:uppercase; letter-spacing:.07em;
  color:${p=>p.$hi?C.primary:'rgba(255,255,255,.45)'};
  border-right:1px solid rgba(255,255,255,.07);
  &:last-child{ border-right:none; }
  ${p=>p.$hi && `border-top:2px solid ${C.primary}; background:rgba(37,99,235,.12);`}
`;
const CompareRow = styled.div`
  display:grid; grid-template-columns:1fr 1fr 1fr;
  border-bottom:1px solid ${C.border};
  &:last-child{ border-bottom:none; }
  &:nth-child(even){ background:${C.bg}; }
`;
const CR = styled.div`
  padding:.85rem 1.25rem; font-size:.83rem;
  border-right:1px solid ${C.border}; display:flex; align-items:center; gap:.5rem;
  &:last-child{ border-right:none; }
  ${p=>p.$hi && `background:rgba(37,99,235,.03);`}
  .feat { color:${C.slate}; font-weight:600; }
`;
const Tick = styled.div`
  width:20px; height:20px; border-radius:50%;
  background:${p=>p.$yes ? C.greenBg : '#fef2f2'};
  border:1px solid ${p=>p.$yes ? C.greenBdr : '#fecaca'};
  color:${p=>p.$yes ? C.green : '#dc2626'};
  display:flex; align-items:center; justify-content:center; flex-shrink:0;
`;

/* ─────────────────────────────────────────────────────────────
   FEATURES BENTO — Vague 2
───────────────────────────────────────────────────────────── */
const Bento = styled.div`
  display:grid; grid-template-columns:repeat(3,1fr);
  grid-template-rows:auto auto;
  gap:.9rem;
  @media(max-width:900px){ grid-template-columns:1fr 1fr; }
  @media(max-width:580px){ grid-template-columns:1fr; }
`;
const BCard = styled.div`
  ${reveal}
  background:#fff; border:1px solid ${C.border};
  border-top:3px solid ${p=>p.$accent||C.primary};
  border-radius:0 0 14px 14px; padding:1.7rem;
  transition:transform .2s, box-shadow .2s;
  &:hover{ transform:translateY(-4px); box-shadow:0 18px 44px rgba(15,23,42,.09); }
  ${p=>p.$wide && `grid-column:span 2; @media(max-width:900px){ grid-column:span 1; }`}
`;
const BIco = styled.div`
  width:44px; height:44px; border-radius:11px;
  background:${C.softBlue}; border:1px solid ${C.blueTint};
  display:flex; align-items:center; justify-content:center; color:${C.primary};
  margin-bottom:1rem;
`;
const BTag = styled.div`
  display:inline-block; font-size:.68rem; font-weight:800;
  padding:.18rem .55rem; border-radius:5px;
  background:${C.softBlue}; color:${C.primary}; border:1px solid ${C.blueTint};
  margin-bottom:.55rem; text-transform:uppercase; letter-spacing:.05em;
`;
const BTitle = styled.div`font-size:.98rem; font-weight:700; color:${C.navy}; margin-bottom:.35rem;`;
const BDesc = styled.div`font-size:.82rem; color:${C.muted}; line-height:1.65;`;
const BList = styled.ul`list-style:none; margin:.85rem 0 0; padding:0; display:flex; flex-direction:column; gap:.38rem;`;
const BLi = styled.li`
  display:flex; align-items:center; gap:.5rem;
  font-size:.8rem; color:${C.text};
  &::before{ content:''; display:block; width:5px; height:5px; border-radius:50%; background:${C.primary}; flex-shrink:0; }
`;

/* ─────────────────────────────────────────────────────────────
   CRITÈRES — section dark avec layout offset
───────────────────────────────────────────────────────────── */
const CriteriaGrid = styled.div`
  display:grid; grid-template-columns:360px 1fr;
  gap:5rem; align-items:start;
  @media(max-width:860px){ grid-template-columns:1fr; gap:2.5rem; }
`;
const CriteriaLeft = styled.div``;
const CriteriaItems = styled.div`display:flex; flex-direction:column; gap:.75rem;`;
const CItem = styled.div`
  ${reveal}
  background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08);
  border-left:3px solid ${C.primary}; border-radius:0 12px 12px 0;
  padding:1.5rem 1.75rem; display:flex; gap:1.25rem; align-items:flex-start;
  transition:background .18s;
  &:hover{ background:rgba(255,255,255,.07); }
`;
const CNum = styled.div`
  font-size:1.5rem; font-weight:900; color:${C.primary};
  line-height:1; flex-shrink:0; min-width:2rem;
`;
const CBody = styled.div``;
const CTitle = styled.div`font-size:.96rem; font-weight:700; color:#fff; margin-bottom:.35rem;`;
const CDesc = styled.div`font-size:.82rem; color:rgba(255,255,255,.48); line-height:1.7;`;

/* ─────────────────────────────────────────────────────────────
   FORMULAIRE — fond dark
───────────────────────────────────────────────────────────── */
const FormSection = styled.section`
  background:#fff; border-top:1px solid ${C.border};
  padding:5rem 2rem; position:relative; z-index:1;
  @media(max-width:600px){ padding:3.5rem 1.25rem; }
`;
const FormBox = styled.div`
  max-width:820px; margin:0 auto;
  background:#fff; border:1px solid ${C.border};
  border-top:3px solid ${C.primary};
  border-radius:0 0 18px 18px;
  box-shadow:0 30px 80px rgba(15,23,42,.1);
  overflow:hidden;
`;
const FormHeader = styled.div`
  background:${C.softBlue}; border-bottom:1px solid ${C.blueTint};
  padding:1.75rem 2.25rem;
  display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem;
`;
const FormHTitle = styled.div`font-size:1.1rem; font-weight:800; color:${C.navy}; letter-spacing:-.02em;`;
const FormHSub = styled.div`font-size:.79rem; color:${C.muted}; margin-top:.15rem;`;
const SlotBox = styled.div`
  display:inline-flex; align-items:center; gap:.4rem;
  font-size:.75rem; font-weight:700; color:${C.navy};
  background:#fff; border:1px solid ${C.border};
  border-radius:9px; padding:.45rem .8rem;
  white-space:nowrap;
  span { color:${C.primary}; }
`;
const FormBody = styled.div`padding:1.85rem 2.25rem 2.25rem;`;
const FRow = styled.div`
  display:grid; grid-template-columns:${p=>p.$c||'1fr'}; gap:1rem; margin-bottom:1.1rem;
  @media(max-width:520px){ grid-template-columns:1fr; }
`;
const FG = styled.div`display:flex; flex-direction:column; gap:.35rem;`;
const Lbl = styled.label`font-size:.77rem; font-weight:700; color:${C.navyMid};`;
const Req = styled.span`color:${C.primary}; margin-left:1px;`;
const Inp = styled.input`
  width:100%; box-sizing:border-box; padding:.72rem .95rem;
  border:1.5px solid ${p=>p.$e?'#ef4444':C.border};
  border-radius:9px; background:#fff; color:${C.navy};
  font-size:.88rem; font-family:inherit; outline:none;
  transition:border-color .15s,box-shadow .15s;
  &:focus{ border-color:${C.primary}; box-shadow:0 0 0 3px rgba(37,99,235,.1); }
  &::placeholder{ color:${C.muted}; }
`;
const Sel = styled.select`
  width:100%; box-sizing:border-box; padding:.72rem .95rem;
  border:1.5px solid ${p=>p.$e?'#ef4444':C.border};
  border-radius:9px; background:#fff; color:${C.navy};
  font-size:.88rem; font-family:inherit; outline:none; appearance:none; cursor:pointer;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat:no-repeat; background-position:right .9rem center;
  transition:border-color .15s,box-shadow .15s;
  &:focus{ border-color:${C.primary}; box-shadow:0 0 0 3px rgba(37,99,235,.1); }
`;
const Txt = styled.textarea`
  width:100%; box-sizing:border-box; padding:.72rem .95rem; min-height:110px; resize:vertical;
  border:1.5px solid ${p=>p.$e?'#ef4444':C.border};
  border-radius:9px; background:#fff; color:${C.navy};
  font-size:.88rem; font-family:inherit; outline:none;
  transition:border-color .15s,box-shadow .15s;
  &:focus{ border-color:${C.primary}; box-shadow:0 0 0 3px rgba(37,99,235,.1); }
  &::placeholder{ color:${C.muted}; }
`;
const FHint = styled.div`font-size:.72rem; color:${p=>p.$e?'#ef4444':C.muted};`;
const CharCnt = styled.div`font-size:.72rem; color:${p=>p.$ok?C.green:C.muted}; text-align:right;`;
const ChipsWrap = styled.div`display:flex; flex-wrap:wrap; gap:.45rem;`;
const Chip = styled.button`
  padding:.38rem .82rem; border-radius:7px; cursor:pointer; font-size:.79rem; font-weight:600;
  border:1.5px solid ${p=>p.$on?C.primary:C.border};
  background:${p=>p.$on?C.primary:'#fff'};
  color:${p=>p.$on?'#fff':C.text};
  transition:all .13s; font-family:inherit;
  &:hover{ border-color:${C.primary}; transform:translateY(-1px); }
`;
const Hr = styled.hr`border:none; border-top:1px solid ${C.border}; margin:1.4rem 0;`;
const BotRow = styled.div`display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem;`;
const SecureNote = styled.div`font-size:.74rem; color:${C.muted}; display:flex; align-items:center; gap:.35rem;`;
const SubmitBtn = styled.button`
  display:inline-flex; align-items:center; gap:.55rem;
  padding:.85rem 1.85rem; border-radius:10px; border:none;
  background:${C.primary}; color:#fff; font-weight:700; font-size:.92rem; cursor:pointer;
  box-shadow:0 6px 18px -2px rgba(37,99,235,.38);
  transition:background .15s,transform .13s,box-shadow .15s;
  &:hover:not(:disabled){ background:${C.primaryDark}; transform:translateY(-2px); }
  &:disabled{ opacity:.6; cursor:not-allowed; }
`;
const SpinI = styled(Loader2)`animation:${spin} 1s linear infinite;`;
const ErrBanner = styled.div`
  display:flex; align-items:center; gap:.5rem;
  background:#fef2f2; border:1px solid #fecaca; border-radius:9px;
  padding:.7rem 1rem; margin-bottom:1rem; font-size:.82rem; color:#dc2626; font-weight:500;
`;
const SuccessWrap = styled.div`
  padding:4rem 2rem; text-align:center;
  display:flex; flex-direction:column; align-items:center; gap:1rem;
`;
const SuccessRing = styled.div`
  width:66px; height:66px; border-radius:50%;
  background:${C.greenBg}; border:2px solid ${C.greenBdr};
  display:flex; align-items:center; justify-content:center; color:${C.green};
  animation:${popIn} .45s cubic-bezier(.22,1,.36,1) both;
`;
const SuccessH = styled.h3`font-size:1.3rem; font-weight:800; color:${C.navy}; margin:0;`;
const SuccessP = styled.p`font-size:.9rem; color:${C.muted}; margin:0; line-height:1.65;`;

/* ─────────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────────── */
const Footer = styled.footer`
  background:${C.navyMid}; padding:1.5rem 2rem; position:relative; z-index:1;
`;
const FooterInner = styled.div`
  max-width:1280px; margin:0 auto;
  display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem;
`;
const FootLogo = styled.div`
  display:flex; align-items:center; gap:.45rem;
  font-weight:800; font-size:.92rem; color:#fff; letter-spacing:-.02em;
  .d { width:7px; height:7px; border-radius:50%; background:${C.primary}; }
`;
const FootLinks = styled.div`display:flex; gap:1.25rem;`;
const FootLink = styled.button`
  background:none; border:none; font-family:inherit; cursor:pointer;
  font-size:.76rem; color:rgba(255,255,255,.35); transition:color .15s;
  &:hover{ color:rgba(255,255,255,.8); }
`;
const FootCopy = styled.div`font-size:.72rem; color:rgba(255,255,255,.2);`;

/* ─────────────────────────────────────────────────────────────
   DONNÉES
───────────────────────────────────────────────────────────── */
const CHANGELOG = [
  {
    date: 'Semaine 1–2 · Avril 2026', accent: C.green,
    badge: { label: 'Corrigé', bg: C.greenBg, c: C.green, bdr: C.greenBdr },
    title: 'Migration Clerk Core 3 — Auth stabilisée',
    desc: 'Déconnexions aléatoires, sessions expirées sans raison, loop de redirection — tous résolus. La nouvelle intégration Core 3 est active en production.',
  },
  {
    date: 'Semaine 2–3 · Avril 2026', accent: C.green,
    badge: { label: 'Corrigé', bg: C.greenBg, c: C.green, bdr: C.greenBdr },
    title: 'Crashs WebRTC sur Chrome et Firefox éliminés',
    desc: 'Race condition dans le handshake ICE identifiée après 3 rapports détaillés de testeurs. Patch déployé, 0 crash signalé depuis.',
  },
  {
    date: 'Semaine 3 · Avril 2026', accent: C.amber,
    badge: { label: 'Amélioré', bg: C.amberBg, c: C.amber, bdr: C.amberBdr },
    title: 'Performance mobile ×3 — bundle réduit de 41 %',
    desc: 'Lazy-loading des composants lourds, code splitting par route, suppression de 6 dépendances inutilisées. Lighthouse passe de 54 à 91.',
  },
  {
    date: 'Semaine 4 · Avril 2026', accent: C.purple,
    badge: { label: 'Refonte', bg: C.purpleBg, c: C.purple, bdr: C.purpleBdr },
    title: 'Interface salle entièrement redessinée',
    desc: 'Contrôles réorganisés selon les retours. Chat latéral déplaçable. Indicateurs de statut micro/caméra visibles en permanence.',
  },
  {
    date: 'Semaine 4–5 · Avril 2026', accent: C.cyan,
    badge: { label: 'Nouveau', bg: C.cyanBg, c: C.cyan, bdr: C.cyanBdr },
    title: 'Statuts de présence temps réel',
    desc: 'Qui parle, qui a coupé son micro, qui partage son écran — visible instantanément dans la liste des participants.',
  },
  {
    date: 'Mai 2026 · En cours', accent: C.primary,
    badge: { label: 'Vague 2', bg: C.softBlue, c: C.primary, bdr: C.blueTint },
    title: 'Transcription automatique + résumé post-réunion',
    desc: 'Fonctionnalité la plus demandée (37 % des retours). IA intégrée nativement — les candidats Vague 2 seront les premiers à la tester.',
  },
];

const COMPARE_ROWS = [
  { feat: 'Stabilité auth',          v1: false, v2: true  },
  { feat: 'WebRTC stable mobile',    v1: false, v2: true  },
  { feat: 'Lighthouse > 85',         v1: false, v2: true  },
  { feat: 'Statuts temps réel',      v1: false, v2: true  },
  { feat: 'Salles de breakout',      v1: true,  v2: true  },
  { feat: 'Chat intégré',            v1: true,  v2: true  },
  { feat: 'Partage d\'écran',        v1: true,  v2: true  },
  { feat: 'Transcription IA',        v1: false, v2: true  },
  { feat: 'Résumé post-réunion',     v1: false, v2: true  },
  { feat: 'API développeur',         v1: false, v2: true  },
  { feat: 'Chiffrement bout-en-bout',v1: false, v2: true  },
];

const FEATURES = [
  {
    icon: <Cpu size={20} />, tag: 'IA native', wide: true,
    accent: C.primary,
    title: 'Transcription & résumé automatique',
    desc: "L'assistant IA intégré transcrit en temps réel et génère un résumé structuré après chaque réunion. Exportable en Markdown ou Notion.",
    items: ['Transcription temps réel', 'Résumé post-réunion', 'Export Markdown/Notion'],
  },
  {
    icon: <Users size={20} />, tag: 'Refonte', wide: false,
    accent: C.purple,
    title: 'Breakout v2',
    desc: 'Entrée/sortie sans interruption, minuteur partagé visible, retour automatique à la salle principale.',
    items: ['Entrée/sortie fluide', 'Minuteur partagé', 'Retour auto'],
  },
  {
    icon: <Shield size={20} />, tag: 'Sécurité', wide: false,
    accent: C.green,
    title: 'Chiffrement E2E',
    desc: 'Activable par salle pour les équipes traitant des données médicales ou juridiques.',
    items: ['E2E par salle', 'Logs RGPD', 'Mode confidentiel'],
  },
  {
    icon: <Code2 size={20} />, tag: 'Bêta only', wide: false,
    accent: C.cyan,
    title: 'API développeur',
    desc: 'Premiers endpoints REST, webhooks et SDK JS — en avant-première pour les testeurs Vague 2.',
    items: ['Webhooks events', 'SDK JavaScript', 'Embeds iFrame'],
  },
  {
    icon: <Globe size={20} />, tag: 'Nouveau', wide: false,
    accent: C.amber,
    title: 'Présence globale',
    desc: 'Infrastructure répartie sur 4 régions. Latence réduite de 60 % pour les équipes en Europe et Amérique.',
    items: ['4 régions actives', 'Latence < 40 ms EU', 'Failover automatique'],
  },
];

const TOOLS = ['Figma','Notion','Slack','GitHub','Linear','VS Code','Jira','Discord','Miro','Loom'];

/* ─────────────────────────────────────────────────────────────
   COMPOSANT
───────────────────────────────────────────────────────────── */
export default function RoomPageNew() {
  const navigate = useNavigate();
  useSafeLayout();

  const [form, setForm] = useState({
    firstName:'', lastName:'', email:'',
    profile:'', usage:'', tools:[], motivation:'',
  });
  const [errors, setErrors]   = useState({});
  const [apiErr, setApiErr]   = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /* scroll-reveal */
  useEffect(() => {
    const io = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('[data-rv]').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  function field(k, v) { setForm(f => ({...f,[k]:v})); setErrors(e => ({...e,[k]:''})); }
  function toggleTool(t) {
    setForm(f => ({...f, tools: f.tools.includes(t) ? f.tools.filter(x=>x!==t) : [...f.tools,t]}));
  }
  function validate() {
    const e = {};
    if (!form.firstName.trim())                           e.firstName  = 'Requis';
    if (!form.lastName.trim())                            e.lastName   = 'Requis';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))  e.email      = 'Email invalide';
    if (!form.profile)                                    e.profile    = 'Requis';
    if (!form.usage)                                      e.usage      = 'Requis';
    if (form.motivation.trim().length < 40)               e.motivation = 'Minimum 40 caractères';
    return e;
  }
  async function submit(ev) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true); setApiErr('');
    try {
      const r = await fetch('/api/beta-apply', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify(form),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Erreur serveur');
      setSuccess(true);
    } catch(err) {
      setApiErr(err.message || 'Une erreur est survenue.');
    } finally { setLoading(false); }
  }
  function goForm() { document.getElementById('candidature')?.scrollIntoView({behavior:'smooth'}); }

  /* Helper pour attach data-rv */
  const rv = (delay=0) => ({ 'data-rv':true, style:{'--d':`${delay}ms`} });

  return (
    <Page>
      <Grid />

      {/* ── NAV ─────────────────────────────────────── */}
      <Nav>
        <NavInner>
          <NavBrand onClick={()=>navigate('/')}>
            <span className="d"/><span className="t">VisiConnect</span>
          </NavBrand>
          <NavMeta>
            <Pill><span className="live"/>15 places disponibles</Pill>
          </NavMeta>
          <NavCta onClick={goForm}><ArrowRight size={14}/>Candidater</NavCta>
        </NavInner>
      </Nav>

      {/* ── HERO ────────────────────────────────────── */}
      <Hero>
        <HeroWrap>
          <HeroLeft>
            <Eyebrow><span className="bar"/>Bêta · Vague 2 ouverte</Eyebrow>
            <HeroH1>
              La Vague&nbsp;1<br/>est <em>terminée.</em><br/>La&nbsp;suite commence.
            </HeroH1>
            <HeroP>
              22 testeurs. 127 retours. 47 bugs corrigés. Le produit a changé.
              Maintenant 15 places s'ouvrent pour aller encore plus loin.
            </HeroP>
            <HeroActions>
              <BtnBlue onClick={goForm}><Rocket size={15}/>Rejoindre la Vague 2</BtnBlue>
              <BtnGhost onClick={()=>navigate('/')}><ArrowLeft size={15}/>Retour au site</BtnGhost>
            </HeroActions>
          </HeroLeft>

          <Panel>
            <PanelTopRow>
              <PanelLabel>Rapport Bêta · Vague 1</PanelLabel>
              <ClosedTag>Clôturée</ClosedTag>
            </PanelTopRow>
            {[
              {l:'Bugs identifiés',         v:'47 / 50', p:94, d:.3},
              {l:'Participation',           v:'22 / 25', p:88, d:.45},
              {l:'Satisfaction globale',    v:'4.2 / 5', p:84, d:.6},
              {l:'Features testées',        v:'12 / 14', p:86, d:.75},
            ].map(m=>(
              <PBar key={m.l}>
                <PBarHead><span className="l">{m.l}</span><span className="v">{m.v}</span></PBarHead>
                <PBarTrack><PBarFill $p={m.p} $d={m.d}/></PBarTrack>
              </PBar>
            ))}
            <PGrid>
              <PCell><div className="n">127</div><div className="l">retours reçus</div></PCell>
              <PCell><div className="n">38</div><div className="l">corrections</div></PCell>
              <PCell><div className="n">15</div><div className="l">places Vague 2</div></PCell>
              <PCell><div className="n">4.2★</div><div className="l">note moyenne</div></PCell>
            </PGrid>
          </Panel>
        </HeroWrap>
      </Hero>

      {/* ── DARK BAND ───────────────────────────────── */}
      <DarkBand>
        <DarkBandInner>
          <DarkCell><BigNum>22<sup>+</sup></BigNum><SmLbl>testeurs actifs</SmLbl></DarkCell>
          <DarkCell><BigNum>47<sup>+</sup></BigNum><SmLbl>bugs identifiés</SmLbl></DarkCell>
          <DarkCell><BigNum>15</BigNum><SmLbl>places Vague 2</SmLbl></DarkCell>
          <DarkCell><BigNum>4.2<sup>★</sup></BigNum><SmLbl>satisfaction</SmLbl></DarkCell>
        </DarkBandInner>
      </DarkBand>

      {/* ── CHANGELOG / TIMELINE ────────────────────── */}
      <SecWhite>
        <W>
          <TimelineLayout>
            <TimelineSidebar>
              <TimelineStickyBox>
                <SBTitle>Légende</SBTitle>
                {[
                  {c:C.green,  label:'Corrigé',  cnt:2},
                  {c:C.amber,  label:'Amélioré', cnt:1},
                  {c:C.purple, label:'Refonte',  cnt:1},
                  {c:C.cyan,   label:'Nouveau',  cnt:1},
                  {c:C.primary,label:'Vague 2',  cnt:1},
                ].map(i=>(
                  <SBItem key={i.label} $c={i.c}>
                    <span className="dot"/>{i.label}<span className="cnt">{i.cnt}</span>
                  </SBItem>
                ))}
              </TimelineStickyBox>
            </TimelineSidebar>

            <div>
              <SecLabel {...rv(0)}>Changelog · Bêta 1</SecLabel>
              <SecH2 {...rv(60)}>Ce qui a changé, dans l'ordre</SecH2>
              <SecP {...rv(120)}>
                Chaque entrée correspond à un lot de correctifs livré en production pendant la Vague&nbsp;1.
                Aucun retour n'est resté sans suite.
              </SecP>
              <TimelineItems>
                {CHANGELOG.map((e,i)=>(
                  <TEntry key={i} $accent={e.accent} {...rv(i*55)}>
                    <TEntryTop>
                      <TEntryLeft>
                        <TEntryDate>{e.date}</TEntryDate>
                        <TEntryTitle>{e.title}</TEntryTitle>
                      </TEntryLeft>
                      <TBadge $bg={e.badge.bg} $c={e.badge.c} $bdr={e.badge.bdr}>{e.badge.label}</TBadge>
                    </TEntryTop>
                    <TEntryDesc>{e.desc}</TEntryDesc>
                  </TEntry>
                ))}
              </TimelineItems>
            </div>
          </TimelineLayout>
        </W>
      </SecWhite>

      {/* ── TABLE COMPARAISON ───────────────────────── */}
      <SecBlue>
        <W>
          <SecLabel {...rv(0)}>Comparaison</SecLabel>
          <SecH2 {...rv(60)}>Vague 1 vs Vague 2</SecH2>
          <SecP {...rv(120)}>Ce que vous avez testé, et ce qui arrive maintenant.</SecP>
          <CompareWrap {...rv(180)}>
            <CompareHead>
              <CH>Fonctionnalité</CH>
              <CH>Vague 1</CH>
              <CH $hi>Vague 2</CH>
            </CompareHead>
            {COMPARE_ROWS.map((r,i)=>(
              <CompareRow key={i}>
                <CR><span className="feat">{r.feat}</span></CR>
                <CR>
                  <Tick $yes={r.v1}>
                    {r.v1 ? <Check size={11}/> : <X size={11}/>}
                  </Tick>
                </CR>
                <CR $hi>
                  <Tick $yes={r.v2}>
                    {r.v2 ? <Check size={11}/> : <X size={11}/>}
                  </Tick>
                </CR>
              </CompareRow>
            ))}
          </CompareWrap>
        </W>
      </SecBlue>

      {/* ── FEATURES VAGUE 2 ────────────────────────── */}
      <SecWhite>
        <W>
          <SecLabel {...rv(0)}>Vague 2</SecLabel>
          <SecH2 {...rv(60)}>Ce qui arrive dans la prochaine vague</SecH2>
          <SecP {...rv(120)}>Plus ciblée, plus ambitieuse — avec un produit significativement plus solide.</SecP>
          <Bento>
            {FEATURES.map((f,i)=>(
              <BCard key={i} $accent={f.accent} $wide={f.wide} {...rv(i*70)}>
                <BIco style={{background:f.accent==='#2563eb'?C.softBlue:f.accent==='#7c3aed'?C.purpleBg:f.accent==='#16a34a'?C.greenBg:f.accent==='#0891b2'?C.cyanBg:C.amberBg, borderColor:f.accent==='#2563eb'?C.blueTint:f.accent==='#7c3aed'?C.purpleBdr:f.accent==='#16a34a'?C.greenBdr:f.accent==='#0891b2'?C.cyanBdr:C.amberBdr, color:f.accent}}>{f.icon}</BIco>
                <BTag style={{background:f.accent==='#2563eb'?C.softBlue:f.accent==='#7c3aed'?C.purpleBg:f.accent==='#16a34a'?C.greenBg:f.accent==='#0891b2'?C.cyanBg:C.amberBg, color:f.accent, borderColor:f.accent==='#2563eb'?C.blueTint:f.accent==='#7c3aed'?C.purpleBdr:f.accent==='#16a34a'?C.greenBdr:f.accent==='#0891b2'?C.cyanBdr:C.amberBdr}}>{f.tag}</BTag>
                <BTitle>{f.title}</BTitle>
                <BDesc>{f.desc}</BDesc>
                <BList>{f.items.map((it,j)=><BLi key={j}>{it}</BLi>)}</BList>
              </BCard>
            ))}
          </Bento>
        </W>
      </SecWhite>

      {/* ── CRITÈRES — fond navy ─────────────────────── */}
      <SecNavy>
        <W>
          <CriteriaGrid>
            <CriteriaLeft>
              <SecLabel style={{'--d':'0ms'}} {...rv(0)} css="color:rgba(255,255,255,.4); &::before{background:rgba(255,255,255,.25);}">
                Sélection
              </SecLabel>
              <SecH2W {...rv(60)}>Ce que je cherche dans la Vague&nbsp;2</SecH2W>
              <SecPW {...rv(120)}>
                15 places. Des critères honnêtes, pas une loterie.
                Si vous cochez ces trois points, votre dossier a toutes ses chances.
              </SecPW>
              <div {...rv(180)} style={{display:'flex',gap:'.6rem',flexWrap:'wrap'}}>
                <span style={{fontSize:'.75rem',color:'rgba(255,255,255,.35)',fontWeight:600}}>Durée estimée :</span>
                <span style={{fontSize:'.75rem',color:'rgba(255,255,255,.6)',fontWeight:700}}>4–6 semaines</span>
              </div>
            </CriteriaLeft>
            <CriteriaItems>
              {[
                {
                  n:'01', title:'Engagement régulier',
                  desc:"Revenir d'une semaine à l'autre. Utiliser le produit même imparfait. Pas une inscription puis plus rien — le silence n'aide pas.",
                },
                {
                  n:'02', title:'Retours structurés',
                  desc:"Pas besoin d'être développeur. Mais « ça marche pas » ne suffit pas. Reproduire, décrire le contexte, proposer une piste — c'est tout ce qu'il faut.",
                },
                {
                  n:'03', title:"Cas d'usage réel",
                  desc:"Startup, agence, équipe remote, freelance — un vrai contexte produit. Les retours de terrain valent infiniment plus que les tests en laboratoire.",
                },
              ].map((c,i)=>(
                <CItem key={i} {...rv(i*110)}>
                  <CNum>{c.n}</CNum>
                  <CBody><CTitle>{c.title}</CTitle><CDesc>{c.desc}</CDesc></CBody>
                </CItem>
              ))}
            </CriteriaItems>
          </CriteriaGrid>
        </W>
      </SecNavy>

      {/* ── FORMULAIRE ──────────────────────────────── */}
      <FormSection id="candidature">
        <W>
          <div style={{maxWidth:820, margin:'0 auto 2rem', textAlign:'center'}}>
            <SecLabel {...rv(0)} style={{justifyContent:'center','--d':'0ms'}}><Sparkles size={11}/>Candidature ouverte</SecLabel>
            <SecH2 {...rv(60)} style={{textAlign:'center'}}>Rejoindre la Vague 2</SecH2>
            <SecP {...rv(120)} style={{margin:'0 auto',textAlign:'center'}}>
              Dossier lu personnellement · Réponse sous 72h · 15 places
            </SecP>
          </div>

          <FormBox>
            {success ? (
              <SuccessWrap>
                <SuccessRing><CheckCircle2 size={28}/></SuccessRing>
                <SuccessH>Candidature envoyée !</SuccessH>
                <SuccessP>Merci. Je lis chaque dossier personnellement<br/>et vous recontacte sous 72h.</SuccessP>
                <BtnBlue onClick={()=>navigate('/')} style={{marginTop:'.5rem'}}>
                  <ArrowLeft size={14}/>Retour à l'accueil
                </BtnBlue>
              </SuccessWrap>
            ) : (
              <>
                <FormHeader>
                  <div>
                    <FormHTitle>Formulaire de candidature</FormHTitle>
                    <FormHSub>Vague 2 · sélection en cours</FormHSub>
                  </div>
                  <SlotBox><Clock size={12}/><span><span>15</span> places · {new Date().toLocaleDateString('fr-FR',{month:'long',year:'numeric'})}</span></SlotBox>
                </FormHeader>

                <FormBody>
                  <form onSubmit={submit} noValidate>
                    {apiErr && <ErrBanner><AlertCircle size={14}/>{apiErr}</ErrBanner>}

                    <FRow $c="1fr 1fr">
                      <FG>
                        <Lbl>Prénom<Req>*</Req></Lbl>
                        <Inp $e={errors.firstName} value={form.firstName} onChange={ev=>field('firstName',ev.target.value)} placeholder="Votre prénom"/>
                        {errors.firstName && <FHint $e>{errors.firstName}</FHint>}
                      </FG>
                      <FG>
                        <Lbl>Nom<Req>*</Req></Lbl>
                        <Inp $e={errors.lastName} value={form.lastName} onChange={ev=>field('lastName',ev.target.value)} placeholder="Votre nom"/>
                        {errors.lastName && <FHint $e>{errors.lastName}</FHint>}
                      </FG>
                    </FRow>

                    <FRow>
                      <FG>
                        <Lbl>Email<Req>*</Req></Lbl>
                        <Inp type="email" $e={errors.email} value={form.email} onChange={ev=>field('email',ev.target.value)} placeholder="votre@email.com"/>
                        {errors.email && <FHint $e>{errors.email}</FHint>}
                      </FG>
                    </FRow>

                    <FRow $c="1fr 1fr">
                      <FG>
                        <Lbl>Profil<Req>*</Req></Lbl>
                        <Sel $e={errors.profile} value={form.profile} onChange={ev=>field('profile',ev.target.value)}>
                          <option value="">Sélectionner…</option>
                          <option value="developer">Développeur·se</option>
                          <option value="designer">Designer UX/UI</option>
                          <option value="pm">Product Manager</option>
                          <option value="founder">Fondateur·trice</option>
                          <option value="other">Autre</option>
                        </Sel>
                        {errors.profile && <FHint $e>{errors.profile}</FHint>}
                      </FG>
                      <FG>
                        <Lbl>Usage principal<Req>*</Req></Lbl>
                        <Sel $e={errors.usage} value={form.usage} onChange={ev=>field('usage',ev.target.value)}>
                          <option value="">Sélectionner…</option>
                          <option value="team-meetings">Réunions d'équipe</option>
                          <option value="client-calls">Appels clients</option>
                          <option value="education">Enseignement / formation</option>
                          <option value="dev-collab">Collaboration dev</option>
                          <option value="other">Autre</option>
                        </Sel>
                        {errors.usage && <FHint $e>{errors.usage}</FHint>}
                      </FG>
                    </FRow>

                    <FRow>
                      <FG>
                        <Lbl>Outils utilisés au quotidien</Lbl>
                        <ChipsWrap>
                          {TOOLS.map(t=>(
                            <Chip key={t} type="button" $on={form.tools.includes(t)} onClick={()=>toggleTool(t)}>{t}</Chip>
                          ))}
                        </ChipsWrap>
                      </FG>
                    </FRow>

                    <Hr/>

                    <FRow>
                      <FG>
                        <Lbl>Pourquoi rejoindre la Vague 2 ?<Req>*</Req></Lbl>
                        <Txt $e={errors.motivation} value={form.motivation} rows={5}
                          onChange={ev=>field('motivation',ev.target.value)}
                          placeholder="Décrivez votre contexte, votre usage envisagé et ce que vous pouvez apporter comme testeur…"/>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                          {errors.motivation ? <FHint $e>{errors.motivation}</FHint> : <FHint>Minimum 40 caractères.</FHint>}
                          <CharCnt $ok={form.motivation.trim().length>=40}>{form.motivation.trim().length}&nbsp;/&nbsp;40+</CharCnt>
                        </div>
                      </FG>
                    </FRow>

                    <BotRow>
                      <SecureNote><Shield size={12}/>Données confidentielles — aucune revente.</SecureNote>
                      <SubmitBtn type="submit" disabled={loading}>
                        {loading ? <><SpinI size={15}/>Envoi…</> : <><Send size={15}/>Envoyer ma candidature</>}
                      </SubmitBtn>
                    </BotRow>
                  </form>
                </FormBody>
              </>
            )}
          </FormBox>
        </W>
      </FormSection>

      {/* ── FOOTER ──────────────────────────────────── */}
      <Footer>
        <FooterInner>
          <FootLogo><span className="d"/>VisiConnect</FootLogo>
          <FootLinks>
            <FootLink onClick={()=>navigate('/legal/privacy')}>Confidentialité</FootLink>
            <FootLink onClick={()=>navigate('/legal/terms')}>CGU</FootLink>
            <FootLink onClick={()=>navigate('/contact')}>Contact</FootLink>
          </FootLinks>
          <FootCopy>© {new Date().getFullYear()} VisiConnect</FootCopy>
        </FooterInner>
      </Footer>
    </Page>
  );
}
