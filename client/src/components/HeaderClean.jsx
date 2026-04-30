import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Video, Menu, X, User, ChevronDown, BookOpen, Shield, Puzzle, FileText } from 'lucide-react';
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
  padding: 0 2rem;
  height: 80px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  @media (max-width: 1024px) {
    padding: 0 1.5rem;
    height: 76px;
  }
  
  @media (max-width: 640px) {
    height: 68px;
    padding: 0 1.25rem;
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
  width: 40px;
  height: 40px;
  background-color: ${COLORS.primary};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.white};
  flex-shrink: 0;
`;

const LogoText = styled.span`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${COLORS.dark};
  letter-spacing: -0.025em;
  transition: color 0.3s;

  @media (max-width: 480px) {
    display: none;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 2.25rem;
  align-items: center;

  @media (max-width: 1024px) {
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${COLORS.secondary};
  font-weight: 500;
  text-decoration: none;
  font-size: 0.975rem;
  padding: 0.375rem 0;
  position: relative;
  transition: color 0.2s;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${COLORS.primary};
    border-radius: 1px;
    transition: width 0.2s;
  }

  &:hover {
    color: ${COLORS.primary};
    &::after { width: 100%; }
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
`;

const DropdownTrigger = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${COLORS.secondary};
  font-weight: 500;
  font-size: 0.975rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.375rem 0;
  transition: color 0.2s;

  &:hover {
    color: ${COLORS.primary};
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);
  background-color: hsl(var(--card));
  border: 1px solid ${COLORS.border};
  border-radius: 10px;
  box-shadow: 0 10px 25px -5px rgba(0,0,0,0.12);
  min-width: 200px;
  padding: 0.5rem;
  z-index: 1100;
  display: ${props => props.$open ? 'flex' : 'none'};
  flex-direction: column;
  gap: 0.15rem;
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.55rem 0.75rem;
  border-radius: 6px;
  color: ${COLORS.dark};
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background-color 0.15s;

  &:hover {
    background-color: hsl(var(--muted));
    color: ${COLORS.primary};
  }

  svg {
    flex-shrink: 0;
    opacity: 0.7;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 1024px) {
    gap: 0.5rem;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Button = styled(Link)`
  padding: 0.6rem 1.35rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  white-space: nowrap;

  @media (max-width: 1024px) {
    padding: 0.55rem 1rem;
    font-size: 0.9rem;
  }

  ${props => props.$variant === 'primary' ? `
    background-color: ${COLORS.primary};
    color: hsl(var(--primary-foreground));
    border: 1px solid ${COLORS.primary};
    &:hover {
      opacity: 0.9;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
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
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: hsl(var(--muted));
    color: ${COLORS.dark};
  }
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const LogoutButton = styled.button`
  padding: 0.6rem 1.35rem;
  border-radius: 8px;
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
  white-space: nowrap;

  @media (max-width: 1024px) {
    padding: 0.55rem 1rem;
    font-size: 0.9rem;
  }

  &:hover {
    background-color: ${COLORS.background};
    color: ${COLORS.dark};
  }
`;

// Mobile Menu Overlay
const MobileMenuOverlay = styled.div`
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${props => props.$isOpen ? 'block' : 'none'};
  backdrop-filter: blur(4px);

  @media (max-width: 1024px) {
    top: 76px;
  }
  
  @media (max-width: 640px) {
    top: 68px;
  }
`;

const MobileMenuContent = styled.div`
  background-color: hsl(var(--background));
  padding: 1.75rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  border-bottom: 1px solid ${COLORS.border};
  max-height: calc(100vh - 80px);
  overflow-y: auto;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  width: 100%;
  
  @media (max-width: 640px) {
    max-height: calc(100vh - 68px);
    padding: 1.25rem 1.25rem;
  }
`;

const MobileNavLink = styled(Link)`
  color: ${COLORS.dark};
  font-weight: 500;
  text-decoration: none;
  font-size: 1rem;
  padding: 0.85rem 0.75rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  transition: background-color 0.15s, color 0.15s;

  &:hover {
    background-color: hsl(var(--muted));
    color: ${COLORS.primary};
  }
`;

export default function HeaderClean() {
  const { user, signOut } = useAuth();
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const resourcesRef = useRef(null);

  // Close resources dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target)) {
        setResourcesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
            <DropdownWrapper ref={resourcesRef}>
              <DropdownTrigger
                onClick={() => setResourcesOpen(!resourcesOpen)}
                aria-expanded={resourcesOpen}
                aria-haspopup="true"
              >
                Ressources <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: resourcesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </DropdownTrigger>
              <DropdownMenu $open={resourcesOpen}>
                <DropdownItem to="/user-guide" onClick={() => setResourcesOpen(false)}>
                  <BookOpen size={15} /> Guide d'utilisation
                </DropdownItem>
                <DropdownItem to="/docs" onClick={() => setResourcesOpen(false)}>
                  <FileText size={15} /> Documentation
                </DropdownItem>
                <DropdownItem to="/integrations" onClick={() => setResourcesOpen(false)}>
                  <Puzzle size={15} /> Intégrations
                </DropdownItem>
                <DropdownItem to="/security" onClick={() => setResourcesOpen(false)}>
                  <Shield size={15} /> Sécurité
                </DropdownItem>
              </DropdownMenu>
            </DropdownWrapper>
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
            <MobileNavLink to="/user-guide" onClick={() => setIsMobileMenuOpen(false)}>Guide d'utilisation</MobileNavLink>
            <MobileNavLink to="/docs" onClick={() => setIsMobileMenuOpen(false)}>Documentation</MobileNavLink>
            <MobileNavLink to="/integrations" onClick={() => setIsMobileMenuOpen(false)}>Intégrations</MobileNavLink>
            <MobileNavLink to="/security" onClick={() => setIsMobileMenuOpen(false)}>Sécurité</MobileNavLink>
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
