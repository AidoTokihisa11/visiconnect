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
   Branded illustrations (remplacent les photos stock Unsplash)
   ------------------------------------------------------------------ */

const IllustrationWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* Slide 1 : mockup d'interface de réunion (fenêtre navigateur + tuiles) */
const MeetingIllustration = () => (
  <IllustrationWrapper>
    <svg viewBox="0 0 400 280" width="100%" height="100%" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="tileA" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="tileB" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="tileC" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
        <linearGradient id="tileD" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>

      {/* Fenêtre / cadre navigateur */}
      <rect x="10" y="10" width="380" height="260" rx="14" fill="#ffffff" stroke="#dbeafe" strokeWidth="1.5" />
      <rect x="10" y="10" width="380" height="32" rx="14" fill="#f8fafc" />
      <rect x="10" y="32" width="380" height="10" fill="#f8fafc" />
      <circle cx="26" cy="26" r="4" fill="#fca5a5" />
      <circle cx="40" cy="26" r="4" fill="#fcd34d" />
      <circle cx="54" cy="26" r="4" fill="#86efac" />
      <rect x="140" y="20" width="120" height="12" rx="6" fill="#e2e8f0" />

      {/* 2x2 grille de participants */}
      <g transform="translate(26 58)">
        <rect width="165" height="90" rx="10" fill="url(#tileA)" />
        <text x="82.5" y="52" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="22" fontWeight="700" fill="#ffffff" opacity="0.95">JD</text>
        <circle cx="152" cy="80" r="4" fill="#86efac" stroke="#ffffff" strokeWidth="1.5" />
      </g>
      <g transform="translate(203 58)">
        <rect width="165" height="90" rx="10" fill="url(#tileB)" />
        <text x="82.5" y="52" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="22" fontWeight="700" fill="#ffffff" opacity="0.95">MR</text>
        <rect x="140" y="12" width="18" height="12" rx="3" fill="rgba(0,0,0,0.35)" />
        <circle cx="152" cy="80" r="4" fill="#86efac" stroke="#ffffff" strokeWidth="1.5" />
      </g>
      <g transform="translate(26 158)">
        <rect width="165" height="64" rx="10" fill="url(#tileC)" />
        <text x="82.5" y="40" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="700" fill="#ffffff" opacity="0.95">AS</text>
      </g>
      <g transform="translate(203 158)">
        <rect width="165" height="64" rx="10" fill="url(#tileD)" />
        <text x="82.5" y="40" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="700" fill="#ffffff" opacity="0.95">TK</text>
      </g>

      {/* Barre d'outils */}
      <rect x="26" y="236" width="342" height="22" rx="11" fill="#f1f5f9" />
      <circle cx="140" cy="247" r="7" fill="#2563eb" />
      <circle cx="164" cy="247" r="7" fill="#2563eb" />
      <circle cx="188" cy="247" r="7" fill="#94a3b8" />
      <circle cx="212" cy="247" r="7" fill="#94a3b8" />
      <circle cx="236" cy="247" r="7" fill="#94a3b8" />
      <circle cx="260" cy="247" r="7" fill="#ef4444" />
    </svg>
  </IllustrationWrapper>
);

/* Slide 2 : réseau mondial avec nœuds connectés */
const GlobalIllustration = () => (
  <IllustrationWrapper>
    <svg viewBox="0 0 400 280" width="100%" height="100%" role="img" aria-hidden="true">
      <defs>
        <radialGradient id="globeGlow" cx="0.5" cy="0.5" r="0.6">
          <stop offset="0%" stopColor="#dbeafe" stopOpacity="1" />
          <stop offset="100%" stopColor="#dbeafe" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Halo derrière le globe */}
      <circle cx="200" cy="140" r="120" fill="url(#globeGlow)" />

      {/* Globe stylisé */}
      <circle cx="200" cy="140" r="78" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
      <ellipse cx="200" cy="140" rx="78" ry="28" fill="none" stroke="#93c5fd" strokeWidth="1.5" />
      <ellipse cx="200" cy="140" rx="78" ry="55" fill="none" stroke="#93c5fd" strokeWidth="1.5" />
      <line x1="122" y1="140" x2="278" y2="140" stroke="#93c5fd" strokeWidth="1.5" />
      <line x1="200" y1="62" x2="200" y2="218" stroke="#93c5fd" strokeWidth="1.5" />

      {/* Nœuds sur les continents */}
      {[
        { cx: 155, cy: 110 },
        { cx: 245, cy: 130 },
        { cx: 180, cy: 175 },
        { cx: 235, cy: 90 },
      ].map((n, i) => (
        <g key={i}>
          <circle cx={n.cx} cy={n.cy} r="8" fill="#2563eb" opacity="0.15" />
          <circle cx={n.cx} cy={n.cy} r="4" fill="#2563eb" />
        </g>
      ))}

      {/* Nœuds externes reliés au globe */}
      {[
        { cx: 70, cy: 60, label: 'EU' },
        { cx: 340, cy: 70, label: 'NA' },
        { cx: 60, cy: 220, label: 'AS' },
        { cx: 340, cy: 220, label: 'AF' },
      ].map((p, i) => (
        <g key={i}>
          <line
            x1={p.cx}
            y1={p.cy}
            x2="200"
            y2="140"
            stroke="#2563eb"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.4"
          />
          <circle cx={p.cx} cy={p.cy} r="18" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5" />
          <text
            x={p.cx}
            y={p.cy + 4}
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
            fontSize="10"
            fontWeight="700"
            fill="#1d4ed8"
          >
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  </IllustrationWrapper>
);

/* Slide 3 : mockup smartphone avec appel actif */
const MobileIllustration = () => (
  <IllustrationWrapper>
    <svg viewBox="0 0 400 280" width="100%" height="100%" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="phoneCall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
      </defs>

      {/* Halo diffus */}
      <ellipse cx="200" cy="140" rx="140" ry="90" fill="#dbeafe" opacity="0.55" />

      {/* Cadre téléphone */}
      <rect x="148" y="18" width="104" height="244" rx="22" fill="#0f172a" />
      <rect x="153" y="23" width="94" height="234" rx="18" fill="url(#phoneCall)" />

      {/* Encoche */}
      <rect x="184" y="28" width="32" height="6" rx="3" fill="#0f172a" />

      {/* Avatar en appel */}
      <circle cx="200" cy="100" r="30" fill="rgba(255,255,255,0.15)" />
      <circle cx="200" cy="100" r="22" fill="#ffffff" />
      <text x="200" y="106" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="700" fill="#1d4ed8">JD</text>

      {/* Nom + durée */}
      <rect x="170" y="144" width="60" height="6" rx="3" fill="rgba(255,255,255,0.85)" />
      <rect x="180" y="156" width="40" height="5" rx="2.5" fill="rgba(255,255,255,0.5)" />

      {/* Onde audio */}
      <g transform="translate(200 190)">
        {[-24, -12, 0, 12, 24].map((x, i) => (
          <rect
            key={i}
            x={x - 1.5}
            y={-6 - Math.abs(i - 2) * 2}
            width="3"
            height={12 + (4 - Math.abs(i - 2) * 2) * 2}
            rx="1.5"
            fill="rgba(255,255,255,0.75)"
          />
        ))}
      </g>

      {/* Boutons d'appel */}
      <circle cx="178" cy="232" r="12" fill="rgba(255,255,255,0.18)" />
      <circle cx="222" cy="232" r="12" fill="#ef4444" />

      {/* Notification flottante à côté */}
      <g transform="translate(38 96)">
        <rect width="96" height="46" rx="10" fill="#ffffff" stroke="#dbeafe" strokeWidth="1.5" />
        <circle cx="18" cy="23" r="8" fill="#2563eb" />
        <rect x="32" y="14" width="52" height="6" rx="3" fill="#0f172a" />
        <rect x="32" y="25" width="40" height="5" rx="2.5" fill="#94a3b8" />
      </g>

      {/* Badge chiffrement */}
      <g transform="translate(268 60)">
        <rect width="90" height="28" rx="14" fill="#ffffff" stroke="#dbeafe" strokeWidth="1.5" />
        <circle cx="16" cy="14" r="5" fill="#10b981" />
        <rect x="28" y="10" width="52" height="8" rx="4" fill="#0f172a" opacity="0.7" />
      </g>
    </svg>
  </IllustrationWrapper>
);

const ILLUSTRATION_MAP = {
  meeting: MeetingIllustration,
  global: GlobalIllustration,
  mobile: MobileIllustration,
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
