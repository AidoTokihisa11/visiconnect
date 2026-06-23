// ============================================================
// FloatingSelfCamera — Mini caméra flottante de l'animateur
// ------------------------------------------------------------
// Affiche une bulle vidéo (cercle) du participant local au-dessus
// du tableau blanc afin de conserver le lien humain pendant
// l'utilisation. Drag & drop libre, redimensionnable, masquable.
// ============================================================
import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { Track } from 'livekit-client';
import { Eye, EyeOff, Maximize2, Minimize2 } from 'lucide-react';

const Bubble = styled.div`
  position: absolute;
  width: ${(p) => p.$size}px;
  height: ${(p) => p.$size}px;
  border-radius: 50%;
  overflow: hidden;
  background: #0b1220;
  border: 2px solid rgba(255, 255, 255, 0.85);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.45);
  z-index: 1500;
  cursor: ${(p) => (p.$dragging ? 'grabbing' : 'grab')};
  user-select: none;
  touch-action: none;
  transition: ${(p) => (p.$dragging ? 'none' : 'box-shadow 0.2s, transform 0.2s')};

  &:hover {
    box-shadow: 0 10px 36px rgba(0, 0, 0, 0.55);
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scaleX(-1); /* miroir comme dans la vraie tuile */
  }
`;

const Controls = styled.div`
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(8px);
  padding: 4px 6px;
  border-radius: 999px;
  opacity: 0;
  transition: opacity 0.15s;

  ${Bubble}:hover & {
    opacity: 1;
  }

  button {
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.9);
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;

    &:hover {
      background: rgba(255, 255, 255, 0.15);
      color: #fff;
    }
  }
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 11px;
  text-align: center;
  padding: 8px;
`;

const ShowBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1500;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(8px);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;

  &:hover {
    background: rgba(15, 23, 42, 1);
  }
`;

const SIZES = [110, 150, 200];

/**
 * @param {object} props
 * @param {object} props.localParticipant - LiveKit local participant
 * @param {boolean} props.isCameraEnabled
 * @param {string} [props.label] - nom affiché si pas de vidéo
 * @param {string} [props.initialCorner] - 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
 */
export const FloatingSelfCamera = ({
  localParticipant,
  isCameraEnabled,
  label = 'Vous',
  initialCorner = 'bottom-right',
}) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const [sizeIdx, setSizeIdx] = useState(1);
  const size = SIZES[sizeIdx];
  const [pos, setPos] = useState(null); // {x, y}
  const [dragging, setDragging] = useState(false);
  const dragState = useRef({ offsetX: 0, offsetY: 0 });

  // Position initiale calculée d'après le coin demandé une fois la taille connue
  useEffect(() => {
    if (pos) return;
    const parent = containerRef.current?.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    const margin = 16;
    const map = {
      'top-left': { x: margin, y: margin },
      'top-right': { x: rect.width - size - margin, y: margin },
      'bottom-left': { x: margin, y: rect.height - size - margin },
      'bottom-right': { x: rect.width - size - margin, y: rect.height - size - margin },
    };
    setPos(map[initialCorner] || map['bottom-right']);
  }, [initialCorner, size, pos]);

  // Attache la piste vidéo locale
  useEffect(() => {
    if (!visible) return;
    if (!localParticipant || !isCameraEnabled) return;
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const pub = localParticipant.getTrackPublication?.(Track.Source.Camera);
    const track = pub?.track;
    if (!track) return;

    try {
      track.attach(videoEl);
    } catch (e) {
      console.warn('[FloatingSelfCamera] attach failed:', e);
    }
    return () => {
      try {
        track.detach(videoEl);
      } catch {}
    };
  }, [localParticipant, isCameraEnabled, visible]);

  const onPointerDown = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    dragState.current = {
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    };
    setDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }, []);

  const onPointerMove = useCallback(
    (e) => {
      if (!dragging) return;
      const parent = containerRef.current?.parentElement;
      if (!parent) return;
      const parentRect = parent.getBoundingClientRect();
      let x = e.clientX - parentRect.left - dragState.current.offsetX;
      let y = e.clientY - parentRect.top - dragState.current.offsetY;
      // clamp dans la zone
      x = Math.max(0, Math.min(parentRect.width - size, x));
      y = Math.max(0, Math.min(parentRect.height - size, y));
      setPos({ x, y });
    },
    [dragging, size]
  );

  const onPointerUp = useCallback(() => setDragging(false), []);

  if (!visible) {
    return (
      <ShowBtn onClick={() => setVisible(true)} aria-label="Afficher la mini caméra de l'animateur">
        <Eye size={14} /> Mini caméra
      </ShowBtn>
    );
  }

  if (!pos) return null;

  return (
    <Bubble
      ref={containerRef}
      $size={size}
      $dragging={dragging}
      style={{ left: pos.x, top: pos.y }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="region"
      aria-label="Mini caméra flottante de l'animateur"
    >
      {isCameraEnabled ? (
        <video ref={videoRef} autoPlay playsInline muted />
      ) : (
        <Placeholder>
          {label}
          <br />
          (caméra off)
        </Placeholder>
      )}

      <Controls onPointerDown={(e) => e.stopPropagation()}>
        <button
          type="button"
          title="Changer la taille"
          onClick={() => setSizeIdx((i) => (i + 1) % SIZES.length)}
        >
          {size === SIZES[SIZES.length - 1] ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
        </button>
        <button type="button" title="Masquer la mini caméra" onClick={() => setVisible(false)}>
          <EyeOff size={12} />
        </button>
      </Controls>
    </Bubble>
  );
};

export default FloatingSelfCamera;
