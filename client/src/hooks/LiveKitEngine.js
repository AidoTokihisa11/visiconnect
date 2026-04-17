import { AIImageEnhancer } from '../lib/AIImageEnhancer';
import { RoomEvent, VideoPresets, Track, createLocalVideoTrack, VideoQuality } from 'livekit-client';

/**
 * 2. Logique de Publication Intelligente (publishSmartMedia)
 * Détecte les capacités matérielles et priorise le flux réseau.
 */
export const publishSmartMedia = async (room) => {
  try {
    const has4KHardware = typeof navigator !== 'undefined'
      && navigator.hardwareConcurrency >= 8
      && window.screen.width >= 2560;

    const targetResolution = has4KHardware ? VideoPresets.h2160.resolution : VideoPresets.h1080.resolution;

    // 1. Création de la track locale pure
    const localVideoTrack = await createLocalVideoTrack({
      resolution: targetResolution,
      facingMode: 'user',
    });

    // 2. Application de l'AI Image Enhancer (Auto-Lighting / Smart Upscaling)
    const isMobile = typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent);
    
    // Le processeur va Bypass automatiquement si le CPU mobile est trop faible (Thermal Throttling)
    const enhancer = new AIImageEnhancer();
    // Le TrackProcessor LiveKit attend un init qui renvoie un object contenant `processedTrack` ou s'attache
    await enhancer.init({ track: localVideoTrack.mediaStreamTrack });
    
    // Injection du track traité dans le clone local de LiveKit s'il a bien été généré
    if (enhancer.processedTrack && enhancer.processedTrack !== localVideoTrack.mediaStreamTrack) {
        // Remplacement de la piste WebRTC sous-jacente par notre version traitée (WebGL/Canvas)
        localVideoTrack.mediaStreamTrack = enhancer.processedTrack;
    }

    // 3. Publication avec priorité maximale
    await room.localParticipant.publishTrack(localVideoTrack, {
      simulcast: true,
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
 * 3. Stratégie Anti-Freeze & Rétablissement
 * S'attache à la room pour forcer une image parfaite dès la souscription et gérer les déconnexions.
 */
export const setupAntiFreezeListeners = (room) => {
  if(!room) return;
  // A. Élimine l'écran noir initial à l'arrivée d'un track 
  room.on(RoomEvent.TrackSubscribed, (track, publication, participant) => {
    if (track.kind === Track.Kind.Video) {
      // Demande agressive au SFU de générer une Keyframe (PLI - Picture Loss Indication)
      // track.setVideoPriority('high'); // Removed: setVideoPriority is not a function on RemoteTrack. Use publication.setVideoQuality(VideoQuality.HIGH) if needed.
      if (typeof publication.setVideoQuality === 'function') {
        publication.setVideoQuality(VideoQuality.HIGH);
      }
      
      // On s'assure que le flux n'est pas "downcasted" par défaut le temps de l'abonnement
      if (typeof track.setDowncasted === 'function') {
        track.setDowncasted(false);
      }
    }
  });

  // B. Gestion des micro-coupures
  room.on(RoomEvent.ConnectionStateChanged, (state) => {
    if (state === 'reconnecting') {
      console.warn('[WebRTC] Dégradation réseau détectée, maintien des flux actifs en cache...');
      // Ne PAS déclencher de state React ici, laisser le DOM intact.
    }
  });
};
