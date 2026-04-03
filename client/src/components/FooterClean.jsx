import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { 
  Github, Linkedin, Twitter, 
  Globe
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { useCookieConsent } from '../contexts/CookieConsentContext';

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
  const { t } = useTranslation();
  const { setShowBanner } = useCookieConsent();
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
            {t('hero.subtitle')}
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
          <FooterTitle>{t('product')}</FooterTitle>
          <FooterLink to="/features">{t('navigation.features')}</FooterLink>
          <FooterLink to="/pricing">{t('navigation.pricing')}</FooterLink>
          <FooterLink to="/integrations">{t('footerIntegrations')}</FooterLink>
          <FooterLink to="/changelog">{t('footerChangelog')}</FooterLink>
          <FooterLink to="/docs">{t('navigation.documentation')}</FooterLink>
        </FooterSection>

        {/* Company */}
        <FooterSection>
          <FooterTitle>{t('navigation.about')}</FooterTitle>
          <FooterLink to="/about">{t('navigation.about')}</FooterLink>
          <FooterLink to="/careers">{t('navigation.careers')}</FooterLink>
          <FooterLink to="/blog">{t('navigation.blog')}</FooterLink>
          <FooterLink to="/contact">{t('navigation.contact')}</FooterLink>
          <FooterLink to="/partners">{t('footerPartners')}</FooterLink>
        </FooterSection>

        {/* Legal */}
        <FooterSection>
          <FooterTitle>{t('navigation.legal', 'Légal')}</FooterTitle>
          <FooterLink to="/privacy">{t('navigation.privacy', 'Confidentialité')}</FooterLink>
          <FooterLink to="/terms">{t('navigation.terms', 'Conditions')}</FooterLink>
          <FooterLink to="/security">{t('navigation.security', 'Sécurité')}</FooterLink>
          <button 
            onClick={() => setShowBanner(true)} 
            style={{ textAlign: 'left', background: 'none', border: 'none', color: COLORS.secondary, padding: 0, cursor: 'pointer', fontSize: '0.875rem' }}
            onMouseOver={(e) => e.target.style.color = COLORS.primary}
            onMouseOut={(e) => e.target.style.color = COLORS.secondary}
          >
            {t('navigation.manageCookies', 'Gérer les cookies')}
          </button>
        </FooterSection>
      </FooterContent>

      <BottomBar>
        <div>
          &copy; {new Date().getFullYear()} VisioConnect. {t('common.allRightsReserved')}
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
