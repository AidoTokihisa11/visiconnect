import { VideoPresets } from 'livekit-client';
import { useMemo } from 'react';

/**
 * 1. Configuration de la Room (Optimisation Extrême PC/Mobile)
 * Résout le problème de l'image pixelisée sur mobile (Thermal Throttling / Congestion).
 */
export const useLiveKit4K = () => {
  const options = useMemo(() => {
    const isMobile = typeof navigator !== 'undefined' && 
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || '');
    
    // Si le CPU mobile chauffe, l'encodeur lâche des frames. H.264 Baseline allège drastiquement le CPU.
    const useH264 = isMobile || (typeof navigator !== 'undefined' && navigator.hardwareConcurrency <= 4);

    return {
      adaptiveStream: true,
      dynacast: true,
      
      videoCaptureDefaults: {
        // En mobile, on utilise la même résolution pour eviter une qualite déplorable
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
        
        // On rétablit le simulcast standard pour garantir une belle image
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

  return {
    options,
    videoOptions
  };
};
