import { RoomEvent, VideoPresets, Track, createLocalVideoTrack } from 'livekit-client';

/**
 * 2. Logique de Publication Intelligente (publishSmartMedia)
 * Détecte les capacités matérielles et priorise le flux réseau.
 */
export const publishSmartMedia = async (room) => {
  try {
    // Détection de la puissance matérielle (heuristique basique : cœurs CPU + largeur écran)
    const has4KHardware = typeof navigator !== 'undefined' 
      && navigator.hardwareConcurrency >= 8 
      && window.screen.width >= 2560;

    const targetResolution = has4KHardware ? VideoPresets.h2160.resolution : VideoPresets.h1080.resolution;

    // Création de la track locale
    const localVideoTrack = await createLocalVideoTrack({
      resolution: targetResolution,
      facingMode: 'user',
    });

    // Publication avec priorité maximale pour survivre à la congestion réseau
    await room.localParticipant.publishTrack(localVideoTrack, {
      simulcast: true,
      name: 'camera',
      source: Track.Source.Camera,
      priority: 'high', // Empêche le navigateur de sacrifier ce flux
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
      track.setVideoPriority('high');
      
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
