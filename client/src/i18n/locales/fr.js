// French translations (default)
const frTranslations = {
  common: {
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    save: 'Enregistrer',
    edit: 'Modifier',
    delete: 'Supprimer',
    back: 'Retour',
    next: 'Suivant',
    previous: 'Précédent',
    close: 'Fermer',
    search: 'Rechercher',
    filter: 'Filtrer',
    sort: 'Trier',
    email: 'Email',
    password: 'Mot de passe',
    name: 'Nom',
    firstName: 'Prénom',
    lastName: 'Nom de famille',
    phone: 'Téléphone',
    address: 'Adresse',
    city: 'Ville',
    country: 'Pays',
    language: 'Langue',
    settings: 'Paramètres',
    profile: 'Profil',
    logout: 'Déconnexion',
    login: 'Connexion',
    register: 'S\'inscrire',
    forgotPassword: 'Mot de passe oublié ?'
  },

  navigation: {
    home: 'Accueil',
    features: 'Fonctionnalités',
    pricing: 'Tarifs',
    about: 'À propos',
    contact: 'Contact',
    support: 'Support',
    documentation: 'Documentation',
    community: 'Communauté',
    blog: 'Blog',
    careers: 'Carrières',
    legal: 'Mentions légales',
    privacy: 'Confidentialité',
    terms: 'Conditions d\'utilisation',
    cookies: 'Cookies',
    security: 'Sécurité'
  },

  hero: {
    title: 'La plateforme de visioconférence nouvelle génération',
    subtitle: 'Connectez-vous facilement avec vos équipes grâce à notre solution de visioconférence avancée et intuitive',
    startFree: 'Commencer gratuitement',
    watchDemo: 'Voir la démo',
    trustedBy: 'Utilisé par plus de {{count}} entreprises dans le monde'
  },

  features: {
    title: 'Fonctionnalités puissantes',
    subtitle: 'Tout ce dont vous avez besoin pour des réunions productives',
    videoCall: {
      title: 'Appels vidéo HD',
      description: 'Qualité vidéo cristalline jusqu\'à 4K avec audio de qualité studio'
    },
    screenShare: {
      title: 'Partage d\'écran',
      description: 'Partagez votre écran, des applications ou des onglets spécifiques'
    },
    recording: {
      title: 'Enregistrement',
      description: 'Enregistrez vos réunions et accédez-y plus tard'
    },
    chat: {
      title: 'Chat intégré',
      description: 'Chattez pendant les appels avec des messages et fichiers'
    },
    whiteboard: {
      title: 'Tableau blanc',
      description: 'Collaborez visuellement avec un tableau blanc intégré'
    },
    security: {
      title: 'Sécurité avancée',
      description: 'Chiffrement de bout en bout et contrôles de sécurité'
    }
  },

  pricing: {
    title: 'Tarifs simples et transparents',
    subtitle: 'Choisissez le plan qui correspond à vos besoins',
    monthly: 'Mensuel',
    yearly: 'Annuel',
    perMonth: '/mois',
    perUser: 'par utilisateur',
    free: {
      title: 'Gratuit',
      price: '0€',
      description: 'Parfait pour commencer',
      features: [
        'Jusqu\'à 3 participants',
        'Réunions de 40 minutes',
        'Audio et vidéo HD',
        'Partage d\'écran'
      ]
    },
    pro: {
      title: 'Pro',
      price: '12€',
      description: 'Pour les équipes en croissance',
      features: [
        'Jusqu\'à 50 participants',
        'Réunions illimitées',
        'Enregistrement cloud',
        'Chat et tableau blanc',
        'Support prioritaire'
      ]
    },
    enterprise: {
      title: 'Enterprise',
      price: 'Sur mesure',
      description: 'Pour les grandes organisations',
      features: [
        'Participants illimités',
        'SSO et intégrations',
        'Administration avancée',
        'Support dédié',
        'SLA garanti'
      ]
    },
    getStarted: 'Commencer',
    contactSales: 'Contacter les ventes'
  },

  auth: {
    login: {
      title: 'Connexion',
      subtitle: 'Accédez à votre compte VisiConnect',
      email: 'Adresse email',
      password: 'Mot de passe',
      rememberMe: 'Se souvenir de moi',
      forgotPassword: 'Mot de passe oublié ?',
      signIn: 'Se connecter',
      noAccount: 'Pas encore de compte ?',
      createAccount: 'Créer un compte',
      orContinueWith: 'Ou continuer avec'
    },
    signup: {
      title: 'Créer un compte',
      subtitle: 'Rejoignez VisiConnect dès aujourd\'hui',
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'Adresse email',
      password: 'Mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      acceptTerms: 'J\'accepte les {{terms}} et la {{privacy}}',
      terms: 'conditions d\'utilisation',
      privacy: 'politique de confidentialité',
      createAccount: 'Créer un compte',
      alreadyHaveAccount: 'Déjà un compte ?',
      signIn: 'Se connecter',
      orContinueWith: 'Ou continuer avec'
    },
    forgotPassword: {
      title: 'Mot de passe oublié',
      subtitle: 'Entrez votre email pour réinitialiser votre mot de passe',
      email: 'Adresse email',
      sendReset: 'Envoyer le lien de réinitialisation',
      backToLogin: 'Retour à la connexion'
    }
  },

  meeting: {
    title: 'Réunion',
    participants: 'Participants',
    chat: 'Chat',
    settings: 'Paramètres',
    leave: 'Quitter',
    mute: 'Couper le micro',
    unmute: 'Activer le micro',
    video: 'Caméra',
    screenShare: 'Partager l\'écran',
    record: 'Enregistrer',
    endMeeting: 'Terminer la réunion',
    inviteOthers: 'Inviter d\'autres personnes',
    copyLink: 'Copier le lien',
    joinedMeeting: '{{name}} a rejoint la réunion',
    leftMeeting: '{{name}} a quitté la réunion'
  },

  tutorial: {
    title: 'Guide de démarrage',
    welcome: 'Bienvenue sur VisiConnect !',
    step1: {
      title: 'Créer une réunion',
      description: 'Cliquez sur "Nouvelle réunion" pour commencer'
    },
    step2: {
      title: 'Inviter des participants',
      description: 'Partagez le lien de la réunion avec vos collègues'
    },
    step3: {
      title: 'Utiliser les outils',
      description: 'Découvrez le partage d\'écran, le chat et le tableau blanc'
    },
    step4: {
      title: 'Gérer les paramètres',
      description: 'Personnalisez votre expérience dans les paramètres'
    },
    next: 'Suivant',
    previous: 'Précédent',
    finish: 'Terminer',
    skip: 'Passer le guide'
  },

  errors: {
    network: 'Erreur de connexion réseau',
    unauthorized: 'Accès non autorisé',
    forbidden: 'Accès interdit',
    notFound: 'Ressource non trouvée',
    serverError: 'Erreur du serveur',
    validation: 'Erreur de validation',
    unknown: 'Une erreur inconnue s\'est produite',
    tryAgain: 'Veuillez réessayer',
    contactSupport: 'Contactez le support si le problème persiste'
  },

  success: {
    accountCreated: 'Compte créé avec succès !',
    passwordReset: 'Email de réinitialisation envoyé',
    settingsSaved: 'Paramètres sauvegardés',
    invitationSent: 'Invitation envoyée',
    meetingCreated: 'Réunion créée avec succès',
    profileUpdated: 'Profil mis à jour'
  },

  // Clés spécifiques HomePage
  featureHDVideo: 'Vidéo HD',
  featureHDVideoDesc: 'Qualité vidéo haute définition pour des réunions cristallines',
  featureHDBenefit1: 'Résolution jusqu\'à 4K',
  featureHDBenefit2: 'Audio de qualité studio',
  featureHDBenefit3: 'Optimisation automatique',

  featureSecurity: 'Sécurité avancée',
  featureSecurityDesc: 'Protection maximale avec chiffrement de bout en bout',
  featureSecurityBenefit1: 'Chiffrement AES-256',
  featureSecurityBenefit2: 'Authentification sécurisée',
  featureSecurityBenefit3: 'Conformité RGPD',

  featureMultiparticipants: 'Multi-participants',
  featureMultiparticipantsDesc: 'Réunions avec plusieurs participants simultanément',
  featureMultiparticipantsBenefit1: 'Jusqu\'à 50 participants',
  featureMultiparticipantsBenefit2: 'Gestion des permissions',
  featureMultiparticipantsBenefit3: 'Vue en grille adaptative',

  featurePerformance: 'Performance optimale',
  featurePerformanceDesc: 'Technologie avancée pour une expérience fluide',
  featurePerformanceBenefit1: 'Latence ultra-faible',
  featurePerformanceBenefit2: 'Optimisation bande passante',
  featurePerformanceBenefit3: 'Adaptation automatique',

  featureAccessibility: 'Accessibilité',
  featureAccessibilityDesc: 'Plateforme accessible à tous, partout',
  featureAccessibilityBenefit1: 'Compatible tous appareils',
  featureAccessibilityBenefit2: 'Interface intuitive',
  featureAccessibilityBenefit3: 'Support multi-navigateurs',

  featureInterface: 'Interface moderne',
  featureInterfaceDesc: 'Design épuré et expérience utilisateur exceptionnelle',
  featureInterfaceBenefit1: 'Design responsive',
  featureInterfaceBenefit2: 'Navigation intuitive',
  featureInterfaceBenefit3: 'Thèmes personnalisables',

  // Plans tarifaires
  freePlan: 'Plan Gratuit',
  proPlan: 'Plan Pro',
  maxParticipants: 'participants maximum',
  duration: 'minutes de réunion',
  unlimited: 'illimité',
  getStarted: 'Commencer',

  // Statistiques
  statValue1: '3',
  statLabel1: 'Testeurs actifs',
  statValue2: '2024',
  statLabel2: 'Année de création',
  statValue3: '99.9%',
  statLabel3: 'Disponibilité visée',
  statValue4: '♥',
  statLabel4: 'Fait avec passion',

  // Textes divers
  copyrightText: '© 2024 VisioConnect. Développé avec ♥ par Théo Garcès.',
  developmentStatus: 'Plateforme en développement - Version bêta',

  // Hero section
  heroTitle: 'Visioconférence',
  heroSubtitle: 'Simple & Efficace',
  heroDescription: 'VisioConnect - Plateforme de visioconférence développée par Théo Garcès. Solution simple et efficace pour vos réunions en ligne, actuellement testée par une petite équipe de 3 personnes. Interface moderne, technologie fiable.',
  testPlatform: 'Tester la plateforme',
  seeFeatures: 'Voir les fonctionnalités',

  // Pricing section
  choosePlan: 'Choisissez votre plan',
  flexibleSolutions: 'Des solutions flexibles adaptées à tous vos besoins, de l\'usage personnel aux grandes entreprises',
  testWithFamily: 'Pour tester avec famille et amis',
  toDefine: 'à définir',
  proVersionLater: 'Version payante prévue pour plus tard',
  customPlan: 'Sur mesure',
  customDescription: 'Pour des besoins spécifiques (contactez-moi !)',
  negotiable: 'négociable',
  standardVideo: 'Qualité vidéo standard',
  basicChat: 'Chat de base',
  essentialFeatures: 'Fonctionnalités essentielles',
  improvedQuality: 'Qualité améliorée',
  bonusFeatures: 'Fonctionnalités bonus',
  updatePriority: 'Priorité dans les mises à jour',
  comingSoon: 'Bientôt disponible',
  customFeatures: 'Fonctionnalités personnalisées',
  onDemandDevelopment: 'Développement sur demande',
  privateInstallation: 'Installation privée possible',
  directSupport: 'Support direct avec Théo',
  needsAdaptation: 'Adaptation aux besoins',
  contactMe: 'Me contacter',

  // About section
  aboutProject: 'À propos du projet',
  projectDescription: 'VisioConnect est né de ma passion pour les technologies de communication moderne. En tant que développeur full-stack, j\'ai voulu créer une solution qui combine innovation technologique et expérience utilisateur exceptionnelle.',
  myVision: 'Ma vision',
  visionDescription: 'Démocratiser l\'accès à des outils de communication professionnels de haute qualité. Chaque équipe, quelle que soit sa taille, mérite une technologie qui amplifie sa collaboration.',
  technologiesUsed: 'Technologies utilisées',
  techDescription: 'React.js, WebRTC, Socket.io, Node.js, MongoDB, AI/ML pour l\'optimisation vidéo, et bien d\'autres technologies cutting-edge pour une expérience fluide.',
  creationYear: 'Année de création',
  philosophy: 'Philosophie',
  targetAvailability: 'Disponibilité visée',
  madeWithLove: 'Fait avec passion',

  // Contact section
  contactTitle: 'Contactez-moi',
  contactDescription: 'Une question, une suggestion, ou envie de collaborer ? N\'hésitez pas à me contacter !',
  
  // Integrations section
  integrations: {
    title: 'Intégrations',
    subtitle: 'Connectez VisiConnect à vos outils préférés pour une expérience unifiée et productive.',
    connect: 'Se connecter',
    google: {
      description: 'Intégrez Gmail, Google Calendar, Drive et toute la suite Google pour une productivité maximale.'
    },
    microsoft: {
      description: 'Synchronisez Teams, Outlook, OneDrive et SharePoint pour une collaboration optimale.'
    },
    slack: {
      description: 'Connectez Slack pour recevoir des notifications et contrôler vos réunions depuis votre workspace.'
    },
    zoom: {
      description: 'Intégration native avec Zoom pour une expérience vidéo fluide et des fonctionnalités étendues.'
    },
    trello: {
      description: 'Gérez vos projets et tâches directement depuis vos réunions avec une synchronisation bidirectionnelle.'
    },
    jira: {
      description: 'Synchronisez vos projets et documentations pour une gestion optimale des équipes.'
    },
    salesforce: {
      description: 'Intégrez votre CRM pour suivre vos prospects et clients directement en réunion.'
    },
    github: {
      description: 'Intégration complète avec GitHub pour la revue de code et la gestion de projet en équipe.'
    }
  },
  
  // Footer sections
  product: 'Produit',
  apiDocumentation: 'Documentation API',
  scheduler: 'Planificateur',
  serviceStatus: 'Statut du service',
  enterprise: 'Entreprise',
  community: 'Communauté',
  userGuide: 'Guide utilisateur',
  legalSecurity: 'Légal & Sécurité',
  privacyPolicy: 'Politique de confidentialité',
  termsOfUse: 'Conditions d\'utilisation',
  cookiePolicy: 'Politique des cookies',
  gdprCompliance: 'Conformité RGPD',
  accessibility: 'Accessibilité',
  contactAvailable: 'Contact disponible sur demande',
  developmentInProgress: 'Développement en cours',
  france: 'France',
  contactDeveloper: 'Contactez le développeur',
  
  // Features Page
  featuresPageTitle: 'Fonctionnalités',
  featuresPageSubtitle: 'Découvrez toutes les fonctionnalités qui font de VisioConnect une solution complète',
  
  // Feature Categories
  coreFeatures: 'Fonctionnalités principales',
  collaborationFeatures: 'Collaboration',
  technicalFeatures: 'Technique',
  
  // Core Features
  videoHD4K: 'Vidéoconférence HD 4K',
  videoHD4KDesc: 'Qualité vidéo cristalline jusqu\'à 4K avec optimisation automatique selon votre bande passante.',
  videoHD4KBenefit1: 'Résolution jusqu\'à 4K',
  videoHD4KBenefit2: 'Optimisation automatique',
  videoHD4KBenefit3: 'Faible latence',
  videoHD4KBenefit4: 'Support multi-écrans',
  
  unlimitedMeetings: 'Réunions illimitées',
  unlimitedMeetingsDesc: 'Organisez des réunions sans limite de participants avec notre technologie de mise à l\'échelle dynamique.',
  unlimitedMeetingsBenefit1: 'Participants illimités',
  unlimitedMeetingsBenefit2: 'Mise à l\'échelle automatique',
  unlimitedMeetingsBenefit3: 'Gestion des rôles',
  unlimitedMeetingsBenefit4: 'Salles virtuelles',
  
  enhancedSecurity: 'Sécurité renforcée',
  enhancedSecurityDesc: 'Chiffrement end-to-end et conformité aux standards de sécurité internationaux.',
  enhancedSecurityBenefit1: 'Chiffrement AES-256',
  enhancedSecurityBenefit2: 'Authentification 2FA',
  enhancedSecurityBenefit3: 'Conformité RGPD',
  enhancedSecurityBenefit4: 'Audit de sécurité',
  
  advancedScreenShare: 'Partage d\'écran avancé',
  advancedScreenShareDesc: 'Partagez votre écran, applications spécifiques ou tableaux blancs interactifs.',
  advancedScreenShareBenefit1: 'Partage sélectif',
  advancedScreenShareBenefit2: 'Contrôle à distance',
  advancedScreenShareBenefit3: 'Annotations',
  advancedScreenShareBenefit4: 'Enregistrement',
  
  // Collaboration Features
  interactiveWhiteboard: 'Tableau blanc interactif',
  interactiveWhiteboardDesc: 'Collaborez en temps réel sur des tableaux blancs avec outils de dessin avancés.',
  interactiveWhiteboardBenefit1: 'Outils de dessin',
  interactiveWhiteboardBenefit2: 'Collaboration temps réel',
  interactiveWhiteboardBenefit3: 'Templates intégrés',
  interactiveWhiteboardBenefit4: 'Export multiple formats',
  
  integratedChat: 'Chat intégré',
  integratedChatDesc: 'Communication textuelle enrichie avec fichiers, emojis et traduction automatique.',
  integratedChatBenefit1: 'Messages enrichis',
  integratedChatBenefit2: 'Partage de fichiers',
  integratedChatBenefit3: 'Traduction auto',
  integratedChatBenefit4: 'Historique persistent',
  
  smartScheduling: 'Planification intelligente',
  smartSchedulingDesc: 'Intégration calendrier avec suggestions automatiques de créneaux optimaux.',
  smartSchedulingBenefit1: 'Sync calendrier',
  smartSchedulingBenefit2: 'Suggestions IA',
  smartSchedulingBenefit3: 'Rappels automatiques',
  smartSchedulingBenefit4: 'Gestion des fuseaux',
  
  aiNoteTaking: 'Prise de notes IA',
  aiNoteTakingDesc: 'Transcription automatique et génération de résumés intelligents de vos réunions.',
  aiNoteTakingBenefit1: 'Transcription temps réel',
  aiNoteTakingBenefit2: 'Résumés IA',
  aiNoteTakingBenefit3: 'Points d\'action',
  aiNoteTakingBenefit4: 'Recherche sémantique',
  
  // Technical Features
  globalCDN: 'CDN mondial',
  globalCDNDesc: 'Infrastructure distribuée pour une performance optimale partout dans le monde.',
  globalCDNBenefit1: 'Latence minimale',
  globalCDNBenefit2: 'Disponibilité 99.9%',
  globalCDNBenefit3: 'Auto-scaling',
  globalCDNBenefit4: 'Edge computing',
  
  multiPlatform: 'Multi-plateforme',
  multiPlatformDesc: 'Compatible sur tous les appareils : desktop, mobile, tablette, navigateur web.',
  multiPlatformBenefit1: 'iOS & Android',
  multiPlatformBenefit2: 'Apps natives',
  multiPlatformBenefit3: 'PWA',
  multiPlatformBenefit4: 'Navigateurs modernes',
  
  advancedAnalytics: 'Analytics avancés',
  advancedAnalyticsDesc: 'Métriques détaillées sur l\'engagement, la qualité et l\'utilisation de vos réunions.',
  advancedAnalyticsBenefit1: 'Métriques temps réel',
  advancedAnalyticsBenefit2: 'Rapports détaillés',
  advancedAnalyticsBenefit3: 'Insights IA',
  advancedAnalyticsBenefit4: 'Export données',
  
  completeAPI: 'API complète',
  completeAPIDesc: 'Intégrez VisioConnect dans vos applications avec notre API REST et SDK complets.',
  completeAPIBenefit1: 'API RESTful',
  completeAPIBenefit2: 'SDK JavaScript',
  completeAPIBenefit3: 'Webhooks',
  completeAPIBenefit4: 'Documentation complète',
  
  
  // Pages and common translations
  aboutPageTitle: 'À propos',
  aboutPageSubtitle: 'Découvrez l\'histoire et la vision derrière VisioConnect',
  securityPageTitle: 'Sécurité',
  securityPageSubtitle: 'Votre confidentialité et sécurité sont nos priorités',
  pricingPageTitle: 'Tarifs',
  pricingPageSubtitle: 'Des plans adaptés à tous vos besoins',
  contactPageTitle: 'Contact',
  contactPageSubtitle: 'Une question ? Nous sommes là pour vous aider',
  supportPageTitle: 'Support',
  supportPageSubtitle: 'Centre d\'aide et assistance technique',
  backToHome: 'Retour à l\'accueil',
  learnMore: 'En savoir plus',
  getStartedNow: 'Commencer maintenant',
  contactUs: 'Nous contacter',
  viewDocumentation: 'Voir la documentation',
  endToEndEncryption: 'Chiffrement de bout en bout',
  encryptionDesc: 'Toutes vos communications sont protégées par un chiffrement AES-256 de niveau militaire.',
  secureInfrastructure: 'Infrastructure sécurisée',
  infrastructureDesc: 'Nos serveurs sont hébergés dans des centres de données certifiés avec une sécurité physique maximale.',
  privacyCompliance: 'Conformité RGPD',
  complianceDesc: 'Respect total des réglementations européennes sur la protection des données.',
  projectVision: 'Vision du projet',
  visionText: 'VisioConnect est né de ma passion pour les technologies de communication moderne. En tant que développeur full-stack, j\'ai voulu créer une solution qui combine innovation technologique et expérience utilisateur exceptionnelle.',
  technicalStack: 'Stack technique',
  stackText: 'React.js, WebRTC, Socket.io, Node.js, MongoDB, AI/ML pour l\'optimisation vidéo, et bien d\'autres technologies cutting-edge pour une expérience fluide.',
  sendMessage: 'Envoyer un message',
  yourMessage: 'Votre message',
  messagePlaceholder: 'Décrivez votre question ou suggestion...',
  emailAddress: 'Adresse email',
  fullName: 'Nom complet',
  subject: 'Sujet',
  frequentQuestions: 'Questions fréquentes',
  technicalSupport: 'Support technique',
  userGuides: 'Guides utilisateur',
  quickLinks: 'Liens rapides',
  socialMedia: 'Réseaux sociaux',
  newsletter: 'Newsletter',
  subscribeNewsletter: 'S\'abonner à la newsletter',
  emailPlaceholder: 'Votre adresse email',
  subscribe: 'S\'abonner',
  comingSoonFeature: 'Fonctionnalité à venir',
  inDevelopment: 'En développement',
  betaVersion: 'Version bêta',
  underConstruction: 'En construction',
  cookiesPageTitle: 'Politique des cookies',
  whatAreCookies: 'Qu\'est-ce qu\'un cookie ?',
  cookiesDesc: 'Les cookies sont de petits fichiers texte stockés sur votre appareil lorsque vous visitez un site web.',
  cookieTypes: 'Types de cookies utilisés',
  essentialCookies: 'Cookies essentiels',
  analyticsCookies: 'Cookies d\'analyse',
  dataCollection: 'Collecte des données',
  dataUsage: 'Utilisation des données',
  dataSharing: 'Partage des données',
  userRights: 'Vos droits',
  serviceTerms: 'Conditions d\'utilisation',
  userObligations: 'Obligations de l\'utilisateur',
  serviceAvailability: 'Disponibilité du service',
  liability: 'Responsabilité',
  systemStatus: 'État du système',
  allSystemsOperational: 'Tous les systèmes fonctionnent',
  serviceIncidents: 'Incidents de service',
  maintenanceScheduled: 'Maintenance programmée',
  performanceMetrics: 'Métriques de performance',
  uptime: 'Temps de fonctionnement',
  responseTime: 'Temps de réponse',
  gettingStarted: 'Premiers pas',
  basicFeatures: 'Fonctionnalités de base',
  advancedFeatures: 'Fonctionnalités avancées',
  troubleshooting: 'Dépannage',
  tips: 'Conseils et astuces',

  // Personal description
  personalDescription: 'Salut ! Moi c\'est Théo, j\'ai 25 ans et je développe VisioConnect depuis juillet 2023. C\'est ma plateforme de visioconférence faite avec React et Node.js. Encore en bêta fermée mais ça avance bien grâce aux retours de mes testeurs !'
};

export default frTranslations;