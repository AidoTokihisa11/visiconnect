import React, { memo } from 'react';
import styled from 'styled-components';
import { Mic, MicOff, Video, Monitor, MoreHorizontal, Lock } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

/* ─────────────────────────────────────────────
   Single-card product mockup.
   No floating chips, no gradient avatar bubbles,
   no oversized shadows. One coherent surface.
   ───────────────────────────────────────────── */

const Frame = styled.div`
  position: relative;
  width: 100%;
  max-width: 640px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  box-shadow:
    0 1px 2px rgba(15, 23, 42, 0.04),
    0 8px 24px -12px rgba(15, 23, 42, 0.12);
  overflow: hidden;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
`;

/* Browser-style chrome bar */
const Chrome = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: #f9fafb;
  border-bottom: 1px solid #eef0f3;
`;

const Dots = styled.div`
  display: flex;
  gap: 6px;

  span {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: #e2e5ea;
  }
`;

const AddressBar = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: #ffffff;
  border: 1px solid #eef0f3;
  border-radius: 6px;
  font-size: 12px;
  color: #6b7280;
  min-width: 0;

  svg {
    color: #10b981;
    flex-shrink: 0;
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

/* Main call stage */
const Stage = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 172px;
  gap: 0;
  background: #ffffff;

  @media (max-width: 520px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Speaker = styled.div`
  position: relative;
  aspect-ratio: 16 / 10;
  background:
    radial-gradient(120% 80% at 20% 10%, #1f2937 0%, #0f172a 60%, #0b1220 100%);
  border-right: 1px solid #eef0f3;
  overflow: hidden;

  @media (max-width: 520px) {
    border-right: none;
    border-bottom: 1px solid #eef0f3;
  }
`;

const SpeakerContent = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.55);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.01em;

  svg {
    margin-right: 8px;
    opacity: 0.7;
  }
`;

const SpeakerLabel = styled.div`
  position: absolute;
  left: 12px;
  bottom: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(6px);
  color: #ffffff;
  font-size: 11.5px;
  font-weight: 500;
  border-radius: 4px;

  svg {
    width: 11px;
    height: 11px;
  }
`;

const RecDot = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(6px);
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 10.5px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: #ef4444;
  }
`;

/* Right column: participants stack */
const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 8px;
  background: #fbfbfc;

  @media (max-width: 520px) {
    flex-direction: row;
    overflow-x: auto;
    padding: 10px;
  }
`;

const Tile = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: 6px;
  overflow: hidden;
  background: ${(props) => props.$bg || '#1f2937'};
  border: 1px solid rgba(15, 23, 42, 0.06);
  flex: 0 0 auto;
  min-width: 0;

  @media (max-width: 520px) {
    width: 132px;
  }
`;

const TileName = styled.div`
  position: absolute;
  left: 6px;
  bottom: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 6px;
  background: rgba(15, 23, 42, 0.55);
  color: #ffffff;
  font-size: 10.5px;
  font-weight: 500;
  border-radius: 3px;

  svg {
    width: 10px;
    height: 10px;
    color: ${(props) => (props.$muted ? '#f87171' : '#ffffff')};
  }
`;

/* Bottom control bar */
const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-top: 1px solid #eef0f3;
  background: #ffffff;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11.5px;
  color: #6b7280;

  strong {
    color: #111827;
    font-weight: 600;
  }
`;

const Divider = styled.span`
  width: 1px;
  height: 12px;
  background: #e5e7eb;
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const CtrlBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #374151;
  cursor: default;
  padding: 0;

  &[data-active='true'] {
    background: #f1f5f9;
    color: #0f172a;
    border-color: #dbe0e6;
  }
`;

const PARTICIPANTS = [
  { name: 'Julie D.', bg: 'linear-gradient(160deg,#2b3646 0%,#1a2130 100%)', muted: false },
  { name: 'Marc R.', bg: 'linear-gradient(160deg,#2e2a3a 0%,#1c1a26 100%)', muted: true },
  { name: 'Aïcha S.', bg: 'linear-gradient(160deg,#26343a 0%,#141d22 100%)', muted: false },
];

const HeroConferenceDemo = memo(function HeroConferenceDemo() {
  const { t } = useTranslation();

  return (
    <Frame role="img" aria-label="Aperçu de l'interface VisioConnect">
      <Chrome>
        <Dots>
          <span />
          <span />
          <span />
        </Dots>
        <AddressBar>
          <Lock size={11} strokeWidth={2.5} aria-hidden="true" />
          <span>visioconnect.pro/room/equipe-produit</span>
        </AddressBar>
      </Chrome>

      <Stage>
        <Speaker>
          <SpeakerContent>
            <Monitor size={16} strokeWidth={2} aria-hidden="true" />
            {t('ui.screenShare') || "Partage d'écran"}
          </SpeakerContent>
          <SpeakerLabel>
            <Mic size={11} strokeWidth={2.25} aria-hidden="true" />
            Tom K.
          </SpeakerLabel>
          <RecDot aria-label="Enregistrement en cours">REC</RecDot>
        </Speaker>

        <Sidebar>
          {PARTICIPANTS.map((p) => (
            <Tile key={p.name} $bg={p.bg}>
              <TileName $muted={p.muted}>
                {p.muted ? (
                  <MicOff strokeWidth={2.25} aria-hidden="true" />
                ) : (
                  <Mic strokeWidth={2.25} aria-hidden="true" />
                )}
                {p.name}
              </TileName>
            </Tile>
          ))}
        </Sidebar>
      </Stage>

      <Controls>
        <Meta>
          <strong>4 participants</strong>
          <Divider />
          <span>E2EE · 24:29</span>
        </Meta>
        <ButtonRow aria-hidden="true">
          <CtrlBtn data-active="true" title="Micro">
            <Mic size={14} strokeWidth={2} />
          </CtrlBtn>
          <CtrlBtn data-active="true" title="Caméra">
            <Video size={14} strokeWidth={2} />
          </CtrlBtn>
          <CtrlBtn title="Partage d'écran">
            <Monitor size={14} strokeWidth={2} />
          </CtrlBtn>
          <CtrlBtn title="Plus">
            <MoreHorizontal size={14} strokeWidth={2} />
          </CtrlBtn>
        </ButtonRow>
      </Controls>
    </Frame>
  );
});

export default HeroConferenceDemo;
