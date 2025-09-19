import React, { createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { SocketProvider } from './contexts/SocketContext';
import { WebRTCProvider } from './contexts/WebRTCContext';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
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
import PricingPage from './pages/PricingPage';
import StatusPage from './pages/StatusPage';
import SchedulerPage from './pages/SchedulerPage';
import TermsPage from './pages/TermsPage';
import CookiesPage from './pages/CookiesPage';
import AIChatbot from './components/AIChatbot';
import { useNotifications } from './components/Notification';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    min-height: 100vh;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

const theme = {
  colors: {
    primary: '#4f46e5',
    secondary: '#06b6d4',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    background: '#0f172a',
    surface: 'rgba(255, 255, 255, 0.1)',
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    border: 'rgba(255, 255, 255, 0.2)',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    success: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
    large: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    xl: '16px',
    full: '50%',
  },
};

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
`;

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
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <NotificationContext.Provider value={{ addNotification }}>
        <AppContainer>
          <Router>
            <AuthProvider>
              <SocketProvider>
                <WebRTCProvider>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
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
                  <Route path="/pricing" element={<PricingPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/features" element={<FeaturesPage />} />
                  <Route path="/status" element={<StatusPage />} />
                  <Route path="/scheduler" element={<SchedulerPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/cookies" element={<CookiesPage />} />
                </Routes>
                <AIChatbot />
              </WebRTCProvider>
            </SocketProvider>
            </AuthProvider>
          </Router>
          <NotificationProvider />
        </AppContainer>
      </NotificationContext.Provider>
    </ThemeProvider>
  );
}

export default App;
