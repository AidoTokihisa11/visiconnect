// German translations
const deTranslations = {
  common: {
    loading: 'Laden...',
    error: 'Fehler',
    success: 'Erfolg',
    cancel: 'Abbrechen',
    confirm: 'Bestätigen',
    save: 'Speichern',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    back: 'Zurück',
    next: 'Weiter',
    previous: 'Vorherige',
    close: 'Schließen',
    search: 'Suchen',
    filter: 'Filter',
    sort: 'Sortieren',
    email: 'E-Mail',
    password: 'Passwort',
    name: 'Name',
    firstName: 'Vorname',
    lastName: 'Nachname',
    phone: 'Telefon',
    address: 'Adresse',
    city: 'Stadt',
    country: 'Land',
    language: 'Sprache',
    settings: 'Einstellungen',
    profile: 'Profil',
    logout: 'Abmelden',
    login: 'Anmelden',
    register: 'Registrieren',
    forgotPassword: 'Passwort vergessen?'
  },

  navigation: {
    home: 'Startseite',
    features: 'Funktionen',
    pricing: 'Preise',
    about: 'Über uns',
    contact: 'Kontakt',
    support: 'Support',
    documentation: 'Dokumentation',
    community: 'Community',
    blog: 'Blog',
    careers: 'Karriere',
    legal: 'Rechtliches',
    privacy: 'Datenschutz',
    terms: 'Nutzungsbedingungen',
    cookies: 'Cookies',
    security: 'Sicherheit'
  },

  hero: {
    title: 'Die Videokonferenz-Plattform der nächsten Generation',
    subtitle: 'Verbinden Sie sich einfach mit Ihren Teams durch unsere fortschrittliche und intuitive Videokonferenz-Lösung',
    startFree: 'Kostenlos starten',
    watchDemo: 'Demo ansehen',
    trustedBy: 'Vertraut von über {{count}} Unternehmen weltweit'
  },

  features: {
    title: 'Leistungsstarke Funktionen',
    subtitle: 'Alles was Sie für produktive Meetings brauchen',
    videoCall: {
      title: 'HD-Videoanrufe',
      description: 'Kristallklare Videoqualität bis zu 4K mit Studio-Audioqualität'
    },
    screenShare: {
      title: 'Bildschirmfreigabe',
      description: 'Teilen Sie Ihren Bildschirm, Anwendungen oder spezifische Tabs'
    },
    recording: {
      title: 'Aufzeichnung',
      description: 'Nehmen Sie Ihre Meetings auf und greifen Sie später darauf zu'
    },
    chat: {
      title: 'Integrierter Chat',
      description: 'Chatten Sie während Anrufen mit Nachrichten und Dateien'
    },
    whiteboard: {
      title: 'Whiteboard',
      description: 'Kollaborieren Sie visuell mit einem integrierten Whiteboard'
    },
    security: {
      title: 'Erweiterte Sicherheit',
      description: 'Ende-zu-Ende-Verschlüsselung und Sicherheitskontrollen'
    }
  },

  pricing: {
    title: 'Einfache und transparente Preise',
    subtitle: 'Wählen Sie den Plan, der zu Ihren Bedürfnissen passt',
    monthly: 'Monatlich',
    yearly: 'Jährlich',
    perMonth: '/Monat',
    perUser: 'pro Benutzer',
    free: {
      title: 'Kostenlos',
      price: '0€',
      description: 'Perfekt zum Einstieg',
      features: [
        'Bis zu 3 Teilnehmer',
        '40-Minuten-Meetings',
        'HD-Audio und -Video',
        'Bildschirmfreigabe'
      ]
    },
    pro: {
      title: 'Pro',
      price: '12€',
      description: 'Für wachsende Teams',
      features: [
        'Bis zu 50 Teilnehmer',
        'Unbegrenzte Meetings',
        'Cloud-Aufzeichnung',
        'Chat und Whiteboard',
        'Prioritäts-Support'
      ]
    },
    enterprise: {
      title: 'Enterprise',
      price: 'Individuell',
      description: 'Für große Organisationen',
      features: [
        'Unbegrenzte Teilnehmer',
        'SSO und Integrationen',
        'Erweiterte Administration',
        'Dedizierter Support',
        'Garantierte SLA'
      ]
    },
    getStarted: 'Loslegen',
    contactSales: 'Vertrieb kontaktieren'
  },

  auth: {
    login: {
      title: 'Anmelden',
      subtitle: 'Greifen Sie auf Ihr VisiConnect-Konto zu',
      email: 'E-Mail-Adresse',
      password: 'Passwort',
      rememberMe: 'Angemeldet bleiben',
      forgotPassword: 'Passwort vergessen?',
      signIn: 'Anmelden',
      noAccount: 'Noch kein Konto?',
      createAccount: 'Konto erstellen',
      orContinueWith: 'Oder fortfahren mit'
    },
    signup: {
      title: 'Konto erstellen',
      subtitle: 'Treten Sie VisiConnect heute bei',
      firstName: 'Vorname',
      lastName: 'Nachname',
      email: 'E-Mail-Adresse',
      password: 'Passwort',
      confirmPassword: 'Passwort bestätigen',
      acceptTerms: 'Ich akzeptiere die {{terms}} und {{privacy}}',
      terms: 'Nutzungsbedingungen',
      privacy: 'Datenschutzrichtlinie',
      createAccount: 'Konto erstellen',
      alreadyHaveAccount: 'Bereits ein Konto?',
      signIn: 'Anmelden',
      orContinueWith: 'Oder fortfahren mit'
    },
    forgotPassword: {
      title: 'Passwort vergessen',
      subtitle: 'Geben Sie Ihre E-Mail ein, um Ihr Passwort zurückzusetzen',
      email: 'E-Mail-Adresse',
      sendReset: 'Reset-Link senden',
      backToLogin: 'Zurück zur Anmeldung'
    }
  },

  meeting: {
    title: 'Meeting',
    participants: 'Teilnehmer',
    chat: 'Chat',
    settings: 'Einstellungen',
    leave: 'Verlassen',
    mute: 'Stumm schalten',
    unmute: 'Stumm aufheben',
    video: 'Kamera',
    screenShare: 'Bildschirm teilen',
    record: 'Aufzeichnen',
    endMeeting: 'Meeting beenden',
    inviteOthers: 'Andere einladen',
    copyLink: 'Link kopieren',
    joinedMeeting: '{{name}} ist dem Meeting beigetreten',
    leftMeeting: '{{name}} hat das Meeting verlassen'
  },

  tutorial: {
    title: 'Erste Schritte Guide',
    welcome: 'Willkommen bei VisiConnect!',
    step1: {
      title: 'Meeting erstellen',
      description: 'Klicken Sie auf "Neues Meeting" um zu beginnen'
    },
    step2: {
      title: 'Teilnehmer einladen',
      description: 'Teilen Sie den Meeting-Link mit Ihren Kollegen'
    },
    step3: {
      title: 'Tools verwenden',
      description: 'Entdecken Sie Bildschirmfreigabe, Chat und Whiteboard'
    },
    step4: {
      title: 'Einstellungen verwalten',
      description: 'Passen Sie Ihre Erfahrung in den Einstellungen an'
    },
    next: 'Weiter',
    previous: 'Zurück',
    finish: 'Fertig',
    skip: 'Guide überspringen'
  },

  errors: {
    network: 'Netzwerkverbindungsfehler',
    unauthorized: 'Nicht autorisierter Zugriff',
    forbidden: 'Zugriff verweigert',
    notFound: 'Ressource nicht gefunden',
    serverError: 'Serverfehler',
    validation: 'Validierungsfehler',
    unknown: 'Ein unbekannter Fehler ist aufgetreten',
    tryAgain: 'Bitte versuchen Sie es erneut',
    contactSupport: 'Kontaktieren Sie den Support, wenn das Problem weiterhin besteht'
  },

  success: {
    accountCreated: 'Konto erfolgreich erstellt!',
    passwordReset: 'Reset-E-Mail gesendet',
    settingsSaved: 'Einstellungen gespeichert',
    invitationSent: 'Einladung gesendet',
    meetingCreated: 'Meeting erfolgreich erstellt',
    profileUpdated: 'Profil aktualisiert'
  },

  // HomePage spezifische Schlüssel
  featureHDVideo: 'HD-Video',
  featureHDVideoDesc: 'Hochauflösende Videoqualität für kristallklare Meetings',
  featureHDBenefit1: 'Auflösung bis zu 4K',
  featureHDBenefit2: 'Studio-Audioqualität',
  featureHDBenefit3: 'Automatische Optimierung',

  featureSecurity: 'Erweiterte Sicherheit',
  featureSecurityDesc: 'Maximaler Schutz mit Ende-zu-Ende-Verschlüsselung',
  featureSecurityBenefit1: 'AES-256-Verschlüsselung',
  featureSecurityBenefit2: 'Sichere Authentifizierung',
  featureSecurityBenefit3: 'DSGVO-Konformität',

  featureMultiparticipants: 'Mehrere Teilnehmer',
  featureMultiparticipantsDesc: 'Meetings mit mehreren Teilnehmern gleichzeitig',
  featureMultiparticipantsBenefit1: 'Bis zu 50 Teilnehmer',
  featureMultiparticipantsBenefit2: 'Berechtigungsverwaltung',
  featureMultiparticipantsBenefit3: 'Adaptive Rasteransicht',

  featurePerformance: 'Optimale Leistung',
  featurePerformanceDesc: 'Fortschrittliche Technologie für ein reibungsloses Erlebnis',
  featurePerformanceBenefit1: 'Ultra-niedrige Latenz',
  featurePerformanceBenefit2: 'Bandbreitenoptimierung',
  featurePerformanceBenefit3: 'Automatische Anpassung',

  featureAccessibility: 'Barrierefreiheit',
  featureAccessibilityDesc: 'Plattform für alle zugänglich, überall',
  featureAccessibilityBenefit1: 'Kompatibel mit allen Geräten',
  featureAccessibilityBenefit2: 'Intuitive Benutzeroberfläche',
  featureAccessibilityBenefit3: 'Multi-Browser-Unterstützung',

  featureInterface: 'Moderne Benutzeroberfläche',
  featureInterfaceDesc: 'Sauberes Design und außergewöhnliche Benutzererfahrung',
  featureInterfaceBenefit1: 'Responsives Design',
  featureInterfaceBenefit2: 'Intuitive Navigation',
  featureInterfaceBenefit3: 'Anpassbare Themes',

  // Preispläne
  freePlan: 'Kostenloser Plan',
  proPlan: 'Pro Plan',
  maxParticipants: 'maximale Teilnehmer',
  duration: 'Meeting-Minuten',
  unlimited: 'unbegrenzt',
  getStarted: 'Loslegen',

  // Statistiken
  statValue1: '3',
  statLabel1: 'Aktive Tester',
  statValue2: '2024',
  statLabel2: 'Erstellungsjahr',
  statValue3: '99.9%',
  statLabel3: 'Ziel-Verfügbarkeit',
  statValue4: '♥',
  statLabel4: 'Mit Leidenschaft gemacht',

  // Verschiedene Texte
  copyrightText: '© 2024 VisioConnect. Entwickelt mit ♥ von Théo Garcès.',
  developmentStatus: 'Plattform in Entwicklung - Beta-Version',
  
  // Hero section
  heroTitle: 'Videokonferenz',
  heroSubtitle: 'Einfach & Effektiv',
  heroDescription: 'VisioConnect - Videokonferenz-Plattform entwickelt von Théo Garcès. Einfache und effektive Lösung für Ihre Online-Meetings, derzeit getestet von einem kleinen Team von 3 Personen. Moderne Benutzeroberfläche, zuverlässige Technologie.',
  testPlatform: 'Plattform testen',
  seeFeatures: 'Funktionen ansehen',

  // Pricing section
  choosePlan: 'Wählen Sie Ihren Plan',
  flexibleSolutions: 'Flexible Lösungen für alle Ihre Bedürfnisse, vom persönlichen Gebrauch bis hin zu großen Unternehmen',
  testWithFamily: 'Zum Testen mit Familie und Freunden',
  toDefine: 'zu definieren',
  proVersionLater: 'Bezahlversion für später geplant',
  customPlan: 'Maßgeschneidert',
  customDescription: 'Für spezifische Bedürfnisse (kontaktieren Sie mich!)',
  negotiable: 'verhandelbar',
  standardVideo: 'Standard-Videoqualität',
  basicChat: 'Basis-Chat',
  essentialFeatures: 'Wesentliche Funktionen',
  improvedQuality: 'Verbesserte Qualität',
  bonusFeatures: 'Bonus-Funktionen',
  updatePriority: 'Priorität bei Updates',
  comingSoon: 'Bald verfügbar',
  customFeatures: 'Maßgeschneiderte Funktionen',
  onDemandDevelopment: 'Entwicklung auf Anfrage',
  privateInstallation: 'Private Installation möglich',
  directSupport: 'Direkter Support mit Théo',
  needsAdaptation: 'Anpassung an Bedürfnisse',
  contactMe: 'Kontaktieren Sie mich',
  
  // Pages and common translations
  aboutPageTitle: 'Über uns',
  aboutPageSubtitle: 'Entdecken Sie die Geschichte und Vision hinter VisioConnect',
  securityPageTitle: 'Sicherheit',
  securityPageSubtitle: 'Ihre Privatsphäre und Sicherheit haben Priorität',
  pricingPageTitle: 'Preise',
  pricingPageSubtitle: 'Pläne für alle Ihre Bedürfnisse',
  contactPageTitle: 'Kontakt',
  contactPageSubtitle: 'Haben Sie eine Frage? Wir sind hier um zu helfen',
  supportPageTitle: 'Support',
  supportPageSubtitle: 'Hilfezentrum und technische Unterstützung',
  backToHome: 'Zurück zur Startseite',
  learnMore: 'Mehr erfahren',
  getStartedNow: 'Jetzt loslegen',
  contactUs: 'Kontaktieren Sie uns',
  viewDocumentation: 'Dokumentation ansehen',
  endToEndEncryption: 'Ende-zu-Ende-Verschlüsselung',
  encryptionDesc: 'Alle Ihre Kommunikationen sind durch militärische AES-256-Verschlüsselung geschützt.',
  secureInfrastructure: 'Sichere Infrastruktur',
  infrastructureDesc: 'Unsere Server sind in zertifizierten Rechenzentren mit maximaler physischer Sicherheit gehostet.',
  privacyCompliance: 'DSGVO-Konformität',
  complianceDesc: 'Vollständige Einhaltung der europäischen Datenschutzbestimmungen.',
  projectVision: 'Projektvision',
  visionText: 'VisioConnect entstand aus meiner Leidenschaft für moderne Kommunikationstechnologien. Als Full-Stack-Entwickler wollte ich eine Lösung schaffen, die technologische Innovation und außergewöhnliche Benutzererfahrung kombiniert.',
  technicalStack: 'Technischer Stack',
  stackText: 'React.js, WebRTC, Socket.io, Node.js, MongoDB, AI/ML für Videooptimierung und viele andere cutting-edge Technologien für eine reibungslose Erfahrung.',
  sendMessage: 'Nachricht senden',
  yourMessage: 'Ihre Nachricht',
  messagePlaceholder: 'Beschreiben Sie Ihre Frage oder Ihren Vorschlag...',
  emailAddress: 'E-Mail-Adresse',
  fullName: 'Vollständiger Name',
  subject: 'Betreff',
  frequentQuestions: 'Häufig gestellte Fragen',
  technicalSupport: 'Technischer Support',
  userGuides: 'Benutzerhandbücher',
  apiDocumentation: 'API-Dokumentation',
  quickLinks: 'Schnelle Links',
  socialMedia: 'Soziale Medien',
  newsletter: 'Newsletter',
  subscribeNewsletter: 'Newsletter abonnieren',
  emailPlaceholder: 'Ihre E-Mail-Adresse',
  subscribe: 'Abonnieren',
  comingSoonFeature: 'Demnächst verfügbar',
  inDevelopment: 'In Entwicklung',
  betaVersion: 'Beta-Version',
  underConstruction: 'Im Aufbau',
  cookiesPageTitle: 'Cookie-Richtlinie',
  whatAreCookies: 'Was ist ein Cookie?',
  cookiesDesc: 'Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden, wenn Sie eine Website besuchen.',
  cookieTypes: 'Verwendete Cookie-Typen',
  essentialCookies: 'Wesentliche Cookies',
  analyticsCookies: 'Analyse-Cookies',
  
  // Integrations section
  integrations: {
    title: 'Integrationen',
    subtitle: 'Verbinden Sie VisiConnect mit Ihren bevorzugten Tools für eine einheitliche und produktive Erfahrung.',
    connect: 'Verbinden',
    google: {
      description: 'Integrieren Sie Gmail, Google Calendar, Drive und die gesamte Google Suite für maximale Produktivität.'
    },
    microsoft: {
      description: 'Synchronisieren Sie Teams, Outlook, OneDrive und SharePoint für optimale Zusammenarbeit.'
    },
    slack: {
      description: 'Verbinden Sie Slack, um Benachrichtigungen zu erhalten und Ihre Meetings aus Ihrem Workspace zu steuern.'
    },
    zoom: {
      description: 'Native Integration mit Zoom für eine reibungslose Video-Erfahrung und erweiterte Funktionen.'
    },
    trello: {
      description: 'Verwalten Sie Ihre Projekte und Aufgaben direkt aus Ihren Meetings mit bidirektionaler Synchronisation.'
    },
    jira: {
      description: 'Synchronisieren Sie Ihre Projekte und Dokumentation für optimales Team-Management.'
    },
    salesforce: {
      description: 'Integrieren Sie Ihr CRM, um Interessenten und Kunden direkt in Meetings zu verfolgen.'
    },
    github: {
      description: 'Vollständige Integration mit GitHub für Code-Review und Team-Projektmanagement.'
    }
  }
};

export default deTranslations;