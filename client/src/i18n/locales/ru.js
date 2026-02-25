// Russian translations
const ruTranslations = {
  common: {
    loading: 'Загрузка...',
    error: 'Ошибка',
    success: 'Успех',
    cancel: 'Отмена',
    confirm: 'Подтвердить',
    save: 'Сохранить',
    edit: 'Редактировать',
    delete: 'Удалить',
    back: 'Назад',
    next: 'Далее',
    previous: 'Предыдущий',
    close: 'Закрыть',
    search: 'Поиск',
    filter: 'Фильтр',
    sort: 'Сортировать',
    email: 'Электронная почта',
    password: 'Пароль',
    name: 'Имя',
    firstName: 'Имя',
    lastName: 'Фамилия',
    phone: 'Телефон',
    address: 'Адрес',
    city: 'Город',
    country: 'Страна',
    language: 'Язык',
    settings: 'Настройки',
    profile: 'Профиль',
    logout: 'Выйти',
    login: 'Войти',
    register: 'Зарегистрироваться',
    forgotPassword: 'Забыли пароль?'
  },

  navigation: {
    home: 'Главная',
    features: 'Функции',
    pricing: 'Цены',
    about: 'О нас',
    contact: 'Контакты',
    support: 'Поддержка',
    documentation: 'Документация',
    community: 'Сообщество',
    blog: 'Блог',
    careers: 'Карьера',
    legal: 'Правовая информация',
    privacy: 'Конфиденциальность',
    terms: 'Условия использования',
    cookies: 'Куки',
    security: 'Безопасность'
  },

  hero: {
    title: 'Платформа видеоконференций нового поколения',
    subtitle: 'Легко подключайтесь к своим командам с помощью нашего передового и интуитивного решения для видеоконференций',
    startFree: 'Начать бесплатно',
    watchDemo: 'Посмотреть демо',
    trustedBy: 'Доверяют более {{count}} компаний по всему миру'
  },

  features: {
    title: 'Мощные функции',
    subtitle: 'Все необходимое для продуктивных встреч',
    videoCall: {
      title: 'HD видеозвонки',
      description: 'Кристально чистое видео до 4K с студийным качеством звука'
    },
    screenShare: {
      title: 'Демонстрация экрана',
      description: 'Делитесь экраном, приложениями или отдельными вкладками'
    },
    recording: {
      title: 'Запись',
      description: 'Записывайте встречи и получайте к ним доступ позже'
    },
    chat: {
      title: 'Встроенный чат',
      description: 'Общайтесь во время звонков с сообщениями и файлами'
    },
    whiteboard: {
      title: 'Доска',
      description: 'Визуально сотрудничайте с встроенной доской'
    },
    security: {
      title: 'Расширенная безопасность',
      description: 'Сквозное шифрование и контроль безопасности'
    }
  },

  pricing: {
    title: 'Простые и прозрачные цены',
    subtitle: 'Выберите план, который подходит вашим потребностям',
    monthly: 'Ежемесячно',
    yearly: 'Ежегодно',
    perMonth: '/месяц',
    perUser: 'за пользователя',
    free: {
      title: 'Бесплатно',
      price: '0₽',
      description: 'Идеально для начала',
      features: [
        'До 3 участников',
        'Встречи на 40 минут',
        'HD аудио и видео',
        'Демонстрация экрана'
      ]
    },
    pro: {
      title: 'Pro',
      price: '1200₽',
      description: 'Для растущих команд',
      features: [
        'До 50 участников',
        'Неограниченные встречи',
        'Облачная запись',
        'Чат и доска',
        'Приоритетная поддержка'
      ]
    },
    enterprise: {
      title: 'Enterprise',
      price: 'Индивидуально',
      description: 'Для крупных организаций',
      features: [
        'Неограниченное количество участников',
        'SSO и интеграции',
        'Расширенное администрирование',
        'Выделенная поддержка',
        'Гарантированное SLA'
      ]
    },
    getStarted: 'Начать',
    contactSales: 'Связаться с отделом продаж'
  },

  auth: {
    login: {
      title: 'Вход',
      subtitle: 'Войдите в свою учетную запись VisiConnect',
      email: 'Адрес электронной почты',
      password: 'Пароль',
      rememberMe: 'Запомнить меня',
      forgotPassword: 'Забыли пароль?',
      signIn: 'Войти',
      noAccount: 'Нет учетной записи?',
      createAccount: 'Создать учетную запись',
      orContinueWith: 'Или продолжить с'
    },
    signup: {
      title: 'Создать учетную запись',
      subtitle: 'Присоединяйтесь к VisiConnect сегодня',
      firstName: 'Имя',
      lastName: 'Фамилия',
      email: 'Адрес электронной почты',
      password: 'Пароль',
      confirmPassword: 'Подтвердить пароль',
      acceptTerms: 'Я принимаю {{terms}} и {{privacy}}',
      terms: 'условия использования',
      privacy: 'политику конфиденциальности',
      createAccount: 'Создать учетную запись',
      alreadyHaveAccount: 'Уже есть учетная запись?',
      signIn: 'Войти',
      orContinueWith: 'Или продолжить с'
    },
    forgotPassword: {
      title: 'Забыли пароль',
      subtitle: 'Введите свой email для сброса пароля',
      email: 'Адрес электронной почты',
      sendReset: 'Отправить ссылку для сброса',
      backToLogin: 'Вернуться к входу'
    }
  },

  meeting: {
    title: 'Встреча',
    participants: 'Участники',
    chat: 'Чат',
    settings: 'Настройки',
    leave: 'Покинуть',
    mute: 'Отключить звук',
    unmute: 'Включить звук',
    video: 'Камера',
    screenShare: 'Демонстрация экрана',
    record: 'Записать',
    endMeeting: 'Завершить встречу',
    inviteOthers: 'Пригласить других',
    copyLink: 'Скопировать ссылку',
    joinedMeeting: '{{name}} присоединился к встрече',
    leftMeeting: '{{name}} покинул встречу'
  },

  tutorial: {
    title: 'Руководство по началу работы',
    welcome: 'Добро пожаловать в VisiConnect!',
    step1: {
      title: 'Создать встречу',
      description: 'Нажмите "Новая встреча" чтобы начать'
    },
    step2: {
      title: 'Пригласить участников',
      description: 'Поделитесь ссылкой на встречу с коллегами'
    },
    step3: {
      title: 'Использовать инструменты',
      description: 'Откройте для себя демонстрацию экрана, чат и доску'
    },
    step4: {
      title: 'Управлять настройками',
      description: 'Настройте свой опыт в настройках'
    },
    next: 'Далее',
    previous: 'Назад',
    finish: 'Завершить',
    skip: 'Пропустить руководство'
  },

  errors: {
    network: 'Ошибка сетевого подключения',
    unauthorized: 'Неавторизованный доступ',
    forbidden: 'Доступ запрещен',
    notFound: 'Ресурс не найден',
    serverError: 'Ошибка сервера',
    validation: 'Ошибка валидации',
    unknown: 'Произошла неизвестная ошибка',
    tryAgain: 'Пожалуйста, попробуйте еще раз',
    contactSupport: 'Обратитесь в службу поддержки, если проблема не исчезнет'
  },

  success: {
    accountCreated: 'Учетная запись успешно создана!',
    passwordReset: 'Письмо для сброса отправлено',
    settingsSaved: 'Настройки сохранены',
    invitationSent: 'Приглашение отправлено',
    meetingCreated: 'Встреча успешно создана',
    profileUpdated: 'Профиль обновлен'
  },

  // Ключи для HomePage
  featureHDVideo: 'HD Видео',
  featureHDVideoDesc: 'Высококачественное видео для кристально чистых встреч',
  featureHDBenefit1: 'Разрешение до 4K',
  featureHDBenefit2: 'Студийное качество звука',
  featureHDBenefit3: 'Автоматическая оптимизация',

  featureSecurity: 'Расширенная Безопасность',
  featureSecurityDesc: 'Максимальная защита с шифрованием от точки до точки',
  featureSecurityBenefit1: 'Шифрование AES-256',
  featureSecurityBenefit2: 'Безопасная аутентификация',
  featureSecurityBenefit3: 'Соответствие GDPR',

  featureMultiparticipants: 'Множественные участники',
  featureMultiparticipantsDesc: 'Встречи с несколькими участниками одновременно',
  featureMultiparticipantsBenefit1: 'До 50 участников',
  featureMultiparticipantsBenefit2: 'Управление правами',
  featureMultiparticipantsBenefit3: 'Адаптивный вид сетки',

  featurePerformance: 'Оптимальная Производительность',
  featurePerformanceDesc: 'Передовые технологии для плавной работы',
  featurePerformanceBenefit1: 'Ультра-низкая задержка',
  featurePerformanceBenefit2: 'Оптимизация пропускной способности',
  featurePerformanceBenefit3: 'Автоматическая адаптация',

  featureAccessibility: 'Доступность',
  featureAccessibilityDesc: 'Платформа доступна всем, везде',
  featureAccessibilityBenefit1: 'Совместимость со всеми устройствами',
  featureAccessibilityBenefit2: 'Интуитивный интерфейс',
  featureAccessibilityBenefit3: 'Поддержка мульти-браузеров',

  featureInterface: 'Современный Интерфейс',
  featureInterfaceDesc: 'Чистый дизайн и исключительный пользовательский опыт',
  featureInterfaceBenefit1: 'Адаптивный дизайн',
  featureInterfaceBenefit2: 'Интуитивная навигация',
  featureInterfaceBenefit3: 'Настраиваемые темы',

  // Тарифные планы
  freePlan: 'Бесплатный План',
  proPlan: 'Pro План',
  maxParticipants: 'максимум участников',
  duration: 'минут встречи',
  unlimited: 'неограниченно',
  getStarted: 'Начать',

  // Статистика
  statValue1: '3',
  statLabel1: 'Активных тестеров',
  statValue2: '2024',
  statLabel2: 'Год создания',
  statValue3: '99.9%',
  statLabel3: 'Целевая доступность',
  statValue4: '♥',
  statLabel4: 'Сделано с любовью',

  // Разные тексты
  copyrightText: '© 2024 VisioConnect. Разработано с ♥ Théo Garcès.',
  developmentStatus: 'Платформа в разработке - Бета версия',
  
  // Hero section
  heroTitle: 'Видеоконференции',
  heroSubtitle: 'Просто и Эффективно',
  heroDescription: 'VisioConnect - платформа видеоконференций, разработанная Théo Garcès. Простое и эффективное решение для ваших онлайн-встреч, в настоящее время тестируется небольшой командой из 3 человек. Современный интерфейс, надежные технологии.',
  testPlatform: 'Протестировать платформу',
  seeFeatures: 'Посмотреть функции',

  // Pricing section
  choosePlan: 'Выберите ваш план',
  flexibleSolutions: 'Гибкие решения, адаптированные ко всем вашим потребностям, от личного использования до крупных предприятий',
  testWithFamily: 'Для тестирования с семьей и друзьями',
  toDefine: 'определить',
  proVersionLater: 'Платная версия планируется позже',
  customPlan: 'Индивидуальный',
  customDescription: 'Для специфических потребностей (свяжитесь со мной!)',
  negotiable: 'договорная',
  standardVideo: 'Стандартное качество видео',
  basicChat: 'Базовый чат',
  essentialFeatures: 'Основные функции',
  improvedQuality: 'Улучшенное качество',
  bonusFeatures: 'Бонусные функции',
  updatePriority: 'Приоритет в обновлениях',
  comingSoon: 'Скоро будет',
  customFeatures: 'Индивидуальные функции',
  onDemandDevelopment: 'Разработка по запросу',
  privateInstallation: 'Возможна частная установка',
  directSupport: 'Прямая поддержка от Théo',
  needsAdaptation: 'Адаптация к потребностям',
  contactMe: 'Связаться со мной',
  
  // Pages and common translations
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
  backToHome: 'Вернуться домой',
  learnMore: 'Узнать больше',
  getStartedNow: 'Начать сейчас',
  contactUs: 'Связаться с нами',
  viewDocumentation: 'Посмотреть документацию',
  endToEndEncryption: 'Сквозное шифрование',
  encryptionDesc: 'Все ваши коммуникации защищены военным шифрованием AES-256.',
  secureInfrastructure: 'Безопасная инфраструктура',
  infrastructureDesc: 'Наши серверы размещены в сертифицированных дата-центрах с максимальной физической безопасностью.',
  privacyCompliance: 'Соответствие GDPR',
  complianceDesc: 'Полное соответствие европейским правилам защиты данных.',
  projectVision: 'Видение проекта',
  visionText: 'VisioConnect родился из моей страсти к современным коммуникационным технологиям. Как full-stack разработчик, я хотел создать решение, которое сочетает технологические инновации и исключительный пользовательский опыт.',
  technicalStack: 'Технический стек',
  stackText: 'React.js, WebRTC, Socket.io, Node.js, MongoDB, AI/ML для оптимизации видео, и многие другие передовые технологии для плавного опыта.',
  sendMessage: 'Отправить сообщение',
  yourMessage: 'Ваше сообщение',
  messagePlaceholder: 'Опишите ваш вопрос или предложение...',
  emailAddress: 'Адрес электронной почты',
  fullName: 'Полное имя',
  subject: 'Тема',
  frequentQuestions: 'Часто задаваемые вопросы',
  technicalSupport: 'Техническая поддержка',
  userGuides: 'Руководства пользователя',
  apiDocumentation: 'Документация API',
  quickLinks: 'Быстрые ссылки',
  socialMedia: 'Социальные сети',
  newsletter: 'Рассылка',
  subscribeNewsletter: 'Подписаться на рассылку',
  emailPlaceholder: 'Ваш адрес электронной почты',
  subscribe: 'Подписаться',
  comingSoonFeature: 'Скоро будет',
  inDevelopment: 'В разработке',
  betaVersion: 'Бета-версия',
  underConstruction: 'В разработке',
  cookiesPageTitle: 'Политика использования файлов cookie',
  whatAreCookies: 'Что такое cookie?',
  cookiesDesc: 'Cookies - это небольшие текстовые файлы, которые сохраняются на вашем устройстве при посещении веб-сайта.',
  cookieTypes: 'Используемые типы cookies',
  essentialCookies: 'Основные cookies',
  analyticsCookies: 'Аналитические cookies',

  // Интеграции
  integrations: {
    title: 'Интеграции',
    subtitle: 'Подключите VisiConnect к вашим любимым инструментам для бесшовного опыта',
    connectButton: 'Подключить',
    services: {
      google: {
        title: 'Google Workspace',
        description: 'Интегрируйтесь с Gmail, Drive, Calendar и всем пакетом Google'
      },
      microsoft: {
        title: 'Microsoft 365',
        description: 'Подключитесь к Teams, Outlook, OneDrive и всем приложениям Microsoft'
      },
      slack: {
        title: 'Slack',
        description: 'Синхронизируйте ваши каналы и сообщения прямо в VisiConnect'
      },
      zoom: {
        title: 'Zoom',
        description: 'Совместимость с вашими существующими встречами и конференциями Zoom'
      },
      trello: {
        title: 'Trello',
        description: 'Управляйте досками и карточками Trello из VisiConnect'
      },
      jira: {
        title: 'Jira',
        description: 'Отслеживание задач и управление проектами в интеграции'
      },
      salesforce: {
        title: 'Salesforce',
        description: 'Подключитесь к вашей CRM для полного управления клиентами'
      },
      github: {
        title: 'GitHub',
        description: 'Управление кодом и репозиториями напрямую интегрировано'
      }
    }
  }
};

export default ruTranslations;