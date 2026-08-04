/* ============================================================
   proyecto.js — Cursor + Slider para páginas de proyecto
   Sin Three.js ni sistema de fases — tema oscuro fijo.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  /* Aplicar idioma guardado en localStorage (currentLang viene de i18n.js) */
  if (typeof applyTranslations === 'function') {
    applyTranslations(currentLang);
  }
  setupCursor();
  initSlider();
  initGalleryFade();
  initGalleryColumns();
  initVideoSequence();
  initPdfModal();
  initSalaModal();
  initVideoModal();
  initTeaserModal();
  initFanzineModal();
});

/* ═══════════════════════════════════════════════════════════
   CURSOR — igual que en el portfolio principal
   ═══════════════════════════════════════════════════════════ */
const RING_LERP = 0.10;
let ringX = -100, ringY = -100;
let cursorMx = -100, cursorMy = -100;

function setupCursor() {
  if (window.innerWidth <= 768) {
    document.body.style.cursor = 'auto';
    return;
  }

  document.body.style.cursor = 'none';

  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  if (dot)  dot.style.display = 'block';
  if (ring) ring.style.display = 'block';

  document.addEventListener('mousemove', (e) => {
    cursorMx = e.clientX;
    cursorMy = e.clientY;
    if (dot) dot.style.transform =
      `translate(${cursorMx}px,${cursorMy}px) translate(-50%,-50%)`;
  });

  document.querySelectorAll('a, button, .tag, input, textarea')
    .forEach(el => {
      el.addEventListener('mouseenter', () => dot && dot.classList.add('is-hovering'));
      el.addEventListener('mouseleave', () => dot && dot.classList.remove('is-hovering'));
    });

  window.addEventListener('resize', () => {
    const isMobile = window.innerWidth <= 768;
    document.body.style.cursor = isMobile ? 'auto' : 'none';
    if (dot)  dot.style.display  = isMobile ? 'none' : 'block';
    if (ring) ring.style.display = isMobile ? 'none' : 'block';
  });

  animateCursor();
}

function animateCursor() {
  ringX += (cursorMx - ringX) * RING_LERP;
  ringY += (cursorMy - ringY) * RING_LERP;
  const ring = document.getElementById('cursorRing');
  if (ring) ring.style.transform =
    `translate(${ringX.toFixed(1)}px,${ringY.toFixed(1)}px) translate(-50%,-50%)`;
  requestAnimationFrame(animateCursor);
}

/* ═══════════════════════════════════════════════════════════
   SLIDER AUTOMÁTICO
   ═══════════════════════════════════════════════════════════ */
const AUTO_INTERVAL = 5000; /* ms entre slides */
let currentSlide  = 0;
let totalSlides   = 0;
let autoTimer     = null;
let isDragging    = false;
let dragStartX    = 0;

function initSlider() {
  const track      = document.getElementById('sliderTrack');
  const dotsWrap   = document.getElementById('sliderDots');
  const prevBtn    = document.getElementById('sliderPrev');
  const nextBtn    = document.getElementById('sliderNext');
  const counterEl  = document.getElementById('sliderCounter');
  const wrapper    = track ? track.closest('.proyecto-slider') : null;

  if (!track) return;

  const slides = track.querySelectorAll('.slider__slide');
  totalSlides = slides.length;
  if (totalSlides === 0) return;

  /* ── Crear dots ── */
  if (dotsWrap) {
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.className = 'slider__dot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('aria-label', `Foto ${i + 1}`);
      dot.addEventListener('click', () => { goTo(i); resetAuto(); });
      dotsWrap.appendChild(dot);
    }
  }

  /* ── Botones prev / next ── */
  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(currentSlide - 1); resetAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(currentSlide + 1); resetAuto(); });

  /* ── Pausa al hacer hover en el slider ── */
  if (wrapper) {
    wrapper.addEventListener('mouseenter', stopAuto);
    wrapper.addEventListener('mouseleave', startAuto);
  }

  /* ── Swipe táctil ── */
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) {
      goTo(currentSlide + (dx < 0 ? 1 : -1));
      resetAuto();
    }
  }, { passive: true });

  /* ── Drag con mouse (opcional) ── */
  track.addEventListener('mousedown', (e) => {
    isDragging   = true;
    dragStartX   = e.clientX;
  });
  track.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const dx = e.clientX - dragStartX;
    if (Math.abs(dx) > 60) {
      goTo(currentSlide + (dx < 0 ? 1 : -1));
      resetAuto();
    }
  });
  track.addEventListener('mouseleave', () => { isDragging = false; });

  /* ── Teclado (flechas) ── */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  { goTo(currentSlide - 1); resetAuto(); }
    if (e.key === 'ArrowRight') { goTo(currentSlide + 1); resetAuto(); }
  });

  /* ── Iniciar ── */
  updateSlider(counterEl);
  startAuto();
}

let touchStartX = 0;

function goTo(idx) {
  const track = document.getElementById('sliderTrack');
  if (!track) return;

  currentSlide = ((idx % totalSlides) + totalSlides) % totalSlides;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;

  /* Actualizar dots */
  document.querySelectorAll('.slider__dot')
    .forEach((d, i) => d.classList.toggle('is-active', i === currentSlide));

  /* Actualizar contador */
  const counterEl = document.getElementById('sliderCounter');
  updateSlider(counterEl);
}

function updateSlider(counterEl) {
  if (counterEl) {
    const cur = String(currentSlide + 1).padStart(2, '0');
    const tot = String(totalSlides).padStart(2, '0');
    counterEl.textContent = `${cur} / ${tot}`;
  }
}

function startAuto() {
  if (autoTimer) return;
  autoTimer = setInterval(() => goTo(currentSlide + 1), AUTO_INTERVAL);
}

function stopAuto() {
  clearInterval(autoTimer);
  autoTimer = null;
}

function resetAuto() {
  stopAuto();
  startAuto();
}

/* ═══════════════════════════════════════════════════════════
   MODAL VISOR DE SALA (YouTube)
   Botón #btnVerSala → abre modal #salaModal con embed de YT.
   Al cerrar, limpia el src del iframe para detener el video.
   ═══════════════════════════════════════════════════════════ */
function initSalaModal() {
  const btn   = document.getElementById('btnVerSala');
  const modal = document.getElementById('salaModal');
  const close = document.getElementById('salaClose');
  const frame = document.getElementById('salaFrame');
  if (!btn || !modal) return;

  function openModal() {
    if (frame) frame.src = frame.dataset.src || '';
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (frame) frame.src = ''; /* detiene el video de YouTube */
  }

  btn.addEventListener('click', openModal);
  if (close) close.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

/* ═══════════════════════════════════════════════════════════
   MODAL VISOR PDF
   Botón #btnVerLibro → abre modal #pdfModal con el PDF.
   El src del iframe se carga solo al abrir (lazy) para no
   bloquear la carga inicial de la página.
   ═══════════════════════════════════════════════════════════ */
function initPdfModal() {
  const btn   = document.getElementById('btnVerLibro');
  const modal = document.getElementById('pdfModal');
  const close = document.getElementById('pdfClose');
  const frame = document.getElementById('pdfFrame');
  if (!btn || !modal) return;

  function openModal() {
    /* Cargar el PDF la primera vez que se abre */
    if (frame && frame.src === '' || frame.src === window.location.href) {
      frame.src = frame.dataset.src || '';
    }
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; /* bloquear scroll del fondo */
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', openModal);
  if (close) close.addEventListener('click', closeModal);

  /* Cerrar con Escape */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  /* Cerrar al hacer click en el fondo oscuro (fuera del iframe) */
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

/* ═══════════════════════════════════════════════════════════
   GALERÍA FADE EN LOOP
   Muestra las imágenes de .proy-gallery__img en secuencia,
   con cross-fade automático cada GALLERY_INTERVAL ms.
   Solo procesa imágenes con src definido (ignora placeholders).
   ═══════════════════════════════════════════════════════════ */
const GALLERY_INTERVAL = 4000; /* ms entre cambios de foto */

/* ═══════════════════════════════════════════════════════════
   SECUENCIA DE VIDEOS — mitad derecha de proy-media
   Cada video se reproduce completo antes de pasar al siguiente.
   Loop infinito con crossfade.
   ═══════════════════════════════════════════════════════════ */
function initVideoSequence() {
  const videos = Array.from(document.querySelectorAll('.proy-video__item'));
  if (!videos.length) return;

  let current = 0;

  /* Asegurar estado inicial: solo el primero visible */
  videos.forEach((v, i) => v.classList.toggle('is-active', i === 0));

  function advance() {
    /* Ocultar y pausar el actual */
    videos[current].classList.remove('is-active');
    videos[current].pause();
    videos[current].currentTime = 0;

    /* Pasar al siguiente (loop) */
    current = (current + 1) % videos.length;
    videos[current].classList.add('is-active');
    videos[current].play().catch(() => {});
    videos[current].addEventListener('ended', advance, { once: true });
  }

  /* Arrancar el primero */
  videos[0].play().catch(() => {});
  videos[0].addEventListener('ended', advance, { once: true });
}

/* ═══════════════════════════════════════════════════════════
   MODAL VISOR DE VIDEO (Ver corto)
   Botón #btnVerCorto → abre modal #videoModal con <video>.
   Autoplay con audio al abrir; pausa y vuelve al inicio al cerrar.
   ═══════════════════════════════════════════════════════════ */
function initVideoModal() {
  const btn    = document.getElementById('btnVerCorto');
  const modal  = document.getElementById('videoModal');
  const close  = document.getElementById('videoClose');
  const player = document.getElementById('videoPlayer');
  if (!btn || !modal) return;

  function openModal() {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (player) player.play().catch(() => {});
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (player) { player.pause(); player.currentTime = 0; }
  }

  btn.addEventListener('click', openModal);
  if (close) close.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  /* Cerrar al hacer click en el fondo (no en el video ni sus controles) */
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

/* ═══════════════════════════════════════════════════════════
   GALERÍAS EN DOS COLUMNAS INDEPENDIENTES
   Cada .proy-gallery__col tiene su propio loop de fade.
   Las columnas arrancan escalonadas (offset de medio intervalo)
   para que no cambien al mismo tiempo.
   ═══════════════════════════════════════════════════════════ */
function initGalleryColumns() {
  const cols = document.querySelectorAll('.proy-gallery__col');
  if (!cols.length) return;

  cols.forEach((col, colIndex) => {
    const imgs = Array.from(col.querySelectorAll('.proy-gallery__img')).filter(img => {
      const s = img.getAttribute('src');
      return s && s.trim() !== '' && s !== window.location.href;
    });
    if (!imgs.length) return;

    let current = 0;
    imgs[0].classList.add('is-active');

    /* Escalonar las columnas para que no cambien simultáneamente */
    const offset = colIndex * (GALLERY_INTERVAL / 2);
    setTimeout(() => {
      setInterval(() => {
        imgs[current].classList.remove('is-active');
        current = (current + 1) % imgs.length;
        imgs[current].classList.add('is-active');
      }, GALLERY_INTERVAL);
    }, offset);
  });
}

/* ═══════════════════════════════════════════════════════════
   MODAL VISOR DE TEASER (Ver teaser)
   Botón #btnVerTeaser → abre modal #teaserModal con <video>.
   Autoplay con audio al abrir; pausa y vuelve al inicio al cerrar.
   ═══════════════════════════════════════════════════════════ */
function initTeaserModal() {
  const btn    = document.getElementById('btnVerTeaser');
  const modal  = document.getElementById('teaserModal');
  const close  = document.getElementById('teaserClose');
  const player = document.getElementById('teaserPlayer');
  if (!btn || !modal) return;

  function openModal() {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (player) player.play().catch(() => {});
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (player) { player.pause(); player.currentTime = 0; }
  }

  btn.addEventListener('click', openModal);
  if (close) close.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

/* ═══════════════════════════════════════════════════════════
   MODAL VISOR DE FANZINE (Flipbook)
   Botón #btnVerFanzine → abre modal #fanzineModal con iframe.
   Carga lazy al primer abrir; limpia src al cerrar.
   ═══════════════════════════════════════════════════════════ */
function initFanzineModal() {
  const btn   = document.getElementById('btnVerFanzine');
  const modal = document.getElementById('fanzineModal');
  const close = document.getElementById('fanzineClose');
  const frame = document.getElementById('fanzineFrame');
  if (!btn || !modal) return;

  function openModal() {
    if (frame && (frame.src === '' || frame.src === window.location.href)) {
      frame.src = frame.dataset.src || '';
    }
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', openModal);
  if (close) close.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

function initGalleryFade() {
  /* Filtrar solo imgs con src real, ignorando las de columnas independientes */
  const all  = Array.from(document.querySelectorAll('.proy-gallery__img'));
  const imgs = all.filter(img => {
    const s = img.getAttribute('src');
    /* Saltar imágenes que pertenecen a .proy-gallery__col (manejadas por initGalleryColumns) */
    if (img.closest('.proy-gallery__col')) return false;
    return s && s.trim() !== '' && s !== window.location.href;
  });

  /* Si no hay imágenes con src, dejar el placeholder visible y salir */
  if (imgs.length === 0) return;

  /* Agrupar por galería: cada .proy-media__gallery corre su propio loop,
     así dos galerías en la misma página no se pisan entre sí. */
  const groups = new Map();
  imgs.forEach(img => {
    const container = img.closest('.proy-media__gallery') || document.body;
    if (!groups.has(container)) groups.set(container, []);
    groups.get(container).push(img);
  });

  Array.from(groups.entries()).forEach(([container, groupImgs], groupIndex) => {
    /* Ocultar el placeholder de texto si esta galería tiene fotos */
    const empty = container.querySelector('.proy-gallery__empty');
    if (empty) empty.style.display = 'none';

    let current = 0;
    groupImgs[0].classList.add('is-active');

    /* Escalonar las galerías para que no cambien todas al mismo tiempo */
    const offset = groupIndex * (GALLERY_INTERVAL / 2);
    setTimeout(() => {
      setInterval(() => {
        groupImgs[current].classList.remove('is-active');
        current = (current + 1) % groupImgs.length;
        groupImgs[current].classList.add('is-active');
      }, GALLERY_INTERVAL);
    }, offset);
  });
}
