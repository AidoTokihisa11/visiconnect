import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const NotificationContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  pointer-events: none;

  @media (max-width: 640px) {
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
    max-width: 100%;
  }
`;

const NotificationCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px -10px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.05);
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid #f1f5f9;
  pointer-events: auto;
  overflow: hidden;
  position: relative;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 0.125rem;
  
  color: ${props =>
    props.$type === 'success' ? '#10b981' :
    props.$type === 'error' ? '#ef4444' :
    props.$type === 'warning' ? '#f59e0b' :
    '#3b82f6'
  };
`;

const Content = styled.div`
  flex: 1;

  .title {
    font-weight: 600;
    font-size: 0.95rem;
    margin-bottom: 0.25rem;
    color: #0f172a;
  }

  .message {
    font-size: 0.875rem;
    color: #475569;
    line-height: 1.4;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 6px;
  margin-top: -0.25rem;
  margin-right: -0.25rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #0f172a;
    background: #f1f5f9;
  }
`;

const ProgressBarWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: #f1f5f9;
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: ${props =>
    props.$type === 'success' ? '#10b981' :
    props.$type === 'error' ? '#ef4444' :
    props.$type === 'warning' ? '#f59e0b' :
    '#3b82f6'
  };
`;

const getIcon = (type) => {
  switch (type) {
    case 'success':
      return <CheckCircle2 size={20} />;
    case 'error':
      return <XCircle size={20} />;
    case 'warning':
      return <AlertTriangle size={20} />;
    default:
      return <Info size={20} />;
  }
};

const Notification = ({
  id,
  type = 'info',
  title,
  message,
  duration = 5000,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => onClose(id), 300);
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
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          layout
        >
          <IconWrapper $type={type}>
            {getIcon(type)}
          </IconWrapper>

          <Content>
            {title && <div className="title">{title}</div>}
            <div className="message">{message}</div>
          </Content>

          <CloseButton onClick={handleClose}>
            <X size={16} />
          </CloseButton>

          {duration > 0 && (
            <ProgressBarWrapper>
              <ProgressBar
                $type={type}
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: duration / 1000, ease: "linear" }}
              />
            </ProgressBarWrapper>
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
    setNotifications(prev => [...prev, { ...notification, id }]);
    return id;
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const NotificationProvider = () => (
    <NotificationContainer>
      <AnimatePresence>
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            {...notification}
            onClose={removeNotification}
          />
        ))}
      </AnimatePresence>
    </NotificationContainer>
  );

  return {
    addNotification,
    removeNotification,
    NotificationProvider
  };
};

export default Notification;
