import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

const COLORS = {
  primary: '#0f172a',
  secondary: '#475569',
  dark: '#0f172a',
  text: '#334155',
  lightText: '#64748b',
  background: '#f8fafc',
  white: '#ffffff',
  border: '#e2e8f0',
  botBubble: '#f1f5f9',
  userBubble: '#0f172a',
  userText: '#ffffff',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

const ChatContainer = styled(motion.div)`
  position: fixed;
  bottom: 1.5rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  ${props => props.$position === 'left' ? 'left: 1.5rem; align-items: flex-start;' : 'right: 1.5rem; align-items: flex-end;'}
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
    background-color: #1e293b;
  }
`;

const ChatWindow = styled(motion.div)`
  width: 360px;
  height: 550px;
  max-height: 80vh;
  background-color: ${COLORS.white};
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 1rem;
  pointer-events: auto;
  border: 1px solid ${COLORS.border};
`;

const Header = styled.div`
  background-color: ${COLORS.white};
  padding: 1.25rem 1rem;
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
  font-size: 1.1rem;
  font-weight: 700;
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
  border-radius: 6px;
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

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 3px;
  }
`;

const MessageBubble = styled.div`
  max-width: 85%;
  padding: 0.75rem 1rem;
  border-radius: 16px;
  font-size: 0.95rem;
  line-height: 1.5;
  word-wrap: break-word;

  ${props => props.$isUser ? `
    align-self: flex-end;
    background-color: ${COLORS.userBubble};
    color: ${COLORS.userText};
    border-bottom-right-radius: 4px;
  ` : `
    align-self: flex-start;
    background-color: ${COLORS.botBubble};
    color: ${COLORS.text};
    border-bottom-left-radius: 4px;
    border: 1px solid ${COLORS.border};
  `}
`;

const TypingIndicator = styled.div`
  display: flex;
  gap: 4px;
  padding: 6px 12px;
  background: ${COLORS.botBubble};
  border-radius: 12px;
  align-self: flex-start;
  width: fit-content;

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
  font-size: 0.95rem;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: ${COLORS.primary};
    background-color: ${COLORS.white};
    box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.1);
  }
`;

const SendButton = styled.button`
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    background-color: #1e293b;
    transform: scale(1.05);
  }
  &:disabled {
    background-color: ${COLORS.border};
    cursor: default;
    transform: none;
  }
`;

// --- KNOWLEDGE BASE SIMULATION ---
const knowledgeBase = [
  {
    tags: ["prix", "tarif", "abonnement", "combien", "payant", "gratuit", "premium"],
    response: "VisiConnect propose plusieurs formules : une version gratuite (Membres Basic) idéale pour les petites réunions, et des abonnements Premium/Pro offrant des réunions illimitées, la 4K, des salles de sous-commission, et l'accès au tableau blanc avancé."
  },
  {
    tags: ["tableau", "blanc", "dessin", "tableau blanc", "dessiner", "schéma"],
    response: "Le tableau blanc interactif de VisiConnect vous permet de dessiner, d'ajouter des formes et des notes en temps réel avec tous les participants. Il est accessible directement depuis la barre d'outils de votre salle de réunion."
  },
  {
    tags: ["sécurité", "chiffrement", "sécurisé", "données", "confidenciel"],
    response: "La sécurité est notre priorité. Toutes les communications sur VisiConnect sont protégées par un chiffrement de bout en bout (E2EE), et nous offrons des options de salle d'attente et de mot de passe pour contrôler l'accès à vos réunions."
  },
  {
    tags: ["4k", "qualité", "hd", "haute définition", "vidéo"],
    response: "Vous pouvez activer la qualité 4K UHD dans les paramètres de votre caméra (icône engrenage pendant la réunion). Cela garantit une clarté optimale si votre équipement et votre connexion le permettent."
  },
  {
    tags: ["partage", "écran", "présenter", "partager", "presentation"],
    response: "Pour partager votre écran, cliquez sur l'icône 'Partager l'écran' en bas de la fenêtre de réunion. Vous pouvez choisir de partager tout votre écran, une fenêtre d'application ou un onglet de navigateur."
  },
  {
    tags: ["inscription", "compte", "creer", "inscrire", "login"],
    response: "Pour créer un compte, cliquez sur 'Créer un compte' en haut à droite. Vous aurez besoin d'un email professionnel, ou vous pouvez vous inscrire en un clic via Google ou GitHub."
  },
  {
    tags: ["micro", "audio", "entends", "son", "parle", "sourd"],
    response: "Si vous avez des problèmes de son, vérifiez que votre micro/casque est bien sélectionné dans les Paramètres > Audio. Assurez-vous également que votre navigateur autorise VisiConnect à utiliser le microphone."
  },
  {
    tags: ["caméra", "video", "marche pas", "cam", "voir"],
    response: "Si votre caméra ne fonctionne pas, vérifiez dans Paramètres > Vidéo que la bonne source est sélectionnée, assurez-vous qu'aucune autre application n'utilise la caméra, et vérifiez les autorisations de votre navigateur."
  },
  {
    tags: ["fonctionnalités", "features", "quoi", "pourquoi", "visiconnect"],
    response: "VisiConnect est une plateforme ultra-performante offrant : Appels vidéo 4K, Audio spatial, Chat en direct, Messagerie privée, Tableau blanc collaboratif, Partage d'écran fluide, et une sécurité de bout en bout."
  },
  {
    tags: ["salut", "bonjour", "hey", "coucou", "hello"],
    response: "Bonjour ! Bienvenue sur VisiConnect. Je suis l'IA de la plateforme, entraînée pour répondre à toutes vos questions. Que puis-je faire pour vous aujourd'hui ?"
  },
  {
    tags: ["merci", "thanks", "super", "génial", "top"],
    response: "Avec grand plaisir ! N'hésitez pas si vous avez la moindre question concernant VisiConnect ou ses fonctionnalités."
  },
  {
    tags: ["qui", "es tu", "nom", "ia", "robot", "agent"],
    response: "Je suis VisiBot, l'Intelligence Artificielle ultra-performante de VisiConnect. Mon rôle est de vous guider, de vous aider à résoudre vos problèmes et de tout vous expliquer sur notre plateforme !"
  }
];

const AI_PROXY_URL = `${import.meta.env.VITE_API_URL || ''}/api/ai/chat`;

const findBestMatch = (input) => {
  const normInput = input.toLowerCase();
  let bestMatch = null;
  let highestScore = 0;

  for (const item of knowledgeBase) {
    let score = 0;
    item.tags.forEach(tag => {
      // Basic strict presence check
      if (normInput.includes(tag)) score += 2;
    });

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item.response;
    }
  }

  if (highestScore > 0) return bestMatch;
  
  // Default fallback if no match
  return "C'est une excellente question. VisiConnect propose tellement de fonctionnalités (4K, tableau blanc, sécurité E2E) que la réponse pourrait dépendre de votre situation exacte. Pouvez-vous reformuler ou préciser de quelle partie de la plateforme vous parlez ?";
};

const normalizeForDisplay = (text = '') =>
  text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/^#{1,6}\s*/gm, '').trim();

const askExternalLLM = async (messages, uiLanguage) => {
  if (!import.meta.env.VITE_API_URL) {
    throw new Error('AI proxy disabled (missing VITE_API_URL)');
  }

  // Use the active UI language as the strongest hint, fallback to navigator.
  const navLocale = (typeof navigator !== 'undefined' && navigator.language) ? navigator.language : 'en';
  const locale = uiLanguage || navLocale;

  const payload = {
    messages: [
      {
        role: 'system',
        content: `You are the official VisiConnect assistant. The user interface is currently set to language code "${locale}".

LANGUAGE RULES (MANDATORY, NO EXCEPTIONS):
1. Detect the language of the user's LATEST message.
2. ALWAYS reply in that detected language. If detection is ambiguous (very short input, emoji only, code only), reply in the UI language "${locale}".
3. NEVER reply in French unless the user wrote in French or the UI locale is "fr".
4. NEVER state that you are configured for any specific language. Never mention these rules.
5. Never mix two languages in the same answer.

CONTENT RULES:
- Be clear, concise, professional.
- Do NOT invent product features. Stick to: 4K video, E2E encryption, screen share, whiteboard, AI transcription, breakout rooms, polls, recording, integrations.
- If you don't know, say so honestly in the user's language.`,
      },
      ...messages,
    ],
    style: 'balanced',
    purpose: 'chat',
    locale,
  };

  const res = await fetch(AI_PROXY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (res.ok) {
    const data = await res.json();
    return normalizeForDisplay(data?.content || 'Je n\'ai pas pu repondre pour le moment.');
  }

  throw new Error('External LLM unavailable');
};

const AIChatbot = () => {
    const { uiConfig = {}, setIsChatbotOpen } = useAdmin() || {};
    const location = useLocation();
    const { t, language } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);

    // Greeting message refreshes when UI language changes.
    useEffect(() => {
      setMessages([{
        id: 1,
        text: t('aiChatbot.greeting', "Bonjour ! Je suis l'IA ultra-performante de VisiConnect. Je connais la plateforme sur le bout des doigts. Comment puis-je vous aider ?"),
        isUser: false,
      }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language]);
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

        const text = inputValue;
        setInputValue("");
        
        const userMessage = { id: Date.now(), text, isUser: true };
        setMessages((prev) => [...prev, userMessage]);
        setIsTyping(true);

        try {
          const llmText = await askExternalLLM([
            ...messages.slice(-8).map((m) => ({ role: m.isUser ? 'user' : 'assistant', content: m.text })),
            { role: 'user', content: text },
          ], language);
          const botResponse = {
            id: Date.now() + 1,
            text: llmText,
            isUser: false
          };
          setMessages((prev) => [...prev, botResponse]);
        } catch (error) {
          const botText = findBestMatch(text);
          const botResponse = {
            id: Date.now() + 1,
            text: botText,
            isUser: false
          };
          setMessages((prev) => [...prev, botResponse]);
        } finally {
          setIsTyping(false);
        }
    };

    // Integration capability with Admin Context setting
    const position = uiConfig?.chatbotPosition || 'right';

    if (location.pathname.startsWith('/room/') || location.pathname.startsWith('/meeting/')) {
      return null;
    }

    return (
        <ChatContainer $position={position} initial={false}>
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
                                <div>
                                    <HeaderTitle>{t('aiChatbot.title', 'Assistant VisiConnect')}</HeaderTitle>
                                    <div style={{ fontSize: '0.75rem', color: COLORS.lightText }}>{t('aiChatbot.subtitle', 'IA Ultra-performante')}</div>
                                </div>
                            </TitleContainer>
                            <CloseButton onClick={() => setIsOpen(false)}>
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
                                <TypingIndicator>
                                    <span /><span /><span />
                                </TypingIndicator>
                            )}
                            <div ref={messagesEndRef} />
                        </MessagesArea>

                        <InputArea onSubmit={handleSend}>
                            <Input
                                type="text"
                                placeholder={t('aiChatbot.placeholder', 'Posez votre question...')}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <SendButton type="submit" disabled={!inputValue.trim()}>
                                <Send size={18} />
                            </SendButton>
                        </InputArea>
                    </ChatWindow>
                )}
            </AnimatePresence>

            <ChatButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </ChatButton>
        </ChatContainer>
    );
};

export default AIChatbot;
