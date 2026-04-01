import React, { useEffect } from 'react';
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
import {
  Bullet,
  BulletGrid,
  CardGrid,
  CompactProofGrid,
  DarkBand,
  DarkContainer,
  DarkText,
  Eyebrow,
  FeatureCard,
  HeroActions,
  HeroContainer,
  HeroContent,
  HeroMeta,
  HeroSection,
  HeroSubtitle,
  HeroTitle,
  IconBox,
  MainContent,
  MetaPill,
  MetricsGrid,
  MetricsHero,
  MetricsPanel,
  MetricsTile,
  PageContainer,
  PrimaryButton,
  ProofCard,
  RevealBlock,
  SecondaryButton,
  Section,
  SectionHeader,
  SectionLabel,
  SectionText,
  SectionTitle,
  StepBadge,
  WorkflowCard,
  WorkflowContent,
  WorkflowGrid,
} from './DemoPageNew.styles';

const highlights = [
  {
    icon: <Video size={22} />,
    title: 'Visio fluide & ultra HD',
    description: 'Une qualité allant jusqu\'à la 4K, adaptée dynamiquement à la connexion de chaque participant pour garantir un échange sans coupure.',
  },
  {
    icon: <Bot size={22} />,
    title: 'Assistant IA exclusif',
    description: 'Bénéficiez de la retranscription en temps réel, de la génération de résumés et d\'un agent interactif au cœur de vos réunions.',
  },
  {
    icon: <ShieldCheck size={22} />,
    title: 'Contrôle & Sécurité',
    description: 'Vos échanges sont protégés par un chiffrement robuste, avec une séparation stricte des flux audio, vidéo et données.',
  },
  {
    icon: <MonitorSmartphone size={22} />,
    title: 'Connexion instantanée',
    description: 'Rejoignez la réunion depuis n\'importe quel navigateur (ordinateur, tablette, mobile) sans aucune installation de logiciel requise.',
  },
];

const workflowSteps = [
  {
    step: '01',
    title: 'Cliquez et rejoignez',
    description: 'Pas de formulaire interminable : entrez en un clic dans notre salle de démo et découvrez notre interface épurée.',
  },
  {
    step: '02',
    title: 'Testez nos fonctionnalités',
    description: 'Activez la caméra, discutez avec l\'IA, utilisez le tableau blanc et jugez par vous-même de notre faible latence.',
  },
  {
    step: '03',
    title: 'Passez à la vitesse supérieure',
    description: 'Séduit par l’expérience ? Nos équipes sont prêtes à vous accompagner pour l\'intégrer dans votre environnement professionnel.',
  },
];

const useCases = [
  {
    icon: <Users size={22} />,
    title: 'Réunions de direction',
    description: 'Un environnement confidentiel, stable et premium pour vos prises de décisions, avec compte-rendu généré par l\'IA.',
  },
  {
    icon: <Globe size={22} />,
    title: 'Travail collaboratif distant',
    description: 'Réduisez la friction technique pour vos équipes mondiales grâce à une latence invisible et au tableau blanc intégré.',
  },
  {
    icon: <MessageSquareText size={22} />,
    title: 'Support et relation client',
    description: 'Offrez un point de contact réactif et qualitatif, tout en gardant une trace précise grâce à la retranscription automatique.',
  },
  {
    icon: <Layers3 size={22} />,
    title: 'Présentations commerciales',
    description: 'Suscitez la confiance de vos partenaires avec une solution moderne, fluide et qui ne nécessite aucune installation.',
  },
];

const proofMetrics = [
  { label: 'Latence cible', value: '29 ms' },
  { label: 'Vidéo', value: 'Jusqu\'à 4K adaptatif' },
  { label: 'IA intégrée', value: 'Résumés & Actions' },
  { label: 'Accès', value: 'Zéro installation' },
];

import { useNavigate } from 'react-router-dom';

export default function DemoPageNew() {
  const [demoRoomId] = React.useState(`demo-${Math.random().toString(36).substring(2, 9)}`);

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
                Découvrez la visioconférence de demain,
                <span>propulsée par l'IA</span>
              </HeroTitle>
              <HeroSubtitle>
                Plongez dans un environnement de collaboration premium. Expérimentez des réunions fluides, sécurisées et assistées par notre IA intelligente. Entrez dans une salle de démonstration en direct pour tester nos fonctionnalités avancées sans aucun engagement.
              </HeroSubtitle>
              <HeroActions>
                <PrimaryButton to={`/room/${demoRoomId}`}>
                  <Play size={18} fill="currentColor" /> Lancer la démo live
                </PrimaryButton>
                <SecondaryButton to="/contact">
                  Planifier une présentation <ArrowRight size={18} />
                </SecondaryButton>
              </HeroActions>
              <HeroMeta>
                <MetaPill><Gauge size={16} /> Très faible latence</MetaPill>
                <MetaPill><Bot size={16} /> Assistant IA intégré</MetaPill>
                <MetaPill><ShieldCheck size={16} /> Conçu pour les entreprises</MetaPill>
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
            <SectionLabel><Sparkles size={16} /> Ce qui fait la différence</SectionLabel>
            <SectionTitle>Une plateforme conçue pour l'exigence</SectionTitle>
            <SectionText>
              Nous avons repensé la visioconférence pour qu'elle devienne un outil immersif et intelligent, plutôt qu'une simple fenêtre vidéo de plus.
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
            <SectionTitle>Comment se déroule la démo</SectionTitle>
            <SectionText>
              Nous avons raccourci la distance entre la découverte produit et votre première expérience. En quelques secondes, vous êtes en visioconférence.
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
              <SectionLabel style={{ color: '#93c5fd' }}><Gauge size={16} /> Sous le capot</SectionLabel>
              <h2>Derrière la plateforme : une architecture taillée pour la performance</h2>
              <p>
                Notre solution repose sur les standards les plus exigeants du marché pour offrir une expérience sans faille, même dans des conditions réseaux dégradées.
              </p>
              <BulletGrid>
                <Bullet><BadgeCheck size={16} /> Routage vidéo optimisé (SFU)</Bullet>
                <Bullet><BadgeCheck size={16} /> Codecs haute-fidélité de dernière génération</Bullet>
                <Bullet><BadgeCheck size={16} /> Traitement de l’IA en temps réel</Bullet>
                <Bullet><BadgeCheck size={16} /> Infrastructure redondante à haute disponibilité</Bullet>
              </BulletGrid>
            </DarkText>

            <MetricsPanel>
              <MetricsHero>
                <div className="eyebrow">Signal principal</div>
                <div className="value">Prêt pour la 4K</div>
                <div className="caption">Une infrastructure conçue pour la performance brute et l'enrichissement collaboratif en temps réel.</div>
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
            <SectionTitle>Pensé pour vos usages au quotidien</SectionTitle>
            <SectionText>
              Découvrez comment notre solution s'adapte à vos besoins spécifiques et transforme la manière dont vos équipes interagissent au quotidien.
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
            title="Prêt à tester la différence ?"
            description="Rejoignez notre salle de démonstration publique ou planifiez un appel avec notre équipe pour une présentation personnalisée."
            buttonText="Lancer la room de démo"
            buttonLink={`/room/${demoRoomId}`}
          />
        </RevealBlock>
      </MainContent>

      <FooterClean />
    </PageContainer>
  );
}
