import React, { useEffect, useState } from 'react';
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
import styled from 'styled-components';
import SEO from '../components/SEO';

// --- Modale saisie du pseudo ---
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalBox = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 2.4rem 2rem 2rem;
  width: min(90vw, 420px);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.2;
`;

const ModalSub = styled.p`
  margin: -0.5rem 0 0;
  font-size: 0.93rem;
  color: #64748b;
  line-height: 1.6;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  color: #0f172a;
  box-sizing: border-box;
  transition: border-color 0.2s;
  &:focus {
    border-color: hsl(var(--primary, 221 83% 53%));
  }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ModalSubmit = styled.button`
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 10px;
  background: #2563eb;
  color: #fff;
  font-size: 0.97rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #1d4ed8;
  }
  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

const ModalCancel = styled.button`
  padding: 0.75rem 1rem;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  background: transparent;
  color: #64748b;
  font-size: 0.97rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
  &:hover {
    background: #f8fafc;
  }
`;

const LaunchButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.85rem 1.6rem;
  border: none;
  border-radius: 12px;
  background: #2563eb;
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.15s;
  text-decoration: none;
  &:hover {
    background: #1d4ed8;
    transform: translateY(-1px);
  }
`;

export default function DemoPageNew() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [demoRoomId] = React.useState(`demo-${Math.random().toString(36).substring(2, 9)}`);
  const [showModal, setShowModal] = useState(
    () => new URLSearchParams(window.location.search).get('join') === '1'
  );
  const [guestName, setGuestName] = useState('');

  const handleLaunchDemo = () => setShowModal(true);

  const handleJoin = () => {
    const name = guestName.trim();
    if (!name) return;
    sessionStorage.setItem('guestDisplayName', name);
    navigate(`/meeting/${demoRoomId}`);
  };

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
    <>
      <SEO
        title="Démo interactive"
        description="Testez VisioConnect gratuitement, sans inscription."
        path="/demo"
      />
      <PageContainer>
        {showModal && (
          <ModalOverlay onClick={() => setShowModal(false)}>
            <ModalBox onClick={(e) => e.stopPropagation()}>
              <ModalTitle>{t('demo.modal.title', 'Rejoindre la démo live')}</ModalTitle>
              <ModalSub>
                {t(
                  'demo.modal.subtitle',
                  'Entrez un prénom ou un pseudo pour participer à la démonstration. Aucun compte requis.'
                )}
              </ModalSub>
              <ModalInput
                autoFocus
                type="text"
                maxLength={40}
                placeholder={t('demo.modal.placeholder', 'Votre prénom ou pseudo')}
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
              />
              <ModalActions>
                <ModalCancel onClick={() => setShowModal(false)}>
                  {t('demo.modal.cancel', 'Annuler')}
                </ModalCancel>
                <ModalSubmit onClick={handleJoin} disabled={!guestName.trim()}>
                  {t('demo.modal.submit', 'Lancer la démo →')}
                </ModalSubmit>
              </ModalActions>
            </ModalBox>
          </ModalOverlay>
        )}

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
                <HeroSubtitle>{t('demo.hero.subtitle')}</HeroSubtitle>
                <HeroActions>
                  <LaunchButton onClick={handleLaunchDemo}>
                    <Play size={18} fill="currentColor" /> {t('demo.hero.launchDemo')}
                  </LaunchButton>
                  <SecondaryButton to="/contact">
                    {t('demo.hero.schedulePresentation')} <ArrowRight size={18} />
                  </SecondaryButton>
                </HeroActions>
                <HeroMeta>
                  <MetaPill>
                    <Gauge size={16} /> {t('demo.hero.meta.latency')}
                  </MetaPill>
                  <MetaPill>
                    <Bot size={16} /> {t('demo.hero.meta.ai')}
                  </MetaPill>
                  <MetaPill>
                    <ShieldCheck size={16} /> {t('demo.hero.meta.enterprise')}
                  </MetaPill>
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
              <SectionLabel>
                <Sparkles size={16} /> {t('demo.sections.difference.label')}
              </SectionLabel>
              <SectionTitle>{t('demo.sections.difference.title')}</SectionTitle>
              <SectionText>{t('demo.sections.difference.text')}</SectionText>
            </SectionHeader>

            <CardGrid>
              {highlights.map((item, index) => (
                <FeatureCard
                  key={item.title}
                  data-reveal
                  style={{ '--reveal-delay': `${index * 80}ms` }}
                >
                  <IconBox>{item.icon}</IconBox>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </FeatureCard>
              ))}
            </CardGrid>
          </Section>

          <Section data-reveal>
            <SectionHeader>
              <SectionLabel>
                <Layers3 size={16} /> {t('demo.sections.workflow.label')}
              </SectionLabel>
              <SectionTitle>{t('demo.sections.workflow.title')}</SectionTitle>
              <SectionText>{t('demo.sections.workflow.text')}</SectionText>
            </SectionHeader>

            <WorkflowGrid>
              {workflowSteps.map((item, index) => (
                <WorkflowCard
                  key={item.step}
                  data-reveal
                  style={{ '--reveal-delay': `${index * 90}ms` }}
                >
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
                <SectionLabel style={{ color: '#93c5fd' }}>
                  <Gauge size={16} /> {t('demo.darkband.label')}
                </SectionLabel>
                <h2>{t('demo.darkband.title')}</h2>
                <p>{t('demo.darkband.text')}</p>
                <BulletGrid>
                  <Bullet>
                    <BadgeCheck size={16} /> {t('demo.darkband.bullets.0')}
                  </Bullet>
                  <Bullet>
                    <BadgeCheck size={16} /> {t('demo.darkband.bullets.1')}
                  </Bullet>
                  <Bullet>
                    <BadgeCheck size={16} /> {t('demo.darkband.bullets.2')}
                  </Bullet>
                  <Bullet>
                    <BadgeCheck size={16} /> {t('demo.darkband.bullets.3')}
                  </Bullet>
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
              <SectionLabel>
                <Globe size={16} /> {t('demo.sections.usecases.label')}
              </SectionLabel>
              <SectionTitle>{t('demo.sections.usecases.title')}</SectionTitle>
              <SectionText>{t('demo.sections.usecases.text')}</SectionText>
            </SectionHeader>

            <CardGrid>
              {useCases.map((item, index) => (
                <FeatureCard
                  key={item.title}
                  data-reveal
                  style={{ '--reveal-delay': `${index * 80}ms` }}
                >
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
    </>
  );
}
