import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  Mail, Lock, Eye, EyeOff, User, ArrowRight, 
  Github, Chrome, Apple, Users, Check
} from 'lucide-react';
import { useNotificationContext } from '../App';

const Container = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1rem;
    align-items: flex-start;
    padding-top: 2rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    padding-top: 1rem;
  }
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.03;
  background-image: radial-gradient(circle at 25% 25%, #00ff88 0%, transparent 50%),
                    radial-gradient(circle at 75% 75%, #00ff88 0%, transparent 50%);
  animation: float 20s ease-in-out infinite;

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
`;

const SignupCard = styled(motion.div)`
  background: #111;
  border: 1px solid #222;
  border-radius: 24px;
  padding: 3rem;
  width: 100%;
  max-width: 450px;
  position: relative;
  backdrop-filter: blur(20px);

  @media (max-width: 768px) {
    padding: 2rem;
    border-radius: 16px;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
    border-radius: 12px;
    margin: 0;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  
  .icon {
    width: 48px;
    height: 48px;
    background: #00ff88;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0a0a0a;

    @media (max-width: 480px) {
      width: 40px;
      height: 40px;
    }
  }
  
  .text {
    font-size: 1.8rem;
    font-weight: 900;
    color: #333;

    @media (max-width: 480px) {
      font-size: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    margin-bottom: 1rem;
  }
`;

const Title = styled.h1`
  color: #333;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const Subtitle = styled.p`
  color: #888;
  font-size: 1rem;
  margin: 0;
  line-height: 1.4;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 480px) {
    gap: 1.25rem;
  }
`;

const InputGroup = styled.div`
  position: relative;
`;

const Label = styled.label`
  display: block;
  color: #ccc;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background: #1a1a1a;
  border: 2px solid #222;
  border-radius: 12px;
  color: #333;
  font-size: 1rem;
  transition: all 0.3s ease;

  @media (max-width: 480px) {
    padding: 0.875rem 0.875rem 0.875rem 2.75rem;
    font-size: 0.9rem;
  }

  &:focus {
    outline: none;
    border-color: #00ff88;
    box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.1);
  }

  &::placeholder {
    color: #666;
  }

  &.valid {
    border-color: #00ff88;
  }

  &.invalid {
    border-color: #ff4444;
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  color: #666;
  z-index: 1;

  @media (max-width: 480px) {
    left: 0.875rem;
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: color 0.3s ease;

  @media (max-width: 480px) {
    right: 0.875rem;
  }

  &:hover {
    color: #888;
  }
`;

const ValidationIcon = styled.div`
  position: absolute;
  right: 1rem;
  color: ${props => props.valid ? '#00ff88' : '#ff4444'};

  @media (max-width: 480px) {
    right: 0.875rem;
  }
`;

const PasswordStrength = styled.div`
  margin-top: 0.5rem;

  @media (max-width: 480px) {
    margin-top: 0.375rem;
  }
  
  .strength-bar {
    height: 4px;
    background: #222;
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 0.5rem;

    @media (max-width: 480px) {
      height: 3px;
      margin-bottom: 0.375rem;
    }
    
    .fill {
      height: 100%;
      background: ${props => 
        props.strength === 'weak' ? '#ff4444' :
        props.strength === 'medium' ? '#f9ca24' :
        props.strength === 'strong' ? '#00ff88' : '#222'
      };
      width: ${props => 
        props.strength === 'weak' ? '33%' :
        props.strength === 'medium' ? '66%' :
        props.strength === 'strong' ? '100%' : '0%'
      };
      transition: all 0.3s ease;
    }
  }
  
  .strength-text {
    font-size: 0.8rem;
    color: ${props => 
      props.strength === 'weak' ? '#ff4444' :
      props.strength === 'medium' ? '#f9ca24' :
      props.strength === 'strong' ? '#00ff88' : '#666'
    };

    @media (max-width: 480px) {
      font-size: 0.75rem;
    }
  }
`;

const PasswordRequirements = styled.div`
  margin-top: 0.5rem;
  font-size: 0.8rem;

  @media (max-width: 480px) {
    margin-top: 0.375rem;
    font-size: 0.75rem;
  }
  
  .requirement {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
    color: ${props => props.met ? '#00ff88' : '#666'};
    
    .icon {
      width: 12px;
      height: 12px;
      flex-shrink: 0;

      @media (max-width: 480px) {
        width: 10px;
        height: 10px;
      }
    }
  }
`;

const TermsCheckbox = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  color: #ccc;
  font-size: 0.9rem;
  line-height: 1.4;

  @media (max-width: 480px) {
    font-size: 0.85rem;
    gap: 0.5rem;
  }

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #00ff88;
    margin-top: 0.125rem;
    flex-shrink: 0;

    @media (max-width: 480px) {
      width: 14px;
      height: 14px;
    }
  }

  a {
    color: #00ff88;
    text-decoration: none;

    &:hover {
      color: #00e67a;
    }
  }
`;

const SignupButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: #00ff88;
  color: #0a0a0a;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  @media (max-width: 480px) {
    padding: 0.875rem;
    font-size: 0.9rem;
  }

  &:hover {
    background: #00e67a;
  }

  &:disabled {
    background: #333;
    color: #666;
    cursor: not-allowed;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0;

  @media (max-width: 480px) {
    margin: 1.25rem 0;
    gap: 0.75rem;
  }

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #222;
  }

  span {
    color: #666;
    font-size: 0.9rem;

    @media (max-width: 480px) {
      font-size: 0.8rem;
    }
  }
`;

const SocialButtons = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const SocialButton = styled(motion.button)`
  flex: 1;
  padding: 0.75rem;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 12px;
  color: #ccc;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  @media (max-width: 480px) {
    padding: 0.875rem;
    font-size: 0.85rem;
  }

  &:hover {
    background: #222;
    border-color: #444;
  }
`;

const LoginPrompt = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #222;
  color: #888;
  font-size: 0.9rem;

  @media (max-width: 480px) {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    font-size: 0.85rem;
  }

  a {
    color: #00ff88;
    text-decoration: none;
    font-weight: 600;
    margin-left: 0.5rem;

    &:hover {
      color: #00e67a;
    }
  }
`;

const SignupPage = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotificationContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const getPasswordStrength = (password) => {
    if (password.length < 6) return 'weak';
    if (password.length < 10) return 'medium';
    if (password.length >= 10 && /[A-Z]/.test(password) && /[0-9]/.test(password)) return 'strong';
    return 'medium';
  };

  const passwordRequirements = [
    { text: 'Au moins 8 caractères', met: formData.password.length >= 8 },
    { text: 'Une majuscule', met: /[A-Z]/.test(formData.password) },
    { text: 'Un chiffre', met: /[0-9]/.test(formData.password) },
    { text: 'Un caractère spécial', met: /[!@#$%^&*]/.test(formData.password) }
  ];

  const isFormValid = () => {
    return formData.name.trim() &&
           formData.email.includes('@') &&
           formData.password.length >= 8 &&
           formData.password === formData.confirmPassword &&
           formData.acceptTerms;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
    
    setIsLoading(true);

    // Simulation d'inscription
    setTimeout(() => {
      // Stocker les identifiants pour la connexion
      const userData = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        avatar: null,
        isOnline: true
      };
      
      // Stocker l'utilisateur et ses identifiants
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('credentials', JSON.stringify({
        email: formData.email,
        password: formData.password
      }));
      
      // Afficher notification de succès
      addNotification({
        type: 'success',
        title: 'Compte créé avec succès !',
        message: `Bienvenue ${formData.name} ! Votre compte a été créé et vous êtes maintenant connecté.`,
        duration: 4000
      });
      
      setIsLoading(false);
      
      // Redirection après un court délai pour voir la notification
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }, 1500);
  };

  const handleSocialSignup = (provider) => {
    // Simulation d'inscription sociale
    setTimeout(() => {
      const userData = {
        id: Date.now().toString(),
        name: `Utilisateur ${provider}`,
        email: `user@${provider.toLowerCase()}.com`,
        avatar: null,
        isOnline: true
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      
      addNotification({
        type: 'success',
        title: 'Connexion réussie !',
        message: `Vous êtes maintenant connecté via ${provider}.`,
        duration: 3000
      });
      
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }, 1000);
  };

  return (
    <Container>
      <BackgroundPattern />

      <SignupCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Header>
          <Logo>
            <div className="icon">
              <Users size={24} />
            </div>
            <div className="text">Visio Pro</div>
          </Logo>
          
          <Title>Créer un compte</Title>
          <Subtitle>
            Rejoignez des milliers d'utilisateurs qui font confiance à Visio Pro pour leurs réunions.
          </Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="name">Nom complet</Label>
            <InputWrapper>
              <InputIcon>
                <User size={18} />
              </InputIcon>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Votre nom complet"
                value={formData.name}
                onChange={handleInputChange}
                className={formData.name.trim() ? 'valid' : ''}
                required
              />
              {formData.name.trim() && (
                <ValidationIcon valid={true}>
                  <Check size={16} />
                </ValidationIcon>
              )}
            </InputWrapper>
          </InputGroup>

          <InputGroup>
            <Label htmlFor="email">Adresse email</Label>
            <InputWrapper>
              <InputIcon>
                <Mail size={18} />
              </InputIcon>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={handleInputChange}
                className={formData.email.includes('@') ? 'valid' : ''}
                required
              />
              {formData.email.includes('@') && (
                <ValidationIcon valid={true}>
                  <Check size={16} />
                </ValidationIcon>
              )}
            </InputWrapper>
          </InputGroup>

          <InputGroup>
            <Label htmlFor="password">Mot de passe</Label>
            <InputWrapper>
              <InputIcon>
                <Lock size={18} />
              </InputIcon>
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <ToggleButton
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </ToggleButton>
            </InputWrapper>
            
            {formData.password && (
              <PasswordStrength strength={getPasswordStrength(formData.password)}>
                <div className="strength-bar">
                  <div className="fill" />
                </div>
                <div className="strength-text">
                  Force du mot de passe: {
                    getPasswordStrength(formData.password) === 'weak' ? 'Faible' :
                    getPasswordStrength(formData.password) === 'medium' ? 'Moyenne' :
                    'Forte'
                  }
                </div>
              </PasswordStrength>
            )}

            {formData.password && (
              <PasswordRequirements>
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="requirement" met={req.met}>
                    <div className="icon">
                      {req.met ? <Check size={12} /> : <div style={{width: 12, height: 12, border: '1px solid currentColor', borderRadius: '50%'}} />}
                    </div>
                    {req.text}
                  </div>
                ))}
              </PasswordRequirements>
            )}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
            <InputWrapper>
              <InputIcon>
                <Lock size={18} />
              </InputIcon>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={
                  formData.confirmPassword && formData.password === formData.confirmPassword ? 'valid' :
                  formData.confirmPassword && formData.password !== formData.confirmPassword ? 'invalid' : ''
                }
                required
              />
              <ToggleButton
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </ToggleButton>
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <ValidationIcon valid={true}>
                  <Check size={16} />
                </ValidationIcon>
              )}
            </InputWrapper>
          </InputGroup>

          <TermsCheckbox>
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleInputChange}
              required
            />
            <span>
              J'accepte les <Link to="/terms">conditions d'utilisation</Link> et la{' '}
              <Link to="/privacy">politique de confidentialité</Link>
            </span>
          </TermsCheckbox>

          <SignupButton
            type="submit"
            disabled={!isFormValid() || isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? 'Création du compte...' : 'Créer mon compte'}
            {!isLoading && <ArrowRight size={18} />}
          </SignupButton>
        </Form>

        <Divider>
          <span>ou s'inscrire avec</span>
        </Divider>

        <SocialButtons>
          <SocialButton
            onClick={() => handleSocialSignup('Google')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Chrome size={18} />
            Google
          </SocialButton>
          
          <SocialButton
            onClick={() => handleSocialSignup('GitHub')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Github size={18} />
            GitHub
          </SocialButton>
          
          <SocialButton
            onClick={() => handleSocialSignup('Apple')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Apple size={18} />
            Apple
          </SocialButton>
        </SocialButtons>

        <LoginPrompt>
          Déjà un compte ?
          <Link to="/login">Se connecter</Link>
        </LoginPrompt>
      </SignupCard>
    </Container>
  );
};

export default SignupPage;
