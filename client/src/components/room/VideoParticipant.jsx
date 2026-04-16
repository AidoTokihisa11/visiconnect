import React from 'react';
import styled from 'styled-components';
import { Mic, MicOff, VideoOff, Activity } from 'lucide-react';
import { VideoTrack } from '@livekit/components-react';
import { ROOM_THEME as THEME } from '../../styles/roomTheme';

const CardContainer = styled.div`
  background-color: ${THEME.cardBg};
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  flex: 1 1 min(100%, 400px); 
  max-width: 800px;
  aspect-ratio: 16/9;
  max-height: 100%;
  
  @media (max-width: 768px) {
    border-radius: 16px;
    flex-basis: 100%;
    aspect-ratio: auto;
    flex: 1; /* Allow vertically stacking full height */
    min-height: 0;

    /* Picture-in-Picture layout for local user when there are remote participants */
    ${props => props.$isPiP && `
      position: absolute;
      bottom: 100px;
      right: 16px;
      width: 120px;
      height: 160px;
      flex: none;
      z-index: 50;
      box-shadow: 0 8px 30px rgba(0,0,0,0.3);
      border: 2px solid rgba(255,255,255,0.1);
    `}
  }
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${THEME.cardBg}; border: 1px solid ${THEME.border};
  color: ${THEME.textDim};
`;

const UserLabel = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background-color: ${THEME.panelBg};
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
  background-color: ${THEME.panelBg};
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


export const VideoParticipant = React.memo(({
  trackRef,
  participant,
  isLocal = false,
  isSpeaking = false,
  videoFit = 'cover',
  showLabel = true,
  overrideCameraEnabled,
  overrideMicEnabled,
  isPiP = false,
}) => {
  // Use trackRef properties directly if available, otherwise fallback to participant flags
  const isVideoEnabled = trackRef?.publication 
    ? !trackRef.publication.isMuted 
    : (overrideCameraEnabled !== undefined ? overrideCameraEnabled : (participant?.isCameraEnabled ?? false));
    
  const isMicEnabled = overrideMicEnabled !== undefined ? overrideMicEnabled : (participant?.isMicrophoneEnabled ?? false);

  return (
    <CardContainer $isActive={isSpeaking || isMicEnabled} $videoFit={videoFit} $isPiP={isPiP}>
      {isVideoEnabled && trackRef ? (
        <VideoTrack
          trackRef={trackRef}
          playsInline={true}
          disablePictureInPicture={true}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: videoFit,
            transform: 'translateZ(0)', 
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden'
          }} 
        />
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
});
