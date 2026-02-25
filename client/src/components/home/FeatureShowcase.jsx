import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, BarChart3, Shield, Settings, Users, Monitor } from 'lucide-react';

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
  slate: '#f8fafc'
};

const SectionWrapper = styled.section`
  padding: 6rem 1.5rem;
  background: ${COLORS.slate};
  border-bottom: 1px solid ${COLORS.border};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

const Header = styled.div`
  text-align: center;
  max-width: 600px;
`;

const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: 800;
  color: ${COLORS.dark};
  margin-bottom: 1rem;
  letter-spacing: -0.025em;
`;

const Subtitle = styled.p`
  color: ${COLORS.lightText};
  font-size: 1.125rem;
`;

/* --- TABS --- */
const TabsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  background: ${COLORS.white};
  padding: 0.375rem;
  border-radius: 9999px;
  border: 1px solid ${COLORS.border};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const TabButton = styled.button`
  position: relative;
  padding: 0.625rem 1.25rem;
  border-radius: 9999px; // Full pill
  font-weight: 600;
  font-size: 0.95rem;
  color: ${props => props.$active ? COLORS.primary : COLORS.secondary};
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
  z-index: 1;

  &:hover {
    color: ${COLORS.dark};
  }
`;

const ActiveTabBackground = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: #eff6ff; // Light blue
  border-radius: 9999px;
  z-index: -1;
  border: 1px solid rgba(59, 130, 246, 0.2);
`;

/* --- BROWSER WINDOW --- */
const BrowserWindow = styled(motion.div)`
  width: 100%;
  max-width: 1000px;
  background: ${COLORS.white};
  border-radius: 12px;
  border: 1px solid ${COLORS.border};
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  position: relative;
  aspect-ratio: 16/10;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    aspect-ratio: auto;
    height: 400px;
  }
`;

const WindowHeader = styled.div`
  height: 44px;
  background: #f8fafc;
  border-bottom: 1px solid ${COLORS.border};
  display: flex;
  align-items: center;
  padding: 0 1rem;
  gap: 0.5rem;
`;

const WindowDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.color};
`;

const AddressBar = styled.div`
  height: 24px;
  background: white;
  border: 1px solid ${COLORS.border};
  border-radius: 4px;
  flex: 1;
  margin-left: 1rem;
  margin-right: 4rem;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  font-size: 0.75rem;
  color: ${COLORS.secondary};
  font-family: monospace;
`;

const WindowContent = styled.div`
  flex: 1;
  background: #ffffff;
  position: relative;
  overflow: hidden;
`;

/* --- MOCK UI --- */
const MockContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at center, #ffffff 0%, #f8fafc 100%);
`;

// Meeting View Mock
const MeetingView = () => (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
            <div style={{ background: '#1e293b', borderRadius: '8px', position: 'relative', overflow: 'hidden' }}>
                 <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: '4px', color: 'white', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444' }} /> LIVE
                 </div>
                 <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569' }}>
                    <Video size={48} opacity={0.5} />
                 </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ flex: 1, background: '#cbd5e1', borderRadius: '8px' }} />
                <div style={{ flex: 1, background: '#cbd5e1', borderRadius: '8px' }} />
            </div>
        </div>
        <div style={{ height: '60px', background: COLORS.white, borderRadius: '8px', border: `1px solid ${COLORS.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
             {[1,2,3,4,5].map(i => (
                 <div key={i} style={{ width: 40, height: 40, borderRadius: '50%', background: i===3 ? '#ef4444' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 16, height: 16, background: i===3 ? 'white' : '#94a3b8', borderRadius: '2px' }} />
                 </div>
             ))}
        </div>
    </div>
);

// Analytics View Mock
const AnalyticsView = () => (
    <div style={{ width: '100%', height: '100%', padding: '1rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'auto 1fr', gap: '1.5rem' }}>
        {[1,2,3].map(i => (
            <div key={i} style={{ background: COLORS.white, padding: '1.5rem', borderRadius: '8px', border: `1px solid ${COLORS.border}`, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: '0.875rem', color: COLORS.secondary, marginBottom: '0.5rem' }}>Metric {i}</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: COLORS.primary }}>{98 + i}%</div>
            </div>
        ))}
        <div style={{ gridColumn: 'span 3', background: COLORS.white, borderRadius: '8px', border: `1px solid ${COLORS.border}`, padding: '1.5rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem' }} >
             {[40, 60, 45, 70, 50, 80, 65, 85, 75, 90].map((h, i) => (
                 <motion.div 
                    key={i} 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    style={{ flex: 1, background: '#eff6ff', borderRadius: '4px 4px 0 0', position: 'relative' }}
                 >
                    <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '4px', background: COLORS.primary }} />
                 </motion.div>
             ))}
        </div>
    </div>
);

// Admin View Mock
const AdminView = () => (
    <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '200px 1fr', gap: '1rem' }}>
        <div style={{ borderRight: `1px solid ${COLORS.border}`, paddingRight: '1rem' }}>
            <div style={{ height: 32, background: '#e2e8f0', borderRadius: 6, marginBottom: '1.5rem' }} />
            {[1,2,3,4,5].map(i => (
                <div key={i} style={{ height: 24, background: '#f8fafc', borderRadius: 4, marginBottom: '0.75rem', width: '80%' }} />
            ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ height: 48, background: '#f8fafc', borderRadius: 6, border: `1px solid ${COLORS.border}` }} />
            {[1,2,3].map(i => (
                 <div key={i} style={{ padding: '1rem', border: `1px solid ${COLORS.border}`, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#e2e8f0' }} />
                        <div style={{ width: 120, height: 12, background: '#e2e8f0', borderRadius: 4 }} />
                    </div>
                    <div style={{ width: 80, height: 24, background: '#eff6ff', borderRadius: 99, color: COLORS.primary, fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Active</div>
                 </div>
            ))}
        </div>
    </div>
);


export default function FeatureShowcase() {
  const [activeTab, setActiveTab] = useState('meeting');

  const tabs = [
    { id: 'meeting', label: 'Visioconférence 4K', icon: Video, url: 'visiconnect.app/meeting/live' },
    { id: 'analytics', label: 'Analytics Dashboard', icon: BarChart3, url: 'visiconnect.app/stats' },
    { id: 'admin', label: 'Gestion d\'Équipe', icon: Users, url: 'visiconnect.app/team/settings' },
  ];

  const activeTabData = tabs.find(t => t.id === activeTab);

  return (
    <SectionWrapper>
      <Container>
        <Header>
          <Title>Une interface pensée pour l'efficacité</Title>
          <Subtitle>Passez moins de temps à configurer et plus de temps à collaborer.</Subtitle>
        </Header>

        <TabsContainer>
          {tabs.map((tab) => (
            <TabButton 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              $active={activeTab === tab.id}
            >
              {activeTab === tab.id && (
                <ActiveTabBackground layoutId="activeTabBg" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
              )}
              <span style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <tab.icon size={16} />
                {tab.label}
              </span>
            </TabButton>
          ))}
        </TabsContainer>

        <BrowserWindow
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <WindowHeader>
            <div style={{ display: 'flex', gap: '6px' }}>
                <WindowDot color="#ef4444" />
                <WindowDot color="#f59e0b" />
                <WindowDot color="#10b981" />
            </div>
            <AddressBar>
               <span style={{ color: '#94a3b8' }}>https://</span>{activeTabData.url}
            </AddressBar>
          </WindowHeader>
          
          <WindowContent>
             <AnimatePresence mode="wait">
                <MockContainer
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }} // slight zoom out on exit
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === 'meeting' && <MeetingView />}
                    {activeTab === 'analytics' && <AnalyticsView />}
                    {activeTab === 'admin' && <AdminView />}
                </MockContainer>
             </AnimatePresence>
          </WindowContent>
        </BrowserWindow>

      </Container>
    </SectionWrapper>
  );
}
