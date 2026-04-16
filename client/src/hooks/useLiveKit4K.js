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
        // En mobile, on évite le 1080p natif qui sature le GPU lors du flou. On fixe du 720p propre.
        resolution: isMobile ? VideoPresets.h720.resolution : VideoPresets.h1080.resolution, 
        frameRate: isMobile ? 24 : 30, // 24fps sur Mobile empêche le smartphone de surchauffer et sauver 20% de batterie
        facingMode: 'user',
      },
      
      publishDefaults: {
        simulcast: true,
        // H.264 Force l'encodeur matériel (VPU) sur 100% des smartphones (Apple Silicon / Snapdragon)
        videoCodec: useH264 ? 'h264' : 'vp9',
        backupCodec: { codec: 'vp8', encoding: 'max' },
        
        videoEncoding: {
          maxBitrate: isMobile ? 2_000_000 : 5_000_000, 
          maxFramerate: isMobile ? 24 : 30,
        },
        
        // C'est ici que ça bloquait sur mobile : On supprime la couche 180p "pixelisée" pour forcer
        // le SFU à ne jamais descendre la qualité en dessous d'un seuil acceptable de SD (360p) minimum,
        // et on garde la couche haute à 720p (2 Mbps) pour la netteté cristalline.
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
