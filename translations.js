const TRANSLATIONS = {
  uk: {
    brand: {
      name: "Віктор Лопатін",
      role: "Python Developer"
    },
    nav: {
      about: "Про мене",
      experience: "Досвід",
      projects: "Проєкти",
      education: "Освіта",
      stack: "Стек",
      contacts: "Контакти"
    },
    sidebar: {
      status: "Open to Remote",
      emailBtn: "Написати на пошту"
    },
    about: {
      title: "Про мене",
      subtitle: "Backend Python-розробник з комерційним досвідом створення сервісів обробки даних, API-інтеграцій та Telegram-ботів.",
      kpi1Label: "Комерційний досвід",
      kpi1Val: "1.5+ роки",
      kpi1Sub: "Python, SQL, REST API",
      kpi2Label: "Основний фокус",
      kpi2Val: "Backend & Bots",
      kpi2Sub: "Автоматизація, парсинг, інтеграції",
      kpi3Label: "Формат роботи",
      kpi3Val: "Remote",
      kpi3Sub: "Автономне робоче місце 24/7",
      profileTitle: "Інженерний профіль",
      profileP1: "Спеціалізуюся на розробці бекенд-логіки на Python, проєктуванні взаємодії з реляційними базами даних та створенні надійних сервісів автоматизації. Маю досвід побудови REST API, парсингу даних та інтеграції сторонніх сервісів у продакшен-середовищі.",
      profileP2: "Підтримую власні пет-проєкти та продакшен Telegram-бота на Python. Орієнтуюся на чистий, підтримуваний код, роботу в Linux-середовищі та швидке вирішення прикладних технічних задач."
    },
    experience: {
      title: "Досвід роботи",
      subtitle: "Розробка та підтримка Telegram-ботів і бекенд-логіки на Python.",
      roleTitle: "Python Developer — InCust",
      period: "October 2021 – January 2023",
      summary: "Займався розробкою Telegram-ботів, роботою з базами даних та розвитком сервісної логіки.",
      b1: "Розробляв Telegram-ботів та нові функції на Python із використанням aiogram та asyncio.",
      b2: "Працював із базою даних через SQLAlchemy та оптимізував запити для швидшої роботи.",
      b3: "Створював нових ботів під задачі, підтримував існуючі та додавав потрібний функціонал."
    },
    projects: {
      title: "Проєкти та розробки",
      subtitle: "Комерційні та пет-проєкти на Python: від продакшен-ботів до утиліт автоматизації (список доповнюється).",
      p1Title: "Telegram Bot (Production)",
      p1Badge: "Python • Aiogram • SQLite/PostgreSQL",
      p1Desc: "Робочий Telegram-бот на Python із асинхронною архітектурою, обробкою команд користувачів, збереженням станів у БД та інтеграцією зовнішніх API.",
      p1Status: "Статус: Працює в продакшені • Детальний опис та посилання будуть додані",
      p2Title: "Проєкт #2 (Заглушка)",
      p2Badge: "Python • FastAPI / Docker",
      p2Desc: "Місце для опису репозиторію з GitHub: архітектура сервісу, вирішена задача, використані бібліотеки та приклади коду.",
      p2Status: "Статус: Готується до публікації • Опис буде оновлено",
      p3Title: "Проєкт #3 (Заглушка)",
      p3Badge: "Python • Automation / Parsing",
      p3Desc: "Місце для опису наступного проєкту: скрипт збору та обробки даних, робота з чергами або утиліта для автоматизації процесів.",
      p3Status: "Статус: У процесі оформлення • Опис буде оновлено",
      githubBtn: "Переглянути на GitHub →"
    },
    education: {
      title: "Освіта",
      subtitle: "Вища профільна освіта в галузі інженерії програмного забезпечення.",
      degree: "Магістр інженерії програмного забезпечення",
      year: "2023",
      uni: "Національний університет кораблебудування імені адмірала Макарова",
      uniDesc: "Поглиблена підготовка з проєктування ПЗ, алгоритмів і структур даних, реляційних баз даних та розподілених систем."
    },
    stack: {
      title: "Технічний стек",
      subtitle: "Інструменти та підходи для розробки мікросервісних, подієво-орієнтованих та бекенд-систем.",
      stack1Title: "Python, API та архітектура",
      stack2Title: "Брокери повідомлень, БД та інфраструктура"
    },
    contacts: {
      title: "Контакти",
      subtitle: "Відкритий до пропозицій на позиції Python Developer (Backend / Bots / Automation).",
      tgSub: "Найшвидший спосіб зв'язку",
      ghSub: "Репозиторії та приклади коду",
      mailSub: "Для офферів та офіційних запитів"
    }
  },

  en: {
    brand: {
      name: "Viktor Lopatin",
      role: "Python Developer"
    },
    nav: {
      about: "About Me",
      experience: "Experience",
      projects: "Projects",
      education: "Education",
      stack: "Tech Stack",
      contacts: "Contacts"
    },
    sidebar: {
      status: "Open to Remote",
      emailBtn: "Send Email"
    },
    about: {
      title: "About Me",
      subtitle: "Backend Python Developer with commercial experience in data processing services, API integrations, and Telegram bots.",
      kpi1Label: "Commercial Experience",
      kpi1Val: "1.5+ Years",
      kpi1Sub: "Python, SQL, REST API",
      kpi2Label: "Core Focus",
      kpi2Val: "Backend & Bots",
      kpi2Sub: "Automation, scraping, integrations",
      kpi3Label: "Work Format",
      kpi3Val: "Remote",
      kpi3Sub: "Autonomous 24/7 workstation",
      profileTitle: "Engineering Profile",
      profileP1: "I specialize in Python backend development, relational database interactions, and reliable automation services. Experienced in building REST APIs, data pipelines, and third-party service integrations in production environments.",
      profileP2: "Currently maintaining pet projects and a live production Telegram bot built with Python. Focused on clean, maintainable code, Linux-based workflows, and pragmatic problem-solving."
    },
    experience: {
      title: "Work Experience",
      subtitle: "Building and maintaining Telegram bots and backend logic in Python.",
      roleTitle: "Python Developer — InCust",
      period: "October 2021 – January 2023",
      summary: "Focused on Telegram bot development, database queries, and feature delivery.",
      b1: "Built Telegram bots and new features in Python using aiogram and asyncio.",
      b2: "Worked with the database via SQLAlchemy and optimized queries for better performance.",
      b3: "Developed new bots for specific tasks, maintained existing ones, and shipped new functionality."
    },
    projects: {
      title: "Projects & Repositories",
      subtitle: "Commercial and personal Python projects: from live Telegram bots to automation tools (to be expanded).",
      p1Title: "Telegram Bot (Production)",
      p1Badge: "Python • Aiogram • SQLite/PostgreSQL",
      p1Desc: "Live Python Telegram bot featuring asynchronous architecture, user state management in a database, and external API integrations.",
      p1Status: "Status: Live in production • Detailed case study & link coming soon",
      p2Title: "Project #2 (Placeholder)",
      p2Badge: "Python • FastAPI / Docker",
      p2Desc: "Placeholder for a GitHub repository: service architecture, problem solved, core libraries used, and code snippets.",
      p2Status: "Status: Preparing documentation • Details will be added soon",
      p3Title: "Project #3 (Placeholder)",
      p3Badge: "Python • Automation / Parsing",
      p3Desc: "Placeholder for the next project: data collection and processing script, task queues, or workflow automation utility.",
      p3Status: "Status: In progress • Details will be added soon",
      githubBtn: "View on GitHub →"
    },
    education: {
      title: "Education",
      subtitle: "Master's degree in Software Engineering.",
      degree: "Master's Degree in Software Engineering",
      year: "2023",
      uni: "Admiral Makarov National University of Shipbuilding",
      uniDesc: "Focused on software architecture, algorithms and data structures, relational databases, and system design."
    },
    stack: {
      title: "Tech Stack",
      subtitle: "Technologies and tools for building microservices, event-driven, and backend systems.",
      stack1Title: "Python, API & Architecture",
      stack2Title: "Message Brokers, DB & Infrastructure"
    },
    contacts: {
      title: "Contacts",
      subtitle: "Open to opportunities for Python Developer roles (Backend / Bots / Automation).",
      tgSub: "Fastest way to reach me",
      ghSub: "Repositories and code samples",
      mailSub: "For job offers and official inquiries"
    }
  }
};