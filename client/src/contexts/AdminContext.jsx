import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useAuthUser } from '../hooks/useAuthUser';
import { useLanguage } from './LanguageContext';
import { debounce } from 'lodash';

const AdminContext = createContext();

const CONTENT_KEY = 'visiconnect_content';
const UI_CONFIG_KEY = 'visiconnect_ui_config';
const TRANSLATIONS_KEY = 'visiconnect_translations';
const DEFAULT_UI_CONFIG = {
    primaryColor: '#2563eb',
    secondaryColor: '#475569',
    chatbotPosition: 'right',
    backToTopPosition: 'right',
};

const readStorageJson = (key, fallback) => {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
    } catch {
        return fallback;
    }
};

const writeStorageJson = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
};

export const AdminProvider = ({ children }) => {
    const { user } = useAuthUser();
    const { language } = useLanguage();
    const isAdmin = user?.role === 'admin' || user?.email?.includes('admin');
    
    const [isLiveEdit, setIsLiveEdit] = useState(false);
    const [uiConfig, setUiConfig] = useState(DEFAULT_UI_CONFIG);

    const [contentMap, setContentMap] = useState({});
    const [translations, setTranslations] = useState({});
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    useEffect(() => {
        setContentMap(readStorageJson(CONTENT_KEY, {}));
        setUiConfig(readStorageJson(UI_CONFIG_KEY, DEFAULT_UI_CONFIG));
        setTranslations(readStorageJson(TRANSLATIONS_KEY, {}));
    }, []);

    const saveContent = useCallback(debounce((newMap) => {
        writeStorageJson(CONTENT_KEY, newMap);
    }, 500), []);

    useEffect(() => {
        return () => saveContent.cancel();
    }, [saveContent]);

    const updateContent = useCallback((key, value) => {
        setContentMap((prevMap) => {
            const nextMap = { ...prevMap, [key]: value };
            saveContent(nextMap);
            return nextMap;
        });
    }, [saveContent]);

    const updateUiConfig = useCallback((key, value) => {
        setUiConfig((prevConfig) => {
            const nextConfig = { ...prevConfig, [key]: value };
            writeStorageJson(UI_CONFIG_KEY, nextConfig);
            return nextConfig;
        });

        if (key === 'primaryColor') {
            document.documentElement.style.setProperty('--primary', value);
        }
    }, []);

    const updateTranslation = useCallback((key, value) => {
        const langKey = language ? `${language}:${key}` : key;
        setTranslations((prevTranslations) => {
            const nextTranslations = { ...prevTranslations, [langKey]: value };
            writeStorageJson(TRANSLATIONS_KEY, nextTranslations);
            return nextTranslations;
        });
    }, [language]);

    const t = useCallback((key, defaultValue) => {
        const langKey = language ? `${language}:${key}` : key;
        if (translations[langKey]) return translations[langKey];
        return defaultValue || key;
    }, [language, translations]);

    const toggleLiveEdit = useCallback(() => {
        setIsLiveEdit((previousValue) => !previousValue);
    }, []);

    const adminContextValue = useMemo(() => ({
        isAdmin,
        isLiveEdit,
        toggleLiveEdit,
        uiConfig,
        updateUiConfig,
        contentMap,
        updateContent,
        updateTranslation,
        t,
        isChatbotOpen,
        setIsChatbotOpen,
    }), [
        contentMap,
        isAdmin,
        isChatbotOpen,
        isLiveEdit,
        t,
        toggleLiveEdit,
        uiConfig,
        updateContent,
        updateTranslation,
        updateUiConfig,
    ]);

    return (
        <AdminContext.Provider value={adminContextValue}>
            {children}
        </AdminContext.Provider>
    );
};
