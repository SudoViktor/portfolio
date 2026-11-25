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
      kpi2Val: "Backend",
      kpi2Sub: "Автоматизація, парсинг, інтеграції",
      kpi3Label: "Формат роботи",
      kpi3Val: "Remote",
      kpi3Sub: "Автономне робоче місце 24/7",
      profileTitle: "Інженерний профіль",
      profileP1: "Спеціалізуюся на розробці бекенд-логіки на Python, проєктуванні взаємодії з реляційними базами даних та створенні надійних сервісів автоматизації. Маю досвід побудови REST API, парсингу даних та інтеграції сторонніх сервісів у продакшен-середовищі.",
      profileP2: "Орієнтуюся на чистий, підтримуваний код, роботу в Linux-середовищі та швидке вирішення прикладних технічних задач."
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
      subtitle: "Натисни на картку, щоб відкрити повний опис проєкту, архітектуру та посилання.",
      backBtn: "← Назад до проєктів",
      highlightsTitle: "Ключові деталі та реалізація",
      githubBtn: "GitHub репозиторій ↗",
      demoBtn: "Відкрити демо ↗",
      noImage: "Прев'ю буде додано"
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
    },
    nav: {
      about: "Про мене",
      experience: "Досвід",
      projects: "Проєкти",
      education: "Освіта",
      stack: "Стек",
      resume: "Резюме",
      contacts: "Контакти"
    },
    resume: {
      title: "Завантажити резюме",
      ukTitle: "Українська версія (UA)",
      enTitle: "Англійська версія (EN)",
      downloadBtn: "Завантажити PDF ↓",
      previewBtn: "Відкрити у браузері ↗"
    },
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
      kpi2Val: "Backend",
      kpi2Sub: "Automation, scraping, integrations",
      kpi3Label: "Work Format",
      kpi3Val: "Remote",
      kpi3Sub: "Autonomous 24/7 workstation",
      profileTitle: "Engineering Profile",
      profileP1: "I specialize in Python backend development, relational database interactions, and reliable automation services. Experienced in building REST APIs, data pipelines, and third-party service integrations in production environments.",
      profileP2: "Focused on clean, maintainable code, Linux-based workflows, and pragmatic problem-solving."
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
      subtitle: "Click any card to view the full project description, architecture details, and links.",
      backBtn: "← Back to projects",
      highlightsTitle: "Key Highlights & Implementation",
      githubBtn: "GitHub Repository ↗",
      demoBtn: "Open Demo ↗",
      noImage: "Preview coming soon"
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
    },
    nav: {
      about: "About Me",
      experience: "Experience",
      projects: "Projects",
      education: "Education",
      stack: "Tech Stack",
      resume: "Resume",
      contacts: "Contacts"
    },
    resume: {
      title: "Download Resume",
      ukTitle: "Ukrainian Version (UA)",
      enTitle: "English Version (EN)",
      downloadBtn: "Download PDF ↓",
      previewBtn: "Open in Browser ↗"
    },
  }
};