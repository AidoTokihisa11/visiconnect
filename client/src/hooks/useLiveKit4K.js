import { VideoPresets } from 'livekit-client';
import { useMemo } from 'react';

/**
 * 🎯 Configuration LiveKit v5.1 - ULTRA 1080p Mobile
 * 
 * PROBLÈME RÉSOLU: Pixelisation vidéo sur mobile et PC
 * 
 * DÉCOUVERTES CLÉS (recherche LiveKit SDK + MDN WebRTC):
 * 1. degradationPreference: 'maintain-resolution' → empêche WebRTC de downscaler
 * 2. priority: 'high' → priorité réseau QoS pour la vidéo
 * 3. Bitrates officiels LiveKit (VMAF 90): 720p=1.25Mbps, 1080p=2.70Mbps
 * 
 * SOLUTION v5.1 - ULTRA:
 * - 1080p FORCÉ sur TOUS les mobiles (plus de 720p)
 * - Bitrate mobile: 2.8 Mbps (Full HD)
 * - degradationPreference: 'maintain-resolution' (CRITIQUE - empêche pixelisation)
 * - H.264 Baseline sur mobile (VPU hardware)
 * - VP9 SVC sur desktop (meilleure qualité)
 */

export const useLiveKit4K = () => {
  const options = useMemo(() => {
    const isMobile = typeof navigator !== 'undefined' &&
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || '');

    // === CONFIGURATION ULTRA v5.1 - 1080p PARTOUT ===
    const mobileFrameRate = 24;  // Économie batterie + esthétique cinéma
    const desktopFrameRate = 30;
    const targetFrameRate = isMobile ? mobileFrameRate : desktopFrameRate;

    // Codec: H.264 (hardware) sur mobile, VP9 SVC sur desktop
    const mobileCodec = 'h264';
    const desktopCodec = 'vp9';
    const targetCodec = isMobile ? mobileCodec : desktopCodec;

    // 📱 v5.1 ULTRA: 1080p + 2.8 Mbps sur TOUS les mobiles
    // Plus de distinction haut de gamme / standard
    const mobileBitrate = 2_800_000;  // 2.8 Mbps (1080p H.264 VMAF 90)
    const desktopBitrate = 3_000_000; // 3.0 Mbps (1080p VP9)
    const targetBitrate = isMobile ? mobileBitrate : desktopBitrate;

    return {
      // Désactiver l'adaptation automatique sur mobile (cause des drops)
      adaptiveStream: !isMobile,
      dynacast: true,

      videoCaptureDefaults: {
        // 🔥 v5.1: 1080p FORCÉ sur mobile
        resolution: VideoPresets.h1080.resolution,
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
      },

      // 🔇 v5.2: Configuration Audio avec Noise Suppression native LiveKit
      audioCaptureDefaults: {
        // Active le traitement audio natif du navigateur
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
        // Paramètres avancés WebRTC
        channelCount: 1, // Mono pour la voix (économie bande passante)
        sampleRate: 48000, // 48kHz standard WebRTC
      },

      audioDefaults: {
        // Paramètres d'encodage audio
        dtx: true, // Discontinuous Transmission - économise bande passante pendant les silences
        red: true, // Redundant coding pour résilience perte paquets
      },
    };
  }, []);

  const videoOptions = useMemo(() => {
    const isMobile = typeof navigator !== 'undefined' &&
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || '');

    return {
      // 🔥 v5.1 ULTRA: 1080p FORCÉ sur TOUS les appareils
      resolution: VideoPresets.h1080.resolution,
      facingMode: 'user'
    };
  }, []);

  return {
    options,
    videoOptions
  };
};
