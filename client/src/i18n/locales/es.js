// Spanish translations
const esTranslations = {
  common: {
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    save: 'Guardar',
    edit: 'Editar',
    delete: 'Eliminar',
    back: 'Atrás',
    next: 'Siguiente',
    previous: 'Anterior',
    close: 'Cerrar',
    search: 'Buscar',
    filter: 'Filtrar',
    sort: 'Ordenar',
    email: 'Email',
    password: 'Contraseña',
    name: 'Nombre',
    firstName: 'Nombre',
    lastName: 'Apellido',
    phone: 'Teléfono',
    address: 'Dirección',
    city: 'Ciudad',
    country: 'País',
    language: 'Idioma',
    settings: 'Configuración',
    profile: 'Perfil',
    logout: 'Cerrar sesión',
    login: 'Iniciar sesión',
    register: 'Registrarse',
    forgotPassword: '¿Olvidaste tu contraseña?'
  },

  navigation: {
    home: 'Inicio',
    features: 'Características',
    pricing: 'Precios',
    about: 'Acerca de',
    contact: 'Contacto',
    support: 'Soporte',
    documentation: 'Documentación',
    community: 'Comunidad',
    blog: 'Blog',
    careers: 'Carreras',
    legal: 'Legal',
    privacy: 'Privacidad',
    terms: 'Términos de servicio',
    cookies: 'Cookies',
    security: 'Seguridad'
  },

  hero: {
    title: 'Plataforma de videoconferencia de próxima generación',
    subtitle: 'Conéctate fácilmente con tus equipos usando nuestra solución de videoconferencia avanzada e intuitiva',
    startFree: 'Comenzar gratis',
    watchDemo: 'Ver demo',
    trustedBy: 'Confiado por más de {{count}} empresas en todo el mundo'
  },

  features: {
    title: 'Características poderosas',
    subtitle: 'Todo lo que necesitas para reuniones productivas',
    videoCall: {
      title: 'Videollamadas HD',
      description: 'Calidad de video cristalina hasta 4K con audio de calidad de estudio'
    },
    screenShare: {
      title: 'Compartir pantalla',
      description: 'Comparte tu pantalla, aplicaciones o pestañas específicas'
    },
    recording: {
      title: 'Grabación',
      description: 'Graba tus reuniones y accede a ellas más tarde'
    },
    chat: {
      title: 'Chat integrado',
      description: 'Chatea durante las llamadas con mensajes y archivos'
    },
    whiteboard: {
      title: 'Pizarra',
      description: 'Colabora visualmente con una pizarra integrada'
    },
    security: {
      title: 'Seguridad avanzada',
      description: 'Cifrado de extremo a extremo y controles de seguridad'
    }
  },

  pricing: {
    title: 'Precios simples y transparentes',
    subtitle: 'Elige el plan que se adapte a tus necesidades',
    monthly: 'Mensual',
    yearly: 'Anual',
    perMonth: '/mes',
    perUser: 'por usuario',
    free: {
      title: 'Gratis',
      price: '0€',
      description: 'Perfecto para empezar',
      features: [
        'Hasta 3 participantes',
        'Reuniones de 40 minutos',
        'Audio y video HD',
        'Compartir pantalla'
      ]
    },
    pro: {
      title: 'Pro',
      price: '12€',
      description: 'Para equipos en crecimiento',
      features: [
        'Hasta 50 participantes',
        'Reuniones ilimitadas',
        'Grabación en la nube',
        'Chat y pizarra',
        'Soporte prioritario'
      ]
    },
    enterprise: {
      title: 'Enterprise',
      price: 'Personalizado',
      description: 'Para organizaciones grandes',
      features: [
        'Participantes ilimitados',
        'SSO e integraciones',
        'Administración avanzada',
        'Soporte dedicado',
        'SLA garantizado'
      ]
    },
    getStarted: 'Comenzar',
    contactSales: 'Contactar ventas'
  },

  auth: {
    login: {
      title: 'Iniciar sesión',
      subtitle: 'Accede a tu cuenta de VisiConnect',
      email: 'Dirección de email',
      password: 'Contraseña',
      rememberMe: 'Recordarme',
      forgotPassword: '¿Olvidaste tu contraseña?',
      signIn: 'Iniciar sesión',
      noAccount: '¿No tienes una cuenta?',
      createAccount: 'Crear cuenta',
      orContinueWith: 'O continuar con'
    },
    signup: {
      title: 'Crear cuenta',
      subtitle: 'Únete a VisiConnect hoy',
      firstName: 'Nombre',
      lastName: 'Apellido',
      email: 'Dirección de email',
      password: 'Contraseña',
      confirmPassword: 'Confirmar contraseña',
      acceptTerms: 'Acepto los {{terms}} y la {{privacy}}',
      terms: 'términos de servicio',
      privacy: 'política de privacidad',
      createAccount: 'Crear cuenta',
      alreadyHaveAccount: '¿Ya tienes una cuenta?',
      signIn: 'Iniciar sesión',
      orContinueWith: 'O continuar con'
    },
    forgotPassword: {
      title: 'Contraseña olvidada',
      subtitle: 'Ingresa tu email para restablecer tu contraseña',
      email: 'Dirección de email',
      sendReset: 'Enviar enlace de restablecimiento',
      backToLogin: 'Volver al inicio de sesión'
    }
  },

  meeting: {
    title: 'Reunión',
    participants: 'Participantes',
    chat: 'Chat',
    settings: 'Configuración',
    leave: 'Salir',
    mute: 'Silenciar',
    unmute: 'Activar micrófono',
    video: 'Cámara',
    screenShare: 'Compartir pantalla',
    record: 'Grabar',
    endMeeting: 'Terminar reunión',
    inviteOthers: 'Invitar a otros',
    copyLink: 'Copiar enlace',
    joinedMeeting: '{{name}} se unió a la reunión',
    leftMeeting: '{{name}} salió de la reunión'
  },

  tutorial: {
    title: 'Guía de inicio',
    welcome: '¡Bienvenido a VisiConnect!',
    step1: {
      title: 'Crear una reunión',
      description: 'Haz clic en "Nueva reunión" para comenzar'
    },
    step2: {
      title: 'Invitar participantes',
      description: 'Comparte el enlace de la reunión con tus colegas'
    },
    step3: {
      title: 'Usar herramientas',
      description: 'Descubre compartir pantalla, chat y pizarra'
    },
    step4: {
      title: 'Gestionar configuración',
      description: 'Personaliza tu experiencia en la configuración'
    },
    next: 'Siguiente',
    previous: 'Anterior',
    finish: 'Finalizar',
    skip: 'Saltar guía'
  },

  errors: {
    network: 'Error de conexión de red',
    unauthorized: 'Acceso no autorizado',
    forbidden: 'Acceso prohibido',
    notFound: 'Recurso no encontrado',
    serverError: 'Error del servidor',
    validation: 'Error de validación',
    unknown: 'Ocurrió un error desconocido',
    tryAgain: 'Por favor, inténtalo de nuevo',
    contactSupport: 'Contacta al soporte si el problema persiste'
  },

  success: {
    accountCreated: '¡Cuenta creada exitosamente!',
    passwordReset: 'Email de restablecimiento enviado',
    settingsSaved: 'Configuración guardada',
    invitationSent: 'Invitación enviada',
    meetingCreated: 'Reunión creada exitosamente',
    profileUpdated: 'Perfil actualizado'
  },

  // Claves específicas de HomePage
  featureHDVideo: 'Video HD',
  featureHDVideoDesc: 'Calidad de video de alta definición para reuniones cristalinas',
  featureHDBenefit1: 'Resolución hasta 4K',
  featureHDBenefit2: 'Audio de calidad de estudio',
  featureHDBenefit3: 'Optimización automática',

  featureSecurity: 'Seguridad Avanzada',
  featureSecurityDesc: 'Protección máxima con cifrado de extremo a extremo',
  featureSecurityBenefit1: 'Cifrado AES-256',
  featureSecurityBenefit2: 'Autenticación segura',
  featureSecurityBenefit3: 'Cumplimiento GDPR',

  featureMultiparticipants: 'Multi-participantes',
  featureMultiparticipantsDesc: 'Reuniones con múltiples participantes simultáneamente',
  featureMultiparticipantsBenefit1: 'Hasta 50 participantes',
  featureMultiparticipantsBenefit2: 'Gestión de permisos',
  featureMultiparticipantsBenefit3: 'Vista de cuadrícula adaptativa',

  featurePerformance: 'Rendimiento Óptimo',
  featurePerformanceDesc: 'Tecnología avanzada para una experiencia fluida',
  featurePerformanceBenefit1: 'Latencia ultra-baja',
  featurePerformanceBenefit2: 'Optimización de ancho de banda',
  featurePerformanceBenefit3: 'Adaptación automática',

  featureAccessibility: 'Accesibilidad',
  featureAccessibilityDesc: 'Plataforma accesible para todos, en todas partes',
  featureAccessibilityBenefit1: 'Compatible con todos los dispositivos',
  featureAccessibilityBenefit2: 'Interfaz intuitiva',
  featureAccessibilityBenefit3: 'Soporte multi-navegador',

  featureInterface: 'Interfaz Moderna',
  featureInterfaceDesc: 'Diseño limpio y experiencia de usuario excepcional',
  featureInterfaceBenefit1: 'Diseño responsivo',
  featureInterfaceBenefit2: 'Navegación intuitiva',
  featureInterfaceBenefit3: 'Temas personalizables',

  // Planes de precios
  freePlan: 'Plan Gratuito',
  proPlan: 'Plan Pro',
  maxParticipants: 'participantes máximos',
  duration: 'minutos de reunión',
  unlimited: 'ilimitado',
  getStarted: 'Comenzar',

  // Estadísticas
  statValue1: '3',
  statLabel1: 'Testers activos',
  statValue2: '2024',
  statLabel2: 'Año de creación',
  statValue3: '99.9%',
  statLabel3: 'Disponibilidad objetivo',
  statValue4: '♥',
  statLabel4: 'Hecho con pasión',

  // Textos varios
  copyrightText: '© 2024 VisioConnect. Desarrollado con ♥ por Théo Garcès.',
  developmentStatus: 'Plataforma en desarrollo - Versión beta',
  
  // Hero section
  heroTitle: 'Videoconferencia',
  heroSubtitle: 'Simple y Eficaz',
  heroDescription: 'VisioConnect - Plataforma de videoconferencia desarrollada por Théo Garcès. Solución simple y eficaz para sus reuniones en línea, actualmente probada por un pequeño equipo de 3 personas. Interfaz moderna, tecnología confiable.',
  testPlatform: 'Probar la plataforma',
  seeFeatures: 'Ver características',

  // Pricing section
  choosePlan: 'Elige tu plan',
  flexibleSolutions: 'Soluciones flexibles adaptadas a todas sus necesidades, desde uso personal hasta grandes empresas',
  testWithFamily: 'Para probar con familia y amigos',
  toDefine: 'por definir',
  proVersionLater: 'Versión de pago planificada para más tarde',
  customPlan: 'Personalizado',
  customDescription: 'Para necesidades específicas (¡contáctame!)',
  negotiable: 'negociable',
  standardVideo: 'Calidad de video estándar',
  basicChat: 'Chat básico',
  essentialFeatures: 'Características esenciales',
  improvedQuality: 'Calidad mejorada',
  bonusFeatures: 'Características adicionales',
  updatePriority: 'Prioridad en actualizaciones',
  comingSoon: 'Próximamente',
  customFeatures: 'Características personalizadas',
  onDemandDevelopment: 'Desarrollo bajo demanda',
  privateInstallation: 'Instalación privada posible',
  directSupport: 'Soporte directo con Théo',
  needsAdaptation: 'Adaptación a necesidades',
  contactMe: 'Contáctame',
  
  // Pages and common translations
  aboutPageTitle: 'Acerca de',
  aboutPageSubtitle: 'Descubre la historia y visión detrás de VisioConnect',
  securityPageTitle: 'Seguridad',
  securityPageSubtitle: 'Su privacidad y seguridad son nuestras prioridades',
  pricingPageTitle: 'Precios',
  pricingPageSubtitle: 'Planes adaptados a todas sus necesidades',
  contactPageTitle: 'Contacto',
  contactPageSubtitle: '¿Tienes una pregunta? Estamos aquí para ayudar',
  supportPageTitle: 'Soporte',
  supportPageSubtitle: 'Centro de ayuda y asistencia técnica',
  backToHome: 'Volver al inicio',
  learnMore: 'Saber más',
  getStartedNow: 'Empezar ahora',
  contactUs: 'Contáctanos',
  viewDocumentation: 'Ver documentación',
  endToEndEncryption: 'Cifrado de extremo a extremo',
  encryptionDesc: 'Todas sus comunicaciones están protegidas por cifrado AES-256 de grado militar.',
  secureInfrastructure: 'Infraestructura segura',
  infrastructureDesc: 'Nuestros servidores están alojados en centros de datos certificados con máxima seguridad física.',
  privacyCompliance: 'Cumplimiento RGPD',
  complianceDesc: 'Cumplimiento total con las regulaciones europeas de protección de datos.',
  projectVision: 'Visión del proyecto',
  visionText: 'VisioConnect nació de mi pasión por las tecnologías de comunicación modernas. Como desarrollador full-stack, quise crear una solución que combine innovación tecnológica y experiencia de usuario excepcional.',
  technicalStack: 'Stack técnico',
  stackText: 'React.js, WebRTC, Socket.io, Node.js, MongoDB, AI/ML para optimización de video, y muchas otras tecnologías de vanguardia para una experiencia fluida.',
  sendMessage: 'Enviar mensaje',
  yourMessage: 'Su mensaje',
  messagePlaceholder: 'Describa su pregunta o sugerencia...',
  emailAddress: 'Dirección de correo',
  fullName: 'Nombre completo',
  subject: 'Asunto',
  frequentQuestions: 'Preguntas frecuentes',
  technicalSupport: 'Soporte técnico',
  userGuides: 'Guías de usuario',
  apiDocumentation: 'Documentación API',
  quickLinks: 'Enlaces rápidos',
  socialMedia: 'Redes sociales',
  newsletter: 'Boletín',
  subscribeNewsletter: 'Suscribirse al boletín',
  emailPlaceholder: 'Su dirección de correo',
  subscribe: 'Suscribirse',
  comingSoonFeature: 'Próximamente',
  inDevelopment: 'En desarrollo',
  betaVersion: 'Versión beta',
  underConstruction: 'En construcción',
  cookiesPageTitle: 'Política de cookies',
  whatAreCookies: '¿Qué es una cookie?',
  cookiesDesc: 'Las cookies son pequeños archivos de texto almacenados en su dispositivo cuando visita un sitio web.',
  cookieTypes: 'Tipos de cookies utilizadas',
  essentialCookies: 'Cookies esenciales',
  analyticsCookies: 'Cookies de análisis',

  // Integraciones
  integrations: {
    title: 'Integraciones',
    subtitle: 'Conecte VisiConnect con sus herramientas favoritas para una experiencia fluida',
    connectButton: 'Conectar',
    services: {
      google: {
        title: 'Google Workspace',
        description: 'Integre con Gmail, Drive, Calendar y toda la suite de Google'
      },
      microsoft: {
        title: 'Microsoft 365',
        description: 'Conecte con Teams, Outlook, OneDrive y todas las aplicaciones Microsoft'
      },
      slack: {
        title: 'Slack',
        description: 'Sincronice sus canales y mensajes directamente en VisiConnect'
      },
      zoom: {
        title: 'Zoom',
        description: 'Compatible con sus reuniones y conferencias Zoom existentes'
      },
      trello: {
        title: 'Trello',
        description: 'Gestione sus tableros y tarjetas Trello desde VisiConnect'
      },
      jira: {
        title: 'Jira',
        description: 'Seguimiento de issues y gestión de proyectos integrados'
      },
      salesforce: {
        title: 'Salesforce',
        description: 'Conecte con su CRM para una gestión completa de clientes'
      },
      github: {
        title: 'GitHub',
        description: 'Gestión de código y repositorios directamente integrada'
      }
    }
  }
};

export default esTranslations;