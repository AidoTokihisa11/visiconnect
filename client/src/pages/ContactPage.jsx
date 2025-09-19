import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Video, 
  Mail, 
  Phone, 
  MapPin, 
  Send
} from 'lucide-react';

// Styled Components avec SEULEMENT le thème clair
const Container = styled.div`
  min-height: 100vh;
  background: var(--bg-primary, #ffffff);
  color: var(--text-primary, #1e293b);
  overflow-x: hidden;
`;

const Header = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
`;

const NavLogo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 800;
  text-decoration: none;
  color: var(--text-primary, #1e293b);
  
  .logo-icon {
    width: 40px;
    height: 40px;
    background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 10px rgba(37, 99, 235, 0.3);
  }
  
  .logo-text {
    background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: var(--text-primary, #1e293b);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--accent-cyan, #06b6d4);
  }
`;

const MainContent = styled.main`
  padding: 8rem 2rem 4rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 6rem;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 800;
  background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: var(--text-secondary, #475569);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ContactCard = styled(motion.div)`
  background: var(--bg-card, rgba(255, 255, 255, 0.95));
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: var(--shadow-lg, 0 8px 25px rgba(0, 0, 0, 0.1));
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl, 0 20px 40px rgba(0, 0, 0, 0.15));
  }
  
  transition: all 0.3s ease;
`;

const CardIcon = styled.div`
  width: 60px;
  height: 60px;
  background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: white;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary, #1e293b);
  margin-bottom: 0.5rem;
`;

const CardText = styled.p`
  color: var(--text-secondary, #475569);
  line-height: 1.6;
`;

const ContactForm = styled(motion.form)`
  background: var(--bg-card, rgba(255, 255, 255, 0.95));
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  padding: 3rem;
  box-shadow: var(--shadow-lg, 0 8px 25px rgba(0, 0, 0, 0.1));
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary, #1e293b);
  margin-bottom: 2rem;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: var(--text-primary, #1e293b);
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  font-size: 1rem;
  background: var(--bg-primary, #ffffff);
  color: var(--text-primary, #1e293b);
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--accent-cyan, #06b6d4);
    box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
  }
  
  &::placeholder {
    color: var(--text-secondary, #475569);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  font-size: 1rem;
  font-family: inherit;
  background: var(--bg-primary, #ffffff);
  color: var(--text-primary, #1e293b);
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--accent-cyan, #06b6d4);
    box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
  }
  
  &::placeholder {
    color: var(--text-secondary, #475569);
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 1rem 2rem;
  background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  transition: all 0.3s ease;
`;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <Container>
      <Header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Nav>
          <NavLogo
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
              <div className="logo-icon">
                <Video size={24} color="white" />
              </div>
              <div className="logo-text">VisiConnect</div>
            </Link>
          </NavLogo>

          <NavLinks>
            <NavLink to="/">Accueil</NavLink>
            <NavLink to="/features">Fonctionnalités</NavLink>
            <NavLink to="/pricing">Tarifs</NavLink>
            <NavLink to="/about">À propos</NavLink>
            <NavLink to="/contact" style={{ color: 'var(--accent-cyan, #06b6d4)' }}>Contact</NavLink>
            <NavLink to="/login">
              <motion.div
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4))',
                  borderRadius: '8px',
                  color: 'white'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Connexion
              </motion.div>
            </NavLink>
          </NavLinks>
        </Nav>
      </Header>

      <MainContent>
        <HeroSection>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Contactez-nous
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Une question ? Un projet ? Notre équipe est là pour vous accompagner dans votre transformation digitale.
          </Subtitle>
        </HeroSection>

        <ContactGrid>
          <ContactInfo>
            <ContactCard
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -4 }}
            >
              <CardIcon>
                <Mail size={28} />
              </CardIcon>
              <CardTitle>Email</CardTitle>
              <CardText>
                Écrivez-nous à tout moment, nous vous répondrons dans les plus brefs délais.
                <br />
                <strong>contact@visiconnect.com</strong>
              </CardText>
            </ContactCard>

            <ContactCard
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -4 }}
            >
              <CardIcon>
                <Phone size={28} />
              </CardIcon>
              <CardTitle>Téléphone</CardTitle>
              <CardText>
                Appelez-nous du lundi au vendredi de 9h à 18h.
                <br />
                <strong>+33 1 23 45 67 89</strong>
              </CardText>
              </ContactCard>

            <ContactCard
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -4 }}
            >
              <CardIcon>
                <MapPin size={28} />
              </CardIcon>
              <CardTitle>Adresse</CardTitle>
              <CardText>
                Retrouvez-nous dans nos bureaux parisiens.
                <br />
                <strong>42 Avenue des Champs-Élysées<br />75008 Paris, France</strong>
              </CardText>
            </ContactCard>
          </ContactInfo>

          <ContactForm
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onSubmit={handleSubmit}
          >
            <FormTitle>Envoyez-nous un message</FormTitle>
            
            <FormGroup>
              <Label htmlFor="name">Nom complet</Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Votre nom et prénom"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Adresse email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="subject">Sujet</Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                placeholder="De quoi souhaitez-vous parler ?"
                value={formData.subject}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">Message</Label>
              <TextArea
                id="message"
                name="message"
                placeholder="Décrivez votre projet ou votre question..."
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <SubmitButton
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send size={20} />
              Envoyer le message
            </SubmitButton>
          </ContactForm>
        </ContactGrid>
      </MainContent>
    </Container>
  );
};

export default ContactPage;