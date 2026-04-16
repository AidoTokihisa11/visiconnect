import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Mic, MicOff, Video, VideoOff, Phone, Monitor, MonitorOff,
  MessageSquare, Sparkles, Focus, Layout, Activity, BarChart2, Settings2, MoreHorizontal, VideoIcon, EyeOff, PieChart, Users,
  ChevronUp,
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
  z-index: 60; /* Higher than PiP video z-index (50) to show More Menu over video */

  @media (max-width: 768px) {
    position: absolute;
    bottom: env(safe-area-inset-bottom, 20px);
    left: 50%;
    transform: translateX(-50%);
    right: auto;
    justify-content: center;
    overflow: visible; /* Prevents clipping the absolute popup menu */
    white-space: nowrap;
    height: auto;
    padding: 0.5rem 1rem;
    gap: 0.5rem;
    border-radius: 30px;
    background-color: rgba(20, 20, 20, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    max-width: 95%;

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
  background-color: ${props => props.$active ? (props.$activeColor || THEME.accent) : THEME.cardBg};
  color: ${props => props.$active ? '#fff' : THEME.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border: 1px solid ${props => props.$active ? 'transparent' : THEME.border};

  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: ${props => props.$active ? (props.$activeColor || THEME.accent) : 'rgba(255, 255, 255, 0.1)'};
    border: none;
    color: #fff;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  /* Rendu Accessible: Focus Clavier */
  &:focus-visible {
    outline: 2px solid #3b82f6; /* Tailwind blue-500 */
    outline-offset: 2px;
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
    height: 48px;
    border-radius: 24px;
    background-color: ${THEME.danger};
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
    display: none; // Hide on mobile entirely to save space
  }
`;

const MobileMoreMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${props => props.$isOpen ? 'flex' : 'none'};
    flex-wrap: wrap;
    position: absolute;
    bottom: calc(100% + 15px);
    right: 0;
    width: 250px;
    background-color: rgba(30, 30, 30, 0.95);
    backdrop-filter: blur(12px);
    border-radius: 16px;
    padding: 1rem;
    gap: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
    z-index: 100;
    
    /* Make buttons look like icons inside */
    > button {
      width: calc(33.33% - 0.5rem);
      flex-direction: column;
      font-size: 0.7rem;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.05);
      gap: 0.25rem;
      height: 60px;
    }
  }
`;

const DesktopOnlyWrapper = styled.div`
  display: contents;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileOnlyWrapper = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: contents;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.25rem 0.5rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    border-radius: 30px;
    background: transparent;
    padding: 0;
    border: none;
    gap: 0.5rem;
  }
`;

const BlurSliderContainer = styled.div`
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  background: ${THEME.panelBg};
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid ${THEME.border};
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  z-index: 100;
  color: ${THEME.text};
  font-size: 0.85rem;

  input[type="range"] {
    width: 100px;
    cursor: pointer;
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
  isRecording,
  toggleRecording,
  isBlurEnabled,
  blurRadius,
  toggleBlur,
  onLeave
}) => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [showBlurSlider, setShowBlurSlider] = useState(false);

  return (
    <BottomBar>
        {/* Core Mobile Buttons (Like Native App) */}
        <EndCallButton className="focus-visible-ring" onClick={onLeave} $active title="Quitter" aria-label="Quitter la réunion">
          <Phone style={{ transform: 'rotate(135deg)' }} />
        </EndCallButton>

        
        
        <ButtonGroup style={{ position: 'relative' }}>
          {showBlurSlider && isCameraEnabled && (
            <BlurSliderContainer>
              <label htmlFor="blurSlider" style={{fontWeight: 'bold', marginRight: '5px'}}>Flou</label>
              <input
                id="blurSlider"
                type="range"
                min="5"
                max="25"
                step="5"
                defaultValue={blurRadius}
                onMouseUp={(e) => {
                  toggleBlur(parseInt(e.target.value, 10));
                }}
                onTouchEnd={(e) => {
                  toggleBlur(parseInt(e.target.value, 10));
                }}
              />
              <span style={{marginLeft: '5px'}}>{blurRadius}%</span>
            </BlurSliderContainer>
          )}
          <ControlButton className="focus-visible-ring" onClick={controls.toggleCamera} $active={isCameraEnabled} $activeColor={THEME.accent} title={isCameraEnabled ? "Désactiver la caméra" : "Activer la caméra"} aria-label={isCameraEnabled ? "Désactiver la caméra" : "Activer la caméra"}>
            {isCameraEnabled ? <Video /> : <VideoOff color={THEME.danger} />}
          </ControlButton>
          <div style={{ display: 'flex', borderRadius: '50px', background: isBlurEnabled ? THEME.accent : THEME.panelBg, overflow: 'hidden' }}>
            <ControlButton 
              className="focus-visible-ring" 
              onClick={() => {
                if (!isBlurEnabled) {
                  toggleBlur(10); 
                } else {
                  toggleBlur(0); 
                  setShowBlurSlider(false);
                }
              }}
              $active={isBlurEnabled} 
              $activeColor={THEME.accent} 
              title="Activer/Désactiver le flou d'arrière-plan"
              disabled={!isCameraEnabled}
              style={{ opacity: isCameraEnabled ? 1 : 0.5, borderRadius: '50px 0 0 50px', paddingRight: '12px' }}
            >
              <Focus />
            </ControlButton>
            <ControlButton
              className="focus-visible-ring"
              onClick={() => {
                 if (isCameraEnabled) setShowBlurSlider(!showBlurSlider);
              }}
              $active={isBlurEnabled} 
              $activeColor={THEME.accent}
              disabled={!isCameraEnabled}
              style={{ opacity: isCameraEnabled ? 1 : 0.5, borderRadius: '0 50px 50px 0', padding: '0 10px', borderLeft: '1px solid rgba(255,255,255,0.1)' }}
              title="Réglages du flou"
            >
              <ChevronUp size={16} />
            </ControlButton>
          </div>
        </ButtonGroup>

        {/* IA Smart Enhancer Button */}
        <ButtonGroup>
          <ControlButton
            $active={isAIEnhanced}
            onClick={toggleAIVideoEngine}
            title={isAIEnhanced ? "Désactiver l'IA (Auto-Lighting & Upscaling)" : "Activer l'IA vidéo (Netteté & Auto-Lighting)"}
            style={{
              background: isAIEnhanced ? 'linear-gradient(135deg, #10B981, #059669)' : undefined,
              borderColor: isAIEnhanced ? 'transparent' : undefined,
              color: isAIEnhanced ? 'white' : undefined,
            }}
          >
            <Sparkles size={22} strokeWidth={isAIEnhanced ? 2.5 : 2} />
          </ControlButton>
        </ButtonGroup>




        <ControlButton className="focus-visible-ring" onClick={controls.toggleMic} $active={isMicrophoneEnabled} $activeColor={THEME.accent} title={isMicrophoneEnabled ? "Désactiver le micro" : "Activer le micro"} aria-label={isMicrophoneEnabled ? "Désactiver le micro" : "Activer le micro"}>
          {isMicrophoneEnabled ? <Mic /> : <MicOff color={THEME.danger} />}
        </ControlButton>

        {/* Desktop-only Quick Access */}
        <DesktopOnlyWrapper>
          <ControlButton onClick={controls.toggleScreenShare} $active={isScreenShareEnabled} $activeColor={THEME.accent} title="Partager l'écran">
            {isScreenShareEnabled ? <Monitor /> : <MonitorOff />}
          </ControlButton>

          <ControlButton onClick={toggleWhiteboard} $active={whiteboardOpen} $activeColor={THEME.accent} title="Tableau Blanc (Tldraw)">
            <Layout />
          </ControlButton>


          <ControlButton onClick={toggleRecording} $active={isRecording} $activeColor={THEME.danger} title={isRecording ? "Arrêter l'enregistrement" : "Démarrer l'enregistrement"}>
            <VideoIcon />
          </ControlButton>

          <ControlButton onClick={() => setShowStats(!showStats)} $active={showStats} $activeColor="#10b981" title="Stats / Debug (4K)">
            <Activity />
          </ControlButton>

          <Separator />
          
          <ControlButton onClick={() => togglePanel('ai')} $active={activePanel === 'ai' && sidePanelOpen} $activeColor={THEME.accent} title="Assistant IA">
            <Sparkles />
          </ControlButton>

          <ControlButton onClick={() => togglePanel('polls')} $active={activePanel === 'polls' && sidePanelOpen} $activeColor={THEME.accent} title="Sondages">
            <PieChart />          </ControlButton>

          <ControlButton onClick={() => togglePanel('breakout')} $active={activePanel === 'breakout' && sidePanelOpen} $activeColor={THEME.accent} title="Salles de sous-commission">
            <Users />
          </ControlButton>
          <ControlButton onClick={() => togglePanel('analytics')} $active={activePanel === 'analytics' && sidePanelOpen} $activeColor={THEME.accent} title="Analytics">
            <BarChart2 />
          </ControlButton>

          <ControlButton onClick={() => togglePanel('chat')} $active={activePanel === 'chat' && sidePanelOpen} $activeColor={THEME.accent} title="Chat">
            <MessageSquare />
          </ControlButton>

          <ControlButton onClick={() => togglePanel('settings')} $active={activePanel === 'settings' && sidePanelOpen} $activeColor={THEME.accent} title="Paramètres">
            <Settings2 />
          </ControlButton>
        </DesktopOnlyWrapper>

        {/* Mobile 'More' Button */}
        <MobileOnlyWrapper>
          <ControlButton onClick={controls.toggleScreenShare} $active={isScreenShareEnabled} $activeColor={THEME.accent} title="Partager">
            <Monitor />
          </ControlButton>
          <ControlButton onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)} title="Plus d'options">
            <MoreHorizontal />
          </ControlButton>

          {/* Expanded Mobile Menu */}
          <MobileMoreMenu $isOpen={isMoreMenuOpen}>
            <ControlButton onClick={() => { togglePanel('chat'); setIsMoreMenuOpen(false); }} $active={activePanel === 'chat' && sidePanelOpen} $activeColor={THEME.accent}>
              <MessageSquare />
            </ControlButton>
            <ControlButton onClick={() => { togglePanel('ai'); setIsMoreMenuOpen(false); }} $active={activePanel === 'ai' && sidePanelOpen} $activeColor={THEME.accent}>
              <Sparkles />
            </ControlButton>
            <ControlButton onClick={() => { togglePanel('polls'); setIsMoreMenuOpen(false); }} $active={activePanel === 'polls' && sidePanelOpen} $activeColor={THEME.accent}>
              <PieChart />
            </ControlButton>
            <ControlButton onClick={() => { togglePanel('breakout'); setIsMoreMenuOpen(false); }} $active={activePanel === 'breakout' && sidePanelOpen} $activeColor={THEME.accent}>
              <Users />
            </ControlButton>
            <ControlButton onClick={() => { toggleWhiteboard(); setIsMoreMenuOpen(false); }} $active={whiteboardOpen} $activeColor={THEME.accent}>
              <Layout />
            </ControlButton>
            <ControlButton onClick={() => { togglePanel('analytics'); setIsMoreMenuOpen(false); }} $active={activePanel === 'analytics' && sidePanelOpen} $activeColor={THEME.accent}>
              <BarChart2 />
            </ControlButton>
            <ControlButton onClick={() => { togglePanel('settings'); setIsMoreMenuOpen(false); }} $active={activePanel === 'settings' && sidePanelOpen} $activeColor={THEME.accent}>
              <Settings2 />
            </ControlButton>
            <ControlButton onClick={() => { setShowStats(!showStats); setIsMoreMenuOpen(false); }} $active={showStats} $activeColor="#10b981">
              <Activity />
            </ControlButton>
          </MobileMoreMenu>
        </MobileOnlyWrapper>
    </BottomBar>
  );
};