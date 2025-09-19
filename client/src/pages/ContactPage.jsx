import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  Video, 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  User,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const Container = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
  color: #333;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid #1a1a1a;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 800;
  color: #00ff88;
  cursor: pointer;
`;

const BackButton = styled.button`
  background: transparent;
  border: 2px solid #333;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 16px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    border-color: #00ff88;
    color: #00ff88;
  }
`;

const MainContent = styled.main`
  padding: 8rem 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #00ff88, #00e67a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #888;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactInfo = styled.div`
  background: #111;
  border: 1px solid #222;
  border-radius: 24px;
  padding: 3rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #00ff88, transparent);
  }
`;

const ContactForm = styled.div`
  background: #111;
  border: 1px solid #222;
  border-radius: 24px;
  padding: 3rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #00ff88, transparent);
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #333;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #0a0a0a;
  border: 1px solid #222;
  border-radius: 16px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #333;
    transform: translateY(-2px);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const ContactIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: rgba(0, 255, 136, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00ff88;
  flex-shrink: 0;
`;

const ContactDetails = styled.div`
  flex: 1;
`;

const ContactLabel = styled.div`
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 0.25rem;
`;

const ContactValue = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #ccc;
`;

const Input = styled.input`
  padding: 1rem;
  background: #0a0a0a;
  border: 2px solid #333;
  border-radius: 12px;
  color: #333;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #00ff88;
  }

  &::placeholder {
    color: #666;
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  background: #0a0a0a;
  border: 2px solid #333;
  border-radius: 12px;
  color: #333;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  resize: vertical;
  min-height: 120px;

  &:focus {
    border-color: #00ff88;
  }

  &::placeholder {
    color: #666;
  }
`;

const Select = styled.select`
  padding: 1rem;
  background: #0a0a0a;
  border: 2px solid #333;
  border-radius: 12px;
  color: #333;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #00ff88;
  }

  option {
    background: #0a0a0a;
    color: #333;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #00ff88, #00e67a);
  border: none;
  color: #0a0a0a;
  padding: 1rem 2rem;
  border-radius: 16px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 255, 136, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ResponseTime = styled.div`
  background: #0a0a0a;
  border: 1px solid #333;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;
  text-align: center;
`;

const ResponseTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #00ff88;
  margin-bottom: 0.5rem;
`;

const ResponseText = styled.p`
  color: #888;
  font-size: 0.9rem;
`;

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    priority: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Scroll vers le haut quand la page se charge
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        priority: 'normal'
      });
      
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 2000);
  };

  return (
    <Container>
      <Header>
        <Nav>
          <Logo onClick={() => navigate('/')}>
            <Video size={24} />
            Visio Pro
          </Logo>
          <BackButton onClick={() => navigate('/')}>
            <ArrowLeft size={16} />
            Retour
          </BackButton>
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
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Une question ? Un projet ? N'hésitez pas à nous contacter, nous vous répondrons dans les plus brefs délais.
          </Subtitle>
        </HeroSection>

        <ContentGrid>
          <ContactInfo>
            <SectionTitle>Informations de contact</SectionTitle>
            
            <ContactItem>
              <ContactIcon>
                <User size={24} />
              </ContactIcon>
              <ContactDetails>
                <ContactLabel>Développeur</ContactLabel>
                <ContactValue>Théo Garcès</ContactValue>
              </ContactDetails>
            </ContactItem>

            <ContactItem>
              <ContactIcon>
                <Mail size={24} />
              </ContactIcon>
              <ContactDetails>
                <ContactLabel>Email</ContactLabel>
                <ContactValue>theogarces33@gmail.com</ContactValue>
              </ContactDetails>
            </ContactItem>

            <ContactItem>
              <ContactIcon>
                <Phone size={24} />
              </ContactIcon>
              <ContactDetails>
                <ContactLabel>Téléphone</ContactLabel>
                <ContactValue>06 48 58 81 79</ContactValue>
              </ContactDetails>
            </ContactItem>

            <ContactItem>
              <ContactIcon>
                <MapPin size={24} />
              </ContactIcon>
              <ContactDetails>
                <ContactLabel>Adresse</ContactLabel>
                <ContactValue>123 Avenue de l'Innovation<br />33000 Bordeaux, France</ContactValue>
              </ContactDetails>
            </ContactItem>

            <ResponseTime>
              <ResponseTitle>
                <Clock size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Temps de réponse
              </ResponseTitle>
              <ResponseText>
                Nous nous engageons à répondre à tous les messages dans un délai de 24h maximum.
              </ResponseText>
            </ResponseTime>
          </ContactInfo>

          <ContactForm>
            <SectionTitle>Envoyez-nous un message</SectionTitle>
            
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: 'rgba(0, 255, 136, 0.1)',
                  border: '1px solid #00ff88',
                  borderRadius: '12px',
                  padding: '1rem',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#00ff88'
                }}
              >
                <CheckCircle size={20} />
                Message envoyé avec succès ! Nous vous répondrons bientôt.
              </motion.div>
            )}

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Nom complet *</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Votre nom et prénom"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email *</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="votre.email@exemple.com"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="06 12 34 56 78"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="priority">Priorité</Label>
                <Select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                >
                  <option value="low">Faible</option>
                  <option value="normal">Normale</option>
                  <option value="high">Élevée</option>
                  <option value="urgent">Urgente</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="subject">Sujet *</Label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Objet de votre message"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="message">Message *</Label>
                <TextArea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Décrivez votre demande en détail..."
                  required
                />
              </FormGroup>

              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <AlertCircle size={20} />
                    </motion.div>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Envoyer le message
                  </>
                )}
              </SubmitButton>
            </Form>
          </ContactForm>
        </ContentGrid>
      </MainContent>
    </Container>
  );
};

export default ContactPage;
