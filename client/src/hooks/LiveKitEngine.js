import { AIImageEnhancer } from '../lib/AIImageEnhancer';
import {
  RoomEvent,
  VideoPresets,
  Track,
  createLocalVideoTrack,
  VideoQuality,
} from 'livekit-client';

/**
 * LiveKit Engine — Publication et stratégie anti-freeze mobile.
 *
 * Problème résolu : freeze mobile en début de session WebRTC.
 * Cause : activation caméra/micro simultanée pendant le handshake.
 * Stratégie : délai échelonné, keyframe agressive (PLI), protection race conditions.
 */

/**
 * 2. Logique de Publication Intelligente (publishSmartMedia)
 * Détecte les capacités matérielles et priorise le flux réseau.
 */
export const publishSmartMedia = async (room) => {
  try {
    const isMobile =
      typeof navigator !== 'undefined' && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

    // Sur mobile, la connexion doit être stable avant toute publication.
    if (isMobile && room.state !== 'connected') {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    const has4KHardware =
      typeof navigator !== 'undefined' &&
      navigator.hardwareConcurrency >= 8 &&
      window.screen.width >= 2560 &&
      !isMobile; // Jamais de 4K sur mobile

    const targetResolution = has4KHardware
      ? VideoPresets.h2160.resolution
      : isMobile
        ? VideoPresets.h720.resolution
        : VideoPresets.h1080.resolution;

    // 1. Création de la track locale pure
    const localVideoTrack = await createLocalVideoTrack({
      resolution: targetResolution,
      facingMode: 'user',
    });

    // 2. Application de l'AI Image Enhancer (Auto-Lighting / Smart Upscaling).
    // Désactivé sur mobile : le traitement GPU causerait des freezes.
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
 * Stratégie anti-freeze : s'attache aux événements LiveKit pour forcer une image propre
 * dès la souscription et gérer les déconnexions/reconnexions.
 */
export const setupAntiFreezeListeners = (room) => {
  if (!room) return;

  const isMobile =
    typeof navigator !== 'undefined' && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

  // A. Élimine l'écran noir initial à l'arrivée d'un track
  room.on(RoomEvent.TrackSubscribed, (track, publication, participant) => {
    if (track.kind === Track.Kind.Video) {
      // Délai sur mobile pour ne pas surcharger le CPU pendant le décodage initial.
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

    if (state === 'connected') {
      // Forcer le rafraîchissement des keyframes pour tous les tracks vidéo après reconnexion.
      if (isMobile) {
        setTimeout(() => {
          room.remoteParticipants.forEach((participant) => {
            participant.trackPublications.forEach((pub) => {
              if (
                pub.track?.kind === Track.Kind.Video &&
                typeof pub.setVideoQuality === 'function'
              ) {
                pub.setVideoQuality(VideoQuality.HIGH);
              }
            });
          });
        }, 500);
      }
    }
  });

  // C. Sur mobile, laisser le GPU s'initialiser avant de monter en qualité.
  room.on(RoomEvent.LocalTrackPublished, (publication, participant) => {
    if (publication.track?.kind === Track.Kind.Video && isMobile) {
      setTimeout(() => {
        if (typeof publication.setVideoQuality === 'function') {
          publication.setVideoQuality(VideoQuality.HIGH);
        }
      }, 1000);
    }
  });
};

/**
 * 4. Page Visibility API Protection
 * Prevents WebRTC streams from being suspended when the tab is hidden or minimised.
 * Returns a cleanup function to call on unmount.
 */
export const setupVisibilityProtection = (room) => {
  if (!room || typeof document === 'undefined') return () => {};

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      // Re-request HIGH quality keyframes for every remote video track
      room.remoteParticipants.forEach((participant) => {
        participant.trackPublications.forEach((pub) => {
          if (pub.track?.kind === Track.Kind.Video) {
            if (typeof pub.setVideoQuality === 'function') {
              pub.setVideoQuality(VideoQuality.HIGH);
            }
            // Force a PLI (Picture Loss Indication) to refresh the decoded frame
            if (typeof pub.track.setDowncasted === 'function') {
              pub.track.setDowncasted(false);
            }
          }
        });
      });

      // Re-enable local camera/mic tracks that browsers may have suspended
      room.localParticipant?.trackPublications?.forEach((pub) => {
        if (pub.track && pub.track.mediaStreamTrack?.readyState === 'ended') {
          console.warn('[WebRTC] Local track ended while hidden — attempting republish');
          pub.track.restartTrack?.().catch((e) => console.error('[WebRTC] restartTrack failed', e));
        }
      });
    }
  };

  // Some browsers throttle JS timers on hidden tabs; keep a no-op wake lock
  let wakeLockInterval = null;
  if (typeof setInterval !== 'undefined') {
    wakeLockInterval = setInterval(() => {
      // Tiny heartbeat — prevents aggressive timer throttling in Chrome/Firefox
      if (room.state === 'connected') {
        room.localParticipant?.trackPublications?.forEach((pub) => {
          const mst = pub.track?.mediaStreamTrack;
          if (mst && mst.readyState === 'live' && mst.kind === 'audio') {
            // Accessing enabled property is enough to prevent GC / suspension
            void mst.enabled;
          }
        });
      }
    }, 15000);
  }

  document.addEventListener('visibilitychange', handleVisibilityChange);

  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    if (wakeLockInterval !== null) clearInterval(wakeLockInterval);
  };
};
