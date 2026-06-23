import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import {
  Video,
  Mic,
  Share2,
  PhoneOff,
  Settings,
  Users,
  MessageSquare,
  BarChart3,
  Clock,
  Calendar,
} from 'lucide-react';

const COLORS = {
  primary: 'hsl(var(--primary))',
  secondary: 'hsl(var(--muted-foreground))',
  dark: 'hsl(var(--foreground))',
  text: 'hsl(var(--foreground))',
  lightText: 'hsl(var(--muted-foreground))',
  background: 'hsl(var(--background))',
  white: 'hsl(var(--card))',
  border: 'hsl(var(--border))',
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
};

const SliderWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  padding: 2rem 0;
`;

const EmblaContainer = styled.div`
  display: flex;
  gap: 2rem;
  /* Add negative margin to offset the padding of the slides if needed */
  margin-left: -1rem;
`;

const Slide = styled.div`
  flex: 0 0 85%;
  min-width: 0;
  padding-left: 1rem;
  position: relative;

  @media (min-width: 768px) {
    flex: 0 0 60%;
  }

  @media (min-width: 1024px) {
    flex: 0 0 50%;
  }
`;

const AppWindow = styled(motion.div)`
  background: ${COLORS.white};
  border: 1px solid ${COLORS.border};
  border-radius: 12px;
  overflow: hidden;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  aspect-ratio: 16/10;
  display: flex;
  flex-direction: column;
  height: 400px;
`;

const WindowHeader = styled.div`
  height: 40px;
  background: #f1f5f9;
  border-bottom: 1px solid ${COLORS.border};
  display: flex;
  align-items: center;
  padding: 0 1rem;
  gap: 0.5rem;

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
`;

const WindowContent = styled.div`
  flex: 1;
  background: #f8fafc;
  padding: 1rem;
  overflow: hidden;
  position: relative;
`;

/* --- MOCK UI COMPONENTS --- */

// Dashboard UI
const DashboardMock = () => (
  <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', height: '100%', gap: '1rem' }}>
    <div
      style={{
        background: COLORS.white,
        borderRadius: '8px',
        border: `1px solid ${COLORS.border}`,
        padding: '1rem',
      }}
    >
      <div
        style={{
          height: '32px',
          background: '#e2e8f0',
          borderRadius: '4px',
          marginBottom: '1.5rem',
        }}
      />
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            height: '24px',
            background: '#f1f5f9',
            borderRadius: '4px',
            marginBottom: '0.75rem',
            width: '80%',
          }}
        />
      ))}
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              background: COLORS.white,
              borderRadius: '8px',
              border: `1px solid ${COLORS.border}`,
              padding: '1rem',
              height: '100px',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#eff6ff',
                marginBottom: '0.5rem',
              }}
            />
            <div
              style={{ width: '40%', height: '16px', background: '#e2e8f0', borderRadius: '4px' }}
            />
          </div>
        ))}
      </div>
      <div
        style={{
          background: COLORS.white,
          borderRadius: '8px',
          border: `1px solid ${COLORS.border}`,
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60%',
            background: 'linear-gradient(0deg, #eff6ff 0%, transparent 100%)',
            opacity: 0.5,
          }}
        />
        <div
          style={{
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{ width: '120px', height: '20px', background: '#e2e8f0', borderRadius: '4px' }}
          />
        </div>
      </div>
    </div>
  </div>
);

// Meeting UI
const MeetingMock = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateRows: '1fr 60px',
      height: '100%',
      gap: '0.5rem',
      background: '#0f172a',
      borderRadius: '8px',
      padding: '0.5rem',
    }}
  >
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
      <div style={{ background: '#1e293b', borderRadius: '8px', position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            left: '8px',
            background: 'rgba(0,0,0,0.5)',
            padding: '2px 8px',
            borderRadius: '4px',
            color: 'white',
            fontSize: '10px',
          }}
        >
          Alice
        </div>
      </div>
      <div style={{ background: '#334155', borderRadius: '8px', position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            left: '8px',
            background: 'rgba(0,0,0,0.5)',
            padding: '2px 8px',
            borderRadius: '4px',
            color: 'white',
            fontSize: '10px',
          }}
        >
          Bob
        </div>
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
      {[Mic, Video, Share2, Settings, PhoneOff].map((Icon, i) => (
        <div
          key={i}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: i === 4 ? COLORS.danger : '#334155',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}
        >
          <Icon size={16} />
        </div>
      ))}
    </div>
  </div>
);

// Settings UI
const SettingsMock = () => (
  <div style={{ padding: '1rem', background: COLORS.white, height: '100%', borderRadius: '8px' }}>
    <div
      style={{
        fontSize: '1.25rem',
        fontWeight: 'bold',
        marginBottom: '1.5rem',
        color: COLORS.dark,
      }}
    >
      Paramètres Audio/Vidéo
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <div
          style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            marginBottom: '0.5rem',
            color: COLORS.secondary,
          }}
        >
          Caméra
        </div>
        <div
          style={{
            padding: '0.75rem',
            border: `1px solid ${COLORS.border}`,
            borderRadius: '6px',
            background: '#f8fafc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>Logitech Brio 4K</span>
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: COLORS.success,
            }}
          />
        </div>
      </div>
      <div>
        <div
          style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            marginBottom: '0.5rem',
            color: COLORS.secondary,
          }}
        >
          Microphone
        </div>
        <div
          style={{
            padding: '0.75rem',
            border: `1px solid ${COLORS.border}`,
            borderRadius: '6px',
            background: '#f8fafc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>Yeti Blue X</span>
          <div
            style={{
              width: '40px',
              height: '6px',
              borderRadius: '3px',
              background: '#e2e8f0',
              overflow: 'hidden',
            }}
          >
            <div style={{ width: '60%', height: '100%', background: COLORS.success }} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function InterfaceSlider() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'center' }, [Autoplay({ delay: 3000 })]);

  return (
    <SliderWrapper ref={emblaRef}>
      <EmblaContainer>
        <Slide>
          <AppWindow whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
            <WindowHeader>
              <div className="dot" style={{ background: '#ef4444' }} />
              <div className="dot" style={{ background: '#f59e0b' }} />
              <div className="dot" style={{ background: '#10b981' }} />
              <span style={{ fontSize: '12px', color: COLORS.lightText, marginLeft: '1rem' }}>
                Dashboard.tsx
              </span>
            </WindowHeader>
            <WindowContent>
              <DashboardMock />
            </WindowContent>
          </AppWindow>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <h4 style={{ fontWeight: '600', color: COLORS.dark }}>Dashboard Admin</h4>
            <p style={{ fontSize: '0.875rem', color: COLORS.lightText }}>
              Gestion centralisée de vos équipes.
            </p>
          </div>
        </Slide>

        <Slide>
          <AppWindow whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
            <WindowHeader>
              <div className="dot" style={{ background: '#ef4444' }} />
              <div className="dot" style={{ background: '#f59e0b' }} />
              <div className="dot" style={{ background: '#10b981' }} />
              <span style={{ fontSize: '12px', color: COLORS.lightText, marginLeft: '1rem' }}>
                MeetingRoom.tsx
              </span>
            </WindowHeader>
            <WindowContent style={{ background: '#020617', padding: '0.5rem' }}>
              <MeetingMock />
            </WindowContent>
          </AppWindow>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <h4 style={{ fontWeight: '600', color: COLORS.dark }}>Salle de Réunion 4K</h4>
            <p style={{ fontSize: '0.875rem', color: COLORS.lightText }}>
              Qualité cristalline e2e.
            </p>
          </div>
        </Slide>

        <Slide>
          <AppWindow whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
            <WindowHeader>
              <div className="dot" style={{ background: '#ef4444' }} />
              <div className="dot" style={{ background: '#f59e0b' }} />
              <div className="dot" style={{ background: '#10b981' }} />
              <span style={{ fontSize: '12px', color: COLORS.lightText, marginLeft: '1rem' }}>
                Settings.tsx
              </span>
            </WindowHeader>
            <WindowContent>
              <SettingsMock />
            </WindowContent>
          </AppWindow>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <h4 style={{ fontWeight: '600', color: COLORS.dark }}>Configuration Facile</h4>
            <p style={{ fontSize: '0.875rem', color: COLORS.lightText }}>
              Compatible avec tous vos périphériques.
            </p>
          </div>
        </Slide>
      </EmblaContainer>
    </SliderWrapper>
  );
}
