/**
 * TranscriptionWidget - Widget flottant pour afficher la transcription en temps réel
 * 
 * Utilise Web Speech API - Gratuit, client-side only
 * Compatible: Chrome, Edge, Safari
 */

import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { 
  Captions, 
  CaptionsOff, 
  X, 
  Minimize2, 
  Maximize2, 
  Download,
  Languages,
  Settings,
  AlertCircle,
  Mic, 
  MicOff 
} from 'lucide-react';
import { ROOM_THEME as THEME } from '../../styles/roomTheme';
import { useTranscription } from '../../hooks/useTranscription';
import { useAISettings } from '../../hooks/useAISettings';
import { useTranslation } from '../../hooks/useTranslation';

// Animation pulse pour indicateur d'écoute
const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Container principal - positionné en bas de l'écran
const WidgetContainer = styled.div`
  position: fixed;
  bottom: ${props => props.$isMinimized ? '100px' : '120px'};
  left: 50%;
  transform: translateX(-50%);
  z-index: 150;
  width: ${props => props.$isMinimized ? 'auto' : 'min(90vw, 700px)'};
  max-height: ${props => props.$isMinimized ? '48px' : '200px'};
  background: ${THEME.panelBg};
  backdrop-filter: blur(16px);
  border: 1px solid ${THEME.border};
  border-radius: ${props => props.$isMinimized ? '24px' : '16px'};
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  overflow: hidden;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.3s ease;

  @media (max-width: 768px) {
    bottom: ${props => props.$isMinimized ? '80px' : '100px'};
    width: ${props => props.$isMinimized ? 'auto' : 'calc(100vw - 24px)'};
    left: ${props => props.$isMinimized ? 'auto' : '12px'};
    right: ${props => props.$isMinimized ? '12px' : 'auto'};
    transform: ${props => props.$isMinimized ? 'none' : 'none'};
    max-height: ${props => props.$isMinimized ? '40px' : '150px'};
  }
`;

// Header du widget
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-bottom: ${props => props.$isMinimized ? 'none' : `1px solid ${THEME.border}`};
  background: rgba(0,0,0,0.2);
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: ${props => props.$isListening ? '#10b981' : THEME.textDim};

  svg {
    ${props => props.$isListening && css`
      animation: ${pulse} 1.5s ease-in-out infinite;
    `}
  }
`;

const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const IconButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: ${THEME.textDim};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255,255,255,0.1);
    color: ${THEME.text};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Zone de texte
const TranscriptArea = styled.div`
  padding: 12px 16px;
  overflow-y: auto;
  max-height: 140px;
  scroll-behavior: smooth;

  @media (max-width: 768px) {
    max-height: 100px;
    padding: 8px 12px;
  }
`;

const TranscriptLine = styled.div`
  margin-bottom: 8px;
  font-size: 0.95rem;
  line-height: 1.5;
  color: ${THEME.text};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TimestampBadge = styled.span`
  font-size: 0.75rem;
  color: ${THEME.textDim};
  margin-right: 8px;
  font-family: monospace;
`;

const InterimText = styled.span`
  color: ${THEME.textDim};
  font-style: italic;
  opacity: 0.7;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 24px;
  color: ${THEME.textDim};
  font-size: 0.9rem;
`;

const ErrorBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(239, 68, 68, 0.2);
  border-bottom: 1px solid rgba(239, 68, 68, 0.3);
  color: #f87171;
  font-size: 0.85rem;
`;

// Language selector dropdown
const LanguageSelect = styled.select`
  background: rgba(0,0,0,0.3);
  border: 1px solid ${THEME.border};
  border-radius: 6px;
  color: ${THEME.text};
  padding: 4px 8px;
  font-size: 0.8rem;
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: ${THEME.accent};
  }
`;

const LANGUAGES = [
  { code: 'fr-FR', label: 'Français' },
  { code: 'en-US', label: 'English' },
  { code: 'es-ES', label: 'Español' },
  { code: 'de-DE', label: 'Deutsch' },
  { code: 'it-IT', label: 'Italiano' },
  { code: 'pt-BR', label: 'Português' },
  { code: 'nl-NL', label: 'Nederlands' },
  { code: 'pl-PL', label: 'Polski' },
  { code: 'ja-JP', label: '日本語' },
  { code: 'zh-CN', label: '中文' },
  { code: 'ko-KR', label: '한국어' },
  { code: 'ar-SA', label: 'العربية' },
];

export const TranscriptionWidget = ({ onClose }) => {
  const { t } = useTranslation();
  const [isMinimized, setIsMinimized] = useState(false);
  const [language, setLanguage] = useState('fr-FR');
  const { settings, updateSettings } = useAISettings();
  const transcriptRef = useRef(null);
  
  const {
    isListening,
    transcript,
    interimText,
    error,
    isSupported,
    start,
    stop,
    toggle,
    setLanguage: setTranscriptionLanguage,
    exportTranscript,
    clear: clearTranscript,
  } = useTranscription({ language });

  // Auto-scroll vers le bas quand nouveau texte
  useEffect(() => {
    if (transcriptRef.current && !isMinimized) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript, interimText, isMinimized]);

  // Démarre automatiquement si transcription activée dans settings
  useEffect(() => {
    if (settings?.transcription?.enabled && isSupported && !isListening) {
      start();
    }
  }, [settings?.transcription?.enabled, isSupported]);

  // Change la langue
  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    setTranscriptionLanguage(newLang);
  };

  // Export
  const handleExport = () => {
    const text = exportTranscript();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcription-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  if (!isSupported) {
    return (
      <WidgetContainer $isMinimized={false}>
        <Header $isMinimized={false}>
          <HeaderLeft>
            <CaptionsOff size={18} />
            <span>{t('room.transcription.unavailable', 'Transcription non disponible')}</span>
          </HeaderLeft>
          <IconButton onClick={onClose}>
            <X size={18} />
          </IconButton>
        </Header>
        <EmptyState>
          <AlertCircle size={32} style={{ marginBottom: 8, opacity: 0.5 }} />
          <p>{t('room.transcription.notSupported', 'Web Speech API non supportée par ce navigateur.')}</p>
          <p style={{ fontSize: '0.8rem', marginTop: 8 }}>
            {t('room.transcription.useChromeEdge', 'Utilisez Chrome, Edge ou Safari.')}
          </p>
        </EmptyState>
      </WidgetContainer>
    );
  }

  // Vue minimisée
  if (isMinimized) {
    return (
      <WidgetContainer $isMinimized={true}>
        <Header $isMinimized={true}>
          <HeaderLeft>
            <StatusIndicator $isListening={isListening}>
              {isListening ? <Mic size={16} /> : <MicOff size={16} />}
              <span>{isListening ? t('room.transcription.active', 'Transcription active') : t('room.transcription.paused', 'En pause')}</span>
            </StatusIndicator>
          </HeaderLeft>
          <HeaderControls>
            <IconButton onClick={toggle} title={isListening ? t('room.transcription.pause', 'Pause') : t('room.transcription.resume', 'Reprendre')}>
              {isListening ? <MicOff size={16} /> : <Mic size={16} />}
            </IconButton>
            <IconButton onClick={() => setIsMinimized(false)} title={t('room.transcription.expand', 'Agrandir')}>
              <Maximize2 size={16} />
            </IconButton>
            <IconButton onClick={onClose} title={t('room.transcription.closeBtn', 'Fermer')}>
              <X size={16} />
            </IconButton>
          </HeaderControls>
        </Header>
      </WidgetContainer>
    );
  }

  return (
    <WidgetContainer $isMinimized={false}>
      {error && !['no-speech', 'aborted'].includes(error) && (
        <ErrorBanner>
          <AlertCircle size={16} />
          {error === 'network' ? t('room.transcription.networkError', 'Erreur réseau') : error}
        </ErrorBanner>
      )}
      
      <Header $isMinimized={false}>
        <HeaderLeft>
          <StatusIndicator $isListening={isListening}>
            {isListening ? <Mic size={18} /> : <MicOff size={18} />}
            <span>{isListening ? t('room.transcription.active', 'Transcription active') : t('room.transcription.paused', 'En pause')}</span>
          </StatusIndicator>
          
          <LanguageSelect value={language} onChange={handleLanguageChange}>
            {LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.label}</option>
            ))}
          </LanguageSelect>
        </HeaderLeft>
        
        <HeaderControls>
          <IconButton onClick={toggle} title={isListening ? t('room.transcription.pause', 'Pause') : t('room.transcription.resume', 'Reprendre')}>
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </IconButton>
          <IconButton 
            onClick={handleExport} 
            disabled={transcript.length === 0}
            title={t('room.transcription.export', 'Exporter')}
          >
            <Download size={18} />
          </IconButton>
          <IconButton onClick={() => setIsMinimized(true)} title={t('room.transcription.minimize', 'Minimiser')}>
            <Minimize2 size={18} />
          </IconButton>
          <IconButton onClick={onClose} title={t('room.transcription.closeBtn', 'Fermer')}>
            <X size={18} />
          </IconButton>
        </HeaderControls>
      </Header>

      <TranscriptArea ref={transcriptRef}>
        {transcript.length === 0 && !interimText ? (
          <EmptyState>
            <Captions size={32} style={{ marginBottom: 8, opacity: 0.5 }} />
            <p>{t('room.transcription.willAppear', 'La transcription apparaîtra ici...')}</p>
            <p style={{ fontSize: '0.8rem', marginTop: 8, color: THEME.textDim }}>
              {isListening ? t('room.transcription.listening', 'En écoute...') : t('room.transcription.clickMic', 'Cliquez sur le micro pour démarrer')}
            </p>
          </EmptyState>
        ) : (
          <>
            {transcript.map((entry, idx) => (
              <TranscriptLine key={idx}>
                <TimestampBadge>{formatTime(entry.timestamp)}</TimestampBadge>
                {entry.text}
              </TranscriptLine>
            ))}
            {interimText && (
              <TranscriptLine>
                <InterimText>{interimText}...</InterimText>
              </TranscriptLine>
            )}
          </>
        )}
      </TranscriptArea>
    </WidgetContainer>
  );
};

export default TranscriptionWidget;
