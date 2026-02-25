import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import { useSupabaseAuth } from '../contexts/SupabaseAuthContext'
import { FaGoogle, FaGithub } from 'react-icons/fa'
import { Check, X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

const SupabaseSignupPage = () => {
  const navigate = useNavigate()
  const { signUp, signInWithProvider, error: authError } = useSupabaseAuth()
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError('Tous les champs sont requis')
      return false
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères')
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Adresse email invalide')
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    setError('')

    try {
      const { data, error: signUpError } = await signUp(
        formData.email,
        formData.password,
        {
          display_name: formData.displayName || formData.email.split('@')[0],
          full_name: formData.displayName
        }
      )
      
      if (signUpError) {
        setError(signUpError.message)
        return
      }

      if (data?.user) {
        setSuccess(true)
        setTimeout(() => {
          navigate('/')
        }, 2000)
      }
    } catch (err) {
      setError(err.message || 'Une erreur est survenue lors de l\'inscription')
    } finally {
      setLoading(false)
    }
  }

  const handleOAuthSignup = async (provider) => {
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

  if (success) {
    return (
      <PageContainer>
        <SuccessCard>
          <SuccessIcon><Check size={48} /></SuccessIcon>
          <SuccessTitle>Compte créé avec succès !</SuccessTitle>
          <SuccessMessage>
            Bienvenue sur VisiConnect. Redirection en cours...
          </SuccessMessage>
        </SuccessCard>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <SignupCard>
        <Header>
          <Logo>VisiConnect</Logo>
          <Title>Créer un compte</Title>
          <Subtitle>Rejoignez-nous pour des réunions incroyables</Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          {(error || authError) && (
            <ErrorMessage>{error || authError}</ErrorMessage>
          )}

          <FormGroup>
            <Label htmlFor="displayName">
              <User size={16} /> Nom d'affichage (optionnel)
            </Label>
            <Input
              type="text"
              id="displayName"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              placeholder="John Doe"
              autoComplete="name"
            />
          </FormGroup>

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
                autoComplete="new-password"
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </PasswordToggle>
            </PasswordWrapper>
            <PasswordHint>Au moins 6 caractères</PasswordHint>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword">
              <Lock size={16} /> Confirmer le mot de passe
            </Label>
            <PasswordWrapper>
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                autoComplete="new-password"
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </PasswordToggle>
            </PasswordWrapper>
          </FormGroup>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Création...' : 'Créer mon compte'}
          </SubmitButton>
        </Form>

        <Divider>
          <span>ou continuer avec</span>
        </Divider>

        <OAuthButtons>
          <OAuthButton
            type="button"
            onClick={() => handleOAuthSignup('google')}
            disabled={loading}
            $provider="google"
          >
            <FaGoogle /> Google
          </OAuthButton>
          <OAuthButton
            type="button"
            onClick={() => handleOAuthSignup('github')}
            disabled={loading}
            $provider="github"
          >
            <FaGithub /> GitHub
          </OAuthButton>
        </OAuthButtons>

        <Footer>
          Vous avez déjà un compte ?{' '}
          <Link to="/login">Se connecter</Link>
        </Footer>

        <Terms>
          En créant un compte, vous acceptez nos{' '}
          <Link to="/terms">Conditions d'utilisation</Link> et notre{' '}
          <Link to="/privacy">Politique de confidentialité</Link>.
        </Terms>
      </SignupCard>
    </PageContainer>
  )
}

// Styled Components (réutilisation et ajouts)
const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8fafc;
  padding: 20px;
`

const SignupCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 48px 40px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`

const SuccessCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 64px 48px;
  text-align: center;
  max-width: 400px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background-color: #16a34a;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
`

const SuccessTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 12px;
`

const SuccessMessage = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin: 0;
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

const PasswordHint = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-top: 4px;
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
  margin-bottom: 16px;

  a {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`

const Terms = styled.div`
  text-align: center;
  font-size: 12px;
  color: #9ca3af;
  line-height: 1.5;

  a {
    color: #667eea;
    text-decoration: none;

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

export default SupabaseSignupPage
