import { useState, useCallback, useEffect } from 'react';
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
  const { localParticipant, isCameraEnabled, isMicrophoneEnabled, isScreenShareEnabled } = useLocalParticipant();
  const remoteParticipants = useParticipants();
  const [devices, setDevices] = useState({
    cameras: [],
    microphones: [],
    speakers: [],
  });
  const [selectedDevices, setSelectedDevices] = useState({
    cameraId: '',
    microphoneId: '',
    speakerId: '',
  });

  const [isBlurEnabled,
      blurRadius, setIsBlurEnabled] = useState(false);    const [blurRadius, setBlurRadius] = useState(10); // Intensité par défaut : 10 (Moyen)
  // Get all camera and screen share tracks
  // This hook automatically handles updates when tracks are published/subscribed
  const tracks = useTracks(
    [Track.Source.Camera, Track.Source.ScreenShare],
    { onlySubscribed: false } // ensure we get notified even if auto-subscribe delays
  );

  const toggleMic = useCallback(async () => {
    if (!localParticipant) return;

    try {
      await localParticipant.setMicrophoneEnabled(!isMicrophoneEnabled);
    } catch (err) {
      console.error('Erreur lors de l’activation du micro:', err);
      alert('Impossible d’accéder au microphone. Veuillez vérifier vos permissions.');
    }
  }, [localParticipant, isMicrophoneEnabled]);

  const toggleCamera = useCallback(async () => {
    if (!localParticipant) return;

    try {
      await localParticipant.setCameraEnabled(!isCameraEnabled);
    } catch (err) {
      console.error('Erreur lors de l’activation de la caméra:', err);
      alert('Impossible d’accéder à la caméra. Veuillez vérifier vos permissions.');
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
        if (!videoTrack) return;

        // If radius is provided, apply it. Otherwise toggle using current radius.
        const targetRadius = typeof newRadius === 'number' ? newRadius : blurRadius;
        const shouldDisable = typeof newRadius !== 'number' ? isBlurEnabled : newRadius === 0;

        if (shouldDisable) {
           await videoTrack.setProcessor(null);
           setIsBlurEnabled(false);
        } else {
           const blur = BackgroundBlur(targetRadius, { delegate: 'GPU' });
           await videoTrack.setProcessor(blur);
           setIsBlurEnabled(true);
           if (typeof newRadius === 'number') {
             setBlurRadius(newRadius);
           }
        }
      } catch (err) {
        console.error('Failed to toggle blur', err);
      }
    }, [localParticipant, isBlurEnabled,
      blurRadius, blurRadius]);

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
