import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Check, X, Settings } from 'lucide-react';
import { useCookieConsent } from '../../contexts/CookieConsentContext';

export const CookieBanner = () => {
  const { showBanner, acceptAll, rejectAll } = useCookieConsent();

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 150, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6 flex justify-center items-end pointer-events-none"
        >
          <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl w-full max-w-4xl p-5 md:p-6 pointer-events-auto flex flex-col md:flex-row gap-6 items-center">
            
            {/* Texte et Infos */}
            <div className="flex-1 flex gap-4">
              <div className="hidden sm:flex h-12 w-12 bg-blue-50 text-blue-600 rounded-full items-center justify-center flex-shrink-0">
                <Shield size={24} />
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-1">
                  <Shield size={20} className="sm:hidden text-blue-600" />
                  Respect de votre vie privée
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Nous utilisons des cookies essentiels au fonctionnement de VisiConnect (connexion, sécurité). Avec votre accord, nous utilisons également des cookies analytiques pour comprendre comment notre site est utilisé et l'améliorer continuellement. 
                  <a href="/privacy" className="text-blue-600 hover:underline ml-1 font-medium z-10 relative">En savoir plus.</a>
                </p>
              </div>
            </div>

            {/* Boutons d'Action */}
            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3 flex-shrink-0 relative z-10">
              <button
                onClick={rejectAll}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors flex items-center justify-center gap-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                <X size={16} />
                Refuser
              </button>
              <button
                onClick={acceptAll}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm shadow-blue-200 transition-all flex items-center justify-center gap-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <Check size={16} />
                Accepter
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
