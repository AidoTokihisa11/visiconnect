import { AIImageEnhancer } from '../lib/AIImageEnhancer';
import { RoomEvent, VideoPresets, Track, createLocalVideoTrack, VideoQuality } from 'livekit-client';

/**
 * 🎯 LiveKit Engine v4.1 - Anti-Freeze Mobile
 * 
 * PROBLÈME: Freeze mobile quelques secondes après join
 * CAUSE: Activation caméra/micro simultanée pendant handshake WebRTC
 * 
 * SOLUTION v4.1:
 * - Délai échelonné pour l'activation des tracks sur mobile
 * - Keyframe agressive via setVideoQuality(HIGH)
 * - Protection contre les race conditions
 */

/**
 * 2. Logique de Publication Intelligente (publishSmartMedia)
 * Détecte les capacités matérielles et priorise le flux réseau.
 */
export const publishSmartMedia = async (room) => {
  try {
    const isMobile = typeof navigator !== 'undefined' && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    
    // 🔥 FIX v4.1: Sur mobile, attendre que la connexion soit stable
    if (isMobile && room.state !== 'connected') {
      console.log('[WebRTC] Mobile: Attente connexion stable avant publication...');
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    const has4KHardware = typeof navigator !== 'undefined'
      && navigator.hardwareConcurrency >= 8
      && window.screen.width >= 2560
      && !isMobile; // Jamais de 4K sur mobile

    const targetResolution = has4KHardware ? VideoPresets.h2160.resolution : 
                            isMobile ? VideoPresets.h720.resolution : 
                            VideoPresets.h1080.resolution;

    // 1. Création de la track locale pure
    const localVideoTrack = await createLocalVideoTrack({
      resolution: targetResolution,
      facingMode: 'user',
    });

    // 2. Application de l'AI Image Enhancer (Auto-Lighting / Smart Upscaling)
    // 🔥 FIX v4.1: Skip sur mobile pour éviter freeze
    if (!isMobile) {
      const enhancer = new AIImageEnhancer();
      await enhancer.init({ track: localVideoTrack.mediaStreamTrack });
      
      if (enhancer.processedTrack && enhancer.processedTrack !== localVideoTrack.mediaStreamTrack) {
        localVideoTrack.mediaStreamTrack = enhancer.processedTrack;
      }
    }

    // 3. Publication avec priorité maximale
    await room.localParticipant.publishTrack(localVideoTrack, {
      simulcast: !isMobile, // Pas de simulcast sur mobile
      name: 'camera',
      source: Track.Source.Camera,
      priority: 'high',
    });

    return localVideoTrack;
  } catch (error) {
    console.error('[WebRTC] Erreur matérielle lors de la publication:', error);
    throw error;
  }
};

/**
 * 3. Stratégie Anti-Freeze & Rétablissement v4.1
 * S'attache à la room pour forcer une image parfaite dès la souscription et gérer les déconnexions.
 * 
 * AMÉLIORATIONS v4.1:
 * - Délai échelonné pour les tracks sur mobile
 * - Protection contre les race conditions
 * - Keyframe agressive après connexion
 */
export const setupAntiFreezeListeners = (room) => {
  if(!room) return;
  
  const isMobile = typeof navigator !== 'undefined' && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  
  // A. Élimine l'écran noir initial à l'arrivée d'un track 
  room.on(RoomEvent.TrackSubscribed, (track, publication, participant) => {
    if (track.kind === Track.Kind.Video) {
      // 🔥 FIX v4.1: Délai sur mobile pour éviter surcharge CPU
      const delay = isMobile ? 300 : 0;
      
      setTimeout(() => {
        // Demande agressive au SFU de générer une Keyframe (PLI - Picture Loss Indication)
        if (typeof publication.setVideoQuality === 'function') {
          publication.setVideoQuality(VideoQuality.HIGH);
        }
        
        // On s'assure que le flux n'est pas "downcasted" par défaut
        if (typeof track.setDowncasted === 'function') {
          track.setDowncasted(false);
        }
      }, delay);
    }
  });

  // B. Gestion des micro-coupures
  room.on(RoomEvent.ConnectionStateChanged, (state) => {
    if (state === 'reconnecting') {
      console.warn('[WebRTC] Dégradation réseau détectée, maintien des flux actifs en cache...');
    }
    
    // 🔥 FIX v4.1: Forcer refresh après reconnexion
    if (state === 'connected') {
      console.log('[WebRTC] Connexion établie/rétablie');
      
      // Demander des keyframes pour tous les tracks vidéo après connexion
      if (isMobile) {
        setTimeout(() => {
          room.remoteParticipants.forEach(participant => {
            participant.trackPublications.forEach(pub => {
              if (pub.track?.kind === Track.Kind.Video && typeof pub.setVideoQuality === 'function') {
                pub.setVideoQuality(VideoQuality.HIGH);
              }
            });
          });
        }, 500);
      }
    }
  });

  // C. 🆕 FIX v4.1: Protection contre le freeze au premier track local publié
  room.on(RoomEvent.LocalTrackPublished, (publication, participant) => {
    if (publication.track?.kind === Track.Kind.Video && isMobile) {
      console.log('[WebRTC] Track local publié sur mobile - stabilisation...');
      // Laisser le temps au GPU de s'initialiser
      setTimeout(() => {
        if (typeof publication.setVideoQuality === 'function') {
          publication.setVideoQuality(VideoQuality.HIGH);
        }
      }, 1000);
    }
  });
};
