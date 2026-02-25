import { VideoPresets } from 'livekit-client';
import { useMemo } from 'react';

/**
 * Provides 4K-optimized LiveKit configuration.
 * Returns options prop for <LiveKitRoom>
 */
export const useLiveKit4K = () => {
  const options = useMemo(() => {
    // Define presets safely
    const preset4K = VideoPresets?.h2160 || { width: 3840, height: 2160, frameRate: 30 };
    const preset1080 = VideoPresets?.h1080 || { width: 1920, height: 1080, frameRate: 30 };
    const preset540 = VideoPresets?.h540 || { width: 960, height: 540, frameRate: 30 };

    return {
      adaptiveStream: true,
      dynacast: true,
      videoCaptureDefaults: {
        resolution: preset4K.resolution,
        facingMode: 'user',
      },
      publishDefaults: {
        simulcast: true,
        videoSimulcastLayers: [
          preset4K,     // 4K - 3840x2160
          preset1080,   // Full HD
          preset540     // Fallback / Mobile
        ],
        videoCodec: 'vp9', // Prefer VP9 for high resolution efficiency
        backupCodec: { codec: 'h264', encoding: 'max' },
        red: true, // Redundant Audio Data for better audio resilience
      }
    };
  }, []);

  const videoOptions = useMemo(() => ({
    resolution: VideoPresets?.h2160?.resolution || { width: 3840, height: 2160, frameRate: 30 },
    facingMode: 'user'
  }), []);

  return {
    options,
    videoOptions
  };
};
