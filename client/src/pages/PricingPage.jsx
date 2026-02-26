import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Check, X, ChevronDown, ChevronUp, Star, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';
import CallToAction from '../components/CallToAction';

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
  error: 'hsl(var(--destructive))'
};

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${COLORS.background};
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: ${COLORS.text};
  transition: background-color 0.3s ease, color 0.3s ease;
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

// --- BILLING TOGGLE ---
const BillingToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 4rem;
`;

const ToggleLabel = styled.span`
  font-weight: 600;
  color: ${props => props.active ? COLORS.dark : COLORS.lightText};
  cursor: pointer;
  transition: color 0.2s;
`;

const ToggleSwitch = styled.div`
  width: 56px;
  height: 32px;
  background-color: ${COLORS.primary};
  border-radius: 9999px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s;

  &::after {
    content: '';
    position: absolute;
    top: 4px;
    left: ${props => props.isAnnual ? '28px' : '4px'};
    width: 24px;
    height: 24px;
    background-color: white;
    border-radius: 50%;
    transition: left 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
`;

const DiscountBadge = styled.span`
  background-color: #dbeafe;
  color: ${COLORS.primary};
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  text-transform: uppercase;
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
  border: 1px solid ${props => props.featured ? COLORS.primary : COLORS.border};
  border-radius: 20px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  ${props => props.featured && css`
    box-shadow: 0 25px 50px -12px rgba(37, 99, 235, 0.25);
    transform: scale(1.05);
    z-index: 10;
    border-width: 2px;

    @media (max-width: 900px) {
      transform: none;
    }
  `}

  &:hover {
    transform: ${props => props.featured ? 'scale(1.05) translateY(-5px)' : 'translateY(-5px)'};
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
  
  ${props => props.variant === 'primary' ? css`
    background-color: ${COLORS.primary};
    color: ${COLORS.white};
    box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.3);
    &:hover {
      background-color: #1d4ed8;
      box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.4);
    }
  ` : css`
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
  
  th, td {
    padding: 1.25rem;
    text-align: center;
    border-bottom: 1px solid ${COLORS.border};
  }

  th:first-child, td:first-child {
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
  display: ${props => props.isOpen ? 'block' : 'none'};
  animation: slideDown 0.3s ease-out;

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

// --- DATA ---
const FAQList = [
  {
    q: "Puis-je changer de forfait à tout moment ?",
    a: "Oui, vous pouvez passer à un forfait supérieur ou inférieur à tout moment. Les modifications prennent effet immédiatement ou à la fin de votre cycle de facturation actuel."
  },
  {
    q: "Y a-t-il une période d'essai gratuite ?",
    a: "Absolument. Tous nos plans payants incluent une période d'essai de 14 jours, sans carte bancaire requise."
  },
  {
    q: "Quels modes de paiement acceptez-vous ?",
    a: "Nous acceptons toutes les principales cartes de crédit (Visa, Mastercard, Amex) ainsi que PayPal pour les abonnements annuels."
  }
];

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFAQ, setOpenFAQ] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <PageContainer>
      <HeaderClean />

      <HeroSection>
        <HeroTitle>Investissez dans <span>Votre Collaboration</span></HeroTitle>
        <HeroSubtitle>
          Des tarifications transparentes. Aucun frais caché. Annulez à tout moment.
        </HeroSubtitle>

        <BillingToggleContainer>
          <ToggleLabel onClick={() => setIsAnnual(false)} active={!isAnnual}>Mensuel</ToggleLabel>
          <ToggleSwitch isAnnual={isAnnual} onClick={() => setIsAnnual(!isAnnual)} />
          <ToggleLabel onClick={() => setIsAnnual(true)} active={isAnnual}>Annuel</ToggleLabel>
          <DiscountBadge>-20%</DiscountBadge>
        </BillingToggleContainer>
      </HeroSection>

      <PricingGrid>
        {/* FREE */}
        <PlanCard>
          <PlanTitle>Starter</PlanTitle>
          <PlanDescription>Pour découvrir la plateforme sans engagement.</PlanDescription>
          <Price>
            <span className="currency">€</span>0
            <span className="period">/mois</span>
          </Price>
          <FeatureList>
            <FeatureItem><Check size={18} /> Jusqu'à 3 participants</FeatureItem>
            <FeatureItem><Check size={18} /> 45 min par réunion</FeatureItem>
            <FeatureItem><Check size={18} /> Partage d'écran</FeatureItem>
            <FeatureItem className="disabled"><X size={18} /> Enregistrement</FeatureItem>
            <FeatureItem className="disabled"><X size={18} /> Transcriptions IA</FeatureItem>
          </FeatureList>
          <PlanButton to="/signup" className="outline">Commencer Gratuit</PlanButton>
        </PlanCard>

        {/* PRO */}
        <PlanCard featured>
          <PopularBadge>RECOMMANDÉ</PopularBadge>
          <PlanTitle>Pro</PlanTitle>
          <PlanDescription>Pour les équipes agiles et les freelances.</PlanDescription>
          <Price>
            <span className="currency">€</span>{isAnnual ? '12' : '15'}
            <span className="period">/mois par utilisateur</span>
          </Price>
          <FeatureList>
            <FeatureItem><Check size={18} /> Jusqu'à 50 participants</FeatureItem>
            <FeatureItem><Check size={18} /> Durée illimitée</FeatureItem>
            <FeatureItem><Check size={18} /> 5 Go de stockage Cloud</FeatureItem>
            <FeatureItem><Check size={18} /> Support Prioritaire</FeatureItem>
            <FeatureItem><Check size={18} /> Transcriptions IA (10h/mois)</FeatureItem>
          </FeatureList>
          <PlanButton to="/signup?plan=pro" variant="primary">Essayer Pro Gratuitement</PlanButton>
        </PlanCard>

        {/* BUSINESS */}
        <PlanCard>
          <PlanTitle>Business</PlanTitle>
          <PlanDescription>Pour les organisations à grande échelle.</PlanDescription>
          <Price>
            <span className="currency">€</span>{isAnnual ? '29' : '35'}
            <span className="period">/mois par utilisateur</span>
          </Price>
          <FeatureList>
            <FeatureItem><Check size={18} /> Jusqu'à 200 participants</FeatureItem>
            <FeatureItem><Check size={18} /> Stockage illimité</FeatureItem>
            <FeatureItem><Check size={18} /> Salles de sous-commission</FeatureItem>
            <FeatureItem><Check size={18} /> SSO & Admin Avancé</FeatureItem>
            <FeatureItem><Check size={18} /> Transcriptions Illimitées</FeatureItem>
          </FeatureList>
          <PlanButton to="/contact" className="outline">Contacter les Ventes</PlanButton>
        </PlanCard>
      </PricingGrid>

      <ComparisonSection>
        <TableTitle>Comparatif Détaillé</TableTitle>
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <th>Fonctionnalité</th>
                <th>Starter</th>
                <th>Pro</th>
                <th>Business</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Participants Max</td>
                <td>3</td>
                <td>50</td>
                <td>200</td>
              </tr>
              <tr>
                <td>Durée Limite</td>
                <td>45 min</td>
                <td>Illimitée</td>
                <td>Illimitée</td>
              </tr>
              <tr>
                <td>Qualité Vidéo</td>
                <td>720p</td>
                <td>1080p</td>
                <td>4K (si dispo)</td>
              </tr>
              <tr>
                <td>Support</td>
                <td>Communauté</td>
                <td>Email (24h)</td>
                <td>Téléphone/Chat (1h)</td>
              </tr>
              <tr>
                <td>Enregistrement Cloud</td>
                <td>-</td>
                <td>5 Go</td>
                <td>Illimité</td>
              </tr>
              <tr>
                <td>Transcriptions IA</td>
                <td>-</td>
                <td>10 heures</td>
                <td>Illimitées</td>
              </tr>
              <tr>
                <td>SSO (Single Sign-On)</td>
                <td>-</td>
                <td>-</td>
                <td>Inclus</td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>
      </ComparisonSection>

      <FAQSection>
        <FAQTitle>Questions Fréquentes</FAQTitle>
        {FAQList.map((item, index) => (
          <FAQItem key={index}>
            <FAQQuestion onClick={() => toggleFAQ(index)}>
              {item.q}
              {openFAQ === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </FAQQuestion>
            <FAQAnswer isOpen={openFAQ === index}>
              {item.a}
            </FAQAnswer>
          </FAQItem>
        ))}
      </FAQSection>

      <CallToAction 
         title="Vous avez d'autres questions ?"
         description="Notre équipe commerciale est à votre disposition pour trouver l'offre qui correspond parfaitement à vos besoins."
         buttonText="Contacter les ventes"
         buttonLink="/contact"
      />

      <FooterClean />
    </PageContainer>
  );
};

export default PricingPage;