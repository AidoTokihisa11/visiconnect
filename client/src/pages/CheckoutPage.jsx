import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
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
  Gift,
  Clock
} from 'lucide-react';

const Container = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
  color: #333;
  overflow-x: hidden;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid #1a1a1a;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 800;
  color: #00ff88;
  cursor: pointer;
`;

const BackButton = styled.button`
  background: transparent;
  border: 2px solid #333;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 16px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    border-color: #00ff88;
    color: #00ff88;
  }
`;

const MainContent = styled.div`
  padding: 8rem 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const CheckoutForm = styled.div`
  background: #111;
  border: 1px solid #222;
  border-radius: 24px;
  padding: 3rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #00ff88, transparent);
  }
`;

const OrderSummary = styled.div`
  background: #111;
  border: 1px solid #222;
  border-radius: 24px;
  padding: 2rem;
  height: fit-content;
  position: sticky;
  top: 8rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FormSection = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #222;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  color: #ccc;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  border: 2px solid #222;
  border-radius: 16px;
  background: #0a0a0a;
  color: #333;
  font-size: 1rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: #555;
  }

  &:focus {
    outline: none;
    border-color: #00ff88;
    box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.1);
  }

  &.error {
    border-color: #ff4444;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem 1.5rem;
  border: 2px solid #222;
  border-radius: 16px;
  background: #0a0a0a;
  color: #333;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00ff88;
    box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.1);
  }

  option {
    background: #0a0a0a;
    color: #333;
  }
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PaymentMethod = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const PaymentOption = styled.button`
  padding: 1rem;
  border: 2px solid ${props => props.active ? '#00ff88' : '#222'};
  border-radius: 16px;
  background: ${props => props.active ? 'rgba(0, 255, 136, 0.1)' : '#0a0a0a'};
  color: ${props => props.active ? '#00ff88' : '#ccc'};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;

  &:hover {
    border-color: #00ff88;
    color: #00ff88;
  }
`;

const SecurityBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid #00ff88;
  border-radius: 12px;
  color: #00ff88;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 1.25rem 2rem;
  background: #00ff88;
  color: #0a0a0a;
  border: none;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;

  &:hover {
    background: #00e67a;
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 255, 136, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
`;

const PlanCard = styled.div`
  background: #0a0a0a;
  border: 2px solid ${props => props.plan === 'pro' ? '#00ff88' : props.plan === 'enterprise' ? '#4ecdc4' : '#333'};
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  position: relative;

  ${props => props.plan === 'pro' && `
    &::before {
      content: 'PLUS POPULAIRE';
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: #00ff88;
      color: #0a0a0a;
      padding: 0.25rem 1rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 700;
    }
  `}
`;

const PlanHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const PlanName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PlanPrice = styled.div`
  text-align: right;
`;

const Price = styled.div`
  font-size: 2rem;
  font-weight: 900;
  color: #00ff88;
`;

const PriceNote = styled.div`
  font-size: 0.8rem;
  color: #888;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
`;

const Feature = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: #ccc;
  font-size: 0.9rem;
`;

const OrderTotal = styled.div`
  border-top: 2px solid #222;
  padding-top: 1.5rem;
  margin-top: 1.5rem;
`;

const OrderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  color: #ccc;

  &.total {
    font-size: 1.2rem;
    font-weight: 700;
    color: #333;
    border-top: 1px solid #333;
    padding-top: 0.75rem;
    margin-top: 0.75rem;
  }

  &.discount {
    color: #00ff88;
  }
`;

const PromoCode = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const PromoInput = styled(Input)`
  flex: 1;
`;

const PromoButton = styled.button`
  padding: 1rem 1.5rem;
  background: transparent;
  border: 2px solid #333;
  border-radius: 16px;
  color: #ccc;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #00ff88;
    color: #00ff88;
  }
`;

const Guarantee = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(0, 255, 136, 0.05);
  border: 1px solid rgba(0, 255, 136, 0.2);
  border-radius: 12px;
  margin-top: 1.5rem;
`;

const GuaranteeText = styled.div`
  flex: 1;
`;

const GuaranteeTitle = styled.div`
  font-weight: 700;
  color: #00ff88;
  margin-bottom: 0.25rem;
`;

const GuaranteeSubtext = styled.div`
  font-size: 0.85rem;
  color: #888;
`;

const ErrorMessage = styled.div`
  color: #ff4444;
  font-size: 0.85rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const planParam = searchParams.get('plan') || 'starter';
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    country: 'France',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = {
    starter: {
      name: 'Starter',
      price: 0,
      period: '/mois',
      icon: <Users size={20} />,
      features: [
        'Jusqu\'à 5 participants',
        'Réunions de 40 minutes',
        'Qualité HD 720p',
        'Chat intégré',
        'Partage d\'écran basique',
        'Support communautaire'
      ],
      color: '#4caf50',
      trial: false,
      buttonText: 'Commencer Gratuitement'
    },
    pro: {
      name: 'Pro',
      price: 4.99,
      originalPrice: 19.99,
      period: '/mois',
      icon: <Crown size={20} />,
      features: [
        'Jusqu\'à 100 participants',
        'Réunions illimitées',
        'Qualité 4K Ultra HD',
        'Enregistrement cloud illimité',
        'Whiteboard collaboratif avancé',
        'Assistant IA intégré',
        'Salles d\'attente personnalisées',
        'Intégrations API complètes',
        'Support prioritaire 24/7'
      ],
      color: '#00ff88',
      trial: true,
      trialDays: 30,
      buttonText: 'Démarrer l\'Essai Gratuit 30j'
    },
    enterprise: {
      name: 'Enterprise',
      price: 12.99,
      period: '/mois/utilisateur',
      icon: <Zap size={20} />,
      features: [
        'Participants illimités',
        'Serveurs dédiés privés',
        'Chiffrement E2E avancé',
        'Conformité RGPD/HIPAA',
        'Analytics et rapports avancés',
        'SSO et Active Directory',
        'API personnalisées',
        'Formation équipe incluse',
        'Account Manager dédié'
      ],
      color: '#4ecdc4',
      trial: false,
      buttonText: 'Demander une Démo',
      isDemo: true
    },
    complete: {
      name: 'Visio + Scheduler',
      price: 4.99,
      originalPrice: 23,
      period: '/mois',
      icon: <Crown size={20} />,
      features: [
        'Tout du plan Pro Visio',
        'Planificateur intégré',
        'Création automatique de salles',
        'Rappels intelligents',
        'Synchronisation calendrier',
        'Liens de réunion automatiques',
        'Gestion des invités',
        'Support prioritaire 24/7'
      ],
      color: '#00ff88',
      trial: true,
      trialDays: 30,
      buttonText: 'Pack Complet - Essai 30j'
    }
  };

  const currentPlan = plans[planParam] || plans.starter;

  const promoCodes = {
    'LAUNCH50': { discount: 50, type: 'percentage', description: '50% de réduction' },
    'WELCOME25': { discount: 25, type: 'percentage', description: '25% de réduction' },
    'SAVE10': { discount: 10, type: 'fixed', description: '10€ de réduction' }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handlePromoCode = () => {
    const promo = promoCodes[promoCode.toUpperCase()];
    if (promo) {
      setAppliedPromo({ code: promoCode.toUpperCase(), ...promo });
    } else {
      setErrors(prev => ({ ...prev, promo: 'Code promo invalide' }));
    }
  };

  const calculateTotal = () => {
    let total = currentPlan.price;
    let discount = 0;

    if (appliedPromo) {
      if (appliedPromo.type === 'percentage') {
        discount = (total * appliedPromo.discount) / 100;
      } else {
        discount = appliedPromo.discount;
      }
    }

    return {
      subtotal: total,
      discount: discount,
      total: Math.max(0, total - discount)
    };
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = 'Email requis';
    if (!formData.firstName) newErrors.firstName = 'Prénom requis';
    if (!formData.lastName) newErrors.lastName = 'Nom requis';

    if (currentPlan.price > 0 && paymentMethod === 'card') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Numéro de carte requis';
      if (!formData.expiryDate) newErrors.expiryDate = 'Date d\'expiration requise';
      if (!formData.cvv) newErrors.cvv = 'CVV requis';
      if (!formData.cardName) newErrors.cardName = 'Nom sur la carte requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      // Simulation du traitement
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirection selon le plan
      if (currentPlan.isDemo) {
        navigate('/demo-scheduled');
      } else if (currentPlan.trial) {
        navigate('/trial-started');
      } else {
        navigate('/payment-success');
      }
    } catch (error) {
      setErrors({ submit: 'Erreur lors du traitement du paiement' });
    } finally {
      setIsProcessing(false);
    }
  };

  const totals = calculateTotal();

  return (
    <Container>
      <Header>
        <Nav>
          <Logo onClick={() => navigate('/')}>
            <Video size={24} />
            Visio Pro
          </Logo>
          <BackButton onClick={() => navigate('/')}>
            <ArrowLeft size={16} />
            Retour
          </BackButton>
        </Nav>
      </Header>

      <MainContent>
        <CheckoutForm>
          <SectionTitle>
            <CreditCard size={24} />
            {currentPlan.isDemo ? 'Demande de Démo' : 'Finaliser votre commande'}
          </SectionTitle>

          <form onSubmit={handleSubmit}>
            <FormSection>
              <h3 style={{ color: '#3b82f6', marginBottom: '1rem' }}>Informations personnelles</h3>
              
              <InputRow>
                <FormGroup>
                  <Label>Prénom *</Label>
                  <Input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Jean"
                    className={errors.firstName ? 'error' : ''}
                  />
                  {errors.firstName && (
                    <ErrorMessage>
                      <AlertCircle size={14} />
                      {errors.firstName}
                    </ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>Nom *</Label>
                  <Input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Dupont"
                    className={errors.lastName ? 'error' : ''}
                  />
                  {errors.lastName && (
                    <ErrorMessage>
                      <AlertCircle size={14} />
                      {errors.lastName}
                    </ErrorMessage>
                  )}
                </FormGroup>
              </InputRow>

              <FormGroup>
                <Label>Email *</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="jean.dupont@example.com"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && (
                  <ErrorMessage>
                    <AlertCircle size={14} />
                    {errors.email}
                  </ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label>Entreprise (optionnel)</Label>
                <Input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Mon Entreprise"
                />
              </FormGroup>

              <FormGroup>
                <Label>Pays</Label>
                <Select
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                >
                  <option value="France">France</option>
                  <option value="Belgique">Belgique</option>
                  <option value="Suisse">Suisse</option>
                  <option value="Canada">Canada</option>
                </Select>
              </FormGroup>
            </FormSection>

            {currentPlan.price > 0 && !currentPlan.isDemo && (
              <FormSection>
                <h3 style={{ color: '#3b82f6', marginBottom: '1rem' }}>Méthode de paiement</h3>
                
                <PaymentMethod>
                  <PaymentOption
                    type="button"
                    active={paymentMethod === 'card'}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <CreditCard size={20} />
                    Carte bancaire
                  </PaymentOption>
                  <PaymentOption
                    type="button"
                    active={paymentMethod === 'paypal'}
                    onClick={() => setPaymentMethod('paypal')}
                  >
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>PP</div>
                    PayPal
                  </PaymentOption>
                </PaymentMethod>

                {paymentMethod === 'card' && (
                  <>
                    <SecurityBadge>
                      <Shield size={16} />
                      Paiement 100% sécurisé SSL
                    </SecurityBadge>

                    <FormGroup>
                      <Label>Numéro de carte *</Label>
                      <Input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className={errors.cardNumber ? 'error' : ''}
                      />
                      {errors.cardNumber && (
                        <ErrorMessage>
                          <AlertCircle size={14} />
                          {errors.cardNumber}
                        </ErrorMessage>
                      )}
                    </FormGroup>

                    <InputRow>
                      <FormGroup>
                        <Label>Date d'expiration *</Label>
                        <Input
                          type="text"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          placeholder="MM/AA"
                          className={errors.expiryDate ? 'error' : ''}
                        />
                        {errors.expiryDate && (
                          <ErrorMessage>
                            <AlertCircle size={14} />
                            {errors.expiryDate}
                          </ErrorMessage>
                        )}
                      </FormGroup>

                      <FormGroup>
                        <Label>CVV *</Label>
                        <Input
                          type="text"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          placeholder="123"
                          className={errors.cvv ? 'error' : ''}
                        />
                        {errors.cvv && (
                          <ErrorMessage>
                            <AlertCircle size={14} />
                            {errors.cvv}
                          </ErrorMessage>
                        )}
                      </FormGroup>
                    </InputRow>

                    <FormGroup>
                      <Label>Nom sur la carte *</Label>
                      <Input
                        type="text"
                        value={formData.cardName}
                        onChange={(e) => handleInputChange('cardName', e.target.value)}
                        placeholder="Jean Dupont"
                        className={errors.cardName ? 'error' : ''}
                      />
                      {errors.cardName && (
                        <ErrorMessage>
                          <AlertCircle size={14} />
                          {errors.cardName}
                        </ErrorMessage>
                      )}
                    </FormGroup>
                  </>
                )}
              </FormSection>
            )}

            {errors.submit && (
              <ErrorMessage style={{ marginBottom: '1rem' }}>
                <AlertCircle size={16} />
                {errors.submit}
              </ErrorMessage>
            )}

            <SubmitButton
              type="submit"
              disabled={isProcessing}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isProcessing ? (
                <>
                  <Clock size={20} />
                  Traitement en cours...
                </>
              ) : (
                <>
                  <Lock size={20} />
                  {currentPlan.isDemo 
                    ? 'Programmer la démo' 
                    : currentPlan.trial 
                      ? 'Démarrer l\'essai gratuit'
                      : currentPlan.price === 0
                        ? 'Créer mon compte gratuit'
                        : `Payer ${totals.total.toFixed(2)}€`
                  }
                </>
              )}
            </SubmitButton>
          </form>
        </CheckoutForm>

        <OrderSummary>
          <PlanCard plan={planParam}>
            <PlanHeader>
              <PlanName>
                {currentPlan.icon}
                {currentPlan.name}
              </PlanName>
              <PlanPrice>
                <Price>
                  {currentPlan.price === 0 ? 'Gratuit' : `${currentPlan.price}€`}
                </Price>
                {currentPlan.price > 0 && (
                  <PriceNote>{currentPlan.period}</PriceNote>
                )}
              </PlanPrice>
            </PlanHeader>

            {currentPlan.originalPrice && (
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <span style={{ 
                  textDecoration: 'line-through', 
                  color: '#666', 
                  marginRight: '0.5rem' 
                }}>
                  {currentPlan.originalPrice}€
                </span>
                <span style={{ 
                  background: '#ff4444', 
                  color: '#3b82f6', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '4px', 
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  -75%
                </span>
              </div>
            )}

            <FeaturesList>
              {currentPlan.features.map((feature, index) => (
                <Feature key={index}>
                  <Check size={16} color={currentPlan.color} />
                  {feature}
                </Feature>
              ))}
            </FeaturesList>

            {currentPlan.trial && (
              <div style={{ 
                background: 'rgba(0, 255, 136, 0.1)', 
                border: '1px solid #00ff88', 
                borderRadius: '8px', 
                padding: '0.75rem', 
                marginTop: '1rem',
                textAlign: 'center'
              }}>
                <Gift size={16} style={{ marginRight: '0.5rem', color: '#00ff88' }} />
                <strong style={{ color: '#00ff88' }}>
                  Essai gratuit de {currentPlan.trialDays} jours
                </strong>
              </div>
            )}
          </PlanCard>

          {currentPlan.price > 0 && !currentPlan.isDemo && (
            <>
              <PromoCode>
                <PromoInput
                  type="text"
                  placeholder="Code promo"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <PromoButton onClick={handlePromoCode}>
                  Appliquer
                </PromoButton>
              </PromoCode>

              {errors.promo && (
                <ErrorMessage style={{ marginBottom: '1rem' }}>
                  <AlertCircle size={14} />
                  {errors.promo}
                </ErrorMessage>
              )}

              <OrderTotal>
                <OrderRow>
                  <span>Sous-total</span>
                  <span>{totals.subtotal.toFixed(2)}€</span>
                </OrderRow>

                {appliedPromo && (
                  <OrderRow className="discount">
                    <span>Réduction ({appliedPromo.description})</span>
                    <span>-{totals.discount.toFixed(2)}€</span>
                  </OrderRow>
                )}

                <OrderRow className="total">
                  <span>Total</span>
                  <span>{totals.total.toFixed(2)}€</span>
                </OrderRow>
              </OrderTotal>
            </>
          )}

          <Guarantee>
            <Shield size={24} color="#00ff88" />
            <GuaranteeText>
              <GuaranteeTitle>Garantie 30 jours</GuaranteeTitle>
              <GuaranteeSubtext>
                Satisfait ou remboursé intégralement
              </GuaranteeSubtext>
            </GuaranteeText>
          </Guarantee>
        </OrderSummary>
      </MainContent>
    </Container>
  );
};

export default CheckoutPage;
