/**
 * useSmartNotes - Hook React pour la génération de résumés IA
 * 
 * Utilise OpenRouter avec modèles gratuits
 */

import { useState, useCallback, useRef } from 'react';
import { getSmartNotesService, FREE_MODELS } from '../services/ai/SmartNotesService';

export const useSmartNotes = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [summary, setSummary] = useState(null);
  const [actionItems, setActionItems] = useState([]);
  const [keyNotes, setKeyNotes] = useState(null);
  const [error, setError] = useState(null);
  const serviceRef = useRef(getSmartNotesService());

  // Génère un résumé de réunion
  const generateSummary = useCallback(async ({ transcript, chatMessages, meetingTitle, duration }) => {
    setIsGenerating(true);
    setError(null);

    try {
      const result = await serviceRef.current.generateMeetingSummary({
        transcript,
        chatMessages,
        meetingTitle,
        duration,
      });
      setSummary(result);
      return result;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  // Extrait les actions à faire
  const extractActions = useCallback(async (content) => {
    setIsGenerating(true);
    setError(null);

    try {
      const result = await serviceRef.current.extractActionItems(content);
      setActionItems(result.actions || []);
      return result;
    } catch (err) {
      setError(err.message);
      return { actions: [] };
    } finally {
      setIsGenerating(false);
    }
  }, []);

  // Génère les points clés
  const generateKeyNotes = useCallback(async (transcript) => {
    setIsGenerating(true);
    setError(null);

    try {
      const result = await serviceRef.current.generateKeyNotes(transcript);
      setKeyNotes(result);
      return result;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  // Exporte le résumé
  const exportSummary = useCallback((format = 'markdown') => {
    if (!summary) return null;
    return serviceRef.current.exportSummary(summary, format);
  }, [summary]);

  // Change le modèle IA
  const setModel = useCallback((model) => {
    serviceRef.current.setModel(model);
  }, []);

  // Télécharge le résumé
  const downloadSummary = useCallback((format = 'markdown') => {
    const content = exportSummary(format);
    if (!content) return;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reunion-${new Date().toISOString().slice(0, 10)}.${format === 'html' ? 'html' : 'md'}`;
    a.click();
    URL.revokeObjectURL(url);
  }, [exportSummary]);

  // Reset
  const reset = useCallback(() => {
    setSummary(null);
    setActionItems([]);
    setKeyNotes(null);
    setError(null);
  }, []);

  return {
    // État
    isGenerating,
    summary,
    actionItems,
    keyNotes,
    error,

    // Actions
    generateSummary,
    extractActions,
    generateKeyNotes,
    exportSummary,
    downloadSummary,
    setModel,
    reset,

    // Modèles disponibles
    availableModels: FREE_MODELS,
  };
};

export default useSmartNotes;
