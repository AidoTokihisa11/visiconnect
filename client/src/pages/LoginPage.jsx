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
  width: 36px;
  height: 36px;
  background-color: hsl(var(--primary));
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: hsl(var(--primary-foreground));
  box-shadow: 0 4px 12px -4px hsl(var(--primary) / 0.4);
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
    transform 0.05s ease,
    box-shadow 0.15s ease;
  margin-top: 0.5rem;
  font-family: inherit;
  box-shadow: 0 2px 8px -2px hsl(var(--primary) / 0.4);

  &:hover:not(:disabled) {
    background: hsl(var(--primary) / 0.92);
    box-shadow: 0 4px 14px -4px hsl(var(--primary) / 0.55);
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
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #2563eb 100%);
  color: #ffffff;
  padding: 3.5rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  isolation: isolate;

  @media (max-width: 960px) {
    display: none;
  }
`;

const Glow = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background:
    radial-gradient(60% 45% at 90% 10%, rgba(96, 165, 250, 0.35) 0%, transparent 60%),
    radial-gradient(50% 40% at 10% 90%, rgba(37, 99, 235, 0.4) 0%, transparent 65%);
`;

const GridOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0.12;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.6) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.6) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse at center, black 0%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 75%);
`;

const BrandTop = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

const BrandLogo = styled.div`
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 9px;
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
  position: relative;
  z-index: 1;
  max-width: 460px;
`;

const BrandTagline = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.03em;
  margin: 0 0 1rem;

  em {
    font-style: normal;
    background: linear-gradient(90deg, #93c5fd, #ffffff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
`;

const BrandLead = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(226, 232, 240, 0.85);
  margin: 0 0 2rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.9375rem;
  color: rgba(241, 245, 249, 0.92);

  svg {
    color: #93c5fd;
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

const BrandBottom = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Stat = styled.div`
  strong {
    display: block;
    font-size: 1.375rem;
    font-weight: 700;
    letter-spacing: -0.02em;
  }
  span {
    display: block;
    font-size: 0.75rem;
    color: rgba(203, 213, 225, 0.7);
    letter-spacing: 0.02em;
    margin-top: 2px;
  }
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
          <Glow />
          <GridOverlay />

          <BrandTop>
            <BrandLogo>
              <Video size={19} strokeWidth={2.25} />
            </BrandLogo>
            <BrandName>VisioConnect</BrandName>
          </BrandTop>

          <BrandBody>
            <BrandTagline>
              Vos réunions,{' '}
              <em>
                plus fluides,
                <br />
                plus humaines.
              </em>
            </BrandTagline>
            <BrandLead>
              Rejoignez les équipes qui utilisent VisioConnect pour collaborer sans friction — vidéo
              HD, transcription IA, tableau blanc et sécurité de bout en bout.
            </BrandLead>

            <FeatureList>
              <FeatureItem>
                <ShieldCheck size={18} strokeWidth={2.25} />
                Chiffrement E2EE et conformité RGPD par défaut.
              </FeatureItem>
              <FeatureItem>
                <Sparkles size={18} strokeWidth={2.25} />
                Résumés, actions et traductions générés par IA en direct.
              </FeatureItem>
              <FeatureItem>
                <Users size={18} strokeWidth={2.25} />
                Salles de sous-groupes, sondages et tableau blanc collaboratif.
              </FeatureItem>
              <FeatureItem>
                <Globe2 size={18} strokeWidth={2.25} />
                Infrastructure mondiale — moins de 50 ms de latence.
              </FeatureItem>
            </FeatureList>
          </BrandBody>

          <BrandBottom>
            <Stat>
              <strong>12k+</strong>
              <span>Équipes actives</span>
            </Stat>
            <Stat>
              <strong>4,9/5</strong>
              <span>Satisfaction client</span>
            </Stat>
            <Stat>
              <strong>99,99 %</strong>
              <span>Disponibilité</span>
            </Stat>
          </BrandBottom>
        </BrandSide>
      </Main>
    </PageWrapper>
  );
};

export default LoginPage;
