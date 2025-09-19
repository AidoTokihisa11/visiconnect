import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Video,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Shield,
  Fingerprint,
  Chrome,
  Github,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const BackgroundEffects = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  
  &::before {
    content: '';
    position: absolute;
    top: 20%;
    left: 10%;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(102, 126, 234, 0.2), transparent);
    border-radius: 50%;
    filter: blur(60px);
    animation: float 8s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 20%;
    right: 10%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(118, 75, 162, 0.2), transparent);
    border-radius: 50%;
    filter: blur(60px);
    animation: float 10s ease-in-out infinite reverse;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-30px) scale(1.1); }
  }
`;

const LoginContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 3rem;
  width: 100%;
  max-width: 450px;
  position: relative;
  z-index: 10;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), transparent);
    border-radius: 24px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #60a5fa, #a78bfa, transparent);
    border-radius: 2px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Logo = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
  
  .logo-icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);
  }
  
  .logo-text {
    font-size: 1.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #60a5fa, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Title = styled(motion.h1)`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled(motion.p)`
  color: #60a5fa;
  font-size: 1rem;
  margin-bottom: 2rem;
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
  color: #333;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
  
  &:focus {
    outline: none;
    border-color: #60a5fa;
    box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
    background: rgba(255, 255, 255, 0.08);
  }
  
  &:invalid {
    border-color: #ef4444;
  }
`;

const LoginButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #333;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(102, 126, 234, 0.4);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
  
  .line {
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
  }
  
  .text {
    color: #93c5fd;
    font-size: 0.875rem;
  }
`;

const SocialButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialButton = styled(motion.button)`
  flex: 1;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #1e40af;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const FooterText = styled.p`
  color: #60a5fa;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  
  a {
    color: #60a5fa;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
    
    &:hover {
      color: #a78bfa;
    }
  }
`;

const SecurityBadge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  color: #34d399;
  
  svg {
    width: 12px;
    height: 12px;
  }
`;

const Notification = styled(motion.div)`
  position: fixed;
  top: 2rem;
  right: 2rem;
  background: ${props => props.type === 'success' ? 'rgba(16, 185, 129, 0.9)' : 'rgba(239, 68, 68, 0.9)'};
  color: #333;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 1000;
`;

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();
  const { signInWithGoogle, signInWithGithub, signInWithDiscord, signInWithEmail } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signInWithEmail(formData.email, formData.password);
      if (result.success) {
        setNotification({ type: 'success', message: 'Connexion réussie !' });
        setTimeout(() => navigate('/'), 1500);
      } else {
        setNotification({ type: 'error', message: result.error });
      }
    } catch (error) {
      setNotification({ type: 'error', message: 'Erreur de connexion' });
    }
    
    setIsLoading(false);
  };

  const handleSocialLogin = async (provider) => {
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
        setNotification({ type: 'success', message: `Connexion ${provider} réussie !` });
        setTimeout(() => navigate('/'), 1500);
      } else {
        setNotification({ type: 'error', message: result.error });
      }
    } catch (error) {
      setNotification({ type: 'error', message: `Erreur connexion ${provider}` });
    }
    
    setIsLoading(false);
  };

  return (
    <PageContainer>
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
          >
            {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            {notification.message}
          </Notification>
        )}
      </AnimatePresence>

      <LoginContainer
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
            Bienvenue
          </Title>
          
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Connectez-vous pour accéder à l'expérience ultime
          </Subtitle>
        </Header>

        <Form 
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
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
                placeholder="Votre mot de passe"
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
          </InputGroup>

          <LoginButton
            type="submit"
            disabled={isLoading}
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
                <Shield size={20} />
                Se connecter
                <ArrowRight size={18} />
              </>
            )}
          </LoginButton>
        </Form>

        <Divider>
          <div className="line"></div>
          <div className="text">ou</div>
          <div className="line"></div>
        </Divider>

        <SocialButtons>
          <SocialButton
            onClick={() => handleSocialLogin('Google')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Chrome size={16} />
            Google
          </SocialButton>
          
          <SocialButton
            onClick={() => handleSocialLogin('Discord')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ backgroundColor: '#5865F2' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Discord
          </SocialButton>
          
          <SocialButton
            onClick={() => handleSocialLogin('GitHub')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Github size={16} />
            GitHub
          </SocialButton>
          
          <SocialButton
            onClick={() => handleSocialLogin('Biométrique')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Fingerprint size={16} />
            Touch ID
          </SocialButton>
        </SocialButtons>

        <Footer>
          <FooterText>
            Pas encore de compte ? <Link to="/signup">Créer un compte</Link>
          </FooterText>
          
          <SecurityBadge
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <Shield size={12} />
            Sécurisé par chiffrement quantique
          </SecurityBadge>
        </Footer>
      </LoginContainer>
    </PageContainer>
  );
};

export default LoginPage;