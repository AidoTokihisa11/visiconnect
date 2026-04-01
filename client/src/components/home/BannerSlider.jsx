import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, MonitorPlay, Activity, ArrowRight } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

// ========== STYLED COMPONENTS ==========

const SectionWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 6rem auto;
  padding: 0 1rem;
`;

const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: hsl(var(--foreground));
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.125rem;
    color: hsl(var(--muted-foreground));
    max-width: 600px;
    margin: 0 auto;
  }
`;

const ShowcaseContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.05);

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1.5fr;
    gap: 4rem;
    padding: 3rem;
  }
`;

const TabsList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

const TabItem = styled.div`
  padding: 1.5rem;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  background: ${props => props.$active ? 'rgba(59, 130, 246, 0.05)' : 'transparent'};
  border: 1px solid ${props => props.$active ? 'rgba(59, 130, 246, 0.2)' : 'transparent'};
  
  &:hover {
    background: ${props => props.$active ? 'rgba(59, 130, 246, 0.05)' : 'rgba(0, 0, 0, 0.02)'};
  }
  
  .icon-wrapper {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    background: ${props => props.$active ? props.$color : 'hsl(var(--muted))'};
    color: ${props => props.$active ? '#fff' : 'hsl(var(--muted-foreground))'};
    transition: all 0.3s ease;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: ${props => props.$active ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))'};
    margin-bottom: 0.5rem;
    transition: color 0.3s ease;
  }

  p {
    font-size: 0.95rem;
    color: hsl(var(--muted-foreground));
    line-height: 1.5;
  }

  .active-indicator {
    position: absolute;
    left: -1px;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 0;
    background: ${props => props.$color};
    border-radius: 0 4px 4px 0;
    transition: height 0.3s ease;
    
    ${props => props.$active && `
      height: 60%;
    `}
  }
`;

const VisualizerPane = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  border: 1px solid hsl(var(--border));
  box-shadow: inset 0 2px 10px rgba(0,0,0,0.02);
`;

const BrowserMockup = styled(motion.div)`
  width: 90%;
  height: 85%;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid hsl(var(--border));

  .browser-header {
    height: 40px;
    background: #f8fafc;
    border-bottom: 1px solid hsl(var(--border));
    display: flex;
    align-items: center;
    padding: 0 1rem;
    gap: 0.5rem;

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      &.red { background: #ef4444; }
      &.yellow { background: #f59e0b; }
      &.green { background: #22c55e; }
    }
  }

  .browser-body {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: radial-gradient(circle at center, #ffffff 0%, #f8fafc 100%);
    position: relative;
    
    .illustration-wrapper {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }
    
    h4 {
      font-size: 1.5rem;
      font-weight: 600;
      color: hsl(var(--foreground));
    }
    
    .pulsing-circle {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: ${props => props.$themeColor || '#3b82f6'};
      opacity: 0.2;
      animation: pulse 2s infinite;
      position: absolute;
    }

    @keyframes pulse {
      0% { transform: scale(1); opacity: 0.5; }
      50% { transform: scale(1.5); opacity: 0; }
      100% { transform: scale(1); opacity: 0; }
    }
  }
`;

const getIconForIndex = (index) => {
  switch (index) {
    case 0: return <LayoutDashboard size={24} />;
    case 1: return <MonitorPlay size={24} />;
    case 2: return <Activity size={24} />;
    default: return <ArrowRight size={24} />;
  }
};

// ========== COMPONENT ==========

const BannerSlider = ({ slides = [] }) => {
  const [current, setCurrent] = useState(0);
  const { t } = useTranslation();

  // Auto-advance slider
  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) {
    return null;
  }

  const activeColor = slides[current]?.color || '#3b82f6';

  return (
    <SectionWrapper>
      <ShowcaseContainer>
        <TabsList>
          {slides.map((slide, idx) => (
            <TabItem
              key={idx}
              $active={current === idx}
              $color={slide.color || '#3b82f6'}
              onClick={() => setCurrent(idx)}
            >
              <div className="active-indicator" />
              <div className="icon-wrapper">
                {getIconForIndex(idx)}
              </div>
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
            </TabItem>
          ))}
        </TabsList>

        <VisualizerPane>
          <AnimatePresence mode="wait">
            <BrowserMockup
              key={current}
              $themeColor={activeColor}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="browser-header">
                <div className="dot red"></div>
                <div className="dot yellow"></div>
                <div className="dot green"></div>
              </div>
              <div className="browser-body">
                <div className="pulsing-circle" />
                <div className="illustration-wrapper">
                  <div style={{ color: activeColor, transform: 'scale(2)' }}>
                    {getIconForIndex(current)}
                  </div>
                  <h4>{slides[current].title}</h4>
                </div>
              </div>
            </BrowserMockup>
          </AnimatePresence>
        </VisualizerPane>
      </ShowcaseContainer>
    </SectionWrapper>
  );
};

export default BannerSlider;
