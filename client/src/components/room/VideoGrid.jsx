import React, { useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { VideoParticipant } from './VideoParticipant';
import { useParticipants } from '@livekit/components-react';
import { Track } from 'livekit-client';

/**
 * Dynamic Grid Container avec gestion responsive améliorée
 * - CSS Grid adaptatif selon le nombre de participants
 * - Support changement d'orientation mobile
 * - SafeArea iOS respectée
 */
const GridContainer = styled.div`
  flex: 1;
  padding: 1rem;
  display: grid;
  /* Grid adaptatif basé sur le nombre de participants */
  grid-template-columns: ${props => {
    const count = props.$participantCount || 1;
    if (count === 1) return '1fr';
    if (count === 2) return 'repeat(2, 1fr)';
    if (count <= 4) return 'repeat(2, 1fr)';
    if (count <= 6) return 'repeat(3, 1fr)';
    return 'repeat(4, 1fr)';
  }};
  grid-auto-rows: minmax(200px, 1fr);
  gap: 1rem;
  overflow-y: auto;
  width: 100%;
  height: calc(100% - 80px);
  position: relative;
  align-content: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 0.5rem;
    padding-bottom: calc(90px + env(safe-area-inset-bottom, 0px));
    padding-left: max(0.5rem, env(safe-area-inset-left, 0px));
    padding-right: max(0.5rem, env(safe-area-inset-right, 0px));
    gap: 0.5rem;
    height: 100%;
    
    /* Portrait: Stack vertical pour 1-2 participants */
    grid-template-columns: ${props => {
      const count = props.$participantCount || 1;
      const isLandscape = props.$isLandscape;
      
      if (isLandscape) {
        // Landscape: disposition horizontale
        if (count === 1) return '1fr';
        if (count === 2) return 'repeat(2, 1fr)';
        return 'repeat(2, 1fr)';
      } else {
        // Portrait: disposition verticale privilégiée
        if (count === 1) return '1fr';
        if (count === 2) return '1fr';
        return 'repeat(2, 1fr)';
      }
    }};
    
    grid-auto-rows: ${props => {
      const count = props.$participantCount || 1;
      const isLandscape = props.$isLandscape;
      
      if (isLandscape) {
        return 'minmax(150px, 1fr)';
      } else {
        if (count <= 2) return 'minmax(35vh, 1fr)';
        return 'minmax(25vh, 1fr)';
      }
    }};
  }
  
  /* Landscape mobile */
  @media (max-width: 768px) and (orientation: landscape) {
    padding-bottom: calc(70px + env(safe-area-inset-bottom, 0px));
    grid-auto-rows: minmax(40vh, 1fr);
  }

  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 4px; }
  
  /* Transition douce lors des changements de layout */
  transition: grid-template-columns 0.3s ease, gap 0.2s ease;
`;

export const VideoGrid = ({ localParticipant, isLocalCameraEnabled, isLocalMicEnabled, tracks, videoFit = 'cover', showParticipantLabels = true }) => {
  const allParticipants = useParticipants();
  
  // Détection de l'orientation pour layout adaptatif
  const [isLandscape, setIsLandscape] = useState(
    typeof window !== 'undefined' ? window.innerWidth > window.innerHeight : false
  );
  
  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Memoize the local trackRef to prevent infinite rendering loops in LiveKit VideoTrack
  const localTrackRef = useMemo(() => {
    if (!localParticipant) return null;
    return {
      participant: localParticipant,
      source: Track.Source.Camera,
    };
  }, [localParticipant]);
  
  // Find participants who are remote and have NO tracks in the tracks array
  const activeTrackIdentities = new Set(tracks?.map(t => t.participant.identity) || []);
  const tracklessParticipants = allParticipants.filter(p =>
    p.identity !== localParticipant?.identity &&
    !activeTrackIdentities.has(p.identity)
  );

  const hasRemoteParticipants = tracks?.some(t => t.participant.identity !== localParticipant?.identity) || tracklessParticipants.length > 0;
  
  // Calcul du nombre total de participants pour le grid
  const totalParticipants = 1 + (tracks?.filter(t => t.participant.identity !== localParticipant?.identity).length || 0) + tracklessParticipants.length;

  return (
    <GridContainer $participantCount={totalParticipants} $isLandscape={isLandscape}>
      {/* Local Participant */}
      {localParticipant && localTrackRef && (
        <VideoParticipant
          participant={localParticipant}
          trackRef={localTrackRef}
          showLabel={showParticipantLabels}
          overrideCameraEnabled={isLocalCameraEnabled}
          overrideMicEnabled={isLocalMicEnabled}
          isPiP={hasRemoteParticipants}
        />
      )}

      {/* Screen shares and published cameras */}
      {tracks?.map((track) => {
        if (track.participant.identity === localParticipant?.identity) return null;
        const key = `${track.participant.identity}-${track.source}`;
        return (
          <VideoParticipant
            key={key}
            trackRef={track}
            participant={track.participant}
            isSpeaking={track.participant.isSpeaking}
            videoFit={videoFit}
            showLabel={showParticipantLabels}
          />
        );
      })}

      {/* Participants who are connected but have no camera tracks published */}
      {tracklessParticipants.map((p) => (
        <VideoParticipant
          key={p.identity}
          participant={p}
          trackRef={null}
          isSpeaking={p.isSpeaking}
          videoFit={videoFit}
          showLabel={showParticipantLabels}
        />
      ))}
    </GridContainer>
  );
};
