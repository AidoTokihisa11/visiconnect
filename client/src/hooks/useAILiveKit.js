import { VideoPresets } from 'livekit-client';
import { useMemo } from 'react';

/**
 * Hook de configuration autonome avec intégration VP9/H.264
 * conçu spécifiquement pour le moteur d'IA.
 */
export const useAILiveKit = () => {
  const options = useMemo(() => {
    // Profiling matériel
    const isMobile = typeof navigator !== 'undefined' &&
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || '');

    const isLowPower = isMobile || (typeof navigator !== 'undefined' && navigator.hardwareConcurrency <= 4);

    return {
      adaptiveStream: true, // Jitter buffer fallback & simulcast dynamique
      dynacast: true, // Anti-black-screen: freeze automatique des streams non visibles

      videoCaptureDefaults: {
        resolution: VideoPresets.h1080.resolution,
        frameRate: 30,
        facingMode: 'user',
      },

      publishDefaults: {
        simulcast: true,
        videoCodec: 'vp9',
        backupCodec: { codec: 'vp8', encoding: 'max' },

        videoEncoding: {
          maxBitrate: 5_000_000,
          maxFramerate: 30,
        },

        videoSimulcastLayers: [
          { width: 640, height: 360, encoding: { maxBitrate: 400_000, maxFramerate: 20 } },
          { width: 1280, height: 720, encoding: { maxBitrate: 1_500_000, maxFramerate: 30 } },
          { width: 1920, height: 1080, encoding: { maxBitrate: 4_000_000, maxFramerate: 30 } },
        ],
      }
    };
  }, []);

  const videoOptions = useMemo(() => {
    return {
      resolution: VideoPresets.h1080.resolution,
      facingMode: 'user'
    };
  }, []);

  return { options, videoOptions };
};
