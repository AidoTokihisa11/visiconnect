import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { 
  Github, Linkedin, Twitter, 
  Globe
} from 'lucide-react';

const COLORS = {
  primary: 'hsl(var(--primary))',    
  secondary: 'hsl(var(--muted-foreground))',  
  dark: 'hsl(var(--foreground))',       
  text: 'hsl(var(--foreground))',       
  lightText: 'hsl(var(--muted-foreground))',  
  background: 'hsl(var(--secondary))', 
  white: 'hsl(var(--background))',
  border: 'hsl(var(--border))',     
};

const FooterContainer = styled.footer`
  background-color: hsl(var(--card)); 
  color: ${COLORS.text};
  border-top: 1px solid ${COLORS.border};
  padding: 4rem 1.5rem;
  margin-top: auto;
  transition: background-color 0.3s ease, color 0.3s ease;
  
  @media (max-width: 640px) {
    padding: 3rem 1rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (max-width: 640px) {
    align-items: center;
  }
`;

const FooterTitle = styled.h4`
  font-size: 1rem;
  font-weight: 700;
  color: ${COLORS.dark};
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const FooterLink = styled(Link)`
  color: ${COLORS.secondary};
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s;

  &:hover {
    color: ${COLORS.primary};
  }
`;

const BrandSection = styled.div`
  max-width: 300px;
  
  @media (max-width: 640px) {
    max-width: 100%;
    align-items: center;
    display: flex;
    flex-direction: column;
  }
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.25rem;
  color: ${COLORS.dark};
  text-decoration: none;
  margin-bottom: 1rem;
`;

const BrandDescription = styled.p`
  color: ${COLORS.lightText};
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  color: ${COLORS.secondary};
  transition: color 0.2s;
  
  &:hover {
    color: ${COLORS.primary};
  }
`;

const BottomBar = styled.div`
  max-width: 1200px;
  margin: 3rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid ${COLORS.border};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  text-align: center;
  color: ${COLORS.lightText};
  font-size: 0.875rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
`;

const ExLink = styled.a`
  color: ${COLORS.lightText};
  text-decoration: none;
  &:hover {
    color: ${COLORS.primary};
  }
`;

export default function FooterClean() {
  return (
    <FooterContainer>
      <FooterContent>
        {/* Brand */}
        <BrandSection>
          <LogoLink to="/">
            <Globe size={20} className="text-blue-600" color={COLORS.primary} />
            VisioConnect
          </LogoLink>
          <BrandDescription>
            Visioconférence sécurisée et de haute qualité pour tous. Connectez-vous instantanément avec votre équipe, vos clients et vos amis.
          </BrandDescription>
          <SocialLinks>
            <SocialLink href="https://twitter.com" aria-label="Twitter">
              <Twitter size={20} />
            </SocialLink>
            <SocialLink href="https://github.com" aria-label="GitHub">
              <Github size={20} />
            </SocialLink>
            <SocialLink href="https://linkedin.com" aria-label="LinkedIn">
              <Linkedin size={20} />
            </SocialLink>
          </SocialLinks>
        </BrandSection>

        {/* Product */}
        <FooterSection>
          <FooterTitle>Produit</FooterTitle>
          <FooterLink to="/features">Fonctionnalités</FooterLink>
          <FooterLink to="/pricing">Tarifs</FooterLink>
          <FooterLink to="/integrations">Intégrations</FooterLink>
          <FooterLink to="/changelog">Nouveautés</FooterLink>
          <FooterLink to="/docs">Documentation</FooterLink>
        </FooterSection>

        {/* Company */}
        <FooterSection>
          <FooterTitle>Entreprise</FooterTitle>
          <FooterLink to="/about">À propos</FooterLink>
          <FooterLink to="/careers">Carrières</FooterLink>
          <FooterLink to="/blog">Blog</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
          <FooterLink to="/partners">Partenaires</FooterLink>
        </FooterSection>

        {/* Legal */}
        <FooterSection>
          <FooterTitle>Légal</FooterTitle>
          <FooterLink to="/privacy">Confidentialité</FooterLink>
          <FooterLink to="/terms">Conditions d'utilisation</FooterLink>
          <FooterLink to="/security">Sécurité</FooterLink>
          <FooterLink to="/cookies">Cookies</FooterLink>
        </FooterSection>
      </FooterContent>

      <BottomBar>
        <div>
          &copy; {new Date().getFullYear()} VisioConnect. Tous droits réservés.
        </div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <ExLink href="mailto:support@visiconnect.com">
            support@visiconnect.com
          </ExLink>
        </div>
      </BottomBar>
    </FooterContainer>
  );
}
