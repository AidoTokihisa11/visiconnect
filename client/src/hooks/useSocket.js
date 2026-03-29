import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || undefined; // undefined defaults to window.location
let globalSocket;
let socketConsumerCount = 0;

export const useSocket = (roomId, user) => {
  const [socket, setSocket] = useState(globalSocket);
  const hasUser = Boolean(user);
  const userId = user?.id;
  const userName = user?.name;

  useEffect(() => {
    if (!roomId || !hasUser) return;

    if (globalSocket) {
      setSocket(globalSocket);
      if (!globalSocket.connected) {
        globalSocket.connect();
      }
      socketConsumerCount += 1;
      return () => {
        socketConsumerCount = Math.max(0, socketConsumerCount - 1);
        if (socketConsumerCount === 0 && globalSocket) {
          globalSocket.disconnect();
          globalSocket = undefined;
        }
      };
    }

    globalSocket = io(SOCKET_URL, {
      path: '/socket.io', // Standard path, proxied by Vite
      query: { roomId, userId, username: userName },
      transports: ['websocket'],
      autoConnect: true,
    });

    socketConsumerCount += 1;
    setSocket(globalSocket);

    return () => {
      socketConsumerCount = Math.max(0, socketConsumerCount - 1);
      if (socketConsumerCount === 0 && globalSocket) {
        globalSocket.disconnect();
        globalSocket = undefined;
      }
    };
  }, [roomId, hasUser, userId, userName]);

  return socket;
};

