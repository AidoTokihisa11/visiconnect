import React, { useEffect } from 'react';
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

// Simple wrapper to mount Tldraw in the room context
export const WhiteboardWrapper = ({ roomId, userName }) => {
  return (
    <Wrapper>
      <Tldraw 
        persistenceKey={`room-${roomId}`} 
        autoFocus 
        hideUi={false}
      />
    </Wrapper>
  );
};
