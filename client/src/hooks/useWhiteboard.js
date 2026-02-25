import { useState, useEffect, useCallback, useRef } from 'react';
import { getSceneVersion } from '@excalidraw/excalidraw';

export const useWhiteboard = (socket, roomId) => {
  const [elements, setElements] = useState([]);
  const [appState, setAppState] = useState({});
  const [collaborators, setCollaborators] = useState(new Map());
  const excalidrawRef = useRef(null);

  // Sync with Socket.io
  useEffect(() => {
    if (!socket || !roomId) return;

    const handleSceneUpdate = (data) => {
      if (data.roomId !== roomId) return;
      
      // Update local state without triggering another emit
      if (excalidrawRef.current) {
         excalidrawRef.current.updateScene({
            elements: data.elements,
            appState: data.appState
         });
      }
    };

    const handlePointerUpdate = (data) => {
        if (data.roomId !== roomId) return;
        setCollaborators(prev => new Map(prev).set(data.socketId, data.pointer));
    };

    socket.on('whiteboard-update', handleSceneUpdate);
    socket.on('cursor-update', handlePointerUpdate);

    return () => {
      socket.off('whiteboard-update', handleSceneUpdate);
      socket.off('cursor-update', handlePointerUpdate);
    };
  }, [socket, roomId]);

  const onChange = useCallback((newElements, newAppState) => {
    // Basic throttling or debouncing should be added here in production
    if (!socket) return;
    
    // Only emit if changed (using version check or similar)
    // For now, simple emit
    socket.emit('whiteboard-update', {
      roomId,
      elements: newElements,
      appState: newAppState
    });
    
    setElements(newElements);
    setAppState(newAppState);
  }, [socket, roomId]);

  const onPointerUpdate = useCallback((payload) => {
      if (!socket) return;
      socket.emit('cursor-update', {
          roomId,
          ...payload
      });
  }, [socket, roomId]);

  return {
    elements,
    appState,
    collaborators,
    onChange,
    onPointerUpdate,
    excalidrawRef
  };
};
