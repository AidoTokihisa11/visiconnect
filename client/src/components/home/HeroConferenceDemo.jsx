import React, { useState, useEffect, useRef, memo, useCallback, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { Video, Users, Mic, MicOff, Monitor, Wifi, Phone, MessageSquare, Shield, Lock } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

/* ═══════════════════════════════════════════
   DESIGN TOKENS — Blue & White
   ═══════════════════════════════════════════ */
const BLUE = {
  50: '#eff6ff',
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6',
  600: '#2563eb',
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a5f',
};

const GLASS = {
  bg: 'rgba(255,255,255,0.72)',
  bgStrong: 'rgba(255,255,255,0.85)',
  border: 'rgba(255,255,255,0.6)',
  borderSubtle: 'rgba(59,130,246,0.15)',
  shadow: '0 8px 32px rgba(0,0,0,0.08)',
  blur: '20px',
};

const PARTICIPANTS = [
  { id: 1, initials: 'JD', name: 'Julie D.', gradient: 'linear-gradient(135deg,' + '#3b82f6' + ',' + '#1d4ed8' + ')' },
  { id: 2, initials: 'MR', name: 'Marc R.', gradient: 'linear-gradient(135deg,' + '#60a5fa' + ',' + '#2563eb' + ')' },
  { id: 3, initials: 'AS', name: 'Alice S.', gradient: 'linear-gradient(135deg,#6366f1,#4f46e5)' },
  { id: 4, initials: 'TK', name: 'Tom K.', gradient: 'linear-gradient(135deg,' + '#93c5fd' + ',' + '#3b82f6' + ')' },
];

/* ═══════════════════════════════════════════
   KEYFRAMES
   ═══════════════════════════════════════════ */
const pulse = keyframes`
  0%,100%{opacity:.6;transform:scale(1)}
  50%{opacity:1;transform:scale(1.3)}
`;
const waveAnim = keyframes`
  0%,100%{transform:scaleY(.25)}
  50%{transform:scaleY(1)}
`;
const bandwidthOscillate = keyframes`
  0%{width:62%}25%{width:78%}50%{width:55%}75%{width:72%}100%{width:62%}
`;
const codeScroll = keyframes`
  0%{transform:translateY(0)}
  100%{transform:translateY(-50%)}
`;
const floatCard = keyframes`
  0%{transform:translateY(0)}50%{transform:translateY(-10px)}100%{transform:translateY(0)}
`;
const shimmer = keyframes`
  0%{background-position:-200% 0}
  100%{background-position:200% 0}
`;
const fadeSlideIn = keyframes`
  0%{opacity:0;transform:translateY(8px) scale(.96)}
  100%{opacity:1;transform:translateY(0) scale(1)}
`;
const breathe = keyframes`
  0%,100%{box-shadow:0 0 0 0 rgba(59,130,246,0.4)}
  50%{box-shadow:0 0 0 6px rgba(59,130,246,0)}
`;
const typingDots = keyframes`
  0%,80%,100%{opacity:.3}40%{opacity:1}
`;

/* ═══════════════════════════════════════════
   CONTAINER — Blue/White with guaranteed size
   ═══════════════════════════════════════════ */
const Container = styled.div`
  position: relative;
  background: linear-gradient(160deg, #eff6ff 0%, white 40%, #dbeafe 100%);
  border-radius: 20px;
  border: 1px solid #bfdbfe;
  width: 100%;
  min-height: 420px;
  aspect-ratio: 16/10;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(59,130,246,0.12), 0 0 0 1px rgba(59,130,246,0.06) inset;

  @media (max-width: 640px) {
    min-height: 320px;
    aspect-ratio: 4/3;
    border-radius: 14px;
  }
`;

const DotGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image: radial-gradient(#bfdbfe 1px, transparent 1px);
  background-size: 28px 28px;
  opacity: 0.5;
  transition: transform .2s ease-out;
  will-change: transform;
  pointer-events: none;
`;

/* Browser Chrome — White */
const BrowserWindow = styled.div`
  position: relative;
  width: 92%;
  height: 84%;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 14px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(59,130,246,0.08) inset;
  border: 1px solid rgba(255,255,255,0.6);
  overflow: hidden;
  z-index: 1;
  animation: ${fadeSlideIn} .6s ease-out both;
`;

const TitleBar = styled.div`
  height: 38px;
  border-bottom: 1px solid #dbeafe;
  display: flex;
  align-items: center;
  padding: 0 14px;
  gap: 7px;
  background: rgba(255,255,255,0.9);
`;

const TrafficLight = styled.div`
  width: 10px; height: 10px; border-radius: 50%;
  background: ${p => p.color};
  transition: transform .15s ease;
  &:hover { transform: scale(1.25); }
`;

const AddressBar = styled.div`
  flex: 1; display: flex; justify-content: center;
`;

const AddressBarInner = styled.div`
  width: 52%; height: 6px; background: #dbeafe;
  border-radius: 3px; position: relative; overflow: hidden;
  &::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(59,130,246,0.1), transparent);
    background-size: 200% 100%;
    animation: ${shimmer} 3s linear infinite;
  }
`;

const EncryptionBadge = styled.div`
  display: flex; align-items: center; gap: 4px;
  font-size: 9px; color: #2563eb; font-weight: 600;
  margin-left: auto;
`;

const ContentGrid = styled.div`
  padding: .65rem;
  display: grid;
  grid-template-columns: 5fr 2fr;
  gap: .65rem;
  height: calc(100% - 38px - 36px);
`;

/* Screen Share — dark code area */
const ScreenShareZone = styled.div`
  background: linear-gradient(145deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  border-radius: 10px; height: 100%;
  position: relative; overflow: hidden;
  border: 1px solid rgba(59,130,246,0.15);
`;

const CodeContainer = styled.div`
  position: absolute; inset: 0; overflow: hidden; opacity: .55;
`;

const CodeLines = styled.pre`
  font-family: 'JetBrains Mono','SF Mono','Fira Code',monospace;
  font-size: 9px; line-height: 1.7; padding: 14px;
  white-space: pre;
  animation: ${codeScroll} 28s linear infinite;
`;

const ScreenShareLabel = styled.div`
  position: absolute; bottom: 10px; left: 10px;
  background: rgba(0,0,0,0.55); backdrop-filter: blur(10px);
  padding: 5px 11px; border-radius: 8px;
  color: rgba(255,255,255,0.9); font-size: 9.5px; font-weight: 600;
  display: flex; align-items: center; gap: 5px;
  border: 1px solid rgba(255,255,255,0.1);
`;

const ScreenShareRec = styled.div`
  position: absolute; top: 10px; right: 10px;
  background: rgba(239,68,68,0.15); backdrop-filter: blur(10px);
  padding: 4px 10px; border-radius: 8px;
  color: #ef4444; font-size: 9px; font-weight: 700;
  display: flex; align-items: center; gap: 5px;
  border: 1px solid rgba(239,68,68,0.2);
  letter-spacing: .04em;
`;

const RecDot = styled.span`
  width: 6px; height: 6px; border-radius: 50%;
  background: #ef4444;
  animation: ${pulse} 1.2s ease-in-out infinite;
`;

const LineNumbers = styled.div`
  position: absolute; top: 0; left: 0;
  width: 30px; height: 100%;
  background: rgba(255,255,255,0.02);
  border-right: 1px solid rgba(255,255,255,0.04);
  padding: 14px 0;
  font-family: 'JetBrains Mono',monospace;
  font-size: 8px; line-height: 1.7;
  color: rgba(255,255,255,0.15);
  text-align: right; padding-right: 6px;
  overflow: hidden;
  animation: ${codeScroll} 28s linear infinite;
`;

/* Participant Tiles */
const ParticipantGrid = styled.div`
  display: grid; grid-template-rows: repeat(2, 1fr); gap: .65rem;
`;

const ParticipantTile = styled.div`
  background: ${p => p.$gradient};
  border-radius: 10px; position: relative; overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid transparent;
  transition: border-color .3s, box-shadow .3s;
  ${p => p.$speaking && `
    border-color: #60a5fa;
    box-shadow: 0 0 20px rgba(59,130,246,0.25), inset 0 0 20px rgba(59,130,246,0.08);
  `}
`;

const ParticipantInitials = styled.span`
  font-size: 17px; font-weight: 800; color: white;
  text-shadow: 0 2px 8px rgba(0,0,0,0.2);
`;

const ParticipantName = styled.div`
  position: absolute; bottom: 6px; left: 8px;
  font-size: 8.5px; font-weight: 600;
  color: rgba(255,255,255,0.9);
  text-shadow: 0 1px 4px rgba(0,0,0,0.3);
`;

const OnlineIndicator = styled.div`
  position: absolute; bottom: 6px; right: 7px;
  width: 8px; height: 8px;
  background: #60a5fa; border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.9);
  animation: ${breathe} 2s ease-in-out infinite;
`;

const MuteIcon = styled.div`
  position: absolute; top: 6px; right: 6px;
  background: rgba(0,0,0,0.35); backdrop-filter: blur(6px);
  border-radius: 50%; width: 18px; height: 18px;
  display: flex; align-items: center; justify-content: center;
`;

/* Audio Wave — Blue */
const AudioWave = styled.div`
  position: absolute; bottom: 6px; left: 8px;
  display: flex; align-items: flex-end; gap: 2px; height: 16px;
`;

const WaveBar = styled.div`
  width: 2.5px; background: #93c5fd; border-radius: 1.5px;
  animation: ${waveAnim} ${p => p.$speed} ease-in-out infinite;
  animation-delay: ${p => p.$delay};
  transform-origin: bottom;
`;

/* Floating Session Card — White Glass */
const SessionCard = styled.div`
  position: absolute; bottom: -12px; right: -12px;
  background: rgba(255,255,255,0.82);
  backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
  padding: 1rem 1.2rem; border-radius: 16px;
  box-shadow: 0 16px 48px rgba(59,130,246,0.12), 0 0 0 1px rgba(59,130,246,0.08) inset;
  border: 1px solid #bfdbfe;
  display: flex; flex-direction: column; gap: .7rem;
  min-width: 230px; z-index: 4;
  animation: ${floatCard} 6s ease-in-out infinite;
  @media (max-width: 768px) { display: none; }
`;

const SessionHeader = styled.div`
  display: flex; justify-content: space-between; align-items: center;
`;
const SessionTitle = styled.div`
  font-weight: 700; font-size: .8rem; color: #1e3a5f;
`;

const LiveBadge = styled.div`
  display: flex; align-items: center; gap: 6px;
  font-size: .68rem; font-weight: 700; color: #2563eb;
  letter-spacing: .03em;
`;

const LiveDot = styled.span`
  position: relative; display: flex; height: 8px; width: 8px;
  &::before {
    content: ''; position: absolute; display: inline-flex;
    height: 100%; width: 100%; border-radius: 50%;
    background: #3b82f6; opacity: .7;
    animation: ${pulse} 1.5s cubic-bezier(0,0,.2,1) infinite;
  }
  &::after {
    content: ''; position: relative; display: inline-flex;
    height: 8px; width: 8px; border-radius: 50%;
    background: #3b82f6;
  }
`;

const AvatarRow = styled.div`
  display: flex; align-items: center; justify-content: space-between;
`;
const AvatarStack = styled.div`display: flex;`;

const Avatar = styled.div`
  width: 28px; height: 28px; border-radius: 50%;
  border: 2px solid white;
  display: flex; align-items: center; justify-content: center;
  font-size: .6rem; font-weight: 700; color: white;
  margin-left: ${p => p.$first ? '0' : '-8px'};
  background: ${p => p.$bg};
  box-shadow: 0 2px 8px rgba(59,130,246,0.15);
  transition: transform .2s ease;
  &:hover { transform: translateY(-2px) scale(1.1); z-index: 2; }
`;

const TimerText = styled.div`
  font-size: .68rem; color: #60a5fa;
  font-weight: 600; font-variant-numeric: tabular-nums;
`;

const BandwidthBar = styled.div`
  height: 3px; width: 100%; background: #dbeafe;
  border-radius: 2px; overflow: hidden;
`;
const BandwidthFill = styled.div`
  height: 100%; border-radius: 2px;
  background: linear-gradient(90deg, #60a5fa, #2563eb);
  animation: ${bandwidthOscillate} 5s ease-in-out infinite;
`;

const SessionStats = styled.div`
  display: flex; gap: .7rem; font-size: .68rem;
  color: #60a5fa; font-weight: 500;
`;
const StatItem = styled.div`
  display: flex; align-items: center; gap: 3px;
`;

/* Network Badge */
const NetworkBadge = styled.div`
  position: absolute; bottom: 55px; left: -16px;
  background: rgba(255,255,255,0.8); backdrop-filter: blur(20px);
  border: 1px solid #bfdbfe;
  padding: .45rem 1rem; border-radius: 24px;
  font-size: .75rem; font-weight: 600; color: #2563eb;
  box-shadow: 0 8px 24px rgba(59,130,246,0.1);
  display: flex; align-items: center; gap: .45rem; z-index: 2;
  transition: transform .3s cubic-bezier(.4,0,.2,1), box-shadow .3s;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(59,130,246,0.18);
  }
  @media (max-width: 768px) { display: none; }
`;

/* Chat Toast */
const ChatToast = styled.div`
  position: absolute; top: 16px; left: -10px;
  background: rgba(255,255,255,0.85); backdrop-filter: blur(20px);
  border: 1px solid #bfdbfe;
  padding: .5rem .85rem; border-radius: 12px;
  display: flex; align-items: center; gap: .5rem; z-index: 3;
  animation: ${fadeSlideIn} .5s ease-out both;
  box-shadow: 0 8px 24px rgba(59,130,246,0.1);
  min-width: 170px;
  @media (max-width: 768px) { display: none; }
`;

const ChatAvatar = styled.div`
  width: 22px; height: 22px; border-radius: 50%;
  background: ${p => p.$bg};
  display: flex; align-items: center; justify-content: center;
  font-size: .55rem; font-weight: 700; color: white;
  flex-shrink: 0;
`;

const ChatBubble = styled.div`
  font-size: .65rem; color: #1e40af; line-height: 1.3;
`;
const ChatName = styled.span`
  font-weight: 700; color: #1e3a5f;
`;

const TypingDot = styled.span`
  display: inline-block; width: 4px; height: 4px; border-radius: 50%;
  background: #60a5fa; margin: 0 1px;
  animation: ${typingDots} 1.4s ease-in-out infinite;
  animation-delay: ${p => p.$d};
`;

/* Toolbar */
const Toolbar = styled.div`
  position: absolute; bottom: 0; left: 0; right: 0; height: 36px;
  background: rgba(255,255,255,0.7); backdrop-filter: blur(12px);
  border-top: 1px solid #dbeafe;
  display: flex; align-items: center; justify-content: center; gap: 6px;
  z-index: 5;
`;

const ToolbarBtn = styled.div`
  width: 28px; height: 28px; border-radius: 8px;
  background: ${p => p.$active ? 'rgba(239,68,68,0.1)' : '#eff6ff'};
  border: 1px solid ${p => p.$active ? 'rgba(239,68,68,0.25)' : '#bfdbfe'};
  display: flex; align-items: center; justify-content: center;
  color: ${p => p.$active ? '#ef4444' : '#3b82f6'};
  transition: all .2s; cursor: default;
  &:hover {
    background: ${p => p.$active ? 'rgba(239,68,68,0.15)' : '#dbeafe'};
    color: ${p => p.$active ? '#dc2626' : '#1d4ed8'};
  }
`;

/* Syntax-highlighted code spans */
const K = styled.span`color:#c084fc`;
const S = styled.span`color:#34d399`;
const F = styled.span`color:#60a5fa`;
const C = styled.span`color:#475569`;
const V = styled.span`color:#f9a8d4`;
const N = styled.span`color:#fbbf24`;
const T = styled.span`color:#94a3b8`;

const SyntaxCode = memo(() => (
  <CodeContainer>
    <CodeLines>
      <C>{'// VisiConnect — LiveKit WebRTC Engine\n'}</C>
      <K>import </K><T>{'{ '}</T><V>useState</V><T>{', '}</T><V>useEffect</V><T>{' } '}</T><K>from </K><S>'react'</S><T>{';\n'}</T>
      <K>import </K><T>{'{ '}</T><V>LiveKitRoom</V><T>{' } '}</T><K>from </K><S>'@livekit/react'</S><T>{';\n\n'}</T>
      <K>export function </K><F>MeetingRoom</F><T>{'({ '}</T><V>token</V><T>{', '}</T><V>serverUrl</V><T>{' }) {\n'}</T>
      <T>{'  '}</T><K>const </K><T>[</T><V>participants</V><T>{', '}</T><V>setParticipants</V><T>] = </T><F>useState</F><T>{'([]);\n'}</T>
      <T>{'  '}</T><K>const </K><T>[</T><V>quality</V><T>{', '}</T><V>setQuality</V><T>{'] = '}</T><F>useState</F><T>{'('}</T><S>'4K'</S><T>{');\n'}</T>
      <T>{'  '}</T><K>const </K><T>[</T><V>latency</V><T>{', '}</T><V>setLatency</V><T>{'] = '}</T><F>useState</F><T>{'('}</T><N>42</N><T>{');\n\n'}</T>
      <T>{'  '}</T><F>useEffect</F><T>{'(() => {\n'}</T>
      <T>{'    '}</T><K>const </K><V>room</V><T>{' = '}</T><K>new </K><F>Room</F><T>{'();\n'}</T>
      <T>{'    '}</T><V>room</V><T>.</T><F>connect</F><T>{'('}</T><V>serverUrl</V><T>{', '}</T><V>token</V><T>{');\n\n'}</T>
      <T>{'    '}</T><V>room</V><T>.</T><F>on</F><T>{'('}</T><S>'participantConnected'</S><T>{', ('}</T><V>p</V><T>{') => {\n'}</T>
      <T>{'      '}</T><F>setParticipants</F><T>{'('}</T><V>prev</V><T>{' => [...'}</T><V>prev</V><T>{', '}</T><V>p</V><T>{']);\n'}</T>
      <T>{'      '}</T><F>setLatency</F><T>{'('}</T><V>room</V><T>{'.'}</T><V>engine</V><T>{'.'}</T><V>currentRTT</V><T>{');\n'}</T>
      <T>{'    });\n\n'}</T>
      <T>{'    '}</T><K>return </K><T>{'() => '}</T><V>room</V><T>.</T><F>disconnect</F><T>{'();\n'}</T>
      <T>{'  }, ['}</T><V>token</V><T>{']);\n\n'}</T>
      <T>{'  '}</T><K>const </K><F>handleScreenShare</F><T>{' = '}</T><K>async </K><T>{'() => {\n'}</T>
      <T>{'    '}</T><K>const </K><V>stream</V><T>{' = '}</T><K>await </K><T>navigator.mediaDevices\n</T>
      <T>{'      .'}</T><F>getDisplayMedia</F><T>{'({ '}</T><V>video</V><T>{': { '}</T><V>width</V><T>{': '}</T><N>3840</N><T>{', '}</T><V>height</V><T>{': '}</T><N>2160</N><T>{' } });\n'}</T>
      <T>{'    '}</T><K>await </K><V>room</V><T>.localParticipant\n</T>
      <T>{'      .'}</T><F>publishTrack</F><T>{'('}</T><V>stream</V><T>.</T><F>getTracks</F><T>{'()[0]);\n'}</T>
      <T>{'  };\n\n'}</T>
      <T>{'  '}</T><K>return </K><T>{'(\n'}</T>
      <T>{'    <'}</T><F>div</F><T>{' className='}</T><S>"meeting-grid"</S><T>{'>\n'}</T>
      <T>{'      {'}</T><V>participants</V><T>.</T><F>map</F><T>{'('}</T><V>p</V><T>{' => (\n'}</T>
      <T>{'        <'}</T><F>VideoTile</F><T>{'\n'}</T>
      <T>{'          key={'}</T><V>p</V><T>.sid}\n</T>
      <T>{'          participant={'}</T><V>p</V><T>{'}\n'}</T>
      <T>{'          quality={'}</T><V>quality</V><T>{'}\n'}</T>
      <T>{'          latency={'}</T><V>latency</V><T>{'} />\n'}</T>
      <T>{'      ))}\n'}</T>
      <T>{'    </'}</T><F>div</F><T>{'>\n'}</T>
      <T>{'  );\n}\n\n'}</T>
      <C>{'// End-to-end encryption layer\n'}</C>
      <K>function </K><F>E2EEncryption</F><T>{'('}</T><V>room</V><T>{') {\n'}</T>
      <T>{'  '}</T><K>const </K><V>worker</V><T>{' = '}</T><K>new </K><F>Worker</F><T>{'('}</T><S>'./e2ee-worker.js'</S><T>{');\n'}</T>
      <T>{'  '}</T><V>room</V><T>.</T><F>setE2EEEnabled</F><T>{'('}</T><K>true</K><T>{', '}</T><V>worker</V><T>{');\n'}</T>
      <T>{'}\n'}</T>
    </CodeLines>
  </CodeContainer>
));
SyntaxCode.displayName = 'SyntaxCode';

/* ═══════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════ */
const useTimer = (startSeconds = 1452) => {
  const [seconds, setSeconds] = useState(startSeconds);
  useEffect(() => {
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return h + ':' + m + ':' + s;
};

const useSpeakingCycle = (count) => {
  const [speakerId, setSpeakerId] = useState(1);
  useEffect(() => {
    const id = setInterval(() => setSpeakerId(prev => (prev % count) + 1), 3500);
    return () => clearInterval(id);
  }, [count]);
  return speakerId;
};

const CHAT_MESSAGES = [
  { name: 'Julie D.', avatar: '#2563eb', initials: 'JD', text: 'La qualité 4K est incroyable !' },
  { name: 'Marc R.', avatar: '#3b82f6', initials: 'MR', text: 'Je partage mon écran...' },
  { name: 'Alice S.', avatar: '#6366f1', initials: 'AS', text: '42ms de latence, parfait.' },
  { name: 'Tom K.', avatar: '#60a5fa', initials: 'TK', text: 'Le chiffrement E2E est actif' },
];

const useChatCycle = () => {
  const [msgIdx, setMsgIdx] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let t1, t2, t3;
    const cycle = () => {
      setIsTyping(true);
      setVisible(true);
      t1 = setTimeout(() => setIsTyping(false), 1500);
      t2 = setTimeout(() => setVisible(false), 5000);
      t3 = setTimeout(() => {
        setMsgIdx(i => (i + 1) % CHAT_MESSAGES.length);
        cycle();
      }, 5500);
    };
    cycle();
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return { msg: CHAT_MESSAGES[msgIdx], isTyping, visible };
};

/* ═══════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════ */
const SpeakingWave = memo(() => (
  <AudioWave>
    {[
      { speed: '.45s', delay: '0s', h: '55%' },
      { speed: '.35s', delay: '.08s', h: '100%' },
      { speed: '.5s', delay: '.04s', h: '70%' },
      { speed: '.4s', delay: '.12s', h: '85%' },
      { speed: '.48s', delay: '.06s', h: '45%' },
    ].map((b, i) => (
      <WaveBar key={i} $speed={b.speed} $delay={b.delay} style={{ height: b.h }} />
    ))}
  </AudioWave>
));
SpeakingWave.displayName = 'SpeakingWave';

const LineNumberGutter = memo(() => {
  const lines = useMemo(() => Array.from({ length: 80 }, (_, i) => i + 1), []);
  return (
    <LineNumbers>
      {lines.map(n => <div key={n}>{n}</div>)}
      {lines.map(n => <div key={'d-' + n}>{n}</div>)}
    </LineNumbers>
  );
});
LineNumberGutter.displayName = 'LineNumberGutter';

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
const HeroConferenceDemo = memo(function HeroConferenceDemo() {
  const { t } = useTranslation();
  const timer = useTimer(1452);
  const containerRef = useRef(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const speakerId = useSpeakingCycle(PARTICIPANTS.length);
  const { msg, isTyping, visible: chatVisible } = useChatCycle();

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
    setMouseOffset({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => setMouseOffset({ x: 0, y: 0 }), []);

  return (
    <Container ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <DotGrid style={{ transform: 'translate(' + mouseOffset.x + 'px, ' + mouseOffset.y + 'px)' }} />

      <BrowserWindow>
        <TitleBar>
          <TrafficLight color="#ef4444" />
          <TrafficLight color="#f59e0b" />
          <TrafficLight color="#22c55e" />
          <AddressBar><AddressBarInner /></AddressBar>
          <EncryptionBadge><Lock size={9} /> E2EE</EncryptionBadge>
        </TitleBar>

        <ContentGrid>
          <ScreenShareZone>
            <LineNumberGutter />
            <div style={{ marginLeft: 30 }}>
              <SyntaxCode />
            </div>
            <ScreenShareLabel>
              <Monitor size={10} />
              {t('ui.screenShare') || "Partage d'écran"}
            </ScreenShareLabel>
            <ScreenShareRec><RecDot /> REC</ScreenShareRec>
          </ScreenShareZone>

          <ParticipantGrid>
            {PARTICIPANTS.slice(0, 2).map(function(p) {
              var isSpeaking = speakerId === p.id;
              return (
                <ParticipantTile key={p.id} $gradient={p.gradient} $speaking={isSpeaking}>
                  <ParticipantInitials>{p.initials}</ParticipantInitials>
                  {isSpeaking ? <SpeakingWave /> : <ParticipantName>{p.name}</ParticipantName>}
                  <OnlineIndicator />
                  {!isSpeaking && p.id !== 1 && (
                    <MuteIcon><MicOff size={9} color="rgba(255,255,255,0.7)" /></MuteIcon>
                  )}
                </ParticipantTile>
              );
            })}
          </ParticipantGrid>
        </ContentGrid>

        <Toolbar>
          <ToolbarBtn><Mic size={13} /></ToolbarBtn>
          <ToolbarBtn><Video size={13} /></ToolbarBtn>
          <ToolbarBtn><Monitor size={13} /></ToolbarBtn>
          <ToolbarBtn><MessageSquare size={13} /></ToolbarBtn>
          <ToolbarBtn><Users size={13} /></ToolbarBtn>
          <ToolbarBtn $active><Phone size={13} /></ToolbarBtn>
        </Toolbar>
      </BrowserWindow>

      <NetworkBadge>
        <Wifi size={13} />
        <span>{t('ui.network') || 'Réseau Stable'}</span>
      </NetworkBadge>

      {chatVisible && (
        <ChatToast key={msg.name + msg.text}>
          <ChatAvatar $bg={msg.avatar}>{msg.initials}</ChatAvatar>
          <ChatBubble>
            <ChatName>{msg.name}</ChatName>
            <br />
            {isTyping ? (
              <span>
                <TypingDot $d="0s" />
                <TypingDot $d=".2s" />
                <TypingDot $d=".4s" />
              </span>
            ) : msg.text}
          </ChatBubble>
        </ChatToast>
      )}

      <SessionCard>
        <SessionHeader>
          <SessionTitle>{t('ui.meeting') || 'Réunion Équipe'}</SessionTitle>
          <LiveBadge>
            <LiveDot />
            {t('ui.live') || 'LIVE'}
          </LiveBadge>
        </SessionHeader>

        <AvatarRow>
          <AvatarStack>
            {PARTICIPANTS.map(function(p, i) {
              return <Avatar key={p.id} $first={i === 0} $bg={p.gradient}>{p.initials}</Avatar>;
            })}
            <Avatar
              $bg="#dbeafe"
              style={{ color: '#3b82f6', fontSize: '8px', border: '2px dashed #93c5fd' }}
            >
              +5
            </Avatar>
          </AvatarStack>
          <TimerText>{timer}</TimerText>
        </AvatarRow>

        <BandwidthBar>
          <BandwidthFill />
        </BandwidthBar>

        <SessionStats>
          <StatItem><Video size={10} /> 4K</StatItem>
          <StatItem><Users size={10} /> 9</StatItem>
          <StatItem><Shield size={10} /> E2EE</StatItem>
          <StatItem><Wifi size={10} /> 42ms</StatItem>
        </SessionStats>
      </SessionCard>
    </Container>
  );
});

export default HeroConferenceDemo;
