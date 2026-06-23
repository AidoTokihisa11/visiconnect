import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../contexts/AdminContext';
import { useLocation } from 'react-router-dom';

const Button = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 9999;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  &:hover {
    background-color: hsl(var(--primary) / 0.9);
  }
`;

const BackToTopButton = () => {
  const { uiConfig, isChatbotOpen } = useAdmin();
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  // Hide on room pages
  const isRoomPage = location.pathname.startsWith('/room/');

  useEffect(() => {
    const toggleVisibility = () => {
      // Lower threshold to 100px so it appears sooner
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const getPositionCords = () => {
    const chatbotPos = uiConfig?.chatbotPosition || 'right';
    // Default to left unless configured otherwise or colliding
    const myPos = uiConfig?.backToTopPosition || 'left';

    const styles = {};

    if (myPos === 'right') {
      styles.right = '2rem';
      styles.left = 'auto'; // Reset left
    } else {
      styles.left = '2rem';
      styles.right = 'auto'; // Reset right
    }

    // If on same side as chatbot
    if (chatbotPos === myPos) {
      if (isChatbotOpen) {
        styles.bottom = 'calc(2rem + 520px)'; // 500px window + 20px gap
      } else {
        styles.bottom = 'calc(2rem + 80px)'; // 60px button + 20px gap
      }
    } else {
      styles.bottom = '2rem';
    }

    return styles;
  };

  if (isRoomPage) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, ...getPositionCords() }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <ArrowUp size={24} color="white" />
        </Button>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;
