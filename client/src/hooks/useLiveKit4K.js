import { VideoPresets } from 'livekit-client';
import { useMemo } from 'react';

/**
 * Provides 4K-optimized LiveKit configuration.
 * Returns options prop for <LiveKitRoom>
 */
export const useLiveKit4K = () => {
  const options = useMemo(() => {
    // 1. Détection Mobile pour ajuster les performances
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || '');
    
    // Définition des Presets standards
    const preset4K = VideoPresets?.h2160 || { width: 3840, height: 2160, frameRate: 30 };
    const preset1080 = VideoPresets?.h1080 || { width: 1920, height: 1080, frameRate: 30 };
    const preset720 = VideoPresets?.h720 || { width: 1280, height: 720, frameRate: 30 };
    const preset540 = VideoPresets?.h540 || { width: 960, height: 540, frameRate: 30 };

    // Mode Mobile: On downgrade la demande pour éviter la surchauffe et les rejets de permission (NotAllowedError)
    const activeCaptureResolution = isMobile ? preset720.resolution : preset4K.resolution;
    const activeLayers = isMobile 
      ? [preset1080, preset720, preset540] 
      : [preset4K, preset1080, preset540];

    return {
      adaptiveStream: true, // IMPORTANT: Allows clients to only download the resolution they need
      dynacast: true,       // IMPORTANT: Pauses video sending if no one is looking at it
      videoCaptureDefaults: {
        resolution: activeCaptureResolution,
        frameRate: isMobile ? 30 : 60,
        facingMode: 'user',
      },
      publishDefaults: {
        simulcast: true,
        videoEncoding: {
          maxBitrate: isMobile ? 4000000 : 12000000,
          maxFramerate: isMobile ? 30 : 60,
        },
        videoSimulcastLayers: activeLayers,
        // Fallback codec pour mobiles (H264 a une accélération matérielle native à 100%)
        videoCodec: isMobile ? 'h264' : 'vp9',
        backupCodec: { codec: 'h264', encoding: 'max' },
        red: true,
      }
    };
  }, []);

  const videoOptions = useMemo(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent || '');
    return {
      resolution: isMobile 
        ? (VideoPresets?.h720?.resolution || { width: 1280, height: 720, frameRate: 30 })
        : (VideoPresets?.h1080 || { width: 1920, height: 1080, frameRate: 30 }),
      facingMode: 'user'
    };
  }, []);

  return {
    options,
    videoOptions
  };
};
