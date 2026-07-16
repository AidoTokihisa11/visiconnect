import React from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { LiveKitRoom } from '@livekit/components-react';
import { useUser } from '@clerk/react';
import { useRoomToken } from '../hooks/useMeeting';
import { MeetingRoom } from '../components/room/MeetingRoom';
import '@livekit/components-styles';

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  /* Use dynamic viewport height on mobile so the BottomBar is never hidden
     behind the browser URL bar (Chrome/Safari on iOS & Android). */
  height: 100dvh;
  background-color: #0f172a;
  color: white;
  display: flex;
  overflow: hidden;
  font-family:
    'Inter',
    system-ui,
    -apple-system,
    sans-serif;

  @supports not (height: 100dvh) {
    height: -webkit-fill-available;
  }
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
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default function MeetingRoomPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user: clerkUser, isLoaded: isUserLoaded } = useUser();

  // Utilise le nom de l'utilisateur connecté en priorité, puis le nom invité, puis un nom aléatoire
  const displayName = React.useMemo(() => {
    if (clerkUser) {
      return (
        clerkUser.fullName ||
        clerkUser.firstName ||
        clerkUser.primaryEmailAddress?.emailAddress ||
        clerkUser.id
      );
    }
    return (
      sessionStorage.getItem('guestDisplayName') ||
      `Invité_${Math.random().toString(36).substring(2, 6)}`
    );
  }, [clerkUser]);

  const { token, error: tokenError } = useRoomToken(roomId, displayName);

  const liveKitUrl = import.meta.env.VITE_LIVEKIT_URL || 'ws://localhost:7880';

  const handleLeave = () => {
    sessionStorage.removeItem('guestDisplayName');
    if (clerkUser) {
      navigate('/account');
    } else {
      navigate('/demo');
    }
  };

  // Attendre que Clerk soit prêt avant de montrer l'écran de chargement
  if (!isUserLoaded || (!token && !tokenError)) {
    return (
      <LoadingScreen>
        <Spinner />
        <span>Préparation de la salle…</span>
      </LoadingScreen>
    );
  }

  if (tokenError && !token) {
    return (
      <LoadingScreen>
        <span
          style={{ color: '#f87171', fontSize: '15px', textAlign: 'center', maxWidth: '360px' }}
        >
          Impossible de rejoindre la salle. Veuillez vous connecter ou réessayer.
        </span>
        <button
          onClick={() => navigate('/login')}
          style={{
            marginTop: '16px',
            padding: '10px 24px',
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Se connecter
        </button>
      </LoadingScreen>
    );
  }

  const userInfo = clerkUser
    ? {
        id: clerkUser.id,
        name: displayName,
        email: clerkUser.primaryEmailAddress?.emailAddress || displayName,
      }
    : { id: displayName, name: displayName, email: displayName };

  return (
    <PageContainer>
      <LiveKitRoom
        token={token}
        serverUrl={liveKitUrl}
        connect={true}
        video={true}
        audio={true}
        data-lk-theme="default"
      >
        <MeetingRoom roomId={roomId} user={userInfo} onLeave={handleLeave} />
      </LiveKitRoom>
    </PageContainer>
  );
}
