import React from 'react';
import styled from 'styled-components';
import { Mic, MicOff, VideoOff, Activity } from 'lucide-react';
import { VideoTrack } from '@livekit/components-react';
import { ROOM_THEME as THEME } from '../../styles/roomTheme';

const CardContainer = styled.div`
  background-color: #0b203b;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  flex: 1 1 400px; 
  max-width: 800px;
  aspect-ratio: 16/9;
  max-height: 100%;
  
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid ${props => props.$isActive ? THEME.accent : THEME.border};
  transition: all 0.3s ease;

  video {
    width: 100%;
    height: 100%;
    object-fit: ${props => props.$videoFit || 'cover'};
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
  background-color: rgba(12, 35, 64, 0.92);
  backdrop-filter: blur(4px);
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  color: ${THEME.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 2;
  border: 1px solid ${THEME.border};
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
  background-color: rgba(12, 35, 64, 0.92);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$active ? THEME.danger : THEME.text};
  border: 1px solid ${THEME.border};
  
  svg {
    width: 16px; 
    height: 16px;
  }
`;

export const VideoParticipant = ({ 
  trackRef, 
  participant, 
  isLocal = false, 
  isSpeaking = false,
  videoFit = 'cover',
  showLabel = true,
}) => {
  // Determine if camera/mic are enabled
  const isCameraEnabled = participant?.isCameraEnabled ?? false;
  const isMicEnabled = participant?.isMicrophoneEnabled ?? false;

  return (
    <CardContainer $isActive={isSpeaking || isMicEnabled} $videoFit={videoFit}>
      {isCameraEnabled ? (
        <VideoTrack trackRef={trackRef} style={{ width: '100%', height: '100%', objectFit: videoFit }} />
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

      {showLabel && (
        <UserLabel>
          {isMicEnabled ? <Mic size={14} color="#059669" /> : <MicOff size={14} color="#dc2626" />}
          {participant?.identity || 'Inconnu'} {isLocal && '(Vous)'}
        </UserLabel>
      )}
    </CardContainer>
  );
};
