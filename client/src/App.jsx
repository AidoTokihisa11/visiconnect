import { AuthenticateWithRedirectCallback } from '@clerk/react';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeProvider } from "./components/theme-provider";
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AdminProvider } from './contexts/AdminContext';
import AdminToolbar from './components/Admin/AdminToolbar';
import SettingsPage from './pages/SettingsPage';

import HomePageClean from './pages/HomePageClean';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import RoomPage from './pages/RoomPageNew';
import SupportPageNew from './pages/SupportPageNew';
import AccountPageSimple from './pages/AccountPageSimple';
import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage';
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
import ChangelogPage from './pages/ChangelogPage';
import BlogPage from './pages/BlogPage';
import PartnersPage from './pages/PartnersPage';
import DocsPage from './pages/DocsPage';
import DeveloperPage from './pages/DeveloperPageV2.jsx';
import AIChatbot from './components/AIChatbot';
import { useNotifications } from './components/Notification';
import ScrollToTop from './components/ScrollToTop';
import BackToTopButton from './components/BackToTopButton';
import { CookieConsentProvider } from './contexts/CookieConsentContext';
import { CookieBanner } from './components/ui/CookieBanner';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
`;

function App() {
  const { NotificationProvider } = useNotifications();

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <CookieConsentProvider>
        <LanguageProvider>
          <AppContainer>
              <Router
                future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true
              }}
            >
              <ScrollToTop />
                <AuthProvider>
                  <AdminProvider>
                      
                        <AdminToolbar />
                        <Routes>
                        <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl="/signup" />} />
                        
                        <Route path="/" element={<HomePageClean />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/room/:roomId" element={<RoomPage />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/support" element={<SupportPageNew />} />
                        <Route path="/account" element={<AccountPageSimple />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/success" element={<SuccessPage />} />
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
                        <Route path="/dashboard" element={<AccountPageSimple />} /> 
                        <Route path="/status" element={<StatusPageNew />} />
                        <Route path="/careers" element={<CareersPageNew />} />
                        <Route path="/scheduler" element={<SchedulerPageNew />} />
                        <Route path="/terms" element={<TermsPage />} />
                        <Route path="/cookies" element={<CookiesPage />} />
                        <Route path="/demo" element={<DemoPageNew />} />
                        <Route path="/changelog" element={<ChangelogPage />} />
                        <Route path="/blog" element={<BlogPage />} />
                        <Route path="/partners" element={<PartnersPage />} />
                        <Route path="/docs" element={<DocsPage />} />
                      </Routes>
                      <AIChatbot />
                      <BackToTopButton />
                    
                  </AdminProvider>
                </AuthProvider>
            </Router>
            <NotificationProvider />
            <CookieBanner />
          </AppContainer>
        </LanguageProvider>
      </CookieConsentProvider>
    </ThemeProvider>
  );
}

export default App;
