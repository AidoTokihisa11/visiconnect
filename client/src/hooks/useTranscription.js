/**
 * useTranscription - Hook React pour la transcription live
 *
 * Utilise Web Speech API (gratuit, côté client)
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { getTranscriptionService } from '../services/ai/TranscriptionService';

export const useTranscription = (options = {}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState([]);
  const [interimText, setInterimText] = useState('');
  const [error, setError] = useState(null);
  const [isSupported, setIsSupported] = useState(false);
  const serviceRef = useRef(null);

  // Initialisation
  useEffect(() => {
    // Vérifie le support
    const supported = !!(window.SpeechRecognition || window.webkitSpeechRecognition);
    setIsSupported(supported);

    if (!supported) {
      setError('Web Speech API non supportée par ce navigateur');
      return;
    }

    // Initialise le service
    const service = getTranscriptionService();
    const initialized = service.init({
      language: options.language || 'fr-FR',
      continuous: options.continuous ?? true,
      interimResults: true,
    });

    if (!initialized) {
      setError("Impossible d'initialiser la transcription");
      return;
    }

    // Configure les callbacks
    service
      .on('result', (entry, fullTranscript) => {
        setTranscript([...fullTranscript]);
        setInterimText('');
      })
      .on('interim', (text) => {
        setInterimText(text);
      })
      .on('error', (err) => {
        setError(err);
        // Ne pas arrêter l'écoute sur les erreurs temporaires
        if (!['no-speech', 'aborted', 'network'].includes(err)) {
          setIsListening(false);
        }
      })
      .on('end', () => {
        // La transcription peut se terminer naturellement
      });

    serviceRef.current = service;

    return () => {
      service.destroy();
    };
  }, [options.language, options.continuous]);

  // Démarre la transcription
  const start = useCallback(() => {
    if (!serviceRef.current) return;

    setError(null);
    const started = serviceRef.current.start();
    setIsListening(started);
  }, []);

  // Arrête la transcription
  const stop = useCallback(() => {
    if (!serviceRef.current) return;

    serviceRef.current.stop();
    setIsListening(false);
  }, []);

  // Toggle
  const toggle = useCallback(() => {
    if (isListening) {
      stop();
    } else {
      start();
    }
  }, [isListening, start, stop]);

  // Change la langue
  const setLanguage = useCallback((langCode) => {
    if (serviceRef.current) {
      serviceRef.current.setLanguage(langCode);
    }
  }, []);

  // Efface le transcript
  const clear = useCallback(() => {
    if (serviceRef.current) {
      serviceRef.current.clear();
    }
    setTranscript([]);
    setInterimText('');
  }, []);

  // Export le transcript
  const exportTranscript = useCallback((format = 'text') => {
    if (!serviceRef.current) return '';
    return serviceRef.current.export(format);
  }, []);

  // Texte brut de la session
  const getSessionText = useCallback(() => {
    return serviceRef.current?.getSessionText() || '';
  }, []);

  return {
    // État
    isListening,
    isSupported,
    transcript,
    interimText,
    error,

    // Actions
    start,
    stop,
    toggle,
    setLanguage,
    clear,
    exportTranscript,
    getSessionText,
  };
};

export default useTranscription;
