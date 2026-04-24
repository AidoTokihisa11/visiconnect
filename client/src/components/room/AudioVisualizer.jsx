/**
 * AudioVisualizer — Web Audio API VU Meter
 * Shows a real-time audio level bar for the local microphone.
 * Uses the LiveKit localParticipant's audio MediaStreamTrack to avoid
 * requesting a second getUserMedia permission.
 */
import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ROOM_THEME as THEME } from '../../styles/roomTheme';

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  height: 20px;
  width: 32px;
`;

const Bar = styled.div`
  flex: 1;
  border-radius: 2px;
  background: ${({ $active, $level }) =>
    $active
      ? $level > 0.7
        ? '#ef4444'   /* loud — red */
        : $level > 0.35
        ? '#f59e0b'   /* mid  — amber */
        : '#22c55e'   /* low  — green */
      : 'rgba(255,255,255,0.15)'};
  transition: height 0.08s ease-out, background 0.15s ease;
  min-height: 3px;
`;

/**
 * @param {object} props
 * @param {boolean}  props.isMicEnabled  — whether the mic is on
 * @param {object}   props.localParticipant — LiveKit LocalParticipant (optional)
 */
export const AudioVisualizer = ({ isMicEnabled, localParticipant }) => {
  const [levels, setLevels] = useState([0, 0, 0, 0]);
  const animRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    if (!isMicEnabled) {
      setLevels([0, 0, 0, 0]);
      return;
    }

    let cancelled = false;

    const start = async () => {
      try {
        // Prefer the LiveKit audio track's MediaStreamTrack to avoid double getUserMedia
        let stream;
        if (localParticipant) {
          const audioPubs = Array.from(localParticipant.audioTrackPublications?.values?.() || []);
          const localAudioPub = audioPubs.find(p => p.track?.mediaStreamTrack);
          if (localAudioPub) {
            stream = new MediaStream([localAudioPub.track.mediaStreamTrack]);
          }
        }

        // Fallback: request mic directly (no additional permission if already granted)
        if (!stream) {
          stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        }

        if (cancelled) return;

        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 64;
        analyser.smoothingTimeConstant = 0.75;

        const source = ctx.createMediaStreamSource(stream);
        source.connect(analyser);

        ctxRef.current = ctx;
        analyserRef.current = analyser;
        sourceRef.current = source;

        const data = new Uint8Array(analyser.frequencyBinCount);

        const tick = () => {
          if (cancelled) return;
          analyser.getByteFrequencyData(data);

          // Map 32 frequency bins onto 4 visual bars
          const chunkSize = Math.floor(data.length / 4);
          const newLevels = Array.from({ length: 4 }, (_, i) => {
            const slice = data.slice(i * chunkSize, (i + 1) * chunkSize);
            const avg = slice.reduce((s, v) => s + v, 0) / slice.length;
            return avg / 255; // normalise 0-1
          });

          setLevels(newLevels);
          animRef.current = requestAnimationFrame(tick);
        };

        animRef.current = requestAnimationFrame(tick);
      } catch (err) {
        console.warn('[AudioVisualizer] Could not start analyser:', err);
      }
    };

    start();

    return () => {
      cancelled = true;
      if (animRef.current) cancelAnimationFrame(animRef.current);
      try { sourceRef.current?.disconnect(); } catch {}
      try { ctxRef.current?.close(); } catch {}
      analyserRef.current = null;
      ctxRef.current = null;
      sourceRef.current = null;
    };
  }, [isMicEnabled, localParticipant]);

  return (
    <Wrapper title="Niveau micro">
      {levels.map((lvl, i) => (
        <Bar
          key={i}
          $active={isMicEnabled}
          $level={lvl}
          style={{ height: isMicEnabled ? `${Math.max(20, lvl * 100)}%` : '20%' }}
        />
      ))}
    </Wrapper>
  );
};
