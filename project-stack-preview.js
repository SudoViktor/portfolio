(() => {
  let modalEl = null;
  let modalImgEl = null;
  let modalTitleEl = null;

  function randomBetween(min, max) {
    return +(min + Math.random() * (max - min)).toFixed(2);
  }

  function buildRandomStackStyles() {
    // Гарантуємо різноспрямований нахил: одна картка вліво, одна вправо, верхня з легким нахилом
    const signA = Math.random() < 0.5 ? -1 : 1;
    const signB = -signA;

    const back2Rot = +(signA * randomBetween(3.2, 5.5)).toFixed(2);
    const back2X = +(signA * randomBetween(7, 12)).toFixed(1);
    const back2Y = randomBetween(5, 9);

    const back1Rot = +(signB * randomBetween(2.6, 4.8)).toFixed(2);
    const back1X = +(signB * randomBetween(6, 11)).toFixed(1);
    const back1Y = randomBetween(3, 7);

    const frontRot = +randomBetween(-2.2, 2.2).toFixed(2);
    const frontX = +randomBetween(-2, 2).toFixed(1);
    const frontY = 0;

    return {
      back2: `--rest-x:${back2X}px; --rest-y:${back2Y}px; --rest-rot:${back2Rot}deg; --drop-x:${back2X * 2.2}px; --drop-rot:${back2Rot * 2.4}deg; transform: translate3d(${back2X}px, ${back2Y}px, 0) rotate(${back2Rot}deg);`,
      back1: `--rest-x:${back1X}px; --rest-y:${back1Y}px; --rest-rot:${back1Rot}deg; --drop-x:${back1X * 2.2}px; --drop-rot:${back1Rot * 2.4}deg; transform: translate3d(${back1X}px, ${back1Y}px, 0) rotate(${back1Rot}deg);`,
      front: `--rest-x:${frontX}px; --rest-y:${frontY}px; --rest-rot:${frontRot}deg; --drop-x:${frontX * 2.5}px; --drop-rot:${frontRot * 2.8}deg; transform: translate3d(${frontX}px, ${frontY}px, 0) rotate(${frontRot}deg);`
    };
  }

  function triggerDropAnimation(root = document) {
    const wraps = root.querySelectorAll('.project-stack-wrap');
    wraps.forEach((wrap) => {
      wrap.classList.remove('is-dropping', 'is-animating');
      void wrap.offsetWidth;
      wrap.classList.add('is-dropping', 'is-animating');

      clearTimeout(wrap._dropTimer);
      wrap._dropTimer = setTimeout(() => {
        wrap.classList.remove('is-animating');
      }, 760);
    });
  }

  function ensureModal() {
    if (modalEl) return;

    modalEl = document.createElement('div');
    modalEl.className = 'psp-modal';
    modalEl.id = 'projectImageModal';
    modalEl.setAttribute('role', 'dialog');
    modalEl.setAttribute('aria-modal', 'true');
    modalEl.setAttribute('aria-hidden', 'true');

    modalEl.innerHTML = `
      <div class="psp-modal-dialog">
        <div class="psp-modal-header">
          <div class="psp-modal-title" id="pspModalTitle"></div>
          <button type="button" class="psp-modal-close" id="pspModalClose" aria-label="Close modal">&times;</button>
        </div>
        <div class="psp-modal-body">
          <img src="" alt="" class="psp-modal-img" id="pspModalImg">
        </div>
      </div>
    `;

    document.body.appendChild(modalEl);

    modalImgEl = document.getElementById('pspModalImg');
    modalTitleEl = document.getElementById('pspModalTitle');
    const closeBtn = document.getElementById('pspModalClose');

    closeBtn.addEventListener('click', close);

    modalEl.addEventListener('click', (e) => {
      if (e.target === modalEl) {
        close();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalEl.classList.contains('is-open')) {
        close();
      }
    });
  }

  function open(src, title = '') {
    if (!src) return;
    ensureModal();

    modalImgEl.src = src;
    modalImgEl.alt = title;
    modalTitleEl.textContent = title;

    modalEl.classList.add('is-open');
    modalEl.setAttribute('aria-hidden', 'false');
  }

  function close() {
    if (!modalEl) return;
    modalEl.classList.remove('is-open');
    modalEl.setAttribute('aria-hidden', 'true');
  }

  function renderStackHtml(imageSrc, altText, hintText = 'Zoom') {
    if (!imageSrc) return '';
    const styles = buildRandomStackStyles();

    return `
      <div class="project-stack-wrap is-dropping is-animating" data-stack-src="${imageSrc}" data-stack-title="${altText}">
        <div class="project-stack-layer layer-back-2" style="${styles.back2}"></div>
        <div class="project-stack-layer layer-back-1" style="${styles.back1}"></div>
        <div class="project-stack-layer layer-front" style="${styles.front}">
          <img src="${imageSrc}" alt="${altText}" class="project-detail-img">
        </div>
        <span class="project-stack-hint">${hintText}</span>
      </div>
    `;
  }

  document.addEventListener('click', (e) => {
    const stackWrap = e.target.closest('.project-stack-wrap');
    if (!stackWrap) return;

    const img = stackWrap.querySelector('img');
    const src = stackWrap.dataset.stackSrc || (img && img.src);
    const title = stackWrap.dataset.stackTitle || (img && img.alt) || '';

    if (src) {
      open(src, title);
    }
  });

  window.ProjectStackPreview = {
    open,
    close,
    renderStackHtml,
    triggerDropAnimation
  };
})();

