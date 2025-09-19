import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  Video, 
  ArrowLeft, 
  Heart, 
  Globe, 
  Zap, 
  Shield
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
  margin-bottom: 6rem;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
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
  font-size: 1.3rem;
  color: #888;
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
`;

const StatCard = styled(motion.div)`
  background: #111;
  border: 1px solid #222;
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
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

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
  color: #00ff88;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #888;
  font-weight: 600;
`;

const StorySection = styled.section`
  background: #111;
  border: 1px solid #222;
  border-radius: 24px;
  padding: 4rem;
  margin: 4rem 0;
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

const StoryTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
`;

const StoryText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #ccc;
  margin-bottom: 2rem;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ValuesSection = styled.section`
  margin: 6rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 3rem;
  color: #333;
  text-align: center;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ValueCard = styled(motion.div)`
  background: #111;
  border: 1px solid #222;
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #00ff88, transparent);
  }

  &:hover {
    transform: translateY(-4px);
    border-color: #333;
  }
`;

const ValueIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: rgba(0, 255, 136, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: #00ff88;
`;

const ValueTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
`;

const ValueDescription = styled.p`
  color: #888;
  line-height: 1.6;
`;

const TeamSection = styled.section`
  background: #111;
  border: 1px solid #222;
  border-radius: 24px;
  padding: 4rem;
  margin: 4rem 0;
  text-align: center;
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

const TeamTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  color: #333;
`;

const TeamDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #ccc;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const DeveloperCard = styled.div`
  background: #0a0a0a;
  border: 2px solid #222;
  border-radius: 20px;
  padding: 3rem;
  max-width: 400px;
  margin: 0 auto;
  transition: all 0.3s ease;

  &:hover {
    border-color: #00ff88;
    transform: translateY(-4px);
  }
`;

const DeveloperName = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: #00ff88;
  margin-bottom: 0.5rem;
`;

const DeveloperRole = styled.p`
  font-size: 1.1rem;
  color: #888;
  margin-bottom: 1.5rem;
`;

const DeveloperBio = styled.p`
  color: #ccc;
  line-height: 1.6;
`;

const AboutPage = () => {
  const navigate = useNavigate();

  // Scroll vers le haut quand la page se charge
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { number: "2025", label: "Année de lancement" },
    { number: "1", label: "Développeur passionné" },
    { number: "100%", label: "Technologies modernes" },
    { number: "24/7", label: "Disponibilité" }
  ];

  const values = [
    {
      icon: <Shield size={32} />,
      title: "Sécurité",
      description: "Protection maximale de vos données avec un chiffrement de bout en bout et des protocoles de sécurité avancés."
    },
    {
      icon: <Zap size={32} />,
      title: "Performance",
      description: "Technologie WebRTC optimisée pour des communications fluides et une qualité audio/vidéo exceptionnelle."
    },
    {
      icon: <Heart size={32} />,
      title: "Simplicité",
      description: "Interface intuitive et expérience utilisateur pensée pour une prise en main immédiate et naturelle."
    },
    {
      icon: <Globe size={32} />,
      title: "Accessibilité",
      description: "Plateforme universelle accessible depuis n'importe quel navigateur moderne, sans installation requise."
    }
  ];

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
            À propos de Visio Pro
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            La nouvelle génération de visioconférence professionnelle, 
            conçue pour révolutionner vos communications d'entreprise.
          </Subtitle>
        </HeroSection>

        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>

        <StorySection>
          <StoryTitle>Notre Histoire</StoryTitle>
          <StoryText>
            Lancé en 2025 par Théo Garcès, Visio Pro révolutionne la communication professionnelle 
            en proposant une plateforme de visioconférence nouvelle génération. Conçue avec les 
            technologies web les plus avancées, notre solution offre une expérience utilisateur 
            exceptionnelle et des performances optimales.
          </StoryText>
          <StoryText>
            Grâce à l'intégration de WebRTC, Socket.io et React, Visio Pro garantit des communications 
            fluides et sécurisées. Notre plateforme s'adapte aux besoins des entreprises modernes 
            en proposant une interface intuitive, des fonctionnalités avancées et une fiabilité 
            à toute épreuve pour vos réunions professionnelles.
          </StoryText>
        </StorySection>

        <ValuesSection>
          <SectionTitle>Nos Valeurs</SectionTitle>
          <ValuesGrid>
            {values.map((value, index) => (
              <ValueCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <ValueIcon>{value.icon}</ValueIcon>
                <ValueTitle>{value.title}</ValueTitle>
                <ValueDescription>{value.description}</ValueDescription>
              </ValueCard>
            ))}
          </ValuesGrid>
        </ValuesSection>

        <TeamSection>
          <TeamTitle>L'Équipe</TeamTitle>
          <TeamDescription>
            Derrière Visio Pro se trouve un développeur passionné par les technologies web 
            et l'innovation dans le domaine des communications numériques.
          </TeamDescription>
          
          <DeveloperCard>
            <DeveloperName>Théo Garcès</DeveloperName>
            <DeveloperRole>Développeur Full-Stack & Fondateur</DeveloperRole>
            <DeveloperBio>
              Spécialisé dans les technologies web modernes, Théo apporte son expertise 
              en React, Node.js et WebRTC pour créer des solutions de communication 
              innovantes et performantes. Passionné par l'expérience utilisateur et 
              les architectures scalables.
            </DeveloperBio>
          </DeveloperCard>
        </TeamSection>
      </MainContent>
    </Container>
  );
};

export default AboutPage;
