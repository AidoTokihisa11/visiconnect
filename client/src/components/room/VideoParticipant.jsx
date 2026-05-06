import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Mic, MicOff, VideoOff, Activity, Move } from 'lucide-react';
import { VideoTrack } from '@livekit/components-react';
import { ROOM_THEME as THEME } from '../../styles/roomTheme';
import { useAISettings } from '../../hooks/useAISettings';
import { getVideoEnhancementService } from '../../services/ai';

/**
 * useParticipantAudioLevel — lit le niveau audio temps réel d'un participant LiveKit.
 * `participant.audioLevel` est mis à jour par le RoomEngine à chaque frame.
 */
const useParticipantAudioLevel = (participant, isMicEnabled) => {
  const [level, setLevel] = useState(0);
  useEffect(() => {
    if (!participant || !isMicEnabled) {
      setLevel(0);
      return;
    }
    let raf;
    const tick = () => {
      // audioLevel : 0..1 fourni par LiveKit
      const lvl = typeof participant.audioLevel === 'number' ? participant.audioLevel : 0;
      setLevel(lvl);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [participant, isMicEnabled]);
  return level;
};

// 📱 PiP Draggable Container - Position absolue contrôlée par state
const DraggablePiPContainer = styled.div`
  position: fixed !important;
  width: 100px;
  height: 140px;
  z-index: 100;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  border: 2px solid rgba(255,255,255,0.15);
  border-radius: 12px;
  overflow: hidden;
  background-color: ${THEME.cardBg};
  touch-action: none;
  user-select: none;
  cursor: grab;
  transition: ${props => props.$isDragging ? 'none' : 'box-shadow 0.2s ease'};
  
  &:active {
    cursor: grabbing;
    box-shadow: 0 12px 32px rgba(0,0,0,0.5);
  }
  
  /* Indicateur de drag */
  &::before {
    content: '';
    position: absolute;
    top: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 4px;
    background: rgba(255,255,255,0.4);
    border-radius: 2px;
    z-index: 10;
    opacity: 0.7;
  }
  
  /* Landscape mobile: plus petit */
  @media (max-width: 768px) and (orientation: landscape) {
    width: 90px;
    height: 70px;
  }
`;

const CardContainer = styled.div`
  background-color: ${THEME.cardBg};
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  flex: 1 1 min(100%, 400px); 
  max-width: 800px;
  aspect-ratio: 16/9;
  max-height: 100%;
  width: 100%;
  height: 100%;
  
  @media (max-width: 768px) {
    border-radius: 16px;
    flex-basis: 100%;
    aspect-ratio: auto;
    flex: 1;
    min-height: 0;
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

// Anneau de gain autour du micro — scale en fonction du niveau audio
const MicLevelRing = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  transition: box-shadow 0.08s linear;
  box-shadow: ${({ $level, $active }) =>
    $active && $level > 0.04
      ? `0 0 0 ${Math.round(2 + $level * 8)}px rgba(16, 185, 129, ${(0.18 + $level * 0.45).toFixed(2)})`
      : 'none'};
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
  // 🤖 AI Video Enhancement
  const { settings } = useAISettings();
  const videoFilter = useMemo(() => {
    if (settings?.videoEnhancement?.enabled) {
      const service = getVideoEnhancementService();
      service.setEnabled(true);
      service.applyPreset(settings.videoEnhancement?.preset || 'natural');
      return service.getCSSFilter();
    }
    return 'none';
  }, [settings?.videoEnhancement?.enabled, settings?.videoEnhancement?.preset]);

  // Use trackRef properties directly if available, otherwise fallback to participant flags
  const isVideoEnabled = trackRef?.publication 
    ? !trackRef.publication.isMuted 
    : (overrideCameraEnabled !== undefined ? overrideCameraEnabled : (participant?.isCameraEnabled ?? false));
    
  const isMicEnabled = overrideMicEnabled !== undefined ? overrideMicEnabled : (participant?.isMicrophoneEnabled ?? false);

  // Niveau audio temps r\u00e9el pour l'anneau autour du micro
  const micLevel = useParticipantAudioLevel(participant, isMicEnabled);

  // 📱 État pour la position du PiP déplaçable
  const [pipPosition, setPipPosition] = useState({ x: null, y: null });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0, posX: 0, posY: 0 });

  // Initialiser la position par défaut (bas droite)
  useEffect(() => {
    if (isPiP && pipPosition.x === null) {
      const defaultX = window.innerWidth - 112; // 100px width + 12px margin
      const defaultY = window.innerHeight - 240; // bottom: 100px (bar) + 140px (height)
      setPipPosition({ x: defaultX, y: defaultY });
    }
  }, [isPiP, pipPosition.x]);

  // Gestion du touch start
  const handleTouchStart = useCallback((e) => {
    if (!isPiP) return;
    e.preventDefault();
    const touch = e.touches[0];
    dragStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      posX: pipPosition.x,
      posY: pipPosition.y,
    };
    setIsDragging(true);
  }, [isPiP, pipPosition]);

  // Gestion du touch move
  const handleTouchMove = useCallback((e) => {
    if (!isDragging || !isPiP) return;
    e.preventDefault();
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStartRef.current.x;
    const deltaY = touch.clientY - dragStartRef.current.y;
    
    // Calculer les nouvelles positions avec limites
    const pipWidth = 100;
    const pipHeight = 140;
    const maxX = window.innerWidth - pipWidth - 8;
    const maxY = window.innerHeight - pipHeight - 100; // 100px pour la barre du bas
    const minX = 8;
    const minY = 60; // Espace pour le header
    
    const newX = Math.max(minX, Math.min(maxX, dragStartRef.current.posX + deltaX));
    const newY = Math.max(minY, Math.min(maxY, dragStartRef.current.posY + deltaY));
    
    setPipPosition({ x: newX, y: newY });
  }, [isDragging, isPiP]);

  // Gestion du touch end avec snap aux coins
  const handleTouchEnd = useCallback(() => {
    if (!isDragging || !isPiP) return;
    setIsDragging(false);
    
    // Snap vers le coin le plus proche (optionnel - snap horizontal uniquement)
    const pipWidth = 100;
    const centerX = pipPosition.x + pipWidth / 2;
    const screenCenterX = window.innerWidth / 2;
    
    // Snap à gauche ou à droite
    const snapX = centerX < screenCenterX ? 8 : window.innerWidth - pipWidth - 8;
    setPipPosition(prev => ({ ...prev, x: snapX }));
  }, [isDragging, isPiP, pipPosition]);

  // Mouse events pour desktop (optionnel mais utile pour tester)
  const handleMouseDown = useCallback((e) => {
    if (!isPiP) return;
    e.preventDefault();
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      posX: pipPosition.x,
      posY: pipPosition.y,
    };
    setIsDragging(true);
  }, [isPiP, pipPosition]);

  // Écouter mousemove et mouseup globalement
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - dragStartRef.current.x;
      const deltaY = e.clientY - dragStartRef.current.y;
      
      const pipWidth = 100;
      const pipHeight = 140;
      const maxX = window.innerWidth - pipWidth - 8;
      const maxY = window.innerHeight - pipHeight - 100;
      const minX = 8;
      const minY = 60;
      
      const newX = Math.max(minX, Math.min(maxX, dragStartRef.current.posX + deltaX));
      const newY = Math.max(minY, Math.min(maxY, dragStartRef.current.posY + deltaY));
      
      setPipPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      // Snap horizontal
      const pipWidth = 100;
      const centerX = pipPosition.x + pipWidth / 2;
      const screenCenterX = window.innerWidth / 2;
      const snapX = centerX < screenCenterX ? 8 : window.innerWidth - pipWidth - 8;
      setPipPosition(prev => ({ ...prev, x: snapX }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, pipPosition.x]);

  // Contenu vidéo commun
  const videoContent = (
    <>
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
            backfaceVisibility: 'hidden',
            filter: videoFilter, // 🤖 AI Video Enhancement
          }} 
        />
      ) : (
        <Placeholder>
          <VideoOff size={isPiP ? 32 : 64} style={{ opacity: 0.5 }} />
        </Placeholder>
      )}

      {!isPiP && (
        <StatusIcons>
          {!isMicEnabled && (
            <StatusIcon $active>
              <MicOff size={16} />
            </StatusIcon>
          )}
        </StatusIcons>
      )}

      {showLabel && !isPiP && (
        <UserLabel>
          {isMicEnabled ? (
            <MicLevelRing $level={micLevel} $active={isMicEnabled}>
              <Mic size={14} color="#059669" />
            </MicLevelRing>
          ) : (
            <MicOff size={14} color="#dc2626" />
          )}
          {participant?.name || participant?.identity || 'Inconnu'} {isLocal && '(Vous)'}
        </UserLabel>
      )}
    </>
  );

  // 📱 Rendu PiP déplaçable sur mobile
  if (isPiP) {
    return (
      <DraggablePiPContainer
        ref={dragRef}
        $isDragging={isDragging}
        style={{
          left: pipPosition.x ?? 'auto',
          top: pipPosition.y ?? 'auto',
          right: pipPosition.x === null ? '12px' : 'auto',
          bottom: pipPosition.y === null ? 'calc(100px + env(safe-area-inset-bottom, 0px))' : 'auto',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      >
        {videoContent}
      </DraggablePiPContainer>
    );
  }

  return (
    <CardContainer $isActive={isSpeaking || isMicEnabled} $videoFit={videoFit}>
      {videoContent}
    </CardContainer>
  );
});
