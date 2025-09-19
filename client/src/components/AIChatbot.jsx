import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  MessageCircle, X, Send, Bot, User, 
  Video, Monitor, Users, Settings, HelpCircle,
  Search, Maximize2, Minimize2, ExternalLink
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
  background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 40px rgba(37, 99, 235, 0.4);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(from 0deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: rotate 3s linear infinite;
  }

  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }

  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 16px 50px rgba(37, 99, 235, 0.6);
  }

  svg {
    z-index: 1;
  }
`;

const ChatWindow = styled(motion.div)`
  width: 420px;
  height: 600px;
  background: var(--bg-card, rgba(255, 255, 255, 0.95));
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  box-shadow: var(--shadow-lg, 0 8px 25px rgba(0, 0, 0, 0.15));
  backdrop-filter: blur(20px);
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 768px) {
    width: calc(100vw - 2rem);
    height: 70vh;
    margin-bottom: 1rem;
  }
`;

const ChatHeader = styled.div`
  padding: 1.5rem 2rem;
  background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BotAvatar = styled.div`
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
`;

const BotInfo = styled.div`
  h3 {
    margin: 0 0 0.25rem 0;
    font-size: 1.1rem;
    font-weight: 700;
  }
  
  p {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.9;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const HeaderButton = styled(motion.button)`
  width: 36px;
  height: 36px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: var(--bg-primary, #ffffff);

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(37, 99, 235, 0.3);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(37, 99, 235, 0.5);
  }
`;

const Message = styled(motion.div)`
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  max-width: 85%;
  align-self: ${props => props.isBot ? 'flex-start' : 'flex-end'};
  flex-direction: ${props => props.isBot ? 'row' : 'row-reverse'};
`;

const MessageAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: ${props => props.isBot ? 
    'var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4))' : 
    'rgba(37, 99, 235, 0.1)'};
  color: ${props => props.isBot ? 'white' : 'var(--accent-cyan, #06b6d4)'};
  border: 2px solid ${props => props.isBot ? 'transparent' : 'var(--accent-cyan, #06b6d4)'};
`;

const MessageBubble = styled(motion.div)`
  background: ${props => props.isBot ? 
    'var(--bg-card, rgba(255, 255, 255, 0.95))' : 
    'var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4))'};
  color: ${props => props.isBot ? 'var(--text-primary, #1e293b)' : 'white'};
  padding: 0.75rem 1rem;
  border-radius: ${props => props.isBot ? '4px 16px 16px 16px' : '16px 4px 16px 16px'};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: ${props => props.isBot ? '1px solid rgba(0, 0, 0, 0.1)' : 'none'};
  font-size: 0.95rem;
  line-height: 1.4;
  word-wrap: break-word;
`;

const QuickActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
`;

const QuickActionButton = styled(motion.button)`
  padding: 0.4rem 0.8rem;
  background: rgba(37, 99, 235, 0.1);
  border: 1px solid rgba(37, 99, 235, 0.2);
  color: var(--accent-cyan, #06b6d4);
  border-radius: 20px;
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(37, 99, 235, 0.2);
    transform: translateY(-1px);
  }
`;

const SuggestedPrompts = styled.div`
  padding: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background: var(--bg-primary, #ffffff);
`;

const SuggestedPromptsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SuggestedPrompt = styled(motion.button)`
  padding: 0.75rem 1rem;
  background: var(--bg-card, rgba(255, 255, 255, 0.95));
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  color: var(--text-primary, #1e293b);
  cursor: pointer;
  text-align: left;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    border-color: var(--accent-cyan, #06b6d4);
    background: rgba(6, 182, 212, 0.05);
    transform: translateY(-1px);
  }
`;

const ChatInput = styled.div`
  padding: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background: var(--bg-primary, #ffffff);
  display: flex;
  gap: 0.75rem;
  align-items: flex-end;
`;

const InputContainer = styled.div`
  flex: 1;
  position: relative;
`;

const TextInput = styled.textarea`
  width: 100%;
  min-height: 44px;
  max-height: 120px;
  padding: 0.75rem 3rem 0.75rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  background: var(--bg-card, rgba(255, 255, 255, 0.95));
  color: var(--text-primary, #1e293b);
  font-size: 0.95rem;
  font-family: inherit;
  resize: none;
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: var(--text-secondary, #475569);
  }

  &:focus {
    border-color: var(--accent-cyan, #06b6d4);
    box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
  }
`;

const SendButton = styled(motion.button)`
  width: 44px;
  height: 44px;
  border: none;
  background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
  color: white;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    transform: translateY(-1px) scale(1.02);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const TypingIndicator = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  color: var(--text-secondary, #475569);
  font-size: 0.9rem;
`;

const TypingDots = styled.div`
  display: flex;
  gap: 2px;
  
  span {
    width: 4px;
    height: 4px;
    background: var(--accent-cyan, #06b6d4);
    border-radius: 50%;
    animation: typing 1.5s infinite;
    
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }

  @keyframes typing {
    0%, 60%, 100% { transform: scale(1); opacity: 0.5; }
    30% { transform: scale(1.2); opacity: 1; }
  }
`;

const WelcomeScreen = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  background: var(--bg-primary, #ffffff);
`;

const WelcomeIcon = styled.div`
  width: 80px;
  height: 80px;
  background: var(--primary-gradient, linear-gradient(135deg, #2563eb, #06b6d4));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
`;

const WelcomeTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary, #1e293b);
  margin-bottom: 0.5rem;
`;

const WelcomeSubtitle = styled.p`
  color: var(--text-secondary, #475569);
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 2rem;
`;

const CapabilitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 300px;
`;

const CapabilityCard = styled(motion.div)`
  padding: 1rem;
  background: var(--bg-card, rgba(255, 255, 255, 0.95));
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--accent-cyan, #06b6d4);
    background: rgba(6, 182, 212, 0.05);
    transform: translateY(-2px);
  }

  svg {
    color: var(--accent-cyan, #06b6d4);
    margin-bottom: 0.5rem;
  }

  h4 {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-primary, #1e293b);
    margin: 0;
  }
`;

const AIChatbot = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const suggestedPrompts = useMemo(() => [
    { icon: <Video size={16} />, text: "Comment démarrer une réunion ?", action: "meeting_help" },
    { icon: <Users size={16} />, text: "Inviter des participants", action: "invite_help" },
    { icon: <Monitor size={16} />, text: "Partager mon écran", action: "screen_help" },
    { icon: <Settings size={16} />, text: "Configurer mes paramètres", action: "settings_help" }
  ], []);

  const capabilities = useMemo(() => [
    { icon: <HelpCircle size={20} />, title: "Support", prompt: "J'ai besoin d'aide" },
    { icon: <Video size={20} />, title: "Réunions", prompt: "Comment créer une réunion ?" },
    { icon: <Settings size={20} />, title: "Paramètres", prompt: "Aide pour les paramètres" },
    { icon: <Search size={20} />, title: "Recherche", prompt: "Rechercher des fonctionnalités" }
  ], []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, scrollToBottom]);

  const handleSendMessage = useCallback(async (messageText = inputValue) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: messageText.trim(),
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setShowSuggestions(false);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(messageText);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const generateBotResponse = useCallback((userMessage) => {
    const responses = {
      meeting_help: {
        text: "Pour démarrer une réunion, cliquez sur 'Nouvelle réunion' dans le tableau de bord, ou utilisez le bouton 'Démarrage rapide' sur la page d'accueil.",
        actions: [
          { icon: <Video size={14} />, text: "Créer une réunion", action: () => navigate('/room') },
          { icon: <ExternalLink size={14} />, text: "Voir le guide", action: () => navigate('/user-guide') }
        ]
      },
      invite_help: {
        text: "Vous pouvez inviter des participants en partageant le lien de la réunion, ou en envoyant des invitations par email depuis les paramètres de la réunion.",
        actions: [
          { icon: <Users size={14} />, text: "Gestion participants", action: () => {} }
        ]
      },
      screen_help: {
        text: "Pour partager votre écran, rejoignez d'abord une réunion, puis cliquez sur l'icône de partage d'écran dans la barre d'outils.",
        actions: [
          { icon: <Monitor size={14} />, text: "Tester le partage", action: () => {} }
        ]
      },
      settings_help: {
        text: "Accédez aux paramètres via votre profil en haut à droite, ou consultez les paramètres de réunion lors de la création d'une nouvelle session.",
        actions: [
          { icon: <Settings size={14} />, text: "Ouvrir paramètres", action: () => navigate('/account') }
        ]
      }
    };

    // Check for specific actions first
    const actionResponse = responses[userMessage.toLowerCase().replace(/[^a-z_]/g, '')];
    if (actionResponse) {
      return {
        id: Date.now(),
        text: actionResponse.text,
        isBot: true,
        timestamp: new Date(),
        actions: actionResponse.actions
      };
    }

    // Default responses based on keywords
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('réunion') || lowerMessage.includes('meeting')) {
      return {
        id: Date.now(),
        text: "Je peux vous aider avec les réunions ! Voulez-vous créer une nouvelle réunion, rejoindre une réunion existante, ou apprendre à utiliser les fonctionnalités avancées ?",
        isBot: true,
        timestamp: new Date(),
        actions: [
          { icon: <Video size={14} />, text: "Nouvelle réunion", action: () => navigate('/room') },
          { icon: <HelpCircle size={14} />, text: "Guide d'utilisation", action: () => navigate('/user-guide') }
        ]
      };
    }

    if (lowerMessage.includes('aide') || lowerMessage.includes('help')) {
      return {
        id: Date.now(),
        text: "Je suis ici pour vous aider ! Voici ce que je peux faire pour vous :\n\n• Créer et gérer des réunions\n• Expliquer les fonctionnalités\n• Résoudre les problèmes techniques\n• Vous guider dans l'utilisation de VisiConnect",
        isBot: true,
        timestamp: new Date(),
        actions: [
          { icon: <HelpCircle size={14} />, text: "Centre d'aide", action: () => navigate('/support') },
          { icon: <ExternalLink size={14} />, text: "Documentation", action: () => navigate('/user-guide') }
        ]
      };
    }

    // Default response
    return {
      id: Date.now(),
      text: "Merci pour votre message ! Je suis votre assistant VisiConnect. Je peux vous aider avec la création de réunions, la gestion des participants, les paramètres et bien plus encore. Que puis-je faire pour vous ?",
      isBot: true,
      timestamp: new Date(),
      actions: [
        { icon: <Video size={14} />, text: "Créer réunion", action: () => navigate('/room') },
        { icon: <HelpCircle size={14} />, text: "Voir l'aide", action: () => navigate('/support') }
      ]
    };
  }, [navigate]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const handleCapabilityClick = useCallback((prompt) => {
    handleSendMessage(prompt);
  }, [handleSendMessage]);

  const handleSuggestedPromptClick = useCallback((action) => {
    const prompt = suggestedPrompts.find(p => p.action === action);
    if (prompt) {
      handleSendMessage(action);
    }
  }, [handleSendMessage, suggestedPrompts]);

  const toggleChat = useCallback(() => {
    setIsOpen(!isOpen);
    if (!isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  return (
    <ChatbotContainer>
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 80 : 600
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <ChatHeader>
              <HeaderInfo>
                <BotAvatar>
                  <Bot size={24} />
                </BotAvatar>
                <BotInfo>
                  <h3>Assistant VisiConnect</h3>
                  <p>Toujours là pour vous aider</p>
                </BotInfo>
              </HeaderInfo>
              <HeaderActions>
                <HeaderButton
                  onClick={() => setIsMinimized(!isMinimized)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </HeaderButton>
                <HeaderButton
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={16} />
                </HeaderButton>
              </HeaderActions>
            </ChatHeader>

            {!isMinimized && (
              <>
                <ChatMessages>
                  {messages.length === 0 ? (
                    <WelcomeScreen
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <WelcomeIcon>
                        <Bot size={40} color="white" />
                      </WelcomeIcon>
                      <WelcomeTitle>Bonjour ! 👋</WelcomeTitle>
                      <WelcomeSubtitle>
                        Je suis votre assistant VisiConnect. Comment puis-je vous aider aujourd'hui ?
                      </WelcomeSubtitle>
                      <CapabilitiesGrid>
                        {capabilities.map((capability, index) => (
                          <CapabilityCard
                            key={index}
                            onClick={() => handleCapabilityClick(capability.prompt)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {capability.icon}
                            <h4>{capability.title}</h4>
                          </CapabilityCard>
                        ))}
                      </CapabilitiesGrid>
                    </WelcomeScreen>
                  ) : (
                    <>
                      {messages.map((message) => (
                        <Message key={message.id} isBot={message.isBot}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <MessageAvatar isBot={message.isBot}>
                            {message.isBot ? <Bot size={16} /> : <User size={16} />}
                          </MessageAvatar>
                          <div>
                            <MessageBubble isBot={message.isBot}
                              initial={{ scale: 0.95 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              {message.text}
                            </MessageBubble>
                            {message.actions && (
                              <QuickActions>
                                {message.actions.map((action, index) => (
                                  <QuickActionButton
                                    key={index}
                                    onClick={action.action}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    {action.icon}
                                    {action.text}
                                  </QuickActionButton>
                                ))}
                              </QuickActions>
                            )}
                          </div>
                        </Message>
                      ))}
                      
                      {isTyping && (
                        <Message isBot={true}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <MessageAvatar isBot={true}>
                            <Bot size={16} />
                          </MessageAvatar>
                          <TypingIndicator>
                            <span>Assistant écrit</span>
                            <TypingDots>
                              <span></span>
                              <span></span>
                              <span></span>
                            </TypingDots>
                          </TypingIndicator>
                        </Message>
                      )}
                      <div ref={messagesEndRef} />
                    </>
                  )}
                </ChatMessages>

                {messages.length === 0 && showSuggestions && (
                  <SuggestedPrompts>
                    <h4 style={{ margin: '0 0 1rem 0', color: 'var(--text-primary, #1e293b)', fontSize: '0.9rem' }}>
                      Suggestions :
                    </h4>
                    <SuggestedPromptsList>
                      {suggestedPrompts.map((prompt, index) => (
                        <SuggestedPrompt
                          key={index}
                          onClick={() => handleSuggestedPromptClick(prompt.action)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {prompt.icon}
                          {prompt.text}
                        </SuggestedPrompt>
                      ))}
                    </SuggestedPromptsList>
                  </SuggestedPrompts>
                )}

                <ChatInput>
                  <InputContainer>
                    <TextInput
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Tapez votre message..."
                      rows={1}
                    />
                  </InputContainer>
                  <SendButton
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isTyping}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send size={18} />
                  </SendButton>
                </ChatInput>
              </>
            )}
          </ChatWindow>
        )}
      </AnimatePresence>

      <ChatbotButton
        onClick={toggleChat}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          rotate: isOpen ? 180 : 0,
          scale: isOpen ? 0.9 : 1
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </ChatbotButton>
    </ChatbotContainer>
  );
};

export default AIChatbot;