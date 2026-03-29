import React, { useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Gauge,
  Globe,
  Layers3,
  MessageSquareText,
  MonitorSmartphone,
  Play,
  ShieldCheck,
  Sparkles,
  Users,
  Video,
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
  navy: '#0f172a',
  surfaceBlue: '#eff6ff',
  lineBlue: '#dbeafe',
};

const highlights = [
  {
    icon: <Video size={22} />,
    title: 'Visio nette et stable',
    description: 'Qualité vidéo premium avec adaptation dynamique selon la bande passante et les appareils connectés.',
  },
  {
    icon: <Bot size={22} />,
    title: 'Assistant IA intégré',
    description: 'Synthèse, relance, extraction d’actions et aide conversationnelle directement depuis la salle.',
  },
  {
    icon: <ShieldCheck size={22} />,
    title: 'Cadre sécurisé',
    description: 'Positionnement entreprise avec contrôle d’accès, architecture moderne et séparation propre des flux.',
  },
  {
    icon: <MonitorSmartphone size={22} />,
    title: 'Expérience multi-écrans',
    description: 'La démo fonctionne dans un navigateur moderne, sur poste, laptop ou écran secondaire sans friction.',
  },
];

const workflowSteps = [
  {
    step: '01',
    title: 'Entrée immédiate dans la salle',
    description: 'Le visiteur comprend tout de suite l’interface, les contrôles et la qualité de la mise en scène produit.',
  },
  {
    step: '02',
    title: 'Lecture claire de la valeur',
    description: 'La page met en avant les bons signaux: collaboration, IA, sécurité et qualité perçue élevée.',
  },
  {
    step: '03',
    title: 'Passage à l’action',
    description: 'La démonstration renvoie ensuite soit vers une room live, soit vers un contact commercial plus qualifié.',
  },
];

const useCases = [
  {
    icon: <Users size={22} />,
    title: 'Réunions direction et projets',
    description: 'Pour montrer une salle lisible, un niveau de qualité premium et un cadre crédible face aux alternatives classiques.',
  },
  {
    icon: <Globe size={22} />,
    title: 'Équipes distribuées',
    description: 'Pour mettre en avant la régularité de l’expérience quand plusieurs intervenants travaillent à distance.',
  },
  {
    icon: <MessageSquareText size={22} />,
    title: 'Support et relation client',
    description: 'Pour prouver qu’un échange vidéo peut rester rapide, clair et mieux documenté avec l’assistance IA.',
  },
  {
    icon: <Layers3 size={22} />,
    title: 'Démonstration produit',
    description: 'Pour présenter une plateforme plus premium et plus moderne à des prospects qui attendent un vrai niveau de finition.',
  },
];

const proofMetrics = [
  { label: 'Latence cible', value: '29 ms' },
  { label: 'Vidéo', value: '1080p adaptatif' },
  { label: 'IA', value: 'Résumé et actions' },
  { label: 'Accès', value: 'Room live immédiate' },
];

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

const PageContainer = styled.div`
  min-height: 100vh;
  background:
    radial-gradient(circle at 0% 0%, rgba(37, 99, 235, 0.09), transparent 28%),
    radial-gradient(circle at 100% 18%, rgba(59, 130, 246, 0.08), transparent 24%),
    linear-gradient(180deg, #f7fbff 0%, ${COLORS.background} 28%, ${COLORS.background} 100%);
  color: ${COLORS.foreground};
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

const HeroSection = styled.section`
  padding: 6.8rem 1.5rem 4.5rem;
  border-bottom: 1px solid ${COLORS.border};
`;

const HeroContainer = styled.div`
  max-width: 1160px;
  margin: 0 auto;
`;

const HeroContent = styled.div`
  max-width: 860px;
  animation: ${floatIn} 0.78s cubic-bezier(0.22, 1, 0.36, 1) both;
`;

const Eyebrow = styled.div`
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

const HeroTitle = styled.h1`
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

const HeroSubtitle = styled.p`
  max-width: 760px;
  margin: 0 0 2rem;
  color: ${COLORS.muted};
  font-size: 1.12rem;
  line-height: 1.75;
`;

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const PrimaryButton = styled(Link)`
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

const SecondaryButton = styled(Link)`
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

const HeroMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const MetaPill = styled.div`
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

const CompactProofGrid = styled.div`
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

const ProofCard = styled.div`
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

const Section = styled.section`
  max-width: 1160px;
  width: 100%;
  margin: 0 auto;
  padding: 5rem 1.5rem;
  ${revealStyles};
`;

const SectionHeader = styled.div`
  max-width: 760px;
  margin-bottom: 2.6rem;
`;

const SectionLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-bottom: 0.9rem;
  color: ${COLORS.primary};
  font-weight: 800;
  letter-spacing: 0.01em;
`;

const SectionTitle = styled.h2`
  margin: 0 0 0.85rem;
  color: ${COLORS.navy};
  font-size: clamp(2rem, 3.2vw, 3rem);
  line-height: 1.06;
  letter-spacing: -0.035em;
`;

const SectionText = styled.p`
  margin: 0;
  color: ${COLORS.muted};
  line-height: 1.72;
  font-size: 1.05rem;
`;

const CardGrid = styled.div`
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

const FeatureCard = styled.article`
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

const IconBox = styled.div`
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

const WorkflowGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

const WorkflowCard = styled.article`
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

const StepBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  border-radius: 14px;
  background: ${COLORS.surfaceBlue};
  color: ${COLORS.primary};
  font-weight: 900;
`;

const WorkflowContent = styled.div`
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

const DarkBand = styled.section`
  background:
    radial-gradient(circle at 10% 0%, rgba(59, 130, 246, 0.18), transparent 22%),
    linear-gradient(180deg, #0b1220 0%, #101b34 100%);
  border-top: 1px solid rgba(148, 163, 184, 0.08);
  border-bottom: 1px solid rgba(148, 163, 184, 0.08);
`;

const DarkContainer = styled.div`
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

const DarkText = styled.div`
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
`;

const BulletGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const Bullet = styled.div`
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

const MetricsPanel = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1.2rem;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(148, 163, 184, 0.12);
  box-shadow: 0 24px 70px rgba(2, 6, 23, 0.3);
`;

const MetricsHero = styled.div`
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

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem;
`;

const MetricsTile = styled.div`
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

const RevealBlock = styled.div`
  ${revealStyles};
`;

export default function DemoPageNew() {
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
        threshold: 0.16,
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
                <Sparkles size={16} /> Démo immersive de la plateforme
              </Eyebrow>
              <HeroTitle>
                Une page demo plus propre,
                <span>sans énorme bloc inutile</span>
              </HeroTitle>
              <HeroSubtitle>
                La page garde un niveau premium mais retire la grosse carte massive qui alourdissait la lecture. L’objectif est maintenant plus clair: comprendre la valeur, voir les signaux produit importants et entrer rapidement dans la room de démonstration.
              </HeroSubtitle>
              <HeroActions>
                <PrimaryButton to="/room/demo-pro-room">
                  <Play size={18} fill="currentColor" /> Lancer la démo live
                </PrimaryButton>
                <SecondaryButton to="/contact">
                  Planifier une présentation <ArrowRight size={18} />
                </SecondaryButton>
              </HeroActions>
              <HeroMeta>
                <MetaPill><Gauge size={16} /> Démonstration orientée performance</MetaPill>
                <MetaPill><Bot size={16} /> Assistant IA visible dès l’entrée</MetaPill>
                <MetaPill><ShieldCheck size={16} /> Positionnement B2B premium</MetaPill>
              </HeroMeta>
            </HeroContent>

            <CompactProofGrid data-reveal>
              {proofMetrics.map((metric, index) => (
                <ProofCard key={metric.label} style={{ '--reveal-delay': `${index * 70}ms` }}>
                  <div className="label">{metric.label}</div>
                  <div className="value">{metric.value}</div>
                </ProofCard>
              ))}
            </CompactProofGrid>
          </HeroContainer>
        </HeroSection>

        <Section data-reveal>
          <SectionHeader>
            <SectionLabel><Sparkles size={16} /> Ce que la démo doit prouver</SectionLabel>
            <SectionTitle>Une démonstration plus concrète et plus premium</SectionTitle>
            <SectionText>
              La page demo doit vendre une expérience, pas seulement une liste d’arguments. Les cartes ci-dessous rendent visibles les briques qui comptent vraiment pour un visiteur ou un prospect.
            </SectionText>
          </SectionHeader>

          <CardGrid>
            {highlights.map((item, index) => (
              <FeatureCard key={item.title} data-reveal style={{ '--reveal-delay': `${index * 80}ms` }}>
                <IconBox>{item.icon}</IconBox>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </FeatureCard>
            ))}
          </CardGrid>
        </Section>

        <Section data-reveal>
          <SectionHeader>
            <SectionLabel><Layers3 size={16} /> Parcours</SectionLabel>
            <SectionTitle>Ce que l’utilisateur comprend en quelques instants</SectionTitle>
            <SectionText>
              Une bonne page demo doit raccourcir la distance entre découverte produit et engagement réel. Le parcours a donc été restructuré pour rendre la valeur plus évidente à chaque étape.
            </SectionText>
          </SectionHeader>

          <WorkflowGrid>
            {workflowSteps.map((item, index) => (
              <WorkflowCard key={item.step} data-reveal style={{ '--reveal-delay': `${index * 90}ms` }}>
                <StepBadge>{item.step}</StepBadge>
                <WorkflowContent>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </WorkflowContent>
              </WorkflowCard>
            ))}
          </WorkflowGrid>
        </Section>

        <DarkBand>
          <DarkContainer data-reveal>
            <DarkText>
              <SectionLabel style={{ color: '#93c5fd' }}><Gauge size={16} /> Lecture technique</SectionLabel>
              <h2>Un cadrage plus crédible pour les visiteurs qui évaluent vraiment la plateforme</h2>
              <p>
                Au lieu d’une simple promesse marketing, la section technique met en avant des indicateurs lisibles, une architecture moderne et des signaux de sérieux plus adaptés à une audience professionnelle.
              </p>
              <BulletGrid>
                <Bullet><BadgeCheck size={16} /> Architecture pensée pour la faible latence</Bullet>
                <Bullet><BadgeCheck size={16} /> Expérience de salle cohérente sur plusieurs appareils</Bullet>
                <Bullet><BadgeCheck size={16} /> Assistant IA exploitable dans un contexte réel</Bullet>
                <Bullet><BadgeCheck size={16} /> Positionnement plus convaincant face aux solutions établies</Bullet>
              </BulletGrid>
            </DarkText>

            <MetricsPanel>
              <MetricsHero>
                <div className="eyebrow">Signal principal</div>
                <div className="value">4K-ready room</div>
                <div className="caption">Une mise en scène orientée qualité perçue, réactivité et collaboration enrichie par l’IA.</div>
              </MetricsHero>

              <MetricsGrid>
                <MetricsTile>
                  <div className="label">Bitrate vidéo</div>
                  <div className="value">2.4 Mbps</div>
                </MetricsTile>
                <MetricsTile>
                  <div className="label">RTT moyen</div>
                  <div className="value">29 ms</div>
                </MetricsTile>
                <MetricsTile>
                  <div className="label">Audio</div>
                  <div className="value">Opus 48 kHz</div>
                </MetricsTile>
                <MetricsTile>
                  <div className="label">Collaboration</div>
                  <div className="value">Chat + AI + partage</div>
                </MetricsTile>
              </MetricsGrid>
            </MetricsPanel>
          </DarkContainer>
        </DarkBand>

        <Section data-reveal>
          <SectionHeader>
            <SectionLabel><Globe size={16} /> Cas d’usage</SectionLabel>
            <SectionTitle>Une page demo plus utile à la vente et à la qualification</SectionTitle>
            <SectionText>
              Cette version aide autant un visiteur curieux qu’un prospect plus avancé. Elle montre comment la plateforme se projette dans des contextes d’usage clairs, sans surcharge inutile.
            </SectionText>
          </SectionHeader>

          <CardGrid>
            {useCases.map((item, index) => (
              <FeatureCard key={item.title} data-reveal style={{ '--reveal-delay': `${index * 80}ms` }}>
                <IconBox>{item.icon}</IconBox>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </FeatureCard>
            ))}
          </CardGrid>
        </Section>

        <RevealBlock data-reveal style={{ '--reveal-delay': '80ms' }}>
          <CallToAction
            title="Passer de la page à la vraie démonstration"
            description="Lance la room de démonstration pour voir l’expérience complète, ou échange avec l’équipe si tu veux une présentation plus cadrée."
            buttonText="Accéder à la room démo"
            buttonLink="/room/demo-pro-room"
          />
        </RevealBlock>
      </MainContent>

      <FooterClean />
    </PageContainer>
  );
}
