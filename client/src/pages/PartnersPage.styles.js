import styled, { css, keyframes } from 'styled-components';

export const COLORS = {
  primary: 'hsl(var(--primary))',
  foreground: 'hsl(var(--foreground))',
  muted: 'hsl(var(--muted-foreground))',
  background: 'hsl(var(--background))',
  card: 'hsl(var(--card))',
  border: 'hsl(var(--border))',
  softBlue: '#eff6ff',
  blueTint: '#dbeafe',
  navy: '#0f172a',
};

const floatIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(18px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const pulseGlow = keyframes`
  0%,
  100% {
    transform: scale(1);
    opacity: 0.55;
  }

  50% {
    transform: scale(1.08);
    opacity: 0.8;
  }
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

export const PageContainer = styled.div`
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(37, 99, 235, 0.08), transparent 30%),
    linear-gradient(180deg, #f8fbff 0%, ${COLORS.background} 30%, ${COLORS.background} 100%);
  color: ${COLORS.foreground};
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.main`
  flex: 1;
`;

export const HeroSection = styled.section`
  padding: 6.5rem 1.5rem 5rem;
  border-bottom: 1px solid ${COLORS.border};
`;

export const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
  gap: 3rem;
  align-items: center;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

export const HeroContent = styled.div`
  animation: ${floatIn} 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;
`;

export const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.85rem;
  border-radius: 999px;
  background: ${COLORS.softBlue};
  border: 1px solid ${COLORS.blueTint};
  color: ${COLORS.primary};
  font-weight: 700;
  font-size: 0.85rem;
  margin-bottom: 1.25rem;
`;

export const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4.4rem);
  line-height: 1.02;
  letter-spacing: -0.04em;
  margin: 0 0 1.25rem;
  color: ${COLORS.navy};
`;

export const HeroSubtitle = styled.p`
  margin: 0 0 2rem;
  max-width: 720px;
  font-size: 1.1rem;
  line-height: 1.75;
  color: ${COLORS.muted};
`;

export const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.95rem 1.2rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 700;
  border: 1px solid ${COLORS.primary};
  background: ${COLORS.primary};
  color: white;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 14px 30px rgba(37, 99, 235, 0.18);
  }
`;

export const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.95rem 1.2rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 700;
  border: 1px solid ${COLORS.border};
  background: ${COLORS.card};
  color: ${COLORS.foreground};

  &:hover {
    border-color: ${COLORS.primary};
    color: ${COLORS.primary};
  }
`;

export const HeroPanel = styled.div`
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  border: 1px solid ${COLORS.border};
  border-radius: 24px;
  padding: 1.35rem;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
  animation: ${floatIn} 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;

  &::before {
    content: '';
    position: absolute;
    top: -80px;
    right: -40px;
    width: 180px;
    height: 180px;
    border-radius: 999px;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.22) 0%, rgba(59, 130, 246, 0) 72%);
    animation: ${pulseGlow} 8s ease-in-out infinite;
    pointer-events: none;
  }
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const PanelTitle = styled.div`
  font-size: 0.95rem;
  font-weight: 700;
  color: ${COLORS.navy};
`;

export const PanelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.85rem;
`;

export const PanelMetric = styled.div`
  position: relative;
  transition:
    transform 0.28s ease,
    border-color 0.28s ease,
    box-shadow 0.28s ease;
  background: ${COLORS.card};
  border: 1px solid ${COLORS.border};
  border-radius: 16px;
  padding: 1rem;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(37, 99, 235, 0.22);
    box-shadow: 0 14px 32px rgba(37, 99, 235, 0.1);
  }

  .label {
    font-size: 0.78rem;
    color: ${COLORS.muted};
    margin-bottom: 0.4rem;
  }

  .value {
    font-size: 1.35rem;
    font-weight: 800;
    color: ${COLORS.navy};
  }
`;

export const Section = styled.section`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 5rem 1.5rem;
  ${revealStyles};
`;

export const SectionHeader = styled.div`
  max-width: 760px;
  margin-bottom: 2.75rem;
`;

export const SectionTitle = styled.h2`
  margin: 0 0 0.9rem;
  font-size: clamp(2rem, 3.2vw, 3rem);
  line-height: 1.08;
  color: ${COLORS.navy};
  letter-spacing: -0.03em;
`;

export const SectionText = styled.p`
  margin: 0;
  color: ${COLORS.muted};
  font-size: 1.05rem;
  line-height: 1.7;
`;

export const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const BenefitCard = styled.article`
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.86);
  backdrop-filter: blur(10px);
  border: 1px solid ${COLORS.border};
  border-radius: 22px;
  padding: 1.5rem;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.05);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
  ${revealStyles};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(255, 255, 255, 0));
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-10px);
    border-color: rgba(37, 99, 235, 0.24);
    box-shadow: 0 28px 54px rgba(15, 23, 42, 0.1);
  }

  &:hover::before {
    opacity: 1;
  }

  h3 {
    margin: 1rem 0 0.75rem;
    font-size: 1.2rem;
    color: ${COLORS.navy};
  }

  p {
    margin: 0;
    color: ${COLORS.muted};
    line-height: 1.65;
  }
`;

export const IconBox = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${COLORS.softBlue};
  color: ${COLORS.primary};
  transition:
    transform 0.3s ease,
    background 0.3s ease,
    color 0.3s ease;

  ${BenefitCard}:hover & {
    transform: translateY(-2px) scale(1.05);
    background: rgba(37, 99, 235, 0.12);
  }
`;

export const ProgramGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const ProgramCard = styled.article`
  overflow: hidden;
  background: ${COLORS.card};
  border: 1px solid ${COLORS.border};
  border-radius: 22px;
  padding: 1.5rem;
  position: relative;
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  ${revealStyles};

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 3px;
    background: linear-gradient(90deg, rgba(37, 99, 235, 0.85), rgba(14, 165, 233, 0.55));
    transform: scaleX(0.25);
    transform-origin: left center;
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-10px);
    border-color: rgba(37, 99, 235, 0.24);
    box-shadow: 0 28px 54px rgba(15, 23, 42, 0.1);
  }

  &:hover::after {
    transform: scaleX(1);
  }

  .tag {
    display: inline-flex;
    padding: 0.35rem 0.65rem;
    border-radius: 999px;
    background: ${COLORS.softBlue};
    color: ${COLORS.primary};
    font-size: 0.78rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0 0 0.75rem;
    font-size: 1.3rem;
    color: ${COLORS.navy};
  }

  p {
    margin: 0 0 1rem;
    color: ${COLORS.muted};
    line-height: 1.65;
  }
`;

export const BulletList = styled.div`
  display: grid;
  gap: 0.75rem;
`;

export const BulletItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  color: ${COLORS.foreground};
  line-height: 1.55;

  svg {
    color: ${COLORS.primary};
    flex-shrink: 0;
    margin-top: 0.15rem;
  }
`;

export const Timeline = styled.div`
  display: grid;
  gap: 1rem;
`;

export const TimelineItem = styled.div`
  display: grid;
  grid-template-columns: 84px 1fr;
  gap: 1.25rem;
  align-items: start;
  padding: 1.25rem;
  border-radius: 20px;
  background: ${COLORS.card};
  border: 1px solid ${COLORS.border};
  transition:
    transform 0.28s ease,
    border-color 0.28s ease,
    box-shadow 0.28s ease;
  ${revealStyles};

  &:hover {
    transform: translateX(6px);
    border-color: rgba(37, 99, 235, 0.22);
    box-shadow: 0 18px 44px rgba(15, 23, 42, 0.08);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

export const TimelineStep = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  border-radius: 12px;
  background: ${COLORS.softBlue};
  color: ${COLORS.primary};
  font-weight: 800;
`;

export const TimelineContent = styled.div`
  h3 {
    margin: 0 0 0.45rem;
    color: ${COLORS.navy};
    font-size: 1.05rem;
  }

  p {
    margin: 0;
    color: ${COLORS.muted};
    line-height: 1.65;
  }
`;

export const ProofBand = styled.section`
  border-top: 1px solid ${COLORS.border};
  border-bottom: 1px solid ${COLORS.border};
  background: linear-gradient(180deg, rgba(239, 246, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%);
`;

export const ProofGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3.5rem 1.5rem;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const ProofCard = styled.div`
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid ${COLORS.border};
  border-radius: 18px;
  padding: 1.25rem;
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  ${revealStyles};

  &::before {
    content: '';
    position: absolute;
    inset: auto 0 0 0;
    height: 3px;
    background: linear-gradient(90deg, rgba(37, 99, 235, 0.9), rgba(14, 165, 233, 0.45));
    transform: scaleX(0.35);
    transform-origin: left center;
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(37, 99, 235, 0.24);
    box-shadow: 0 24px 52px rgba(15, 23, 42, 0.08);
  }

  &:hover::before {
    transform: scaleX(1);
  }

  .value {
    font-size: 2rem;
    font-weight: 800;
    color: ${COLORS.navy};
    margin-bottom: 0.35rem;
  }

  .label {
    color: ${COLORS.muted};
    line-height: 1.5;
  }
`;

export const RevealBlock = styled.div`
  ${revealStyles};
`;
