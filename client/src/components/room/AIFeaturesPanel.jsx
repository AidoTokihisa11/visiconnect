/**
 * AIFeaturesPanel - Panneau de contrôle des fonctionnalités IA
 * 
 * Permet à l'utilisateur d'activer/désactiver les features IA
 * à la demande pour ne pas impacter les performances
 */

import React, { useState } from 'react';
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
  Info
} from 'lucide-react';
import { ROOM_THEME as THEME } from '../../styles/roomTheme';
import { useAISettings } from '../../hooks/useAISettings';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background: ${THEME.panelBg};
  height: 100%;
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
  overflow: hidden;
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
  padding: 0 0.85rem 0.85rem;
  border-top: 1px solid ${THEME.border};
  animation: slideDown 0.2s ease;

  @keyframes slideDown {
    from { opacity: 0; max-height: 0; }
    to { opacity: 1; max-height: 200px; }
  }
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

// Composant principal
export const AIFeaturesPanel = () => {
  const {
    settings,
    capabilities,
    isLowEndDevice,
    toggleFeature,
    updateSettings,
    applyPreset,
  } = useAISettings();

  const [activePreset, setActivePreset] = useState(null);

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
      </Feature>

      {/* Traduction */}
      <Feature
        icon={Languages}
        name="Traduction Instantanée"
        description="Chat multilingue • OpenRouter"
        enabled={settings.translation?.enabled}
        available={capabilities.translation?.available}
        onToggle={() => toggleFeature('translation')}
      >
        <OptionRow>
          Ma langue
          <Select 
            value={settings.translation?.targetLanguage || 'fr'}
            onChange={(e) => updateSettings('translation', { targetLanguage: e.target.value })}
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="de">Deutsch</option>
            <option value="it">Italiano</option>
            <option value="pt">Português</option>
          </Select>
        </OptionRow>
        <OptionRow>
          Traduire automatiquement
          <Switch 
            $on={settings.translation?.autoTranslate}
            onClick={() => updateSettings('translation', { autoTranslate: !settings.translation?.autoTranslate })}
          />
        </OptionRow>
      </Feature>

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
          <OptionRow>
            Intensité du flou
            <Slider 
              type="range" 
              min="5" 
              max="30" 
              value={settings.backgroundBlur?.blurAmount || 10}
              onChange={(e) => updateSettings('backgroundBlur', { blurAmount: Number(e.target.value) })}
            />
          </OptionRow>
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
