import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newSocket = io('http://localhost:5003', {
      transports: ['websocket', 'polling']
    });

    newSocket.on('connect', () => {
      console.log('Connecté au serveur Socket.io');
      setConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Déconnecté du serveur Socket.io');
      setConnected(false);
    });

    newSocket.on('user-joined', (user) => {
      setUsers(prev => [...prev, user]);
    });

    newSocket.on('user-left', (userId) => {
      setUsers(prev => prev.filter(user => user.id !== userId));
    });

    newSocket.on('users-list', (usersList) => {
      setUsers(usersList);
    });

    newSocket.on('message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    newSocket.on('room-created', (roomData) => {
      console.log('Salle créée:', roomData);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const joinRoom = (roomId, userName) => {
    if (socket) {
      socket.emit('join-room', { roomId, userName });
    }
  };

  const leaveRoom = (roomId) => {
    if (socket) {
      socket.emit('leave-room', roomId);
    }
  };

  const sendMessage = (message) => {
    if (socket) {
      socket.emit('send-message', message);
    }
  };

  const createRoom = (roomName, userName) => {
    if (socket) {
      socket.emit('create-room', { roomName, userName });
    }
  };

  const value = {
    socket,
    connected,
    users,
    messages,
    joinRoom,
    leaveRoom,
    sendMessage,
    createRoom,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};
