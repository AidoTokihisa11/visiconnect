import { useCallback, useMemo } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

export const useChat = (roomId, user) => {
  // useQuery suspends on loading — no try/catch wrapper needed
  const rawMessages = useQuery(
    api.messages.getByMeetingId,
    roomId ? { meetingId: roomId } : 'skip'
  );
  const sendMessageMutation = useMutation(api.messages.send);

  const userId = user?.id || 'anonymous';
  const userName = user?.name || 'Utilisateur';

  const messages = useMemo(() => {
    if (!Array.isArray(rawMessages)) return [];
    return rawMessages.map((msg) => ({
      _id: msg._id,
      roomId: msg.meetingId,
      sender: msg.senderName,
      senderId: msg.userId,
      text: msg.text,
      timestamp: new Date(msg.timestamp).toISOString(),
    }));
  }, [rawMessages]);

  const sendMessage = useCallback(
    async (text) => {
      if (!text.trim() || !user || !roomId) return;
      await sendMessageMutation({
        meetingId: roomId,
        userId,
        senderName: userName,
        text: text.trim(),
      });
    },
    [roomId, user, userId, userName, sendMessageMutation]
  );

  return { messages, sendMessage };
};
