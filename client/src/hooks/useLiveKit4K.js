import { VideoPresets } from 'livekit-client';
import { useMemo } from 'react';

/**
 * 1. Configuration de la Room (Architecture de pointe mais Adaptative)
 * Force H.264 sur Mobile pour l'accélération matérielle, mais on restaure 
 * une résolution 720p HD claire et un bitrate décent (2.5 Mbps).
 */
export const useLiveKit4K = () => {
  const options = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && 
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || '');
    
    // Un appareil avec 4 cœurs ou moins est considéré très faible
    const isWeakDevice = typeof navigator !== 'undefined' && 
      (navigator.hardwareConcurrency <= 4);

    // Le mobile *doit* utiliser H264 pour profiter de la puce d'accélération matérielle (Apple/Snapdragon)
    const useH264 = isMobile || isWeakDevice;

    return {
      adaptiveStream: true,
      dynacast: true,
      
      videoCaptureDefaults: {
        // 720p HD natif pour les mobiles (sweet spot netteté/batterie), 1080p natif pour PC
        resolution: isMobile ? VideoPresets.h720.resolution : VideoPresets.h1080.resolution, 
        frameRate: 30, // 30fps universel 
      },
      
      publishDefaults: {
        simulcast: true,
        videoCodec: useH264 ? 'h264' : 'vp9',
        backupCodec: { codec: 'vp8', encoding: 'max' },
        
        videoEncoding: {
          maxBitrate: isMobile ? 2_500_000 : 5_000_000, // 2.5 Mbps pour une HD parfaite sur mobile
          maxFramerate: 30,
        },
        
        // Paliers Simulcast : On autorise le 720p en couche haute sur mobile
        videoSimulcastLayers: isMobile ? [
          { width: 320, height: 180, encoding: { maxBitrate: 150_000, maxFramerate: 15 } },
          { width: 640, height: 360, encoding: { maxBitrate: 400_000, maxFramerate: 20 } },
          { width: 1280, height: 720, encoding: { maxBitrate: 2_000_000, maxFramerate: 30 } },
        ] : [
          { width: 640, height: 360, encoding: { maxBitrate: 400_000, maxFramerate: 20 } },
          { width: 1280, height: 720, encoding: { maxBitrate: 1_500_000, maxFramerate: 30 } },
          { width: 1920, height: 1080, encoding: { maxBitrate: 4_000_000, maxFramerate: 30 } },
        ],
      }
    };
  }, []);

  const videoOptions = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && 
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
