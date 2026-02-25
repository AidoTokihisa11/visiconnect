#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Fonction pour lire un fichier
const readFile = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Erreur lecture ${filePath}:`, error.message);
    return null;
  }
};

// Fonction pour écrire un fichier
const writeFile = (filePath, content) => {
  try {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Mis à jour: ${filePath}`);
  } catch (error) {
    console.error(`❌ Erreur écriture ${filePath}:`, error.message);
  }
};

// Nouvelles clés de traduction pour toutes les pages
const newTranslations = {
  fr: {
    // Pages principales
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
    
    // Navigation et actions communes
    backToHome: 'Retour à l\'accueil',
    learnMore: 'En savoir plus',
    getStartedNow: 'Commencer maintenant',
    contactUs: 'Nous contacter',
    viewDocumentation: 'Voir la documentation',
    
    // Sécurité
    endToEndEncryption: 'Chiffrement de bout en bout',
    encryptionDesc: 'Toutes vos communications sont protégées par un chiffrement AES-256 de niveau militaire.',
    secureInfrastructure: 'Infrastructure sécurisée',
    infrastructureDesc: 'Nos serveurs sont hébergés dans des centres de données certifiés avec une sécurité physique maximale.',
    privacyCompliance: 'Conformité RGPD',
    complianceDesc: 'Respect total des réglementations européennes sur la protection des données.',
    
    // À propos
    projectVision: 'Vision du projet',
    visionText: 'VisioConnect est né de ma passion pour les technologies de communication moderne. En tant que développeur full-stack, j\'ai voulu créer une solution qui combine innovation technologique et expérience utilisateur exceptionnelle.',
    technicalStack: 'Stack technique',
    stackText: 'React.js, WebRTC, Socket.io, Node.js, MongoDB, AI/ML pour l\'optimisation vidéo, et bien d\'autres technologies cutting-edge pour une expérience fluide.',
    
    // Contact
    sendMessage: 'Envoyer un message',
    yourMessage: 'Votre message',
    messagePlaceholder: 'Décrivez votre question ou suggestion...',
    emailAddress: 'Adresse email',
    fullName: 'Nom complet',
    subject: 'Sujet',
    
    // Support
    frequentQuestions: 'Questions fréquentes',
    technicalSupport: 'Support technique',
    userGuides: 'Guides utilisateur',
    apiDocumentation: 'Documentation API',
    
    // Footer complet
    quickLinks: 'Liens rapides',
    socialMedia: 'Réseaux sociaux',
    newsletter: 'Newsletter',
    subscribeNewsletter: 'S\'abonner à la newsletter',
    emailPlaceholder: 'Votre adresse email',
    subscribe: 'S\'abonner',
    
    // États et messages
    comingSoonFeature: 'Fonctionnalité à venir',
    inDevelopment: 'En développement',
    betaVersion: 'Version bêta',
    underConstruction: 'En construction',
    
    // Cookies et confidentialité
    cookiesPageTitle: 'Politique des cookies',
    whatAreCookies: 'Qu\'est-ce qu\'un cookie ?',
    cookiesDesc: 'Les cookies sont de petits fichiers texte stockés sur votre appareil lorsque vous visitez un site web.',
    cookieTypes: 'Types de cookies utilisés',
    essentialCookies: 'Cookies essentiels',
    analyticsCookies: 'Cookies d\'analyse',
    
    // Privacy Policy
    dataCollection: 'Collecte des données',
    dataUsage: 'Utilisation des données',
    dataSharing: 'Partage des données',
    userRights: 'Vos droits',
    
    // Terms of Service  
    serviceTerms: 'Conditions d\'utilisation',
    userObligations: 'Obligations de l\'utilisateur',
    serviceAvailability: 'Disponibilité du service',
    liability: 'Responsabilité',
    
    // Status Page
    systemStatus: 'État du système',
    allSystemsOperational: 'Tous les systèmes fonctionnent',
    serviceIncidents: 'Incidents de service',
    maintenanceScheduled: 'Maintenance programmée',
    performanceMetrics: 'Métriques de performance',
    uptime: 'Temps de fonctionnement',
    responseTime: 'Temps de réponse',
    
    // User Guide
    gettingStarted: 'Premiers pas',
    basicFeatures: 'Fonctionnalités de base',
    advancedFeatures: 'Fonctionnalités avancées',
    troubleshooting: 'Dépannage',
    tips: 'Conseils et astuces'
  },
  
  en: {
    // Main pages
    aboutPageTitle: 'About',
    aboutPageSubtitle: 'Discover the story and vision behind VisioConnect',
    securityPageTitle: 'Security',
    securityPageSubtitle: 'Your privacy and security are our priorities',
    pricingPageTitle: 'Pricing',
    pricingPageSubtitle: 'Plans adapted to all your needs',
    contactPageTitle: 'Contact',
    contactPageSubtitle: 'Have a question? We\'re here to help',
    supportPageTitle: 'Support',
    supportPageSubtitle: 'Help center and technical assistance',
    
    // Navigation and common actions
    backToHome: 'Back to home',
    learnMore: 'Learn more',
    getStartedNow: 'Get started now',
    contactUs: 'Contact us',
    viewDocumentation: 'View documentation',
    
    // Security
    endToEndEncryption: 'End-to-end encryption',
    encryptionDesc: 'All your communications are protected by military-grade AES-256 encryption.',
    secureInfrastructure: 'Secure infrastructure',
    infrastructureDesc: 'Our servers are hosted in certified data centers with maximum physical security.',
    privacyCompliance: 'GDPR Compliance',
    complianceDesc: 'Full compliance with European data protection regulations.',
    
    // About
    projectVision: 'Project vision',
    visionText: 'VisioConnect was born from my passion for modern communication technologies. As a full-stack developer, I wanted to create a solution that combines technological innovation and exceptional user experience.',
    technicalStack: 'Technical stack',
    stackText: 'React.js, WebRTC, Socket.io, Node.js, MongoDB, AI/ML for video optimization, and many other cutting-edge technologies for a smooth experience.',
    
    // Contact
    sendMessage: 'Send message',
    yourMessage: 'Your message',
    messagePlaceholder: 'Describe your question or suggestion...',
    emailAddress: 'Email address',
    fullName: 'Full name',
    subject: 'Subject',
    
    // Support
    frequentQuestions: 'Frequently asked questions',
    technicalSupport: 'Technical support',
    userGuides: 'User guides',
    apiDocumentation: 'API Documentation',
    
    // Complete footer
    quickLinks: 'Quick links',
    socialMedia: 'Social media',
    newsletter: 'Newsletter',
    subscribeNewsletter: 'Subscribe to newsletter',
    emailPlaceholder: 'Your email address',
    subscribe: 'Subscribe',
    
    // States and messages
    comingSoonFeature: 'Coming soon',
    inDevelopment: 'In development',
    betaVersion: 'Beta version',
    underConstruction: 'Under construction',
    
    // Cookies and privacy
    cookiesPageTitle: 'Cookie Policy',
    whatAreCookies: 'What is a cookie?',
    cookiesDesc: 'Cookies are small text files stored on your device when you visit a website.',
    cookieTypes: 'Types of cookies used',
    essentialCookies: 'Essential cookies',
    analyticsCookies: 'Analytics cookies',
    
    // Privacy Policy
    dataCollection: 'Data collection',
    dataUsage: 'Data usage',
    dataSharing: 'Data sharing',
    userRights: 'Your rights',
    
    // Terms of Service
    serviceTerms: 'Terms of service',
    userObligations: 'User obligations',
    serviceAvailability: 'Service availability',
    liability: 'Liability',
    
    // Status Page
    systemStatus: 'System status',
    allSystemsOperational: 'All systems operational',
    serviceIncidents: 'Service incidents',
    maintenanceScheduled: 'Scheduled maintenance',
    performanceMetrics: 'Performance metrics',
    uptime: 'Uptime',
    responseTime: 'Response time',
    
    // User Guide
    gettingStarted: 'Getting started',
    basicFeatures: 'Basic features',
    advancedFeatures: 'Advanced features',
    troubleshooting: 'Troubleshooting',
    tips: 'Tips and tricks'
  },
  
  de: {
    // Hauptseiten
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
    
    // Navigation und gemeinsame Aktionen
    backToHome: 'Zurück zur Startseite',
    learnMore: 'Mehr erfahren',
    getStartedNow: 'Jetzt loslegen',
    contactUs: 'Kontaktieren Sie uns',
    viewDocumentation: 'Dokumentation ansehen',
    
    // Sicherheit
    endToEndEncryption: 'Ende-zu-Ende-Verschlüsselung',
    encryptionDesc: 'Alle Ihre Kommunikationen sind durch militärische AES-256-Verschlüsselung geschützt.',
    secureInfrastructure: 'Sichere Infrastruktur',
    infrastructureDesc: 'Unsere Server sind in zertifizierten Rechenzentren mit maximaler physischer Sicherheit gehostet.',
    privacyCompliance: 'DSGVO-Konformität',
    complianceDesc: 'Vollständige Einhaltung der europäischen Datenschutzbestimmungen.',
    
    // Über uns
    projectVision: 'Projektvision',
    visionText: 'VisioConnect entstand aus meiner Leidenschaft für moderne Kommunikationstechnologien. Als Full-Stack-Entwickler wollte ich eine Lösung schaffen, die technologische Innovation und außergewöhnliche Benutzererfahrung kombiniert.',
    technicalStack: 'Technischer Stack',
    stackText: 'React.js, WebRTC, Socket.io, Node.js, MongoDB, AI/ML für Videooptimierung und viele andere cutting-edge Technologien für eine reibungslose Erfahrung.',
    
    // Kontakt
    sendMessage: 'Nachricht senden',
    yourMessage: 'Ihre Nachricht',
    messagePlaceholder: 'Beschreiben Sie Ihre Frage oder Ihren Vorschlag...',
    emailAddress: 'E-Mail-Adresse',
    fullName: 'Vollständiger Name',
    subject: 'Betreff',
    
    // Support
    frequentQuestions: 'Häufig gestellte Fragen',
    technicalSupport: 'Technischer Support',
    userGuides: 'Benutzerhandbücher',
    apiDocumentation: 'API-Dokumentation',
    
    // Vollständiger Footer
    quickLinks: 'Schnelle Links',
    socialMedia: 'Soziale Medien',
    newsletter: 'Newsletter',
    subscribeNewsletter: 'Newsletter abonnieren',
    emailPlaceholder: 'Ihre E-Mail-Adresse',
    subscribe: 'Abonnieren',
    
    // Zustände und Nachrichten
    comingSoonFeature: 'Demnächst verfügbar',
    inDevelopment: 'In Entwicklung',
    betaVersion: 'Beta-Version',
    underConstruction: 'Im Aufbau',
    
    // Cookies und Datenschutz
    cookiesPageTitle: 'Cookie-Richtlinie',
    whatAreCookies: 'Was ist ein Cookie?',
    cookiesDesc: 'Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden, wenn Sie eine Website besuchen.',
    cookieTypes: 'Verwendete Cookie-Typen',
    essentialCookies: 'Wesentliche Cookies',
    analyticsCookies: 'Analyse-Cookies'
  },
  
  es: {
    // Páginas principales
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
    
    // Navegación y acciones comunes
    backToHome: 'Volver al inicio',
    learnMore: 'Saber más',
    getStartedNow: 'Empezar ahora',
    contactUs: 'Contáctanos',
    viewDocumentation: 'Ver documentación',
    
    // Seguridad
    endToEndEncryption: 'Cifrado de extremo a extremo',
    encryptionDesc: 'Todas sus comunicaciones están protegidas por cifrado AES-256 de grado militar.',
    secureInfrastructure: 'Infraestructura segura',
    infrastructureDesc: 'Nuestros servidores están alojados en centros de datos certificados con máxima seguridad física.',
    privacyCompliance: 'Cumplimiento RGPD',
    complianceDesc: 'Cumplimiento total con las regulaciones europeas de protección de datos.',
    
    // Acerca de
    projectVision: 'Visión del proyecto',
    visionText: 'VisioConnect nació de mi pasión por las tecnologías de comunicación modernas. Como desarrollador full-stack, quise crear una solución que combine innovación tecnológica y experiencia de usuario excepcional.',
    technicalStack: 'Stack técnico',
    stackText: 'React.js, WebRTC, Socket.io, Node.js, MongoDB, AI/ML para optimización de video, y muchas otras tecnologías de vanguardia para una experiencia fluida.',
    
    // Contacto
    sendMessage: 'Enviar mensaje',
    yourMessage: 'Su mensaje',
    messagePlaceholder: 'Describa su pregunta o sugerencia...',
    emailAddress: 'Dirección de correo',
    fullName: 'Nombre completo',
    subject: 'Asunto'
  },
  
  ru: {
    // Основные страницы
    aboutPageTitle: 'О нас',
    aboutPageSubtitle: 'Узнайте историю и видение VisioConnect',
    securityPageTitle: 'Безопасность',
    securityPageSubtitle: 'Ваша конфиденциальность и безопасность - наши приоритеты',
    pricingPageTitle: 'Цены',
    pricingPageSubtitle: 'Планы, адаптированные ко всем вашим потребностям',
    contactPageTitle: 'Контакты',
    contactPageSubtitle: 'Есть вопрос? Мы здесь, чтобы помочь',
    supportPageTitle: 'Поддержка',
    supportPageSubtitle: 'Центр помощи и техническая поддержка',
    
    // Навигация и общие действия
    backToHome: 'Вернуться домой',
    learnMore: 'Узнать больше',
    getStartedNow: 'Начать сейчас',
    contactUs: 'Связаться с нами',
    viewDocumentation: 'Посмотреть документацию',
    
    // Безопасность
    endToEndEncryption: 'Сквозное шифрование',
    encryptionDesc: 'Все ваши коммуникации защищены военным шифрованием AES-256.',
    secureInfrastructure: 'Безопасная инфраструктура',
    infrastructureDesc: 'Наши серверы размещены в сертифицированных дата-центрах с максимальной физической безопасностью.',
    privacyCompliance: 'Соответствие GDPR',
    complianceDesc: 'Полное соответствие европейским правилам защиты данных.'
  }
};

// Fonction pour ajouter les traductions dans un fichier de langue
const addTranslationsToFile = (filePath, langCode) => {
  const content = readFile(filePath);
  if (!content) return;

  const translations = newTranslations[langCode];
  if (!translations) return;

  // Trouver l'endroit où insérer les nouvelles traductions (avant la description personnelle)
  const insertBefore = '// Personal description';
  const insertIndex = content.indexOf(insertBefore);
  
  if (insertIndex === -1) {
    console.log(`❌ Point d'insertion non trouvé dans ${filePath}`);
    return;
  }

  // Créer le texte des nouvelles traductions
  let newTranslationsText = '\n  // Pages and common translations\n';
  Object.entries(translations).forEach(([key, value]) => {
    // Échapper les apostrophes dans les valeurs
    const escapedValue = value.replace(/'/g, "\\'");
    newTranslationsText += `  ${key}: '${escapedValue}',\n`;
  });
  newTranslationsText += '\n  ';

  // Insérer les nouvelles traductions
  const beforeInsert = content.substring(0, insertIndex);
  const afterInsert = content.substring(insertIndex);
  const newContent = beforeInsert + newTranslationsText + afterInsert;

  writeFile(filePath, newContent);
};

// Fonction principale
const main = () => {
  console.log('🚀 Ajout des traductions dans tous les fichiers de langue...\n');

  const localesDir = path.join(__dirname, '..', 'i18n', 'locales');
  const languageFiles = [
    { file: 'fr.js', code: 'fr' },
    { file: 'en.js', code: 'en' },
    { file: 'de.js', code: 'de' },
    { file: 'es.js', code: 'es' },
    { file: 'ru.js', code: 'ru' }
  ];

  languageFiles.forEach(({ file, code }) => {
    const filePath = path.join(localesDir, file);
    console.log(`📝 Traitement ${file}...`);
    addTranslationsToFile(filePath, code);
  });

  console.log('\n✅ Toutes les traductions ont été ajoutées !');
  console.log('\n📋 Prochaines étapes :');
  console.log('1. Vérifiez les fichiers de traduction');
  console.log('2. Mettez à jour les pages pour utiliser les nouvelles clés');
  console.log('3. Testez le changement de langue sur toutes les pages');
};

// Exécuter le script
main();