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

  /* ============================================================
     JAUGE D'OPACITÉ — séparation et étiquette claires
     Problème : le slider était collé sous la palette de couleurs
     sans aucun séparateur, laissant croire qu'il contrôlait la
     taille du crayon. On le distingue visuellement ici.
  ============================================================ */

  /* Séparateur au-dessus du slider d'opacité */
  .tlui-style-panel .tlui-slider__container {
    margin-top: 4px !important;
    padding-top: 2px !important;
    border-top: 1px solid var(--tl-color-divider) !important;
  }

  /* Label "Opacité" affiché au-dessus de la jauge via pseudo-élément */
  .tlui-style-panel .tlui-slider__container::before {
    content: '◑  Opacité';
    display: block;
    font-size: 10.5px;
    font-weight: 700;
    color: var(--tl-color-text-1);
    opacity: 0.5;
    padding: 4px 0 0 var(--tl-space-4);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    pointer-events: none;
  }

  /* Ne pas affecter le slider de la barre d'image (contexte différent) */
  .tlui-image__toolbar .tlui-slider__container {
    margin-top: 0 !important;
    padding-top: 0 !important;
    border-top: none !important;
  }
  .tlui-image__toolbar .tlui-slider__container::before {
    display: none;
  }

  /* Sections du panneau de style — espacement entre chaque groupe */
  .tlui-style-panel__section {
    padding-top: 2px;
    padding-bottom: 2px;
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
