import React, { useState } from 'react';
import styled from 'styled-components';
import { SlidersHorizontal, Sparkles, Camera, Palette, Mic, Volume2, RefreshCw, PlayCircle } from 'lucide-react';
import { ROOM_THEME as THEME } from '../../styles/roomTheme';
import { useTranslation } from '../../hooks/useTranslation';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  padding-bottom: 80px;
  background: ${THEME.panelBg};
  flex: 1;
  min-height: 0;
  overflow-y: auto;
`;

const Section = styled.section`
  background: ${THEME.cardBg};
  border: 1px solid ${THEME.border};
  border-radius: 12px;
  padding: 0.9rem;
`;

const SectionTitle = styled.h4`
  margin: 0 0 0.75rem 0;
  font-size: 0.95rem;
  color: ${THEME.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Row = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  color: ${THEME.textDim};
  font-size: 0.88rem;
  margin-bottom: 0.6rem;
  flex-wrap: wrap;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Switch = styled.button`
  width: 48px;
  height: 28px;
  border-radius: 999px;
  border: 1px solid ${THEME.border};
  background: ${(p) => (p.$on ? THEME.accent : '#e2e8f0')};
  position: relative;
  cursor: pointer;
  transition: all 0.2s;

  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: ${(p) => (p.$on ? '24px' : '3px')};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.16);
    transition: left 0.2s;
  }
`;

const Select = styled.select`
  border: 1px solid ${THEME.border};
  background: ${THEME.accentSoft};
  color: ${THEME.text};
  border-radius: 8px;
  padding: 0.35rem 0.55rem;
  outline: none;
  max-width: 180px;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-shrink: 0;

  /* Les <option> héritent du fond blanc du système → forcer un fond sombre + texte clair
     pour éviter le « texte blanc sur blanc » dans le menu déroulant. */
  & option {
    background: ${THEME.cardBg};
    color: ${THEME.text};
  }

  &:focus {
    box-shadow: 0 0 0 3px ${THEME.ring};
  }
`;

const Hint = styled.p`
  margin: 0.55rem 0 0;
  color: ${THEME.textDim};
  font-size: 0.78rem;
  line-height: 1.4;
`;

const ActionButton = styled.button`
  border: 1px solid ${THEME.border};
  background: ${THEME.accentSoft};
  color: ${THEME.text};
  border-radius: 8px;
  padding: 0.4rem 0.6rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;

  &:hover {
    background: ${THEME.accentSoft};
  }
`;

export const RoomSettingsPanel = ({ settings, updateSetting, devices, selectedDevices, controls }) => {
  const { t } = useTranslation();
  const [isTesting, setIsTesting] = useState(false);

  const playSpeakerTest = () => {
    if (isTesting) return;
    setIsTesting(true);
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.35, ctx.currentTime);
      gainNode.connect(ctx.destination);

      // Simple rising tone: 440 Hz → 880 Hz over 0.6s
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(880, ctx.currentTime + 0.4);
      osc.connect(gainNode);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.6);

      // Fade out at the end
      gainNode.gain.setValueAtTime(0.35, ctx.currentTime + 0.4);
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);

      setTimeout(() => {
        ctx.close();
        setIsTesting(false);
      }, 700);
    } catch (e) {
      console.error('[SpeakerTest] Web Audio API error:', e);
      setIsTesting(false);
    }
  };

  return (
    <Wrapper>
      <Section>
        <SectionTitle>
          <SlidersHorizontal size={16} /> {t('room.settings.devices', 'Périphériques')}
        </SectionTitle>

        <Row>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}><Camera size={14} /> {t('room.settings.camera', 'Caméra')}</span>
          <Select
            value={selectedDevices?.cameraId || ''}
            onChange={(e) => controls?.setCameraDevice?.(e.target.value)}
          >
            <option value="">{t('room.settings.default', 'Par défaut')}</option>
            {(devices?.cameras || []).map((d) => (
              <option key={d.deviceId} value={d.deviceId}>{d.label || t('room.settings.camera', 'Caméra')}</option>
            ))}
          </Select>
        </Row>

        <Row>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}><Mic size={14} /> {t('room.settings.microphone', 'Microphone')}</span>
          <Select
            value={selectedDevices?.microphoneId || ''}
            onChange={(e) => controls?.setMicrophoneDevice?.(e.target.value)}
          >
            <option value="">{t('room.settings.default', 'Par défaut')}</option>
            {(devices?.microphones || []).map((d) => (
              <option key={d.deviceId} value={d.deviceId}>{d.label || t('room.settings.microphone', 'Microphone')}</option>
            ))}
          </Select>
        </Row>

        <Row>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}><Volume2 size={14} /> {t('room.settings.audioOutput', 'Sortie audio')}</span>
          <Select
            value={selectedDevices?.speakerId || ''}
            onChange={(e) => controls?.setSpeakerDevice?.(e.target.value)}
          >
            <option value="">{t('room.settings.default', 'Par défaut')}</option>
            {(devices?.speakers || []).map((d) => (
              <option key={d.deviceId} value={d.deviceId}>{d.label || t('room.settings.speaker', 'Haut-parleur')}</option>
            ))}
          </Select>
        </Row>

        <ActionButton type="button" onClick={() => controls?.refreshDevices?.()}>
          <RefreshCw size={14} /> {t('room.settings.refreshDevices', 'Rafraîchir les périphériques')}
        </ActionButton>

        <ActionButton
          type="button"
          onClick={playSpeakerTest}
          disabled={isTesting}
          style={{ marginTop: '0.5rem', opacity: isTesting ? 0.6 : 1, cursor: isTesting ? 'wait' : 'pointer' }}
        >
          <PlayCircle size={14} /> {isTesting ? t('room.settings.playing', 'Lecture...') : t('room.settings.testSpeakers', 'Tester les haut-parleurs')}
        </ActionButton>
      </Section>

      <Section>
        <SectionTitle>
          <Camera size={16} /> {t('room.settings.video', 'Vidéo')}
        </SectionTitle>

        <Row>
          {t('room.settings.maxQuality', 'Qualité vidéo maximale')}
          <Switch
            type="button"
            $on={settings.maxQualityLock}
            onClick={() => updateSetting('maxQualityLock', !settings.maxQualityLock)}
            aria-label={t('room.settings.toggleMaxQuality', 'Activer/désactiver la qualité maximale')}
          />
        </Row>

        <Row>
          {t('room.settings.videoDisplay', 'Affichage vidéo')}
          <Select
            value={settings.videoFit}
            onChange={(e) => updateSetting('videoFit', e.target.value)}
          >
            <option value="cover">{t('room.settings.cover', 'Remplir')}</option>
            <option value="contain">{t('room.settings.contain', 'Contenir')}</option>
          </Select>
        </Row>

        <Row>
          {t('room.settings.showLabels', 'Afficher noms participants')}
          <Switch
            type="button"
            $on={settings.showParticipantLabels}
            onClick={() => updateSetting('showParticipantLabels', !settings.showParticipantLabels)}
            aria-label={t('room.settings.toggleLabels', 'Activer/désactiver les libellés participants')}
          />
        </Row>
      </Section>

      <Section>
        <SectionTitle>
          <Sparkles size={16} /> {t('room.settings.aiAssistant', 'Assistant IA')}
        </SectionTitle>

        <Row>
          {t('room.settings.responseMode', 'Mode de réponse')}
          <Select
            value={settings.aiResponseStyle}
            onChange={(e) => updateSetting('aiResponseStyle', e.target.value)}
          >
            <option value="concise">{t('room.settings.concise', 'Concis')}</option>
            <option value="balanced">{t('room.settings.balanced', 'Équilibré')}</option>
            <option value="deep">{t('room.settings.detailed', 'Détaillé')}</option>
          </Select>
        </Row>

        <Hint>
          {t('room.settings.aiHint', "Si une clé API LLM est configurée, l'assistant répond avec un moteur externe. Sinon, il utilise un fallback local enrichi.")}
        </Hint>
      </Section>

      <Section>
        <SectionTitle>
          <Palette size={16} /> {t('room.settings.interface', 'Interface')}
        </SectionTitle>

        <Row>
          {t('room.settings.widePanel', 'Panneau latéral large')}
          <Switch
            type="button"
            $on={settings.widePanel}
            onClick={() => updateSetting('widePanel', !settings.widePanel)}
            aria-label={t('room.settings.toggleWide', 'Activer/désactiver le panneau large')}
          />
        </Row>

        <Row>
          {t('room.settings.statsMonitor', 'Moniteur de statistiques')}
          <Switch
            type="button"
            $on={settings.showStatsDefault}
            onClick={() => updateSetting('showStatsDefault', !settings.showStatsDefault)}
            aria-label={t('room.settings.toggleStats', 'Activer/désactiver le moniteur de statistiques')}
          />
        </Row>
      </Section>

      <Section>
        <SectionTitle>
          <SlidersHorizontal size={16} /> {t('room.settings.notes', 'Notes')}
        </SectionTitle>
        <Hint>
          {t('room.settings.notesHint', 'Tous ces réglages sont appliqués en temps réel et conservés localement dans le navigateur.')}
        </Hint>
      </Section>
    </Wrapper>
  );
};
