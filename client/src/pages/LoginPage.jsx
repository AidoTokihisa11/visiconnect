import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { FaGoogle, FaGithub } from 'react-icons/fa'
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

// Styled Components

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8fafc;
  padding: 24px;
  position: relative;
  overflow: hidden;
`

const BgDecoration = styled.div`
  position: absolute;
  top: -10%;
  left: -10%;
  width: 50vw;
  height: 50vw;
  background: radial-gradient(circle, rgba(37,99,235,0.05) 0%, rgba(248,250,252,0) 70%);
  border-radius: 50%;
  z-index: 0;
  pointer-events: none;
`

const LoginCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  padding: 48px 40px;
  width: 100%;
  max-width: 440px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 20px 40px -10px rgba(37, 99, 235, 0.1);
  
  @media (max-width: 640px) {
    padding: 32px 24px;
    border-radius: 16px;
  }
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 32px;
`

const Logo = styled.h1`
  font-size: 32px;
  margin: 0 0 16px;
  color: #2563eb;
  font-weight: 800;
  letter-spacing: -0.5px;
`

const Title = styled.h2`
  font-size: 26px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 8px;
`

const Subtitle = styled.p`
  font-size: 15px;
  color: #64748b;
  margin: 0;
`

const Form = styled.form`
  margin-bottom: 24px;
`

const FormGroup = styled.div`
  margin-bottom: 20px;
`

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #334155;
  margin-bottom: 8px;
`

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const IconWrapper = styled.div`
  position: absolute;
  left: 14px;
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
`

const Input = styled.input`
  width: 100%;
  padding: 12px 16px 12px 42px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 15px;
  color: #0f172a;
  background: white;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  }

  &:focus + ${IconWrapper}, &:not(:placeholder-shown) + ${IconWrapper} {
    color: #3b82f6;
  }

  &::placeholder {
    color: #94a3b8;
  }
`

const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
  border-radius: 6px;

  &:hover {
    color: #475569;
    background: #f1f5f9;
  }
`

const ForgotPassword = styled.div`
  text-align: right;
  margin-top: -8px;
  margin-bottom: 24px;

  a {
    color: #2563eb;
    text-decoration: none;
    font-size: 13px;
    font-weight: 600;
    transition: color 0.2s;

    &:hover {
      color: #1d4ed8;
      text-decoration: underline;
    }
  }
`

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 24px 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #e2e8f0;
  }

  span {
    padding: 0 16px;
    color: #64748b;
    font-size: 13px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`

const DevButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  background: #fffbeb;
  color: #d97706;
  border: 1px solid #fcd34d;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    background: #fef3c7;
    border-color: #fbbf24;
  }
`

const OAuthButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
`

const OAuthButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: white;
  color: #475569;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover:not(:disabled) {
    border-color: ${props => props.$provider === 'google' ? '#4285f4' : '#1e293b'};
    color: ${props => props.$provider === 'google' ? '#4285f4' : '#1e293b'};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    font-size: 18px;
  }
`

const Footer = styled.div`
  text-align: center;
  color: #64748b;
  font-size: 14px;

  a {
    color: #2563eb;
    text-decoration: none;
    font-weight: 600;
    margin-left: 4px;

    &:hover {
      text-decoration: underline;
    }
  }
`

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #ef4444;
  padding: 12px 16px;
  border-radius: 10px;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 500;
`






const LoginPage = () => {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()
  React.useEffect(() => {
    if (isLoggedIn) navigate("/")
  }, [isLoggedIn, navigate])
  const { signIn, loginAsDev, signInWithProvider, error: authError } = useAuth()
  
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const syncCredentialsInput = (event) => {
    const { name, value } = event.target
    setCredentials((previousCredentials) => ({
      ...previousCredentials,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error: signInError } = await signIn(credentials.email, credentials.password)
      
      if (signInError) {
        setError(signInError.message)
        return
      }

      if (data?.user) {
        navigate('/')
      }
    } catch (err) {
      setError(err.message || 'Une erreur est survenue lors de la connexion')
    } finally {
      setLoading(false)
    }
  }

  const handleOAuthLogin = async (provider) => {
    try {
      setLoading(true)
      const { error: oauthError } = await signInWithProvider(provider)

      if (oauthError) {
        setError(oauthError.message)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeveloperAccess = () => {
    loginAsDev()
    navigate('/')
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <PageContainer>
      <BgDecoration />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ width: '100%', maxWidth: '450px', zIndex: 1 }}
      >
        <LoginCard>
          <Header>
            <motion.div variants={itemVariants}>
              <Logo>VisioConnect</Logo>
              <Title>Bon retour parmi nous</Title>
              <Subtitle>Connectez-vous pour continuer vers votre espace</Subtitle>
            </motion.div>
          </Header>

          <Form onSubmit={handleSubmit}>
            {(error || authError) && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <ErrorMessage>
                  <AlertCircle size={18} />
                  <span>{error || authError}</span>
                </ErrorMessage>
              </motion.div>
            )}

            <motion.div variants={itemVariants}>
              <FormGroup>
                <Label htmlFor="email">
                  Email
                </Label>
                <InputWrapper>
                  <IconWrapper><Mail size={18} /></IconWrapper>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={credentials.email}
                    onChange={syncCredentialsInput}
                    placeholder="votre@email.com"
                    required
                    autoComplete="email"
                  />
                </InputWrapper>
              </FormGroup>
            </motion.div>

            <motion.div variants={itemVariants}>
              <FormGroup>
                <Label htmlFor="password">
                  Mot de passe
                </Label>
                <InputWrapper>
                  <IconWrapper><Lock size={18} /></IconWrapper>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={syncCredentialsInput}
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                  />
                  <PasswordToggle
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </PasswordToggle>
                </InputWrapper>
              </FormGroup>
            </motion.div>

            <motion.div variants={itemVariants}>
              <ForgotPassword>
                <Link to="/forgot-password">Mot de passe oublié ?</Link>
              </ForgotPassword>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SubmitButton 
                type="submit" 
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? 'Connexion en cours...' : 'Se connecter'}
              </SubmitButton>
            </motion.div>
          </Form>

          <motion.div variants={itemVariants}>
            <Divider>
              <span>ou continuer avec</span>
            </Divider>

            <DevButton 
               type="button" 
               onClick={handleDeveloperAccess}
            >
              🔑 Accès Développeur (Local)
            </DevButton>

            <OAuthButtons>
              <OAuthButton
                type="button"
                onClick={() => handleOAuthLogin('google')}
                disabled={loading}
                $provider="google"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaGoogle /> Google
              </OAuthButton>
              <OAuthButton
                type="button"
                onClick={() => handleOAuthLogin('github')}
                disabled={loading}
                $provider="github"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaGithub /> GitHub
              </OAuthButton>
            </OAuthButtons>

            <Footer>
              Pas encore de compte ?{' '}
              <Link to="/signup">Créer un compte</Link>
            </Footer>
          </motion.div>
        </LoginCard>
      </motion.div>
    </PageContainer>
  )
}

export default LoginPage
