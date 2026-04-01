import { useCallback, useMemo, useRef, useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

export const useChat = (roomId, user, _socket) => {
  const [localMessages, setLocalMessages] = useState([]);
  const hasWarnedRef = useRef(false);

  let rawMessages = null;
  try {
    rawMessages = useQuery(api.messages.getByMeetingId, roomId ? { meetingId: roomId } : "skip");
  } catch (error) {
    if (!hasWarnedRef.current) {
      console.warn('Convex chat unavailable, using local fallback mode.', error);
      hasWarnedRef.current = true;
    }
    rawMessages = null;
  }
  const sendMessageMutation = useMutation(api.messages.send);
  const hasUser = Boolean(user);
  const userId = user?.id || 'anonymous';
  const userName = user?.name || 'Utilisateur';

  const messages = useMemo(() => {
    const source = Array.isArray(rawMessages) ? rawMessages : localMessages;
    if (!source) return [];
    return source.map(msg => ({
      _id: msg._id,
      roomId: msg.meetingId,
      sender: msg.senderName,
      senderId: msg.userId,
      text: msg.text,
      timestamp: new Date(msg.timestamp).toISOString(),
    }));
  }, [rawMessages, localMessages]);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || !hasUser || !roomId) return;

    try {
      await sendMessageMutation({
        meetingId: roomId,
        userId,
        senderName: userName,
        text: text.trim(),
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi du message via Convex:", error);
      setLocalMessages((prev) => [
        ...prev,
        {
          _id: `local-${Date.now()}`,
          meetingId: roomId,
          userId,
          senderName: userName,
          text: text.trim(),
          timestamp: Date.now(),
        },
      ]);
    }
  }, [roomId, hasUser, userId, userName, sendMessageMutation]);

  return { messages: messages || [], sendMessage };
};
