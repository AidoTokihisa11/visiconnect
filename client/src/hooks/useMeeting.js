import { AIEngineManager } from '../lib/AIEngineManager';
import { AIVideoProcessor } from '../lib/AIVideoEngine';
import { setupAntiFreezeListeners, setupVisibilityProtection } from './LiveKitEngine';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { 
  useRoomContext, 
  useLocalParticipant, 
  useTracks,
  useParticipants
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import { BackgroundBlur } from '@livekit/track-processors';

/**
 * Hook to fetch LiveKit token
 */
export const useRoomToken = (roomName, participantName) => {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!roomName || !participantName) return;

    const fetchToken = async () => {
      // Bypass token fetch if explicit demo flag is true
      if (import.meta.env.VITE_DEMO_MODE === 'true') {
        console.warn('⚠️ Demo Mode: Skipping API token fetch. Using mock token if available.');
        setToken(null); 
        return;
      }

      try {
        // En local on utilise VITE_API_URL (ex: localhost:3001), mais en prod on utilise le chemin relatif (/api)
        // pour passer par les Netlify Functions locales et éviter totalement CORS.
        const apiBase = import.meta.env.PROD ? '' : (import.meta.env.VITE_API_URL || '');
        const response = await fetch(`${apiBase}/api/livekit-token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ roomName, participantName }),
        });
        
        if (!response.ok) {
            // Silently fail in dev for duplicate requests or handle gracefully
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to fetch token');
        } 
        
        const data = await response.json();
        if (typeof data.token === 'string' && data.token.includes('mock_token_due_to_missing_keys')) {
          setToken(null);
          setError(new Error('LiveKit credentials are missing on backend.'));
          return;
        }
        setToken(data.token);
      } catch (err) {
        // Prevent console spam in dev if backend is offline
        if (import.meta.env.DEV) {
           console.warn('⚠️ Backend unreachable (LiveKit Token). Running in offline UI mode.');
        } else {
           console.error(err);
        }
        setError(err);
      }
    };

    fetchToken();
  }, [roomName, participantName]);

  return { token, error };
};

/**
 * Custom Hook for accessing LiveKit meeting state and controls.
 * MUST be used within a <LiveKitRoom> or <RoomContext.Provider>.
 */
export const useMeeting = (maxQualityLock = true) => {
  const room = useRoomContext();

  // Détection mobile pour éviter le pre-warming IA (cause de freeze)
  const isMobile = typeof navigator !== 'undefined' &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || '');

  // === ÉTATS (déclarés AVANT les useEffect) ===
  const { localParticipant, isCameraEnabled, isMicrophoneEnabled, isScreenShareEnabled } = useLocalParticipant();
  const remoteParticipants = useParticipants();
  const [devices, setDevices] = useState({
    cameras: [],
    microphones: [],
    speakers: [],
  });
  
  const [isAiReady, setIsAiReady] = useState(false);
  const [isAIEnhanced, setIsAIEnhanced] = useState(false);

  // === PRIVACY LOCKS: Verrous d'intention pour caméra/micro ===
  // Persiste dans sessionStorage pour survivre aux changements d'onglet
  const [isCameraManualMute, setIsCameraManualMute] = useState(() => {
    try {
      return sessionStorage.getItem('visi_cam_mute') === 'true';
    } catch { return false; }
  });
  
  const [isMicManualMute, setIsMicManualMute] = useState(() => {
    try {
      return sessionStorage.getItem('visi_mic_mute') === 'true';
    } catch { return false; }
  });

  // Persister les verrous dans sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem('visi_cam_mute', isCameraManualMute ? 'true' : 'false');
    } catch {}
  }, [isCameraManualMute]);

  useEffect(() => {
    try {
      sessionStorage.setItem('visi_mic_mute', isMicManualMute ? 'true' : 'false');
    } catch {}
  }, [isMicManualMute]);

  // === PRIVACY GUARD: Bloquer l'auto-unmute ET couper les flux quand l'onglet est caché ===
  // Réfs pour stocker l'état avant la mise en arrière-plan (restauration au retour)
  const wasEnabledBeforeHide = useRef({ camera: false, mic: false });

  useEffect(() => {
    if (!localParticipant) return;

    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'hidden') {
        // === ONGLET CACHÉ: Stopper immédiatement caméra & micro (RGPD / vie privée) ===
        console.log('[Privacy Guard] Onglet caché — arrêt des flux média');
        
        // Sauvegarder l'état actuel AVANT de couper
        wasEnabledBeforeHide.current = {
          camera: isCameraEnabled && !isCameraManualMute,
          mic: isMicrophoneEnabled && !isMicManualMute,
        };

        try {
          if (isCameraEnabled) await localParticipant.setCameraEnabled(false);
        } catch (e) {
          console.warn('[Privacy Guard] Erreur arrêt caméra:', e);
        }
        try {
          if (isMicrophoneEnabled) await localParticipant.setMicrophoneEnabled(false);
        } catch (e) {
          console.warn('[Privacy Guard] Erreur arrêt micro:', e);
        }

        // Fallback: arrêt direct des MediaStreamTracks (Safari iOS)
        try {
          const pubs = localParticipant.getTrackPublications();
          pubs.forEach(pub => {
            if (pub.track?.mediaStreamTrack && pub.track.source !== Track.Source.ScreenShare) {
              pub.track.mediaStreamTrack.stop();
            }
          });
        } catch (e) {
          console.warn('[Privacy Guard] Fallback track.stop() erreur:', e);
        }

      } else if (document.visibilityState === 'visible') {
        // === ONGLET VISIBLE: Restaurer les flux si l'utilisateur ne les avait pas coupés manuellement ===
        console.log('[Privacy Guard] Onglet visible — restauration des flux');
        await new Promise(resolve => setTimeout(resolve, 300));

        if (wasEnabledBeforeHide.current.camera && !isCameraManualMute) {
          try {
            await localParticipant.setCameraEnabled(true);
            console.log('[Privacy Guard] Caméra restaurée');
          } catch (e) {
            console.warn('[Privacy Guard] Impossible de restaurer la caméra:', e);
          }
        }
        
        if (wasEnabledBeforeHide.current.mic && !isMicManualMute) {
          try {
            await localParticipant.setMicrophoneEnabled(true);
            console.log('[Privacy Guard] Micro restauré');
          } catch (e) {
            console.warn('[Privacy Guard] Impossible de restaurer le micro:', e);
          }
        }

        // Si l'utilisateur a manuellement coupé, ne JAMAIS rallumer
        if (isCameraManualMute && isCameraEnabled) {
          try { await localParticipant.setCameraEnabled(false); } catch {}
        }
        if (isMicManualMute && isMicrophoneEnabled) {
          try { await localParticipant.setMicrophoneEnabled(false); } catch {}
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [localParticipant, isCameraManualMute, isMicManualMute, isCameraEnabled, isMicrophoneEnabled]);

  // === PRIVACY CRITICAL: Cleanup complet à la fermeture de page ===
  // Coupe IMMEDIATEMENT caméra/micro quand l'utilisateur ferme l'onglet/navigateur
  useEffect(() => {
    if (!localParticipant) return;

    const forceStopAllMedia = () => {
      console.log('[Privacy] Page unload - Arrêt immédiat de tous les flux média');
      
      // Méthode 1: LiveKit API
      try {
        localParticipant.setCameraEnabled(false);
        localParticipant.setMicrophoneEnabled(false);
        localParticipant.setScreenShareEnabled(false);
      } catch (e) {
        console.warn('[Privacy] LiveKit cleanup error:', e);
      }
      
      // Méthode 2: Arrêt direct des MediaStreamTracks (fallback robuste)
      try {
        const tracks = localParticipant.getTrackPublications();
        tracks.forEach(pub => {
          if (pub.track?.mediaStreamTrack) {
            pub.track.mediaStreamTrack.stop();
          }
        });
      } catch (e) {
        console.warn('[Privacy] Direct track stop error:', e);
      }
      
      // Méthode 3: Arrêt de TOUS les streams actifs du navigateur
      try {
        navigator.mediaDevices?.getUserMedia({ audio: false, video: false })
          .catch(() => {}); // Force release
      } catch (e) {}
    };

    // beforeunload: fermeture d'onglet, refresh, navigation
    const handleBeforeUnload = (e) => {
      forceStopAllMedia();
    };

    // pagehide: plus fiable sur mobile (Safari iOS)
    const handlePageHide = (e) => {
      forceStopAllMedia();
    };

    // unload: fallback
    const handleUnload = () => {
      forceStopAllMedia();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('unload', handleUnload);

    return () => {
      // Cleanup aussi à la destruction du composant (navigation React)
      forceStopAllMedia();
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('unload', handleUnload);
    };
  }, [localParticipant]);

  // === EFFECTS (après les états) ===
  
  // Pre-Warming de l'IA
  // Sur mobile: IA DÉSACTIVÉE pour éviter les freezes
  // Sur desktop: pré-chargement 2s après le join
  useEffect(() => {
    if (isMobile) {
      console.log('[useMeeting] Mobile détecté: IA DÉSACTIVÉE pour éviter les freezes');
      // L'IA est désactivée sur mobile car elle cause des freezes
      setIsAiReady(false);
      return;
    }
    
    // DESKTOP: Lazy loading de l'IA (le Worker est créé seulement dans init())
    const manager = new AIEngineManager();
    manager.onReady((ready) => setIsAiReady(ready));
    
    // Délai pour laisser WebRTC s'établir avant de charger l'IA
    const timer = setTimeout(() => {
      manager.init();
    }, 2000); // 2 secondes après le join
    
    return () => clearTimeout(timer);
  }, [isMobile]);

  useEffect(() => {
    setupAntiFreezeListeners(room);
    const cleanupVisibility = setupVisibilityProtection(room);
    return () => cleanupVisibility();
  }, [room]);
    
    const [activeAiProcessor, setActiveAiProcessor] = useState(null);
    const [blurProcessor, setBlurProcessor] = useState(null);
    
    const [selectedDevices, setSelectedDevices] = useState({
    cameraId: '',
    microphoneId: '',
    speakerId: '',
  });

    const [isBlurEnabled, setIsBlurEnabled] = useState(false);
    const [blurRadius, setBlurRadius] = useState(10); // Intensité par défaut : 10 (Moyen)
  // Get all camera and screen share tracks
  // This hook automatically handles updates when tracks are published/subscribed
  const tracks = useTracks(
    [Track.Source.Camera, Track.Source.ScreenShare],
    { onlySubscribed: true } // Default to true to prevent sending null tracks to VideoTrack
  );

  const [deviceError, setDeviceError] = useState(null);
  const clearDeviceError = useCallback(() => setDeviceError(null), []);

  const toggleMic = useCallback(async () => {
    if (!localParticipant) return;
    const newState = !isMicrophoneEnabled;
    try {
      await localParticipant.setMicrophoneEnabled(newState);
      setIsMicManualMute(!newState);
    } catch (err) {
      if (err?.name === 'NotAllowedError' || err?.name === 'PermissionDeniedError') {
        setDeviceError('mic_denied');
      }
    }
  }, [localParticipant, isMicrophoneEnabled]);

  const toggleCamera = useCallback(async () => {
    if (!localParticipant) return;
    const newState = !isCameraEnabled;
    try {
      await localParticipant.setCameraEnabled(newState);
      setIsCameraManualMute(!newState);
    } catch (err) {
      if (err?.name === 'NotAllowedError' || err?.name === 'PermissionDeniedError') {
        setDeviceError('cam_denied');
      }
    }
  }, [localParticipant, isCameraEnabled]);
  const toggleScreenShare = useCallback(async () => {
    if (localParticipant) {
      await localParticipant.setScreenShareEnabled(!isScreenShareEnabled, {
         audio: true 
      });
    }
  }, [localParticipant, isScreenShareEnabled]);


const toggleBlur = useCallback(async (newRadius) => {
    if (!localParticipant) return;

    try {
      const videoTrack = localParticipant.getTrackPublication(Track.Source.Camera)?.videoTrack;
      if (!videoTrack || videoTrack.isMuted || !videoTrack.mediaStreamTrack) {
          console.warn("Flux inactif ou aucune source media. Flou bloqué.");
          return;
      }

      const targetRadius = typeof newRadius === 'number' ? newRadius : blurRadius;
      const shouldDisable = typeof newRadius !== 'number' ? isBlurEnabled : newRadius === 0;

      if (shouldDisable) {
         await videoTrack.setProcessor(null);
         setIsBlurEnabled(false);
         // If we are turning off blur, maybe clear the AI conflict flag too
      } else {
         // Prevent conflict: If AI is active, turn it off
         if (isAIEnhanced) {
             setIsAIEnhanced(false);
         }
         
         // Always create a new processor when radius changes to ensure the new intensity is applied
         const radiusChanged = typeof newRadius === 'number' && newRadius !== blurRadius;
         let processor = blurProcessor;
         if (!processor || radiusChanged) {
             // Let UI render first before blocking thread
             await new Promise(resolve => setTimeout(resolve, 50));
             processor = BackgroundBlur(targetRadius);
             setBlurProcessor(processor);
         }
         
         await videoTrack.setProcessor(processor);
         setIsBlurEnabled(true);
         
         if (typeof newRadius === 'number') {
             setBlurRadius(newRadius);
         }
      }
    } catch (err) {
      console.error('Failed to toggle blur', err);
    }
}, [localParticipant, isBlurEnabled, blurRadius, blurProcessor, isAIEnhanced]);

const [isProcessingAI, setIsProcessingAI] = useState(false);

const toggleAIVideoEngine = useCallback(async () => {
    if (!localParticipant || isProcessingAI) return;

    setIsProcessingAI(true);
    try {
      const videoTrack = localParticipant.getTrackPublication(Track.Source.Camera)?.videoTrack;
      if (!videoTrack) {
          console.warn("Aucune piste caméra disponible.");
          return;
      }

      if (isAIEnhanced) {
          // Désactivation: stopProcessor() — LiveKit appellera destroy() proprement
          // NE PAS utiliser setProcessor(null) : LiveKit appelle null.init() et throw
          await videoTrack.stopProcessor();
          setIsAIEnhanced(false);
          setActiveAiProcessor(null);
      } else {
          // Activation: vérifier que le flux est valide
          if (videoTrack.isMuted || !videoTrack.mediaStreamTrack) {
              console.warn("Flux inactif ou aucune source media. IA bloquée.");
              return;
          }

          // Prevent conflict: If Blur is active, turn it off
          if (isBlurEnabled) {
              setIsBlurEnabled(false);
          }

          // Délai plus long sur mobile pour éviter les freezes
          const delay = isMobile ? 150 : 80;
          await new Promise(resolve => setTimeout(resolve, delay));
          
          let processor = activeAiProcessor;
          if (!processor) {
              console.log('[useMeeting] Création du processeur IA...');
              processor = new AIVideoProcessor();
              setActiveAiProcessor(processor);
          }
          await videoTrack.setProcessor(processor);
          setIsAIEnhanced(true);
      }
    } catch (err) {
      console.error('Failed to toggle AI Engine', err);
    } finally {
      setIsProcessingAI(false);
    }
}, [localParticipant, isAIEnhanced, activeAiProcessor, isBlurEnabled, isMobile, isProcessingAI]);


    const refreshDevices = useCallback(async () => {
      if (!navigator?.mediaDevices?.enumerateDevices) return;
      try {
        const list = await navigator.mediaDevices.enumerateDevices();
        const cameras = list.filter((d) => d.kind === 'videoinput');
      const microphones = list.filter((d) => d.kind === 'audioinput');
      const speakers = list.filter((d) => d.kind === 'audiooutput');

      setDevices({ cameras, microphones, speakers });

      if (room?.getActiveDevice) {
        const readActiveDevice = async (kind) => {
          try {
            const value = room.getActiveDevice(kind);
            if (value && typeof value.then === 'function') {
              return await value;
            }
            return value || '';
          } catch (e) {
            return '';
          }
        };

        const [cameraId, microphoneId, speakerId] = await Promise.all([
          readActiveDevice('videoinput'),
          readActiveDevice('audioinput'),
          readActiveDevice('audiooutput'),
        ]);
        setSelectedDevices({ cameraId: cameraId || '', microphoneId: microphoneId || '', speakerId: speakerId || '' });
      }
    } catch (error) {
      console.warn('Unable to enumerate media devices', error);
    }
  }, [room]);

  useEffect(() => {
    refreshDevices();
    const onDeviceChange = () => {
      refreshDevices();
    };
    navigator?.mediaDevices?.addEventListener?.('devicechange', onDeviceChange);
    return () => {
      navigator?.mediaDevices?.removeEventListener?.('devicechange', onDeviceChange);
    };
  }, [refreshDevices]);

  const setActiveDevice = useCallback(
    async (kind, deviceId) => {
      if (!room || !deviceId) return;
      try {
        await room.switchActiveDevice(kind, deviceId);
        setSelectedDevices((prev) => {
          if (kind === 'videoinput') return { ...prev, cameraId: deviceId };
          if (kind === 'audioinput') return { ...prev, microphoneId: deviceId };
          return { ...prev, speakerId: deviceId };
        });
      } catch (error) {
        console.warn(`Unable to switch ${kind}`, error);
      }
    },
    [room]
  );

  const setCameraDevice = useCallback(async (deviceId) => {
    await setActiveDevice('videoinput', deviceId);
  }, [setActiveDevice]);

  const setMicrophoneDevice = useCallback(async (deviceId) => {
    await setActiveDevice('audioinput', deviceId);
  }, [setActiveDevice]);

  const setSpeakerDevice = useCallback(async (deviceId) => {
    await setActiveDevice('audiooutput', deviceId);
  }, [setActiveDevice]);

  return {
    isAiReady,
    isAIEnhanced,
    isProcessingAI,
    toggleAIVideoEngine,
    room,
    localParticipant,
    isCameraEnabled,
    isMicrophoneEnabled,
    isScreenShareEnabled,
    isBlurEnabled,
    blurRadius,
    toggleBlur,
    remoteParticipants,
    tracks,
    activeSpeakerId: room?.activeSpeaker?.identity,
    connectionState: room?.state,
    devices,
    selectedDevices,
    deviceError,
    clearDeviceError,
    controls: {
      toggleMic,
      toggleCamera,
      toggleScreenShare,
      refreshDevices,
      setCameraDevice,
      setMicrophoneDevice,
      setSpeakerDevice,
    },
  };
};
