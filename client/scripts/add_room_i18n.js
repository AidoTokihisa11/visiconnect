#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * One-shot script to inject i18n keys for room.controls, room.permissionDenied
 * and aiChatbot into all 6 locale files (fr/en/es/de/ru/ca).
 *
 * Run:  node client/scripts/add_room_i18n.js
 */
const fs = require('fs');
const path = require('path');

const I18N_DIR = path.join(__dirname, '..', 'src', 'i18n');

const data = {
  fr: {
    room: {
      controls: {
        leave: 'Quitter',
        leaveAria: 'Quitter la réunion',
        cameraOn: 'Activer la caméra',
        cameraOff: 'Désactiver la caméra',
        micOn: 'Activer le micro',
        micOff: 'Désactiver le micro',
        screenShare: "Partager l'écran",
        share: 'Partager',
        whiteboard: 'Tableau Blanc (Tldraw)',
        whiteboardShort: 'Tableau',
        recordStart: "Démarrer l'enregistrement",
        recordStop: "Arrêter l'enregistrement",
        record: 'Enregistrer',
        stats: 'Stats / Debug (4K)',
        debug: 'Debug',
        aiAssistant: 'Assistant IA',
        aiFeatures: 'Fonctionnalités IA',
        aiOn: "Activer l'IA vidéo",
        aiOff: "Désactiver l'IA",
        aiEnhanceOn: "Activer l'amélioration IA",
        aiEnhanceOff: "Désactiver l'amélioration IA",
        aiLoading: "Modèles d'IA en cours de chargement...",
        aiProcessing: 'Transition en cours...',
        polls: 'Sondages',
        chat: 'Chat',
        settings: 'Paramètres',
        settingsShort: 'Réglages',
        handUp: 'Lever la main',
        handDown: 'Baisser la main',
        handRaised: 'Main levée',
        more: "Plus d'options",
        blurSoon: 'Le flou d\'arrière-plan sera bientôt disponible',
      },
      permissionDenied: {
        close: 'Fermer',
        titleCamera: 'Accès caméra bloqué',
        titleMic: 'Accès microphone bloqué',
        subtitleCamera: "Le navigateur a refusé l'accès à votre caméra.",
        subtitleMic: "Le navigateur a refusé l'accès à votre microphone.",
        instructionsFor: 'Instructions pour',
        reload: 'Recharger la page',
        learnMore: 'En savoir plus sur les permissions',
        steps: {
          chrome: [
            "Cliquez sur l'icône 🔒 ou 📷 dans la barre d'adresse (à gauche de l'URL).",
            'Sélectionnez "Toujours autoriser" pour la caméra et le microphone.',
            'Rechargez la page avec F5.'
          ],
          edge: [
            "Cliquez sur l'icône 🔒 dans la barre d'adresse.",
            'Cliquez sur "Autorisations pour ce site".',
            'Réglez la Caméra et le Microphone sur "Autoriser".',
            'Rechargez la page.'
          ],
          firefox: [
            "Cliquez sur l'icône 🔒 dans la barre d'adresse.",
            'Cliquez sur la flèche (→) à côté de "Connexion sécurisée".',
            "Cliquez sur \"Plus d'informations\" → onglet \"Permissions\".",
            'Changez Caméra et Microphone sur "Autoriser".',
            'Rechargez la page.'
          ],
          safari: [
            'Dans le menu "Safari", ouvrez "Préférences" (⌘,).',
            'Allez dans l\'onglet "Sites web".',
            'Sélectionnez "Caméra" ou "Microphone" à gauche.',
            'Réglez ce site sur "Autoriser".',
            'Rechargez la page.'
          ]
        }
      }
    },
    aiChatbot: {
      title: 'Assistant VisiConnect',
      subtitle: 'IA Ultra-performante',
      placeholder: 'Posez votre question...',
      greeting: "Bonjour ! Je suis l'IA ultra-performante de VisiConnect. Je connais la plateforme sur le bout des doigts. Comment puis-je vous aider ?"
    }
  },
  en: {
    room: {
      controls: {
        leave: 'Leave',
        leaveAria: 'Leave the meeting',
        cameraOn: 'Turn camera on',
        cameraOff: 'Turn camera off',
        micOn: 'Unmute microphone',
        micOff: 'Mute microphone',
        screenShare: 'Share screen',
        share: 'Share',
        whiteboard: 'Whiteboard (Tldraw)',
        whiteboardShort: 'Whiteboard',
        recordStart: 'Start recording',
        recordStop: 'Stop recording',
        record: 'Record',
        stats: 'Stats / Debug (4K)',
        debug: 'Debug',
        aiAssistant: 'AI Assistant',
        aiFeatures: 'AI Features',
        aiOn: 'Enable AI video',
        aiOff: 'Disable AI',
        aiEnhanceOn: 'Enable AI enhancement',
        aiEnhanceOff: 'Disable AI enhancement',
        aiLoading: 'Loading AI models...',
        aiProcessing: 'Transitioning...',
        polls: 'Polls',
        chat: 'Chat',
        settings: 'Settings',
        settingsShort: 'Settings',
        handUp: 'Raise hand',
        handDown: 'Lower hand',
        handRaised: 'Hand raised',
        more: 'More options',
        blurSoon: 'Background blur will be available soon',
      },
      permissionDenied: {
        close: 'Close',
        titleCamera: 'Camera access blocked',
        titleMic: 'Microphone access blocked',
        subtitleCamera: 'Your browser blocked access to your camera.',
        subtitleMic: 'Your browser blocked access to your microphone.',
        instructionsFor: 'Instructions for',
        reload: 'Reload page',
        learnMore: 'Learn more about permissions on',
        steps: {
          chrome: [
            "Click the 🔒 or 📷 icon in the address bar (left of the URL).",
            'Select "Always allow" for the camera and microphone.',
            'Reload the page with F5.'
          ],
          edge: [
            "Click the 🔒 icon in the address bar.",
            'Click "Permissions for this site".',
            'Set Camera and Microphone to "Allow".',
            'Reload the page.'
          ],
          firefox: [
            "Click the 🔒 icon in the address bar.",
            'Click the arrow (→) next to "Secure Connection".',
            'Click "More Information" → "Permissions" tab.',
            'Change Camera and Microphone to "Allow".',
            'Reload the page.'
          ],
          safari: [
            'From the "Safari" menu, open "Preferences" (⌘,).',
            'Go to the "Websites" tab.',
            'Select "Camera" or "Microphone" on the left.',
            'Set this site to "Allow".',
            'Reload the page.'
          ]
        }
      }
    },
    aiChatbot: {
      title: 'VisiConnect Assistant',
      subtitle: 'Ultra-fast AI',
      placeholder: 'Ask your question...',
      greeting: "Hi! I'm the VisiConnect AI assistant. I know the platform inside out. How can I help you today?"
    }
  },
  es: {
    room: {
      controls: {
        leave: 'Salir',
        leaveAria: 'Salir de la reunión',
        cameraOn: 'Activar la cámara',
        cameraOff: 'Desactivar la cámara',
        micOn: 'Activar el micrófono',
        micOff: 'Silenciar el micrófono',
        screenShare: 'Compartir pantalla',
        share: 'Compartir',
        whiteboard: 'Pizarra (Tldraw)',
        whiteboardShort: 'Pizarra',
        recordStart: 'Iniciar grabación',
        recordStop: 'Detener grabación',
        record: 'Grabar',
        stats: 'Estadísticas / Debug (4K)',
        debug: 'Debug',
        aiAssistant: 'Asistente IA',
        aiFeatures: 'Funciones IA',
        aiOn: 'Activar IA de vídeo',
        aiOff: 'Desactivar IA',
        aiEnhanceOn: 'Activar mejora IA',
        aiEnhanceOff: 'Desactivar mejora IA',
        aiLoading: 'Cargando modelos de IA...',
        aiProcessing: 'Transición en curso...',
        polls: 'Encuestas',
        chat: 'Chat',
        settings: 'Ajustes',
        settingsShort: 'Ajustes',
        handUp: 'Levantar la mano',
        handDown: 'Bajar la mano',
        handRaised: 'Mano levantada',
        more: 'Más opciones',
        blurSoon: 'El desenfoque de fondo estará disponible pronto',
      },
      permissionDenied: {
        close: 'Cerrar',
        titleCamera: 'Acceso a la cámara bloqueado',
        titleMic: 'Acceso al micrófono bloqueado',
        subtitleCamera: 'El navegador ha denegado el acceso a tu cámara.',
        subtitleMic: 'El navegador ha denegado el acceso a tu micrófono.',
        instructionsFor: 'Instrucciones para',
        reload: 'Recargar página',
        learnMore: 'Más información sobre permisos en',
        steps: {
          chrome: [
            "Haz clic en el icono 🔒 o 📷 en la barra de direcciones.",
            'Selecciona "Permitir siempre" para la cámara y el micrófono.',
            'Recarga la página con F5.'
          ],
          edge: [
            "Haz clic en el icono 🔒 en la barra de direcciones.",
            'Haz clic en "Permisos para este sitio".',
            'Configura Cámara y Micrófono en "Permitir".',
            'Recarga la página.'
          ],
          firefox: [
            "Haz clic en el icono 🔒 en la barra de direcciones.",
            'Haz clic en la flecha (→) junto a "Conexión segura".',
            'Haz clic en "Más información" → pestaña "Permisos".',
            'Cambia Cámara y Micrófono a "Permitir".',
            'Recarga la página.'
          ],
          safari: [
            'En el menú "Safari", abre "Preferencias" (⌘,).',
            'Ve a la pestaña "Sitios web".',
            'Selecciona "Cámara" o "Micrófono" a la izquierda.',
            'Configura este sitio en "Permitir".',
            'Recarga la página.'
          ]
        }
      }
    },
    aiChatbot: {
      title: 'Asistente VisiConnect',
      subtitle: 'IA ultra-rápida',
      placeholder: 'Haz tu pregunta...',
      greeting: '¡Hola! Soy el asistente de IA de VisiConnect. Conozco la plataforma a fondo. ¿En qué puedo ayudarte hoy?'
    }
  },
  de: {
    room: {
      controls: {
        leave: 'Verlassen',
        leaveAria: 'Meeting verlassen',
        cameraOn: 'Kamera einschalten',
        cameraOff: 'Kamera ausschalten',
        micOn: 'Mikrofon einschalten',
        micOff: 'Mikrofon stummschalten',
        screenShare: 'Bildschirm teilen',
        share: 'Teilen',
        whiteboard: 'Whiteboard (Tldraw)',
        whiteboardShort: 'Whiteboard',
        recordStart: 'Aufnahme starten',
        recordStop: 'Aufnahme stoppen',
        record: 'Aufnehmen',
        stats: 'Statistik / Debug (4K)',
        debug: 'Debug',
        aiAssistant: 'KI-Assistent',
        aiFeatures: 'KI-Funktionen',
        aiOn: 'KI-Video aktivieren',
        aiOff: 'KI deaktivieren',
        aiEnhanceOn: 'KI-Verbesserung aktivieren',
        aiEnhanceOff: 'KI-Verbesserung deaktivieren',
        aiLoading: 'KI-Modelle werden geladen...',
        aiProcessing: 'Übergang läuft...',
        polls: 'Umfragen',
        chat: 'Chat',
        settings: 'Einstellungen',
        settingsShort: 'Einstellungen',
        handUp: 'Hand heben',
        handDown: 'Hand senken',
        handRaised: 'Hand gehoben',
        more: 'Weitere Optionen',
        blurSoon: 'Hintergrundunschärfe wird bald verfügbar sein',
      },
      permissionDenied: {
        close: 'Schließen',
        titleCamera: 'Kamerazugriff blockiert',
        titleMic: 'Mikrofonzugriff blockiert',
        subtitleCamera: 'Der Browser hat den Zugriff auf Ihre Kamera verweigert.',
        subtitleMic: 'Der Browser hat den Zugriff auf Ihr Mikrofon verweigert.',
        instructionsFor: 'Anleitung für',
        reload: 'Seite neu laden',
        learnMore: 'Mehr über Berechtigungen in',
        steps: {
          chrome: [
            "Klicken Sie auf das Symbol 🔒 oder 📷 in der Adressleiste.",
            'Wählen Sie "Immer zulassen" für Kamera und Mikrofon.',
            'Laden Sie die Seite mit F5 neu.'
          ],
          edge: [
            "Klicken Sie auf das 🔒 Symbol in der Adressleiste.",
            'Klicken Sie auf "Berechtigungen für diese Website".',
            'Stellen Sie Kamera und Mikrofon auf "Zulassen".',
            'Laden Sie die Seite neu.'
          ],
          firefox: [
            "Klicken Sie auf das 🔒 Symbol in der Adressleiste.",
            'Klicken Sie auf den Pfeil (→) neben "Sichere Verbindung".',
            'Klicken Sie auf "Weitere Informationen" → Tab "Berechtigungen".',
            'Ändern Sie Kamera und Mikrofon auf "Zulassen".',
            'Laden Sie die Seite neu.'
          ],
          safari: [
            'Öffnen Sie im "Safari"-Menü "Einstellungen" (⌘,).',
            'Gehen Sie zum Tab "Websites".',
            'Wählen Sie links "Kamera" oder "Mikrofon".',
            'Stellen Sie diese Website auf "Zulassen".',
            'Laden Sie die Seite neu.'
          ]
        }
      }
    },
    aiChatbot: {
      title: 'VisiConnect-Assistent',
      subtitle: 'Ultraschnelle KI',
      placeholder: 'Stellen Sie Ihre Frage...',
      greeting: 'Hallo! Ich bin der KI-Assistent von VisiConnect. Ich kenne die Plattform in- und auswendig. Wie kann ich Ihnen heute helfen?'
    }
  },
  ru: {
    room: {
      controls: {
        leave: 'Выйти',
        leaveAria: 'Покинуть встречу',
        cameraOn: 'Включить камеру',
        cameraOff: 'Выключить камеру',
        micOn: 'Включить микрофон',
        micOff: 'Выключить микрофон',
        screenShare: 'Поделиться экраном',
        share: 'Поделиться',
        whiteboard: 'Доска (Tldraw)',
        whiteboardShort: 'Доска',
        recordStart: 'Начать запись',
        recordStop: 'Остановить запись',
        record: 'Запись',
        stats: 'Статистика / Отладка (4K)',
        debug: 'Отладка',
        aiAssistant: 'ИИ-ассистент',
        aiFeatures: 'Функции ИИ',
        aiOn: 'Включить ИИ-видео',
        aiOff: 'Выключить ИИ',
        aiEnhanceOn: 'Включить ИИ-улучшение',
        aiEnhanceOff: 'Выключить ИИ-улучшение',
        aiLoading: 'Загрузка моделей ИИ...',
        aiProcessing: 'Переход...',
        polls: 'Опросы',
        chat: 'Чат',
        settings: 'Настройки',
        settingsShort: 'Настройки',
        handUp: 'Поднять руку',
        handDown: 'Опустить руку',
        handRaised: 'Рука поднята',
        more: 'Дополнительно',
        blurSoon: 'Размытие фона скоро будет доступно',
      },
      permissionDenied: {
        close: 'Закрыть',
        titleCamera: 'Доступ к камере заблокирован',
        titleMic: 'Доступ к микрофону заблокирован',
        subtitleCamera: 'Браузер запретил доступ к камере.',
        subtitleMic: 'Браузер запретил доступ к микрофону.',
        instructionsFor: 'Инструкции для',
        reload: 'Перезагрузить страницу',
        learnMore: 'Подробнее о разрешениях',
        steps: {
          chrome: [
            "Нажмите на значок 🔒 или 📷 в адресной строке.",
            'Выберите «Всегда разрешать» для камеры и микрофона.',
            'Перезагрузите страницу клавишей F5.'
          ],
          edge: [
            "Нажмите на значок 🔒 в адресной строке.",
            'Нажмите «Разрешения для этого сайта».',
            'Установите для Камеры и Микрофона «Разрешить».',
            'Перезагрузите страницу.'
          ],
          firefox: [
            "Нажмите на значок 🔒 в адресной строке.",
            'Нажмите на стрелку (→) рядом с «Безопасное соединение».',
            'Нажмите «Подробнее» → вкладка «Разрешения».',
            'Измените значение Камеры и Микрофона на «Разрешить».',
            'Перезагрузите страницу.'
          ],
          safari: [
            'В меню «Safari» откройте «Настройки» (⌘,).',
            'Перейдите на вкладку «Веб-сайты».',
            'Выберите слева «Камера» или «Микрофон».',
            'Установите для этого сайта «Разрешить».',
            'Перезагрузите страницу.'
          ]
        }
      }
    },
    aiChatbot: {
      title: 'Ассистент VisiConnect',
      subtitle: 'Сверхбыстрый ИИ',
      placeholder: 'Задайте свой вопрос...',
      greeting: 'Здравствуйте! Я ИИ-ассистент VisiConnect. Я знаю платформу досконально. Чем могу помочь?'
    }
  },
  ca: {
    room: {
      controls: {
        leave: 'Sortir',
        leaveAria: 'Sortir de la reunió',
        cameraOn: 'Activar la càmera',
        cameraOff: 'Desactivar la càmera',
        micOn: 'Activar el micròfon',
        micOff: 'Silenciar el micròfon',
        screenShare: 'Compartir pantalla',
        share: 'Compartir',
        whiteboard: 'Pissarra (Tldraw)',
        whiteboardShort: 'Pissarra',
        recordStart: 'Iniciar enregistrament',
        recordStop: 'Aturar enregistrament',
        record: 'Enregistrar',
        stats: 'Estadístiques / Debug (4K)',
        debug: 'Debug',
        aiAssistant: 'Assistent IA',
        aiFeatures: 'Funcions IA',
        aiOn: 'Activar IA de vídeo',
        aiOff: 'Desactivar IA',
        aiEnhanceOn: 'Activar millora IA',
        aiEnhanceOff: 'Desactivar millora IA',
        aiLoading: 'Carregant models d\'IA...',
        aiProcessing: 'Transició en curs...',
        polls: 'Enquestes',
        chat: 'Xat',
        settings: 'Configuració',
        settingsShort: 'Configuració',
        handUp: 'Aixecar la mà',
        handDown: 'Abaixar la mà',
        handRaised: 'Mà aixecada',
        more: 'Més opcions',
        blurSoon: 'El difuminat de fons estarà disponible aviat',
      },
      permissionDenied: {
        close: 'Tancar',
        titleCamera: 'Accés a la càmera bloquejat',
        titleMic: 'Accés al micròfon bloquejat',
        subtitleCamera: 'El navegador ha denegat l\'accés a la càmera.',
        subtitleMic: 'El navegador ha denegat l\'accés al micròfon.',
        instructionsFor: 'Instruccions per a',
        reload: 'Recarregar la pàgina',
        learnMore: 'Més informació sobre permisos a',
        steps: {
          chrome: [
            "Feu clic a la icona 🔒 o 📷 a la barra d'adreces.",
            'Seleccioneu «Permetre sempre» per a la càmera i el micròfon.',
            'Recarregueu la pàgina amb F5.'
          ],
          edge: [
            "Feu clic a la icona 🔒 a la barra d'adreces.",
            'Feu clic a «Permisos per a aquest lloc».',
            'Configureu Càmera i Micròfon a «Permetre».',
            'Recarregueu la pàgina.'
          ],
          firefox: [
            "Feu clic a la icona 🔒 a la barra d'adreces.",
            'Feu clic a la fletxa (→) al costat de «Connexió segura».',
            'Feu clic a «Més informació» → pestanya «Permisos».',
            'Canvieu Càmera i Micròfon a «Permetre».',
            'Recarregueu la pàgina.'
          ],
          safari: [
            'Al menú «Safari», obriu «Preferències» (⌘,).',
            'Aneu a la pestanya «Llocs web».',
            'Seleccioneu «Càmera» o «Micròfon» a l\'esquerra.',
            'Configureu aquest lloc com a «Permetre».',
            'Recarregueu la pàgina.'
          ]
        }
      }
    },
    aiChatbot: {
      title: 'Assistent VisiConnect',
      subtitle: 'IA ultra ràpida',
      placeholder: 'Feu la vostra pregunta...',
      greeting: 'Hola! Sóc l\'assistent d\'IA de VisiConnect. Conec la plataforma a fons. Com us puc ajudar avui?'
    }
  }
};

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    const srcVal = source[key];
    if (srcVal && typeof srcVal === 'object' && !Array.isArray(srcVal)) {
      if (!target[key] || typeof target[key] !== 'object' || Array.isArray(target[key])) {
        target[key] = {};
      }
      deepMerge(target[key], srcVal);
    } else {
      target[key] = srcVal;
    }
  }
  return target;
}

for (const lang of Object.keys(data)) {
  const file = path.join(I18N_DIR, lang + '.json');
  const json = JSON.parse(fs.readFileSync(file, 'utf8'));
  deepMerge(json, data[lang]);
  fs.writeFileSync(file, JSON.stringify(json, null, 2) + '\n', 'utf8');
  console.log('Updated', file);
}
console.log('Done. All 6 locales now contain room.controls, room.permissionDenied and aiChatbot keys.');
