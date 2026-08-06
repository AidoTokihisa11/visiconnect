import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X as XIcon, AlertTriangle, Info } from 'lucide-react';

const NotificationContainer = styled.div`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  max-width: 380px;
  pointer-events: none;

  @media (max-width: 640px) {
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
    max-width: 100%;
  }
`;

const ACCENT = {
  success: '#0f172a',
  error: '#dc2626',
  warning: '#b45309',
  info: '#0f172a',
};

const ICON_BG = {
  success: '#f0fdf4',
  error: '#fef2f2',
  warning: '#fffbeb',
  info: '#f1f5f9',
};

const ICON_FG = {
  success: '#16a34a',
  error: '#dc2626',
  warning: '#d97706',
  info: '#0f172a',
};

const NotificationCard = styled(motion.div)`
  background: #ffffff;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  box-shadow:
    0 1px 2px rgba(15, 23, 42, 0.04),
    0 8px 24px -12px rgba(15, 23, 42, 0.12);
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  pointer-events: auto;
  position: relative;
  overflow: hidden;
`;

const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: ${(props) => ICON_BG[props.$type] || ICON_BG.info};
  color: ${(props) => ICON_FG[props.$type] || ICON_FG.info};
  margin-top: 1px;
`;

const Content = styled.div`
  flex: 1;
  min-width: 0;

  .title {
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.3;
    letter-spacing: -0.005em;
    color: ${(props) => ACCENT[props.$type] || ACCENT.info};
  }

  .message {
    font-size: 0.8125rem;
    color: #64748b;
    line-height: 1.45;
    margin-top: 0.125rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 6px;
  margin: -0.125rem -0.25rem 0 0;
  transition:
    color 0.15s ease,
    background 0.15s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &:hover {
    color: #0f172a;
    background: #f1f5f9;
  }

  &:focus-visible {
    outline: 2px solid #0f172a;
    outline-offset: 1px;
  }
`;

const ProgressLine = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: ${(props) => ICON_FG[props.$type] || ICON_FG.info};
  opacity: 0.5;
`;

const getIcon = (type) => {
  switch (type) {
    case 'success':
      return <Check size={13} strokeWidth={3} />;
    case 'error':
      return <XIcon size={13} strokeWidth={3} />;
    case 'warning':
      return <AlertTriangle size={13} strokeWidth={2.5} />;
    default:
      return <Info size={13} strokeWidth={2.5} />;
  }
};

const Notification = ({ id, type = 'info', title, message, duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => onClose(id), 200);
  }, [id, onClose]);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, handleClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <NotificationCard
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98, transition: { duration: 0.15 } }}
          transition={{ type: 'spring', stiffness: 500, damping: 34 }}
          layout
        >
          <IconWrapper $type={type}>{getIcon(type)}</IconWrapper>

          <Content $type={type}>
            {title && <div className="title">{title}</div>}
            <div className="message">{message}</div>
          </Content>

          <CloseButton onClick={handleClose} aria-label="Fermer">
            <XIcon size={14} strokeWidth={2.25} />
          </CloseButton>

          {duration > 0 && (
            <ProgressLine
              $type={type}
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: duration / 1000, ease: 'linear' }}
            />
          )}
        </NotificationCard>
      )}
    </AnimatePresence>
  );
};

// Hook pour gérer les notifications
export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now() + Math.random();
    setNotifications((prev) => [...prev, { ...notification, id }]);
    return id;
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const NotificationProvider = () => (
    <NotificationContainer>
      <AnimatePresence>
        {notifications.map((notification) => (
          <Notification key={notification.id} {...notification} onClose={removeNotification} />
        ))}
      </AnimatePresence>
    </NotificationContainer>
  );

  return {
    addNotification,
    removeNotification,
    NotificationProvider,
  };
};

export default Notification;
