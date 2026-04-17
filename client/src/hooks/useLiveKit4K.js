import { VideoPresets } from 'livekit-client';
import { useMemo } from 'react';

/**
 * 🎯 Configuration LiveKit v4.0 - ULTIMATE Anti-Pixelisation
 * 
 * PROBLÈME RÉSOLU: Pixelisation vidéo sur mobile et PC
 * 
 * DÉCOUVERTES CLÉS (recherche LiveKit SDK + MDN WebRTC):
 * 1. degradationPreference: 'maintain-resolution' → empêche WebRTC de downscaler
 * 2. priority: 'high' → priorité réseau QoS pour la vidéo
 * 3. Bitrates officiels LiveKit (VMAF 90): 720p=1.25Mbps, 1080p=2.70Mbps
 * 
 * SOLUTION v4.0:
 * - degradationPreference: 'maintain-resolution' (CRITIQUE - empêche pixelisation)
 * - H.264 Baseline sur mobile (VPU hardware)
 * - VP9 SVC sur desktop (meilleure qualité)
 * - Bitrates calibrés selon guide LiveKit officiel
 * - Priority high pour QoS réseau
 */
export const useLiveKit4K = () => {
  const options = useMemo(() => {
    const isMobile = typeof navigator !== 'undefined' &&
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || '');

    const isLowPowerDevice = isMobile || (typeof navigator !== 'undefined' && navigator.hardwareConcurrency <= 4);

    // === CONFIGURATION ANTI-PIXELISATION v4.0 ===
    const mobileFrameRate = 24;  // Économie batterie + esthétique cinéma
    const desktopFrameRate = 30;
    const targetFrameRate = isMobile ? mobileFrameRate : desktopFrameRate;

    // Codec: H.264 (hardware) sur mobile, VP9 SVC sur desktop
    const mobileCodec = 'h264';
    const desktopCodec = 'vp9';
    const targetCodec = isLowPowerDevice ? mobileCodec : desktopCodec;

    // Bitrates LiveKit officiels (VMAF 90 = qualité visuelle excellente)
    // Source: https://docs.livekit.io/guides/video-codecs/bitrate/
    const mobileBitrate = 1_500_000;  // 1.5 Mbps (720p H.264 VMAF 90 + marge)
    const desktopBitrate = 3_000_000; // 3.0 Mbps (1080p VP9 VMAF 90 + marge)
    const targetBitrate = isMobile ? mobileBitrate : desktopBitrate;

    return {
      // Désactiver l'adaptation automatique sur mobile (cause des drops)
      adaptiveStream: !isMobile,
      dynacast: true,

      videoCaptureDefaults: {
        resolution: isMobile ? VideoPresets.h720.resolution : VideoPresets.h1080.resolution,
        frameRate: targetFrameRate,
        facingMode: 'user',
      },

      publishDefaults: {
        // MOBILE: Désactiver simulcast pour forcer 720p constant
        simulcast: !isMobile,
        videoCodec: targetCodec,
        
        // Backup codec sécurisé
        backupCodec: isLowPowerDevice 
          ? { codec: 'h264' }
          : { codec: 'vp8' },

        videoEncoding: {
          maxBitrate: targetBitrate,
          maxFramerate: targetFrameRate,
          
          // 🔥 CRITIQUE v4.0: Empêche WebRTC de réduire la résolution
          // Options: 'balanced' (défaut), 'maintain-framerate', 'maintain-resolution'
          // maintain-resolution = sacrifie FPS plutôt que pixels
          degradationPreference: isMobile ? 'maintain-resolution' : 'balanced',
          
          // Priorité réseau haute pour QoS
          priority: 'high',
          
          // Scalability mode: L1T1 = single layer (pas de drop possible)
          ...(isMobile && { scalabilityMode: 'L1T1' }),
        },

        // Layers simulcast optimisés (Desktop uniquement)
        videoSimulcastLayers: isMobile
          ? undefined // Pas de simulcast = un seul layer 720p
          : [
              // Layer Low: 360p pour connexions faibles
              { 
                width: 640, 
                height: 360, 
                encoding: { 
                  maxBitrate: 400_000, // 400kbps (VMAF 90 pour 360p)
                  maxFramerate: 20,
                  priority: 'low',
                } 
              },
              // Layer Medium: 720p standard
              { 
                width: 1280, 
                height: 720, 
                encoding: { 
                  maxBitrate: 1_500_000, // 1.5Mbps (VMAF 90 pour 720p VP9)
                  maxFramerate: 30,
                  priority: 'medium',
                } 
              },
              // Layer High: 1080p full quality
              { 
                width: 1920, 
                height: 1080, 
                encoding: { 
                  maxBitrate: 3_000_000, // 3Mbps (VMAF 90 pour 1080p VP9)
                  maxFramerate: 30,
                  priority: 'high',
                  degradationPreference: 'maintain-resolution',
                } 
              },
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
