import React, { memo } from 'react';
import { Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  
  .tl-container {
    border-radius: 0;
  }
`;

// React.memo prevents re-mounts when parent MeetingRoom re-renders
// (state changes like chat messages, stats, etc. must not unmount Tldraw)
export const WhiteboardWrapper = memo(({ roomId, userName }) => {
  return (
    <Wrapper>
      <Tldraw 
        persistenceKey={`room-${roomId}`} 
        autoFocus 
        hideUi={false}
      />
    </Wrapper>
  );
}, (prev, next) => prev.roomId === next.roomId);
