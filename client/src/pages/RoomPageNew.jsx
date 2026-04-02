import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { LiveKitRoom } from '@livekit/components-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRoomToken } from '../hooks/useMeeting';
import { useRoomProtection } from '../hooks/useRoomProtection';
import { useLiveKit4K } from '../hooks/useLiveKit4K';
import { MeetingRoom } from '../components/room/MeetingRoom';
import { Video, ArrowRight, Shield, AlertTriangle } from 'lucide-react';
import '@livekit/components-styles';

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh; /* Fallback for browsers that do not support dvh */
  height: 100dvh;
  background-color: #f4f7fb;
  color: #1e293b;
  display: flex;
  overflow: hidden;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
`;

function ActiveRoom({ roomId, participantName }) {
  const navigate = useNavigate();
  const { token, error: tokenError } = useRoomToken(roomId, participantName);
  const { options: roomOptions, videoOptions } = useLiveKit4K();

  const liveKitUrl = import.meta.env.VITE_LIVEKIT_WS_URL || import.meta.env.VITE_LIVEKIT_URL || 'ws://localhost:7880';
  const isUsableToken = typeof token === 'string' && token.length > 0 && !token.includes('mock_token_due_to_missing_keys');

  if (!token && !tokenError) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium tracking-wide">Préparation de la salle sécurisée...</p>
        </div>
      </div>
    );
  }

  if (!isUsableToken) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 p-4 font-sans relative overflow-hidden">
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
      <LiveKitRoom
        token={token}
        serverUrl={liveKitUrl}
        connect={isUsableToken}
        video={videoOptions}
        audio={true}
        options={roomOptions}
        data-lk-theme="default"
      >
        <MeetingRoom
           roomId={roomId}
           user={{ id: participantName, name: participantName }}
           onLeave={() => navigate('/')}
        />
      </LiveKitRoom>
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
  const [hasSubmittedName, setHasSubmittedName] = useState(false);

  // Configuration of the Beta Password
  const EXPECTED_BETA_CODE = import.meta.env.VITE_BETA_CODE || 'VISIO-BETA-26';

  // If loading auth
  if (authLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Guard: Redirect unauthorized users (if room is private and user not logged in)
  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 p-4 font-sans relative overflow-hidden">
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
  const participantName = user?.email || (hasSubmittedName ? guestName : null);

  // If we don't have an identity yet, show the beautiful "PreJoin" name prompt
  if (!participantName) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 p-4 font-sans relative overflow-hidden">
        {/* Modern Background Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-300/30 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-300/20 blur-[120px] pointer-events-none" />
        
        <div className="relative w-full max-w-[420px] bg-white backdrop-blur-2xl border border-slate-200 shadow-[0_0_40px_rgba(37,99,235,0.1)] rounded-3xl p-8 z-10 transition-all duration-500">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
            <Video className="w-8 h-8 text-blue-400" />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-2 tracking-tight">Rejoindre la réunion</h2>
          <p className="text-slate-400 text-center mb-8 text-[15px] leading-relaxed">
            Vous avez été invité à la salle <br/>
            <span className="font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-md mx-1 mt-2 inline-block shadow-sm">{roomId}</span>
          </p>

          <form 
            onSubmit={(e) => { 
              e.preventDefault(); 
              if (betaCode.trim().toUpperCase() !== EXPECTED_BETA_CODE) {
                setBetaError(true);
                return;
              }
              setBetaError(false);
              if (guestName.trim()) setHasSubmittedName(true); 
            }} 
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="space-y-2 text-left">
                <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase ml-1">Code d'accès Bêta</label>
                <input
                  type="text"
                  placeholder="Entrez le code secret..."
                  value={betaCode}
                  onChange={(e) => {
                     setBetaCode(e.target.value);
                     setBetaError(false);
                  }}
                  className={`w-full bg-white border ${betaError ? 'border-red-400 ring-2 ring-red-500/20' : 'border-slate-200 hover:border-blue-400'} text-slate-900 rounded-xl px-4 py-3.5 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-[15px] shadow-sm`}
                  autoFocus
                  required
                />
                <AnimatePresence>
                  {betaError && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-500 font-medium ml-1 mt-1">
                      Code bêta incorrect !
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-2 text-left">
                <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase ml-1">Comment vous appelez-vous ?</label>
                <input
                  type="text"
                  placeholder="Ex: Jean Dupont"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-white border border-slate-200 hover:border-blue-400 text-slate-900 rounded-xl px-4 py-3.5 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-[15px] shadow-sm"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={!guestName.trim() || !betaCode.trim()}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:bg-slate-200 disabled:text-slate-400 text-white font-medium rounded-xl px-4 py-3.5 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none"
            >
              <span>Entrer dans la salle</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <Shield className="w-4 h-4" />
              <span>Chiffrement de bout en bout activé</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Load the active room now that we have a name
  return <ActiveRoom roomId={roomId} participantName={participantName} />;
}
