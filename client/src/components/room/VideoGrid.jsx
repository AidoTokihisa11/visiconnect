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

  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background-color: \#cbd5e1; border-radius: 4px; }
`;

export const VideoGrid = ({ localParticipant, tracks, videoFit = 'cover', showParticipantLabels = true }) => {
  const allParticipants = useParticipants();

  // Find participants who are remote and have NO tracks in the tracks array
  const activeTrackIdentities = new Set(tracks?.map(t => t.participant.identity) || []);
  const tracklessParticipants = allParticipants.filter(p => 
    p.identity !== localParticipant?.identity && 
    !activeTrackIdentities.has(p.identity)
  );

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
        />
      )}

      {/* Screen shares and published cameras */}
      {tracks?.map((track) => {
        if (track.participant.identity === localParticipant?.identity) return null;
        // Use publication sid + identity to uniquely identify screen vs camera
        const key = `${track.participant.identity}-${track.publication?.sid || track.source}`;
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
