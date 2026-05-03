import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSafeLayout } from '../hooks/useSafeLayout';
import {
  Sparkles, Users, CheckCircle2, ArrowLeft, Send,
  Loader2, AlertCircle, Mic, MicOff, Video, VideoOff,
  Monitor, MessageSquare, Shield, Wifi, ChevronRight,
} from 'lucide-react';

/* ─── Data ─────────────────────────────────────────────────────── */
const PROFILES = [
  { value: '', label: 'Votre profil…', disabled: true },
  { value: 'student', label: 'Étudiant(e)' },
  { value: 'developer', label: 'Développeur / Tech' },
  { value: 'designer', label: 'Designer / Créatif' },
  { value: 'manager', label: 'Manager / Chef de projet' },
  { value: 'freelance', label: 'Freelance / Auto-entrepreneur' },
  { value: 'other', label: 'Autre' },
];

const USAGES = [
  { value: '', label: 'Usage principal…', disabled: true },
  { value: 'personal', label: 'Appels personnels' },
  { value: 'professional', label: 'Réunions professionnelles' },
  { value: 'team', label: 'Travail en équipe' },
  { value: 'education', label: 'Cours / Formation en ligne' },
];

const TOOLS = ['Zoom', 'Google Meet', 'Teams', 'Discord', 'Whereby', 'Skype'];

const STATS = [
  { value: '22', label: 'bêta-testeurs Vague 1' },
  { value: '47+', label: 'bugs corrigés' },
  { value: '15', label: 'places disponibles' },
  { value: '100%', label: 'sélection manuelle' },
];

const PARTICIPANTS = [
  { initials: 'MR', name: 'Marie R.', color: 'from-blue-500 to-blue-700', active: true },
  { initials: 'TG', name: 'Théo G.', color: 'from-indigo-500 to-blue-600', active: true, speaking: true },
  { initials: 'AL', name: 'Alice L.', color: 'from-blue-400 to-cyan-500', active: false },
  { initials: 'JD', name: 'Julie D.', color: 'from-violet-500 to-indigo-600', active: true },
];

/* ─── Animated conference mockup ───────────────────────────────── */
function ConferenceMockup() {
  const [speakingIdx, setSpeakingIdx] = useState(1);
  const [time, setTime] = useState('00:00');
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeakingIdx(i => (i === 3 ? 0 : i + 1));
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => {
        const next = s + 1;
        const m = String(Math.floor(next / 60)).padStart(2, '0');
        const sec = String(next % 60).padStart(2, '0');
        setTime(`${m}:${sec}`);
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        background: 'linear-gradient(160deg,#0f172a 0%,#1e3a5f 100%)',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 40px 80px rgba(15,23,42,0.35), 0 0 0 1px rgba(255,255,255,0.08)',
        fontFamily: 'inherit',
      }}
    >
      {/* Browser chrome */}
      <div style={{ background: '#1e293b', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {['#ef4444','#f59e0b','#22c55e'].map(c => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.8 }} />
          ))}
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 6, padding: '3px 14px', display: 'flex', alignItems: 'center', gap: 5 }}>
            <Shield size={9} color='#60a5fa' />
            <span style={{ fontSize: 10, color: '#94a3b8', letterSpacing: '0.02em' }}>visioconnect.pro/room/beta-session</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
          <span style={{ fontSize: 10, color: '#64748b', fontVariantNumeric: 'tabular-nums' }}>{time}</span>
        </div>
      </div>

      {/* Video grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, padding: 3, background: '#0f172a' }}>
        {PARTICIPANTS.map((p, i) => {
          const isSpeaking = i === speakingIdx;
          return (
            <motion.div
              key={p.initials}
              animate={{ boxShadow: isSpeaking ? '0 0 0 2.5px #3b82f6, inset 0 0 0 1px rgba(59,130,246,0.2)' : '0 0 0 0px transparent' }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'relative',
                aspectRatio: '16/10',
                borderRadius: 12,
                background: `linear-gradient(145deg, #1e2d4a, #0f1a2e)`,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Avatar gradient bg */}
              <div style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(circle at 60% 40%, rgba(37,99,235,0.18), transparent 60%)`,
              }} />
              {/* Avatar */}
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: `linear-gradient(135deg, ${p.color.replace('from-','').replace(' to-','#').split('from-')[1] || '#2563eb'}, #1d4ed8)`,
                backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 700, color: 'white',
                boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                zIndex: 1,
              }}
              className={`bg-gradient-to-br ${p.color}`}
              >
                {p.initials}
              </div>
              {/* Name tag */}
              <div style={{
                position: 'absolute', bottom: 7, left: 7,
                background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)',
                borderRadius: 6, padding: '2px 7px',
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                <span style={{ fontSize: 9, color: '#e2e8f0', fontWeight: 500 }}>{p.name}</span>
                {isSpeaking && (
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    style={{ display: 'flex', gap: 1.5, alignItems: 'center' }}
                  >
                    {[1,2,3].map(b => (
                      <motion.div
                        key={b}
                        animate={{ scaleY: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.5, delay: b * 0.1, repeat: Infinity }}
                        style={{ width: 2, height: 8, borderRadius: 1, background: '#60a5fa', transformOrigin: 'bottom' }}
                      />
                    ))}
                  </motion.div>
                )}
              </div>
              {/* Mic icon */}
              <div style={{
                position: 'absolute', bottom: 7, right: 7,
                background: p.active ? 'rgba(37,99,235,0.35)' : 'rgba(239,68,68,0.3)',
                borderRadius: 5, padding: 3,
              }}>
                {p.active
                  ? <Mic size={8} color='#93c5fd' />
                  : <MicOff size={8} color='#fca5a5' />
                }
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom toolbar */}
      <div style={{ background: '#0f172a', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        {[
          { icon: Mic, label: 'Micro', on: true },
          { icon: Video, label: 'Caméra', on: true },
          { icon: Monitor, label: 'Partager', on: false },
          { icon: MessageSquare, label: 'Chat', on: false },
        ].map(({ icon: Icon, label, on }) => (
          <button key={label} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            background: on ? 'rgba(37,99,235,0.2)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${on ? 'rgba(59,130,246,0.35)' : 'rgba(255,255,255,0.07)'}`,
            borderRadius: 8, padding: '6px 10px', cursor: 'default',
          }}>
            <Icon size={12} color={on ? '#93c5fd' : '#64748b'} />
            <span style={{ fontSize: 8, color: on ? '#93c5fd' : '#64748b', fontWeight: 500 }}>{label}</span>
          </button>
        ))}
        <button style={{
          marginLeft: 6,
          background: 'rgba(239,68,68,0.15)',
          border: '1px solid rgba(239,68,68,0.3)',
          borderRadius: 8, padding: '6px 14px', cursor: 'default',
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
          <span style={{ fontSize: 9, color: '#fca5a5', fontWeight: 600 }}>Quitter</span>
        </button>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
          <Wifi size={10} color='#22c55e' />
          <span style={{ fontSize: 9, color: '#4ade80' }}>HD · 42ms</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Input helpers ─────────────────────────────────────────────── */
const inputBase = 'w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-150 focus:ring-2';
const inputNormal = 'border-slate-200 focus:border-blue-400 focus:ring-blue-100';
const inputError  = 'border-red-300 focus:border-red-400 focus:ring-red-100';

/* ─── Page ──────────────────────────────────────────────────────── */
export default function RoomPageNew() {
  const navigate = useNavigate();
  useSafeLayout();

  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', profile: '', usage: '', tools: [], motivation: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const update = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) setFieldErrors(prev => ({ ...prev, [field]: null }));
  };

  const toggleTool = (tool) => setForm(prev => ({
    ...prev,
    tools: prev.tools.includes(tool) ? prev.tools.filter(t => t !== tool) : [...prev.tools, tool],
  }));

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Champ requis';
    if (!form.lastName.trim())  e.lastName  = 'Champ requis';
    if (!form.email.trim()) {
      e.email = 'Email requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      e.email = 'Adresse email invalide';
    }
    if (!form.profile) e.profile = 'Sélectionnez un profil';
    if (!form.usage)   e.usage   = 'Sélectionnez un usage';
    if (form.motivation.trim().length < 40) e.motivation = 'Minimum 40 caractères';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setFieldErrors(errs); return; }
    setFieldErrors({});
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/beta-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, firstName: form.firstName.trim(), lastName: form.lastName.trim(), email: form.email.trim().toLowerCase(), motivation: form.motivation.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur inattendue, veuillez réessayer.');
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const ic = (field) => `${inputBase} ${fieldErrors[field] ? inputError : inputNormal}`;
  const motLen = form.motivation.length;

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden font-sans" style={{ background: 'linear-gradient(180deg,#eff6ff 0%,#f1f8ff 30%,#f8fbff 60%,#ffffff 100%)' }}>

      {/* ── Ambient blobs ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-32 -top-16 h-[500px] w-[500px] rounded-full" style={{ background: 'radial-gradient(circle,rgba(147,197,253,0.22),transparent 70%)' }} />
        <div className="absolute -right-24 top-1/4 h-[420px] w-[420px] rounded-full" style={{ background: 'radial-gradient(circle,rgba(186,230,253,0.18),transparent 70%)' }} />
        <div className="absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full" style={{ background: 'radial-gradient(circle,rgba(199,210,254,0.20),transparent 70%)' }} />
        <div className="absolute inset-0 opacity-[0.028]" style={{ backgroundImage: 'radial-gradient(#2563eb 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 pb-20 pt-12 sm:px-6">

        {/* ══════════════════════════════════
            SUCCESS STATE
        ══════════════════════════════════ */}
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center py-16 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
                className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 ring-8 ring-green-50"
              >
                <CheckCircle2 className="h-10 w-10 text-green-500" />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.4 }}>
                <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">Candidature envoyée !</h1>
                <p className="mx-auto mt-5 max-w-md text-[16px] leading-7 text-slate-600">
                  Merci <strong>{form.firstName}</strong>. J'ai bien reçu ta candidature et un email de confirmation est parti sur <strong>{form.email}</strong>.
                </p>
                <p className="mx-auto mt-3 max-w-sm text-sm text-slate-400">
                  Je lis chaque candidature personnellement. Si tu es sélectionné(e), je te recontacte dans les prochains jours.
                </p>
                <button onClick={() => navigate('/')} className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5 hover:bg-blue-700">
                  <ArrowLeft className="h-4 w-4" /> Retour à l'accueil
                </button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>

              {/* ══════════════════════════════════
                  HERO — badge + title + subtitle
              ══════════════════════════════════ */}
              <div className="mb-14 text-center">
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.25em] text-blue-600 shadow-sm backdrop-blur"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
                  </span>
                  Vague 2 · Candidatures ouvertes
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.07 }}
                  className="text-[2.8rem] font-extrabold leading-[1.08] tracking-[-0.04em] text-slate-950 sm:text-[3.6rem]"
                >
                  La Vague 1 est terminée.
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                    Rejoins la Vague 2.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.14 }}
                  className="mx-auto mt-5 max-w-xl text-[16px] leading-[1.8] text-slate-500 sm:text-[17px]"
                >
                  Honnêtement, je ne m'attendais pas à des retours aussi concrets dès la première vague. 
                  Bugs remontés, comportements instables identifiés, sessions de test menées sérieusement — 
                  ça a changé beaucoup de choses dans l'app. Je cherche 15 nouvelles personnes pour aller plus loin.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-slate-400"
                >
                  <span className="flex items-center gap-1.5"><Shield size={13} className="text-blue-400" /> Sélection manuelle</span>
                  <span className="text-slate-300">·</span>
                  <span className="flex items-center gap-1.5"><Users size={13} className="text-blue-400" /> 15 places</span>
                  <span className="text-slate-300">·</span>
                  <span className="flex items-center gap-1.5"><Sparkles size={13} className="text-blue-400" /> Réponse personnelle</span>
                </motion.div>
              </div>

              {/* ══════════════════════════════════
                  VIDEO CONFERENCE MOCKUP
              ══════════════════════════════════ */}
              <motion.div
                initial={{ opacity: 0, y: 28, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.65, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="mb-12"
              >
                <ConferenceMockup />
              </motion.div>

              {/* ══════════════════════════════════
                  STATS STRIP
              ══════════════════════════════════ */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.3 }}
                className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4"
              >
                {STATS.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.32 + i * 0.06 }}
                    className="flex flex-col items-center justify-center rounded-2xl border border-blue-100 bg-white/70 py-5 px-3 text-center shadow-[0_4px_20px_rgba(37,99,235,0.07)] backdrop-blur"
                  >
                    <span className="text-2xl font-extrabold tracking-tight text-blue-600 sm:text-3xl">{stat.value}</span>
                    <span className="mt-1 text-[11px] font-medium leading-tight text-slate-500">{stat.label}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* ══════════════════════════════════
                  APPLICATION FORM
              ══════════════════════════════════ */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-[0_40px_100px_rgba(37,99,235,0.14)]"
              >

                {/* Form header */}
                <div className="relative overflow-hidden border-b border-slate-100 px-8 py-8 sm:px-10" style={{ background: 'linear-gradient(135deg,#eff6ff 0%,#f0f9ff 50%,#f8faff 100%)' }}>
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/60 to-transparent" />
                  {/* Decorative circles */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full" style={{ background: 'radial-gradient(circle,rgba(59,130,246,0.12),transparent 70%)' }} />
                  <div className="pointer-events-none absolute -bottom-10 left-10 h-28 w-28 rounded-full" style={{ background: 'radial-gradient(circle,rgba(99,102,241,0.08),transparent 70%)' }} />

                  <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.22em] text-blue-500">Candidature · Vague 2</p>
                      <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                        Rejoins l'aventure
                      </h2>
                      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                        Je lis chaque message moi-même. Aucun algorithme, aucun filtre — juste ta motivation.
                      </p>
                    </div>
                    <div className="shrink-0 self-start">
                      <div className="flex items-center gap-2 rounded-2xl border border-blue-200 bg-white px-4 py-2.5 shadow-sm">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600">
                          <Users className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-600">Places restantes</p>
                          <p className="text-lg font-extrabold leading-none tracking-tight text-slate-900">15</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form fields */}
                <form onSubmit={handleSubmit} noValidate className="space-y-6 px-8 py-8 sm:px-10">

                  {/* Prénom + Nom */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      { field: 'firstName', label: 'Prénom', ph: 'Alice', ac: 'given-name' },
                      { field: 'lastName',  label: 'Nom',    ph: 'Dupont', ac: 'family-name' },
                    ].map(({ field, label, ph, ac }) => (
                      <div key={field}>
                        <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                          {label} <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text" placeholder={ph} value={form[field]}
                          onChange={e => update(field, e.target.value)}
                          className={ic(field)} autoComplete={ac}
                        />
                        {fieldErrors[field] && <p className="mt-1.5 text-xs text-red-500">{fieldErrors[field]}</p>}
                      </div>
                    ))}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Adresse email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email" placeholder="alice@example.com" value={form.email}
                      onChange={e => update('email', e.target.value)}
                      className={ic('email')} autoComplete="email"
                    />
                    {fieldErrors.email && <p className="mt-1.5 text-xs text-red-500">{fieldErrors.email}</p>}
                  </div>

                  {/* Profil + Usage */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      { field: 'profile', label: 'Votre profil',  options: PROFILES },
                      { field: 'usage',   label: 'Usage prévu',   options: USAGES },
                    ].map(({ field, label, options }) => (
                      <div key={field}>
                        <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                          {label} <span className="text-red-400">*</span>
                        </label>
                        <select
                          value={form[field]} onChange={e => update(field, e.target.value)}
                          className={`${ic(field)} cursor-pointer`}
                        >
                          {options.map(o => (
                            <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>
                          ))}
                        </select>
                        {fieldErrors[field] && <p className="mt-1.5 text-xs text-red-500">{fieldErrors[field]}</p>}
                      </div>
                    ))}
                  </div>

                  {/* Outils */}
                  <div>
                    <label className="mb-2.5 block text-sm font-semibold text-slate-700">
                      Outils que tu utilises déjà{' '}
                      <span className="font-normal text-slate-400">(optionnel)</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {TOOLS.map(tool => {
                        const on = form.tools.includes(tool);
                        return (
                          <motion.button
                            key={tool} type="button" onClick={() => toggleTool(tool)}
                            whileTap={{ scale: 0.95 }}
                            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-150 ${
                              on
                                ? 'border-blue-500 bg-blue-600 text-white shadow-sm shadow-blue-600/20'
                                : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700'
                            }`}
                          >
                            {tool}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Motivation */}
                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <label className="text-sm font-semibold text-slate-700">
                        Pourquoi veux-tu rejoindre la bêta ? <span className="text-red-400">*</span>
                      </label>
                      <span className={`text-xs font-medium tabular-nums transition-colors ${motLen >= 40 ? 'text-green-600' : 'text-slate-400'}`}>
                        {motLen}/40 min.
                      </span>
                    </div>
                    <textarea
                      rows={4}
                      placeholder="Ce qui t'attire dans VisioConnect, ton expérience avec les outils de visio, ce que tu aimerais tester ou voir évoluer — tout ça m'intéresse vraiment."
                      value={form.motivation}
                      onChange={e => update('motivation', e.target.value)}
                      className={`${ic('motivation')} resize-none leading-relaxed`}
                    />
                    {fieldErrors.motivation && <p className="mt-1.5 text-xs text-red-500">{fieldErrors.motivation}</p>}
                  </div>

                  {/* Submit error */}
                  <AnimatePresence>
                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3.5"
                      >
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                        <p className="text-sm text-red-600">{submitError}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={isSubmitting ? {} : { y: -2, boxShadow: '0 12px 30px rgba(37,99,235,0.35)' }}
                    whileTap={isSubmitting ? {} : { scale: 0.98 }}
                    className="relative w-full overflow-hidden rounded-2xl bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                    style={{ background: isSubmitting ? '#3b82f6' : 'linear-gradient(135deg,#2563eb,#3b82f6)' }}
                  >
                    <span className="relative flex items-center justify-center gap-2.5">
                      {isSubmitting ? (
                        <><Loader2 className="h-4 w-4 animate-spin" /> Envoi en cours…</>
                      ) : (
                        <><Send className="h-4 w-4" /> Envoyer ma candidature <ChevronRight className="h-4 w-4 opacity-60" /></>
                      )}
                    </span>
                  </motion.button>

                  <p className="text-center text-[12px] text-slate-400">
                    Tes données ne sont utilisées que pour la sélection bêta — jamais revendues, jamais partagées.
                  </p>
                </form>
              </motion.div>

              {/* ══════════════════════════════════
                  FOOTER
              ══════════════════════════════════ */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="mt-10 flex flex-col items-center gap-3"
              >
                <button
                  onClick={() => navigate('/')}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/70 px-5 py-2.5 text-sm font-medium text-slate-600 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700 hover:shadow-md"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Retour à l'accueil
                </button>
                <p className="text-[11px] text-slate-400">© 2026 VisioConnect — Fait avec soin par Théo Garcès</p>
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
