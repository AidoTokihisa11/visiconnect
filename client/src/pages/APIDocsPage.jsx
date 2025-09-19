import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Video, 
  ArrowLeft, 
  Search, 
  Code, 
  Terminal, 
  Key, 
  Globe, 
  Shield, 
  Zap, 
  Users, 
  MessageCircle, 
  Copy, 
  Check, 
  Play,
  Download,
  Activity
} from 'lucide-react';

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

const Nav = styled.nav`
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

const BackButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  color: var(--text-primary, #1e293b);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--accent-cyan, #06b6d4);
    color: var(--accent-cyan, #06b6d4);
    transform: translateX(-2px);
  }
`;

const MainContent = styled.div`
  padding: 8rem 2rem 4rem;
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Sidebar = styled(motion.div)`
  background: var(--bg-card, rgba(255, 255, 255, 0.95));
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  padding: 2rem;
  height: fit-content;
  position: sticky;
  top: 8rem;
  box-shadow: var(--shadow-lg, 0 8px 25px rgba(0, 0, 0, 0.1));
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem;
  padding-left: 3rem;
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

const SearchIcon = styled(Search)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary, #475569);
  width: 20px;
  height: 20px;
`;

const NavigationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavigationItem = styled(motion.li)`
  margin-bottom: 0.5rem;
`;

const NavigationLink = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.active ? 'var(--accent-cyan, #06b6d4)' : 'transparent'};
  border-radius: 12px;
  background: ${props => props.active ? 'rgba(6, 182, 212, 0.1)' : 'transparent'};
  color: ${props => props.active ? 'var(--accent-cyan, #06b6d4)' : 'var(--text-secondary, #475569)'};
  text-align: left;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: var(--accent-cyan, #06b6d4);
    border-color: var(--accent-cyan, #06b6d4);
    background: rgba(6, 182, 212, 0.05);
  }
`;

const ContentArea = styled(motion.div)`
  background: var(--bg-card, rgba(255, 255, 255, 0.95));
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  padding: 3rem;
  box-shadow: var(--shadow-lg, 0 8px 25px rgba(0, 0, 0, 0.1));
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
`;

const PageSubtitle = styled.p`
  color: var(--text-secondary, #475569);
  font-size: 1.2rem;
  margin-bottom: 3rem;
  line-height: 1.6;
`;

const Section = styled.div`
  margin-bottom: 4rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary, #1e293b);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SectionDescription = styled.p`
  color: var(--text-secondary, #475569);
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const CodeBlock = styled.div`
  background: rgba(37, 99, 235, 0.05);
  border: 1px solid rgba(37, 99, 235, 0.2);
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem 0;
  position: relative;
  font-family: 'Monaco', 'Menlo', monospace;
`;

const CodeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(37, 99, 235, 0.2);
`;

const CodeTitle = styled.span`
  font-weight: 600;
  color: var(--text-primary, #1e293b);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CopyButton = styled(motion.button)`
  padding: 0.5rem 1rem;
  background: var(--accent-cyan, #06b6d4);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
  }
`;

const CodeContent = styled.pre`
  background: var(--bg-primary, #ffffff);
  color: var(--text-primary, #1e293b);
  padding: 1.5rem;
  border-radius: 12px;
  overflow-x: auto;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;

  .keyword { color: var(--accent-cyan, #06b6d4); font-weight: 600; }
  .string { color: #10b981; }
  .comment { color: var(--text-secondary, #475569); font-style: italic; }
  .number { color: #f59e0b; }
`;

const ParameterTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
  background: var(--bg-primary, #ffffff);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.th`
  background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
  color: white;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  color: var(--text-primary, #1e293b);
  
  &:last-child {
    border-bottom: none;
  }

  code {
    background: rgba(37, 99, 235, 0.1);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-family: 'Monaco', 'Menlo', monospace;
    font-size: 0.9rem;
    color: var(--accent-cyan, #06b6d4);
  }
`;

const ResponseExample = styled.div`
  background: var(--bg-primary, #ffffff);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem 0;
`;

const ResponseTitle = styled.h4`
  color: var(--text-primary, #1e293b);
  margin-bottom: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatusCode = styled.span`
  background: ${props => {
    if (props.code >= 200 && props.code < 300) return 'var(--success, #10b981)';
    if (props.code >= 400) return 'var(--error, #ef4444)';
    return 'var(--warning, #f59e0b)';
  }};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-left: 0.5rem;
`;

const QuickStart = styled.div`
  background: rgba(6, 182, 212, 0.05);
  border: 2px solid rgba(6, 182, 212, 0.3);
  border-radius: 20px;
  padding: 2rem;
  margin: 2rem 0;
  text-align: center;
`;

const QuickStartTitle = styled.h3`
  color: var(--text-primary, #1e293b);
  margin-bottom: 1rem;
  font-size: 1.3rem;
  font-weight: 700;
`;

const QuickStartButton = styled(motion.button)`
  background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin: 0.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4);
  }
`;

const APIDocsPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedCode, setCopiedCode] = useState('');

  const navigationItems = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: <Globe size={16} /> },
    { id: 'authentication', label: 'Authentification', icon: <Key size={16} /> },
    { id: 'meetings', label: 'Réunions', icon: <Video size={16} /> },
    { id: 'users', label: 'Utilisateurs', icon: <Users size={16} /> },
    { id: 'rooms', label: 'Salles', icon: <MessageCircle size={16} /> },
    { id: 'webhooks', label: 'Webhooks', icon: <Zap size={16} /> },
    { id: 'errors', label: 'Codes d\'erreur', icon: <Shield size={16} /> },
    { id: 'sdks', label: 'SDK & Outils', icon: <Download size={16} /> }
  ];

  const copyToClipboard = (text, codeId) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(codeId);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const renderOverview = () => (
    <Section>
      <PageTitle>Documentation API VisiConnect</PageTitle>
      <PageSubtitle>
        API REST complète pour intégrer les fonctionnalités de VisiConnect dans vos applications.
        Créez, gérez et personnalisez vos réunions en ligne avec notre API puissante et flexible.
      </PageSubtitle>

      <QuickStart>
        <QuickStartTitle>🚀 Démarrage rapide</QuickStartTitle>
        <p style={{ color: 'var(--text-secondary, #475569)', marginBottom: '1.5rem' }}>
          Commencez à utiliser l'API VisiConnect en quelques minutes
        </p>
        <div>
          <QuickStartButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play size={16} />
            Tester l'API
          </QuickStartButton>
          <QuickStartButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={16} />
            Télécharger SDK
          </QuickStartButton>
        </div>
      </QuickStart>

      <SectionTitle>
        <Globe size={24} />
        URL de base
      </SectionTitle>
      <SectionDescription>
        Toutes les requêtes API doivent être faites vers l'URL de base suivante :
      </SectionDescription>
      
      <CodeBlock>
        <CodeHeader>
          <CodeTitle>
            <Terminal size={16} />
            Base URL
          </CodeTitle>
          <CopyButton
            onClick={() => copyToClipboard('https://api.visiconnect.com/v1', 'base-url')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {copiedCode === 'base-url' ? <Check size={16} /> : <Copy size={16} />}
            {copiedCode === 'base-url' ? 'Copié' : 'Copier'}
          </CopyButton>
        </CodeHeader>
        <CodeContent>https://api.visiconnect.com/v1</CodeContent>
      </CodeBlock>

      <SectionTitle>
        <Shield size={24} />
        Authentification
      </SectionTitle>
      <SectionDescription>
        L'API VisiConnect utilise des clés API pour l'authentification. Incluez votre clé API dans l'en-tête Authorization :
      </SectionDescription>

      <CodeBlock>
        <CodeHeader>
          <CodeTitle>
            <Code size={16} />
            Exemple d'authentification
          </CodeTitle>
          <CopyButton
            onClick={() => copyToClipboard(`curl -H "Authorization: Bearer YOUR_API_KEY" \\
     -H "Content-Type: application/json" \\
     https://api.visiconnect.com/v1/meetings`, 'auth-example')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {copiedCode === 'auth-example' ? <Check size={16} /> : <Copy size={16} />}
            {copiedCode === 'auth-example' ? 'Copié' : 'Copier'}
          </CopyButton>
        </CodeHeader>
        <CodeContent>{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
     -H "Content-Type: application/json" \\
     https://api.visiconnect.com/v1/meetings`}</CodeContent>
      </CodeBlock>

      <SectionTitle>
        <Activity size={24} />
        Limites de taux
      </SectionTitle>
      <SectionDescription>
        L'API applique des limites de taux pour assurer la stabilité du service :
      </SectionDescription>

      <ParameterTable>
        <thead>
          <tr>
            <TableHeader>Plan</TableHeader>
            <TableHeader>Requêtes/minute</TableHeader>
            <TableHeader>Requêtes/heure</TableHeader>
            <TableHeader>Limite journalière</TableHeader>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TableCell><code>Starter</code></TableCell>
            <TableCell>60</TableCell>
            <TableCell>1,000</TableCell>
            <TableCell>10,000</TableCell>
          </tr>
          <tr>
            <TableCell><code>Professional</code></TableCell>
            <TableCell>120</TableCell>
            <TableCell>5,000</TableCell>
            <TableCell>50,000</TableCell>
          </tr>
          <tr>
            <TableCell><code>Enterprise</code></TableCell>
            <TableCell>Illimitées</TableCell>
            <TableCell>Illimitées</TableCell>
            <TableCell>Illimitées</TableCell>
          </tr>
        </tbody>
      </ParameterTable>
    </Section>
  );

  const renderMeetings = () => (
    <Section>
      <SectionTitle>
        <Video size={24} />
        API Réunions
      </SectionTitle>
      <SectionDescription>
        Créez, gérez et contrôlez vos réunions programmatiquement avec l'API Réunions.
      </SectionDescription>

      <h3 style={{ color: 'var(--text-primary, #1e293b)', marginTop: '2rem', marginBottom: '1rem' }}>
        Créer une réunion
      </h3>

      <CodeBlock>
        <CodeHeader>
          <CodeTitle>
            <Terminal size={16} />
            POST /meetings
          </CodeTitle>
          <CopyButton
            onClick={() => copyToClipboard(`curl -X POST https://api.visiconnect.com/v1/meetings \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Réunion d'équipe",
    "description": "Réunion hebdomadaire de l'équipe",
    "start_time": "2024-02-15T10:00:00Z",
    "duration": 60,
    "max_participants": 10,
    "settings": {
      "auto_recording": true,
      "waiting_room": false,
      "mute_on_entry": true
    }
  }'`, 'create-meeting')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {copiedCode === 'create-meeting' ? <Check size={16} /> : <Copy size={16} />}
            {copiedCode === 'create-meeting' ? 'Copié' : 'Copier'}
          </CopyButton>
        </CodeHeader>
        <CodeContent>{`curl -X POST https://api.visiconnect.com/v1/meetings \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Réunion d'équipe",
    "description": "Réunion hebdomadaire de l'équipe", 
    "start_time": "2024-02-15T10:00:00Z",
    "duration": 60,
    "max_participants": 10,
    "settings": {
      "auto_recording": true,
      "waiting_room": false,
      "mute_on_entry": true
    }
  }'`}</CodeContent>
      </CodeBlock>

      <h4 style={{ color: 'var(--text-primary, #1e293b)', marginTop: '2rem', marginBottom: '1rem' }}>
        Paramètres de la requête
      </h4>

      <ParameterTable>
        <thead>
          <tr>
            <TableHeader>Paramètre</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Requis</TableHeader>
            <TableHeader>Description</TableHeader>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TableCell><code>title</code></TableCell>
            <TableCell>string</TableCell>
            <TableCell>Oui</TableCell>
            <TableCell>Titre de la réunion</TableCell>
          </tr>
          <tr>
            <TableCell><code>description</code></TableCell>
            <TableCell>string</TableCell>
            <TableCell>Non</TableCell>
            <TableCell>Description de la réunion</TableCell>
          </tr>
          <tr>
            <TableCell><code>start_time</code></TableCell>
            <TableCell>datetime</TableCell>
            <TableCell>Oui</TableCell>
            <TableCell>Date et heure de début (ISO 8601)</TableCell>
          </tr>
          <tr>
            <TableCell><code>duration</code></TableCell>
            <TableCell>integer</TableCell>
            <TableCell>Oui</TableCell>
            <TableCell>Durée en minutes</TableCell>
          </tr>
          <tr>
            <TableCell><code>max_participants</code></TableCell>
            <TableCell>integer</TableCell>
            <TableCell>Non</TableCell>
            <TableCell>Nombre maximum de participants</TableCell>
          </tr>
        </tbody>
      </ParameterTable>

      <ResponseExample>
        <ResponseTitle>
          <Check size={16} />
          Réponse de succès
          <StatusCode code={201}>201 Created</StatusCode>
        </ResponseTitle>
        <CodeContent>{`{
  "id": "mtg_1234567890",
  "title": "Réunion d'équipe",
  "description": "Réunion hebdomadaire de l'équipe",
  "start_time": "2024-02-15T10:00:00Z",
  "duration": 60,
  "status": "scheduled",
  "join_url": "https://visiconnect.com/join/mtg_1234567890",
  "host_url": "https://visiconnect.com/host/mtg_1234567890",
  "created_at": "2024-02-14T15:30:00Z",
  "settings": {
    "auto_recording": true,
    "waiting_room": false,
    "mute_on_entry": true
  }
}`}</CodeContent>
      </ResponseExample>
    </Section>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverview();
      case 'meetings':
        return renderMeetings();
      case 'authentication':
        return (
          <Section>
            <SectionTitle>
              <Key size={24} />
              Authentification
            </SectionTitle>
            <SectionDescription>
              Gérez l'authentification et l'autorisation de votre application avec l'API VisiConnect.
            </SectionDescription>
            <p style={{ color: 'var(--text-secondary, #475569)' }}>
              Documentation détaillée sur l'authentification en cours de rédaction...
            </p>
          </Section>
        );
      default:
        return renderOverview();
    }
  };

  const filteredNavigation = navigationItems.filter(item =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

          <BackButton
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={18} />
            Retour à l'accueil
          </BackButton>
        </Nav>
      </Header>

      <MainContent>
        <Sidebar
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SearchContainer>
            <SearchIcon />
            <SearchInput
              placeholder="Rechercher dans la documentation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>

          <NavigationList>
            <AnimatePresence>
              {filteredNavigation.map((item) => (
                <NavigationItem
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <NavigationLink
                    active={activeSection === item.id}
                    onClick={() => setActiveSection(item.id)}
                  >
                    {item.icon}
                    {item.label}
                  </NavigationLink>
                </NavigationItem>
              ))}
            </AnimatePresence>
          </NavigationList>
        </Sidebar>

        <ContentArea
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {renderContent()}
        </ContentArea>
      </MainContent>
    </Container>
  );
};

export default APIDocsPage;