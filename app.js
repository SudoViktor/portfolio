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
  let activeProjectId = null;

  function getTranslation(key, lang) {
    return key.split('.').reduce((obj, part) => obj && obj[part], TRANSLATIONS[lang]) || key;
  }

  function getProjectsList() {
    return typeof PROJECTS_DATA !== 'undefined' && Array.isArray(PROJECTS_DATA) ? PROJECTS_DATA : [];
  }

  function escapeHtml(str = '') {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Рендер сітки карток проєктів
  function renderProjectsGrid(lang) {
    const container = document.getElementById('projectsList');
    if (!container) return;

    const noImgText = getTranslation('projects.noImage', lang);
    const projects = getProjectsList();

    container.innerHTML = projects.map(proj => {
      const content = proj[lang] || proj.uk || proj.en;
      const thumbHtml = proj.image
        ? `<div class="project-thumb"><img src="${escapeHtml(proj.image)}" alt="${escapeHtml(content.title)}"></div>`
        : `<div class="project-thumb"><span class="project-thumb-placeholder">${escapeHtml(noImgText)}</span></div>`;

      const tagsHtml = (proj.tags || [])
        .map(tag => `<span class="skill-tag">${escapeHtml(tag)}</span>`)
        .join('');

      return `
        <article class="project-card" data-project-id="${escapeHtml(proj.id)}">
          ${thumbHtml}
          <div class="project-body">
            <div class="project-title">${escapeHtml(content.title)}</div>
            <p class="project-desc">${escapeHtml(content.shortDesc)}</p>
            <div class="tag-list">${tagsHtml}</div>
          </div>
        </article>
      `;
    }).join('');

    container.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => {
        openProjectDetail(card.dataset.projectId, true);
      });
    });
  }

  // Рендер повної сторінки одного проєкту
  // Рендер повної сторінки одного проєкту
  function renderProjectDetail(projectId, lang) {
    const project = getProjectsList().find(p => p.id === projectId);
    if (!project) {
      renderProjectsGrid(lang);
      return;
    }

    const content = project[lang] || project.uk || project.en;
    const backLabel = getTranslation('projects.backBtn', lang);
    const highlightsLabel = getTranslation('projects.highlightsTitle', lang);
    const githubLabel = getTranslation('projects.githubBtn', lang);
    const demoLabel = getTranslation('projects.demoBtn', lang);
    const overviewLabel = lang === 'uk' ? 'Огляд проєкту' : 'Project Overview';
    const titleText = content.fullTitle || content.title;
    const hintText = lang === 'uk' ? 'Відкрити' : 'View';

    const linksHtml = [
      project.githubUrl
        ? `<a href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer" class="link-pill">${escapeHtml(githubLabel)}</a>`
        : '',
      project.demoUrl
        ? `<a href="${escapeHtml(project.demoUrl)}" target="_blank" rel="noopener noreferrer" class="link-pill secondary">${escapeHtml(demoLabel)}</a>`
        : ''
    ].filter(Boolean).join('');

    const imageHtml = project.image
      ? (window.ProjectStackPreview
          ? window.ProjectStackPreview.renderStackHtml(
              escapeHtml(project.image),
              escapeHtml(titleText),
              escapeHtml(hintText)
            )
          : `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(titleText)}" class="project-detail-img">`)
      : '';

    const highlightsHtml = Array.isArray(content.highlights) && content.highlights.length > 0
      ? `
        <div class="project-detail-below">
          <div class="card-title">${escapeHtml(highlightsLabel)}</div>
          <ul class="highlights-list">
            ${content.highlights.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
          </ul>
        </div>
      `
      : '';

    const tagsHtml = (project.tags || [])
      .map(tag => `<span class="skill-tag">${escapeHtml(tag)}</span>`)
      .join('');

    const notesHtml = content.notes
      ? `<div class="status-note">${escapeHtml(content.notes)}</div>`
      : '';

    appContent.innerHTML = `
      <div class="project-detail">
        <div class="project-detail-top">
          <button class="back-btn" id="backToProjectsBtn">${escapeHtml(backLabel)}</button>
          ${linksHtml ? `<div class="project-links">${linksHtml}</div>` : ''}
        </div>

        <div class="page-header">
          <h1>${escapeHtml(titleText)}</h1>
          ${content.subtitle ? `<p>${escapeHtml(content.subtitle)}</p>` : ''}
        </div>

        <div class="card">
          <div class="project-hero-split ${project.image ? '' : 'no-image'}">
            ${imageHtml}
            <div class="project-overview-box">
              <span class="project-overview-label">${escapeHtml(overviewLabel)}</span>
              <p class="project-overview-text">${escapeHtml(content.overview)}</p>
            </div>
          </div>
          ${highlightsHtml}
          <div class="tag-list" style="margin-top: 18px;">${tagsHtml}</div>
          ${notesHtml}
        </div>
      </div>
    `;

    if (window.ProjectStackPreview) {
      window.ProjectStackPreview.triggerDropAnimation(appContent);
    }

    pageTitle.textContent = content.title;

    const backBtn = document.getElementById('backToProjectsBtn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        loadPage('pages/projects.html', 'nav.projects', true, false);
      });
    }
  }

  // Відкриття сторінки проєкту з плавною анімацією
  function openProjectDetail(projectId, pushState = true) {
    const project = getProjectsList().find(p => p.id === projectId);
    if (!project) return;

    appContent.classList.add('page-exit');

    setTimeout(() => {
      activeProjectId = projectId;
      currentUrl = 'pages/projects.html';
      currentTitleKey = 'nav.projects';

      appContent.classList.remove('page-exit');
      appContent.classList.add('page-enter');

      renderProjectDetail(projectId, currentLang);

      navItems.forEach(item => {
        item.classList.toggle('active', item.dataset.page === 'pages/projects.html');
      });

      if (pushState) {
        history.pushState({ projectId }, '', `#project-${projectId}`);
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          appContent.classList.remove('page-enter');
        });
      });
    }, 180);
  }

  function applyTranslations(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = getTranslation(key, lang);
    });

    langBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    if (activeProjectId) {
      renderProjectDetail(activeProjectId, lang);
    } else {
      pageTitle.textContent = getTranslation(currentTitleKey, lang);
      if (document.getElementById('projectsList')) {
        renderProjectsGrid(lang);
      }
    }
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

      activeProjectId = null;
      currentUrl = url;
      currentTitleKey = titleKey;

      appContent.classList.remove('page-exit');
      appContent.classList.add('page-enter');
      appContent.innerHTML = html;

      if (url === 'pages/projects.html') {
        renderProjectsGrid(currentLang);
      }

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

      const isSameActiveTab = item.classList.contains('active') && !activeProjectId;
      if (isSameActiveTab) return;
      loadPage(url, titleKey, true, !item.classList.contains('active'));
    });
  });

  // 5. Навігація браузера Назад/Вперед
  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.projectId) {
      openProjectDetail(e.state.projectId, false);
    } else if (e.state && e.state.url) {
      loadPage(e.state.url, e.state.titleKey, false, false);
    }
  });

  // 6. Стартове завантаження
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash.startsWith('project-')) {
    const projId = initialHash.replace('project-', '');
    const exists = getProjectsList().some(p => p.id === projId);
    if (exists) {
      loadPage('pages/projects.html', 'nav.projects', false, false).then(() => {
        openProjectDetail(projId, false);
      });
      return;
    }
  }

  const matchedNav = Array.from(navItems).find(
    item => item.dataset.page === `pages/${initialHash}.html`
  );

  if (matchedNav) {
    loadPage(matchedNav.dataset.page, matchedNav.dataset.titleKey, false, false);
  } else {
    loadPage('pages/about.html', 'nav.about', false, false);
  }
});