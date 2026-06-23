/**
 * useAudioLevel — Web Audio API hook
 * Returns a 0-1 RMS level from the local microphone track.
 * Used to drive the mic button glow ring in BottomControlBar.
 */
import { useEffect, useRef, useState } from 'react';

export const useAudioLevel = ({ isMicEnabled, localParticipant }) => {
  const [level, setLevel] = useState(0);
  const animRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    if (!isMicEnabled) {
      setLevel(0);
      return;
    }

    let cancelled = false;

    const start = async () => {
      try {
        let stream;
        if (localParticipant) {
          const audioPubs = Array.from(localParticipant.audioTrackPublications?.values?.() || []);
          const pub = audioPubs.find((p) => p.track?.mediaStreamTrack);
          if (pub) stream = new MediaStream([pub.track.mediaStreamTrack]);
        }
        if (!stream) {
          stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        }
        if (cancelled) return;

        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.8;

        const source = ctx.createMediaStreamSource(stream);
        source.connect(analyser);

        ctxRef.current = ctx;
        analyserRef.current = analyser;
        sourceRef.current = source;

        const data = new Uint8Array(analyser.frequencyBinCount);

        const tick = () => {
          if (cancelled) return;
          analyser.getByteFrequencyData(data);
          // RMS over all bins → single 0-1 value
          const rms = Math.sqrt(data.reduce((sum, v) => sum + v * v, 0) / data.length) / 128;
          setLevel(Math.min(1, rms));
          animRef.current = requestAnimationFrame(tick);
        };

        animRef.current = requestAnimationFrame(tick);
      } catch {
        // Analyser unavailable — level stays 0, no crash
      }
    };

    start();

    return () => {
      cancelled = true;
      if (animRef.current) cancelAnimationFrame(animRef.current);
      try {
        sourceRef.current?.disconnect();
      } catch {}
      try {
        ctxRef.current?.close();
      } catch {}
      analyserRef.current = null;
      ctxRef.current = null;
      sourceRef.current = null;
    };
  }, [isMicEnabled, localParticipant]);

  return level;
};
