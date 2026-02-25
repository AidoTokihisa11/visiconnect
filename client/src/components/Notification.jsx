import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertCircle, Info } from 'lucide-react';

const NotificationContainer = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
`;

const NotificationCard = styled(motion.div)`
  background: ${props => 
    props.type === 'success' ? 'linear-gradient(135deg, #00ff88, #00e67a)' :
    props.type === 'error' ? 'linear-gradient(135deg, #ff4444, #e63946)' :
    props.type === 'warning' ? 'linear-gradient(135deg, #f9ca24, #f0932b)' :
    'linear-gradient(135deg, #3498db, #2980b9)'
  };
  color: #3b82f6;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  gap: 1rem;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

const Content = styled.div`
  flex: 1;
  
  .title {
    font-weight: 600;
    font-size: 0.95rem;
    margin-bottom: 0.25rem;
  }
  
  .message {
    font-size: 0.85rem;
    opacity: 0.9;
    line-height: 1.4;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #3b82f6;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  opacity: 0.7;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 1;
  }
`;

const ProgressBar = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 0 0 12px 12px;
`;

const getIcon = (type) => {
  switch (type) {
    case 'success':
      return <Check size={20} />;
    case 'error':
      return <X size={20} />;
    case 'warning':
      return <AlertCircle size={20} />;
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
          type={type}
          initial={{ opacity: 0, x: 300, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          layout
        >
          <IconWrapper>
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
            <ProgressBar
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: duration / 1000, ease: "linear" }}
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
