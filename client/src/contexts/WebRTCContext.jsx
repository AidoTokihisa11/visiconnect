import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import { useSocket } from './SocketContext';

const WebRTCContext = createContext();

export const useWebRTC = () => {
  const context = useContext(WebRTCContext);
  if (!context) {
    throw new Error('useWebRTC must be used within a WebRTCProvider');
  }
  return context;
};

export const WebRTCProvider = ({ children }) => {
  const { socket } = useSocket();
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState(new Map());
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [, setPeers] = useState(new Map());
  
  const localVideoRef = useRef(null);
  const peersRef = useRef(new Map());

  const iceServers = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
    ],
  };

  // Contraintes vidéo haute qualité
  const getVideoConstraints = () => {
    return {
      video: {
        width: { ideal: 1920, max: 1920 },
        height: { ideal: 1080, max: 1080 },
        frameRate: { ideal: 30, max: 60 },
        facingMode: 'user',
        aspectRatio: 16/9
      },
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
        sampleRate: 48000,
        channelCount: 2
      }
    };
  };

  // Initialiser le stream local avec haute qualité
  const initializeLocalStream = async () => {
    try {
      // Essayer d'abord avec la haute qualité
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia(getVideoConstraints());
      } catch (error) {
        console.warn('Impossible d\'obtenir la haute qualité, fallback vers qualité standard:', error);
        // Fallback vers une qualité plus basse si la haute qualité échoue
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280, max: 1920 },
            height: { ideal: 720, max: 1080 },
            frameRate: { ideal: 30, max: 30 },
            facingMode: 'user'
          },
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        });
      }
      
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      return stream;
    } catch (error) {
      console.error('Erreur lors de l\'accès aux médias:', error);
      throw error;
    }
  };

  // Créer une connexion peer avec optimisations qualité
  const createPeerConnection = (userId) => {
    const peerConnection = new RTCPeerConnection(iceServers);
    
    peerConnection.onicecandidate = (event) => {
      if (event.candidate && socket) {
        socket.emit('ice-candidate', {
          candidate: event.candidate,
          to: userId,
        });
      }
    };

    peerConnection.ontrack = (event) => {
      const [remoteStream] = event.streams;
      setRemoteStreams(prev => new Map(prev.set(userId, remoteStream)));
    };

    peerConnection.onconnectionstatechange = () => {
      console.log(`Connexion avec ${userId}:`, peerConnection.connectionState);
    };

    return peerConnection;
  };

  // Optimiser les paramètres de codec pour la qualité
  const optimizeCodecParameters = async (peerConnection) => {
    const transceivers = peerConnection.getTransceivers();
    
    transceivers.forEach(transceiver => {
      if (transceiver.sender && transceiver.sender.track) {
        const params = transceiver.sender.getParameters();
        
        if (transceiver.sender.track.kind === 'video') {
          // Optimiser les paramètres vidéo
          if (params.encodings && params.encodings.length > 0) {
            params.encodings[0].maxBitrate = 2500000; // 2.5 Mbps max
            params.encodings[0].maxFramerate = 30;
            params.encodings[0].scaleResolutionDownBy = 1; // Pas de réduction de résolution
          }
        } else if (transceiver.sender.track.kind === 'audio') {
          // Optimiser les paramètres audio
          if (params.encodings && params.encodings.length > 0) {
            params.encodings[0].maxBitrate = 128000; // 128 kbps pour l'audio
          }
        }
        
        transceiver.sender.setParameters(params).catch(console.error);
      }
    });
  };

  // Ajouter le stream local à la connexion peer
  const addLocalStreamToPeer = (peerConnection, stream) => {
    stream.getTracks().forEach(track => {
      peerConnection.addTrack(track, stream);
    });
  };

  // Créer une offre avec optimisations qualité
  const createOffer = useCallback(async (userId) => {
    try {
      const peerConnection = createPeerConnection(userId);
      peersRef.current.set(userId, peerConnection);
      setPeers(new Map(peersRef.current));

      if (localStream) {
        addLocalStreamToPeer(peerConnection, localStream);
      }

      // Créer l'offre avec des options optimisées
      const offer = await peerConnection.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
        voiceActivityDetection: false // Désactiver VAD pour une meilleure qualité audio
      });
      
      await peerConnection.setLocalDescription(offer);

      // Optimiser les paramètres après la création de l'offre
      setTimeout(() => optimizeCodecParameters(peerConnection), 100);

      if (socket) {
        socket.emit('offer', {
          offer,
          to: userId,
        });
      }
    } catch (error) {
      console.error('Erreur lors de la création de l\'offre:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, localStream]);

  // Créer une réponse avec optimisations qualité
  const createAnswer = useCallback(async (userId, offer) => {
    try {
      const peerConnection = createPeerConnection(userId);
      peersRef.current.set(userId, peerConnection);
      setPeers(new Map(peersRef.current));

      if (localStream) {
        addLocalStreamToPeer(peerConnection, localStream);
      }

      await peerConnection.setRemoteDescription(offer);
      
      // Créer la réponse avec des options optimisées
      const answer = await peerConnection.createAnswer({
        voiceActivityDetection: false // Désactiver VAD pour une meilleure qualité audio
      });
      
      await peerConnection.setLocalDescription(answer);

      // Optimiser les paramètres après la création de la réponse
      setTimeout(() => optimizeCodecParameters(peerConnection), 100);

      if (socket) {
        socket.emit('answer', {
          answer,
          to: userId,
        });
      }
    } catch (error) {
      console.error('Erreur lors de la création de la réponse:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, localStream]);

  // Gérer la réponse reçue
  const handleAnswer = async (userId, answer) => {
    try {
      const peerConnection = peersRef.current.get(userId);
      if (peerConnection) {
        await peerConnection.setRemoteDescription(answer);
      }
    } catch (error) {
      console.error('Erreur lors du traitement de la réponse:', error);
    }
  };

  // Gérer les candidats ICE
  const handleIceCandidate = async (userId, candidate) => {
    try {
      const peerConnection = peersRef.current.get(userId);
      if (peerConnection) {
        await peerConnection.addIceCandidate(candidate);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du candidat ICE:', error);
    }
  };

  // Basculer la vidéo
  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  };

  // Basculer l'audio
  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
      }
    }
  };

  // Partage d'écran
  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        });
        
        // Remplacer le track vidéo dans toutes les connexions peer
        const videoTrack = screenStream.getVideoTracks()[0];
        peersRef.current.forEach(peerConnection => {
          const sender = peerConnection.getSenders().find(s => 
            s.track && s.track.kind === 'video'
          );
          if (sender) {
            sender.replaceTrack(videoTrack);
          }
        });

        // Mettre à jour le stream local
        const newStream = new MediaStream([
          videoTrack,
          ...localStream.getAudioTracks()
        ]);
        setLocalStream(newStream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = newStream;
        }

        setIsScreenSharing(true);

        // Gérer l'arrêt du partage d'écran
        videoTrack.onended = () => {
          stopScreenShare();
        };
      } else {
        stopScreenShare();
      }
    } catch (error) {
      console.error('Erreur lors du partage d\'écran:', error);
    }
  };

  const stopScreenShare = async () => {
    try {
      // Utiliser les mêmes contraintes haute qualité que l'initialisation
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia(getVideoConstraints());
      } catch (error) {
        console.warn('Fallback vers qualité standard pour l\'arrêt du partage d\'écran:', error);
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280, max: 1920 },
            height: { ideal: 720, max: 1080 },
            frameRate: { ideal: 30, max: 30 },
            facingMode: 'user'
          },
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        });
      }
      
      const videoTrack = stream.getVideoTracks()[0];
      peersRef.current.forEach(peerConnection => {
        const sender = peerConnection.getSenders().find(s => 
          s.track && s.track.kind === 'video'
        );
        if (sender) {
          sender.replaceTrack(videoTrack);
        }
      });

      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      setIsScreenSharing(false);
      
      // Optimiser les paramètres après le retour à la caméra
      setTimeout(() => {
        peersRef.current.forEach(peerConnection => {
          optimizeCodecParameters(peerConnection);
        });
      }, 100);
    } catch (error) {
      console.error('Erreur lors de l\'arrêt du partage d\'écran:', error);
    }
  };

  // Nettoyer les connexions
  const cleanup = () => {
    peersRef.current.forEach(peerConnection => {
      peerConnection.close();
    });
    peersRef.current.clear();
    setPeers(new Map());
    setRemoteStreams(new Map());
    
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
  };

  // Événements Socket.IO
  useEffect(() => {
    if (!socket) return;

    socket.on('user-joined', (userId) => {
      createOffer(userId);
    });

    socket.on('offer', ({ offer, from }) => {
      createAnswer(from, offer);
    });

    socket.on('answer', ({ answer, from }) => {
      handleAnswer(from, answer);
    });

    socket.on('ice-candidate', ({ candidate, from }) => {
      handleIceCandidate(from, candidate);
    });

    socket.on('user-left', (userId) => {
      const peerConnection = peersRef.current.get(userId);
      if (peerConnection) {
        peerConnection.close();
        peersRef.current.delete(userId);
        setPeers(new Map(peersRef.current));
      }
      setRemoteStreams(prev => {
        const newMap = new Map(prev);
        newMap.delete(userId);
        return newMap;
      });
    });

    return () => {
      socket.off('user-joined');
      socket.off('offer');
      socket.off('answer');
      socket.off('ice-candidate');
      socket.off('user-left');
    };
  }, [socket, localStream, createOffer, createAnswer]);

  const value = {
    localStream,
    remoteStreams,
    isVideoEnabled,
    isAudioEnabled,
    isScreenSharing,
    localVideoRef,
    initializeLocalStream,
    toggleVideo,
    toggleAudio,
    toggleScreenShare,
    cleanup,
  };

  return (
    <WebRTCContext.Provider value={value}>
      {children}
    </WebRTCContext.Provider>
  );
};
