import React, { useState, useEffect, Component } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { LiveKitRoom } from '@livekit/components-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRoomToken } from '../hooks/useMeeting';
import { useRoomProtection } from '../hooks/useRoomProtection';
import { useLiveKit4K } from '../hooks/useLiveKit4K';  // v4.0 Anti-Pixelisation
import { useSafeLayout } from '../hooks/useSafeLayout';
import { MeetingRoom } from '../components/room/MeetingRoom';
import { Video, ArrowRight, Shield, AlertTriangle, Lock, Key, Sparkles } from 'lucide-react';
import { BETA_CODES } from '../config/betaCodes';
import { useTranslation } from '../hooks/useTranslation';
import '@livekit/components-styles';

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  height: calc(var(--vh, 1vh) * 100);
  background-color: #0f172a;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  overscroll-behavior: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

class LiveKitErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorType: null };
  }

  static getDerivedStateFromError(error) {
    if (error?.message?.includes("Permission denied") || error?.name === "NotAllowedError") {
       return { hasError: true, errorType: 'permission' };
    }
    return { hasError: true, errorType: 'unknown' };
  }

  componentDidCatch(error, errorInfo) {
    console.error("LiveKit React Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.state.errorType === 'permission') {
         return <PermissionErrorFallback />;
      }
      // Fallback
      return <UnknownErrorFallback />;
    }
    return this.props.children;
  }
}

function PermissionErrorFallback() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-[100dvh] w-full items-center justify-center bg-slate-50 p-4 font-sans">
      <div className="max-w-md w-full bg-white border border-red-100 shadow-xl rounded-2xl p-8 text-center">
        <div className="mx-auto w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle size={32} />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-3">{t('room.cameraRefused')}</h2>
        <p className="text-slate-500 mb-8">
          {t('room.cameraRefusedDesc')}
        </p>
        <button onClick={() => window.location.reload()} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl py-3 transition-colors">
          {t('room.refresh')}
        </button>
      </div>
    </div>
  );
}

function UnknownErrorFallback() {
  const { t } = useTranslation();
  return (
    <div className="p-10 text-center">{t('room.unexpectedError')} <button onClick={() => window.location.reload()} className="mt-4 text-blue-500 underline">{t('room.refresh')}</button></div>
  );
}

function ActiveRoom({ roomId, participantName }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { token, error: tokenError } = useRoomToken(roomId, participantName);
  const { options: roomOptions, videoOptions } = useLiveKit4K();  // v4.0 Anti-Pixelisation

  const liveKitUrl = import.meta.env.VITE_LIVEKIT_WS_URL || import.meta.env.VITE_LIVEKIT_URL || 'ws://localhost:7880';
  const isUsableToken = typeof token === 'string' && token.length > 0 && !token.includes('mock_token_due_to_missing_keys');

  if (!token && !tokenError) {
    return (
      <div className="flex min-h-[100dvh] w-full items-center justify-center bg-slate-50 font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium tracking-wide">{t('room.preparing')}</p>
        </div>
      </div>
    );
  }

  if (!isUsableToken) {
    return (
      <div className="flex min-h-[100dvh] w-full items-center justify-center bg-slate-50 p-4 font-sans relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-red-400/10 blur-[120px] pointer-events-none" />
        <div className="relative w-full max-w-md bg-white backdrop-blur-xl border border-slate-200 shadow-2xl rounded-2xl p-8 z-10">
          <div className="mx-auto w-16 h-16 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 text-center mb-3">{t('room.connectionError')}</h2>
          <p className="text-slate-400 text-center mb-8 text-sm">
            {t('room.connectionErrorDesc')}
          </p>
          <button onClick={() => navigate('/')} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl px-4 py-3 transition-all flex items-center justify-center gap-2 border border-slate-600">
            {t('room.backHome')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <PageContainer>
      <LiveKitErrorBoundary>
        <LiveKitRoom
          token={token}
          serverUrl={liveKitUrl}
          connect={isUsableToken}
          video={videoOptions}
          audio={true}
          options={roomOptions}
          data-lk-theme="default"
          onMediaDeviceFailure={(e) => {
            console.error("LiveKit Media Device Failure (Ignored to let user enter room anyway):", e);
          }}
          onError={(e) => {
            console.error("LiveKit Room Error:", e);
          }}
          onDisconnected={() => {
            // Cleanup automatique à la déconnexion
            console.log('[Privacy] Room disconnected - cleanup done by LiveKit');
          }}
        >
          <MeetingRoom
             roomId={roomId}
             user={{ id: participantName, name: participantName }}
             onLeave={async () => {
               // Nettoyer les verrous de session avant de quitter
               try {
                 sessionStorage.removeItem('visi_cam_mute');
                 sessionStorage.removeItem('visi_mic_mute');
               } catch (e) {}
               navigate('/');
             }}
          />
        </LiveKitRoom>
      </LiveKitErrorBoundary>
    </PageContainer>
  );
}

export default function RoomPageNew() {
  const { roomId } = useParams();
  
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // Apply SafeLayout for mobile viewport fixes (--vh CSS variable)
  useSafeLayout();
  
  // 1. Protection & Auth check
  const { isAuthorized, loading: authLoading, user } = useRoomProtection(roomId);
  
  // 2. Guest state
  const [guestName, setGuestName] = useState('');
  const [betaCode, setBetaCode] = useState('');
  const [betaError, setBetaError] = useState(false);
  // Whitelist: ces identifiants bypass le code beta
  const WHITELIST = ['AidoTokihisa41'];
  const isWhitelisted = !!(
    (user?.email && WHITELIST.some(id => user.email.toLowerCase().includes(id.toLowerCase())))
    || WHITELIST.includes(user?.username)
    || WHITELIST.includes(user?.id)
  );

  const [isBetaValidated, setIsBetaValidated] = useState(isWhitelisted);

  // Auto-validate quand user se charge en async et est dans la whitelist
  useEffect(() => {
    if (isWhitelisted && !isBetaValidated) setIsBetaValidated(true);
  }, [isWhitelisted]);

  // Use the unique BETA_CODES list plus a potential env master key for the admin
  const MASTER_KEY = import.meta.env.VITE_BETA_CODE || 'VISIO-MASTER-26';

  // If loading auth
  if (authLoading) {
    return (
      <div className="flex min-h-[100dvh] w-full items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Guard: Redirect unauthorized users (if room is private and user not logged in)
  if (!isAuthorized) {
    return (
      <div className="flex min-h-[100dvh] w-full items-center justify-center bg-slate-50 p-4 font-sans relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-red-400/10 blur-[120px] pointer-events-none" />
        <div className="relative w-full max-w-md bg-white backdrop-blur-xl border border-slate-200 shadow-2xl rounded-2xl p-8 z-10">
          <div className="mx-auto w-16 h-16 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
            <Shield className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 text-center mb-3">{t('room.accessDenied')}</h2>
          <p className="text-slate-400 text-center mb-8 text-sm">
            {t('room.accessDeniedDesc')}
          </p>
          <button onClick={() => navigate('/')} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl px-4 py-3 transition-all flex items-center justify-center border border-slate-600">
            {t('room.backHome')}
          </button>
        </div>
      </div>
    );
  }

  // Determine final identity
  const participantName = user?.email || guestName;

  // We explicitly check BOTH that the beta code is validated AND the user has a name
  if (!isBetaValidated || !participantName) {
    return (
      <div className="flex w-full items-center justify-center bg-slate-50 p-4 sm:p-4 px-3 font-sans relative overflow-y-auto" style={{ minHeight: '100svh', minHeight: '100dvh' }} data-lk-theme="default">
        {/* Background blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-400/20 blur-[120px] pointer-events-none" />

        {/* Dot pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, #64748b 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="relative w-full max-w-[480px] z-10 my-4"
        >
          {/* Card */}
          <div className="bg-white border border-slate-200 shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden">

            {/* Hero header section - compact on small screens */}
            <div className="bg-blue-50 border-b border-blue-100 px-6 sm:px-10 pt-6 sm:pt-10 pb-5 sm:pb-8 relative overflow-hidden">
              {/* Decorative rings behind icon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-blue-200/40 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-blue-200/20 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full border border-blue-100/10 pointer-events-none" />

              {/* Small floating dots */}
              <div className="absolute top-6 right-12 w-2 h-2 rounded-full bg-blue-300/50" />
              <div className="absolute top-14 right-8 w-1.5 h-1.5 rounded-full bg-blue-400/30" />
              <div className="absolute bottom-8 left-12 w-1.5 h-1.5 rounded-full bg-blue-300/40" />

              <div className="relative z-10 text-center">
                {/* Beta badge */}
                <div className="inline-flex items-center gap-1.5 bg-white border border-blue-200 rounded-full px-3 py-1 mb-4 sm:mb-5 shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="text-[11px] font-bold tracking-wider text-blue-600 uppercase">Beta</span>
                </div>

                {/* Icon cluster */}
                <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-white border border-blue-200 rounded-2xl flex items-center justify-center shadow-md mb-4 sm:mb-5 relative">
                  <Lock className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
                  <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>

                <h2 className="text-[20px] sm:text-[22px] font-bold text-slate-900 mb-1 sm:mb-1.5 tracking-tight">{t('room.beta.title')}</h2>
                <p className="text-slate-500 text-[13px] sm:text-[14px] leading-relaxed max-w-[320px] mx-auto">{t('room.beta.subtitle')}</p>
              </div>
            </div>

            {/* Room ID bar */}
            <div className="bg-slate-50 border-b border-slate-100 px-6 sm:px-10 py-2.5 sm:py-3 flex items-center justify-between">
              <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">Room ID</span>
              <span className="font-mono text-blue-600 bg-white border border-slate-200 px-3 py-1 rounded-lg text-[13px] font-bold shadow-sm">#{roomId.split('-')[1] || roomId}</span>
            </div>

            {/* Form section */}
            <div className="px-6 sm:px-10 py-6 sm:py-8">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const upperCode = betaCode.trim().toUpperCase();
                  const isValid = BETA_CODES.includes(upperCode) || upperCode === MASTER_KEY;
                  if (!isValid) {
                    setBetaError(true);
                    return;
                  }
                  setBetaError(false);
                  if (!user?.email && !guestName.trim()) return;
                  setIsBetaValidated(true);
                }}
                className="space-y-4 sm:space-y-5"
              >
                {/* Beta code input */}
                <div className="space-y-2">
                  <label className="text-[11px] font-semibold tracking-widest text-slate-400 uppercase block">{t('room.beta.keyLabel')}</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Key className={`w-4 h-4 transition-colors ${betaError ? 'text-red-500' : 'text-slate-400 group-focus-within:text-blue-500'}`} />
                    </div>
                    <input
                      type="password"
                      placeholder={t('room.beta.keyPlaceholder')}
                      value={betaCode}
                      onChange={(e) => {
                        setBetaCode(e.target.value);
                        setBetaError(false);
                      }}
                      className={`w-full bg-slate-50 border text-slate-900 rounded-xl py-3 sm:py-3.5 pl-11 pr-4 placeholder-slate-400 focus:outline-none focus:bg-white transition-all text-[15px] tracking-widest uppercase font-medium ${betaError ? 'border-red-300 ring-2 ring-red-500/20' : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'}`}
                      autoFocus
                      required
                    />
                  </div>
                  <AnimatePresence>
                    {betaError && (
                      <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-red-500 font-medium ml-1 mt-1 flex items-center gap-1.5">
                        <AlertTriangle className="w-3 h-3" />
                        {t('room.beta.invalidKey')}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Guest name input */}
                {!user?.email && (
                  <div className="space-y-2">
                    <label className="text-[11px] font-semibold tracking-widest text-slate-400 uppercase block">{t('room.beta.pseudoLabel')}</label>
                    <input
                      type="text"
                      placeholder={t('room.beta.pseudoPlaceholder')}
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white text-slate-900 rounded-xl px-4 py-3 sm:py-3.5 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-[15px]"
                      required
                    />
                  </div>
                )}

                {/* Submit - always visible, sticky on mobile with keyboard */}
                <button
                  type="submit"
                  disabled={(!user?.email && !guestName.trim()) || !betaCode.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold rounded-xl px-4 py-3.5 sm:py-4 transition-all flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg disabled:shadow-none mt-2 text-[15px] group"
                >
                  <Lock className="w-4 h-4" />
                  <span>{t('room.beta.submit')}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </form>
            </div>

            {/* Footer bar */}
            <div className="bg-slate-50 border-t border-slate-100 px-6 sm:px-10 py-3 sm:py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                  <Shield className="w-3.5 h-3.5 text-blue-400" />
                  <span>{t('room.beta.e2ee')}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                  <Video className="w-3.5 h-3.5" />
                  <span>VisioConnect</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Load the active room now that we have a name and beta validated
  return (
    <ActiveRoom 
      roomId={roomId}
      participantName={participantName}
    />
  );
}
