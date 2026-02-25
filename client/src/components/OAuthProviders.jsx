import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import authService from '../services/authService';

const OAuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const OAuthButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e4e7eb;
  border-radius: 12px;
  background: #fefefe;
  color: #374151;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    border-color: ${props => props.hoverColor || '#7dd3fc'};
    background: ${props => props.hoverBg || '#f0f9ff'};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
`;

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24">
    <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const MicrosoftIcon = () => (
  <svg viewBox="0 0 24 24">
    <path fill="#f25022" d="M12 12h11V1H12z"/>
    <path fill="#00a4ef" d="M1 12h11V1H1z"/>
    <path fill="#7fba00" d="M12 23h11V12H12z"/>
    <path fill="#ffb900" d="M1 23h11V12H1z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="#24292e">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);



const LoadingSpinner = styled(motion.div)`
  width: 20px;
  height: 20px;
  border: 2px solid #e4e7eb;
  border-top: 2px solid #0ea5e9;
  border-radius: 50%;
`;

const ErrorMessage = styled(motion.div)`
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.875rem;
  margin-top: 1rem;
  text-align: center;
`;

const OAuthProviders = ({ onSuccess, onError }) => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState('');

  const handleOAuthLogin = async (provider, method) => {
    try {
      setLoading(provider);
      setError('');
      
      await method();
      
      // Le callback sera géré par la page de callback
      if (onSuccess) {
        onSuccess(provider);
      }
    } catch (err) {
      setError(err.message || `Erreur lors de la connexion avec ${provider}`);
      if (onError) {
        onError(err);
      }
    } finally {
      setLoading(null);
    }
  };

  return (
    <OAuthContainer>
      <OAuthButton
        onClick={() => handleOAuthLogin('Google', authService.signInWithGoogle)}
        disabled={loading === 'Google'}
        hoverColor="#db4437"
        hoverBg="#fef7f0"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {loading === 'Google' ? (
          <LoadingSpinner
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        ) : (
          <GoogleIcon />
        )}
        Continuer avec Google
      </OAuthButton>

      <OAuthButton
        onClick={() => handleOAuthLogin('Microsoft', authService.signInWithMicrosoft)}
        disabled={loading === 'Microsoft'}
        hoverColor="#0078d4"
        hoverBg="#f3f9ff"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {loading === 'Microsoft' ? (
          <LoadingSpinner
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        ) : (
          <MicrosoftIcon />
        )}
        Continuer avec Microsoft
      </OAuthButton>

      <OAuthButton
        onClick={() => handleOAuthLogin('GitHub', authService.signInWithGitHub)}
        disabled={loading === 'GitHub'}
        hoverColor="#24292e"
        hoverBg="#f6f8fa"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {loading === 'GitHub' ? (
          <LoadingSpinner
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        ) : (
          <GitHubIcon />
        )}
        Continuer avec GitHub
      </OAuthButton>

      {error && (
        <ErrorMessage
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </ErrorMessage>
      )}
    </OAuthContainer>
  );
};

export default OAuthProviders;