import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, MicOff, Video, VideoOff, Monitor, MonitorOff, 
  MessageCircle, Users, Phone, Settings as SettingsIcon, Palette,
  Circle, StopCircle, MoreVertical, Maximize2, Minimize2,
  User, Crown, Clock, Wifi, Signal, X
} from 'lucide-react';
import { useWebRTC } from '../contexts/WebRTCContext';
import Chat from '../components/Chat';
import Whiteboard from '../components/Whiteboard';
import ParticipantsList from '../components/ParticipantsList';
import Settings from '../components/Settings';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #0a0a0a;
  overflow: hidden;
  position: relative;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(17, 17, 17, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid #222;
  z-index: 100;
  position: relative;

  @media (max-width: 768px) {
    padding: 1rem;
    background: #111;
    border-bottom: 1px solid #333;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 1rem;
  }
`;

const RoomInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1rem;
    flex: 1;
  }
`;

const RoomDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  @media (max-width: 768px) {
    gap: 0.125rem;
  }
`;

const RoomTitle = styled.h1`
  color: #333;
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const RoomMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.8rem;
  color: #888;

  @media (max-width: 768px) {
    gap: 0.75rem;
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
    font-size: 0.7rem;
  }
`;

const RoomId = styled.span`
  background: #222;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-family: monospace;
  color: #00ff88;

  @media (max-width: 480px) {
    padding: 0.2rem 0.5rem;
    font-size: 0.65rem;
    border-radius: 8px;
  }
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #00ff88;
    animation: pulse 2s infinite;

    @media (max-width: 480px) {
      width: 4px;
      height: 4px;
    }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: none;
  background: #222;
  color: #888;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    display: flex;
  }

  &:hover {
    background: #333;
    color: #333;
  }

  &.active {
    background: #00ff88;
    color: #0a0a0a;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  z-index: 2000;
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenuHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(17, 17, 17, 0.9);
  border-bottom: 1px solid #333;
`;

const MobileMenuTitle = styled.h2`
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
`;

const MobileMenuClose = styled(motion.button)`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: none;
  background: #00ff88;
  color: #0a0a0a;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: #00e67a;
  }
`;

const MobileMenuContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  width: 100%;
  max-width: 300px;
`;

const MobileMenuSection = styled.div`
  .title {
    color: #00ff88;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const MobileMenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const MobileMenuActionButton = styled(motion.button)`
  padding: 1rem;
  background: rgba(34, 34, 34, 0.8);
  border: 1px solid #333;
  border-radius: 16px;
  color: #333;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    background: rgba(0, 255, 136, 0.1);
    border-color: #00ff88;
    transform: translateY(-2px);
  }

  &.active {
    background: rgba(0, 255, 136, 0.2);
    border-color: #00ff88;
  }

  &.danger {
    background: rgba(255, 68, 68, 0.1);
    border-color: #ff4444;
    color: #ff4444;

    &:hover {
      background: rgba(255, 68, 68, 0.2);
    }
  }

  .icon {
    width: 48px;
    height: 48px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .label {
    font-size: 0.85rem;
    font-weight: 500;
  }
`;

const MobileRoomInfo = styled.div`
  text-align: center;
  padding: 1.5rem;
  background: rgba(26, 26, 26, 0.8);
  border: 1px solid #333;
  border-radius: 16px;
  margin-bottom: 1rem;

  .room-title {
    color: #333;
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .room-id {
    color: #00ff88;
    font-family: monospace;
    font-size: 0.9rem;
    background: rgba(0, 255, 136, 0.1);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    display: inline-block;
    margin-bottom: 0.5rem;
  }

  .participants-count {
    color: #888;
    font-size: 0.8rem;
  }
`;

const HeaderButton = styled(motion.button)`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: none;
  background: #222;
  color: #888;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    border-radius: 8px;
  }

  &:hover {
    background: #333;
    color: #333;
  }

  &.active {
    background: #00ff88;
    color: #0a0a0a;
  }
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const VideoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  background: #111;
`;

const VideoContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const MainVideo = styled.div`
  width: 100%;
  height: 100%;
  background: #1a1a1a;
  border-radius: 20px;
  border: 2px solid #222;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    border-radius: 16px;
    border: 1px solid #333;
  }

  @media (max-width: 480px) {
    border-radius: 12px;
  }
  
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 18px;

    @media (max-width: 768px) {
      border-radius: 14px;
    }

    @media (max-width: 480px) {
      border-radius: 10px;
    }
  }
`;

const VideoOverlay = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: end;
  z-index: 10;

  @media (max-width: 768px) {
    bottom: 0.75rem;
    left: 0.75rem;
    right: 0.75rem;
  }

  @media (max-width: 480px) {
    bottom: 0.5rem;
    left: 0.5rem;
    right: 0.5rem;
  }
`;

const ParticipantInfo = styled.div`
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  padding: 0.75rem 1rem;
  border-radius: 12px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    padding: 0.5rem 0.75rem;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    padding: 0.375rem 0.5rem;
    border-radius: 8px;
    gap: 0.375rem;
  }
  
  .name {
    font-weight: 600;
    font-size: 0.9rem;

    @media (max-width: 480px) {
      font-size: 0.8rem;
    }
  }
  
  .role {
    font-size: 0.8rem;
    color: #888;

    @media (max-width: 480px) {
      font-size: 0.7rem;
    }
  }
`;

const VideoStats = styled.div`
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  padding: 0.5rem 0.75rem;
  border-radius: 12px;
  color: #333;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    padding: 0.375rem 0.5rem;
    border-radius: 10px;
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 0.25rem 0.375rem;
    border-radius: 8px;
    font-size: 0.7rem;
    gap: 0.25rem;
  }
`;

const ThumbnailGrid = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 20;

  @media (max-width: 768px) {
    top: 0.75rem;
    right: 0.75rem;
    gap: 0.375rem;
  }

  @media (max-width: 480px) {
    top: 0.5rem;
    right: 0.5rem;
    gap: 0.25rem;
  }
`;

const Thumbnail = styled(motion.div)`
  width: 120px;
  height: 80px;
  background: #1a1a1a;
  border: 2px solid ${props => props.active ? '#00ff88' : '#333'};
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  position: relative;

  @media (max-width: 768px) {
    width: 100px;
    height: 66px;
    border-radius: 10px;
    border-width: 1px;
  }

  @media (max-width: 480px) {
    width: 80px;
    height: 53px;
    border-radius: 8px;
  }
  
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
  }
  
  .name {
    position: absolute;
    bottom: 0.25rem;
    left: 0.25rem;
    right: 0.25rem;
    background: rgba(0, 0, 0, 0.8);
    color: #333;
    font-size: 0.7rem;
    padding: 0.25rem;
    border-radius: 4px;
    text-align: center;
    font-weight: 600;

    @media (max-width: 768px) {
      font-size: 0.65rem;
      padding: 0.2rem;
    }

    @media (max-width: 480px) {
      font-size: 0.6rem;
      padding: 0.15rem;
      border-radius: 3px;
    }
  }
`;

const Sidebar = styled(motion.aside)`
  width: 400px;
  background: #111;
  border-left: 1px solid #222;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 50;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    max-width: 100%;
    z-index: 1000;
    background: #0a0a0a;
    border-left: none;
  }
`;

const SidebarHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #222;
  position: relative;

  @media (max-width: 768px) {
    padding: 1rem;
    background: #111;
    border-bottom: 1px solid #333;
  }
`;

const SidebarTabs = styled.div`
  display: flex;
  gap: 0.5rem;

  @media (max-width: 768px) {
    gap: 0.25rem;
  }
`;

const SidebarTab = styled.button`
  flex: 1;
  padding: 0.75rem 1rem;
  background: ${props => props.active ? '#00ff88' : 'transparent'};
  border: 1px solid ${props => props.active ? '#00ff88' : '#222'};
  border-radius: 12px;
  color: ${props => props.active ? '#0a0a0a' : '#888'};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;

  @media (max-width: 768px) {
    padding: 0.625rem 0.75rem;
    font-size: 0.8rem;
    border-radius: 10px;
    gap: 0.375rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.5rem;
    font-size: 0.75rem;
    border-radius: 8px;
    gap: 0.25rem;
  }

  &:hover {
    color: #333;
    background: ${props => props.active ? '#00e67a' : '#222'};
    border-color: ${props => props.active ? '#00e67a' : '#333'};
  }
`;

const MobileCloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: #222;
  color: #888;
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    display: flex;
  }

  &:hover {
    background: #333;
    color: #333;
  }
`;

const SidebarContent = styled.div`
  flex: 1;
  overflow: hidden;
`;

const Controls = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(17, 17, 17, 0.95);
  backdrop-filter: blur(20px);
  padding: 1.5rem 2rem;
  border-radius: 24px;
  border: 1px solid #333;
  z-index: 200;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);

  /* Plein écran - ajuster la position */
  body:fullscreen & {
    bottom: 3rem;
    z-index: 999;
  }

  @media (max-width: 768px) {
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
    transform: none;
    padding: 1rem 1.5rem;
    gap: 1rem;
    border-radius: 20px;
    justify-content: space-evenly;
    background: rgba(17, 17, 17, 0.95);
    border: 1px solid #00ff88;
    box-shadow: 0 8px 32px rgba(0, 255, 136, 0.3);
    
    /* Plein écran mobile */
    body:fullscreen & {
      bottom: 2rem;
      z-index: 999;
    }
  }

  @media (max-width: 480px) {
    padding: 0.875rem 1rem;
    gap: 0.75rem;
    border-radius: 16px;
    
    body:fullscreen & {
      bottom: 1.5rem;
    }
  }
`;

const ControlButton = styled(motion.button)`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
  font-weight: 600;

  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    border-radius: 14px;
  }

  @media (max-width: 480px) {
    width: 44px;
    height: 44px;
    border-radius: 12px;
  }

  &.primary {
    background: ${props => props.active ? '#00ff88' : '#333'};
    color: ${props => props.active ? '#0a0a0a' : 'white'};

    &:hover {
      background: ${props => props.active ? '#00e67a' : '#444'};
      transform: scale(1.05);
    }
  }

  &.danger {
    background: #ff4444;
    color: #333;

    &:hover {
      background: #ff3333;
      transform: scale(1.05);
    }
  }

  &.secondary {
    background: #222;
    color: #888;
    border: 1px solid #333;

    &:hover {
      background: #333;
      color: #333;
      border-color: #444;
    }

    &.active {
      background: #00ff88;
      color: #0a0a0a;
      border-color: #00ff88;
    }
  }
`;

const RecordingIndicator = styled(motion.div)`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 68, 68, 0.15);
  border: 1px solid #ff4444;
  color: #ff4444;
  padding: 0.75rem 1.25rem;
  border-radius: 16px;
  font-size: 0.9rem;
  font-weight: 600;
  z-index: 100;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    top: 0.75rem;
    left: 0.75rem;
    padding: 0.5rem 1rem;
    border-radius: 12px;
    font-size: 0.8rem;
    gap: 0.5rem;
  }

  @media (max-width: 480px) {
    top: 0.5rem;
    left: 0.5rem;
    padding: 0.375rem 0.75rem;
    border-radius: 10px;
    font-size: 0.75rem;
    gap: 0.375rem;
  }
`;

const RecordingDot = styled.div`
  width: 10px;
  height: 10px;
  background: #ff4444;
  border-radius: 50%;
  animation: pulse 2s infinite;

  @media (max-width: 480px) {
    width: 8px;
    height: 8px;
  }

  @keyframes pulse {
    0% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.1); }
    100% { opacity: 1; transform: scale(1); }
  }
`;

const FloatingPanel = styled(motion.div)`
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(17, 17, 17, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid #333;
  border-radius: 16px;
  padding: 1rem 1.5rem;
  z-index: 90;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #333;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    top: 0.75rem;
    padding: 0.75rem 1rem;
    border-radius: 12px;
    font-size: 0.8rem;
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    top: 0.5rem;
    padding: 0.5rem 0.75rem;
    border-radius: 10px;
    font-size: 0.75rem;
    gap: 0.5rem;
  }
`;

const RoomPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userName = searchParams.get('userName') || 'Utilisateur';
  
  // États locaux
  const [sidebarTab, setSidebarTab] = useState('chat');
  const [showSidebar, setShowSidebar] = useState(false); // Fermé par défaut sur mobile
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [connectionQuality, setConnectionQuality] = useState('excellent');
  
  // Simulation locale - utilisateurs fictifs avec plus de détails
  const [simulatedUsers] = useState([
    { 
      id: '1', 
      name: userName, 
      socketId: 'local', 
      isHost: true,
      isVideoEnabled: true,
      isAudioEnabled: true,
      isScreenSharing: false,
      avatar: null
    },
    { 
      id: '2', 
      name: 'Alice Martin', 
      socketId: 'sim1', 
      isHost: false,
      isVideoEnabled: true,
      isAudioEnabled: false,
      isScreenSharing: false,
      avatar: null
    },
    { 
      id: '3', 
      name: 'Bob Dupont', 
      socketId: 'sim2', 
      isHost: false,
      isVideoEnabled: false,
      isAudioEnabled: true,
      isScreenSharing: true,
      avatar: null
    }
  ]);

  // Socket context available but currently not used directly
  const { 
    localStream, 
    isVideoEnabled, 
    isAudioEnabled, 
    isScreenSharing,
    initializeLocalStream,
    toggleVideo,
    toggleAudio,
    toggleScreenShare,
    cleanup
  } = useWebRTC();

  useEffect(() => {
    initializeLocalStream().catch(console.error);
    
    // Simulation de la qualité de connexion
    const interval = setInterval(() => {
      const qualities = ['excellent', 'good', 'fair', 'poor'];
      setConnectionQuality(qualities[Math.floor(Math.random() * qualities.length)]);
    }, 10000);

    return () => {
      cleanup();
      clearInterval(interval);
    };
  }, [initializeLocalStream, cleanup]);

  const handleLeaveRoom = () => {
    cleanup();
    navigate('/');
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const handleToggleWhiteboard = () => {
    setShowWhiteboard(!showWhiteboard);
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const sidebarTabs = [
    { id: 'chat', label: 'Chat', icon: <MessageCircle size={16} /> },
    { id: 'participants', label: 'Participants', icon: <Users size={16} /> },
    { id: 'settings', label: 'Paramètres', icon: <SettingsIcon size={16} /> },
  ];

  const getQualityColor = (quality) => {
    switch (quality) {
      case 'excellent': return '#00ff88';
      case 'good': return '#f9ca24';
      case 'fair': return '#ff9f43';
      case 'poor': return '#ff4444';
      default: return '#888';
    }
  };

  const getQualityIcon = (quality) => {
    switch (quality) {
      case 'excellent': return <Signal size={14} />;
      case 'good': return <Wifi size={14} />;
      case 'fair': return <Wifi size={14} />;
      case 'poor': return <Wifi size={14} />;
      default: return <Wifi size={14} />;
    }
  };

  return (
    <Container>
      <Header>
        <RoomInfo>
          <RoomDetails>
            <RoomTitle>Salle de conférence</RoomTitle>
            <RoomMeta>
              <RoomId>{roomId}</RoomId>
              <StatusIndicator>
                <div className="dot" />
                En direct
              </StatusIndicator>
              <span>{simulatedUsers.length} participants</span>
            </RoomMeta>
          </RoomDetails>
        </RoomInfo>
        
        <HeaderActions>
          {/* Menu hamburger mobile */}
          <MobileMenuButton
            className={showMobileMenu ? 'active' : ''}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MoreVertical size={18} />
          </MobileMenuButton>

          {/* Boutons desktop */}
          <HeaderButton
            className={showWhiteboard ? 'active' : ''}
            onClick={handleToggleWhiteboard}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ display: 'none' }}
            css={`@media (min-width: 769px) { display: flex; }`}
          >
            <Palette size={18} />
          </HeaderButton>
          
          <HeaderButton
            onClick={handleToggleFullscreen}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ display: 'none' }}
            css={`@media (min-width: 769px) { display: flex; }`}
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </HeaderButton>
          
          <HeaderButton
            className={showSidebar ? 'active' : ''}
            onClick={() => setShowSidebar(!showSidebar)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ display: 'none' }}
            css={`@media (min-width: 769px) { display: flex; }`}
          >
            <MoreVertical size={18} />
          </HeaderButton>
        </HeaderActions>
      </Header>

      <FloatingPanel
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div style={{ color: getQualityColor(connectionQuality) }}>
          {getQualityIcon(connectionQuality)}
        </div>
        <span>Qualité: {connectionQuality}</span>
        <Clock size={14} />
        <span>{new Date().toLocaleTimeString()}</span>
      </FloatingPanel>

      <MainContent>
        <VideoSection>
          <VideoContainer>
            <MainVideo>
              {localStream ? (
                <video
                  ref={ref => {
                    if (ref && localStream) {
                      ref.srcObject = localStream;
                    }
                  }}
                  autoPlay
                  muted
                  playsInline
                />
              ) : (
                <div style={{ color: '#666', textAlign: 'center' }}>
                  <User size={48} />
                  <div style={{ marginTop: '1rem' }}>Caméra désactivée</div>
                </div>
              )}
              
              <VideoOverlay>
                <ParticipantInfo>
                  <Crown size={16} color="#00ff88" />
                  <div>
                    <div className="name">{simulatedUsers[selectedVideo]?.name}</div>
                    <div className="role">
                      {simulatedUsers[selectedVideo]?.isHost ? 'Hôte' : 'Participant'}
                    </div>
                  </div>
                </ParticipantInfo>
                
                <VideoStats style={{ color: getQualityColor(connectionQuality) }}>
                  {getQualityIcon(connectionQuality)}
                  <span>1080p • 30fps</span>
                </VideoStats>
              </VideoOverlay>
            </MainVideo>
          </VideoContainer>

          <ThumbnailGrid>
            {simulatedUsers.map((user, index) => (
              <Thumbnail
                key={user.id}
                active={selectedVideo === index}
                onClick={() => setSelectedVideo(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {user.isVideoEnabled ? (
                  <div className="placeholder">
                    <User size={24} />
                  </div>
                ) : (
                  <div className="placeholder">
                    <VideoOff size={24} />
                  </div>
                )}
                <div className="name">{user.name}</div>
              </Thumbnail>
            ))}
          </ThumbnailGrid>

          <AnimatePresence>
            {showWhiteboard && (
              <Whiteboard onClose={() => setShowWhiteboard(false)} />
            )}
          </AnimatePresence>

          <Controls>
            <ControlButton
              className="primary"
              active={isAudioEnabled}
              onClick={toggleAudio}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isAudioEnabled ? <Mic size={22} /> : <MicOff size={22} />}
            </ControlButton>

            <ControlButton
              className="primary"
              active={isVideoEnabled}
              onClick={toggleVideo}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isVideoEnabled ? <Video size={22} /> : <VideoOff size={22} />}
            </ControlButton>

            <ControlButton
              className="secondary"
              active={isScreenSharing}
              onClick={toggleScreenShare}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isScreenSharing ? <MonitorOff size={22} /> : <Monitor size={22} />}
            </ControlButton>

            <ControlButton
              className="secondary"
              active={isRecording}
              onClick={handleToggleRecording}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isRecording ? <StopCircle size={22} /> : <Circle size={22} />}
            </ControlButton>

            <ControlButton
              className="danger"
              onClick={handleLeaveRoom}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone size={22} />
            </ControlButton>
          </Controls>

          <AnimatePresence>
            {isRecording && (
              <RecordingIndicator
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <RecordingDot />
                Enregistrement en cours
              </RecordingIndicator>
            )}
          </AnimatePresence>
        </VideoSection>

        <AnimatePresence>
          {showSidebar && (
            <Sidebar
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <SidebarHeader>
                <MobileCloseButton
                  onClick={() => setShowSidebar(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={16} />
                </MobileCloseButton>
                
                <SidebarTabs>
                  {sidebarTabs.map(tab => (
                    <SidebarTab
                      key={tab.id}
                      active={sidebarTab === tab.id}
                      onClick={() => setSidebarTab(tab.id)}
                    >
                      {tab.icon}
                      {tab.label}
                    </SidebarTab>
                  ))}
                </SidebarTabs>
              </SidebarHeader>

              <SidebarContent>
                {sidebarTab === 'chat' && <Chat />}
                {sidebarTab === 'participants' && <ParticipantsList users={simulatedUsers} />}
                {sidebarTab === 'settings' && (
                  <div style={{ position: 'relative', height: '100%' }}>
                    <button
                      onClick={() => setShowSettings(true)}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        background: '#00ff88',
                        color: '#0a0a0a',
                        border: 'none',
                        borderRadius: '12px',
                        margin: '1rem',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      Ouvrir les paramètres
                    </button>
                  </div>
                )}
              </SidebarContent>
            </Sidebar>
          )}
        </AnimatePresence>
      </MainContent>

      <AnimatePresence>
        {showSettings && (
          <Settings onClose={() => setShowSettings(false)} />
        )}
      </AnimatePresence>

      {/* Menu Mobile */}
      <AnimatePresence>
        {showMobileMenu && (
          <MobileMenu
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MobileMenuHeader>
              <MobileMenuTitle>Menu de contrôle</MobileMenuTitle>
              <MobileMenuClose
                onClick={() => setShowMobileMenu(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={18} />
              </MobileMenuClose>
            </MobileMenuHeader>

            <MobileMenuContent>
              {/* Informations de la salle */}
              <MobileRoomInfo>
                <div className="room-title">Salle de conférence</div>
                <div className="room-id">{roomId}</div>
                <div className="participants-count">{simulatedUsers.length} participants connectés</div>
              </MobileRoomInfo>

              {/* Contrôles Audio/Vidéo */}
              <MobileMenuSection>
                <div className="title">Contrôles</div>
                <MobileMenuGrid>
                  <MobileMenuActionButton
                    className={isAudioEnabled ? 'active' : ''}
                    onClick={toggleAudio}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="icon">
                      {isAudioEnabled ? <Mic size={20} /> : <MicOff size={20} />}
                    </div>
                    <div className="label">
                      {isAudioEnabled ? 'Couper le micro' : 'Activer le micro'}
                    </div>
                  </MobileMenuActionButton>

                  <MobileMenuActionButton
                    className={isVideoEnabled ? 'active' : ''}
                    onClick={toggleVideo}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="icon">
                      {isVideoEnabled ? <Video size={20} /> : <VideoOff size={20} />}
                    </div>
                    <div className="label">
                      {isVideoEnabled ? 'Arrêter la vidéo' : 'Démarrer la vidéo'}
                    </div>
                  </MobileMenuActionButton>

                  <MobileMenuActionButton
                    className={isScreenSharing ? 'active' : ''}
                    onClick={toggleScreenShare}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="icon">
                      {isScreenSharing ? <MonitorOff size={20} /> : <Monitor size={20} />}
                    </div>
                    <div className="label">
                      {isScreenSharing ? 'Arrêter le partage' : 'Partager l\'écran'}
                    </div>
                  </MobileMenuActionButton>

                  <MobileMenuActionButton
                    className={isRecording ? 'active' : ''}
                    onClick={handleToggleRecording}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="icon">
                      {isRecording ? <StopCircle size={20} /> : <Circle size={20} />}
                    </div>
                    <div className="label">
                      {isRecording ? 'Arrêter l\'enregistrement' : 'Enregistrer'}
                    </div>
                  </MobileMenuActionButton>
                </MobileMenuGrid>
              </MobileMenuSection>

              {/* Fonctionnalités */}
              <MobileMenuSection>
                <div className="title">Fonctionnalités</div>
                <MobileMenuGrid>
                  <MobileMenuActionButton
                    className={showWhiteboard ? 'active' : ''}
                    onClick={() => {
                      handleToggleWhiteboard();
                      setShowMobileMenu(false);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="icon">
                      <Palette size={20} />
                    </div>
                    <div className="label">Tableau blanc</div>
                  </MobileMenuActionButton>

                  <MobileMenuActionButton
                    onClick={() => {
                      setSidebarTab('chat');
                      setShowSidebar(true);
                      setShowMobileMenu(false);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="icon">
                      <MessageCircle size={20} />
                    </div>
                    <div className="label">Chat</div>
                  </MobileMenuActionButton>

                  <MobileMenuActionButton
                    onClick={() => {
                      setSidebarTab('participants');
                      setShowSidebar(true);
                      setShowMobileMenu(false);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="icon">
                      <Users size={20} />
                    </div>
                    <div className="label">Participants</div>
                  </MobileMenuActionButton>

                  <MobileMenuActionButton
                    onClick={() => {
                      setShowSettings(true);
                      setShowMobileMenu(false);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="icon">
                      <SettingsIcon size={20} />
                    </div>
                    <div className="label">Paramètres</div>
                  </MobileMenuActionButton>
                </MobileMenuGrid>
              </MobileMenuSection>

              {/* Actions */}
              <MobileMenuSection>
                <div className="title">Actions</div>
                <MobileMenuGrid>
                  <MobileMenuActionButton
                    onClick={() => {
                      handleToggleFullscreen();
                      setShowMobileMenu(false);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="icon">
                      {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                    </div>
                    <div className="label">
                      {isFullscreen ? 'Quitter plein écran' : 'Plein écran'}
                    </div>
                  </MobileMenuActionButton>

                  <MobileMenuActionButton
                    className="danger"
                    onClick={() => {
                      handleLeaveRoom();
                      setShowMobileMenu(false);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="icon">
                      <Phone size={20} />
                    </div>
                    <div className="label">Quitter la salle</div>
                  </MobileMenuActionButton>
                </MobileMenuGrid>
              </MobileMenuSection>
            </MobileMenuContent>
          </MobileMenu>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default RoomPage;
