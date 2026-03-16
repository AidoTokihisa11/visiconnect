import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Mail, Phone, MapPin, Send, MessageSquare, HelpCircle, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';
import CallToAction from '../components/CallToAction';

const COLORS = {
  primary: 'hsl(var(--primary))',    
  primaryDark: 'hsl(var(--primary))', // Using same for simplicity or var(--primary-foreground) if needed
  secondary: 'hsl(var(--muted-foreground))',  
  dark: 'hsl(var(--foreground))',      
  text: 'hsl(var(--foreground))',       
  lightText: 'hsl(var(--muted-foreground))', 
  background: 'hsl(var(--background))',
  white: 'hsl(var(--card))',
  border: 'hsl(var(--border))',    
  success: 'hsl(var(--primary))',   
  error: 'hsl(var(--destructive))'
};

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${COLORS.background};
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: ${COLORS.text};
  transition: background-color 0.3s ease, color 0.3s ease;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

const HeroSection = styled.div`
  background: linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--background)) 100%);
  padding: 8rem 1.5rem 6rem;
  text-align: center;
  border-bottom: 1px solid ${COLORS.border};
  transition: background-color 0.3s ease;
  position: relative;
  overflow: hidden;

  @media (max-width: 640px) {
    padding: 6rem 1rem 4rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(37, 99, 235, 0.05) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  color: ${COLORS.dark};
  margin-bottom: 1.5rem;
  animation: ${fadeIn} 0.5s ease-out;

  span {
    color: ${COLORS.primary};
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 8px;
      left: 0;
      width: 100%;
      height: 12px;
      background-color: rgba(37, 99, 235, 0.1);
      z-index: -1;
      transform: skewX(-10deg);
    }
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: ${COLORS.lightText};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  animation: ${fadeIn} 0.5s ease-out 0.1s backwards;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: -3rem auto 6rem;
  padding: 0 1.5rem;
  position: relative;
  z-index: 10;
  animation: ${fadeIn} 0.5s ease-out 0.2s backwards;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 2rem;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

// --- LEFT SIDE: INFO ---
const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InfoCard = styled.div`
  background-color: ${COLORS.white};
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid ${COLORS.border};
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.5rem;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    border-color: ${COLORS.primary};
  }
`;

const SupportCard = styled(InfoCard)`
  background-color: ${COLORS.dark};
  color: white;
  border: none;
  
  h3 { color: white; }
  p { color: #94a3b8; }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.4);
  }
`;

const IconBox = styled.div`
  width: 48px;
  height: 48px;
  background-color: ${props => props.$dark ? 'rgba(255,255,255,0.1)' : '#eff6ff'};
  color: ${props => props.$dark ? 'white' : COLORS.primary};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const CardContent = styled.div`
  h3 {
    font-size: 1.125rem;
    font-weight: 700;
    color: ${COLORS.dark};
    margin: 0 0 0.5rem 0;
  }
  p {
    font-size: 0.95rem;
    color: ${COLORS.lightText};
    margin: 0;
    line-height: 1.5;
  }
  a {
    color: ${COLORS.primary};
    text-decoration: none;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-top: 0.5rem;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

// --- RIGHT SIDE: FORM ---
const FormCard = styled.div`
  background-color: ${COLORS.white};
  padding: 3rem;
  border-radius: 20px;
  border: 1px solid ${COLORS.border};
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

  @media (max-width: 600px) {
    padding: 1.5rem;
  }
`;

const FormHeader = styled.div`
  margin-bottom: 2rem;
  h2 {
    font-size: 1.75rem;
    font-weight: 800;
    color: ${COLORS.dark};
    margin-bottom: 0.5rem;
  }
  p {
    color: ${COLORS.secondary};
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryOption = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  border: 1px solid ${props => props.selected ? COLORS.primary : COLORS.border};
  background-color: ${props => props.selected ? '#eff6ff' : 'white'};
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  color: ${props => props.selected ? COLORS.primary : COLORS.secondary};
  transition: all 0.2s;
  
  &:hover {
    border-color: ${COLORS.primary};
    background-color: #f8fafc;
  }

  input {
    display: none;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${COLORS.secondary};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid ${COLORS.border};
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
  background-color: #f8fafc;

  &:focus {
    outline: none;
    border-color: ${COLORS.primary};
    background-color: white;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid ${COLORS.border};
  border-radius: 8px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  background-color: #f8fafc;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${COLORS.primary};
    background-color: white;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: ${COLORS.primary};
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  &:hover {
    background-color: ${COLORS.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
  }

  &:disabled {
    background-color: ${COLORS.lightText};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const SuccessMessage = styled.div`
  padding: 1.5rem;
  background-color: #ecfdf5;
  color: #065f46;
  border: 1px solid #a7f3d0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  animation: ${fadeIn} 0.5s ease-out;

  svg {
    color: ${COLORS.success};
  }
`;

const ContactPage = () => {
  const [category, setCategory] = useState('support');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <PageContainer>
      <HeaderClean />
      <MainContent>
        <HeroSection>
          <HeroTitle>Comment pouvons-nous <span>vous aider ?</span></HeroTitle>
          <HeroSubtitle>
            Notre équipe est à votre disposition pour répondre à toutes vos questions.
            Choisissez le canal qui vous convient le mieux.
          </HeroSubtitle>
        </HeroSection>

        <ContentWrapper>
          <ContactGrid>
            {/* Left Column: Information */}
            <InfoColumn>
              <InfoCard>
                <IconBox>
                  <Mail size={24} />
                </IconBox>
                <CardContent>
                  <h3>Email</h3>
                  <p>Pour les demandes générales</p>
                  <a href="mailto:contact@visiconnect.com">contact@visiconnect.com <ArrowRight size={14}/></a>
                </CardContent>
              </InfoCard>

              <InfoCard>
                <IconBox>
                  <Phone size={24} />
                </IconBox>
                <CardContent>
                  <h3>Téléphone</h3>
                  <p>Lun-Ven de 9h à 18h</p>
                  <a href="tel:+33123456789">+33 1 23 45 67 89</a>
                </CardContent>
              </InfoCard>

              <InfoCard>
                <IconBox>
                  <MapPin size={24} />
                </IconBox>
                <CardContent>
                  <h3>Bureaux</h3>
                  <p>123 Avenue de l'Innovation</p>
                  <p>75001 Paris, France</p>
                </CardContent>
              </InfoCard>

              <SupportCard>
                <IconBox $dark>
                  <HelpCircle size={24} />
                </IconBox>
                <CardContent>
                  <h3>Centre d'Aide</h3>
                  <p>Trouvez des réponses instantanées dans notre base de connaissances détaillée.</p>
                  <a href="/support" style={{color: '#60a5fa'}}>Consulter la FAQ <ArrowRight size={14}/></a>
                </CardContent>
              </SupportCard>

              <div style={{ padding: '0 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: COLORS.lightText, fontSize: '0.9rem' }}>
                <Clock size={16} /> Temps de réponse moyen : 2 heures
              </div>
            </InfoColumn>

            {/* Right Column: Interactive Form */}
            <FormCard>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                  <div style={{ width: '80px', height: '80px', background: '#dcfce7', borderRadius: '50%', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                    <CheckCircle size={48} />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: COLORS.dark, marginBottom: '1rem' }}>Message Envoyé !</h3>
                  <p style={{ color: COLORS.secondary, marginBottom: '2rem' }}>
                    Merci de nous avoir contactés. Un membre de notre équipe reviendra vers vous sous 24h.
                  </p>
                  <SubmitButton onClick={() => setSubmitted(false)} style={{ maxWidth: '200px', margin: '0 auto' }}>
                    Envoyer un autre
                  </SubmitButton>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <FormHeader>
                    <h2>Envoyez-nous un message</h2>
                    <p>Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.</p>
                  </FormHeader>

                  <Label style={{ marginBottom: '1rem', display: 'block' }}>Sujet de votre demande</Label>
                  <CategoryGrid>
                    <CategoryOption selected={category === 'support'}>
                      <input type="radio" name="category" checked={category === 'support'} onChange={() => setCategory('support')} />
                      Support Technique
                    </CategoryOption>
                    <CategoryOption selected={category === 'sales'}>
                      <input type="radio" name="category" checked={category === 'sales'} onChange={() => setCategory('sales')} />
                      Commercial
                    </CategoryOption>
                    <CategoryOption selected={category === 'other'}>
                      <input type="radio" name="category" checked={category === 'other'} onChange={() => setCategory('other')} />
                      Autre
                    </CategoryOption>
                  </CategoryGrid>

                  <Row>
                    <FormGroup>
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input type="text" id="firstName" placeholder="Jean" required />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="lastName">Nom</Label>
                      <Input type="text" id="lastName" placeholder="Dupont" required />
                    </FormGroup>
                  </Row>

                  <FormGroup>
                    <Label htmlFor="email">Email Professionnel</Label>
                    <Input type="email" id="email" placeholder="jean@entreprise.com" required />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="message">Message</Label>
                    <TextArea id="message" placeholder="Dites-nous en plus sur votre besoin..." required />
                  </FormGroup>

                  <SubmitButton type="submit" disabled={loading}>
                    {loading ? 'Envoi en cours...' : (
                      <>
                        Envoyer le message <Send size={18} />
                      </>
                    )}
                  </SubmitButton>
                  <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: COLORS.lightText, textAlign: 'center' }}>
                    En envoyant ce formulaire, vous acceptez notre politique de confidentialité.
                  </p>
                </form>
              )}
            </FormCard>
          </ContactGrid>
        </ContentWrapper>
      <CallToAction 
        title="Une question urgente ?"
        description="Notre équipe de support est disponible 24/7 pour vous aider."
        buttonText="Consulter la FAQ"
        buttonLink="/support"
      />
      </MainContent>
       
{/* FooterClean is usually imported in App.js or included here if the structure is per page. Based on previous files, include FooterClean. */}
       <FooterClean />
    </PageContainer>
  );
};

export default ContactPage;
