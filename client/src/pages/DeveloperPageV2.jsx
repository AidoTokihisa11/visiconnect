import React, { useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import {
  Code2, Layout, Server, Zap, Heart,
  Terminal, ArrowRight, Compass,
  Database, Wrench, MonitorSmartphone, Github,
  Briefcase, GraduationCap, Coffee, Rocket, Star, Code, Play,
  BadgeCheck, FileText, ShieldCheck,
} from 'lucide-react';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';
import { useTranslation } from '../hooks/useTranslation';

// ─── Palette ──────────────────────────────────────────────────────────────────
const C = {
  primary:  '#2563eb',
  navy:     '#0f172a',
  text:     '#374151',
  muted:    '#6b7280',
  border:   '#e5e7eb',
  bg:       '#f8fbff',
  card:     '#ffffff',
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
  transition: opacity .75s ease, transform .75s cubic-bezier(.22,1,.36,1);
  transition-delay: var(--reveal-delay, 0ms);
  will-change: opacity, transform;
  &.is-visible { opacity:1; transform:translateY(0) scale(1); }
  @media (prefers-reduced-motion:reduce) { opacity:1; transform:none; transition:none; }
`;

// ─── Layout ───────────────────────────────────────────────────────────────────
const Page = styled.div`
  min-height:100vh;
  background:
    radial-gradient(circle at top left,  rgba(37,99,235,.08), transparent 28%),
    radial-gradient(circle at bottom right, rgba(37,99,235,.04), transparent 38%),
    linear-gradient(180deg,${C.bg} 0%,#fff 25%,#fff 100%);
  display:flex; flex-direction:column; color:${C.navy}; overflow-x:hidden;
`;
const Main = styled.main`flex:1;`;

// ─── Hero ─────────────────────────────────────────────────────────────────────
const HeroSection = styled.section`
  padding:7rem 1.5rem 5rem;
  border-bottom:1px solid ${C.border};
  position:relative; overflow:hidden;
`;
const BgGrid = styled.div`
  position:absolute; inset:0; pointer-events:none;
  background-image:
    linear-gradient(rgba(37,99,235,.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(37,99,235,.03) 1px, transparent 1px);
  background-size:44px 44px;
`;
const HeroContainer = styled.div`
  max-width:1200px; margin:0 auto; position:relative; z-index:1;
  display:grid; grid-template-columns:minmax(0,1.2fr) minmax(300px,.8fr);
  gap:3rem; align-items:center;
  @media(max-width:980px){ grid-template-columns:1fr; text-align:center; }
`;
const HeroContent = styled.div`animation:${floatIn} .75s cubic-bezier(.22,1,.36,1) both;`;
const Eyebrow = styled.div`
  display:inline-flex; align-items:center; gap:.5rem;
  padding:.45rem .9rem; border-radius:999px;
  background:${C.softBlue}; border:1px solid ${C.blueTint};
  color:${C.primary}; font-weight:700; font-size:.82rem; margin-bottom:1.25rem;
`;
const HeroTitle = styled.h1`
  font-size:clamp(2.8rem,5.5vw,4.5rem); font-weight:800;
  letter-spacing:-.04em; line-height:1.05; margin:0 0 1.1rem; color:${C.navy};
  span {
    background:linear-gradient(135deg,${C.primary},#3b82f6);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    background-clip:text; display:block;
  }
`;
const HeroSubtitle = styled.p`
  font-size:1.15rem; color:${C.muted}; line-height:1.75; margin:0 0 2.25rem; max-width:580px;
  @media(max-width:980px){ margin-left:auto; margin-right:auto; }
`;
const HeroActions = styled.div`
  display:flex; flex-wrap:wrap; gap:1rem;
  @media(max-width:980px){ justify-content:center; }
`;
const PrimaryBtn = styled.button`
  display:inline-flex; align-items:center; gap:.55rem;
  padding:.9rem 1.5rem; border-radius:12px; border:none;
  background:${C.primary}; color:#fff; font-weight:700; font-size:.95rem; cursor:pointer;
  box-shadow:0 10px 25px -5px rgba(37,99,235,.3);
  transition:transform .2s,box-shadow .2s,background .2s;
  &:hover{transform:translateY(-2px);box-shadow:0 15px 35px -5px rgba(37,99,235,.4);background:#1d4ed8;}
`;
const SecondaryBtn = styled.button`
  display:inline-flex; align-items:center; gap:.55rem;
  padding:.9rem 1.5rem; border-radius:12px;
  border:1.5px solid ${C.border}; background:#fff; color:${C.navy};
  font-weight:700; font-size:.95rem; cursor:pointer;
  transition:border-color .2s,color .2s,transform .2s;
  &:hover{border-color:${C.primary};color:${C.primary};transform:translateY(-2px);}
`;

// ─── Hero panel ───────────────────────────────────────────────────────────────
const HeroPanel = styled.div`
  position:relative; overflow:hidden;
  background:linear-gradient(160deg,#fff 0%,${C.bg} 100%);
  border:1px solid ${C.border}; border-radius:24px; padding:1.75rem;
  box-shadow:0 24px 60px rgba(15,23,42,.08);
  animation:${floatIn} .9s .15s cubic-bezier(.22,1,.36,1) both;
  &::before{
    content:''; position:absolute; top:-60px; right:-30px;
    width:160px; height:160px; border-radius:999px;
    background:radial-gradient(circle,rgba(37,99,235,.2) 0%,transparent 70%);
    animation:${pulseGlow} 7s ease-in-out infinite; pointer-events:none;
  }
  @media(max-width:980px){ display:none; }
`;
const PanelTitle = styled.div`
  font-size:.9rem; font-weight:700; color:${C.navy};
  margin-bottom:1rem; display:flex; align-items:center; justify-content:space-between;
`;
const MetricGrid = styled.div`display:grid;grid-template-columns:1fr 1fr;gap:.75rem;`;
const MetricCard = styled.div`
  padding:1.15rem; background:#fff; border:1px solid ${C.border}; border-radius:14px;
  transition:border-color .2s,box-shadow .2s,transform .2s;
  &:hover{border-color:${C.blueTint};box-shadow:0 8px 20px rgba(37,99,235,.09);transform:translateY(-2px);}
  .val{font-size:1.5rem;font-weight:800;color:${C.primary};}
  .lbl{font-size:.75rem;color:${C.muted};margin-top:2px;line-height:1.4;}
`;

// ─── Proof band ───────────────────────────────────────────────────────────────
const ProofBand = styled.section`
  border-bottom:1px solid ${C.border};
  background:linear-gradient(180deg,rgba(239,246,255,.9) 0%,rgba(255,255,255,.5) 100%);
`;
const ProofGrid = styled.div`
  max-width:1200px; margin:0 auto; padding:2.5rem 1.5rem;
  display:grid; grid-template-columns:repeat(4,1fr); gap:1rem;
  @media(max-width:760px){grid-template-columns:repeat(2,1fr);}
`;
const ProofCard = styled.div`
  text-align:center; padding:1.5rem 1rem;
  background:#fff; border:1px solid ${C.border}; border-radius:16px;
  box-shadow:0 4px 18px rgba(15,23,42,.04);
  transition:transform .28s ease,border-color .28s ease,box-shadow .28s ease;
  ${revealStyles}
  &:hover{transform:translateY(-4px);border-color:${C.blueTint};box-shadow:0 14px 32px rgba(37,99,235,.1);}
  .icon{color:${C.primary};margin-bottom:.6rem;}
  .val{font-size:1.9rem;font-weight:800;color:${C.navy};}
  .lbl{font-size:.8rem;color:${C.muted};margin-top:.35rem;}
`;

// ─── Section helpers ──────────────────────────────────────────────────────────
const Section = styled.section`max-width:1200px; margin:0 auto; padding:5.5rem 1.5rem;`;
const SectionAlt = styled.section`
  background:${C.softBlue}; border-top:1px solid ${C.blueTint}; border-bottom:1px solid ${C.blueTint};
  padding:5.5rem 1.5rem;
`;
const SectionInner = styled.div`max-width:1200px; margin:0 auto;`;
const SectionHeader = styled.div`text-align:center; max-width:700px; margin:0 auto 3.5rem;`;
const SectionEyebrow = styled.div`
  display:inline-flex; align-items:center; gap:.5rem;
  padding:.4rem .85rem; border-radius:999px;
  background:${C.softBlue}; border:1px solid ${C.blueTint};
  color:${C.primary}; font-weight:700; font-size:.78rem; margin-bottom:.85rem;
  ${revealStyles}
`;
const SectionTitle = styled.h2`
  font-size:clamp(1.8rem,3vw,2.6rem); font-weight:800;
  letter-spacing:-.03em; color:${C.navy}; margin:0 0 .75rem;
  ${revealStyles}
`;
const SectionSub = styled.p`
  font-size:1rem; color:${C.muted}; line-height:1.7; margin:0;
  ${revealStyles}
`;

// ─── Timeline ─────────────────────────────────────────────────────────────────
const TimelineWrapper = styled.div`
  position:relative; max-width:900px; margin:0 auto;
  &::before{
    content:''; position:absolute;
    top:0; left:calc(50% - 1px); height:100%;
    width:2px; background:${C.blueTint};
    @media(max-width:768px){ left:14px; }
  }
`;
const TItem = styled.div`
  position:relative; width:50%;
  padding-right:2.5rem; margin-bottom:3rem;
  &:nth-child(even){ margin-left:auto; padding-right:0; padding-left:2.5rem; }
  @media(max-width:768px){
    width:100%; padding-left:3.5rem !important;
    padding-right:0 !important; margin-left:0 !important;
  }
  &:last-child{ margin-bottom:0; }
  .dot{
    position:absolute; right:-13px; top:10px;
    width:24px; height:24px; border-radius:50%;
    background:${C.primary}; border:3px solid ${C.softBlue};
    box-shadow:0 0 0 3px #fff; z-index:2;
    @media(max-width:768px){ left:0; right:auto; }
  }
  &:nth-child(even) .dot{ left:-13px; right:auto; @media(max-width:768px){ left:0; } }
  ${revealStyles}
`;
const TCard = styled.div`
  background:#fff; padding:1.75rem 2rem; border-radius:20px;
  border:1px solid ${C.border}; box-shadow:0 6px 22px rgba(15,23,42,.05);
  position:relative; overflow:hidden;
  transition:transform .3s ease,border-color .3s ease,box-shadow .3s ease;
  &::after{
    content:''; position:absolute; left:0; right:0; top:0; height:3px;
    background:linear-gradient(90deg,${C.primary},rgba(37,99,235,.3));
    transform:scaleX(0); transform-origin:left; transition:transform .3s ease;
  }
  &:hover{ transform:translateY(-4px); border-color:${C.blueTint}; box-shadow:0 16px 40px rgba(37,99,235,.1); }
  &:hover::after{ transform:scaleX(1); }
  .year{
    display:inline-block; background:${C.softBlue}; color:${C.primary};
    padding:.3rem .8rem; border-radius:8px; font-size:.8rem; font-weight:700;
    margin-bottom:.75rem; border:1px solid ${C.blueTint};
  }
  h4{ font-size:1.2rem; font-weight:800; color:${C.navy}; margin:0 0 .6rem; }
  p{ color:${C.muted}; line-height:1.7; font-size:.92rem; margin:0; }
`;

// ─── Skills ───────────────────────────────────────────────────────────────────
const SkillsGrid = styled.div`
  display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem;
  @media(max-width:1024px){ grid-template-columns:repeat(2,1fr); }
  @media(max-width:640px){  grid-template-columns:1fr; }
  ${revealStyles}
`;
const SkillCard = styled.div`
  background:#fff; border:1px solid ${C.border}; border-radius:20px;
  padding:2rem; box-shadow:0 4px 18px rgba(15,23,42,.04);
  position:relative; overflow:hidden;
  transition:transform .3s,border-color .3s,box-shadow .3s;
  &::after{
    content:''; position:absolute; left:0; right:0; top:0; height:3px;
    background:linear-gradient(90deg,${C.primary},rgba(37,99,235,.3));
    transform:scaleX(0); transform-origin:left; transition:transform .3s;
  }
  &:hover{ transform:translateY(-4px); border-color:${C.blueTint}; box-shadow:0 18px 36px rgba(37,99,235,.1); }
  &:hover::after{ transform:scaleX(1); }
`;
const SkillHeader = styled.div`
  display:flex; align-items:center; gap:.85rem;
  padding-bottom:1.25rem; margin-bottom:1.25rem;
  border-bottom:1px solid ${C.border};
`;
const SkillIconBox = styled.div`
  width:48px; height:48px; border-radius:14px;
  display:flex; align-items:center; justify-content:center;
  background:${C.softBlue}; color:${C.primary}; flex-shrink:0;
  transition:transform .3s,background .3s;
  ${SkillCard}:hover & { transform:scale(1.05); background:rgba(37,99,235,.12); }
`;
const SkillList = styled.ul`
  list-style:none; padding:0; margin:0;
  display:flex; flex-direction:column; gap:1rem;
`;
const SkillItem = styled.li`
  display:flex; align-items:center; justify-content:space-between;
  font-size:.88rem; color:${C.text}; font-weight:500;
`;
const BarBg = styled.div`width:100px;height:5px;background:${C.border};border-radius:999px;overflow:hidden;`;
const BarFill = styled.div`
  height:100%; background:${C.primary}; border-radius:999px;
  width:${({$w})=>$w||'0%'};
`;

// ─── Projects ─────────────────────────────────────────────────────────────────
const ProjectsList = styled.div`display:flex;flex-direction:column;gap:6rem;`;
const FeatureProject = styled.div`
  display:flex; align-items:center; gap:4rem;
  flex-direction:${({$reverse})=>$reverse?'row-reverse':'row'};
  @media(max-width:1024px){ flex-direction:column; gap:2.5rem; }
  ${revealStyles}
`;
const ProjectVisual = styled.div`
  flex:1.2; position:relative;
  &::after{
    content:''; position:absolute; width:100%; height:100%;
    top:18px; ${({$reverse})=>$reverse?'left:-18px;':'right:-18px;'}
    background:${C.softBlue}; border-radius:22px; z-index:-1;
    transition:transform .4s cubic-bezier(.4,0,.2,1);
  }
  &:hover::after{ transform:translate(${({$reverse})=>$reverse?'8px,-8px':'-8px,-8px'}); }
  @media(max-width:1024px){
    width:100%;
    &::after{ top:12px; left:12px; right:auto; }
    &:hover::after{ transform:translate(-4px,-4px); }
  }
`;
const BrowserFrame = styled.div`
  background:#fff; border-radius:18px; overflow:hidden;
  border:1px solid ${C.border}; box-shadow:0 24px 50px -12px rgba(15,23,42,.14);
  .browser-header{
    height:44px; background:#f8fafc; border-bottom:1px solid ${C.border};
    display:flex; align-items:center; padding:0 1.2rem; gap:.5rem;
    .dot{ width:12px; height:12px; border-radius:50%; }
    .red{ background:#ef4444; } .yellow{ background:#f59e0b; } .green{ background:#22c55e; }
    .url{
      margin-left:1rem; background:#fff; height:26px; flex:1; max-width:280px;
      border-radius:6px; border:1px solid ${C.border};
      display:flex; align-items:center; padding:0 .75rem;
      font-size:.72rem; color:${C.muted}; font-family:monospace;
    }
  }
  .img-wrapper{
    position:relative; overflow:hidden; background:${C.bg};
    img{
      width:100%; height:380px; object-fit:cover; object-position:top; display:block;
      transition:transform .6s ease;
    }
    .overlay{
      position:absolute; inset:0;
      background:rgba(15,23,42,.55); backdrop-filter:blur(2px);
      display:flex; align-items:center; justify-content:center;
      opacity:0; transition:opacity .35s ease;
      span{
        background:#fff; color:${C.navy}; padding:.85rem 1.75rem; border-radius:999px;
        font-weight:700; font-size:1rem; display:flex; align-items:center; gap:.6rem;
        transform:translateY(16px); transition:transform .35s ease;
        box-shadow:0 8px 24px rgba(15,23,42,.18);
      }
    }
  }
  &:hover .img-wrapper img{ transform:scale(1.04); }
  &:hover .img-wrapper .overlay{ opacity:1; }
  &:hover .img-wrapper .overlay span{ transform:translateY(0); }
`;
const ProjectInfo = styled.div`
  flex:1;
  .proj-badge{
    display:inline-flex; align-items:center; gap:.5rem;
    padding:.4rem 1rem; background:${C.softBlue}; color:${C.primary};
    border:1px solid ${C.blueTint}; border-radius:999px;
    font-size:.78rem; font-weight:700; margin-bottom:1.25rem;
    text-transform:uppercase; letter-spacing:.06em;
  }
  h3{
    font-size:clamp(1.8rem,3vw,2.6rem); font-weight:800; color:${C.navy};
    margin:0 0 1.1rem; letter-spacing:-.025em; line-height:1.1;
  }
  p{ color:${C.muted}; font-size:1.05rem; line-height:1.8; margin-bottom:2rem; }
  .stack{
    display:flex; flex-wrap:wrap; gap:.65rem; margin-bottom:2.25rem;
    span{
      display:inline-flex; align-items:center; gap:.4rem;
      padding:.5rem 1rem; background:#fff; border:1px solid ${C.border};
      border-radius:10px; font-size:.85rem; font-weight:600; color:${C.text};
      transition:border-color .2s,transform .2s;
      svg{ color:${C.muted}; }
      &:hover{ border-color:${C.blueTint}; transform:translateY(-2px); }
    }
  }
  .actions{
    display:flex; gap:1rem; flex-wrap:wrap;
    a{
      padding:.85rem 1.6rem; border-radius:12px; font-weight:600; font-size:.95rem;
      display:inline-flex; align-items:center; gap:.6rem; text-decoration:none;
      transition:all .2s ease;
      &.btn-primary{
        background:${C.navy}; color:#fff; box-shadow:0 8px 20px rgba(15,23,42,.25);
        &:hover{ background:#1e293b; transform:translateY(-2px); box-shadow:0 12px 28px rgba(15,23,42,.3); }
      }
      &.btn-secondary{
        background:#fff; color:${C.navy}; border:1.5px solid ${C.border};
        &:hover{ border-color:${C.primary}; color:${C.primary}; transform:translateY(-2px); }
      }
    }
  }
`;

// ─── Philosophy ───────────────────────────────────────────────────────────────
const PhiloCard = styled.div`
  display:grid; grid-template-columns:1fr 1fr; gap:4rem; align-items:center;
  background:#fff; border:1px solid ${C.border}; border-radius:28px; padding:4rem;
  box-shadow:0 16px 40px rgba(15,23,42,.06);
  position:relative; overflow:hidden;
  &::before{
    content:''; position:absolute; top:-80px; right:-40px;
    width:200px; height:200px; border-radius:999px;
    background:radial-gradient(circle,rgba(37,99,235,.08) 0%,transparent 70%);
    pointer-events:none;
  }
  ${revealStyles}
  @media(max-width:900px){ grid-template-columns:1fr; padding:2.5rem; gap:2.5rem; }
`;
const PhiloContent = styled.div`
  h3{ font-size:clamp(1.8rem,2.5vw,2.4rem); font-weight:800; color:${C.navy}; margin:0 0 1rem; letter-spacing:-.025em; }
  p{ color:${C.muted}; font-size:1rem; line-height:1.8; margin-bottom:2rem; }
`;
const PhiloPrinciples = styled.ul`
  list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:1.25rem;
`;
const Principle = styled.li`
  display:flex; gap:1rem; align-items:flex-start;
  .icon-box{ background:${C.softBlue}; color:${C.primary}; padding:.65rem; border-radius:12px; display:flex; flex-shrink:0; }
  .txt strong{ display:block; color:${C.navy}; font-size:1rem; font-weight:700; margin-bottom:.2rem; }
  .txt span{ color:${C.muted}; font-size:.9rem; line-height:1.6; }
`;
const PhiloVisual = styled.div`
  position:relative;
  img{ width:100%; border-radius:18px; box-shadow:0 24px 50px rgba(15,23,42,.12); display:block; }
  .badge{
    position:absolute; bottom:-18px; right:-18px;
    background:#fff; padding:1.25rem 1.5rem; border-radius:16px;
    box-shadow:0 12px 28px rgba(15,23,42,.1); text-align:center;
    border:1px solid ${C.border};
    strong{ display:block; font-size:1.5rem; font-weight:800; color:${C.navy}; }
    span{ color:${C.muted}; font-size:.82rem; }
  }
  @media(max-width:900px){ .badge{ bottom:-14px; right:0; } }
`;

// ─── Stats band ───────────────────────────────────────────────────────────────
const StatsWrap = styled.div`max-width:1200px; margin:0 auto; padding:0 1.5rem 6rem;`;
const StatsGrid = styled.div`
  display:grid; grid-template-columns:repeat(4,1fr); gap:1.5rem;
  background:linear-gradient(135deg,#1e40af 0%,${C.primary} 100%);
  border-radius:28px; padding:4rem 2.5rem; color:#fff; text-align:center;
  box-shadow:0 24px 50px rgba(37,99,235,.35);
  position:relative; overflow:hidden;
  &::before{
    content:''; position:absolute; top:-60%; left:-30%; right:-30%;
    height:140%; border-radius:50%;
    background:radial-gradient(circle,rgba(255,255,255,.07) 0%,transparent 60%);
    pointer-events:none;
  }
  @media(max-width:800px){ grid-template-columns:repeat(2,1fr); }
  ${revealStyles}
`;
const StatItem = styled.div`
  position:relative; z-index:1;
  .icon-wrap{
    width:56px; height:56px; background:rgba(255,255,255,.12); border-radius:50%;
    display:flex; align-items:center; justify-content:center;
    margin:0 auto 1rem; backdrop-filter:blur(8px);
  }
  .val{ font-size:3rem; font-weight:800; line-height:1; margin-bottom:.35rem; letter-spacing:-.04em; }
  .lbl{ color:#bfdbfe; font-size:.88rem; font-weight:600; text-transform:uppercase; letter-spacing:.06em; }
`;

// ─── Page component ───────────────────────────────────────────────────────────
export default function DeveloperPageV2() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const nodes = Array.from(document.querySelectorAll('[data-reveal]'));
    if (!nodes.length) return undefined;
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
      nodes.forEach(n => n.classList.add('is-visible'));
      return undefined;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: .13, rootMargin: '0px 0px -8% 0px' });
    nodes.forEach(n => obs.observe(n));
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
              <Eyebrow><Rocket size={14} />{t('developer.hero.role')}</Eyebrow>
              <HeroTitle>
                {t('developer.hero.title1')}
                <span>{t('developer.hero.title2')}</span>
              </HeroTitle>
              <HeroSubtitle>{t('developer.hero.desc')}</HeroSubtitle>
              <HeroActions>
                <PrimaryBtn>{t('developer.hero.ctaProjects')} <ArrowRight size={17}/></PrimaryBtn>
                <SecondaryBtn>{t('developer.hero.ctaContact')}</SecondaryBtn>
              </HeroActions>
            </HeroContent>

            <HeroPanel>
              <PanelTitle>
                En quelques chiffres
                <BadgeCheck size={18} color={C.primary}/>
              </PanelTitle>
              <MetricGrid>
                {[
                  {val: t('developer.stats.0.value'), lbl: t('developer.stats.0.label')},
                  {val: t('developer.stats.1.value'), lbl: t('developer.stats.1.label')},
                  {val: t('developer.stats.2.value'), lbl: t('developer.stats.2.label')},
                  {val: t('developer.stats.3.value'), lbl: t('developer.stats.3.label')},
                ].map(({val,lbl}) => (
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
              {icon:<GraduationCap size={22}/>, val:t('developer.stats.0.value'), lbl:t('developer.stats.0.label')},
              {icon:<Code2 size={22}/>,          val:t('developer.stats.1.value'), lbl:t('developer.stats.1.label')},
              {icon:<Briefcase size={22}/>,       val:t('developer.stats.2.value'), lbl:t('developer.stats.2.label')},
              {icon:<Coffee size={22}/>,          val:t('developer.stats.3.value'), lbl:t('developer.stats.3.label')},
            ].map(({icon,val,lbl},i) => (
              <ProofCard key={lbl} data-reveal style={{'--reveal-delay':`${i*80}ms`}}>
                <div className="icon">{icon}</div>
                <div className="val">{val}</div>
                <div className="lbl">{lbl}</div>
              </ProofCard>
            ))}
          </ProofGrid>
        </ProofBand>

        {/* ── Timeline ── */}
        <SectionAlt>
          <SectionInner>
            <SectionHeader>
              <SectionEyebrow data-reveal><Compass size={13}/>&nbsp;Parcours</SectionEyebrow>
              <SectionTitle data-reveal style={{'--reveal-delay':'80ms'}}>{t('developer.journey.title')}</SectionTitle>
              <SectionSub data-reveal style={{'--reveal-delay':'140ms'}}>{t('developer.journey.subtitle')}</SectionSub>
            </SectionHeader>
            <TimelineWrapper>
              {[0,1,2,3,4].map((i) => (
                <TItem key={i} data-reveal style={{'--reveal-delay':`${i*100}ms`}}>
                  <div className="dot"/>
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
        <Section>
          <SectionHeader>
            <SectionEyebrow data-reveal><Code size={13}/>&nbsp;Compétences</SectionEyebrow>
            <SectionTitle data-reveal style={{'--reveal-delay':'80ms'}}>{t('developer.skills.title')}</SectionTitle>
            <SectionSub data-reveal style={{'--reveal-delay':'140ms'}}>{t('developer.skills.subtitle')}</SectionSub>
          </SectionHeader>
          <SkillsGrid data-reveal style={{'--reveal-delay':'100ms'}}>
            <SkillCard>
              <SkillHeader>
                <SkillIconBox><MonitorSmartphone size={26}/></SkillIconBox>
                <strong style={{fontSize:'1.1rem',fontWeight:800,color:C.navy}}>{t('developer.skills.categories.0')}</strong>
              </SkillHeader>
              <SkillList>
                {[['React / Next.js','95%'],['Javascript / ES6+','90%'],['Tailwind / Styled-Comp','95%'],['HTML5 / CSS3','98%'],['Framer Motion / GSAP','80%'],['Zustand / Context API','88%']].map(([n,w])=>(
                  <SkillItem key={n}><span>{n}</span><BarBg><BarFill $w={w}/></BarBg></SkillItem>
                ))}
              </SkillList>
            </SkillCard>

            <SkillCard>
              <SkillHeader>
                <SkillIconBox><Database size={26}/></SkillIconBox>
                <strong style={{fontSize:'1.1rem',fontWeight:800,color:C.navy}}>{t('developer.skills.categories.1')}</strong>
              </SkillHeader>
              <SkillList>
                {[['Node.js / Express','85%'],['PostgreSQL / SQL','80%'],['Convex (BaaS)','90%'],['APIs REST / Webhooks','92%'],['WebRTC / LiveKit','80%'],['JWT / OAuth / Auth','85%']].map(([n,w])=>(
                  <SkillItem key={n}><span>{n}</span><BarBg><BarFill $w={w}/></BarBg></SkillItem>
                ))}
              </SkillList>
            </SkillCard>

            <SkillCard>
              <SkillHeader>
                <SkillIconBox><Wrench size={26}/></SkillIconBox>
                <strong style={{fontSize:'1.1rem',fontWeight:800,color:C.navy}}>{t('developer.skills.categories.2')}</strong>
              </SkillHeader>
              <SkillList>
                {[['Git / GitHub','90%'],['Vite / Webpack','85%'],['Figma / UX-UI Design','85%'],['Vercel / Netlify','90%'],['Postman / API Testing','90%'],['VS Code / CLI Bash','95%']].map(([n,w])=>(
                  <SkillItem key={n}><span>{n}</span><BarBg><BarFill $w={w}/></BarBg></SkillItem>
                ))}
              </SkillList>
            </SkillCard>
          </SkillsGrid>
        </Section>

        {/* ── Projects ── */}
        <SectionAlt>
          <SectionInner>
            <SectionHeader>
              <SectionEyebrow data-reveal><Terminal size={13}/>&nbsp;Projets</SectionEyebrow>
              <SectionTitle data-reveal style={{'--reveal-delay':'80ms'}}>{t('developer.projects.title')}</SectionTitle>
              <SectionSub data-reveal style={{'--reveal-delay':'140ms'}}>{t('developer.projects.subtitle')}</SectionSub>
            </SectionHeader>
            <ProjectsList>

              <FeatureProject data-reveal>
                <ProjectVisual>
                  <BrowserFrame>
                    <div className="browser-header">
                      <div className="dot red"/><div className="dot yellow"/><div className="dot green"/>
                      <div className="url">app.visioconnect.com</div>
                    </div>
                    <div className="img-wrapper">
                      <img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="VisioConnect"/>
                      <div className="overlay"><span><Play size={18}/> {t('developer.livePreview')}</span></div>
                    </div>
                  </BrowserFrame>
                </ProjectVisual>
                <ProjectInfo>
                  <div className="proj-badge">{t('developer.projects.items.0.category')}</div>
                  <h3>{t('developer.projects.items.0.title')}</h3>
                  <p>{t('developer.projects.items.0.desc')}</p>
                  <div className="stack">
                    <span><Layout size={14}/>React.js</span>
                    <span><Server size={14}/>Node.js</span>
                    <span><Zap size={14}/>LiveKit</span>
                    <span><Database size={14}/>Convex</span>
                    <span><MonitorSmartphone size={14}/>Tailwind CSS</span>
                  </div>
                  <div className="actions">
                    <a href="#" className="btn-primary">{t('developer.projects.items.0.cta')} <ArrowRight size={16}/></a>
                    <a href="#" className="btn-secondary"><Github size={16}/>Code source</a>
                  </div>
                </ProjectInfo>
              </FeatureProject>

              <FeatureProject $reverse data-reveal style={{'--reveal-delay':'60ms'}}>
                <ProjectVisual $reverse>
                  <BrowserFrame>
                    <div className="browser-header">
                      <div className="dot red"/><div className="dot yellow"/><div className="dot green"/>
                      <div className="url">dashboard.financeflow.io</div>
                    </div>
                    <div className="img-wrapper">
                      <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Finance Dashboard"/>
                      <div className="overlay"><span><Play size={18}/> {t('developer.livePreview')}</span></div>
                    </div>
                  </BrowserFrame>
                </ProjectVisual>
                <ProjectInfo>
                  <div className="proj-badge">{t('developer.projects.items.1.category')}</div>
                  <h3>{t('developer.projects.items.1.title')}</h3>
                  <p>{t('developer.projects.items.1.desc')}</p>
                  <div className="stack">
                    <span><Layout size={14}/>Next.js</span>
                    <span><Code2 size={14}/>TypeScript</span>
                    <span><Database size={14}/>PostgreSQL</span>
                    <span><Database size={14}/>Prisma ORM</span>
                    <span><Layout size={14}/>Recharts</span>
                  </div>
                  <div className="actions">
                    <a href="#" className="btn-primary">{t('developer.projects.items.1.cta')} <ArrowRight size={16}/></a>
                    <a href="#" className="btn-secondary"><Github size={16}/>Architecture</a>
                  </div>
                </ProjectInfo>
              </FeatureProject>

              <FeatureProject data-reveal style={{'--reveal-delay':'60ms'}}>
                <ProjectVisual>
                  <BrowserFrame>
                    <div className="browser-header">
                      <div className="dot red"/><div className="dot yellow"/><div className="dot green"/>
                      <div className="url">studio.nexusai.dev</div>
                    </div>
                    <div className="img-wrapper">
                      <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="AI Builder"/>
                      <div className="overlay"><span><Play size={18}/> {t('developer.livePreview')}</span></div>
                    </div>
                  </BrowserFrame>
                </ProjectVisual>
                <ProjectInfo>
                  <div className="proj-badge">{t('developer.projects.items.2.category')}</div>
                  <h3>{t('developer.projects.items.2.title')}</h3>
                  <p>{t('developer.projects.items.2.desc')}</p>
                  <div className="stack">
                    <span><Layout size={14}/>React.js</span>
                    <span><Zap size={14}/>OpenAI API</span>
                    <span><Server size={14}/>Express</span>
                    <span><Wrench size={14}/>Vite</span>
                    <span><Code2 size={14}/>AI Engineering</span>
                  </div>
                  <div className="actions">
                    <a href="#" className="btn-primary">{t('developer.projects.items.2.cta')} <ArrowRight size={16}/></a>
                    <a href="#" className="btn-secondary"><Github size={16}/>Repository</a>
                  </div>
                </ProjectInfo>
              </FeatureProject>

            </ProjectsList>
          </SectionInner>
        </SectionAlt>

        {/* ── Philosophy ── */}
        <Section>
          <PhiloCard data-reveal>
            <PhiloContent>
              <h3>{t('developer.philosophy.title')}</h3>
              <p>{t('developer.philosophy.desc')}</p>
              <PhiloPrinciples>
                {[
                  {icon:<Star size={20}/>,        title:t('developer.philosophy.principles.0.title'), desc:t('developer.philosophy.principles.0.desc')},
                  {icon:<Zap size={20}/>,          title:t('developer.philosophy.principles.1.title'), desc:t('developer.philosophy.principles.1.desc')},
                  {icon:<Heart size={20}/>,        title:t('developer.philosophy.principles.2.title'), desc:t('developer.philosophy.principles.2.desc')},
                ].map(({icon,title,desc})=>(
                  <Principle key={title}>
                    <div className="icon-box">{icon}</div>
                    <div className="txt"><strong>{title}</strong><span>{desc}</span></div>
                  </Principle>
                ))}
              </PhiloPrinciples>
            </PhiloContent>
            <PhiloVisual>
              <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Code setup"/>
              <div className="badge"><strong>100%</strong><span>Apprentissage Continu</span></div>
            </PhiloVisual>
          </PhiloCard>
        </Section>

        {/* ── Stats ── */}
        <StatsWrap>
          <StatsGrid data-reveal>
            {[
              {icon:<GraduationCap size={28}/>, val:t('developer.stats.0.value'), lbl:t('developer.stats.0.label')},
              {icon:<Code2 size={28}/>,          val:t('developer.stats.1.value'), lbl:t('developer.stats.1.label')},
              {icon:<Briefcase size={28}/>,       val:t('developer.stats.2.value'), lbl:t('developer.stats.2.label')},
              {icon:<Coffee size={28}/>,          val:t('developer.stats.3.value'), lbl:t('developer.stats.3.label')},
            ].map(({icon,val,lbl})=>(
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

