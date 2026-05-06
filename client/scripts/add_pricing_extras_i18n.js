// Adds pricing.* keys (descriptions, ctas, hardcoded FR strings now in t() calls)
const fs = require('fs');
const path = require('path');

const I18N_DIR = path.join(__dirname, '..', 'src', 'i18n');
const LANGS = ['fr', 'en', 'es', 'de', 'ru', 'ca'];

const data = {
  fr: { pricing: {
    recommended: 'RECOMMANDÉ',
    perMonthPerUser: '/mois par utilisateur',
    subscribe: "S'abonner",
    plans: {
      starter: { description: 'Pour découvrir la plateforme sans engagement.', cta: 'Commencer Gratuit' },
      pro: { description: 'Pour les équipes agiles et les freelances.' },
      business: { description: 'Pour les organisations à grande échelle.' },
    },
    features: {
      screenShare: "Partage d'écran",
      recording: 'Enregistrement',
      aiTranscription: 'Transcriptions IA',
      upTo50: "Jusqu'à 50 participants",
      upTo200: "Jusqu'à 200 participants",
      unlimitedDuration: 'Durée illimitée',
      unlimitedStorage: 'Stockage illimité',
      cloud5gb: '5 Go de stockage Cloud',
      prioritySupport: 'Support Prioritaire',
      aiTranscription10h: 'Transcriptions IA (10h/mois)',
      ssoAdmin: 'SSO & Admin Avancé',
      unlimitedTranscriptions: 'Transcriptions Illimitées',
    },
  }},
  en: { pricing: {
    recommended: 'RECOMMENDED',
    perMonthPerUser: '/month per user',
    subscribe: 'Subscribe',
    plans: {
      starter: { description: 'To discover the platform with no commitment.', cta: 'Start Free' },
      pro: { description: 'For agile teams and freelancers.' },
      business: { description: 'For large-scale organizations.' },
    },
    features: {
      screenShare: 'Screen sharing',
      recording: 'Recording',
      aiTranscription: 'AI transcriptions',
      upTo50: 'Up to 50 participants',
      upTo200: 'Up to 200 participants',
      unlimitedDuration: 'Unlimited duration',
      unlimitedStorage: 'Unlimited storage',
      cloud5gb: '5 GB cloud storage',
      prioritySupport: 'Priority support',
      aiTranscription10h: 'AI transcriptions (10h/month)',
      ssoAdmin: 'SSO & Advanced Admin',
      unlimitedTranscriptions: 'Unlimited transcriptions',
    },
  }},
  es: { pricing: {
    recommended: 'RECOMENDADO',
    perMonthPerUser: '/mes por usuario',
    subscribe: 'Suscribirse',
    plans: {
      starter: { description: 'Para descubrir la plataforma sin compromiso.', cta: 'Empezar Gratis' },
      pro: { description: 'Para equipos ágiles y autónomos.' },
      business: { description: 'Para organizaciones a gran escala.' },
    },
    features: {
      screenShare: 'Compartir pantalla',
      recording: 'Grabación',
      aiTranscription: 'Transcripciones IA',
      upTo50: 'Hasta 50 participantes',
      upTo200: 'Hasta 200 participantes',
      unlimitedDuration: 'Duración ilimitada',
      unlimitedStorage: 'Almacenamiento ilimitado',
      cloud5gb: '5 GB de almacenamiento en la nube',
      prioritySupport: 'Soporte prioritario',
      aiTranscription10h: 'Transcripciones IA (10h/mes)',
      ssoAdmin: 'SSO y administración avanzada',
      unlimitedTranscriptions: 'Transcripciones ilimitadas',
    },
  }},
  de: { pricing: {
    recommended: 'EMPFOHLEN',
    perMonthPerUser: '/Monat pro Nutzer',
    subscribe: 'Abonnieren',
    plans: {
      starter: { description: 'Um die Plattform unverbindlich zu entdecken.', cta: 'Kostenlos starten' },
      pro: { description: 'Für agile Teams und Freelancer.' },
      business: { description: 'Für Großunternehmen.' },
    },
    features: {
      screenShare: 'Bildschirmfreigabe',
      recording: 'Aufzeichnung',
      aiTranscription: 'KI-Transkriptionen',
      upTo50: 'Bis zu 50 Teilnehmer',
      upTo200: 'Bis zu 200 Teilnehmer',
      unlimitedDuration: 'Unbegrenzte Dauer',
      unlimitedStorage: 'Unbegrenzter Speicher',
      cloud5gb: '5 GB Cloud-Speicher',
      prioritySupport: 'Priority-Support',
      aiTranscription10h: 'KI-Transkriptionen (10h/Monat)',
      ssoAdmin: 'SSO & erweiterte Verwaltung',
      unlimitedTranscriptions: 'Unbegrenzte Transkriptionen',
    },
  }},
  ru: { pricing: {
    recommended: 'РЕКОМЕНДУЕМ',
    perMonthPerUser: '/месяц на пользователя',
    subscribe: 'Подписаться',
    plans: {
      starter: { description: 'Откройте платформу без обязательств.', cta: 'Начать бесплатно' },
      pro: { description: 'Для гибких команд и фрилансеров.' },
      business: { description: 'Для крупных организаций.' },
    },
    features: {
      screenShare: 'Демонстрация экрана',
      recording: 'Запись',
      aiTranscription: 'ИИ-транскрипции',
      upTo50: 'До 50 участников',
      upTo200: 'До 200 участников',
      unlimitedDuration: 'Неограниченная длительность',
      unlimitedStorage: 'Неограниченное хранилище',
      cloud5gb: '5 ГБ облачного хранилища',
      prioritySupport: 'Приоритетная поддержка',
      aiTranscription10h: 'ИИ-транскрипции (10 ч/мес)',
      ssoAdmin: 'SSO и расширенное администрирование',
      unlimitedTranscriptions: 'Неограниченные транскрипции',
    },
  }},
  ca: { pricing: {
    recommended: 'RECOMANAT',
    perMonthPerUser: '/mes per usuari',
    subscribe: 'Subscriure\'s',
    plans: {
      starter: { description: 'Per descobrir la plataforma sense compromís.', cta: 'Començar gratis' },
      pro: { description: 'Per a equips àgils i autònoms.' },
      business: { description: 'Per a organitzacions a gran escala.' },
    },
    features: {
      screenShare: 'Compartir pantalla',
      recording: 'Enregistrament',
      aiTranscription: 'Transcripcions IA',
      upTo50: 'Fins a 50 participants',
      upTo200: 'Fins a 200 participants',
      unlimitedDuration: 'Durada il·limitada',
      unlimitedStorage: 'Emmagatzematge il·limitat',
      cloud5gb: '5 GB d\'emmagatzematge al núvol',
      prioritySupport: 'Suport prioritari',
      aiTranscription10h: 'Transcripcions IA (10h/mes)',
      ssoAdmin: 'SSO i administració avançada',
      unlimitedTranscriptions: 'Transcripcions il·limitades',
    },
  }},
};

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key] || typeof target[key] !== 'object') target[key] = {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

for (const lang of LANGS) {
  const file = path.join(I18N_DIR, `${lang}.json`);
  const json = JSON.parse(fs.readFileSync(file, 'utf8'));
  deepMerge(json, data[lang]);
  fs.writeFileSync(file, JSON.stringify(json, null, 2) + '\n', 'utf8');
  try { JSON.parse(fs.readFileSync(file, 'utf8')); console.log(`[OK] ${lang}.json`); }
  catch (e) { console.error(`[FAIL] ${lang}.json — ${e.message}`); }
}
