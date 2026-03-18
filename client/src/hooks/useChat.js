// client/src/hooks/useChat.js
import { useCallback, useMemo } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

export const useChat = (roomId, user, socket) => {
  // L'argument socket est ignoré car Convex remplace complètement les WebSockets natifs
  
  // Récupération réactive des messages depuis Convex
  const rawMessages = useQuery(api.messages.getByMeetingId, roomId ? { meetingId: roomId } : "skip");
  const sendMessageMutation = useMutation(api.messages.send);

  // Formatage des messages pour rester compatible avec l'ancienne UI
  const messages = useMemo(() => {
    if (!rawMessages) return [];
    return rawMessages.map(msg => ({
      _id: msg._id,
      roomId: msg.meetingId,
      sender: msg.senderName,
      senderId: msg.userId,
      text: msg.text,
      timestamp: new Date(msg.timestamp).toISOString(),
    }));
  }, [rawMessages]);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || !user || !roomId) return;

    try {
      await sendMessageMutation({
        meetingId: roomId,
        userId: user.id || "anonymous",
        senderName: user.name || "Utilisateur",
        text: text.trim(),
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi du message via Convex:", error);
    }
  }, [roomId, user, sendMessageMutation]);

  return { messages: messages || [], sendMessage };

};
