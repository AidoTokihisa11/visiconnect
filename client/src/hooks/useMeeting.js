import { useState, useCallback, useEffect } from 'react';
import { 
  useRoomContext, 
  useLocalParticipant, 
  useTracks,
  useParticipants
} from '@livekit/components-react';
import { Track } from 'livekit-client';

/**
 * Hook to fetch LiveKit token
 */
export const useRoomToken = (roomName, participantName) => {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!roomName || !participantName) return;

    const fetchToken = async () => {
      // Bypass token fetch if in demo/local mode (no API URL or explicit demo flag)
      if (import.meta.env.VITE_DEMO_MODE === 'true' || !import.meta.env.VITE_API_URL) {
        console.warn('⚠️ Demo Mode: Skipping API token fetch. Using mock token if available.');
        setToken(null); 
        return;
      }

      try {
        const apiBase = import.meta.env.VITE_API_URL || '';
        const response = await fetch(`${apiBase}/api/livekit/token`, {
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
export const useMeeting = () => {
  const room = useRoomContext();
  const { localParticipant } = useLocalParticipant();
  const remoteParticipants = useParticipants();
  
  // Get all camera and screen share tracks
  // This hook automatically handles updates when tracks are published/subscribed
  const tracks = useTracks(
    [Track.Source.Camera, Track.Source.ScreenShare],
    { onlySubscribed: true } // optim: only get subscribed tracks
  );

  const toggleMic = useCallback(async () => {
    if (localParticipant) {
      const isEnabled = localParticipant.isMicrophoneEnabled;
      await localParticipant.setMicrophoneEnabled(!isEnabled);
    }
  }, [localParticipant]);

  const toggleCamera = useCallback(async () => {
    if (!localParticipant) return;
    
    const isEnabled = localParticipant.isCameraEnabled;
    
    if (isEnabled) {
      // Désactiver la caméra
      await localParticipant.setCameraEnabled(false);
    } else {
      // Activer la caméra avec fallback intelligent (4K -> 1080p -> 720p)
      try {
        // Tentative 4K (si supporté par useLiveKit4K options)
        await localParticipant.setCameraEnabled(true, {
           resolution: { width: 3840, height: 2160 }
        });
      } catch (e4k) {
        console.warn("4K Camera implementation failed, falling back to 1080p", e4k);
        try {
           // Fallback 1080p
           await localParticipant.setCameraEnabled(true, {
               resolution: { width: 1920, height: 1080 }
           });
        } catch (e1080) {
            console.warn("1080p Camera implementation failed, falling back to 720p", e1080);
            // Fallback 720p (Défaut standard)
            await localParticipant.setCameraEnabled(true, {
               resolution: { width: 1280, height: 720 }
            });
        }
      }
    }
  }, [localParticipant]);

  const toggleScreenShare = useCallback(async () => {
    if (localParticipant) {
      const isEnabled = localParticipant.isScreenShareEnabled;
      await localParticipant.setScreenShareEnabled(!isEnabled, {
         audio: true 
      });
    }
  }, [localParticipant]);

  return {
    room,
    localParticipant,
    remoteParticipants,
    tracks,
    activeSpeakerId: room?.activeSpeaker?.identity,
    connectionState: room?.state,
    controls: {
      toggleMic,
      toggleCamera,
      toggleScreenShare
    }
  };
};
