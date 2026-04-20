import React, { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, MonitorPlay, Activity, Mic, MicOff,
  Video, VideoOff, Monitor, Users, Phone, MessageSquare,
  Shield, Wifi, TrendingUp, BarChart3, Eye, Clock,
} from 'lucide-react';

/* ══════════════════════════════════════════════════
   PreviewFrame — reusable macOS-style browser window
   ══════════════════════════════════════════════════ */
const PreviewFrame = memo(function PreviewFrame({ children, themeColor = '#3b82f6' }) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200/60 flex items-center justify-center p-4 sm:p-6 min-h-[340px] shadow-inner">
      <motion.div
        className="w-full h-full bg-white rounded-xl shadow-2xl border border-slate-200/80 flex flex-col overflow-hidden"
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.97 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        {/* Title bar */}
        <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center px-3 gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
          <div className="flex-1 flex justify-center">
            <div className="w-1/2 h-1.5 bg-slate-200 rounded-full" />
          </div>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-hidden relative">
          {children}
        </div>
      </motion.div>
    </div>
  );
});

/* ══════════════════════════════════════════════════
   Preview content for each feature
   ══════════════════════════════════════════════════ */

/* — Dashboard: stats + mini-chart placeholders — */
const DashboardPreview = memo(function DashboardPreview() {
  const stats = [
    { label: 'Réunions', value: '24', icon: Video, color: 'text-blue-600 bg-blue-50' },
    { label: 'Participants', value: '128', icon: Users, color: 'text-violet-600 bg-violet-50' },
    { label: 'Durée moy.', value: '42 min', icon: Clock, color: 'text-emerald-600 bg-emerald-50' },
  ];
  return (
    <div className="p-4 sm:p-5 h-full flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-2.5">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-slate-100 rounded-lg p-3 shadow-sm">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${s.color}`}>
              <s.icon size={15} />
            </div>
            <p className="text-[0.68rem] text-slate-400 leading-none mb-1">{s.label}</p>
            <p className="text-lg font-bold text-slate-800 leading-none">{s.value}</p>
          </div>
        ))}
      </div>
      {/* Mini bar chart */}
      <div className="flex-1 bg-slate-50 rounded-lg border border-slate-100 p-3 flex items-end gap-1.5">
        {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85].map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t bg-blue-500/80"
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.5, delay: i * 0.04, ease: 'easeOut' }}
          />
        ))}
      </div>
      {/* Bottom row */}
      <div className="flex gap-2">
        {['Hebdomadaire', 'Mensuel', 'Annuel'].map((l, i) => (
          <span
            key={l}
            className={`text-[0.65rem] px-2.5 py-1 rounded-full font-medium border ${
              i === 0 ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-white text-slate-400 border-slate-200'
            }`}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
});

/* — Studio: video meeting grid placeholder — */
const MOCK_PEOPLE = [
  { initials: 'JD', bg: 'from-blue-500 to-blue-700' },
  { initials: 'MR', bg: 'from-violet-500 to-violet-700' },
  { initials: 'AS', bg: 'from-indigo-400 to-indigo-600' },
  { initials: 'TK', bg: 'from-sky-400 to-sky-600' },
];

const StudioPreview = memo(function StudioPreview() {
  return (
    <div className="h-full flex flex-col">
      {/* Video grid */}
      <div className="flex-1 grid grid-cols-2 gap-1.5 p-2">
        {MOCK_PEOPLE.map((p, i) => (
          <div
            key={p.initials}
            className={`bg-gradient-to-br ${p.bg} rounded-lg relative flex items-center justify-center overflow-hidden`}
          >
            <span className="text-white font-bold text-xl opacity-80">{p.initials}</span>
            {/* LIVE badge on first */}
            {i === 0 && (
              <span className="absolute top-2 left-2 bg-red-500 text-white text-[0.55rem] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> REC
              </span>
            )}
            {/* Name */}
            <span className="absolute bottom-1.5 left-2 text-[0.6rem] font-semibold text-white/80">
              {p.initials === 'JD' ? 'Julie D.' : p.initials === 'MR' ? 'Marc R.' : p.initials === 'AS' ? 'Alice S.' : 'Tom K.'}
            </span>
            {/* Mute icon on some */}
            {i > 1 && (
              <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                <MicOff size={9} className="text-white/70" />
              </span>
            )}
            {/* Online dot */}
            <span className="absolute bottom-1.5 right-2 w-2 h-2 bg-green-400 rounded-full border border-white/80" />
          </div>
        ))}
      </div>

      {/* 4K badge */}
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur border border-slate-200 text-[0.6rem] font-bold text-blue-600 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
        <Shield size={9} /> E2EE · 4K
      </div>

      {/* Toolbar */}
      <div className="h-10 bg-white border-t border-slate-100 flex items-center justify-center gap-1.5 shrink-0">
        {[
          { icon: Mic, active: false },
          { icon: Video, active: false },
          { icon: Monitor, active: false },
          { icon: MessageSquare, active: false },
          { icon: Users, active: false },
          { icon: Phone, active: true },
        ].map((btn, i) => (
          <div
            key={i}
            className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-colors ${
              btn.active
                ? 'bg-red-50 border-red-200 text-red-500'
                : 'bg-blue-50 border-blue-200 text-blue-500 hover:bg-blue-100'
            }`}
          >
            <btn.icon size={13} />
          </div>
        ))}
      </div>
    </div>
  );
});

/* — Analytics: engagement metrics — */
const AnalyticsPreview = memo(function AnalyticsPreview() {
  const metrics = [
    { label: 'Engagement', value: '94%', delta: '+12%', icon: TrendingUp },
    { label: 'Rétention', value: '87%', delta: '+5%', icon: Eye },
    { label: 'Qualité', value: '99.2%', delta: '+0.3%', icon: Wifi },
  ];
  return (
    <div className="p-4 sm:p-5 h-full flex flex-col gap-3">
      {/* KPI cards */}
      <div className="grid grid-cols-3 gap-2.5">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white border border-slate-100 rounded-lg p-3 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <m.icon size={14} className="text-slate-400" />
              <span className="text-[0.6rem] font-semibold text-emerald-500">{m.delta}</span>
            </div>
            <p className="text-lg font-bold text-slate-800 leading-none">{m.value}</p>
            <p className="text-[0.65rem] text-slate-400 mt-1">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Timeline chart area */}
      <div className="flex-1 bg-slate-50 rounded-lg border border-slate-100 p-3 relative overflow-hidden">
        <p className="text-[0.65rem] font-semibold text-slate-500 mb-2">Temps réel</p>
        <svg className="w-full h-[70%]" viewBox="0 0 200 60" preserveAspectRatio="none">
          <defs>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,50 Q20,30 40,35 T80,20 T120,30 T160,10 T200,25 V60 H0 Z"
            fill="url(#areaFill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.path
            d="M0,50 Q20,30 40,35 T80,20 T120,30 T160,10 T200,25"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </svg>
        {/* Live dot */}
        <span className="absolute top-3 right-3 flex items-center gap-1 text-[0.6rem] font-bold text-emerald-500">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Live
        </span>
      </div>

      {/* Legend pills */}
      <div className="flex gap-2">
        {['Participants', 'Engagement', 'Qualité'].map((l, i) => (
          <span
            key={l}
            className="text-[0.6rem] flex items-center gap-1 text-slate-400"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-violet-500' : 'bg-emerald-500'
              }`}
            />
            {l}
          </span>
        ))}
      </div>
    </div>
  );
});

/* Preview map by feature id */
const PREVIEW_MAP = {
  dashboard: DashboardPreview,
  studio: StudioPreview,
  analytics: AnalyticsPreview,
};

/* ══════════════════════════════════════════════════
   Features data — single source of truth
   ══════════════════════════════════════════════════ */
const makeFeaturesData = (t) => [
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

/* ══════════════════════════════════════════════════
   FeatureCard — single card on the left
   ══════════════════════════════════════════════════ */
const FeatureTabCard = memo(function FeatureTabCard({ icon: Icon, title, description, color, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        relative w-full text-left rounded-2xl p-5 transition-all duration-300 cursor-pointer group
        border
        ${isActive
          ? 'bg-blue-50/60 border-blue-200/60 shadow-sm'
          : 'bg-transparent border-transparent hover:bg-slate-50/60'
        }
      `}
    >
      {/* Active left accent bar */}
      <span
        className={`
          absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full transition-all duration-300
          ${isActive ? 'h-3/5 opacity-100' : 'h-0 opacity-0'}
        `}
        style={{ backgroundColor: color }}
      />

      {/* Icon */}
      <span
        className={`
          inline-flex items-center justify-center w-11 h-11 rounded-xl mb-3 transition-all duration-300
          ${isActive ? 'text-white shadow-md' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}
        `}
        style={isActive ? { background: color } : undefined}
      >
        <Icon size={22} />
      </span>

      <h3
        className={`text-base font-semibold mb-1 transition-colors duration-300 ${
          isActive ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-700'
        }`}
      >
        {title}
      </h3>
      <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
    </button>
  );
});

/* ══════════════════════════════════════════════════
   MAIN COMPONENT — FeaturesTabs
   ══════════════════════════════════════════════════ */
export default function FeaturesTabs({ t }) {
  const features = React.useMemo(() => makeFeaturesData(t), [t]);
  const defaultIdx = features.findIndex((f) => f.defaultActive) || 0;
  const [activeId, setActiveId] = useState(features[defaultIdx]?.id || features[0]?.id);

  const handleSelect = useCallback((id) => setActiveId(id), []);

  const activeFeature = features.find((f) => f.id === activeId) || features[0];
  const PreviewContent = PREVIEW_MAP[activeFeature.id] || DashboardPreview;

  return (
    <section className="w-full max-w-[1200px] mx-auto py-16 sm:py-24 px-4">
      {/* Outer card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-6 lg:gap-10">
        {/* Left — feature cards */}
        <nav className="flex flex-col justify-center gap-2">
          {features.map((f) => (
            <FeatureTabCard
              key={f.id}
              icon={f.icon}
              title={f.title}
              description={f.description}
              color={f.color}
              isActive={activeId === f.id}
              onClick={() => handleSelect(f.id)}
            />
          ))}
        </nav>

        {/* Right — preview pane */}
        <AnimatePresence mode="wait">
          <PreviewFrame key={activeId} themeColor={activeFeature.color}>
            <PreviewContent />
          </PreviewFrame>
        </AnimatePresence>
      </div>
    </section>
  );
}
