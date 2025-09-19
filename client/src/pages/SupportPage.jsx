import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import CommonFooter from '../components/CommonFooter';
import { 
  Video, 
  ArrowLeft, 
  MessageCircle, 
  Mail, 
  FileText, 
  Search,
  ChevronDown,
  ChevronRight,
  Bug,
  Lightbulb,
  Settings,
  Book,
  ExternalLink
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

const SearchSection = styled.section`
  background: #111;
  border: 1px solid #222;
  border-radius: 24px;
  padding: 2rem;
  margin-bottom: 3rem;
  text-align: center;
`;

const SearchBox = styled.div`
  position: relative;
  max-width: 500px;
  margin: 0 auto;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background: #0a0a0a;
  border: 2px solid #333;
  border-radius: 16px;
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

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
`;

const SupportGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const SupportCard = styled(motion.div)`
  background: #111;
  border: 1px solid #222;
  border-radius: 24px;
  padding: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
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
    border-color: #333;
    transform: translateY(-4px);
  }
`;

const CardIcon = styled.div`
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

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
`;

const CardDescription = styled.p`
  color: #888;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const FAQSection = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
`;

const FAQItem = styled.div`
  background: #111;
  border: 1px solid #222;
  border-radius: 16px;
  margin-bottom: 1rem;
  overflow: hidden;
`;

const FAQQuestion = styled.div`
  padding: 1.5rem;
  cursor: pointer;
  display: flex;
  justify-content: between;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    background: #1a1a1a;
  }
`;

const QuestionText = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  flex: 1;
`;

const FAQAnswer = styled.div`
  padding: 0 1.5rem 1.5rem;
  color: #ccc;
  line-height: 1.6;
  border-top: 1px solid #222;
`;

const ContactSection = styled.section`
  background: #111;
  border: 1px solid #222;
  border-radius: 24px;
  padding: 3rem;
  text-align: center;
`;

const ContactTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
`;

const ContactText = styled.p`
  color: #888;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const ContactInfo = styled.div`
  background: #0a0a0a;
  border: 2px solid #222;
  border-radius: 16px;
  padding: 2rem;
  margin-top: 2rem;
  text-align: left;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  color: #ccc;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SupportPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const supportOptions = [
    {
      icon: <FileText size={32} />,
      title: "Documentation",
      description: "Consultez notre documentation technique complète pour comprendre toutes les fonctionnalités.",
      action: () => navigate('/docs')
    },
    {
      icon: <Bug size={32} />,
      title: "Signaler un Bug",
      description: "Vous avez trouvé un problème ? Aidez-nous à l'améliorer en le signalant.",
      action: () => alert("Fonctionnalité de rapport de bug en développement")
    },
    {
      icon: <Lightbulb size={32} />,
      title: "Demande de Fonctionnalité",
      description: "Proposez de nouvelles idées pour améliorer l'application.",
      action: () => alert("Système de suggestions en développement")
    },
    {
      icon: <MessageCircle size={32} />,
      title: "Contact Direct",
      description: "Contactez directement le développeur pour un support personnalisé.",
      action: () => alert("Contact disponible via l'application")
    }
  ];

  const faqItems = [
    {
      question: "Comment démarrer une nouvelle réunion ?",
      answer: "Cliquez sur le bouton 'Créer une salle' sur la page d'accueil, puis partagez le lien généré avec vos participants."
    },
    {
      question: "Puis-je utiliser l'application sans créer de compte ?",
      answer: "Oui, cette version de démonstration fonctionne sans inscription. Entrez simplement votre nom pour rejoindre une réunion."
    },
    {
      question: "Combien de participants peuvent rejoindre une réunion ?",
      answer: "Dans cette version de test, le nombre de participants est limité par les performances de votre navigateur et votre connexion internet."
    },
    {
      question: "Les réunions sont-elles enregistrées ?",
      answer: "Non, cette application de démonstration ne stocke aucune donnée. Toutes les communications sont temporaires et locales."
    },
    {
      question: "Quels navigateurs sont supportés ?",
      answer: "L'application fonctionne sur tous les navigateurs modernes supportant WebRTC : Chrome, Firefox, Safari, Edge."
    },
    {
      question: "Comment partager mon écran ?",
      answer: "Cliquez sur l'icône de partage d'écran dans les contrôles de la réunion. Votre navigateur vous demandera l'autorisation."
    },
    {
      question: "Puis-je utiliser l'application sur mobile ?",
      answer: "Oui, l'interface est responsive et fonctionne sur mobile, bien que l'expérience soit optimisée pour desktop."
    },
    {
      question: "Comment résoudre les problèmes audio/vidéo ?",
      answer: "Vérifiez les permissions de votre navigateur, testez votre microphone/caméra, et assurez-vous d'avoir une connexion stable."
    }
  ];

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
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
            Centre d'Aide
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Trouvez rapidement les réponses à vos questions ou contactez notre support
          </Subtitle>
        </HeroSection>

        <SearchSection>
          <h3 style={{ marginBottom: '1.5rem', color: '#3b82f6' }}>Rechercher dans l'aide</h3>
          <SearchBox>
            <SearchIcon>
              <Search size={20} />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Tapez votre question..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBox>
        </SearchSection>

        <SupportGrid>
          {supportOptions.map((option, index) => (
            <SupportCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              onClick={option.action}
            >
              <CardIcon>{option.icon}</CardIcon>
              <CardTitle>{option.title}</CardTitle>
              <CardDescription>{option.description}</CardDescription>
            </SupportCard>
          ))}
        </SupportGrid>

        <FAQSection>
          <SectionTitle>Questions Fréquentes</SectionTitle>
          {faqItems.map((item, index) => (
            <FAQItem key={index}>
              <FAQQuestion onClick={() => toggleFAQ(index)}>
                <QuestionText>{item.question}</QuestionText>
                {expandedFAQ === index ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              </FAQQuestion>
              {expandedFAQ === index && (
                <FAQAnswer>{item.answer}</FAQAnswer>
              )}
            </FAQItem>
          ))}
        </FAQSection>

        <ContactSection>
          <ContactTitle>Besoin d'aide supplémentaire ?</ContactTitle>
          <ContactText>
            Cette application étant un projet de démonstration développé par Théo Garcès, 
            le support est fourni dans le cadre du développement et des tests.
          </ContactText>
          
          <ContactInfo>
            <InfoItem>
              <Mail size={20} />
              <span>Contact disponible via l'interface de l'application</span>
            </InfoItem>
            <InfoItem>
              <Settings size={20} />
              <span>Environnement de développement local</span>
            </InfoItem>
            <InfoItem>
              <Book size={20} />
              <span>Documentation technique intégrée</span>
            </InfoItem>
            <InfoItem>
              <ExternalLink size={20} />
              <span>Code source disponible pour inspection</span>
            </InfoItem>
          </ContactInfo>
          
          <ContactText style={{ marginTop: '2rem', fontSize: '0.9rem' }}>
            <strong>Note :</strong> Il s'agit d'un projet de démonstration technique. 
            Le support est limité au cadre de développement et de test de l'application.
          </ContactText>
        </ContactSection>
      </MainContent>
      <CommonFooter />
    </Container>
  );
};

export default SupportPage;
