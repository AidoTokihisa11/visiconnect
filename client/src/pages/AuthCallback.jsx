import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../config/supabase'
import styled from 'styled-components'

const AuthCallback = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState(true)

  useEffect(() => {
  useEffect(() => {
    const finishAuth = () => {
        console.log('✅ Auth callback successful')
        const redirectTo = sessionStorage.getItem('auth_redirect') || '/'
        sessionStorage.removeItem('auth_redirect')
        
        // Short delay to show success state
        setTimeout(() => {
            navigate(redirectTo, { replace: true })
        }, 500)
        setProcessing(false) // Stop processing only on success
    }

    const handleAuthCallback = async () => {
      try {
        // Handle Implicit Flow (Hash fragments) - Legacy or specific config
        const hashParams = new URLSearchParams(location.hash.substring(1))
        const accessToken = hashParams.get('access_token')
        const refreshToken = hashParams.get('refresh_token')
        const hashError = hashParams.get('error')
        const hashErrorDesc = hashParams.get('error_description')

        // Handle PKCE Flow (Query params) - Default for Supabase v2
        const queryParams = new URLSearchParams(location.search)
        const code = queryParams.get('code')
        const queryError = queryParams.get('error')
        const queryErrorDesc = queryParams.get('error_description')

        // Check for errors
        if (hashError || queryError) {
          const errMsg = hashErrorDesc || queryErrorDesc || hashError || queryError
          console.error('Auth error param detected:', errMsg)
          throw new Error(errMsg)
        }

        // 1. Implicit Flow: Manually set session
        if (accessToken && refreshToken) {
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          })
          if (sessionError) throw sessionError
          finishAuth()
          return
        }

        // 2. PKCE Flow & Session check
        // First check if we already have a session (fastest)
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session) {
          finishAuth()
          return
        }
        
        // If no session yet but we have a code, the client is likely processing it.
        // We'll wait and retry once.
        if (code) {
             console.log('⏳ PKCE Code detected, waiting for session exchange...')
             // Wait 2 seconds and check again
             await new Promise(resolve => setTimeout(resolve, 2000))
             
             const { data: { session: retrySession }, error: retryError } = await supabase.auth.getSession()
             if (retrySession) {
                 finishAuth()
                 return
             }
             if (retryError) throw retryError
             
             throw new Error('Timeout: Session not established after redirect.')
        }

        // If no code and no tokens and no session -> Error
        throw new Error('No authentication data found in URL.')

      } catch (err) {
        console.error('❌ Auth callback error:', err)
        setError(err.message)
        setProcessing(false) // Stop processing on error
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login', { replace: true })
        }, 3000)
      }
    }

    handleAuthCallback()
  }, [navigate, location])

  return (
    <CallbackContainer>
      <CallbackCard>
        {processing && !error && (
          <>
            <Spinner />
            <Title>Connexion en cours...</Title>
            <Description>
              Veuillez patienter pendant que nous finalisons votre authentification.
            </Description>
          </>
        )}
        
        {!processing && !error && (
          <>
            <SuccessIcon>✓</SuccessIcon>
            <Title>Authentification réussie !</Title>
            <Description>Redirection en cours...</Description>
          </>
        )}
        
        {error && (
          <>
            <ErrorIcon>✕</ErrorIcon>
            <Title>Erreur d'authentification</Title>
            <Description>{error}</Description>
            <RedirectMessage>Redirection vers la page de connexion...</RedirectMessage>
          </>
        )}
      </CallbackCard>
    </CallbackContainer>
  )
}

// Styled Components
const CallbackContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`

const CallbackCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 48px 32px;
  text-align: center;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
`

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid #f3f4f6;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 24px;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`

const SuccessIcon = styled.div`
  width: 64px;
  height: 64px;
  background: #10b981;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: bold;
  margin: 0 auto 24px;
  animation: scaleIn 0.3s ease-out;

  @keyframes scaleIn {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }
`

const ErrorIcon = styled.div`
  width: 64px;
  height: 64px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: bold;
  margin: 0 auto 24px;
`

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 12px;
`

const Description = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
`

const RedirectMessage = styled.p`
  font-size: 14px;
  color: #9ca3af;
  margin: 16px 0 0;
  font-style: italic;
`

export default AuthCallback
