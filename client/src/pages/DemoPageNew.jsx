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
import { useTranslation } from '../hooks/useTranslation';
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

import { useNavigate } from 'react-router-dom';

export default function DemoPageNew() {
  const { t } = useTranslation();
  const [demoRoomId] = React.useState(`demo-${Math.random().toString(36).substring(2, 9)}`);

  const highlights = [
    {
      icon: <Video size={22} />,
      title: t('demo.highlights.0.title'),
      description: t('demo.highlights.0.desc'),
    },
    {
      icon: <Bot size={22} />,
      title: t('demo.highlights.1.title'),
      description: t('demo.highlights.1.desc'),
    },
    {
      icon: <ShieldCheck size={22} />,
      title: t('demo.highlights.2.title'),
      description: t('demo.highlights.2.desc'),
    },
    {
      icon: <MonitorSmartphone size={22} />,
      title: t('demo.highlights.3.title'),
      description: t('demo.highlights.3.desc'),
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: t('demo.workflow.0.title'),
      description: t('demo.workflow.0.desc'),
    },
    {
      step: '02',
      title: t('demo.workflow.1.title'),
      description: t('demo.workflow.1.desc'),
    },
    {
      step: '03',
      title: t('demo.workflow.2.title'),
      description: t('demo.workflow.2.desc'),
    },
  ];

  const useCases = [
    {
      icon: <Users size={22} />,
      title: t('demo.usecases.0.title'),
      description: t('demo.usecases.0.desc'),
    },
    {
      icon: <Globe size={22} />,
      title: t('demo.usecases.1.title'),
      description: t('demo.usecases.1.desc'),
    },
    {
      icon: <MessageSquareText size={22} />,
      title: t('demo.usecases.2.title'),
      description: t('demo.usecases.2.desc'),
    },
    {
      icon: <Layers3 size={22} />,
      title: t('demo.usecases.3.title'),
      description: t('demo.usecases.3.desc'),
    },
  ];

  const proofMetrics = [
    { label: t('demo.proof.0.label'), value: t('demo.proof.0.value') },
    { label: t('demo.proof.1.label'), value: t('demo.proof.1.value') },
    { label: t('demo.proof.2.label'), value: t('demo.proof.2.value') },
    { label: t('demo.proof.3.label'), value: t('demo.proof.3.value') },
  ];

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
                <Sparkles size={16} /> {t('demo.hero.eyebrow')}
              </Eyebrow>
              <HeroTitle>
                {t('demo.hero.title')}
                <span>{t('demo.hero.titleHighlight')}</span>
              </HeroTitle>
              <HeroSubtitle>
                {t('demo.hero.subtitle')}
              </HeroSubtitle>
              <HeroActions>
                <PrimaryButton to={`/room/${demoRoomId}`}>
                  <Play size={18} fill="currentColor" /> {t('demo.hero.launchDemo')}
                </PrimaryButton>
                <SecondaryButton to="/contact">
                  {t('demo.hero.schedulePresentation')} <ArrowRight size={18} />
                </SecondaryButton>
              </HeroActions>
              <HeroMeta>
                <MetaPill><Gauge size={16} /> {t('demo.hero.meta.latency')}</MetaPill>
                <MetaPill><Bot size={16} /> {t('demo.hero.meta.ai')}</MetaPill>
                <MetaPill><ShieldCheck size={16} /> {t('demo.hero.meta.enterprise')}</MetaPill>
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
            <SectionLabel><Sparkles size={16} /> {t('demo.sections.difference.label')}</SectionLabel>
            <SectionTitle>{t('demo.sections.difference.title')}</SectionTitle>
            <SectionText>
              {t('demo.sections.difference.text')}
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
            <SectionLabel><Layers3 size={16} /> {t('demo.sections.workflow.label')}</SectionLabel>
            <SectionTitle>{t('demo.sections.workflow.title')}</SectionTitle>
            <SectionText>
              {t('demo.sections.workflow.text')}
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
              <SectionLabel style={{ color: '#93c5fd' }}><Gauge size={16} /> {t('demo.darkband.label')}</SectionLabel>
              <h2>{t('demo.darkband.title')}</h2>
              <p>
                {t('demo.darkband.text')}
              </p>
              <BulletGrid>
                <Bullet><BadgeCheck size={16} /> {t('demo.darkband.bullets.0')}</Bullet>
                <Bullet><BadgeCheck size={16} /> {t('demo.darkband.bullets.1')}</Bullet>
                <Bullet><BadgeCheck size={16} /> {t('demo.darkband.bullets.2')}</Bullet>
                <Bullet><BadgeCheck size={16} /> {t('demo.darkband.bullets.3')}</Bullet>
              </BulletGrid>
            </DarkText>

            <MetricsPanel>
              <MetricsHero>
                <div className="eyebrow">{t('demo.metrics.eyebrow')}</div>
                <div className="value">{t('demo.metrics.value')}</div>
                <div className="caption">{t('demo.metrics.caption')}</div>
              </MetricsHero>

              <MetricsGrid>
                <MetricsTile>
                  <div className="label">{t('demo.metrics.tiles.0.label')}</div>
                  <div className="value">{t('demo.metrics.tiles.0.value')}</div>
                </MetricsTile>
                <MetricsTile>
                  <div className="label">{t('demo.metrics.tiles.1.label')}</div>
                  <div className="value">{t('demo.metrics.tiles.1.value')}</div>
                </MetricsTile>
                <MetricsTile>
                  <div className="label">{t('demo.metrics.tiles.2.label')}</div>
                  <div className="value">{t('demo.metrics.tiles.2.value')}</div>
                </MetricsTile>
                <MetricsTile>
                  <div className="label">{t('demo.metrics.tiles.3.label')}</div>
                  <div className="value">{t('demo.metrics.tiles.3.value')}</div>
                </MetricsTile>
              </MetricsGrid>
            </MetricsPanel>
          </DarkContainer>
        </DarkBand>

        <Section data-reveal>
          <SectionHeader>
            <SectionLabel><Globe size={16} /> {t('demo.sections.usecases.label')}</SectionLabel>
            <SectionTitle>{t('demo.sections.usecases.title')}</SectionTitle>
            <SectionText>
              {t('demo.sections.usecases.text')}
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
            title={t('demo.cta.title')}
            description={t('demo.cta.description')}
            buttonText={t('demo.cta.button')}
            buttonLink={`/room/${demoRoomId}`}
          />
        </RevealBlock>
      </MainContent>

      <FooterClean />
    </PageContainer>
  );
}
