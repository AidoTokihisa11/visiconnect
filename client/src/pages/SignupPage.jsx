import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { FaGoogle, FaGithub } from 'react-icons/fa'
import { Check, X, Mail, Lock, User, Eye, EyeOff, AlertCircle, ArrowRight } from 'lucide-react';

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
  right: -10%;
  width: 50vw;
  height: 50vw;
  background: radial-gradient(circle, rgba(37,99,235,0.05) 0%, rgba(248,250,252,0) 70%);
  border-radius: 50%;
  z-index: 0;
  pointer-events: none;
`

const SignupCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  padding: 48px 40px;
  width: 100%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 20px 40px -10px rgba(37, 99, 235, 0.1);
`

const SuccessCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  padding: 64px 48px;
  text-align: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 20px 40px -10px rgba(22, 163, 74, 0.1);
  max-width: 450px;
`

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  box-shadow: 0 10px 25px -5px rgba(22, 163, 74, 0.4);
`

const SuccessTitle = styled.h2`
  font-size: 26px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 12px;
`

const SuccessMessage = styled.p`
  font-size: 16px;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
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
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  border-radius: 6px;

  &:hover {
    color: #475569;
    background: #f1f5f9;
  }
`

const PasswordStrengthContainer = styled(motion.div)`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #f8fafc;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #f1f5f9;
`

const StrengthBar = styled.div`
  height: 6px;
  width: 100%;
  background-color: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
`

const StrengthFill = styled.div`
  height: 100%;
  width: ${props => props.$percentage}%;
  background-color: ${props => props.$color};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`

const RequirementsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`

const RequirementItem = styled.li`
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${props => props.$met ? '#16a34a' : '#64748b'};
  transition: color 0.2s;
  font-weight: 500;

  svg {
    color: ${props => props.$met ? '#16a34a' : '#cbd5e1'};
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
  margin-bottom: 16px;

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

const Terms = styled.div`
  text-align: center;
  font-size: 12px;
  color: #94a3b8;
  line-height: 1.6;

  a {
    color: #1e293b;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #2563eb;
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

const OTPInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 20px 0;
`

const OTPInput = styled.input`
  width: 100%;
  max-width: 250px;
  font-size: 28px;
  letter-spacing: 0.5em;
  text-align: center;
  padding: 16px 8px 16px 24px;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
  background: #f8fafc;
  color: #0f172a;
  font-weight: 700;
  transition: all 0.3s ease;
  line-height: normal;

  &::placeholder {
    color: #cbd5e1;
    letter-spacing: 0.5em;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    background: #ffffff;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  }
`

const IconCircle = styled.div`
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, rgba(59,130,246,0.1), rgba(147,51,234,0.1));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px auto;
  color: #3b82f6;
`


const SignupPage = () => {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()
  React.useEffect(() => {
    if (isLoggedIn) navigate("/")
  }, [isLoggedIn, navigate])
  const { signUp, signInWithProvider, verifyEmailCode, error: authError } = useAuth()

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
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')

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

    // Validation stricte du mot de passe selon la politique Supabase
    if (formData.password.length < 15) {
      setError('Le mot de passe doit contenir au moins 15 caractères')
      return false
    }
    if (!/[a-z]/.test(formData.password)) {
      setError('Le mot de passe doit contenir au moins une lettre minuscule')
      return false
    }
    if (!/[A-Z]/.test(formData.password)) {
      setError('Le mot de passe doit contenir au moins une lettre majuscule')
      return false
    }
    if (!/[0-9]/.test(formData.password)) {
      setError('Le mot de passe doit contenir au moins un chiffre')
      return false
    }
    if (!/[!@#$%^&*()_+\-=[\]{};':"|<>?,./`~]/.test(formData.password)) {
      setError('Le mot de passe doit contenir au moins un caractère spécial')
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
          firstName: formData.displayName || formData.email.split('@')[0],
          lastName: ""
        }
      )

      if (signUpError) {
        setError(signUpError.message)
        return
      }

      if (data?.requiresVerification) {
        setPendingVerification(true)
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

  const handleVerify = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error: verifyError } = await verifyEmailCode(code)

      if (verifyError) {
        setError(verifyError.message || "Code invalide.")
        return
      }

      if (data?.user) {
        setSuccess(true)
        setTimeout(() => {
          navigate('/')
        }, 2000)
      }
    } catch (err) {
      setError(err.message || 'Erreur lors de la vérification')
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

  const getPasswordStrength = (password) => {
    const reqs = [
      { id: 'length', label: '15+ caractères', met: password.length >= 15 },
      { id: 'uppercase', label: 'Majuscule', met: /[A-Z]/.test(password) },
      { id: 'lowercase', label: 'Minuscule', met: /[a-z]/.test(password) },
      { id: 'number', label: 'Chiffre', met: /[0-9]/.test(password) },
      { id: 'special', label: 'Symbole', met: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(password) }
    ];

    const metCount = reqs.filter(r => r.met).length;
    const percentage = password.length === 0 ? 0 : (metCount / reqs.length) * 100;
    
    let color = '#ef4444'; // red
    if (metCount === reqs.length) color = '#10b981'; // green
    else if (metCount >= 3) color = '#f59e0b'; // yellow

    return { reqs, percentage, color };
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

  if (success) {
    return (
      <PageContainer>
        <BgDecoration />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          style={{ zIndex: 1 }}
        >
          <SuccessCard>
            <SuccessIcon>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
              >
                <Check size={40} strokeWidth={3} />
              </motion.div>
            </SuccessIcon>
            <SuccessTitle>Bienvenue sur VisioConnect !</SuccessTitle>
            <SuccessMessage>
              Votre compte a été créé avec succès. Nous préparons votre espace...
            </SuccessMessage>
          </SuccessCard>
        </motion.div>
      </PageContainer>
    )
  }

  if (pendingVerification) {
    return (
      <PageContainer>
        <BgDecoration />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ width: '100%', maxWidth: '450px', zIndex: 1 }}
        >
          <SignupCard>
            <Header style={{ textAlign: 'center' }}>
              <motion.div variants={itemVariants}>
                <IconCircle>
                  <Mail size={32} strokeWidth={2} />
                </IconCircle>
                <Title>Vérifiez votre email</Title>
                <Subtitle style={{ marginTop: '12px', lineHeight: '1.5' }}>
                  Nous avons envoyé un code de sécurité à 6 chiffres à<br/>
                  <strong style={{ color: '#0f172a' }}>{formData.email}</strong>
                </Subtitle>
              </motion.div>
            </Header>
            <Form onSubmit={handleVerify}>
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <ErrorMessage>
                      <AlertCircle size={18} />
                      <span>{error}</span>
                    </ErrorMessage>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div variants={itemVariants}>
                <FormGroup style={{ textAlign: 'center' }}>
                  <Label htmlFor="code" style={{ marginBottom: '8px', display: 'block' }}>Code de sécurité</Label>
                  <OTPInputWrapper>
                    <OTPInput
                      type="text"
                      id="code"
                      value={code}
                      onChange={(e) => {
                        // S'assurer qu'on ne garde que des chiffres et maximum 6
                        const val = e.target.value.replace(/\D/g, '').slice(0, 6)
                        setCode(val)
                      }}
                      placeholder="000000"
                      required
                      autoComplete="one-time-code"
                      maxLength={6}
                    />
                  </OTPInputWrapper>
                </FormGroup>
              </motion.div>

              <motion.div variants={itemVariants}>
                <SubmitButton
                  type="submit"
                  disabled={loading || code.length < 6}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? 'Vérification en cours...' : 'Confirmer et continuer'}
                  {!loading && <ArrowRight size={18} style={{ marginLeft: '8px' }} />}
                </SubmitButton>
              </motion.div>
            </Form>
          </SignupCard>
        </motion.div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <BgDecoration />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ width: '100%', maxWidth: '500px', zIndex: 1 }}
      >
        <SignupCard>
          <Header>
            <motion.div variants={itemVariants}>
              <Logo>VisioConnect</Logo>
              <Title>Créer un compte</Title>
              <Subtitle>Rejoignez-nous pour des réunions incroyables</Subtitle>
            </motion.div>
          </Header>

          <Form onSubmit={handleSubmit}>
            <AnimatePresence>
              {(error || authError) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <ErrorMessage>
                    <AlertCircle size={18} />
                    <span>{error || authError}</span>
                  </ErrorMessage>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={itemVariants}>
              <FormGroup>
                <Label htmlFor="displayName">
                  Nom d'affichage (optionnel)
                </Label>
                <InputWrapper>
                  <IconWrapper><User size={18} /></IconWrapper>
                  <Input
                    type="text"
                    id="displayName"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    autoComplete="name"
                  />
                </InputWrapper>
              </FormGroup>
            </motion.div>

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
                    value={formData.email}
                    onChange={handleChange}
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
                </InputWrapper>
                
                {formData.password && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <PasswordStrengthContainer>
                      <StrengthBar>
                        <StrengthFill 
                          $percentage={getPasswordStrength(formData.password).percentage} 
                          $color={getPasswordStrength(formData.password).color} 
                        />
                      </StrengthBar>
                      <RequirementsList>
                        {getPasswordStrength(formData.password).reqs.map(req => (
                          <RequirementItem key={req.id} $met={req.met}>
                            {req.met ? <Check size={14} /> : <X size={14} />}
                            {req.label}
                          </RequirementItem>
                        ))}
                      </RequirementsList>
                    </PasswordStrengthContainer>
                  </motion.div>
                )}
              </FormGroup>
            </motion.div>

            <motion.div variants={itemVariants}>
              <FormGroup>
                <Label htmlFor="confirmPassword">
                  Confirmer le mot de passe
                </Label>
                <InputWrapper>
                  <IconWrapper><Lock size={18} /></IconWrapper>
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
                </InputWrapper>
              </FormGroup>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SubmitButton 
                type="submit" 
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? 'Création en cours...' : 'Créer mon compte'}
              </SubmitButton>
            </motion.div>
          </Form>

          <motion.div variants={itemVariants}>
            <Divider>
              <span>ou continuer avec</span>
            </Divider>

            <OAuthButtons>
              <OAuthButton
                type="button"
                onClick={() => handleOAuthSignup('google')}
                disabled={loading}
                $provider="google"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaGoogle /> Google
              </OAuthButton>
              <OAuthButton
                type="button"
                onClick={() => handleOAuthSignup('github')}
                disabled={loading}
                $provider="github"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
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
          </motion.div>
        </SignupCard>
      </motion.div>
    </PageContainer>
  )
}



export default SignupPage;
