import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Mic, MicOff, Video, VideoOff, User } from 'lucide-react';

const GridContainer = styled.div`
  flex: 1;
  display: grid;
  gap: 1rem;
  padding: 1rem;
  grid-template-columns: ${props => {
    const count = props.videoCount;
    if (count <= 1) return '1fr';
    if (count <= 4) return 'repeat(2, 1fr)';
    if (count <= 9) return 'repeat(3, 1fr)';
    return 'repeat(4, 1fr)';
  }};
  grid-template-rows: ${props => {
    const count = props.videoCount;
    if (count <= 1) return '1fr';
    if (count <= 2) return '1fr';
    if (count <= 4) return 'repeat(2, 1fr)';
    if (count <= 9) return 'repeat(3, 1fr)';
    return 'repeat(auto-fit, minmax(200px, 1fr))';
  }};
`;

const VideoCard = styled(motion.div)`
  position: relative;
  background: #1e293b;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid ${props => props.isLocal ? '#4f46e5' : 'rgba(255, 255, 255, 0.1)'};
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VideoElement = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #000;
  
  /* Optimisations pour la qualité vidéo */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  transform: translateZ(0);
  will-change: transform;
  
  /* Améliorer la netteté */
  filter: contrast(1.05) brightness(1.02);
  
  /* Optimisations GPU */
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  
  /* Désactiver l'anti-aliasing pour plus de netteté */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const VideoPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  color: #60a5fa;
`;

const PlaceholderIcon = styled.div`
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const UserInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserName = styled.span`
  color: #3b82f6;
  font-weight: 600;
  font-size: 0.9rem;
`;

const MediaStatus = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const StatusIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.active ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
  color: ${props => props.active ? '#10b981' : '#ef4444'};
  font-size: 12px;
`;

const LocalLabel = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  background: rgba(79, 70, 229, 0.8);
  color: #3b82f6;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
`;

const VideoGrid = ({ localStream, remoteStreams, users }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRefs = useRef(new Map());

  // Mettre à jour la vidéo locale
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  // Mettre à jour les vidéos distantes
  useEffect(() => {
    remoteStreams.forEach((stream, userId) => {
      const videoElement = remoteVideoRefs.current.get(userId);
      if (videoElement) {
        videoElement.srcObject = stream;
      }
    });
  }, [remoteStreams]);

  const totalVideos = 1 + remoteStreams.size; // Local + remote

  const getVideoStatus = (stream) => {
    if (!stream) return { hasVideo: false, hasAudio: false };
    
    const videoTracks = stream.getVideoTracks();
    const audioTracks = stream.getAudioTracks();
    
    return {
      hasVideo: videoTracks.length > 0 && videoTracks[0].enabled,
      hasAudio: audioTracks.length > 0 && audioTracks[0].enabled,
    };
  };

  const localStatus = getVideoStatus(localStream);

  return (
    <GridContainer videoCount={totalVideos}>
      {/* Vidéo locale */}
      <VideoCard
        isLocal={true}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <LocalLabel>Vous</LocalLabel>
        
        {localStream && localStatus.hasVideo ? (
          <VideoElement
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
          />
        ) : (
          <VideoPlaceholder>
            <PlaceholderIcon>
              <User size={24} />
            </PlaceholderIcon>
            <span>Caméra désactivée</span>
          </VideoPlaceholder>
        )}

        <UserInfo>
          <UserName>Vous</UserName>
          <MediaStatus>
            <StatusIcon active={localStatus.hasAudio}>
              {localStatus.hasAudio ? <Mic size={12} /> : <MicOff size={12} />}
            </StatusIcon>
            <StatusIcon active={localStatus.hasVideo}>
              {localStatus.hasVideo ? <Video size={12} /> : <VideoOff size={12} />}
            </StatusIcon>
          </MediaStatus>
        </UserInfo>
      </VideoCard>

      {/* Vidéos distantes */}
      {Array.from(remoteStreams.entries()).map(([userId, stream]) => {
        const user = users.find(u => u.id === userId);
        const remoteStatus = getVideoStatus(stream);

        return (
          <VideoCard
            key={userId}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {stream && remoteStatus.hasVideo ? (
              <VideoElement
                ref={el => {
                  if (el) {
                    remoteVideoRefs.current.set(userId, el);
                  }
                }}
                autoPlay
                playsInline
              />
            ) : (
              <VideoPlaceholder>
                <PlaceholderIcon>
                  <User size={24} />
                </PlaceholderIcon>
                <span>Caméra désactivée</span>
              </VideoPlaceholder>
            )}

            <UserInfo>
              <UserName>{user?.name || `Utilisateur ${userId.slice(0, 8)}`}</UserName>
              <MediaStatus>
                <StatusIcon active={remoteStatus.hasAudio}>
                  {remoteStatus.hasAudio ? <Mic size={12} /> : <MicOff size={12} />}
                </StatusIcon>
                <StatusIcon active={remoteStatus.hasVideo}>
                  {remoteStatus.hasVideo ? <Video size={12} /> : <VideoOff size={12} />}
                </StatusIcon>
              </MediaStatus>
            </UserInfo>
          </VideoCard>
        );
      })}

      {/* Placeholder pour les participants sans vidéo */}
      {users.filter(user => !remoteStreams.has(user.id)).map(user => (
        <VideoCard
          key={user.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <VideoPlaceholder>
            <PlaceholderIcon>
              <User size={24} />
            </PlaceholderIcon>
            <span>En attente de connexion...</span>
          </VideoPlaceholder>

          <UserInfo>
            <UserName>{user.name}</UserName>
            <MediaStatus>
              <StatusIcon active={false}>
                <MicOff size={12} />
              </StatusIcon>
              <StatusIcon active={false}>
                <VideoOff size={12} />
              </StatusIcon>
            </MediaStatus>
          </UserInfo>
        </VideoCard>
      ))}
    </GridContainer>
  );
};

export default VideoGrid;
