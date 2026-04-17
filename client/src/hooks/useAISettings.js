/**
 * useAISettings - Hook React pour gérer les paramètres IA
 * 
 * Gère l'activation/désactivation des fonctionnalités IA
 * avec persistance localStorage
 */

import { useState, useCallback, useEffect, useMemo } from 'react';
import { 
  AISettingsStorage, 
  DEFAULT_AI_SETTINGS, 
  checkAICapabilities 
} from '../services/ai';

export const useAISettings = () => {
  const [settings, setSettings] = useState(DEFAULT_AI_SETTINGS);
  const [capabilities, setCapabilities] = useState({});

  // Charge les paramètres au montage
  useEffect(() => {
    setSettings(AISettingsStorage.get());
    setCapabilities(checkAICapabilities());
  }, []);

  // Met à jour un groupe de paramètres
  const updateSettings = useCallback((key, value) => {
    setSettings(prev => {
      const updated = { ...prev, [key]: { ...prev[key], ...value } };
      AISettingsStorage.set(updated);
      return updated;
    });
  }, []);

  // Toggle une fonctionnalité
  const toggleFeature = useCallback((key) => {
    setSettings(prev => {
      const updated = {
        ...prev,
        [key]: { ...prev[key], enabled: !prev[key]?.enabled },
      };
      AISettingsStorage.set(updated);
      return updated;
    });
  }, []);

  // Réinitialise aux valeurs par défaut
  const resetToDefaults = useCallback(() => {
    const defaults = AISettingsStorage.reset();
    setSettings(defaults);
  }, []);

  // Vérifie si une fonctionnalité est disponible ET activée
  const isFeatureEnabled = useCallback((key) => {
    return capabilities[key]?.available && settings[key]?.enabled;
  }, [capabilities, settings]);

  // Presets rapides
  const applyPreset = useCallback((presetName) => {
    const presets = {
      performance: {
        transcription: { enabled: false },
        backgroundBlur: { enabled: false },
        videoEnhancement: { enabled: false },
        translation: { enabled: false },
        noiseSuppression: { enabled: true, level: 'low' },
      },
      balanced: {
        transcription: { enabled: false, autoStart: false },
        backgroundBlur: { enabled: false },
        videoEnhancement: { enabled: true, preset: 'natural' },
        translation: { enabled: true, autoTranslate: false },
        noiseSuppression: { enabled: true, level: 'moderate' },
      },
      full: {
        transcription: { enabled: true, autoStart: true },
        backgroundBlur: { enabled: true, mode: 'blur', blurAmount: 10 },
        videoEnhancement: { enabled: true, preset: 'professional' },
        translation: { enabled: true, autoTranslate: true },
        noiseSuppression: { enabled: true, level: 'high' },
      },
    };

    if (presets[presetName]) {
      const updated = { ...DEFAULT_AI_SETTINGS };
      Object.keys(presets[presetName]).forEach(key => {
        updated[key] = { ...updated[key], ...presets[presetName][key] };
      });
      setSettings(updated);
      AISettingsStorage.set(updated);
    }
  }, []);

  // Calcule si le device est "lent" (mobile ou faible RAM)
  const isLowEndDevice = useMemo(() => {
    if (typeof navigator === 'undefined') return false;
    
    // Check mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent || ''
    );
    
    // Check RAM (si disponible)
    // @ts-ignore
    const lowRam = navigator.deviceMemory && navigator.deviceMemory < 4;
    
    // Check cores
    const lowCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    
    return isMobile || lowRam || lowCores;
  }, []);

  // Auto-désactive les features gourmandes sur devices lents
  const safeSettings = useMemo(() => {
    if (!isLowEndDevice) return settings;
    
    return {
      ...settings,
      backgroundBlur: { ...settings.backgroundBlur, enabled: false },
      videoEnhancement: { ...settings.videoEnhancement, enabled: false },
    };
  }, [settings, isLowEndDevice]);

  return {
    // État
    settings: safeSettings,
    rawSettings: settings,
    capabilities,
    isLowEndDevice,

    // Actions
    updateSettings,
    toggleFeature,
    resetToDefaults,
    applyPreset,
    isFeatureEnabled,

    // Raccourcis
    transcription: safeSettings.transcription,
    smartNotes: safeSettings.smartNotes,
    backgroundBlur: safeSettings.backgroundBlur,
    videoEnhancement: safeSettings.videoEnhancement,
    translation: safeSettings.translation,
    noiseSuppression: safeSettings.noiseSuppression,
  };
};

export default useAISettings;
