import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Monitor, Smartphone, Globe } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

const Wrapper = styled.section`
  padding: 6rem 1.5rem;
  background: #f8fafc; // Slate-50 explicitly
  border-bottom: 1px solid #e2e8f0;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1.2fr;
  }
`;

/* --- TEXT CONTENT --- */
const ContentSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  z-index: 10;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #eff6ff;
  color: #2563eb;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  align-self: flex-start;
  border: 1px solid #dbeafe;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  color: #0f172a; // Slate-900 (Dark text explicitly)
  line-height: 1.1;
  letter-spacing: -0.025em;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #475569; // Slate-600
  font-weight: 500;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #64748b; // Slate-500
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const NavButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid #cbd5e1;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #1e293b;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  transition: all 0.2s;

  &:hover {
    background: #f1f5f9;
    border-color: #94a3b8;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

/* --- IMAGE SIDE --- */
const ImageSide = styled.div`
  position: relative;
  height: 500px;
  perspective: 1000px;
  
  @media (max-width: 768px) {
    height: 350px;
    order: -1; // Image on top on mobile
  }
`;

const CardStack = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageCard = styled(motion.div)`
  position: absolute;
  width: 90%;
  height: 90%;
  background: white;
  border-radius: 24px;
  border: 1px solid rgba(255,255,255,0.8);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  transform-style: preserve-3d;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.2) 0%, transparent 40%);
  }
`;

export default function FeaturesCarousel3D() {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);

  const SLIDES = [
    {
      id: 1,
      title: t('featuresCarousel.slide1.title'),
      subtitle: t('featuresCarousel.slide1.subtitle'),
      description: t('featuresCarousel.slide1.description'),
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      icon: Monitor,
      tag: t('featuresCarousel.slide1.tag')
    },
    {
      id: 2,
      title: t('featuresCarousel.slide2.title'),
      subtitle: t('featuresCarousel.slide2.subtitle'),
      description: t('featuresCarousel.slide2.description'),
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      icon: Globe,
      tag: t('featuresCarousel.slide2.tag')
    },
    {
      id: 3,
      title: t('featuresCarousel.slide3.title'),
      subtitle: t('featuresCarousel.slide3.subtitle'),
      description: t('featuresCarousel.slide3.description'),
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      icon: Smartphone,
      tag: t('featuresCarousel.slide3.tag')
    }
  ];

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const currentSlide = SLIDES[index];

  return (
    <Wrapper>
      <Container>
        <ContentSide>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              <Badge>
                <currentSlide.icon size={16} />
                {currentSlide.tag}
              </Badge>
              <Title>{currentSlide.title}</Title>
              <Subtitle>{currentSlide.subtitle}</Subtitle>
              <Description>{currentSlide.description}</Description>
            </motion.div>
          </AnimatePresence>
          
          <Controls>
            <NavButton onClick={prevSlide} aria-label="Précédent">
              <ChevronLeft size={24} />
            </NavButton>
            <NavButton onClick={nextSlide} aria-label="Suivant">
              <ChevronRight size={24} />
            </NavButton>
          </Controls>
        </ContentSide>

        <ImageSide>
          <CardStack>
            <AnimatePresence initial={false} mode="popLayout">
               {/* Background Card (Next) */}
               <ImageCard
                  key={(index + 1) % SLIDES.length}
                  initial={{ scale: 0.8, opacity: 0, z: -100, x: 40 }}
                  animate={{ scale: 0.9, opacity: 0.4, z: -50, x: 40, rotateY: 5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
               >
                 <img src={SLIDES[(index + 1) % SLIDES.length].image} alt="" />
               </ImageCard>

               {/* Active Card */}
               <ImageCard
                  key={index}
                  initial={{ opacity: 0, scale: 0.9, x: 100, rotateY: 10 }}
                  animate={{ opacity: 1, scale: 1, x: 0, rotateY: 0, zIndex: 10 }}
                  exit={{ opacity: 0, scale: 0.9, x: -100, rotateY: -10 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
               >
                  <img src={currentSlide.image} alt={currentSlide.title} />
               </ImageCard>
            </AnimatePresence>
          </CardStack>
        </ImageSide>
      </Container>
    </Wrapper>
  );
}
