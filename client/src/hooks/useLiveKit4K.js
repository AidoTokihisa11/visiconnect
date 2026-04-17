import { VideoPresets } from 'livekit-client';
import { useMemo } from 'react';

/**
 * 🎯 Configuration LiveKit v5.0 - ULTIMATE Anti-Pixelisation + 1080p Mobile
 * 
 * PROBLÈME RÉSOLU: Pixelisation vidéo sur mobile et PC
 * 
 * DÉCOUVERTES CLÉS (recherche LiveKit SDK + MDN WebRTC):
 * 1. degradationPreference: 'maintain-resolution' → empêche WebRTC de downscaler
 * 2. priority: 'high' → priorité réseau QoS pour la vidéo
 * 3. Bitrates officiels LiveKit (VMAF 90): 720p=1.25Mbps, 1080p=2.70Mbps
 * 
 * SOLUTION v5.0:
 * - 1080p activé sur mobile haut de gamme (iPhone, Pixel, Samsung flagship)
 * - Bitrate mobile: 2.8 Mbps (Full HD)
 * - degradationPreference: 'maintain-resolution' (CRITIQUE - empêche pixelisation)
 * - H.264 Baseline sur mobile (VPU hardware)
 * - VP9 SVC sur desktop (meilleure qualité)
 */

/**
 * Détecte si le mobile est haut de gamme (capable de 1080p sans surchauffe)
 * - iPhone 12+ (A14+)
 * - Pixel 4+ (Tensor ou SD888+)
 * - Samsung Galaxy S20+, Note20+, A7x+
 */
const isHighEndMobile = () => {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  
  // iPhone 12+ (détection via iOS 14+ et device ratio)
  const isModernIPhone = /iPhone/.test(ua) && 
    (window.devicePixelRatio >= 3 || /iPhone1[2-9]|iPhone2[0-9]/.test(ua));
  
  // Pixel 4+ ou flagship Android (hardwareConcurrency >= 8)
  const isHighEndAndroid = /Android/.test(ua) && 
    (navigator.hardwareConcurrency >= 8 || /Pixel [4-9]|SM-[GN]9[89]|SM-S9|SM-A7[3-9]/.test(ua));
  
  // Vérification supplémentaire: écran haute résolution
  const hasHighResScreen = typeof window !== 'undefined' && 
    (window.screen?.width >= 1080 || window.screen?.height >= 1920);
  
  return (isModernIPhone || isHighEndAndroid) && hasHighResScreen;
};

export const useLiveKit4K = () => {
  const options = useMemo(() => {
    const isMobile = typeof navigator !== 'undefined' &&
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || '');

    const isHighEnd = isHighEndMobile();
    const isLowPowerDevice = isMobile && !isHighEnd;

    // === CONFIGURATION ANTI-PIXELISATION v5.0 ===
    const mobileFrameRate = 24;  // Économie batterie + esthétique cinéma
    const desktopFrameRate = 30;
    const targetFrameRate = isMobile ? mobileFrameRate : desktopFrameRate;

    // Codec: H.264 (hardware) sur mobile, VP9 SVC sur desktop
    const mobileCodec = 'h264';
    const desktopCodec = 'vp9';
    const targetCodec = isMobile ? mobileCodec : desktopCodec;

    // 📱 v5.0: Bitrates améliorés
    // Mobile haut de gamme: 2.8 Mbps (1080p H.264 VMAF 90)
    // Mobile standard: 1.5 Mbps (720p H.264)
    // Desktop: 3.0 Mbps (1080p VP9)
    const mobileBitrate = isHighEnd ? 2_800_000 : 1_500_000;
    const desktopBitrate = 3_000_000;
    const targetBitrate = isMobile ? mobileBitrate : desktopBitrate;

    // 📱 v5.0: Résolution adaptative mobile
    // Haut de gamme: 1080p | Standard: 720p
    const mobileResolution = isHighEnd ? VideoPresets.h1080.resolution : VideoPresets.h720.resolution;

    return {
      // Désactiver l'adaptation automatique sur mobile (cause des drops)
      adaptiveStream: !isMobile,
      dynacast: true,

      videoCaptureDefaults: {
        resolution: isMobile ? mobileResolution : VideoPresets.h1080.resolution,
        frameRate: targetFrameRate,
        facingMode: 'user',
      },

      publishDefaults: {
        // MOBILE: Désactiver simulcast pour forcer résolution constante
        simulcast: !isMobile,
        videoCodec: targetCodec,
        
        // Backup codec sécurisé
        backupCodec: isMobile 
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
    
    // 📱 v5.0: 1080p sur mobile haut de gamme
    const isHighEnd = isHighEndMobile();
    const mobileResolution = isHighEnd ? VideoPresets.h1080.resolution : VideoPresets.h720.resolution;

    return {
      resolution: isMobile ? mobileResolution : VideoPresets.h1080.resolution,
      facingMode: 'user'
    };
  }, []);

  return {
    options,
    videoOptions,
    // Exposer pour debug/stats
    isHighEndMobile: isHighEndMobile()
  };
};
