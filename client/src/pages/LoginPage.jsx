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
  Loader2,
  Video,
  ShieldCheck,
  Sparkles,
  Users,
  Globe2,
} from 'lucide-react';

import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from '../hooks/useTranslation';
import HeaderClean from '../components/HeaderClean';
import SEO from '../components/SEO';

/* ------------------------------------------------------------------ */
/*  Split-screen SaaS auth : formulaire à gauche, panneau brand à droite.
    Toutes les couleurs passent par les variables HSL de index.css.    */
/* ------------------------------------------------------------------ */

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  font-family:
    'Inter',
    system-ui,
    -apple-system,
    sans-serif;
`;

const Main = styled.main`
  flex: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  min-height: calc(100vh - 72px);

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const FormSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem 1.5rem 2rem;
  position: relative;
`;

const FormInner = styled(motion.div)`
  width: 100%;
  max-width: 420px;
`;

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin-bottom: 2rem;
`;

const LogoBadge = styled.div`
  width: 34px;
  height: 34px;
  background-color: hsl(var(--primary));
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: hsl(var(--primary-foreground));
`;

const LogoText = styled.span`
  font-size: 1.0625rem;
  font-weight: 700;
  color: hsl(var(--foreground));
  letter-spacing: -0.02em;
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: hsl(var(--foreground));
  letter-spacing: -0.025em;
  line-height: 1.15;
  margin: 0 0 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 0.9375rem;
  color: hsl(var(--muted-foreground));
  margin: 0 0 2rem;
  line-height: 1.5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const LabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.label`
  font-size: 0.8125rem;
  font-weight: 600;
  color: hsl(var(--foreground));
`;

const ForgotLink = styled(Link)`
  font-size: 0.8125rem;
  font-weight: 500;
  color: hsl(var(--primary));
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 0.85rem;
  color: hsl(var(--muted-foreground));
  display: flex;
  pointer-events: none;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 0.9rem 0.75rem 2.55rem;
  border: 1px solid hsl(var(--border));
  border-radius: 8px;
  font-size: 0.9375rem;
  color: hsl(var(--foreground));
  background: hsl(var(--background));
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    background 0.15s ease;
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
  padding: 0.75rem 1rem;
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border: 1px solid hsl(var(--primary));
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.15s ease,
    transform 0.05s ease;
  margin-top: 0.5rem;
  font-family: inherit;

  &:hover:not(:disabled) {
    background: hsl(var(--primary) / 0.9);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
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
    font-size: 0.7rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
`;

const OAuthButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.625rem;
`;

const OAuthButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem;
  border: 1px solid hsl(var(--border));
  border-radius: 8px;
  background: hsl(var(--card));
  color: hsl(var(--foreground));
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;
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
  font-size: 0.875rem;

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

/* ---------------- Brand panel (right side) ---------------- */

const BrandSide = styled.div`
  position: relative;
  background: #0f172a;
  color: #ffffff;
  padding: 3.5rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: 1px solid #e2e8f0;

  @media (max-width: 960px) {
    display: none;
  }
`;

const BrandTop = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

const BrandLogo = styled.div`
  width: 34px;
  height: 34px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BrandName = styled.span`
  font-size: 1.0625rem;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

const BrandBody = styled.div`
  max-width: 460px;
`;

const BrandTagline = styled.h2`
  font-size: 1.875rem;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.025em;
  margin: 0 0 0.875rem;
  color: rgba(248, 250, 252, 0.95);
`;

const BrandLead = styled.p`
  font-size: 0.9375rem;
  line-height: 1.65;
  color: rgba(203, 213, 225, 0.75);
  margin: 0 0 2rem;
  max-width: 380px;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: rgba(226, 232, 240, 0.8);

  svg {
    color: #60a5fa;
    flex-shrink: 0;
    margin-top: 3px;
  }
`;

const BrandFootnote = styled.p`
  margin: 0;
  font-size: 0.75rem;
  color: rgba(148, 163, 184, 0.6);
  letter-spacing: 0.02em;
`;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const LoginPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    isLoggedIn,
    signIn,
    signInWithProvider,
    error: authError,
    loading: authLoading,
  } = useAuth();

  // Already-signed-in users land directly on the dashboard (US-AUTH-03).
  React.useEffect(() => {
    if (isLoggedIn) navigate('/account', { replace: true });
  }, [isLoggedIn, navigate]);

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(null);
  const [error, setError] = useState('');

  const syncCredentialsInput = (event) => {
    const { name, value } = event.target;
    setCredentials((previousCredentials) => ({
      ...previousCredentials,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading || oauthLoading) return; // Guard double-submit (US-AUTH-04).
    setLoading(true);
    setError('');

    try {
      const { data, error: signInError } = await signIn(credentials.email, credentials.password);

      if (signInError) {
        setError(signInError.message);
        return;
      }

      if (data?.user) {
        navigate('/account', { replace: true });
      }
    } catch (err) {
      setError(err.message || t('login.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider) => {
    if (loading || oauthLoading) return;
    if (authLoading) {
      setError(
        t(
          'login.authLoading',
          "Authentification en cours d'initialisation, réessayez dans une seconde."
        )
      );
      return;
    }
    try {
      setOauthLoading(provider);
      setError('');
      const { error: oauthError } = await signInWithProvider(provider);
      if (oauthError) {
        setError(oauthError.message);
      }
    } catch (err) {
      console.error('[LoginPage] OAuth error:', err);
      setError(err.message || t('login.error'));
    } finally {
      setOauthLoading(null);
    }
  };

  return (
    <>
      <SEO title="Connexion" description="Connectez-vous à VisioConnect." path="/login" noindex />
      <PageWrapper>
        <HeaderClean />

        <Main>
          <FormSide>
            <FormInner
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <LogoRow>
                <LogoBadge>
                  <Video size={19} strokeWidth={2.25} />
                </LogoBadge>
                <LogoText>VisioConnect</LogoText>
              </LogoRow>

              <Title>{t('login.title')}</Title>
              <Subtitle>{t('login.subtitle')}</Subtitle>

              {(error || authError) && (
                <ErrorMessage initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
                  <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '1px' }} />
                  <span>{error || authError}</span>
                </ErrorMessage>
              )}

              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="email">{t('login.email')}</Label>
                  <InputWrapper>
                    <InputIcon>
                      <Mail size={16} />
                    </InputIcon>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={credentials.email}
                      onChange={syncCredentialsInput}
                      placeholder={t('login.emailPlaceholder')}
                      required
                      autoComplete="email"
                    />
                  </InputWrapper>
                </FormGroup>

                <FormGroup>
                  <LabelRow>
                    <Label htmlFor="password">{t('login.password')}</Label>
                    <ForgotLink to="/forgot-password">{t('login.forgotPassword')}</ForgotLink>
                  </LabelRow>
                  <InputWrapper>
                    <InputIcon>
                      <Lock size={16} />
                    </InputIcon>
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
                      aria-label={
                        showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'
                      }
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </PasswordToggle>
                  </InputWrapper>
                </FormGroup>

                <SubmitButton
                  type="submit"
                  disabled={loading || !!oauthLoading}
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
                      <Loader2 size={16} className="animate-spin" /> {t('login.loading')}
                    </span>
                  ) : (
                    t('login.submit')
                  )}
                </SubmitButton>
              </Form>

              <Divider>
                <span>{t('login.orContinue')}</span>
              </Divider>

              <OAuthButtons>
                <OAuthButton
                  type="button"
                  onClick={() => handleOAuthLogin('google')}
                  disabled={loading || !!oauthLoading}
                  aria-busy={oauthLoading === 'google'}
                >
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
                <OAuthButton
                  type="button"
                  onClick={() => handleOAuthLogin('github')}
                  disabled={loading || !!oauthLoading}
                  aria-busy={oauthLoading === 'github'}
                >
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
                {t('login.noAccount')}
                <Link to="/signup">{t('login.createAccount')}</Link>
              </FooterLink>

              <LegalFootnote>
                © {new Date().getFullYear()} VisioConnect ·<Link to="/terms">Conditions</Link>·
                <Link to="/privacy">Confidentialité</Link>
              </LegalFootnote>
            </FormInner>
          </FormSide>

          <BrandSide>
            <BrandTop>
              <BrandLogo>
                <Video size={19} strokeWidth={2.25} />
              </BrandLogo>
              <BrandName>VisioConnect</BrandName>
            </BrandTop>

            <BrandBody>
              <BrandTagline>
                Un espace pour vos réunions,
                <br />
                sans le bruit autour.
              </BrandTagline>
              <BrandLead>
                VisioConnect regroupe la vidéo, le chat et le tableau blanc dans une interface
                simple — pour que la conversation reste au centre.
              </BrandLead>

              <FeatureList>
                <FeatureItem>
                  <ShieldCheck size={16} strokeWidth={2} />
                  Chiffrement de bout en bout, conforme RGPD.
                </FeatureItem>
                <FeatureItem>
                  <Sparkles size={16} strokeWidth={2} />
                  Résumés et transcription assistés par IA, à la demande.
                </FeatureItem>
                <FeatureItem>
                  <Users size={16} strokeWidth={2} />
                  Sous-groupes, sondages et tableau blanc partagé.
                </FeatureItem>
                <FeatureItem>
                  <Globe2 size={16} strokeWidth={2} />
                  Disponible en français, anglais, espagnol et allemand.
                </FeatureItem>
              </FeatureList>
            </BrandBody>

            <BrandFootnote>Projet indépendant · Fait avec soin.</BrandFootnote>
          </BrandSide>
        </Main>
      </PageWrapper>
    </>
  );
};

export default LoginPage;
