import React from 'react';
import styled from 'styled-components';
import { 
  Mic, MicOff, Video, VideoOff, Phone, Monitor, MonitorOff, 
  MessageSquare, Sparkles, Layout, Activity, BarChart2, Settings2
} from 'lucide-react';
import { ROOM_THEME as THEME } from '../../styles/roomTheme';

const BottomBar = styled.div`
  height: 80px;
  background-color: ${THEME.panelBg};
  backdrop-filter: blur(12px);
  border-top: 1px solid ${THEME.border};
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
  
  @media (max-width: 768px) {
    justify-content: flex-start;
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    height: auto;
    padding: 1rem;
    padding-bottom: max(1rem, env(safe-area-inset-bottom));
    gap: 0.5rem;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const ControlButton = styled.button`
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  border: none;
  background-color: ${props => props.$active ? props.$activeColor || THEME.accent : THEME.cardBg};
  color: ${props => props.$active ? '#fff' : THEME.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border: 1px solid ${THEME.border};

  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
  }

  &:hover {
    background-color: ${props => props.$active ? props.$activeColor : THEME.border};
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
  
  @media (max-width: 768px) {
    width: 56px;
  }

  &:hover {
    background-color: #dc2626;
  }
`;

const Separator = styled.div`
  flex-shrink: 0;
  width: 1px; 
  height: 40px; 
  background: ${THEME.border}; 
  margin: 0 1.5rem;
  
  @media (max-width: 768px) {
    margin: 0 0.5rem;
    height: 30px;
  }
`;

export const ControlBar = ({
  localParticipant,
  isCameraEnabled,
  isMicrophoneEnabled,
  isScreenShareEnabled,
  controls,
  whiteboardOpen,
  toggleWhiteboard,
  showStats,
  setShowStats,
  sidePanelOpen,
  activePanel,
  togglePanel,
  onLeave
}) => {
  return (
    <BottomBar>
        <ControlButton onClick={controls.toggleMic} $active={!isMicrophoneEnabled} $activeColor={THEME.danger} title="Micro">
          {isMicrophoneEnabled ? <Mic /> : <MicOff />}
        </ControlButton>
        
        <ControlButton onClick={controls.toggleCamera} $active={!isCameraEnabled} $activeColor={THEME.danger} title="Caméra">
          {isCameraEnabled ? <Video /> : <VideoOff />}
        </ControlButton>

        <ControlButton onClick={controls.toggleScreenShare} $active={isScreenShareEnabled} $activeColor={THEME.accent} title="Partager l'écran">
          {isScreenShareEnabled ? <Monitor /> : <MonitorOff />}
        </ControlButton>
        
        <ControlButton onClick={toggleWhiteboard} $active={whiteboardOpen} $activeColor={THEME.accent} title="Tableau Blanc (Tldraw)">
          <Layout /> 
        </ControlButton>

        <ControlButton onClick={() => setShowStats(!showStats)} $active={showStats} $activeColor="#10b981" title="Stats / Debug (4K)">
          <Activity />
        </ControlButton>

        <Separator />

        <ControlButton onClick={() => togglePanel('ai')} $active={activePanel === 'ai' && sidePanelOpen} $activeColor={THEME.accent} title="Assistant IA">
          <Sparkles />
        </ControlButton>

        <ControlButton onClick={() => togglePanel('analytics')} $active={activePanel === 'analytics' && sidePanelOpen} $activeColor={THEME.accent} title="Analytics">
          <BarChart2 />
        </ControlButton>

        <ControlButton onClick={() => togglePanel('chat')} $active={activePanel === 'chat' && sidePanelOpen} $activeColor={THEME.accent} title="Chat">
          <MessageSquare />
        </ControlButton>

        <ControlButton onClick={() => togglePanel('settings')} $active={activePanel === 'settings' && sidePanelOpen} $activeColor={THEME.accent} title="Parametres">
          <Settings2 />
        </ControlButton>

        <EndCallButton onClick={onLeave} $active title="Quitter">
          <Phone style={{ transform: 'rotate(135deg)' }} />
        </EndCallButton>
    </BottomBar>
  );
};