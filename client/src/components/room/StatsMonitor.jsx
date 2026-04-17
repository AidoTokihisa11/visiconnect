import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { ROOM_THEME as THEME } from '../../styles/roomTheme';

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

  /* 📱 MOBILE: Cacher complètement l'overlay stats */
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

export const StatsMonitor = ({ participant }) => {
  const [stats, setStats] = useState({
    resolution: 'Unknown',
    codec: 'Checking...',
    bitrate: 'Dynamic',
    packetLoss: '0%'
  });

  useEffect(() => {
    if (!participant) return;

    let mounted = true;
    const interval = setInterval(async () => {
      // Find the first video track
      if (!participant.videoTrackPublications) return;
      const tracks = Array.from(participant.videoTrackPublications.values());
      const videoTrackPub = tracks.find(pub => pub.kind === 'video' && pub.track);

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
                 setStats(prev => ({ ...prev, resolution: 'Initializing...' }));
             }

         } catch (e) {
             console.error("Stats error", e);
         }
      } else {
         setStats(prev => ({ ...prev, resolution: 'Off / Unknown' }));
      }
    }, 2000);

    return () => {
        mounted = false;
        clearInterval(interval);
    };
  }, [participant]);
  
  return (
    <StatsContainer initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <h4><Activity size={16} /> Flux Vidéo (Test)</h4>
        <div className="stat-row">
            <span>Résolution</span>
            <span style={{ color: '#4ade80' }}>{stats.resolution}</span>
        </div>
        <div className="stat-row">
            <span>Codec</span>
            <span>{stats.codec}</span>
        </div>
        <div className="stat-row">
            <span>Mode</span>
            <span>Simulcast Enabled</span>
        </div>
        <div style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: THEME.textDim }}>
            *La résolution s'adapte à la bande passante (4K &rarr; 1080p &rarr; 540p)
        </div>
    </StatsContainer>
  );
};
