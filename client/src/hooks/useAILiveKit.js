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
        resolution: isMobile ? VideoPresets.h720.resolution : VideoPresets.h1080.resolution, 
        frameRate: isMobile ? 24 : 30, // Sécurité thermique base
        facingMode: 'user',
      },
      
      publishDefaults: {
        simulcast: true,
        // VP9 Scalable Video Coding pour PC (ultra net et adaptatif CPU)
        // H.264 Baseline strict pour forcer l'usage du ASIC/VPU sur Mobile (Zero CPU)
        videoCodec: isLowPower ? 'h264' : 'vp9',
        backupCodec: { codec: 'vp8', encoding: 'max' },
        
        videoEncoding: {
          maxBitrate: isMobile ? 2_000_000 : 5_000_000, 
          maxFramerate: isMobile ? 24 : 30,
        },
        
        videoSimulcastLayers: isMobile ? [
          { width: 640, height: 360, encoding: { maxBitrate: 500_000, maxFramerate: 20 } },
          { width: 960, height: 540, encoding: { maxBitrate: 1_200_000, maxFramerate: 24 } },
          { width: 1280, height: 720, encoding: { maxBitrate: 2_000_000, maxFramerate: 24 } },
        ] : [
          { width: 640, height: 360, encoding: { maxBitrate: 400_000, maxFramerate: 20 } },
          { width: 1280, height: 720, encoding: { maxBitrate: 1_500_000, maxFramerate: 30 } },
          { width: 1920, height: 1080, encoding: { maxBitrate: 4_000_000, maxFramerate: 30 } },
        ],
      }
    };
  }, []);

  return { options };
};
