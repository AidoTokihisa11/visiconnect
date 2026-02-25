// This component orchestrates the Room Logic
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { RoomAudioRenderer } from '@livekit/components-react';
import { X, ChevronRight, Terminal, BarChart2, Bot, Layout, PenTool } from 'lucide-react';

// Hooks
import { useMeeting } from '../../hooks/useMeeting';
import { useChat } from '../../hooks/useChat';
import { useSocket } from '../../hooks/useSocket';
import { usePricing } from '../../hooks/usePricing';

// Components
import { RoomHeader } from './RoomHeader';
import { VideoGrid } from './VideoGrid';
import { ControlBar } from './BottomControlBar';
import { StatsMonitor } from './StatsMonitor';
import { WhiteboardWrapper } from './WhiteboardWrapper';
import { AnalyticsPanel } from './AnalyticsPanel';
import { AIChatPanel } from './AIChatPanel';
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
  background-color: ${THEME.cardBg};
  border-left: 1px solid ${THEME.border};
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: -10px 0 30px rgba(0,0,0,0.5);
  z-index: 50;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
`;

const PanelHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${THEME.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(15, 23, 42, 0.5);
  
  h3 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: white;
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

export const MeetingRoom = ({ onLeave, roomId, user }) => {
  const { 
    room, 
    localParticipant, 
    tracks, 
    controls, 
    activeSpeakerId 
  } = useMeeting();
  
  const socket = useSocket(roomId, user);
  const { messages, sendMessage } = useChat(roomId, user, socket);
  const { isPro, timeLeft } = usePricing(onLeave); 
  
  // -- UI State --
  const [showStats, setShowStats] = useState(false);
  const [whiteboardOpen, setWhiteboardOpen] = useState(false);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [activePanel, setActivePanel] = useState('chat'); // 'chat' | 'ai' | 'analytics'
  const [messageText, setMessageText] = useState('');

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
        tracks={tracks}
      />

      {/* 4. Controls */}
      <ControlBar 
         localParticipant={localParticipant}
         controls={controls}
         whiteboardOpen={whiteboardOpen}
         toggleWhiteboard={toggleWhiteboard}
         showStats={showStats}
         setShowStats={setShowStats}
         sidePanelOpen={sidePanelOpen}
         activePanel={activePanel}
         togglePanel={togglePanel}
         onLeave={onLeave}
      />

      {/* 5. Side Panel (Chat / AI / Analytics) */}
      <AnimatePresence>
        {sidePanelOpen && (
          <SidePanel
            wide={activePanel === 'analytics'}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <PanelHeader>
              <h3>
                {activePanel === 'chat' && <><ChevronRight size={20} /> Discussion</>}
                {activePanel === 'ai' && <><Bot size={20} /> Assistant IA</>}
                {activePanel === 'analytics' && <><BarChart2 size={20} /> Analytics</>}
              </h3>
              <button 
                onClick={() => setSidePanelOpen(false)} 
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '4px', borderRadius: '4px', display: 'flex' }}
              >
                <X size={20} />
              </button>
            </PanelHeader>

            <PanelContent>
               {activePanel === 'chat' && (
                 <>
                    <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {messages.map((msg, idx) => (
                          <div key={idx} style={{ 
                              alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                              maxWidth: '85%',
                              padding: '0.75rem 1rem', 
                              background: msg.sender === 'me' ? THEME.accent : 'rgba(255,255,255,0.1)', 
                              borderRadius: '12px',
                              borderBottomRightRadius: msg.sender === 'me' ? '2px' : '12px',
                              borderBottomLeftRadius: msg.sender === 'me' ? '12px' : '2px',
                              color: 'white'
                          }}>
                              <div style={{ fontSize: '0.75rem', opacity: 0.7, marginBottom: '4px' }}>{msg.sender === 'me' ? 'Vous' : msg.sender}</div>
                              <div style={{ lineHeight: 1.4 }}>{msg.text}</div>
                          </div>
                        ))}
                    </div>
                    <ChatInputContainer>
                        <ChatInput 
                        type="text" 
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Écrivez un message..." 
                        />
                        <button onClick={handleSendMessage} style={{ background: THEME.accent, border: 'none', borderRadius: '50%', width: '48px', height: '48px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)' }}>
                        <ChevronRight size={24} />
                        </button>
                    </ChatInputContainer>
                 </>
               )}
               
               {activePanel === 'ai' && <AIChatPanel />}
               {activePanel === 'analytics' && <AnalyticsPanel />}

            </PanelContent>
          </SidePanel>
        )}
      </AnimatePresence>

      {/* Audio Rendering */}
      <RoomAudioRenderer />
    </MainContent>
  );
};
