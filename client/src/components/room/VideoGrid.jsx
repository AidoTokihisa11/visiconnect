import React from 'react';
import styled from 'styled-components';
import { VideoParticipant } from './VideoParticipant';
import { useParticipants } from '@livekit/components-react';

const GridContainer = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  gap: 1rem;
  overflow-y: auto;
  width: 100%;
  height: calc(100% - 80px);
  position: relative;

  @media (max-width: 768px) {
    padding: 0.5rem;
    gap: 0.5rem;
    height: 100%;
    padding-bottom: 90px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: stretch;
    justify-content: stretch;
  }

  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background-color: \#cbd5e1; border-radius: 4px; }
`;

export const VideoGrid = ({ localParticipant, isLocalCameraEnabled, isLocalMicEnabled, tracks, videoFit = 'cover', showParticipantLabels = true }) => {
  const allParticipants = useParticipants();

  // Find participants who are remote and have NO tracks in the tracks array
  const activeTrackIdentities = new Set(tracks?.map(t => t.participant.identity) || []);
  const tracklessParticipants = allParticipants.filter(p =>
    p.identity !== localParticipant?.identity &&
    !activeTrackIdentities.has(p.identity)
  );

  const hasRemoteParticipants = tracks?.some(t => t.participant.identity !== localParticipant?.identity) || tracklessParticipants.length > 0;

  return (
    <GridContainer>
      {/* Local Participant */}
      {localParticipant && (
        <VideoParticipant
          participant={localParticipant}
          trackRef={{ participant: localParticipant, source: 'camera' }}
          isLocal={true}
          isSpeaking={localParticipant.isSpeaking}
          videoFit={videoFit}
          showLabel={showParticipantLabels}
          overrideCameraEnabled={isLocalCameraEnabled}
          overrideMicEnabled={isLocalMicEnabled}
          isPiP={hasRemoteParticipants}
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
