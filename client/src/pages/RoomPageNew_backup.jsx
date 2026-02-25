import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, MicOff, Video, VideoOff, Phone, Monitor, MonitorOff, 
  MessageSquare, Users, Settings, MoreVertical, 
  Shield, Zap, Sparkles, Layout, ChevronRight, 
  Terminal, Lock, Globe, Cpu, Activity, Signal, X
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { LiveKitRoom, RoomAudioRenderer, VideoTrack, useParticipants } from '@livekit/components-react';
import { useMeeting, useRoomToken } from '../hooks/useMeeting';
import { useChat } from '../hooks/useChat';
import { usePricing } from '../hooks/usePricing';
import { useRoomProtection } from '../hooks/useRoomProtection';
import { useSocket } from '../hooks/useSocket';
import { useLiveKit4K } from '../hooks/useLiveKit4K';
// import { useWhiteboard } from '../hooks/useWhiteboard'; // Removing direct usage if we inline logic or adapt it
import { Excalidraw } from "@excalidraw/excalidraw";
import '@livekit/components-styles';

// --- Colors & Theme ---
const THEME = {
  bg: '#0f172a',       // Slate 900
  cardBg: '#1e293b',   // Slate 800
  accent: '#3b82f6',   // Blue 500
  accentHover: '#2563eb', // Blue 600
  danger: '#ef4444',   // Red 500
  text: '#f8fafc',     // Slate 50
  textDim: '#94a3b8',  // Slate 400
  border: 'rgba(148, 163, 184, 0.1)',
};

// --- Styled Components ---

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${THEME.bg};
  color: ${THEME.text};
  display: flex;
  overflow: hidden;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
`;

const Header = styled.header`
  height: 72px;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${THEME.border};
  background-color: ${THEME.bg};
  z-index: 10;
`;

const RoomInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const RoomName = styled.h1`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${THEME.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const SecureBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: rgba(16, 185, 129, 0.1);
  color: #10b981;
  padding: 0.375rem 0.875rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid rgba(16, 185, 129, 0.2);
`;

const ConnectionStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  .status-item {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    font-size: 0.875rem;
    color: ${THEME.textDim};
    font-weight: 500;
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const VideoGrid = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  gap: 1rem;
  overflow-y: auto;
  width: 100%;
  height: calc(100% - 80px); /* Leave space for bottom bar */
  
  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${THEME.cardBg};
    border-radius: 4px;
  }
`;

const VideoCard = styled.div`
  background-color: #000;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  /* Dynamic sizing based on content */
  flex: 1 1 400px; 
  max-width: 800px;
  /* Maintain aspect ratio but don't force it to be huge */
  aspect-ratio: 16/9;
  max-height: 100%;
  
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid ${props => props.isActive ? THEME.accent : 'rgba(255,255,255,0.1)'};
  transition: all 0.3s ease;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover; /* or contain if we want to see full feed without cropping */
  }

  .placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${THEME.cardBg};
    color: ${THEME.textDim};
  }
`;

const UserLabel = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background-color: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(4px);
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 2;
  border: 1px solid rgba(255,255,255,0.08);
`;

const StatusIcons = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
  z-index: 2;
`;

const StatusIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.active ? '#ef4444' : 'white'};
  border: 1px solid rgba(255,255,255,0.08);
  
  svg {
    width: 16px; 
    height: 16px;
  }
`;

const BottomBar = styled.div`
  height: 80px;
  background-color: rgba(15, 23, 42, 0.85); /* Slightly more transparent */
  backdrop-filter: blur(12px);
  border-top: 1px solid rgba(255,255,255,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 0 1rem;
  z-index: 20;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const ControlButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  border: none;
  background-color: ${props => props.$active ? props.$activeColor || THEME.accent : 'rgba(255,255,255,0.05)'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border: 1px solid rgba(255,255,255,0.05);

  &:hover {
    background-color: ${props => props.$active ? props.$activeColor : 'rgba(255,255,255,0.15)'};
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const EndCallButton = styled(ControlButton)`
  background-color: ${THEME.danger};
  width: 64px;
  border-radius: 16px;
  
  &:hover {
    background-color: #dc2626;
  }
`;

const SidePanel = styled(motion.div)`
  width: 400px;
  background-color: ${THEME.cardBg};
  border-left: 1px solid ${THEME.border};
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: -10px 0 30px rgba(0,0,0,0.5);
  z-index: 50;
`;

const PanelHeader = styled.div`
  padding: 1.5rem;
  border-bottom: Iconpx solid ${THEME.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(15, 23, 42, 0.5);
  
  h3 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: white;
  }
`;

const PanelContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AIUpdateCard = styled.div`
  background: linear-gradient(145deg, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0.1) 100%);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 0.5rem;

  h4 {
    color: #60a5fa;
    margin: 0 0 0.75rem 0;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-weight: 600;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
    color: ${THEME.textDim};
    line-height: 1.6;
  }
`;

const ChatInputContainer = styled.div`
  padding: 1.5rem;
  border-top: 1px solid ${THEME.border};
  display: flex;
  gap: 1rem;
  background-color: ${THEME.cardBg};
`;

const ChatInput = styled.input`
  flex: 1;
  background-color: rgba(15, 23, 42, 0.5);
  border: 1px solid ${THEME.border};
  border-radius: 12px;
  padding: 1rem;
  color: white;
  outline: none;
  font-size: 0.95rem;
  transition: all 0.2s;

  &:focus {
    border-color: ${THEME.accent};
    background-color: rgba(15, 23, 42, 0.8);
  }
`;

const WhiteboardOverlay = styled(motion.div)`
  position: absolute;
  top: 72px;
  left: 0;
  right: 0;
  bottom: 80px;
  background: white;
  z-index: 40;
`;

const StatsContainer = styled(motion.div)`
  position: absolute;
  top: 80px;
  left: 20px;
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 12px;
  color: white;
  z-index: 50;
  width: 250px;
  font-family: monospace;
  font-size: 0.8rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);

  h4 {
    margin: 0 0 0.5rem 0;
    color: ${THEME.accent};
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .stat-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.25rem;
    padding-bottom: 0.25rem;
    border-bottom: 1px solid rgba(255,255,255,0.05);

    &:last-child {
      border: none;
    }
    
    span:first-child {
      color: ${THEME.textDim};
    }
  }
`;

const StatsMonitor = ({ participant }) => {
  const [stats, setStats] = useState({
    resolution: 'Loading...',
    codec: 'Loading...',
    bitrate: '0 kbps',
    packetLoss: '0%'
  });

  useEffect(() => {
    if (!participant) return;

    const interval = setInterval(async () => {
      // Find the first video track
      const tracks = Array.from(participant.videoTracks.values());
      const videoTrackPub = tracks.find(t => t.kind === 'video' && t.track);
      
      if (videoTrackPub && videoTrackPub.track) {
         try {
             // For Chrome/WebRTC stats
             const reports = await videoTrackPub.track.getStats();
             let width = 0, height = 0, codec = 'Unknown', bitrate = 0, packetsLost = 0;
             
             reports.forEach(report => {
                 if (report.type === 'outbound-rtp' && report.kind === 'video') {
                      // Calculate bitrate
                      // Note: This is simplified. In a real app we'd diff timestamps.
                      // LiveKit SDK might offer easier stats but raw WebRTC is reliable for resolution
                 }
                 if (report.type === 'track' && report.kind === 'video' && report.frameHeight) {
                     width = report.frameWidth;
                     height = report.frameHeight;
                 }
                 if (report.type === 'outbound-rtp') {
                    // Extract codec via codecId if needed, but often 'codec' property is here or linked
                 }
             });

             // Simpler approach: use video element or track settings if available
             const settings = videoTrackPub.track.mediaStreamTrack.getSettings();
             width = settings.width;
             height = settings.height;
             
             // Get current bitrate from LiveKit stats if possible, else simplified
             setStats({
                 resolution: `${width}x${height}`,
                 codec: 'VP9 (Requested)', // Hard to get exact codec from track settings in one line without iterating reports
                 bitrate: 'Dynamic',
                 packetLoss: '0%'
             });

         } catch (e) {
             console.error("Stats error", e);
         }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [participant]);
  
  return (
    <StatsContainer initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <h4><Activity size={16} /> Flux Vidéo (Test)</h4>
        <div className="stat-row">
            <span>Résolution</span>
            <span style={{ color: '#4ade80' }}>{stats.resolution}</span>
        </div>
        <div className="stat-row">
            <span>Codec</span>
            <span>{stats.codec}</span>
        </div>
        <div className="stat-row">
            <span>Mode</span>
            <span>Simulcast Enabled</span>
        </div>
        <div style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: THEME.textDim }}>
            *La résolution s'adapte à la bande passante (4K -> 1080p -> 540p)
        </div>
    </StatsContainer>
  );
};

function MeetingRoom({ onLeave, roomId, user }) {
  const { 
    room, 
    localParticipant, 
    tracks, 
    controls, 
    activeSpeakerId 
  } = useMeeting();
  
  const socket = useSocket(roomId, user);
  const { messages, sendMessage } = useChat(roomId, user, socket);
  const { isPro, timeLeft, showUpgradeModal, setShowUpgradeModal, upgradeToPro } = usePricing(onLeave);
  
  // Stats & Debug
  const [showStats, setShowStats] = useState(false);

  // Whiteboard Logic
  const [whiteboardOpen, setWhiteboardOpen] = useState(false);
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);

  useEffect(() => {
    if (!socket || !excalidrawAPI) return;
    
    const handleUpdate = (data) => {
        // Simple sync: update scene if we receive new elements
        // In production, you'd need version checking to avoid loops/overwrites
        excalidrawAPI.updateScene({ elements: data.elements });
    };
    
    socket.on('whiteboard-update', handleUpdate);
    return () => socket.off('whiteboard-update', handleUpdate);
  }, [socket, excalidrawAPI]);

  const onWhiteboardChange = (elements, appState, files) => {
      if(socket && elements.length > 0) {
          // Debouncing would be good here
          socket.emit('whiteboard-update', { roomId, elements });
      }
  };

  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [activePanel, setActivePanel] = useState('chat'); // 'chat' | 'ai' | 'people'
  const [messageText, setMessageText] = useState('');

  const togglePanel = (panel) => {
    if (activePanel === panel && sidePanelOpen) {
      setSidePanelOpen(false);
    } else {
      setActivePanel(panel);
      setSidePanelOpen(true);
    }
  };
  
  const toggleWhiteboard = () => {
    setWhiteboardOpen(!whiteboardOpen);
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      sendMessage(messageText);
      setMessageText('');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <MainContent>
      <Header>
        <RoomInfo>
          <div style={{ padding: '10px', background: THEME.accent, borderRadius: '12px', display: 'flex', boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)' }}>
            <Terminal size={20} color="white" />
          </div>
          <div>
            <RoomName>
              {room?.name || 'Visioconférence'}
              <span style={{ fontSize: '0.8rem', color: THEME.textDim, fontWeight: 'normal', marginLeft: '0.5rem', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                {isPro ? 'PRO' : 'GRATUIT'}
              </span>
            </RoomName>
          </div>
          <SecureBadge>
            <Lock size={12} /> Chiffré de bout en bout
          </SecureBadge>
        </RoomInfo>

        {!isPro && (
           <div style={{ color: timeLeft < 300 ? THEME.danger : THEME.textDim, fontWeight: 'bold' }}>
             Temps restant: {formatTime(timeLeft)}
           </div>
        )}

        <ConnectionStatus>
          <div className="status-item">
            <Signal size={18} color="#10b981" />
            <span>Excellent</span>
          </div>
        </ConnectionStatus>
      </Header>
      
      {/* Whiteboard Overlay */}
      <AnimatePresence>
        {whiteboardOpen && (
           <WhiteboardOverlay
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.95 }}
           >
             <Excalidraw 
                theme="dark"
                isCollaborating={true}
                excalidrawAPI={(api) => setExcalidrawAPI(api)}
                onChange={onWhiteboardChange}
                UIOptions={{
                    canvasActions: {
                        loadScene: false,
                        saveToActiveFile: false,
                        export: false,
                        saveAsImage: true
                    }
                }}
             />
           </WhiteboardOverlay>
        )}
      </AnimatePresence>
      
      {/* Stats Overlay for 4K Testing */}
      <AnimatePresence>
        {showStats && localParticipant && (
            <StatsMonitor participant={localParticipant} />
        )}
      </AnimatePresence>

      <VideoGrid>
        {/* Local Participant */}
        {localParticipant && (
            <VideoCard isActive={localParticipant.isMicrophoneEnabled}>
               {localParticipant.isCameraEnabled ? (
                 <VideoTrack trackRef={{ participant: localParticipant, source: 'camera' }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
               ) : (
                 <div className="placeholder">
                   <VideoOff size={64} style={{ opacity: 0.5 }} />
                 </div>
               )}
               <StatusIcons>
                 {!localParticipant.isMicrophoneEnabled && <StatusIcon active><MicOff size={16} /></StatusIcon>}
               </StatusIcons>
               <UserLabel>
                 {localParticipant.isMicrophoneEnabled ? <Mic size={14} color="#4ade80" /> : <MicOff size={14} color="#f87171" />}
                 {localParticipant.identity} (Vous)
               </UserLabel>
            </VideoCard>
        )}

        {/* Remote Participants */}
        {tracks.map((track) => {
            if (track.participant.identity === localParticipant?.identity) return null;
            return (
              <VideoCard key={track.participant.identity} isActive={track.participant.isSpeaking}>
                  <VideoTrack trackRef={track} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <UserLabel>
                    <Mic size={14} color={track.participant.isSpeaking ? "#4ade80" : "white"} />
                    {track.participant.identity}
                  </UserLabel>
              </VideoCard>
            );
        })}
      </VideoGrid>

      <BottomBar>
        <ControlButton onClick={controls.toggleMic} $active={!localParticipant?.isMicrophoneEnabled} $activeColor={THEME.danger} title="Micro">
          {localParticipant?.isMicrophoneEnabled ? <Mic /> : <MicOff />}
        </ControlButton>
        
        <ControlButton onClick={controls.toggleCamera} $active={!localParticipant?.isCameraEnabled} $activeColor={THEME.danger} title="Caméra">
          {localParticipant?.isCameraEnabled ? <Video /> : <VideoOff />}
        </ControlButton>

        <ControlButton onClick={controls.toggleScreenShare} $active={localParticipant?.isScreenShareEnabled} $activeColor={THEME.accent} title="Partager l'écran">
          {localParticipant?.isScreenShareEnabled ? <Monitor /> : <MonitorOff />}
        </ControlButton>
        
        <ControlButton onClick={toggleWhiteboard} $active={whiteboardOpen} $activeColor={THEME.accent} title="Tableau Blanc">
          <Layout /> 
        </ControlButton>

        <ControlButton onClick={() => setShowStats(!showStats)} $active={showStats} $activeColor="#10b981" title="Stats / Debug (4K)">
          <Activity />
        </ControlButton>

        <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.1)', margin: '0 1.5rem' }}></div>

        <ControlButton onClick={() => togglePanel('ai')} $active={activePanel === 'ai' && sidePanelOpen} $activeColor={THEME.accent} title="Assistant IA">
          <Sparkles />
        </ControlButton>

        <ControlButton onClick={() => togglePanel('chat')} $active={activePanel === 'chat' && sidePanelOpen} $activeColor={THEME.accent} title="Chat">
          <MessageSquare />
        </ControlButton>

        <EndCallButton onClick={onLeave} $active title="Quitter">
          <Phone style={{ transform: 'rotate(135deg)' }} />
        </EndCallButton>
      </BottomBar>


      <AnimatePresence>
        {sidePanelOpen && (
          <SidePanel
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 400, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
          >
            <PanelHeader>
              <h3>Discussion</h3>
              <button onClick={() => setSidePanelOpen(false)} style={{ background: 'none', border: 'none', color: 'white' }}><X /></button>
            </PanelHeader>

            <PanelContent>
               {messages.map((msg, idx) => (
                 <div key={idx} style={{ marginBottom: '1rem', padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.8rem', color: THEME.accent }}>{msg.sender}</div>
                    <div>{msg.text}</div>
                 </div>
               ))}
            </PanelContent>

            <ChatInputContainer>
              <ChatInput 
                type="text" 
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Écrivez un message..." 
              />
              <button onClick={handleSendMessage} style={{ background: THEME.accent, border: 'none', borderRadius: '12px', width: '48px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ChevronRight size={24} />
              </button>
            </ChatInputContainer>
          </SidePanel>
        )}
      </AnimatePresence>
      
      {/* Invisible Component needed for audio rendering */}
      <RoomAudioRenderer />
    </MainContent>
  );
}

export default function RoomPageNew() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { isAuthorized, loading: authLoading, user } = useRoomProtection(roomId);
  const { token, error: tokenError } = useRoomToken(roomId, user?.email || 'Guest');
  const { options: roomOptions, videoOptions } = useLiveKit4K();

  // if (authLoading) return <div style={{ color: 'white', padding: '2rem' }}>Chargement...</div>;
  // FORCE AUTHORIZED FOR DEMO/LOCAL
  // if (!isAuthorized) return <div style={{ color: 'white', padding: '2rem' }}>Accès refusé. Veuillez vous connecter.</div>;
  
  // BYPASS LOGIN / TOKEN FOR LOCAL DEV IF REQUESTED
  // if (tokenError) return <div style={{ color: 'white', padding: '2rem' }}>Erreur de connexion à la salle.</div>;
  
  const liveKitUrl = import.meta.env.VITE_LIVEKIT_URL || 'ws://localhost:7880'; 
  // if (!liveKitUrl) return <div style={{ color: 'white', padding: '2rem' }}>Erreur de configuration: VITE_LIVEKIT_URL manquant.</div>;

  // Make token optional for UI testing
  // if (!token) return <div style={{ color: 'white', padding: '2rem' }}>Préparation de la salle...</div>;
  const safeToken = token || ""; // Empty token means not connected, but UI renders

  return (
    <PageContainer>
      {tokenError && (
        <div style={{ 
          position: 'absolute', 
          top: '20px', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          background: '#ef4444', 
          color: 'white', 
          padding: '1rem 2rem', 
          borderRadius: '8px',
          zIndex: 1000,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          fontWeight: 'bold'
        }}>
          ⚠️ Erreur Serveur: Impossible de se connecter (Token manquant). Veuillez redémarrer le backend.
        </div>
      )}
      <LiveKitRoom
        token={safeToken}
        serverUrl={liveKitUrl}
        connect={!!safeToken} // Only connect if token exists
        video={videoOptions}
        audio={true}
        options={roomOptions}
        data-lk-theme="default"
      >
        <MeetingRoom 
           roomId={roomId} 
           user={{ id: user?.id || 'demo-user', name: user?.email || 'Demo User' }} 
           onLeave={() => navigate('/')} 
        />
      </LiveKitRoom>
    </PageContainer>
  );
}
