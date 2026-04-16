// This component orchestrates the Room Logic
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { RoomAudioRenderer, StartAudio } from '@livekit/components-react';
import { X, ChevronRight, BarChart2, Bot, PieChart } from 'lucide-react';

// Hooks
import { useMeeting } from '../../hooks/useMeeting';
import { useChat } from '../../hooks/useChat';
import { usePricing } from '../../hooks/usePricing';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

// Components
import { RoomHeader } from './RoomHeader';
import { VideoGrid } from './VideoGrid';
import { ControlBar } from './BottomControlBar';
import { StatsMonitor } from './StatsMonitor';
import { WhiteboardWrapper } from './WhiteboardWrapper';
import { AnalyticsPanel } from './AnalyticsPanel';
import { AIChatPanel } from './AIChatPanel';
import { RoomSettingsPanel } from './RoomSettingsPanel';
import { MeetingChat } from './MeetingChat';
import PollsPanel from './PollsPanel';
import BreakoutRoomsPanel from './BreakoutRoomsPanel';
import { useRecording } from '../../hooks/useRecording';
import { ROOM_THEME as THEME } from '../../styles/roomTheme';

// Layout Styled Components
const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  background-color: ${THEME.bg};
  color: ${THEME.text};
  overflow: hidden;
`;

// Side Panel Styles
const SidePanel = styled(motion.div)`
  width: ${props => props.wide ? '600px' : '400px'};
  background-color: ${THEME.panelBg};
  border-left: 1px solid #cbd5e1; box-shadow: -4px 0 20px rgba(37, 99, 235, 0.05);
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: -8px 0 24px rgba(29, 78, 216, 0.16);
  z-index: 50;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;

  @media (max-width: 768px) {
    width: 100%;
    z-index: 60;
  }
`;

const PanelHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${THEME.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${THEME.cardBg};
  
  h3 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: ${THEME.text};
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const PanelContent = styled.div`
  flex: 1;
  overflow: hidden; 
  display: flex;
  flex-direction: column;
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
  background-color: ${THEME.accentSoft};
  border: 1px solid ${THEME.border};
  border-radius: 12px;
  padding: 1rem;
  color: ${THEME.text};
  outline: none;
  font-size: 0.95rem;
  transition: all 0.2s;

  &:focus {
    border-color: ${THEME.accent};
    background-color: ${THEME.accentSoft};
    box-shadow: 0 0 0 3px ${THEME.ring};
  }
`;

const WhiteboardOverlay = styled(motion.div)`
  position: absolute;
  top: 72px;
  left: 0;
  right: 0;
  bottom: 80px;
  background: ${THEME.bg};
  z-index: 40;
`;

export const MeetingRoom = ({ onLeave, roomId, user }) => {
  const originalRoomId = new URLSearchParams(window.location.search).get('parent') || roomId;

  const activeBreakout = useQuery(api.breakout.getActiveBreakout, { meetingId: originalRoomId });

  useEffect(() => {
    if (!activeBreakout || !user?.identity) return;
    
    const assignedRoom = activeBreakout.rooms.find(r => 
      r.participants.includes(user.identity) || r.participants.includes(user.email)
    );
    
    if (assignedRoom && roomId === originalRoomId) {
      window.location.href = `/room/${originalRoomId}-${assignedRoom.id}?parent=${originalRoomId}`;
    } else if (!assignedRoom && roomId !== originalRoomId) {
      window.location.href = `/room/${originalRoomId}`; 
    }
  }, [activeBreakout, roomId, originalRoomId, user]);

  const [roomSettings, setRoomSettings] = useState(() => {
    try {
      const stored = localStorage.getItem('visiconnect_room_settings');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return {
      maxQualityLock: true,
      videoFit: 'cover',
      showParticipantLabels: true,
      aiResponseStyle: 'balanced',
      widePanel: false,
      showStatsDefault: false,
    };
  });

  const { 
    room, 
    localParticipant, 
    isCameraEnabled,
    isMicrophoneEnabled,
    isScreenShareEnabled,
    isBlurEnabled,
    blurRadius,
    toggleBlur,
    isAiReady,
    isAIEnhanced,
    toggleAIVideoEngine,
    tracks,
    devices,
    selectedDevices,
    controls,
  } = useMeeting(roomSettings.maxQualityLock);

  const { messages, sendMessage } = useChat(roomId, user, null);
  usePricing(onLeave);

  // -- UI State --
  const [showStats, setShowStats] = useState(false);
  const [whiteboardOpen, setWhiteboardOpen] = useState(false);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [activePanel, setActivePanel] = useState('chat'); // 'chat' | 'ai' | 'analytics' | 'settings'
  const [messageText, setMessageText] = useState('');
  
  const { isRecording, toggleRecording } = useRecording();

  useEffect(() => {
    localStorage.setItem('visiconnect_room_settings', JSON.stringify(roomSettings));
  }, [roomSettings]);

  useEffect(() => {
    if (roomSettings.showStatsDefault) {
      setShowStats(true);
    }
  }, [roomSettings.showStatsDefault]);

  const updateSetting = (key, value) => {
    setRoomSettings((prev) => ({ ...prev, [key]: value }));
  };

  // -- Handlers --
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
    if (!whiteboardOpen) setSidePanelOpen(false); // Close panel when opening whiteboard
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      sendMessage(messageText);
      setMessageText('');
    }
  };

  return (
    <MainContent>
       {/* 1. Header */}
       <RoomHeader 
         roomName={room?.name} 
         participantCount={tracks?.length ? tracks.length + 1 : 1} 
         connectionStatus="connected" 
         isSecure={true}
         quality="excellent"
       />

       {/* 2. Overlays */}
       <AnimatePresence>
        {whiteboardOpen && (
           <WhiteboardOverlay
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.95 }}
           >
             <WhiteboardWrapper roomId={roomId} userName={user?.name || 'Guest'} />
             <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 1000 }}>
                <button 
                  onClick={toggleWhiteboard}
                  style={{
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}
                >
                  Fermer
                </button>
             </div>
           </WhiteboardOverlay>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showStats && localParticipant && (
            <StatsMonitor participant={localParticipant} />
        )}
      </AnimatePresence>

      {/* 3. Main Grid */}
      <VideoGrid 
        localParticipant={localParticipant}
        isLocalCameraEnabled={isCameraEnabled}
        isLocalMicEnabled={isMicrophoneEnabled}
        tracks={tracks}
        videoFit={roomSettings.videoFit}
        showParticipantLabels={roomSettings.showParticipantLabels}
      />

      {/* 4. Controls */}
      <ControlBar 
         localParticipant={localParticipant}
         isCameraEnabled={isCameraEnabled}
         isMicrophoneEnabled={isMicrophoneEnabled}
         isScreenShareEnabled={isScreenShareEnabled}
         controls={controls}
         whiteboardOpen={whiteboardOpen}
         toggleWhiteboard={toggleWhiteboard}
         showStats={showStats}
         setShowStats={setShowStats}
         sidePanelOpen={sidePanelOpen}
         activePanel={activePanel}
         togglePanel={togglePanel}
         isRecording={isRecording}
         toggleRecording={toggleRecording}
         isBlurEnabled={isBlurEnabled}
           blurRadius={blurRadius}
         toggleBlur={toggleBlur}
         isAiReady={isAiReady}
         isAIEnhanced={isAIEnhanced}
         toggleAIVideoEngine={toggleAIVideoEngine}
         onLeave={onLeave}
      />

      {/* 5. Side Panel (Chat / AI / Analytics) */}
      <AnimatePresence>
        {sidePanelOpen && (
          <SidePanel
            wide={activePanel === 'analytics' || roomSettings.widePanel}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <PanelHeader>
              <h3>
                {activePanel === 'chat' && <><ChevronRight size={20} /> Discussion</>}
                {activePanel === 'polls' && <><PieChart size={20} /> Sondages</>}
                {activePanel === 'breakout' && <><Users size={20} /> Salles de sous-commission</>}
                {activePanel === 'ai' && <><Bot size={20} /> Assistant IA</>}
                {activePanel === 'analytics' && <><BarChart2 size={20} /> Analytics</>}
                {activePanel === 'settings' && <><ChevronRight size={20} /> Parametres</>}
              </h3>
              <button 
                onClick={() => setSidePanelOpen(false)} 
                style={{ background: 'none', border: 'none', color: THEME.textDim, cursor: 'pointer', padding: '4px', borderRadius: '4px', display: 'flex' }}
              >
                <X size={20} />
              </button>
            </PanelHeader>

            <PanelContent>
               {activePanel === 'chat' && (
                 <MeetingChat
                   messages={messages}
                   messageText={messageText}
                   setMessageText={setMessageText}
                   onSendMessage={handleSendMessage}
                 />
               )}
               {activePanel === 'polls' && <PollsPanel meetingId={originalRoomId} currentUser={{ identity: localParticipant?.identity }} onClose={() => togglePanel('polls')} />}
               {activePanel === 'breakout' && <BreakoutRoomsPanel meetingId={originalRoomId} activeParticipants={remoteParticipants.concat(localParticipant ? [localParticipant] : [])} onClose={() => togglePanel('breakout')} />}

               {activePanel === 'ai' && <AIChatPanel responseStyle={roomSettings.aiResponseStyle} roomMessages={messages} roomId={roomId} />}
               {activePanel === 'analytics' && <AnalyticsPanel />}
               {activePanel === 'settings' && (
                 <RoomSettingsPanel
                   settings={roomSettings}
                   updateSetting={updateSetting}
                   devices={devices}
                   selectedDevices={selectedDevices}
                   controls={controls}
                 />
               )}

            </PanelContent>
          </SidePanel>
        )}
      </AnimatePresence>

      {/* Audio Rendering & Safari iOS Low Power Mode Fallback */}
      <RoomAudioRenderer />
      
      {/* Apparaît uniquement si Safari IOS / Chrome bloque l'autoplay audio en arrière-plan */}
      <StartAudio 
        label="Démarrer l'audio" 
        className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white font-medium py-3 px-6 rounded-full shadow-2xl z-[999] animate-bounce hover:bg-blue-700 transition" 
      />
    </MainContent>
  );
};
