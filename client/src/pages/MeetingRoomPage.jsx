import React from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { LiveKitRoom } from '@livekit/components-react';
import { useRoomToken } from '../hooks/useMeeting';
import { MeetingRoom } from '../components/room/MeetingRoom';
import '@livekit/components-styles';

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #0f172a;
  color: white;
  display: flex;
  overflow: hidden;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
`;

const LoadingScreen = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #0f172a;
  gap: 16px;
  color: #94a3b8;
  font-size: 15px;
`;

const Spinner = styled.div`
  width: 36px;
  height: 36px;
  border: 3px solid rgba(255,255,255,0.1);
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  @keyframes spin { to { transform: rotate(360deg); } }
`;

export default function MeetingRoomPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  // Nom entré dans la modale de la page démo, ou nom généré automatiquement
  const displayName =
    sessionStorage.getItem('guestDisplayName') ||
    `Invité_${Math.random().toString(36).substring(2, 6)}`;

  const { token, error: tokenError } = useRoomToken(roomId, displayName);

  const liveKitUrl = import.meta.env.VITE_LIVEKIT_URL || 'ws://localhost:7880';

  const handleLeave = () => {
    sessionStorage.removeItem('guestDisplayName');
    navigate('/demo');
  };

  if (!token && !tokenError) {
    return (
      <LoadingScreen>
        <Spinner />
        <span>Préparation de la salle…</span>
      </LoadingScreen>
    );
  }

  const safeToken = token || '';

  return (
    <PageContainer>
      <LiveKitRoom
        token={safeToken}
        serverUrl={liveKitUrl}
        connect={!!safeToken && safeToken.length > 0}
        video={true}
        audio={true}
        data-lk-theme="default"
      >
        <MeetingRoom
          roomId={roomId}
          user={{ id: displayName, name: displayName, email: displayName }}
          onLeave={handleLeave}
        />
      </LiveKitRoom>
    </PageContainer>
  );
}
