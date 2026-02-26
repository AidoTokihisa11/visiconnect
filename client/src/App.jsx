import React, { createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider } from "./components/theme-provider";
import { SupabaseRealtimeProvider } from './contexts/SupabaseRealtimeContext';
import { WebRTCProvider } from './contexts/WebRTCContext';
import { AuthProvider } from './contexts/AuthContext';
import { SupabaseAuthProvider } from './contexts/SupabaseAuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AdminProvider } from './contexts/AdminContext';
import AdminToolbar from './components/Admin/AdminToolbar';
import SettingsPage from './pages/SettingsPage';

// import HomePage from './pages/HomePage';
import HomePageClean from './pages/HomePageClean';
// import LoginPageModern from './pages/LoginPageModern';
// import SignupPageModern from './pages/SignupPageModern';
import SupabaseLoginPage from './pages/SupabaseLoginPage';
import SupabaseSignupPage from './pages/SupabaseSignupPage';
import AuthCallback from './pages/AuthCallback';
import RoomPage from './pages/RoomPageNew'; // Updated to new immersive room
// import RoomPageOld from './pages/RoomPage';
import SupportPageNew from './pages/SupportPageNew';
import AccountPageSimple from './pages/AccountPageSimple';
import CheckoutPage from './pages/CheckoutPage';
import UserGuidePage from './pages/UserGuidePageNew';
import CommunityPage from './pages/CommunityPage';
import SecurityPage from './pages/SecurityPage';
import IntegrationsPage from './pages/IntegrationsPage';
import AboutPageNew from './pages/AboutPageNew';
import PrivacyPage from './pages/PrivacyPage';
import ContactPage from './pages/ContactPage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import StatusPageNew from './pages/StatusPageNew';
import CareersPageNew from './pages/CareersPageNew';
import SchedulerPageNew from './pages/SchedulerPageNew';
import AdminDashboard from './pages/AdminDashboard'; // Admin monitoring component
import TermsPage from './pages/TermsPage';
import CookiesPage from './pages/CookiesPage';
import DemoPageNew from './pages/DemoPageNew';
// import MeetingSetupPageNew from './pages/MeetingSetupPageNew';
// import VideoConferencePageNew from './pages/VideoConferencePageNew';
import ChangelogPage from './pages/ChangelogPage';
import BlogPage from './pages/BlogPage';
import PartnersPage from './pages/PartnersPage';
import DocsPage from './pages/DocsPage';
import DeveloperPage from './pages/DeveloperPageV2';
// import StreamTest4K from './components/StreamTest4K';
// import TailwindDemo from './components/TailwindDemo';
// import HomePageTailwind from './pages/HomePageTailwind';
import AIChatbot from './components/AIChatbot';
import { useNotifications } from './components/Notification';
import ScrollToTop from './components/ScrollToTop';
import BackToTopButton from './components/BackToTopButton';
// import WarmGlobalStyle from './styles/WarmGlobalStyle';

// Utilisation du style global plus chaud (Désactivé pour le nouveau design Clean)
// const GlobalStyle = WarmGlobalStyle;

const theme = {
  colors: {
    primary: '#2563eb', // Solid Blue
    secondary: '#475569', // Slate
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    background: '#f8fafc',
    surface: '#ffffff',
    text: '#0f172a',
    textSecondary: '#64748b',
    border: '#e2e8f0',
  },
  shadows: {
    small: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    medium: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    large: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    xl: '16px',
    full: '9999px',
  },
};

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
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
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <StyledThemeProvider theme={theme}>
        {/* <GlobalStyle /> */}
        <LanguageProvider>
        <NotificationContext.Provider value={{ addNotification }}>
          <AppContainer>
            <Router 
              future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true
              }}
            >
              <ScrollToTop />
              <SupabaseAuthProvider>
                <AdminProvider>
                  <AuthProvider>
                    <SupabaseRealtimeProvider>
                      <WebRTCProvider>
                        <AdminToolbar />
                        <Routes>
                        {/* Auth Callback Route */}
                        <Route path="/auth/callback" element={<AuthCallback />} />
                        
                        <Route path="/" element={<HomePageClean />} />
                        {/* <Route path="/home-original" element={<HomePage />} /> */}
                        <Route path="/login" element={<SupabaseLoginPage />} />
                        <Route path="/signup" element={<SupabaseSignupPage />} />
                        {/* <Route path="/login-old" element={<LoginPageModern />} /> */}
                        {/* <Route path="/signup-old" element={<SignupPageModern />} /> */}
                        <Route path="/room/:roomId" element={<RoomPage />} />
                        {/* <Route path="/room-old/:roomId" element={<RoomPageOld />} /> */}
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/support" element={<SupportPageNew />} />
                        <Route path="/account" element={<AccountPageSimple />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/user-guide" element={<UserGuidePage />} />
                        <Route path="/community" element={<CommunityPage />} />
                        <Route path="/security" element={<SecurityPage />} />
                        <Route path="/integrations" element={<IntegrationsPage />} />
                        <Route path="/about" element={<AboutPageNew />} />
                        <Route path="/pricing" element={<PricingPage />} />
                        <Route path="/privacy" element={<PrivacyPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/features" element={<FeaturesPage />} />
                        <Route path="/developer" element={<DeveloperPage />} />
                        <Route path="/dashboard" element={<AdminDashboard />} /> 
                        <Route path="/status" element={<StatusPageNew />} />
                        <Route path="/careers" element={<CareersPageNew />} />
                        <Route path="/scheduler" element={<SchedulerPageNew />} />
                        <Route path="/terms" element={<TermsPage />} />
                        <Route path="/cookies" element={<CookiesPage />} />
                        <Route path="/demo" element={<DemoPageNew />} />
                        {/* <Route path="/tailwind-demo" element={<TailwindDemo />} /> */}
                        {/* <Route path="/home-tailwind" element={<HomePageTailwind />} /> */}
                        {/* <Route path="/meeting-setup" element={<MeetingSetupPageNew />} /> */}
                        {/* <Route path="/video-conference" element={<VideoConferencePageNew />} /> */}
                        <Route path="/changelog" element={<ChangelogPage />} />
                        <Route path="/blog" element={<BlogPage />} />
                        <Route path="/partners" element={<PartnersPage />} />
                        <Route path="/docs" element={<DocsPage />} />
                        {/* <Route path="/test-4k" element={<StreamTest4K />} /> */}
                      </Routes>
                      <AIChatbot />
                      <BackToTopButton />
                    </WebRTCProvider>
                    </SupabaseRealtimeProvider>
                  </AuthProvider>
                </AdminProvider>
              </SupabaseAuthProvider>
            </Router>
            <NotificationProvider />
          </AppContainer>
        </NotificationContext.Provider>
        </LanguageProvider>
      </StyledThemeProvider>
    </ThemeProvider>
  );
}

export default App;
