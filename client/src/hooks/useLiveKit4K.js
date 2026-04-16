import { VideoPresets } from 'livekit-client';
import { useMemo } from 'react';

/**
 * 1. Configuration de la Room (Architecture de pointe)
 * Active le Simulcast, Dynacast, AdaptiveStream et gère le VP9 SVC avec fallback matériel H.264.
 */
export const useLiveKit4K = () => {
  const options = useMemo(() => {
    return {
      adaptiveStream: true,
      dynacast: true,
      
      videoCaptureDefaults: {
        resolution: VideoPresets.h2160.resolution, // 4K native target
        frameRate: 30, // Conserve 30fps pour stabiliser le frametime d'encodage
      },
      
      publishDefaults: {
        simulcast: true,
        videoCodec: 'vp9', // Priorité au VP9 pour le Scalable Video Coding (SVC)
        backupCodec: { codec: 'h264', encoding: 'max' }, // Fallback matériel garanti pour les anciens GPU/Mobiles
        
        videoEncoding: {
          maxBitrate: 8_000_000, // 8 Mbps cible pour la couche Ultra-High
          maxFramerate: 30,
        },
        
        // Paliers Simulcast stricts (360p, 720p, 4K/1080p fallback)
        videoSimulcastLayers: [
          { width: 640, height: 360, encoding: { maxBitrate: 400_000, maxFramerate: 20 } },
          { width: 1280, height: 720, encoding: { maxBitrate: 1_500_000, maxFramerate: 30 } },
          { width: 3840, height: 2160, encoding: { maxBitrate: 8_000_000, maxFramerate: 30 } },
        ],
      }
    };
  }, []);

  const videoOptions = useMemo(() => {
    // La room gère la capture matérielle via ce paramètre en mode caméra par défaut
    return {
      resolution: VideoPresets.h1080.resolution, // Fallback safe si 4k rate
      facingMode: 'user'
    };
  }, []);

  return {
    options,
    videoOptions
  };
};
