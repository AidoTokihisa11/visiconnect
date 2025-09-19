import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Video,
  ArrowLeft,
  Globe,
  Users,
  MessageSquare,
  FileText,
  BarChart3,
  Monitor,
  ArrowRight
} from 'lucide-react';

// Styled Components
const AppContainer = styled.div`
  min-height: 100vh;
  background: white;
  color: #333;
  overflow-x: hidden;
  position: relative;
`;

// HEADER FUTURISTE
const Header = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  backdrop-filter: blur(20px);
  background: rgba(0, 0, 0, 0.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.1), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
`;

const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 800;
  text-decoration: none;
  color: #60a5fa;
  .logo-icon {
    width: 40px;
    height: 40px;
    background: #1a1a2e;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 20px rgba(96, 165, 250, 0.2);
  }
  .logo-text {
    color: #60a5fa;
  }
`;

const BackButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  color: #333;
  text-decoration: none;
  font-weight: 500;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(96, 165, 250, 0.3);
  }
`;

// HERO SECTION
const HeroSection = styled.section`
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8rem 2rem 4rem;
  background: white;
    
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%23333" stroke-width="0.5" opacity="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>') repeat;
    opacity: 0.1;
  }
`;

const HeroContent = styled(motion.div)`
  text-align: center;
  z-index: 10;
  max-width: 1000px;
`;

const Title = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  background: linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem;
  line-height: 1.1;
  
  &::after {
    content: '';
    display: block;
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #60a5fa, #a78bfa);
    margin: 1rem auto;
    border-radius: 2px;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.4rem;
  color: #1e40af;
  max-width: 700px;
  margin: 0 auto 3rem;
  line-height: 1.6;
`;

// INTEGRATIONS GRID
const IntegrationsSection = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(180deg, transparent, rgba(15, 15, 15, 0.5));
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  background: linear-gradient(135deg, #60a5fa, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 4rem;
`;

const IntegrationsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const IntegrationCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.05));
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, transparent, rgba(96, 165, 250, 0.1), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(96, 165, 250, 0.2);
    border-color: rgba(96, 165, 250, 0.3);
    
    &::before {
      opacity: 1;
    }
  }
`;

const IntegrationIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: ${props => props.gradient || 'linear-gradient(135deg, #60a5fa, #a78bfa)'};
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  
  svg {
    width: 40px;
    height: 40px;
    color: #333;
  }
`;

const IntegrationName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
`;

const IntegrationDesc = styled.p`
  color: #3b82f6;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
`;

const IntegrationButton = styled(motion.button)`
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, #60a5fa, #a78bfa);
  border: none;
  border-radius: 25px;
  color: #333;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 30px rgba(96, 165, 250, 0.4);
  }
`;

const integrations = [
  {
    name: 'Google Workspace',
    description: 'Intégrez Gmail, Google Calendar, Drive et toute la suite Google pour une productivité maximale.',
    icon: <Globe />,
    gradient: 'linear-gradient(135deg, #4285f4, #34a853)',
    features: ['Calendrier sync', 'Drive intégré', 'Gmail connect']
  },
  {
    name: 'Microsoft 365',
    description: 'Connectez Outlook, Teams, OneDrive et tous vos outils Microsoft en un clic.',
    icon: <Monitor />,
    gradient: 'linear-gradient(135deg, #0078d4, #106ebe)',
    features: ['Teams integration', 'Outlook sync', 'OneDrive storage']
  },
  {
    name: 'Slack',
    description: 'Recevez des notifications, lancez des réunions et gérez vos équipes directement depuis Slack.',
    icon: <MessageSquare />,
    gradient: 'linear-gradient(135deg, #611f69, #4a154b)',
    features: ['Notifications', 'Quick meetings', 'Team chat']
  },
  {
    name: 'Jira & Confluence',
    description: 'Synchronisez vos projets et documentations pour une gestion optimale des équipes.',
    icon: <FileText />,
    gradient: 'linear-gradient(135deg, #0052cc, #2684ff)',
    features: ['Project sync', 'Issue tracking', 'Documentation']
  },
  {
    name: 'Salesforce CRM',
    description: 'Intégrez votre CRM pour suivre vos prospects et clients directement en réunion.',
    icon: <Users />,
    gradient: 'linear-gradient(135deg, #00a1e0, #1798c1)',
    features: ['Contact sync', 'Deal tracking', 'Sales pipeline']
  },
  {
    name: 'Analytics Pro',
    description: 'Obtenez des métriques avancées et des insights détaillés sur vos réunions et performances.',
    icon: <BarChart3 />,
    gradient: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
    features: ['Advanced metrics', 'Custom reports', 'AI insights']
  }
];

const IntegrationsPage = () => {
  return (
    <AppContainer>
      <Header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Nav>
          <Logo
            as={Link}
            to="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="logo-icon">
              <Video size={24} color="#3b82f6" />
            </div>
            <span className="logo-text">VisioMeet</span>
          </Logo>
          
          <BackButton
            as={Link}
            to="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} />
            Retour
          </BackButton>
        </Nav>
      </Header>

      <HeroSection>
        <HeroContent
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Intégrations
          </Title>
          
          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Connectez VisioMeet à tous vos outils favoris et créez un écosystème de travail unifié. 
            Plus de 50+ intégrations disponibles pour optimiser votre productivité.
          </Subtitle>
        </HeroContent>
      </HeroSection>

      <IntegrationsSection>
        <SectionTitle
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Intégrations Populaires
        </SectionTitle>
        
        <IntegrationsGrid
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
          viewport={{ once: true }}
        >
          {integrations.map((integration, index) => (
            <IntegrationCard
              key={integration.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <IntegrationIcon gradient={integration.gradient}>
                {integration.icon}
              </IntegrationIcon>
              
              <IntegrationName>{integration.name}</IntegrationName>
              <IntegrationDesc>{integration.description}</IntegrationDesc>
              
              <IntegrationButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Connecter
                <ArrowRight size={16} />
              </IntegrationButton>
            </IntegrationCard>
          ))}
        </IntegrationsGrid>
      </IntegrationsSection>
    </AppContainer>
  );
};

export default IntegrationsPage;