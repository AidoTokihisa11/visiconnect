import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Sparkles, FileText, Download, Wand2, Loader2, ListTodo, Key } from 'lucide-react';
import { ROOM_THEME as THEME } from '../../styles/roomTheme';
import { getSmartNotesService } from '../../services/ai';
import { useTranslation } from '../../hooks/useTranslation';

// API route - uses relative path for Vercel serverless functions
const AI_PROXY_URL = '/api/ai/chat';

const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  background: ${THEME.panelBg};
`;

const ChatHistory = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MessageBubble = styled(motion.div)`
  display: flex;
  justify-content: ${(props) => (props.$isAi ? 'flex-start' : 'flex-end')};
  gap: 0.75rem;
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${(props) => (props.$isAi ? THEME.accent : '#475569')};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const BubbleContent = styled.div`
  max-width: 85%;
  background: ${(props) => (props.$isAi ? THEME.accentSoft : THEME.accent)};
  border: 1px solid ${(props) => (props.$isAi ? THEME.border : THEME.accent)};
  color: ${(props) => (props.$isAi ? THEME.text : 'white')};
  padding: 0.85rem 0.95rem;
  border-radius: 12px;
  border-top-left-radius: ${(props) => (props.$isAi ? '0' : '12px')};
  border-top-right-radius: ${(props) => (!props.$isAi ? '0' : '12px')};
  font-size: 0.9rem;
  line-height: 1.5;
  white-space: pre-wrap;
`;

const InputArea = styled.div`
  padding: 0.9rem;
  background: ${THEME.cardBg};
  border-top: 1px solid ${THEME.border};
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  border: 1px solid ${THEME.border};
  border-radius: 9999px;
  padding: 0.75rem 1rem;
  background-color: ${THEME.bg};
  color: ${THEME.text};
  outline: none;
  font-size: 0.9rem;

  &::placeholder {
    color: ${THEME.textDim};
  }

  &:focus {
    border-color: ${THEME.accent};
    box-shadow: 0 0 0 3px ${THEME.ring};
  }
`;

const SendButton = styled.button`
  background: ${THEME.accent};
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
    background: ${THEME.accentHover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TopHint = styled.div`
  margin: 0.75rem 0.75rem 0;
  padding: 0.6rem 0.75rem;
  border-radius: 10px;
  border: 1px solid ${THEME.border};
  background: ${THEME.accentSoft};
  font-size: 0.78rem;
  color: ${THEME.textDim};
`;

const ActionRow = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.6rem 0.75rem 0;
`;

const ActionButton = styled.button`
  border: 1px solid ${THEME.border};
  background: ${THEME.accentSoft};
  color: ${THEME.text};
  border-radius: 8px;
  padding: 0.45rem 0.65rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;

  &:hover {
    background: ${THEME.accentSoft};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ThinkingContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: ${THEME.accentSoft};
  border: 1px solid ${THEME.border};
  border-radius: 12px;
  width: fit-content;
  margin-left: 2.75rem;
`;

const ThinkingText = styled.span`
  font-size: 0.85rem;
  color: ${THEME.textDim};
  font-style: italic;
`;

const SpinnerIcon = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${THEME.accent};
`;

const TypingIndicator = ({ label }) => (
  <ThinkingContainer
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
  >
    <SpinnerIcon
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    >
      <Loader2 size={16} />
    </SpinnerIcon>
    <ThinkingText>{label || "L'IA réfléchit..."}</ThinkingText>
  </ThinkingContainer>
);

const ErrorMessage = styled.div`
  padding: 10px 14px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 10px;
  color: #ef4444;
  font-size: 0.85rem;
  margin-left: 2.75rem;
`;

const localKnowledgeAnswer = (text, style) => {
  const q = text.toLowerCase();
  const concise = style === 'concise';
  const deep = style === 'deep';

  if (q.includes('camera') || q.includes('cam') || q.includes('resolution') || q.includes('4k')) {
    return concise
      ? 'Active la camera puis va dans Parametres > Video et laisse Qualite video maximale activee.'
      : `Pour maximiser la resolution: 1) active ta camera, 2) ouvre Parametres dans la barre du bas, 3) garde "Qualite video maximale" activee. Si ton materiel ne supporte pas 4K, le systeme bascule automatiquement en 1080p puis 720p.`;
  }

  if (q.includes('micro') || q.includes('son') || q.includes('audio')) {
    return concise
      ? 'Verifie ton micro systeme puis clique l’icone micro dans la barre du bas.'
      : 'Verifie les permissions navigateur, selectionne le bon micro dans les reglages systeme, puis bascule le bouton micro dans la room. Si le son coupe, reconnecte la room.';
  }

  if (q.includes('latence') || q.includes('lag') || q.includes('freeze')) {
    return deep
      ? 'Pour reduire la latence: utilise Ethernet, ferme les apps gourmandes, limite le partage d’ecran simultane, et verifie que le serveur LiveKit est proche geographiquement de tes utilisateurs.'
      : 'Pour reduire la latence: connexion filaire, moins d’apps ouvertes, et eviter trop de partage ecran simultane.';
  }

  if (q.includes('chat') || q.includes('message')) {
    return 'Le chat de room passe par Convex. Si tu vois une erreur, relance le backend Convex puis reconnecte la salle.';
  }

  if (q.includes('security') || q.includes('secur') || q.includes('chiffre')) {
    return 'La room affiche un mode securise et supporte des pratiques de durcissement. Pour un niveau enterprise, ajoute controle d’acces strict, rotation de tokens et audit logs.';
  }

  return deep
    ? 'Je peux t’aider sur: qualite video, camera/micro, latence, settings de room, Convex chat, et LiveKit. Pose une question precise (ex: "comment forcer la meilleure qualite camera ?").'
    : 'Je peux aider sur camera, audio, qualite, latence et settings room. Pose une question plus precise.';
};

const normalizeMarkdownForDisplay = (text = '') => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

const fetchLLMResponse = async (conversation, style, purpose = 'chat', locale = 'fr') => {
  const body = {
    messages: [
      ...conversation,
    ],
    style,
    purpose,
    locale,
  };

  const res = await fetch(AI_PROXY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error('AI proxy request failed');
  }

  const data = await res.json();
  return normalizeMarkdownForDisplay(data?.content || 'Je n’ai pas pu produire une reponse pour le moment.');
};

const localSummary = (roomMessages = []) => {
  const total = roomMessages.length;
  const latest = roomMessages.slice(-8);
  const bySpeaker = new Map();
  latest.forEach((m) => {
    const key = m.sender || 'Inconnu';
    bySpeaker.set(key, (bySpeaker.get(key) || 0) + 1);
  });

  const highlights = latest.slice(-5).map((m) => `- ${m.sender || 'Inconnu'}: ${m.text}`).join('\n');
  const participants = Array.from(bySpeaker.entries())
    .map(([name, count]) => `- ${name}: ${count} message(s)`)
    .join('\n');

  return `Resume de reunion\n\nVue d'ensemble\n- Messages analyses: ${total}\n- Extrait utilise: ${latest.length} derniers messages\n\nParticipants actifs\n${participants || '- Aucun participant detecte'}\n\nPoints recents\n${highlights || '- Aucun message recent'}\n\nActions suggerees\n- Valider les decisions mentionnees en reunion\n- Transformer les points ouverts en taches\n- Planifier une revue de suivi`;
};

const asMarkdownDownload = (markdown, roomId) => {
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const safeRoom = roomId || 'room';
  a.href = url;
  a.download = `resume-${safeRoom}-${Date.now()}.md`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

export const AIChatPanel = ({ responseStyle = 'balanced', roomMessages = [], roomId = 'room' }) => {
  const { t, language } = useTranslation();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: t('aiChatPanel.greeting', "Bonjour ! Je suis votre assistant VisiConnect. Posez-moi vos questions sur la vidéo, l'audio, les paramètres ou toute fonctionnalité de la room."),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [meetingSummary, setMeetingSummary] = useState('');
  const [aiError, setAiError] = useState(null);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue.trim();
    const userMsg = { id: Date.now(), sender: 'user', text: userText };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);
    setAiError(null);

    try {
      // Build conversation history for context
      const conversation = [...messages, userMsg]
        .slice(-10)
        .map((m) => ({ role: m.sender === 'ai' ? 'assistant' : 'user', content: m.text }));
      
      const aiText = await fetchLLMResponse(conversation, responseStyle, 'chat', language);
      setMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'ai', text: aiText }]);
    } catch (e) {
      console.error('[AIChatPanel] Error:', e);
      // Try local fallback first
      const fallback = localKnowledgeAnswer(userText, responseStyle);
      setMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'ai', text: fallback }]);
      setAiError(t('aiChatPanel.remoteUnavailable', "L'IA distante est momentanément indisponible. Réponse locale utilisée."));
      // Clear error after 5 seconds
      setTimeout(() => setAiError(null), 5000);
    } finally {
      setIsTyping(false);
    }
  };

  const generateMeetingSummary = async () => {
    if (isTyping) return;
    setIsTyping(true);
    setAiError(null);
    
    try {
      const latestRoomMessages = (roomMessages || []).slice(-50);

      // Fallback source: when no real meeting chat exists yet, use the local
      // AI-conversation history (excluding the bot welcome message + summary
      // status notices) so the user still gets a meaningful summary instead of
      // a dead-end "no messages" screen.
      let sourceMessages = latestRoomMessages;
      let usedFallbackSource = false;
      if (!sourceMessages.length) {
        const aiHistory = (messages || [])
          .filter((m) => m.text && !/^Aucun message|Résumé local|✨ Résumé/.test(m.text))
          .map((m) => ({
            sender: m.sender === 'ai' ? 'Assistant IA' : 'Vous',
            text: m.text,
            timestamp: m.id || Date.now(),
          }));
        if (aiHistory.length) {
          sourceMessages = aiHistory.slice(-50);
          usedFallbackSource = true;
        }
      }

      if (!sourceMessages.length) {
        const empty = t('aiChatPanel.summaryEmpty', '# Résumé de réunion\n\nDémarrez la conversation ou ouvrez le chat de la réunion : un résumé sera généré automatiquement dès qu\'il y aura du contenu à analyser.');
        setMeetingSummary(empty);
        setAiError(t('aiChatPanel.noContentToSummarize', "Aucun contenu à résumer pour l'instant."));
        setTimeout(() => setAiError(null), 4000);
        return;
      }

      try {
        // 🤖 Utilise SmartNotesService pour un résumé structuré
        const smartNotes = getSmartNotesService();
        const result = await smartNotes.generateMeetingSummary({
          chatMessages: sourceMessages,
          meetingTitle: `Réunion - ${new Date().toLocaleDateString('fr-FR')}`,
          duration: 'En cours',
        });
        
        setMeetingSummary(normalizeMarkdownForDisplay(result.summary));
        const note = usedFallbackSource
          ? `✨ Résumé généré à partir de la conversation IA (modèle ${result.model}).`
          : `✨ Résumé généré avec ${result.model}! Utilise le bouton Export Markdown pour le télécharger.`;
        setMessages((prev) => [...prev, { 
          id: Date.now(), 
          sender: 'ai', 
          text: note,
        }]);
      } catch (e) {
        console.warn('[AIChatPanel] SmartNotesService error, fallback to local:', e);
        // Fallback to local summary
        const summary = localSummary(sourceMessages);
        setMeetingSummary(summary);
        setAiError(t('aiChatPanel.localSummaryGenerated', 'Résumé local généré (IA distante indisponible)'));
        setTimeout(() => setAiError(null), 5000);
      }
    } catch (e) {
      const fallback = localSummary(roomMessages);
      setMeetingSummary(fallback);
      setAiError(t('aiChatPanel.localSummary', 'Résumé local généré.'));
      setTimeout(() => setAiError(null), 4000);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <PanelContainer>
      <TopHint>
        <Sparkles size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
        {t('aiChatPanel.subtitle', 'Assistant IA VisiConnect — GROQ + OpenRouter')}
      </TopHint>

      {aiError && (
        <ErrorMessage>
          {aiError}
        </ErrorMessage>
      )}

      <ActionRow>
        <ActionButton type='button' onClick={generateMeetingSummary} disabled={isTyping}>
          <Wand2 size={14} /> {t('aiChatPanel.autoSummary', 'Résumé auto')}
        </ActionButton>
        <ActionButton type='button' onClick={() => asMarkdownDownload(meetingSummary || localSummary(roomMessages), roomId)}>
          <Download size={14} /> {t('aiChatPanel.exportMarkdown', 'Export Markdown')}
        </ActionButton>
      </ActionRow>

      {meetingSummary && (
        <TopHint>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
            <FileText size={14} /> {t('aiChatPanel.summaryGenerated', 'Résumé généré')}
          </div>
          <div style={{ whiteSpace: 'pre-wrap' }}>{meetingSummary.slice(0, 380)}{meetingSummary.length > 380 ? '...' : ''}</div>
        </TopHint>
      )}

      <ChatHistory>
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              $isAi={msg.sender === 'ai'}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              {msg.sender === 'ai' && (
                <Avatar $isAi>
                  <Sparkles size={16} />
                </Avatar>
              )}
              <BubbleContent $isAi={msg.sender === 'ai'}>{msg.text}</BubbleContent>
              {msg.sender === 'user' && (
                <Avatar>
                  <User size={16} />
                </Avatar>
              )}
            </MessageBubble>
          ))}
        </AnimatePresence>
        {isTyping && <TypingIndicator label={t('aiChatPanel.thinking', "L'IA réfléchit...")} />}
        <div ref={chatEndRef} />
      </ChatHistory>

      <InputArea>
        <Input
          placeholder={t('aiChatPanel.inputPlaceholder', 'Pose une question technique ou produit...')}
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
