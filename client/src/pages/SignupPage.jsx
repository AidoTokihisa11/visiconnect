import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { FaGoogle, FaGithub } from 'react-icons/fa'
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowLeft, Check, X } from 'lucide-react'
import AuthRightPanel from '../components/AuthRightPanel'

const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: white;
  flex-direction: column-reverse; /* Put form at top, visual below on mobile */

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

  &::-webkit-scrollbar {
    display: none;
  }
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

  &:hover {
    color: #0f172a;
  }
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

  &::placeholder {
    color: #94a3b8;
  }
`

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  display: flex;
  padding: 0;

  &:hover {
    color: #475569;
  }
`

/* Simple, sober, professional style (removed shadows/3D) */
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

const PasswordCriteria = styled.div`
  margin-top: 0.75rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`

const Criterion = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 500;
  color: ${props => props.$met ? '#10b981' : '#94a3b8'};
  transition: color 0.2s;

  svg {
    margin-right: 6px;
    font-size: 12px;
  }
`

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1.5rem 0;

  &::before, &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #e2e8f0;
  }

  span {
    padding: 0 1rem;
    color: #64748b;
    font-size: 0.85rem;
    font-weight: 500;
    text-transform: uppercase;
  }
`

const OAuthButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
`

const OAuthButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background: white;
  color: #475569;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #f8fafc;
    border-color: #cbd5e1;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const FooterLink = styled.div`
  text-align: center;
  color: #64748b;
  font-size: 0.95rem;

  a {
    color: #0f172a;
    text-decoration: none;
    font-weight: 600;
    margin-left: 0.25rem;

    &:hover {
      text-decoration: underline;
    }
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
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  line-height: 1.4;
`

// Verification Layout Elements
const VerifyContainer = styled.div`
  text-align: center;
`

const OTPGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin: 2rem 0;
  position: relative;
`

const OTPChar = styled.div`
  width: 45px;
  height: 55px;
  border: 1px solid ${props => props.$active ? '#0f172a' : props.$filled ? '#cbd5e1' : '#e2e8f0'};
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: #0f172a;
  background: ${props => props.$active ? '#f8fafc' : 'white'};
  box-shadow: ${props => props.$active ? '0 0 0 2px rgba(15, 23, 42, 0.1)' : 'none'};
  transition: all 0.2s;
`

const HiddenInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`

const SuccessIconBox = styled.div`
  width: 64px;
  height: 64px;
  background: #0f172a;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
`

const SignupPage = () => {
  const navigate = useNavigate()
  const { isLoggedIn, signUp, signInWithGoogle, signInWithGithub, verifyEmailCode } = useAuth()

  const [registrationForm, setRegistrationForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')

  const passwordRules = {
    length: registrationForm.password.length >= 8,
    uppercase: /[A-Z]/.test(registrationForm.password),
    number: /[0-9]/.test(registrationForm.password),
    special: /[^A-Za-z0-9]/.test(registrationForm.password)
  }

  React.useEffect(() => {
    if (isLoggedIn && !pendingVerification) {
      navigate('/dashboard')
    }
  }, [isLoggedIn, pendingVerification, navigate])

  const syncRegistrationInput = (event) => {
    const { name, value } = event.target
    setRegistrationForm((previousForm) => ({ ...previousForm, [name]: value }))
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!registrationForm.email || !registrationForm.password) {
      setError('Veuillez remplir tous les champs')
      return
    }
    const allPasswordRulesPassed = Object.values(passwordRules).every(Boolean)
    if (!allPasswordRulesPassed) {
       setError('Le mot de passe ne respecte pas tous les critères de sécurité')
       return
    }

    setLoading(true)
    setError('')

    const result = await signUp(registrationForm.email, registrationForm.password)

    if (result.error) {
      setError(result.error.message || 'Erreur lors de la création')
      setLoading(false)
    } else if (result.data?.requiresVerification) {
      setPendingVerification(true)
      setLoading(false)
    }
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    if (code.length < 6) return

    setLoading(true)
    setError('')

    const result = await verifyEmailCode(code)

    if (result.error) {
      setError(result.error.message || 'Code invalide')
      setLoading(false)
    } else {
      navigate('/dashboard')
    }
  }

  const handleOAuth = async (provider) => {
    setLoading(true)
    setError('')
    const action = provider === 'google' ? signInWithGoogle : signInWithGithub
    const result = await action()
    if (result.error) {
      setError(result.error.message || `Erreur d'inscription avec ${provider}`)
      setLoading(false)
    }
  }

  return (
    <PageWrapper>
      <LeftPanel>
        <BackLink to="/">
          <ArrowLeft size={18} /> Retour à l'accueil
        </BackLink>

        <FormContainer
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          {error && (
            <ErrorMessage
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>{error}</span>
            </ErrorMessage>
          )}

          {!pendingVerification ? (
            <>
              <Header>
                <Logo>VisiConnect</Logo>
                <Title>Créer un compte</Title>
                <Subtitle>Rejoignez-nous et simplifiez vos réunions vidéo.</Subtitle>
              </Header>

              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label>Email professionnel</Label>
                  <InputWrapper>
                    <IconWrapper><Mail size={18} /></IconWrapper>
                    <Input
                      type="email"
                      name="email"
                      placeholder="nom@entreprise.com"
                      value={registrationForm.email}
                      onChange={syncRegistrationInput}
                      required
                    />
                  </InputWrapper>
                </FormGroup>

                <FormGroup>
                  <Label>Mot de passe</Label>
                  <InputWrapper>
                    <IconWrapper><Lock size={18} /></IconWrapper>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Créez un mot de passe fort"
                      value={registrationForm.password}
                      onChange={syncRegistrationInput}
                      required
                    />
                    <PasswordToggle type="button" onClick={() => setShowPassword(!showPassword)}>
                       {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </PasswordToggle>
                  </InputWrapper>

                  {registrationForm.password.length > 0 && (
                    <PasswordCriteria>
                      <Criterion $met={passwordRules.length}>
                        {passwordRules.length ? <Check size={14}/> : <X size={14}/>} 8 caractères min
                      </Criterion>
                      <Criterion $met={passwordRules.uppercase}>
                        {passwordRules.uppercase ? <Check size={14}/> : <X size={14}/>} 1 Majuscule
                      </Criterion>
                      <Criterion $met={passwordRules.number}>
                        {passwordRules.number ? <Check size={14}/> : <X size={14}/>} 1 Chiffre
                      </Criterion>
                      <Criterion $met={passwordRules.special}>
                        {passwordRules.special ? <Check size={14}/> : <X size={14}/>} 1 Caractère spécial
                      </Criterion>
                    </PasswordCriteria>
                  )}
                </FormGroup>

                <SubmitButton
                  type="submit"
                  disabled={loading || (registrationForm.password.length > 0 && !Object.values(passwordRules).every(Boolean))}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? 'Création en cours...' : 'Créer mon compte'}
                </SubmitButton>
              </Form>

              <Divider><span>Ou s'inscrire via</span></Divider>

              <OAuthButtons>
                <OAuthButton
                  type="button"
                  disabled={loading}
                  onClick={() => handleOAuth('google')}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaGoogle color="#ea4335" /> Google
                </OAuthButton>
                <OAuthButton
                  type="button"
                  disabled={loading}
                  onClick={() => handleOAuth('github')}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaGithub /> GitHub
                </OAuthButton>
              </OAuthButtons>

              <FooterLink>
                Déjà un compte ?
                <Link to="/login">Se connecter</Link>
              </FooterLink>
            </>
          ) : (
            <VerifyContainer>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <SuccessIconBox>
                  <Mail size={32} />
                </SuccessIconBox>
                <Title>Vérifiez votre email</Title>
                <Subtitle style={{ marginBottom: '1.5rem', lineHeight: '1.5' }}>
                  Nous avons envoyé un code à 6 chiffres à<br/>
                  <strong style={{ color: '#0f172a' }}>{registrationForm.email}</strong>
                </Subtitle>

                <Form onSubmit={handleVerify}>
                  <OTPGroup>
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <OTPChar
                        key={index}
                        $active={code.length === index}
                        $filled={code.length > index}
                      >
                        {code[index] || ""}
                      </OTPChar>
                    ))}
                    <HiddenInput
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={6}
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
                      autoFocus
                    />
                  </OTPGroup>

                  <SubmitButton
                    type="submit"
                    disabled={code.length !== 6 || loading}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? 'Vérification...' : 'Valider le code'}
                  </SubmitButton>
                </Form>
              </motion.div>
            </VerifyContainer>
          )}

        </FormContainer>
      </LeftPanel>

      <AuthRightPanel 
        title="L'innovation au service de la connexion."
        description="Créez des espaces de travail collaboratifs. Partagez, échangez et progressez ensemble, avec une fluidité exceptionnelle."
      />
    </PageWrapper>
  )
}

export default SignupPage
