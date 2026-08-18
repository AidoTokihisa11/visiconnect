import React, { memo } from 'react';
import styled from 'styled-components';
import {
  Mic,
  MicOff,
  Video,
  Monitor,
  MessageSquare,
  MoreHorizontal,
  Lock,
  User,
  Check,
  Circle,
  PhoneOff,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   Product-dashboard hero mockup.
   One coherent surface; density comes from
   functional content, not from decoration.
   ───────────────────────────────────────────── */

const Frame = styled.div`
  width: 100%;
  max-width: 720px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  overflow: hidden;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: #0f172a;
`;

/* ── Call header ─────────────────────────── */
const CallHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid #eef0f3;
  background: #ffffff;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;

  h3 {
    font-size: 13.5px;
    font-weight: 500;
    color: #0f172a;
    margin: 0;
    letter-spacing: -0.005em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const LiveDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: #dc2626;
  flex-shrink: 0;
`;

const HeaderMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: #64748b;
  flex-shrink: 0;
`;

const Encrypted = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #475569;

  svg {
    color: #64748b;
  }
`;

const Duration = styled.span`
  font-variant-numeric: tabular-nums;
  color: #475569;
`;

/* ── Body layout: video grid + sidebar ───── */
const Body = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 200px;

  @media (max-width: 640px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const VideoArea = styled.div`
  padding: 12px;
  background: #f8fafc;
  border-right: 1px solid #eef0f3;

  @media (max-width: 640px) {
    border-right: none;
    border-bottom: 1px solid #eef0f3;
  }
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  grid-template-rows: 1fr 1fr;
  gap: 8px;
  height: 260px;
`;

const Tile = styled.div`
  position: relative;
  background: #0f172a;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.$primary &&
    `
    grid-row: span 2;
  `}
`;

const Silhouette = styled(User)`
  color: rgba(255, 255, 255, 0.22);
`;

const TileLabel = styled.div`
  position: absolute;
  left: 8px;
  bottom: 8px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 7px;
  border-radius: 4px;
  background: rgba(15, 23, 42, 0.6);
  color: #ffffff;
  font-size: 11px;
  font-weight: 500;
  line-height: 1;

  svg {
    width: 10px;
    height: 10px;
    color: ${(props) => (props.$muted ? '#f87171' : '#ffffff')};
  }
`;

const StatusBadge = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 3px 7px;
  border-radius: 4px;
  background: rgba(15, 23, 42, 0.6);
  color: rgba(255, 255, 255, 0.85);
  font-size: 10.5px;
  font-weight: 500;
  letter-spacing: 0.01em;
`;

/* ── Control bar (integrated, not floating) ── */
const Controls = styled.div`
  margin-top: 10px;
  padding: 8px 10px;
  background: #ffffff;
  border: 1px solid #eef0f3;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const CtrlGroup = styled.div`
  display: inline-flex;
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
  color: #334155;
  cursor: default;
  padding: 0;

  &[data-active='true'] {
    background: #f1f5f9;
    color: #0f172a;
    border-color: #dbe0e6;
  }

  &[data-danger='true'] {
    background: #ffffff;
    color: #b91c1c;
    border-color: #fecaca;
  }
`;

/* ── Sidebar ─────────────────────────────── */
const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  background: #ffffff;
`;

const SidebarSection = styled.section`
  padding: 14px 14px 12px;

  & + & {
    border-top: 1px solid #eef0f3;
  }
`;

const SectionHead = styled.h4`
  margin: 0 0 10px;
  font-size: 10.5px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #94a3b8;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ParticipantItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 12.5px;
  color: #1e293b;
  font-weight: 500;

  svg {
    width: 12px;
    height: 12px;
    color: ${(props) => (props.$muted ? '#94a3b8' : '#16a34a')};
    flex-shrink: 0;
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const AgendaItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 12.5px;
  color: ${(props) => (props.$done ? '#94a3b8' : '#1e293b')};
  line-height: 1.4;
  text-decoration: ${(props) => (props.$done ? 'line-through' : 'none')};

  & > svg {
    margin-top: 1px;
    flex-shrink: 0;
    color: ${(props) => (props.$done ? '#16a34a' : '#cbd5e1')};
    fill: ${(props) => (props.$done ? '#16a34a' : 'transparent')};
  }
`;

const PARTICIPANTS = [
  { name: 'Tom K.', muted: false, presenter: true },
  { name: 'Julie D.', muted: false },
  { name: 'Marc R.', muted: true },
  { name: 'Aïcha S.', muted: false },
];

const AGENDA = [
  { text: 'Revue des OKR trimestriels', done: true },
  { text: 'Roadmap release 2.4', done: true },
  { text: 'Décisions produit — mobile', done: false },
];

const HeroConferenceDemo = memo(function HeroConferenceDemo() {
  return (
    <Frame role="img" aria-label="Aperçu de l'interface d'une réunion VisioConnect">
      <CallHeader>
        <Title>
          <LiveDot aria-hidden="true" />
          <h3>Réunion produit — hebdo</h3>
        </Title>
        <HeaderMeta>
          <Encrypted>
            <Lock size={12} strokeWidth={2.25} aria-hidden="true" />
            Chiffré
          </Encrypted>
          <Duration>24:29</Duration>
        </HeaderMeta>
      </CallHeader>

      <Body>
        <VideoArea>
          <VideoGrid>
            <Tile $primary aria-label="Tom K., présentateur">
              <Silhouette size={44} strokeWidth={1.5} aria-hidden="true" />
              <StatusBadge>Présente</StatusBadge>
              <TileLabel>
                <Mic strokeWidth={2.25} aria-hidden="true" />
                Tom K.
              </TileLabel>
            </Tile>
            <Tile aria-label="Julie D.">
              <Silhouette size={26} strokeWidth={1.5} aria-hidden="true" />
              <TileLabel>
                <Mic strokeWidth={2.25} aria-hidden="true" />
                Julie D.
              </TileLabel>
            </Tile>
            <Tile aria-label="Marc R., micro coupé">
              <Silhouette size={26} strokeWidth={1.5} aria-hidden="true" />
              <TileLabel $muted>
                <MicOff strokeWidth={2.25} aria-hidden="true" />
                Marc R.
              </TileLabel>
            </Tile>
          </VideoGrid>

          <Controls>
            <CtrlGroup>
              <CtrlBtn data-active="true" title="Micro" aria-label="Micro actif">
                <Mic size={14} strokeWidth={2} />
              </CtrlBtn>
              <CtrlBtn data-active="true" title="Caméra" aria-label="Caméra active">
                <Video size={14} strokeWidth={2} />
              </CtrlBtn>
              <CtrlBtn title="Partage d'écran" aria-label="Partage d'écran">
                <Monitor size={14} strokeWidth={2} />
              </CtrlBtn>
              <CtrlBtn title="Chat" aria-label="Chat">
                <MessageSquare size={14} strokeWidth={2} />
              </CtrlBtn>
              <CtrlBtn title="Plus" aria-label="Plus d'options">
                <MoreHorizontal size={14} strokeWidth={2} />
              </CtrlBtn>
            </CtrlGroup>
            <CtrlBtn data-danger="true" title="Quitter" aria-label="Quitter la réunion">
              <PhoneOff size={14} strokeWidth={2} />
            </CtrlBtn>
          </Controls>
        </VideoArea>

        <Sidebar>
          <SidebarSection>
            <SectionHead>Participants · 4</SectionHead>
            <List>
              {PARTICIPANTS.map((p) => (
                <ParticipantItem key={p.name} $muted={p.muted}>
                  <span>{p.name}</span>
                  {p.muted ? (
                    <MicOff strokeWidth={2.25} aria-hidden="true" />
                  ) : (
                    <Mic strokeWidth={2.25} aria-hidden="true" />
                  )}
                </ParticipantItem>
              ))}
            </List>
          </SidebarSection>

          <SidebarSection>
            <SectionHead>Ordre du jour</SectionHead>
            <List>
              {AGENDA.map((item) => (
                <AgendaItem key={item.text} $done={item.done}>
                  {item.done ? (
                    <Check size={12} strokeWidth={2.5} aria-hidden="true" />
                  ) : (
                    <Circle size={12} strokeWidth={2} aria-hidden="true" />
                  )}
                  {item.text}
                </AgendaItem>
              ))}
            </List>
          </SidebarSection>
        </Sidebar>
      </Body>
    </Frame>
  );
});

export default HeroConferenceDemo;
