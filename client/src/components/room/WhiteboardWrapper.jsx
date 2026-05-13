import React, { memo, useCallback, useEffect, useRef } from 'react';
import { Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';
import styled from 'styled-components';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

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
  const editorRef = useRef(null);
  // Guard: true while we're applying a remote snapshot so the store listener
  // doesn't immediately echo it back to Convex.
  const isSyncingRef = useRef(false);
  const debounceRef = useRef(null);
  // Tracks the last JSON string we wrote, to skip redundant saves.
  const lastSavedRef = useRef(null);

  const remoteData = useQuery(
    api.whiteboard.getWhiteboard,
    roomId ? { meetingId: roomId } : 'skip',
  );
  const updateWhiteboard = useMutation(api.whiteboard.updateWhiteboard);

  // Apply remote state whenever another participant saves a snapshot.
  // We skip the update if we ourselves produced it (lastSavedRef equality check).
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || !remoteData?.elements) return;
    if (remoteData.elements === lastSavedRef.current) return;

    try {
      isSyncingRef.current = true;
      editor.loadSnapshot(JSON.parse(remoteData.elements));
    } catch (e) {
      console.warn('[Whiteboard] Failed to apply remote state:', e);
    } finally {
      // Defer the flag reset so the store listener sees it during this microtask.
      setTimeout(() => { isSyncingRef.current = false; }, 0);
    }
  }, [remoteData]);

  const handleMount = useCallback((editor) => {
    editorRef.current = editor;

    // ============================================================
    // EXPORT — Forcer un fond opaque (feedback bêta)
    // « Le SVG exporté est inutilisable car transparent. »
    // On active explicitement l'arrière-plan d'export pour que les
    // PNG/SVG natifs de tldraw soient lisibles dans tout visualiseur.
    // ============================================================
    try {
      editor.updateInstanceState({ exportBackground: true });
    } catch (e) {
      console.warn('[Whiteboard] Could not enable exportBackground:', e);
    }

    // Load persisted state on first mount if Convex already has data.
    if (remoteData?.elements) {
      try {
        isSyncingRef.current = true;
        editor.loadSnapshot(JSON.parse(remoteData.elements));
        lastSavedRef.current = remoteData.elements;
      } catch (e) {
        console.warn('[Whiteboard] Initial load failed:', e);
      } finally {
        setTimeout(() => { isSyncingRef.current = false; }, 0);
      }
    }

    // Listen to user-originated document changes and debounce-save to Convex.
    const unsubscribe = editor.store.listen(
      () => {
        if (isSyncingRef.current) return;
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(async () => {
          try {
            const elements = JSON.stringify(editor.getSnapshot());
            if (elements === lastSavedRef.current) return;
            lastSavedRef.current = elements;
            await updateWhiteboard({ meetingId: roomId, elements, appState: '{}' });
          } catch (e) {
            console.error('[Whiteboard] Save failed:', e);
          }
        }, 300);
      },
      { source: 'user', scope: 'document' },
    );

    return () => {
      unsubscribe();
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, updateWhiteboard]);

  return (
    <Wrapper>
      <TldrawErrorBoundary>
        <Tldraw
          onMount={handleMount}
          autoFocus
          hideUi={false}
          licenseKey={import.meta.env.VITE_TLDRAW_LICENSE_KEY}
        />
      </TldrawErrorBoundary>
    </Wrapper>
  );
}, (prev, next) => prev.roomId === next.roomId);
