import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

const COLORS = {
  primary: '#2563eb',    // Blue 600
  secondary: '#475569',  // Slate 600
  dark: '#0f172a',       // Slate 900
  text: '#334155',       // Slate 700
  lightText: '#64748b',  // Slate 500
  background: '#f8fafc', // Slate 50
  white: '#ffffff',
  border: '#e2e8f0',     // Slate 200
  botBubble: '#f1f5f9',  // Slate 100
  userBubble: '#2563eb', // Blue 600
  userText: '#ffffff',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

// --- Styled Components ---

const ChatContainer = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  pointer-events: none; /* Allow clicks to pass through around the chat */
`;

const ChatButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px ${COLORS.shadow};
  pointer-events: auto;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8; /* Blue 700 */
  }

  &:focus {
    outline: none;
    ring: 2px solid ${COLORS.primary};
    ring-offset: 2px;
  }
`;

const ChatWindow = styled(motion.div)`
  width: 350px;
  height: 500px;
  background-color: ${COLORS.white};
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 1rem;
  pointer-events: auto;
  border: 1px solid ${COLORS.border};
`;

const Header = styled.div`
  background-color: ${COLORS.white};
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${COLORS.border};
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.primary};
`;

const HeaderTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${COLORS.dark};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${COLORS.lightText};
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    color: ${COLORS.dark};
    background-color: ${COLORS.botBubble};
  }
`;

const MessagesArea = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: ${COLORS.background};

  /* Custom Scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 3px;
  }
`;

const MessageBubble = styled.div`
  max-width: 80%;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  font-size: 0.9rem;
  line-height: 1.5;
  position: relative;
  word-wrap: break-word;
  
  ${props => props.$isUser ? `
    align-self: flex-end;
    background-color: ${COLORS.userBubble};
    color: ${COLORS.userText};
    border-bottom-right-radius: 2px;
  ` : `
    align-self: flex-start;
    background-color: ${COLORS.botBubble};
    color: ${COLORS.text};
    border-bottom-left-radius: 2px;
    border: 1px solid ${COLORS.border};
  `}
`;

const TypingIndicator = styled.div`
  display: flex;
  gap: 4px;
  padding: 4px 8px;
  
  span {
    width: 6px;
    height: 6px;
    background-color: ${COLORS.lightText};
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out both;
  }
  
  span:nth-child(1) { animation-delay: -0.32s; }
  span:nth-child(2) { animation-delay: -0.16s; }
  
  @keyframes bounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
  }
`;

const InputArea = styled.form`
  padding: 1rem;
  background-color: ${COLORS.white};
  border-top: 1px solid ${COLORS.border};
  display: flex;
  gap: 0.75rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 9999px;
  border: 1px solid ${COLORS.border};
  background-color: ${COLORS.background};
  color: ${COLORS.text};
  font-size: 0.9rem;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: ${COLORS.primary};
    background-color: ${COLORS.white};
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
  }

  &::placeholder {
    color: ${COLORS.lightText};
  }
`;

const SendButton = styled.button`
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
  border: none;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    background-color: #1d4ed8;
    transform: scale(1.05);
  }
  
  &:disabled {
    background-color: ${COLORS.border};
    cursor: default;
    transform: none;
  }
`;

// --- Main Component ---

const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { 
            id: 1, 
            text: "Bonjour ! Je suis votre assistant virtuel VisiConnect. Je peux vous aider avec vos réunions ou des problèmes techniques.", 
            isUser: false 
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, isOpen]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        // Add user message
        const userMessage = { id: Date.now(), text: inputValue, isUser: true };
        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsTyping(true);
        scrollToBottom();

        // Simulate AI thinking and response
        setTimeout(() => {
            const lowerInput = userMessage.text.toLowerCase();
            let botText = "Je vois. Pouvez-vous m'en dire plus ?";

            if (lowerInput.includes("meeting") || lowerInput.includes("start")) {
                botText = "Pour démarrer une nouvelle réunion, cliquez sur le bouton 'Nouvelle Réunion' sur votre tableau de bord puis partagez le lien.";
            } else if (lowerInput.includes("audio") || lowerInput.includes("micro") || lowerInput.includes("entends")) {
                botText = "Pour les problèmes audio, vérifiez que votre micro est bien sélectionné dans Paramètres > Audio et que le navigateur a la permission d'accès.";
            } else if (lowerInput.includes("video") || lowerInput.includes("caméra") || lowerInput.includes("voir")) {
                botText = "Si votre caméra ne fonctionne pas, vérifiez dans Paramètres > Vidéo que la bonne caméra est choisie et qu'aucune autre application ne l'utilise.";
            } else if (lowerInput.includes("écran") || lowerInput.includes("partage")) {
                botText = "Vous pouvez partager votre écran en cliquant sur l'icône 'Partager l'écran' dans la barre d'outils inférieure.";
            } else if (lowerInput.includes("bonjour") || lowerInput.includes("salut")) {
                botText = "Bonjour ! Prêt à vous aider avec VisiConnect.";
            }

            const botResponse = {
                id: Date.now() + 1,
                text: botText,
                isUser: false
            };
            
            setMessages((prev) => [...prev, botResponse]);
            setIsTyping(false);
            scrollToBottom();
        }, 1500);
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    return (
        <ChatContainer>
            <AnimatePresence>
                {isOpen && (
                    <ChatWindow
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Header>
                            <TitleContainer>
                                <IconWrapper>
                                    <Sparkles size={20} />
                                </IconWrapper>
                                <HeaderTitle>Assistant IA</HeaderTitle>
                            </TitleContainer>
                            <CloseButton onClick={() => setIsOpen(false)} aria-label="Fermer le chat">
                                <X size={20} />
                            </CloseButton>
                        </Header>

                        <MessagesArea>
                            {messages.map((msg) => (
                                <MessageBubble key={msg.id} $isUser={msg.isUser}>
                                    {msg.text}
                                </MessageBubble>
                            ))}
                            {isTyping && (
                                <MessageBubble $isUser={false} style={{ width: 'fit-content' }}>
                                    <TypingIndicator>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </TypingIndicator>
                                </MessageBubble>
                            )}
                            <div ref={messagesEndRef} />
                        </MessagesArea>

                        <InputArea onSubmit={handleSend}>
                            <Input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Écrivez votre message..."
                                disabled={isTyping}
                            />
                            <SendButton type="submit" disabled={!inputValue.trim() || isTyping}>
                                <Send size={18} />
                            </SendButton>
                        </InputArea>
                    </ChatWindow>
                )}
            </AnimatePresence>

            <ChatButton
                onClick={toggleChat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isOpen ? "Fermer le chat" : "Ouvrir le chat"}
            >
                {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
            </ChatButton>
        </ChatContainer>
    );
};

export default AIChatbot;
