import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSafeLayout } from '../hooks/useSafeLayout';
import {
  Sparkles, Users, CheckCircle2, ArrowLeft, Send,
  Loader2, AlertCircle, Zap, Bug, Rocket,
} from 'lucide-react';

const PROFILES = [
  { value: '', label: 'Sélectionnez votre profil…', disabled: true },
  { value: 'student', label: 'Étudiant(e)' },
  { value: 'developer', label: 'Développeur / Tech' },
  { value: 'designer', label: 'Designer / Créatif' },
  { value: 'manager', label: 'Manager / Chef de projet' },
  { value: 'freelance', label: 'Freelance / Auto-entrepreneur' },
  { value: 'other', label: 'Autre' },
];

const USAGES = [
  { value: '', label: 'Comment comptez-vous l\'utiliser ?', disabled: true },
  { value: 'personal', label: 'Appels personnels (famille, amis)' },
  { value: 'professional', label: 'Réunions professionnelles' },
  { value: 'team', label: 'Travail en équipe / PME' },
  { value: 'education', label: 'Cours / Formation en ligne' },
];

const TOOLS = ['Zoom', 'Google Meet', 'Microsoft Teams', 'Discord', 'Whereby', 'Jitsi', 'Skype'];

const INFO_CARDS = [
  {
    icon: Bug,
    title: 'Ce qui s\'est passé',
    text: 'Des dizaines de sessions de test, des bugs documentés, des comportements inattendus remontés. Chaque retour a atterri directement dans mon backlog.',
  },
  {
    icon: Zap,
    title: 'Ce qui a été corrigé',
    text: 'Stabilité de connexion, gestion des erreurs d\'auth, comportements instables sur mobile. La plateforme est dans un bien meilleur état.',
  },
  {
    icon: Rocket,
    title: 'La Vague 2',
    text: 'Plus ciblée — 15 personnes choisies manuellement. Pas de code à saisir. Si tu es retenu(e), je te contacte directement par email.',
  },
];

export default function RoomPageNew() {
  const navigate = useNavigate();
  useSafeLayout();

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    profile: '', usage: '', tools: [], motivation: '',
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const update = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) setFieldErrors(prev => ({ ...prev, [field]: null }));
  };

  const toggleTool = (tool) => {
    setForm(prev => ({
      ...prev,
      tools: prev.tools.includes(tool)
        ? prev.tools.filter(t => t !== tool)
        : [...prev.tools, tool],
    }));
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Champ requis';
    if (!form.lastName.trim()) e.lastName = 'Champ requis';
    if (!form.email.trim()) {
      e.email = 'Email requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      e.email = 'Adresse email invalide';
    }
    if (!form.profile) e.profile = 'Sélectionnez un profil';
    if (!form.usage) e.usage = 'Sélectionnez un usage';
    if (form.motivation.trim().length < 40) e.motivation = 'Minimum 40 caractères';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/beta-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim().toLowerCase(),
          motivation: form.motivation.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur inattendue, veuillez réessayer.');
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase = 'w-full rounded-xl border px-4 py-3 text-sm text-slate-900 bg-white placeholder-slate-400 outline-none transition-all duration-150 focus:ring-2';
  const inputClass = (field) =>
    `${inputBase} ${fieldErrors[field]
      ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
      : 'border-slate-200 focus:border-blue-400 focus:ring-blue-100'
    }`;

  const motLen = form.motivation.length;

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[linear-gradient(180deg,#eff6ff_0%,#f8fbff_45%,#ffffff_100%)] px-4 py-12 sm:px-6 font-sans">

      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />
        <div className="absolute right-[-5rem] top-1/3 h-80 w-80 rounded-full bg-cyan-300/15 blur-3xl" />
        <div className="absolute bottom-[-6rem] left-1/3 h-80 w-80 rounded-full bg-blue-200/25 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, #2563eb 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl">

        {/* ── HERO ── */}
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            className="mb-12 text-center"
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 ring-4 ring-green-50">
              <CheckCircle2 className="h-9 w-9 text-green-500" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Candidature envoyée !
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-[16px] leading-7 text-slate-600">
              Merci <strong>{form.firstName}</strong>. J'ai bien reçu ta candidature — je te répondrai directement par email si tu es sélectionné(e) parmi les 15. Un email de confirmation a été envoyé à <strong>{form.email}</strong>.
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm text-slate-400">
              La sélection se fait dans les prochains jours. À très vite peut-être !
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-slate-800"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour à l'accueil
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-700">
              <Sparkles className="h-3.5 w-3.5" />
              Phase bêta I — terminée
            </span>
            <h1 className="text-4xl font-bold tracking-[-0.04em] text-slate-950 sm:text-[3rem] lg:text-[3.5rem]">
              Merci à vous.<br />Vraiment.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-8 text-slate-600 sm:text-[17px]">
              La première vague est terminée. Honnêtement, je ne savais pas trop à quoi m'attendre quand j'ai envoyé les premiers codes. Vous avez testé, cassé des trucs, signalé des bugs que je n'aurais jamais trouvés seul — c'est exactement ce qu'il me fallait pour avancer sérieusement.
            </p>
          </motion.div>
        )}

        {!submitted && (
          <>
            {/* ── INFO CARDS ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="mb-10 grid gap-4 sm:grid-cols-3"
            >
              {INFO_CARDS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.15 + i * 0.07 }}
                    className="rounded-2xl border border-blue-100 bg-white/80 p-5 shadow-[0_8px_30px_rgba(37,99,235,0.07)] backdrop-blur-sm"
                  >
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-1.5 text-sm font-semibold text-slate-900">{item.title}</h3>
                    <p className="text-[13px] leading-[1.65] text-slate-500">{item.text}</p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* ── APPLICATION FORM ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="overflow-hidden rounded-3xl border border-blue-100 bg-white/90 shadow-[0_32px_80px_rgba(37,99,235,0.12)] backdrop-blur-xl"
            >
              {/* Form header */}
              <div className="relative border-b border-blue-50 bg-[linear-gradient(135deg,#eff6ff,#f8faff)] px-6 py-7 sm:px-10">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent" />
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                      Participer à la Vague 2
                    </h2>
                    <p className="mt-1.5 max-w-md text-sm leading-6 text-slate-500">
                      Je cherche 15 personnes motivées pour tester la prochaine version. Je lis chaque candidature moi-même et je réponds personnellement.
                    </p>
                  </div>
                  <div className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
                    <Users className="h-4 w-4" />
                    <span>15 places</span>
                  </div>
                </div>
              </div>

              {/* Form body */}
              <form onSubmit={handleSubmit} noValidate className="px-6 py-8 sm:px-10">

                {/* Prénom + Nom */}
                <div className="mb-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Prénom <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Alice"
                      value={form.firstName}
                      onChange={e => update('firstName', e.target.value)}
                      className={inputClass('firstName')}
                      autoComplete="given-name"
                    />
                    {fieldErrors.firstName && <p className="mt-1 text-xs text-red-500">{fieldErrors.firstName}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Nom <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Dupont"
                      value={form.lastName}
                      onChange={e => update('lastName', e.target.value)}
                      className={inputClass('lastName')}
                      autoComplete="family-name"
                    />
                    {fieldErrors.lastName && <p className="mt-1 text-xs text-red-500">{fieldErrors.lastName}</p>}
                  </div>
                </div>

                {/* Email */}
                <div className="mb-5">
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="alice@example.com"
                    value={form.email}
                    onChange={e => update('email', e.target.value)}
                    className={inputClass('email')}
                    autoComplete="email"
                  />
                  {fieldErrors.email && <p className="mt-1 text-xs text-red-500">{fieldErrors.email}</p>}
                </div>

                {/* Profil + Usage */}
                <div className="mb-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Votre profil <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={form.profile}
                      onChange={e => update('profile', e.target.value)}
                      className={`${inputClass('profile')} cursor-pointer`}
                    >
                      {PROFILES.map(p => (
                        <option key={p.value} value={p.value} disabled={p.disabled}>{p.label}</option>
                      ))}
                    </select>
                    {fieldErrors.profile && <p className="mt-1 text-xs text-red-500">{fieldErrors.profile}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Usage prévu <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={form.usage}
                      onChange={e => update('usage', e.target.value)}
                      className={`${inputClass('usage')} cursor-pointer`}
                    >
                      {USAGES.map(u => (
                        <option key={u.value} value={u.value} disabled={u.disabled}>{u.label}</option>
                      ))}
                    </select>
                    {fieldErrors.usage && <p className="mt-1 text-xs text-red-500">{fieldErrors.usage}</p>}
                  </div>
                </div>

                {/* Outils */}
                <div className="mb-5">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Quels outils utilisez-vous déjà ?{' '}
                    <span className="font-normal text-slate-400">(facultatif)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {TOOLS.map(tool => {
                      const selected = form.tools.includes(tool);
                      return (
                        <button
                          key={tool}
                          type="button"
                          onClick={() => toggleTool(tool)}
                          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-150 ${
                            selected
                              ? 'border-blue-500 bg-blue-600 text-white shadow-sm'
                              : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-700'
                          }`}
                        >
                          {tool}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Motivation */}
                <div className="mb-7">
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-700">
                      Pourquoi veux-tu tester VisioConnect ? <span className="text-red-500">*</span>
                    </label>
                    <span className={`text-xs tabular-nums ${motLen >= 40 ? 'text-green-600' : 'text-slate-400'}`}>
                      {motLen} / 40 min.
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    placeholder="Dis-moi en quelques mots ce qui t'intéresse dans VisioConnect, ce que tu cherches dans une appli de visio, ou simplement pourquoi tu veux participer…"
                    value={form.motivation}
                    onChange={e => update('motivation', e.target.value)}
                    className={`${inputClass('motivation')} resize-none`}
                  />
                  {fieldErrors.motivation && <p className="mt-1 text-xs text-red-500">{fieldErrors.motivation}</p>}
                </div>

                {/* Submit error */}
                {submitError && (
                  <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                    <p className="text-sm text-red-600">{submitError}</p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 disabled:translate-y-0"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Envoi en cours…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Envoyer ma candidature
                    </>
                  )}
                </button>

                <p className="mt-4 text-center text-[12px] text-slate-400">
                  Tes données ne sont utilisées que pour la sélection bêta et ne seront jamais partagées.
                </p>
              </form>
            </motion.div>

            {/* ── FOOTER ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="mt-8 flex flex-col items-center gap-4"
            >
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour à l'accueil
              </button>
              <p className="text-[12px] text-slate-400">
                © 2026 VisioConnect — Fait avec soin par Théo Garcès
              </p>
            </motion.div>
          </>
        )}

      </div>
    </div>
  );
}
