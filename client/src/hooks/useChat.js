// client/src/hooks/useChat.js
import { useEffect, useCallback } from 'react';
import { useChatStore } from '../store/chatStore';

export const useChat = (roomId, user, socket) => {
  const { messages, addMessage, clearMessages } = useChatStore();

  useEffect(() => {
    if (!socket || !roomId || !user) return;

    // Handle Incoming Messages
    const handleMessage = (msg) => {
      addMessage(msg);
    };

    socket.on('receive-message', handleMessage);
    
    // Clear messages when switching rooms
    return () => {
      socket.off('receive-message', handleMessage);
    };
  }, [roomId, socket, addMessage]);

  useEffect(() => {
     return () => clearMessages();
  }, [clearMessages]);

  const sendMessage = useCallback((text) => {
    if (!socket || !text.trim() || !user) return;

    const messageData = {
      roomId,
      sender: user.name,
      senderId: user.id,
      text,
      timestamp: new Date().toISOString(),
    };
    
    // Optimistic UI update
    addMessage(messageData);

    socket.emit('send-message', messageData);
  }, [roomId, user, socket, addMessage]);

  return { messages, sendMessage };
};

