// Adds room.controls.*Label keys (intuitive icon labels under buttons)
const fs = require('fs');
const path = require('path');

const I18N_DIR = path.join(__dirname, '..', 'src', 'i18n');
const LANGS = ['fr', 'en', 'es', 'de', 'ru', 'ca'];

const data = {
  fr: { room: { controls: {
    micLabelOn: 'Micro', micLabelOff: 'Muet',
    cameraLabelOn: 'Caméra', cameraLabelOff: 'Cam off',
    screenShareLabel: 'Présenter', screenShareLabelOn: 'Arrêter', screenShareStop: 'Arrêter le partage',
    handLabel: 'Main',
    aiVideoLabel: 'IA vidéo',
    aiAssistantLabel: 'Assistant',
    aiFeaturesLabel: 'Outils IA',
    whiteboardLabel: 'Tableau',
    pollsLabel: 'Sondages',
    chatLabel: 'Chat',
    recordLabel: 'Enregistrer', recordingLabel: 'REC',
    settingsLabel: 'Réglages',
    statsLabel: 'Stats',
    leaveLabel: 'Quitter',
  }}},
  en: { room: { controls: {
    micLabelOn: 'Mic', micLabelOff: 'Muted',
    cameraLabelOn: 'Camera', cameraLabelOff: 'Cam off',
    screenShareLabel: 'Present', screenShareLabelOn: 'Stop', screenShareStop: 'Stop sharing',
    handLabel: 'Hand',
    aiVideoLabel: 'AI video',
    aiAssistantLabel: 'Assistant',
    aiFeaturesLabel: 'AI tools',
    whiteboardLabel: 'Board',
    pollsLabel: 'Polls',
    chatLabel: 'Chat',
    recordLabel: 'Record', recordingLabel: 'REC',
    settingsLabel: 'Settings',
    statsLabel: 'Stats',
    leaveLabel: 'Leave',
  }}},
  es: { room: { controls: {
    micLabelOn: 'Micro', micLabelOff: 'Silencio',
    cameraLabelOn: 'Cámara', cameraLabelOff: 'Cam off',
    screenShareLabel: 'Presentar', screenShareLabelOn: 'Detener', screenShareStop: 'Detener',
    handLabel: 'Mano',
    aiVideoLabel: 'IA video',
    aiAssistantLabel: 'Asistente',
    aiFeaturesLabel: 'IA',
    whiteboardLabel: 'Pizarra',
    pollsLabel: 'Encuestas',
    chatLabel: 'Chat',
    recordLabel: 'Grabar', recordingLabel: 'REC',
    settingsLabel: 'Ajustes',
    statsLabel: 'Stats',
    leaveLabel: 'Salir',
  }}},
  de: { room: { controls: {
    micLabelOn: 'Mikro', micLabelOff: 'Stumm',
    cameraLabelOn: 'Kamera', cameraLabelOff: 'Cam aus',
    screenShareLabel: 'Teilen', screenShareLabelOn: 'Beenden', screenShareStop: 'Beenden',
    handLabel: 'Hand',
    aiVideoLabel: 'KI Video',
    aiAssistantLabel: 'Assistent',
    aiFeaturesLabel: 'KI-Tools',
    whiteboardLabel: 'Tafel',
    pollsLabel: 'Umfragen',
    chatLabel: 'Chat',
    recordLabel: 'Aufnehmen', recordingLabel: 'REC',
    settingsLabel: 'Einstell.',
    statsLabel: 'Stats',
    leaveLabel: 'Verlassen',
  }}},
  ru: { room: { controls: {
    micLabelOn: 'Микро', micLabelOff: 'Тихо',
    cameraLabelOn: 'Камера', cameraLabelOff: 'Кам выкл',
    screenShareLabel: 'Презентация', screenShareLabelOn: 'Стоп', screenShareStop: 'Остановить',
    handLabel: 'Рука',
    aiVideoLabel: 'ИИ видео',
    aiAssistantLabel: 'Ассистент',
    aiFeaturesLabel: 'ИИ',
    whiteboardLabel: 'Доска',
    pollsLabel: 'Опросы',
    chatLabel: 'Чат',
    recordLabel: 'Запись', recordingLabel: 'REC',
    settingsLabel: 'Настройки',
    statsLabel: 'Стат.',
    leaveLabel: 'Выйти',
  }}},
  ca: { room: { controls: {
    micLabelOn: 'Micro', micLabelOff: 'Silenci',
    cameraLabelOn: 'Càmera', cameraLabelOff: 'Cam off',
    screenShareLabel: 'Presentar', screenShareLabelOn: 'Aturar', screenShareStop: 'Aturar',
    handLabel: 'Mà',
    aiVideoLabel: 'IA vídeo',
    aiAssistantLabel: 'Assistent',
    aiFeaturesLabel: 'Eines IA',
    whiteboardLabel: 'Pissarra',
    pollsLabel: 'Enquestes',
    chatLabel: 'Xat',
    recordLabel: 'Gravar', recordingLabel: 'REC',
    settingsLabel: 'Ajustos',
    statsLabel: 'Stats',
    leaveLabel: 'Sortir',
  }}},
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
