import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Video,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Shield,
  Check,
  Crown,
  Zap,
  CheckCircle,
  AlertCircle,
  Star
} from 'lucide-react';

const PageContainer = styled.div`
  min-height: 100vh;
  background: var(--bg-primary, #ffffff);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

// Header de navigation
const NavigationHeader = styled(motion.header)`
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
    background: var(--primary-gradient, #2563eb);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 10px rgba(37, 99, 235, 0.3);
  }
  
  .logo-text {
    background: var(--primary-gradient, #2563eb);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: var(--text-primary, #1e293b);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--accent-cyan, #06b6d4);
  }
`;

const BackgroundEffects = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  
  &::before, &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
  }
  
  &::before {
    top: 10%;
    left: 20%;
    width: 350px;
    height: 350px;
    background: radial-gradient(circle, rgba(37, 99, 235, 0.1), transparent);
    animation: float 12s ease-in-out infinite;
  }
  
  &::after {
    bottom: 10%;
    right: 20%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(6, 182, 212, 0.08), transparent);
    animation: float 15s ease-in-out infinite reverse;
  }
    height: 350px;
    background: radial-gradient(circle, rgba(102, 126, 234, 0.3), transparent);
    animation: float 12s ease-in-out infinite;
  }
  
  &::after {
    bottom: 10%;
    right: 20%;
    width: 250px;
    height: 250px;
    background: radial-gradient(circle, rgba(244, 114, 182, 0.3), transparent);
    animation: float 8s ease-in-out infinite reverse;
  }
  
  @keyframes float {
    0%, 100% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -30px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
  }
`;

const SignupContainer = styled(motion.div)`
  background: var(--bg-card, rgba(255, 255, 255, 0.95));
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  padding: 3rem;
  width: 100%;
  max-width: 500px;
  position: relative;
  z-index: 10;
  margin-top: 6rem;
  box-shadow: var(--shadow-xl, 0 20px 40px rgba(0, 0, 0, 0.1));
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-2xl, 0 25px 50px rgba(0, 0, 0, 0.15));
  }
  
  transition: all 0.3s ease;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Logo = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  
  .logo-icon {
    width: 50px;
    height: 50px;
    background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #1d4ed8));
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 32px rgba(37, 99, 235, 0.3);
  }
  
  .logo-text {
    font-size: 1.5rem;
    font-weight: 800;
    background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const Title = styled(motion.h1)`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary, #1e293b);
  margin-bottom: 0.5rem;
`;

const Subtitle = styled(motion.p)`
  color: var(--text-secondary, #475569);
  font-size: 1rem;
`;

const PlanSelector = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 0.5rem;
  background: var(--bg-secondary, #f8fafc);
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const PlanOption = styled(motion.button)`
  flex: 1;
  padding: 1rem;
  background: ${props => props.active ? 'var(--primary-gradient, linear-gradient(135deg, #2563eb, #1d4ed8))' : 'transparent'};
  color: ${props => props.active ? '#ffffff' : 'var(--text-primary, #1e293b)'};
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  position: relative;
  
  .plan-name {
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .plan-price {
    font-size: 1.25rem;
    font-weight: 800;
  }
  
  .plan-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: linear-gradient(135deg, #f59e0b, #fbbf24);
    color: var(--text-primary, #1e293b);
    font-size: 0.7rem;
    padding: 0.25rem 0.5rem;
    border-radius: 8px;
    font-weight: 600;
    text-transform: uppercase;
  }
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled(motion.div)`
  position: relative;
`;

const InputLabel = styled.label`
  display: block;
  color: #1e40af;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const InputContainer = styled.div`
  position: relative;
  
  .input-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255, 255, 255, 0.4);
    z-index: 2;
  }
  
  .toggle-password {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    z-index: 2;
    transition: color 0.2s ease;
    
    &:hover {
      color: #1e40af;
    }
  }
`;

const Input = styled(motion.input)`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: var(--text-primary, #1e293b);
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
  
  &:focus {
    outline: none;
    border-color: #f472b6;
    box-shadow: 0 0 0 3px rgba(244, 114, 182, 0.1);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const PasswordStrength = styled(motion.div)`
  margin-top: 0.5rem;
  
  .strength-bar {
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 0.5rem;
  }
  
  .strength-fill {
    height: 100%;
    background: ${props => {
      switch (props.strength) {
        case 1: return '#ef4444';
        case 2: return '#f59e0b';
        case 3: return '#10b981';
        case 4: return '#059669';
        default: return 'transparent';
      }
    }};
    width: ${props => props.strength * 25}%;
    transition: all 0.3s ease;
    border-radius: 2px;
  }
  
  .strength-text {
    font-size: 0.75rem;
    color: #60a5fa;
  }
`;

const SignupButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea, #f472b6);
  color: var(--text-primary, #1e293b);
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 8px 32px rgba(244, 114, 182, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(244, 114, 182, 0.4);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Benefits = styled(motion.div)`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const BenefitsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BenefitItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #1e40af;
  font-size: 0.875rem;
  
  .check-icon {
    color: #10b981;
    background: rgba(16, 185, 129, 0.1);
    border-radius: 50%;
    padding: 0.25rem;
  }
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 2rem;
`;

const FooterText = styled.p`
  color: #60a5fa;
  font-size: 0.875rem;
  
  a {
    color: #f472b6;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
    
    &:hover {
      color: #a78bfa;
    }
  }
`;

const Notification = styled(motion.div)`
  position: fixed;
  top: 2rem;
  right: 2rem;
  background: ${props => props.type === 'success' ? 'rgba(16, 185, 129, 0.9)' : 'rgba(239, 68, 68, 0.9)'};
  color: var(--text-primary, #1e293b);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 1000;
`;

const SignupPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();
  const { signUpWithEmail, signInWithGoogle, signInWithGithub, signInWithDiscord } = useAuth();

  const plans = [
    {
      id: 'free',
      name: 'Gratuit',
      price: '0€',
      icon: Star
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '29€',
      icon: Crown,
      badge: 'Populaire'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '99€',
      icon: Zap
    }
  ];

  const benefits = [
    "Accès à toutes les fonctionnalités Premium",
    "Vidéo 4K Ultra HD illimitée",
    "IA générative intégrée",
    "Sécurité quantique avancée",
    "Support prioritaire 24/7",
    "Environnements métavers personnalisés"
  ];

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z\d]/.test(password)) strength++;
    return strength;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setNotification({ type: 'error', message: 'Les mots de passe ne correspondent pas' });
      return;
    }

    setIsLoading(true);

    try {
      const result = await signUpWithEmail(formData.email, formData.password);
      if (result.success) {
        setNotification({ type: 'success', message: 'Compte créé avec succès !' });
        setTimeout(() => navigate('/'), 2000);
      } else {
        setNotification({ type: 'error', message: result.error });
      }
    } catch (error) {
      setNotification({ type: 'error', message: 'Erreur lors de la création du compte' });
    }
    
    setIsLoading(false);
  };

  const handleSocialSignup = async (provider) => {
    setIsLoading(true);
    let result;
    
    try {
      switch (provider) {
        case 'Google':
          result = await signInWithGoogle();
          break;
        case 'GitHub':
          result = await signInWithGithub();
          break;
        case 'Discord':
          result = await signInWithDiscord();
          break;
        default:
          result = { success: false, error: 'Provider non supporté' };
      }
      
      if (result.success) {
        setNotification({ type: 'success', message: `Inscription ${provider} réussie !` });
        setTimeout(() => navigate('/'), 1500);
      } else {
        setNotification({ type: 'error', message: result.error });
      }
    } catch (error) {
      setNotification({ type: 'error', message: `Erreur inscription ${provider}` });
    }
    
    setIsLoading(false);
  };

  const getPasswordStrengthText = (strength) => {
    switch (strength) {
      case 1: return 'Faible';
      case 2: return 'Moyen';
      case 3: return 'Fort';
      case 4: return 'Très fort';
      default: return 'Trop faible';
    }
  };

  return (
    <PageContainer>
      {/* Header de navigation */}
      <NavigationHeader
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

          <NavLinks>
            <NavLink to="/">Accueil</NavLink>
            <NavLink to="/features">Fonctionnalités</NavLink>
            <NavLink to="/pricing">Tarifs</NavLink>
            <NavLink to="/about">À propos</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/login">
              <motion.div
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'var(--primary-gradient, #2563eb)',
                  borderRadius: '8px',
                  color: 'white'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Connexion
              </motion.div>
            </NavLink>
          </NavLinks>
        </Nav>
      </NavigationHeader>

      <BackgroundEffects />
      
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <Notification
            type={notification.type}
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onAnimationComplete={() => {
              if (notification.type === 'error') {
                setTimeout(() => setNotification(null), 3000);
              }
            }}
          >
            {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            {notification.message}
          </Notification>
        )}
      </AnimatePresence>

      <SignupContainer
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Header>
          <Logo
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="logo-icon">
              <Video size={28} color="#3b82f6" />
            </div>
            <div className="logo-text">VisioMeet</div>
          </Logo>
          
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Rejoignez l'avenir
          </Title>
          
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Créez votre compte et découvrez l'expérience révolutionnaire
          </Subtitle>
        </Header>

        {/* Plan Selector */}
        <PlanSelector
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {plans.map((plan) => (
            <PlanOption
              key={plan.id}
              active={selectedPlan === plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {plan.badge && <div className="plan-badge">{plan.badge}</div>}
              <plan.icon size={20} />
              <div className="plan-name">{plan.name}</div>
              <div className="plan-price">{plan.price}</div>
            </PlanOption>
          ))}
        </PlanSelector>

        <Form 
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <InputGroup>
            <InputLabel htmlFor="fullName">Nom complet</InputLabel>
            <InputContainer>
              <User className="input-icon" size={18} />
              <Input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Votre nom complet"
                value={formData.fullName}
                onChange={handleChange}
                required
                whileFocus={{ scale: 1.02 }}
              />
            </InputContainer>
          </InputGroup>

          <InputGroup>
            <InputLabel htmlFor="email">Email</InputLabel>
            <InputContainer>
              <Mail className="input-icon" size={18} />
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                whileFocus={{ scale: 1.02 }}
              />
            </InputContainer>
          </InputGroup>

          <InputGroup>
            <InputLabel htmlFor="password">Mot de passe</InputLabel>
            <InputContainer>
              <Lock className="input-icon" size={18} />
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Créer un mot de passe fort"
                value={formData.password}
                onChange={handleChange}
                required
                whileFocus={{ scale: 1.02 }}
              />
              <div 
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </InputContainer>
            
            {formData.password && (
              <PasswordStrength
                strength={passwordStrength}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <div className="strength-bar">
                  <div className="strength-fill" />
                </div>
                <div className="strength-text">
                  Force: {getPasswordStrengthText(passwordStrength)}
                </div>
              </PasswordStrength>
            )}
          </InputGroup>

          <InputGroup>
            <InputLabel htmlFor="confirmPassword">Confirmer le mot de passe</InputLabel>
            <InputContainer>
              <Shield className="input-icon" size={18} />
              <Input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirmer votre mot de passe"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                whileFocus={{ scale: 1.02 }}
              />
              <div 
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </InputContainer>
          </InputGroup>

          <SignupButton
            type="submit"
            disabled={isLoading || passwordStrength < 2}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={20} />
              </motion.div>
            ) : (
              <>
                <Crown size={20} />
                Créer mon compte {selectedPlan !== 'free' && 'Premium'}
                <ArrowRight size={18} />
              </>
            )}
          </SignupButton>
        </Form>

        {selectedPlan !== 'free' && (
          <Benefits
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <BenefitsList>
              {benefits.slice(0, 3).map((benefit, index) => (
                <BenefitItem
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                >
                  <Check className="check-icon" size={14} />
                  {benefit}
                </BenefitItem>
              ))}
            </BenefitsList>
          </Benefits>
        )}

        {/* Social Signup Options */}
        <div style={{ margin: '2rem 0', textAlign: 'center' }}>
          <p style={{ color: '#60a5fa', marginBottom: '1rem', fontSize: '0.9rem' }}>
            Ou créez votre compte avec :
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.button
              onClick={() => handleSocialSignup('Google')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: '#fff',
                color: 'var(--text-primary, #1e293b)',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </motion.button>

            <motion.button
              onClick={() => handleSocialSignup('GitHub')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: '#24292e',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </motion.button>

            <motion.button
              onClick={() => handleSocialSignup('Discord')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: '#5865F2',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Discord
            </motion.button>
          </div>
        </div>

        <Footer>
          <FooterText>
            Déjà un compte ? <Link to="/login">Se connecter</Link>
          </FooterText>
        </Footer>
      </SignupContainer>
    </PageContainer>
  );
};

export default SignupPage;