import React, { useState, useCallback, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, MonitorPlay, Activity, Mic, MicOff,
  Video, Monitor, Users, Phone, MessageSquare,
  Shield, TrendingUp, Eye, Wifi, Clock,
} from 'lucide-react';

/* ════════════════════════════════════════════════════════════════
   FeaturesTabs — Premium SaaS feature showcase
   - Left: animated tab list with sliding 2px indicator
   - Right: glassmorphism preview pane
   - Studio: real Unsplash portraits, pulsing REC, clean 4K · E2EE
   - Analytics: live SVG engagement chart
   - All text via t() with FR fallback
   ════════════════════════════════════════════════════════════════ */

/* ----------------------------- Mock people (Unsplash portraits) */
const STUDIO_PEOPLE = [
  {
    name: 'Julia D.',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=320&h=240&q=80',
    muted: false,
  },
  {
    name: 'Marc R.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=320&h=240&q=80',
    muted: false,
  },
  {
    name: 'Alice S.',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=320&h=240&q=80',
    muted: true,
  },
  {
    name: 'Tom K.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=320&h=240&q=80',
    muted: true,
  },
];

/* ----------------------------- Glassmorphism wrapper */
const GlassFrame = memo(function GlassFrame({ children, accent }) {
  return (
    <div className="relative w-full h-full min-h-[360px] rounded-2xl overflow-hidden">
      {/* Ambient gradient backdrop (color follows active tab) */}
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{
          background: `radial-gradient(circle at 30% 20%, ${accent}33 0%, transparent 55%), radial-gradient(circle at 80% 80%, ${accent}22 0%, transparent 60%), linear-gradient(135deg, #0f172a 0%, #1e293b 100%)`,
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      {/* Decorative noise / grid */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* Glass panel */}
      <div className="relative h-full p-3 sm:p-4">
        <div className="h-full w-full rounded-xl border border-white/15 bg-white/[0.06] backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_30px_60px_-20px_rgba(0,0,0,0.55)] overflow-hidden flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
});

/* ----------------------------- Toolbar (shared, stable hover) */
const ToolbarButton = memo(function ToolbarButton({ icon: Icon, danger = false, label }) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 420, damping: 26 }}
      className={`
        w-8 h-8 rounded-lg flex items-center justify-center
        border border-white/10 ring-0
        transition-[background-color,box-shadow,color] duration-200
        ${danger
          ? 'bg-red-500/90 text-white hover:bg-red-500 hover:shadow-[0_0_0_4px_rgba(239,68,68,0.18)]'
          : 'bg-white/10 text-white/85 hover:bg-white/20 hover:text-white hover:shadow-[0_0_0_4px_rgba(255,255,255,0.08)]'}
      `}
    >
      <Icon size={14} strokeWidth={2.2} />
    </motion.button>
  );
});

const StudioToolbar = memo(function StudioToolbar({ labels }) {
  return (
    <div className="h-12 shrink-0 px-3 flex items-center justify-center gap-1.5 bg-black/30 border-t border-white/10 backdrop-blur-md">
      <ToolbarButton icon={Mic} label={labels.mic} />
      <ToolbarButton icon={Video} label={labels.video} />
      <ToolbarButton icon={Monitor} label={labels.screen} />
      <ToolbarButton icon={MessageSquare} label={labels.chat} />
      <ToolbarButton icon={Users} label={labels.people} />
      <span className="w-px h-5 bg-white/15 mx-1" />
      <ToolbarButton icon={Phone} danger label={labels.leave} />
    </div>
  );
});

/* ════════════════════════════════════════════════════════════════
   1) DASHBOARD preview
   ════════════════════════════════════════════════════════════════ */
const DashboardPreview = memo(function DashboardPreview({ t }) {
  const stats = [
    { label: t('slider.dashboard.meetings', 'Réunions'), value: '24', icon: Video, tint: 'from-sky-400 to-blue-500' },
    { label: t('slider.dashboard.participants', 'Participants'), value: '128', icon: Users, tint: 'from-violet-400 to-fuchsia-500' },
    { label: t('slider.dashboard.avgDuration', 'Durée moy.'), value: '42 min', icon: Clock, tint: 'from-emerald-400 to-teal-500' },
  ];
  const bars = [40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 62, 78];
  const filters = [
    t('slider.dashboard.weekly', 'Hebdo.'),
    t('slider.dashboard.monthly', 'Mensuel'),
    t('slider.dashboard.yearly', 'Annuel'),
  ];

  return (
    <div className="flex-1 flex flex-col gap-3 p-4 sm:p-5">
      <div className="grid grid-cols-3 gap-2.5">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.06, duration: 0.35 }}
            className="rounded-xl border border-white/10 bg-white/[0.05] p-3 backdrop-blur-md"
          >
            <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${s.tint} flex items-center justify-center text-white shadow-md mb-2`}>
              <s.icon size={13} strokeWidth={2.4} />
            </div>
            <p className="text-[0.62rem] uppercase tracking-wide text-white/50 leading-none mb-1.5">{s.label}</p>
            <p className="text-base font-bold text-white leading-none">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] p-3 flex items-end gap-1.5 min-h-[120px]">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t bg-gradient-to-t from-sky-500/90 to-cyan-300/90 shadow-[0_0_12px_rgba(56,189,248,0.4)]"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: `${h}%`, opacity: 1 }}
            transition={{ duration: 0.45, delay: i * 0.035, ease: 'easeOut' }}
          />
        ))}
      </div>

      <div className="flex gap-1.5">
        {filters.map((l, i) => (
          <span
            key={l}
            className={`text-[0.62rem] px-2.5 py-1 rounded-full font-medium border ${
              i === 0
                ? 'bg-white/15 text-white border-white/20'
                : 'bg-transparent text-white/45 border-white/10'
            }`}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
});

/* ════════════════════════════════════════════════════════════════
   2) STUDIO preview — Unsplash grid + pulsing REC + 4K · E2EE
   ════════════════════════════════════════════════════════════════ */
const StudioTile = memo(function StudioTile({ person, isLive }) {
  return (
    <motion.div
      className="relative rounded-xl overflow-hidden border border-white/10 bg-slate-900"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <img
        src={person.photo}
        alt={person.name}
        loading="lazy"
        className="w-full h-full object-cover"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 pointer-events-none" />

      {isLive && (
        <span className="absolute top-2 left-2 inline-flex items-center gap-1.5 bg-red-500/95 text-white text-[0.58rem] font-bold tracking-wider px-2 py-0.5 rounded-md shadow-lg">
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-white"
            animate={{ opacity: [1, 0.3, 1], scale: [1, 0.85, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          REC
        </span>
      )}

      {person.muted && (
        <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-black/55 backdrop-blur-sm flex items-center justify-center border border-white/15">
          <MicOff size={10} className="text-white/85" strokeWidth={2.4} />
        </span>
      )}

      <span className="absolute bottom-1.5 left-2 text-[0.65rem] font-semibold text-white drop-shadow">
        {person.name}
      </span>
      <span className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-400/40" />
    </motion.div>
  );
});

const StudioPreview = memo(function StudioPreview({ t }) {
  const labels = useMemo(() => ({
    mic: t('slider.studio.mic', 'Micro'),
    video: t('slider.studio.video', 'Caméra'),
    screen: t('slider.studio.screen', 'Partage d\'écran'),
    chat: t('slider.studio.chat', 'Chat'),
    people: t('slider.studio.participants', 'Participants'),
    leave: t('slider.studio.leave', 'Quitter'),
  }), [t]);

  return (
    <>
      <div className="relative flex-1 grid grid-cols-2 gap-1.5 p-2">
        {STUDIO_PEOPLE.map((p, i) => (
          <StudioTile key={p.name} person={p} isLive={i === 0} />
        ))}

        {/* 4K · E2EE clean badge */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[0.6rem] font-semibold text-white shadow-lg"
        >
          <Shield size={10} strokeWidth={2.4} className="text-emerald-300" />
          <span className="tracking-wide">4K · E2EE</span>
        </motion.div>
      </div>
      <StudioToolbar labels={labels} />
    </>
  );
});

/* ════════════════════════════════════════════════════════════════
   3) ANALYTICS preview — Animated SVG engagement chart
   ════════════════════════════════════════════════════════════════ */
const AnalyticsPreview = memo(function AnalyticsPreview({ t }) {
  const metrics = [
    { label: t('slider.analytics.engagement', 'Engagement'), value: '94%', delta: '+12%', icon: TrendingUp },
    { label: t('slider.analytics.retention', 'Rétention'), value: '87%', delta: '+5%', icon: Eye },
    { label: t('slider.analytics.quality', 'Qualité'), value: '99.2%', delta: '+0.3%', icon: Wifi },
  ];

  // Two series: engagement (primary) + participants (secondary)
  const engagement = 'M0,52 Q12,40 24,36 T48,28 T72,32 T96,18 T120,22 T144,12 T168,18 T192,8 T216,14';
  const participants = 'M0,46 Q14,44 28,42 T56,40 T84,38 T112,36 T140,32 T168,30 T196,28 T216,26';

  return (
    <div className="flex-1 flex flex-col gap-3 p-4 sm:p-5">
      <div className="grid grid-cols-3 gap-2.5">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.07, duration: 0.35 }}
            className="rounded-xl border border-white/10 bg-white/[0.05] p-3 backdrop-blur-md"
          >
            <div className="flex items-center justify-between mb-1.5">
              <m.icon size={12} className="text-white/55" strokeWidth={2.4} />
              <span className="text-[0.6rem] font-semibold text-emerald-300">{m.delta}</span>
            </div>
            <p className="text-base font-bold text-white leading-none">{m.value}</p>
            <p className="text-[0.62rem] text-white/45 mt-1">{m.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex-1 relative rounded-xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-md min-h-[150px]">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-[0.65rem] font-semibold text-white/65 uppercase tracking-wide">
            {t('slider.analytics.realtime', 'Temps réel')}
          </p>
          <span className="inline-flex items-center gap-1 text-[0.6rem] font-bold text-emerald-300">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              animate={{ opacity: [1, 0.25, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            {t('slider.analytics.live', 'En direct')}
          </span>
        </div>

        <svg className="w-full h-[78%]" viewBox="0 0 216 60" preserveAspectRatio="none">
          <defs>
            <linearGradient id="ftEngArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="ftEngLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>

          {/* gridlines */}
          {[0, 1, 2, 3].map((i) => (
            <line
              key={i}
              x1="0"
              x2="216"
              y1={15 + i * 12}
              y2={15 + i * 12}
              stroke="rgba(255,255,255,0.06)"
              strokeDasharray="2 3"
            />
          ))}

          <motion.path
            d={`${engagement} V60 H0 Z`}
            fill="url(#ftEngArea)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          />
          <motion.path
            d={participants}
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1.4"
            strokeDasharray="3 3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          />
          <motion.path
            d={engagement}
            fill="none"
            stroke="url(#ftEngLine)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="216"
            cy="14"
            r="2.5"
            fill="#34d399"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.4, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
          />
        </svg>

        <div className="flex gap-3 mt-1">
          <span className="text-[0.6rem] flex items-center gap-1.5 text-white/55">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            {t('slider.analytics.engagement', 'Engagement')}
          </span>
          <span className="text-[0.6rem] flex items-center gap-1.5 text-white/55">
            <span className="w-2 h-[2px] bg-white/40 rounded-full" />
            {t('slider.analytics.participants', 'Participants')}
          </span>
        </div>
      </div>
    </div>
  );
});

/* ════════════════════════════════════════════════════════════════
   Preview map
   ════════════════════════════════════════════════════════════════ */
const PREVIEW_MAP = {
  dashboard: DashboardPreview,
  studio: StudioPreview,
  analytics: AnalyticsPreview,
};

/* ════════════════════════════════════════════════════════════════
   Features data
   ════════════════════════════════════════════════════════════════ */
const buildFeatures = (t) => [
  {
    id: 'dashboard',
    icon: LayoutDashboard,
    title: t('slider.title1', 'Dashboard Intuitif'),
    description: t('slider.desc1', 'Contrôlez vos réunions d\'un clic.'),
    color: '#3b82f6',
  },
  {
    id: 'studio',
    icon: MonitorPlay,
    title: t('slider.title2', 'Mode Studio'),
    description: t('slider.desc2', 'Qualité 4K sans compromis.'),
    color: '#8b5cf6',
    defaultActive: true,
  },
  {
    id: 'analytics',
    icon: Activity,
    title: t('slider.title3', 'Analytiques'),
    description: t('slider.desc3', 'Suivez l\'engagement en temps réel.'),
    color: '#10b981',
  },
];

/* ════════════════════════════════════════════════════════════════
   FeatureTab — left side row with sliding indicator (layoutId)
   ════════════════════════════════════════════════════════════════ */
const FeatureTab = memo(function FeatureTab({ feature, isActive, onSelect }) {
  const { id, icon: Icon, title, description, color } = feature;
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      aria-pressed={isActive}
      className={`
        relative w-full text-left rounded-2xl p-5 cursor-pointer outline-none
        transition-[background-color,box-shadow] duration-300
        focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400
        ${isActive ? 'bg-slate-50/80' : 'bg-transparent hover:bg-slate-50/60'}
      `}
    >
      {/* Sliding 2px indicator (animated via shared layoutId) */}
      {isActive && (
        <motion.span
          layoutId="featureTabIndicator"
          className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full"
          style={{ backgroundColor: color }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}

      <span
        className={`
          inline-flex items-center justify-center w-11 h-11 rounded-xl mb-3
          transition-[background-color,color,box-shadow] duration-300
          ${isActive ? 'text-white shadow-lg' : 'bg-slate-100 text-slate-400'}
        `}
        style={isActive ? { background: color, boxShadow: `0 8px 24px -8px ${color}80` } : undefined}
      >
        <Icon size={22} strokeWidth={2.2} />
      </span>

      <h3
        className={`text-base font-semibold mb-1 transition-colors duration-300 ${
          isActive ? 'text-slate-900' : 'text-slate-500'
        }`}
      >
        {title}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
    </button>
  );
});

/* ════════════════════════════════════════════════════════════════
   MAIN — FeaturesTabs
   ════════════════════════════════════════════════════════════════ */
export default function FeaturesTabs({ t }) {
  const features = useMemo(() => buildFeatures(t), [t]);
  const initialId = useMemo(
    () => (features.find((f) => f.defaultActive) || features[0])?.id,
    [features]
  );
  const [activeId, setActiveId] = useState(initialId);

  const handleSelect = useCallback((id) => setActiveId(id), []);
  const activeFeature = features.find((f) => f.id === activeId) || features[0];
  const PreviewContent = PREVIEW_MAP[activeFeature.id] || DashboardPreview;

  return (
    <section className="w-full max-w-[1200px] mx-auto py-16 sm:py-24 px-4">
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-6 lg:gap-10">
        {/* Left tabs */}
        <nav className="flex flex-col justify-center gap-2" aria-label={t('slider.ariaTabs', 'Sections de fonctionnalités')}>
          {features.map((f) => (
            <FeatureTab
              key={f.id}
              feature={f}
              isActive={activeId === f.id}
              onSelect={handleSelect}
            />
          ))}
        </nav>

        {/* Right glass preview */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 10, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.985 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="h-full"
            >
              <GlassFrame accent={activeFeature.color}>
                <PreviewContent t={t} />
              </GlassFrame>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
