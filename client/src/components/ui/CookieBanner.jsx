import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Check, X, Settings, ChevronDown, ChevronUp, ToggleRight, ToggleLeft } from 'lucide-react';
import { useCookieConsent } from '../../contexts/CookieConsentContext';

export const CookieBanner = () => {
  const { showBanner, acceptAll, rejectAll, saveCustomChoices } = useCookieConsent();
  const [showDetails, setShowDetails] = useState(false);

  // States for toggling individual categories
  const [preferences, setPreferences] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const handleSaveCustom = () => {
    saveCustomChoices({ preferences, analytics, marketing });
  };

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
          <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl w-full max-w-4xl p-5 md:p-6 pointer-events-auto flex flex-col gap-6">

            {/* Haut de la modale */}
            <div className="flex flex-col md:flex-row gap-6 items-center">
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
                    Nous utilisons des cookies pour assurer le bon fonctionnement du site, personnaliser votre expérience et analyser notre trafic. Vous pouvez choisir d'accepter ou de configurer vos préférences ci-dessous.
                    <a href="/privacy" className="text-blue-600 hover:underline ml-1 font-medium z-10 relative">En savoir plus.</a>
                  </p>
                </div>
              </div>

              {/* Boutons d'Action Principaux */}
              {!showDetails && (
                <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3 flex-shrink-0 relative z-10">
                  <button
                    onClick={() => setShowDetails(true)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors flex items-center justify-center gap-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                  >
                    <Settings size={16} />
                    Personnaliser
                  </button>
                  <button
                    onClick={rejectAll}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors flex items-center justify-center gap-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                  >
                    <X size={16} />
                    Tout refuser
                  </button>
                  <button
                    onClick={acceptAll}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm shadow-blue-200 transition-all flex items-center justify-center gap-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <Check size={16} />
                    Tout Accepter
                  </button>
                </div>
              )}
            </div>

            {/* Section de personnalisation détaillée */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: "auto", opacity: 1, marginTop: "1rem" }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  className="overflow-hidden border-t border-slate-100 flex flex-col gap-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    {/* Catégorie Essentiel (Toujours Actif) */}
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-semibold text-slate-800 text-sm">Essentiels</h4>
                          <span className="text-xs font-medium text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">Toujours actifs</span>
                        </div>
                        <p className="text-xs text-slate-500">Nécessaires pour la connexion, la sécurité et le bon fonctionnement de la plateforme.</p>
                      </div>
                    </div>

                    {/* Catégorie Préférences */}
                    <div className="bg-white rounded-xl p-4 border border-slate-200 flex gap-4 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => setPreferences(!preferences)}>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-semibold text-slate-800 text-sm">Préférences</h4>
                          {preferences ? <ToggleRight size={24} className="text-blue-500" /> : <ToggleLeft size={24} className="text-slate-300" />}
                        </div>
                        <p className="text-xs text-slate-500">Mémorise vos choix visuels, vos agencements, ou la langue sélectionnée d'une visite à l'autre.</p>
                      </div>
                    </div>

                    {/* Catégorie Analytics */}
                    <div className="bg-white rounded-xl p-4 border border-slate-200 flex gap-4 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => setAnalytics(!analytics)}>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-semibold text-slate-800 text-sm">Statistiques</h4>
                          {analytics ? <ToggleRight size={24} className="text-blue-500" /> : <ToggleLeft size={24} className="text-slate-300" />}
                        </div>
                        <p className="text-xs text-slate-500">Nous aide à comprendre l'usage du site pour l'améliorer, en comptant les visites de manière anonymisée.</p>
                      </div>
                    </div>

                    {/* Catégorie Marketing */}
                    <div className="bg-white rounded-xl p-4 border border-slate-200 flex gap-4 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => setMarketing(!marketing)}>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-semibold text-slate-800 text-sm">Marketing</h4>
                          {marketing ? <ToggleRight size={24} className="text-blue-500" /> : <ToggleLeft size={24} className="text-slate-300" />}
                        </div>
                        <p className="text-xs text-slate-500">Cookies de ciblage utilisés par nos partenaires publicitaires.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setShowDetails(false)}
                      className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium transition-colors items-center justify-center gap-2 text-sm"
                    >
                      Retour
                    </button>
                    <button
                      onClick={handleSaveCustom}
                      className="px-5 py-2.5 rounded-xl border border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors items-center justify-center gap-2 text-sm"
                    >
                      Enregistrer ma sélection
                    </button>
                    <button
                      onClick={acceptAll}
                      className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-all"
                    >
                      Tout Accepter
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
