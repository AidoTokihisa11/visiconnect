import React from 'react';
import styled from 'styled-components';
import { NavLink, Outlet } from 'react-router-dom';
import HeaderClean from './HeaderClean';
import FooterClean from './FooterClean';
import { useTranslation } from '../hooks/useTranslation';

const COLORS = {
  primary: 'hsl(var(--primary))',
  secondary: 'hsl(var(--muted-foreground))',
  dark: 'hsl(var(--foreground))',
  text: 'hsl(var(--foreground))',
  border: 'hsl(var(--border))',
  background: 'hsl(var(--background))',
  active: 'hsl(var(--primary) / 0.1)',
};

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${COLORS.background};
  color: ${COLORS.text};
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 2rem 1rem;
  }
`;

const Sidebar = styled.nav`
  position: sticky;
  top: 100px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 768px) {
    position: static;
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${COLORS.border};
    margin-bottom: 2rem;
  }
`;

const SidebarLink = styled(NavLink)`
  display: block;
  padding: 0.75rem 1rem;
  color: ${COLORS.secondary};
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: ${COLORS.background};
    color: ${COLORS.primary};
  }

  &.active {
    background-color: ${COLORS.active};
    color: ${COLORS.primary};
  }

  @media (max-width: 768px) {
    white-space: nowrap;
  }
`;

const Title = styled.h3`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${COLORS.dark};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
  padding-left: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ContentArea = styled.main`
  min-width: 0; /* Prevent overflow */

  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    color: ${COLORS.dark};
    margin-bottom: 1rem;
  }
  
  h2 {
    font-size: 1.75rem;
    font-weight: 700;
    color: ${COLORS.dark};
    margin: 2.5rem 0 1rem;
  }

  p {
    font-size: 1.05rem;
    line-height: 1.7;
    margin-bottom: 1.5rem;
    color: ${COLORS.text};
  }

  ul {
    list-style: disc;
    padding-left: 1.5rem;
    margin-bottom: 1.5rem;
    
    li {
      margin-bottom: 0.5rem;
      color: ${COLORS.text};
    }
  }
`;

const LastUpdated = styled.div`
  margin-top: 4rem;
  padding-top: 1rem;
  border-top: 1px solid ${COLORS.border};
  color: ${COLORS.secondary};
  font-size: 0.875rem;
`;

const LegalLayout = ({ children, title, lastUpdated }) => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <HeaderClean />
      <MainContent>
        <Sidebar>
          <Title>{t('navigation.legal')}</Title>
          <SidebarLink to="/privacy">{t('navigation.privacy')}</SidebarLink>
          <SidebarLink to="/terms">{t('navigation.terms')}</SidebarLink>
          <SidebarLink to="/cookies">{t('navigation.cookies')}</SidebarLink>
          <SidebarLink to="/security">{t('navigation.security')}</SidebarLink>
        </Sidebar>
        <ContentArea>
          {title && <h1>{title}</h1>}
          {children}
          {lastUpdated && (
            <LastUpdated>
              {t('common.lastUpdated', { date: lastUpdated })}
            </LastUpdated>
          )}
        </ContentArea>
      </MainContent>
      <FooterClean />
    </PageContainer>
  );
};

export default LegalLayout;
