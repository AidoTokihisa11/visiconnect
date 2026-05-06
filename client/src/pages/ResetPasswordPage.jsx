import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff, Hash, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react'
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
  line-height: 1.5;
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

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  display: flex;
  padding: 4px;

  &:hover { color: #475569; }
`

const PasswordHints = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-top: 0.25rem;
`

const Hint = styled.span`
  font-size: 0.8rem;
  color: ${({ $met }) => ($met ? '#16a34a' : '#94a3b8')};
  display: flex;
  align-items: center;
  gap: 0.35rem;
  transition: color 0.2s;

  &::before {
    content: '${({ $met }) => ($met ? '✓' : '·')}';
    font-weight: 700;
  }
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
  margin-bottom: 1.5rem;
`

const SuccessMessage = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  padding: 2rem;
`

const SuccessIcon = styled.div`
  width: 64px;
  height: 64px;
  background: #f0fdf4;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #22c55e;
`

const SuccessTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
`

const SuccessText = styled.p`
  font-size: 0.95rem;
  color: #64748b;
  line-height: 1.5;
`

const EmailInfo = styled.div`
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 0.85rem;
  color: #1e40af;
  margin-bottom: 0.5rem;
`

export default function ResetPasswordPage() {
  const { t } = useTranslation()
  const { confirmPasswordReset } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const emailFromState = location.state?.email || ''

  const [form, setForm] = useState({ code: '', password: '', confirm: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const passwordChecks = {
    length: form.password.length >= 8,
    upper: /[A-Z]/.test(form.password),
    number: /[0-9]/.test(form.password),
    special: /[^A-Za-z0-9]/.test(form.password),
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.password !== form.confirm) {
      setError(t('resetPassword.passwordMismatch', 'Les mots de passe ne correspondent pas.'))
      return
    }

    if (!Object.values(passwordChecks).every(Boolean)) {
      setError(t('resetPassword.passwordWeak', 'Le mot de passe ne respecte pas tous les critères.'))
      return
    }

    setLoading(true)
    setError('')

    const { error: resetError } = await confirmPasswordReset(form.code, form.password)

    if (resetError) {
      setError(resetError.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
    setTimeout(() => navigate('/login'), 3000)
  }

  return (
    <PageWrapper>
      <LeftPanel>
        <BackLink to="/forgot-password">
          <ArrowLeft size={18} /> {t('resetPassword.back', 'Retour')}
        </BackLink>

        <FormContainer
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          {success ? (
            <SuccessMessage
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <SuccessIcon>
                <CheckCircle2 size={32} />
              </SuccessIcon>
              <SuccessTitle>{t('resetPassword.successTitle', 'Mot de passe réinitialisé !')}</SuccessTitle>
              <SuccessText>
                {t('resetPassword.successText', 'Votre mot de passe a été mis à jour avec succès. Vous allez être redirigé vers la page de connexion...')}
              </SuccessText>
            </SuccessMessage>
          ) : (
            <>
              <Header>
                <Logo>VisiConnect</Logo>
                <Title>{t('resetPassword.title', 'Nouveau mot de passe')}</Title>
                <Subtitle>
                  {t('resetPassword.subtitle', 'Entrez le code reçu par email et choisissez un nouveau mot de passe.')}
                </Subtitle>
              </Header>

              {emailFromState && (
                <EmailInfo>
                  Code envoyé à <strong>{emailFromState}</strong>
                </EmailInfo>
              )}

              {error && (
                <ErrorMessage
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{error}</span>
                </ErrorMessage>
              )}

              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="code">{t('resetPassword.codeLabel', 'Code de vérification')}</Label>
                  <InputWrapper>
                    <IconWrapper><Hash size={18} /></IconWrapper>
                    <Input
                      type="text"
                      id="code"
                      name="code"
                      value={form.code}
                      onChange={handleChange}
                      placeholder={t('resetPassword.codePlaceholder', 'Ex: 123456')}
                      required
                      autoFocus
                      autoComplete="one-time-code"
                      inputMode="numeric"
                      maxLength={8}
                    />
                  </InputWrapper>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="password">{t('resetPassword.newPassword', 'Nouveau mot de passe')}</Label>
                  <InputWrapper>
                    <IconWrapper><Lock size={18} /></IconWrapper>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      autoComplete="new-password"
                    />
                    <PasswordToggle type="button" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </PasswordToggle>
                  </InputWrapper>
                  {form.password && (
                    <PasswordHints>
                      <Hint $met={passwordChecks.length}>{t('resetPassword.hint.length', '8 caractères minimum')}</Hint>
                      <Hint $met={passwordChecks.upper}>{t('resetPassword.hint.upper', 'Une majuscule')}</Hint>
                      <Hint $met={passwordChecks.number}>{t('resetPassword.hint.number', 'Un chiffre')}</Hint>
                      <Hint $met={passwordChecks.special}>{t('resetPassword.hint.special', 'Un caractère spécial')}</Hint>
                    </PasswordHints>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="confirm">{t('resetPassword.confirmPassword', 'Confirmer le mot de passe')}</Label>
                  <InputWrapper>
                    <IconWrapper><Lock size={18} /></IconWrapper>
                    <Input
                      type={showConfirm ? 'text' : 'password'}
                      id="confirm"
                      name="confirm"
                      value={form.confirm}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      autoComplete="new-password"
                    />
                    <PasswordToggle type="button" onClick={() => setShowConfirm(!showConfirm)}>
                      {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </PasswordToggle>
                  </InputWrapper>
                </FormGroup>

                <SubmitButton
                  type="submit"
                  disabled={loading}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading
                    ? t('resetPassword.loading', 'Réinitialisation...')
                    : t('resetPassword.submit', 'Réinitialiser le mot de passe')}
                </SubmitButton>
              </Form>
            </>
          )}
        </FormContainer>
      </LeftPanel>
      <AuthRightPanel />
    </PageWrapper>
  )
}
