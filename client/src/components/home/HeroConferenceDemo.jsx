import React, { useState, useEffect, useRef, memo, useCallback, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { Video, Users, Globe, Mic, MicOff, Monitor, Wifi, Phone, MessageSquare, Shield, Lock } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

/* ═══════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════ */
const GLASS = {
  bg: 'rgba(255,255,255,0.06)',
  bgLight: 'rgba(255,255,255,0.10)',
  border: 'rgba(255,255,255,0.12)',
  borderLight: 'rgba(255,255,255,0.18)',
  shadow: '0 8px 32px rgba(0,0,0,0.25)',
  blur: '20px',
};

const PARTICIPANTS = [
  { id: 1, initials: 'JD', name: 'Julie D.', gradient: 'linear-gradient(135deg,#3b82f6,#1d4ed8)', speaking: true },
  { id: 2, initials: 'MR', name: 'Marc R.', gradient: 'linear-gradient(135deg,#8b5cf6,#6d28d9)', speaking: false },
  { id: 3, initials: 'AS', name: 'Alice S.', gradient: 'linear-gradient(135deg,#ef4444,#dc2626)', speaking: false },
  { id: 4, initials: 'TK', name: 'Tom K.', gradient: 'linear-gradient(135deg,#10b981,#059669)', speaking: false },
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
  0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,0.4)}
  50%{box-shadow:0 0 0 6px rgba(34,197,94,0)}
`;
const typingDots = keyframes`
  0%,80%,100%{opacity:.3}40%{opacity:1}
`;

/* ═══════════════════════════════════════════
   STYLED COMPONENTS — Container & Grid
   ═══════════════════════════════════════════ */
const Container = styled.div`
  position:relative;
  background:linear-gradient(160deg,#0c0f1a 0%,#131832 40%,#0f172a 100%);
  border-radius:20px;
  border:1px solid rgba(255,255,255,0.08);
  aspect-ratio:16/10;
  display:flex;align-items:center;justify-content:center;
  overflow:hidden;
  box-shadow:0 24px 64px rgba(0,0,0,0.35),0 0 0 1px rgba(255,255,255,0.05) inset;

  @media(max-width:640px){aspect-ratio:4/3;border-radius:14px}
`;

const DotGrid = styled.div`
  position:absolute;inset:0;
  background-image:radial-gradient(rgba(255,255,255,0.08) 1px,transparent 1px);
  background-size:28px 28px;
  transition:transform .2s ease-out;
  will-change:transform;pointer-events:none;
`;

/* Browser Chrome */
const BrowserWindow = styled.div`
  position:relative;
  width:92%;height:84%;
  background:${GLASS.bg};
  backdrop-filter:blur(${GLASS.blur});-webkit-backdrop-filter:blur(${GLASS.blur});
  border-radius:14px;
  box-shadow:${GLASS.shadow};
  border:1px solid ${GLASS.border};
  overflow:hidden;z-index:1;
  animation:${fadeSlideIn} .6s ease-out both;
`;

const TitleBar = styled.div`
  height:38px;
  border-bottom:1px solid rgba(255,255,255,0.08);
  display:flex;align-items:center;padding:0 14px;gap:7px;
  background:rgba(255,255,255,0.03);
`;

const TrafficLight = styled.div`
  width:10px;height:10px;border-radius:50%;
  background:${p => p.color};
  transition:transform .15s ease,filter .15s ease;
  &:hover{transform:scale(1.25);filter:brightness(1.2)}
`;

const AddressBar = styled.div`
  flex:1;display:flex;justify-content:center;
`;

const AddressBarInner = styled.div`
  width:52%;height:6px;background:rgba(255,255,255,0.08);
  border-radius:3px;position:relative;overflow:hidden;
  &::after{
    content:'';position:absolute;inset:0;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent);
    background-size:200% 100%;animation:${shimmer} 3s linear infinite;
  }
`;

const EncryptionBadge = styled.div`
  display:flex;align-items:center;gap:4px;
  font-size:9px;color:rgba(34,197,94,0.8);font-weight:600;
  margin-left:auto;
`;

const ContentGrid = styled.div`
  padding:.65rem;
  display:grid;grid-template-columns:5fr 2fr;gap:.65rem;
  height:calc(100% - 38px);
`;

/* ═══════════════════════════════════════════
   Screen Share Zone
   ═══════════════════════════════════════════ */
const ScreenShareZone = styled.div`
  background:linear-gradient(145deg,#080c1a 0%,#111827 50%,#0d1117 100%);
  border-radius:10px;height:100%;position:relative;overflow:hidden;
  border:1px solid rgba(255,255,255,0.06);
`;

const CodeContainer = styled.div`
  position:absolute;inset:0;overflow:hidden;opacity:.55;
`;

const CodeLines = styled.pre`
  font-family:'JetBrains Mono','SF Mono','Fira Code',monospace;
  font-size:9px;line-height:1.7;padding:14px;
  white-space:pre;animation:${codeScroll} 28s linear infinite;
`;

const ScreenShareLabel = styled.div`
  position:absolute;bottom:10px;left:10px;
  background:rgba(0,0,0,0.6);backdrop-filter:blur(10px);
  padding:5px 11px;border-radius:8px;
  color:rgba(255,255,255,0.9);font-size:9.5px;font-weight:600;
  display:flex;align-items:center;gap:5px;
  border:1px solid rgba(255,255,255,0.08);
`;

const ScreenShareRec = styled.div`
  position:absolute;top:10px;right:10px;
  background:rgba(239,68,68,0.15);backdrop-filter:blur(10px);
  padding:4px 10px;border-radius:8px;
  color:#ef4444;font-size:9px;font-weight:700;
  display:flex;align-items:center;gap:5px;
  border:1px solid rgba(239,68,68,0.2);
  letter-spacing:.04em;
`;

const RecDot = styled.span`
  width:6px;height:6px;border-radius:50%;background:#ef4444;
  animation:${pulse} 1.2s ease-in-out infinite;
`;

/* Line numbers gutter */
const LineNumbers = styled.div`
  position:absolute;top:0;left:0;width:30px;height:100%;
  background:rgba(255,255,255,0.02);border-right:1px solid rgba(255,255,255,0.04);
  padding:14px 0;font-family:'JetBrains Mono',monospace;
  font-size:8px;line-height:1.7;color:rgba(255,255,255,0.15);
  text-align:right;padding-right:6px;overflow:hidden;
  animation:${codeScroll} 28s linear infinite;
`;

/* ═══════════════════════════════════════════
   Participant Tiles
   ═══════════════════════════════════════════ */
const ParticipantGrid = styled.div`
  display:grid;grid-template-rows:repeat(2,1fr);gap:.65rem;
`;

const ParticipantTile = styled.div`
  background:${p => p.$gradient};
  border-radius:10px;position:relative;overflow:hidden;
  display:flex;align-items:center;justify-content:center;
  border:1px solid rgba(255,255,255,0.1);
  transition:border-color .3s,box-shadow .3s;
  ${p => p.$speaking && `
    border-color:rgba(34,197,94,0.5);
    box-shadow:0 0 16px rgba(34,197,94,0.15),inset 0 0 20px rgba(34,197,94,0.05);
  `}
`;

const ParticipantInitials = styled.span`
  font-size:17px;font-weight:800;color:white;
  text-shadow:0 2px 8px rgba(0,0,0,0.3);
  letter-spacing:.02em;
`;

const ParticipantName = styled.div`
  position:absolute;bottom:6px;left:8px;
  font-size:8.5px;font-weight:600;color:rgba(255,255,255,0.85);
  text-shadow:0 1px 4px rgba(0,0,0,0.4);
`;

const OnlineIndicator = styled.div`
  position:absolute;bottom:6px;right:7px;
  width:8px;height:8px;background:#22c55e;border-radius:50%;
  border:2px solid rgba(255,255,255,0.9);
  animation:${breathe} 2s ease-in-out infinite;
`;

const MuteIcon = styled.div`
  position:absolute;top:6px;right:6px;
  background:rgba(0,0,0,0.5);backdrop-filter:blur(6px);
  border-radius:50%;width:18px;height:18px;
  display:flex;align-items:center;justify-content:center;
`;

/* ═══════════════════════════════════════════
   Audio Wave
   ═══════════════════════════════════════════ */
const AudioWave = styled.div`
  position:absolute;bottom:6px;left:8px;
  display:flex;align-items:flex-end;gap:2px;height:16px;
`;

const WaveBar = styled.div`
  width:2.5px;background:rgba(34,197,94,0.9);border-radius:1.5px;
  animation:${waveAnim} ${p => p.$speed} ease-in-out infinite;
  animation-delay:${p => p.$delay};
  transform-origin:bottom;
`;

/* ═══════════════════════════════════════════
   Floating Session Card (Glassmorphism)
   ═══════════════════════════════════════════ */
const SessionCard = styled.div`
  position:absolute;bottom:-12px;right:-12px;
  background:rgba(15,23,42,0.65);
  backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
  padding:1rem 1.2rem;border-radius:16px;
  box-shadow:0 16px 48px rgba(0,0,0,0.3),0 0 0 1px rgba(255,255,255,0.08) inset;
  border:1px solid rgba(255,255,255,0.1);
  display:flex;flex-direction:column;gap:.7rem;
  min-width:230px;z-index:4;
  animation:${floatCard} 6s ease-in-out infinite;

  @media(max-width:768px){display:none}
`;

const SessionHeader = styled.div`display:flex;justify-content:space-between;align-items:center`;
const SessionTitle = styled.div`font-weight:700;font-size:.8rem;color:rgba(255,255,255,0.92)`;

const LiveBadge = styled.div`
  display:flex;align-items:center;gap:6px;
  font-size:.68rem;font-weight:700;color:#22c55e;letter-spacing:.03em;
`;

const LiveDot = styled.span`
  position:relative;display:flex;height:8px;width:8px;
  &::before{
    content:'';position:absolute;display:inline-flex;
    height:100%;width:100%;border-radius:50%;
    background:#22c55e;opacity:.7;
    animation:${pulse} 1.5s cubic-bezier(0,0,.2,1) infinite;
  }
  &::after{
    content:'';position:relative;display:inline-flex;
    height:8px;width:8px;border-radius:50%;background:#22c55e;
  }
`;

const AvatarRow = styled.div`display:flex;align-items:center;justify-content:space-between`;
const AvatarStack = styled.div`display:flex`;

const Avatar = styled.div`
  width:28px;height:28px;border-radius:50%;
  border:2px solid rgba(15,23,42,0.8);
  display:flex;align-items:center;justify-content:center;
  font-size:.6rem;font-weight:700;color:white;
  margin-left:${p => p.$first ? '0' : '-8px'};
  background:${p => p.$bg};
  box-shadow:0 2px 8px rgba(0,0,0,0.2);
  transition:transform .2s ease;
  &:hover{transform:translateY(-2px) scale(1.1);z-index:2}
`;

const TimerText = styled.div`
  font-size:.68rem;color:rgba(255,255,255,0.55);
  font-weight:600;font-variant-numeric:tabular-nums;
`;

const BandwidthBar = styled.div`
  height:3px;width:100%;background:rgba(255,255,255,0.08);
  border-radius:2px;overflow:hidden;
`;

const BandwidthFill = styled.div`
  height:100%;border-radius:2px;
  background:linear-gradient(90deg,#22c55e,#3b82f6);
  animation:${bandwidthOscillate} 5s ease-in-out infinite;
`;

const SessionStats = styled.div`
  display:flex;gap:.7rem;font-size:.68rem;
  color:rgba(255,255,255,0.45);font-weight:500;
`;

const StatItem = styled.div`display:flex;align-items:center;gap:3px`;

/* ═══════════════════════════════════════════
   Network Badge (floating left)
   ═══════════════════════════════════════════ */
const NetworkBadge = styled.div`
  position:absolute;bottom:55px;left:-16px;
  background:rgba(15,23,42,0.6);backdrop-filter:blur(20px);
  border:1px solid rgba(255,255,255,0.1);
  padding:.45rem 1rem;border-radius:24px;
  font-size:.75rem;font-weight:600;color:rgba(59,130,246,0.9);
  box-shadow:0 8px 24px rgba(0,0,0,0.2);
  display:flex;align-items:center;gap:.45rem;z-index:2;
  transition:transform .3s cubic-bezier(.4,0,.2,1),box-shadow .3s;
  &:hover{transform:translateY(-3px);box-shadow:0 12px 32px rgba(59,130,246,0.15)}

  @media(max-width:768px){display:none}
`;

/* Chat Toast (floating top-left) */
const ChatToast = styled.div`
  position:absolute;top:16px;left:-10px;
  background:rgba(15,23,42,0.65);backdrop-filter:blur(20px);
  border:1px solid rgba(255,255,255,0.1);
  padding:.5rem .85rem;border-radius:12px;
  display:flex;align-items:center;gap:.5rem;z-index:3;
  animation:${fadeSlideIn} .5s ease-out both;
  box-shadow:0 8px 24px rgba(0,0,0,0.2);
  min-width:170px;

  @media(max-width:768px){display:none}
`;

const ChatAvatar = styled.div`
  width:22px;height:22px;border-radius:50%;
  background:${p => p.$bg};display:flex;align-items:center;
  justify-content:center;font-size:.55rem;font-weight:700;color:white;
  flex-shrink:0;
`;

const ChatBubble = styled.div`
  font-size:.65rem;color:rgba(255,255,255,0.7);line-height:1.3;
`;

const ChatName = styled.span`font-weight:700;color:rgba(255,255,255,0.9)`;

const TypingDot = styled.span`
  display:inline-block;width:4px;height:4px;border-radius:50%;
  background:rgba(255,255,255,0.5);margin:0 1px;
  animation:${typingDots} 1.4s ease-in-out infinite;
  animation-delay:${p => p.$d};
`;

/* Toolbar (bottom of browser) */
const Toolbar = styled.div`
  position:absolute;bottom:0;left:0;right:0;height:36px;
  background:rgba(0,0,0,0.3);backdrop-filter:blur(12px);
  border-top:1px solid rgba(255,255,255,0.06);
  display:flex;align-items:center;justify-content:center;gap:6px;
  z-index:5;
`;

const ToolbarBtn = styled.div`
  width:28px;height:28px;border-radius:8px;
  background:${p => p.$active ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.06)'};
  border:1px solid ${p => p.$active ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.08)'};
  display:flex;align-items:center;justify-content:center;
  color:${p => p.$active ? '#ef4444' : 'rgba(255,255,255,0.6)'};
  transition:all .2s;cursor:default;
  &:hover{background:rgba(255,255,255,0.1);color:white}
`;

/* ═══════════════════════════════════════════
   FAKE CODE (syntax-highlighted via spans)
   ═══════════════════════════════════════════ */
const K = styled.span`color:#c084fc`; // keyword purple
const S = styled.span`color:#34d399`; // string green
const F = styled.span`color:#60a5fa`; // function blue
const C = styled.span`color:#475569`; // comment
const V = styled.span`color:#f9a8d4`; // variable pink
const N = styled.span`color:#fbbf24`; // number yellow
const T = styled.span`color:#94a3b8`; // default text

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
      <T>{'    '}</T><K>const </K><V>stream</V><T>{' = '}</T><K>await </K><T>navigator.mediaDevices\n'}</T>
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
   TIMER HOOK
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
  return `${h}:${m}:${s}`;
};

/* ═══════════════════════════════════════════
   SPEAKING CYCLE HOOK
   ═══════════════════════════════════════════ */
const useSpeakingCycle = (participantCount) => {
  const [speakerId, setSpeakerId] = useState(1);
  useEffect(() => {
    const id = setInterval(() => {
      setSpeakerId(prev => (prev % participantCount) + 1);
    }, 3500);
    return () => clearInterval(id);
  }, [participantCount]);
  return speakerId;
};

/* ═══════════════════════════════════════════
   CHAT MESSAGES HOOK
   ═══════════════════════════════════════════ */
const CHAT_MESSAGES = [
  { name: 'Julie D.', avatar: '#3b82f6', initials: 'JD', text: 'La qualité 4K est incroyable !' },
  { name: 'Marc R.', avatar: '#8b5cf6', initials: 'MR', text: 'Je partage mon écran...' },
  { name: 'Alice S.', avatar: '#ef4444', initials: 'AS', text: '42ms de latence, parfait.' },
  { name: 'Tom K.', avatar: '#10b981', initials: 'TK', text: 'Le chiffrement E2E est actif ✓' },
];

const useChatCycle = () => {
  const [msgIdx, setMsgIdx] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let t1, t2, t3;
    const cycle = () => {
      setIsTyping(true); setVisible(true);
      t1 = setTimeout(() => {
        setIsTyping(false);
      }, 1500);
      t2 = setTimeout(() => {
        setVisible(false);
      }, 5000);
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
      { speed: '.5s',  delay: '.04s', h: '70%' },
      { speed: '.4s',  delay: '.12s', h: '85%' },
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
      {lines.map(n => <div key={`d-${n}`}>{n}</div>)}
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

  const handleMouseLeave = useCallback(() => {
    setMouseOffset({ x: 0, y: 0 });
  }, []);

  return (
    <Container
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Parallax dot grid */}
      <DotGrid style={{ transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px)` }} />

      {/* Browser Window */}
      <BrowserWindow>
        <TitleBar>
          <TrafficLight color="#ef4444" />
          <TrafficLight color="#f59e0b" />
          <TrafficLight color="#22c55e" />
          <AddressBar><AddressBarInner /></AddressBar>
          <EncryptionBadge>
            <Lock size={9} />
            E2EE
          </EncryptionBadge>
        </TitleBar>

        <ContentGrid>
          {/* Screen Share — syntax-highlighted code */}
          <ScreenShareZone>
            <LineNumberGutter />
            <div style={{ marginLeft: 30 }}>
              <SyntaxCode />
            </div>
            <ScreenShareLabel>
              <Monitor size={10} />
              {t('ui.screenShare') || 'Partage d\'écran'}
            </ScreenShareLabel>
            <ScreenShareRec>
              <RecDot />
              REC
            </ScreenShareRec>
          </ScreenShareZone>

          {/* Participant grid */}
          <ParticipantGrid>
            {PARTICIPANTS.slice(0, 2).map(p => {
              const isSpeaking = speakerId === p.id;
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

        {/* Bottom toolbar */}
        <Toolbar>
          <ToolbarBtn><Mic size={13} /></ToolbarBtn>
          <ToolbarBtn><Video size={13} /></ToolbarBtn>
          <ToolbarBtn><Monitor size={13} /></ToolbarBtn>
          <ToolbarBtn><MessageSquare size={13} /></ToolbarBtn>
          <ToolbarBtn><Users size={13} /></ToolbarBtn>
          <ToolbarBtn $active><Phone size={13} /></ToolbarBtn>
        </Toolbar>
      </BrowserWindow>

      {/* Floating Network Badge */}
      <NetworkBadge>
        <Wifi size={13} />
        <span>{t('ui.network') || 'Réseau Stable'}</span>
      </NetworkBadge>

      {/* Floating Chat Toast */}
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

      {/* Floating Live Session Card */}
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
            {PARTICIPANTS.map((p, i) => (
              <Avatar key={p.id} $first={i === 0} $bg={p.gradient}>
                {p.initials}
              </Avatar>
            ))}
            <Avatar $bg="rgba(255,255,255,0.08)" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '8px', border: '2px dashed rgba(255,255,255,0.15)' }}>
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
