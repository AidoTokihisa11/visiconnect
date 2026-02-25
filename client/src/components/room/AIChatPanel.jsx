import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles } from 'lucide-react';

const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: rgb(15 23 42 / 0.5);
  backdrop-filter: blur(8px);
`;

const ChatHistory = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const MessageBubble = styled(motion.div)`
  display: flex;
  justify-content: ${props => props.isAi ? 'flex-start' : 'flex-end'};
  gap: 0.75rem;
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.isAi ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' : '#475569'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const BubbleContent = styled.div`
  max-width: 80%;
  background: ${props => props.isAi ? '#1e293b' : '#3b82f6'};
  padding: 1rem;
  border-radius: 12px;
  border-top-left-radius: ${props => props.isAi ? '0' : '12px'};
  border-top-right-radius: ${props => !props.isAi ? '0' : '12px'};
  color: white;
  font-size: 0.9rem;
  line-height: 1.5;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const InputArea = styled.div`
  padding: 1rem;
  background-color: #0f172a;
  border-top: 1px solid #1e293b;
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 9999px;
  padding: 0.75rem 1.25rem;
  color: white;
  outline: none;
  font-size: 0.9rem;
  transition: all 0.2s;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
`;

const SendButton = styled.button`
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TypingIndicator = () => (
    <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        style={{ display: 'flex', gap: '4px', padding: '12px', background: '#1e293b', borderRadius: '12px', width: 'fit-content', marginLeft: '3rem' }}
    >
        {[0, 1, 2].map((dot) => (
            <motion.div
                key={dot}
                style={{ width: '6px', height: '6px', backgroundColor: '#94a3b8', borderRadius: '50%' }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: dot * 0.2 }}
            />
        ))}
    </motion.div>
);

export const AIChatPanel = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: "Bonjour ! Je suis votre assistant de réunion intelligent. Je peux prendre des notes, résumer la discussion ou répondre à vos questions techniques. Comment puis-je vous aider ?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulated AI Response
    setTimeout(() => {
        const aiResponseOptions = [
            "C'est noté. Je l'ajoute au compte-rendu.",
            "Je peux organiser un vote à ce sujet si vous le souhaitez.",
            "D'après mes analyses, l'engagement a augmenté de 15% durant les 5 dernières minutes.",
            "Je recherche cette information dans votre base de connaissances...",
            "Voulez-vous que je crée une tâche Jira pour cela ?"
        ];
        const randomResponse = aiResponseOptions[Math.floor(Math.random() * aiResponseOptions.length)];
        
        setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: randomResponse }]);
        setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  return (
    <PanelContainer>
      <ChatHistory>
        <AnimatePresence initial={false}>
            {messages.map((msg) => (
            <MessageBubble
                key={msg.id}
                isAi={msg.sender === 'ai'}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
                {msg.sender === 'ai' && <Avatar isAi><Sparkles size={16} /></Avatar>}
                <BubbleContent isAi={msg.sender === 'ai'}>
                {msg.text}
                </BubbleContent>
                {msg.sender === 'user' && <Avatar><User size={16} /></Avatar>}
            </MessageBubble>
            ))}
        </AnimatePresence>
        {isTyping && <TypingIndicator />}
      </ChatHistory>

      <InputArea>
        <Input 
          placeholder="Demandez quelque chose à l'IA..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <SendButton onClick={handleSend} disabled={!inputValue.trim() || isTyping}>
          <Send size={18} />
        </SendButton>
      </InputArea>
    </PanelContainer>
  );
};
