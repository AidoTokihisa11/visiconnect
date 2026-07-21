import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Check,
  X,
  Video,
  Loader2,
} from 'lucide-react';

import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from '../hooks/useTranslation';
import HeaderClean from '../components/HeaderClean';

/* ------------------------------------------------------------------ */
/*  Design aligné sur LoginPage / HeaderClean / HomePageClean.         */
/*  Toutes les couleurs viennent des variables HSL de index.css        */
/*  (thème clair/sombre géré automatiquement).                         */
/* ------------------------------------------------------------------ */

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
`;

const Main = styled.main`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.25rem 2rem;
  overflow: hidden;
`;

const BackgroundGlow = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(
      60% 55% at 50% 0%,
      hsl(var(--primary) / 0.09) 0%,
      transparent 70%
    ),
    radial-gradient(
      45% 45% at 100% 100%,
      hsl(var(--primary) / 0.05) 0%,
      transparent 70%
    );
`;

const GridPattern = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.4;
  background-image:
    linear-gradient(hsl(var(--border) / 0.5) 1px, transparent 1px),
    linear-gradient(90deg, hsl(var(--border) / 0.5) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: radial-gradient(ellipse at center, black 0%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 75%);
`;

const Card = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 460px;
  background-color: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 14px;
  padding: 2.25rem 2rem;
  box-shadow:
    0 1px 2px rgb(0 0 0 / 0.04),
    0 12px 32px -12px rgb(15 23 42 / 0.15);

  @media (min-width: 640px) {
    padding: 2.5rem 2.5rem;
  }
`;

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 1.75rem;
`;

const LogoBadge = styled.div`
  width: 38px;
  height: 38px;
  background-color: hsl(var(--primary));
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: hsl(var(--primary-foreground));
`;

const LogoText = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  color: hsl(var(--foreground));
  letter-spacing: -0.02em;
`;

const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: 700;
  color: hsl(var(--foreground));
  letter-spacing: -0.02em;
  margin: 0 0 0.4rem;

  @media (min-width: 640px) {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled.p`
  font-size: 0.95rem;
  color: hsl(var(--muted-foreground));
  margin: 0 0 1.75rem;
  line-height: 1.5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  color: hsl(var(--foreground));
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 0.85rem;
  color: hsl(var(--muted-foreground));
  display: flex;
  pointer-events: none;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 0.9rem 0.8rem 2.6rem;
  border: 1px solid hsl(var(--border));
  border-radius: 8px;
  font-size: 0.95rem;
  color: hsl(var(--foreground));
  background: hsl(var(--background));
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
  font-family: inherit;

  &:hover:not(:focus) {
    border-color: hsl(var(--muted-foreground) / 0.4);
  }

  &:focus {
    outline: none;
    border-color: hsl(var(--primary));
    box-shadow: 0 0 0 3px hsl(var(--primary) / 0.15);
  }

  &::placeholder {
    color: hsl(var(--muted-foreground) / 0.75);
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  color: hsl(var(--muted-foreground));
  cursor: pointer;
  display: flex;
  padding: 4px;
  border-radius: 4px;

  &:hover {
    color: hsl(var(--foreground));
    background: hsl(var(--muted));
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 0.85rem 1rem;
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border: 1px solid hsl(var(--primary));
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease;
  margin-top: 0.4rem;
  font-family: inherit;

  &:hover:not(:disabled) {
    background: hsl(var(--primary) / 0.9);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

/* --- Force du mot de passe : version épurée, sans "glow" 3D --- */

const PasswordCriteria = styled.div`
  margin-top: 0.6rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.35rem 0.75rem;
`;

const StrengthRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 0.6rem;
`;

const StrengthBarWrapper = styled.div`
  display: flex;
  gap: 4px;
  flex: 1;
`;

const strengthColor = (strength) => {
  if (strength === 1) return 'hsl(0 84% 60%)';       // rouge
  if (strength === 2) return 'hsl(25 90% 55%)';      // orange
  if (strength === 3) return 'hsl(45 90% 50%)';      // jaune
  if (strength >= 4) return 'hsl(142 71% 40%)';      // vert
  return 'hsl(var(--muted))';
};

const StrengthSegment = styled.div`
  flex: 1;
  height: 4px;
  border-radius: 999px;
  background: ${({ $strength, $index }) =>
    $index < $strength ? strengthColor($strength) : 'hsl(var(--muted))'};
  transition: background 0.25s ease;
`;

const StrengthLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ $strength }) => strengthColor($strength)};
  min-width: 46px;
  text-align: right;
`;

const Criterion = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.78rem;
  font-weight: 500;
  color: ${(props) =>
    props.$met ? 'hsl(142 71% 40%)' : 'hsl(var(--muted-foreground))'};
  transition: color 0.2s;

  svg {
    margin-right: 5px;
    flex-shrink: 0;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1.5rem 0 1.1rem;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid hsl(var(--border));
  }

  span {
    padding: 0 0.85rem;
    color: hsl(var(--muted-foreground));
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
`;

const OAuthButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
`;

const OAuthButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.7rem;
  border: 1px solid hsl(var(--border));
  border-radius: 8px;
  background: hsl(var(--card));
  color: hsl(var(--foreground));
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;
  font-family: inherit;

  &:hover:not(:disabled) {
    background: hsl(var(--muted));
    border-color: hsl(var(--muted-foreground) / 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const FooterLink = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  color: hsl(var(--muted-foreground));
  font-size: 0.9rem;

  a {
    color: hsl(var(--primary));
    text-decoration: none;
    font-weight: 600;
    margin-left: 0.35rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  background: hsl(var(--destructive) / 0.08);
  border: 1px solid hsl(var(--destructive) / 0.3);
  color: hsl(var(--destructive));
  padding: 0.75rem 0.9rem;
  border-radius: 8px;
  margin-bottom: 1.25rem;
  font-size: 0.85rem;
  line-height: 1.45;
`;

const LegalFootnote = styled.p`
  position: relative;
  margin: 1.75rem 0 0;
  font-size: 0.75rem;
  color: hsl(var(--muted-foreground));
  text-align: center;

  a {
    color: hsl(var(--muted-foreground));
    text-decoration: none;
    margin: 0 0.25rem;

    &:hover {
      color: hsl(var(--foreground));
      text-decoration: underline;
    }
  }
`;

/* --- Écran de vérification email (OTP) --- */

const VerifyContainer = styled.div`
  text-align: center;
`;

const OTPGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin: 1.75rem 0;
  position: relative;
`;

const OTPChar = styled.div`
  width: 44px;
  height: 54px;
  border: 1px solid
    ${(props) =>
      props.$active
        ? 'hsl(var(--primary))'
        : props.$filled
          ? 'hsl(var(--muted-foreground) / 0.4)'
          : 'hsl(var(--border))'};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 600;
  color: hsl(var(--foreground));
  background: ${(props) =>
    props.$active ? 'hsl(var(--primary) / 0.05)' : 'hsl(var(--background))'};
  box-shadow: ${(props) =>
    props.$active ? '0 0 0 3px hsl(var(--primary) / 0.15)' : 'none'};
  transition: all 0.15s ease;
`;

const HiddenInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const SuccessIconBox = styled.div`
  width: 60px;
  height: 60px;
  background: hsl(var(--primary) / 0.1);
  color: hsl(var(--primary));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.25rem;
`;

const SignupPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, signUp, signInWithGoogle, signInWithGithub, verifyEmailCode } = useAuth();
  const { t } = useTranslation();

  const [registrationForm, setRegistrationForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(null);
  const [error, setError] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');

  const passwordRules = {
    length: registrationForm.password.length >= 8,
    uppercase: /[A-Z]/.test(registrationForm.password),
    number: /[0-9]/.test(registrationForm.password),
    special: /[^A-Za-z0-9]/.test(registrationForm.password),
  };

  React.useEffect(() => {
    if (isLoggedIn && !pendingVerification) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, pendingVerification, navigate]);

  const syncRegistrationInput = (event) => {
    const { name, value } = event.target;
    setRegistrationForm((previousForm) => ({ ...previousForm, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!registrationForm.email || !registrationForm.password) {
      setError(t('signup.errorFields'));
      return;
    }
    const allPasswordRulesPassed = Object.values(passwordRules).every(Boolean);
    if (!allPasswordRulesPassed) {
      setError(t('signup.errorPassword'));
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await signUp(registrationForm.email, registrationForm.password);

      if (result.error) {
        setError(result.error.message || t('signup.errorCreate'));
      } else if (result.data?.requiresVerification) {
        setPendingVerification(true);
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || t('signup.errorCreate'));
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (code.length < 6) return;

    setLoading(true);
    setError('');

    try {
      const result = await verifyEmailCode(code);

      if (result.error) {
        setError(result.error.message || t('signup.errorCode'));
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || t('signup.errorCode'));
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider) => {
    setLoading(true);
    setOauthLoading(provider);
    setError('');
    try {
      const action = provider === 'google' ? signInWithGoogle : signInWithGithub;
      const result = await action();
      if (result?.error) {
        setError(result.error.message || `Erreur d'inscription avec ${provider}`);
      }
    } catch (err) {
      setError(err.message || `Erreur d'inscription avec ${provider}`);
    } finally {
      setLoading(false);
      setOauthLoading(null);
    }
  };

  const strength = Object.values(passwordRules).filter(Boolean).length;
  const strengthLabels = ['', 'Faible', 'Moyen', 'Bien', 'Fort'];

  return (
    <PageWrapper>
      <HeaderClean />

      <Main>
        <BackgroundGlow />
        <GridPattern />

        <Card
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <LogoRow>
            <LogoBadge>
              <Video size={20} strokeWidth={2.25} />
            </LogoBadge>
            <LogoText>VisioConnect</LogoText>
          </LogoRow>

          {error && (
            <ErrorMessage
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '1px' }} />
              <span>{error}</span>
            </ErrorMessage>
          )}

          {!pendingVerification ? (
            <>
              <Title>{t('signup.title')}</Title>
              <Subtitle>{t('signup.subtitle')}</Subtitle>

              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="email">{t('signup.email')}</Label>
                  <InputWrapper>
                    <IconWrapper>
                      <Mail size={17} />
                    </IconWrapper>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder={t('signup.emailPlaceholder')}
                      value={registrationForm.email}
                      onChange={syncRegistrationInput}
                      required
                      autoComplete="email"
                    />
                  </InputWrapper>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="password">{t('signup.password')}</Label>
                  <InputWrapper>
                    <IconWrapper>
                      <Lock size={17} />
                    </IconWrapper>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      placeholder={t('signup.passwordPlaceholder')}
                      value={registrationForm.password}
                      onChange={syncRegistrationInput}
                      required
                      autoComplete="new-password"
                    />
                    <PasswordToggle
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'
                      }
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </PasswordToggle>
                  </InputWrapper>

                  {registrationForm.password.length > 0 && (
                    <>
                      <StrengthRow>
                        <StrengthBarWrapper>
                          {[0, 1, 2, 3].map((i) => (
                            <StrengthSegment key={i} $strength={strength} $index={i} />
                          ))}
                        </StrengthBarWrapper>
                        <StrengthLabel $strength={strength}>
                          {strengthLabels[strength]}
                        </StrengthLabel>
                      </StrengthRow>

                      <PasswordCriteria>
                        <Criterion $met={passwordRules.length}>
                          {passwordRules.length ? <Check size={13} /> : <X size={13} />}
                          {t('signup.criteria.length')}
                        </Criterion>
                        <Criterion $met={passwordRules.uppercase}>
                          {passwordRules.uppercase ? <Check size={13} /> : <X size={13} />}
                          {t('signup.criteria.uppercase')}
                        </Criterion>
                        <Criterion $met={passwordRules.number}>
                          {passwordRules.number ? <Check size={13} /> : <X size={13} />}
                          {t('signup.criteria.number')}
                        </Criterion>
                        <Criterion $met={passwordRules.special}>
                          {passwordRules.special ? <Check size={13} /> : <X size={13} />}
                          {t('signup.criteria.special')}
                        </Criterion>
                      </PasswordCriteria>
                    </>
                  )}
                </FormGroup>

                <SubmitButton
                  type="submit"
                  disabled={
                    loading ||
                    (registrationForm.password.length > 0 &&
                      !Object.values(passwordRules).every(Boolean))
                  }
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        justifyContent: 'center',
                      }}
                    >
                      <Loader2 size={16} className="animate-spin" /> {t('signup.loading')}
                    </span>
                  ) : (
                    t('signup.submit')
                  )}
                </SubmitButton>
              </Form>

              <Divider>
                <span>{t('signup.orSignupWith')}</span>
              </Divider>

              <OAuthButtons>
                <OAuthButton type="button" disabled={loading} onClick={() => handleOAuth('google')}>
                  {oauthLoading === 'google' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />{' '}
                      {t('auth.signingIn', 'Connexion...')}
                    </>
                  ) : (
                    <>
                      <FaGoogle color="#ea4335" /> Google
                    </>
                  )}
                </OAuthButton>
                <OAuthButton type="button" disabled={loading} onClick={() => handleOAuth('github')}>
                  {oauthLoading === 'github' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />{' '}
                      {t('auth.signingIn', 'Connexion...')}
                    </>
                  ) : (
                    <>
                      <FaGithub /> GitHub
                    </>
                  )}
                </OAuthButton>
              </OAuthButtons>

              <FooterLink>
                {t('signup.hasAccount')}
                <Link to="/login">{t('signup.login')}</Link>
              </FooterLink>
            </>
          ) : (
            <VerifyContainer>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                <SuccessIconBox>
                  <Mail size={28} />
                </SuccessIconBox>
                <Title>{t('signup.verifyTitle')}</Title>
                <Subtitle style={{ marginBottom: '0.5rem' }}>
                  {t('signup.verifySubtitle')}
                  <br />
                  <strong style={{ color: 'hsl(var(--foreground))' }}>
                    {registrationForm.email}
                  </strong>
                </Subtitle>

                <Form onSubmit={handleVerify}>
                  <OTPGroup>
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <OTPChar
                        key={index}
                        $active={code.length === index}
                        $filled={code.length > index}
                      >
                        {code[index] || ''}
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
                    {loading ? t('signup.verifying') : t('signup.validateCode')}
                  </SubmitButton>
                </Form>
              </motion.div>
            </VerifyContainer>
          )}
        </Card>

        <LegalFootnote>
          © {new Date().getFullYear()} VisioConnect ·
          <Link to="/terms">Conditions</Link>·
          <Link to="/privacy">Confidentialité</Link>
        </LegalFootnote>
      </Main>
    </PageWrapper>
  );
};

export default SignupPage;
