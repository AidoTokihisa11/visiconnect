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
