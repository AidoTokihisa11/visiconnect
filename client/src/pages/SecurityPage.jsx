import React from 'react';
import styled from 'styled-components';
import { useTranslation } from '../hooks/useTranslation';
import LegalLayout from '../components/LegalLayout';
import CallToAction from '../components/CallToAction';
import { Shield, Lock, Activity, Eye, FileCheck, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';

const Paragraph = styled.p`
  line-height: 1.8;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background: hsl(var(--card));
  padding: 24px;
  border-radius: 12px;
  border: 1px solid hsl(var(--border));
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const FeatureHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  color: hsl(var(--primary));
`;

const FeatureTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: hsl(var(--foreground));
`;

const FeatureText = styled.p`
  font-size: 0.95rem;
  color: hsl(var(--muted-foreground));
  line-height: 1.6;
`;

const BadgeGrid = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin-top: 24px;
  margin-bottom: 40px;
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
`;

const SecurityPage = () => {
  const { t } = useTranslation();

  return (
    <LegalLayout title={t('securityPageTitle')} lastUpdated="21 Février 2024">
      <SEO
        title="Sécurité"
        description="Comment VisioConnect protège vos données : chiffrement, hébergement UE et bonnes pratiques."
        path="/security"
      />
      <Paragraph>
        La sécurité est au cœur de l'architecture de VisioConnect. Nous utilisons les technologies
        les plus avancées pour garantir la confidentialité, l'intégrité et la disponibilité de vos
        données.
      </Paragraph>

      <Grid>
        <FeatureCard>
          <FeatureHeader>
            <Lock size={24} />
            <FeatureTitle>Chiffrement de bout en bout</FeatureTitle>
          </FeatureHeader>
          <FeatureText>
            Toutes vos communications vidéo et audio sont chiffrées de bout en bout utilisant le
            protocole WebRTC. Vos échanges restent privés et inaccessibles, même pour nous.
          </FeatureText>
        </FeatureCard>

        <FeatureCard>
          <FeatureHeader>
            <Shield size={24} />
            <FeatureTitle>Protection des données</FeatureTitle>
          </FeatureHeader>
          <FeatureText>
            Vos données personnelles sont stockées sur des serveurs sécurisés en Europe, conformes
            aux normes ISO 27001 et SOC 2.
          </FeatureText>
        </FeatureCard>

        <FeatureCard>
          <FeatureHeader>
            <Activity size={24} />
            <FeatureTitle>Surveillance 24/7</FeatureTitle>
          </FeatureHeader>
          <FeatureText>
            Notre équipe de sécurité surveille en permanence nos systèmes pour détecter et prévenir
            toute tentative d'intrusion ou activité suspecte.
          </FeatureText>
        </FeatureCard>

        <FeatureCard>
          <FeatureHeader>
            <Eye size={24} />
            <FeatureTitle>Transparence</FeatureTitle>
          </FeatureHeader>
          <FeatureText>
            Nous publions régulièrement des rapports de transparence et nous nous soumettons à des
            audits de sécurité indépendants.
          </FeatureText>
        </FeatureCard>
      </Grid>

      <SectionTitle>Conformité et Certifications</SectionTitle>
      <Paragraph>
        Nous nous engageons à respecter les normes internationales les plus strictes en matière de
        sécurité et de confidentialité.
      </Paragraph>

      <BadgeGrid>
        <Badge>
          <CheckCircle2 size={20} />
          RGPD Compliant
        </Badge>
        <Badge>
          <CheckCircle2 size={20} />
          ISO 27001
        </Badge>
        <Badge>
          <CheckCircle2 size={20} />
          SOC 2 Type II
        </Badge>
      </BadgeGrid>

      <SectionTitle>Signalement de vulnérabilités</SectionTitle>
      <Paragraph>
        Si vous découvrez une vulnérabilité de sécurité sur VisioConnect, nous vous encourageons à
        nous la signaler immédiatement. Nous avons un programme de Bug Bounty pour récompenser les
        chercheurs en sécurité.
      </Paragraph>

      <CallToAction
        title="Une question de sécurité ?"
        description="Notre équipe de sécurité est à votre écoute pour toute question technique."
        buttonText="Contacter la Sécurité"
        buttonLink="/contact"
      />
    </LegalLayout>
  );
};

export default SecurityPage;
