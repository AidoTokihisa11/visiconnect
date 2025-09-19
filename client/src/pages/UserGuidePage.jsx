import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, 
  ArrowLeft, 
  Search, 
  Book, 
  Play, 
  Users, 
  Settings, 
  Shield, 
  Camera, 
  Monitor, 
  MessageCircle, 
  FileText, 
  Palette, 
  HelpCircle, 
  ChevronDown,
  Clock,
  Eye,
  ThumbsUp
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
`;

const ArticleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const ArticleCard = styled(motion.div)`
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

const ArticleIcon = styled.div`
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

const ArticleTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
`;

const ArticleDescription = styled.p`
  color: #888;
  line-height: 1.5;
  margin-bottom: 1.5rem;
`;

const ArticleMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #666;
`;

const ArticleStats = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const TutorialSection = styled.div`
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

const TutorialList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TutorialItem = styled(motion.div)`
  background: #0a0a0a;
  border: 1px solid #222;
  border-radius: 16px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #333;
    transform: translateX(5px);
  }
`;

const TutorialHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.expanded ? '1rem' : '0'};
`;

const TutorialTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const TutorialContent = styled(motion.div)`
  color: #888;
  line-height: 1.6;
`;

const StepList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
`;

const StepItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #111;
  border-radius: 12px;
  border-left: 3px solid #00ff88;
`;

const StepNumber = styled.div`
  width: 24px;
  height: 24px;
  background: #00ff88;
  color: #0a0a0a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.8rem;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h5`
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
`;

const StepDescription = styled.p`
  color: #888;
  margin: 0;
  line-height: 1.5;
`;

const VideoTutorial = styled.div`
  background: #222;
  border-radius: 12px;
  padding: 1rem;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #333;
  }
`;

const VideoThumbnail = styled.div`
  width: 80px;
  height: 60px;
  background: linear-gradient(135deg, #00ff88, #00e67a);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0a0a0a;
`;

const VideoInfo = styled.div`
  flex: 1;
`;

const VideoTitle = styled.h6`
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
`;

const VideoDuration = styled.span`
  font-size: 0.85rem;
  color: #888;
`;

const FAQSection = styled.div`
  margin-top: 3rem;
`;

const FAQItem = styled.div`
  background: #0a0a0a;
  border: 1px solid #222;
  border-radius: 16px;
  margin-bottom: 1rem;
  overflow: hidden;
`;

const FAQQuestion = styled.button`
  width: 100%;
  padding: 1.5rem;
  background: transparent;
  border: none;
  color: #333;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 255, 136, 0.05);
  }
`;

const FAQAnswer = styled(motion.div)`
  padding: 0 1.5rem 1.5rem;
  color: #888;
  line-height: 1.6;
`;

const UserGuidePage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTutorial, setExpandedTutorial] = useState(null);
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const categories = [
    { id: 'getting-started', label: 'Premiers pas', icon: Play },
    { id: 'meetings', label: 'Réunions', icon: Video },
    { id: 'audio-video', label: 'Audio & Vidéo', icon: Camera },
    { id: 'sharing', label: 'Partage d\'écran', icon: Monitor },
    { id: 'chat', label: 'Chat & Messages', icon: MessageCircle },
    { id: 'recording', label: 'Enregistrement', icon: FileText },
    { id: 'whiteboard', label: 'Tableau blanc', icon: Palette },
    { id: 'settings', label: 'Paramètres', icon: Settings },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'troubleshooting', label: 'Dépannage', icon: HelpCircle }
  ];

  const articles = {
    'getting-started': [
      {
        id: 1,
        title: 'Créer votre compte',
        description: 'Inscription et configuration de votre profil utilisateur',
        icon: <Users size={20} />,
        color: '#4caf50',
        views: 1240,
        likes: 89,
        duration: '3 min'
      },
      {
        id: 2,
        title: 'Interface de la salle',
        description: 'Découvrez les contrôles vidéo, audio et de partage d\'écran',
        icon: <Monitor size={20} />,
        color: '#2196f3',
        views: 980,
        likes: 67,
        duration: '5 min'
      },
      {
        id: 3,
        title: 'Rejoindre une réunion',
        description: 'Comment entrer dans une salle de visioconférence',
        icon: <Video size={20} />,
        color: '#ff9800',
        views: 1560,
        likes: 124,
        duration: '2 min'
      }
    ],
    'meetings': [
      {
        id: 4,
        title: 'Créer une salle',
        description: 'Démarrer une nouvelle session de visioconférence',
        icon: <Clock size={20} />,
        color: '#9c27b0',
        views: 750,
        likes: 45,
        duration: '4 min'
      },
      {
        id: 5,
        title: 'Inviter des participants',
        description: 'Partager le lien de votre salle avec d\'autres utilisateurs',
        icon: <Users size={20} />,
        color: '#f44336',
        views: 690,
        likes: 38,
        duration: '3 min'
      }
    ],
    'audio-video': [
      {
        id: 6,
        title: 'Contrôles audio/vidéo',
        description: 'Activer/désactiver votre micro et caméra',
        icon: <Camera size={20} />,
        color: '#00bcd4',
        views: 820,
        likes: 56,
        duration: '4 min'
      }
    ],
    'sharing': [
      {
        id: 7,
        title: 'Partage d\'écran',
        description: 'Comment partager votre écran avec les participants',
        icon: <Monitor size={20} />,
        color: '#795548',
        views: 650,
        likes: 42,
        duration: '5 min'
      }
    ],
    'chat': [
      {
        id: 8,
        title: 'Utiliser le chat',
        description: 'Envoyer des messages pendant la visioconférence',
        icon: <MessageCircle size={20} />,
        color: '#607d8b',
        views: 540,
        likes: 35,
        duration: '3 min'
      }
    ],
    'whiteboard': [
      {
        id: 9,
        title: 'Tableau blanc collaboratif',
        description: 'Dessiner et collaborer en temps réel',
        icon: <Palette size={20} />,
        color: '#e91e63',
        views: 420,
        likes: 28,
        duration: '6 min'
      }
    ]
  };

  const tutorials = {
    'getting-started': [
      {
        id: 1,
        title: 'Comment créer un compte',
        steps: [
          {
            title: 'Accéder à la page d\'inscription',
            description: 'Cliquez sur "S\'inscrire" dans le menu principal de la page d\'accueil'
          },
          {
            title: 'Remplir le formulaire d\'inscription',
            description: 'Saisissez votre nom, email et créez un mot de passe sécurisé'
          },
          {
            title: 'Confirmer votre inscription',
            description: 'Cliquez sur "Créer mon compte" pour finaliser l\'inscription'
          },
          {
            title: 'Accéder à votre tableau de bord',
            description: 'Vous êtes maintenant connecté et pouvez créer des salles'
          }
        ]
      },
      {
        id: 2,
        title: 'Première connexion',
        steps: [
          {
            title: 'Page de connexion',
            description: 'Utilisez vos identifiants pour vous connecter'
          },
          {
            title: 'Tableau de bord',
            description: 'Découvrez l\'interface principale avec les options de création de salle'
          },
          {
            title: 'Paramètres du profil',
            description: 'Configurez vos préférences audio/vidéo dans les paramètres'
          }
        ]
      }
    ],
    'meetings': [
      {
        id: 3,
        title: 'Créer une salle de visioconférence',
        steps: [
          {
            title: 'Cliquer sur "Créer une salle"',
            description: 'Utilisez le bouton principal sur votre tableau de bord'
          },
          {
            title: 'Entrer dans la salle',
            description: 'Vous êtes automatiquement dirigé vers votre nouvelle salle'
          },
          {
            title: 'Partager le lien',
            description: 'Copiez l\'URL de la salle pour inviter d\'autres participants'
          },
          {
            title: 'Attendre les participants',
            description: 'Les autres utilisateurs peuvent rejoindre avec le lien partagé'
          }
        ]
      },
      {
        id: 4,
        title: 'Rejoindre une salle existante',
        steps: [
          {
            title: 'Recevoir le lien',
            description: 'Obtenez le lien de la salle de la part de l\'organisateur'
          },
          {
            title: 'Cliquer sur le lien',
            description: 'Le lien vous dirigera directement vers la salle'
          },
          {
            title: 'Autoriser les permissions',
            description: 'Acceptez l\'accès à votre caméra et microphone'
          },
          {
            title: 'Participer à la réunion',
            description: 'Vous êtes maintenant connecté avec les autres participants'
          }
        ]
      }
    ],
    'audio-video': [
      {
        id: 5,
        title: 'Gérer votre audio et vidéo',
        steps: [
          {
            title: 'Boutons de contrôle',
            description: 'Utilisez les boutons micro et caméra en bas de l\'écran'
          },
          {
            title: 'Activer/désactiver le micro',
            description: 'Cliquez sur l\'icône micro pour couper ou activer votre son'
          },
          {
            title: 'Activer/désactiver la caméra',
            description: 'Cliquez sur l\'icône caméra pour afficher ou masquer votre vidéo'
          },
          {
            title: 'Paramètres avancés',
            description: 'Accédez aux paramètres pour choisir vos périphériques'
          }
        ]
      }
    ],
    'sharing': [
      {
        id: 6,
        title: 'Partager votre écran',
        steps: [
          {
            title: 'Cliquer sur "Partager l\'écran"',
            description: 'Utilisez le bouton de partage d\'écran dans la barre d\'outils'
          },
          {
            title: 'Choisir ce que partager',
            description: 'Sélectionnez votre écran entier, une fenêtre ou un onglet'
          },
          {
            title: 'Confirmer le partage',
            description: 'Cliquez sur "Partager" pour commencer la diffusion'
          },
          {
            title: 'Arrêter le partage',
            description: 'Cliquez à nouveau sur le bouton pour arrêter le partage'
          }
        ]
      }
    ],
    'chat': [
      {
        id: 7,
        title: 'Utiliser le chat',
        steps: [
          {
            title: 'Ouvrir le panneau de chat',
            description: 'Cliquez sur l\'icône de chat dans la barre latérale'
          },
          {
            title: 'Écrire un message',
            description: 'Tapez votre message dans la zone de texte en bas'
          },
          {
            title: 'Envoyer le message',
            description: 'Appuyez sur Entrée ou cliquez sur le bouton d\'envoi'
          },
          {
            title: 'Voir les messages',
            description: 'Tous les participants peuvent voir vos messages en temps réel'
          }
        ]
      }
    ],
    'whiteboard': [
      {
        id: 8,
        title: 'Utiliser le tableau blanc',
        steps: [
          {
            title: 'Ouvrir le tableau blanc',
            description: 'Cliquez sur l\'icône tableau blanc dans la barre d\'outils'
          },
          {
            title: 'Choisir un outil',
            description: 'Sélectionnez un pinceau, une forme ou un outil de texte'
          },
          {
            title: 'Dessiner ou écrire',
            description: 'Utilisez votre souris pour dessiner sur le tableau'
          },
          {
            title: 'Collaboration en temps réel',
            description: 'Tous les participants peuvent voir et modifier le tableau'
          }
        ]
      }
    ]
  };

  const faqs = [
    {
      question: 'Comment créer une nouvelle salle de visioconférence ?',
      answer: 'Connectez-vous à votre compte, puis cliquez sur le bouton "Créer une salle" sur votre tableau de bord. Vous serez automatiquement dirigé vers votre nouvelle salle que vous pourrez partager avec d\'autres participants.'
    },
    {
      question: 'Comment rejoindre une salle existante ?',
      answer: 'Cliquez simplement sur le lien de la salle que vous avez reçu. Votre navigateur vous demandera l\'autorisation d\'accéder à votre caméra et microphone, acceptez pour rejoindre la réunion.'
    },
    {
      question: 'Comment activer ou désactiver mon micro et ma caméra ?',
      answer: 'Utilisez les boutons de contrôle en bas de votre écran. Cliquez sur l\'icône du microphone pour couper/activer votre audio, et sur l\'icône de la caméra pour masquer/afficher votre vidéo.'
    },
    {
      question: 'Comment partager mon écran avec les autres participants ?',
      answer: 'Cliquez sur le bouton "Partager l\'écran" dans la barre d\'outils. Votre navigateur vous proposera de partager votre écran entier, une fenêtre spécifique ou un onglet. Sélectionnez ce que vous souhaitez partager et cliquez sur "Partager".'
    },
    {
      question: 'Comment utiliser le chat pendant une réunion ?',
      answer: 'Ouvrez le panneau de chat en cliquant sur l\'icône de message dans la barre latérale. Tapez votre message dans la zone de texte et appuyez sur Entrée pour l\'envoyer à tous les participants.'
    },
    {
      question: 'Comment utiliser le tableau blanc collaboratif ?',
      answer: 'Cliquez sur l\'icône "Tableau blanc" dans la barre d\'outils pour ouvrir l\'outil de dessin. Vous pouvez dessiner, écrire du texte et ajouter des formes. Tous les participants peuvent collaborer en temps réel sur le même tableau.'
    },
    {
      question: 'Que faire si j\'ai des problèmes de connexion ?',
      answer: 'Vérifiez votre connexion internet et rafraîchissez la page. Si le problème persiste, essayez de fermer d\'autres onglets ou applications qui utilisent beaucoup de bande passante. Vous pouvez aussi essayer un autre navigateur.'
    },
    {
      question: 'Combien de participants peuvent rejoindre une salle ?',
      answer: 'Le nombre de participants dépend de votre plan d\'abonnement et de la capacité de votre connexion internet. Pour une expérience optimale, nous recommandons de limiter à 10-15 participants simultanés.'
    }
  ];

  const currentArticles = articles[activeCategory] || [];
  const currentTutorials = tutorials[activeCategory] || [];

  const filteredArticles = currentArticles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              placeholder="Rechercher dans le guide..."
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
              <Book size={32} />
              Guide Utilisateur
            </ContentTitle>
            <ContentSubtitle>
              Découvrez comment utiliser toutes les fonctionnalités de Visio Pro avec nos guides détaillés, 
              tutoriels vidéo et exemples pratiques.
            </ContentSubtitle>
          </ContentHeader>

          {filteredArticles.length > 0 && (
            <TutorialSection>
              <SectionTitle>
                <FileText size={24} />
                Articles populaires
              </SectionTitle>
              <ArticleGrid>
                {filteredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    color={article.color}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ArticleIcon color={article.color}>
                      {article.icon}
                    </ArticleIcon>
                    <ArticleTitle>{article.title}</ArticleTitle>
                    <ArticleDescription>{article.description}</ArticleDescription>
                    <ArticleMeta>
                      <ArticleStats>
                        <StatItem>
                          <Eye size={14} />
                          {article.views.toLocaleString()}
                        </StatItem>
                        <StatItem>
                          <ThumbsUp size={14} />
                          {article.likes}
                        </StatItem>
                      </ArticleStats>
                      <span>{article.duration}</span>
                    </ArticleMeta>
                  </ArticleCard>
                ))}
              </ArticleGrid>
            </TutorialSection>
          )}

          {currentTutorials.length > 0 && (
            <TutorialSection>
              <SectionTitle>
                <Play size={24} />
                Tutoriels étape par étape
              </SectionTitle>
              <TutorialList>
                {currentTutorials.map((tutorial) => (
                  <TutorialItem key={tutorial.id}>
                    <TutorialHeader expanded={expandedTutorial === tutorial.id}>
                      <TutorialTitle>
                        <Play size={16} />
                        {tutorial.title}
                      </TutorialTitle>
                      <motion.button
                        onClick={() => setExpandedTutorial(
                          expandedTutorial === tutorial.id ? null : tutorial.id
                        )}
                        style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}
                        animate={{ rotate: expandedTutorial === tutorial.id ? 180 : 0 }}
                      >
                        <ChevronDown size={20} />
                      </motion.button>
                    </TutorialHeader>

                    <AnimatePresence>
                      {expandedTutorial === tutorial.id && (
                        <TutorialContent
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <StepList>
                            {tutorial.steps.map((step, index) => (
                              <StepItem key={index}>
                                <StepNumber>{index + 1}</StepNumber>
                                <StepContent>
                                  <StepTitle>{step.title}</StepTitle>
                                  <StepDescription>{step.description}</StepDescription>
                                </StepContent>
                              </StepItem>
                            ))}
                          </StepList>

                          {tutorial.video && (
                            <VideoTutorial>
                              <VideoThumbnail>
                                <Play size={24} />
                              </VideoThumbnail>
                              <VideoInfo>
                                <VideoTitle>{tutorial.video.title}</VideoTitle>
                                <VideoDuration>{tutorial.video.duration}</VideoDuration>
                              </VideoInfo>
                            </VideoTutorial>
                          )}
                        </TutorialContent>
                      )}
                    </AnimatePresence>
                  </TutorialItem>
                ))}
              </TutorialList>
            </TutorialSection>
          )}

          <FAQSection>
            <SectionTitle>
              <HelpCircle size={24} />
              Questions fréquentes
            </SectionTitle>
            {faqs.map((faq, index) => (
              <FAQItem key={index}>
                <FAQQuestion
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                >
                  {faq.question}
                  <motion.div
                    animate={{ rotate: expandedFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </FAQQuestion>
                <AnimatePresence>
                  {expandedFAQ === index && (
                    <FAQAnswer
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {faq.answer}
                    </FAQAnswer>
                  )}
                </AnimatePresence>
              </FAQItem>
            ))}
          </FAQSection>
        </ContentArea>
      </MainContent>
    </Container>
  );
};

export default UserGuidePage;
