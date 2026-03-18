import { useState, useEffect, useCallback, useRef } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useAuth } from '../contexts/AuthContext';

export const useWhiteboard = (socket, roomId) => {
  // socket argument is ignored
  const { user } = useAuth();
  
  const [elements, setElements] = useState([]);
  const [appState, setAppState] = useState({});
  const excalidrawRef = useRef(null);

  // Queries Convex
  const whiteboardData = useQuery(api.whiteboard.getWhiteboard, roomId ? { meetingId: roomId } : "skip");
  const cursorsData = useQuery(api.whiteboard.getCursors, roomId ? { meetingId: roomId } : "skip");
  
  // Mutations Convex
  const updateWhiteboardMutation = useMutation(api.whiteboard.updateWhiteboard);
  const updateCursorMutation = useMutation(api.whiteboard.updateCursor);

  // Synchronisation entrante (Remote -> Local)
  useEffect(() => {
    if (whiteboardData && excalidrawRef.current) {
        try {
            const parsedElements = JSON.parse(whiteboardData.elements);
            const parsedAppState = JSON.parse(whiteboardData.appState);
            
            excalidrawRef.current.updateScene({
                elements: parsedElements,
                appState: parsedAppState
            });
            
            setElements(parsedElements);
            setAppState(parsedAppState);
        } catch (e) {
            console.error("Failed to parse whiteboard data", e);
        }
    }
  }, [whiteboardData]);

  // Synchronisation des curseurs
  const collaborators = new Map();
  if (cursorsData) {
      cursorsData.forEach(cursor => {
          if (user && cursor.userId !== user.id) {
            try {
              collaborators.set(cursor.userId, JSON.parse(cursor.pointer));
            } catch (e) {}
          }
      });
  }

  // Synchronisation sortante (Local -> Remote)
  const onChange = useCallback((newElements, newAppState) => {
    if (!roomId) return;
    
    setElements(newElements);
    setAppState(newAppState);

    // TODO: Add throttling/debouncing to avoid spamming the DB in production
    updateWhiteboardMutation({
      meetingId: roomId,
      elements: JSON.stringify(newElements),
      appState: JSON.stringify(newAppState)
    }).catch(console.error);
    
  }, [roomId, updateWhiteboardMutation]);

  const onPointerUpdate = useCallback((payload) => {
      if (!roomId || !user?.id) return;
      
      updateCursorMutation({
          meetingId: roomId,
          userId: user.id || "anonymous",
          pointer: JSON.stringify(payload.pointer)
      }).catch(() => {}); // Catch silent to avoid console spam on rapid movement
  }, [roomId, user, updateCursorMutation]);
  return {
    elements,
    appState,
    collaborators,
    onChange,
    onPointerUpdate,
    excalidrawRef
  };
};
