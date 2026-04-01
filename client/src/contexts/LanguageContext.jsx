import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
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
    const [language, setLanguage] = useState(translationService.getCurrentLanguage());

    useEffect(() => {
        const onLanguageChanged = (event) => {
            const nextLanguage = event?.detail?.language;
            if (!nextLanguage) return;
            setLanguage(nextLanguage);
        };

        window.addEventListener('languageChanged', onLanguageChanged);
        translationService.loadTranslations();

        return () => {
            window.removeEventListener('languageChanged', onLanguageChanged);
        };
    }, []);

    const contextValue = useMemo(() => ({
        language,
        currentLanguage: language,
        changeLanguage: (nextLanguage) => translationService.setLanguage(nextLanguage),
        t: (translationKey, params) => translationService.t(translationKey, params),
        availableLanguages: translationService.getAvailableLanguages(),
        formatDate: (date, options) => translationService.formatDate(date, options),
        formatNumber: (number, options) => translationService.formatNumber(number, options),
        formatCurrency: (amount, currency) => translationService.formatCurrency(amount, currency),
    }), [language]);

    return (
        <LanguageContext.Provider value={contextValue}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageContext;
