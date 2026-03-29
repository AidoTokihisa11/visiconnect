import React from 'react';
import styled from 'styled-components';
import { 
  Mic, MicOff, Video, VideoOff, Phone, Monitor, MonitorOff, 
  MessageSquare, Sparkles, Layout, Activity, BarChart2, Settings2
} from 'lucide-react';
import { ROOM_THEME as THEME } from '../../styles/roomTheme';

const BottomBar = styled.div`
  height: 80px;
  background-color: rgba(12, 35, 64, 0.95);
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
`;

const ControlButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  border: none;
  background-color: ${props => props.$active ? props.$activeColor || THEME.accent : THEME.accentSoft};
  color: ${props => props.$active ? '#fff' : THEME.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border: 1px solid ${THEME.border};

  &:hover {
    background-color: ${props => props.$active ? props.$activeColor : '#214875'};
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

const Separator = styled.div`
  width: 1px; 
  height: 40px; 
  background: ${THEME.border}; 
  margin: 0 1.5rem;
`;

export const ControlBar = ({
  localParticipant,
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
        <ControlButton onClick={controls.toggleMic} $active={!localParticipant?.isMicrophoneEnabled} $activeColor={THEME.danger} title="Micro">
          {localParticipant?.isMicrophoneEnabled ? <Mic /> : <MicOff />}
        </ControlButton>
        
        <ControlButton onClick={controls.toggleCamera} $active={!localParticipant?.isCameraEnabled} $activeColor={THEME.danger} title="Caméra">
          {localParticipant?.isCameraEnabled ? <Video /> : <VideoOff />}
        </ControlButton>

        <ControlButton onClick={controls.toggleScreenShare} $active={localParticipant?.isScreenShareEnabled} $activeColor={THEME.accent} title="Partager l'écran">
          {localParticipant?.isScreenShareEnabled ? <Monitor /> : <MonitorOff />}
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