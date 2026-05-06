// Adds createMeetingModal.* keys across all 6 locales.
// Idempotent: deep-merges into existing namespace and writes back.

const fs = require('fs');
const path = require('path');

const I18N_DIR = path.join(__dirname, '..', 'src', 'i18n');
const LANGS = ['fr', 'en', 'es', 'de', 'ru', 'ca'];

const data = {
  fr: {
    createMeetingModal: {
      title: 'Créer une réunion',
      defaultTitle: 'Réunion VisiConnect',
      linkLabel: 'Lien :',
      sections: {
        general: {
          title: 'Informations générales',
          desc: 'Définissez les détails principaux de votre réunion',
        },
        datetime: {
          title: 'Date et heure',
          desc: 'Planifiez quand aura lieu votre réunion',
        },
        participants: {
          title: 'Participants',
          desc: 'Invitez des personnes à votre réunion',
        },
        advanced: {
          title: 'Paramètres avancés',
          desc: 'Configurez les options de votre réunion',
        },
      },
      fields: {
        title: 'Titre de la réunion',
        description: 'Description (optionnel)',
        date: 'Date',
        startTime: 'Heure de début',
        endTime: 'Heure de fin',
        quickSlots: 'Créneaux rapides',
        addParticipant: 'Ajouter un participant',
        meetingType: 'Type de réunion',
        maxParticipants: 'Nombre max de participants',
        recurringFrequency: 'Fréquence de répétition',
      },
      placeholders: {
        title: 'Ex: Réunion équipe marketing',
        description: 'Ajoutez une description, un ordre du jour...',
        email: 'email@exemple.com',
      },
      types: {
        video: 'Visioconférence',
        audio: 'Audio uniquement',
        webinar: 'Webinaire',
        hybrid: 'Hybride',
      },
      frequencies: {
        daily: 'Quotidienne',
        weekly: 'Hebdomadaire',
        monthly: 'Mensuelle',
        custom: 'Personnalisée',
      },
      toggles: {
        requireApproval: { label: 'Approbation requise', desc: 'Les participants doivent être approuvés avant de rejoindre' },
        allowRecording: { label: "Autoriser l'enregistrement", desc: "Permettre l'enregistrement de la réunion" },
        recurring: { label: 'Réunion récurrente', desc: 'Répéter cette réunion automatiquement' },
      },
      buttons: {
        add: 'Ajouter',
        cancel: 'Annuler',
        draft: 'Brouillon',
        start: 'Démarrer la réunion',
        copy: 'Copier',
        copied: 'Copié',
      },
      status: { invited: '✓ Invité', pending: 'En attente' },
      errors: { endBeforeStart: "L'heure de fin doit être après l'heure de début." },
    },
  },
  en: {
    createMeetingModal: {
      title: 'Create a meeting',
      defaultTitle: 'VisiConnect Meeting',
      linkLabel: 'Link:',
      sections: {
        general: { title: 'General information', desc: 'Define the main details of your meeting' },
        datetime: { title: 'Date and time', desc: 'Plan when your meeting takes place' },
        participants: { title: 'Participants', desc: 'Invite people to your meeting' },
        advanced: { title: 'Advanced settings', desc: 'Configure your meeting options' },
      },
      fields: {
        title: 'Meeting title',
        description: 'Description (optional)',
        date: 'Date',
        startTime: 'Start time',
        endTime: 'End time',
        quickSlots: 'Quick slots',
        addParticipant: 'Add participant',
        meetingType: 'Meeting type',
        maxParticipants: 'Max participants',
        recurringFrequency: 'Recurrence frequency',
      },
      placeholders: { title: 'E.g. Marketing team meeting', description: 'Add a description, agenda...', email: 'email@example.com' },
      types: { video: 'Video conference', audio: 'Audio only', webinar: 'Webinar', hybrid: 'Hybrid' },
      frequencies: { daily: 'Daily', weekly: 'Weekly', monthly: 'Monthly', custom: 'Custom' },
      toggles: {
        requireApproval: { label: 'Require approval', desc: 'Participants must be approved before joining' },
        allowRecording: { label: 'Allow recording', desc: 'Allow the meeting to be recorded' },
        recurring: { label: 'Recurring meeting', desc: 'Repeat this meeting automatically' },
      },
      buttons: { add: 'Add', cancel: 'Cancel', draft: 'Draft', start: 'Start meeting', copy: 'Copy', copied: 'Copied' },
      status: { invited: '✓ Invited', pending: 'Pending' },
      errors: { endBeforeStart: 'End time must be after start time.' },
    },
  },
  es: {
    createMeetingModal: {
      title: 'Crear una reunión',
      defaultTitle: 'Reunión VisiConnect',
      linkLabel: 'Enlace:',
      sections: {
        general: { title: 'Información general', desc: 'Defina los detalles principales de su reunión' },
        datetime: { title: 'Fecha y hora', desc: 'Planifique cuándo tendrá lugar su reunión' },
        participants: { title: 'Participantes', desc: 'Invite a personas a su reunión' },
        advanced: { title: 'Configuración avanzada', desc: 'Configure las opciones de su reunión' },
      },
      fields: {
        title: 'Título de la reunión',
        description: 'Descripción (opcional)',
        date: 'Fecha',
        startTime: 'Hora de inicio',
        endTime: 'Hora de fin',
        quickSlots: 'Horarios rápidos',
        addParticipant: 'Añadir participante',
        meetingType: 'Tipo de reunión',
        maxParticipants: 'Máx. participantes',
        recurringFrequency: 'Frecuencia de repetición',
      },
      placeholders: { title: 'Ej.: Reunión del equipo de marketing', description: 'Añada una descripción, una agenda...', email: 'correo@ejemplo.com' },
      types: { video: 'Videoconferencia', audio: 'Solo audio', webinar: 'Webinar', hybrid: 'Híbrido' },
      frequencies: { daily: 'Diaria', weekly: 'Semanal', monthly: 'Mensual', custom: 'Personalizada' },
      toggles: {
        requireApproval: { label: 'Aprobación requerida', desc: 'Los participantes deben ser aprobados antes de unirse' },
        allowRecording: { label: 'Permitir grabación', desc: 'Permitir la grabación de la reunión' },
        recurring: { label: 'Reunión recurrente', desc: 'Repetir esta reunión automáticamente' },
      },
      buttons: { add: 'Añadir', cancel: 'Cancelar', draft: 'Borrador', start: 'Iniciar reunión', copy: 'Copiar', copied: 'Copiado' },
      status: { invited: '✓ Invitado', pending: 'Pendiente' },
      errors: { endBeforeStart: 'La hora de fin debe ser posterior a la hora de inicio.' },
    },
  },
  de: {
    createMeetingModal: {
      title: 'Meeting erstellen',
      defaultTitle: 'VisiConnect-Meeting',
      linkLabel: 'Link:',
      sections: {
        general: { title: 'Allgemeine Informationen', desc: 'Legen Sie die wichtigsten Details Ihres Meetings fest' },
        datetime: { title: 'Datum und Uhrzeit', desc: 'Planen Sie, wann Ihr Meeting stattfindet' },
        participants: { title: 'Teilnehmer', desc: 'Laden Sie Personen zu Ihrem Meeting ein' },
        advanced: { title: 'Erweiterte Einstellungen', desc: 'Konfigurieren Sie die Optionen Ihres Meetings' },
      },
      fields: {
        title: 'Meeting-Titel',
        description: 'Beschreibung (optional)',
        date: 'Datum',
        startTime: 'Startzeit',
        endTime: 'Endzeit',
        quickSlots: 'Schnelle Zeitfenster',
        addParticipant: 'Teilnehmer hinzufügen',
        meetingType: 'Meeting-Typ',
        maxParticipants: 'Max. Teilnehmer',
        recurringFrequency: 'Wiederholungsfrequenz',
      },
      placeholders: { title: 'Z. B. Marketing-Team-Meeting', description: 'Fügen Sie eine Beschreibung, Tagesordnung hinzu...', email: 'email@beispiel.de' },
      types: { video: 'Videokonferenz', audio: 'Nur Audio', webinar: 'Webinar', hybrid: 'Hybrid' },
      frequencies: { daily: 'Täglich', weekly: 'Wöchentlich', monthly: 'Monatlich', custom: 'Benutzerdefiniert' },
      toggles: {
        requireApproval: { label: 'Genehmigung erforderlich', desc: 'Teilnehmer müssen vor dem Beitritt genehmigt werden' },
        allowRecording: { label: 'Aufzeichnung erlauben', desc: 'Aufzeichnung des Meetings erlauben' },
        recurring: { label: 'Wiederkehrendes Meeting', desc: 'Dieses Meeting automatisch wiederholen' },
      },
      buttons: { add: 'Hinzufügen', cancel: 'Abbrechen', draft: 'Entwurf', start: 'Meeting starten', copy: 'Kopieren', copied: 'Kopiert' },
      status: { invited: '✓ Eingeladen', pending: 'Ausstehend' },
      errors: { endBeforeStart: 'Die Endzeit muss nach der Startzeit liegen.' },
    },
  },
  ru: {
    createMeetingModal: {
      title: 'Создать встречу',
      defaultTitle: 'Встреча VisiConnect',
      linkLabel: 'Ссылка:',
      sections: {
        general: { title: 'Общая информация', desc: 'Определите основные детали вашей встречи' },
        datetime: { title: 'Дата и время', desc: 'Запланируйте, когда состоится ваша встреча' },
        participants: { title: 'Участники', desc: 'Пригласите людей на встречу' },
        advanced: { title: 'Расширенные настройки', desc: 'Настройте параметры вашей встречи' },
      },
      fields: {
        title: 'Название встречи',
        description: 'Описание (необязательно)',
        date: 'Дата',
        startTime: 'Время начала',
        endTime: 'Время окончания',
        quickSlots: 'Быстрые слоты',
        addParticipant: 'Добавить участника',
        meetingType: 'Тип встречи',
        maxParticipants: 'Макс. участников',
        recurringFrequency: 'Частота повторения',
      },
      placeholders: { title: 'Напр.: Встреча отдела маркетинга', description: 'Добавьте описание, повестку...', email: 'email@example.com' },
      types: { video: 'Видеоконференция', audio: 'Только аудио', webinar: 'Вебинар', hybrid: 'Гибридная' },
      frequencies: { daily: 'Ежедневно', weekly: 'Еженедельно', monthly: 'Ежемесячно', custom: 'Пользовательская' },
      toggles: {
        requireApproval: { label: 'Требуется одобрение', desc: 'Участники должны быть одобрены перед присоединением' },
        allowRecording: { label: 'Разрешить запись', desc: 'Разрешить запись встречи' },
        recurring: { label: 'Повторяющаяся встреча', desc: 'Автоматически повторять эту встречу' },
      },
      buttons: { add: 'Добавить', cancel: 'Отмена', draft: 'Черновик', start: 'Начать встречу', copy: 'Копировать', copied: 'Скопировано' },
      status: { invited: '✓ Приглашён', pending: 'Ожидание' },
      errors: { endBeforeStart: 'Время окончания должно быть позже времени начала.' },
    },
  },
  ca: {
    createMeetingModal: {
      title: 'Crear una reunió',
      defaultTitle: 'Reunió VisiConnect',
      linkLabel: 'Enllaç:',
      sections: {
        general: { title: 'Informació general', desc: 'Definiu els detalls principals de la vostra reunió' },
        datetime: { title: 'Data i hora', desc: 'Planifiqueu quan tindrà lloc la vostra reunió' },
        participants: { title: 'Participants', desc: 'Convideu persones a la vostra reunió' },
        advanced: { title: 'Configuració avançada', desc: 'Configureu les opcions de la vostra reunió' },
      },
      fields: {
        title: 'Títol de la reunió',
        description: 'Descripció (opcional)',
        date: 'Data',
        startTime: "Hora d'inici",
        endTime: 'Hora de fi',
        quickSlots: 'Franges ràpides',
        addParticipant: 'Afegir participant',
        meetingType: 'Tipus de reunió',
        maxParticipants: 'Màx. participants',
        recurringFrequency: 'Freqüència de repetició',
      },
      placeholders: { title: 'P. ex.: Reunió de l\'equip de màrqueting', description: 'Afegiu una descripció, una agenda...', email: 'correu@exemple.com' },
      types: { video: 'Videoconferència', audio: 'Només àudio', webinar: 'Webinar', hybrid: 'Híbrida' },
      frequencies: { daily: 'Diària', weekly: 'Setmanal', monthly: 'Mensual', custom: 'Personalitzada' },
      toggles: {
        requireApproval: { label: 'Aprovació requerida', desc: 'Els participants han de ser aprovats abans d\'unir-se' },
        allowRecording: { label: 'Permetre l\'enregistrament', desc: 'Permetre l\'enregistrament de la reunió' },
        recurring: { label: 'Reunió recurrent', desc: 'Repetir aquesta reunió automàticament' },
      },
      buttons: { add: 'Afegir', cancel: 'Cancel·lar', draft: 'Esborrany', start: 'Iniciar reunió', copy: 'Copiar', copied: 'Copiat' },
      status: { invited: '✓ Convidat', pending: 'Pendent' },
      errors: { endBeforeStart: 'L\'hora de fi ha de ser posterior a l\'hora d\'inici.' },
    },
  },
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
  // Validate
  try {
    JSON.parse(fs.readFileSync(file, 'utf8'));
    console.log(`[OK] ${lang}.json`);
  } catch (e) {
    console.error(`[FAIL] ${lang}.json — ${e.message}`);
  }
}
