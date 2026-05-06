import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Mail, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useTranslation } from '../hooks/useTranslation'
import AuthRightPanel from '../components/AuthRightPanel'

const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: white;
  flex-direction: column-reverse;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`

const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  overflow-y: auto;

  &::-webkit-scrollbar { display: none; }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (min-width: 1024px) {
    padding: 2rem 4rem;
  }
`

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;
  margin-bottom: 2rem;

  &:hover { color: #0f172a; }
`

const FormContainer = styled(motion.div)`
  width: 100%;
  max-width: 400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Header = styled.div`
  margin-bottom: 2.5rem;
`

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: #2563eb;
  margin-bottom: 1.5rem;
`

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.5rem;
`

const Subtitle = styled.p`
  font-size: 1rem;
  color: #64748b;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #334155;
`

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const IconWrapper = styled.div`
  position: absolute;
  left: 1rem;
  color: #94a3b8;
  display: flex;
`

const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: #0f172a;
  background: #f8fafc;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #2563eb;
    background: white;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &::placeholder { color: #94a3b8; }
`

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 0.875rem;
  background: #0f172a;
  color: white;
  border: 1px solid #0f172a;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 0.5rem;

  &:hover:not(:disabled) {
    background: white;
    color: #0f172a;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const ErrorMessage = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  background: #fef2f2;
  border-left: 4px solid #ef4444;
  color: #b91c1c;
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  line-height: 1.4;
`

const SuccessMessage = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  background: #f0fdf4;
  border-left: 4px solid #22c55e;
  color: #15803d;
  padding: 1.25rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  line-height: 1.5;
`

const FooterLink = styled.div`
  text-align: center;
  color: #64748b;
  font-size: 0.95rem;
  margin-top: 1.5rem;

  a {
    color: #0f172a;
    text-decoration: none;
    font-weight: 600;
    margin-left: 0.25rem;

    &:hover { text-decoration: underline; }
  }
`

export default function ForgotPasswordPage() {
  const { t } = useTranslation()
  const { requestPasswordReset } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: resetError } = await requestPasswordReset(email)

    if (resetError) {
      setError(resetError.message)
      setLoading(false)
      return
    }

    setSent(true)
    setLoading(false)
    // Redirige vers la page de réinitialisation en passant l'email
    setTimeout(() => {
      navigate('/reset-password', { state: { email } })
    }, 2000)
  }

  return (
    <PageWrapper>
      <LeftPanel>
        <BackLink to="/login">
          <ArrowLeft size={18} /> {t('forgotPassword.backToLogin', 'Retour à la connexion')}
        </BackLink>

        <FormContainer
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Header>
            <Logo>VisioConnect</Logo>
            <Title>{t('auth.forgotPassword.title', 'Mot de passe oublié')}</Title>
            <Subtitle>{t('auth.forgotPassword.subtitle', 'Entrez votre email pour recevoir un code de réinitialisation.')}</Subtitle>
          </Header>

          {error && (
            <ErrorMessage
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              style={{ marginBottom: '1.5rem' }}
            >
              <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>{error}</span>
            </ErrorMessage>
          )}

          {sent ? (
            <SuccessMessage
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <CheckCircle2 size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>{t('auth.forgotPassword.emailSentTitle', 'Email envoyé !')}</strong>
                <br />
                {t('auth.forgotPassword.emailSentText', 'Un code de réinitialisation a été envoyé à')} <strong>{email}</strong>.{' '}
                {t('auth.forgotPassword.redirecting', 'Redirection en cours...')}
              </div>
            </SuccessMessage>
          ) : (
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="email">{t('auth.forgotPassword.emailLabel', 'Adresse email')}</Label>
                <InputWrapper>
                  <IconWrapper><Mail size={18} /></IconWrapper>
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError('') }}
                    placeholder={t('auth.forgotPassword.emailPlaceholder', 'votre@email.com')}
                    required
                    autoComplete="email"
                    autoFocus
                  />
                </InputWrapper>
              </FormGroup>

              <SubmitButton
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.98 }}
              >
                {loading
                  ? t('auth.forgotPassword.sending', 'Envoi en cours...')
                  : t('auth.forgotPassword.sendCode', 'Envoyer le code')}
              </SubmitButton>
            </Form>
          )}

          <FooterLink>
            {t('auth.forgotPassword.rememberedPassword', 'Vous vous souvenez de votre mot de passe ?')}
            <Link to="/login">{t('auth.forgotPassword.backToLogin', 'Se connecter')}</Link>
          </FooterLink>
        </FormContainer>
      </LeftPanel>
      <AuthRightPanel />
    </PageWrapper>
  )
}
