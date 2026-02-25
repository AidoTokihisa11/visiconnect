import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Video, 
  CreditCard, 
  Shield, 
  Check, 
  ArrowLeft, 
  Lock, 
  Users, 
  Crown, 
  Zap,
  AlertCircle,
  Gift
} from 'lucide-react';

const Container = styled.div`
  min-height: 100vh;
  background: var(--bg-primary, #ffffff);
  color: var(--text-primary, #1e293b);
  overflow-x: hidden;
`;

const Header = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
`;

const NavLogo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 800;
  text-decoration: none;
  color: var(--text-primary, #1e293b);
  
  .logo-icon {
    width: 40px;
    height: 40px;
    background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 10px rgba(37, 99, 235, 0.3);
  }
  
  .logo-text {
    background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const BackButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  color: var(--text-primary, #1e293b);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--accent-cyan, #06b6d4);
    color: var(--accent-cyan, #06b6d4);
    transform: translateX(-2px);
  }
`;

const MainContent = styled.main`
  padding: 8rem 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 3rem;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const CheckoutForm = styled(motion.div)`
  background: var(--bg-card, rgba(255, 255, 255, 0.95));
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  padding: 3rem;
  box-shadow: var(--shadow-lg, 0 8px 25px rgba(0, 0, 0, 0.1));
`;

const FormTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
`;

const FormSubtitle = styled.p`
  color: var(--text-secondary, #475569);
  font-size: 1.1rem;
  margin-bottom: 3rem;
  line-height: 1.5;
`;

const Section = styled.div`
  margin-bottom: 3rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-primary, #1e293b);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: var(--text-primary, #1e293b);
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  font-size: 1rem;
  background: var(--bg-primary, #ffffff);
  color: var(--text-primary, #1e293b);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--accent-cyan, #06b6d4);
    box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
  }

  &::placeholder {
    color: var(--text-secondary, #475569);
  }
`;

const InputGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SecurityFeatures = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(37, 99, 235, 0.05);
  border: 1px solid rgba(37, 99, 235, 0.2);
  border-radius: 12px;
  margin-top: 1rem;
`;

const SecurityText = styled.div`
  color: var(--text-secondary, #475569);
  font-size: 0.9rem;
  font-weight: 500;
`;

const OrderSummary = styled(motion.div)`
  background: var(--bg-card, rgba(255, 255, 255, 0.95));
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: var(--shadow-lg, 0 8px 25px rgba(0, 0, 0, 0.1));
  position: sticky;
  top: 8rem;
`;

const SummaryTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary, #1e293b);
  margin-bottom: 2rem;
`;

const PlanCard = styled.div`
  padding: 1.5rem;
  background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
  border-radius: 16px;
  margin-bottom: 2rem;
  color: white;
`;

const PlanName = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PlanPrice = styled.div`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
`;

const PlanBilling = styled.div`
  font-size: 0.9rem;
  opacity: 0.9;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
`;

const Feature = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  color: white;
  font-weight: 500;

  svg {
    color: rgba(255, 255, 255, 0.9);
  }
`;

const PricingDetails = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 1.5rem;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  color: var(--text-primary, #1e293b);
`;

const DiscountRow = styled(PriceRow)`
  color: var(--accent-cyan, #06b6d4);
  font-weight: 600;
`;

const TotalRow = styled(PriceRow)`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
  padding-top: 1rem;
  font-size: 1.1rem;
  font-weight: 700;
`;

const CheckoutButton = styled(motion.button)`
  width: 100%;
  padding: 1.25rem 2rem;
  background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  margin-top: 2rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  transition: all 0.3s ease;
`;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    city: '',
    zipCode: '',
    country: ''
  });

  // Récupération du plan depuis l'URL
  const selectedPlan = searchParams.get('plan') || 'starter';
  
  const plans = {
    starter: {
      name: 'Plan Starter',
      icon: <Users size={20} />,
      price: '29',
      billing: 'par mois',
      features: [
        'Jusqu\'à 10 participants',
        'Réunions illimitées',
        'Partage d\'écran',
        'Chat intégré',
        'Enregistrement (1h/mois)'
      ]
    },
    professional: {
      name: 'Plan Professional',
      icon: <Crown size={20} />,
      price: '79',
      billing: 'par mois',
      features: [
        'Jusqu\'à 100 participants',
        'Réunions illimitées',
        'Partage d\'écran avancé',
        'Chat & fichiers',
        'Enregistrement illimité',
        'Intégrations',
        'Support prioritaire'
      ]
    },
    enterprise: {
      name: 'Plan Enterprise',
      icon: <Zap size={20} />,
      price: '149',
      billing: 'par mois',
      features: [
        'Participants illimités',
        'Toutes les fonctionnalités',
        'API personnalisée',
        'SSO et sécurité avancée',
        'Support dédié',
        'Formation personnalisée',
        'SLA garanti'
      ]
    }
  };

  const currentPlan = plans[selectedPlan] || plans.starter;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Checkout submitted:', formData);
    // Logique de traitement du paiement
  };

  return (
    <Container>
      <Header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Nav>
          <NavLogo
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
              <div className="logo-icon">
                <Video size={24} color="white" />
              </div>
              <div className="logo-text">VisiConnect</div>
            </Link>
          </NavLogo>

          <BackButton
            onClick={() => navigate('/pricing')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={18} />
            Retour aux tarifs
          </BackButton>
        </Nav>
      </Header>

      <MainContent>
        <CheckoutGrid>
          <CheckoutForm
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FormTitle>Finaliser votre commande</FormTitle>
            <FormSubtitle>
              Sécurisez votre accès à VisiConnect et transformez vos réunions en ligne.
            </FormSubtitle>

            <form onSubmit={handleSubmit}>
              <Section>
                <SectionTitle>
                  <Lock size={20} />
                  Informations de contact
                </SectionTitle>
                
                <FormGroup>
                  <Label htmlFor="email">Adresse email *</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="fullName">Nom complet *</Label>
                  <Input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Votre nom et prénom"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
              </Section>

              <Section>
                <SectionTitle>
                  <CreditCard size={20} />
                  Informations de paiement
                </SectionTitle>
                
                <FormGroup>
                  <Label htmlFor="cardNumber">Numéro de carte *</Label>
                  <Input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>

                <InputGrid>
                  <FormGroup>
                    <Label htmlFor="expiryDate">Date d'expiration *</Label>
                    <Input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="cvv">CVV *</Label>
                    <Input
                      type="text"
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </InputGrid>

                <SecurityFeatures>
                  <Shield size={20} color="var(--accent-cyan, #06b6d4)" />
                  <SecurityText>
                    Vos informations de paiement sont sécurisées avec un chiffrement SSL 256 bits.
                  </SecurityText>
                </SecurityFeatures>
              </Section>

              <Section>
                <SectionTitle>
                  <AlertCircle size={20} />
                  Adresse de facturation
                </SectionTitle>
                
                <FormGroup>
                  <Label htmlFor="billingAddress">Adresse *</Label>
                  <Input
                    type="text"
                    id="billingAddress"
                    name="billingAddress"
                    placeholder="123 Rue de la Paix"
                    value={formData.billingAddress}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>

                <InputGrid>
                  <FormGroup>
                    <Label htmlFor="city">Ville *</Label>
                    <Input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="Paris"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="zipCode">Code postal *</Label>
                    <Input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      placeholder="75001"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </InputGrid>
              </Section>
            </form>
          </CheckoutForm>

          <OrderSummary
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <SummaryTitle>Récapitulatif de commande</SummaryTitle>
            
            <PlanCard>
              <PlanName>
                {currentPlan.icon}
                {currentPlan.name}
              </PlanName>
              <PlanPrice>{currentPlan.price}€</PlanPrice>
              <PlanBilling>{currentPlan.billing}</PlanBilling>
              
              <FeaturesList>
                {currentPlan.features.map((feature, index) => (
                  <Feature key={index}>
                    <Check size={16} />
                    {feature}
                  </Feature>
                ))}
              </FeaturesList>
            </PlanCard>

            <PricingDetails>
              <PriceRow>
                <span>Sous-total</span>
                <span>{currentPlan.price}€</span>
              </PriceRow>
              <PriceRow>
                <span>TVA (20%)</span>
                <span>{(parseFloat(currentPlan.price) * 0.2).toFixed(2)}€</span>
              </PriceRow>
              <DiscountRow>
                <span>
                  <Gift size={16} style={{ marginRight: '0.5rem' }} />
                  Réduction premier mois (-50%)
                </span>
                <span>-{(parseFloat(currentPlan.price) / 2).toFixed(2)}€</span>
              </DiscountRow>
              <TotalRow>
                <span>Total</span>
                <span>{(parseFloat(currentPlan.price) * 1.2 - parseFloat(currentPlan.price) / 2).toFixed(2)}€</span>
              </TotalRow>
            </PricingDetails>

            <CheckoutButton
              type="submit"
              onClick={handleSubmit}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Lock size={20} />
              Finaliser la commande
            </CheckoutButton>
          </OrderSummary>
        </CheckoutGrid>
      </MainContent>
    </Container>
  );
};

export default CheckoutPage;