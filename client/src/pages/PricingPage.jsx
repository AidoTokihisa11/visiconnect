import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { apiFetch } from '../lib/apiClient';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';
import { useTranslation } from '../hooks/useTranslation';
import { useUser } from '@clerk/react';
import CallToAction from '../components/CallToAction';

const stripePromise = loadStripe(
  'pk_test_51T5EwZ8YZRxeQjiW412gOFLsaZ4fn6ArvMjf74OphD9WhovPuRDde4qOGwrpdwlnFQIt1apdfwnWNfjbt6n0CkkB00p9k8z1MO'
);

const COLORS = {
  primary: 'hsl(var(--primary))',
  secondary: 'hsl(var(--muted-foreground))',
  dark: 'hsl(var(--foreground))',
  text: 'hsl(var(--foreground))',
  lightText: 'hsl(var(--muted-foreground))',
  background: 'hsl(var(--background))',
  white: 'hsl(var(--card))',
  border: 'hsl(var(--border))',
  success: 'hsl(var(--primary))',
  warning: 'hsl(var(--destructive))',
  error: 'hsl(var(--destructive))',
};

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${COLORS.background};
  font-family:
    'Inter',
    system-ui,
    -apple-system,
    sans-serif;
  color: ${COLORS.text};
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
`;

const HeroSection = styled.div`
  background-color: hsl(var(--secondary));
  padding: 6rem 1.5rem 4rem;
  text-align: center;
  transition: background-color 0.3s ease;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  color: ${COLORS.dark};
  margin-bottom: 1.5rem;
  letter-spacing: -0.025em;

  span {
    color: ${COLORS.primary};
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: ${COLORS.lightText};
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.6;
`;

// --- PRICING CARDS ---
const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto 6rem;
  padding: 0 1.5rem;
  align-items: flex-start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    max-width: 500px;
  }
`;

const PlanCard = styled.div`
  background-color: ${COLORS.white};
  border: 1px solid ${(props) => (props.$featured ? COLORS.primary : COLORS.border)};
  border-radius: 20px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  position: relative;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  @media (max-width: 640px) {
    padding: 1.5rem;
  }

  ${(props) =>
    props.$featured &&
    css`
      box-shadow: 0 25px 50px -12px rgba(37, 99, 235, 0.25);
      transform: scale(1.05);
      z-index: 10;
      border-width: 2px;

      @media (max-width: 900px) {
        transform: none;
        z-index: 1;
      }
    `}

  &:hover {
    transform: ${(props) =>
      props.$featured ? 'scale(1.05) translateY(-5px)' : 'translateY(-5px)'};
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
  }
`;

const PopularBadge = styled.div`
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${COLORS.primary}; /* Solid primary */
  color: ${COLORS.white};
  font-size: 0.875rem;
  font-weight: 700;
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.4);
`;

const PlanTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 800;
  color: ${COLORS.dark};
  margin-bottom: 0.5rem;
`;

const PlanDescription = styled.p`
  color: ${COLORS.lightText};
  font-size: 0.95rem;
  margin-bottom: 2rem;
  min-height: 44px;
`;

const Price = styled.div`
  font-size: 3.5rem;
  font-weight: 800;
  color: ${COLORS.dark};
  margin-bottom: 2rem;
  display: flex;
  align-items: baseline;

  span.currency {
    font-size: 2rem;
    margin-right: 4px;
  }

  span.period {
    font-size: 1.125rem;
    font-weight: 500;
    color: ${COLORS.lightText};
    margin-left: 0.5rem;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2.5rem 0;
  flex: 1;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: ${COLORS.text};

  svg {
    color: ${COLORS.success};
    flex-shrink: 0;
    margin-top: 3px;
  }

  &.disabled {
    color: ${COLORS.lightText};
    text-decoration: line-through;
    opacity: 0.7;
    svg {
      color: ${COLORS.lightText};
    }
  }
`;

const PlanButton = styled(Link)`
  display: block;
  width: 100%;
  text-align: center;
  padding: 1rem;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;

  ${(props) =>
    props.variant === 'primary'
      ? css`
          background-color: ${COLORS.primary};
          color: ${COLORS.white};
          box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.3);
          &:hover {
            background-color: #1d4ed8;
            box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.4);
          }
        `
      : css`
          background-color: ${COLORS.white};
          color: ${COLORS.dark};
          border: 1px solid ${COLORS.border};
          &:hover {
            background-color: #f8fafc;
            border-color: #cbd5e1;
          }
        `}
`;

// --- COMPARISON TABLE ---
const ComparisonSection = styled.section`
  max-width: 1000px;
  margin: 0 auto 6rem;
  padding: 0 1.5rem;
`;

const TableTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  font-weight: 800;
  color: ${COLORS.dark};
  margin-bottom: 3rem;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  border-radius: 16px;
  border: 1px solid ${COLORS.border};
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${COLORS.white};

  th,
  td {
    padding: 1.25rem;
    text-align: center;
    border-bottom: 1px solid ${COLORS.border};
  }

  th:first-child,
  td:first-child {
    text-align: left;
    font-weight: 600;
    color: ${COLORS.dark};
    width: 30%;
    position: sticky;
    left: 0;
    background: ${COLORS.white};
  }

  th {
    background-color: #f8fafc;
    color: ${COLORS.secondary};
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover td {
    background-color: #f1f5f9;
  }
`;

// --- FAQ ---
const FAQSection = styled.section`
  padding: 0 1.5rem 6rem;
  max-width: 800px;
  margin: 0 auto;
`;

const FAQTitle = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  color: ${COLORS.dark};
  text-align: center;
  margin-bottom: 3rem;
`;

const FAQItem = styled.div`
  border-bottom: 1px solid ${COLORS.border};
  padding: 1.5rem 0;

  &:first-child {
    border-top: 1px solid ${COLORS.border};
  }
`;

const FAQQuestion = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  background: none;
  border: none;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${COLORS.dark};
  cursor: pointer;
  padding: 0;

  &:hover {
    color: ${COLORS.primary};
  }
`;

const FAQAnswer = styled.div`
  margin-top: 1rem;
  color: ${COLORS.lightText};
  line-height: 1.6;
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
  animation: slideDown 0.3s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// --- DATA ---
const FAQList = [
  {
    q: 'pricing.faq.q1.question',
    a: 'pricing.faq.q1.answer',
  },
  {
    q: 'pricing.faq.q2.question',
    a: 'pricing.faq.q2.answer',
  },
  {
    q: 'pricing.faq.q4.question',
    a: 'pricing.faq.q4.answer',
  },
];

const PricingPage = () => {
  const { t, language } = useTranslation();
  const { user } = useUser();

  const [openFAQ, setOpenFAQ] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleSubscribe = async (e, plan) => {
    e.preventDefault();
    const billingCycle = 'monthly';

    try {
      const apiUrl = '/api/create-checkout-session';

      const response = await apiFetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan,
          billingCycle,
          userId: user?.id || '',
          userEmail: user?.primaryEmailAddress?.emailAddress || '',
          locale: language || (typeof navigator !== 'undefined' ? navigator.language : 'en'),
        }),
      });

      const session = await response.json();

      if (session.error) {
        alert(session.error);
        return;
      }

      // Free plan: no Stripe redirect
      if (session.free) {
        window.location.href = '/';
        return;
      }

      // Redirection native vers l'URL fournie par Stripe
      if (session.url) {
        window.location.href = session.url;
      } else {
        throw new Error('Aucune URL de redirection retournée par Stripe');
      }
    } catch (err) {
      console.error('Payment error:', err);
      alert("Erreur lors de l'initialisation du paiement. Vérifiez que le serveur est démarré.");
    }
  };

  return (
    <PageContainer>
      <HeaderClean />

      <HeroSection>
        <HeroTitle>
          Investissez dans <span>Votre Collaboration</span>
        </HeroTitle>
        <HeroSubtitle>
          Des tarifications transparentes. Aucun frais caché. Annulez à tout moment.
        </HeroSubtitle>
      </HeroSection>

      <PricingGrid>
        {/* FREE */}
        <PlanCard>
          <PlanTitle>Starter</PlanTitle>
          <PlanDescription>
            {t(
              'pricing.plans.starter.description',
              'Pour découvrir la plateforme sans engagement.'
            )}
          </PlanDescription>
          <Price>
            <span className="currency">€</span>0
            <span className="period">{t('pricing.plans.free.period')}</span>
          </Price>
          <FeatureList>
            <FeatureItem>
              <Check size={18} /> {t('billing.features.starter.0', "Jusqu'à 3 participants")}
            </FeatureItem>
            <FeatureItem>
              <Check size={18} /> {t('billing.features.starter.1', '45 min par réunion')}
            </FeatureItem>
            <FeatureItem>
              <Check size={18} /> {t('pricing.features.screenShare', "Partage d'écran")}
            </FeatureItem>
            <FeatureItem className="disabled">
              <X size={18} /> {t('pricing.features.recording', 'Enregistrement')}
            </FeatureItem>
            <FeatureItem className="disabled">
              <X size={18} /> {t('pricing.features.aiTranscription', 'Transcriptions IA')}
            </FeatureItem>
          </FeatureList>
          <PlanButton to="#" className="outline" onClick={(e) => handleSubscribe(e, 'starter')}>
            {t('pricing.plans.starter.cta', 'Commencer Gratuit')}
          </PlanButton>
        </PlanCard>

        {/* PRO */}
        <PlanCard $featured>
          <PopularBadge>{t('pricing.recommended', 'RECOMMANDÉ')}</PopularBadge>
          <PlanTitle>Pro</PlanTitle>
          <PlanDescription>
            {t('pricing.plans.pro.description', 'Pour les équipes agiles et les freelances.')}
          </PlanDescription>
          <Price>
            <span className="currency">€</span>15
            <span className="period">{t('pricing.perMonthPerUser', '/mois par utilisateur')}</span>
          </Price>
          <FeatureList>
            <FeatureItem>
              <Check size={18} /> {t('pricing.features.upTo50', "Jusqu'à 50 participants")}
            </FeatureItem>
            <FeatureItem>
              <Check size={18} /> {t('pricing.features.unlimitedDuration', 'Durée illimitée')}
            </FeatureItem>
            <FeatureItem>
              <Check size={18} /> {t('pricing.features.cloud5gb', '5 Go de stockage Cloud')}
            </FeatureItem>
            <FeatureItem>
              <Check size={18} /> {t('pricing.features.prioritySupport', 'Support Prioritaire')}
            </FeatureItem>
            <FeatureItem>
              <Check size={18} />{' '}
              {t('pricing.features.aiTranscription10h', 'Transcriptions IA (10h/mois)')}
            </FeatureItem>
          </FeatureList>
          <PlanButton to="#" variant="primary" onClick={(e) => handleSubscribe(e, 'pro')}>
            {t('pricing.subscribe', "S'abonner")}
          </PlanButton>
        </PlanCard>

        {/* BUSINESS */}
        <PlanCard>
          <PlanTitle>Business</PlanTitle>
          <PlanDescription>
            {t('pricing.plans.business.description', 'Pour les organisations à grande échelle.')}
          </PlanDescription>
          <Price>
            <span className="currency">€</span>35
            <span className="period">{t('pricing.perMonthPerUser', '/mois par utilisateur')}</span>
          </Price>
          <FeatureList>
            <FeatureItem>
              <Check size={18} /> {t('pricing.features.upTo200', "Jusqu'à 200 participants")}
            </FeatureItem>
            <FeatureItem>
              <Check size={18} /> {t('pricing.features.unlimitedStorage', 'Stockage illimité')}
            </FeatureItem>
            <FeatureItem>
              <Check size={18} /> {t('pricing.features.breakout_rooms')}
            </FeatureItem>
            <FeatureItem>
              <Check size={18} /> {t('pricing.features.ssoAdmin', 'SSO & Admin Avancé')}
            </FeatureItem>
            <FeatureItem>
              <Check size={18} />{' '}
              {t('pricing.features.unlimitedTranscriptions', 'Transcriptions Illimitées')}
            </FeatureItem>
          </FeatureList>
          <PlanButton to="#" className="outline" onClick={(e) => handleSubscribe(e, 'business')}>
            {t('pricing.subscribe', "S'abonner")}
          </PlanButton>
        </PlanCard>
      </PricingGrid>

      <ComparisonSection>
        <TableTitle>{t('pricing.compare.title')}</TableTitle>
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <th>{t('pricing.compare.feature')}</th>
                <th>{t('pricing.compare.starter')}</th>
                <th>{t('pricing.compare.pro')}</th>
                <th>{t('pricing.compare.business')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{t('pricing.compare.max_participants')}</td>
                <td>3</td>
                <td>50</td>
                <td>200</td>
              </tr>
              <tr>
                <td>{t('pricing.compare.duration')}</td>
                <td>45 min</td>
                <td>{t('pricing.compare.unlimited')}</td>
                <td>{t('pricing.compare.unlimited')}</td>
              </tr>
              <tr>
                <td>{t('pricing.compare.quality')}</td>
                <td>720p</td>
                <td>1080p</td>
                <td>4K ({t('pricing.compare.if_available')})</td>
              </tr>
              <tr>
                <td>{t('pricing.compare.support')}</td>
                <td>{t('pricing.compare.support_community')}</td>
                <td>Email (24h)</td>
                <td>{t('pricing.compare.support_phone')}</td>
              </tr>
              <tr>
                <td>{t('pricing.compare.recording')}</td>
                <td>-</td>
                <td>5 Go</td>
                <td>{t('pricing.compare.unlimited')}</td>
              </tr>
              <tr>
                <td>{t('pricing.compare.transcription')}</td>
                <td>-</td>
                <td>10 {t('pricing.compare.hours')}</td>
                <td>{t('pricing.compare.unlimited')}</td>
              </tr>
              <tr>
                <td>SSO (Single Sign-On)</td>
                <td>-</td>
                <td>-</td>
                <td>{t('pricing.compare.included')}</td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>
      </ComparisonSection>

      <FAQSection>
        <FAQTitle>{t('pricing.faq.title')}</FAQTitle>
        {FAQList.map((item, index) => (
          <FAQItem key={index}>
            <FAQQuestion onClick={() => toggleFAQ(index)}>
              {t(item.q)}
              {openFAQ === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </FAQQuestion>
            <FAQAnswer $isOpen={openFAQ === index}>{t(item.a)}</FAQAnswer>
          </FAQItem>
        ))}
      </FAQSection>

      <CallToAction
        title={t('pricing.cta.title')}
        description={t('pricing.cta.description')}
        buttonText={t('pricing.cta.button')}
        buttonLink="/contact"
      />

      <FooterClean />
    </PageContainer>
  );
};

export default PricingPage;
