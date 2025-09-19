import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram,
  Facebook,
  Youtube,
  Globe,
  Shield,
  Zap,
  Users,
  Heart,
  ArrowUp
} from 'lucide-react';

const FooterContainer = styled(motion.footer)`
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 50%, #06b6d4 100%);
  color: white;
  padding: 4rem 2rem 2rem;
  margin-top: 6rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  }

  @media (max-width: 768px) {
    padding: 3rem 1rem 1.5rem;
    margin-top: 4rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;

  &:hover {
    color: white;
    transform: translateX(4px);
  }
`;

const ExternalLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;

  &:hover {
    color: white;
    transform: translateX(4px);
  }
`;

const ContactInfo = styled.div`
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  font-size: 0.95rem;

  svg {
    min-width: 18px;
    height: 18px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: white;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.1);
  }
`;

const CompanyInfo = styled.div`
  text-align: center;
  padding-top: 3rem;
  margin-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.8);

  @media (max-width: 768px) {
    padding-top: 2rem;
    margin-top: 2rem;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
`;

const BackToTop = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #2563eb, #06b6d4);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
  backdrop-filter: blur(10px);
  z-index: 1000;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(37, 99, 235, 0.4);
  }

  @media (max-width: 768px) {
    bottom: 1rem;
    right: 1rem;
    width: 45px;
    height: 45px;
  }
`;

const FooterUnified = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <FooterContainer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <FooterContent>
          {/* Company Info */}
          <FooterSection>
            <Logo>
              <Globe size={24} />
              VisiConnect
            </Logo>
            <Description>
              La plateforme de visioconférence nouvelle génération qui révolutionne 
              la communication digitale avec des technologies avancées d'IA et une 
              expérience utilisateur exceptionnelle.
            </Description>
            <SocialLinks>
              <SocialLink href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github size={18} />
              </SocialLink>
              <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin size={18} />
              </SocialLink>
              <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter size={18} />
              </SocialLink>
              <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram size={18} />
              </SocialLink>
              <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook size={18} />
              </SocialLink>
              <SocialLink href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <Youtube size={18} />
              </SocialLink>
            </SocialLinks>
          </FooterSection>

          {/* Product */}
          <FooterSection>
            <SectionTitle>
              <Zap size={20} />
              Produit
            </SectionTitle>
            <FooterLink to="/features">Fonctionnalités</FooterLink>
            <FooterLink to="/pricing">Tarification</FooterLink>
            <FooterLink to="/integrations">Intégrations</FooterLink>
            <FooterLink to="/api-docs">Documentation API</FooterLink>
            <FooterLink to="/scheduler">Planificateur</FooterLink>
            <FooterLink to="/status">Statut du service</FooterLink>
          </FooterSection>

          {/* Company */}
          <FooterSection>
            <SectionTitle>
              <Users size={20} />
              Entreprise
            </SectionTitle>
            <FooterLink to="/about">À propos</FooterLink>
            <FooterLink to="/community">Communauté</FooterLink>
            <FooterLink to="/support">Support</FooterLink>
            <FooterLink to="/user-guide">Guide utilisateur</FooterLink>
            <FooterLink to="/contact">Contact</FooterLink>
            <ExternalLink href="/careers" target="_blank">Carrières</ExternalLink>
          </FooterSection>

          {/* Legal & Security */}
          <FooterSection>
            <SectionTitle>
              <Shield size={20} />
              Légal & Sécurité
            </SectionTitle>
            <FooterLink to="/privacy">Politique de confidentialité</FooterLink>
            <FooterLink to="/terms">Conditions d'utilisation</FooterLink>
            <FooterLink to="/cookies">Politique des cookies</FooterLink>
            <FooterLink to="/security">Sécurité</FooterLink>
            <ExternalLink href="/gdpr" target="_blank">Conformité RGPD</ExternalLink>
            <ExternalLink href="/accessibility" target="_blank">Accessibilité</ExternalLink>
          </FooterSection>

          {/* Contact */}
          <FooterSection>
            <SectionTitle>
              <Mail size={20} />
              Contact
            </SectionTitle>
            <ContactInfo>
              <Mail size={18} />
              <span>contact@visiconnect.com</span>
            </ContactInfo>
            <ContactInfo>
              <Phone size={18} />
              <span>+33 1 23 45 67 89</span>
            </ContactInfo>
            <ContactInfo>
              <MapPin size={18} />
              <span>
                123 Avenue des Champs-Élysées<br />
                75008 Paris, France
              </span>
            </ContactInfo>
            <ExternalLink href="mailto:support@visiconnect.com">
              Support technique
            </ExternalLink>
            <ExternalLink href="mailto:sales@visiconnect.com">
              Équipe commerciale
            </ExternalLink>
          </FooterSection>
        </FooterContent>

        <CompanyInfo>
          <p>
            © {currentYear} VisiConnect. Tous droits réservés. 
            Fait avec <Heart size={16} style={{ color: '#ef4444', display: 'inline' }} /> à Paris.
          </p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
            VisiConnect est une marque déposée. Plateforme certifiée ISO 27001 et conforme RGPD.
          </p>
        </CompanyInfo>
      </FooterContainer>

      <BackToTop
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <ArrowUp size={20} />
      </BackToTop>
    </>
  );
};

export default FooterUnified;