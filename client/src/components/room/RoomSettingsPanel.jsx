import React, { useState } from 'react';
import styled from 'styled-components';
import { SlidersHorizontal, Sparkles, Camera, Palette, Mic, Volume2, RefreshCw, PlayCircle } from 'lucide-react';
import { ROOM_THEME as THEME } from '../../styles/roomTheme';

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
          <SlidersHorizontal size={16} /> Devices
        </SectionTitle>

        <Row>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}><Camera size={14} /> Camera</span>
          <Select
            value={selectedDevices?.cameraId || ''}
            onChange={(e) => controls?.setCameraDevice?.(e.target.value)}
          >
            <option value="">Default</option>
            {(devices?.cameras || []).map((d) => (
              <option key={d.deviceId} value={d.deviceId}>{d.label || 'Camera'}</option>
            ))}
          </Select>
        </Row>

        <Row>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}><Mic size={14} /> Micro</span>
          <Select
            value={selectedDevices?.microphoneId || ''}
            onChange={(e) => controls?.setMicrophoneDevice?.(e.target.value)}
          >
            <option value="">Default</option>
            {(devices?.microphones || []).map((d) => (
              <option key={d.deviceId} value={d.deviceId}>{d.label || 'Microphone'}</option>
            ))}
          </Select>
        </Row>

        <Row>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}><Volume2 size={14} /> Sortie audio</span>
          <Select
            value={selectedDevices?.speakerId || ''}
            onChange={(e) => controls?.setSpeakerDevice?.(e.target.value)}
          >
            <option value="">Default</option>
            {(devices?.speakers || []).map((d) => (
              <option key={d.deviceId} value={d.deviceId}>{d.label || 'Speaker'}</option>
            ))}
          </Select>
        </Row>

        <ActionButton type="button" onClick={() => controls?.refreshDevices?.()}>
          <RefreshCw size={14} /> Rafraichir les peripheriques
        </ActionButton>

        <ActionButton
          type="button"
          onClick={playSpeakerTest}
          disabled={isTesting}
          style={{ marginTop: '0.5rem', opacity: isTesting ? 0.6 : 1, cursor: isTesting ? 'wait' : 'pointer' }}
        >
          <PlayCircle size={14} /> {isTesting ? 'Lecture...' : 'Tester les haut-parleurs'}
        </ActionButton>
      </Section>

      <Section>
        <SectionTitle>
          <Camera size={16} /> Video
        </SectionTitle>

        <Row>
          Qualite video maximale
          <Switch
            type="button"
            $on={settings.maxQualityLock}
            onClick={() => updateSetting('maxQualityLock', !settings.maxQualityLock)}
            aria-label="Toggle max quality lock"
          />
        </Row>

        <Row>
          Affichage video
          <Select
            value={settings.videoFit}
            onChange={(e) => updateSetting('videoFit', e.target.value)}
          >
            <option value="cover">Cover</option>
            <option value="contain">Contain</option>
          </Select>
        </Row>

        <Row>
          Afficher noms participants
          <Switch
            type="button"
            $on={settings.showParticipantLabels}
            onClick={() => updateSetting('showParticipantLabels', !settings.showParticipantLabels)}
            aria-label="Toggle participant labels"
          />
        </Row>
      </Section>

      <Section>
        <SectionTitle>
          <Sparkles size={16} /> Assistant IA
        </SectionTitle>

        <Row>
          Mode de reponse
          <Select
            value={settings.aiResponseStyle}
            onChange={(e) => updateSetting('aiResponseStyle', e.target.value)}
          >
            <option value="concise">Concis</option>
            <option value="balanced">Equilibre</option>
            <option value="deep">Detaille</option>
          </Select>
        </Row>

        <Hint>
          Si une cle API LLM est configuree, l'assistant repond avec un moteur externe.
          Sinon, il utilise un fallback local enrichi.
        </Hint>
      </Section>

      <Section>
        <SectionTitle>
          <Palette size={16} /> Interface
        </SectionTitle>

        <Row>
          Panneau lateral large
          <Switch
            type="button"
            $on={settings.widePanel}
            onClick={() => updateSetting('widePanel', !settings.widePanel)}
            aria-label="Toggle wide panel"
          />
        </Row>

        <Row>
          Stats monitor
          <Switch
            type="button"
            $on={settings.showStatsDefault}
            onClick={() => updateSetting('showStatsDefault', !settings.showStatsDefault)}
            aria-label="Toggle stats monitor"
          />
        </Row>
      </Section>

      <Section>
        <SectionTitle>
          <SlidersHorizontal size={16} /> Notes
        </SectionTitle>
        <Hint>
          Tous ces reglages sont appliques en temps reel et conserves localement dans le navigateur.
        </Hint>
      </Section>
    </Wrapper>
  );
};
