#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Adds the rest of the room.* + auth.signingIn keys for all 6 locales.
 */
const fs = require('fs');
const path = require('path');
const I18N_DIR = path.join(__dirname, '..', 'src', 'i18n');

const data = {
  fr: {
    auth: { signingIn: 'Connexion...' },
    room: {
      toasts: {
        micBlocked: "Micro bloqué — cliquez sur 🔒 dans la barre d'adresse pour autoriser l'accès.",
        micError: 'Erreur micro — rechargez la page ou vérifiez votre périphérique audio.',
        cameraBlocked: "Caméra bloquée — cliquez sur 🔒 dans la barre d'adresse pour autoriser l'accès.",
        recordPermissionDenied: 'Partage d’écran refusé. Vérifiez les permissions du navigateur.',
        recordNoDevice: 'Aucun périphérique trouvé pour l’enregistrement.',
        recordUnknown: 'Erreur lors du démarrage de l’enregistrement.',
        someone: "Quelqu'un",
        newMessage: 'Nouveau message de {{name}}',
        handRaised: 'Main levée !'
      },
      pollPopup: {
        title: 'Nouveau Sondage !',
        createdBy: 'Créé par {{name}}'
      },
      polls: {
        title: 'Sondages',
        create: 'Créer un sondage',
        empty: "Aucun sondage pour l'instant",
        ended: 'Terminé', active: 'En cours', anon: 'Anonyme', hidden: 'Résultats masqués',
        vote: 'vote', votes: 'votes',
        afterVote: 'Les résultats seront visibles après votre vote',
        hideResults: 'Masquer les résultats', showResults: 'Afficher les résultats',
        hideShort: 'Masquer résultats', showShort: 'Afficher résultats',
        close: 'Clôturer le sondage', closeShort: 'Clôturer',
        newPoll: 'Nouveau sondage',
        questionPlaceholder: 'Votre question...',
        optionPlaceholder: 'Option {{n}}',
        addOption: 'Ajouter une option',
        options: 'Options',
        anonymousVote: 'Vote anonyme',
        showResultsOpt: 'Afficher les résultats',
        cancel: 'Annuler', creating: 'Création...', submit: 'Créer',
        anonymous: 'Anonyme',
        errEmptyQuestion: 'Veuillez saisir une question.',
        errMinOptions: 'Ajoutez au moins 2 options.',
        errCreate: 'Erreur lors de la création',
        errUnknown: 'Erreur inconnue'
      },
      invite: {
        title: 'Inviter des participants',
        subtitle: 'Partagez ce lien avec les personnes que vous souhaitez inviter à votre réunion.',
        linkLabel: 'Lien de la réunion',
        copy: 'Copier', copied: 'Copié',
        otherOptions: 'Autres options de partage',
        email: 'Envoyer par email',
        sms: 'Inviter par SMS',
        smsSoon: 'Fonctionnalité SMS à venir ! (Visuel uniquement pour le moment)',
        emailSubject: 'Invitation à une visioconférence',
        emailBody: 'Rejoignez ma réunion en cliquant sur ce lien : {{url}}'
      }
    }
  },
  en: {
    auth: { signingIn: 'Signing in...' },
    room: {
      toasts: {
        micBlocked: "Microphone blocked — click the 🔒 in the address bar to allow access.",
        micError: 'Microphone error — reload the page or check your audio device.',
        cameraBlocked: "Camera blocked — click the 🔒 in the address bar to allow access.",
        recordPermissionDenied: 'Screen share refused. Check your browser permissions.',
        recordNoDevice: 'No device found for recording.',
        recordUnknown: 'Error while starting the recording.',
        someone: 'Someone',
        newMessage: 'New message from {{name}}',
        handRaised: 'Hand raised!'
      },
      pollPopup: { title: 'New poll!', createdBy: 'Created by {{name}}' },
      polls: {
        title: 'Polls', create: 'Create a poll', empty: 'No poll yet',
        ended: 'Ended', active: 'Active', anon: 'Anonymous', hidden: 'Results hidden',
        vote: 'vote', votes: 'votes',
        afterVote: 'Results will be visible after your vote',
        hideResults: 'Hide results', showResults: 'Show results',
        hideShort: 'Hide results', showShort: 'Show results',
        close: 'Close the poll', closeShort: 'Close',
        newPoll: 'New poll',
        questionPlaceholder: 'Your question...',
        optionPlaceholder: 'Option {{n}}',
        addOption: 'Add an option', options: 'Options',
        anonymousVote: 'Anonymous vote', showResultsOpt: 'Show results',
        cancel: 'Cancel', creating: 'Creating...', submit: 'Create',
        anonymous: 'Anonymous',
        errEmptyQuestion: 'Please enter a question.',
        errMinOptions: 'Add at least 2 options.',
        errCreate: 'Error while creating',
        errUnknown: 'Unknown error'
      },
      invite: {
        title: 'Invite participants',
        subtitle: 'Share this link with the people you want to invite to your meeting.',
        linkLabel: 'Meeting link', copy: 'Copy', copied: 'Copied',
        otherOptions: 'Other share options',
        email: 'Send by email', sms: 'Invite by SMS',
        smsSoon: 'SMS feature coming soon! (Visual only for now)',
        emailSubject: 'Video meeting invitation',
        emailBody: 'Join my meeting by clicking this link: {{url}}'
      }
    }
  },
  es: {
    auth: { signingIn: 'Conectando...' },
    room: {
      toasts: {
        micBlocked: "Micrófono bloqueado — haz clic en 🔒 en la barra de direcciones para permitir el acceso.",
        micError: 'Error de micrófono — recarga la página o comprueba tu dispositivo de audio.',
        cameraBlocked: "Cámara bloqueada — haz clic en 🔒 en la barra de direcciones para permitir el acceso.",
        recordPermissionDenied: 'Pantalla compartida rechazada. Comprueba los permisos del navegador.',
        recordNoDevice: 'No se ha encontrado ningún dispositivo para grabar.',
        recordUnknown: 'Error al iniciar la grabación.',
        someone: 'Alguien',
        newMessage: 'Nuevo mensaje de {{name}}',
        handRaised: '¡Mano levantada!'
      },
      pollPopup: { title: '¡Nueva encuesta!', createdBy: 'Creada por {{name}}' },
      polls: {
        title: 'Encuestas', create: 'Crear encuesta', empty: 'No hay encuestas todavía',
        ended: 'Finalizada', active: 'Activa', anon: 'Anónima', hidden: 'Resultados ocultos',
        vote: 'voto', votes: 'votos',
        afterVote: 'Los resultados serán visibles después de tu voto',
        hideResults: 'Ocultar resultados', showResults: 'Mostrar resultados',
        hideShort: 'Ocultar resultados', showShort: 'Mostrar resultados',
        close: 'Cerrar la encuesta', closeShort: 'Cerrar',
        newPoll: 'Nueva encuesta',
        questionPlaceholder: 'Tu pregunta...',
        optionPlaceholder: 'Opción {{n}}',
        addOption: 'Añadir opción', options: 'Opciones',
        anonymousVote: 'Voto anónimo', showResultsOpt: 'Mostrar resultados',
        cancel: 'Cancelar', creating: 'Creando...', submit: 'Crear',
        anonymous: 'Anónimo',
        errEmptyQuestion: 'Introduce una pregunta.',
        errMinOptions: 'Añade al menos 2 opciones.',
        errCreate: 'Error al crear',
        errUnknown: 'Error desconocido'
      },
      invite: {
        title: 'Invitar participantes',
        subtitle: 'Comparte este enlace con las personas que quieras invitar a tu reunión.',
        linkLabel: 'Enlace de la reunión', copy: 'Copiar', copied: 'Copiado',
        otherOptions: 'Otras opciones para compartir',
        email: 'Enviar por correo', sms: 'Invitar por SMS',
        smsSoon: '¡Función SMS próximamente! (Solo visual por ahora)',
        emailSubject: 'Invitación a una videoconferencia',
        emailBody: 'Únete a mi reunión haciendo clic en este enlace: {{url}}'
      }
    }
  },
  de: {
    auth: { signingIn: 'Anmeldung...' },
    room: {
      toasts: {
        micBlocked: "Mikrofon blockiert — klicken Sie in der Adressleiste auf 🔒, um den Zugriff zu erlauben.",
        micError: 'Mikrofonfehler — Seite neu laden oder Audiogerät prüfen.',
        cameraBlocked: "Kamera blockiert — klicken Sie in der Adressleiste auf 🔒, um den Zugriff zu erlauben.",
        recordPermissionDenied: 'Bildschirmfreigabe abgelehnt. Browser-Berechtigungen prüfen.',
        recordNoDevice: 'Kein Gerät zum Aufzeichnen gefunden.',
        recordUnknown: 'Fehler beim Starten der Aufzeichnung.',
        someone: 'Jemand',
        newMessage: 'Neue Nachricht von {{name}}',
        handRaised: 'Hand gehoben!'
      },
      pollPopup: { title: 'Neue Umfrage!', createdBy: 'Erstellt von {{name}}' },
      polls: {
        title: 'Umfragen', create: 'Umfrage erstellen', empty: 'Noch keine Umfrage',
        ended: 'Beendet', active: 'Aktiv', anon: 'Anonym', hidden: 'Ergebnisse verborgen',
        vote: 'Stimme', votes: 'Stimmen',
        afterVote: 'Ergebnisse werden nach Ihrer Stimmabgabe sichtbar',
        hideResults: 'Ergebnisse verbergen', showResults: 'Ergebnisse anzeigen',
        hideShort: 'Verbergen', showShort: 'Anzeigen',
        close: 'Umfrage schließen', closeShort: 'Schließen',
        newPoll: 'Neue Umfrage',
        questionPlaceholder: 'Ihre Frage...',
        optionPlaceholder: 'Option {{n}}',
        addOption: 'Option hinzufügen', options: 'Optionen',
        anonymousVote: 'Anonyme Abstimmung', showResultsOpt: 'Ergebnisse anzeigen',
        cancel: 'Abbrechen', creating: 'Erstellen...', submit: 'Erstellen',
        anonymous: 'Anonym',
        errEmptyQuestion: 'Bitte eine Frage eingeben.',
        errMinOptions: 'Mindestens 2 Optionen hinzufügen.',
        errCreate: 'Fehler beim Erstellen',
        errUnknown: 'Unbekannter Fehler'
      },
      invite: {
        title: 'Teilnehmer einladen',
        subtitle: 'Teilen Sie diesen Link mit den Personen, die Sie zu Ihrem Meeting einladen möchten.',
        linkLabel: 'Meeting-Link', copy: 'Kopieren', copied: 'Kopiert',
        otherOptions: 'Andere Freigabeoptionen',
        email: 'Per E-Mail senden', sms: 'Per SMS einladen',
        smsSoon: 'SMS-Funktion kommt bald! (Vorerst nur visuell)',
        emailSubject: 'Einladung zu einer Videokonferenz',
        emailBody: 'Treten Sie meinem Meeting bei, indem Sie auf diesen Link klicken: {{url}}'
      }
    }
  },
  ru: {
    auth: { signingIn: 'Вход...' },
    room: {
      toasts: {
        micBlocked: "Микрофон заблокирован — нажмите 🔒 в адресной строке, чтобы разрешить доступ.",
        micError: 'Ошибка микрофона — перезагрузите страницу или проверьте аудиоустройство.',
        cameraBlocked: "Камера заблокирована — нажмите 🔒 в адресной строке, чтобы разрешить доступ.",
        recordPermissionDenied: 'Демонстрация экрана отклонена. Проверьте разрешения браузера.',
        recordNoDevice: 'Устройство для записи не найдено.',
        recordUnknown: 'Ошибка при запуске записи.',
        someone: 'Кто-то',
        newMessage: 'Новое сообщение от {{name}}',
        handRaised: 'Рука поднята!'
      },
      pollPopup: { title: 'Новый опрос!', createdBy: 'Создано {{name}}' },
      polls: {
        title: 'Опросы', create: 'Создать опрос', empty: 'Пока нет опросов',
        ended: 'Завершён', active: 'Активен', anon: 'Анонимно', hidden: 'Результаты скрыты',
        vote: 'голос', votes: 'голосов',
        afterVote: 'Результаты будут видны после вашего голоса',
        hideResults: 'Скрыть результаты', showResults: 'Показать результаты',
        hideShort: 'Скрыть', showShort: 'Показать',
        close: 'Закрыть опрос', closeShort: 'Закрыть',
        newPoll: 'Новый опрос',
        questionPlaceholder: 'Ваш вопрос...',
        optionPlaceholder: 'Вариант {{n}}',
        addOption: 'Добавить вариант', options: 'Параметры',
        anonymousVote: 'Анонимный голос', showResultsOpt: 'Показывать результаты',
        cancel: 'Отмена', creating: 'Создание...', submit: 'Создать',
        anonymous: 'Аноним',
        errEmptyQuestion: 'Введите вопрос.',
        errMinOptions: 'Добавьте минимум 2 варианта.',
        errCreate: 'Ошибка при создании',
        errUnknown: 'Неизвестная ошибка'
      },
      invite: {
        title: 'Пригласить участников',
        subtitle: 'Поделитесь этой ссылкой с людьми, которых хотите пригласить на встречу.',
        linkLabel: 'Ссылка на встречу', copy: 'Копировать', copied: 'Скопировано',
        otherOptions: 'Другие способы поделиться',
        email: 'Отправить по email', sms: 'Пригласить по SMS',
        smsSoon: 'Функция SMS скоро появится! (Пока только визуально)',
        emailSubject: 'Приглашение на видеовстречу',
        emailBody: 'Присоединяйтесь к моей встрече по этой ссылке: {{url}}'
      }
    }
  },
  ca: {
    auth: { signingIn: 'Connectant...' },
    room: {
      toasts: {
        micBlocked: "Micròfon bloquejat — feu clic a 🔒 a la barra d'adreces per permetre l'accés.",
        micError: "Error de micròfon — recarregueu la pàgina o comproveu el dispositiu d'àudio.",
        cameraBlocked: "Càmera bloquejada — feu clic a 🔒 a la barra d'adreces per permetre l'accés.",
        recordPermissionDenied: 'Compartir pantalla denegat. Comproveu els permisos del navegador.',
        recordNoDevice: 'No s\'ha trobat cap dispositiu per enregistrar.',
        recordUnknown: 'Error en iniciar l\'enregistrament.',
        someone: 'Algú',
        newMessage: 'Nou missatge de {{name}}',
        handRaised: 'Mà aixecada!'
      },
      pollPopup: { title: 'Nova enquesta!', createdBy: 'Creada per {{name}}' },
      polls: {
        title: 'Enquestes', create: 'Crear enquesta', empty: 'Encara no hi ha enquestes',
        ended: 'Finalitzada', active: 'Activa', anon: 'Anònima', hidden: 'Resultats ocults',
        vote: 'vot', votes: 'vots',
        afterVote: 'Els resultats seran visibles després del vostre vot',
        hideResults: 'Amagar resultats', showResults: 'Mostrar resultats',
        hideShort: 'Amagar', showShort: 'Mostrar',
        close: 'Tancar l\'enquesta', closeShort: 'Tancar',
        newPoll: 'Nova enquesta',
        questionPlaceholder: 'La vostra pregunta...',
        optionPlaceholder: 'Opció {{n}}',
        addOption: 'Afegir opció', options: 'Opcions',
        anonymousVote: 'Vot anònim', showResultsOpt: 'Mostrar resultats',
        cancel: 'Cancel·lar', creating: 'Creant...', submit: 'Crear',
        anonymous: 'Anònim',
        errEmptyQuestion: 'Introduïu una pregunta.',
        errMinOptions: 'Afegiu almenys 2 opcions.',
        errCreate: 'Error en crear',
        errUnknown: 'Error desconegut'
      },
      invite: {
        title: 'Convidar participants',
        subtitle: 'Compartiu aquest enllaç amb les persones que vulgueu convidar a la reunió.',
        linkLabel: 'Enllaç de la reunió', copy: 'Copiar', copied: 'Copiat',
        otherOptions: 'Altres opcions per compartir',
        email: 'Enviar per correu', sms: 'Convidar per SMS',
        smsSoon: 'Funció SMS aviat! (Només visual de moment)',
        emailSubject: 'Invitació a una videoconferència',
        emailBody: 'Uniu-vos a la meva reunió fent clic en aquest enllaç: {{url}}'
      }
    }
  }
};

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    const srcVal = source[key];
    if (srcVal && typeof srcVal === 'object' && !Array.isArray(srcVal)) {
      if (!target[key] || typeof target[key] !== 'object' || Array.isArray(target[key])) target[key] = {};
      deepMerge(target[key], srcVal);
    } else target[key] = srcVal;
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
console.log('Done.');
