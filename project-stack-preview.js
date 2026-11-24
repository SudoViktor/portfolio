(() => {
  let modalEl = null;
  let deckStackEl = null;
  let modalTitleEl = null;
  let modalCounterEl = null;
  let thumbsBarEl = null;
  let prevBtnEl = null;
  let nextBtnEl = null;

  let currentItems = [];
  let cardNodes = [];
  let cardRestPoses = [];
  let currentIndex = 0;
  let isSwiping = false;
  let swipeTimer = null;

  const VIDEO_EXT_RE = /\.(mp4|webm|ogg|mov)(\?.*)?$/i;

  function isVideoUrl(url = '') {
    return VIDEO_EXT_RE.test(String(url));
  }

  function resolveMediaUrl(folder = '', file = '') {
    const cleanFile = String(file || '').trim();
    if (!cleanFile) return '';
    if (/^(https?:\/\/|\/|\.\/|\.\.\/|img\/|assets\/|data:|blob:)/i.test(cleanFile)) {
      return cleanFile;
    }
    const cleanFolder = String(folder || '').trim().replace(/\/+$/, '');
    return cleanFolder ? `${cleanFolder}/${cleanFile}` : cleanFile;
  }

  function pushUniqueMedia(list, seenSet, rawEntry, folder, fallbackType = null, idx = 0) {
    if (!rawEntry) return;

    let src = '';
    let type = fallbackType;
    let caption = '';

    if (typeof rawEntry === 'string') {
      src = resolveMediaUrl(folder, rawEntry);
      caption = rawEntry.split('/').pop() || `#${idx + 1}`;
    } else if (typeof rawEntry === 'object' && rawEntry.src) {
      src = resolveMediaUrl(rawEntry.folder || folder, rawEntry.src);
      type = rawEntry.type || fallbackType;
      caption = rawEntry.caption || rawEntry.src.split('/').pop() || `#${idx + 1}`;
    }

    if (!src || seenSet.has(src)) return;
    seenSet.add(src);

    list.push({
      src,
      type: type || (isVideoUrl(src) ? 'video' : 'image'),
      caption
    });
  }

  function getProjectMedia(project) {
    if (!project) return [];
    const list = [];
    const seen = new Set();

    const mainImageSrc = project.image ? resolveMediaUrl(project.mediaFolder, project.image) : '';
    if (mainImageSrc) {
      pushUniqueMedia(list, seen, mainImageSrc, project.mediaFolder, null, 0);
    }

    const sources = [
      ...(Array.isArray(project.media) ? project.media : []),
      ...(Array.isArray(project.images) ? project.images.map(x => ({ src: x, type: 'image' })) : []),
      ...(Array.isArray(project.videos) ? project.videos.map(x => ({ src: x, type: 'video' })) : []),
      ...(Array.isArray(project.gallery) ? project.gallery : [])
    ];

    sources.forEach((entry, idx) => {
      pushUniqueMedia(list, seen, entry, project.mediaFolder, null, idx + 1);
    });

    return list;
  }

  function randomBetween(min, max) {
    return +(min + Math.random() * (max - min)).toFixed(2);
  }

  function buildRandomStackStyles() {
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

  function generateCardPoses(count) {
    const startSign = Math.random() < 0.5 ? -1 : 1;
    return Array.from({ length: count }, (_, i) => {
      const sign = i % 2 === 0 ? startSign : -startSign;
      return {
        frontRot: +(sign * randomBetween(0.6, 1.8)).toFixed(2),
        frontX: +(sign * randomBetween(1, 3)).toFixed(1),
        frontY: +randomBetween(-1.5, 1.5).toFixed(1),
        back1Rot: +(sign * randomBetween(2.8, 4.6)).toFixed(2),
        back1X: +(sign * randomBetween(12, 20)).toFixed(1),
        back1Y: +randomBetween(6, 12).toFixed(1),
        back2Rot: +(sign * randomBetween(4.0, 6.2)).toFixed(2),
        back2X: +(sign * randomBetween(18, 28)).toFixed(1),
        back2Y: +randomBetween(10, 18).toFixed(1)
      };
    });
  }

  function triggerDropAnimation(root = document) {
    const wraps = root.querySelectorAll('.project-stack-wrap');
    wraps.forEach((wrap) => {
      clearTimeout(wrap._dropTimer);
      wrap.classList.remove('is-dropping', 'is-animating');

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          wrap.classList.add('is-dropping', 'is-animating');
          wrap._dropTimer = setTimeout(() => {
            wrap.classList.remove('is-animating');
          }, 760);
        });
      });
    });
  }

  function stopAllModalVideos() {
    if (!deckStackEl) return;
    deckStackEl.querySelectorAll('video').forEach((v) => {
      v.pause();
    });
  }

  function buildDeckCards() {
    if (!deckStackEl) return;
    deckStackEl.innerHTML = '';
    cardNodes = [];
    cardRestPoses = generateCardPoses(currentItems.length);

    currentItems.forEach((item, idx) => {
      const card = document.createElement('div');
      const isVid = item.type === 'video';
      card.className = `psp-stack-card pos-deep ${isVid ? 'is-video-card' : ''}`;
      card.dataset.cardIndex = String(idx);

      if (isVid) {
        const video = document.createElement('video');
        video.src = item.src;
        video.controls = true;
        video.playsInline = true;
        video.preload = 'metadata';
        card.appendChild(video);
      } else {
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.caption || '';
        img.decoding = 'async';
        if (typeof img.decode === 'function') {
          img.decode().catch(() => {});
        }
        card.appendChild(img);
      }

      deckStackEl.appendChild(card);
      cardNodes.push(card);
    });
  }

  function getCardTransformForSlot(idx, slot) {
    const p = cardRestPoses[idx] || {
      frontRot: 0, frontX: 0, frontY: 0,
      back1Rot: 3.5, back1X: 15, back1Y: 9,
      back2Rot: -4.5, back2X: -18, back2Y: 13
    };

    if (slot === 0) {
      return `translate3d(${p.frontX}px, ${p.frontY}px, 0) rotate(${p.frontRot}deg)`;
    }
    if (slot === 1) {
      return `translate3d(${p.back1X}px, ${p.back1Y}px, 0) rotate(${p.back1Rot}deg)`;
    }
    if (slot === 2) {
      return `translate3d(${p.back2X}px, ${p.back2Y}px, 0) rotate(${p.back2Rot}deg)`;
    }
    return `translate3d(0px, 12px, 0) scale(0.94)`;
  }

  function syncDeckLayout(activeIdx, skipCardIdx = -1) {
    const total = currentItems.length;
    if (!total) return;

    currentIndex = ((activeIdx % total) + total) % total;

    cardNodes.forEach((card, idx) => {
      if (idx === skipCardIdx) return;

      const rel = (idx - currentIndex + total) % total;
      card.classList.remove('pos-front', 'pos-back-1', 'pos-back-2', 'pos-deep', 'fly-out-next', 'fly-in-start');

      if (rel === 0) {
        card.classList.add('pos-front');
      } else if (rel === 1 && total > 1) {
        card.classList.add('pos-back-1');
      } else if (rel === 2 && total > 2) {
        card.classList.add('pos-back-2');
      } else {
        card.classList.add('pos-deep');
      }

      card.style.transform = getCardTransformForSlot(idx, rel);
    });

    const activeItem = currentItems[currentIndex];
    modalTitleEl.textContent = activeItem.caption || '';
    modalCounterEl.textContent = `${currentIndex + 1} / ${total}`;

    const hasMultiple = total > 1;
    prevBtnEl.style.display = hasMultiple ? 'inline-flex' : 'none';
    nextBtnEl.style.display = hasMultiple ? 'inline-flex' : 'none';

    if (thumbsBarEl) {
      thumbsBarEl.style.display = hasMultiple ? 'flex' : 'none';
      thumbsBarEl.querySelectorAll('.psp-thumb-item').forEach((btn, idx) => {
        btn.classList.toggle('is-active', idx === currentIndex);
      });
    }
  }

  function buildThumbnails() {
    if (!thumbsBarEl) return;
    thumbsBarEl.innerHTML = currentItems.map((item, idx) => {
      const thumbMedia = item.type === 'video'
        ? `<video src="${item.src}#t=0.1" muted preload="metadata"></video><span class="psp-thumb-vid-badge">VID</span>`
        : `<img src="${item.src}" alt="${item.caption || ''}">`;

      return `
        <button type="button" class="psp-thumb-item ${idx === currentIndex ? 'is-active' : ''}" data-thumb-index="${idx}" title="${item.caption || ''}">
          ${thumbMedia}
        </button>
      `;
    }).join('');

    thumbsBarEl.querySelectorAll('.psp-thumb-item').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetIdx = Number(btn.dataset.thumbIndex);
        if (targetIdx !== currentIndex) {
          stepDeck(targetIdx > currentIndex ? 1 : -1, targetIdx);
        }
      });
    });
  }

  function stepDeck(direction, explicitTargetIndex = null) {
    const total = currentItems.length;
    if (isSwiping || total <= 1) return;
    isSwiping = true;
    clearTimeout(swipeTimer);
    stopAllModalVideos();

    const oldIdx = currentIndex;
    const nextIdx = explicitTargetIndex !== null
      ? explicitTargetIndex
      : (currentIndex + direction + total) % total;

    if (direction >= 0) {
      const leavingCard = cardNodes[oldIdx];
      syncDeckLayout(nextIdx, oldIdx);

      if (leavingCard) {
        leavingCard.classList.remove('pos-front', 'pos-back-1', 'pos-back-2', 'pos-deep');
        leavingCard.classList.add('fly-out-next');
      }

      swipeTimer = setTimeout(() => {
        if (leavingCard) {
          leavingCard.classList.add('no-transition');
          leavingCard.classList.remove('fly-out-next');
          const rel = (oldIdx - currentIndex + total) % total;
          leavingCard.classList.add(rel === 1 ? 'pos-back-1' : rel === 2 ? 'pos-back-2' : 'pos-deep');
          leavingCard.style.transform = getCardTransformForSlot(oldIdx, rel);
          void leavingCard.offsetWidth;
          leavingCard.classList.remove('no-transition');
        }
        isSwiping = false;
      }, 330);
    } else {
      const arrivingCard = cardNodes[nextIdx];
      if (arrivingCard) {
        arrivingCard.classList.add('no-transition', 'fly-in-start');
        arrivingCard.classList.remove('pos-front', 'pos-back-1', 'pos-back-2', 'pos-deep');
        void arrivingCard.offsetWidth;
        arrivingCard.classList.remove('no-transition');
      }

      requestAnimationFrame(() => {
        syncDeckLayout(nextIdx, -1);
      });

      swipeTimer = setTimeout(() => {
        isSwiping = false;
      }, 400);
    }
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
      <div class="psp-floating-topbar">
        <div class="psp-modal-meta">
          <span class="psp-modal-counter" id="pspModalCounter">1 / 1</span>
          <div class="psp-modal-title" id="pspModalTitle"></div>
        </div>
        <button type="button" class="psp-modal-close" id="pspModalClose" aria-label="Close modal">&times;</button>
      </div>

      <div class="psp-deck-stage">
        <button type="button" class="psp-nav-btn prev" id="pspPrevBtn" aria-label="Previous item">&#8249;</button>
        <div class="psp-deck-stack" id="pspDeckStack"></div>
        <button type="button" class="psp-nav-btn next" id="pspNextBtn" aria-label="Next item">&#8250;</button>
      </div>

      <div class="psp-thumbs-bar" id="pspThumbsBar"></div>
    `;

    document.body.appendChild(modalEl);

    deckStackEl = document.getElementById('pspDeckStack');
    modalTitleEl = document.getElementById('pspModalTitle');
    modalCounterEl = document.getElementById('pspModalCounter');
    thumbsBarEl = document.getElementById('pspThumbsBar');
    prevBtnEl = document.getElementById('pspPrevBtn');
    nextBtnEl = document.getElementById('pspNextBtn');

    document.getElementById('pspModalClose').addEventListener('click', (e) => {
      e.stopPropagation();
      close();
    });

    prevBtnEl.addEventListener('click', (e) => {
      e.stopPropagation();
      stepDeck(-1);
    });

    nextBtnEl.addEventListener('click', (e) => {
      e.stopPropagation();
      stepDeck(1);
    });

    modalEl.addEventListener('click', (e) => {
      if (e.target === modalEl || e.target.classList.contains('psp-deck-stage')) {
        close();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!modalEl || !modalEl.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') stepDeck(1);
      if (e.key === 'ArrowLeft') stepDeck(-1);
    });
  }

  function close() {
  if (!modalEl) return;
  clearTimeout(swipeTimer);
  isSwiping = false;
  stopAllModalVideos();
  modalEl.classList.remove('is-open');
  modalEl.setAttribute('aria-hidden', 'true');
  modalEl.style.pointerEvents = 'none';
  modalEl.style.visibility = 'hidden';

  if (document.activeElement && modalEl.contains(document.activeElement)) {
    document.activeElement.blur();
  }
}

function open(itemsOrSrc, title = '', startIndex = 0) {
  ensureModal();
  clearTimeout(swipeTimer);
  isSwiping = false;

  if (Array.isArray(itemsOrSrc)) {
    currentItems = itemsOrSrc.filter(Boolean);
  } else if (typeof itemsOrSrc === 'string' && itemsOrSrc) {
    currentItems = [{
      src: itemsOrSrc,
      type: isVideoUrl(itemsOrSrc) ? 'video' : 'image',
      caption: title
    }];
  } else {
    return;
  }

  if (!currentItems.length) return;

  buildDeckCards();
  buildThumbnails();
  syncDeckLayout(startIndex, -1);

  modalEl.style.visibility = 'visible';
  modalEl.style.pointerEvents = 'auto';
  modalEl.classList.add('is-open');
  modalEl.setAttribute('aria-hidden', 'false');
}

  function renderLayerContent(item, altText) {
    if (!item) return '';
    const vidBadge = item.type === 'video' ? `<span class="psp-video-tag">VIDEO</span>` : '';
    if (item.type === 'video') {
      return `${vidBadge}<video src="${item.src}#t=0.1" muted preload="metadata"></video>`;
    }
    return `${vidBadge}<img src="${item.src}" alt="${altText}" class="project-detail-img">`;
  }

  function renderStackHtml(projectOrSrc, altText = '', hintText = 'Stack') {
    const items = typeof projectOrSrc === 'object' && projectOrSrc !== null
      ? getProjectMedia(projectOrSrc)
      : (projectOrSrc
          ? [{ src: projectOrSrc, type: isVideoUrl(projectOrSrc) ? 'video' : 'image', caption: altText }]
          : []);

    if (!items.length) return '';

    const styles = buildRandomStackStyles();
    const frontItem = items[0];
    const back1Item = items[1] || null;
    const back2Item = items[2] || null;

    const encodedItems = encodeURIComponent(JSON.stringify(items));
    const countLabel = items.length > 1 ? `${hintText} (${items.length})` : hintText;

    return `
      <div class="project-stack-wrap" data-stack-items="${encodedItems}" data-stack-title="${altText}">
        <div class="project-stack-layer layer-back-2 ${back2Item ? '' : 'is-empty-card'}" style="${styles.back2}">
          ${renderLayerContent(back2Item, altText)}
        </div>
        <div class="project-stack-layer layer-back-1 ${back1Item ? '' : 'is-empty-card'}" style="${styles.back1}">
          ${renderLayerContent(back1Item, altText)}
        </div>
        <div class="project-stack-layer layer-front" style="${styles.front}">
          ${renderLayerContent(frontItem, altText)}
        </div>
        <span class="project-stack-hint">${countLabel}</span>
      </div>
    `;
  }

  document.addEventListener('click', (e) => {
    const stackWrap = e.target.closest('.project-stack-wrap');
    if (!stackWrap) return;

    let items = [];
    if (stackWrap.dataset.stackItems) {
      try {
        items = JSON.parse(decodeURIComponent(stackWrap.dataset.stackItems));
      } catch (_) {
        items = [];
      }
    }

    if (items.length > 0) {
      open(items, stackWrap.dataset.stackTitle || '', 0);
      return;
    }

    const img = stackWrap.querySelector('img');
    const src = stackWrap.dataset.stackSrc || (img && img.src);
    const title = stackWrap.dataset.stackTitle || (img && img.alt) || '';
    if (src) {
      open(src, title, 0);
    }
  });

  window.ProjectStackPreview = {
    open,
    close,
    renderStackHtml,
    triggerDropAnimation,
    getProjectMedia
  };
})();