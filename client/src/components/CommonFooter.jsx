import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Github, Linkedin } from 'lucide-react';

const FooterContainer = styled(motion.footer)`
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  padding: 4rem 2rem 2rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
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
  h3 {
    color: white;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      margin-bottom: 0.75rem;
      
      a {
        color: rgba(255, 255, 255, 0.8);
        text-decoration: none;
        transition: all 0.3s ease;
        
        &:hover {
          color: white;
          transform: translateX(5px);
        }
      }
    }
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
    margin-bottom: 1rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    transition: all 0.3s ease;
    
    &:hover {
      background: white;
      color: #3b82f6;
      transform: translateY(-3px);
    }
  }
`;

const FooterBottom = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

const CommonFooter = () => {
  return (
    <FooterContainer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <FooterContent>
        <FooterSection>
          <h3>Visio Connect</h3>
          <p>
            La plateforme de visioconférence nouvelle génération qui transforme
            vos réunions en expériences collaboratives exceptionnelles.
          </p>
          <SocialLinks>
            <a href="mailto:contact@visioconnect.com" aria-label="Email">
              <Mail size={20} />
            </a>
            <a href="https://github.com/visioconnect" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/company/visioconnect" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <Linkedin size={20} />
            </a>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h3>Produit</h3>
          <ul>
            <li><Link to="/features">Fonctionnalités</Link></li>
            <li><Link to="/pricing">Tarifs</Link></li>
            <li><Link to="/integrations">Intégrations</Link></li>
            <li><Link to="/security">Sécurité</Link></li>
            <li><Link to="/api-docs">API Documentation</Link></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Support</h3>
          <ul>
            <li><Link to="/support">Centre d'aide</Link></li>
            <li><Link to="/user-guide">Guide utilisateur</Link></li>
            <li><Link to="/community">Communauté</Link></li>
            <li><Link to="/status">Statut du service</Link></li>
            <li><Link to="/contact">Nous contacter</Link></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Entreprise</h3>
          <ul>
            <li><Link to="/about">À propos</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy">Confidentialité</Link></li>
            <li><Link to="/terms">Conditions</Link></li>
            <li><Link to="/cookies">Cookies</Link></li>
          </ul>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <p>&copy; 2024 Visio Connect. Tous droits réservés.</p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default CommonFooter;