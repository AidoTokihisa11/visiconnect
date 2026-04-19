import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Video, Users, Globe, Mic, Monitor, Wifi } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

// --- DESIGN TOKENS ---
const GLASS = {
  bg: 'rgba(255, 255, 255, 0.72)',
  border: 'rgba(255, 255, 255, 0.45)',
  shadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
  blur: '16px',
};

// --- KEYFRAMES ---
const pulse = keyframes`
  0%, 100% { opacity: 0.75; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.15); }
`;

const waveAnim = keyframes`
  0%, 100% { transform: scaleY(0.3); }
  50% { transform: scaleY(1); }
`;

const bandwidthOscillate = keyframes`
  0% { width: 62%; }
  25% { width: 71%; }
  50% { width: 58%; }
  75% { width: 68%; }
  100% { width: 62%; }
`;

const codeScroll = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
`;

const floatCard = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

// --- STYLED COMPONENTS ---
const Container = styled.div`
  position: relative;
  background: hsl(var(--background));
  border-radius: 16px;
  border: 1px solid hsl(var(--border));
  aspect-ratio: 16/10;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(hsl(var(--border)) 1px, transparent 1px);
    background-size: 24px 24px;
    opacity: 0.5;
    z-index: 0;
    transition: transform 0.3s ease;
  }
`;

const BrowserWindow = styled.div`
  position: relative;
  width: 90%;
  height: 80%;
  background: ${GLASS.bg};
  backdrop-filter: blur(${GLASS.blur});
  -webkit-backdrop-filter: blur(${GLASS.blur});
  border-radius: 12px;
  box-shadow: ${GLASS.shadow};
  border: 1px solid ${GLASS.border};
  overflow: hidden;
  z-index: 1;
`;

const TitleBar = styled.div`
  height: 40px;
  border-bottom: 1px solid hsl(var(--border));
  display: flex;
  align-items: center;
  padding: 0 1rem;
  gap: 0.5rem;
  background: rgba(248, 250, 252, 0.8);
  backdrop-filter: blur(8px);
`;

const TrafficLight = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${p => p.color};
  transition: transform 0.2s ease;
  &:hover { transform: scale(1.2); }
`;

const AddressBar = styled.div`
  flex: 1;
  padding: 0 1rem;
  display: flex;
  justify-content: center;
`;

const AddressBarInner = styled.div`
  width: 60%;
  height: 8px;
  background: #cbd5e1;
  border-radius: 4px;
  opacity: 0.5;
`;

const ContentGrid = styled.div`
  padding: 0.75rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 0.75rem;
  height: calc(100% - 40px);
`;

// --- Screen Share Zone (code scrolling simulation) ---
const ScreenShareZone = styled.div`
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  border-radius: 8px;
  height: 100%;
  position: relative;
  overflow: hidden;
  cursor: default;
`;

const CodeContainer = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  opacity: 0.6;
`;

const CodeLines = styled.div`
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 9px;
  line-height: 1.6;
  color: #94a3b8;
  padding: 12px;
  white-space: pre;
  animation: ${codeScroll} 20s linear infinite;
`;

const ScreenShareLabel = styled.div`
  position: absolute;
  bottom: 8px;
  left: 8px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  padding: 4px 10px;
  border-radius: 6px;
  color: white;
  font-size: 10px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

// --- Participant Tiles ---
const ParticipantGrid = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 0.75rem;
`;

const ParticipantTile = styled.div`
  background: ${p => p.gradient || 'linear-gradient(135deg, #e2e8f0, #cbd5e1)'};
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OnlineIndicator = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 8px;
  height: 8px;
  background: #22c55e;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 0 6px rgba(34, 197, 94, 0.5);
`;

const ParticipantInitials = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: white;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

// --- Audio Wave (speaking indicator) ---
const AudioWave = styled.div`
  position: absolute;
  bottom: 5px;
  left: 5px;
  display: flex;
  align-items: flex-end;
  gap: 1.5px;
  height: 14px;
`;

const WaveBar = styled.div`
  width: 2.5px;
  background: white;
  border-radius: 1px;
  opacity: 0.85;
  animation: ${waveAnim} ${p => p.speed || '0.6s'} ease-in-out infinite;
  animation-delay: ${p => p.delay || '0s'};
  transform-origin: bottom;
`;

// --- Live Session Card ---
const SessionCard = styled.div`
  position: absolute;
  bottom: -16px;
  right: -16px;
  background: ${GLASS.bg};
  backdrop-filter: blur(${GLASS.blur});
  -webkit-backdrop-filter: blur(${GLASS.blur});
  padding: 1rem 1.25rem;
  border-radius: 14px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  border: 1px solid ${GLASS.border};
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 220px;
  z-index: 4;
  animation: ${floatCard} 5s ease-in-out infinite;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SessionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SessionTitle = styled.div`
  font-weight: 700;
  font-size: 0.8rem;
  color: hsl(var(--foreground));
`;

const LiveBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.7rem;
  font-weight: 700;
  color: #22c55e;
  letter-spacing: 0.02em;
`;

const LiveDot = styled.span`
  position: relative;
  display: flex;
  height: 8px;
  width: 8px;

  &::before {
    content: '';
    position: absolute;
    display: inline-flex;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    background-color: #22c55e;
    opacity: 0.75;
    animation: ${pulse} 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
  }

  &::after {
    content: '';
    position: relative;
    display: inline-flex;
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background-color: #22c55e;
  }
`;

const AvatarRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AvatarStack = styled.div`
  display: flex;
`;

const Avatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: 700;
  color: white;
  margin-left: ${p => p.$first ? '0' : '-8px'};
  background: ${p => p.bg || '#cbd5e1'};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const TimerText = styled.div`
  font-size: 0.7rem;
  color: hsl(var(--muted-foreground));
  font-weight: 600;
  font-variant-numeric: tabular-nums;
`;

const BandwidthBar = styled.div`
  height: 3px;
  width: 100%;
  background: #f1f5f9;
  border-radius: 2px;
  overflow: hidden;
`;

const BandwidthFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #22c55e, #16a34a);
  border-radius: 2px;
  animation: ${bandwidthOscillate} 4s ease-in-out infinite;
`;

const SessionStats = styled.div`
  display: flex;
  gap: 0.75rem;
  font-size: 0.7rem;
  color: hsl(var(--muted-foreground));
  font-weight: 500;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

// --- Network Badge ---
const NetworkBadge = styled.div`
  position: absolute;
  bottom: 50px;
  left: -20px;
  background: ${GLASS.bg};
  backdrop-filter: blur(${GLASS.blur});
  -webkit-backdrop-filter: blur(${GLASS.blur});
  border: 1px solid ${GLASS.border};
  padding: 0.4rem 0.9rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  color: hsl(var(--primary));
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  z-index: 2;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-3px);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

// --- FAKE CODE for screen share ---
const FAKE_CODE = `import { useState, useEffect } from 'react';
import { LiveKitRoom } from '@livekit/react';

export function MeetingRoom({ token }) {
  const [participants, setParticipants] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const room = new Room();
    room.connect(serverUrl, token);
    
    room.on('participantConnected', (p) => {
      setParticipants(prev => [...prev, p]);
    });

    return () => room.disconnect();
  }, [token]);

  const handleScreenShare = async () => {
    const stream = await navigator.mediaDevices
      .getDisplayMedia({ video: true });
    await room.localParticipant
      .publishTrack(stream.getTracks()[0]);
  };

  return (
    <div className="meeting-grid">
      {participants.map(p => (
        <VideoTile key={p.sid}
          participant={p}
          quality="HD" />
      ))}
    </div>
  );
}

// WebSocket signaling handler
function SignalingChannel(url) {
  const ws = new WebSocket(url);
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    handleSignal(data);
  };
}`;

// --- TIMER HOOK ---
const useTimer = (startSeconds = 1452) => {
  const [seconds, setSeconds] = useState(startSeconds);
  useEffect(() => {
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
};

// --- SUB-COMPONENTS ---
const SpeakingWave = memo(() => (
  <AudioWave>
    <WaveBar speed="0.5s" delay="0s" style={{ height: '60%' }} />
    <WaveBar speed="0.4s" delay="0.1s" style={{ height: '100%' }} />
    <WaveBar speed="0.55s" delay="0.05s" style={{ height: '75%' }} />
    <WaveBar speed="0.45s" delay="0.15s" style={{ height: '90%' }} />
    <WaveBar speed="0.5s" delay="0.08s" style={{ height: '50%' }} />
  </AudioWave>
));
SpeakingWave.displayName = 'SpeakingWave';

const CodeSimulation = memo(() => (
  <CodeContainer>
    <CodeLines>
      {FAKE_CODE}
      {'\n\n'}
      {FAKE_CODE}
    </CodeLines>
  </CodeContainer>
));
CodeSimulation.displayName = 'CodeSimulation';

// --- MAIN COMPONENT ---
const HeroConferenceDemo = memo(function HeroConferenceDemo() {
  const { t } = useTranslation();
  const timer = useTimer(1452);
  const containerRef = useRef(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Parallax on dot grid
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    setMouseOffset({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseOffset({ x: 0, y: 0 });
  }, []);

  return (
    <Container
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ '--parallax-x': `${mouseOffset.x}px`, '--parallax-y': `${mouseOffset.y}px` }}
    >
      {/* Dot grid with parallax */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(hsl(var(--border)) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.5,
          zIndex: 0,
          transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px)`,
          transition: 'transform 0.15s ease-out',
          willChange: 'transform',
        }}
      />

      {/* Browser Window */}
      <BrowserWindow>
        <TitleBar>
          <TrafficLight color="#ef4444" />
          <TrafficLight color="#f59e0b" />
          <TrafficLight color="#22c55e" />
          <AddressBar>
            <AddressBarInner />
          </AddressBar>
        </TitleBar>

        <ContentGrid>
          {/* Screen Share with scrolling code */}
          <ScreenShareZone>
            <CodeSimulation />
            <ScreenShareLabel>
              <Monitor size={10} />
              {t('ui.screenShare')}
            </ScreenShareLabel>
          </ScreenShareZone>

          {/* Participant tiles */}
          <ParticipantGrid>
            <ParticipantTile gradient="linear-gradient(135deg, #3b82f6, #1d4ed8)">
              <ParticipantInitials>JD</ParticipantInitials>
              <SpeakingWave />
              <OnlineIndicator />
            </ParticipantTile>
            <ParticipantTile gradient="linear-gradient(135deg, #8b5cf6, #6d28d9)">
              <ParticipantInitials>MR</ParticipantInitials>
              <OnlineIndicator />
            </ParticipantTile>
          </ParticipantGrid>
        </ContentGrid>
      </BrowserWindow>

      {/* Network Badge */}
      <NetworkBadge>
        <Globe size={14} />
        <span>{t('ui.network')}</span>
      </NetworkBadge>

      {/* Live Session Card */}
      <SessionCard>
        <SessionHeader>
          <SessionTitle>{t('ui.meeting')}</SessionTitle>
          <LiveBadge>
            <LiveDot />
            {t('ui.live')}
          </LiveBadge>
        </SessionHeader>

        <AvatarRow>
          <AvatarStack>
            <Avatar $first bg="#3b82f6">JD</Avatar>
            <Avatar bg="#ef4444">AS</Avatar>
            <Avatar bg="#10b981">MR</Avatar>
            <Avatar bg="#f1f5f9" style={{ color: '#64748b', fontSize: '9px' }}>+{t('ui.plus', '5')}</Avatar>
          </AvatarStack>
          <TimerText>{timer}</TimerText>
        </AvatarRow>

        <BandwidthBar>
          <BandwidthFill />
        </BandwidthBar>

        <SessionStats>
          <StatItem>
            <Video size={11} /> HD
          </StatItem>
          <StatItem>
            <Users size={11} /> 8
          </StatItem>
          <StatItem>
            <Wifi size={11} /> 42ms
          </StatItem>
        </SessionStats>
      </SessionCard>
    </Container>
  );
});

export default HeroConferenceDemo;
