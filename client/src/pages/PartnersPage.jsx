import React from 'react';
import styled from 'styled-components';
import HeaderClean from '../components/HeaderClean';
import FooterClean from '../components/FooterClean';
import CallToAction from '../components/CallToAction';

const COLORS = {
  primary: 'hsl(var(--primary))',
  secondary: 'hsl(var(--secondary))',
  dark: 'hsl(var(--foreground))',
  text: 'hsl(var(--foreground))',
  lightText: 'hsl(var(--muted-foreground))',
  background: 'hsl(var(--background))',
  white: 'hsl(var(--card))',
  border: 'hsl(var(--border))',
  success: '#16a34a',
};

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${COLORS.background};
  color: ${COLORS.text};
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--background)) 100%);
  color: hsl(var(--foreground));
  padding: 100px 20px 80px;
  text-align: center;
  border-bottom: 1px solid ${COLORS.border};
  position: relative;
  overflow: hidden;

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
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 20px;
  
  span {
    color: ${COLORS.primary};
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: ${COLORS.lightText};
  max-width: 700px;
  margin: 0 auto 40px;
`;

const Button = styled.button`
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
  padding: 12px 32px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.125rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }
`;

const BenefitsSection = styled.section`
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 40px;
  margin-top: 60px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const BenefitCard = styled.div`
  background: ${COLORS.white};
  padding: 32px;
  border-radius: 16px;
  text-align: center;
  border: 1px solid ${COLORS.border};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  background-color: ${props => props.$bgColor || '#eff6ff'};
  color: ${props => props.$color || COLORS.primary};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  font-size: 2rem;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${COLORS.dark};
  margin-bottom: 16px;
`;

const CardText = styled.p`
  color: ${COLORS.lightText};
  line-height: 1.6;
`;

const ContactSection = styled.section`
  background-color: ${COLORS.white};
  padding: 80px 20px;
  border-top: 1px solid ${COLORS.border};
`;

const ContactContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const Form = styled.form`
  margin-top: 40px;
  text-align: left;
  display: grid;
  gap: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  color: ${COLORS.dark};
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid ${COLORS.border};
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${COLORS.primary};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 1px solid ${COLORS.border};
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  background-color: ${COLORS.white};
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${COLORS.primary};
  }
`;

const TextArea = styled.textarea`
  padding: 12px 16px;
  border: 1px solid ${COLORS.border};
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  min-height: 120px;
  resize: vertical;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${COLORS.primary};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: 16px;
`;

const PartnersPage = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Merci de votre intérêt ! Notre équipe partenariats vous contactera bientôt.");
    };

    return (
        <PageContainer>
            <HeaderClean />
            <MainContent>
                <HeroSection>
                    <HeroTitle>Grandissons <span>Ensemble</span></HeroTitle>
                    <HeroSubtitle>
                        Rejoignez le programme partenaire Visiconnect et offrez à vos clients la meilleure solution de collaboration du marché.
                    </HeroSubtitle>
                    <Button onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}>
                        Devenir Partenaire
                    </Button>
                </HeroSection>

                <BenefitsSection>
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2rem', color: COLORS.dark, marginBottom: '16px' }}>Pourquoi s'associer avec nous ?</h2>
                        <p style={{ color: COLORS.lightText }}>Des avantages exclusifs conçus pour accélérer votre croissance.</p>
                    </div>

                    <Grid>
                        <BenefitCard>
                            <IconWrapper $bgColor="#eff6ff" $color="#2563eb">🚀</IconWrapper>
                            <CardTitle>Commissions Attractives</CardTitle>
                            <CardText>
                                Gagnez des revenus récurrents sur chaque client que vous apportez. Nos taux sont parmi les plus compétitifs du marché.
                            </CardText>
                        </BenefitCard>
                        <BenefitCard>
                            <IconWrapper $bgColor="#f0fdf4" $color="#16a34a">🛠️</IconWrapper>
                            <CardTitle>Ressources Dédiées</CardTitle>
                            <CardText>
                                Accédez à notre portail partenaire : documentation technique, supports marketing et formation commerciale.
                            </CardText>
                        </BenefitCard>
                        <BenefitCard>
                            <IconWrapper $bgColor="#fff7ed" $color="#ea580c">🤝</IconWrapper>
                            <CardTitle>Support Prioritaire</CardTitle>
                            <CardText>
                                Bénéficiez d'une ligne directe avec nos équipes techniques et commerciales pour vous aider à conclure vos ventes.
                            </CardText>
                        </BenefitCard>
                    </Grid>
                </BenefitsSection>

                <CallToAction 
                    title="Devenir partenaire"
                    description="Rejoignez notre réseau de partenaires et développez votre activité avec VisioConnect. Remplissez le formulaire de contact pour commencer."
                    buttonText="Nous contacter"
                    buttonLink="/contact"
                />

            </MainContent>
            <FooterClean />
        </PageContainer>
    );
};

export default PartnersPage;
