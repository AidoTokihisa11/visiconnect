/**
 * AIFeaturesPanel - Panneau de contrôle des fonctionnalités IA
 * 
 * Permet à l'utilisateur d'activer/désactiver les features IA
 * à la demande pour ne pas impacter les performances
 */

import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { 
  Sparkles, 
  Mic, 
  Languages, 
  Image, 
  Sliders,
  Volume2,
  FileText,
  Zap,
  AlertCircle,
  Check,
  ChevronDown,
  ChevronUp,
  Info,
  Download,
  Loader2
} from 'lucide-react';
import { ROOM_THEME as THEME } from '../../styles/roomTheme';
import { useAISettings } from '../../hooks/useAISettings';
import { getSmartNotesService } from '../../services/ai/SmartNotesService';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  padding-bottom: 80px;
  background: ${THEME.panelBg};
  flex: 1;
  min-height: 0;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${THEME.border};
  margin-bottom: 0.5rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: ${THEME.text};
  font-weight: 600;
`;

const Badge = styled.span`
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  color: white;
  border-radius: 100px;
  font-weight: 500;
`;

const PresetRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const PresetButton = styled.button`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid ${props => props.$active ? THEME.accent : THEME.border};
  background: ${props => props.$active ? THEME.accentSoft : THEME.cardBg};
  color: ${props => props.$active ? THEME.accent : THEME.text};
  border-radius: 8px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${THEME.accent};
  }
`;

const FeatureCard = styled.div`
  background: ${THEME.cardBg};
  border: 1px solid ${props => props.$enabled ? THEME.accent : THEME.border};
  border-radius: 12px;
  transition: all 0.2s;

  ${props => props.$enabled && `
    box-shadow: 0 0 0 1px ${THEME.accent}20;
  `}
`;

const FeatureHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0.85rem;
  cursor: pointer;
  user-select: none;

  &:hover {
    background: ${THEME.accentSoft};
  }
`;

const FeatureInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${props => props.$enabled ? THEME.accent : THEME.border};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$enabled ? 'white' : THEME.textDim};
  transition: all 0.2s;
`;

const FeatureName = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${THEME.text};
`;

const FeatureDesc = styled.div`
  font-size: 0.75rem;
  color: ${THEME.textDim};
  margin-top: 0.15rem;
`;

const Switch = styled.button`
  width: 44px;
  height: 24px;
  border-radius: 999px;
  border: none;
  background: ${props => props.$on ? THEME.accent : '#94a3b8'};
  position: relative;
  cursor: pointer;
  transition: all 0.2s;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${props => props.$on ? '22px' : '2px'};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    transition: left 0.2s;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ExpandedContent = styled.div`
  padding: 0.5rem 0.85rem 0.85rem;
  border-top: 1px solid ${THEME.border};
`;

const OptionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  font-size: 0.85rem;
  color: ${THEME.textDim};
`;

const Select = styled.select`
  padding: 0.35rem 0.5rem;
  border: 1px solid ${THEME.border};
  border-radius: 6px;
  background: ${THEME.accentSoft};
  color: ${THEME.text};
  font-size: 0.8rem;
  outline: none;

  & option {
    background: ${THEME.cardBg};
    color: ${THEME.text};
  }

  &:focus {
    border-color: ${THEME.accent};
  }
`;

const Slider = styled.input`
  width: 100px;
  accent-color: ${THEME.accent};
`;

const WarningBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.6rem 0.75rem;
  background: rgba(251, 191, 36, 0.1);
  border: 1px solid rgba(251, 191, 36, 0.3);
  border-radius: 8px;
  margin-bottom: 0.5rem;
`;

const WarningText = styled.span`
  font-size: 0.78rem;
  color: #b45309;
  line-height: 1.4;
`;

const StatusIndicator = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.7rem;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  background: ${props => props.$available ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
  color: ${props => props.$available ? '#16a34a' : '#dc2626'};
`;

// Composant Feature individuel
const Feature = ({ 
  icon: Icon, 
  name, 
  description, 
  enabled, 
  available = true,
  onToggle, 
  children,
  expandable = true 
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <FeatureCard $enabled={enabled}>
      <FeatureHeader onClick={() => expandable && setExpanded(!expanded)}>
        <FeatureInfo>
          <IconWrapper $enabled={enabled}>
            <Icon size={16} />
          </IconWrapper>
          <div>
            <FeatureName>{name}</FeatureName>
            <FeatureDesc>{description}</FeatureDesc>
          </div>
        </FeatureInfo>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {!available && (
            <StatusIndicator $available={false}>
              Non supporté
            </StatusIndicator>
          )}
          <Switch 
            $on={enabled} 
            disabled={!available}
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            aria-label={`Toggle ${name}`}
          />
          {expandable && children && (
            expanded ? <ChevronUp size={16} color={THEME.textDim} /> : <ChevronDown size={16} color={THEME.textDim} />
          )}
        </div>
      </FeatureHeader>
      {expanded && children && (
        <ExpandedContent onClick={(e) => e.stopPropagation()}>
          {children}
        </ExpandedContent>
      )}
    </FeatureCard>
  );
};

// Slider avec état local — ne déclenche setProcessor qu'au relâchement
const BlurSliderRow = ({ currentValue, onCommit }) => {
  const [localValue, setLocalValue] = useState(currentValue);
  return (
    <OptionRow>
      Intensité du flou
      <Slider
        type="range"
        min="5"
        max="30"
        value={localValue}
        onChange={(e) => setLocalValue(Number(e.target.value))}
        onMouseUp={(e) => onCommit(Number(e.target.value))}
        onTouchEnd={(e) => onCommit(Number(e.target.value))}
      />
    </OptionRow>
  );
};

// Composant principal
export const AIFeaturesPanel = ({ chatMessages = [], meetingTitle = 'Réunion VisiConnect' } = {}) => {
  const {
    settings,
    capabilities,
    isLowEndDevice,
    toggleFeature,
    updateSettings,
    applyPreset,
  } = useAISettings();

  const [activePreset, setActivePreset] = useState(null);
  const [summary, setSummary] = useState(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState('');

  const handleGenerateSummary = async () => {
    setSummaryError('');
    setSummary(null);
    setIsGeneratingSummary(true);
    try {
      const service = getSmartNotesService();
      service.setPreferredModel?.(
        settings.smartNotes?.model || 'meta-llama/llama-3.1-8b-instruct:free'
      );
      const normalizedMessages = (chatMessages || []).map((m) => ({
        sender: m.sender || m.user || m.from || 'Anonyme',
        text: m.text || m.message || m.content || '',
      })).filter((m) => m.text);
      const result = await service.generateMeetingSummary({
        transcript: [],
        chatMessages: normalizedMessages,
        meetingTitle,
        duration: 'En cours',
      });
      setSummary(result);
    } catch (e) {
      console.error('[SmartNotes] generate failed:', e);
      setSummaryError(e?.message || 'Impossible de générer le résumé.');
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const handleDownloadSummary = () => {
    if (!summary) return;
    try {
      const md = getSmartNotesService().exportSummary(summary, 'markdown');
      const blob = new Blob([md], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `compte-rendu-${Date.now()}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('[SmartNotes] export failed:', e);
    }
  };

  const handlePreset = (preset) => {
    applyPreset(preset);
    setActivePreset(preset);
  };

  return (
    <Wrapper>
      <Header>
        <Sparkles size={20} color={THEME.accent} />
        <Title>Fonctionnalités IA</Title>
        <Badge>Gratuit</Badge>
      </Header>

      {isLowEndDevice && (
        <WarningBox>
          <AlertCircle size={16} color="#b45309" style={{ flexShrink: 0, marginTop: 2 }} />
          <WarningText>
            Appareil à faibles ressources détecté. Certaines fonctionnalités sont désactivées pour préserver les performances.
          </WarningText>
        </WarningBox>
      )}

      <PresetRow>
        <PresetButton 
          $active={activePreset === 'performance'} 
          onClick={() => handlePreset('performance')}
        >
          <Zap size={14} style={{ marginRight: 4 }} />
          Performance
        </PresetButton>
        <PresetButton 
          $active={activePreset === 'balanced'} 
          onClick={() => handlePreset('balanced')}
        >
          Équilibré
        </PresetButton>
        <PresetButton 
          $active={activePreset === 'full'} 
          onClick={() => handlePreset('full')}
        >
          <Sparkles size={14} style={{ marginRight: 4 }} />
          Complet
        </PresetButton>
      </PresetRow>

      {/* Transcription Live */}
      <Feature
        icon={Mic}
        name="Transcription Live"
        description="Web Speech API • 100% local"
        enabled={settings.transcription?.enabled}
        available={capabilities.transcription?.available}
        onToggle={() => toggleFeature('transcription')}
      >
        <OptionRow>
          Langue de reconnaissance
          <Select 
            value={settings.transcription?.language || 'fr-FR'}
            onChange={(e) => updateSettings('transcription', { language: e.target.value })}
          >
            <option value="fr-FR">Français</option>
            <option value="en-US">English</option>
            <option value="es-ES">Español</option>
            <option value="de-DE">Deutsch</option>
          </Select>
        </OptionRow>
        <OptionRow>
          Démarrer automatiquement
          <Switch 
            $on={settings.transcription?.autoStart}
            onClick={() => updateSettings('transcription', { autoStart: !settings.transcription?.autoStart })}
          />
        </OptionRow>
      </Feature>

      {/* Smart Notes */}
      <Feature
        icon={FileText}
        name="Smart Notes"
        description="Résumés IA • OpenRouter gratuit"
        enabled={settings.smartNotes?.enabled}
        available={capabilities.smartNotes?.available}
        onToggle={() => toggleFeature('smartNotes')}
      >
        <OptionRow>
          Modèle IA
          <Select 
            value={settings.smartNotes?.model || 'meta-llama/llama-3.1-8b-instruct:free'}
            onChange={(e) => updateSettings('smartNotes', { model: e.target.value })}
          >
            <option value="meta-llama/llama-3.1-8b-instruct:free">Llama 3.1 8B (rapide)</option>
            <option value="mistralai/mistral-7b-instruct:free">Mistral 7B</option>
            <option value="qwen/qwen-2-7b-instruct:free">Qwen 2 7B</option>
          </Select>
        </OptionRow>

        {/* Bouton de génération manuelle du résumé */}
        <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={handleGenerateSummary}
            disabled={isGeneratingSummary || (!chatMessages || chatMessages.length === 0)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.55rem 0.9rem',
              border: 'none',
              borderRadius: '8px',
              background: isGeneratingSummary
                ? 'rgba(99,102,241,0.4)'
                : 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: isGeneratingSummary ? 'wait' : 'pointer',
              opacity: (!chatMessages || chatMessages.length === 0) ? 0.55 : 1,
              transition: 'all 0.2s',
            }}
            title={(!chatMessages || chatMessages.length === 0) ? 'Aucun message dans le chat à résumer pour le moment.' : 'Générer un résumé IA à partir du chat.'}
          >
            {isGeneratingSummary
              ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Génération...</>
              : <><Sparkles size={14} /> Générer un résumé maintenant</>}
          </button>

          {summaryError && (
            <div style={{ fontSize: '0.78rem', color: '#f87171', padding: '6px 10px', background: 'rgba(239,68,68,0.08)', borderRadius: '6px', border: '1px solid rgba(239,68,68,0.25)' }}>
              {summaryError}
            </div>
          )}

          {summary && (
            <div style={{ marginTop: '0.5rem', padding: '0.75rem', background: 'rgba(15,23,42,0.6)', border: `1px solid ${THEME.border}`, borderRadius: '8px', maxHeight: '260px', overflowY: 'auto' }}>
              <div style={{ fontSize: '0.72rem', color: THEME.textDim, marginBottom: '0.4rem' }}>
                Résumé IA • {new Date(summary.generatedAt).toLocaleTimeString('fr-FR')}
              </div>
              <div style={{ fontSize: '0.85rem', color: THEME.text, whiteSpace: 'pre-wrap', lineHeight: 1.55 }}>
                {summary.summary}
              </div>
              <button
                type="button"
                onClick={handleDownloadSummary}
                style={{
                  marginTop: '0.6rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.35rem 0.65rem',
                  border: `1px solid ${THEME.border}`,
                  background: 'transparent',
                  color: THEME.text,
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                }}
              >
                <Download size={12} /> Télécharger (.md)
              </button>
            </div>
          )}
        </div>
      </Feature>

      {/* Traduction — Bientôt disponible */}
      <Feature
        icon={Languages}
        name={
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            Traduction Instantanée
            <span style={{
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              padding: '2px 7px',
              borderRadius: '999px',
              background: 'rgba(99,102,241,0.2)',
              color: '#818cf8',
              border: '1px solid rgba(99,102,241,0.35)',
              textTransform: 'uppercase',
              lineHeight: 1.5,
            }}>
              Bientôt
            </span>
          </span>
        }
        description="Chat multilingue • OpenRouter"
        enabled={false}
        available={false}
        onToggle={() => {}}
      />

      {/* Background Blur */}
      <Feature
        icon={Image}
        name="Fond Flou IA"
        description="MediaPipe • 100% local"
        enabled={settings.backgroundBlur?.enabled}
        available={capabilities.backgroundBlur?.available && !isLowEndDevice}
        onToggle={() => toggleFeature('backgroundBlur')}
      >
        <OptionRow>
          Mode
          <Select 
            value={settings.backgroundBlur?.mode || 'blur'}
            onChange={(e) => updateSettings('backgroundBlur', { mode: e.target.value })}
          >
            <option value="blur">Flou</option>
            <option value="image">Image personnalisée</option>
          </Select>
        </OptionRow>
        {settings.backgroundBlur?.mode === 'blur' && (
          <BlurSliderRow
            currentValue={settings.backgroundBlur?.blurAmount || 10}
            onCommit={(v) => updateSettings('backgroundBlur', { blurAmount: v })}
          />
        )}
      </Feature>

      {/* Video Enhancement */}
      <Feature
        icon={Sliders}
        name="Amélioration Vidéo"
        description="Filtres CSS • Temps réel"
        enabled={settings.videoEnhancement?.enabled}
        available={capabilities.videoEnhancement?.available && !isLowEndDevice}
        onToggle={() => toggleFeature('videoEnhancement')}
      >
        <OptionRow>
          Preset
          <Select 
            value={settings.videoEnhancement?.preset || 'natural'}
            onChange={(e) => updateSettings('videoEnhancement', { preset: e.target.value })}
          >
            <option value="natural">Naturel</option>
            <option value="vivid">Vif</option>
            <option value="cinema">Cinéma</option>
            <option value="lowLight">Faible lumière</option>
            <option value="professional">Professionnel</option>
          </Select>
        </OptionRow>
      </Feature>

      {/* Noise Suppression */}
      <Feature
        icon={Volume2}
        name="Réduction de Bruit"
        description="LiveKit native • Toujours actif"
        enabled={settings.noiseSuppression?.enabled}
        available={true}
        onToggle={() => toggleFeature('noiseSuppression')}
        expandable={true}
      >
        <OptionRow>
          Niveau
          <Select 
            value={settings.noiseSuppression?.level || 'moderate'}
            onChange={(e) => updateSettings('noiseSuppression', { level: e.target.value })}
          >
            <option value="low">Léger</option>
            <option value="moderate">Modéré</option>
            <option value="high">Fort</option>
          </Select>
        </OptionRow>
      </Feature>

      <div style={{ 
        marginTop: 'auto', 
        padding: '0.75rem', 
        background: THEME.accentSoft, 
        borderRadius: 8,
        fontSize: '0.75rem',
        color: THEME.textDim,
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.5rem'
      }}>
        <Info size={14} style={{ flexShrink: 0, marginTop: 2 }} />
        <span>
          Toutes les fonctionnalités IA utilisent des modèles open source gratuits ou des API navigateur natives. 
          Aucun coût d'infrastructure.
        </span>
      </div>
    </Wrapper>
  );
};

export default AIFeaturesPanel;
