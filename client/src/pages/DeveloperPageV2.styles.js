import styled, { css, keyframes } from 'styled-components';

const COLORS = {
  primary: '#0ea5e9', // Clean light blue
  primaryDark: '#0284c7',
  foreground: '#0f172a', // Navy text
  muted: '#64748b',
  background: '#ffffff',
  surfaceBlue: '#f0f9ff',
  lineBlue: '#e0f2fe',
  border: '#e2e8f0',
};

const floatIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const revealStyles = css`
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
  background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
  color: ${COLORS.foreground};
  display: flex;
  flex-direction: column;
  font-family:
    'Inter',
    -apple-system,
    sans-serif;
`;

export const HeroSection = styled.section`
  padding: 8rem 1.5rem 6rem;
  background:
    radial-gradient(circle at 15% 50%, rgba(14, 165, 233, 0.08), transparent 25%),
    radial-gradient(circle at 85% 30%, rgba(14, 165, 233, 0.05), transparent 25%);
  border-bottom: 1px solid ${COLORS.border};
  text-align: center;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

export const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  margin-bottom: 1.5rem;
  border-radius: 999px;
  background: ${COLORS.surfaceBlue};
  border: 1px solid ${COLORS.lineBlue};
  color: ${COLORS.primaryDark};
  font-size: 0.875rem;
  font-weight: 700;
  ${revealStyles};
`;

export const HeroTitle = styled.h1`
  font-size: clamp(3rem, 6vw, 4.5rem);
  font-weight: 800;
  color: ${COLORS.foreground};
  line-height: 1.1;
  letter-spacing: -0.04em;
  margin-bottom: 1.5rem;
  ${revealStyles};

  span {
    color: ${COLORS.primary};
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: ${COLORS.muted};
  max-width: 600px;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
  ${revealStyles};
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  ${revealStyles};
`;

export const Button = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.2s ease;

  ${(props) =>
    props.$primary
      ? css`
          background: ${COLORS.primary};
          color: white;
          box-shadow: 0 4px 14px rgba(14, 165, 233, 0.25);
          border: 1px solid transparent;

          &:hover {
            background: ${COLORS.primaryDark};
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(14, 165, 233, 0.3);
          }
        `
      : css`
          background: white;
          color: ${COLORS.foreground};
          border: 1px solid ${COLORS.border};
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);

          &:hover {
            border-color: ${COLORS.primary};
            color: ${COLORS.primaryDark};
            transform: translateY(-2px);
          }
        `}
`;

export const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 800;
  margin-bottom: 1rem;
  color: ${COLORS.foreground};
  letter-spacing: -0.03em;
  text-align: center;
  ${revealStyles};
`;

export const SectionSubtitle = styled.p`
  font-size: 1.125rem;
  color: ${COLORS.muted};
  text-align: center;
  margin: 0 auto 3rem;
  max-width: 600px;
  ${revealStyles};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem 1.5rem 6rem;
  ${revealStyles};
`;

export const Card = styled.div`
  background: white;
  border: 1px solid ${COLORS.border};
  border-radius: 24px;
  padding: 2.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;

  &:hover {
    border-color: ${COLORS.lineBlue};
    box-shadow: 0 20px 40px -10px rgba(14, 165, 233, 0.08);
    transform: translateY(-4px);
  }
`;

export const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${COLORS.surfaceBlue};
  color: ${COLORS.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

export const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: ${COLORS.foreground};
`;

export const CardText = styled.p`
  color: ${COLORS.muted};
  line-height: 1.6;
  font-size: 0.95rem;
  flex: 1;
`;

export const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

export const Tag = styled.span`
  background: ${COLORS.surfaceBlue};
  color: ${COLORS.primaryDark};
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
`;

export const TimelineWrap = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1.5rem 6rem;
  ${revealStyles};
`;

export const TimelineItem = styled.div`
  position: relative;
  padding-left: 3rem;
  padding-bottom: 3rem;
  border-left: 2px solid ${COLORS.border};

  &:last-child {
    border-left-color: transparent;
    padding-bottom: 0;
  }

  &::before {
    content: '';
    position: absolute;
    left: -7px;
    top: 0;
    width: 12px;
    height: 12px;
    background: white;
    border: 2px solid ${COLORS.primary};
    border-radius: 50%;
  }
`;

export const JobYear = styled.span`
  display: inline-block;
  background: ${COLORS.surfaceBlue};
  color: ${COLORS.primaryDark};
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

export const JobTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${COLORS.foreground};
  margin-bottom: 0.25rem;
`;

export const JobCompany = styled.div`
  color: ${COLORS.muted};
  font-size: 0.95rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const CTAWrapper = styled.div`
  background: ${COLORS.surfaceBlue};
  border: 1px solid ${COLORS.lineBlue};
  border-radius: 32px;
  padding: 4rem 2rem;
  text-align: center;
  margin: 0 1.5rem 6rem;
  ${revealStyles};
`;
