import React, { createContext, useContext, useState, useEffect } from 'react';
import translationService from '../i18n/translationService';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    // Current language state
    const [language, setLanguage] = useState(translationService.getCurrentLanguage());

    useEffect(() => {
        // Subscribe to language changes
        const handleLanguageChange = (event) => {
            if (event.detail && event.detail.language) {
                setLanguage(event.detail.language);
            }
        };

        window.addEventListener('languageChanged', handleLanguageChange);
        
        // Initial load check
        translationService.loadTranslations();

        return () => {
            window.removeEventListener('languageChanged', handleLanguageChange);
        };
    }, []);

    const value = {
        language,
        currentLanguage: language, // Add for compatibility
        changeLanguage: (lang) => translationService.setLanguage(lang),
        t: (key, params) => translationService.t(key, params),
        availableLanguages: translationService.getAvailableLanguages(),
        formatDate: (date, options) => translationService.formatDate(date, options),
        formatNumber: (number, options) => translationService.formatNumber(number, options),
        formatCurrency: (amount, currency) => translationService.formatCurrency(amount, currency)
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageContext;
