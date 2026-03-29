import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { LiveKitRoom } from '@livekit/components-react';
import { useRoomToken } from '../hooks/useMeeting'; 
import { useRoomProtection } from '../hooks/useRoomProtection';
import { useLiveKit4K } from '../hooks/useLiveKit4K';
import { MeetingRoom } from '../components/room/MeetingRoom';
import '@livekit/components-styles';

// --- Global Theme ---
// Kept for the PageContainer if needed, but we can reuse the global theme
const THEME = {
  bg: '#0f172a',       // Slate 900
};

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${THEME.bg};
  color: white;
  display: flex;
  overflow: hidden;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
`;

export default function RoomPageNew() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  
  // 1. Protection & Auth
  const { isAuthorized, loading: authLoading, user } = useRoomProtection(roomId);
  
  // 2. Token Generation
  const { token, error: tokenError } = useRoomToken(roomId, user?.email || 'Guest');
  
  // 3. 4K / Video Options
  const { options: roomOptions, videoOptions } = useLiveKit4K();

  const liveKitUrl = import.meta.env.VITE_LIVEKIT_WS_URL || import.meta.env.VITE_LIVEKIT_URL || 'ws://localhost:7880';
  const isUsableToken = typeof token === 'string' && token.length > 0 && !token.includes('mock_token_due_to_missing_keys');

  // Guard 1: Wait for auth check
  if (authLoading) {
    return (
      <PageContainer style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div>Vérification des accès...</div>
      </PageContainer>
    );
  }

  // Guard 2: Redirect unauthorized users
  if (!isAuthorized) {
    return (
      <PageContainer style={{ alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
        <div style={{
          maxWidth: '480px',
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(148, 163, 184, 0.35)',
          borderRadius: '12px',
          padding: '1.25rem 1.5rem',
          textAlign: 'center'
        }}>
          <h3 style={{ marginTop: 0 }}>Accès refusé</h3>
          <p style={{ opacity: 0.9 }}>Vous devez être connecté pour rejoindre cette salle.</p>
          <button
            onClick={() => navigate('/')}
            style={{
              marginTop: '0.75rem',
              padding: '0.6rem 1rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              background: '#2563eb',
              color: 'white',
              fontWeight: 600,
            }}
          >
            Retour à l'accueil
          </button>
        </div>
      </PageContainer>
    );
  }

  // Guard 3: Wait for token before trying to connect (prevents failed connect)
  if (!token && !tokenError) {
      return (
        <PageContainer style={{ alignItems: 'center', justifyContent: 'center' }}>
            <div>Préparation de la salle...</div>
        </PageContainer>
      );
  }

  if (!isUsableToken) {
    return (
      <PageContainer style={{ alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
        <div style={{
          maxWidth: '560px',
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(148, 163, 184, 0.35)',
          borderRadius: '12px',
          padding: '1.25rem 1.5rem'
        }}>
          <h3 style={{ marginTop: 0 }}>Connexion LiveKit indisponible</h3>
          <p style={{ opacity: 0.9 }}>
            Le token de réunion est absent ou invalide. Vérifie LIVEKIT_API_KEY et LIVEKIT_API_SECRET côté serveur,
            puis relance le backend.
          </p>
          <button
            onClick={() => navigate('/')}
            style={{
              marginTop: '0.75rem',
              padding: '0.6rem 1rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              background: '#2563eb',
              color: 'white',
              fontWeight: 600,
            }}
          >
            Retour a l'accueil
          </button>
        </div>
      </PageContainer>
    );
  }

  // Fallback for offline mode
  const safeToken = token || "";

  return (
    <PageContainer>
      <LiveKitRoom
        token={safeToken}
        serverUrl={liveKitUrl}
        connect={isUsableToken}
        video={videoOptions}
        audio={true}
        options={roomOptions}
        data-lk-theme="default"
      >
        <MeetingRoom 
           roomId={roomId} 
           user={{ id: user?.id || 'demo-user', name: user?.email || 'Demo User' }} 
           onLeave={() => navigate('/')} 
        />
      </LiveKitRoom>
    </PageContainer>
  );
}
