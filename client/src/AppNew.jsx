import React, { createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { SocketProvider } from './contexts/SocketContext';
import { WebRTCProvider } from './contexts/WebRTCContext';
import HomePageNew from './pages/HomePageNew';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import RoomPage from './pages/RoomPage';
import SupportPage from './pages/SupportPage';
import AccountPage from './pages/AccountPage';
import CheckoutPage from './pages/CheckoutPage';
import UserGuidePage from './pages/UserGuidePage';
import APIDocsPage from './pages/APIDocsPage';
import CommunityPage from './pages/CommunityPage';
import SecurityPage from './pages/SecurityPage';
import IntegrationsPage from './pages/IntegrationsPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import ContactPage from './pages/ContactPage';
import FeaturesPage from './pages/FeaturesPage';
import StatusPage from './pages/StatusPage';
import SchedulerPage from './pages/SchedulerPage';
import AIChatbot from './components/AIChatbot';
import { useNotifications } from './components/Notification';
import './styles.css';

// Contexte pour les notifications
const NotificationContext = createContext();

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
};

function App() {
  const { addNotification, NotificationProvider } = useNotifications();

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <Router>
          <SocketProvider>
            <WebRTCProvider>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<HomePageNew />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/room/:roomId" element={<RoomPage />} />
                  <Route path="/support" element={<SupportPage />} />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/user-guide" element={<UserGuidePage />} />
                  <Route path="/api-docs" element={<APIDocsPage />} />
                  <Route path="/community" element={<CommunityPage />} />
                  <Route path="/security" element={<SecurityPage />} />
                  <Route path="/integrations" element={<IntegrationsPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/features" element={<FeaturesPage />} />
                  <Route path="/status" element={<StatusPage />} />
                  <Route path="/scheduler" element={<SchedulerPage />} />
                </Routes>
              </AnimatePresence>
              <AIChatbot />
            </WebRTCProvider>
          </SocketProvider>
        </Router>
        <NotificationProvider />
      </div>
    </NotificationContext.Provider>
  );
}

export default App;