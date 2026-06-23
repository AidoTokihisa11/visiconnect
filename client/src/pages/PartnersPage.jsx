import React, { useEffect } from 'react';
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
} from './PartnersPage.styles';

const PartnersPage = () => {
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
                <Handshake size={16} /> {t('partners.hero.title')}
              </Eyebrow>
              <HeroTitle>{t('partners.hero.subtitle')}</HeroTitle>
              <HeroSubtitle>{t('partners.hero.desc')}</HeroSubtitle>
              <HeroActions>
                <PrimaryButton href="/contact">
                  {t('partners.hero.ctaTeam')} <ArrowRight size={18} />
                </PrimaryButton>
                <SecondaryButton href="/features">
                  {t('partners.hero.ctaPlatform')} <Layers3 size={18} />
                </SecondaryButton>
              </HeroActions>
            </HeroContent>

            <HeroPanel>
              <PanelHeader>
                <PanelTitle>{t('partners.overview.title')}</PanelTitle>
                <BadgeCheck size={18} color={COLORS.primary} />
              </PanelHeader>
              <PanelGrid>
                <PanelMetric>
                  <div className="label">{t('partners.overview.model')}</div>
                  <div className="value">{t('partners.overview.modelValue')}</div>
                </PanelMetric>
                <PanelMetric>
                  <div className="label">{t('partners.overview.support')}</div>
                  <div className="value">{t('partners.overview.supportValue')}</div>
                </PanelMetric>
                <PanelMetric>
                  <div className="label">{t('partners.overview.activation')}</div>
                  <div className="value">{t('partners.overview.activationValue')}</div>
                </PanelMetric>
                <PanelMetric>
                  <div className="label">{t('partners.overview.positioning')}</div>
                  <div className="value">{t('partners.overview.positioningValue')}</div>
                </PanelMetric>
              </PanelGrid>
            </HeroPanel>
          </HeroContainer>
        </HeroSection>

        <ProofBand>
          <ProofGrid>
            <ProofCard data-reveal style={{ '--reveal-delay': '0ms' }}>
              <div className="value">{t('partners.props.0.label')}</div>
              <div className="label">{t('partners.props.0.desc')}</div>
            </ProofCard>
            <ProofCard data-reveal style={{ '--reveal-delay': '80ms' }}>
              <div className="value">{t('partners.props.1.label')}</div>
              <div className="label">{t('partners.props.1.desc')}</div>
            </ProofCard>
            <ProofCard data-reveal style={{ '--reveal-delay': '160ms' }}>
              <div className="value">{t('partners.props.2.label')}</div>
              <div className="label">{t('partners.props.2.desc')}</div>
            </ProofCard>
            <ProofCard data-reveal style={{ '--reveal-delay': '240ms' }}>
              <div className="value">{t('partners.props.3.label')}</div>
              <div className="label">{t('partners.props.3.desc')}</div>
            </ProofCard>
          </ProofGrid>
        </ProofBand>

        <Section data-reveal>
          <SectionHeader>
            <SectionTitle>{t('partners.why.title')}</SectionTitle>
            <SectionText>{t('partners.why.subtitle')}</SectionText>
          </SectionHeader>

          <BenefitsGrid>
            <BenefitCard data-reveal style={{ '--reveal-delay': '60ms' }}>
              <IconBox>
                <LineChart size={24} />
              </IconBox>
              <h3>{t('partners.why.reasons.0.title')}</h3>
              <p>{t('partners.why.reasons.0.desc')}</p>
            </BenefitCard>

            <BenefitCard data-reveal style={{ '--reveal-delay': '140ms' }}>
              <IconBox>
                <ShieldCheck size={24} />
              </IconBox>
              <h3>{t('partners.why.reasons.1.title')}</h3>
              <p>{t('partners.why.reasons.1.desc')}</p>
            </BenefitCard>

            <BenefitCard data-reveal style={{ '--reveal-delay': '220ms' }}>
              <IconBox>
                <Users size={24} />
              </IconBox>
              <h3>{t('partners.why.reasons.2.title')}</h3>
              <p>{t('partners.why.reasons.2.desc')}</p>
            </BenefitCard>
          </BenefitsGrid>
        </Section>

        <Section data-reveal>
          <SectionHeader>
            <SectionTitle>{t('partners.formats.title')}</SectionTitle>
            <SectionText>{t('partners.formats.subtitle')}</SectionText>
          </SectionHeader>

          <ProgramGrid>
            <ProgramCard data-reveal style={{ '--reveal-delay': '60ms' }}>
              <div className="tag">{t('partners.formats.0.type')}</div>
              <h3>{t('partners.formats.0.title')}</h3>
              <p>{t('partners.formats.0.desc')}</p>
              <BulletList>
                <BulletItem>
                  <BadgeCheck size={16} /> {t('partners.formats.0.bullets.0')}
                </BulletItem>
                <BulletItem>
                  <BadgeCheck size={16} /> {t('partners.formats.0.bullets.1')}
                </BulletItem>
                <BulletItem>
                  <BadgeCheck size={16} /> {t('partners.formats.0.bullets.2')}
                </BulletItem>
              </BulletList>
            </ProgramCard>

            <ProgramCard data-reveal style={{ '--reveal-delay': '140ms' }}>
              <div className="tag">{t('partners.formats.1.type')}</div>
              <h3>{t('partners.formats.1.title')}</h3>
              <p>{t('partners.formats.1.desc')}</p>
              <BulletList>
                <BulletItem>
                  <BadgeCheck size={16} /> {t('partners.formats.1.bullets.0')}
                </BulletItem>
                <BulletItem>
                  <BadgeCheck size={16} /> {t('partners.formats.1.bullets.1')}
                </BulletItem>
                <BulletItem>
                  <BadgeCheck size={16} /> {t('partners.formats.1.bullets.2')}
                </BulletItem>
              </BulletList>
            </ProgramCard>

            <ProgramCard data-reveal style={{ '--reveal-delay': '220ms' }}>
              <div className="tag">{t('partners.formats.2.type')}</div>
              <h3>{t('partners.formats.2.title')}</h3>
              <p>{t('partners.formats.2.desc')}</p>
              <BulletList>
                <BulletItem>
                  <BadgeCheck size={16} /> {t('partners.formats.2.bullets.0')}
                </BulletItem>
                <BulletItem>
                  <BadgeCheck size={16} /> {t('partners.formats.2.bullets.1')}
                </BulletItem>
                <BulletItem>
                  <BadgeCheck size={16} /> {t('partners.formats.2.bullets.2')}
                </BulletItem>
              </BulletList>
            </ProgramCard>
          </ProgramGrid>
        </Section>

        <Section data-reveal>
          <SectionHeader>
            <SectionTitle>{t('partners.collab.title')}</SectionTitle>
            <SectionText>{t('partners.collab.subtitle')}</SectionText>
          </SectionHeader>

          <Timeline>
            <TimelineItem data-reveal style={{ '--reveal-delay': '40ms' }}>
              <TimelineStep>01</TimelineStep>
              <TimelineContent>
                <h3>{t('partners.collab.steps.0.title')}</h3>
                <p>{t('partners.collab.steps.0.desc')}</p>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem data-reveal style={{ '--reveal-delay': '120ms' }}>
              <TimelineStep>02</TimelineStep>
              <TimelineContent>
                <h3>{t('partners.collab.steps.1.title')}</h3>
                <p>{t('partners.collab.steps.1.desc')}</p>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem data-reveal style={{ '--reveal-delay': '200ms' }}>
              <TimelineStep>03</TimelineStep>
              <TimelineContent>
                <h3>{t('partners.collab.steps.2.title')}</h3>
                <p>{t('partners.collab.steps.2.desc')}</p>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Section>

        <Section data-reveal>
          <SectionHeader>
            <SectionTitle>{t('partners.profiles.title')}</SectionTitle>
            <SectionText>{t('partners.profiles.subtitle')}</SectionText>
          </SectionHeader>

          <BenefitsGrid>
            <BenefitCard data-reveal style={{ '--reveal-delay': '60ms' }}>
              <IconBox>
                <Building2 size={24} />
              </IconBox>
              <h3>{t('partners.profiles.items.0.title')}</h3>
              <p>{t('partners.profiles.items.0.desc')}</p>
            </BenefitCard>

            <BenefitCard data-reveal style={{ '--reveal-delay': '140ms' }}>
              <IconBox>
                <Briefcase size={24} />
              </IconBox>
              <h3>{t('partners.profiles.items.1.title')}</h3>
              <p>{t('partners.profiles.items.1.desc')}</p>
            </BenefitCard>

            <BenefitCard data-reveal style={{ '--reveal-delay': '220ms' }}>
              <IconBox>
                <Handshake size={24} />
              </IconBox>
              <h3>{t('partners.profiles.items.2.title')}</h3>
              <p>{t('partners.profiles.items.2.desc')}</p>
            </BenefitCard>
          </BenefitsGrid>
        </Section>

        <RevealBlock data-reveal style={{ '--reveal-delay': '80ms' }}>
          <CallToAction
            title={t('partners.cta.title')}
            description={t('partners.cta.description')}
            buttonText={t('partners.cta.button')}
            buttonLink="/contact"
          />
        </RevealBlock>
      </MainContent>
      <FooterClean />
    </PageContainer>
  );
};

export default PartnersPage;
