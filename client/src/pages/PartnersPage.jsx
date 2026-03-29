import React, { useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  Handshake,
  Layers3,
  LineChart,
  ShieldCheck,
  Users,
} from 'lucide-react';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';
import CallToAction from '../components/CallToAction';

const COLORS = {
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

const PageContainer = styled.div`
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(37, 99, 235, 0.08), transparent 30%),
    linear-gradient(180deg, #f8fbff 0%, ${COLORS.background} 30%, ${COLORS.background} 100%);
  color: ${COLORS.foreground};
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

const HeroSection = styled.section`
  padding: 6.5rem 1.5rem 5rem;
  border-bottom: 1px solid ${COLORS.border};
`;

const HeroContainer = styled.div`
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

const HeroContent = styled.div`
  animation: ${floatIn} 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;
`;

const Eyebrow = styled.div`
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

const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4.4rem);
  line-height: 1.02;
  letter-spacing: -0.04em;
  margin: 0 0 1.25rem;
  color: ${COLORS.navy};
`;

const HeroSubtitle = styled.p`
  margin: 0 0 2rem;
  max-width: 720px;
  font-size: 1.1rem;
  line-height: 1.75;
  color: ${COLORS.muted};
`;

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const PrimaryButton = styled.a`
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

const SecondaryButton = styled.a`
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

const HeroPanel = styled.div`
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

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const PanelTitle = styled.div`
  font-size: 0.95rem;
  font-weight: 700;
  color: ${COLORS.navy};
`;

const PanelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.85rem;
`;

const PanelMetric = styled.div`
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

const Section = styled.section`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 5rem 1.5rem;
  ${revealStyles};
`;

const SectionHeader = styled.div`
  max-width: 760px;
  margin-bottom: 2.75rem;
`;

const SectionTitle = styled.h2`
  margin: 0 0 0.9rem;
  font-size: clamp(2rem, 3.2vw, 3rem);
  line-height: 1.08;
  color: ${COLORS.navy};
  letter-spacing: -0.03em;
`;

const SectionText = styled.p`
  margin: 0;
  color: ${COLORS.muted};
  font-size: 1.05rem;
  line-height: 1.7;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const BenefitCard = styled.article`
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

const IconBox = styled.div`
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

const ProgramGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ProgramCard = styled.article`
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

const BulletList = styled.div`
  display: grid;
  gap: 0.75rem;
`;

const BulletItem = styled.div`
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

const Timeline = styled.div`
  display: grid;
  gap: 1rem;
`;

const TimelineItem = styled.div`
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

const TimelineStep = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  border-radius: 12px;
  background: ${COLORS.softBlue};
  color: ${COLORS.primary};
  font-weight: 800;
`;

const TimelineContent = styled.div`
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

const ProofBand = styled.section`
  border-top: 1px solid ${COLORS.border};
  border-bottom: 1px solid ${COLORS.border};
  background: linear-gradient(180deg, rgba(239, 246, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%);
`;

const ProofGrid = styled.div`
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

const ProofCard = styled.div`
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

const RevealBlock = styled.div`
  ${revealStyles};
`;

const PartnersPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    const revealNodes = Array.from(document.querySelectorAll('[data-reveal]'));

    if (!revealNodes.length) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      revealNodes.forEach((node) => node.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    revealNodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  return (
    <PageContainer>
      <HeaderClean />
      <MainContent>
        <HeroSection>
          <HeroContainer>
            <HeroContent>
              <Eyebrow>
                <Handshake size={16} /> Programme Partenaires
              </Eyebrow>
              <HeroTitle>
                Développez votre activité avec une offre vidéo conçue pour les équipes exigeantes
              </HeroTitle>
              <HeroSubtitle>
                VisioConnect accompagne les intégrateurs, agences, revendeurs et cabinets de conseil qui souhaitent enrichir leur offre avec une plateforme de collaboration moderne, sécurisée et rentable.
              </HeroSubtitle>
              <HeroActions>
                <PrimaryButton href="/contact">
                  Parler à l'équipe partenariats <ArrowRight size={18} />
                </PrimaryButton>
                <SecondaryButton href="/features">
                  Découvrir la plateforme <Layers3 size={18} />
                </SecondaryButton>
              </HeroActions>
            </HeroContent>

            <HeroPanel>
              <PanelHeader>
                <PanelTitle>Vue du programme</PanelTitle>
                <BadgeCheck size={18} color={COLORS.primary} />
              </PanelHeader>
              <PanelGrid>
                <PanelMetric>
                  <div className="label">Modèle</div>
                  <div className="value">Revenu récurrent</div>
                </PanelMetric>
                <PanelMetric>
                  <div className="label">Support</div>
                  <div className="value">Dédié</div>
                </PanelMetric>
                <PanelMetric>
                  <div className="label">Activation</div>
                  <div className="value">Rapide</div>
                </PanelMetric>
                <PanelMetric>
                  <div className="label">Positionnement</div>
                  <div className="value">B2B premium</div>
                </PanelMetric>
              </PanelGrid>
            </HeroPanel>
          </HeroContainer>
        </HeroSection>

        <ProofBand>
          <ProofGrid>
            <ProofCard data-reveal style={{ '--reveal-delay': '0ms' }}>
              <div className="value">B2B</div>
              <div className="label">Un programme orienté vente conseil, intégration et comptes professionnels.</div>
            </ProofCard>
            <ProofCard data-reveal style={{ '--reveal-delay': '80ms' }}>
              <div className="value">4K</div>
              <div className="label">Une plateforme conçue pour des usages exigeants en matière de qualité vidéo.</div>
            </ProofCard>
            <ProofCard data-reveal style={{ '--reveal-delay': '160ms' }}>
              <div className="value">E2EE</div>
              <div className="label">Un positionnement sécurité fort pour rassurer vos clients et prospects.</div>
            </ProofCard>
            <ProofCard data-reveal style={{ '--reveal-delay': '240ms' }}>
              <div className="value">API</div>
              <div className="label">Des possibilités d’intégration pour créer une offre adaptée à votre marché.</div>
            </ProofCard>
          </ProofGrid>
        </ProofBand>

        <Section data-reveal>
          <SectionHeader>
            <SectionTitle>Pourquoi rejoindre le programme</SectionTitle>
            <SectionText>
              Le programme partenaires est pensé pour accélérer la vente, réduire la friction technique et augmenter la valeur créée pour vos clients finaux.
            </SectionText>
          </SectionHeader>

          <BenefitsGrid>
            <BenefitCard data-reveal style={{ '--reveal-delay': '60ms' }}>
              <IconBox>
                <LineChart size={24} />
              </IconBox>
              <h3>Un modèle de revenus plus lisible</h3>
              <p>
                Construisez un revenu récurrent autour d’une offre logicielle à forte valeur perçue, avec une structure simple à présenter et à vendre.
              </p>
            </BenefitCard>

            <BenefitCard data-reveal style={{ '--reveal-delay': '140ms' }}>
              <IconBox>
                <ShieldCheck size={24} />
              </IconBox>
              <h3>Une proposition crédible face aux alternatives</h3>
              <p>
                Positionnez une solution moderne orientée performance, sécurité et expérience utilisateur, sans dépendre d’un discours produit flou.
              </p>
            </BenefitCard>

            <BenefitCard data-reveal style={{ '--reveal-delay': '220ms' }}>
              <IconBox>
                <Users size={24} />
              </IconBox>
              <h3>Un accompagnement plus opérationnel</h3>
              <p>
                Bénéficiez d’un support commercial et technique plus direct pour qualifier, lancer et faire grandir vos opportunités.
              </p>
            </BenefitCard>
          </BenefitsGrid>
        </Section>

        <Section data-reveal>
          <SectionHeader>
            <SectionTitle>Trois formats de partenariat</SectionTitle>
            <SectionText>
              Choisissez le format qui correspond à votre cycle de vente, à votre profondeur d’intégration et à votre niveau d’implication client.
            </SectionText>
          </SectionHeader>

          <ProgramGrid>
            <ProgramCard data-reveal style={{ '--reveal-delay': '60ms' }}>
              <div className="tag">Referral</div>
              <h3>Apporteur d’affaires</h3>
              <p>
                Pour les acteurs qui souhaitent recommander VisioConnect à leurs clients sans porter le déploiement technique.
              </p>
              <BulletList>
                <BulletItem><BadgeCheck size={16} /> Transmission simple des opportunités</BulletItem>
                <BulletItem><BadgeCheck size={16} /> Cycle de lancement rapide</BulletItem>
                <BulletItem><BadgeCheck size={16} /> Modèle adapté aux cabinets et réseaux</BulletItem>
              </BulletList>
            </ProgramCard>

            <ProgramCard data-reveal style={{ '--reveal-delay': '140ms' }}>
              <div className="tag">Reseller</div>
              <h3>Revendeur / Agence</h3>
              <p>
                Pour les structures qui veulent intégrer la plateforme dans leur portefeuille d’offres et piloter la relation client.
              </p>
              <BulletList>
                <BulletItem><BadgeCheck size={16} /> Offre packagée plus facile à vendre</BulletItem>
                <BulletItem><BadgeCheck size={16} /> Support d’avant-vente dédié</BulletItem>
                <BulletItem><BadgeCheck size={16} /> Ressources produit et commerciales</BulletItem>
              </BulletList>
            </ProgramCard>

            <ProgramCard data-reveal style={{ '--reveal-delay': '220ms' }}>
              <div className="tag">Integration</div>
              <h3>Intégrateur / Partenaire solution</h3>
              <p>
                Pour les partenaires techniques qui souhaitent connecter VisioConnect à des workflows, espaces clients ou outils métier.
              </p>
              <BulletList>
                <BulletItem><BadgeCheck size={16} /> Intégrations sur mesure</BulletItem>
                <BulletItem><BadgeCheck size={16} /> Support technique plus poussé</BulletItem>
                <BulletItem><BadgeCheck size={16} /> Positionnement à plus forte valeur</BulletItem>
              </BulletList>
            </ProgramCard>
          </ProgramGrid>
        </Section>

        <Section data-reveal>
          <SectionHeader>
            <SectionTitle>Comment se déroule la collaboration</SectionTitle>
            <SectionText>
              Le parcours partenaire a été simplifié pour permettre un cadrage rapide, un bon niveau d’alignement commercial et une mise en route sans friction inutile.
            </SectionText>
          </SectionHeader>

          <Timeline>
            <TimelineItem data-reveal style={{ '--reveal-delay': '40ms' }}>
              <TimelineStep>01</TimelineStep>
              <TimelineContent>
                <h3>Qualification</h3>
                <p>
                  Nous analysons votre profil, votre cible de clients et la forme de partenariat la plus pertinente pour votre activité.
                </p>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem data-reveal style={{ '--reveal-delay': '120ms' }}>
              <TimelineStep>02</TimelineStep>
              <TimelineContent>
                <h3>Alignement commercial</h3>
                <p>
                  Nous clarifions le positionnement, les cas d’usage, le discours de valeur et les conditions de collaboration pour éviter toute zone grise.
                </p>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem data-reveal style={{ '--reveal-delay': '200ms' }}>
              <TimelineStep>03</TimelineStep>
              <TimelineContent>
                <h3>Activation</h3>
                <p>
                  Vous recevez les éléments utiles pour lancer vos premières opportunités: cadrage produit, support, ressources et point de contact opérationnel.
                </p>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Section>

        <Section data-reveal>
          <SectionHeader>
            <SectionTitle>Pour quels profils</SectionTitle>
            <SectionText>
              La page est pensée pour parler à des partenaires sérieux, pas à une audience générique. Si vous opérez sur un marché professionnel, le programme est fait pour vous.
            </SectionText>
          </SectionHeader>

          <BenefitsGrid>
            <BenefitCard data-reveal style={{ '--reveal-delay': '60ms' }}>
              <IconBox>
                <Building2 size={24} />
              </IconBox>
              <h3>Agences et studios</h3>
              <p>
                Pour enrichir une offre digitale avec un produit de collaboration crédible, simple à présenter et aligné sur une logique premium.
              </p>
            </BenefitCard>

            <BenefitCard data-reveal style={{ '--reveal-delay': '140ms' }}>
              <IconBox>
                <Briefcase size={24} />
              </IconBox>
              <h3>Cabinets et conseil</h3>
              <p>
                Pour recommander ou embarquer une solution vidéo dans une mission d’accompagnement, de transformation ou d’équipement.
              </p>
            </BenefitCard>

            <BenefitCard data-reveal style={{ '--reveal-delay': '220ms' }}>
              <IconBox>
                <Handshake size={24} />
              </IconBox>
              <h3>Intégrateurs et revendeurs</h3>
              <p>
                Pour construire une offre récurrente autour d’un produit exploitable commercialement et techniquement.
              </p>
            </BenefitCard>
          </BenefitsGrid>
        </Section>

        <RevealBlock data-reveal style={{ '--reveal-delay': '80ms' }}>
          <CallToAction
            title="Construire un partenariat solide"
            description="Échangeons sur votre activité, votre marché et la manière la plus pertinente d’intégrer VisioConnect dans votre offre."
            buttonText="Contacter l'équipe partenariats"
            buttonLink="/contact"
          />
        </RevealBlock>
      </MainContent>
      <FooterClean />
    </PageContainer>
  );
};

export default PartnersPage;
