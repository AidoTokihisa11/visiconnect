import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { FaGoogle, FaGithub } from 'react-icons/fa'
import { Check, X, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';
import { AuthRightPanel } from '../components/AuthRightPanel';

const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #ffffff;
`

const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
`

const BackLink = styled(Link)`
  position: absolute;
  top: 2rem;
  left: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.2s;

  &:hover {
    color: #2563eb;
  }
`

const FormContainer = styled(motion.div)`
  width: 100%;
  max-width: 440px;
`

const Header = styled.div`
  margin-bottom: 2.5rem;
`

const Logo = styled.h1`
  font-size: 28px;
  color: #2563eb;
  font-weight: 800;
  letter-spacing: -0.5px;
  margin-bottom: 0.5rem;
`

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.5rem;
  letter-spacing: -0.02em;
`

const Subtitle = styled.p`
  font-size: 1rem;
  color: #64748b;
  margin: 0;
`

const Form = styled.form`
  margin-bottom: 1.5rem;
`

const FormGroup = styled.div`
  margin-bottom: 1.25rem;
`

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 0.5rem;
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
  align-items: center;
`

const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.75rem;
  font-size: 1rem;
  color: #0f172a;
  background: #f8fafc;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    background: white;
    border-color: #3b82f6;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
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
  padding: 0;
  display: flex;
  align-items: center;
  transition: color 0.2s;

  &:hover {
    color: #475569;
  }
`

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 0.875rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
  transition: background 0.2s;
  margin-top: 1rem;

  &:hover:not(:disabled) {
    background: #1d4ed8;
  }

  &:disabled {
    opacity: 0.7;
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
  border-radius: 0.75rem;
  background: white;
  color: #475569;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

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
    color: #2563eb;
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
  border: 2px solid ${props => props.$active ? '#3b82f6' : props.$filled ? '#94a3b8' : '#e2e8f0'};
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  background: ${props => props.$active ? '#eff6ff' : 'white'};
  box-shadow: ${props => props.$active ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : 'none'};
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
  background: #10b981;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.4);
`

const SignupPage = () => {
  const navigate = useNavigate()
  const { isLoggedIn, signUp, signInWithGoogle, signInWithGithub, verifyEmailCode } = useAuth()
  
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState("")

  const criteria = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[^A-Za-z0-9]/.test(formData.password)
  }

  React.useEffect(() => {
    if (isLoggedIn && !pendingVerification) {
      navigate('/dashboard')
    }
  }, [isLoggedIn, pendingVerification, navigate])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs')
      return
    }
    const allCriteriaMet = Object.values(criteria).every(Boolean)
    if (!allCriteriaMet) {
       setError('Le mot de passe ne respecte pas tous les critères de sécurité')
       return
    }

    setLoading(true)
    setError('')

    const result = await signUp(formData.email, formData.password)
    
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
                <Logo>VisioConnect</Logo>
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
                      value={formData.email}
                      onChange={handleChange}
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
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <PasswordToggle type="button" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </PasswordToggle>
                  </InputWrapper>

                  {formData.password.length > 0 && (
                    <PasswordCriteria>
                      <Criterion $met={criteria.length}>
                        {criteria.length ? <Check /> : <X />} 8 caractères min
                      </Criterion>
                      <Criterion $met={criteria.uppercase}>
                        {criteria.uppercase ? <Check /> : <X />} 1 Majuscule
                      </Criterion>
                      <Criterion $met={criteria.number}>
                        {criteria.number ? <Check /> : <X />} 1 Chiffre
                      </Criterion>
                      <Criterion $met={criteria.special}>
                        {criteria.special ? <Check /> : <X />} 1 Caractère spécial
                      </Criterion>
                    </PasswordCriteria>
                  )}
                </FormGroup>

                <SubmitButton
                  type="submit"
                  disabled={loading || (formData.password.length > 0 && !Object.values(criteria).every(Boolean))}
                  whileHover={{ scale: 1.01 }}
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
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaGoogle color="#ea4335" /> Google
                </OAuthButton>
                <OAuthButton
                  type="button"
                  disabled={loading}
                  onClick={() => handleOAuth('github')}
                  whileHover={{ scale: 1.02 }}
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
                  <strong style={{ color: '#0f172a' }}>{formData.email}</strong>
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
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? 'Vérification...' : 'Valider le code'}
                  </SubmitButton>
                </Form>
                <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#64748b' }}>
                  L'inscription semble bloquée après validation ? Vérifiez que le "First and Last Name" soit désactivé ou optionnel dans votre interface de gestion Clerk.
                </p>
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
