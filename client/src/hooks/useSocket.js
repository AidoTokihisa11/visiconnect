import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || undefined; // undefined defaults to window.location
let globalSocket;

export const useSocket = (roomId, user) => {
  const [socket, setSocket] = useState(globalSocket);

  useEffect(() => {
    if (globalSocket) {
        setSocket(globalSocket);
        if (roomId && !globalSocket.connected) {
            globalSocket.connect();
        }
        return;
    }
    
    if (!roomId || !user) return;

    globalSocket = io(SOCKET_URL, {
      path: '/socket.io', // Standard path, proxied by Vite
      query: { roomId, userId: user.id, username: user.name },
      transports: ['websocket'],
      autoConnect: true,
    });
    
    setSocket(globalSocket);
    
    return () => {
        // managing disconnect in a shared singleton way is tricky in hooks
        // for now let's just keep it alive
    };
  }, [roomId, user]);

  return socket;
};

