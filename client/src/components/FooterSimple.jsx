import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  Mail,
  Phone,
  MapPin,
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  Video,
  ArrowUp,
  Heart
} from 'lucide-react';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
`;

const BackgroundEffect = styled.div`
  position: absolute;
  inset: 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #3b82f6, transparent);
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 10;
`;

const MainFooter = styled.div`
  padding: 4rem 0 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 2rem;
  }
`;

const BrandSection = styled(motion.div)`
  .logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
  
  .logo-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .logo-text {
    font-size: 1.5rem;
    font-weight: bold;
    color: #3b82f6;
  }
  
  .description {
    color: #60a5fa;
    line-height: 1.6;
    margin-bottom: 2rem;
    max-width: 300px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #60a5fa;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(59, 130, 246, 0.2);
    border-color: #3b82f6;
    color: #3b82f6;
    transform: translateY(-2px);
  }
`;

const FooterSection = styled(motion.div)`
  .section-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #3b82f6;
    margin-bottom: 1.5rem;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 30px;
      height: 2px;
      background: linear-gradient(90deg, #3b82f6, #8b5cf6);
      border-radius: 1px;
    }
  }
  
  .links-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .link-item {
    margin-bottom: 0.75rem;
    
    a {
      color: #60a5fa;
      text-decoration: none;
      transition: color 0.2s ease;
      
      &:hover {
        color: #3b82f6;
      }
    }
  }
`;

const ContactInfo = styled.div`
  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
    color: #60a5fa;
    
    .icon {
      width: 20px;
      height: 20px;
      color: #3b82f6;
      flex-shrink: 0;
    }
    
    span {
      font-size: 0.875rem;
    }
  }
`;

const BottomFooter = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Copyright = styled.div`
  color: #93c5fd;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .heart {
    color: #ef4444;
    animation: heartbeat 1.5s ease-in-out infinite;
  }
  
  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;

const BackToTop = styled(motion.button)`
  background: rgba(59, 130, 246, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 8px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(59, 130, 246, 0.3);
    transform: translateY(-2px);
  }
`;

const FooterSimple = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Produit',
      links: [
        { name: 'Fonctionnalités', href: '/features' },
        { name: 'Tarification', href: '/pricing' },
        { name: 'Sécurité', href: '/security' },
        { name: 'Intégrations', href: '/integrations' }
      ]
    },
    {
      title: 'Ressources',
      links: [
        { name: 'Documentation', href: '/docs' },
        { name: 'Guide utilisateur', href: '/guide' },
        { name: 'API', href: '/api' },
        { name: 'Support', href: '/support' }
      ]
    },
    {
      title: 'Entreprise',
      links: [
        { name: 'À propos', href: '/about' },
        { name: 'Carrières', href: '/careers' },
        { name: 'Presse', href: '/press' },
        { name: 'Contact', href: '/contact' }
      ]
    }
  ];

  const socialPlatforms = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <FooterContainer>
      <BackgroundEffect />
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <MainFooter>
            {/* Brand Section */}
            <BrandSection variants={itemVariants}>
              <div className="logo">
                <div className="logo-icon">
                  <Video size={24} color="#3b82f6" />
                </div>
                <div className="logo-text">VisioMeet</div>
              </div>
              
              <p className="description">
                La plateforme de visioconférence nouvelle génération qui révolutionne 
                vos réunions virtuelles avec une qualité 4K et des fonctionnalités avancées.
              </p>
              
              <SocialLinks>
                {socialPlatforms.map((platform) => (
                  <SocialLink
                    key={platform.label}
                    href={platform.href}
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={platform.label}
                  >
                    <platform.icon size={18} />
                  </SocialLink>
                ))}
              </SocialLinks>
            </BrandSection>

            {/* Footer Sections */}
            {footerSections.map((section) => (
              <FooterSection key={section.title} variants={itemVariants}>
                <h3 className="section-title">{section.title}</h3>
                <ul className="links-list">
                  {section.links.map((link) => (
                    <li key={link.name} className="link-item">
                      <Link to={link.href}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </FooterSection>
            ))}

            {/* Contact Section */}
            <FooterSection variants={itemVariants}>
              <h3 className="section-title">Contact</h3>
              <ContactInfo>
                <div className="contact-item">
                  <Mail className="icon" size={20} />
                  <span>contact@visiomeet.com</span>
                </div>
                <div className="contact-item">
                  <Phone className="icon" size={20} />
                  <span>+33 1 23 45 67 89</span>
                </div>
                <div className="contact-item">
                  <MapPin className="icon" size={20} />
                  <span>Paris, France</span>
                </div>
              </ContactInfo>
            </FooterSection>
          </MainFooter>
        </motion.div>

        <BottomFooter>
          <Copyright>
            © {currentYear} VisioMeet. Fait avec{' '}
            <Heart className="heart" size={16} /> en France
          </Copyright>
          
          <BackToTop
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Retour en haut"
          >
            <ArrowUp size={18} />
          </BackToTop>
        </BottomFooter>
      </Container>
    </FooterContainer>
  );
};

export default FooterSimple;