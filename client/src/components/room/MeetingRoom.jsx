// This component orchestrates the Room Logic
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { RoomAudioRenderer, StartAudio } from '@livekit/components-react';
import { X, ChevronRight, Bot, PieChart, MessageSquare, Users, Hand, Sparkles } from 'lucide-react';

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
import { AIChatPanel } from './AIChatPanel';
import { AIFeaturesPanel } from './AIFeaturesPanel';
import { TranscriptionWidget } from './TranscriptionWidget';
import { useAISettings } from '../../hooks/useAISettings';
import { RoomSettingsPanel } from './RoomSettingsPanel';
import { MeetingChat } from './MeetingChat';
import PollsPanel from './PollsPanel';
import BreakoutRoomsPanel from './BreakoutRoomsPanel';
import { useRecording } from '../../hooks/useRecording';
import { ROOM_THEME as THEME } from '../../styles/roomTheme';

// Layout Styled Components
const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  /* Remplir le PageContainer */
  flex: 1;
  min-height: 0;
  background-color: ${THEME.bg};
  color: ${THEME.text};
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 100%;
    min-height: 0;
    touch-action: none;
  }
`;

// Toast Notification
const ToastNotification = styled(motion.div)`
  position: fixed;
  top: 90px;
  left: 50%;
  transform: translateX(-50%);
  background: ${props => props.$type === 'poll' ? 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'};
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 10px;
  
  @media (max-width: 768px) {
    top: 70px;
    padding: 10px 18px;
    font-size: 13px;
    max-width: calc(100% - 32px);
  }
`;

// Poll Popup (Auto-display when new poll is created)
const PollPopupOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const PollPopupCard = styled(motion.div)`
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
  border-radius: 20px;
  padding: 24px;
  max-width: 400px;
  width: 100%;
  color: white;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  h3 {
    margin: 0 0 8px;
    font-size: 18px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  p {
    margin: 0 0 20px;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.9);
  }
  
  .poll-meta {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 16px;
  }
`;

const PollPopupButton = styled.button`
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &.primary {
    background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
    border: none;
    color: white;
    flex: 1;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(139, 92, 246, 0.3);
    }
  }
  
  &.secondary {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
`;

// Side Panel Styles — Premium GPU-accelerated transitions
const SidePanel = styled(motion.div)`
  width: ${props => props.wide ? 'min(600px, 45vw)' : 'min(400px, 38vw)'};
  min-width: 280px;
  background-color: ${THEME.panelBg};
  border-left: 1px solid #cbd5e1;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: -8px 0 24px rgba(29, 78, 216, 0.16);
  z-index: 70; /* Above BottomBar (60) and StatsMonitor (50) */
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  will-change: transform, opacity;
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), filter 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${props => props.$fading ? 0.35 : 1};
  filter: ${props => props.$fading ? 'blur(2px)' : 'none'};
  pointer-events: ${props => props.$fading ? 'none' : 'auto'};

  @media (max-width: 768px) {
    width: 100%;
    min-width: unset;
    top: 0;
    bottom: calc(70px + env(safe-area-inset-bottom, 12px));
    height: auto;
    max-height: none;
    border-radius: 0 0 20px 20px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
    z-index: 70; /* Above BottomBar (60) on mobile too */
    border-left: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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
  min-height: 0;
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
  top: 72px; /* Height of header */
  left: 0;
  right: 0;
  bottom: 80px; /* Desktop bottom bar height */
  background: ${THEME.bg};
  z-index: 40;

  @media (max-width: 768px) {
    top: 60px; /* Mobile header height */
    bottom: 90px; /* Mobile bottom bar */
  }
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
    isProcessingAI,
    toggleAIVideoEngine,
    tracks,
    devices,
    selectedDevices,
    controls,
    deviceError,
    clearDeviceError,
  } = useMeeting(roomSettings.maxQualityLock);

  const { messages, sendMessage } = useChat(roomId, user, null);
  usePricing(onLeave);

  // -- UI State --
  const [showStats, setShowStats] = useState(false);
  const [whiteboardOpen, setWhiteboardOpen] = useState(false);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [activePanel, setActivePanel] = useState('chat'); // 'chat' | 'ai' | 'aiFeatures' | 'settings' | 'polls' | 'breakout'
  const [messageText, setMessageText] = useState('');
  const [panelFading, setPanelFading] = useState(false);
  const fadeTimerRef = React.useRef(null);
  
  // -- Notification Sound --
  const playNotifSound = React.useCallback(() => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.setValueAtTime(1100, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.25);
    } catch {}
  }, []);
  
  // -- Notifications State --
  const [unreadChat, setUnreadChat] = useState(0);
  const [unreadPolls, setUnreadPolls] = useState(0);
  const [toast, setToast] = useState(null); // { message: string, type: 'chat' | 'poll' }
  const [pollPopup, setPollPopup] = useState(null); // Nouveau sondage à afficher
  const lastMessageCountRef = React.useRef(0);
  const lastPollCountRef = React.useRef(0);
  const currentUserId = user?.id || localParticipant?.identity;
  
  // -- Raise Hand State --
  const [isHandRaised, setIsHandRaised] = useState(false);
  
  // 🤖 AI Features State
  const { settings: aiSettings } = useAISettings();
  const [showTranscription, setShowTranscription] = useState(false);

  // Query des sondages pour les notifications
  const polls = useQuery(api.polls.getPolls, originalRoomId ? { meetingId: originalRoomId } : "skip") || [];

  const { isRecording, toggleRecording, recordingError, clearRecordingError } = useRecording();

  // Show a toast when recording permission is denied
  useEffect(() => {
    if (!deviceError) return;
    const msg = deviceError === 'mic_denied'
      ? 'Micro bloqué — cliquez sur 🔒 dans la barre d\'adresse pour autoriser l\'accès.'
      : deviceError === 'mic_error'
      ? 'Erreur micro — rechargez la page ou vérifiez votre périphérique audio.'
      : 'Caméra bloquée — cliquez sur 🔒 dans la barre d\'adresse pour autoriser l\'accès.';
    setToast({ message: msg, type: 'poll' });
    const t = setTimeout(() => { setToast(null); clearDeviceError(); }, 5000);
    return () => clearTimeout(t);
  }, [deviceError, clearDeviceError]);

  useEffect(() => {
    if (!recordingError) return;
    const messages = {
      permission_denied: 'Partage d’écran refusé. Vérifiez les permissions du navigateur.',
      no_device: 'Aucun périphérique trouvé pour l’enregistrement.',
      unknown: 'Erreur lors du démarrage de l’enregistrement.',
    };
    setToast({ message: messages[recordingError] || messages.unknown, type: 'poll' });
    setTimeout(() => { setToast(null); clearRecordingError(); }, 4000);
  }, [recordingError, clearRecordingError]);

  useEffect(() => {
    localStorage.setItem('visiconnect_room_settings', JSON.stringify(roomSettings));
  }, [roomSettings]);

  // Sync showStats ↔ roomSettings.showStatsDefault (bidirectional)
  useEffect(() => {
    setShowStats(roomSettings.showStatsDefault);
  }, [roomSettings.showStatsDefault]);

  // -- Track new messages for notifications --
  useEffect(() => {
    if (!messages || messages.length === 0) return;
    
    const newCount = messages.length;
    const previousCount = lastMessageCountRef.current;
    
    if (newCount > previousCount && previousCount > 0) {
      const newMessages = messages.slice(previousCount);
      const otherMessages = newMessages.filter(m => m.senderId !== currentUserId);
      
      if (otherMessages.length > 0) {
        // Chat is closed or not active - show notification
        const isChatOpen = sidePanelOpen && activePanel === 'chat';
        if (!isChatOpen) {
          setUnreadChat(prev => prev + otherMessages.length);
        }
        
        // Show toast + sound for the last new message
        const lastMsg = otherMessages[otherMessages.length - 1];
        const senderName = lastMsg.sender?.split('@')[0] || 'Quelqu\'un';
        setToast({ message: `Nouveau message de ${senderName}`, type: 'chat' });
        setTimeout(() => setToast(null), 3000);
        playNotifSound();
      }
    }
    
    lastMessageCountRef.current = newCount;
  }, [messages, sidePanelOpen, activePanel, currentUserId]);

  // -- Reset unread when opening panels --
  useEffect(() => {
    if (sidePanelOpen && activePanel === 'chat') {
      setUnreadChat(0);
    }
    if (sidePanelOpen && activePanel === 'polls') {
      setUnreadPolls(0);
      setPollPopup(null); // Fermer le popup si on ouvre le panel
    }
  }, [sidePanelOpen, activePanel]);

  // 🤖 Auto-show transcription when enabled in AI settings
  useEffect(() => {
    if (aiSettings?.transcription?.enabled) {
      setShowTranscription(true);
    } else {
      setShowTranscription(false);
    }
  }, [aiSettings?.transcription?.enabled]);

  // 🤖 Bridge: AI Features Panel → Background Blur (via useMeeting)
  const blurBridgeInit = React.useRef(true);
  useEffect(() => {
    if (blurBridgeInit.current) { blurBridgeInit.current = false; return; }
    const wantBlur = !!aiSettings?.backgroundBlur?.enabled;
    if (wantBlur && !isBlurEnabled) {
      toggleBlur(aiSettings?.backgroundBlur?.blurAmount || 10);
    } else if (!wantBlur && isBlurEnabled) {
      toggleBlur(0);
    }
  }, [aiSettings?.backgroundBlur?.enabled]);

  // 🤖 Bridge: blur amount slider change → re-apply processor with new radius
  const prevBlurAmount = React.useRef(aiSettings?.backgroundBlur?.blurAmount);
  const blurDebounceRef = React.useRef(null);
  useEffect(() => {
    const newAmount = aiSettings?.backgroundBlur?.blurAmount;
    if (newAmount === prevBlurAmount.current) return;
    prevBlurAmount.current = newAmount;
    if (isBlurEnabled && typeof newAmount === 'number' && newAmount > 0) {
      if (blurDebounceRef.current) clearTimeout(blurDebounceRef.current);
      blurDebounceRef.current = setTimeout(() => {
        toggleBlur(newAmount);
      }, 150);
    }
  }, [aiSettings?.backgroundBlur?.blurAmount, isBlurEnabled]);

  // 🤖 Bridge: AI Features Panel → Video Enhancement (via useMeeting)
  const aiBridgeInit = React.useRef(true);
  useEffect(() => {
    if (aiBridgeInit.current) { aiBridgeInit.current = false; return; }
    const wantAI = !!aiSettings?.videoEnhancement?.enabled;
    if (wantAI !== isAIEnhanced) {
      toggleAIVideoEngine();
    }
  }, [aiSettings?.videoEnhancement?.enabled]);

  // -- Track new polls for notifications and auto-popup --
  useEffect(() => {
    if (!polls || polls.length === 0) return;
    
    const newCount = polls.length;
    const previousCount = lastPollCountRef.current;
    
    if (newCount > previousCount && previousCount > 0) {
      // Nouveau sondage créé
      const activePolls = polls.filter(p => p.isActive);
      const newestPoll = activePolls[activePolls.length - 1];
      
      if (newestPoll && newestPoll.createdBy !== currentUserId) {
        // Ce n'est pas mon sondage - afficher notification
        const isPollsOpen = sidePanelOpen && activePanel === 'polls';
        
        if (!isPollsOpen) {
          setUnreadPolls(prev => prev + 1);
          // Afficher le popup de sondage
          setPollPopup({
            id: newestPoll._id,
            question: newestPoll.question,
            createdBy: newestPoll.createdBy
          });
        }
        
        // Toast notification + sound
        setToast({ message: `Nouveau sondage: "${newestPoll.question.slice(0, 30)}${newestPoll.question.length > 30 ? '...' : ''}"`, type: 'poll' });
        setTimeout(() => setToast(null), 4000);
        playNotifSound();
      }
    }
    
    lastPollCountRef.current = newCount;
  }, [polls, sidePanelOpen, activePanel, currentUserId]);

  const updateSetting = (key, value) => {
    setRoomSettings((prev) => ({ ...prev, [key]: value }));
  };

  // -- Handlers --
  const togglePanel = (panel) => {
    if (activePanel === panel && sidePanelOpen) {
      cancelPanelFadeOut();
      setSidePanelOpen(false);
    } else {
      cancelPanelFadeOut();
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
      // Only fade out for non-chat panels (chat stays open after send)
      if (activePanel !== 'chat') {
        startPanelFadeOut();
      }
    }
  };

  // -- "Magnetic Fade-out": panel fades to ghost, then closes --
  const startPanelFadeOut = React.useCallback(() => {
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    setPanelFading(true);
    fadeTimerRef.current = setTimeout(() => {
      setSidePanelOpen(false);
      setPanelFading(false);
    }, 1500);
  }, []);

  const cancelPanelFadeOut = React.useCallback(() => {
    if (fadeTimerRef.current) {
      clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
    setPanelFading(false);
  }, []);

  // Toggle main levée + notification
  const handleRaiseHand = () => {
    setIsHandRaised(prev => {
      const newState = !prev;
      if (newState) {
        setToast({ message: '🖐️ Main levée !', type: 'hand' });
        setTimeout(() => setToast(null), 3000);
      }
      return newState;
    });
  };

  return (
    <MainContent>
       {/* Toast Notifications */}
       <AnimatePresence>
         {toast && (
           <ToastNotification
             $type={toast.type}
             initial={{ opacity: 0, y: -20, x: '-50%' }}
             animate={{ opacity: 1, y: 0, x: '-50%' }}
             exit={{ opacity: 0, y: -20, x: '-50%' }}
           >
             {toast.type === 'chat' ? <MessageSquare size={18} /> : <PieChart size={18} />}
             {toast.message}
           </ToastNotification>
         )}
       </AnimatePresence>

       {/* Poll Popup - Affichage automatique d'un nouveau sondage */}
       <AnimatePresence>
         {pollPopup && (
           <PollPopupOverlay
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onClick={() => setPollPopup(null)}
           >
             <PollPopupCard
               initial={{ scale: 0.9, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               exit={{ scale: 0.9, y: 20 }}
               onClick={e => e.stopPropagation()}
             >
               <h3><PieChart size={22} /> Nouveau Sondage!</h3>
               <p className="poll-meta">Créé par {pollPopup.createdBy?.split('@')[0] || 'Quelqu\'un'}</p>
               <p>{pollPopup.question}</p>
               <div style={{ display: 'flex', gap: '12px' }}>
                 <PollPopupButton 
                   className="primary"
                   onClick={() => {
                     togglePanel('polls');
                     setPollPopup(null);
                   }}
                 >
                   Voter maintenant
                 </PollPopupButton>
                 <PollPopupButton 
                   className="secondary"
                   onClick={() => setPollPopup(null)}
                 >
                   Plus tard
                 </PollPopupButton>
               </div>
             </PollPopupCard>
           </PollPopupOverlay>
         )}
       </AnimatePresence>

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
             <div style={{
               position: 'absolute',
               bottom: 16,
               left: '50%',
               transform: 'translateX(-50%)',
               zIndex: 1000,
             }}>
                <button 
                  onClick={toggleWhiteboard}
                  style={{
                    background: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(8px)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.15)',
                    padding: '6px 20px',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  }}
                >
                  ✕ Fermer le tableau
                </button>
             </div>
           </WhiteboardOverlay>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showStats && localParticipant && (
            <StatsMonitor 
              participant={localParticipant} 
              showStats={showStats}
              onClose={() => setShowStats(false)}
            />
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
         setShowStats={(val) => { setShowStats(val); updateSetting('showStatsDefault', val); }}
         sidePanelOpen={sidePanelOpen}
         activePanel={activePanel}
         togglePanel={togglePanel}
         isRecording={isRecording}
         toggleRecording={() => toggleRecording({ includeMic: isMicrophoneEnabled })}
         isBlurEnabled={isBlurEnabled}
         blurRadius={blurRadius}
         toggleBlur={toggleBlur}
         isAiReady={isAiReady}
         isAIEnhanced={isAIEnhanced}
         isProcessingAI={isProcessingAI}
         toggleAIVideoEngine={toggleAIVideoEngine}
         onLeave={onLeave}
         unreadChat={unreadChat}
         unreadPolls={unreadPolls}
         isHandRaised={isHandRaised}
         onRaiseHand={handleRaiseHand}
      />

      {/* 5. Side Panel (Chat / AI) */}
      <AnimatePresence>
        {sidePanelOpen && (
          <SidePanel
            wide={roomSettings.widePanel}
            $fading={panelFading}
            initial={{ x: '100%', opacity: 0, scale: 0.95 }}
            animate={{ 
              x: 0, 
              opacity: panelFading ? 0.35 : 1, 
              scale: 1,
            }}
            exit={{ x: '100%', opacity: 0, scale: 0.95 }}
            transition={{ 
              type: "tween",
              duration: 0.35,
              ease: [0.4, 0, 0.2, 1],
            }}
            onMouseEnter={panelFading ? cancelPanelFadeOut : undefined}
            onTouchStart={panelFading ? cancelPanelFadeOut : undefined}
          >
            <PanelHeader>
              <h3>
                {activePanel === 'chat' && <><ChevronRight size={20} /> Discussion</>}
                {activePanel === 'polls' && <><PieChart size={20} /> Sondages</>}
                {activePanel === 'breakout' && <><Users size={20} /> Salles de sous-commission</>}
                {activePanel === 'ai' && <><Bot size={20} /> Assistant IA</>}
                {activePanel === 'aiFeatures' && <><Sparkles size={20} /> Fonctionnalités IA</>}
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
                   currentUserId={user?.id || localParticipant?.identity}
                 />
               )}
               {activePanel === 'polls' && <PollsPanel meetingId={originalRoomId} currentUser={{ identity: localParticipant?.identity }} onClose={() => togglePanel('polls')} onPollCreated={startPanelFadeOut} />}
               {activePanel === 'breakout' && <BreakoutRoomsPanel meetingId={originalRoomId} activeParticipants={remoteParticipants.concat(localParticipant ? [localParticipant] : [])} onClose={() => togglePanel('breakout')} />}

               {activePanel === 'ai' && <AIChatPanel responseStyle={roomSettings.aiResponseStyle} roomMessages={messages} roomId={roomId} />}
               {activePanel === 'aiFeatures' && <AIFeaturesPanel />}
               {activePanel === 'settings' && (
                 <RoomSettingsPanel
                   settings={{ ...roomSettings, showStatsDefault: showStats }}
                   updateSetting={(key, val) => {
                     updateSetting(key, val);
                     if (key === 'showStatsDefault') setShowStats(val);
                   }}
                   devices={devices}
                   selectedDevices={selectedDevices}
                   controls={controls}
                 />
               )}

            </PanelContent>
          </SidePanel>
        )}
      </AnimatePresence>

      {/* 🤖 Transcription Widget - Affiche les sous-titres en temps réel */}
      {showTranscription && (
        <TranscriptionWidget 
          onClose={() => setShowTranscription(false)} 
        />
      )}

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
