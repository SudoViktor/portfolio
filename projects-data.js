const PROJECTS_DATA = [
  {
    id: "litebank",
    image: "img/litebank/LiteBank.png", // або null, якщо картинки ще немає
    mediaFolder: "img/litebank",
    media: [
      "LiteBank.png",
      "Login.png",
      "Menu.jpg",
      "Transactions.png",
      "CardSettings.png",
      "Cashier.png",
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
    id: "orderflow",
    image: "img/orderflow/Orders.png",
    mediaFolder: "img/orderflow",
    media: [
        "Products.png",
        "Clients.png",
        "Orders.png",
        "OrderDetails.png",
        "CreateNewOrder.png",
        "Preview.mp4",
    ],
    tags: ["Python", "Flask", "SQLAlchemy 2.0", "JWT", "Vanilla JS", "Docker"],
    githubUrl: "https://github.com/SudoViktor/OrderFlow",
    demoUrl: "",
    uk: {
      title: "OrderFlow Terminal System",
      shortDesc: "CRM/ERP система для автоматизації бізнес-процесів (замовлення, клієнти, інвентар) на Flask та SPA-фронтенді.",
      fullTitle: "OrderFlow Terminal System — CRM/ERP для автоматизації бізнес-процесів",
      subtitle: "Клієнт-серверна архітектура, REST API на Flask, SQLAlchemy 2.0 та швидкий термінальний SPA-інтерфейс.",
      overview: "CRM/ERP система для управління замовленнями, клієнтами та інвентарем, побудована за архітектурою Client-Server. Бекенд на Flask відповідає за цілісність даних, транзакції та безпеку, а фронтенд на Vanilla JS/CSS реалізований як SPA з термінальним інтерфейсом. Проєкт створено для демонстрації практичних навичок проєктування REST API, роботи з реляційними БД та побудови SPA-клієнта без сторонніх фреймворків.",
      highlights: [
        "RESTful API на Flask із модульними Blueprints та серверною пагінацією (db.paginate) для великих вибірок.",
        "SQLAlchemy 2.0 ORM із підтримкою транзакційності та відкатом змін (db.session.rollback).",
        "JWT-автентифікація (Flask-JWT-Extended) та хешування паролів через Werkzeug.",
        "SPA-фронтенд на Vanilla JS/CSS з асинхронними fetch-запитами, централізованою обробкою помилок (401 Unauthorized, токени) та адаптивною версткою (Flexbox/Grid).",
        "Швидкий запуск через Docker Compose на http://localhost:8080/."
      ],
      notes: "Пет-проєкт для демонстрації навичок розробки клієнт-серверних систем: модульного REST API на Flask, транзакційної роботи з БД через SQLAlchemy 2.0, JWT-безпеки, Vanilla JS SPA та контейнеризації в Docker."
    },
    en: {
      title: "OrderFlow Terminal System",
      shortDesc: "CRM/ERP system for business process automation (orders, clients, inventory) with Flask API and Vanilla JS SPA.",
      fullTitle: "OrderFlow Terminal System — Business Process CRM/ERP",
      subtitle: "Client-Server architecture, modular Flask REST API, SQLAlchemy 2.0, and a terminal-style SPA UI.",
      overview: "A CRM/ERP system for managing orders, clients, and inventory following a Client-Server architecture. The Flask backend handles data integrity, transactions, and authentication, while the Vanilla JS/CSS frontend delivers a responsive terminal-style SPA. Built to demonstrate practical skills in REST API design, transactional database workflows, and framework-free SPA development.",
      highlights: [
        "Modular Flask RESTful API using Blueprints and server-side pagination (db.paginate) for larger datasets.",
        "SQLAlchemy 2.0 ORM with transaction management and rollback support (db.session.rollback).",
        "JWT authentication via Flask-JWT-Extended and password hashing with Werkzeug.",
        "Framework-free SPA frontend in Vanilla JS/CSS with async fetch calls, centralized error handling (401 Unauthorized, tokens), and responsive Flexbox/Grid UI.",
        "Containerized setup via Docker Compose accessible at http://localhost:8080/."
      ],
      notes: "Personal project built to showcase client-server engineering: modular Flask REST APIs, transactional SQLAlchemy 2.0 persistence, JWT auth, Vanilla JS SPA architecture, and Docker deployment."
    }
  }
];