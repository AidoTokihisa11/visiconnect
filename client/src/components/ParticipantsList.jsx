import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserX, Mic, MicOff, Video, VideoOff, 
  MoreVertical, Crown, VolumeX, 
  Settings, User, Monitor, MessageCircle
} from 'lucide-react';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #111;
`;

const Header = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #222;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  color: #3b82f6;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
`;

const ParticipantCount = styled.span`
  color: #888;
  font-size: 0.8rem;
  background: #222;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
`;

const ParticipantsList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #222;
  }

  &::-webkit-scrollbar-thumb {
    background: #444;
    border-radius: 2px;
  }
`;

const ParticipantCard = styled(motion.div)`
  background: #1a1a1a;
  border: 1px solid #222;
  border-radius: 16px;
  padding: 1rem;
  margin-bottom: 0.75rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #333;
    background: #1f1f1f;
  }

  &.host {
    border-color: #00ff88;
    background: rgba(0, 255, 136, 0.05);
  }

  &.speaking {
    border-color: #00ff88;
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
  }
`;

const ParticipantHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

const ParticipantInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${props => props.color || '#333'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
  font-weight: 700;
  font-size: 1.1rem;
  position: relative;
  border: 2px solid ${props => props.isHost ? '#00ff88' : 'transparent'};

  .status-indicator {
    position: absolute;
    bottom: -2px;
    right: -2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${props => props.isOnline ? '#00ff88' : '#666'};
    border: 2px solid #111;
  }
`;

const UserDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

const UserName = styled.div`
  color: #3b82f6;
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UserRole = styled.div`
  color: #888;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RoleBadge = styled.span`
  background: ${props => props.color || '#333'};
  color: ${props => props.textColor || 'white'};
  padding: 0.125rem 0.5rem;
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const ActionButton = styled(motion.button)`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: #333;
  color: #888;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: #444;
    color: #3b82f6;
  }

  &.active {
    background: #00ff88;
    color: #0a0a0a;
  }

  &.danger {
    background: #ff4444;
    color: #3b82f6;

    &:hover {
      background: #ff3333;
    }
  }
`;

const MediaControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

const MediaStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
`;

const StatusItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: ${props => props.active ? '#00ff88' : '#666'};
  font-size: 0.8rem;
  
  .label {
    font-weight: 500;
  }
`;

const ParticipantActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid #222;
`;

const ConnectionQuality = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.quality === 'excellent' ? '#00ff88' : 
                   props.quality === 'good' ? '#f9ca24' :
                   props.quality === 'fair' ? '#ff9f43' : '#ff4444'};
  font-size: 0.8rem;
  
  .bars {
    display: flex;
    gap: 1px;
    
    .bar {
      width: 3px;
      height: 8px;
      background: currentColor;
      border-radius: 1px;
      opacity: ${props => props.quality === 'excellent' ? 1 : 
                        props.quality === 'good' ? 0.7 :
                        props.quality === 'fair' ? 0.5 : 0.3};
      
      &:nth-child(2) {
        height: 10px;
        opacity: ${props => props.quality === 'excellent' || props.quality === 'good' ? 1 : 0.3};
      }
      
      &:nth-child(3) {
        height: 12px;
        opacity: ${props => props.quality === 'excellent' ? 1 : 0.3};
      }
    }
  }
`;

const SpeakingIndicator = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 16px;
  border: 2px solid #00ff88;
  pointer-events: none;
  opacity: 0;

  &.speaking {
    opacity: 1;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(0, 255, 136, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(0, 255, 136, 0); }
    100% { box-shadow: 0 0 0 0 rgba(0, 255, 136, 0); }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  color: #666;
  padding: 2rem;
  
  .icon {
    margin-bottom: 1rem;
    opacity: 0.5;
  }
  
  .message {
    font-size: 0.9rem;
    line-height: 1.4;
  }
`;

const ParticipantsListComponent = ({ users = [] }) => {
  const [speakingUsers] = useState(['1']); // Simulation

  const getUserInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getUserColor = (name) => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#a55eea', '#26de81'];
    const index = name.length % colors.length;
    return colors[index];
  };

  const getConnectionQuality = (userId) => {
    const qualities = ['excellent', 'good', 'fair', 'poor'];
    return qualities[parseInt(userId) % qualities.length];
  };

  const getRoleInfo = (user) => {
    if (user.isHost) {
      return {
        label: 'Hôte',
        color: '#00ff88',
        textColor: '#0a0a0a',
        icon: <Crown size={10} />
      };
    }
    return {
      label: 'Participant',
      color: '#333',
      textColor: '#888',
      icon: <User size={10} />
    };
  };

  const handleMuteUser = (userId) => {
    console.log('Mute user:', userId);
  };

  const handleKickUser = (userId) => {
    console.log('Kick user:', userId);
  };

  const handlePrivateMessage = (userId) => {
    console.log('Private message to:', userId);
  };

  if (users.length === 0) {
    return (
      <Container>
        <Header>
          <Title>Participants</Title>
          <ParticipantCount>0</ParticipantCount>
        </Header>
        <EmptyState>
          <div className="icon">
            <User size={48} />
          </div>
          <div className="message">
            Aucun participant dans cette salle pour le moment.
          </div>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Participants</Title>
        <ParticipantCount>{users.length}</ParticipantCount>
      </Header>

      <ParticipantsList>
        <AnimatePresence>
          {users.map((user, index) => {
            const roleInfo = getRoleInfo(user);
            const isSpeaking = speakingUsers.includes(user.id);
            const quality = getConnectionQuality(user.id);
            
            return (
              <ParticipantCard
                key={user.id}
                className={`${user.isHost ? 'host' : ''} ${isSpeaking ? 'speaking' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                layout
              >
                <SpeakingIndicator className={isSpeaking ? 'speaking' : ''} />
                
                <ParticipantHeader>
                  <ParticipantInfo>
                    <Avatar 
                      color={getUserColor(user.name)}
                      isHost={user.isHost}
                      isOnline={true}
                    >
                      {getUserInitials(user.name)}
                      <div className="status-indicator" />
                    </Avatar>
                    
                    <UserDetails>
                      <UserName>
                        {user.name}
                        {user.isHost && <Crown size={14} color="#00ff88" />}
                      </UserName>
                      <UserRole>
                        <RoleBadge 
                          color={roleInfo.color}
                          textColor={roleInfo.textColor}
                        >
                          {roleInfo.icon}
                          {roleInfo.label}
                        </RoleBadge>
                        <ConnectionQuality quality={quality}>
                          <div className="bars">
                            <div className="bar" />
                            <div className="bar" />
                            <div className="bar" />
                          </div>
                          {quality}
                        </ConnectionQuality>
                      </UserRole>
                    </UserDetails>
                  </ParticipantInfo>

                  <ActionButton
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <MoreVertical size={16} />
                  </ActionButton>
                </ParticipantHeader>

                <MediaControls>
                  <MediaStatus>
                    <StatusItem active={user.isAudioEnabled}>
                      {user.isAudioEnabled ? <Mic size={14} /> : <MicOff size={14} />}
                      <span className="label">Audio</span>
                    </StatusItem>
                    
                    <StatusItem active={user.isVideoEnabled}>
                      {user.isVideoEnabled ? <Video size={14} /> : <VideoOff size={14} />}
                      <span className="label">Vidéo</span>
                    </StatusItem>
                    
                    {user.isScreenSharing && (
                      <StatusItem active={true}>
                        <Monitor size={14} />
                        <span className="label">Écran</span>
                      </StatusItem>
                    )}
                  </MediaStatus>
                </MediaControls>

                <ParticipantActions>
                  <ActionButton
                    onClick={() => handlePrivateMessage(user.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Message privé"
                  >
                    <MessageCircle size={14} />
                  </ActionButton>

                  {!user.isHost && (
                    <>
                      <ActionButton
                        onClick={() => handleMuteUser(user.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Couper le micro"
                      >
                        <VolumeX size={14} />
                      </ActionButton>

                      <ActionButton
                        className="danger"
                        onClick={() => handleKickUser(user.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Exclure"
                      >
                        <UserX size={14} />
                      </ActionButton>
                    </>
                  )}

                  <ActionButton
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Plus d'options"
                  >
                    <Settings size={14} />
                  </ActionButton>
                </ParticipantActions>
              </ParticipantCard>
            );
          })}
        </AnimatePresence>
      </ParticipantsList>
    </Container>
  );
};

export default ParticipantsListComponent;
