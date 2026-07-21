import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Monitor, Smartphone, Globe } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

const Wrapper = styled.section`
  padding: 6rem 1.5rem;
  background: #f8fafc; // Slate-50 explicitly
  border-bottom: 1px solid #e2e8f0;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1.2fr;
  }
`;

/* --- TEXT CONTENT --- */
const ContentSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  z-index: 10;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #eff6ff;
  color: #2563eb;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  align-self: flex-start;
  border: 1px solid #dbeafe;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  color: #0f172a; // Slate-900 (Dark text explicitly)
  line-height: 1.1;
  letter-spacing: -0.025em;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #475569; // Slate-600
  font-weight: 500;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #64748b; // Slate-500
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const NavButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid #cbd5e1;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #1e293b;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;

  &:hover {
    background: #f1f5f9;
    border-color: #94a3b8;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

/* --- IMAGE SIDE --- */
const ImageSide = styled.div`
  position: relative;
  height: 500px;

  @media (max-width: 768px) {
    height: 350px;
    order: -1; // Image on top on mobile
  }
`;

const CardStack = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageCard = styled(motion.div)`
  position: absolute;
  width: 90%;
  height: 90%;
  background: linear-gradient(160deg, #eff6ff 0%, #ffffff 45%, #dbeafe 100%);
  border-radius: 20px;
  border: 1px solid #dbeafe;
  box-shadow:
    0 20px 45px -18px rgba(37, 99, 235, 0.35),
    0 8px 20px -12px rgba(15, 23, 42, 0.15);
  overflow: hidden;
  padding: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;

  & > svg,
  & > div {
    width: 100%;
    height: 100%;
  }
`;

/* ------------------------------------------------------------------
   Illustrations SVG maison
   ------------------------------------------------------------------ */

const IllustrationWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* Petite silhouette abstraite pour repr\u00e9senter un participant sans
   tomber dans le mockup enfantin \u00e0 grosses initiales. */
const AbstractPerson = ({ x, y, hueVar = 'a', size = 1 }) => {
  const gradients = {
    a: ['#2563eb', '#1d4ed8'],
    b: ['#60a5fa', '#2563eb'],
    c: ['#6366f1', '#4f46e5'],
    d: ['#93c5fd', '#3b82f6'],
    e: ['#38bdf8', '#0ea5e9'],
    f: ['#818cf8', '#6366f1'],
  };
  const [c1, c2] = gradients[hueVar] || gradients.a;
  const rHead = 6 * size;
  const rBody = 18 * size;
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx="0" cy="-8" r={rHead} fill={c1} opacity="0.9" />
      <path
        d={`M ${-rBody} ${16 * size} A ${rBody} ${rBody} 0 0 1 ${rBody} ${16 * size} L ${rBody} ${
          22 * size
        } L ${-rBody} ${22 * size} Z`}
        fill={c2}
        opacity="0.85"
      />
    </g>
  );
};

/* Slide 1 \u2014 R\u00e9union : fen\u00eatre navigateur + speaker principal + tuiles + chat */
const MeetingIllustration = () => (
  <IllustrationWrapper>
    <svg viewBox="0 0 400 280" width="100%" height="100%" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="mtgSpeaker" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eff6ff" />
          <stop offset="100%" stopColor="#dbeafe" />
        </linearGradient>
        <linearGradient id="mtgTile1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0f9ff" />
          <stop offset="100%" stopColor="#e0f2fe" />
        </linearGradient>
      </defs>

      {/* Cadre fen\u00eatre */}
      <rect x="8" y="8" width="384" height="264" rx="14" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="8" y="8" width="384" height="30" rx="14" fill="#f8fafc" />
      <rect x="8" y="30" width="384" height="8" fill="#f8fafc" />
      <circle cx="22" cy="23" r="3.5" fill="#fca5a5" />
      <circle cx="34" cy="23" r="3.5" fill="#fcd34d" />
      <circle cx="46" cy="23" r="3.5" fill="#86efac" />
      <rect x="140" y="17" width="120" height="12" rx="6" fill="#e2e8f0" />
      <rect x="360" y="17" width="20" height="12" rx="3" fill="#e2e8f0" />

      {/* Zone principale : speaker + tuiles + chat */}
      {/* Speaker principal (grande zone gauche) */}
      <rect x="20" y="50" width="220" height="164" rx="10" fill="url(#mtgSpeaker)" stroke="#dbeafe" strokeWidth="1" />
      <AbstractPerson x={130} y={130} hueVar="a" size={2.2} />

      {/* Overlay bas : nom + micro */}
      <rect x="28" y="196" width="90" height="14" rx="7" fill="rgba(15,23,42,0.75)" />
      <rect x="34" y="201" width="60" height="4" rx="2" fill="#ffffff" />
      <circle cx="228" cy="60" r="9" fill="#ef4444" />
      <text x="228" y="63" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7" fontWeight="700" fill="#ffffff">REC</text>

      {/* Colonne participants */}
      <g>
        <rect x="248" y="50" width="66" height="46" rx="8" fill="url(#mtgTile1)" stroke="#e2e8f0" strokeWidth="0.8" />
        <AbstractPerson x={281} y={78} hueVar="b" size={0.9} />

        <rect x="248" y="102" width="66" height="46" rx="8" fill="url(#mtgTile1)" stroke="#e2e8f0" strokeWidth="0.8" />
        <AbstractPerson x={281} y={130} hueVar="c" size={0.9} />

        <rect x="248" y="154" width="66" height="46" rx="8" fill="url(#mtgTile1)" stroke="#e2e8f0" strokeWidth="0.8" />
        <AbstractPerson x={281} y={182} hueVar="d" size={0.9} />
        {/* Micro coup\u00e9 */}
        <circle cx="305" cy="163" r="6" fill="#0f172a" opacity="0.8" />
        <line x1="302" y1="160" x2="308" y2="166" stroke="#ffffff" strokeWidth="1" />
      </g>

      {/* Panneau chat */}
      <rect x="322" y="50" width="60" height="164" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
      <rect x="328" y="58" width="38" height="5" rx="2.5" fill="#94a3b8" />
      {/* Bulles de chat */}
      {[
        { y: 72, w: 44, self: false },
        { y: 92, w: 32, self: true },
        { y: 112, w: 40, self: false },
        { y: 132, w: 28, self: false },
        { y: 152, w: 36, self: true },
      ].map((b, i) => (
        <g key={i}>
          <rect
            x={b.self ? 380 - b.w : 328}
            y={b.y}
            width={b.w}
            height="12"
            rx="6"
            fill={b.self ? '#2563eb' : '#e2e8f0'}
          />
        </g>
      ))}
      <rect x="328" y="196" width="48" height="10" rx="5" fill="#e2e8f0" />

      {/* Barre d'outils */}
      <rect x="20" y="228" width="362" height="30" rx="15" fill="#f1f5f9" />
      {[100, 130, 160, 190, 220, 250, 280].map((cx, i) => (
        <circle key={i} cx={cx} cy="243" r="9" fill={i < 2 ? '#2563eb' : '#94a3b8'} />
      ))}
      <circle cx="310" cy="243" r="9" fill="#ef4444" />

      {/* Compteur temps */}
      <rect x="30" y="238" width="52" height="11" rx="5.5" fill="rgba(37,99,235,0.1)" />
      <text x="56" y="246" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="700" fill="#2563eb">
        24:18
      </text>
    </svg>
  </IllustrationWrapper>
);

/* Slide 2 \u2014 Analytics : vrai dashboard avec KPI + line chart + bar chart + liste */
const AnalyticsIllustration = () => (
  <IllustrationWrapper>
    <svg viewBox="0 0 400 280" width="100%" height="100%" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="chartArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="barGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
      </defs>

      {/* Cadre fen\u00eatre */}
      <rect x="8" y="8" width="384" height="264" rx="14" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="8" y="8" width="384" height="30" rx="14" fill="#f8fafc" />
      <rect x="8" y="30" width="384" height="8" fill="#f8fafc" />
      <rect x="22" y="17" width="14" height="12" rx="3" fill="#e2e8f0" />
      <rect x="42" y="17" width="80" height="12" rx="6" fill="#e2e8f0" />

      {/* KPI Cards */}
      {[
        { x: 22, label: 'R\u00e9unions', value: '128', trend: '+12%' },
        { x: 148, label: 'Participants', value: '842', trend: '+8%' },
        { x: 274, label: 'Dur\u00e9e moy.', value: '42min', trend: '+3%' },
      ].map((k, i) => (
        <g key={i}>
          <rect x={k.x} y="52" width="104" height="52" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
          <text x={k.x + 12} y="68" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="600" fill="#64748b">
            {k.label}
          </text>
          <text x={k.x + 12} y="88" fontFamily="Inter, sans-serif" fontSize="16" fontWeight="800" fill="#0f172a">
            {k.value}
          </text>
          <rect x={k.x + 68} y="78" width="26" height="12" rx="6" fill="rgba(16,185,129,0.15)" />
          <text
            x={k.x + 81}
            y="87"
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
            fontSize="7"
            fontWeight="700"
            fill="#059669"
          >
            {k.trend}
          </text>
        </g>
      ))}

      {/* Chart card gauche : line chart */}
      <rect x="22" y="118" width="230" height="140" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      <text x="36" y="136" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="700" fill="#0f172a">
        Engagement
      </text>
      <circle cx="216" cy="134" r="3" fill="#10b981" />
      <text x="224" y="137" fontFamily="Inter, sans-serif" fontSize="7" fontWeight="600" fill="#10b981">
        Live
      </text>

      {/* Grille */}
      {[160, 185, 210, 235].map((y) => (
        <line key={y} x1="36" y1={y} x2="238" y2={y} stroke="#f1f5f9" strokeWidth="0.8" />
      ))}

      {/* Aire + ligne */}
      <path
        d="M 36 220 L 60 205 L 84 195 L 108 180 L 132 165 L 156 175 L 180 155 L 204 150 L 228 138 L 238 130 L 238 246 L 36 246 Z"
        fill="url(#chartArea)"
      />
      <path
        d="M 36 220 L 60 205 L 84 195 L 108 180 L 132 165 L 156 175 L 180 155 L 204 150 L 228 138 L 238 130"
        stroke="#2563eb"
        strokeWidth="1.75"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {[60, 108, 156, 204, 238].map((cx, i) => (
        <circle key={i} cx={cx} cy={[205, 180, 175, 150, 130][i]} r="2.5" fill="#2563eb" />
      ))}

      {/* Chart card droite : bar chart */}
      <rect x="262" y="118" width="120" height="140" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      <text x="274" y="136" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="700" fill="#0f172a">
        Par jour
      </text>

      {[
        { x: 274, h: 34 },
        { x: 288, h: 52 },
        { x: 302, h: 40 },
        { x: 316, h: 70 },
        { x: 330, h: 58 },
        { x: 344, h: 88 },
        { x: 358, h: 66 },
      ].map((b, i) => (
        <rect key={i} x={b.x} y={244 - b.h} width="8" height={b.h} rx="2" fill="url(#barGrad)" />
      ))}
    </svg>
  </IllustrationWrapper>
);

/* Slide 3 \u2014 Multi-\u00e9crans : desktop + tablette + smartphone avec m\u00eame UI */
const MultiDeviceIllustration = () => (
  <IllustrationWrapper>
    <svg viewBox="0 0 400 280" width="100%" height="100%" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="mdScreen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eff6ff" />
          <stop offset="100%" stopColor="#dbeafe" />
        </linearGradient>
      </defs>

      {/* Halo derri\u00e8re */}
      <ellipse cx="200" cy="150" rx="180" ry="100" fill="#eff6ff" opacity="0.7" />

      {/* Laptop (arri\u00e8re-plan) */}
      <g>
        {/* \u00e9cran */}
        <rect x="70" y="52" width="230" height="140" rx="8" fill="#0f172a" />
        <rect x="76" y="58" width="218" height="128" rx="4" fill="url(#mdScreen)" />
        {/* mini UI dans laptop */}
        <rect x="82" y="64" width="206" height="10" rx="2" fill="#ffffff" />
        <circle cx="88" cy="69" r="1.5" fill="#fca5a5" />
        <circle cx="93" cy="69" r="1.5" fill="#fcd34d" />
        <circle cx="98" cy="69" r="1.5" fill="#86efac" />
        <rect x="82" y="80" width="140" height="94" rx="3" fill="#ffffff" />
        <rect x="228" y="80" width="60" height="44" rx="3" fill="#ffffff" />
        <rect x="228" y="130" width="60" height="44" rx="3" fill="#ffffff" />
        {/* silhouettes */}
        <AbstractPerson x={152} y={128} hueVar="a" size={1.4} />
        <AbstractPerson x={258} y={100} hueVar="b" size={0.6} />
        <AbstractPerson x={258} y={150} hueVar="c" size={0.6} />

        {/* base du laptop */}
        <rect x="52" y="192" width="266" height="8" rx="3" fill="#1e293b" />
        <rect x="160" y="192" width="50" height="4" rx="2" fill="#0f172a" />
      </g>

      {/* Tablette (milieu) */}
      <g transform="translate(230 116)">
        <rect width="90" height="122" rx="8" fill="#0f172a" />
        <rect x="4" y="4" width="82" height="114" rx="5" fill="url(#mdScreen)" />
        <rect x="8" y="8" width="74" height="8" rx="2" fill="#ffffff" />
        <rect x="8" y="20" width="74" height="60" rx="3" fill="#ffffff" />
        <AbstractPerson x={45} y={52} hueVar="a" size={0.9} />
        <rect x="8" y="84" width="35" height="30" rx="3" fill="#ffffff" />
        <rect x="47" y="84" width="35" height="30" rx="3" fill="#ffffff" />
        <AbstractPerson x={25} y={100} hueVar="b" size={0.5} />
        <AbstractPerson x={64} y={100} hueVar="c" size={0.5} />
      </g>

      {/* Smartphone (avant-plan) */}
      <g transform="translate(56 130)">
        <rect width="72" height="128" rx="12" fill="#0f172a" />
        <rect x="4" y="4" width="64" height="120" rx="8" fill="url(#mdScreen)" />
        <rect x="28" y="8" width="16" height="3" rx="1.5" fill="#0f172a" />
        {/* UI mobile */}
        <rect x="8" y="18" width="56" height="6" rx="2" fill="#ffffff" />
        <rect x="8" y="28" width="56" height="52" rx="4" fill="#ffffff" />
        <AbstractPerson x={36} y={57} hueVar="a" size={0.85} />
        <rect x="8" y="84" width="26" height="24" rx="3" fill="#ffffff" />
        <rect x="38" y="84" width="26" height="24" rx="3" fill="#ffffff" />
        <AbstractPerson x={21} y={98} hueVar="b" size={0.45} />
        <AbstractPerson x={51} y={98} hueVar="c" size={0.45} />
        {/* barre outils */}
        <rect x="8" y="112" width="56" height="8" rx="4" fill="#eff6ff" />
        <circle cx="20" cy="116" r="2.5" fill="#2563eb" />
        <circle cx="30" cy="116" r="2.5" fill="#2563eb" />
        <circle cx="40" cy="116" r="2.5" fill="#94a3b8" />
        <circle cx="52" cy="116" r="2.5" fill="#ef4444" />
      </g>

      {/* Badge en haut */}
      <g transform="translate(150 20)">
        <rect width="100" height="22" rx="11" fill="#ffffff" stroke="#dbeafe" strokeWidth="1.2" />
        <circle cx="14" cy="11" r="4" fill="#10b981" />
        <text
          x="56"
          y="14"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontSize="8"
          fontWeight="700"
          fill="#0f172a"
        >
          RESPONSIVE
        </text>
      </g>
    </svg>
  </IllustrationWrapper>
);

const ILLUSTRATION_MAP = {
  meeting: MeetingIllustration,
  global: AnalyticsIllustration,
  mobile: MultiDeviceIllustration,
};

export default function FeaturesCarousel3D() {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);

  const SLIDES = [
    {
      id: 1,
      title: t('featuresCarousel.slide1.title'),
      subtitle: t('featuresCarousel.slide1.subtitle'),
      description: t('featuresCarousel.slide1.description'),
      illustration: 'meeting',
      icon: Monitor,
      tag: t('featuresCarousel.slide1.tag'),
    },
    {
      id: 2,
      title: t('featuresCarousel.slide2.title'),
      subtitle: t('featuresCarousel.slide2.subtitle'),
      description: t('featuresCarousel.slide2.description'),
      illustration: 'global',
      icon: Globe,
      tag: t('featuresCarousel.slide2.tag'),
    },
    {
      id: 3,
      title: t('featuresCarousel.slide3.title'),
      subtitle: t('featuresCarousel.slide3.subtitle'),
      description: t('featuresCarousel.slide3.description'),
      illustration: 'mobile',
      icon: Smartphone,
      tag: t('featuresCarousel.slide3.tag'),
    },
  ];

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const currentSlide = SLIDES[index];

  return (
    <Wrapper>
      <Container>
        <ContentSide>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              <Badge>
                <currentSlide.icon size={16} />
                {currentSlide.tag}
              </Badge>
              <Title>{currentSlide.title}</Title>
              <Subtitle>{currentSlide.subtitle}</Subtitle>
              <Description>{currentSlide.description}</Description>
            </motion.div>
          </AnimatePresence>

          <Controls>
            <NavButton onClick={prevSlide} aria-label="Précédent">
              <ChevronLeft size={24} />
            </NavButton>
            <NavButton onClick={nextSlide} aria-label="Suivant">
              <ChevronRight size={24} />
            </NavButton>
          </Controls>
        </ContentSide>

        <ImageSide>
          <CardStack>
            <AnimatePresence initial={false} mode="popLayout">
              {/* Carte d'arrière-plan (aperçu suivant) */}
              {(() => {
                const NextIllustration =
                  ILLUSTRATION_MAP[SLIDES[(index + 1) % SLIDES.length].illustration];
                const CurrentIllustration =
                  ILLUSTRATION_MAP[currentSlide.illustration];
                return (
                  <>
                    <ImageCard
                      key={`bg-${(index + 1) % SLIDES.length}`}
                      initial={{ scale: 0.86, opacity: 0, x: 30 }}
                      animate={{ scale: 0.92, opacity: 0.35, x: 28 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                      <NextIllustration />
                    </ImageCard>

                    {/* Carte active */}
                    <ImageCard
                      key={`active-${index}`}
                      initial={{ opacity: 0, scale: 0.96, x: 40 }}
                      animate={{ opacity: 1, scale: 1, x: 0, zIndex: 10 }}
                      exit={{ opacity: 0, scale: 0.96, x: -40 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                    >
                      <CurrentIllustration />
                    </ImageCard>
                  </>
                );
              })()}
            </AnimatePresence>
          </CardStack>
        </ImageSide>
      </Container>
    </Wrapper>
  );
}
