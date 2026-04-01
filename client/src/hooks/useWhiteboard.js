import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useAuth } from '../contexts/AuthContext';

export const useWhiteboard = (_socket, roomId) => {
  const { user } = useAuth();
  const userId = user?.id;
  
  const [elements, setElements] = useState([]);
  const [appState, setAppState] = useState({});
  const excalidrawRef = useRef(null);

  const whiteboardData = useQuery(api.whiteboard.getWhiteboard, roomId ? { meetingId: roomId } : "skip");
  const cursorsData = useQuery(api.whiteboard.getCursors, roomId ? { meetingId: roomId } : "skip");

  const updateWhiteboardMutation = useMutation(api.whiteboard.updateWhiteboard);
  const updateCursorMutation = useMutation(api.whiteboard.updateCursor);

  useEffect(() => {
    if (!whiteboardData || !excalidrawRef.current) return;

    try {
      const parsedElements = JSON.parse(whiteboardData.elements);
      const parsedAppState = JSON.parse(whiteboardData.appState);

      excalidrawRef.current.updateScene({
        elements: parsedElements,
        appState: parsedAppState,
      });

      setElements(parsedElements);
      setAppState(parsedAppState);
    } catch (parseError) {
      console.error('Failed to parse whiteboard data', parseError);
    }
  }, [whiteboardData]);

  const collaborators = useMemo(() => {
    if (!cursorsData || !userId) return new Map();

    const nextCollaborators = new Map();
    cursorsData.forEach((cursor) => {
      if (cursor.userId === userId) return;
      try {
        nextCollaborators.set(cursor.userId, JSON.parse(cursor.pointer));
      } catch {
      }
    });
    return nextCollaborators;
  }, [cursorsData, userId]);

  const onChange = useCallback((newElements, newAppState) => {
    if (!roomId) return;

    setElements(newElements);
    setAppState(newAppState);

    updateWhiteboardMutation({
      meetingId: roomId,
      elements: JSON.stringify(newElements),
      appState: JSON.stringify(newAppState),
    }).catch(console.error);
  }, [roomId, updateWhiteboardMutation]);

  const onPointerUpdate = useCallback((payload) => {
    if (!roomId || !userId) return;

    updateCursorMutation({
      meetingId: roomId,
      userId,
      pointer: JSON.stringify(payload.pointer),
    }).catch(() => {});
  }, [roomId, userId, updateCursorMutation]);

  return {
    elements,
    appState,
    collaborators,
    onChange,
    onPointerUpdate,
    excalidrawRef
  };
};
