import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Video, Menu, X, User } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from '../hooks/useTranslation';

const COLORS = {
  primary: 'hsl(var(--primary))',    
  secondary: 'hsl(var(--muted-foreground))',  
  dark: 'hsl(var(--foreground))',       
  white: 'hsl(var(--background))',
  border: 'hsl(var(--border))',     
  background: 'hsl(var(--secondary))', 
};

const SHADOWS = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
};

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: hsl(var(--card));
  border-bottom: 1px solid hsl(var(--border));
  box-shadow: ${SHADOWS.sm};
  padding: 0 1rem;
  height: 72px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  
  @media (max-width: 640px) {
    height: 64px;
    padding: 0 1rem;
  }
`;

const NavContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
`;

const LogoIcon = styled.div`
  width: 36px;
  height: 36px;
  background-color: ${COLORS.primary};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.white};
`;

const LogoText = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${COLORS.dark};
  letter-spacing: -0.025em;
  transition: color 0.3s;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${COLORS.secondary};
  font-weight: 500;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s;

  &:hover {
    color: ${COLORS.primary};
  }
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Button = styled(Link)`
  padding: 0.625rem 1.25rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  ${props => props.$variant === 'primary' ? `
    background-color: ${COLORS.primary};
    color: hsl(var(--primary-foreground));
    border: 1px solid ${COLORS.primary};
    &:hover {
      opacity: 0.9;
    }
  ` : `
    background-color: transparent;
    color: ${COLORS.secondary};
    border: 1px solid ${COLORS.border};
    &:hover {
      background-color: ${COLORS.background};
      color: ${COLORS.dark};
    }
  `}
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: ${COLORS.secondary};
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const LogoutButton = styled.button`
  padding: 0.625rem 1.25rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  background-color: transparent;
  color: ${COLORS.secondary};
  border: 1px solid ${COLORS.border};

  &:hover {
    background-color: ${COLORS.background};
    color: ${COLORS.dark};
  }
`;

// Mobile Menu Overlay
const MobileMenuOverlay = styled.div`
  position: fixed;
  top: 72px; /* Match header height */
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${props => props.$isOpen ? 'block' : 'none'};
  backdrop-filter: blur(4px);
  
  @media (max-width: 640px) {
    top: 64px; /* Match mobile header height */
  }
`;

const MobileMenuContent = styled.div`
  background-color: hsl(var(--background));
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-bottom: 1px solid ${COLORS.border};
  max-height: calc(100vh - 72px);
  overflow-y: auto;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  width: 100%;
  
  @media (max-width: 640px) {
    max-height: calc(100vh - 64px);
    padding: 1rem;
  }
  }
`;

const MobileNavLink = styled(Link)`
  color: ${COLORS.dark};
  font-weight: 600;
  text-decoration: none;
  font-size: 1.125rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${COLORS.border};
`;

export default function HeaderClean() {
  const { user, signOut } = useAuth();
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <HeaderContainer>
        <NavContainer>
          <LogoContainer to="/">
            <LogoIcon>
              <Video size={20} />
            </LogoIcon>
            <LogoText>VisioConnect</LogoText>
          </LogoContainer>

          <NavLinks>
            <NavLink to="/features">{t('navigation.features')}</NavLink>
            <NavLink to="/pricing">{t('navigation.pricing')}</NavLink>
            <NavLink to="/demo">{t('navigation.demo')}</NavLink>
            <NavLink to="/developer">{t('navigation.developers')}</NavLink>
            <NavLink to="/contact">{t('navigation.contact')}</NavLink>
          </NavLinks>

          <AuthButtons>
            {user ? (
               <>
                <Button to="/dashboard" $variant="primary">
                  <User size={18} />
                  Tableau de bord
                </Button>
                <LogoutButton onClick={handleLogout}>
                  Déconnexion
                </LogoutButton>
               </>
            ) : (
              <>
                <Button to="/login" $variant="ghost">{t('common.login')}</Button>
                <Button to="/signup" $variant="primary">{t('common.register')}</Button>
              </>
            )}
            <LanguageSelector />
          </AuthButtons>

          <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </MobileMenuButton>
        </NavContainer>
      </HeaderContainer>

      {isMobileMenuOpen && (
        <MobileMenuOverlay $isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(false)}>
          <MobileMenuContent onClick={e => e.stopPropagation()}>
            <MobileNavLink to="/features" onClick={() => setIsMobileMenuOpen(false)}>{t('navigation.features')}</MobileNavLink>
            <MobileNavLink to="/pricing" onClick={() => setIsMobileMenuOpen(false)}>{t('navigation.pricing')}</MobileNavLink>
            <MobileNavLink to="/demo" onClick={() => setIsMobileMenuOpen(false)}>{t('navigation.demo')}</MobileNavLink>
            <MobileNavLink to="/developer" onClick={() => setIsMobileMenuOpen(false)}>{t('navigation.developers')}</MobileNavLink>
            <MobileNavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)}>{t('navigation.contact')}</MobileNavLink>
            <div style={{ margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {user ? (
                   <>
                    <Button to="/dashboard" $variant="primary" onClick={() => setIsMobileMenuOpen(false)} style={{ justifyContent: 'center' }}>
                      <User size={18} />
                      Tableau de bord
                    </Button>
                    <LogoutButton onClick={handleLogout} style={{ justifyContent: 'center', width: '100%' }}>
                      Déconnexion
                    </LogoutButton>
                   </>
                ) : (
                  <>
                    <Button to="/login" $variant="ghost" onClick={() => setIsMobileMenuOpen(false)} style={{ justifyContent: 'center' }}>{t('common.login')}</Button>
                    <Button to="/signup" $variant="primary" onClick={() => setIsMobileMenuOpen(false)} style={{ justifyContent: 'center' }}>{t('common.register')}</Button>
                  </>
                )}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <LanguageSelector />
                </div>
            </div>
          </MobileMenuContent>
        </MobileMenuOverlay>
      )}
    </>
  );
}
