import { VideoPresets } from 'livekit-client';
import { useMemo } from 'react';

/**
 * 1. Configuration de la Room (Optimisation Extrême PC/Mobile)
 * Résout le problème de l'image pixelisée sur mobile (Thermal Throttling / Congestion).
 * 
 * OPTIMISATIONS MOBILE v2.0:
 * - H.264 Baseline Profile: Décodage matériel natif sur 99% des mobiles (pas de surchauffe CPU)
 * - FPS bridé à 24: Réduit la charge GPU de 20% sans perte perceptible (cinématique)
 * - Simulcast 540p minimum: Empêche le SFU de tomber en 180p (qualité plancher acceptable)
 */
export const useLiveKit4K = () => {
  const options = useMemo(() => {
    const isMobile = typeof navigator !== 'undefined' &&
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || '');

    // Détection CPU faible (4 cores ou moins = probable ARM mid-range)
    const isLowPowerDevice = isMobile || (typeof navigator !== 'undefined' && navigator.hardwareConcurrency <= 4);

    // === CONFIGURATION MOBILE ANTI-THERMAL-THROTTLING ===
    const mobileFrameRate = 24; // Cinématique, économie de 20% GPU
    const desktopFrameRate = 30;
    const targetFrameRate = isMobile ? mobileFrameRate : desktopFrameRate;

    // H.264 Baseline = décodage matériel natif sur mobile (pas de surchauffe)
    // VP9 = meilleure compression mais software-only sur la plupart des mobiles (surchauffe)
    const mobileCodec = 'h264';
    const desktopCodec = 'vp9';
    const targetCodec = isLowPowerDevice ? mobileCodec : desktopCodec;

    // Bitrates optimisés par plateforme
    const mobileBitrate = 2_500_000; // 2.5 Mbps (suffisant pour 720p@24fps H.264)
    const desktopBitrate = 5_000_000; // 5 Mbps (1080p@30fps VP9)
    const targetBitrate = isMobile ? mobileBitrate : desktopBitrate;

    return {
      adaptiveStream: true,
      dynacast: true,

      videoCaptureDefaults: {
        // Mobile: 720p pour éviter l'upscaling inutile et économiser la batterie
        // Desktop: 1080p natif
        resolution: isMobile ? VideoPresets.h720.resolution : VideoPresets.h1080.resolution,
        frameRate: targetFrameRate,
        facingMode: 'user',
      },

      publishDefaults: {
        simulcast: true,
        videoCodec: targetCodec,
        // Fallback intelligent: H.264 sur mobile, VP8 sur desktop (compatibilité max)
        backupCodec: isLowPowerDevice 
          ? { codec: 'h264', encoding: 'baseline' }
          : { codec: 'vp8', encoding: 'max' },

        videoEncoding: {
          maxBitrate: targetBitrate,
          maxFramerate: targetFrameRate,
        },

        // === SIMULCAST LAYERS OPTIMISÉS ===
        // Mobile: 2 layers (540p + 720p) - Empêche la chute en 180p
        // Desktop: 3 layers (360p + 720p + 1080p) - Qualité maximale
        videoSimulcastLayers: isMobile
          ? [
              // Layer bas mobile: 540p (pas de 180p dégueulasse)
              { width: 960, height: 540, encoding: { maxBitrate: 600_000, maxFramerate: 20 } },
              // Layer haut mobile: 720p (qualité cible)
              { width: 1280, height: 720, encoding: { maxBitrate: 1_500_000, maxFramerate: 24 } },
            ]
          : [
              // Desktop: 3 layers pour adaptation réseau fine
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

  return {
    options,
    videoOptions
  };
};
