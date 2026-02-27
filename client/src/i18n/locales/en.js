// English translations
const enTranslations = {
  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    close: 'Close',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    firstName: 'First Name',
    lastName: 'Last Name',
    phone: 'Phone',
    address: 'Address',
    city: 'City',
    country: 'Country',
    language: 'Language',
    settings: 'Settings',
    profile: 'Profile',
    logout: 'Logout',
    login: 'Login',
    register: 'Sign Up',
    forgotPassword: 'Forgot Password?',
    lastUpdated: 'Last Updated: {{date}}'
  },

  navigation: {
    home: 'Home',
    features: 'Features',
    pricing: 'Pricing',
    about: 'About',
    contact: 'Contact',
    support: 'Support',
    documentation: 'Documentation',
    community: 'Community',
    blog: 'Blog',
    careers: 'Careers',
    legal: 'Legal',
    privacy: 'Privacy',
    terms: 'Terms of Service',
    cookies: 'Cookies',
    security: 'Security',
    demo: 'Demo',
    developers: 'Developers',
    dashboard: 'Dashboard'
  },

  hero: {
    title: 'Next-generation video conferencing platform',
    subtitle: 'Connect easily with your teams using our advanced and intuitive video conferencing solution',
    startFree: 'Start Free',
    watchDemo: 'Watch Demo',
    trustedBy: 'Trusted by over {{count}} companies worldwide'
  },

  homeFeatures: {
    title: 'Everything for successful meetings',
    subtitle: 'Powerful features designed for modern teams. Secure, reliable, and easy to use.',
    video: {
      title: "HD Video & Audio",
      text: "Crystal clear video and audio quality with noise suppression and echo cancellation enabled automatically.",
      items: ["Up to 4k supported", "AI Noise suppression", "VP9 / AV1 Codec"]
    },
    security: {
      title: "Bank-grade Security",
      text: "End-to-end encryption for all calls. Your conversations remain private and secure at all times.",
      items: ["E2E Encryption", "GDPR Compliant", "No data stored"]
    },
    instant: {
      title: "Instant Meetings",
      text: "Start in seconds with a shareable link. No download or installation required for guests.",
      items: ["1-click links", "No account required", "Mobile compatible"]
    },
    collaboration: {
      title: "Team Collaboration",
      text: "Simple screen sharing, collaborative whiteboard, and integrated chat to improve your team's productivity.",
      items: ["Screen sharing", "Whiteboard", "Real-time chat"]
    }
  },

  features: {
    title: 'Powerful Features',
    subtitle: 'Everything you need for productive meetings',
    videoCall: {
      title: 'HD Video Calls',
      description: 'Crystal clear video quality up to 4K with studio-quality audio'
    },
    screenShare: {
      title: 'Screen Sharing',
      description: 'Share your screen, applications, or specific tabs'
    },
    recording: {
      title: 'Recording',
      description: 'Record your meetings and access them later'
    },
    chat: {
      title: 'Integrated Chat',
      description: 'Chat during calls with messages and files'
    },
    whiteboard: {
      title: 'Whiteboard',
      description: 'Collaborate visually with an integrated whiteboard'
    },
    security: {
      title: 'Advanced Security',
      description: 'End-to-end encryption and security controls'
    }
  },

  pricing: {
    title: 'Simple and transparent pricing',
    subtitle: 'Choose the plan that fits your needs',
    monthly: 'Monthly',
    yearly: 'Yearly',
    perMonth: '/month',
    perUser: 'per user',
    free: {
      title: 'Free',
      price: '$0',
      description: 'Perfect to get started',
      features: [
        'Up to 3 participants',
        '40-minute meetings',
        'HD audio and video',
        'Screen sharing'
      ]
    },
    pro: {
      title: 'Pro',
      price: '$12',
      description: 'For growing teams',
      features: [
        'Up to 50 participants',
        'Unlimited meetings',
        'Cloud recording',
        'Chat and whiteboard',
        'Priority support'
      ]
    },
    enterprise: {
      title: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations',
      features: [
        'Unlimited participants',
        'SSO and integrations',
        'Advanced administration',
        'Dedicated support',
        'Guaranteed SLA'
      ]
    },
    getStarted: 'Get Started',
    contactSales: 'Contact Sales'
  },

  auth: {
    login: {
      title: 'Login',
      subtitle: 'Access your VisiConnect account',
      email: 'Email address',
      password: 'Password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      signIn: 'Sign In',
      noAccount: 'Don\'t have an account?',
      createAccount: 'Create account',
      orContinueWith: 'Or continue with'
    },
    signup: {
      title: 'Create Account',
      subtitle: 'Join VisiConnect today',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email address',
      password: 'Password',
      confirmPassword: 'Confirm password',
      acceptTerms: 'I accept the {{terms}} and {{privacy}}',
      terms: 'terms of service',
      privacy: 'privacy policy',
      createAccount: 'Create Account',
      alreadyHaveAccount: 'Already have an account?',
      signIn: 'Sign In',
      orContinueWith: 'Or continue with'
    },
    forgotPassword: {
      title: 'Forgot Password',
      subtitle: 'Enter your email to reset your password',
      email: 'Email address',
      sendReset: 'Send reset link',
      backToLogin: 'Back to login'
    }
  },

  meeting: {
    title: 'Meeting',
    participants: 'Participants',
    chat: 'Chat',
    settings: 'Settings',
    leave: 'Leave',
    mute: 'Mute',
    unmute: 'Unmute',
    video: 'Camera',
    screenShare: 'Share Screen',
    record: 'Record',
    endMeeting: 'End Meeting',
    inviteOthers: 'Invite Others',
    copyLink: 'Copy Link',
    joinedMeeting: '{{name}} joined the meeting',
    leftMeeting: '{{name}} left the meeting'
  },

  tutorial: {
    title: 'Getting Started Guide',
    welcome: 'Welcome to VisiConnect!',
    step1: {
      title: 'Create a Meeting',
      description: 'Click "New Meeting" to get started'
    },
    step2: {
      title: 'Invite Participants',
      description: 'Share the meeting link with your colleagues'
    },
    step3: {
      title: 'Use Tools',
      description: 'Discover screen sharing, chat, and whiteboard'
    },
    step4: {
      title: 'Manage Settings',
      description: 'Customize your experience in settings'
    },
    next: 'Next',
    previous: 'Previous',
    finish: 'Finish',
    skip: 'Skip Guide'
  },

  errors: {
    network: 'Network connection error',
    unauthorized: 'Unauthorized access',
    forbidden: 'Access forbidden',
    notFound: 'Resource not found',
    serverError: 'Server error',
    validation: 'Validation error',
    unknown: 'An unknown error occurred',
    tryAgain: 'Please try again',
    contactSupport: 'Contact support if the problem persists'
  },

  success: {
    accountCreated: 'Account created successfully!',
    passwordReset: 'Reset email sent',
    settingsSaved: 'Settings saved',
    invitationSent: 'Invitation sent',
    meetingCreated: 'Meeting created successfully',
    profileUpdated: 'Profile updated'
  },

  // HomePage specific keys
  featureHDVideo: 'HD Video',
  featureHDVideoDesc: 'High definition video quality for crystal clear meetings',
  featureHDBenefit1: 'Resolution up to 4K',
  featureHDBenefit2: 'Studio quality audio',
  featureHDBenefit3: 'Automatic optimization',

  featureSecurity: 'Advanced Security',
  featureSecurityDesc: 'Maximum protection with end-to-end encryption',
  featureSecurityBenefit1: 'AES-256 encryption',
  featureSecurityBenefit2: 'Secure authentication',
  featureSecurityBenefit3: 'GDPR compliance',

  featureMultiparticipants: 'Multi-participants',
  featureMultiparticipantsDesc: 'Meetings with multiple participants simultaneously',
  featureMultiparticipantsBenefit1: 'Up to 50 participants',
  featureMultiparticipantsBenefit2: 'Permission management',
  featureMultiparticipantsBenefit3: 'Adaptive grid view',

  featurePerformance: 'Optimal Performance',
  featurePerformanceDesc: 'Advanced technology for a smooth experience',
  featurePerformanceBenefit1: 'Ultra-low latency',
  featurePerformanceBenefit2: 'Bandwidth optimization',
  featurePerformanceBenefit3: 'Automatic adaptation',

  featureAccessibility: 'Accessibility',
  featureAccessibilityDesc: 'Platform accessible to everyone, everywhere',
  featureAccessibilityBenefit1: 'Compatible with all devices',
  featureAccessibilityBenefit2: 'Intuitive interface',
  featureAccessibilityBenefit3: 'Multi-browser support',

  featureInterface: 'Modern Interface',
  featureInterfaceDesc: 'Clean design and exceptional user experience',
  featureInterfaceBenefit1: 'Responsive design',
  featureInterfaceBenefit2: 'Intuitive navigation',
  featureInterfaceBenefit3: 'Customizable themes',

  // Pricing plans
  freePlan: 'Free Plan',
  proPlan: 'Pro Plan',
  maxParticipants: 'maximum participants',
  duration: 'meeting minutes',
  unlimited: 'unlimited',
  getStarted: 'Get Started',

  // Statistics
  statValue1: '3',
  statLabel1: 'Active testers',
  statValue2: '2024',
  statLabel2: 'Year of creation',
  statValue3: '99.9%',
  statLabel3: 'Target availability',
  statValue4: '♥',
  statLabel4: 'Made with passion',

  // Miscellaneous texts
  copyrightText: '© 2024 VisioConnect. Developed with ♥ by Théo Garcès.',
  developmentStatus: 'Platform in development - Beta version',

  // Hero section
  heroTitle: 'Video Conferencing',
  heroSubtitle: 'Simple & Effective',
  heroDescription: 'VisioConnect - Video conferencing platform developed by Théo Garcès. Simple and effective solution for your online meetings, currently tested by a small team of 3 people. Modern interface, reliable technology.',
  testPlatform: 'Test the platform',
  seeFeatures: 'See features',

  // Pricing section
  choosePlan: 'Choose your plan',
  flexibleSolutions: 'Flexible solutions adapted to all your needs, from personal use to large enterprises',
  testWithFamily: 'To test with family and friends',
  toDefine: 'to be defined',
  proVersionLater: 'Paid version planned for later',
  customPlan: 'Custom',
  customDescription: 'For specific needs (contact me!)',
  negotiable: 'negotiable',
  standardVideo: 'Standard video quality',
  basicChat: 'Basic chat',
  essentialFeatures: 'Essential features',
  improvedQuality: 'Improved quality',
  bonusFeatures: 'Bonus features',
  updatePriority: 'Priority in updates',
  comingSoon: 'Coming soon',
  customFeatures: 'Custom features',
  onDemandDevelopment: 'On-demand development',
  privateInstallation: 'Private installation possible',
  directSupport: 'Direct support with Théo',
  needsAdaptation: 'Adaptation to needs',
  contactMe: 'Contact me',

  // About section
  aboutProject: 'About the project',
  projectDescription: 'VisioConnect was born from my passion for modern communication technologies. As a full-stack developer, I wanted to create a solution that combines technological innovation and exceptional user experience.',
  myVision: 'My vision',
  visionDescription: 'Democratize access to high-quality professional communication tools. Every team, regardless of size, deserves technology that amplifies their collaboration.',
  technologiesUsed: 'Technologies used',
  techDescription: 'React.js, WebRTC, Socket.io, Node.js, MongoDB, AI/ML for video optimization, and many other cutting-edge technologies for a smooth experience.',
  creationYear: 'Year of creation',
  philosophy: 'Philosophy',
  targetAvailability: 'Target availability',
  madeWithLove: 'Made with passion',

  // Contact section
  contactTitle: 'Contact me',
  contactDescription: 'A question, a suggestion, or want to collaborate? Don\'t hesitate to contact me!',
  
  // Integrations section
  integrations: {
    title: 'Integrations',
    subtitle: 'Connect VisiConnect to your favorite tools for a unified and productive experience.',
    connect: 'Connect',
    google: {
      description: 'Integrate Gmail, Google Calendar, Drive and the entire Google suite for maximum productivity.'
    },
    microsoft: {
      description: 'Sync Teams, Outlook, OneDrive and SharePoint for optimal collaboration.'
    },
    slack: {
      description: 'Connect Slack to receive notifications and control your meetings from your workspace.'
    },
    zoom: {
      description: 'Native integration with Zoom for a smooth video experience and extended features.'
    },
    trello: {
      description: 'Manage your projects and tasks directly from your meetings with bidirectional synchronization.'
    },
    jira: {
      description: 'Synchronize your projects and documentation for optimal team management.'
    },
    salesforce: {
      description: 'Integrate your CRM to track prospects and customers directly in meetings.'
    },
    github: {
      description: 'Complete integration with GitHub for code review and team project management.'
    }
  },
  
  // Footer sections
  product: 'Product',
  apiDocumentation: 'API Documentation',
  scheduler: 'Scheduler',
  serviceStatus: 'Service Status',
  enterprise: 'Enterprise',
  community: 'Community',
  userGuide: 'User Guide',
  legalSecurity: 'Legal & Security',
  privacyPolicy: 'Privacy Policy',
  termsOfUse: 'Terms of Use',
  cookiePolicy: 'Cookie Policy',
  gdprCompliance: 'GDPR Compliance',
  accessibility: 'Accessibility',
  contactAvailable: 'Contact available on request',
  developmentInProgress: 'Development in progress',
  france: 'France',
  contactDeveloper: 'Contact the developer',
  
  // Features Page
  featuresPageTitle: 'Features',
  featuresPageSubtitle: 'Discover all the features that make VisioConnect a complete solution',
  
  // Feature Categories
  coreFeatures: 'Core Features',
  collaborationFeatures: 'Collaboration',
  technicalFeatures: 'Technical',
  
  // Core Features
  videoHD4K: '4K HD Video Conferencing',
  videoHD4KDesc: 'Crystal clear video quality up to 4K with automatic optimization based on your bandwidth.',
  videoHD4KBenefit1: 'Up to 4K resolution',
  videoHD4KBenefit2: 'Automatic optimization',
  videoHD4KBenefit3: 'Low latency',
  videoHD4KBenefit4: 'Multi-screen support',
  
  unlimitedMeetings: 'Unlimited Meetings',
  unlimitedMeetingsDesc: 'Organize meetings without participant limits with our dynamic scaling technology.',
  unlimitedMeetingsBenefit1: 'Unlimited participants',
  unlimitedMeetingsBenefit2: 'Automatic scaling',
  unlimitedMeetingsBenefit3: 'Role management',
  unlimitedMeetingsBenefit4: 'Virtual rooms',
  
  enhancedSecurity: 'Enhanced Security',
  enhancedSecurityDesc: 'End-to-end encryption and compliance with international security standards.',
  enhancedSecurityBenefit1: 'AES-256 encryption',
  enhancedSecurityBenefit2: '2FA authentication',
  enhancedSecurityBenefit3: 'GDPR compliance',
  enhancedSecurityBenefit4: 'Security audit',
  
  advancedScreenShare: 'Advanced Screen Sharing',
  advancedScreenShareDesc: 'Share your screen, specific applications or interactive whiteboards.',
  advancedScreenShareBenefit1: 'Selective sharing',
  advancedScreenShareBenefit2: 'Remote control',
  advancedScreenShareBenefit3: 'Annotations',
  advancedScreenShareBenefit4: 'Recording',
  
  // Collaboration Features
  interactiveWhiteboard: 'Interactive Whiteboard',
  interactiveWhiteboardDesc: 'Collaborate in real-time on whiteboards with advanced drawing tools.',
  interactiveWhiteboardBenefit1: 'Drawing tools',
  interactiveWhiteboardBenefit2: 'Real-time collaboration',
  interactiveWhiteboardBenefit3: 'Built-in templates',
  interactiveWhiteboardBenefit4: 'Multiple format export',
  
  integratedChat: 'Integrated Chat',
  integratedChatDesc: 'Rich text communication with files, emojis and automatic translation.',
  integratedChatBenefit1: 'Rich messages',
  integratedChatBenefit2: 'File sharing',
  integratedChatBenefit3: 'Auto translation',
  integratedChatBenefit4: 'Persistent history',
  
  smartScheduling: 'Smart Scheduling',
  smartSchedulingDesc: 'Calendar integration with automatic optimal slot suggestions.',
  smartSchedulingBenefit1: 'Calendar sync',
  smartSchedulingBenefit2: 'AI suggestions',
  smartSchedulingBenefit3: 'Automatic reminders',
  smartSchedulingBenefit4: 'Timezone management',
  
  aiNoteTaking: 'AI Note Taking',
  aiNoteTakingDesc: 'Automatic transcription and intelligent summary generation for your meetings.',
  aiNoteTakingBenefit1: 'Real-time transcription',
  aiNoteTakingBenefit2: 'AI summaries',
  aiNoteTakingBenefit3: 'Action points',
  aiNoteTakingBenefit4: 'Semantic search',
  
  // Technical Features
  globalCDN: 'Global CDN',
  globalCDNDesc: 'Distributed infrastructure for optimal performance worldwide.',
  globalCDNBenefit1: 'Minimal latency',
  globalCDNBenefit2: '99.9% availability',
  globalCDNBenefit3: 'Auto-scaling',
  globalCDNBenefit4: 'Edge computing',
  
  multiPlatform: 'Multi-Platform',
  multiPlatformDesc: 'Compatible on all devices: desktop, mobile, tablet, web browser.',
  multiPlatformBenefit1: 'iOS & Android',
  multiPlatformBenefit2: 'Native apps',
  multiPlatformBenefit3: 'PWA',
  multiPlatformBenefit4: 'Modern browsers',
  
  advancedAnalytics: 'Advanced Analytics',
  advancedAnalyticsDesc: 'Detailed metrics on engagement, quality and usage of your meetings.',
  advancedAnalyticsBenefit1: 'Real-time metrics',
  advancedAnalyticsBenefit2: 'Detailed reports',
  advancedAnalyticsBenefit3: 'AI insights',
  advancedAnalyticsBenefit4: 'Data export',
  
  completeAPI: 'Complete API',
  completeAPIDesc: 'Integrate VisioConnect into your applications with our complete REST API and SDK.',
  completeAPIBenefit1: 'RESTful API',
  completeAPIBenefit2: 'JavaScript SDK',
  completeAPIBenefit3: 'Webhooks',
  completeAPIBenefit4: 'Complete documentation',
  
  
  // Pages and common translations
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
  backToHome: 'Back to home',
  learnMore: 'Learn more',
  getStartedNow: 'Get started now',
  contactUs: 'Contact us',
  viewDocumentation: 'View documentation',
  endToEndEncryption: 'End-to-end encryption',
  encryptionDesc: 'All your communications are protected by military-grade AES-256 encryption.',
  secureInfrastructure: 'Secure infrastructure',
  infrastructureDesc: 'Our servers are hosted in certified data centers with maximum physical security.',
  privacyCompliance: 'GDPR Compliance',
  complianceDesc: 'Full compliance with European data protection regulations.',
  projectVision: 'Project vision',
  visionText: 'VisioConnect was born from my passion for modern communication technologies. As a full-stack developer, I wanted to create a solution that combines technological innovation and exceptional user experience.',
  technicalStack: 'Technical stack',
  stackText: 'React.js, WebRTC, Socket.io, Node.js, MongoDB, AI/ML for video optimization, and many other cutting-edge technologies for a smooth experience.',
  sendMessage: 'Send message',
  yourMessage: 'Your message',
  messagePlaceholder: 'Describe your question or suggestion...',
  emailAddress: 'Email address',
  fullName: 'Full name',
  subject: 'Subject',
  frequentQuestions: 'Frequently asked questions',
  technicalSupport: 'Technical support',
  userGuides: 'User guides',
  quickLinks: 'Quick links',
  socialMedia: 'Social media',
  newsletter: 'Newsletter',
  subscribeNewsletter: 'Subscribe to newsletter',
  emailPlaceholder: 'Your email address',
  subscribe: 'Subscribe',
  comingSoonFeature: 'Coming soon',
  inDevelopment: 'In development',
  betaVersion: 'Beta version',
  underConstruction: 'Under construction',
  cookiesPageTitle: 'Cookie Policy',
  whatAreCookies: 'What is a cookie?',
  cookiesDesc: 'Cookies are small text files stored on your device when you visit a website.',
  cookieTypes: 'Types of cookies used',
  essentialCookies: 'Essential cookies',
  analyticsCookies: 'Analytics cookies',
  dataCollection: 'Data collection',
  dataUsage: 'Data usage',
  dataSharing: 'Data sharing',
  userRights: 'Your rights',
  serviceTerms: 'Terms of service',
  userObligations: 'User obligations',
  serviceAvailability: 'Service availability',
  liability: 'Liability',
  systemStatus: 'System status',
  allSystemsOperational: 'All systems operational',
  serviceIncidents: 'Service incidents',
  maintenanceScheduled: 'Scheduled maintenance',
  performanceMetrics: 'Performance metrics',
  uptime: 'Uptime',
  responseTime: 'Response time',
  gettingStarted: 'Getting started',
  basicFeatures: 'Basic features',
  advancedFeatures: 'Advanced features',
  troubleshooting: 'Troubleshooting',
  tips: 'Tips and tricks',

  // Personal description
  personalDescription: 'Hi! I\'m Théo, I\'m 25 and I\'ve been developing VisioConnect since July 2023. It\'s my video conferencing platform made with React and Node.js. Still in closed beta but it\'s progressing well thanks to feedback from my testers!'
};

export default enTranslations;