import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import FooterUnified from '../components/FooterUnified';
import { 
  Video, 
  ArrowLeft, 
  Search, 
  Users, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  TrendingUp, 
  Calendar, 
  MapPin, 
  Clock, 
  Award, 
  HelpCircle, 
  Lightbulb, 
  Coffee, 
  Globe, 
  Github, 
  Twitter, 
  Linkedin, 
  Plus, 
  Eye, 
  ThumbsUp, 
  MessageSquare,
  User,
  Bot,
  Sparkles
} from 'lucide-react';

const Container = styled.div`
  min-height: 100vh;
  background: var(--bg-primary, #ffffff);
  color: var(--text-primary, #1e293b);
  overflow-x: hidden;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
  color: #60a5fa;
  cursor: pointer;
`;

const BackButton = styled.button`
  background: transparent;
  border: 2px solid var(--text-primary, #1e293b);
  color: var(--text-primary, #1e293b);
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
    border-color: #60a5fa;
    color: #60a5fa;
  }
`;

const MainContent = styled.div`
  padding: 8rem 2rem 4rem;
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 300px 1fr 300px;
  gap: 3rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 1200px) {
    order: 2;
  }
`;

const SidebarCard = styled.div`
  background: var(--bg-card, rgba(255, 255, 255, 0.95));
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: var(--shadow-lg, 0 8px 25px rgba(0, 0, 0, 0.1));
`;

const SidebarTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text-primary, #1e293b);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ContentHeader = styled.div`
  background: var(--bg-card, rgba(255, 255, 255, 0.95));
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  padding: 3rem;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-lg, 0 8px 25px rgba(0, 0, 0, 0.1));

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #60a5fa, transparent);
  }
`;

const ContentTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary, #1e293b);
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

const TabsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Tab = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.active ? '#60a5fa' : '#888'};
  padding: 1rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 2px solid ${props => props.active ? '#60a5fa' : 'transparent'};

  &:hover {
    color: #60a5fa;
  }
`;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const PostCard = styled(motion.div)`
  background: var(--bg-card, rgba(255, 255, 255, 0.95));
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-lg, 0 8px 25px rgba(0, 0, 0, 0.1));

  &:hover {
    border-color: var(--accent-cyan, #06b6d4);
    transform: translateY(-2px);
    box-shadow: var(--shadow-xl, 0 20px 40px rgba(0, 0, 0, 0.15));
  }
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.color || 'var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4))'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
`;

const PostAuthor = styled.div`
  flex: 1;
`;

const AuthorName = styled.h4`
  font-weight: 600;
  color: var(--text-primary, #1e293b);
  margin-bottom: 0.25rem;
`;

const PostTime = styled.span`
  font-size: 0.85rem;
  color: var(--text-secondary, #64748b);
`;

const PostBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${props => props.color || 'var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4))'};
  color: white;
`;

const PostContent = styled.div`
  margin-bottom: 1.5rem;
`;

const PostTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-primary, #1e293b);
  margin-bottom: 0.75rem;
  line-height: 1.4;
`;

const PostText = styled.p`
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const PostTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const Tag = styled.span`
  padding: 0.25rem 0.75rem;
  background: rgba(0, 255, 136, 0.1);
  color: #60a5fa;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const PostActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: #888;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    color: #60a5fa;
    background: rgba(0, 255, 136, 0.1);
  }

  &.active {
    color: #60a5fa;
  }
`;

const RightSidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 1200px) {
    order: 3;
  }
`;

const StatsCard = styled.div`
  background: var(--bg-card, rgba(255, 255, 255, 0.95));
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: var(--shadow-lg, 0 8px 25px rgba(0, 0, 0, 0.1));
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;

const StatLabel = styled.span`
  color: #888;
  font-size: 0.9rem;
`;

const StatValue = styled.span`
  color: #60a5fa;
  font-weight: 700;
`;

const EventCard = styled.div`
  background: var(--bg-card, rgba(255, 255, 255, 0.95));
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-lg, 0 8px 25px rgba(0, 0, 0, 0.1));

  &:hover {
    border-color: var(--accent-cyan, #06b6d4);
    transform: translateY(-2px);
    box-shadow: var(--shadow-xl, 0 20px 40px rgba(0, 0, 0, 0.15));
  }
`;

const EventTitle = styled.h4`
  font-weight: 600;
  color: var(--text-primary, #1e293b);
  margin-bottom: 0.5rem;
`;

const EventDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.85rem;
  color: #888;
`;

const EventDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TopContributors = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContributorItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: var(--bg-card, rgba(255, 255, 255, 0.95));
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);

  &:hover {
    background: rgba(37, 99, 235, 0.05);
    border-color: var(--accent-cyan, #06b6d4);
    transform: translateY(-1px);
  }
`;

const ContributorInfo = styled.div`
  flex: 1;
`;

const ContributorName = styled.div`
  font-weight: 600;
  color: var(--text-primary, #1e293b);
  font-size: 0.9rem;
`;

const ContributorStats = styled.div`
  font-size: 0.8rem;
  color: var(--text-secondary, #475569);
`;

const ContributorBadge = styled.div`
  padding: 0.25rem 0.5rem;
  background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
  color: white;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 700;
`;

const CreatePostButton = styled(motion.button)`
  background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 16px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4);
  }
`;

const FilterBar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: var(--bg-card, rgba(255, 255, 255, 0.95));
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  box-shadow: var(--shadow-lg, 0 8px 25px rgba(0, 0, 0, 0.1));
`;

const SearchInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: var(--text-primary, #1e293b);
  font-size: 0.9rem;
  outline: none;

  &::placeholder {
    color: var(--text-secondary, #475569);
  }
`;

const FilterButton = styled.button`
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.2);
  color: #888;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover, &.active {
    border-color: #60a5fa;
    color: #60a5fa;
  }
`;

const AIAssistant = styled.div`
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(0, 255, 136, 0.05));
  border: 1px solid rgba(0, 255, 136, 0.2);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const AITitle = styled.h4`
  color: #60a5fa;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AIMessage = styled.p`
  color: #ccc;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const AIButton = styled.button`
  background: transparent;
  border: 1px solid var(--accent-cyan, #06b6d4);
  color: var(--accent-cyan, #06b6d4);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--accent-cyan, #06b6d4);
    color: white;
  }
`;

const CommunityPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('discussions');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const tabs = [
    { id: 'discussions', label: 'Discussions', icon: MessageCircle },
    { id: 'questions', label: 'Questions', icon: HelpCircle },
    { id: 'tutorials', label: 'Tutoriels', icon: Lightbulb },
    { id: 'events', label: 'Événements', icon: Calendar }
  ];

  const posts = [
    {
      id: 1,
      type: 'discussion',
      author: 'Marie Dubois',
      avatar: '#4caf50',
      badge: 'Expert',
      badgeColor: '#4caf50',
      time: 'Il y a 2 heures',
      title: 'Optimisation des performances pour les grandes réunions',
      content: 'Salut la communauté ! Je travaille sur une application qui doit gérer des réunions avec plus de 500 participants. Quelqu\'un a-t-il des conseils pour optimiser les performances ?',
      tags: ['performance', 'webrtc', 'scaling'],
      likes: 24,
      comments: 8,
      views: 156,
      liked: false,
      bookmarked: false
    },
    {
      id: 2,
      type: 'question',
      author: 'Thomas Martin',
      avatar: '#2196f3',
      badge: 'Débutant',
      badgeColor: '#2196f3',
      time: 'Il y a 4 heures',
      title: 'Comment intégrer l\'API de chat dans React ?',
      content: 'Bonjour, je débute avec l\'API Visio Pro et j\'aimerais intégrer le système de chat dans mon application React. Quelqu\'un pourrait-il me donner un exemple de code ?',
      tags: ['react', 'api', 'chat', 'débutant'],
      likes: 12,
      comments: 15,
      views: 89,
      liked: true,
      bookmarked: false
    },
    {
      id: 3,
      type: 'tutorial',
      author: 'Sophie Laurent',
      avatar: '#ff9800',
      badge: 'Contributeur',
      badgeColor: '#ff9800',
      time: 'Il y a 1 jour',
      title: 'Guide complet : Créer un bot de modération pour vos réunions',
      content: 'Dans ce tutoriel, nous allons voir comment créer un bot intelligent qui peut modérer automatiquement vos réunions, détecter les comportements inappropriés et gérer les permissions.',
      tags: ['bot', 'modération', 'ai', 'tutorial'],
      likes: 67,
      comments: 23,
      views: 342,
      liked: false,
      bookmarked: true
    },
    {
      id: 4,
      type: 'event',
      author: 'Équipe Visio Pro',
      avatar: '#60a5fa',
      badge: 'Officiel',
      badgeColor: '#60a5fa',
      time: 'Il y a 2 jours',
      title: 'Webinaire : Nouvelles fonctionnalités IA - 15 Décembre',
      content: 'Rejoignez-nous pour découvrir les dernières fonctionnalités d\'intelligence artificielle intégrées à Visio Pro. Session Q&A avec l\'équipe de développement.',
      tags: ['webinaire', 'ia', 'nouvelles-fonctionnalités'],
      likes: 89,
      comments: 34,
      views: 567,
      liked: false,
      bookmarked: false
    }
  ];

  const events = [
    {
      title: 'Webinaire IA',
      date: '15 Déc',
      time: '14:00',
      location: 'En ligne',
      attendees: 234
    },
    {
      title: 'Hackathon Visio',
      date: '20 Déc',
      time: '09:00',
      location: 'Paris',
      attendees: 89
    },
    {
      title: 'Meetup Développeurs',
      date: '5 Jan',
      time: '18:30',
      location: 'Lyon',
      attendees: 45
    }
  ];

  const contributors = [
    {
      name: 'Alex Chen',
      avatar: '#4caf50',
      posts: 156,
      likes: 2340,
      badge: 'MVP'
    },
    {
      name: 'Sarah Kim',
      avatar: '#2196f3',
      posts: 89,
      likes: 1567,
      badge: 'Expert'
    },
    {
      name: 'David Wilson',
      avatar: '#ff9800',
      posts: 67,
      likes: 1234,
      badge: 'Helper'
    }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || post.type === activeFilter;
    const matchesTab = activeTab === 'discussions' || post.type === activeTab.slice(0, -1);
    
    return matchesSearch && matchesFilter && matchesTab;
  });

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
          <SidebarCard>
            <SidebarTitle>
              <TrendingUp size={20} />
              Statistiques
            </SidebarTitle>
            <StatsCard>
              <StatItem>
                <StatLabel>Membres actifs</StatLabel>
                <StatValue>12,456</StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>Posts cette semaine</StatLabel>
                <StatValue>234</StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>Questions résolues</StatLabel>
                <StatValue>89%</StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>Temps de réponse moyen</StatLabel>
                <StatValue>2h 15m</StatValue>
              </StatItem>
            </StatsCard>
          </SidebarCard>

          <SidebarCard>
            <SidebarTitle>
              <Calendar size={20} />
              Événements à venir
            </SidebarTitle>
            {events.map((event, index) => (
              <EventCard key={index}>
                <EventTitle>{event.title}</EventTitle>
                <EventDetails>
                  <EventDetail>
                    <Calendar size={14} />
                    {event.date}
                  </EventDetail>
                  <EventDetail>
                    <Clock size={14} />
                    {event.time}
                  </EventDetail>
                  <EventDetail>
                    <MapPin size={14} />
                    {event.location}
                  </EventDetail>
                  <EventDetail>
                    <Users size={14} />
                    {event.attendees} participants
                  </EventDetail>
                </EventDetails>
              </EventCard>
            ))}
          </SidebarCard>
        </Sidebar>

        <ContentArea>
          <ContentHeader>
            <ContentTitle>
              <Users size={32} />
              Communauté Visio Pro
            </ContentTitle>
            <ContentSubtitle>
              Rejoignez notre communauté de développeurs, partagez vos expériences, 
              posez vos questions et découvrez les meilleures pratiques.
            </ContentSubtitle>

            <TabsContainer>
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <Tab
                    key={tab.id}
                    active={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <IconComponent size={16} style={{ marginRight: '0.5rem' }} />
                    {tab.label}
                  </Tab>
                );
              })}
            </TabsContainer>
          </ContentHeader>

          <AIAssistant>
            <AITitle>
              <Bot size={20} />
              Assistant IA Communauté
            </AITitle>
            <AIMessage>
              Besoin d'aide ? Notre assistant IA peut vous aider à trouver des réponses dans la communauté, 
              suggérer des ressources pertinentes ou vous orienter vers les bons experts.
            </AIMessage>
            <AIButton>
              <Sparkles size={14} style={{ marginRight: '0.5rem' }} />
              Poser une question à l'IA
            </AIButton>
          </AIAssistant>

          <CreatePostButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus size={20} />
            Créer un nouveau post
          </CreatePostButton>

          <FilterBar>
            <Search size={16} style={{ color: 'var(--text-secondary, #64748b)' }} />
            <SearchInput
              type="text"
              placeholder="Rechercher dans la communauté..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FilterButton
              className={activeFilter === 'all' ? 'active' : ''}
              onClick={() => setActiveFilter('all')}
            >
              Tous
            </FilterButton>
            <FilterButton
              className={activeFilter === 'question' ? 'active' : ''}
              onClick={() => setActiveFilter('question')}
            >
              Questions
            </FilterButton>
            <FilterButton
              className={activeFilter === 'tutorial' ? 'active' : ''}
              onClick={() => setActiveFilter('tutorial')}
            >
              Tutoriels
            </FilterButton>
          </FilterBar>

          <PostsContainer>
            {filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <PostHeader>
                  <Avatar color={post.avatar}>
                    <User size={20} />
                  </Avatar>
                  <PostAuthor>
                    <AuthorName>{post.author}</AuthorName>
                    <PostTime>{post.time}</PostTime>
                  </PostAuthor>
                  <PostBadge color={post.badgeColor}>
                    {post.badge}
                  </PostBadge>
                </PostHeader>

                <PostContent>
                  <PostTitle>{post.title}</PostTitle>
                  <PostText>{post.content}</PostText>
                  <PostTags>
                    {post.tags.map((tag, index) => (
                      <Tag key={index}>#{tag}</Tag>
                    ))}
                  </PostTags>
                </PostContent>

                <PostActions>
                  <ActionButton className={post.liked ? 'active' : ''}>
                    <ThumbsUp size={16} />
                    {post.likes}
                  </ActionButton>
                  <ActionButton>
                    <MessageSquare size={16} />
                    {post.comments}
                  </ActionButton>
                  <ActionButton>
                    <Eye size={16} />
                    {post.views}
                  </ActionButton>
                  <ActionButton className={post.bookmarked ? 'active' : ''}>
                    <Bookmark size={16} />
                  </ActionButton>
                  <ActionButton>
                    <Share2 size={16} />
                  </ActionButton>
                </PostActions>
              </PostCard>
            ))}
          </PostsContainer>
        </ContentArea>

        <RightSidebar>
          <SidebarCard>
            <SidebarTitle>
              <Award size={20} />
              Top Contributeurs
            </SidebarTitle>
            <TopContributors>
              {contributors.map((contributor, index) => (
                <ContributorItem key={index}>
                  <Avatar color={contributor.avatar}>
                    <User size={16} />
                  </Avatar>
                  <ContributorInfo>
                    <ContributorName>{contributor.name}</ContributorName>
                    <ContributorStats>
                      {contributor.posts} posts • {contributor.likes} likes
                    </ContributorStats>
                  </ContributorInfo>
                  <ContributorBadge>{contributor.badge}</ContributorBadge>
                </ContributorItem>
              ))}
            </TopContributors>
          </SidebarCard>

          <SidebarCard>
            <SidebarTitle>
              <Globe size={20} />
              Liens utiles
            </SidebarTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <ActionButton style={{ justifyContent: 'flex-start' }}>
                <Github size={16} />
                GitHub Repository
              </ActionButton>
              <ActionButton style={{ justifyContent: 'flex-start' }}>
                <Twitter size={16} />
                Twitter @VisioProDev
              </ActionButton>
              <ActionButton style={{ justifyContent: 'flex-start' }}>
                <Linkedin size={16} />
                LinkedIn Community
              </ActionButton>
              <ActionButton style={{ justifyContent: 'flex-start' }}>
                <Coffee size={16} />
                Discord Server
              </ActionButton>
            </div>
          </SidebarCard>
        </RightSidebar>
      </MainContent>

      <FooterUnified />
    </Container>
  );
};

export default CommunityPage;
