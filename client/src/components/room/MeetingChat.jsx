import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Send, User as UserIcon } from 'lucide-react';
import { ROOM_THEME as THEME } from '../../styles/roomTheme';

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${THEME.panelBg}; // slightly off-white for depth
`;

const MessagesArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background-color: ${THEME.border}; border-radius: 4px; }
`;

const MessageBubbleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* Style WhatsApp: MES messages à DROITE, autres à GAUCHE */
  align-items: ${(props) => (props.$isMe ? 'flex-end' : 'flex-start')};
  max-width: 100%;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const MessageSender = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${THEME.textDim};
  margin-bottom: 0.35rem;
  padding: 0 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const MessageBubble = styled.div`
  position: relative;
  max-width: 85%;
  padding: 0.85rem 1.15rem;
  font-size: 0.925rem;
  line-height: 1.5;
  /* MES messages: bleu, AUTRES: gris clair */
  color: ${(props) => (props.$isMe ? '#ffffff' : THEME.text)};
  background: ${(props) => (props.$isMe ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' : THEME.cardBg)};
  border: 1px solid ${(props) => (props.$isMe ? 'transparent' : '#e2e8f0')};
  border-radius: 16px;
  /* Coins arrondis style iMessage */
  border-bottom-right-radius: ${(props) => (props.$isMe ? '4px' : '16px')};
  border-bottom-left-radius: ${(props) => (props.$isMe ? '16px' : '4px')};
  box-shadow: ${(props) => (props.$isMe ? '0 4px 12px rgba(59, 130, 246, 0.3)' : '0 2px 6px rgba(0,0,0,0.04)')};
  word-break: break-word;
`;

const ChatInputContainer = styled.div`
  padding: 1rem 1.25rem 1.5rem;
  background-color: ${THEME.panelBg}; // slightly off-white for depth
  border-top: 1px solid ${THEME.border};
  
  @media (max-width: 768px) {
    padding: 0.75rem 1rem calc(env(safe-area-inset-bottom, 12px) + 0.75rem);
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  background-color: ${THEME.cardBg};
  border: 1px solid ${THEME.border};
  border-radius: 16px;
  padding: 0.4rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;

  &:focus-within {
    border-color: ${THEME.accent};
    box-shadow: 0 0 0 3px ${THEME.ring};
  }
`;

const ChatInput = styled.textarea`
  flex: 1;
  background: transparent;
  border: none;
  color: ${THEME.text};
  padding: 0.6rem 0.6rem;
  font-size: 0.95rem;
  outline: none;
  resize: none;
  max-height: 120px;
  min-height: 44px;
  line-height: 1.5;
  font-family: inherit;

  &::placeholder {
    color: ${THEME.textDim};
  }
`;

const SendButton = styled.button`
  background: ${(props) => (props.$active ? THEME.accent : THEME.accentSoft)};
  color: ${(props) => (props.$active ? '#ffffff' : THEME.textDim)};
  border: none;
  border-radius: 12px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.$active ? 'pointer' : 'default')};
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: ${(props) => (props.$active ? THEME.accentHover : THEME.accentSoft)};
    transform: ${(props) => (props.$active ? 'scale(1.05)' : 'none')};
    box-shadow: ${(props) => (props.$active ? '0 4px 12px rgba(0, 82, 204, 0.2)' : 'none')};
  }

  svg {
    width: 20px;
    height: 20px;
    transform: translateX(-1px) translateY(1px);
  }
`;

export const MeetingChat = ({ messages, messageText, setMessageText, onSendMessage, currentUserId }) => {
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (messageText.trim()) {
        onSendMessage();
        if (inputRef.current) inputRef.current.style.height = '44px';
      }
    }
  };

  const handleInput = (e) => {
    setMessageText(e.target.value);
    e.target.style.height = '44px';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  const formatTime = (dateObj) => {
    if (!dateObj) return '';
    try {
        const d = new Date(dateObj);
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
        return '';
    }
  };

  return (
    <ChatContainer>
      <MessagesArea ref={scrollRef}>
        {messages.length === 0 ? (
          <div style={{ textAlign: 'center', opacity: 0.7, marginTop: '2rem', fontSize: '0.9rem', color: THEME.textDim }}>
            Aucun message. Soyez le premier à écrire !
          </div>
        ) : (
          messages.map((msg, idx) => {
            // Détection correcte: comparer senderId avec currentUserId
            const isMe = msg.senderId === currentUserId || msg.sender === 'me';
            let displayName = msg.sender;
            if (isMe) displayName = 'Vous';
            else if (displayName && displayName.includes('@')) displayName = displayName.split('@')[0];

            return (
              <MessageBubbleWrapper key={idx} $isMe={isMe}>
                <MessageSender>
                  {!isMe && <UserIcon size={12} />}
                  {displayName || 'Anonyme'}
                  {msg.timestamp && <span style={{ opacity: 0.6, marginLeft: '6px', fontSize: '0.65rem', fontWeight: 'normal' }}>• {formatTime(msg.timestamp)}</span>}
                </MessageSender>
                <MessageBubble $isMe={isMe}>
                  {msg.text}
                </MessageBubble>
              </MessageBubbleWrapper>
            );
          })
        )}
      </MessagesArea>

      <ChatInputContainer>
        <InputWrapper>
          <ChatInput
            ref={inputRef}
            value={messageText}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Écrivez un message..."
            rows={1}
          />
          <SendButton 
            $active={messageText.trim().length > 0} 
            onClick={() => {
              if (messageText.trim()) {
                onSendMessage();
                if (inputRef.current) inputRef.current.style.height = '44px';
              }
            }}
          >
            <Send />
          </SendButton>
        </InputWrapper>
        <div style={{ width: '100%', textAlign: 'center', marginTop: '10px', fontSize: '11px', color: THEME.textDim }}>
          Appuyez sur Entrée pour envoyer
        </div>
      </ChatInputContainer>
    </ChatContainer>
  );
};