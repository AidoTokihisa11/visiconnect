import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSafeLayout } from '../hooks/useSafeLayout';
import { ArrowRight, Shield, AlertTriangle, Sparkles, Clock3, Video, Users } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export default function RoomPageNew() {
  const navigate = useNavigate();
  const { language } = useTranslation();
  
  // Apply SafeLayout for mobile viewport fixes (--vh CSS variable)
  useSafeLayout();
  const copyByLanguage = {
    fr: {
      badge: 'Programme beta termine',
      title: 'La premiere phase de beta test est maintenant terminee.',
      subtitle: 'Merci a toutes les personnes qui ont pris le temps de tester VisioConnect, de signaler les erreurs et de faire remonter des bugs concrets. Vos retours m ont permis de corriger, stabiliser et ameliorer la plateforme beaucoup plus vite.',
      relaunchLabel: 'Nouvelle vague d ici 1 semaine',
      relaunchText: 'Une nouvelle session beta ouvrira d ici environ une semaine. Cette fois, je selectionnerai moi-meme les participants afin de garder un groupe plus cible et un meilleur suivi.',
      thanksTitle: 'Merci pour votre aide',
      thanksText: 'Chaque retour, chaque bug remonte et chaque remarque utile ont directement contribue a ameliorer le code, l experience et la fiabilite globale du produit.',
      progressTitle: 'Ce qui a ete ameliore',
      progressText: 'Les retours recus m ont deja permis de corriger plusieurs problemes techniques, de nettoyer certains comportements instables et de preparer une version plus propre pour la suite.',
      selectionTitle: 'Selection manuelle',
      selectionText: 'La prochaine vague ne passera plus par un code a saisir sur cette page. Les personnes retenues seront contactees directement.',
      inactiveBanner: 'Le formulaire de code beta est desactive pour le moment.',
      cta: 'Retourner a l accueil',
      footer: 'VisioConnect continue d evoluer grace a votre participation.'
    },
    en: {
      badge: 'Beta program closed',
      title: 'The first beta testing phase is now over.',
      subtitle: 'Thank you to everyone who tested VisioConnect, reported issues, and shared concrete bugs. Your feedback helped me fix, stabilize, and improve the platform much faster.',
      relaunchLabel: 'New wave in about 1 week',
      relaunchText: 'A new beta session will open in about a week. This time, I will personally select participants to keep the group more focused and provide better follow-up.',
      thanksTitle: 'Thank you for helping',
      thanksText: 'Every report, every bug, and every useful note directly helped improve the code, the experience, and the overall reliability of the product.',
      progressTitle: 'What improved',
      progressText: 'The feedback already helped me fix several technical issues, clean up unstable behaviors, and prepare a sharper version for the next opening.',
      selectionTitle: 'Manual selection',
      selectionText: 'The next wave will no longer rely on a beta code on this page. Selected participants will be contacted directly.',
      inactiveBanner: 'The beta code form is currently disabled.',
      cta: 'Back to home',
      footer: 'VisioConnect keeps improving thanks to your participation.'
    }
  };

  const content = copyByLanguage[language] || copyByLanguage.fr;

  return (
    <div className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-[linear-gradient(180deg,_#eff6ff_0%,_#f8fbff_35%,_#ffffff_100%)] px-4 py-10 sm:px-6 lg:px-8 font-sans">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-blue-300/25 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="absolute right-[-4rem] top-1/4 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute bottom-[-5rem] left-1/3 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl"
        />
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle, #2563eb 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 w-full max-w-6xl"
      >
        <div className="overflow-hidden rounded-[32px] border border-blue-100 bg-white/85 shadow-[0_32px_90px_rgba(59,130,246,0.16)] backdrop-blur-xl">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative px-6 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.05 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-700"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {content.badge}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.12 }}
                className="max-w-2xl"
              >
                <h1 className="text-4xl font-bold leading-tight tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-[3.6rem]">
                  {content.title}
                </h1>
                <p className="mt-5 max-w-xl text-[15px] leading-7 text-slate-600 sm:text-[17px]">
                  {content.subtitle}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: 0.2 }}
                className="mt-8 flex flex-col gap-3 rounded-3xl border border-blue-100 bg-[linear-gradient(135deg,_rgba(239,246,255,0.95),_rgba(255,255,255,0.98))] p-5 sm:p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                    <Clock3 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">{content.relaunchLabel}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600 sm:text-[15px]">{content.relaunchText}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.28 }}
                className="mt-8 flex flex-col gap-4 sm:flex-row"
              >
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  {content.cta}
                  <ArrowRight className="h-4 w-4" />
                </button>
                <div className="inline-flex items-center gap-2 rounded-2xl border border-blue-100 bg-blue-50/70 px-4 py-3 text-sm font-medium text-slate-600">
                  <AlertTriangle className="h-4 w-4 text-blue-500" />
                  {content.inactiveBanner}
                </div>
              </motion.div>
            </div>

            <div className="border-t border-blue-100/80 bg-[linear-gradient(180deg,_rgba(239,246,255,0.92),_rgba(255,255,255,0.96))] px-6 py-8 sm:px-10 sm:py-10 lg:border-l lg:border-t-0 lg:px-10 lg:py-16">
              <div className="grid gap-4">
                {[
                  {
                    icon: Users,
                    title: content.thanksTitle,
                    text: content.thanksText
                  },
                  {
                    icon: Shield,
                    title: content.progressTitle,
                    text: content.progressText
                  },
                  {
                    icon: Video,
                    title: content.selectionTitle,
                    text: content.selectionText
                  }
                ].map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.16 + index * 0.08 }}
                      className="group relative overflow-hidden rounded-3xl border border-blue-100 bg-white/90 p-5 shadow-[0_18px_45px_rgba(37,99,235,0.08)]"
                    >
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold tracking-[-0.02em] text-slate-900">{item.title}</h2>
                          <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.45 }}
                className="mt-6 rounded-3xl border border-blue-100 bg-blue-950 px-6 py-5 text-blue-50 shadow-[0_20px_50px_rgba(15,23,42,0.22)]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">VisioConnect</p>
                    <p className="mt-1 text-sm leading-6 text-blue-50/85">{content.footer}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
