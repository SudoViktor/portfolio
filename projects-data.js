const PROJECTS_DATA = [
  {
    id: "litebank",
    image: "img/litebank/LiteBank.png", // або null, якщо картинки ще немає
    mediaFolder: "img/litebank",
    media: [
      "LiteBank.png",
      "1.jpeg",
      "2.jpeg",
      "3.jpeg",
    ],
    tags: ["Python", "FastAPI", "Apache Kafka", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com/SudoViktor/LiteBank",
    demoUrl: "",
    uk: {
      title: "LiteBank",
      shortDesc: "Подієво-орієнтована банківська платформа на мікросервісах із асинхронною обробкою операцій через Kafka.",
      fullTitle: "LiteBank — Подієво-орієнтована банківська платформа",
      subtitle: "Мікросервісна архітектура, ізольовані бази PostgreSQL та асинхронний обмін подіями.",
      overview: "Платформа для роботи з рахунками, картками та фінансовими переказами, де кожен домен винесено в окремий сервіс і контейнер. Замість жорстких синхронних ланцюжків взаємодія побудована навколо топіків Kafka та моделі журналу операцій (ledger) як джерела істини.",
      highlights: [
        "Окремі сервіси: authservice (JWT), accountservice, transactionservice, ledgerservice та веб-інтерфейс.",
        "Роздільні бази PostgreSQL для кожного домену, включно з ledger_db для верифікації балансів.",
        "Взаємодія через топіки AccountOwners, CreateTransaction та CompleteTransaction.",
        "Повне локальне розгортання через Docker та Docker Compose."
      ],
      notes: "Пет-проєкт для відпрацювання мікросервісного підходу, консистентності станів та подієвої взаємодії."
    },
    en: {
      title: "LiteBank",
      shortDesc: "Event-driven microservices banking platform with asynchronous transaction processing via Kafka.",
      fullTitle: "LiteBank — Event-Driven Banking Platform",
      subtitle: "Microservices architecture, isolated PostgreSQL databases, and asynchronous event flows.",
      overview: "A platform for managing accounts, cards, and transfers with each domain isolated in its own service and container. Service communication relies on Kafka topics and a ledger-based source of truth for balance verification.",
      highlights: [
        "Dedicated services: authservice (JWT), accountservice, transactionservice, ledgerservice, and web frontend.",
        "Isolated PostgreSQL databases per domain, including ledger_db as the source of truth.",
        "Asynchronous flows over AccountOwners, CreateTransaction, and CompleteTransaction topics.",
        "One-command local setup with Docker and Docker Compose."
      ],
      notes: "Personal project focused on microservices design, state consistency, and event-driven messaging."
    }
  },
  {
    id: "telegram-bot",
    image: null,
    tags: ["Python", "aiogram", "asyncio", "SQLAlchemy", "SQLite"],
    githubUrl: "",
    demoUrl: "",
    uk: {
      title: "Telegram Bot (Production)",
      shortDesc: "Асинхронний Telegram-бот на Python із роботою в продакшені, станами користувачів та базою даних.",
      fullTitle: "Telegram Bot — Робочий бот у продакшені",
      subtitle: "Асинхронна логіка на aiogram + asyncio та збереження даних через SQLAlchemy.",
      overview: "Тут буде повний опис твого робочого бота: які задачі він закриває, як влаштовані сценарії, робота з БД, зовнішні інтеграції та деплой.",
      highlights: [
        "Асинхронна обробка запитів та сценаріїв користувачів.",
        "Робота з БД через SQLAlchemy та оптимізація частих запитів.",
        "Стабільна робота в продакшен-середовищі."
      ],
      notes: "Чернетка картки — деталі та посилання можна доповнити в будь-який момент у projects-data.js."
    },
    en: {
      title: "Telegram Bot (Production)",
      shortDesc: "Asynchronous Python Telegram bot running in production with user state handling and database storage.",
      fullTitle: "Telegram Bot — Production Bot",
      subtitle: "Asynchronous workflows with aiogram + asyncio and database persistence via SQLAlchemy.",
      overview: "Full description of your live bot will go here: core workflows, bot commands/states, database schema, integrations, and deployment setup.",
      highlights: [
        "Asynchronous handling of user interactions and flows.",
        "Database access via SQLAlchemy with query optimization.",
        "Running in a live production environment."
      ],
      notes: "Draft entry — feel free to expand details and links anytime in projects-data.js."
    }
  },
  {
    id: "project-template",
    image: null,
    tags: ["Python", "FastAPI", "Docker"],
    githubUrl: "",
    demoUrl: "",
    uk: {
      title: "Новий проєкт (Шаблон)",
      shortDesc: "Короткий опис картки: що робить сервіс або утиліта і яку задачу вирішує.",
      fullTitle: "Новий проєкт — Повна назва",
      subtitle: "Короткий підзаголовок для сторінки деталей.",
      overview: "Детальний опис проєкту, архітектурні рішення та як запустити локально.",
      highlights: [
        "Ключова можливість або технічне рішення №1.",
        "Ключова можливість або технічне рішення №2."
      ],
      notes: "Скопіюй цей об'єкт у PROJECTS_DATA, щоб швидко додати ще один проєкт."
    },
    en: {
      title: "New Project (Template)",
      shortDesc: "Short card summary: what the service or utility does and what problem it solves.",
      fullTitle: "New Project — Full Title",
      subtitle: "Short subtitle for the project details page.",
      overview: "Detailed project overview, architecture choices, and local setup instructions.",
      highlights: [
        "Key feature or technical decision #1.",
        "Key feature or technical decision #2."
      ],
      notes: "Duplicate this object inside PROJECTS_DATA to add another project quickly."
    }
  }
];