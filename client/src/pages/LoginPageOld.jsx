import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, 
  Github, Chrome, Apple, Shield, Zap, Users
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

const LoginCard = styled(motion.div)`
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

const RememberForgot = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: -0.5rem 0 0.5rem 0;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
    margin: -0.25rem 0 0.75rem 0;
  }
`;

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: #ccc;
  font-size: 0.9rem;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #00ff88;

    @media (max-width: 480px) {
      width: 14px;
      height: 14px;
    }
  }
`;

const ForgotLink = styled(Link)`
  color: #00ff88;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s ease;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }

  &:hover {
    color: #00e67a;
  }
`;

const LoginButton = styled(motion.button)`
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

const SignupPrompt = styled.div`
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

const Features = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const FeatureItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #666;
  font-size: 0.9rem;

  .icon {
    width: 32px;
    height: 32px;
    background: rgba(0, 255, 136, 0.1);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #00ff88;
    flex-shrink: 0;
  }
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotificationContext();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Charger les identifiants sauvegardés au montage du composant
  useEffect(() => {
    const savedCredentials = localStorage.getItem('credentials');
    if (savedCredentials) {
      const { email, password } = JSON.parse(savedCredentials);
      setFormData(prev => ({
        ...prev,
        email,
        password,
        rememberMe: true
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Vérifier les identifiants stockés
    const savedCredentials = localStorage.getItem('credentials');
    
    setTimeout(() => {
      if (savedCredentials) {
        const { email, password } = JSON.parse(savedCredentials);
        
        if (formData.email === email && formData.password === password) {
          // Connexion réussie
          const userData = {
            id: Date.now().toString(),
            name: email.split('@')[0],
            email: formData.email,
            avatar: null,
            isOnline: true
          };
          
          localStorage.setItem('user', JSON.stringify(userData));
          
          addNotification({
            type: 'success',
            title: 'Connexion réussie !',
            message: `Bon retour ${userData.name} ! Vous êtes maintenant connecté.`,
            duration: 3000
          });
          
          setIsLoading(false);
          setTimeout(() => navigate('/'), 1000);
        } else {
          // Identifiants incorrects
          addNotification({
            type: 'error',
            title: 'Erreur de connexion',
            message: 'Email ou mot de passe incorrect.',
            duration: 4000
          });
          setIsLoading(false);
        }
      } else {
        // Aucun compte trouvé
        addNotification({
          type: 'warning',
          title: 'Compte non trouvé',
          message: 'Aucun compte trouvé avec ces identifiants. Veuillez créer un compte.',
          duration: 4000
        });
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    // Simulation de connexion sociale
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
      
      setTimeout(() => navigate('/'), 1000);
    }, 1000);
  };

  return (
    <Container>
      <BackgroundPattern />
      
      <Features>
        <FeatureItem
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="icon">
            <Shield size={16} />
          </div>
          <span>Sécurisé et privé</span>
        </FeatureItem>
        
        <FeatureItem
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="icon">
            <Zap size={16} />
          </div>
          <span>Connexion ultra-rapide</span>
        </FeatureItem>
        
        <FeatureItem
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="icon">
            <Users size={16} />
          </div>
          <span>Jusqu'à 100 participants</span>
        </FeatureItem>
      </Features>

      <LoginCard
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
          
          <Title>Bon retour !</Title>
          <Subtitle>
            Connectez-vous pour rejoindre vos réunions et collaborer avec votre équipe.
          </Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
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
                required
              />
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
          </InputGroup>

          <RememberForgot>
            <CheckboxWrapper>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
              />
              Se souvenir de moi
            </CheckboxWrapper>
            <ForgotLink to="/forgot-password">
              Mot de passe oublié ?
            </ForgotLink>
          </RememberForgot>

          <LoginButton
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
            {!isLoading && <ArrowRight size={18} />}
          </LoginButton>
        </Form>

        <Divider>
          <span>ou continuer avec</span>
        </Divider>

        <SocialButtons>
          <SocialButton
            onClick={() => handleSocialLogin('Google')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Chrome size={18} />
            Google
          </SocialButton>
          
          <SocialButton
            onClick={() => handleSocialLogin('GitHub')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Github size={18} />
            GitHub
          </SocialButton>
          
          <SocialButton
            onClick={() => handleSocialLogin('Apple')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Apple size={18} />
            Apple
          </SocialButton>
        </SocialButtons>

        <SignupPrompt>
          Pas encore de compte ?
          <Link to="/signup">Créer un compte</Link>
        </SignupPrompt>
      </LoginCard>
    </Container>
  );
};

export default LoginPage;
