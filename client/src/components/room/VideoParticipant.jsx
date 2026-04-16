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


export const VideoPlayer = React.memo(({ track, isLocal = false, videoFit = 'cover' }) => {
  const videoEl = React.useRef(null);

  React.useEffect(() => {
    if (!videoEl.current || !track) return;

    const el = videoEl.current;

    // 1. Attachement natif WebRTC (Contourne l'attribut srcObject de React)
    const attachedElement = track.attach(el);

    // 2. Offloading GPU (Force la création d'un calque de composition matériel)
    attachedElement.style.willChange = 'transform, opacity';
    attachedElement.style.backfaceVisibility = 'hidden';
    attachedElement.style.objectFit = videoFit;
    
    // Accélération 3D : L'utilisation de translateZ(0) pousse le rendu sur le GPU
    attachedElement.style.transform = isLocal 
      ? 'scaleX(-1) translateZ(0)' // Mode miroir pour la caméra locale
      : 'translateZ(0)';

    // Cleanup critique : Évite la surcharge du garbage collector et les fuites de mémoire
    return () => {
      if (track) {
        track.detach(el);
      }
      // Réinitialise le flux pour s'assurer que l'élément vidéo est purgé
      el.srcObject = null;
    };
  }, [track, isLocal, videoFit]);

  return (
    <div 
      className="video-container-zero-render" 
      style={{ 
        width: '100%', 
        height: '100%', 
        backgroundColor: '#050505',
        contain: 'strict'
      }}
    >
      <video 
        ref={videoEl} 
        autoPlay 
        playsInline 
        muted={isLocal} 
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  );
});

VideoPlayer.displayName = 'VideoPlayer';

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
        <VideoPlayer
          track={trackRef?.publication?.videoTrack ?? trackRef?.publication?.track ?? trackRef?.track ?? (typeof trackRef?.attach === 'function' ? trackRef : null)}
          isLocal={isLocal}
          videoFit={videoFit}
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
