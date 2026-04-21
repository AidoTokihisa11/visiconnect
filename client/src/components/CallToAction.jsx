import React from "react";
import styled, { keyframes } from "styled-components";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ─── Animations ──────────────────────────────────────────────────────────────
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const floatA = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%       { transform: translate(22px, -16px) scale(1.06); }
`;

const floatB = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%       { transform: translate(-18px, 14px) scale(0.94); }
`;

// ─── Styles ───────────────────────────────────────────────────────────────────
const Wrapper = styled.section`
  padding: 5rem 1.5rem;
  display: flex;
  justify-content: center;
  background: transparent;
`;

const Inner = styled.div`
  max-width: 860px;
  width: 100%;
  background: linear-gradient(130deg, #1d4ed8 0%, #2563eb 48%, #3b82f6 100%);
  border-radius: 28px;
  padding: 72px 56px;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow:
    0 0 0 1px rgba(37, 99, 235, 0.4),
    0 24px 64px -12px rgba(37, 99, 235, 0.45),
    0 4px 16px rgba(0, 0, 0, 0.12);
  animation: ${fadeUp} 0.6s ease both;

  @media (max-width: 640px) {
    padding: 52px 28px;
    border-radius: 20px;
  }
`;

/* Decorative orbs */
const OrbA = styled.div`
  position: absolute;
  width: 340px;
  height: 340px;
  top: -120px;
  right: -90px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.13) 0%, transparent 65%);
  animation: ${floatA} 10s ease-in-out infinite;
  pointer-events: none;
`;

const OrbB = styled.div`
  position: absolute;
  width: 240px;
  height: 240px;
  bottom: -90px;
  left: -60px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.10) 0%, transparent 65%);
  animation: ${floatB} 12s ease-in-out infinite;
  pointer-events: none;
`;

const OrbC = styled.div`
  position: absolute;
  width: 110px;
  height: 110px;
  top: 28%;
  right: 17%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 65%);
  animation: ${floatA} 8s 1.5s ease-in-out infinite;
  pointer-events: none;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.28);
  color: rgba(255, 255, 255, 0.92);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  padding: 5px 14px;
  border-radius: 9999px;
  margin-bottom: 24px;
  backdrop-filter: blur(8px);
`;

const Title = styled.h2`
  color: #ffffff;
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin: 0 0 16px;
  max-width: 620px;
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.78);
  font-size: 1.05rem;
  max-width: 510px;
  margin: 0 auto 40px;
  line-height: 1.65;
  font-weight: 400;

  @media (max-width: 640px) {
    font-size: 0.95rem;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
`;

const PrimaryBtn = styled.button`
  background: #ffffff;
  color: #1d4ed8;
  border: none;
  padding: 14px 28px;
  font-size: 0.95rem;
  font-weight: 700;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.16);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  svg {
    transition: transform 0.2s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 32px rgba(0, 0, 0, 0.22);
    background: #f0f4ff;

    svg {
      transform: translateX(3px);
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

const GhostBtn = styled.button`
  background: rgba(255, 255, 255, 0.10);
  color: rgba(255, 255, 255, 0.85);
  border: 1.5px solid rgba(255, 255, 255, 0.30);
  padding: 13px 24px;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.18);
    border-color: rgba(255, 255, 255, 0.50);
    color: #ffffff;
  }
`;

// ─── Component ───────────────────────────────────────────────────────────────
const CallToAction = ({
  title = "Vous avez d'autres questions ?",
  description = "Notre équipe commerciale est à votre disposition pour trouver l'offre qui correspond parfaitement à vos besoins.",
  buttonText = "Contacter les ventes",
  buttonLink = "/contact",
  eyebrow = null,
  secondaryText = null,
  secondaryLink = null,
}) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Inner>
        <OrbA />
        <OrbB />
        <OrbC />
        <Content>
          {eyebrow && (
            <Eyebrow>
              <Sparkles size={12} />
              {eyebrow}
            </Eyebrow>
          )}
          <Title>{title}</Title>
          <Description>{description}</Description>
          <Actions>
            <PrimaryBtn onClick={() => navigate(buttonLink)}>
              {buttonText}
              <ArrowRight size={16} strokeWidth={2.5} />
            </PrimaryBtn>
            {secondaryText && secondaryLink && (
              <GhostBtn onClick={() => navigate(secondaryLink)}>
                {secondaryText}
                <ArrowUpRight size={15} strokeWidth={2} />
              </GhostBtn>
            )}
          </Actions>
        </Content>
      </Inner>
    </Wrapper>
  );
};

export default CallToAction;
