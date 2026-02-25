import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '../config/supabase';

const SupabaseRealtimeContext = createContext();

export const useSupabaseRealtime = () => {
  const context = useContext(SupabaseRealtimeContext);
  if (!context) {
    throw new Error('useSupabaseRealtime must be used within a SupabaseRealtimeProvider');
  }
  return context;
};

export const SupabaseRealtimeProvider = ({ children }) => {
  const [channel, setChannel] = useState(null);
  const [connected, setConnected] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  // Track event listeners to properly manage subscriptions
  const [eventHandlers] = useState(new Map());

  // Subscribe to channel events
  const subscribeToEvent = useCallback((eventName, callback) => {
    if (!channel) return;

    // Store the handler
    const handlers = eventHandlers.get(eventName) || [];
    handlers.push(callback);
    eventHandlers.set(eventName, handlers);

    console.log(`📡 Subscribed to event: ${eventName}`);
  }, [channel, eventHandlers]);

  // Emit events via broadcast
  const emitEvent = useCallback((eventName, payload) => {
    if (!channel) {
      console.warn('⚠️ Cannot emit event, no active channel');
      return;
    }

    channel.send({
      type: 'broadcast',
      event: eventName,
      payload
    });

    console.log(`📤 Emitted event: ${eventName}`, payload);
  }, [channel]);

  // Join a room
  const joinRoom = useCallback(async (roomId, userName) => {
    try {
      // Unsubscribe from previous channel if exists
      if (channel) {
        await channel.unsubscribe();
        setChannel(null);
      }

      console.log(`🚪 Joining room: ${roomId} as ${userName}`);

      // Create a new channel for the room
      const newChannel = supabase.channel(`room:${roomId}`, {
        config: {
          broadcast: { self: true }, // Receive own broadcasts for testing
          presence: { key: userName }
        }
      });

      // Handle presence sync (users list)
      newChannel.on('presence', { event: 'sync' }, () => {
        const state = newChannel.presenceState();
        const userList = Object.keys(state).map(key => ({
          id: key,
          name: state[key][0]?.name || key,
          ...state[key][0]
        }));
        setUsers(userList);
        console.log('👥 Users in room:', userList);
      });

      // Handle user join
      newChannel.on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('✅ User joined:', key, newPresences);
        
        // Trigger user-joined event for WebRTC
        const handlers = eventHandlers.get('user-joined') || [];
        handlers.forEach(handler => handler(key));
      });

      // Handle user leave
      newChannel.on('presence', { event: 'leave' }, ({ key }) => {
        console.log('❌ User left:', key);
        
        // Trigger user-left event for WebRTC
        const handlers = eventHandlers.get('user-left') || [];
        handlers.forEach(handler => handler(key));
      });

      // Handle broadcast messages (chat, WebRTC signaling, etc.)
      newChannel.on('broadcast', { event: 'message' }, ({ payload }) => {
        console.log('💬 Message received:', payload);
        setMessages(prev => [...prev, payload]);
      });

      // WebRTC signaling events
      newChannel.on('broadcast', { event: 'offer' }, ({ payload }) => {
        console.log('📞 Offer received from:', payload.from);
        const handlers = eventHandlers.get('offer') || [];
        handlers.forEach(handler => handler(payload));
      });

      newChannel.on('broadcast', { event: 'answer' }, ({ payload }) => {
        console.log('📞 Answer received from:', payload.from);
        const handlers = eventHandlers.get('answer') || [];
        handlers.forEach(handler => handler(payload));
      });

      newChannel.on('broadcast', { event: 'ice-candidate' }, ({ payload }) => {
        console.log('🧊 ICE candidate received from:', payload.from);
        const handlers = eventHandlers.get('ice-candidate') || [];
        handlers.forEach(handler => handler(payload));
      });

      // Subscribe to the channel
      await newChannel.subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          console.log('✅ Connected to Supabase Realtime');
          setConnected(true);

          // Track presence
          await newChannel.track({
            name: userName,
            online_at: new Date().toISOString()
          });

          console.log(`✅ Tracking presence as: ${userName}`);
        }
      });

      setChannel(newChannel);
      setCurrentRoom(roomId);
    } catch (error) {
      console.error('❌ Error joining room:', error);
      setConnected(false);
    }
  }, [channel, eventHandlers]);

  // Leave a room
  const leaveRoom = useCallback(async () => {
    if (channel) {
      console.log('🚪 Leaving room:', currentRoom);
      await channel.unsubscribe();
      setChannel(null);
      setCurrentRoom(null);
      setUsers([]);
      setConnected(false);
    }
  }, [channel, currentRoom]);

  // Send a chat message
  const sendMessage = useCallback((message) => {
    emitEvent('message', message);
  }, [emitEvent]);

  // Create a room (just join it with a specific roomId)
  const createRoom = useCallback(async (roomName, userName) => {
    // Generate a room ID from the room name
    const roomId = roomName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    await joinRoom(roomId, userName);
  }, [joinRoom]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, [channel]);

  const value = {
    channel,
    connected,
    currentRoom,
    users,
    messages,
    joinRoom,
    leaveRoom,
    sendMessage,
    createRoom,
    subscribeToEvent,
    emitEvent,
  };

  return (
    <SupabaseRealtimeContext.Provider value={value}>
      {children}
    </SupabaseRealtimeContext.Provider>
  );
};
