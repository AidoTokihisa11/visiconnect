import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

// ========== STYLED COMPONENTS ==========

const SliderContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 24px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
`;

const SlideTrack = styled(motion.div)`
  display: flex;
  cursor: grab;
  &:active { cursor: grabbing; }
`;

const SlideItem = styled.div`
  min-width: 100%;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  position: relative;
  
  .preview-ui {
    width: 100%;
    max-width: 800px;
    height: 400px;
    background: hsl(var(--card));
    border-radius: 16px;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    border: 1px solid hsl(var(--border));
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    
    .ui-header {
      height: 40px;
      border-bottom: 1px solid hsl(var(--border));
      display: flex;
      align-items: center;
      padding: 0 1rem;
      gap: 0.5rem;
      background: #f1f5f9;
      
      .dot { width: 8px; height: 8px; border-radius: 50%; background: #cbd5e1; }
    }
    
    .ui-body {
      flex: 1;
      padding: 2rem;
      display: grid;
      place-items: center;
      background: radial-gradient(circle at center, #f8fafc 0%, #ffffff 100%);
      
      h3 { font-size: 2rem; color: hsl(var(--primary)); margin-bottom: 1rem; }
      p { color: hsl(var(--muted-foreground)); max-width: 400px; }
    }
  }
`;

const SliderNav = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 10;
`;

const SliderDot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: ${props => props.$active ? 'hsl(var(--primary))' : 'hsl(var(--muted))'};
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    transform: scale(1.2);
  }
`;

const SliderArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(4px);
  border: 1px solid hsl(var(--border));
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 10;
  color: hsl(var(--foreground));
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  
  &:hover {
    background: hsl(var(--card));
    transform: translateY(-50%) scale(1.1);
  }
  
  &.prev { left: 1rem; }
  &.next { right: 1rem; }
`;

// ========== COMPONENT ==========

const BannerSlider = ({ slides = [] }) => {
  const [current, setCurrent] = useState(0);
  const { t } = useTranslation();

  if (slides.length === 0) {
    return null;
  }

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <SliderContainer>
      <AnimatePresence mode="wait">
        <SlideTrack
          key={current}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          <SlideItem>
            <div className="preview-ui">
              <div className="ui-header">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
              <div className="ui-body">
                <h3>{slides[current].title}</h3>
                <p>{slides[current].description}</p>
              </div>
            </div>
          </SlideItem>
        </SlideTrack>
      </AnimatePresence>

      <SliderNav>
        {slides.map((_, idx) => (
          <SliderDot
            key={idx}
            $active={idx === current}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </SliderNav>

      <SliderArrow
        className="prev"
        onClick={handlePrev}
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </SliderArrow>

      <SliderArrow
        className="next"
        onClick={handleNext}
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </SliderArrow>
    </SliderContainer>
  );
};

export default BannerSlider;
