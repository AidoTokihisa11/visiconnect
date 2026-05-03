import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import {
  Sparkles, Users, CheckCircle2, ArrowLeft, Send, Loader2, AlertCircle,
  Bug, Zap, Rocket, Shield, Clock, Star, MessageCircle, ChevronRight,
  Check, Heart, Target, FileText, Mail,
} from 'lucide-react';
import { useSafeLayout } from '../hooks/useSafeLayout';

/* ─────────────────────────────────────────────────────────────────
   PALETTE (identique au reste du site)
───────────────────────────────────────────────────────────────── */
const C = {
  primary:  '#2563eb',
  navy:     '#0f172a',
  text:     '#374151',
  muted:    '#6b7280',
  border:   '#e5e7eb',
  card:     '#ffffff',
  softBlue: '#eff6ff',
  blueTint: '#dbeafe',
  bg:       '#f8fbff',
};

/* ─────────────────────────────────────────────────────────────────
   KEYFRAMES
───────────────────────────────────────────────────────────────── */
const floatIn = keyframes`
  from { opacity: 0; transform: translateY(22px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0)    scale(1);    }
`;

const revealCss = css`
  opacity: 0;
  transform: translateY(28px);
  transition: opacity .65s ease, transform .65s cubic-bezier(.22, 1, .36, 1);
  transition-delay: var(--d, 0ms);
  will-change: opacity, transform;
  &.visible { opacity: 1; transform: translateY(0); }
  @media (prefers-reduced-motion: reduce) { opacity: 1; transform: none; transition: none; }
`;

/* ─────────────────────────────────────────────────────────────────
   PAGE SHELL
───────────────────────────────────────────────────────────────── */
const Page = styled.div`
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(37,99,235,.07), transparent 30%),
    radial-gradient(circle at bottom right, rgba(37,99,235,.04), transparent 40%),
    linear-gradient(180deg, ${C.bg} 0%, #fff 30%, #fff 100%);
  color: ${C.navy};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow-x: hidden;
`;
const DotGrid = styled.div`
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background-image:
    linear-gradient(rgba(37,99,235,.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(37,99,235,.025) 1px, transparent 1px);
  background-size: 44px 44px;
`;

/* ─────────────────────────────────────────────────────────────────
   NAV
───────────────────────────────────────────────────────────────── */
const Nav = styled.nav`
  position: sticky; top: 0; z-index: 100;
  background: rgba(255,255,255,.92); backdrop-filter: blur(16px);
  border-bottom: 1px solid ${C.border};
`;
const NavInner = styled.div`
  max-width: 1200px; margin: 0 auto; padding: .9rem 1.5rem;
  display: flex; align-items: center; justify-content: space-between;
`;
const NavLogo = styled.button`
  background: none; border: none; cursor: pointer; padding: 0;
  display: flex; align-items: center; gap: .55rem;
  font-weight: 800; font-size: 1.05rem; color: ${C.navy};
  transition: color .2s;
  .dot { width: 8px; height: 8px; border-radius: 50%; background: ${C.primary}; }
  &:hover { color: ${C.primary}; }
`;
const NavCta = styled.button`
  display: inline-flex; align-items: center; gap: .5rem;
  padding: .55rem 1.15rem; border-radius: 10px;
  background: ${C.softBlue}; border: 1px solid ${C.blueTint};
  color: ${C.primary}; font-weight: 700; font-size: .85rem; cursor: pointer;
  transition: background .2s, transform .2s;
  &:hover { background: #dbeafe; transform: translateY(-1px); }
`;

/* ─────────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────────── */
const HeroSection = styled.section`
  padding: 7rem 1.5rem 5.5rem;
  border-bottom: 1px solid ${C.border};
  position: relative; z-index: 1; text-align: center;
`;
const HeroEyebrow = styled.div`
  display: inline-flex; align-items: center; gap: .55rem;
  padding: .5rem 1.1rem; border-radius: 999px;
  background: ${C.softBlue}; border: 1px solid ${C.blueTint};
  color: ${C.primary}; font-weight: 700; font-size: .82rem;
  margin-bottom: 2rem;
  animation: ${floatIn} .6s cubic-bezier(.22,1,.36,1) both;
  .pulse {
    width: 7px; height: 7px; border-radius: 50%; background: ${C.primary};
    animation: ripple 1.8s ease infinite;
  }
  @keyframes ripple {
    0%  { box-shadow: 0 0 0 0   rgba(37,99,235,.5); }
    70% { box-shadow: 0 0 0 8px rgba(37,99,235,0);  }
    100%{ box-shadow: 0 0 0 0   rgba(37,99,235,0);  }
  }
`;
const HeroTitle = styled.h1`
  font-size: clamp(2.6rem, 6vw, 4.4rem);
  font-weight: 800; letter-spacing: -.04em; line-height: 1.07;
  color: ${C.navy}; margin: 0 auto 1.5rem; max-width: 820px;
  animation: ${floatIn} .7s .06s cubic-bezier(.22,1,.36,1) both;
  span {
    background: linear-gradient(135deg, ${C.primary}, #60a5fa);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; display: block;
  }
`;
const HeroSubtitle = styled.p`
  font-size: clamp(1rem, 1.6vw, 1.15rem);
  color: ${C.muted}; line-height: 1.8; max-width: 640px; margin: 0 auto 2.5rem;
  animation: ${floatIn} .7s .12s cubic-bezier(.22,1,.36,1) both;
`;
const HeroActions = styled.div`
  display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center;
  animation: ${floatIn} .7s .18s cubic-bezier(.22,1,.36,1) both;
`;
const BtnPrimary = styled.button`
  display: inline-flex; align-items: center; gap: .6rem;
  padding: 1rem 1.8rem; border-radius: 12px; border: none;
  background: ${C.primary}; color: #fff; font-weight: 700; font-size: .95rem; cursor: pointer;
  box-shadow: 0 10px 28px rgba(37,99,235,.3);
  transition: transform .2s, box-shadow .2s, background .2s;
  &:hover { transform: translateY(-2px); box-shadow: 0 16px 36px rgba(37,99,235,.38); background: #1d4ed8; }
`;
const BtnSecondary = styled.button`
  display: inline-flex; align-items: center; gap: .6rem;
  padding: 1rem 1.6rem; border-radius: 12px;
  border: 1.5px solid ${C.border}; background: #fff; color: ${C.navy};
  font-weight: 700; font-size: .95rem; cursor: pointer;
  transition: border-color .2s, color .2s, transform .2s;
  &:hover { border-color: ${C.primary}; color: ${C.primary}; transform: translateY(-2px); }
`;

/* ─────────────────────────────────────────────────────────────────
   STATS BAND
───────────────────────────────────────────────────────────────── */
const StatsBand = styled.section`
  background: linear-gradient(180deg, rgba(239,246,255,.8) 0%, rgba(255,255,255,.4) 100%);
  border-bottom: 1px solid ${C.border};
`;
const StatsGrid = styled.div`
  max-width: 1200px; margin: 0 auto; padding: 2.75rem 1.5rem;
  display: grid; grid-template-columns: repeat(4,1fr); gap: 1rem;
  @media(max-width: 768px) { grid-template-columns: repeat(2,1fr); }
`;
const StatCard = styled.div`
  background: #fff; border: 1px solid ${C.border}; border-radius: 18px;
  padding: 1.75rem 1.25rem; text-align: center;
  box-shadow: 0 4px 20px rgba(15,23,42,.04);
  transition: transform .28s, border-color .28s, box-shadow .28s;
  ${revealCss}
  &:hover { transform: translateY(-4px); border-color: ${C.blueTint}; box-shadow: 0 14px 32px rgba(37,99,235,.1); }
  .icon { color: ${C.primary}; margin-bottom: .65rem; }
  .val  { font-size: 2rem; font-weight: 800; color: ${C.navy}; line-height: 1; }
  .lbl  { font-size: .78rem; color: ${C.muted}; margin-top: .4rem; line-height: 1.4; }
`;

/* ─────────────────────────────────────────────────────────────────
   SECTION HELPERS
───────────────────────────────────────────────────────────────── */
const Wrap = styled.div`max-width: 1200px; margin: 0 auto; padding: 0 1.5rem;`;
const SectionW = styled.section`padding: 5.5rem 0; border-bottom: 1px solid ${C.border}; position: relative; z-index: 1;`;
const SectionAlt = styled.section`
  background: ${C.softBlue};
  border-top: 1px solid ${C.blueTint}; border-bottom: 1px solid ${C.blueTint};
  padding: 5.5rem 0; position: relative; z-index: 1;
`;
const SectionHead = styled.div`text-align: center; max-width: 660px; margin: 0 auto 3.5rem;`;
const SectionEyebrow = styled.div`
  display: inline-flex; align-items: center; gap: .5rem;
  padding: .4rem .85rem; border-radius: 999px;
  background: ${C.softBlue}; border: 1px solid ${C.blueTint};
  color: ${C.primary}; font-weight: 700; font-size: .78rem;
  margin-bottom: .85rem; text-transform: uppercase; letter-spacing: .08em;
  ${revealCss}
`;
const SectionTitle = styled.h2`
  font-size: clamp(1.8rem, 3.5vw, 2.6rem); font-weight: 800;
  letter-spacing: -.03em; color: ${C.navy}; margin: 0 0 .75rem;
  ${revealCss}
  span {
    background: linear-gradient(135deg, ${C.primary}, #60a5fa);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;
const SectionSub = styled.p`
  font-size: 1rem; color: ${C.muted}; line-height: 1.75; margin: 0;
  ${revealCss}
`;

/* ─────────────────────────────────────────────────────────────────
   BILAN CARDS
───────────────────────────────────────────────────────────────── */
const CardsGrid = styled.div`
  display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem;
  @media(max-width: 900px) { grid-template-columns: 1fr; }
  ${revealCss}
`;
const FeatureCard = styled.div`
  background: #fff; border: 1px solid ${C.border}; border-radius: 22px;
  padding: 2rem; box-shadow: 0 6px 22px rgba(15,23,42,.05);
  position: relative; overflow: hidden;
  transition: transform .3s, border-color .3s, box-shadow .3s;
  &::after {
    content: ''; position: absolute; left: 0; right: 0; top: 0; height: 3px;
    background: linear-gradient(90deg, ${C.primary}, rgba(37,99,235,.3));
    transform: scaleX(0); transform-origin: left; transition: transform .3s;
  }
  &:hover { transform: translateY(-5px); border-color: ${C.blueTint}; box-shadow: 0 18px 40px rgba(37,99,235,.1); }
  &:hover::after { transform: scaleX(1); }
`;
const IconBox = styled.div`
  width: 50px; height: 50px; border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  background: ${C.softBlue}; color: ${C.primary}; margin-bottom: 1.25rem;
  transition: transform .3s, background .3s;
  ${FeatureCard}:hover & { transform: scale(1.08); background: rgba(37,99,235,.12); }
`;
const CardTitle = styled.h3`font-size: 1.1rem; font-weight: 800; color: ${C.navy}; margin: 0 0 .6rem;`;
const CardText  = styled.p`font-size: .9rem; color: ${C.muted}; line-height: 1.7; margin: 0;`;

/* ─────────────────────────────────────────────────────────────────
   CHANGES LIST
───────────────────────────────────────────────────────────────── */
const ChangeList = styled.div`
  display: flex; flex-direction: column; gap: 1.25rem; max-width: 860px; margin: 0 auto;
  ${revealCss}
`;
const ChangeItem = styled.div`
  background: #fff; border: 1px solid ${C.border}; border-radius: 18px;
  padding: 1.6rem 1.75rem; display: flex; gap: 1.25rem; align-items: flex-start;
  box-shadow: 0 4px 18px rgba(15,23,42,.04);
  transition: transform .28s, border-color .28s, box-shadow .28s;
  &:hover { transform: translateY(-3px); border-color: ${C.blueTint}; box-shadow: 0 14px 30px rgba(37,99,235,.1); }
`;
const ChangeIconWrap = styled.div`
  flex-shrink: 0; width: 40px; height: 40px; border-radius: 12px;
  background: ${C.softBlue}; color: ${C.primary};
  display: flex; align-items: center; justify-content: center; margin-top: 1px;
`;
const ChangeBody = styled.div`
  flex: 1;
  h4 { font-size: 1rem; font-weight: 800; color: ${C.navy}; margin: 0 0 .35rem; }
  p  { font-size: .9rem; color: ${C.muted}; line-height: 1.65; margin: 0; }
`;
const ChangeBadge = styled.span`
  flex-shrink: 0; align-self: flex-start; margin-top: 2px;
  padding: .3rem .75rem; border-radius: 8px; font-size: .75rem; font-weight: 700;
  background: ${({ $ok }) => $ok ? '#f0fdf4' : C.softBlue};
  color:      ${({ $ok }) => $ok ? '#16a34a' : C.primary};
  border:     1px solid ${({ $ok }) => $ok ? '#bbf7d0' : C.blueTint};
`;

/* ─────────────────────────────────────────────────────────────────
   VAGUE 2 GRID
───────────────────────────────────────────────────────────────── */
const NewGrid = styled.div`
  display: grid; grid-template-columns: repeat(2,1fr); gap: 1.5rem;
  @media(max-width: 760px) { grid-template-columns: 1fr; }
  ${revealCss}
`;
const NewCard = styled.div`
  background: #fff; border: 1px solid ${C.border}; border-radius: 20px;
  padding: 1.75rem 1.9rem; display: flex; gap: 1.1rem; align-items: flex-start;
  box-shadow: 0 4px 18px rgba(15,23,42,.04);
  transition: transform .28s, border-color .28s, box-shadow .28s;
  &:hover { transform: translateY(-4px); border-color: ${C.blueTint}; box-shadow: 0 14px 32px rgba(37,99,235,.1); }
`;
const NewIcon = styled.div`
  flex-shrink: 0; width: 44px; height: 44px; border-radius: 13px;
  background: ${C.softBlue}; color: ${C.primary};
  display: flex; align-items: center; justify-content: center; margin-top: 1px;
  transition: transform .3s, background .3s;
  ${NewCard}:hover & { transform: scale(1.08); background: rgba(37,99,235,.12); }
`;
const NewBody = styled.div`
  flex: 1;
  h4 { font-size: 1rem; font-weight: 800; color: ${C.navy}; margin: 0 0 .4rem; }
  p  { font-size: .87rem; color: ${C.muted}; line-height: 1.65; margin: 0; }
`;

/* ─────────────────────────────────────────────────────────────────
   CRITERIA
───────────────────────────────────────────────────────────────── */
const CriteriaGrid = styled.div`
  display: grid; grid-template-columns: repeat(3,1fr); gap: 1.25rem;
  @media(max-width: 900px) { grid-template-columns: 1fr; }
  ${revealCss}
`;
const CriteriaCard = styled.div`
  background: #fff; border: 1px solid ${C.border}; border-radius: 20px;
  padding: 1.75rem; box-shadow: 0 4px 18px rgba(15,23,42,.04);
  transition: transform .28s, border-color .28s, box-shadow .28s;
  &:hover { transform: translateY(-4px); border-color: ${C.blueTint}; box-shadow: 0 14px 32px rgba(37,99,235,.1); }
  .num {
    width: 34px; height: 34px; border-radius: 10px; background: ${C.primary};
    color: #fff; font-weight: 800; font-size: .85rem;
    display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;
  }
  h4 { font-size: 1rem; font-weight: 800; color: ${C.navy}; margin: 0 0 .5rem; }
  p  { font-size: .87rem; color: ${C.muted}; line-height: 1.65; margin: 0; }
`;

/* ─────────────────────────────────────────────────────────────────
   QUOTES
───────────────────────────────────────────────────────────────── */
const QuoteGrid = styled.div`
  display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem;
  @media(max-width: 900px) { grid-template-columns: 1fr; }
  ${revealCss}
`;
const QuoteCard = styled.div`
  background: #fff; border: 1px solid ${C.border}; border-radius: 20px;
  padding: 1.75rem; box-shadow: 0 4px 18px rgba(15,23,42,.04);
  display: flex; flex-direction: column; gap: 1rem;
  transition: transform .28s, border-color .28s, box-shadow .28s;
  &:hover { transform: translateY(-4px); border-color: ${C.blueTint}; box-shadow: 0 14px 32px rgba(37,99,235,.1); }
  .qi { color: ${C.primary}; }
  p { font-size: .92rem; color: ${C.text}; line-height: 1.7; margin: 0; flex: 1; font-style: italic; }
`;
const QuoteAuthor = styled.div`
  display: flex; align-items: center; gap: .7rem;
  .av {
    width: 36px; height: 36px; border-radius: 50%;
    background: ${C.softBlue}; border: 2px solid ${C.blueTint};
    display: flex; align-items: center; justify-content: center;
    font-size: .8rem; font-weight: 800; color: ${C.primary};
  }
  .nm { font-size: .85rem; font-weight: 700; color: ${C.navy}; }
  .rl { font-size: .75rem; color: ${C.muted}; }
`;

/* ─────────────────────────────────────────────────────────────────
   FORM
───────────────────────────────────────────────────────────────── */
const FormSection = styled.section`
  padding: 5.5rem 1.5rem 6rem;
  background: linear-gradient(180deg, ${C.softBlue} 0%, #fff 100%);
  border-top: 1px solid ${C.blueTint};
  position: relative; z-index: 1;
`;
const FormCard = styled.div`
  max-width: 860px; margin: 0 auto;
  background: #fff; border: 1px solid ${C.border}; border-radius: 28px;
  box-shadow: 0 40px 100px rgba(37,99,235,.12); overflow: hidden;
  ${revealCss}
`;
const FormHeader = styled.div`
  padding: 2.5rem 2.5rem 2rem;
  background: linear-gradient(135deg, ${C.softBlue} 0%, rgba(255,255,255,.6) 100%);
  border-bottom: 1px solid ${C.blueTint};
  display: flex; gap: 1.5rem; align-items: flex-start; flex-wrap: wrap;
  @media(max-width: 640px) { padding: 1.75rem 1.5rem 1.5rem; }
`;
const FormHeaderLeft = styled.div`flex: 1; min-width: 200px;`;
const FormBadge = styled.div`
  display: inline-flex; align-items: center; gap: .5rem;
  padding: .4rem .85rem; border-radius: 999px;
  background: ${C.softBlue}; border: 1px solid ${C.blueTint};
  color: ${C.primary}; font-weight: 700; font-size: .78rem;
  margin-bottom: .75rem; text-transform: uppercase; letter-spacing: .08em;
`;
const FormTitle = styled.h2`
  font-size: clamp(1.5rem, 2.5vw, 2rem); font-weight: 800;
  letter-spacing: -.03em; color: ${C.navy}; margin: 0 0 .5rem;
`;
const FormSubtitle = styled.p`font-size: .92rem; color: ${C.muted}; line-height: 1.65; margin: 0;`;
const SlotsBox = styled.div`
  flex-shrink: 0; background: #fff; border: 1px solid ${C.blueTint};
  border-radius: 18px; padding: 1.25rem 1.5rem; text-align: center;
  box-shadow: 0 4px 16px rgba(37,99,235,.08); align-self: flex-start;
  .iw { width: 40px; height: 40px; border-radius: 12px; background: ${C.primary}; color: #fff; display: flex; align-items: center; justify-content: center; margin: 0 auto .5rem; }
  .num { font-size: 2rem; font-weight: 800; color: ${C.navy}; line-height: 1; }
  .cap { font-size: .72rem; font-weight: 700; color: ${C.muted}; text-transform: uppercase; letter-spacing: .08em; }
`;
const FormBody = styled.form`
  padding: 2.5rem;
  display: flex; flex-direction: column; gap: 1.5rem;
  @media(max-width: 640px) { padding: 1.5rem; }
`;
const FieldRow = styled.div`
  display: grid;
  grid-template-columns: ${({ $cols }) => $cols === 2 ? '1fr 1fr' : '1fr'};
  gap: 1rem;
  @media(max-width: 640px) { grid-template-columns: 1fr; }
`;
const FieldGroup = styled.div`display: flex; flex-direction: column; gap: .45rem;`;
const Label = styled.label`
  font-size: .85rem; font-weight: 600; color: ${C.navy};
  display: flex; align-items: center; justify-content: space-between;
  .req { color: #ef4444; }
  .opt { font-weight: 400; color: ${C.muted}; }
  .counter { font-weight: 500; color: ${({ $ok }) => $ok ? '#16a34a' : C.muted}; }
`;
const inputBase = css`
  width: 100%; padding: .75rem 1rem; border-radius: 12px; font-size: .9rem;
  color: ${C.navy}; background: #fff; outline: none; box-sizing: border-box;
  font-family: inherit;
  border: 1.5px solid ${({ $err }) => $err ? '#fca5a5' : C.border};
  transition: border-color .18s, box-shadow .18s;
  &::placeholder { color: #9ca3af; }
  &:focus {
    border-color: ${({ $err }) => $err ? '#ef4444' : C.primary};
    box-shadow: 0 0 0 3px ${({ $err }) => $err ? 'rgba(239,68,68,.12)' : 'rgba(37,99,235,.12)'};
  }
`;
const Input    = styled.input`${inputBase}`;
const Select   = styled.select`${inputBase} cursor: pointer;`;
const Textarea = styled.textarea`${inputBase} resize: vertical; line-height: 1.65; min-height: 120px;`;
const FieldError = styled.p`font-size: .8rem; color: #ef4444; margin: 0;`;
const ToolsWrap = styled.div`display: flex; flex-wrap: wrap; gap: .65rem;`;
const ToolChip = styled.button`
  padding: .5rem 1rem; border-radius: 10px; font-size: .85rem; font-weight: 600; cursor: pointer;
  border: 1.5px solid ${({ $on }) => $on ? C.primary : C.border};
  background: ${({ $on }) => $on ? C.primary : '#fff'};
  color: ${({ $on }) => $on ? '#fff' : C.text};
  box-shadow: ${({ $on }) => $on ? '0 4px 14px rgba(37,99,235,.22)' : 'none'};
  transition: all .15s ease;
  display: inline-flex; align-items: center; gap: .3rem;
  &:hover {
    border-color: ${C.primary};
    background: ${({ $on }) => $on ? '#1d4ed8' : C.softBlue};
    color: ${({ $on }) => $on ? '#fff' : C.primary};
    transform: translateY(-1px);
  }
`;
const AlertBox = styled.div`
  display: flex; align-items: flex-start; gap: .75rem;
  padding: .9rem 1.1rem; border-radius: 12px;
  background: #fef2f2; border: 1px solid #fecaca; color: #dc2626;
  font-size: .88rem; line-height: 1.5;
`;
const SubmitBtn = styled.button`
  display: inline-flex; align-items: center; justify-content: center; gap: .6rem;
  padding: 1.05rem 1.75rem; border-radius: 14px; border: none;
  background: linear-gradient(135deg, ${C.primary}, #3b82f6);
  color: #fff; font-weight: 700; font-size: 1rem; cursor: pointer;
  box-shadow: 0 10px 28px rgba(37,99,235,.3);
  transition: transform .2s, box-shadow .2s, opacity .2s;
  &:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 16px 36px rgba(37,99,235,.38); }
  &:disabled { opacity: .6; cursor: not-allowed; }
`;
const PrivacyNote = styled.p`
  font-size: .78rem; color: ${C.muted}; text-align: center; margin: 0;
  display: flex; align-items: center; justify-content: center; gap: .4rem;
`;

/* ─────────────────────────────────────────────────────────────────
   SUCCESS
───────────────────────────────────────────────────────────────── */
const SuccessWrap = styled.div`
  padding: 5rem 1.5rem;
  display: flex; flex-direction: column; align-items: center; text-align: center;
  position: relative; z-index: 1;
`;
const SuccessCircle = styled.div`
  width: 80px; height: 80px; border-radius: 50%;
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  border: 3px solid #6ee7b7;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 1.75rem;
  animation: ${floatIn} .6s cubic-bezier(.22,1,.36,1) both;
`;
const SuccessTitle = styled.h1`
  font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; letter-spacing: -.03em;
  color: ${C.navy}; margin: 0 0 1rem;
  animation: ${floatIn} .6s .1s cubic-bezier(.22,1,.36,1) both;
`;
const SuccessText = styled.p`
  font-size: 1.05rem; color: ${C.muted}; line-height: 1.75;
  max-width: 520px; margin: 0 auto .75rem;
  animation: ${floatIn} .6s .18s cubic-bezier(.22,1,.36,1) both;
`;

/* ─────────────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────────────── */
const FooterBar = styled.footer`
  background: ${C.navy}; padding: 2.5rem 1.5rem; position: relative; z-index: 1;
`;
const FooterInner = styled.div`
  max-width: 1200px; margin: 0 auto;
  display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem;
`;
const FooterLogo = styled.span`font-weight: 800; color: #fff; font-size: 1rem;`;
const FooterMeta = styled.p`font-size: .8rem; color: #64748b; margin: 0;`;
const FooterBack = styled.button`
  display: inline-flex; align-items: center; gap: .5rem;
  padding: .65rem 1.25rem; border-radius: 10px;
  border: 1.5px solid rgba(255,255,255,.12); background: transparent;
  color: #cbd5e1; font-weight: 600; font-size: .85rem; cursor: pointer;
  transition: border-color .2s, color .2s, transform .2s;
  &:hover { border-color: rgba(255,255,255,.3); color: #fff; transform: translateY(-1px); }
`;

/* ─────────────────────────────────────────────────────────────────
   REVEAL HOOK
───────────────────────────────────────────────────────────────── */
function useReveal(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (delay) el.style.setProperty('--d', `${delay}ms`);
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

/* ─────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────── */
const STATS_DATA = [
  { icon: Users,    val: '22',   lbl: 'bêta-testeurs · Vague 1' },
  { icon: Bug,      val: '47+',  lbl: 'bugs documentés & corrigés' },
  { icon: Sparkles, val: '15',   lbl: 'places · Vague 2' },
  { icon: Star,     val: '100%', lbl: 'sélection manuelle' },
];

const BILAN_CARDS = [
  {
    icon: Bug,
    title: 'Des bugs remontés sérieusement',
    text: 'Vous avez testé dans des conditions réelles — connexions instables, multiples onglets, mobile. Chaque rapport a atterri directement dans mon backlog et guidé les corrections de ces deux derniers mois.',
  },
  {
    icon: MessageCircle,
    title: 'Des retours honnêtes et contextualisés',
    text: 'Pas juste "ça marche" ou "ça marche pas". Des retours avec du contexte, des captures, des comparatifs avec d\'autres outils. C\'est ce genre de feedback qui fait vraiment avancer un produit.',
  },
  {
    icon: Heart,
    title: 'Une communauté qui s\'implique',
    text: 'Certains d\'entre vous ont testé plusieurs fois, signalé des régressions, proposé des améliorations. Ce niveau d\'implication dans un projet solo, c\'est rare et je l\'apprécie vraiment.',
  },
];

const CHANGES_DATA = [
  { icon: Shield,   title: 'Stabilité de connexion',       text: 'La gestion des coupures réseau et des reconnexions a été entièrement revue. Les sessions se rétablissent maintenant sans rechargement manuel.',                                                                       badge: 'Corrigé',  ok: true  },
  { icon: Zap,      title: 'Authentification & sessions',   text: 'Le bug critique empêchant certains comptes de se connecter après migration a été résolu. La gestion des tokens est plus robuste et les sessions persistent correctement.',                                           badge: 'Corrigé',  ok: true  },
  { icon: Target,   title: 'Comportement sur mobile',       text: 'Les problèmes d\'interface sur iOS et Android ont été traités. La mise en page s\'adapte correctement aux petits écrans et les gestes tactiles sont mieux gérés.',                                                   badge: 'Corrigé',  ok: true  },
  { icon: FileText, title: 'Monitoring & détection d\'erreurs', text: 'Un système de monitoring interne a été mis en place. Je peux maintenant identifier les problèmes avant qu\'ils n\'impactent les utilisateurs — et corriger proactivement.',                                   badge: 'En prod',  ok: true  },
  { icon: Clock,    title: 'Performance générale',          text: 'Le temps de chargement initial a été réduit. Les participants rejoignent les salles plus rapidement, notamment sur les connexions lentes ou depuis mobile.',                                                          badge: 'Amélioré', ok: true  },
  { icon: Rocket,   title: 'Nouvelles fonctionnalités',     text: 'La Vague 2 sera la première à tester les fonctionnalités en développement : sondages en séance, tableau blanc collaboratif et système de notifications amélioré.',                                                  badge: 'Vague 2',  ok: false },
];

const VAGUE2_NEW = [
  { icon: Target,       title: 'Sélection 100% manuelle',     text: 'Je lis chaque candidature personnellement. Pas d\'algorithme, pas de tirage au sort. Je cherche des profils variés — différents métiers, différents usages, différentes façons de tester.' },
  { icon: Mail,         title: 'Réponse directe par email',   text: 'Si tu es sélectionné(e), je t\'écris directement sans intermédiaire. La sélection se fait dans les jours qui suivent la fermeture des candidatures.' },
  { icon: MessageCircle,title: 'Canal Discord privé',         text: 'Les bêta-testeurs Vague 2 ont accès à un canal Discord privé pour remonter les bugs, discuter des fonctionnalités et échanger directement avec moi.' },
  { icon: Rocket,       title: 'Accès anticipé aux features', text: 'Vous testez les fonctionnalités avant tout le monde. Vos retours influencent directement ce qui est gardé, modifié ou retiré avant la sortie publique.' },
];

const CRITERIA = [
  { num: '01', title: 'Disponibilité réelle',    text: 'Pas besoin d\'y passer des heures chaque jour. Mais je cherche des gens qui ont vraiment du temps à consacrer au test — pas une inscription oubliée au fond d\'une boîte mail.' },
  { num: '02', title: 'Feedback de qualité',     text: 'La qualité prime sur la quantité. Un rapport précis avec contexte, étapes de reproduction et capture vaut infiniment plus que "j\'ai trouvé un bug".' },
  { num: '03', title: 'Usage réel de la visio',  text: 'Que ce soit pour le travail, les cours ou les appels personnels — si tu utilises déjà des outils de visioconférence régulièrement, tu as exactement le profil que je cherche.' },
];

const QUOTES = [
  { text: 'Le niveau d\'attention portée aux retours m\'a surpris. Chaque bug que j\'ai signalé a été pris en compte rapidement. Rare pour un projet solo.', initials: 'ML', name: 'Marc L.',  role: 'Développeur' },
  { text: 'J\'avais des doutes au départ mais l\'expérience était fluide malgré les bugs de beta. Le potentiel est clairement là.', initials: 'SO',                 name: 'Sarah O.', role: 'Designer UX' },
  { text: 'Ce qui m\'a marqué c\'est la transparence sur l\'état du produit. Pas de fausse promesse, juste du boulot concret.', initials: 'PF',                      name: 'Pierre F.', role: 'Manager' },
];

const PROFILES = [
  { value: '',          label: 'Votre profil…',               disabled: true },
  { value: 'student',   label: 'Étudiant(e)' },
  { value: 'developer', label: 'Développeur / Tech' },
  { value: 'designer',  label: 'Designer / Créatif' },
  { value: 'manager',   label: 'Manager / Chef de projet' },
  { value: 'freelance', label: 'Freelance / Auto-entrepreneur' },
  { value: 'other',     label: 'Autre' },
];

const USAGES = [
  { value: '',             label: 'Usage principal…',              disabled: true },
  { value: 'personal',     label: 'Appels personnels (famille, amis)' },
  { value: 'professional', label: 'Réunions professionnelles' },
  { value: 'team',         label: 'Travail en équipe / PME' },
  { value: 'education',    label: 'Cours / Formation en ligne' },
];

const TOOLS = ['Zoom', 'Google Meet', 'Microsoft Teams', 'Discord', 'Whereby', 'Jitsi', 'Skype'];

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────── */
export default function RoomPageNew() {
  const navigate = useNavigate();
  useSafeLayout();

  const formRef = useRef(null);

  /* Reveal refs */
  const r_stats     = [useReveal(0), useReveal(80), useReveal(160), useReveal(240)];
  const r_bilanEyebrow = useReveal(0); const r_bilanTitle = useReveal(80); const r_bilanSub = useReveal(140); const r_bilanCards = useReveal(180);
  const r_chgEyebrow   = useReveal(0); const r_chgTitle   = useReveal(80); const r_chgSub   = useReveal(140); const r_chgList   = useReveal(180);
  const r_newEyebrow   = useReveal(0); const r_newTitle   = useReveal(80); const r_newSub   = useReveal(140); const r_newGrid   = useReveal(180);
  const r_crtEyebrow   = useReveal(0); const r_crtTitle   = useReveal(80); const r_crtSub   = useReveal(140); const r_crtGrid   = useReveal(180);
  const r_qtEyebrow    = useReveal(0); const r_qtTitle    = useReveal(80); const r_qtGrid   = useReveal(120);
  const r_formCard     = useReveal(100);

  /* Form state */
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', profile: '', usage: '', tools: [], motivation: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const update = (f, v) => {
    setForm(p => ({ ...p, [f]: v }));
    if (fieldErrors[f]) setFieldErrors(p => ({ ...p, [f]: null }));
  };
  const toggleTool = (t) => setForm(p => ({
    ...p, tools: p.tools.includes(t) ? p.tools.filter(x => x !== t) : [...p.tools, t],
  }));

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Champ requis';
    if (!form.lastName.trim())  e.lastName  = 'Champ requis';
    if (!form.email.trim()) {
      e.email = 'Email requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      e.email = 'Adresse email invalide';
    }
    if (!form.profile) e.profile = 'Sélectionnez un profil';
    if (!form.usage)   e.usage   = 'Sélectionnez un usage';
    const motLen = form.motivation.trim().length;
    if (motLen < 40) e.motivation = `Minimum 40 caractères (${motLen} actuellement)`;
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setFieldErrors(errs); return; }
    setFieldErrors({});
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/beta-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          firstName:  form.firstName.trim(),
          lastName:   form.lastName.trim(),
          email:      form.email.trim().toLowerCase(),
          motivation: form.motivation.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur inattendue, veuillez réessayer.');
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const motLen = form.motivation.trim().length;
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  /* ─── SUCCESS ─── */
  if (submitted) {
    return (
      <Page>
        <DotGrid />
        <Nav>
          <NavInner>
            <NavLogo onClick={() => navigate('/')}><div className="dot" />VisioConnect</NavLogo>
          </NavInner>
        </Nav>
        <SuccessWrap>
          <SuccessCircle><CheckCircle2 size={38} color="#16a34a" /></SuccessCircle>
          <SuccessTitle>Candidature envoyée !</SuccessTitle>
          <SuccessText>
            Merci <strong>{form.firstName}</strong>. J'ai bien reçu ta candidature et un email de confirmation est parti à <strong>{form.email}</strong>.
          </SuccessText>
          <SuccessText style={{ animationDelay: '.22s' }}>
            Je lis chaque message personnellement. Si tu es sélectionné(e) parmi les 15, je te recontacte directement par email — sans intermédiaire.
          </SuccessText>
          <div style={{ marginTop: '2rem', animation: `${floatIn} .6s .3s both` }}>
            <BtnPrimary onClick={() => navigate('/')}>
              <ArrowLeft size={16} /> Retour à l'accueil
            </BtnPrimary>
          </div>
        </SuccessWrap>
        <FooterBar>
          <FooterInner>
            <FooterLogo>VisioConnect</FooterLogo>
            <FooterMeta>© 2026 — Fait avec soin par Théo Garcès</FooterMeta>
          </FooterInner>
        </FooterBar>
      </Page>
    );
  }

  /* ─── MAIN PAGE ─── */
  return (
    <Page>
      <DotGrid />

      {/* NAV */}
      <Nav>
        <NavInner>
          <NavLogo onClick={() => navigate('/')}><div className="dot" />VisioConnect</NavLogo>
          <NavCta onClick={scrollToForm}><Sparkles size={14} />Candidater <ChevronRight size={14} /></NavCta>
        </NavInner>
      </Nav>

      {/* HERO */}
      <HeroSection>
        <HeroEyebrow><span className="pulse" />Bêta terminée · Vague 2 ouverte</HeroEyebrow>
        <HeroTitle>
          La Vague 1 est terminée.
          <span>Et maintenant, la suite.</span>
        </HeroTitle>
        <HeroSubtitle>
          Honnêtement, je ne savais pas trop à quoi m'attendre quand j'ai envoyé les premiers codes.
          Vous avez testé dans de vraies conditions, remonté des bugs précis, et donné des retours
          qui ont changé concrètement la direction du produit. Je cherche maintenant 15 personnes pour aller plus loin.
        </HeroSubtitle>
        <HeroActions>
          <BtnPrimary onClick={scrollToForm}><Sparkles size={16} />Candidater à la Vague 2</BtnPrimary>
          <BtnSecondary onClick={() => navigate('/')}><ArrowLeft size={16} />Revenir à l'accueil</BtnSecondary>
        </HeroActions>
      </HeroSection>

      {/* STATS */}
      <StatsBand>
        <StatsGrid>
          {STATS_DATA.map(({ icon: Icon, val, lbl }, i) => (
            <StatCard key={lbl} ref={r_stats[i]}>
              <div className="icon"><Icon size={22} /></div>
              <div className="val">{val}</div>
              <div className="lbl">{lbl}</div>
            </StatCard>
          ))}
        </StatsGrid>
      </StatsBand>

      {/* BILAN */}
      <SectionW>
        <Wrap>
          <SectionHead>
            <SectionEyebrow ref={r_bilanEyebrow}>Bilan · Vague 1</SectionEyebrow>
            <SectionTitle ref={r_bilanTitle}>Ce que vous avez <span>vraiment accompli</span></SectionTitle>
            <SectionSub ref={r_bilanSub}>Deux mois de beta-test intensif. Voici ce que ça a changé concrètement dans le développement de VisioConnect.</SectionSub>
          </SectionHead>
          <CardsGrid ref={r_bilanCards}>
            {BILAN_CARDS.map(({ icon: Icon, title, text }) => (
              <FeatureCard key={title}>
                <IconBox><Icon size={22} /></IconBox>
                <CardTitle>{title}</CardTitle>
                <CardText>{text}</CardText>
              </FeatureCard>
            ))}
          </CardsGrid>
        </Wrap>
      </SectionW>

      {/* CE QUI A CHANGE */}
      <SectionAlt>
        <Wrap>
          <SectionHead>
            <SectionEyebrow ref={r_chgEyebrow}>Corrections & évolutions</SectionEyebrow>
            <SectionTitle ref={r_chgTitle}>Ce qui a <span>changé depuis</span></SectionTitle>
            <SectionSub ref={r_chgSub}>Chaque retour de la Vague 1 a alimenté une correction ou une amélioration. Voici un aperçu de ce qui a été fait.</SectionSub>
          </SectionHead>
          <ChangeList ref={r_chgList}>
            {CHANGES_DATA.map(({ icon: Icon, title, text, badge, ok }) => (
              <ChangeItem key={title}>
                <ChangeIconWrap><Icon size={18} /></ChangeIconWrap>
                <ChangeBody><h4>{title}</h4><p>{text}</p></ChangeBody>
                <ChangeBadge $ok={ok}>{badge}</ChangeBadge>
              </ChangeItem>
            ))}
          </ChangeList>
        </Wrap>
      </SectionAlt>

      {/* VAGUE 2 */}
      <SectionW>
        <Wrap>
          <SectionHead>
            <SectionEyebrow ref={r_newEyebrow}>Vague 2</SectionEyebrow>
            <SectionTitle ref={r_newTitle}>Ce qui <span>change pour la Vague 2</span></SectionTitle>
            <SectionSub ref={r_newSub}>Plus ciblée, plus structurée. La deuxième vague est pensée pour aller chercher des retours vraiment utiles.</SectionSub>
          </SectionHead>
          <NewGrid ref={r_newGrid}>
            {VAGUE2_NEW.map(({ icon: Icon, title, text }) => (
              <NewCard key={title}>
                <NewIcon><Icon size={20} /></NewIcon>
                <NewBody><h4>{title}</h4><p>{text}</p></NewBody>
              </NewCard>
            ))}
          </NewGrid>
        </Wrap>
      </SectionW>

      {/* QUOTES */}
      <SectionAlt>
        <Wrap>
          <SectionHead>
            <SectionEyebrow ref={r_qtEyebrow}>Retours · Vague 1</SectionEyebrow>
            <SectionTitle ref={r_qtTitle}>Ce qu'en disent <span>les participants</span></SectionTitle>
          </SectionHead>
          <QuoteGrid ref={r_qtGrid}>
            {QUOTES.map(({ text, initials, name, role }) => (
              <QuoteCard key={name}>
                <MessageCircle size={22} className="qi" />
                <p>"{text}"</p>
                <QuoteAuthor>
                  <div className="av">{initials}</div>
                  <div><div className="nm">{name}</div><div className="rl">{role}</div></div>
                </QuoteAuthor>
              </QuoteCard>
            ))}
          </QuoteGrid>
        </Wrap>
      </SectionAlt>

      {/* CRITERIA */}
      <SectionW>
        <Wrap>
          <SectionHead>
            <SectionEyebrow ref={r_crtEyebrow}>Sélection</SectionEyebrow>
            <SectionTitle ref={r_crtTitle}>Ce que je <span>cherche</span></SectionTitle>
            <SectionSub ref={r_crtSub}>Pas de profil type, pas de prérequis techniques. Juste trois critères simples qui font la différence.</SectionSub>
          </SectionHead>
          <CriteriaGrid ref={r_crtGrid}>
            {CRITERIA.map(({ num, title, text }) => (
              <CriteriaCard key={num}>
                <div className="num">{num}</div>
                <h4>{title}</h4>
                <p>{text}</p>
              </CriteriaCard>
            ))}
          </CriteriaGrid>
        </Wrap>
      </SectionW>

      {/* FORM */}
      <FormSection ref={formRef}>
        <SectionHead style={{ marginBottom: '2.5rem' }}>
          <SectionEyebrow>Candidature</SectionEyebrow>
          <SectionTitle>Rejoindre la <span>Vague 2</span></SectionTitle>
          <SectionSub>15 places. Sélection manuelle. Je réponds personnellement à chaque candidat retenu.</SectionSub>
        </SectionHead>

        <FormCard ref={r_formCard}>
          <FormHeader>
            <FormHeaderLeft>
              <FormBadge><Sparkles size={12} />Candidature · Vague 2</FormBadge>
              <FormTitle>Postuler maintenant</FormTitle>
              <FormSubtitle>Je lis chaque candidature moi-même. Pas d'algorithme, pas de filtre automatique — juste ta motivation et ton profil. Prends le temps de bien remplir.</FormSubtitle>
            </FormHeaderLeft>
            <SlotsBox>
              <div className="iw"><Users size={18} /></div>
              <div className="num">15</div>
              <div className="cap">places disponibles</div>
            </SlotsBox>
          </FormHeader>

          <FormBody onSubmit={handleSubmit} noValidate>

            <FieldRow $cols={2}>
              <FieldGroup>
                <Label htmlFor="fn">Prénom <span className="req">*</span></Label>
                <Input id="fn" type="text" placeholder="Alice" value={form.firstName} onChange={e => update('firstName', e.target.value)} $err={!!fieldErrors.firstName} autoComplete="given-name" />
                {fieldErrors.firstName && <FieldError>{fieldErrors.firstName}</FieldError>}
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor="ln">Nom <span className="req">*</span></Label>
                <Input id="ln" type="text" placeholder="Dupont" value={form.lastName} onChange={e => update('lastName', e.target.value)} $err={!!fieldErrors.lastName} autoComplete="family-name" />
                {fieldErrors.lastName && <FieldError>{fieldErrors.lastName}</FieldError>}
              </FieldGroup>
            </FieldRow>

            <FieldGroup>
              <Label htmlFor="em">Adresse email <span className="req">*</span></Label>
              <Input id="em" type="email" placeholder="alice@example.com" value={form.email} onChange={e => update('email', e.target.value)} $err={!!fieldErrors.email} autoComplete="email" />
              {fieldErrors.email && <FieldError>{fieldErrors.email}</FieldError>}
            </FieldGroup>

            <FieldRow $cols={2}>
              <FieldGroup>
                <Label htmlFor="pf">Votre profil <span className="req">*</span></Label>
                <Select id="pf" value={form.profile} onChange={e => update('profile', e.target.value)} $err={!!fieldErrors.profile}>
                  {PROFILES.map(p => <option key={p.value} value={p.value} disabled={p.disabled}>{p.label}</option>)}
                </Select>
                {fieldErrors.profile && <FieldError>{fieldErrors.profile}</FieldError>}
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor="us">Usage principal <span className="req">*</span></Label>
                <Select id="us" value={form.usage} onChange={e => update('usage', e.target.value)} $err={!!fieldErrors.usage}>
                  {USAGES.map(u => <option key={u.value} value={u.value} disabled={u.disabled}>{u.label}</option>)}
                </Select>
                {fieldErrors.usage && <FieldError>{fieldErrors.usage}</FieldError>}
              </FieldGroup>
            </FieldRow>

            <FieldGroup>
              <Label>Outils déjà utilisés <span className="opt">(optionnel)</span></Label>
              <ToolsWrap>
                {TOOLS.map(t => (
                  <ToolChip key={t} type="button" $on={form.tools.includes(t)} onClick={() => toggleTool(t)}>
                    {form.tools.includes(t) && <Check size={12} />}{t}
                  </ToolChip>
                ))}
              </ToolsWrap>
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="mo" $ok={motLen >= 40}>
                Pourquoi veux-tu rejoindre la bêta ? <span className="req">*</span>
                <span className="counter">{motLen} / 40 min.</span>
              </Label>
              <Textarea
                id="mo" rows={5}
                placeholder="Ce qui t'intéresse dans VisioConnect, comment tu utilises la visio au quotidien, ce que tu aimerais voir évoluer — tout ça m'intéresse vraiment."
                value={form.motivation}
                onChange={e => update('motivation', e.target.value)}
                $err={!!fieldErrors.motivation}
              />
              {fieldErrors.motivation && <FieldError>{fieldErrors.motivation}</FieldError>}
            </FieldGroup>

            {submitError && (
              <AlertBox>
                <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
                {submitError}
              </AlertBox>
            )}

            <div>
              <SubmitBtn type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />Envoi en cours…</>
                  : <><Send size={16} />Envoyer ma candidature<ChevronRight size={15} style={{ opacity: .65 }} /></>
                }
              </SubmitBtn>
              <PrivacyNote style={{ marginTop: '1rem' }}>
                <Shield size={13} />
                Tes données ne sont utilisées que pour la sélection bêta — jamais revendues, jamais partagées.
              </PrivacyNote>
            </div>
          </FormBody>
        </FormCard>
      </FormSection>

      {/* FOOTER */}
      <FooterBar>
        <FooterInner>
          <FooterLogo>VisioConnect</FooterLogo>
          <FooterMeta>© 2026 VisioConnect — Fait avec soin par Théo Garcès</FooterMeta>
          <FooterBack onClick={() => navigate('/')}><ArrowLeft size={14} />Retour à l'accueil</FooterBack>
        </FooterInner>
      </FooterBar>
    </Page>
  );
}
