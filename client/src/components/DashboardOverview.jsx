import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Clock, Users, TrendingUp, Calendar, Sparkles, ArrowRight } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const STORAGE_KEY = 'visiconnect.recentMeetings';

const formatDuration = (mins) => {
  if (!mins || mins <= 0) return '—';
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h <= 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h${m.toString().padStart(2, '0')}`;
};

const minsBetween = (start, end) => {
  if (!start || !end) return 0;
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  if ([sh, sm, eh, em].some((n) => Number.isNaN(n))) return 0;
  return Math.max(0, eh * 60 + em - (sh * 60 + sm));
};

const getGreetingKey = () => {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 18) return 'afternoon';
  return 'evening';
};

/**
 * Lightweight dashboard overview: greeting, KPI tiles and recent meetings.
 * Reads locally persisted meeting history (no backend dependency).
 */
const DashboardOverview = ({ user, currentPlan, onCreateMeeting, onJoinMeeting }) => {
  const { t, language } = useTranslation();
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      setMeetings(raw ? JSON.parse(raw) : []);
    } catch {
      setMeetings([]);
    }
  }, []);

  const stats = useMemo(() => {
    const now = Date.now();
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);
    const totalMinutes = meetings.reduce((acc, m) => acc + minsBetween(m.startTime, m.endTime), 0);
    const monthMeetings = meetings.filter((m) => (m.createdAt || 0) >= monthStart.getTime());
    const totalParticipants = meetings.reduce((acc, m) => acc + (m.participants || 0), 0);
    return {
      totalMeetings: meetings.length,
      monthMeetings: monthMeetings.length,
      totalMinutes,
      totalParticipants,
      lastMeetingAt: meetings[0]?.createdAt || null,
      uptime:
        monthMeetings.length > 0 ? Math.min(100, Math.round((monthMeetings.length / 30) * 100)) : 0,
    };
  }, [meetings]);

  const displayName =
    user?.firstName ||
    user?.fullName ||
    user?.username ||
    user?.primaryEmailAddress?.emailAddress?.split('@')[0] ||
    '';

  const greetingKey = getGreetingKey();
  const planName = currentPlan?.name || 'Starter';

  const dateLocale =
    typeof language === 'string' && language ? language.replace('_', '-') : undefined;
  const formatRelative = (ts) => {
    if (!ts) return t('dashboardOverview.never', 'Aucune réunion');
    try {
      return new Date(ts).toLocaleDateString(dateLocale, {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return new Date(ts).toLocaleString();
    }
  };

  const tiles = [
    {
      key: 'totalMeetings',
      label: t('dashboardOverview.kpi.totalMeetings', 'Réunions créées'),
      value: stats.totalMeetings,
      icon: Video,
      accent: '#2563eb',
      bg: 'rgba(37,99,235,0.08)',
    },
    {
      key: 'monthMeetings',
      label: t('dashboardOverview.kpi.thisMonth', 'Ce mois-ci'),
      value: stats.monthMeetings,
      icon: Calendar,
      accent: '#7c3aed',
      bg: 'rgba(124,58,237,0.08)',
    },
    {
      key: 'minutes',
      label: t('dashboardOverview.kpi.timeBooked', 'Temps planifié'),
      value: formatDuration(stats.totalMinutes),
      icon: Clock,
      accent: '#0ea5e9',
      bg: 'rgba(14,165,233,0.08)',
    },
    {
      key: 'participants',
      label: t('dashboardOverview.kpi.invitedParticipants', 'Participants invités'),
      value: stats.totalParticipants,
      icon: Users,
      accent: '#16a34a',
      bg: 'rgba(22,163,74,0.08)',
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        background: 'white',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        boxShadow: '0 1px 2px rgba(15,23,42,0.04)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.78rem',
              color: '#64748b',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            <Sparkles size={14} color="#2563eb" />
            {t(
              `dashboardOverview.greeting.${greetingKey}`,
              greetingKey === 'morning'
                ? 'Bonjour'
                : greetingKey === 'afternoon'
                  ? 'Bon après-midi'
                  : 'Bonsoir'
            )}
          </div>
          <h2
            style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              color: '#0f172a',
              margin: '0.25rem 0 0',
              letterSpacing: '-0.01em',
            }}
          >
            {displayName ? `${displayName}` : t('dashboardOverview.welcome', 'Bienvenue')}
          </h2>
          <p style={{ margin: '0.25rem 0 0', color: '#475569', fontSize: '0.92rem' }}>
            {t('dashboardOverview.subtitle', 'Voici un aperçu de votre activité.')}
          </p>
        </div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: '#f1f5f9',
            border: '1px solid #e2e8f0',
            borderRadius: '999px',
            padding: '0.4rem 0.85rem',
          }}
        >
          <TrendingUp size={15} color="#2563eb" />
          <span style={{ fontSize: '0.82rem', color: '#0f172a', fontWeight: 600 }}>
            {t('dashboardOverview.planLabel', 'Plan')} <strong>{planName}</strong>
          </span>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '0.75rem',
          marginBottom: '1.25rem',
        }}
      >
        {tiles.map(({ key, label, value, icon: Icon, accent, bg }) => (
          <div
            key={key}
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '0.85rem 1rem',
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              minHeight: '74px',
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: bg,
                color: accent,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Icon size={18} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontSize: '0.74rem',
                  color: '#64748b',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                {label}
              </div>
              <div
                style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}
              >
                {value}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.6rem',
        }}
      >
        <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
          {t('dashboardOverview.recent.title', 'Réunions récentes')}
        </h3>
        <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
          {t('dashboardOverview.recent.lastActivity', 'Dernière activité')} :{' '}
          {formatRelative(stats.lastMeetingAt)}
        </span>
      </div>

      {meetings.length === 0 ? (
        <div
          style={{
            border: '1px dashed #cbd5e1',
            borderRadius: '12px',
            padding: '1.25rem',
            textAlign: 'center',
            color: '#475569',
            fontSize: '0.9rem',
            background: '#f8fafc',
          }}
        >
          {t(
            'dashboardOverview.recent.empty',
            'Aucune réunion pour le moment. Créez votre première réunion pour suivre votre activité ici.'
          )}
        </div>
      ) : (
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          {meetings.slice(0, 5).map((m) => (
            <li
              key={m.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.65rem 0.85rem',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                background: 'white',
                gap: '0.75rem',
              }}
            >
              <div style={{ minWidth: 0, flex: 1 }}>
                <div
                  style={{
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    color: '#0f172a',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {m.title}
                </div>
                <div
                  style={{
                    fontSize: '0.78rem',
                    color: '#64748b',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                  }}
                >
                  <span>
                    {m.date} · {m.startTime}–{m.endTime}
                  </span>
                  {m.participants > 0 && (
                    <span>
                      · {m.participants}{' '}
                      {t('dashboardOverview.recent.participants', 'participants')}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => onJoinMeeting?.(m.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: '0.4rem 0.7rem',
                  background: '#eff6ff',
                  color: '#2563eb',
                  border: '1px solid #bfdbfe',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {t('dashboardOverview.recent.rejoin', 'Reprendre')} <ArrowRight size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </motion.section>
  );
};

export default DashboardOverview;
