import React, { useState, useEffect, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Check, AlertTriangle, Info, Zap, Users, Video, MessageSquare, Settings } from 'lucide-react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useAuth } from '../contexts/AuthContext';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const NotificationContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  max-width: 400px;
  width: 100%;
`;

const NotificationBell = styled(motion.button)`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10001;
  background: rgba(0, 255, 136, 0.1);
  border: 2px solid #00ff88;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #00ff88;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 255, 136, 0.2);
    transform: scale(1.1);
  }

  ${props => props.hasNotifications && `
    animation: ${keyframes`
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    `} 2s infinite;
  `}
`;

const NotificationBadge = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff4444;
  color: #3b82f6;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
`;

const NotificationPanel = styled(motion.div)`
  background: rgba(17, 17, 17, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid #333;
  border-radius: 16px;
  padding: 1.5rem;
  margin-top: 80px;
  max-height: 500px;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #333;
`;

const PanelTitle = styled.h3`
  color: #3b82f6;
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0;
  flex: 1;
`;

const ClearAllButton = styled.button`
  background: transparent;
  border: 1px solid #666;
  color: #888;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #00ff88;
    color: #00ff88;
  }
`;

const NotificationItem = styled(motion.div)`
  background: ${props => {
    switch(props.type) {
      case 'success': return 'rgba(0, 255, 136, 0.1)';
      case 'warning': return 'rgba(255, 193, 7, 0.1)';
      case 'error': return 'rgba(255, 68, 68, 0.1)';
      case 'info': return 'rgba(76, 205, 196, 0.1)';
      default: return 'rgba(255, 255, 255, 0.05)';
    }
  }};
  border: 1px solid ${props => {
    switch(props.type) {
      case 'success': return '#00ff88';
      case 'warning': return '#ffc107';
      case 'error': return '#ff4444';
      case 'info': return '#4ecdc4';
      default: return '#333';
    }
  }};
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 0.5rem;
  position: relative;
  animation: ${slideIn} 0.3s ease-out;
`;

const NotificationHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
`;

const NotificationIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => {
    switch(props.type) {
      case 'success': return '#00ff88';
      case 'warning': return '#ffc107';
      case 'error': return '#ff4444';
      case 'info': return '#4ecdc4';
      default: return '#666';
    }
  }};
  color: #0a0a0a;
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationTitle = styled.h4`
  color: #3b82f6;
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
`;

const NotificationMessage = styled.p`
  color: #ccc;
  font-size: 0.8rem;
  margin: 0;
  line-height: 1.4;
`;

const NotificationTime = styled.div`
  color: #888;
  font-size: 0.7rem;
  margin-top: 0.5rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: transparent;
  border: none;
  color: #888;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    color: #3b82f6;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #888;
`;

const NotificationSystem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  // On récupère les notifications depuis Convex en temps réel
  const convexNotifications = useQuery(api.notifications.getByUserId, user?.id ? { userId: user.id } : "skip");
  const markAsRead = useMutation(api.notifications.markAsRead);

  // État local pour gérer les fermetures rapides depuis l'UI sans attendre la BDD
  const [localDismissed, setLocalDismissed] = useState(new Set());

  const notifications = (convexNotifications || [])
    .filter(n => !n.isRead && !localDismissed.has(n._id))
    .map(n => ({
      id: n._id,
      type: n.title.toLowerCase().includes('erreur') ? 'error' : 'info',
      title: n.title,
      message: n.message,
      timestamp: new Date(n.createdAt),
      icon: <Info size={16} />
    }));

  const addNotification = (notification) => {
    // Cette fonction ne sert à rien si on pousse tout sur Convex, mais on la garde pour
    // la compatibilité UI si d'autres composants tentent de l'appeler.
    console.log("Nouvelle notification locale :", notification);
  };

  const removeNotification = (id) => {
    setLocalDismissed(prev => new Set(prev).add(id));
    if (typeof id === "string" && !id.startsWith("demo")) {
      markAsRead({ notificationId: id }).catch(console.error);
    }
  };

  const clearAll = () => {
    notifications.forEach(n => removeNotification(n.id));
  };

  const clearAllNotifications = () => {
    clearAll();
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `Il y a ${minutes}m`;
    if (hours < 24) return `Il y a ${hours}h`;
    return `Il y a ${days}j`;
  };

  const getNotificationIcon = (type, customIcon) => {
    if (customIcon) return customIcon;
    
    switch(type) {
      case 'success': return <Check size={16} />;
      case 'warning': return <AlertTriangle size={16} />;
      case 'error': return <X size={16} />;
      case 'info': return <Info size={16} />;
      default: return <Bell size={16} />;
    }
  };

  return (
    <NotificationContainer>
      <NotificationBell
        onClick={() => setIsOpen(!isOpen)}
        hasNotifications={notifications.length > 0}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bell size={24} />
        {notifications.length > 0 && (
          <NotificationBadge>
            {notifications.length > 9 ? '9+' : notifications.length}
          </NotificationBadge>
        )}
      </NotificationBell>

      <AnimatePresence>
        {isOpen && (
          <NotificationPanel
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <PanelHeader>
              <PanelTitle>Notifications</PanelTitle>
              {notifications.length > 0 && (
                <ClearAllButton onClick={clearAllNotifications}>
                  Tout effacer
                </ClearAllButton>
              )}
            </PanelHeader>

            {notifications.length === 0 ? (
              <EmptyState>
                <Bell size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
                <p>Aucune notification</p>
              </EmptyState>
            ) : (
              <AnimatePresence>
                {notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    type={notification.type}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CloseButton onClick={() => removeNotification(notification.id)}>
                      <X size={14} />
                    </CloseButton>
                    
                    <NotificationHeader>
                      <NotificationIcon type={notification.type}>
                        {getNotificationIcon(notification.type, notification.icon)}
                      </NotificationIcon>
                      <NotificationContent>
                        <NotificationTitle>{notification.title}</NotificationTitle>
                        <NotificationMessage>{notification.message}</NotificationMessage>
                      </NotificationContent>
                    </NotificationHeader>
                    
                    <NotificationTime>
                      {formatTime(notification.timestamp)}
                    </NotificationTime>
                  </NotificationItem>
                ))}
              </AnimatePresence>
            )}
          </NotificationPanel>
        )}
      </AnimatePresence>
    </NotificationContainer>
  );
};

export default NotificationSystem;
