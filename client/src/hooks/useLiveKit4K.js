import { VideoPresets } from 'livekit-client';
import { useMemo } from 'react';

/**
 * 1. Configuration de la Room (Architecture de pointe mais Adaptative)
 * Force H.264 et résolutions SD sur Mobile pour sauver le processeur et éviter les freezes.
 * VP9 SVC et 1080p/4K réservés uniquement aux ordinateurs de bureau PC/Mac ultra performants.
 */
export const useLiveKit4K = () => {
  const options = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && 
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || '');
    
    // Un appareil avec 4 cœurs ou moins est considéré faible
    const isWeakDevice = typeof navigator !== 'undefined' && 
      (navigator.hardwareConcurrency <= 4);

    // Le mobile *doit* utiliser H264 pour profiter de la puce d'accélération matérielle Apple/Snapdragon
    const useH264 = isMobile || isWeakDevice;

    return {
      adaptiveStream: true,
      dynacast: true,
      
      videoCaptureDefaults: {
        // En mobile, on divise immédiatement la demande caméra par 4 (540p) pour alléger l'IA de flou et l'encodage
        resolution: isMobile ? VideoPresets.h540.resolution : VideoPresets.h1080.resolution, 
        frameRate: isMobile ? 24 : 30, // 24fps libère 20% de charge processeur sur mobile
      },
      
      publishDefaults: {
        simulcast: true,
        videoCodec: useH264 ? 'h264' : 'vp9', // VP9 logiciel tue les mobiles, H.264 est natif et bypass iOS
        backupCodec: { codec: 'vp8', encoding: 'max' }, // vp8 au lieu de h264 en backup s'il n'y a rien d'autre
        
        videoEncoding: {
          maxBitrate: isMobile ? 1_500_000 : 5_000_000, 
          maxFramerate: isMobile ? 24 : 30,
        },
        
        // Paliers Simulcast Adaptés - Si appareil lent on réduit tout à 360p/540p max
        videoSimulcastLayers: isMobile ? [
          { width: 320, height: 180, encoding: { maxBitrate: 150_000, maxFramerate: 15 } },
          { width: 640, height: 360, encoding: { maxBitrate: 400_000, maxFramerate: 20 } },
          { width: 960, height: 540, encoding: { maxBitrate: 1_500_000, maxFramerate: 24 } },
        ] : [
          { width: 640, height: 360, encoding: { maxBitrate: 400_000, maxFramerate: 20 } },
          { width: 1280, height: 720, encoding: { maxBitrate: 1_500_000, maxFramerate: 30 } },
          { width: 1920, height: 1080, encoding: { maxBitrate: 4_000_000, maxFramerate: 30 } },
        ],
      }
    };
  }, []);

  const videoOptions = useMemo(() => {
    // La room gère la capture matérielle via ce paramètre en mode caméra par défaut
    const isMobile = typeof window !== 'undefined' && 
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || '');
    
    return {
      resolution: isMobile ? VideoPresets.h540.resolution : VideoPresets.h1080.resolution,
      facingMode: 'user'
    };
  }, []);

  return {
    options,
    videoOptions
  };
};
