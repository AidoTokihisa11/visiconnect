import { VideoPresets } from 'livekit-client';
import { useMemo } from 'react';

/**
 * Hook de configuration autonome avec intégration VP9/H.264
 * conçu spécifiquement pour le moteur d'IA.
 * 
 * OPTIMISATIONS MOBILE v2.0:
 * - H.264 Baseline Profile: Décodage matériel natif (pas de surchauffe CPU)
 * - FPS bridé à 24: Réduit la charge GPU de 20% sans perte perceptible
 * - Simulcast 540p minimum: Empêche le SFU de tomber en 180p
 */
export const useAILiveKit = () => {
  const options = useMemo(() => {
    // Profiling matériel
    const isMobile = typeof navigator !== 'undefined' &&
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || '');

    const isLowPowerDevice = isMobile || (typeof navigator !== 'undefined' && navigator.hardwareConcurrency <= 4);

    // === CONFIGURATION ANTI-THERMAL-THROTTLING ===
    const mobileFrameRate = 24;
    const desktopFrameRate = 30;
    const targetFrameRate = isMobile ? mobileFrameRate : desktopFrameRate;

    // H.264 = décodage matériel sur mobile | VP9 = meilleure compression desktop
    const targetCodec = isLowPowerDevice ? 'h264' : 'vp9';

    // Bitrates par plateforme
    const targetBitrate = isMobile ? 2_500_000 : 5_000_000;

    return {
      adaptiveStream: true,
      dynacast: true,

      videoCaptureDefaults: {
        resolution: isMobile ? VideoPresets.h720.resolution : VideoPresets.h1080.resolution,
        frameRate: targetFrameRate,
        facingMode: 'user',
      },

      publishDefaults: {
        simulcast: true,
        videoCodec: targetCodec,
        backupCodec: isLowPowerDevice 
          ? { codec: 'h264', encoding: 'baseline' }
          : { codec: 'vp8', encoding: 'max' },

        videoEncoding: {
          maxBitrate: targetBitrate,
          maxFramerate: targetFrameRate,
        },

        // Simulcast layers optimisés par plateforme
        videoSimulcastLayers: isMobile
          ? [
              // Mobile: 540p minimum (pas de 180p)
              { width: 960, height: 540, encoding: { maxBitrate: 600_000, maxFramerate: 20 } },
              { width: 1280, height: 720, encoding: { maxBitrate: 1_500_000, maxFramerate: 24 } },
            ]
          : [
              // Desktop: 3 layers
              { width: 640, height: 360, encoding: { maxBitrate: 400_000, maxFramerate: 20 } },
              { width: 1280, height: 720, encoding: { maxBitrate: 1_500_000, maxFramerate: 30 } },
              { width: 1920, height: 1080, encoding: { maxBitrate: 4_000_000, maxFramerate: 30 } },
            ],
      }
    };
  }, []);

  const videoOptions = useMemo(() => {
    const isMobile = typeof navigator !== 'undefined' &&
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || '');

    return {
      resolution: isMobile ? VideoPresets.h720.resolution : VideoPresets.h1080.resolution,
      facingMode: 'user'
    };
  }, []);

  return { options, videoOptions };
};
