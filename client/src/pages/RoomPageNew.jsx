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

  const liveKitUrl = import.meta.env.VITE_LIVEKIT_URL || 'ws://localhost:7880'; 

  // Wait for token before trying to connect (prevents failed connect)
  if (!token && !tokenError) {
      return (
        <PageContainer style={{ alignItems: 'center', justifyContent: 'center' }}>
            <div>Préparation de la salle...</div>
        </PageContainer>
      );
  }

  // Error Handling (Bypassed for local/demo functionality)
  /* 
  if (tokenError) {
    return (
        <PageContainer style={{ alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ 
                background: '#ef4444', 
                color: 'white', 
                padding: '2rem', 
                borderRadius: '12px',
                textAlign: 'center',
                maxWidth: '400px'
            }}>
            <h3>⚠️ Erreur de Connexion</h3>
            <p>Impossible de rejoindre la salle (Token invalide ou serveur inaccessible).</p>
            <button onClick={() => navigate('/')} style={{ marginTop: '1rem', padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer', background: 'white', color: '#ef4444', fontWeight: 'bold' }}>
                Retour à l'accueil
            </button>
            </div>
        </PageContainer>
    );
  }
  */

  // Fallback for offline mode
  const safeToken = token || ""; 

  return (
    <PageContainer>
      <LiveKitRoom
        token={safeToken}
        serverUrl={liveKitUrl}
        connect={!!safeToken && safeToken.length > 0} 
        video={videoOptions}
        audio={true}
        // options={roomOptions} // livekit-client options passed directly can be tricky without token
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
