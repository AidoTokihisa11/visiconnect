import React, { useState, Component } from 'react';
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
import '@livekit/components-styles';

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh; /* Fallback for browsers that do not support dvh */
  height: 100dvh;
  height: calc(var(--vh, 1vh) * 100);
  background-color: #f4f7fb;
  color: #1e293b;
  display: flex;
  overflow: hidden;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
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
         return (
           <div className="flex min-h-[100dvh] w-full items-center justify-center bg-slate-50 p-4 font-sans">
             <div className="max-w-md w-full bg-white border border-red-100 shadow-xl rounded-2xl p-8 text-center">
               <div className="mx-auto w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
                 <AlertTriangle size={32} />
               </div>
               <h2 className="text-xl font-bold text-slate-900 mb-3">Accès à la caméra refusé</h2>
               <p className="text-slate-500 mb-8">
                 VisiConnect a besoin de votre permission pour utiliser la caméra ou le microphone. Veuillez autoriser l'accès dans les paramètres de votre navigateur et rafraîchir la page.  
               </p>
               <button onClick={() => window.location.reload()} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl py-3 transition-colors">
                 Rafraîchir la page
               </button>
             </div>
           </div>
         );
      }
      // Fallback
      return <div className="p-10 text-center">Une erreur inattendue est survenue avec la visioconférence. <button onClick={() => window.location.reload()} className="mt-4 text-blue-500 underline">Rafraîchir</button></div>;
    }
    return this.props.children;
  }
}

function ActiveRoom({ roomId, participantName }) {
  const navigate = useNavigate();
  const { token, error: tokenError } = useRoomToken(roomId, participantName);
  const { options: roomOptions, videoOptions } = useLiveKit4K();  // v4.0 Anti-Pixelisation

  const liveKitUrl = import.meta.env.VITE_LIVEKIT_WS_URL || import.meta.env.VITE_LIVEKIT_URL || 'ws://localhost:7880';
  const isUsableToken = typeof token === 'string' && token.length > 0 && !token.includes('mock_token_due_to_missing_keys');

  if (!token && !tokenError) {
    return (
      <div className="flex min-h-[100dvh] w-full items-center justify-center bg-slate-50 font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium tracking-wide">Préparation de la salle sécurisée...</p>
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
          <h2 className="text-xl font-bold text-slate-900 text-center mb-3">Connexion Impossible</h2>
          <p className="text-slate-400 text-center mb-8 text-sm">
            Impossible de valider votre accès. Les clés du serveur vidéo (LiveKit) ne sont potentiellement pas configurées.
          </p>
          <button onClick={() => navigate('/')} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl px-4 py-3 transition-all flex items-center justify-center gap-2 border border-slate-600">
            Retourner à l'accueil
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
        >
          <MeetingRoom
             roomId={roomId}
             user={{ id: participantName, name: participantName }}
             onLeave={() => navigate('/')}
          />
        </LiveKitRoom>
      </LiveKitErrorBoundary>
    </PageContainer>
  );
}

export default function RoomPageNew() {
  const { roomId } = useParams();
  
  const navigate = useNavigate();
  
  // 1. Protection & Auth check
  const { isAuthorized, loading: authLoading, user } = useRoomProtection(roomId);
  
  // 2. Guest state
  const [guestName, setGuestName] = useState('');
  const [betaCode, setBetaCode] = useState('');
  const [betaError, setBetaError] = useState(false);
  const [isBetaValidated, setIsBetaValidated] = useState(false);

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
          <h2 className="text-xl font-bold text-slate-900 text-center mb-3">Accès refusé</h2>
          <p className="text-slate-400 text-center mb-8 text-sm">
            Vous devez être connecté ou invité pour rejoindre cette salle privée.
          </p>
          <button onClick={() => navigate('/')} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl px-4 py-3 transition-all flex items-center justify-center border border-slate-600">
            Retourner à l'accueil
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
      <div className="flex min-h-[100dvh] w-full items-center justify-center bg-slate-50 p-4 font-sans relative overflow-hidden" data-lk-theme="default">
        {/* Soft elegant background graphics */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-400/20 blur-[120px] pointer-events-none" />

        <div className="relative w-full max-w-[440px] bg-white border border-slate-200 shadow-2xl rounded-3xl p-10 z-10 transition-all duration-500">
          <div className="mx-auto w-20 h-20 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center mb-8 shadow-inner relative overflow-hidden">
            <Lock className="w-8 h-8 text-blue-600 relative z-10" />
            <Sparkles className="w-4 h-4 text-blue-400 absolute top-4 right-4 opacity-70" />
          </div>

          <h2 className="text-2xl font-bold text-slate-900 text-center mb-3 tracking-tight">Accès Bêta Privée</h2>
          <p className="text-slate-500 text-center mb-10 text-[15px] leading-relaxed">
            Bienvenue sur VisiConnect. Veuillez entrer votre code unique pour rejoindre la salle <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 border border-blue-100 rounded-md ml-1 shadow-sm">#{roomId.split('-')[1] || roomId}</span>.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const upperCode = betaCode.trim().toUpperCase();
              
              // Validate against the list of 100 codes OR the Master Admin key
              const isValid = BETA_CODES.includes(upperCode) || upperCode === MASTER_KEY;

              if (!isValid) {
                setBetaError(true);
                return;
              }
              setBetaError(false);
              
              if (!user?.email && !guestName.trim()) return;
              setIsBetaValidated(true);
            }}
            className="space-y-6"
          >
            <div className="space-y-5">
              <div className="space-y-2 text-left">
                <label className="text-[11px] font-semibold tracking-widest text-slate-400 uppercase ml-1 block">Clé d'autorisation</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Key className={`w-5 h-5 ${betaError ? 'text-red-500' : 'text-slate-400'}`} />
                  </div>
                  <input
                    type="password"
                    placeholder="Entrez le code..."
                    value={betaCode}
                    onChange={(e) => {
                       setBetaCode(e.target.value);
                       setBetaError(false);
                    }}
                    className={`w-full bg-white border ${betaError ? 'border-red-300 ring-2 ring-red-500/20' : 'border-slate-200 focus:border-blue-500'} text-slate-900 rounded-xl py-3.5 pl-12 pr-4 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-[15px] shadow-sm tracking-widest uppercase font-medium`}
                    autoFocus
                    required
                  />
                </div>
                <AnimatePresence>
                  {betaError && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-500 font-medium ml-1 mt-2">
                      Ce code d'accès est invalide.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {!user?.email && (
                <div className="space-y-2 text-left">
                  <label className="text-[11px] font-semibold tracking-widest text-slate-400 uppercase ml-1 block">Votre pseudo</label>
                  <input
                    type="text"
                    placeholder="Ex: Jean Dupont"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-white border border-slate-200 focus:border-blue-500 text-slate-900 rounded-xl px-4 py-3.5 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-[15px] shadow-sm"
                    required
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={(!user?.email && !guestName.trim()) || !betaCode.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:bg-slate-200 disabled:text-slate-400 text-white font-medium rounded-xl px-4 py-4 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none mt-4 text-[15px]"
            >
              <span>Déverrouiller et Rejoindre</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-slate-100 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
              <Shield className="w-4 h-4 text-slate-400" />
              <span>Protégé par cryptage de bout en bout (E2EE)</span>
            </div>
          </div>
        </div>
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
