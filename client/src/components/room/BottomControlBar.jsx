import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Mic, MicOff, Video, VideoOff, Phone, Monitor, MonitorOff,
  MessageSquare, Sparkles, Layout, Activity, Settings2, MoreHorizontal, Circle, PieChart,
  Hand, Bot, Wand2, Square,
} from 'lucide-react';
import { useAudioLevel } from './AudioVisualizer';
import { ROOM_THEME as THEME } from '../../styles/roomTheme';

const BottomBar = styled.div`
  /* Desktop: hauteur fixe, flex-shrink: 0 pour ne jamais shrink */
  flex-shrink: 0;
  height: 80px;
  background-color: ${THEME.panelBg};
  backdrop-filter: blur(12px);
  border-top: 1px solid ${THEME.border};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 0 1rem;
  z-index: 60;

  @media (max-width: 768px) {
    /* Mobile: NE PLUS utiliser position absolute - rester dans le flux flex */
    position: relative;
    width: 100%;
    height: auto;
    min-height: 70px;
    justify-content: space-evenly;
    overflow: visible;
    white-space: nowrap;
    padding: 0.75rem 0.5rem calc(env(safe-area-inset-bottom, 12px) + 0.5rem) 0.5rem;
    gap: 0;
    border-radius: 0;
    background-color: rgba(15, 15, 20, 0.98);
    border: none;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);

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
    /* Touch target minimum 48x48 pour accessibilité iOS/Android */
    min-width: 48px;
    min-height: 48px;
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background-color: ${props => props.$active ? (props.$activeColor || THEME.accent) : 'rgba(255, 255, 255, 0.08)'};
    padding: 0;
    border: none;
    color: #fff;
    /* Touch feedback amélioré */
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0.1);
    touch-action: manipulation;
    
    svg {
      width: 22px;
      height: 22px;
    }
    
    &:active {
      transform: scale(0.95);
      background-color: ${props => props.$active ? (props.$activeColor || THEME.accent) : 'rgba(255, 255, 255, 0.15)'};
    }
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  &:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

// Badge de notification (pastille rouge)
const NotificationBadge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 18px;
  height: 18px;
  background: #ef4444;
  color: white;
  font-size: 10px;
  font-weight: 700;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  border: 2px solid ${THEME.panelBg};
  animation: badgePop 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  z-index: 10;
  
  @keyframes badgePop {
    0% { transform: scale(0); }
    100% { transform: scale(1); }
  }
  
  @media (max-width: 768px) {
    top: -2px;
    right: -2px;
    min-width: 16px;
    height: 16px;
    font-size: 9px;
    border: 2px solid rgba(25, 25, 30, 0.98);
  }
`;

// Mic button glow ring — scales with audio level
const MicRing = styled.div`
  position: relative;
  border-radius: 12px;
  transition: box-shadow 0.08s ease-out;
  box-shadow: ${({ $level, $active }) =>
    $active && $level > 0.04
      ? `0 0 0 ${Math.round(2 + $level * 12)}px rgba(59,130,246,${(0.25 + $level * 0.55).toFixed(2)})`
      : 'none'};
`;

const EndCallButton = styled(ControlButton)`
  background-color: ${THEME.danger};
  width: 64px;
  border-radius: 16px;

  @media (max-width: 768px) {
    width: 52px;
    height: 44px;
    border-radius: 14px;
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
    /* Respect de la SafeArea iPhone */
    bottom: calc(100% + 15px + env(safe-area-inset-bottom, 0px));
    left: max(15px, env(safe-area-inset-left, 15px));
    right: max(15px, env(safe-area-inset-right, 15px));
    width: auto;
    background-color: rgba(25, 25, 30, 0.98);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 24px;
    padding: 1.5rem 1rem;
    gap: 1rem 0;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
    z-index: 100;
    justify-content: flex-start;
    /* Animation d'entrée */
    animation: slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    > button {
      width: 25%;
      flex-direction: column;
      border-radius: 14px;
      background: transparent;
      gap: 0.5rem;
      height: auto;
      /* Touch target minimum 48x48 */
      min-height: 72px;
      padding: 8px 4px;
      touch-action: manipulation;
      
      span {
        font-size: 0.7rem;
        font-weight: 500;
        opacity: 0.9;
        text-align: center;
        margin-top: 4px;
      }

      svg {
        width: 24px;
        height: 24px;
        padding: 10px;
        background: rgba(255, 255, 255, 0.08);
        border-radius: 50%;
        box-sizing: content-box;
      }
      
      &:active {
        transform: scale(0.95);
      }
      
      &:active svg {
        background: rgba(255, 255, 255, 0.15);
      }
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
  isAiReady,
  isAIEnhanced,
  isProcessingAI = false,
  toggleAIVideoEngine,
  onLeave,
  // Notifications
  unreadChat = 0,
  unreadPolls = 0,
  // Raise hand
  isHandRaised = false,
  onRaiseHand,
}) => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [showBlurSlider, setShowBlurSlider] = useState(false);
  const [showBlurToast, setShowBlurToast] = useState(false);

  // Audio level for mic glow ring
  const micLevel = useAudioLevel({ isMicEnabled: isMicrophoneEnabled, localParticipant });

  // Auto-close mobile menu when panel opens
  useEffect(() => {
    if (sidePanelOpen) {
      setIsMoreMenuOpen(false);
    }
  }, [sidePanelOpen]);

  // Show "coming soon" notification once when camera is enabled
  useEffect(() => {
    if (isCameraEnabled && !window.hasSeenBlurToast) {
      window.hasSeenBlurToast = true;
      setShowBlurToast(true);
      setTimeout(() => setShowBlurToast(false), 4000);
    }
  }, [isCameraEnabled]);

  return (
    <BottomBar>
        {/* Toast Notification */}
        <div style={{
          position: 'absolute',
          bottom: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(8px)',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
          zIndex: 1000,
          pointerEvents: 'none',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          opacity: showBlurToast ? 1 : 0,
          visibility: showBlurToast ? 'visible' : 'hidden',
          translateY: showBlurToast ? '0px' : '10px'
        }}>
          Background blur will be available soon
        </div>

        {/* Core Mobile Buttons (Like Native App) */}
        <EndCallButton className="focus-visible-ring" onClick={onLeave} $active title="Quitter" aria-label="Quitter la réunion">
          <Phone style={{ transform: 'rotate(135deg)' }} />
        </EndCallButton>

        
        
        <ButtonGroup style={{ position: 'relative' }}>
          <ControlButton className="focus-visible-ring" onClick={controls.toggleCamera} $active={isCameraEnabled} $activeColor={THEME.accent} title={isCameraEnabled ? "Désactiver la caméra" : "Activer la caméra"} aria-label={isCameraEnabled ? "Désactiver la caméra" : "Activer la caméra"}>
            {isCameraEnabled ? <Video /> : <VideoOff color={THEME.danger} />}
          </ControlButton>
        </ButtonGroup>

        {/* IA Smart Enhancer Button - Touch target optimisé + Animation */}
        <ButtonGroup>
          <ControlButton
            disabled={!isAiReady || isProcessingAI}
            $active={isAIEnhanced}
            onClick={toggleAIVideoEngine}
            title={isProcessingAI ? "Transition en cours..." : !isAiReady ? "Modèles d'IA en cours de chargement..." : (isAIEnhanced ? "Désactiver l'IA" : "Activer l'IA vidéo")}
            aria-label={isAIEnhanced ? "Désactiver l'amélioration IA" : "Activer l'amélioration IA"}
            className={isAIEnhanced ? 'ai-button-active' : ''}
            style={{
              background: isProcessingAI
                ? 'rgba(100, 100, 100, 0.4)'
                : isAIEnhanced 
                  ? 'linear-gradient(135deg, #10B981 0%, #059669 50%, #047857 100%)' 
                  : !isAiReady 
                    ? 'rgba(100, 100, 100, 0.3)' 
                    : undefined,
              borderColor: isAIEnhanced && !isProcessingAI ? 'transparent' : undefined,
              color: isAIEnhanced && !isProcessingAI ? 'white' : (!isAiReady || isProcessingAI) ? '#888' : undefined,
              minWidth: '52px',
              minHeight: '48px',
              animation: isProcessingAI ? 'aiPulse 0.8s ease-in-out infinite' : isAIEnhanced ? 'aiPulse 2s ease-in-out infinite' : 'none',
              boxShadow: isAIEnhanced && !isProcessingAI
                ? '0 0 20px rgba(16, 185, 129, 0.5), 0 4px 15px rgba(16, 185, 129, 0.3)' 
                : undefined,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: isProcessingAI ? 'wait' : undefined,
            }}
          >
            <Sparkles size={22} strokeWidth={(isAIEnhanced && !isProcessingAI) ? 2.5 : 2} />
          </ControlButton>
        </ButtonGroup>




        <MicRing $level={micLevel} $active={isMicrophoneEnabled}>
          <ControlButton className="focus-visible-ring" onClick={controls.toggleMic} $active={isMicrophoneEnabled} $activeColor={THEME.accent} title={isMicrophoneEnabled ? "Désactiver le micro" : "Activer le micro"} aria-label={isMicrophoneEnabled ? "Désactiver le micro" : "Activer le micro"}>
            {isMicrophoneEnabled ? <Mic /> : <MicOff color={THEME.danger} />}
          </ControlButton>
        </MicRing>

        {/* Desktop-only Quick Access */}
        <DesktopOnlyWrapper>
          <ControlButton onClick={controls.toggleScreenShare} $active={isScreenShareEnabled} $activeColor={THEME.accent} title="Partager l'écran">
            {isScreenShareEnabled ? <Monitor /> : <MonitorOff />}
          </ControlButton>

          <ControlButton onClick={toggleWhiteboard} $active={whiteboardOpen} $activeColor={THEME.accent} title="Tableau Blanc (Tldraw)">
            <Layout />
          </ControlButton>


          <ControlButton onClick={toggleRecording} $active={isRecording} $activeColor={THEME.danger} title={isRecording ? "Arrêter l'enregistrement" : "Démarrer l'enregistrement"}>
            {isRecording
              ? <Square fill="white" stroke="none" size={16} />
              : <Circle fill="#ef4444" stroke="#ef4444" size={18} />}
          </ControlButton>

          <ControlButton onClick={() => setShowStats(!showStats)} $active={showStats} $activeColor="#10b981" title="Stats / Debug (4K)">
            <Activity />
          </ControlButton>

          <Separator />
          
          <ControlButton onClick={() => togglePanel('ai')} $active={activePanel === 'ai' && sidePanelOpen} $activeColor={THEME.accent} title="Assistant IA">
            <Bot />
          </ControlButton>

          <ControlButton onClick={() => togglePanel('aiFeatures')} $active={activePanel === 'aiFeatures' && sidePanelOpen} $activeColor="#8b5cf6" title="Fonctionnalités IA">
            <Wand2 />
          </ControlButton>

          <ControlButton onClick={() => togglePanel('polls')} $active={activePanel === 'polls' && sidePanelOpen} $activeColor={THEME.accent} title="Sondages">
            <PieChart />
            {unreadPolls > 0 && <NotificationBadge>{unreadPolls}</NotificationBadge>}
          </ControlButton>

          <ControlButton onClick={onRaiseHand} $active={isHandRaised} $activeColor="#f59e0b" title={isHandRaised ? "Baisser la main" : "Lever la main"}>
            <Hand />
          </ControlButton>

          <ControlButton onClick={() => togglePanel('chat')} $active={activePanel === 'chat' && sidePanelOpen} $activeColor={THEME.accent} title="Chat">
            <MessageSquare />
            {unreadChat > 0 && <NotificationBadge>{unreadChat > 99 ? '99+' : unreadChat}</NotificationBadge>}
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
            {(unreadChat > 0 || unreadPolls > 0) && !isMoreMenuOpen && (
              <NotificationBadge>{(unreadChat + unreadPolls) > 99 ? '99+' : (unreadChat + unreadPolls)}</NotificationBadge>
            )}
          </ControlButton>

          
          {/* Expanded Mobile Menu */}
          <MobileMoreMenu $isOpen={isMoreMenuOpen}>
            <ControlButton onClick={() => { togglePanel('chat'); setIsMoreMenuOpen(false); }} $active={activePanel === 'chat' && sidePanelOpen} $activeColor={THEME.accent}>
              <MessageSquare />
              <span>Chat</span>
              {unreadChat > 0 && <NotificationBadge style={{ top: '4px', right: '4px' }}>{unreadChat > 99 ? '99+' : unreadChat}</NotificationBadge>}
            </ControlButton>
            <ControlButton onClick={() => { togglePanel('ai'); setIsMoreMenuOpen(false); }} $active={activePanel === 'ai' && sidePanelOpen} $activeColor={THEME.accent}>
              <Bot />
              <span>Assistant IA</span>
            </ControlButton>
            <ControlButton onClick={() => { togglePanel('aiFeatures'); setIsMoreMenuOpen(false); }} $active={activePanel === 'aiFeatures' && sidePanelOpen} $activeColor="#8b5cf6">
              <Wand2 />
              <span>IA Features</span>
            </ControlButton>
            <ControlButton onClick={() => { togglePanel('polls'); setIsMoreMenuOpen(false); }} $active={activePanel === 'polls' && sidePanelOpen} $activeColor={THEME.accent}>
              <PieChart />
              <span>Sondages</span>
              {unreadPolls > 0 && <NotificationBadge style={{ top: '4px', right: '4px' }}>{unreadPolls}</NotificationBadge>}
            </ControlButton>
            <ControlButton onClick={() => { onRaiseHand?.(); setIsMoreMenuOpen(false); }} $active={isHandRaised} $activeColor="#f59e0b">
              <Hand />
              <span>Main levée</span>
            </ControlButton>
            <ControlButton onClick={() => { toggleWhiteboard(); setIsMoreMenuOpen(false); }} $active={whiteboardOpen} $activeColor={THEME.accent}>
              <Layout />
              <span>Tableau</span>
            </ControlButton>
            <ControlButton onClick={() => { toggleRecording(); setIsMoreMenuOpen(false); }} $active={isRecording} $activeColor={THEME.danger}>
              {isRecording
                ? <Square fill="white" stroke="none" size={16} />
                : <Circle fill="#ef4444" stroke="#ef4444" size={18} />}
              <span>Enregistrer</span>
            </ControlButton>
            <ControlButton onClick={() => { togglePanel('settings'); setIsMoreMenuOpen(false); }} $active={activePanel === 'settings' && sidePanelOpen} $activeColor={THEME.accent}>
              <Settings2 />
              <span>Réglages</span>
            </ControlButton>
            <ControlButton onClick={() => { setShowStats(!showStats); setIsMoreMenuOpen(false); }} $active={showStats} $activeColor="#10b981">
              <Activity />
              <span>Debug</span>
            </ControlButton>
          </MobileMoreMenu>

        </MobileOnlyWrapper>
    </BottomBar>
  );
};