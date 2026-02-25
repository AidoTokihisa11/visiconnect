import React from 'react';
import styled from 'styled-components';
import { Mic, MicOff, VideoOff, Activity } from 'lucide-react';
import { VideoTrack } from '@livekit/components-react';
import { ROOM_THEME as THEME } from '../../styles/roomTheme';

const CardContainer = styled.div`
  background-color: #000;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  flex: 1 1 400px; 
  max-width: 800px;
  aspect-ratio: 16/9;
  max-height: 100%;
  
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid ${props => props.$isActive ? THEME.accent : 'rgba(255,255,255,0.1)'};
  transition: all 0.3s ease;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${THEME.cardBg};
  color: ${THEME.textDim};
`;

const UserLabel = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background-color: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(4px);
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 2;
  border: 1px solid rgba(255,255,255,0.08);
`;

const StatusIcons = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
  z-index: 2;
`;

const StatusIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$active ? '#ef4444' : 'white'};
  border: 1px solid rgba(255,255,255,0.08);
  
  svg {
    width: 16px; 
    height: 16px;
  }
`;

export const VideoParticipant = ({ 
  trackRef, 
  participant, 
  isLocal = false, 
  isSpeaking = false 
}) => {
  // Determine if camera/mic are enabled
  const isCameraEnabled = participant?.isCameraEnabled ?? false;
  const isMicEnabled = participant?.isMicrophoneEnabled ?? false;

  return (
    <CardContainer $isActive={isSpeaking || isMicEnabled}>
      {isCameraEnabled ? (
        <VideoTrack trackRef={trackRef} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <Placeholder>
          <VideoOff size={64} style={{ opacity: 0.5 }} />
        </Placeholder>
      )}

      <StatusIcons>
        {!isMicEnabled && (
          <StatusIcon $active>
            <MicOff size={16} />
          </StatusIcon>
        )}
        {/* We can add connection quality here later */}
      </StatusIcons>

      <UserLabel>
        {isMicEnabled ? <Mic size={14} color="#4ade80" /> : <MicOff size={14} color="#f87171" />}
        {participant?.identity || 'Inconnu'} {isLocal && '(Vous)'}
      </UserLabel>
    </CardContainer>
  );
};
