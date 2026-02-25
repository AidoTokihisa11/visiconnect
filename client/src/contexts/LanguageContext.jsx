import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  fr: {
    // Navigation
    home: 'Accueil',
    features: 'Fonctionnalités',
    pricing: 'Tarifs',
    about: 'À propos',
    contact: 'Contact',
    login: 'Connexion',
    signup: 'Inscription',
    demo: 'Démo',
    scheduler: 'Planificateur',
    
    // Hero Section
    heroTitle: 'Connectez-vous au futur de la collaboration',
    heroSubtitle: 'Une plateforme de visioconférence nouvelle génération avec IA intégrée, tableau blanc collaboratif et sécurité avancée.',
    startDemo: 'Démarrer la démo',
    learnMore: 'En savoir plus',
    
    // Features
    featuresTitle: 'Fonctionnalités avancées',
    featuresSubtitle: 'Découvrez nos outils de collaboration innovants',
    videoConferencing: 'Visioconférence HD',
    videoConferencingDesc: 'Qualité vidéo 4K, audio cristallin et partage d\'écran fluide',
    aiAssistant: 'Assistant IA',
    aiAssistantDesc: 'IA conversationnelle pour résumer, traduire et organiser vos réunions',
    whiteboard: 'Tableau blanc collaboratif',
    whiteboardDesc: 'Créez, dessinez et collaborez en temps réel avec votre équipe',
    security: 'Sécurité avancée',
    securityDesc: 'Chiffrement de bout en bout et conformité RGPD',
    
    // Features Cards
    featureHDVideo: 'Vidéo Haute Définition',
    featureHDVideoDesc: 'Qualité vidéo optimisée pour des réunions professionnelles fluides.',
    featureHDBenefit1: 'Résolution HD',
    featureHDBenefit2: 'Stabilisation vidéo',
    featureHDBenefit3: 'Auto-ajustement qualité',
    
    featureSecurity: 'Sécurisé',
    featureSecurityDesc: 'Connexions chiffrées et données protégées selon les standards.',
    featureSecurityBenefit1: 'Chiffrement standard',
    featureSecurityBenefit2: 'Connexions sécurisées',
    featureSecurityBenefit3: 'Confidentialité respectée',
    
    featureMultiparticipants: 'Multi-participants',
    featureMultiparticipantsDesc: 'Gérez facilement vos participants avec une interface simple.',
    featureMultiparticipantsBenefit1: 'Plusieurs participants',
    featureMultiparticipantsBenefit2: 'Gestion des permissions',
    featureMultiparticipantsBenefit3: 'Chat intégré',
    
    featurePerformance: 'Performance Optimisée',
    featurePerformanceDesc: 'Interface réactive et connexions stables pour vos réunions.',
    featurePerformanceBenefit1: 'Connexion stable',
    featurePerformanceBenefit2: 'Interface rapide',
    featurePerformanceBenefit3: 'Compatible multi-plateforme',
    
    featureAccessibility: 'Accessible Partout',
    featureAccessibilityDesc: 'Rejoignez vos réunions depuis n\'importe quel navigateur web moderne.',
    featureAccessibilityBenefit1: 'Compatible navigateurs',
    featureAccessibilityBenefit2: 'Pas de téléchargement',
    featureAccessibilityBenefit3: 'Multi-plateforme',
    
    featureInterface: 'Interface Simple',
    featureInterfaceDesc: 'Design épuré et intuitif pour des visioconférences sans prise de tête.',
    featureInterfaceBenefit1: 'Design moderne',
    featureInterfaceBenefit2: 'Navigation intuitive',
    featureInterfaceBenefit3: 'Responsive design',
    
    // Stats
    statValue1: 'Juillet 2023',
    statLabel1: 'Début du projet',
    statValue2: '1 développeur',
    statLabel2: 'Théo, 25 ans',
    statValue3: '~3 utilisateurs',
    statLabel3: 'Tests en famille/amis',
    statValue4: 'React + WebRTC',
    statLabel4: 'Technologies utilisées',
    
    // About Page
    aboutTitle: 'À propos de VisioConnect',
    aboutSubtitle: 'Une aventure de développement passionnée démarrée en juillet 2023',
    aboutDescription: 'VisioConnect est né de la passion de créer des outils de communication modernes et accessibles. Ce projet personnel mené par un développeur passionné vise à offrir une alternative simple et efficace aux solutions de visioconférence existantes.',
    
    // Features Page
    featuresPageTitle: 'Fonctionnalités',
    featuresPageSubtitle: 'Découvrez toutes les capacités de VisioConnect pour transformer vos réunions en expériences collaboratives exceptionnelles.',
    allFeatures: 'Toutes nos fonctionnalités',
    coreFeatures: 'Fonctionnalités principales',
    collaborationFeatures: 'Collaboration',

    // Pricing
    pricingTitle: 'Tarifs simples et transparents',
    pricingSubtitle: 'Choisissez le plan qui convient à votre équipe',
    freePlan: 'Gratuit',
    proPlan: 'Professionnel',
    enterprisePlan: 'Entreprise',
    maxParticipants: 'participants',
    duration: 'minutes par réunion',
    unlimited: 'Illimité',
    getStarted: 'Commencer',
    
    // Video Conference
    meetingRoom: 'Salle de réunion',
    joinMeeting: 'Rejoindre la réunion',
    leaveMeeting: 'Quitter la réunion',
    leaveMeetingTitle: 'Quitter la réunion ?',
    leaveMeetingConfirmation: 'Êtes-vous sûr de vouloir quitter cette réunion ? Vous ne pourrez pas la rejoindre à nouveau sans invitation.',
    microphoneOn: 'Microphone activé',
    microphoneOff: 'Microphone désactivé',
    cameraOn: 'Caméra activée',
    cameraOff: 'Caméra désactivée',
    startSharing: 'Partager l\'écran',
    stopSharing: 'Arrêter le partage',
    chat: 'Discussion',
    participants: 'Participants',
    participantsCount: '{{count}} Participants',
    settings: 'Paramètres',
    whiteboardTool: 'Tableau blanc',
    enterFullscreen: 'Plein écran',
    exitFullscreen: 'Quitter plein écran',
    endCall: 'Raccrocher',
    establishingConnection: 'Établissement de la connexion',
    connectionSetupMessage: 'Configuration de votre connexion vidéo sécurisée. Cela prendra juste un moment...',
    excellentConnection: 'Connexion excellente',
    goodConnection: 'Bonne connexion',
    fairConnection: 'Connexion moyenne',
    poorConnection: 'Connexion faible',
    
    // Common
    loading: 'Chargement...',
    error: 'Erreur',
    retry: 'Réessayer',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    save: 'Enregistrer',
    close: 'Fermer',
    
    // Footer
    company: 'Entreprise',
    product: 'Produit',
    resources: 'Ressources',
    support: 'Support',
    legal: 'Légal',
    privacy: 'Confidentialité',
    terms: 'Conditions d\'utilisation',
    cookies: 'Cookies',
    createdBy: 'Créé par',
    madeInFrance: 'Fait en France',
    copyrightText: '© 2025 VisioConnect - Créé par Théo Garcès. Fait en France',
    developmentStatus: 'Projet démarré en juillet 2023. Développement actif en cours.',
    careers: 'Carrières',
  },
  
  en: {
    // Navigation
    home: 'Home',
    features: 'Features',
    pricing: 'Pricing',
    about: 'About',
    contact: 'Contact',
    login: 'Login',
    signup: 'Sign Up',
    demo: 'Demo',
    scheduler: 'Scheduler',
    
    // Stats
    statValue1: 'July 2023',
    statLabel1: 'Project started',
    statValue2: '1 developer',
    statLabel2: 'Théo, 25 years old',
    statValue3: '~3 users',
    statLabel3: 'Family/friends testing',
    statValue4: 'React + WebRTC',
    statLabel4: 'Technologies used',
    
    // About Page
    aboutTitle: 'About VisioConnect',
    aboutSubtitle: 'A passionate development journey started in July 2023',
    aboutDescription: 'VisioConnect was born from the passion to create modern and accessible communication tools. This personal project led by a passionate developer aims to offer a simple and effective alternative to existing video conferencing solutions.',
    
    // Features Page
    featuresPageTitle: 'Features',
    featuresPageSubtitle: 'Discover all VisioConnect capabilities to transform your meetings into exceptional collaborative experiences.',
    allFeatures: 'All our features',
    coreFeatures: 'Core Features',
    collaborationFeatures: 'Collaboration',
    
    // Hero Section
    heroTitle: 'Connect to the future of collaboration',
    heroSubtitle: 'A next-generation video conferencing platform with integrated AI, collaborative whiteboard and advanced security.',
    startDemo: 'Start Demo',
    learnMore: 'Learn More',
    
    // Features
    featuresTitle: 'Advanced Features',
    featuresSubtitle: 'Discover our innovative collaboration tools',
    videoConferencing: 'HD Video Conferencing',
    videoConferencingDesc: '4K video quality, crystal clear audio and smooth screen sharing',
    aiAssistant: 'AI Assistant',
    aiAssistantDesc: 'Conversational AI to summarize, translate and organize your meetings',
    whiteboard: 'Collaborative Whiteboard',
    whiteboardDesc: 'Create, draw and collaborate in real-time with your team',
    security: 'Advanced Security',
    securityDesc: 'End-to-end encryption and GDPR compliance',
    
    // Features Cards
    featureHDVideo: 'HD Video',
    featureHDVideoDesc: 'Optimized video quality for smooth professional meetings.',
    featureHDBenefit1: 'HD Resolution',
    featureHDBenefit2: 'Video stabilization',
    featureHDBenefit3: 'Auto quality adjustment',
    
    featureSecurity: 'Secure',
    featureSecurityDesc: 'Encrypted connections and protected data according to standards.',
    featureSecurityBenefit1: 'Standard encryption',
    featureSecurityBenefit2: 'Secure connections',
    featureSecurityBenefit3: 'Privacy respected',
    
    featureMultiparticipants: 'Multi-participants',
    featureMultiparticipantsDesc: 'Easily manage your participants with a simple interface.',
    featureMultiparticipantsBenefit1: 'Multiple participants',
    featureMultiparticipantsBenefit2: 'Permissions management',
    featureMultiparticipantsBenefit3: 'Integrated chat',
    
    featurePerformance: 'Optimized Performance',
    featurePerformanceDesc: 'Responsive interface and stable connections for your meetings.',
    featurePerformanceBenefit1: 'Stable connection',
    featurePerformanceBenefit2: 'Fast interface',
    featurePerformanceBenefit3: 'Multi-platform compatible',
    
    featureAccessibility: 'Accessible Everywhere',
    featureAccessibilityDesc: 'Join your meetings from any modern web browser.',
    featureAccessibilityBenefit1: 'Browser compatible',
    featureAccessibilityBenefit2: 'No download needed',
    featureAccessibilityBenefit3: 'Multi-platform',
    
    featureInterface: 'Simple Interface',
    featureInterfaceDesc: 'Clean and intuitive design for hassle-free video conferencing.',
    featureInterfaceBenefit1: 'Modern design',
    featureInterfaceBenefit2: 'Intuitive navigation',
    featureInterfaceBenefit3: 'Responsive design',
    
    // Pricing
    pricingTitle: 'Simple and transparent pricing',
    pricingSubtitle: 'Choose the plan that fits your team',
    freePlan: 'Free',
    proPlan: 'Professional',
    enterprisePlan: 'Enterprise',
    maxParticipants: 'participants',
    duration: 'minutes per meeting',
    unlimited: 'Unlimited',
    getStarted: 'Get Started',
    
    // Video Conference
    meetingRoom: 'Meeting Room',
    joinMeeting: 'Join Meeting',
    leaveMeeting: 'Leave Meeting',
    leaveMeetingTitle: 'Leave Meeting?',
    leaveMeetingConfirmation: 'Are you sure you want to leave this meeting? You won\'t be able to rejoin unless someone lets you back in.',
    microphoneOn: 'Microphone On',
    microphoneOff: 'Microphone Off',
    cameraOn: 'Camera On',
    cameraOff: 'Camera Off',
    startSharing: 'Share Screen',
    stopSharing: 'Stop Sharing',
    chat: 'Chat',
    participants: 'Participants',
    participantsCount: '{{count}} Participants',
    settings: 'Settings',
    whiteboardTool: 'Whiteboard',
    enterFullscreen: 'Fullscreen',
    exitFullscreen: 'Exit Fullscreen',
    endCall: 'End Call',
    establishingConnection: 'Establishing Connection',
    connectionSetupMessage: 'Setting up your secure video connection. This will just take a moment...',
    excellentConnection: 'Excellent Connection',
    goodConnection: 'Good Connection',
    fairConnection: 'Fair Connection',
    poorConnection: 'Poor Connection',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    retry: 'Retry',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    close: 'Close',
    
    // Footer
    company: 'Company',
    product: 'Product',
    resources: 'Resources',
    support: 'Support',
    legal: 'Legal',
    privacy: 'Privacy',
    terms: 'Terms of Service',
    cookies: 'Cookies',
    createdBy: 'Created by',
    madeInFrance: 'Made in France',
    copyrightText: '© 2025 VisioConnect - Created by Théo Garcès. Made in France',
    developmentStatus: 'Project started in July 2023. Active development in progress.',
    careers: 'Careers',
  },
  
  es: {
    // Navigation
    home: 'Inicio',
    features: 'Características',
    pricing: 'Precios',
    about: 'Acerca de',
    contact: 'Contacto',
    login: 'Iniciar sesión',
    signup: 'Registrarse',
    demo: 'Demo',
    scheduler: 'Planificador',
    
    // Stats
    statValue1: 'Julio 2023',
    statLabel1: 'Inicio del proyecto',
    statValue2: '1 desarrollador',
    statLabel2: 'Théo, 25 años',
    statValue3: '~3 usuarios',
    statLabel3: 'Pruebas con familia/amigos',
    statValue4: 'React + WebRTC',
    statLabel4: 'Tecnologías utilizadas',
    
    // About Page
    aboutTitle: 'Acerca de VisioConnect',
    aboutSubtitle: 'Un viaje de desarrollo apasionado iniciado en julio de 2023',
    aboutDescription: 'VisioConnect nació de la pasión por crear herramientas de comunicación modernas y accesibles. Este proyecto personal liderado por un desarrollador apasionado tiene como objetivo ofrecer una alternativa simple y efectiva a las soluciones de videoconferencia existentes.',
    
    // Features Page
    featuresPageTitle: 'Características',
    featuresPageSubtitle: 'Descubre todas las capacidades de VisioConnect para transformar tus reuniones en experiencias colaborativas excepcionales.',
    allFeatures: 'Todas nuestras características',
    coreFeatures: 'Características Principales',
    collaborationFeatures: 'Colaboración',
    
    // Hero Section
    heroTitle: 'Conéctate al futuro de la colaboración',
    heroSubtitle: 'Una plataforma de videoconferencias de nueva generación con IA integrada, pizarra colaborativa y seguridad avanzada.',
    startDemo: 'Iniciar Demo',
    learnMore: 'Saber más',
    
    // Features
    featuresTitle: 'Características Avanzadas',
    featuresSubtitle: 'Descubre nuestras herramientas de colaboración innovadoras',
    videoConferencing: 'Videoconferencia HD',
    videoConferencingDesc: 'Calidad de video 4K, audio cristalino y compartir pantalla fluido',
    aiAssistant: 'Asistente IA',
    aiAssistantDesc: 'IA conversacional para resumir, traducir y organizar tus reuniones',
    whiteboard: 'Pizarra Colaborativa',
    whiteboardDesc: 'Crea, dibuja y colabora en tiempo real con tu equipo',
    security: 'Seguridad Avanzada',
    securityDesc: 'Cifrado de extremo a extremo y cumplimiento GDPR',
    
    // Features Cards
    featureHDVideo: 'Video de Alta Definición',
    featureHDVideoDesc: 'Calidad de video optimizada para reuniones profesionales fluidas.',
    featureHDBenefit1: 'Resolución HD',
    featureHDBenefit2: 'Estabilización de video',
    featureHDBenefit3: 'Ajuste automático de calidad',
    
    featureSecurity: 'Seguro',
    featureSecurityDesc: 'Conexiones cifradas y datos protegidos según los estándares.',
    featureSecurityBenefit1: 'Cifrado estándar',
    featureSecurityBenefit2: 'Conexiones seguras',
    featureSecurityBenefit3: 'Privacidad respetada',
    
    featureMultiparticipants: 'Multi-participantes',
    featureMultiparticipantsDesc: 'Gestiona fácilmente tus participantes con una interfaz simple.',
    featureMultiparticipantsBenefit1: 'Múltiples participantes',
    featureMultiparticipantsBenefit2: 'Gestión de permisos',
    featureMultiparticipantsBenefit3: 'Chat integrado',
    
    featurePerformance: 'Rendimiento Optimizado',
    featurePerformanceDesc: 'Interfaz receptiva y conexiones estables para tus reuniones.',
    featurePerformanceBenefit1: 'Conexión estable',
    featurePerformanceBenefit2: 'Interfaz rápida',
    featurePerformanceBenefit3: 'Compatible con múltiples plataformas',
    
    featureAccessibility: 'Accesible en Todas Partes',
    featureAccessibilityDesc: 'Únete a tus reuniones desde cualquier navegador web moderno.',
    featureAccessibilityBenefit1: 'Compatible con navegadores',
    featureAccessibilityBenefit2: 'Sin necesidad de descargas',
    featureAccessibilityBenefit3: 'Multi-plataforma',
    
    featureInterface: 'Interfaz Simple',
    featureInterfaceDesc: 'Diseño limpio e intuitivo para videoconferencias sin complicaciones.',
    featureInterfaceBenefit1: 'Diseño moderno',
    featureInterfaceBenefit2: 'Navegación intuitiva',
    featureInterfaceBenefit3: 'Diseño responsivo',
    
    // Pricing
    pricingTitle: 'Precios simples y transparentes',
    pricingSubtitle: 'Elige el plan que se adapte a tu equipo',
    freePlan: 'Gratis',
    proPlan: 'Profesional',
    enterprisePlan: 'Empresa',
    maxParticipants: 'participantes',
    duration: 'minutos por reunión',
    unlimited: 'Ilimitado',
    getStarted: 'Comenzar',
    
    // Video Conference
    meetingRoom: 'Sala de Reunión',
    joinMeeting: 'Unirse a la Reunión',
    leaveMeeting: 'Salir de la Reunión',
    leaveMeetingTitle: '¿Salir de la Reunión?',
    leaveMeetingConfirmation: '¿Está seguro de que desea salir de esta reunión? No podrá volver a unirse a menos que alguien le permita entrar.',
    microphoneOn: 'Micrófono Activado',
    microphoneOff: 'Micrófono Desactivado',
    cameraOn: 'Cámara Activada',
    cameraOff: 'Cámara Desactivada',
    startSharing: 'Compartir Pantalla',
    stopSharing: 'Dejar de Compartir',
    chat: 'Chat',
    participants: 'Participantes',
    participantsCount: '{{count}} Participantes',
    settings: 'Configuración',
    whiteboardTool: 'Pizarra',
    enterFullscreen: 'Pantalla Completa',
    exitFullscreen: 'Salir de Pantalla Completa',
    endCall: 'Finalizar Llamada',
    establishingConnection: 'Estableciendo Conexión',
    connectionSetupMessage: 'Configurando su conexión de video segura. Esto tomará solo un momento...',
    excellentConnection: 'Conexión Excelente',
    goodConnection: 'Buena Conexión',
    fairConnection: 'Conexión Regular',
    poorConnection: 'Conexión Débil',
    
    // Common
    loading: 'Cargando...',
    error: 'Error',
    retry: 'Reintentar',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    save: 'Guardar',
    close: 'Cerrar',
    
    // Footer
    company: 'Empresa',
    product: 'Producto',
    resources: 'Recursos',
    support: 'Soporte',
    legal: 'Legal',
    privacy: 'Privacidad',
    terms: 'Términos de Servicio',
    cookies: 'Cookies',
    createdBy: 'Creado por',
    madeInFrance: 'Hecho en Francia',
    copyrightText: '© 2025 VisioConnect - Creado por Théo Garcès. Hecho en Francia',
    developmentStatus: 'Proyecto iniciado en julio de 2023. Desarrollo activo en curso.',
    careers: 'Carreras',
  },
  
  de: {
    // Navigation
    home: 'Startseite',
    features: 'Funktionen',
    pricing: 'Preise',
    about: 'Über uns',
    contact: 'Kontakt',
    login: 'Anmelden',
    signup: 'Registrieren',
    demo: 'Demo',
    scheduler: 'Planer',
    
    // Stats
    statValue1: 'Juli 2023',
    statLabel1: 'Projektstart',
    statValue2: '1 Entwickler',
    statLabel2: 'Théo, 25 Jahre',
    statValue3: '~3 Benutzer',
    statLabel3: 'Tests mit Familie/Freunden',
    statValue4: 'React + WebRTC',
    statLabel4: 'Verwendete Technologien',
    
    // About Page
    aboutTitle: 'Über VisioConnect',
    aboutSubtitle: 'Eine leidenschaftliche Entwicklungsreise, die im Juli 2023 begann',
    aboutDescription: 'VisioConnect entstand aus der Leidenschaft heraus, moderne und zugängliche Kommunikationstools zu schaffen. Dieses persönliche Projekt, das von einem leidenschaftlichen Entwickler geleitet wird, zielt darauf ab, eine einfache und effektive Alternative zu bestehenden Videokonferenzlösungen zu bieten.',
    
    // Features Page
    featuresPageTitle: 'Funktionen',
    featuresPageSubtitle: 'Entdecken Sie alle Fähigkeiten von VisioConnect, um Ihre Meetings in außergewöhnliche kollaborative Erfahrungen zu verwandeln.',
    allFeatures: 'Alle unsere Funktionen',
    coreFeatures: 'Kernfunktionen',
    collaborationFeatures: 'Zusammenarbeit',
    
    // Hero Section
    heroTitle: 'Verbinden Sie sich mit der Zukunft der Zusammenarbeit',
    heroSubtitle: 'Eine Videokonferenz-Plattform der nächsten Generation mit integrierter KI, kollaborativem Whiteboard und erweiterten Sicherheit.',
    startDemo: 'Demo starten',
    learnMore: 'Mehr erfahren',
    
    // Features
    featuresTitle: 'Erweiterte Funktionen',
    featuresSubtitle: 'Entdecken Sie unsere innovativen Collaboration-Tools',
    videoConferencing: 'HD-Videokonferenz',
    videoConferencingDesc: '4K-Videoqualität, kristallklarer Sound und nahtlose Bildschirmfreigabe',
    aiAssistant: 'KI-Assistent',
    aiAssistantDesc: 'Konversationelle KI zum Zusammenfassen, Übersetzen und Organisieren Ihrer Meetings',
    whiteboard: 'Kollaboratives Whiteboard',
    whiteboardDesc: 'Erstellen, zeichnen und arbeiten Sie in Echtzeit mit Ihrem Team zusammen',
    security: 'Erweiterte Sicherheit',
    securityDesc: 'Ende-zu-Ende-Verschlüsselung und GDPR-Konformität',
    
    // Features Cards
    featureHDVideo: 'HD-Video',
    featureHDVideoDesc: 'Optimierte Videoqualität für reibungslose professionelle Meetings.',
    featureHDBenefit1: 'HD-Auflösung',
    featureHDBenefit2: 'Videostabilisierung',
    featureHDBenefit3: 'Automatische Qualitätsanpassung',
    
    featureSecurity: 'Sicher',
    featureSecurityDesc: 'Verschlüsselte Verbindungen und geschützte Daten nach Standards.',
    featureSecurityBenefit1: 'Standardverschlüsselung',
    featureSecurityBenefit2: 'Sichere Verbindungen',
    featureSecurityBenefit3: 'Privatsphäre respektiert',
    
    featureMultiparticipants: 'Mehrere Teilnehmer',
    featureMultiparticipantsDesc: 'Einfache Verwaltung Ihrer Teilnehmer mit einer übersichtlichen Oberfläche.',
    featureMultiparticipantsBenefit1: 'Mehrere Teilnehmer',
    featureMultiparticipantsBenefit2: 'Berechtigungsverwaltung',
    featureMultiparticipantsBenefit3: 'Integrierter Chat',
    
    featurePerformance: 'Optimierte Leistung',
    featurePerformanceDesc: 'Reaktionsschnelle Oberfläche und stabile Verbindungen für Ihre Meetings.',
    featurePerformanceBenefit1: 'Stabile Verbindung',
    featurePerformanceBenefit2: 'Schnelle Benutzeroberfläche',
    featurePerformanceBenefit3: 'Plattformübergreifend kompatibel',
    
    featureAccessibility: 'Überall zugänglich',
    featureAccessibilityDesc: 'Nehmen Sie an Meetings von jedem modernen Webbrowser aus teil.',
    featureAccessibilityBenefit1: 'Browser-kompatibel',
    featureAccessibilityBenefit2: 'Kein Download erforderlich',
    featureAccessibilityBenefit3: 'Multi-Plattform',
    
    featureInterface: 'Einfache Oberfläche',
    featureInterfaceDesc: 'Klares und intuitives Design für problemlose Videokonferenzen.',
    featureInterfaceBenefit1: 'Modernes Design',
    featureInterfaceBenefit2: 'Intuitive Navigation',
    featureInterfaceBenefit3: 'Responsives Design',
    
    // Pricing
    pricingTitle: 'Einfache und transparente Preise',
    pricingSubtitle: 'Wählen Sie den Plan, der zu Ihrem Team passt',
    freePlan: 'Kostenlos',
    proPlan: 'Professionell',
    enterprisePlan: 'Unternehmen',
    maxParticipants: 'Teilnehmer',
    duration: 'Minuten pro Meeting',
    unlimited: 'Unbegrenzt',
    getStarted: 'Loslegen',
    
    // Video Conference
    meetingRoom: 'Meetingraum',
    joinMeeting: 'Meeting beitreten',
    leaveMeeting: 'Meeting verlassen',
    leaveMeetingTitle: 'Meeting verlassen?',
    leaveMeetingConfirmation: 'Sind Sie sicher, dass Sie dieses Meeting verlassen möchten? Sie können nicht wieder beitreten, es sei denn, jemand lässt Sie wieder herein.',
    microphoneOn: 'Mikrofon ein',
    microphoneOff: 'Mikrofon aus',
    cameraOn: 'Kamera ein',
    cameraOff: 'Kamera aus',
    startSharing: 'Bildschirm teilen',
    stopSharing: 'Teilen beenden',
    chat: 'Chat',
    participants: 'Teilnehmer',
    participantsCount: '{{count}} Teilnehmer',
    settings: 'Einstellungen',
    whiteboardTool: 'Whiteboard',
    enterFullscreen: 'Vollbild',
    exitFullscreen: 'Vollbild beenden',
    endCall: 'Anruf beenden',
    establishingConnection: 'Verbindung wird hergestellt',
    connectionSetupMessage: 'Ihre sichere Videoverbindung wird eingerichtet. Dies dauert nur einen Moment...',
    excellentConnection: 'Ausgezeichnete Verbindung',
    goodConnection: 'Gute Verbindung',
    fairConnection: 'Mittelmäßige Verbindung',
    poorConnection: 'Schlechte Verbindung',
    
    // Common
    loading: 'Laden...',
    error: 'Fehler',
    retry: 'Wiederholen',
    cancel: 'Abbrechen',
    confirm: 'Bestätigen',
    save: 'Speichern',
    close: 'Schließen',
    
    // Footer
    company: 'Unternehmen',
    product: 'Produkt',
    resources: 'Ressourcen',
    support: 'Support',
    legal: 'Rechtliches',
    privacy: 'Datenschutz',
    terms: 'Nutzungsbedingungen',
    cookies: 'Cookies',
    createdBy: 'Erstellt von',
    madeInFrance: 'Hergestellt in Frankreich',
    copyrightText: '© 2025 VisioConnect - Erstellt von Théo Garcès. Hergestellt in Frankreich',
    developmentStatus: 'Projekt im Juli 2023 gestartet. Aktive Entwicklung läuft.',
    careers: 'Karriere',
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  
  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
  };
  
  const t = (key, variables = {}) => {
    let text = translations[currentLanguage]?.[key] || key;
    
    // Replace any variables in the text (format: {{variableName}})
    if (variables) {
      Object.keys(variables).forEach(varName => {
        const regex = new RegExp(`{{${varName}}}`, 'g');
        text = text.replace(regex, variables[varName]);
      });
    }
    
    return text;
  };
  
  // Charger la langue depuis localStorage au démarrage
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);
  
  const value = {
    currentLanguage,
    changeLanguage,
    t,
    availableLanguages: [
      { code: 'fr', name: 'Français', flag: '🇫🇷' },
      { code: 'en', name: 'English', flag: '🇬🇧' },
      { code: 'es', name: 'Español', flag: '🇪🇸' },
      { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
    ]
  };
  
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};