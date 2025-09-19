import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Smile, Paperclip, Crown, CheckCheck
} from 'lucide-react';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #111;
`;

const Header = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #222;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  color: #3b82f6;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
`;

const OnlineCount = styled.span`
  color: #888;
  font-size: 0.8rem;
  background: #222;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #222;
  }

  &::-webkit-scrollbar-thumb {
    background: #444;
    border-radius: 2px;
  }
`;

const Message = styled(motion.div)`
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  
  &.own {
    flex-direction: row-reverse;
    
    .message-content {
      background: #00ff88;
      color: #0a0a0a;
    }
    
    .message-info {
      text-align: right;
    }
  }
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.color || '#333'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
  font-weight: 600;
  font-size: 0.8rem;
  flex-shrink: 0;
`;

const MessageBubble = styled.div`
  max-width: 70%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const MessageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #888;
  
  .username {
    font-weight: 600;
    color: ${props => props.userColor || '#00ff88'};
  }
  
  .role-badge {
    background: #222;
    padding: 0.125rem 0.375rem;
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
`;

const MessageContent = styled.div`
  background: #222;
  color: #3b82f6;
  padding: 0.75rem 1rem;
  border-radius: 16px;
  border-top-left-radius: ${props => props.isOwn ? '16px' : '4px'};
  border-top-right-radius: ${props => props.isOwn ? '4px' : '16px'};
  word-wrap: break-word;
  line-height: 1.4;
  position: relative;
`;

const MessageTime = styled.div`
  font-size: 0.7rem;
  color: #666;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const InputContainer = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid #222;
  background: #0a0a0a;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: end;
  gap: 0.75rem;
  background: #222;
  border-radius: 20px;
  padding: 0.75rem 1rem;
  border: 2px solid transparent;
  transition: all 0.3s ease;

  &:focus-within {
    border-color: #00ff88;
    box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.1);
  }
`;

const Input = styled.textarea`
  flex: 1;
  background: none;
  border: none;
  color: #3b82f6;
  font-size: 0.9rem;
  resize: none;
  max-height: 100px;
  min-height: 20px;
  line-height: 1.4;

  &::placeholder {
    color: #666;
  }

  &:focus {
    outline: none;
  }
`;

const ActionButton = styled(motion.button)`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: #333;
  color: #888;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: #444;
    color: #3b82f6;
  }

  &.send {
    background: #00ff88;
    color: #0a0a0a;

    &:hover {
      background: #00e67a;
    }

    &:disabled {
      background: #333;
      color: #666;
      cursor: not-allowed;
    }
  }
`;

const TypingIndicator = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  color: #888;
  font-size: 0.8rem;
  font-style: italic;
  
  .dots {
    display: flex;
    gap: 0.25rem;
    
    span {
      width: 4px;
      height: 4px;
      background: #888;
      border-radius: 50%;
      animation: typing 1.4s infinite ease-in-out;
      
      &:nth-child(1) { animation-delay: 0s; }
      &:nth-child(2) { animation-delay: 0.2s; }
      &:nth-child(3) { animation-delay: 0.4s; }
    }
  }
  
  @keyframes typing {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
    30% { transform: translateY(-10px); opacity: 1; }
  }
`;

const SystemMessage = styled(motion.div)`
  text-align: center;
  color: #666;
  font-size: 0.8rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  margin: 0.5rem 0;
`;

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: 'System',
      content: 'Bienvenue dans la salle de conférence !',
      timestamp: new Date(Date.now() - 300000),
      type: 'system'
    },
    {
      id: 2,
      user: 'Alice Martin',
      content: 'Salut tout le monde ! 👋',
      timestamp: new Date(Date.now() - 240000),
      isHost: false,
      color: '#ff6b6b'
    },
    {
      id: 3,
      user: 'Bob Dupont',
      content: 'Hello ! Prêt pour la réunion',
      timestamp: new Date(Date.now() - 180000),
      isHost: false,
      color: '#4ecdc4'
    },
    {
      id: 4,
      user: 'Utilisateur Test',
      content: 'Parfait, commençons !',
      timestamp: new Date(Date.now() - 120000),
      isOwn: true,
      isHost: true,
      color: '#00ff88'
    }
  ]);
  const [typingUsers, setTypingUsers] = useState(['Alice Martin']);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Simulation de frappe
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setTypingUsers(['Alice Martin']);
        setTimeout(() => setTypingUsers([]), 2000);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      user: 'Utilisateur Test',
      content: message,
      timestamp: new Date(),
      isOwn: true,
      isHost: true,
      color: '#00ff88',
      status: 'sent'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Réponse intelligente basée sur le message
    setTimeout(() => {
      const intelligentResponse = generateIntelligentResponse(message);
      const responder = Math.random() > 0.5 ? 'Alice Martin' : 'Bob Dupont';
      
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        user: responder,
        content: intelligentResponse,
        timestamp: new Date(),
        isHost: false,
        color: responder === 'Alice Martin' ? '#ff6b6b' : '#4ecdc4'
      }]);
    }, 1000 + Math.random() * 3000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const generateIntelligentResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    // Salutations
    if (msg.includes('bonjour') || msg.includes('salut') || msg.includes('hello') || msg.includes('bonsoir')) {
      const greetings = [
        'Bonjour ! Ravi de vous voir 👋',
        'Salut ! Comment allez-vous ?',
        'Hello ! Prêt pour notre réunion ?',
        'Bonsoir ! Merci de nous rejoindre'
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    // Questions
    if (msg.includes('?') || msg.includes('comment') || msg.includes('pourquoi') || msg.includes('quand')) {
      const questionResponses = [
        'Excellente question ! Laissez-moi réfléchir...',
        'C\'est un point intéressant à explorer',
        'Je pense que nous devrions en discuter davantage',
        'Bonne question, qu\'en pensent les autres ?'
      ];
      return questionResponses[Math.floor(Math.random() * questionResponses.length)];
    }
    
    // Accord/Désaccord
    if (msg.includes('d\'accord') || msg.includes('oui') || msg.includes('exactement') || msg.includes('parfait')) {
      const agreementResponses = [
        'Tout à fait d\'accord ! 👍',
        'Exactement, c\'est bien vu',
        'Parfait, nous sommes sur la même longueur d\'onde',
        'Je partage votre avis'
      ];
      return agreementResponses[Math.floor(Math.random() * agreementResponses.length)];
    }
    
    // Remerciements
    if (msg.includes('merci') || msg.includes('thanks')) {
      const thankResponses = [
        'De rien ! 😊',
        'Avec plaisir !',
        'C\'est normal, nous sommes là pour ça',
        'Ravi d\'avoir pu aider'
      ];
      return thankResponses[Math.floor(Math.random() * thankResponses.length)];
    }
    
    // Travail/Projet
    if (msg.includes('projet') || msg.includes('travail') || msg.includes('tâche') || msg.includes('deadline')) {
      const workResponses = [
        'Organisons-nous pour être efficaces',
        'Bonne idée, définissons les priorités',
        'Je peux m\'occuper de cette partie',
        'Fixons un planning pour avancer'
      ];
      return workResponses[Math.floor(Math.random() * workResponses.length)];
    }
    
    // Problèmes techniques
    if (msg.includes('problème') || msg.includes('bug') || msg.includes('erreur') || msg.includes('marche pas')) {
      const techResponses = [
        'Avez-vous essayé de redémarrer ?',
        'Je rencontre le même souci parfois',
        'Peut-être un problème de connexion ?',
        'Essayons de résoudre ça ensemble'
      ];
      return techResponses[Math.floor(Math.random() * techResponses.length)];
    }
    
    // Réponses par défaut
    const defaultResponses = [
      'Intéressant ! 🤔',
      'Je vois ce que vous voulez dire',
      'C\'est une bonne observation',
      'Continuez, je vous écoute',
      'Pouvez-vous développer ?'
    ];
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getUserInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRoleBadge = (isHost) => {
    if (isHost) {
      return (
        <div className="role-badge">
          <Crown size={10} color="#00ff88" />
          <span>Hôte</span>
        </div>
      );
    }
    return null;
  };

  return (
    <Container>
      <Header>
        <Title>Chat de la salle</Title>
        <OnlineCount>3 en ligne</OnlineCount>
      </Header>

      <MessagesContainer>
        <AnimatePresence>
          {messages.map((msg) => {
            if (msg.type === 'system') {
              return (
                <SystemMessage
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {msg.content}
                </SystemMessage>
              );
            }

            return (
              <Message
                key={msg.id}
                className={msg.isOwn ? 'own' : ''}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {!msg.isOwn && (
                  <Avatar color={msg.color}>
                    {getUserInitials(msg.user)}
                  </Avatar>
                )}
                
                <MessageBubble>
                  <MessageInfo 
                    className="message-info"
                    userColor={msg.color}
                  >
                    <span className="username">{msg.user}</span>
                    {getRoleBadge(msg.isHost)}
                    <span>{formatTime(msg.timestamp)}</span>
                  </MessageInfo>
                  
                  <MessageContent 
                    className="message-content"
                    isOwn={msg.isOwn}
                  >
                    {msg.content}
                    {msg.isOwn && (
                      <MessageTime>
                        {msg.status === 'sent' && <CheckCheck size={12} color="#00ff88" />}
                        {formatTime(msg.timestamp)}
                      </MessageTime>
                    )}
                  </MessageContent>
                </MessageBubble>
                
                {msg.isOwn && (
                  <Avatar color={msg.color}>
                    {getUserInitials(msg.user)}
                  </Avatar>
                )}
              </Message>
            );
          })}
        </AnimatePresence>

        {typingUsers.length > 0 && (
          <TypingIndicator
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <span>{typingUsers.join(', ')} est en train d'écrire</span>
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
          <ActionButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Paperclip size={16} />
          </ActionButton>

          <Input
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tapez votre message..."
            rows={1}
          />

          <ActionButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Smile size={16} />
          </ActionButton>

          <ActionButton
            className="send"
            onClick={handleSendMessage}
            disabled={!message.trim()}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Send size={16} />
          </ActionButton>
        </InputWrapper>
      </InputContainer>
    </Container>
  );
};

export default Chat;
