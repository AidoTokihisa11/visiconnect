/**
 * v4: Premium FeaturesTabs i18n
 *  - slider.dashboard.{meetings,participants,avgDuration,weekly,monthly,yearly}
 *  - slider.studio.{mic,video,screen,chat,participants,leave}
 *  - slider.analytics.{engagement,retention,quality,realtime,live,participants}
 *  - slider.ariaTabs
 *  - Fix ES + CA: "Panel Intuitivo" (was "Dashboard Intuitivo")
 */
const fs = require('fs');
const path = require('path');

const I18N_DIR = path.join(__dirname, '..', 'src', 'i18n');

const data = {
  fr: {
    slider: {
      ariaTabs: 'Sections de fonctionnalités',
      dashboard: {
        meetings: 'Réunions',
        participants: 'Participants',
        avgDuration: 'Durée moy.',
        weekly: 'Hebdo.',
        monthly: 'Mensuel',
        yearly: 'Annuel',
      },
      studio: {
        mic: 'Micro',
        video: 'Caméra',
        screen: "Partage d'écran",
        chat: 'Chat',
        participants: 'Participants',
        leave: 'Quitter',
      },
      analytics: {
        engagement: 'Engagement',
        retention: 'Rétention',
        quality: 'Qualité',
        realtime: 'Temps réel',
        live: 'En direct',
        participants: 'Participants',
      },
    },
  },
  en: {
    slider: {
      title1: 'Intuitive Dashboard',
      desc1: 'Control your meetings in one click.',
      title2: 'Studio Mode',
      desc2: '4K quality without compromise.',
      title3: 'Analytics',
      desc3: 'Track engagement in real time.',
      ariaTabs: 'Feature sections',
      dashboard: {
        meetings: 'Meetings',
        participants: 'Participants',
        avgDuration: 'Avg. duration',
        weekly: 'Weekly',
        monthly: 'Monthly',
        yearly: 'Yearly',
      },
      studio: {
        mic: 'Microphone',
        video: 'Camera',
        screen: 'Screen share',
        chat: 'Chat',
        participants: 'Participants',
        leave: 'Leave',
      },
      analytics: {
        engagement: 'Engagement',
        retention: 'Retention',
        quality: 'Quality',
        realtime: 'Real time',
        live: 'Live',
        participants: 'Participants',
      },
    },
  },
  es: {
    slider: {
      title1: 'Panel Intuitivo',
      desc1: 'Controle sus reuniones con un clic.',
      title2: 'Modo Estudio',
      desc2: 'Calidad 4K sin compromiso.',
      title3: 'Analíticas',
      desc3: 'Siga la implicación en tiempo real.',
      ariaTabs: 'Secciones de funcionalidades',
      dashboard: {
        meetings: 'Reuniones',
        participants: 'Participantes',
        avgDuration: 'Duración media',
        weekly: 'Semanal',
        monthly: 'Mensual',
        yearly: 'Anual',
      },
      studio: {
        mic: 'Micrófono',
        video: 'Cámara',
        screen: 'Compartir pantalla',
        chat: 'Chat',
        participants: 'Participantes',
        leave: 'Salir',
      },
      analytics: {
        engagement: 'Implicación',
        retention: 'Retención',
        quality: 'Calidad',
        realtime: 'Tiempo real',
        live: 'En directo',
        participants: 'Participantes',
      },
    },
  },
  de: {
    slider: {
      ariaTabs: 'Feature-Bereiche',
      dashboard: {
        meetings: 'Meetings',
        participants: 'Teilnehmer',
        avgDuration: 'Ø Dauer',
        weekly: 'Wöchentlich',
        monthly: 'Monatlich',
        yearly: 'Jährlich',
      },
      studio: {
        mic: 'Mikrofon',
        video: 'Kamera',
        screen: 'Bildschirm teilen',
        chat: 'Chat',
        participants: 'Teilnehmer',
        leave: 'Verlassen',
      },
      analytics: {
        engagement: 'Engagement',
        retention: 'Verbleib',
        quality: 'Qualität',
        realtime: 'Echtzeit',
        live: 'Live',
        participants: 'Teilnehmer',
      },
    },
  },
  ru: {
    slider: {
      ariaTabs: 'Разделы функций',
      dashboard: {
        meetings: 'Встречи',
        participants: 'Участники',
        avgDuration: 'Ср. длит.',
        weekly: 'Недели',
        monthly: 'Месяцы',
        yearly: 'Годы',
      },
      studio: {
        mic: 'Микрофон',
        video: 'Камера',
        screen: 'Демонстрация экрана',
        chat: 'Чат',
        participants: 'Участники',
        leave: 'Выйти',
      },
      analytics: {
        engagement: 'Вовлечённость',
        retention: 'Удержание',
        quality: 'Качество',
        realtime: 'В реальном времени',
        live: 'В эфире',
        participants: 'Участники',
      },
    },
  },
  ca: {
    slider: {
      title1: 'Panel Intuitiu',
      desc1: 'Controla les teves reunions amb un clic.',
      title2: 'Mode Estudi',
      desc2: 'Qualitat 4K sense compromisos.',
      title3: 'Analítiques',
      desc3: 'Segueix la implicació en temps real.',
      ariaTabs: 'Seccions de funcionalitats',
      dashboard: {
        meetings: 'Reunions',
        participants: 'Participants',
        avgDuration: 'Durada mitjana',
        weekly: 'Setmanal',
        monthly: 'Mensual',
        yearly: 'Anual',
      },
      studio: {
        mic: 'Micròfon',
        video: 'Càmera',
        screen: 'Compartir pantalla',
        chat: 'Xat',
        participants: 'Participants',
        leave: 'Surt',
      },
      analytics: {
        engagement: 'Implicació',
        retention: 'Retenció',
        quality: 'Qualitat',
        realtime: 'Temps real',
        live: 'En directe',
        participants: 'Participants',
      },
    },
  },
};

function deepMerge(target, source) {
  for (const k of Object.keys(source)) {
    if (source[k] && typeof source[k] === 'object' && !Array.isArray(source[k])) {
      target[k] = target[k] && typeof target[k] === 'object' ? target[k] : {};
      deepMerge(target[k], source[k]);
    } else {
      target[k] = source[k];
    }
  }
  return target;
}

for (const lang of Object.keys(data)) {
  const file = path.join(I18N_DIR, `${lang}.json`);
  const json = JSON.parse(fs.readFileSync(file, 'utf8'));
  deepMerge(json, data[lang]);
  fs.writeFileSync(file, JSON.stringify(json, null, 2) + '\n', 'utf8');
  console.log(`[i18n v4] ${lang}.json updated`);
}
console.log('[i18n v4] Done.');
