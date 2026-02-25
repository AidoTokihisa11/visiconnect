import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import { useSupabaseAuth } from '../contexts/SupabaseAuthContext'
import { FaGoogle, FaGithub } from 'react-icons/fa'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const SupabaseLoginPage = () => {
  const navigate = useNavigate()
  const { signIn, signInWithProvider, error: authError } = useSupabaseAuth()
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error: signInError } = await signIn(formData.email, formData.password)
      
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

  return (
    <PageContainer>
      <LoginCard>
        <Header>
          <Logo>VisiConnect</Logo>
          <Title>Connexion</Title>
          <Subtitle>Connectez-vous pour accéder à vos réunions</Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          {(error || authError) && (
            <ErrorMessage>{error || authError}</ErrorMessage>
          )}

          <FormGroup>
            <Label htmlFor="email">
              <Mail size={16} /> Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="votre@email.com"
              required
              autoComplete="email"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">
              <Lock size={16} /> Mot de passe
            </Label>
            <PasswordWrapper>
              <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
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
            </PasswordWrapper>
          </FormGroup>

          <ForgotPassword>
            <Link to="/forgot-password">Mot de passe oublié ?</Link>
          </ForgotPassword>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </SubmitButton>
        </Form>

        <Divider>
          <span>ou continuer avec</span>
        </Divider>

        <OAuthButtons>
          <OAuthButton
            type="button"
            onClick={() => handleOAuthLogin('google')}
            disabled={loading}
            $provider="google"
          >
            <FaGoogle /> Google
          </OAuthButton>
          <OAuthButton
            type="button"
            onClick={() => handleOAuthLogin('github')}
            disabled={loading}
            $provider="github"
          >
            <FaGithub /> GitHub
          </OAuthButton>
        </OAuthButtons>

        <Footer>
          Pas encore de compte ?{' '}
          <Link to="/signup">Créer un compte</Link>
        </Footer>
      </LoginCard>
    </PageContainer>
  )
}

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8fafc;
  padding: 20px;
`

const LoginCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 48px 40px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 32px;
`

const Logo = styled.h1`
  font-size: 32px;
  margin: 0 0 16px;
  color: #2563eb;
`

const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px;
`

const Subtitle = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
`

const Form = styled.form`
  margin-bottom: 24px;
`

const FormGroup = styled.div`
  margin-bottom: 20px;
`

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;

  svg {
    color: #2563eb;
  }
`

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`

const PasswordWrapper = styled.div`
  position: relative;
`

const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #374151;
  }
`

const ForgotPassword = styled.div`
  text-align: right;
  margin-bottom: 24px;

  a {
    color: #667eea;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.6;
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
    border-bottom: 1px solid #e5e7eb;
  }

  span {
    padding: 0 16px;
    color: #6b7280;
    font-size: 14px;
  }
`

const OAuthButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
`

const OAuthButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  color: #374151;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    border-color: ${props => props.$provider === 'google' ? '#4285f4' : '#333'};
    color: ${props => props.$provider === 'google' ? '#4285f4' : '#333'};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
  color: #6b7280;
  font-size: 14px;

  a {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`

const ErrorMessage = styled.div`
  background: #fee2e2;
  border: 1px solid #ef4444;
  color: #dc2626;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
`

export default SupabaseLoginPage
