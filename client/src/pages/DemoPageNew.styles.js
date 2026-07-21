import styled, { css, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const COLORS = {
  primary: 'hsl(var(--primary))',
  foreground: 'hsl(var(--foreground))',
  muted: 'hsl(var(--muted-foreground))',
  background: 'hsl(var(--background))',
  card: 'hsl(var(--card))',
  border: 'hsl(var(--border))',
  navy: '#0f172a',
  surfaceBlue: '#eff6ff',
  lineBlue: '#dbeafe',
};

const floatIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(22px) scale(0.985);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const revealStyles = css`
  opacity: 0;
  transform: translateY(38px) scale(0.985);
  transition:
    opacity 0.78s ease,
    transform 0.78s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--reveal-delay, 0ms);

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
    radial-gradient(circle at 0% 0%, rgba(37, 99, 235, 0.09), transparent 28%),
    radial-gradient(circle at 100% 18%, rgba(59, 130, 246, 0.08), transparent 24%),
    linear-gradient(180deg, #f7fbff 0%, ${COLORS.background} 28%, ${COLORS.background} 100%);
  color: ${COLORS.foreground};
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.main`
  flex: 1;
`;

export const HeroSection = styled.section`
  padding: 6.8rem 1.5rem 4.5rem;
  border-bottom: 1px solid ${COLORS.border};

  @media (max-width: 768px) {
    padding: 4rem 1.1rem 2.8rem;
  }

  @media (max-width: 480px) {
    padding: 2.6rem 1rem 2rem;
  }
`;

export const HeroContainer = styled.div`
  max-width: 1160px;
  margin: 0 auto;
`;

export const HeroContent = styled.div`
  max-width: 860px;
  animation: ${floatIn} 0.78s cubic-bezier(0.22, 1, 0.36, 1) both;
`;

export const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.55rem 0.9rem;
  margin-bottom: 1.35rem;
  border-radius: 999px;
  background: ${COLORS.surfaceBlue};
  border: 1px solid ${COLORS.lineBlue};
  color: ${COLORS.primary};
  font-size: 0.85rem;
  font-weight: 800;
`;

export const HeroTitle = styled.h1`
  margin: 0 0 1.2rem;
  font-size: clamp(2.7rem, 5.5vw, 4.8rem);
  line-height: 0.98;
  letter-spacing: -0.05em;
  color: ${COLORS.navy};

  span {
    display: block;
    color: ${COLORS.primary};
  }
`;

export const HeroSubtitle = styled.p`
  max-width: 760px;
  margin: 0 0 2rem;
  color: ${COLORS.muted};
  font-size: 1.12rem;
  line-height: 1.75;
`;

export const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  min-height: 54px;
  padding: 0.95rem 1.25rem;
  border-radius: 14px;
  text-decoration: none;
  font-weight: 800;
  border: 1px solid ${COLORS.primary};
  background: linear-gradient(135deg, ${COLORS.primary} 0%, #1d4ed8 100%);
  color: white;
  box-shadow: 0 16px 30px rgba(37, 99, 235, 0.18);
  transition:
    transform 0.24s ease,
    box-shadow 0.24s ease,
    filter 0.24s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 22px 42px rgba(37, 99, 235, 0.25);
    filter: saturate(1.05);
  }
`;

export const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  min-height: 54px;
  padding: 0.95rem 1.25rem;
  border-radius: 14px;
  text-decoration: none;
  font-weight: 800;
  border: 1px solid ${COLORS.border};
  background: rgba(255, 255, 255, 0.8);
  color: ${COLORS.foreground};
  transition:
    transform 0.24s ease,
    border-color 0.24s ease,
    color 0.24s ease,
    box-shadow 0.24s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(37, 99, 235, 0.25);
    color: ${COLORS.primary};
    box-shadow: 0 14px 28px rgba(15, 23, 42, 0.08);
  }
`;

export const HeroMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

export const MetaPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 0.9rem;
  border-radius: 999px;
  border: 1px solid ${COLORS.border};
  background: rgba(255, 255, 255, 0.76);
  color: ${COLORS.foreground};
  font-size: 0.92rem;
  font-weight: 600;
`;

export const CompactProofGrid = styled.div`
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  ${revealStyles};

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const ProofCard = styled.div`
  padding: 1rem 1.05rem;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid ${COLORS.border};
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.05);
  transition:
    transform 0.26s ease,
    border-color 0.26s ease,
    box-shadow 0.26s ease;

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(37, 99, 235, 0.24);
    box-shadow: 0 24px 44px rgba(15, 23, 42, 0.08);
  }

  .label {
    color: ${COLORS.muted};
    font-size: 0.8rem;
    margin-bottom: 0.3rem;
  }

  .value {
    color: ${COLORS.navy};
    font-size: 1.08rem;
    font-weight: 800;
  }
`;

export const Section = styled.section`
  max-width: 1160px;
  width: 100%;
  margin: 0 auto;
  padding: 5rem 1.5rem;
  ${revealStyles};
`;

export const SectionHeader = styled.div`
  max-width: 760px;
  margin-bottom: 2.6rem;

  @media (max-width: 768px) {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const SectionLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-bottom: 0.9rem;
  color: ${COLORS.primary};
  font-weight: 800;
  letter-spacing: 0.01em;
`;

export const SectionTitle = styled.h2`
  margin: 0 0 0.85rem;
  color: ${COLORS.navy};
  font-size: clamp(2rem, 3.2vw, 3rem);
  line-height: 1.06;
  letter-spacing: -0.035em;
`;

export const SectionText = styled.p`
  margin: 0;
  color: ${COLORS.muted};
  line-height: 1.72;
  font-size: 1.05rem;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.15rem;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureCard = styled.article`
  position: relative;
  overflow: hidden;
  padding: 1.5rem;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid ${COLORS.border};
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.05);
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  ${revealStyles};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(140deg, rgba(37, 99, 235, 0.08), rgba(255, 255, 255, 0));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-10px);
    border-color: rgba(37, 99, 235, 0.24);
    box-shadow: 0 26px 54px rgba(15, 23, 42, 0.1);
  }

  &:hover::before {
    opacity: 1;
  }

  h3 {
    position: relative;
    margin: 1rem 0 0.7rem;
    color: ${COLORS.navy};
    font-size: 1.18rem;
  }

  p {
    position: relative;
    margin: 0;
    color: ${COLORS.muted};
    line-height: 1.7;
  }
`;

export const IconBox = styled.div`
  position: relative;
  width: 52px;
  height: 52px;
  border-radius: 15px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${COLORS.surfaceBlue};
  color: ${COLORS.primary};
  transition:
    transform 0.3s ease,
    background 0.3s ease;

  ${FeatureCard}:hover & {
    transform: translateY(-2px) scale(1.05);
    background: rgba(37, 99, 235, 0.12);
  }
`;

export const WorkflowGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

export const WorkflowCard = styled.article`
  display: grid;
  grid-template-columns: 84px 1fr;
  gap: 1.25rem;
  padding: 1.3rem;
  border-radius: 22px;
  border: 1px solid ${COLORS.border};
  background: ${COLORS.card};
  transition:
    transform 0.28s ease,
    border-color 0.28s ease,
    box-shadow 0.28s ease;
  ${revealStyles};

  &:hover {
    transform: translateX(6px);
    border-color: rgba(37, 99, 235, 0.22);
    box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

export const StepBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  border-radius: 14px;
  background: ${COLORS.surfaceBlue};
  color: ${COLORS.primary};
  font-weight: 900;
`;

export const WorkflowContent = styled.div`
  h3 {
    margin: 0 0 0.45rem;
    color: ${COLORS.navy};
    font-size: 1.08rem;
  }

  p {
    margin: 0;
    color: ${COLORS.muted};
    line-height: 1.68;
  }
`;

export const DarkBand = styled.section`
  background:
    radial-gradient(circle at 10% 0%, rgba(59, 130, 246, 0.18), transparent 22%),
    linear-gradient(180deg, #0b1220 0%, #101b34 100%);
  border-top: 1px solid rgba(148, 163, 184, 0.08);
  border-bottom: 1px solid rgba(148, 163, 184, 0.08);
`;

export const DarkContainer = styled.div`
  max-width: 1160px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(300px, 1.05fr);
  gap: 2rem;
  align-items: center;
  ${revealStyles};

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const DarkText = styled.div`
  h2 {
    margin: 0 0 1rem;
    color: white;
    font-size: clamp(2rem, 3vw, 2.8rem);
    line-height: 1.06;
    letter-spacing: -0.03em;
  }

  p {
    margin: 0 0 1.6rem;
    color: rgba(203, 213, 225, 0.88);
    line-height: 1.75;
    font-size: 1.04rem;
  }

  @media (max-width: 980px) {
    text-align: center;
  }
`;

export const BulletGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const Bullet = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  color: white;
  line-height: 1.55;

  svg {
    color: #60a5fa;
    flex-shrink: 0;
    margin-top: 0.15rem;
  }
`;

export const MetricsPanel = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1.2rem;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(148, 163, 184, 0.12);
  box-shadow: 0 24px 70px rgba(2, 6, 23, 0.3);
`;

export const MetricsHero = styled.div`
  padding: 1.2rem;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(37, 99, 235, 0.18) 0%, rgba(15, 23, 42, 0.4) 100%);
  border: 1px solid rgba(148, 163, 184, 0.12);

  .eyebrow {
    color: #93c5fd;
    font-size: 0.82rem;
    font-weight: 800;
    margin-bottom: 0.55rem;
  }

  .value {
    color: white;
    font-size: clamp(2rem, 3vw, 2.7rem);
    font-weight: 900;
    margin-bottom: 0.35rem;
  }

  .caption {
    color: rgba(203, 213, 225, 0.86);
    line-height: 1.55;
  }
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem;
`;

export const MetricsTile = styled.div`
  padding: 1rem;
  border-radius: 18px;
  background: rgba(15, 23, 42, 0.48);
  border: 1px solid rgba(148, 163, 184, 0.12);

  .label {
    color: rgba(148, 163, 184, 0.9);
    font-size: 0.8rem;
    margin-bottom: 0.35rem;
  }

  .value {
    color: white;
    font-weight: 800;
    font-size: 1.08rem;
  }
`;

export const RevealBlock = styled.div`
  ${revealStyles};
`;
