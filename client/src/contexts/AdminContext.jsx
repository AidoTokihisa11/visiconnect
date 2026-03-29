import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuthUser } from '../hooks/useAuthUser';
import { useLanguage } from './LanguageContext';
import { debounce } from 'lodash';

const AdminContext = createContext();

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
    const isAdmin = user?.role === 'admin' || user?.email?.includes('admin'); // Simple check for now
    
    const [isLiveEdit, setIsLiveEdit] = useState(false);
    const [uiConfig, setUiConfig] = useState({
        primaryColor: '#2563eb',
        secondaryColor: '#475569',
        chatbotPosition: 'right', // 'left' | 'right'
        backToTopPosition: 'right', // 'left' | 'right'
    });

    const [contentMap, setContentMap] = useState({});
    const [translations, setTranslations] = useState({});
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        const storedContent = localStorage.getItem('visiconnect_content');
        const storedConfig = localStorage.getItem('visiconnect_ui_config');
        const storedTranslations = localStorage.getItem('visiconnect_translations');
        
        if (storedContent) setContentMap(JSON.parse(storedContent));
        if (storedConfig) setUiConfig(JSON.parse(storedConfig));
        if (storedTranslations) setTranslations(JSON.parse(storedTranslations));
    }, []);

    // Save to local storage
    const saveContent = useCallback(debounce((newMap) => {
        localStorage.setItem('visiconnect_content', JSON.stringify(newMap));
    }, 500), []);

    const updateContent = (key, value) => {
        const newMap = { ...contentMap, [key]: value };
        setContentMap(newMap);
        saveContent(newMap);
    };

    const updateUiConfig = (key, value) => {
        const newConfig = { ...uiConfig, [key]: value };
        setUiConfig(newConfig);
        localStorage.setItem('visiconnect_ui_config', JSON.stringify(newConfig));
        
        // Apply CSS variables
        if (key === 'primaryColor') {
            document.documentElement.style.setProperty('--primary', value);
        }
    };

    const updateTranslation = (key, value) => {
        const langKey = language ? `${language}:${key}` : key;
        const newTrans = { ...translations, [langKey]: value };
        setTranslations(newTrans);
        localStorage.setItem('visiconnect_translations', JSON.stringify(newTrans));
    };

    const t = (key, defaultValue) => {
        const langKey = language ? `${language}:${key}` : key;
        // Check for language-specific override first
        if (translations[langKey]) return translations[langKey];
        // Don't fall back to global key (old behavior) because it breaks other languages if the global key is in a specific language
        return defaultValue || key;
    };

    return (
        <AdminContext.Provider value={{
            isAdmin,
            isLiveEdit,
            toggleLiveEdit: () => setIsLiveEdit(prev => !prev),
            uiConfig,
            updateUiConfig,
            contentMap,
            updateContent,
            updateTranslation,
            t,
            isChatbotOpen,
            setIsChatbotOpen
        }}>
            {children}
        </AdminContext.Provider>
    );
};
