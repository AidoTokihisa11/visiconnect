import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  MessageCircle, X, Send, Bot, User, 
  Video, Mic, Monitor, Users, Settings, HelpCircle,
  RotateCcw, Sparkles, Zap, Search, Copy,
  ThumbsUp, Bookmark, Play, Shield,
  Maximize2, Minimize2, ExternalLink
} from 'lucide-react';

const ChatbotContainer = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 150;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media (max-width: 768px) {
    bottom: 6rem;
    right: 1rem;
    z-index: 100;
  }
`;

const ChatbotButton = styled(motion.button)`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00ff88, #00e67a);
  color: #0a0a0a;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 40px rgba(0, 255, 136, 0.4);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
    transform: rotate(45deg);
    animation: shimmer 3s infinite;
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
    100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
  }
`;

const NotificationBadge = styled(motion.div)`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 24px;
  height: 24px;
  background: #ff4444;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 700;
  color: #3b82f6;
  border: 2px solid #0a0a0a;
`;

const ChatWindow = styled(motion.div)`
  width: ${props => props.isExpanded ? 'min(90vw, 800px)' : 'min(90vw, 420px)'};
  height: ${props => props.isExpanded ? 'min(90vh, 700px)' : 'min(80vh, 600px)'};
  background: linear-gradient(145deg, #111, #0a0a0a);
  border: 1px solid #333;
  border-radius: 24px;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
  resize: both;
  min-width: 320px;
  min-height: 400px;
  max-width: 95vw;
  max-height: 95vh;

  @media (max-width: 768px) {
    width: 95vw;
    height: 85vh;
    margin: 0.5rem;
  }
`;

const ChatHeader = styled.div`
  padding: 1.5rem;
  background: linear-gradient(135deg, #1a1a1a, #111);
  border-bottom: 1px solid #222;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BotInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  .avatar {
    width: 42px;
    height: 42px;
    background: linear-gradient(135deg, #00ff88, #00e67a);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0a0a0a;
    box-shadow: 0 4px 15px rgba(0, 255, 136, 0.3);
  }

  .info {
    .name {
      color: #3b82f6;
      font-weight: 700;
      font-size: 1rem;
      margin-bottom: 0.25rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .status {
      color: #00ff88;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 500;
    }
  }
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const HeaderButton = styled(motion.button)`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: none;
  background: #222;
  color: #888;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: #333;
    color: #00ff88;
    transform: translateY(-1px);
  }
`;

const ExpandButton = styled(motion.button)`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: #222;
  color: #888;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: #333;
    color: #00ff88;
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #1a1a1a;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #444, #333);
    border-radius: 3px;
  }
`;

const Message = styled(motion.div)`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  
  &.user {
    flex-direction: row-reverse;
    
    .message-bubble {
      background: linear-gradient(135deg, #00ff88, #00e67a);
      color: #0a0a0a;
      border-radius: 20px 20px 6px 20px;
      box-shadow: 0 4px 15px rgba(0, 255, 136, 0.3);
    }
  }
  
  &.bot {
    .message-bubble {
      background: linear-gradient(135deg, #222, #1a1a1a);
      color: #3b82f6;
      border-radius: 20px 20px 20px 6px;
      border: 1px solid #333;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }
  }
`;

const MessageAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.isBot ? 
    'linear-gradient(135deg, #00ff88, #00e67a)' : 
    'linear-gradient(135deg, #333, #222)'};
  color: ${props => props.isBot ? '#0a0a0a' : 'white'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
`;

const MessageBubble = styled.div`
  padding: 1.25rem 1.5rem;
  font-size: 0.95rem;
  line-height: 1.6;
  word-wrap: break-word;
  max-width: 320px;
`;

const WelcomeCard = styled(motion.div)`
  background: linear-gradient(135deg, #1a1a1a, #111);
  border: 1px solid #333;
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  margin-bottom: 1rem;

  .title {
    color: #00ff88;
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .subtitle {
    color: #ccc;
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: ${props => props.isExpanded ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)'};
  gap: 1rem;
  margin-top: 1.5rem;
  max-height: ${props => props.isExpanded ? 'none' : '300px'};
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #1a1a1a;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-height: 250px;
  }
`;

const QuickActionCard = styled(motion.button)`
  padding: 1.5rem;
  background: linear-gradient(135deg, #1a1a1a, #111);
  border: 1px solid #333;
  border-radius: 16px;
  color: #3b82f6;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    background: linear-gradient(135deg, #222, #1a1a1a);
    border-color: #00ff88;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 255, 136, 0.2);
  }

  .icon {
    width: 48px;
    height: 48px;
    background: rgba(0, 255, 136, 0.1);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #00ff88;
  }

  .title {
    font-weight: 600;
    font-size: 0.9rem;
    color: #3b82f6;
  }

  .desc {
    font-size: 0.8rem;
    color: #888;
    line-height: 1.4;
  }
`;

const ResponseCard = styled(motion.div)`
  background: linear-gradient(135deg, #1a1a1a, #111);
  border: 1px solid #333;
  border-radius: 16px;
  padding: 1.5rem;
  margin-top: 1rem;

  .header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #333;

    .icon {
      width: 36px;
      height: 36px;
      background: rgba(0, 255, 136, 0.1);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #00ff88;
    }

    .title {
      color: #00ff88;
      font-weight: 700;
      font-size: 1rem;
    }
  }

  .content {
    color: #ccc;
    line-height: 1.6;
    font-size: 0.9rem;

    .section {
      margin-bottom: 1.5rem;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .section-title {
      color: #3b82f6;
      font-weight: 600;
      margin-bottom: 0.75rem;
      font-size: 0.95rem;
    }

    .feature-list {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        padding: 0.5rem 0;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);

        &:last-child {
          border-bottom: none;
        }

        &::before {
          content: '✓';
          color: #00ff88;
          font-weight: bold;
          width: 16px;
          height: 16px;
          background: rgba(0, 255, 136, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          flex-shrink: 0;
        }
      }
    }
  }
`;

const StepByStepGuide = styled.div`
  margin-top: 1rem;

  .step {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
    margin-bottom: 0.75rem;
    background: rgba(0, 255, 136, 0.05);
    border: 1px solid rgba(0, 255, 136, 0.1);
    border-radius: 12px;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(0, 255, 136, 0.08);
      border-color: rgba(0, 255, 136, 0.2);
    }

    .step-number {
      width: 28px;
      height: 28px;
      background: linear-gradient(135deg, #00ff88, #00e67a);
      color: #0a0a0a;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.85rem;
      flex-shrink: 0;
    }

    .step-content {
      flex: 1;

      .step-title {
        color: #3b82f6;
        font-weight: 600;
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
      }

      .step-description {
        color: #ccc;
        font-size: 0.85rem;
        line-height: 1.5;
      }

      .step-tip {
        margin-top: 0.5rem;
        padding: 0.5rem;
        background: rgba(255, 165, 0, 0.1);
        border-left: 3px solid #ffa500;
        border-radius: 4px;
        font-size: 0.8rem;
        color: #ffb84d;
      }
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
`;

const ActionButton = styled(motion.button)`
  padding: 0.75rem 1.25rem;
  background: linear-gradient(135deg, #00ff88, #00e67a);
  border: none;
  border-radius: 12px;
  color: #0a0a0a;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #00e67a, #00d96b);
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(0, 255, 136, 0.3);
  }

  &.secondary {
    background: transparent;
    color: #00ff88;
    border: 1px solid #00ff88;

    &:hover {
      background: rgba(0, 255, 136, 0.1);
    }
  }
`;

const MessageActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${Message}:hover & {
    opacity: 1;
  }
`;

const MessageActionButton = styled(motion.button)`
  padding: 0.5rem 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #888;
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 255, 136, 0.1);
    border-color: #00ff88;
    color: #00ff88;
  }
`;

const InputContainer = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #222;
  background: linear-gradient(135deg, #0a0a0a, #111);
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #222;
  border-radius: 20px;
  padding: 1rem 1.25rem;
  border: 2px solid transparent;
  transition: all 0.3s ease;

  &:focus-within {
    border-color: #00ff88;
    box-shadow: 0 0 0 4px rgba(0, 255, 136, 0.1);
    background: #1a1a1a;
  }
`;

const Input = styled.input`
  flex: 1;
  background: none;
  border: none;
  color: #3b82f6;
  font-size: 0.95rem;
  font-weight: 500;

  &::placeholder {
    color: #666;
    font-weight: 400;
  }

  &:focus {
    outline: none;
  }
`;

const SendButton = styled(motion.button)`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #00ff88, #00e67a);
  color: #0a0a0a;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 255, 136, 0.3);

  &:hover {
    background: linear-gradient(135deg, #00e67a, #00d96b);
    transform: scale(1.05);
  }

  &:disabled {
    background: #333;
    color: #666;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const TypingIndicator = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  .dots {
    display: flex;
    gap: 0.5rem;
    
    span {
      width: 8px;
      height: 8px;
      background: linear-gradient(135deg, #00ff88, #00e67a);
      border-radius: 50%;
      animation: typing 1.4s infinite ease-in-out;
      
      &:nth-child(1) { animation-delay: 0s; }
      &:nth-child(2) { animation-delay: 0.2s; }
      &:nth-child(3) { animation-delay: 0.4s; }
    }
  }
  
  @keyframes typing {
    0%, 60%, 100% { 
      transform: translateY(0) scale(1); 
      opacity: 0.4; 
    }
    30% { 
      transform: translateY(-8px) scale(1.2); 
      opacity: 1; 
    }
  }
`;

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const quickActions = useMemo(() => [
    { 
      icon: <Video size={20} />, 
      title: 'Problème Vidéo', 
      desc: 'Caméra, qualité, affichage',
      action: 'video_help' 
    },
    { 
      icon: <Mic size={20} />, 
      title: 'Problème Audio', 
      desc: 'Micro, son, écho',
      action: 'audio_help' 
    },
    { 
      icon: <Monitor size={20} />, 
      title: 'Partage d\'Écran', 
      desc: 'Configuration et aide',
      action: 'screen_help' 
    },
    { 
      icon: <Users size={20} />, 
      title: 'Gestion Participants', 
      desc: 'Invitations, contrôles',
      action: 'participants_help' 
    },
    { 
      icon: <Settings size={20} />, 
      title: 'Paramètres', 
      desc: 'Configuration optimale',
      action: 'settings_help' 
    },
    { 
      icon: <HelpCircle size={20} />, 
      title: 'Guide Complet', 
      desc: 'Documentation complète',
      action: 'guide_help' 
    }
  ], []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      setHasNewMessage(true);
    }
  }, [messages.length, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false);
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleNavigation = useCallback((path) => {
    setIsOpen(false);
    navigate(path);
  }, [navigate]);

  const generateBotResponse = useCallback((userMessage) => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('video_help') || msg.includes('vidéo') || msg.includes('caméra')) {
      return {
        type: 'response_card',
        icon: <Video size={20} />,
        title: 'Résolution des Problèmes Vidéo',
        content: {
          sections: [
            {
              title: 'Diagnostic automatique',
              items: [
                'Caméra détectée et fonctionnelle',
                'Résolution optimale : 1080p HD disponible',
                'Connexion stable pour la vidéo'
              ]
            }
          ]
        },
        steps: [
          {
            title: 'Vérifiez les permissions',
            description: 'Autorisez l\'accès à votre caméra dans votre navigateur',
            tip: 'Cliquez sur l\'icône de caméra dans la barre d\'adresse'
          },
          {
            title: 'Testez votre caméra',
            description: 'Allez dans les paramètres pour tester votre caméra',
            tip: 'Vous pouvez prévisualiser votre vidéo avant de rejoindre une réunion'
          },
          {
            title: 'Optimisez la qualité',
            description: 'Ajustez la résolution selon votre connexion internet',
            tip: 'Une connexion lente ? Réduisez la qualité à 720p'
          },
          {
            title: 'Redémarrez si nécessaire',
            description: 'Si l\'image est figée, redémarrez votre navigateur',
            tip: 'Fermez les autres onglets pour libérer des ressources'
          }
        ],
        actions: [
          { text: 'Aller aux Paramètres', icon: <Settings size={16} />, action: () => handleNavigation('/account') },
          { text: 'Tester ma caméra', icon: <Play size={16} /> },
          { text: 'Guide Complet', icon: <ExternalLink size={16} />, action: () => handleNavigation('/support'), secondary: true }
        ]
      };
    }
    
    if (msg.includes('audio_help') || msg.includes('audio') || msg.includes('micro')) {
      return {
        type: 'response_card',
        icon: <Mic size={20} />,
        title: 'Résolution des Problèmes Audio',
        content: {
          sections: [
            {
              title: 'Diagnostic automatique',
              items: [
                'Microphone détecté et opérationnel',
                'Qualité d\'enregistrement : Excellente',
                'Suppression d\'écho activée'
              ]
            }
          ]
        },
        steps: [
          {
            title: 'Vérifiez votre microphone',
            description: 'Assurez-vous que votre micro est connecté et autorisé',
            tip: 'Parlez près du micro pour tester le niveau sonore'
          },
          {
            title: 'Ajustez le volume',
            description: 'Réglez le niveau d\'entrée dans les paramètres système',
            tip: 'Évitez un volume trop élevé qui cause de la distorsion'
          },
          {
            title: 'Utilisez un casque',
            description: 'Pour éviter l\'écho, utilisez un casque ou des écouteurs',
            tip: 'Les casques avec micro intégré offrent la meilleure qualité'
          },
          {
            title: 'Activez la suppression de bruit',
            description: 'Activez cette option dans les paramètres Visio Pro',
            tip: 'Idéal pour les environnements bruyants'
          }
        ],
        actions: [
          { text: 'Paramètres Audio', icon: <Settings size={16} />, action: () => handleNavigation('/account') },
          { text: 'Tester mon micro', icon: <Mic size={16} /> },
          { text: 'Support Audio', icon: <ExternalLink size={16} />, action: () => handleNavigation('/support'), secondary: true }
        ]
      };
    }
    
    if (msg.includes('screen_help') || msg.includes('partage') || msg.includes('écran')) {
      return {
        type: 'response_card',
        icon: <Monitor size={20} />,
        title: 'Guide Partage d\'Écran',
        content: {
          sections: [
            {
              title: 'Options de partage disponibles',
              items: [
                'Écran entier pour les présentations',
                'Fenêtre d\'application spécifique',
                'Onglet de navigateur avec audio'
              ]
            }
          ]
        },
        steps: [
          {
            title: 'Cliquez sur "Partager l\'écran"',
            description: 'Dans la salle de réunion, cliquez sur l\'icône de partage',
            tip: 'L\'icône ressemble à un écran avec une flèche'
          },
          {
            title: 'Sélectionnez ce que vous voulez partager',
            description: 'Choisissez entre écran entier, fenêtre ou onglet',
            tip: 'Pour les présentations, choisissez "Écran entier"'
          },
          {
            title: 'Confirmez le partage',
            description: 'Cliquez sur "Partager" dans la popup du navigateur',
            tip: 'Votre navigateur peut demander une autorisation'
          },
          {
            title: 'Contrôlez votre partage',
            description: 'Utilisez les contrôles pour arrêter ou changer le partage',
            tip: 'Vous pouvez changer ce que vous partagez à tout moment'
          }
        ],
        actions: [
          { text: 'Créer une Réunion', icon: <Play size={16} />, action: () => handleNavigation('/') },
          { text: 'Voir les Fonctionnalités', icon: <ExternalLink size={16} />, action: () => handleNavigation('/features'), secondary: true }
        ]
      };
    }
    
    if (msg.includes('participants_help') || msg.includes('participant') || msg.includes('inviter')) {
      return {
        type: 'response_card',
        icon: <Users size={20} />,
        title: 'Gestion des Participants',
        content: {
          sections: [
            {
              title: 'Inviter facilement',
              items: [
                'Partagez le lien de votre salle de réunion',
                'Envoyez l\'ID de salle par email ou message',
                'Utilisez la fonction "Inviter" dans l\'interface'
              ]
            }
          ]
        },
        steps: [
          {
            title: 'Créez votre salle',
            description: 'Démarrez une nouvelle réunion depuis la page d\'accueil',
            tip: 'Vous obtiendrez automatiquement un lien unique'
          },
          {
            title: 'Copiez le lien d\'invitation',
            description: 'Cliquez sur "Inviter" pour copier le lien de la salle',
            tip: 'Le lien contient toutes les informations nécessaires'
          },
          {
            title: 'Partagez avec vos participants',
            description: 'Envoyez le lien par email, SMS ou messagerie',
            tip: 'Les participants peuvent rejoindre directement en cliquant'
          },
          {
            title: 'Gérez les permissions',
            description: 'Contrôlez qui peut parler, partager son écran, etc.',
            tip: 'Vous pouvez modifier les permissions en temps réel'
          }
        ],
        actions: [
          { text: 'Créer une Réunion', icon: <Play size={16} />, action: () => handleNavigation('/') },
          { text: 'Voir les Contrôles', icon: <Shield size={16} />, action: () => handleNavigation('/features'), secondary: true }
        ]
      };
    }
    
    if (msg.includes('settings_help') || msg.includes('paramètre') || msg.includes('configuration')) {
      return {
        type: 'response_card',
        icon: <Settings size={20} />,
        title: 'Configuration et Paramètres',
        content: {
          sections: [
            {
              title: 'Paramètres disponibles',
              items: [
                'Sélection des périphériques audio/vidéo',
                'Qualité de la vidéo et du son',
                'Préférences d\'interface et notifications'
              ]
            }
          ]
        },
        steps: [
          {
            title: 'Accédez aux paramètres',
            description: 'Cliquez sur votre profil puis "Paramètres du compte"',
            tip: 'Vous pouvez aussi y accéder depuis une réunion'
          },
          {
            title: 'Configurez vos périphériques',
            description: 'Sélectionnez votre caméra et microphone préférés',
            tip: 'Testez vos périphériques avant une réunion importante'
          },
          {
            title: 'Ajustez la qualité',
            description: 'Choisissez la résolution selon votre connexion',
            tip: 'Une qualité plus basse améliore la stabilité'
          },
          {
            title: 'Personnalisez l\'interface',
            description: 'Configurez les notifications et l\'apparence',
            tip: 'Activez les notifications pour ne rien manquer'
          }
        ],
        actions: [
          { text: 'Ouvrir les Paramètres', icon: <Settings size={16} />, action: () => handleNavigation('/account') },
          { text: 'Guide Complet', icon: <ExternalLink size={16} />, action: () => handleNavigation('/support'), secondary: true }
        ]
      };
    }
    
    if (msg.includes('guide_help') || msg.includes('aide') || msg.includes('help')) {
      return {
        type: 'response_card',
        icon: <HelpCircle size={20} />,
        title: 'Guide Complet Visio Pro',
        content: {
          sections: [
            {
              title: 'Ressources disponibles',
              items: [
                'Documentation complète et tutoriels',
                'Support technique et FAQ',
                'Guides de démarrage rapide'
              ]
            }
          ]
        },
        steps: [
          {
            title: 'Consultez la documentation',
            description: 'Accédez à notre centre d\'aide complet',
            tip: 'Recherchez par mots-clés pour trouver rapidement'
          },
          {
            title: 'Suivez les tutoriels',
            description: 'Regardez nos guides vidéo étape par étape',
            tip: 'Parfait pour apprendre les fonctionnalités avancées'
          },
          {
            title: 'Contactez le support',
            description: 'Notre équipe est disponible pour vous aider',
            tip: 'Décrivez précisément votre problème pour une aide rapide'
          },
          {
            title: 'Explorez les fonctionnalités',
            description: 'Découvrez toutes les capacités de Visio Pro',
            tip: 'Testez les fonctionnalités dans un environnement sûr'
          }
        ],
        actions: [
          { text: 'Centre d\'Aide', icon: <HelpCircle size={16} />, action: () => handleNavigation('/support') },
          { text: 'Contacter le Support', icon: <ExternalLink size={16} />, action: () => handleNavigation('/contact'), secondary: true }
        ]
      };
    }
    
    // Réponse par défaut
    return {
      type: 'simple',
      text: `Je suis là pour vous aider avec Visio Pro ! 

Vous pouvez me poser des questions sur :
• Les problèmes de vidéo ou audio
• Le partage d'écran
• La gestion des participants
• Les paramètres et configuration
• L'utilisation générale de la plateforme

Que puis-je faire pour améliorer votre expérience ?`
    };
  }, [handleNavigation]);

  const handleSendMessage = useCallback(() => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateBotResponse(currentMessage);
      const botMessage = {
        id: Date.now() + 1,
        ...response,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  }, [inputMessage, generateBotResponse]);

  const handleQuickAction = useCallback((action) => {
    const response = generateBotResponse(action);
    const botMessage = {
      id: Date.now(),
      ...response,
      isBot: true,
      timestamp: new Date()
    };
    
    setMessages([botMessage]);
    setIsTyping(false);
  }, [generateBotResponse]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const copyMessage = useCallback((text) => {
    navigator.clipboard.writeText(text);
  }, []);

  const renderMessage = useCallback((message) => {
    if (message.type === 'response_card') {
      return (
        <Message
          key={message.id}
          className="bot"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <MessageAvatar isBot={true}>
            <Bot size={16} />
          </MessageAvatar>
          
          <div style={{ flex: 1 }}>
            <ResponseCard
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="header">
                <div className="icon">
                  {message.icon}
                </div>
                <div className="title">{message.title}</div>
              </div>
              
              <div className="content">
                {message.content.sections.map((section, index) => (
                  <div key={index} className="section">
                    <div className="section-title">{section.title}</div>
                    <ul className="feature-list">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              {message.steps && (
                <StepByStepGuide>
                  {message.steps.map((step, index) => (
                    <div key={index} className="step">
                      <div className="step-number">{index + 1}</div>
                      <div className="step-content">
                        <div className="step-title">{step.title}</div>
                        <div className="step-description">{step.description}</div>
                        {step.tip && (
                          <div className="step-tip">
                            💡 {step.tip}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </StepByStepGuide>
              )}
              
              {message.actions && (
                <ActionButtons>
                  {message.actions.map((action, index) => (
                    <ActionButton
                      key={index}
                      className={action.secondary ? 'secondary' : ''}
                      onClick={action.action}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {action.icon}
                      {action.text}
                    </ActionButton>
                  ))}
                </ActionButtons>
              )}
            </ResponseCard>
            
            <MessageActions>
              <MessageActionButton
                onClick={() => copyMessage(message.title)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Copy size={12} />
                Copier
              </MessageActionButton>
              <MessageActionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ThumbsUp size={12} />
                Utile
              </MessageActionButton>
              <MessageActionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bookmark size={12} />
                Sauver
              </MessageActionButton>
            </MessageActions>
          </div>
        </Message>
      );
    }

    // Message simple
    return (
      <Message
        key={message.id}
        className={message.isBot ? 'bot' : 'user'}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <MessageAvatar isBot={message.isBot}>
          {message.isBot ? <Bot size={16} /> : <User size={16} />}
        </MessageAvatar>
        
        <div style={{ flex: 1 }}>
          <MessageBubble className="message-bubble">
            {message.text}
          </MessageBubble>
          
          {message.isBot && (
            <MessageActions>
              <MessageActionButton
                onClick={() => copyMessage(message.text)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Copy size={12} />
                Copier
              </MessageActionButton>
              <MessageActionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ThumbsUp size={12} />
                Utile
              </MessageActionButton>
            </MessageActions>
          )}
        </div>
      </Message>
    );
  }, [copyMessage]);

  return (
    <ChatbotContainer>
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            isExpanded={isExpanded}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
          >
            <ChatHeader>
              <BotInfo>
                <div className="avatar">
                  <Bot size={22} />
                </div>
                <div className="info">
                  <div className="name">
                    Assistant Visio Pro
                    <Sparkles size={14} style={{ color: '#00ff88' }} />
                  </div>
                  <div className="status">
                    <Zap size={12} />
                    En ligne
                  </div>
                </div>
              </BotInfo>
              
              <HeaderActions>
                <ExpandButton
                  onClick={() => setIsExpanded(!isExpanded)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title={isExpanded ? "Réduire" : "Agrandir"}
                >
                  {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </ExpandButton>
                
                <HeaderButton
                  onClick={() => setMessages([])}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Nouvelle conversation"
                >
                  <RotateCcw size={16} />
                </HeaderButton>
                
                <HeaderButton
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Rechercher"
                >
                  <Search size={16} />
                </HeaderButton>
                
                <HeaderButton
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Fermer"
                >
                  <X size={16} />
                </HeaderButton>
              </HeaderActions>
            </ChatHeader>

            <MessagesContainer>
              {messages.length === 0 && (
                <WelcomeCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="title">
                    <Bot size={24} />
                    Assistant Visio Pro
                  </div>
                  <div className="subtitle">
                    Je suis là pour vous aider avec toutes vos questions sur Visio Pro.
                    Sélectionnez un sujet ci-dessous ou posez-moi directement votre question.
                  </div>
                  
                  <QuickActions isExpanded={isExpanded}>
                    {quickActions.map((action, index) => (
                      <QuickActionCard
                        key={index}
                        onClick={() => handleQuickAction(action.action)}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="icon">
                          {action.icon}
                        </div>
                        <div className="title">{action.title}</div>
                        <div className="desc">{action.desc}</div>
                      </QuickActionCard>
                    ))}
                  </QuickActions>
                </WelcomeCard>
              )}

              <AnimatePresence>
                {messages.map(renderMessage)}
              </AnimatePresence>

              {isTyping && (
                <TypingIndicator
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <MessageAvatar isBot={true}>
                    <Bot size={16} />
                  </MessageAvatar>
                  <div className="dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </TypingIndicator>
              )}

              <div ref={messagesEndRef} />
            </MessagesContainer>

            <InputContainer>
              <InputWrapper>
                <Input
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Posez votre question sur Visio Pro..."
                />
                <SendButton
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={16} />
                </SendButton>
              </InputWrapper>
            </InputContainer>
          </ChatWindow>
        )}
      </AnimatePresence>

      <ChatbotButton
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          rotate: isOpen ? 180 : 0,
          scale: hasNewMessage ? [1, 1.1, 1] : 1
        }}
        transition={{ 
          rotate: { duration: 0.3 },
          scale: { duration: 0.5, repeat: hasNewMessage ? Infinity : 0 }
        }}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        
        {hasNewMessage && !isOpen && (
          <NotificationBadge
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            !
          </NotificationBadge>
        )}
      </ChatbotButton>
    </ChatbotContainer>
  );
};

export default AIChatbot;
