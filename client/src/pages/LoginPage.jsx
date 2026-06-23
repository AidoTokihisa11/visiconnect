import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from '../hooks/useTranslation';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';
import AuthRightPanel from '../components/AuthRightPanel';

const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: white;
  flex-direction: column-reverse;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

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
`;

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
`;

const FormContainer = styled(motion.div)`
  width: 100%;
  max-width: 400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled.div`
  margin-bottom: 2.5rem;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: #2563eb;
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #64748b;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #334155;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 1rem;
  color: #94a3b8;
  display: flex;
`;

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
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  display: flex;
  padding: 4px;

  &:hover {
    color: #475569;
  }
`;

const ForgotPassword = styled.div`
  text-align: right;
  margin-top: -0.4rem;

  a {
    color: #64748b;
    text-decoration: none;
    font-size: 0.85rem;
    font-weight: 600;

    &:hover {
      color: #0f172a;
      text-decoration: underline;
    }
  }
`;

/* Keep visual parity with Signup page */
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
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1.5rem 0;

  &::before,
  &::after {
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
`;

const OAuthButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const OAuthButton = styled.button`
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

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

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
`;

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
`;

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
  // Avoid a flash of the login form by redirecting as soon as the auth state is known.
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
      // signInWithProvider triggers a full-page redirect on success — only
      // an error path returns synchronously.
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
      <LeftPanel>
        <BackLink to="/">
          <ArrowLeft size={18} /> {t('signup.backHome')}
        </BackLink>

        <FormContainer
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          {(error || authError) && (
            <ErrorMessage
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>{error || authError}</span>
            </ErrorMessage>
          )}

          <Header>
            <Logo>VisioConnect</Logo>
            <Title>{t('login.title')}</Title>
            <Subtitle>{t('login.subtitle')}</Subtitle>
          </Header>

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="email">{t('login.email')}</Label>
              <InputWrapper>
                <IconWrapper>
                  <Mail size={18} />
                </IconWrapper>
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
              <Label htmlFor="password">{t('login.password')}</Label>
              <InputWrapper>
                <IconWrapper>
                  <Lock size={18} />
                </IconWrapper>
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
                <PasswordToggle type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </PasswordToggle>
              </InputWrapper>
            </FormGroup>

            <ForgotPassword>
              <Link to="/forgot-password">{t('login.forgotPassword')}</Link>
            </ForgotPassword>

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
        </FormContainer>
      </LeftPanel>

      <AuthRightPanel
        title={t('signup.rightPanel.title')}
        description={t('signup.rightPanel.desc')}
      />
    </PageWrapper>
  );
};

export default LoginPage;
