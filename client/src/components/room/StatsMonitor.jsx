import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, X } from 'lucide-react';
import { VideoPresets } from 'livekit-client';
import { ROOM_THEME as THEME } from '../../styles/roomTheme';
import { useTranslation } from '../../hooks/useTranslation';

const QUALITY_OPTIONS = [
  { id: 'h1080', label: '1080p (HD)', preset: VideoPresets.h1080 },
  { id: 'h720', label: '720p (recommandé)', preset: VideoPresets.h720 },
  { id: 'h540', label: '540p (économe)', preset: VideoPresets.h540 },
  { id: 'h360', label: '360p (faible débit)', preset: VideoPresets.h360 },
];

/* 🖥️ Desktop: Overlay positionné */
const StatsContainer = styled(motion.div)`
  position: absolute;
  top: 80px;
  left: 20px;
  background: rgba(12, 35, 64, 0.96);
  backdrop-filter: blur(8px);
  border: 1px solid ${THEME.border};
  padding: 1rem;
  border-radius: 12px;
  color: ${THEME.text};
  z-index: 50;
  width: 250px;
  font-family: monospace;
  font-size: 0.8rem;
  box-shadow: 0 10px 24px -10px rgba(29, 78, 216, 0.35);

  /* 📱 MOBILE: Cacher l'overlay (utilise modal à la place) */
  @media (max-width: 768px) {
    display: none !important;
  }

  h4 {
    margin: 0 0 0.5rem 0;
    color: ${THEME.accent};
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .stat-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.25rem;
    padding-bottom: 0.25rem;
    border-bottom: 1px solid ${THEME.border};

    &:last-child {
      border: none;
    }

    span:first-child {
      color: ${THEME.textDim};
    }
  }
`;

/* 📱 Mobile: Modal centrée avec backdrop */
const MobileModalBackdrop = styled(motion.div)`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    z-index: 200;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }
`;

const MobileModalContent = styled(motion.div)`
  background: rgba(12, 35, 64, 0.98);
  backdrop-filter: blur(12px);
  border: 1px solid ${THEME.border};
  padding: 1.5rem;
  border-radius: 20px;
  color: ${THEME.text};
  width: 100%;
  max-width: 320px;
  font-family: monospace;
  font-size: 0.9rem;
  box-shadow: 0 20px 60px -15px rgba(0, 0, 0, 0.5);

  h4 {
    margin: 0 0 1rem 0;
    color: ${THEME.accent};
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1rem;
  }

  .stat-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;

    span:first-child {
      color: ${THEME.textDim};
    }

    span:last-child {
      font-weight: 600;
      color: #4ade80;
    }
  }
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 8px;
  padding: 0.5rem;
  color: ${THEME.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:active {
    transform: scale(0.95);
    background: rgba(255, 255, 255, 0.15);
  }
`;

export const StatsMonitor = ({ participant, showStats = false, onClose }) => {
  const { t } = useTranslation();
  const QUALITY_OPTIONS_I18N = [
    { id: 'h1080', label: t('room.stats.q1080', '1080p (HD)'), preset: VideoPresets.h1080 },
    { id: 'h720', label: t('room.stats.q720', '720p (recommandé)'), preset: VideoPresets.h720 },
    { id: 'h540', label: t('room.stats.q540', '540p (économe)'), preset: VideoPresets.h540 },
    { id: 'h360', label: t('room.stats.q360', '360p (faible débit)'), preset: VideoPresets.h360 },
  ];
  const [stats, setStats] = useState({
    resolution: 'Unknown',
    codec: 'Checking...',
    bitrate: 'Dynamic',
    packetLoss: '0%',
  });
  const [quality, setQuality] = useState('h720');
  const [applyingQuality, setApplyingQuality] = useState(false);

  // Determine if the participant is local (only LocalParticipant exposes setCameraEnabled).
  const isLocal = !!participant && typeof participant.setCameraEnabled === 'function';

  const handleQualityChange = useCallback(
    async (e) => {
      const next = e.target.value;
      setQuality(next);
      if (!isLocal) return;
      const opt = QUALITY_OPTIONS.find((o) => o.id === next);
      if (!opt) return;
      try {
        setApplyingQuality(true);
        await participant.setCameraEnabled(true, {
          resolution: opt.preset.resolution,
        });
      } catch (err) {
        console.error('[StatsMonitor] Failed to change camera quality:', err);
      } finally {
        setApplyingQuality(false);
      }
    },
    [participant, isLocal]
  );

  useEffect(() => {
    if (!participant) return;

    let mounted = true;
    const interval = setInterval(async () => {
      // Find the first video track
      if (!participant.videoTrackPublications) return;
      const tracks = Array.from(participant.videoTrackPublications.values());
      const videoTrackPub = tracks.find((pub) => pub.kind === 'video' && pub.track);

      if (videoTrackPub && videoTrackPub.track && mounted) {
        try {
          // Use mediaStreamTrack settings to get actual dimensions sent to hardware
          const settings = videoTrackPub.track.mediaStreamTrack.getSettings();
          const width = settings.width || 0;
          const height = settings.height || 0;

          if (width && height) {
            setStats({
              resolution: `${width}p`, // e.g. 2160p or 1080p
              codec: 'VP9/H.264',
              bitrate: 'Dynamic',
            });
          } else {
            setStats((prev) => ({ ...prev, resolution: 'Initializing...' }));
          }
        } catch (e) {
          console.error('Stats error', e);
        }
      } else {
        setStats((prev) => ({ ...prev, resolution: 'Off / Unknown' }));
      }
    }, 2000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [participant]);

  return (
    <>
      {/* 🖥️ Desktop: Overlay classique */}
      <StatsContainer initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <h4>
          <Activity size={16} /> {t('room.stats.videoFlux', 'Flux Vidéo (Test)')}
        </h4>
        <div className="stat-row">
          <span>{t('room.stats.resolution', 'Résolution')}</span>
          <span style={{ color: '#4ade80' }}>{stats.resolution}</span>
        </div>
        <div className="stat-row">
          <span>{t('room.stats.codec', 'Codec')}</span>
          <span>{stats.codec}</span>
        </div>
        <div className="stat-row">
          <span>{t('room.stats.mode', 'Mode')}</span>
          <span>{t('room.stats.simulcast', 'Simulcast activé')}</span>
        </div>
        {isLocal && (
          <div
            style={{
              marginTop: '0.6rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
            }}
          >
            <label htmlFor="qualitySelect" style={{ fontSize: '0.7rem', color: THEME.textDim }}>
              {t('room.stats.sendQuality', "Qualité d'envoi")}
            </label>
            <select
              id="qualitySelect"
              value={quality}
              onChange={handleQualityChange}
              disabled={applyingQuality}
              style={{
                background: 'rgba(255,255,255,0.08)',
                color: THEME.text,
                border: `1px solid ${THEME.border}`,
                borderRadius: 8,
                padding: '0.35rem 0.5rem',
                fontSize: '0.75rem',
                fontFamily: 'inherit',
                cursor: applyingQuality ? 'wait' : 'pointer',
              }}
            >
              {QUALITY_OPTIONS_I18N.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        )}
        <div style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: THEME.textDim }}>
          {t(
            'room.stats.adaptiveNote',
            "*La résolution s'adapte à la bande passante (4K → 1080p → 540p)"
          )}
        </div>
      </StatsContainer>

      {/* 📱 Mobile: Modal centrée */}
      <AnimatePresence>
        {showStats && (
          <MobileModalBackdrop
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <MobileModalContent
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h4>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Activity size={18} /> {t('room.stats.videoStats', 'Stats Vidéo')}
                </span>
                <CloseButton onClick={onClose}>
                  <X size={18} />
                </CloseButton>
              </h4>
              <div className="stat-row">
                <span>{t('room.stats.resolution', 'Résolution')}</span>
                <span>{stats.resolution}</span>
              </div>
              <div className="stat-row">
                <span>{t('room.stats.codec', 'Codec')}</span>
                <span>{stats.codec}</span>
              </div>
              <div className="stat-row">
                <span>{t('room.stats.mode', 'Mode')}</span>
                <span>{t('room.stats.mobileOptimized', 'Optimisé Mobile')}</span>
              </div>
              {isLocal && (
                <div style={{ marginTop: '0.75rem' }}>
                  <label
                    htmlFor="qualitySelectMobile"
                    style={{
                      fontSize: '0.75rem',
                      color: THEME.textDim,
                      display: 'block',
                      marginBottom: '0.4rem',
                    }}
                  >
                    {t('room.stats.sendQuality', "Qualité d'envoi")}
                  </label>
                  <select
                    id="qualitySelectMobile"
                    value={quality}
                    onChange={handleQualityChange}
                    disabled={applyingQuality}
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.08)',
                      color: THEME.text,
                      border: `1px solid ${THEME.border}`,
                      borderRadius: 10,
                      padding: '0.6rem',
                      fontSize: '0.85rem',
                      fontFamily: 'inherit',
                    }}
                  >
                    {QUALITY_OPTIONS_I18N.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div
                style={{
                  marginTop: '1rem',
                  fontSize: '0.75rem',
                  color: THEME.textDim,
                  textAlign: 'center',
                }}
              >
                {t('room.stats.autoAdapt', "La qualité s'adapte automatiquement à votre connexion")}
              </div>
            </MobileModalContent>
          </MobileModalBackdrop>
        )}
      </AnimatePresence>
    </>
  );
};
