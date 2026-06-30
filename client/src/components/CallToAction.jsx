import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ArrowRight, ArrowUpRight, Sparkles, Check, Shield, Zap, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

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
  max-width: 1080px;
  width: 100%;
  background:
    radial-gradient(circle at 20% 0%, rgba(96, 165, 250, 0.35) 0%, transparent 45%),
    radial-gradient(circle at 80% 100%, rgba(167, 139, 250, 0.3) 0%, transparent 50%),
    linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 35%, #2563eb 70%, #3b82f6 100%);
  border-radius: 32px;
  padding: 80px 64px;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow:
    0 0 0 1px rgba(96, 165, 250, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    0 32px 80px -16px rgba(37, 99, 235, 0.55),
    0 8px 24px rgba(0, 0, 0, 0.18);
  animation: ${fadeUp} 0.6s ease both;

  @media (max-width: 640px) {
    padding: 56px 24px;
    border-radius: 22px;
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
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 65%);
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
  letter-spacing: 0.1em;
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
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;

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
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.85);
  border: 1.5px solid rgba(255, 255, 255, 0.3);
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
    border-color: rgba(255, 255, 255, 0.5);
    color: #ffffff;
  }
`;

// Liste de garanties sous les CTA
const FeaturesRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
  margin-top: 32px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.85rem;
  font-weight: 500;

  > div {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  svg {
    color: #86efac;
    flex-shrink: 0;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 10px;
  }
`;

// Stats au-dessus des CTAs
const StatsBar = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin: 36px 0 32px;
  padding: 24px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.18);
  border-bottom: 1px solid rgba(255, 255, 255, 0.18);
  width: 100%;
  max-width: 600px;

  @media (max-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  .value {
    font-size: 1.6rem;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.02em;
    line-height: 1;
  }

  .label {
    font-size: 0.78rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.72);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  @media (max-width: 640px) {
    .value {
      font-size: 1.2rem;
    }
    .label {
      font-size: 0.7rem;
    }
  }
`;

// ─── Component ───────────────────────────────────────────────────────────────
const CallToAction = ({
  title,
  description,
  buttonText,
  buttonLink = '/signup',
  eyebrow = null,
  secondaryText = null,
  secondaryLink = null,
  showStats = true,
  showFeatures = true,
  stats: customStats = null,
  features: customFeatures = null,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const _title = title || t('cta.defaultTitle', 'Prêt à transformer vos communications ?');
  const _description =
    description ||
    t(
      'cta.defaultDescription',
      "L'accès Starter est gratuit. Aucune carte bancaire requise."
    );
  const _buttonText = buttonText || t('cta.defaultButton', 'Commencer gratuitement');
  const _eyebrow =
    eyebrow !== null ? eyebrow : t('cta.defaultEyebrow', "Démarrez en moins d'une minute");

  const stats = customStats || [
    { value: 'E2E', label: t('cta.stats.encryption', 'Chiffrement') },
    { value: 'Beta', label: t('cta.stats.access', 'Accès anticipé') },
    { value: '99.9%', label: t('cta.stats.uptime', 'Disponibilité') },
  ];

  const features = customFeatures || [
    {
      icon: <Check size={16} strokeWidth={3} />,
      label: t('cta.features.noCard', 'Sans carte de crédit'),
    },
    { icon: <Zap size={16} />, label: t('cta.features.instantStart', 'Configuration instantanée') },
    {
      icon: <Shield size={16} />,
      label: t('cta.features.security', 'Chiffrement de bout en bout'),
    },
    {
      icon: <Users size={16} />,
      label: t('cta.features.upToFree', "Jusqu'à 3 participants gratuits"),
    },
  ];

  const handlePrimary = () => {
    if (buttonLink && (buttonLink.startsWith('http://') || buttonLink.startsWith('https://'))) {
      window.open(buttonLink, '_blank', 'noopener,noreferrer');
    } else {
      navigate(buttonLink || '/signup');
    }
  };
  const handleSecondary = () => {
    if (!secondaryLink) return;
    if (secondaryLink.startsWith('http://') || secondaryLink.startsWith('https://')) {
      window.open(secondaryLink, '_blank', 'noopener,noreferrer');
    } else {
      navigate(secondaryLink);
    }
  };

  return (
    <Wrapper>
      <Inner>
        <OrbA />
        <OrbB />
        <OrbC />
        <Content>
          {_eyebrow && (
            <Eyebrow>
              <Sparkles size={12} />
              {_eyebrow}
            </Eyebrow>
          )}
          <Title>{_title}</Title>
          <Description>{_description}</Description>

          {showStats && (
            <StatsBar>
              {stats.map((s, i) => (
                <Stat key={i}>
                  <span className="value">{s.value}</span>
                  <span className="label">{s.label}</span>
                </Stat>
              ))}
            </StatsBar>
          )}

          <Actions>
            <PrimaryBtn onClick={handlePrimary}>
              {_buttonText}
              <ArrowRight size={16} strokeWidth={2.5} />
            </PrimaryBtn>
            {secondaryText && secondaryLink && (
              <GhostBtn onClick={handleSecondary}>
                {secondaryText}
                <ArrowUpRight size={15} strokeWidth={2} />
              </GhostBtn>
            )}
          </Actions>

          {showFeatures && (
            <FeaturesRow>
              {features.map((f, i) => (
                <div key={i}>
                  {f.icon}
                  {f.label}
                </div>
              ))}
            </FeaturesRow>
          )}
        </Content>
      </Inner>
    </Wrapper>
  );
};

export default CallToAction;
