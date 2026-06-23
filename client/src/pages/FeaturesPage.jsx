import React, { useEffect } from 'react';
import {
  Video,
  Shield,
  Zap,
  Users,
  Smartphone,
  Lock,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Building2,
  CalendarClock,
  Sparkles,
  MonitorPlay,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';
import CallToAction from '../components/CallToAction';
import { useTranslation } from '../hooks/useTranslation';
import {
  BenefitCard,
  BenefitsGrid,
  BulletItem,
  BulletList,
  COLORS,
  Eyebrow,
  HeroActions,
  HeroContainer,
  HeroContent,
  HeroPanel,
  HeroSection,
  HeroSubtitle,
  HeroTitle,
  IconBox,
  MainContent,
  PageContainer,
  PanelGrid,
  PanelHeader,
  PanelMetric,
  PanelTitle,
  PrimaryButton,
  ProgramCard,
  ProgramGrid,
  ProofBand,
  ProofCard,
  ProofGrid,
  RevealBlock,
  SecondaryButton,
  Section,
  SectionHeader,
  SectionText,
  SectionTitle,
  Timeline,
  TimelineContent,
  TimelineItem,
  TimelineStep,
} from './FeaturesPage.styles';

const FeaturesPage = () => {
  const { t } = useTranslation();

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
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    );

    revealNodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  return (
    <PageContainer>
      <HeaderClean />
      <MainContent>
        {/* ── Hero ── */}
        <HeroSection>
          <HeroContainer>
            <HeroContent>
              <Eyebrow>
                <Sparkles size={16} /> {t('featuresPage.eyebrow')}
              </Eyebrow>
              <HeroTitle>{t('featuresPage.hero.title')}</HeroTitle>
              <HeroSubtitle>{t('featuresPage.hero.subtitle')}</HeroSubtitle>
              <HeroActions>
                <PrimaryButton as={Link} to="/register">
                  {t('featuresPage.heroCtaStart')} <ArrowRight size={18} />
                </PrimaryButton>
                <SecondaryButton as={Link} to="/demo">
                  {t('featuresPage.heroCtaDemo')} <MonitorPlay size={18} />
                </SecondaryButton>
              </HeroActions>
            </HeroContent>

            <HeroPanel>
              <PanelHeader>
                <PanelTitle>{t('featuresPage.overview.title')}</PanelTitle>
                <BadgeCheck size={18} color={COLORS.primary} />
              </PanelHeader>
              <PanelGrid>
                <PanelMetric>
                  <div className="label">{t('featuresPage.overview.quality')}</div>
                  <div className="value">{t('featuresPage.overview.qualityValue')}</div>
                </PanelMetric>
                <PanelMetric>
                  <div className="label">{t('featuresPage.overview.security')}</div>
                  <div className="value">{t('featuresPage.overview.securityValue')}</div>
                </PanelMetric>
                <PanelMetric>
                  <div className="label">{t('featuresPage.overview.latency')}</div>
                  <div className="value">{t('featuresPage.overview.latencyValue')}</div>
                </PanelMetric>
                <PanelMetric>
                  <div className="label">{t('featuresPage.overview.mobile')}</div>
                  <div className="value">{t('featuresPage.overview.mobileValue')}</div>
                </PanelMetric>
              </PanelGrid>
            </HeroPanel>
          </HeroContainer>
        </HeroSection>

        {/* ── Proof band ── */}
        <ProofBand>
          <ProofGrid>
            <ProofCard data-reveal style={{ '--reveal-delay': '0ms' }}>
              <div className="value">{t('featuresPage.props.0.label')}</div>
              <div className="label">{t('featuresPage.props.0.desc')}</div>
            </ProofCard>
            <ProofCard data-reveal style={{ '--reveal-delay': '80ms' }}>
              <div className="value">{t('featuresPage.props.1.label')}</div>
              <div className="label">{t('featuresPage.props.1.desc')}</div>
            </ProofCard>
            <ProofCard data-reveal style={{ '--reveal-delay': '160ms' }}>
              <div className="value">{t('featuresPage.props.2.label')}</div>
              <div className="label">{t('featuresPage.props.2.desc')}</div>
            </ProofCard>
            <ProofCard data-reveal style={{ '--reveal-delay': '240ms' }}>
              <div className="value">{t('featuresPage.props.3.label')}</div>
              <div className="label">{t('featuresPage.props.3.desc')}</div>
            </ProofCard>
          </ProofGrid>
        </ProofBand>

        {/* ── Core features ── */}
        <Section data-reveal>
          <SectionHeader>
            <SectionTitle>{t('featuresPage.core.title')}</SectionTitle>
            <SectionText>{t('featuresPage.core.subtitle')}</SectionText>
          </SectionHeader>

          <ProgramGrid>
            <ProgramCard data-reveal style={{ '--reveal-delay': '60ms' }}>
              <div className="tag">{t('featuresPage.core.0.tag')}</div>
              <h3>{t('featuresPage.core.0.title')}</h3>
              <p>{t('featuresPage.core.0.desc')}</p>
              <BulletList>
                <BulletItem>
                  <BadgeCheck size={16} /> {t('featuresPage.core.0.bullets.0')}
                </BulletItem>
                <BulletItem>
                  <BadgeCheck size={16} /> {t('featuresPage.core.0.bullets.1')}
                </BulletItem>
                <BulletItem>
                  <BadgeCheck size={16} /> {t('featuresPage.core.0.bullets.2')}
                </BulletItem>
              </BulletList>
            </ProgramCard>

            <ProgramCard data-reveal style={{ '--reveal-delay': '140ms' }}>
              <div className="tag">{t('featuresPage.core.1.tag')}</div>
              <h3>{t('featuresPage.core.1.title')}</h3>
              <p>{t('featuresPage.core.1.desc')}</p>
              <BulletList>
                <BulletItem>
                  <BadgeCheck size={16} /> {t('featuresPage.core.1.bullets.0')}
                </BulletItem>
                <BulletItem>
                  <BadgeCheck size={16} /> {t('featuresPage.core.1.bullets.1')}
                </BulletItem>
                <BulletItem>
                  <BadgeCheck size={16} /> {t('featuresPage.core.1.bullets.2')}
                </BulletItem>
              </BulletList>
            </ProgramCard>

            <ProgramCard data-reveal style={{ '--reveal-delay': '220ms' }}>
              <div className="tag">{t('featuresPage.core.2.tag')}</div>
              <h3>{t('featuresPage.core.2.title')}</h3>
              <p>{t('featuresPage.core.2.desc')}</p>
              <BulletList>
                <BulletItem>
                  <BadgeCheck size={16} /> {t('featuresPage.core.2.bullets.0')}
                </BulletItem>
                <BulletItem>
                  <BadgeCheck size={16} /> {t('featuresPage.core.2.bullets.1')}
                </BulletItem>
                <BulletItem>
                  <BadgeCheck size={16} /> {t('featuresPage.core.2.bullets.2')}
                </BulletItem>
              </BulletList>
            </ProgramCard>
          </ProgramGrid>
        </Section>

        {/* ── Collaboration tools ── */}
        <Section data-reveal>
          <SectionHeader>
            <SectionTitle>{t('featuresPage.tools.title')}</SectionTitle>
            <SectionText>{t('featuresPage.tools.subtitle')}</SectionText>
          </SectionHeader>

          <BenefitsGrid>
            <BenefitCard data-reveal style={{ '--reveal-delay': '60ms' }}>
              <IconBox>
                <Users size={24} />
              </IconBox>
              <h3>{t('featuresPage.tools.0.title')}</h3>
              <p>{t('featuresPage.tools.0.desc')}</p>
            </BenefitCard>

            <BenefitCard data-reveal style={{ '--reveal-delay': '140ms' }}>
              <IconBox>
                <Smartphone size={24} />
              </IconBox>
              <h3>{t('featuresPage.tools.1.title')}</h3>
              <p>{t('featuresPage.tools.1.desc')}</p>
            </BenefitCard>

            <BenefitCard data-reveal style={{ '--reveal-delay': '220ms' }}>
              <IconBox>
                <Lock size={24} />
              </IconBox>
              <h3>{t('featuresPage.tools.2.title')}</h3>
              <p>{t('featuresPage.tools.2.desc')}</p>
            </BenefitCard>
          </BenefitsGrid>
        </Section>

        {/* ── How to get started ── */}
        <Section data-reveal>
          <SectionHeader>
            <SectionTitle>{t('featuresPage.howto.title')}</SectionTitle>
            <SectionText>{t('featuresPage.howto.subtitle')}</SectionText>
          </SectionHeader>

          <Timeline>
            <TimelineItem data-reveal style={{ '--reveal-delay': '40ms' }}>
              <TimelineStep>01</TimelineStep>
              <TimelineContent>
                <h3>{t('featuresPage.howto.0.title')}</h3>
                <p>{t('featuresPage.howto.0.desc')}</p>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem data-reveal style={{ '--reveal-delay': '120ms' }}>
              <TimelineStep>02</TimelineStep>
              <TimelineContent>
                <h3>{t('featuresPage.howto.1.title')}</h3>
                <p>{t('featuresPage.howto.1.desc')}</p>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem data-reveal style={{ '--reveal-delay': '200ms' }}>
              <TimelineStep>03</TimelineStep>
              <TimelineContent>
                <h3>{t('featuresPage.howto.2.title')}</h3>
                <p>{t('featuresPage.howto.2.desc')}</p>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Section>

        {/* ── Use cases ── */}
        <Section data-reveal>
          <SectionHeader>
            <SectionTitle>{t('featuresPage.usecases.title')}</SectionTitle>
            <SectionText>{t('featuresPage.usecases.subtitle')}</SectionText>
          </SectionHeader>

          <BenefitsGrid>
            <BenefitCard data-reveal style={{ '--reveal-delay': '60ms' }}>
              <IconBox>
                <Building2 size={24} />
              </IconBox>
              <h3>{t('featuresPage.usecases.0.title')}</h3>
              <p>{t('featuresPage.usecases.0.desc')}</p>
            </BenefitCard>

            <BenefitCard data-reveal style={{ '--reveal-delay': '140ms' }}>
              <IconBox>
                <BookOpen size={24} />
              </IconBox>
              <h3>{t('featuresPage.usecases.1.title')}</h3>
              <p>{t('featuresPage.usecases.1.desc')}</p>
            </BenefitCard>

            <BenefitCard data-reveal style={{ '--reveal-delay': '220ms' }}>
              <IconBox>
                <CalendarClock size={24} />
              </IconBox>
              <h3>{t('featuresPage.usecases.2.title')}</h3>
              <p>{t('featuresPage.usecases.2.desc')}</p>
            </BenefitCard>
          </BenefitsGrid>
        </Section>

        {/* ── CTA ── */}
        <RevealBlock data-reveal style={{ '--reveal-delay': '80ms' }}>
          <CallToAction
            title={t('featuresPage.cta.title')}
            description={t('featuresPage.cta.description')}
            buttonText={t('featuresPage.cta.button')}
            buttonLink="/signup"
          />
        </RevealBlock>
      </MainContent>
      <FooterClean />
    </PageContainer>
  );
};

export default FeaturesPage;
