import React from "react";
import styled, { keyframes } from "styled-components";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ─── Animations ──────────────────────────────────────────────────────────────
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ─── Styles ───────────────────────────────────────────────────────────────────
const Wrapper = styled.section`
  padding: 5rem 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: transparent;
`;

const Inner = styled.div`
  max-width: 880px;
  width: 100%;
  background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 55%, #0f172a 100%);
  border-radius: 24px;
  padding: 72px 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow:
    0 0 0 1px rgba(37, 99, 235, 0.2),
    0 24px 48px -12px rgba(15, 23, 42, 0.4);
  animation: ${fadeUp} 0.55s ease both;

  /* subtle radial glow from centre */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 70% 55% at 50% 0%, rgba(37,99,235,0.22) 0%, transparent 70%);
    pointer-events: none;
  }

  /* thin top accent line */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #3b82f6, transparent);
    border-radius: 0 0 4px 4px;
  }

  @media (max-width: 640px) {
    padding: 52px 28px;
    border-radius: 20px;
  }
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
  background: rgba(37, 99, 235, 0.18);
  border: 1px solid rgba(37, 99, 235, 0.35);
  color: #93c5fd;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 5px 14px;
  border-radius: 9999px;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  color: #ffffff;
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin: 0 0 16px;
  max-width: 620px;
`;

const Description = styled.p`
  color: rgba(148, 163, 184, 1);
  font-size: 1.05rem;
  max-width: 520px;
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
  color: #1e40af;
  border: none;
  padding: 14px 28px;
  font-size: 0.95rem;
  font-weight: 700;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  svg {
    transition: transform 0.2s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.22);
    background: #f0f7ff;

    svg {
      transform: translateX(3px);
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

const GhostBtn = styled.button`
  background: transparent;
  color: rgba(255, 255, 255, 0.75);
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  padding: 13px 24px;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.45);
    background: rgba(255, 255, 255, 0.06);
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
        <Content>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
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

