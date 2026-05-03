import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import {
  Sparkles, Users, CheckCircle2, ArrowLeft, Send, Loader2, AlertCircle,
  Rocket, Shield, Clock, Code2, Cpu, Globe, Check, X, ArrowRight, MessageSquare,
} from 'lucide-react';
import { useSafeLayout } from '../hooks/useSafeLayout';

/* ═══════════════════════════════════════════════════════════
   PALETTE — 100 % clair, zéro fond sombre
═══════════════════════════════════════════════════════════ */
const C = {
  primary:     '#2563eb',
  primaryDark: '#1d4ed8',
  navy:        '#0f172a',
  slate:       '#334155',
  text:        '#374151',
  muted:       '#6b7280',
  border:      '#e5e7eb',
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

/* ═══════════════════════════════════════════════════════════
   KEYFRAMES
═══════════════════════════════════════════════════════════ */
const fadeUp = keyframes`
  from { opacity:0; transform:translateY(22px); }
  to   { opacity:1; transform:translateY(0); }
`;
const pulseDot = keyframes`
  0%,100% { transform:scale(1); opacity:1; }
  50%      { transform:scale(1.6); opacity:.3; }
`;
const barIn  = keyframes`from { width:0%; }`;
const spin   = keyframes`to { transform:rotate(360deg); }`;
const popIn  = keyframes`
  0%   { transform:scale(0) rotate(-15deg); opacity:0; }
  60%  { transform:scale(1.1) rotate(2deg); }
  100% { transform:scale(1); opacity:1; }
`;
const slideIn = keyframes`
  from { opacity:0; transform:translateX(-10px); }
  to   { opacity:1; transform:translateX(0); }
`;

const reveal = css`
  opacity:0; transform:translateY(24px);
  transition:opacity .6s ease, transform .6s cubic-bezier(.22,1,.36,1);
  transition-delay:var(--d,0ms); will-change:opacity,transform;
  &.on { opacity:1; transform:translateY(0); }
  @media(prefers-reduced-motion:reduce){ opacity:1; transform:none; transition:none; }
`;

/* ═══════════════════════════════════════════════════════════
   PAGE SHELL
═══════════════════════════════════════════════════════════ */
const Page = styled.div`
  min-height:100vh;
  background:#fff;
  color:${C.navy};
  font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;
  overflow-x:hidden;
`;
const DotGrid = styled.div`
  position:fixed; inset:0; pointer-events:none; z-index:0;
  background-image:radial-gradient(circle,#cbd5e1 1px,transparent 1px);
  background-size:32px 32px; opacity:.17;
`;

/* ═══════════════════════════════════════════════════════════
   SCROLL PROGRESS
═══════════════════════════════════════════════════════════ */
const ProgressLine = styled.div`
  position:fixed; top:0; left:0; z-index:500;
  height:2px; background:${C.primary};
  width:${p => p.$pct}%;
  transition:width .08s linear;
  box-shadow:0 0 10px rgba(37,99,235,.45);
`;

/* ═══════════════════════════════════════════════════════════
   NAV
═══════════════════════════════════════════════════════════ */
const Nav = styled.nav`
  position:sticky; top:0; z-index:200;
  background:rgba(255,255,255,.97); backdrop-filter:blur(16px);
  border-bottom:1px solid ${C.border};
  transition:box-shadow .25s;
  ${p => p.$up && `box-shadow:0 4px 20px rgba(15,23,42,.07);`}
`;
const NavInner = styled.div`
  max-width:1200px; margin:0 auto; padding:.88rem 2rem;
  display:flex; align-items:center; gap:2rem;
  @media(max-width:640px){ padding:.88rem 1.25rem; gap:1rem; }
`;
const NavBrand = styled.button`
  background:none; border:none; cursor:pointer; padding:0; flex-shrink:0;
  display:flex; align-items:center; gap:.5rem;
  font-weight:800; font-size:.97rem; letter-spacing:-.03em; color:${C.navy};
  .dot { width:8px; height:8px; border-radius:50%; background:${C.primary}; }
  .name { transition:color .15s; }
  &:hover .name { color:${C.primary}; }
`;
const NavLinks = styled.div`
  display:flex; align-items:center; gap:.1rem;
  @media(max-width:680px){ display:none; }
`;
const NL = styled.a`
  padding:.42rem .78rem; border-radius:7px;
  font-size:.82rem; font-weight:600; color:${C.muted};
  text-decoration:none; cursor:pointer;
  transition:color .15s, background .15s;
  &:hover { color:${C.primary}; background:${C.softBlue}; }
`;
const NavRight = styled.div`
  display:flex; align-items:center; gap:.65rem; margin-left:auto;
`;
const OpenPill = styled.div`
  display:inline-flex; align-items:center; gap:.4rem;
  font-size:.72rem; font-weight:700; padding:.28rem .72rem;
  border-radius:999px; background:${C.greenBg}; border:1px solid ${C.greenBdr}; color:${C.green};
  white-space:nowrap;
  .dot { width:5px; height:5px; border-radius:50%; background:${C.green}; animation:${pulseDot} 1.8s ease infinite; }
  @media(max-width:500px){ display:none; }
`;
const NavCta = styled.button`
  display:inline-flex; align-items:center; gap:.4rem;
  padding:.52rem 1.1rem; border-radius:9px; border:none;
  background:${C.primary}; color:#fff; font-weight:700; font-size:.83rem; cursor:pointer;
  transition:background .15s, transform .12s; font-family:inherit;
  &:hover { background:${C.primaryDark}; transform:translateY(-1px); }
`;

/* ═══════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════ */
const Hero = styled.section`
  background:#fff; border-bottom:1px solid ${C.border};
  padding:5.5rem 2rem 5rem; position:relative; z-index:1;
  @media(max-width:640px){ padding:4rem 1.25rem 3.5rem; }
`;
const HeroWrap = styled.div`
  max-width:1200px; margin:0 auto;
  display:grid; grid-template-columns:minmax(0,1.25fr) minmax(0,.75fr);
  gap:5rem; align-items:center;
  @media(max-width:900px){ grid-template-columns:1fr; gap:2.5rem; }
`;
const HeroLeft = styled.div`animation:${fadeUp} .7s cubic-bezier(.22,1,.36,1) both;`;
const Eyebrow = styled.div`
  display:inline-flex; align-items:center; gap:.45rem;
  font-size:.73rem; font-weight:700; letter-spacing:.07em; text-transform:uppercase;
  color:${C.primary}; margin-bottom:1.3rem;
  background:${C.softBlue}; border:1px solid ${C.blueTint}; border-radius:999px;
  padding:.32rem .85rem .32rem .65rem;
  .dot { width:5px; height:5px; border-radius:50%; background:${C.primary}; animation:${pulseDot} 2s ease infinite; }
`;
const H1 = styled.h1`
  font-size:clamp(2.4rem,4.5vw,3.75rem);
  font-weight:900; letter-spacing:-.055em; line-height:1.07;
  color:${C.navy}; margin:0 0 1.1rem;
  em { color:${C.primary}; font-style:normal; }
`;
const HeroP = styled.p`
  font-size:1.02rem; color:${C.muted}; line-height:1.82;
  max-width:475px; margin:0 0 2.25rem;
`;
const HeroActions = styled.div`display:flex; gap:.85rem; flex-wrap:wrap;`;
const BtnPrimary = styled.button`
  display:inline-flex; align-items:center; gap:.5rem;
  padding:.85rem 1.6rem; border-radius:10px; border:none;
  background:${C.primary}; color:#fff; font-weight:700; font-size:.9rem; cursor:pointer;
  box-shadow:0 6px 20px -2px rgba(37,99,235,.35); font-family:inherit;
  transition:background .15s, transform .12s, box-shadow .15s;
  &:hover { background:${C.primaryDark}; transform:translateY(-2px); box-shadow:0 14px 30px -2px rgba(37,99,235,.42); }
`;
const BtnOutline = styled.button`
  display:inline-flex; align-items:center; gap:.5rem;
  padding:.85rem 1.45rem; border-radius:10px;
  border:1.5px solid ${C.border}; background:#fff; color:${C.slate};
  font-weight:700; font-size:.9rem; cursor:pointer; font-family:inherit;
  transition:border-color .15s, color .15s, transform .12s;
  &:hover { border-color:${C.primary}; color:${C.primary}; transform:translateY(-2px); }
`;

/* Panel rapport bêta */
const Panel = styled.div`
  background:#fff; border:1px solid ${C.border};
  border-top:3px solid ${C.primary};
  border-radius:0 0 16px 16px;
  box-shadow:0 24px 60px rgba(15,23,42,.09);
  animation:${fadeUp} .72s .12s cubic-bezier(.22,1,.36,1) both;
  @media(max-width:900px){ display:none; }
`;
const PHead = styled.div`
  background:${C.softBlue}; border-bottom:1px solid ${C.blueTint};
  padding:1rem 1.4rem;
  display:flex; align-items:center; justify-content:space-between;
`;
const PTitle  = styled.div`font-size:.79rem; font-weight:800; color:${C.navy};`;
const PBadge  = styled.div`
  font-size:.68rem; font-weight:700; padding:.2rem .6rem;
  border-radius:6px; background:#fff; color:${C.primary}; border:1px solid ${C.blueTint};
`;
const PBody   = styled.div`padding:1.3rem 1.4rem;`;
const PBar    = styled.div`margin-bottom:.8rem;`;
const PBarTop = styled.div`
  display:flex; justify-content:space-between; margin-bottom:.3rem;
  .l { font-size:.72rem; color:${C.muted}; font-weight:500; }
  .v { font-size:.72rem; color:${C.navy}; font-weight:800; }
`;
const PBarTrack = styled.div`height:5px; background:${C.border}; border-radius:99px; overflow:hidden;`;
const PBarFill  = styled.div`
  height:100%; border-radius:99px;
  background:${p => p.$c || C.primary};
  width:${p => p.$p}%;
  animation:${barIn} 1.2s ${p => p.$d || 0}s cubic-bezier(.22,1,.36,1) both;
`;
const PMini = styled.div`display:grid; grid-template-columns:1fr 1fr; gap:.5rem; margin-top:.9rem;`;
const PCell = styled.div`
  background:${C.softBlue}; border:1px solid ${C.blueTint};
  border-radius:10px; padding:.7rem .85rem;
  .n { font-size:1.28rem; font-weight:900; color:${C.primary}; line-height:1; }
  .l { font-size:.67rem; color:${C.muted}; margin-top:3px; }
`;

/* ═══════════════════════════════════════════════════════════
   STATS BAND — fond #eff6ff (clair)
═══════════════════════════════════════════════════════════ */
const StatsBand = styled.div`
  background:${C.softBlue}; border-bottom:1px solid ${C.blueTint};
  position:relative; z-index:1;
`;
const StatsInner = styled.div`
  max-width:1200px; margin:0 auto;
  display:grid; grid-template-columns:repeat(4,1fr);
  @media(max-width:580px){ grid-template-columns:repeat(2,1fr); }
`;
const StatCell = styled.div`
  ${reveal}
  padding:2rem 1.5rem; text-align:center;
  border-right:1px solid ${C.blueTint};
  &:last-child { border-right:none; }
  @media(max-width:580px){
    &:nth-child(2){ border-right:none; }
    border-bottom:1px solid ${C.blueTint};
    &:nth-child(3),&:nth-child(4){ border-bottom:none; }
  }
`;
const StatNum = styled.div`
  font-size:clamp(1.75rem,3vw,2.6rem); font-weight:900;
  letter-spacing:-.05em; line-height:1; color:${C.navy}; margin-bottom:.3rem;
  sup { font-size:.48em; color:${C.primary}; vertical-align:super; }
`;
const StatLbl = styled.div`font-size:.74rem; color:${C.muted}; font-weight:500; line-height:1.4;`;

/* ═══════════════════════════════════════════════════════════
   SECTIONS
═══════════════════════════════════════════════════════════ */
const Sec = styled.section`
  background:#fff; border-bottom:1px solid ${C.border};
  padding:5rem 2rem; position:relative; z-index:1;
  @media(max-width:640px){ padding:3.5rem 1.25rem; }
`;
const SecAlt = styled(Sec)`
  background:${C.softBlue}; border-color:${C.blueTint};
`;
const W = styled.div`max-width:1200px; margin:0 auto;`;
const SecEyebrow = styled.div`
  ${reveal}
  display:inline-flex; align-items:center; gap:.45rem;
  font-size:.71rem; font-weight:800; text-transform:uppercase; letter-spacing:.09em;
  color:${C.primary}; margin-bottom:.55rem;
  &::before { content:''; display:block; width:16px; height:2px; background:${C.primary}; border-radius:1px; }
`;
const SecH = styled.h2`
  ${reveal}
  font-size:clamp(1.65rem,2.6vw,2.38rem); font-weight:900;
  letter-spacing:-.04em; color:${C.navy}; margin:0 0 .45rem; line-height:1.15;
`;
const SecSub = styled.p`
  ${reveal}
  font-size:.92rem; color:${C.muted}; line-height:1.78; max-width:520px; margin:0 0 2.75rem;
`;

/* ═══════════════════════════════════════════════════════════
   CHANGELOG / TIMELINE
═══════════════════════════════════════════════════════════ */
const TLWrap = styled.div`
  display:grid; grid-template-columns:200px 1fr; gap:3.5rem;
  @media(max-width:780px){ grid-template-columns:1fr; gap:2rem; }
`;
const TLSide = styled.div`@media(max-width:780px){ display:none; }`;
const TLBox  = styled.div`
  position:sticky; top:5.5rem;
  background:#fff; border:1px solid ${C.border};
  border-left:3px solid ${C.primary}; border-radius:0 12px 12px 0; padding:1.25rem;
`;
const TLBoxTitle = styled.div`font-size:.76rem; font-weight:800; color:${C.navy}; margin-bottom:.9rem;`;
const TLBoxItem  = styled.div`
  display:flex; align-items:center; gap:.5rem;
  font-size:.74rem; font-weight:600; color:${C.muted};
  padding:.32rem 0; border-bottom:1px dashed ${C.border};
  &:last-child{ border-bottom:none; }
  .dot { width:7px; height:7px; border-radius:50%; background:${p => p.$c || C.primary}; flex-shrink:0; }
`;
const TLItems = styled.div`display:flex; flex-direction:column; gap:.65rem;`;
const TLCard  = styled.div`
  ${reveal}
  background:#fff; border:1px solid ${C.border};
  border-left:3px solid ${p => p.$a || C.primary};
  border-radius:0 14px 14px 0; padding:1.4rem 1.6rem;
  transition:transform .2s, box-shadow .2s;
  &:hover { transform:translateX(5px); box-shadow:0 10px 28px rgba(15,23,42,.07); }
`;
const TLTop   = styled.div`display:flex; align-items:flex-start; justify-content:space-between; gap:.75rem; margin-bottom:.5rem;`;
const TLLeft  = styled.div`flex:1;`;
const TLDate  = styled.div`font-size:.68rem; font-weight:700; letter-spacing:.05em; text-transform:uppercase; color:${C.muted}; margin-bottom:.25rem;`;
const TLTitle = styled.div`font-size:.93rem; font-weight:700; color:${C.navy};`;
const TLBadge = styled.span`
  font-size:.66rem; font-weight:800; padding:.18rem .52rem; border-radius:6px; white-space:nowrap; flex-shrink:0;
  background:${p => p.$bg}; color:${p => p.$c}; border:1px solid ${p => p.$bdr};
`;
const TLDesc  = styled.div`font-size:.82rem; color:${C.muted}; line-height:1.7;`;
const TLQuote = styled.div`
  margin-top:.85rem; padding:.65rem .95rem;
  background:${C.softBlue}; border:1px solid ${C.blueTint}; border-radius:8px;
  font-size:.79rem; color:${C.primary}; line-height:1.65; font-style:italic;
  animation:${slideIn} .4s ease both;
  &::before { content:'"'; font-style:normal; font-weight:900; font-size:1.1em; margin-right:.15rem; }
`;

/* ═══════════════════════════════════════════════════════════
   COMPARE TABLE — header clair
═══════════════════════════════════════════════════════════ */
const CmpWrap = styled.div`
  ${reveal}
  border:1px solid ${C.border}; border-radius:14px; overflow:hidden;
  box-shadow:0 8px 32px rgba(15,23,42,.05);
`;
const CmpHead = styled.div`
  display:grid; grid-template-columns:1fr 1fr 1fr;
  background:${C.softBlue}; border-bottom:2px solid ${C.blueTint};
`;
const CmpH = styled.div`
  padding:.9rem 1.25rem; font-size:.77rem; font-weight:800;
  text-transform:uppercase; letter-spacing:.07em;
  color:${p => p.$hi ? C.primary : C.slate};
  border-right:1px solid ${C.blueTint};
  &:last-child { border-right:none; }
  ${p => p.$hi && `background:rgba(37,99,235,.07); border-top:2px solid ${C.primary};`}
`;
const CmpRow  = styled.div`
  display:grid; grid-template-columns:1fr 1fr 1fr;
  border-bottom:1px solid ${C.border};
  &:last-child { border-bottom:none; }
  &:nth-child(even) { background:${C.bg}; }
`;
const CmpCell = styled.div`
  padding:.82rem 1.25rem; font-size:.82rem;
  border-right:1px solid ${C.border}; display:flex; align-items:center; gap:.5rem;
  &:last-child { border-right:none; }
  ${p => p.$hi && `background:rgba(37,99,235,.03);`}
  .feat { color:${C.slate}; font-weight:600; }
`;
const Tick = styled.div`
  width:20px; height:20px; border-radius:50%; flex-shrink:0;
  background:${p => p.$yes ? C.greenBg : '#fef2f2'};
  border:1px solid ${p => p.$yes ? C.greenBdr : '#fecaca'};
  color:${p => p.$yes ? C.green : '#dc2626'};
  display:flex; align-items:center; justify-content:center;
`;

/* ═══════════════════════════════════════════════════════════
   BENTO FEATURES
═══════════════════════════════════════════════════════════ */
const Bento = styled.div`
  display:grid; grid-template-columns:repeat(3,1fr); gap:1rem;
  @media(max-width:860px){ grid-template-columns:1fr 1fr; }
  @media(max-width:540px){ grid-template-columns:1fr; }
`;
const BCard = styled.div`
  ${reveal}
  background:#fff; border:1px solid ${C.border};
  border-top:3px solid ${p => p.$a || C.primary};
  border-radius:0 0 14px 14px; padding:1.7rem;
  transition:transform .2s, box-shadow .2s;
  &:hover { transform:translateY(-5px); box-shadow:0 20px 48px rgba(15,23,42,.09); }
  @media(min-width:861px){ ${p => p.$wide && `grid-column:span 2;`} }
`;
const BIco   = styled.div`
  width:44px; height:44px; border-radius:11px;
  background:${p => p.$bg}; border:1px solid ${p => p.$bdr};
  display:flex; align-items:center; justify-content:center; color:${p => p.$c};
  margin-bottom:1rem;
`;
const BTag   = styled.div`
  display:inline-block; font-size:.67rem; font-weight:800; padding:.18rem .55rem;
  border-radius:5px; background:${p => p.$bg}; color:${p => p.$c}; border:1px solid ${p => p.$bdr};
  margin-bottom:.55rem; text-transform:uppercase; letter-spacing:.05em;
`;
const BTitle = styled.div`font-size:.97rem; font-weight:700; color:${C.navy}; margin-bottom:.35rem;`;
const BDesc  = styled.div`font-size:.81rem; color:${C.muted}; line-height:1.68;`;
const BList  = styled.ul`list-style:none; margin:.85rem 0 0; padding:0; display:flex; flex-direction:column; gap:.4rem;`;
const BLi    = styled.li`
  display:flex; align-items:center; gap:.5rem; font-size:.79rem; color:${C.text};
  &::before { content:''; display:block; width:5px; height:5px; border-radius:50%; background:${p => p.$c || C.primary}; flex-shrink:0; }
`;

/* ═══════════════════════════════════════════════════════════
   CRITÈRES — fond clair (#eff6ff)
═══════════════════════════════════════════════════════════ */
const CGrid = styled.div`
  display:grid; grid-template-columns:320px 1fr; gap:5rem; align-items:start;
  @media(max-width:840px){ grid-template-columns:1fr; gap:2.5rem; }
`;
const CItems = styled.div`display:flex; flex-direction:column; gap:.75rem;`;
const CCard  = styled.div`
  ${reveal}
  background:#fff; border:1px solid ${C.border};
  border-left:3px solid ${p => p.$c || C.primary};
  border-radius:0 12px 12px 0; padding:1.4rem 1.75rem;
  display:flex; gap:1.1rem; align-items:flex-start;
  transition:transform .18s, box-shadow .18s;
  &:hover { transform:translateX(4px); box-shadow:0 8px 24px rgba(15,23,42,.07); }
`;
const CNum   = styled.div`font-size:1.4rem; font-weight:900; color:${p => p.$c || C.primary}; line-height:1; flex-shrink:0; min-width:1.8rem;`;
const CBody  = styled.div``;
const CTitle = styled.div`font-size:.94rem; font-weight:700; color:${C.navy}; margin-bottom:.28rem;`;
const CDesc  = styled.div`font-size:.81rem; color:${C.muted}; line-height:1.7;`;

/* ═══════════════════════════════════════════════════════════
   FORMULAIRE
═══════════════════════════════════════════════════════════ */
const FormSec = styled.section`
  background:#fff; border-top:1px solid ${C.border};
  padding:5.5rem 2rem 6rem; position:relative; z-index:1;
  @media(max-width:640px){ padding:3.5rem 1.25rem 5rem; }
`;
const FormBox = styled.div`
  max-width:820px; margin:0 auto;
  border:1px solid ${C.border}; border-top:3px solid ${C.primary};
  border-radius:0 0 18px 18px;
  box-shadow:0 32px 80px rgba(15,23,42,.08); overflow:hidden;
`;
const FHead = styled.div`
  background:${C.softBlue}; border-bottom:1px solid ${C.blueTint};
  padding:1.75rem 2.25rem;
  display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem;
`;
const FHTitle = styled.div`font-size:1.08rem; font-weight:800; color:${C.navy}; letter-spacing:-.02em;`;
const FHSub   = styled.div`font-size:.79rem; color:${C.muted}; margin-top:.15rem;`;
const SlotBox = styled.div`
  display:inline-flex; align-items:center; gap:.4rem;
  font-size:.74rem; font-weight:700; color:${C.navy};
  background:#fff; border:1px solid ${C.border}; border-radius:9px; padding:.42rem .8rem; white-space:nowrap;
  span { color:${C.primary}; }
`;
const FBody  = styled.div`padding:1.9rem 2.25rem 2.25rem; background:#fff;`;
const FRow   = styled.div`
  display:grid; grid-template-columns:${p => p.$c || '1fr'}; gap:1rem; margin-bottom:1.1rem;
  @media(max-width:520px){ grid-template-columns:1fr; }
`;
const FG     = styled.div`display:flex; flex-direction:column; gap:.35rem;`;
const Lbl    = styled.label`font-size:.76rem; font-weight:700; color:${C.text};`;
const Req    = styled.span`color:${C.primary}; margin-left:1px;`;
const Inp    = styled.input`
  width:100%; box-sizing:border-box; padding:.72rem .95rem;
  border:1.5px solid ${p => p.$e ? '#ef4444' : C.border}; border-radius:9px;
  background:#fff; color:${C.navy}; font-size:.88rem; font-family:inherit; outline:none;
  transition:border-color .15s, box-shadow .15s;
  &:focus { border-color:${C.primary}; box-shadow:0 0 0 3px rgba(37,99,235,.1); }
  &::placeholder { color:${C.muted}; }
`;
const Sel    = styled.select`
  width:100%; box-sizing:border-box; padding:.72rem .95rem;
  border:1.5px solid ${p => p.$e ? '#ef4444' : C.border}; border-radius:9px;
  background:#fff; color:${C.navy}; font-size:.88rem; font-family:inherit; outline:none; appearance:none; cursor:pointer;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat:no-repeat; background-position:right .9rem center;
  transition:border-color .15s, box-shadow .15s;
  &:focus { border-color:${C.primary}; box-shadow:0 0 0 3px rgba(37,99,235,.1); }
`;
const Txt    = styled.textarea`
  width:100%; box-sizing:border-box; padding:.72rem .95rem; min-height:110px; resize:vertical;
  border:1.5px solid ${p => p.$e ? '#ef4444' : C.border}; border-radius:9px;
  background:#fff; color:${C.navy}; font-size:.88rem; font-family:inherit; outline:none;
  transition:border-color .15s, box-shadow .15s;
  &:focus { border-color:${C.primary}; box-shadow:0 0 0 3px rgba(37,99,235,.1); }
  &::placeholder { color:${C.muted}; }
`;
const FHint  = styled.div`font-size:.72rem; color:${p => p.$e ? '#ef4444' : C.muted};`;
const CharCnt= styled.div`font-size:.72rem; color:${p => p.$ok ? C.green : C.muted}; text-align:right;`;
const CWrap  = styled.div`display:flex; flex-wrap:wrap; gap:.45rem;`;
const Chip   = styled.button`
  padding:.38rem .82rem; border-radius:7px; cursor:pointer; font-size:.79rem; font-weight:600; font-family:inherit;
  border:1.5px solid ${p => p.$on ? C.primary : C.border};
  background:${p => p.$on ? C.primary : '#fff'};
  color:${p => p.$on ? '#fff' : C.text};
  transition:all .13s;
  &:hover { border-color:${C.primary}; transform:translateY(-1px); }
`;
const Hr     = styled.hr`border:none; border-top:1px solid ${C.border}; margin:1.4rem 0;`;
const BotRow = styled.div`display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem;`;
const SecNote= styled.div`font-size:.74rem; color:${C.muted}; display:flex; align-items:center; gap:.35rem;`;
const SubBtn = styled.button`
  display:inline-flex; align-items:center; gap:.55rem;
  padding:.88rem 1.9rem; border-radius:10px; border:none;
  background:${C.primary}; color:#fff; font-weight:700; font-size:.92rem; cursor:pointer; font-family:inherit;
  box-shadow:0 6px 20px -2px rgba(37,99,235,.38);
  transition:background .15s, transform .12s, box-shadow .15s;
  &:hover:not(:disabled) { background:${C.primaryDark}; transform:translateY(-2px); }
  &:disabled { opacity:.6; cursor:not-allowed; }
`;
const SpinI  = styled(Loader2)`animation:${spin} 1s linear infinite;`;
const ErrBan = styled.div`
  display:flex; align-items:center; gap:.5rem;
  background:#fef2f2; border:1px solid #fecaca; border-radius:9px;
  padding:.72rem 1rem; margin-bottom:1rem; font-size:.82rem; color:#dc2626; font-weight:500;
`;
const OkWrap = styled.div`
  padding:4.5rem 2rem; text-align:center;
  display:flex; flex-direction:column; align-items:center; gap:1rem;
`;
const OkRing = styled.div`
  width:70px; height:70px; border-radius:50%;
  background:${C.greenBg}; border:2px solid ${C.greenBdr};
  display:flex; align-items:center; justify-content:center; color:${C.green};
  animation:${popIn} .5s cubic-bezier(.22,1,.36,1) both;
`;
const OkH  = styled.h3`font-size:1.3rem; font-weight:800; color:${C.navy}; margin:0;`;
const OkP  = styled.p`font-size:.9rem; color:${C.muted}; margin:0; line-height:1.68;`;

/* ═══════════════════════════════════════════════════════════
   FOOTER — entièrement clair
═══════════════════════════════════════════════════════════ */
const Footer = styled.footer`
  background:#fff; border-top:1px solid ${C.border};
  padding:1.75rem 2rem; position:relative; z-index:1;
`;
const FootInner = styled.div`
  max-width:1200px; margin:0 auto;
  display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem;
`;
const FootLogo = styled.div`
  display:flex; align-items:center; gap:.45rem;
  font-weight:800; font-size:.92rem; color:${C.navy};
  .d { width:7px; height:7px; border-radius:50%; background:${C.primary}; }
`;
const FootLinks = styled.div`display:flex; gap:1.1rem;`;
const FootLink  = styled.button`
  background:none; border:none; font-family:inherit; cursor:pointer;
  font-size:.76rem; color:${C.muted}; transition:color .15s;
  &:hover { color:${C.navy}; }
`;
const FootCopy = styled.div`font-size:.72rem; color:${C.muted};`;

/* ═══════════════════════════════════════════════════════════
   DONNÉES — chiffres réels
═══════════════════════════════════════════════════════════ */
const CHANGELOG = [
  {
    date:'Avril 2026 · Retour #1', accent:C.green,
    badge:{ label:'Corrigé', bg:C.greenBg, c:C.green, bdr:C.greenBdr },
    title:'Déconnexions en pleine réunion — auth entièrement refaite',
    desc:"Signalé par un testeur lors de sessions longues : déconnexion aléatoire toutes les 20–30 min. Cause identifiée en 12h, migration Clerk Core 3 déployée en 48h. Problème éliminé.",
    quote:"Je me déconnectais sans raison en pleine réunion — pas utilisable dans cet état.",
  },
  {
    date:'Avril 2026 · Retour #2', accent:C.amber,
    badge:{ label:'Repensé', bg:C.amberBg, c:C.amber, bdr:C.amberBdr },
    title:'Interface salle confuse — contrôles repris de zéro',
    desc:"Retour récurrent : les boutons micro, caméra et partage étaient visuellement identiques et mal placés. Toute la barre de contrôle a été redessinée avec une hiérarchie visuelle claire.",
    quote:"Je cherchais comment couper mon micro — les boutons se ressemblaient tous.",
  },
  {
    date:'Avril 2026 · Retour #3', accent:C.primary,
    badge:{ label:'En cours', bg:C.softBlue, c:C.primary, bdr:C.blueTint },
    title:'Pas de suivi post-réunion — transcription planifiée',
    desc:"Retour partagé par plusieurs testeurs : sans résumé ni notes, l'outil est difficile à justifier en contexte pro. La transcription IA devient la priorité n°1 de la Vague 2.",
    quote:"Pas de résumé, pas de notes — difficile de convaincre mon équipe de l'adopter.",
  },
];

const COMPARE_ROWS = [
  { feat:"Auth stable",               v1:false, v2:true  },
  { feat:"Interface repensée",        v1:false, v2:true  },
  { feat:"Contrôles micro/caméra",    v1:true,  v2:true  },
  { feat:"Chat intégré",              v1:true,  v2:true  },
  { feat:"Partage d'écran",           v1:true,  v2:true  },
  { feat:"Salles de breakout",        v1:true,  v2:true  },
  { feat:"Transcription IA",          v1:false, v2:true  },
  { feat:"Résumé post-réunion",       v1:false, v2:true  },
  { feat:"Statuts temps réel",        v1:false, v2:true  },
  { feat:"API développeur",           v1:false, v2:true  },
];

const FEATURES = [
  {
    icon:<Cpu size={20}/>, tag:"IA native", wide:true,
    accent:C.primary, ibg:C.softBlue, ibdr:C.blueTint, ic:C.primary,
    tbg:C.softBlue, tc:C.primary, tbdr:C.blueTint,
    title:"Transcription & résumé post-réunion",
    desc:"L'assistant IA transcrit en temps réel et génère un résumé structuré après chaque call. Exportable en Markdown ou Notion.",
    items:["Transcription temps réel","Résumé actionnable","Export Markdown / Notion"],
  },
  {
    icon:<Users size={20}/>, tag:"Refonte", wide:false,
    accent:C.purple, ibg:C.purpleBg, ibdr:C.purpleBdr, ic:C.purple,
    tbg:C.purpleBg, tc:C.purple, tbdr:C.purpleBdr,
    title:"Breakout v2",
    desc:"Entrée et sortie fluides, minuteur partagé visible, retour automatique à la salle principale.",
    items:["Entrée/sortie sans coupure","Minuteur partagé","Retour auto"],
  },
  {
    icon:<Shield size={20}/>, tag:"Sécurité", wide:false,
    accent:C.green, ibg:C.greenBg, ibdr:C.greenBdr, ic:C.green,
    tbg:C.greenBg, tc:C.green, tbdr:C.greenBdr,
    title:"Chiffrement E2E",
    desc:"Activable par salle pour les équipes traitant des données sensibles.",
    items:["Chiffrement bout-en-bout","Logs RGPD","Mode confidentiel"],
  },
  {
    icon:<Code2 size={20}/>, tag:"Bêta only", wide:false,
    accent:C.cyan, ibg:C.cyanBg, ibdr:C.cyanBdr, ic:C.cyan,
    tbg:C.cyanBg, tc:C.cyan, tbdr:C.cyanBdr,
    title:"API développeur",
    desc:"Premiers endpoints REST et SDK JS — en avant-première pour les testeurs Vague 2.",
    items:["Webhooks événements","SDK JavaScript","Embeds iFrame"],
  },
  {
    icon:<Globe size={20}/>, tag:"Infrastructure", wide:false,
    accent:C.amber, ibg:C.amberBg, ibdr:C.amberBdr, ic:C.amber,
    tbg:C.amberBg, tc:C.amber, tbdr:C.amberBdr,
    title:"Présence multi-régions",
    desc:"3 régions actives. Latence réduite de 55 % pour les équipes en Europe.",
    items:["3 régions actives","Latence < 45 ms EU","Failover automatique"],
  },
];

const TOOLS = ['Figma','Notion','Slack','GitHub','Linear','VS Code','Jira','Discord','Miro','Loom'];

/* ═══════════════════════════════════════════════════════════
   COMPOSANT
═══════════════════════════════════════════════════════════ */
export default function RoomPageNew() {
  const navigate = useNavigate();
  useSafeLayout();

  const [pct,       setPct]       = useState(0);
  const [navUp,     setNavUp]     = useState(false);
  const [form,      setForm]      = useState({ firstName:'', lastName:'', email:'', profile:'', usage:'', tools:[], motivation:'' });
  const [errors,    setErrors]    = useState({});
  const [apiErr,    setApiErr]    = useState('');
  const [loading,   setLoading]   = useState(false);
  const [success,   setSuccess]   = useState(false);

  /* Scroll progress + nav shadow */
  useEffect(() => {
    function onScroll() {
      const el = document.documentElement;
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
      setNavUp(el.scrollTop > 30);
    }
    window.addEventListener('scroll', onScroll, { passive:true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Scroll-reveal */
  useEffect(() => {
    const io = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } }),
      { threshold:0.07 }
    );
    document.querySelectorAll('[data-rv]').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const rv   = (d = 0) => ({ 'data-rv':true, style:{ '--d':`${d}ms` } });
  const go   = id => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' });
  const navGo= (e, id) => { e.preventDefault(); go(id); };

  function field(k, v) { setForm(f => ({ ...f, [k]:v })); setErrors(e => ({ ...e, [k]:'' })); }
  function toggle(t)   { setForm(f => ({ ...f, tools: f.tools.includes(t) ? f.tools.filter(x => x !== t) : [...f.tools, t] })); }

  function validate() {
    const e = {};
    if (!form.firstName.trim())                          e.firstName  = 'Requis';
    if (!form.lastName.trim())                           e.lastName   = 'Requis';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email      = 'Email invalide';
    if (!form.profile)                                   e.profile    = 'Requis';
    if (!form.usage)                                     e.usage      = 'Requis';
    if (form.motivation.trim().length < 40)              e.motivation = 'Minimum 40 caractères';
    return e;
  }

  async function submit(ev) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true); setApiErr('');
    try {
      const r = await fetch('/api/beta-apply', {
        method:'POST', headers:{ 'Content-Type':'application/json' },
        body:JSON.stringify(form),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Erreur serveur');
      setSuccess(true);
    } catch(err) {
      setApiErr(err.message || 'Une erreur est survenue.');
    } finally { setLoading(false); }
  }

  return (
    <Page>
      <DotGrid />
      <ProgressLine $pct={pct} />

      {/* ── NAV ─────────────────────────────────────── */}
      <Nav $up={navUp}>
        <NavInner>
          <NavBrand onClick={() => navigate('/')}>
            <span className="dot" /><span className="name">VisiConnect</span>
          </NavBrand>
          <NavLinks>
            <NL href="#changelog" onClick={e => navGo(e,'changelog')}>Changelog</NL>
            <NL href="#vague2"    onClick={e => navGo(e,'vague2')}>Vague 2</NL>
            <NL href="#criteres"  onClick={e => navGo(e,'criteres')}>Critères</NL>
            <NL href="#candidature" onClick={e => navGo(e,'candidature')}>Candidater</NL>
          </NavLinks>
          <NavRight>
            <OpenPill><span className="dot" />15 places ouvertes</OpenPill>
            <NavCta onClick={() => go('candidature')}><ArrowRight size={14} />Candidater</NavCta>
          </NavRight>
        </NavInner>
      </Nav>

      {/* ── HERO ────────────────────────────────────── */}
      <Hero>
        <HeroWrap>
          <HeroLeft>
            <Eyebrow><span className="dot" />Bêta Vague 1 fermée · Vague 2 ouverte</Eyebrow>
            <H1>
              9 testeurs.<br />3 retours qui ont<br /><em>tout changé.</em>
            </H1>
            <HeroP>
              La Vague 1 était une version imparfaite, testée honnêtement.
              Chaque retour a eu un impact direct sur le produit.
              La Vague 2 ouvre 15 places pour aller encore plus loin.
            </HeroP>
            <HeroActions>
              <BtnPrimary onClick={() => go('candidature')}><Rocket size={15} />Rejoindre la Vague 2</BtnPrimary>
              <BtnOutline onClick={() => navigate('/')}><ArrowLeft size={15} />Retour au site</BtnOutline>
            </HeroActions>
          </HeroLeft>

          <Panel>
            <PHead>
              <PTitle>Rapport Bêta · Vague 1</PTitle>
              <PBadge>Clôturée</PBadge>
            </PHead>
            <PBody>
              {[
                { l:'Testeurs actifs',    v:'9 / 10',  p:90,  d:.2,  c:C.primary },
                { l:'Retours actionnés',  v:'3 / 3',   p:100, d:.35, c:C.green   },
                { l:'Satisfaction',       v:'4 / 5',   p:80,  d:.5,  c:C.amber   },
                { l:'Durée bêta',         v:'4 sem.',  p:100, d:.65, c:C.cyan    },
              ].map(m => (
                <PBar key={m.l}>
                  <PBarTop><span className="l">{m.l}</span><span className="v">{m.v}</span></PBarTop>
                  <PBarTrack><PBarFill $p={m.p} $d={m.d} $c={m.c} /></PBarTrack>
                </PBar>
              ))}
              <PMini>
                <PCell><div className="n">9</div><div className="l">testeurs</div></PCell>
                <PCell><div className="n">3</div><div className="l">retours clés</div></PCell>
                <PCell><div className="n">15</div><div className="l">places Vague 2</div></PCell>
                <PCell><div className="n">4★</div><div className="l">satisfaction</div></PCell>
              </PMini>
            </PBody>
          </Panel>
        </HeroWrap>
      </Hero>

      {/* ── STATS BAND (clair) ──────────────────────── */}
      <StatsBand>
        <StatsInner>
          {[
            { n:'9',   sup:'',  l:'testeurs Vague 1',     d:0   },
            { n:'3',   sup:'',  l:'retours actionnés',    d:80  },
            { n:'15',  sup:'',  l:'places Vague 2',       d:160 },
            { n:'4',   sup:'★', l:'satisfaction moyenne', d:240 },
          ].map(s => (
            <StatCell key={s.l} {...rv(s.d)}>
              <StatNum>{s.n}<sup>{s.sup}</sup></StatNum>
              <StatLbl>{s.l}</StatLbl>
            </StatCell>
          ))}
        </StatsInner>
      </StatsBand>

      {/* ── CHANGELOG ───────────────────────────────── */}
      <Sec id="changelog">
        <W>
          <TLWrap>
            <TLSide>
              <TLBox>
                <TLBoxTitle>Les 3 retours</TLBoxTitle>
                {[
                  { c:C.green,   label:'Auth corrigée'    },
                  { c:C.amber,   label:'UI repensée'      },
                  { c:C.primary, label:'Feature planifiée'},
                ].map(i => (
                  <TLBoxItem key={i.label} $c={i.c}>
                    <span className="dot" />{i.label}
                  </TLBoxItem>
                ))}
              </TLBox>
            </TLSide>

            <div>
              <SecEyebrow {...rv(0)}>Changelog honnête · Vague 1</SecEyebrow>
              <SecH {...rv(60)}>Ce que vous avez dit.<br />Ce qu'on a fait.</SecH>
              <SecSub {...rv(120)}>
                3 retours concrets reçus pendant la bêta.
                Chacun a déclenché une action directe sur le produit.
              </SecSub>
              <TLItems>
                {CHANGELOG.map((e, i) => (
                  <TLCard key={i} $a={e.accent} {...rv(i * 75)}>
                    <TLTop>
                      <TLLeft>
                        <TLDate>{e.date}</TLDate>
                        <TLTitle>{e.title}</TLTitle>
                      </TLLeft>
                      <TLBadge $bg={e.badge.bg} $c={e.badge.c} $bdr={e.badge.bdr}>{e.badge.label}</TLBadge>
                    </TLTop>
                    <TLDesc>{e.desc}</TLDesc>
                    <TLQuote>{e.quote}</TLQuote>
                  </TLCard>
                ))}
              </TLItems>
            </div>
          </TLWrap>
        </W>
      </Sec>

      {/* ── COMPARE ─────────────────────────────────── */}
      <SecAlt>
        <W>
          <SecEyebrow {...rv(0)}>Comparaison</SecEyebrow>
          <SecH {...rv(60)}>Avant / Après</SecH>
          <SecSub {...rv(120)}>Ce qui existait en Vague 1 et ce qui arrive dans la Vague 2.</SecSub>
          <CmpWrap {...rv(180)}>
            <CmpHead>
              <CmpH>Fonctionnalité</CmpH>
              <CmpH>Vague 1</CmpH>
              <CmpH $hi>Vague 2</CmpH>
            </CmpHead>
            {COMPARE_ROWS.map((r, i) => (
              <CmpRow key={i}>
                <CmpCell><span className="feat">{r.feat}</span></CmpCell>
                <CmpCell><Tick $yes={r.v1}>{r.v1 ? <Check size={11} /> : <X size={11} />}</Tick></CmpCell>
                <CmpCell $hi><Tick $yes={r.v2}>{r.v2 ? <Check size={11} /> : <X size={11} />}</Tick></CmpCell>
              </CmpRow>
            ))}
          </CmpWrap>
        </W>
      </SecAlt>

      {/* ── FEATURES VAGUE 2 ────────────────────────── */}
      <Sec id="vague2">
        <W>
          <SecEyebrow {...rv(0)}>Vague 2</SecEyebrow>
          <SecH {...rv(60)}>Ce qui arrive dans la prochaine vague</SecH>
          <SecSub {...rv(120)}>Un produit plus solide, avec les fonctionnalités que vous avez demandées.</SecSub>
          <Bento>
            {FEATURES.map((f, i) => (
              <BCard key={i} $a={f.accent} $wide={f.wide} {...rv(i * 70)}>
                <BIco $bg={f.ibg} $bdr={f.ibdr} $c={f.ic}>{f.icon}</BIco>
                <BTag $bg={f.tbg} $c={f.tc} $bdr={f.tbdr}>{f.tag}</BTag>
                <BTitle>{f.title}</BTitle>
                <BDesc>{f.desc}</BDesc>
                <BList>{f.items.map((it, j) => <BLi key={j} $c={f.accent}>{it}</BLi>)}</BList>
              </BCard>
            ))}
          </Bento>
        </W>
      </Sec>

      {/* ── CRITÈRES ────────────────────────────────── */}
      <SecAlt id="criteres">
        <W>
          <CGrid>
            <div>
              <SecEyebrow {...rv(0)}>Sélection</SecEyebrow>
              <SecH {...rv(60)}>Ce que je cherche<br />dans la Vague 2</SecH>
              <SecSub {...rv(120)}>
                15 places. Des critères honnêtes, pas une loterie.
                Si vous cochez ces trois points, votre dossier a toutes ses chances.
              </SecSub>
              <div {...rv(200)} style={{ display:'flex', alignItems:'center', gap:'.5rem', fontSize:'.8rem', color:C.muted }}>
                <Clock size={13} />Durée estimée : 4 à 6 semaines
              </div>
            </div>
            <CItems>
              {[
                { n:'01', c:C.green,   title:'Engagement régulier',   desc:"Revenir d'une semaine à l'autre. Utiliser le produit même imparfait. Le silence n'aide pas à améliorer." },
                { n:'02', c:C.amber,   title:'Retours structurés',    desc:"Pas besoin d'être dev. Mais « ça marche pas » ne suffit pas. Reproduire, décrire le contexte, proposer une piste." },
                { n:'03', c:C.primary, title:"Cas d'usage réel",      desc:"Startup, agence, freelance — un vrai contexte. Les retours terrain valent infiniment plus que les tests en labo." },
              ].map((c, i) => (
                <CCard key={i} $c={c.c} {...rv(i * 100)}>
                  <CNum $c={c.c}>{c.n}</CNum>
                  <CBody><CTitle>{c.title}</CTitle><CDesc>{c.desc}</CDesc></CBody>
                </CCard>
              ))}
            </CItems>
          </CGrid>
        </W>
      </SecAlt>

      {/* ── FORMULAIRE ──────────────────────────────── */}
      <FormSec id="candidature">
        <W>
          <div style={{ maxWidth:820, margin:'0 auto 2.25rem', textAlign:'center' }}>
            <SecEyebrow {...rv(0)} style={{ justifyContent:'center','--d':'0ms' }}>
              <Sparkles size={11} />Candidature ouverte
            </SecEyebrow>
            <SecH {...rv(60)} style={{ textAlign:'center' }}>Rejoindre la Vague 2</SecH>
            <SecSub {...rv(120)} style={{ margin:'0 auto', textAlign:'center', maxWidth:460 }}>
              Dossier lu personnellement · Réponse sous 72h · 15 places
            </SecSub>
          </div>

          <FormBox>
            {success ? (
              <OkWrap>
                <OkRing><CheckCircle2 size={28} /></OkRing>
                <OkH>Candidature envoyée !</OkH>
                <OkP>Merci. Je lis chaque dossier personnellement<br />et vous recontacte sous 72h.</OkP>
                <BtnPrimary onClick={() => navigate('/')} style={{ marginTop:'.5rem' }}>
                  <ArrowLeft size={14} />Retour à l'accueil
                </BtnPrimary>
              </OkWrap>
            ) : (
              <>
                <FHead>
                  <div>
                    <FHTitle>Formulaire de candidature</FHTitle>
                    <FHSub>Vague 2 · sélection en cours</FHSub>
                  </div>
                  <SlotBox>
                    <Clock size={12} />
                    <span><span>15</span> places · {new Date().toLocaleDateString('fr-FR',{month:'long',year:'numeric'})}</span>
                  </SlotBox>
                </FHead>

                <FBody>
                  <form onSubmit={submit} noValidate>
                    {apiErr && <ErrBan><AlertCircle size={14} />{apiErr}</ErrBan>}

                    <FRow $c="1fr 1fr">
                      <FG>
                        <Lbl>Prénom<Req>*</Req></Lbl>
                        <Inp $e={errors.firstName} value={form.firstName} onChange={ev => field('firstName', ev.target.value)} placeholder="Votre prénom" />
                        {errors.firstName && <FHint $e>{errors.firstName}</FHint>}
                      </FG>
                      <FG>
                        <Lbl>Nom<Req>*</Req></Lbl>
                        <Inp $e={errors.lastName} value={form.lastName} onChange={ev => field('lastName', ev.target.value)} placeholder="Votre nom" />
                        {errors.lastName && <FHint $e>{errors.lastName}</FHint>}
                      </FG>
                    </FRow>

                    <FRow>
                      <FG>
                        <Lbl>Email<Req>*</Req></Lbl>
                        <Inp type="email" $e={errors.email} value={form.email} onChange={ev => field('email', ev.target.value)} placeholder="votre@email.com" />
                        {errors.email && <FHint $e>{errors.email}</FHint>}
                      </FG>
                    </FRow>

                    <FRow $c="1fr 1fr">
                      <FG>
                        <Lbl>Profil<Req>*</Req></Lbl>
                        <Sel $e={errors.profile} value={form.profile} onChange={ev => field('profile', ev.target.value)}>
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
                        <Sel $e={errors.usage} value={form.usage} onChange={ev => field('usage', ev.target.value)}>
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
                        <CWrap>
                          {TOOLS.map(t => (
                            <Chip key={t} type="button" $on={form.tools.includes(t)} onClick={() => toggle(t)}>{t}</Chip>
                          ))}
                        </CWrap>
                      </FG>
                    </FRow>

                    <Hr />

                    <FRow>
                      <FG>
                        <Lbl>Pourquoi rejoindre la Vague 2 ?<Req>*</Req></Lbl>
                        <Txt
                          $e={errors.motivation}
                          value={form.motivation}
                          rows={5}
                          onChange={ev => field('motivation', ev.target.value)}
                          placeholder="Décrivez votre contexte, votre usage et ce que vous apporteriez comme testeur…"
                        />
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                          {errors.motivation ? <FHint $e>{errors.motivation}</FHint> : <FHint>Minimum 40 caractères.</FHint>}
                          <CharCnt $ok={form.motivation.trim().length >= 40}>{form.motivation.trim().length}&nbsp;/&nbsp;40+</CharCnt>
                        </div>
                      </FG>
                    </FRow>

                    <BotRow>
                      <SecNote><Shield size={12} />Données confidentielles — aucune revente.</SecNote>
                      <SubBtn type="submit" disabled={loading}>
                        {loading ? <><SpinI size={15} />Envoi…</> : <><Send size={15} />Envoyer ma candidature</>}
                      </SubBtn>
                    </BotRow>
                  </form>
                </FBody>
              </>
            )}
          </FormBox>
        </W>
      </FormSec>

      {/* ── FOOTER (clair) ──────────────────────────── */}
      <Footer>
        <FootInner>
          <FootLogo><span className="d" />VisiConnect</FootLogo>
          <FootLinks>
            <FootLink onClick={() => navigate('/legal/privacy')}>Confidentialité</FootLink>
            <FootLink onClick={() => navigate('/legal/terms')}>CGU</FootLink>
            <FootLink onClick={() => navigate('/contact')}>Contact</FootLink>
          </FootLinks>
          <FootCopy>© {new Date().getFullYear()} VisiConnect</FootCopy>
        </FootInner>
      </Footer>
    </Page>
  );
}
