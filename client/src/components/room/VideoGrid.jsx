import React from 'react';
import styled from 'styled-components';
import { VideoParticipant } from './VideoParticipant';

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
  height: calc(100% - 80px); /* Leave space for bottom bar */
  
  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(30, 41, 59, 1);
    border-radius: 4px;
  }
`;

export const VideoGrid = ({ localParticipant, tracks }) => {
  return (
    <GridContainer>
      {/* Local Participant */}
      {localParticipant && (
        <VideoParticipant 
          participant={localParticipant}
          trackRef={{ participant: localParticipant, source: 'camera' }}
          isLocal={true}
          isSpeaking={localParticipant.isSpeaking}
        />
      )}

      {/* Remote Participants */}
      {tracks?.map((track) => {
        // Filter out local participant from tracks if it happens to be there (usually depends on how useTracks is configured)
        if (track.participant.identity === localParticipant?.identity) return null;
        
        return (
          <VideoParticipant
            key={track.participant.identity}
            trackRef={track}
            participant={track.participant}
            isSpeaking={track.participant.isSpeaking}
          />
        );
      })}
    </GridContainer>
  );
};
