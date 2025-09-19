import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
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
  FileText, 
  Copy, 
  Check, 
  Play,
  Download,
  Cpu,
  Activity
} from 'lucide-react';

const Container = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
  color: #333;
  overflow-x: hidden;
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

const Sidebar = styled.div`
  background: #111;
  border: 1px solid #222;
  border-radius: 24px;
  padding: 2rem;
  height: fit-content;
  position: sticky;
  top: 8rem;

  @media (max-width: 1024px) {
    position: static;
    order: 2;
  }
`;

const SearchBox = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #222;
  border-radius: 16px;
  background: #0a0a0a;
  color: #333;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: #555;
  }

  &:focus {
    outline: none;
    border-color: #00ff88;
    box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.1);
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #555;
  size: 16px;
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CategoryItem = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: ${props => props.active ? 'rgba(0, 255, 136, 0.1)' : 'transparent'};
  border: 1px solid ${props => props.active ? '#00ff88' : 'transparent'};
  border-radius: 16px;
  color: ${props => props.active ? '#00ff88' : '#888'};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  width: 100%;

  &:hover {
    background: rgba(0, 255, 136, 0.05);
    color: #00ff88;
    border-color: #333;
  }
`;

const ContentArea = styled.div`
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

const ContentHeader = styled.div`
  margin-bottom: 3rem;
`;

const ContentTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ContentSubtitle = styled.p`
  font-size: 1.1rem;
  color: #888;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const QuickStart = styled.div`
  background: #0a0a0a;
  border: 2px solid #00ff88;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 3rem;
`;

const QuickStartTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #00ff88;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CodeBlock = styled.div`
  background: #000;
  border: 1px solid #333;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1rem 0;
  position: relative;
  overflow-x: auto;
`;

const CodeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #333;
`;

const CodeLanguage = styled.span`
  font-size: 0.8rem;
  color: #888;
  text-transform: uppercase;
  font-weight: 600;
`;

const CopyButton = styled.button`
  background: transparent;
  border: 1px solid #333;
  color: #888;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: #00ff88;
    color: #00ff88;
  }
`;

const CodePre = styled.pre`
  color: #e6e6e6;
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
  overflow-x: auto;

  .keyword { color: #ff79c6; }
  .string { color: #f1fa8c; }
  .number { color: #bd93f9; }
  .comment { color: #6272a4; }
  .function { color: #50fa7b; }
  .property { color: #8be9fd; }
`;

const EndpointSection = styled.div`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const EndpointCard = styled(motion.div)`
  background: #0a0a0a;
  border: 1px solid #222;
  border-radius: 16px;
  margin-bottom: 1.5rem;
  overflow: hidden;
`;

const EndpointHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #222;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 255, 136, 0.05);
  }
`;

const EndpointMethod = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-right: 1rem;

  &.get { background: #4caf50; color: #333; }
  &.post { background: #2196f3; color: #333; }
  &.put { background: #ff9800; color: #333; }
  &.delete { background: #f44336; color: #333; }
`;

const EndpointPath = styled.span`
  font-family: 'Fira Code', monospace;
  color: #00ff88;
  font-weight: 600;
`;

const EndpointDescription = styled.p`
  color: #888;
  margin-top: 0.5rem;
  line-height: 1.5;
`;

const EndpointDetails = styled(motion.div)`
  padding: 1.5rem;
  border-top: 1px solid #222;
`;

const ParameterTable = styled.div`
  background: #000;
  border: 1px solid #333;
  border-radius: 8px;
  overflow: hidden;
  margin: 1rem 0;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 2fr;
  gap: 1rem;
  padding: 1rem;
  background: #111;
  border-bottom: 1px solid #333;
  font-weight: 600;
  color: #ccc;
  font-size: 0.9rem;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 2fr;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #333;
  font-size: 0.9rem;

  &:last-child {
    border-bottom: none;
  }
`;

const ParameterName = styled.code`
  color: #00ff88;
  background: rgba(0, 255, 136, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const ParameterType = styled.span`
  color: #bd93f9;
  font-family: 'Fira Code', monospace;
  font-size: 0.8rem;
`;

const Required = styled.span`
  color: ${props => props.required ? '#f44336' : '#888'};
  font-size: 0.8rem;
  font-weight: 600;
`;

const ResponseExample = styled.div`
  margin-top: 1.5rem;
`;

const ExampleTitle = styled.h4`
  color: #333;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const StatusCode = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 700;
  margin-right: 0.5rem;

  &.success { background: #4caf50; color: #333; }
  &.error { background: #f44336; color: #333; }
`;

const SDKSection = styled.div`
  margin-bottom: 3rem;
`;

const SDKGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const SDKCard = styled(motion.div)`
  background: #0a0a0a;
  border: 2px solid #222;
  border-radius: 16px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #00ff88;
    transform: translateY(-2px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => props.color || '#00ff88'};
  }
`;

const SDKIcon = styled.div`
  width: 50px;
  height: 50px;
  background: ${props => props.color || '#00ff88'};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: #0a0a0a;
`;

const SDKTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
`;

const SDKDescription = styled.p`
  color: #888;
  line-height: 1.5;
  margin-bottom: 1.5rem;
`;

const SDKButton = styled.button`
  background: transparent;
  border: 2px solid #00ff88;
  color: #00ff88;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #00ff88;
    color: #0a0a0a;
  }
`;

const RateLimitInfo = styled.div`
  background: rgba(255, 152, 0, 0.1);
  border: 1px solid #ff9800;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 2rem 0;
`;

const RateLimitTitle = styled.h4`
  color: #ff9800;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AuthSection = styled.div`
  background: rgba(0, 255, 136, 0.05);
  border: 1px solid rgba(0, 255, 136, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 2rem 0;
`;

const AuthTitle = styled.h4`
  color: #00ff88;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const APIDocsPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedEndpoint, setExpandedEndpoint] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);

  const categories = [
    { id: 'getting-started', label: 'Premiers pas', icon: Play },
    { id: 'authentication', label: 'Authentification', icon: Key },
    { id: 'rooms', label: 'Salles', icon: Video },
    { id: 'users', label: 'Utilisateurs', icon: Users },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'recording', label: 'Enregistrement', icon: FileText },
    { id: 'webhooks', label: 'Webhooks', icon: Zap },
    { id: 'sdks', label: 'SDKs', icon: Code },
    { id: 'rate-limits', label: 'Limites', icon: Shield }
  ];

  const endpoints = {
    'getting-started': [],
    'authentication': [
      {
        method: 'POST',
        path: '/api/auth/register',
        description: 'Créer un nouveau compte utilisateur',
        parameters: [
          { name: 'name', type: 'string', required: true, description: 'Nom complet de l\'utilisateur' },
          { name: 'email', type: 'string', required: true, description: 'Adresse email unique' },
          { name: 'password', type: 'string', required: true, description: 'Mot de passe (minimum 6 caractères)' }
        ],
        response: {
          status: 201,
          example: `{
  "success": true,
  "message": "Compte créé avec succès",
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com"
  }
}`
        }
      },
      {
        method: 'POST',
        path: '/api/auth/login',
        description: 'Se connecter avec un compte existant',
        parameters: [
          { name: 'email', type: 'string', required: true, description: 'Adresse email du compte' },
          { name: 'password', type: 'string', required: true, description: 'Mot de passe du compte' }
        ],
        response: {
          status: 200,
          example: `{
  "success": true,
  "message": "Connexion réussie",
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com"
  }
}`
        }
      }
    ],
    'rooms': [
      {
        method: 'POST',
        path: '/api/rooms/create',
        description: 'Créer une nouvelle salle de visioconférence',
        parameters: [
          { name: 'userId', type: 'string', required: true, description: 'ID de l\'utilisateur créateur' }
        ],
        response: {
          status: 201,
          example: `{
  "success": true,
  "roomId": "room_abc123",
  "message": "Salle créée avec succès",
  "joinUrl": "http://localhost:3003/room/room_abc123"
}`
        }
      },
      {
        method: 'GET',
        path: '/api/rooms/{roomId}',
        description: 'Obtenir les informations d\'une salle',
        parameters: [
          { name: 'roomId', type: 'string', required: true, description: 'ID unique de la salle' }
        ],
        response: {
          status: 200,
          example: `{
  "success": true,
  "room": {
    "id": "room_abc123",
    "createdBy": "user_123",
    "participants": [],
    "createdAt": "2024-12-06T01:15:00Z",
    "isActive": true
  }
}`
        }
      },
      {
        method: 'POST',
        path: '/api/rooms/{roomId}/join',
        description: 'Rejoindre une salle existante',
        parameters: [
          { name: 'roomId', type: 'string', required: true, description: 'ID de la salle à rejoindre' },
          { name: 'userId', type: 'string', required: true, description: 'ID de l\'utilisateur qui rejoint' }
        ],
        response: {
          status: 200,
          example: `{
  "success": true,
  "message": "Utilisateur ajouté à la salle",
  "room": {
    "id": "room_abc123",
    "participants": ["user_123", "user_456"]
  }
}`
        }
      }
    ],
    'users': [
      {
        method: 'GET',
        path: '/api/users/me',
        description: 'Obtenir les informations de l\'utilisateur connecté',
        parameters: [],
        response: {
          status: 200,
          example: `{
  "success": true,
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe",
    "avatar": "https://cdn.visio.pro/avatars/user_123.jpg",
    "plan": "pro",
    "created_at": "2024-01-01T00:00:00Z"
  }
}`
        }
      }
    ]
  };

  const sdks = [
    {
      name: 'JavaScript SDK',
      description: 'SDK officiel pour les applications web et Node.js',
      icon: <Code size={20} />,
      color: '#f7df1e',
      installCommand: 'npm install @visio-pro/sdk'
    },
    {
      name: 'Python SDK',
      description: 'SDK pour les applications Python et Django/Flask',
      icon: <Terminal size={20} />,
      color: '#3776ab',
      installCommand: 'pip install visio-pro-sdk'
    },
    {
      name: 'React Components',
      description: 'Composants React prêts à l\'emploi',
      icon: <Cpu size={20} />,
      color: '#61dafb',
      installCommand: 'npm install @visio-pro/react'
    },
    {
      name: 'Mobile SDK',
      description: 'SDK pour React Native et applications mobiles',
      icon: <Activity size={20} />,
      color: '#ff6b6b',
      installCommand: 'npm install @visio-pro/mobile'
    }
  ];

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const currentEndpoints = endpoints[activeCategory] || [];

  return (
    <Container>
      <Header>
        <Nav>
          <Logo onClick={() => navigate('/')}>
            <Video size={24} />
            Visio Pro
          </Logo>
          <BackButton onClick={() => navigate('/support')}>
            <ArrowLeft size={16} />
            Retour au Support
          </BackButton>
        </Nav>
      </Header>

      <MainContent>
        <Sidebar>
          <SearchBox>
            <SearchIcon />
            <SearchInput
              type="text"
              placeholder="Rechercher dans l'API..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBox>

          <CategoryList>
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <CategoryItem
                  key={category.id}
                  active={activeCategory === category.id}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <IconComponent size={20} />
                  {category.label}
                </CategoryItem>
              );
            })}
          </CategoryList>
        </Sidebar>

        <ContentArea>
          <ContentHeader>
            <ContentTitle>
              <Terminal size={32} />
              Documentation API
            </ContentTitle>
            <ContentSubtitle>
              Intégrez Visio Pro dans vos applications avec notre API REST complète. 
              Créez des salles, gérez les utilisateurs et accédez à toutes les fonctionnalités.
            </ContentSubtitle>
          </ContentHeader>

          {activeCategory === 'getting-started' && (
            <>
              <QuickStart>
                <QuickStartTitle>
                  <Zap size={20} />
                  Démarrage rapide
                </QuickStartTitle>
                <p style={{ color: '#888', marginBottom: '1.5rem' }}>
                  Commencez à utiliser l'API Visio Pro en quelques minutes avec cet exemple simple.
                </p>
                
                <CodeBlock>
                  <CodeHeader>
                    <CodeLanguage>JavaScript</CodeLanguage>
                    <CopyButton onClick={() => copyToClipboard(`const response = await fetch('https://api.visio.pro/v1/rooms', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Ma première réunion',
    max_participants: 10
  })
});

const room = await response.json();
console.log('Salle créée:', room.room.join_url);`, 'quickstart')}>
                      {copiedCode === 'quickstart' ? <Check size={14} /> : <Copy size={14} />}
                      {copiedCode === 'quickstart' ? 'Copié' : 'Copier'}
                    </CopyButton>
                  </CodeHeader>
                  <CodePre>{`const response = await fetch('https://api.visio.pro/v1/rooms', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Ma première réunion',
    max_participants: 10
  })
});

const room = await response.json();
console.log('Salle créée:', room.room.join_url);`}</CodePre>
                </CodeBlock>
              </QuickStart>

              <AuthSection>
                <AuthTitle>
                  <Key size={20} />
                  Authentification
                </AuthTitle>
                <p style={{ color: '#888', marginBottom: '1rem' }}>
                  Toutes les requêtes API nécessitent une authentification via un token Bearer. 
                  Obtenez votre clé API dans votre tableau de bord.
                </p>
                <CodeBlock>
                  <CodeHeader>
                    <CodeLanguage>HTTP</CodeLanguage>
                    <CopyButton onClick={() => copyToClipboard('Authorization: Bearer YOUR_API_KEY', 'auth')}>
                      {copiedCode === 'auth' ? <Check size={14} /> : <Copy size={14} />}
                      {copiedCode === 'auth' ? 'Copié' : 'Copier'}
                    </CopyButton>
                  </CodeHeader>
                  <CodePre>Authorization: Bearer YOUR_API_KEY</CodePre>
                </CodeBlock>
              </AuthSection>

              <RateLimitInfo>
                <RateLimitTitle>
                  <Shield size={20} />
                  Limites de taux
                </RateLimitTitle>
                <p style={{ color: '#888' }}>
                  L'API est limitée à 1000 requêtes par heure par clé API. 
                  Les en-têtes de réponse incluent des informations sur votre utilisation actuelle.
                </p>
              </RateLimitInfo>
            </>
          )}

          {activeCategory === 'sdks' && (
            <SDKSection>
              <SectionTitle>
                <Code size={24} />
                SDKs officiels
              </SectionTitle>
              <SDKGrid>
                {sdks.map((sdk, index) => (
                  <SDKCard
                    key={index}
                    color={sdk.color}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <SDKIcon color={sdk.color}>
                      {sdk.icon}
                    </SDKIcon>
                    <SDKTitle>{sdk.name}</SDKTitle>
                    <SDKDescription>{sdk.description}</SDKDescription>
                    <CodeBlock>
                      <CodeHeader>
                        <CodeLanguage>Installation</CodeLanguage>
                        <CopyButton onClick={() => copyToClipboard(sdk.installCommand, `sdk-${index}`)}>
                          {copiedCode === `sdk-${index}` ? <Check size={14} /> : <Copy size={14} />}
                          {copiedCode === `sdk-${index}` ? 'Copié' : 'Copier'}
                        </CopyButton>
                      </CodeHeader>
                      <CodePre>{sdk.installCommand}</CodePre>
                    </CodeBlock>
                    <SDKButton>
                      <Download size={16} />
                      Documentation
                    </SDKButton>
                  </SDKCard>
                ))}
              </SDKGrid>
            </SDKSection>
          )}

          {currentEndpoints.length > 0 && (
            <EndpointSection>
              <SectionTitle>
                <Globe size={24} />
                Endpoints API
              </SectionTitle>
              {currentEndpoints.map((endpoint, index) => (
                <EndpointCard key={index}>
                  <EndpointHeader
                    onClick={() => setExpandedEndpoint(
                      expandedEndpoint === index ? null : index
                    )}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <EndpointMethod className={endpoint.method.toLowerCase()}>
                        {endpoint.method}
                      </EndpointMethod>
                      <EndpointPath>{endpoint.path}</EndpointPath>
                    </div>
                    <EndpointDescription>{endpoint.description}</EndpointDescription>
                  </EndpointHeader>

                  <AnimatePresence>
                    {expandedEndpoint === index && (
                      <EndpointDetails
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {endpoint.parameters.length > 0 && (
                          <>
                            <ExampleTitle>Paramètres</ExampleTitle>
                            <ParameterTable>
                              <TableHeader>
                                <span>Nom</span>
                                <span>Type</span>
                                <span>Requis</span>
                                <span>Description</span>
                              </TableHeader>
                              {endpoint.parameters.map((param, paramIndex) => (
                                <TableRow key={paramIndex}>
                                  <ParameterName>{param.name}</ParameterName>
                                  <ParameterType>{param.type}</ParameterType>
                                  <Required required={param.required}>
                                    {param.required ? 'Oui' : 'Non'}
                                  </Required>
                                  <span style={{ color: '#888' }}>{param.description}</span>
                                </TableRow>
                              ))}
                            </ParameterTable>
                          </>
                        )}

                        <ResponseExample>
                          <ExampleTitle>
                            <StatusCode className="success">{endpoint.response.status}</StatusCode>
                            Exemple de réponse
                          </ExampleTitle>
                          <CodeBlock>
                            <CodeHeader>
                              <CodeLanguage>JSON</CodeLanguage>
                              <CopyButton onClick={() => copyToClipboard(endpoint.response.example, `response-${index}`)}>
                                {copiedCode === `response-${index}` ? <Check size={14} /> : <Copy size={14} />}
                                {copiedCode === `response-${index}` ? 'Copié' : 'Copier'}
                              </CopyButton>
                            </CodeHeader>
                            <CodePre>{endpoint.response.example}</CodePre>
                          </CodeBlock>
                        </ResponseExample>
                      </EndpointDetails>
                    )}
                  </AnimatePresence>
                </EndpointCard>
              ))}
            </EndpointSection>
          )}
        </ContentArea>
      </MainContent>
    </Container>
  );
};

export default APIDocsPage;
