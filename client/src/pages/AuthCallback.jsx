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
        console.log('🔄 AuthCallback started', location)
        
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
          console.log('🔑 Access Token found in URL (Implicit Flow)')
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          })
          if (sessionError) throw sessionError
          finishAuth()
          return
        }

        // If no session yet but we have a code, we need to exchange it
        if (code) {
             console.log('⏳ PKCE Code detected, exchanging for session...')
             
             const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
             
             if (exchangeError) {
                 console.error('❌ Error exchanging code:', exchangeError)
                 throw exchangeError
             }
             
             console.log('✅ Session established via code exchange')
             finishAuth()
             return;
        }

        // 2. PKCE Flow & Session check
        // First check if we already have a session (fastest)
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session) {
          console.log('✅ Session already active')
          finishAuth()
          return
        }

        // If no code and no tokens and no session -> Error
        // BUT check if we are just logged in?
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
             finishAuth()
             return
        }

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
            <Title>Bienvenue sur VisioConnect !</Title>
            <Description>
              Votre authentification est réussie. Nous préparons votre espace de travail...
            </Description>
            <RedirectMessage>Vous allez être redirigé dans quelques instants</RedirectMessage>
          </>
        )}
        
        {error && (
          <>
            <ErrorIcon>!</ErrorIcon>
            <Title>Oups, une erreur est survenue</Title>
            <Description>
              Nous n'avons pas pu finaliser votre connexion. ({error})
            </Description>
            <RedirectMessage>Retour à la page de connexion...</RedirectMessage>
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
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  padding: 20px;
  font-family: 'Inter', sans-serif;
`

const CallbackCard = styled.div`
  background: white;
  border-radius: 24px;
  padding: 48px 40px;
  text-align: center;
  max-width: 420px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  }
`

const Spinner = styled.div`
  width: 56px;
  height: 56px;
  border: 5px solid #f3f4f6;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
  margin: 0 auto 32px;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`

const SuccessIcon = styled.div`
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: bold;
  margin: 0 auto 32px;
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);
  animation: scaleIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  @keyframes scaleIn {
    from {
      transform: scale(0) rotate(-45deg);
      opacity: 0;
    }
    to {
      transform: scale(1) rotate(0);
      opacity: 1;
    }
  }
`

const ErrorIcon = styled.div`
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: bold;
  margin: 0 auto 32px;
  box-shadow: 0 8px 24px rgba(239, 68, 68, 0.3);
`

const Title = styled.h2`
  font-size: 28px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 16px;
  letter-spacing: -0.5px;
`

const Description = styled.p`
  font-size: 16px;
  color: #64748b;
  margin: 0;
  line-height: 1.6;
`

const RedirectMessage = styled.p`
  font-size: 14px;
  color: #94a3b8;
  margin: 24px 0 0;
  font-weight: 500;
`

export default AuthCallback
