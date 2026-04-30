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

  /* Push tldraw bottom toolbar up so our close button doesn't overlap it */
  .tlui-layout__bottom {
    padding-bottom: 48px !important;
  }

  /* Ensure style panel (opacity, colors) is always on top and interactive */
  .tlui-style-panel,
  .tlui-toolbar,
  .tlui-menu-zone {
    pointer-events: all !important;
    position: relative;
    z-index: 10;
  }

  /* Ensure sliders (opacity range input) are always interactable */
  .tlui-slider__container input[type="range"],
  .tl-style-panel input[type="range"] {
    pointer-events: all !important;
    cursor: pointer;
  }
`;

const FallbackWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
  background: #1a1f2e;
  color: #94a3b8;
  font-size: 0.9rem;
`;

// Catches render errors from tldraw (e.g. license enforcement in production)
class TldrawErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    console.warn('[WhiteboardWrapper] tldraw render error:', error?.message);
  }
  render() {
    if (this.state.hasError) {
      return (
        <FallbackWrapper>
          <span>🖊</span>
          <span>Le tableau blanc n'est pas disponible.</span>
        </FallbackWrapper>
      );
    }
    return this.props.children;
  }
}

// React.memo prevents re-mounts when parent MeetingRoom re-renders
// (state changes like chat messages, stats, etc. must not unmount Tldraw)
export const WhiteboardWrapper = memo(({ roomId }) => {
  return (
    <Wrapper>
      <TldrawErrorBoundary>
        <Tldraw
          persistenceKey={`room-${roomId}`}
          autoFocus
          hideUi={false}
          licenseKey={import.meta.env.VITE_TLDRAW_LICENSE_KEY}
        />
      </TldrawErrorBoundary>
    </Wrapper>
  );
}, (prev, next) => prev.roomId === next.roomId);
