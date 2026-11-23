document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('toggleSidebar');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const sidebarBackdrop = document.getElementById('sidebarBackdrop');
  const navItems = document.querySelectorAll('.nav-item');
  const appContent = document.getElementById('appContent');
  const pageTitle = document.getElementById('pageTitle');
  const langBtns = document.querySelectorAll('.lang-btn');
  const randomStackTag = document.getElementById('randomStackTag');

  const MOBILE_BREAKPOINT = 768;

  // Список навичок зі стеку для випадкового відображення у верхньому правому куті
  const STACK_SKILLS = [
    'Python 3',
    'FastAPI',
    'Microservices',
    'Event-Driven',
    'REST API',
    'JWT Auth',
    'Asyncio',
    'Apache Kafka',
    'PostgreSQL',
    'SQL',
    'Docker',
    'Linux / Bash',
    'Git'
  ];

  let lastStackText = randomStackTag ? randomStackTag.textContent.trim() : '';

  function pickThreeRandomSkills() {
    const copy = [...STACK_SKILLS];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, 3).join(' • ');
  }

  function renderRandomStack(animate = false) {
    if (!randomStackTag) return;

    let nextText = pickThreeRandomSkills();
    if (nextText === lastStackText && STACK_SKILLS.length >= 3) {
      nextText = pickThreeRandomSkills();
    }

    if (!animate) {
      randomStackTag.textContent = nextText;
      lastStackText = nextText;
      return;
    }

    randomStackTag.classList.add('tag-fading');
    setTimeout(() => {
      randomStackTag.textContent = nextText;
      lastStackText = nextText;

      randomStackTag.classList.remove('tag-fading');
      randomStackTag.classList.add('tag-prepare');

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          randomStackTag.classList.remove('tag-prepare');
        });
      });
    }, 200);
  }

  renderRandomStack(false);

  // Керування мобільним висувним меню
  function openMobileMenu() {
    sidebar.classList.add('mobile-open');
    if (sidebarBackdrop) sidebarBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    sidebar.classList.remove('mobile-open');
    if (sidebarBackdrop) sidebarBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      if (sidebar.classList.contains('mobile-open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener('click', closeMobileMenu);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('mobile-open')) {
      closeMobileMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > MOBILE_BREAKPOINT && sidebar.classList.contains('mobile-open')) {
      closeMobileMenu();
    }
  });

  let currentLang = localStorage.getItem('portfolio_lang') || 'uk';
  let currentUrl = 'pages/about.html';
  let currentTitleKey = 'nav.about';

  function getTranslation(key, lang) {
    return key.split('.').reduce((obj, part) => obj && obj[part], TRANSLATIONS[lang]) || key;
  }

  function applyTranslations(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = getTranslation(key, lang);
    });

    pageTitle.textContent = getTranslation(currentTitleKey, lang);

    langBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  // 1. Згортання/розгортання бокового меню (десктоп)
  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });

  // 2. Перемикання мови (UA / EN)
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.dataset.lang;
      if (selectedLang === currentLang) return;
      currentLang = selectedLang;
      localStorage.setItem('portfolio_lang', currentLang);
      applyTranslations(currentLang);
    });
  });

  // 3. Завантаження окремої HTML-сторінки з анімацією "швидкий вжух -> довгий вжууух"
  async function loadPage(url, titleKey, pushState = true, isTabSwitch = false) {
    try {
      appContent.classList.add('page-exit');

      if (isTabSwitch) {
        renderRandomStack(true);
      }

      const [response] = await Promise.all([
        fetch(url),
        new Promise(resolve => setTimeout(resolve, 200))
      ]);

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const html = await response.text();

      currentUrl = url;
      currentTitleKey = titleKey;

      appContent.classList.remove('page-exit');
      appContent.classList.add('page-enter');
      appContent.innerHTML = html;

      applyTranslations(currentLang);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          appContent.classList.remove('page-enter');
        });
      });

      navItems.forEach(item => {
        item.classList.toggle('active', item.dataset.page === url);
      });

      if (pushState) {
        history.pushState({ url, titleKey }, '', `#${url.replace('pages/', '').replace('.html', '')}`);
      }
    } catch (error) {
      appContent.classList.remove('page-exit');
      appContent.innerHTML = `
        <div class="card">
          <h3>Не вдалося відкрити розділ / Failed to load page</h3>
          <p style="color: #64748b; margin-top: 8px;">
            Запустіть сайт через локальний сервер (Live Server або <code>python -m http.server</code>).
          </p>
        </div>
      `;
    }
  }

  // 4. Кліки по меню
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const url = item.dataset.page;
      const titleKey = item.dataset.titleKey;

      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        closeMobileMenu();
      }

      if (item.classList.contains('active')) return;
      loadPage(url, titleKey, true, true);
    });
  });

  // 5. Навігація браузера Назад/Вперед
  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.url) {
      loadPage(e.state.url, e.state.titleKey, false, true);
    }
  });

  // 6. Стартове завантаження
  const initialHash = window.location.hash.replace('#', '');
  const matchedNav = Array.from(navItems).find(
    item => item.dataset.page === `pages/${initialHash}.html`
  );

  if (matchedNav) {
    loadPage(matchedNav.dataset.page, matchedNav.dataset.titleKey, false, false);
  } else {
    loadPage('pages/about.html', 'nav.about', false, false);
  }
});