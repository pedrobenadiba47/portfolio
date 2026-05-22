/* ============================================================
   app.js — Inicialización principal
   Cursor: rastro de partículas encadenadas (solo desktop)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initScroll();
  initContact();
  /* Restaurar idioma desde localStorage (por defecto 'es') */
  applyTranslations(currentLang);
  setupLangSwitcher();
  setupCursor();
  setupSmoothScroll();
  setupMobileNav();
  setupAboutPhotoToggle();
  initScramble();            /* después de applyTranslations — texto ya en ES */
  initListenSequence();
  initProjSlider();          /* slider de proyectos — solo desktop */
  window.addEventListener('resize', debounce(onResize, 250));
});

/* ═══════════════════════════════════════════════
   CURSOR PUNTO + ANILLO

   Estructura:
   - #cursor: punto 4px, sigue el mouse exacto e instantáneo
   - #cursorRing: anillo 34px, sigue con lerp suave → efecto flotante
   El color de ambos viene de var(--text) en CSS, que cambia con la fase.
   El glow (box-shadow) usa var(--accent-dim): amarillo en fondo oscuro,
   invisible en fondo amarillo (accent-dim = rgba(20,20,20,0.25) en phase 1).
   ═══════════════════════════════════════════════ */
const RING_LERP = 0.10;   /* velocidad del anillo (0=lento, 1=inmediato) */

let ringX = -100, ringY = -100;
let cursorMx = -100, cursorMy = -100;

function setupCursor() {
  if (window.innerWidth <= 768) return;

  document.body.style.cursor = 'none';

  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  if (dot)  dot.style.display  = 'block';
  if (ring) ring.style.display = 'block';

  /* Punto: posición exacta del mouse */
  document.addEventListener('mousemove', (e) => {
    cursorMx = e.clientX;
    cursorMy = e.clientY;
    if (dot) dot.style.transform =
      `translate(${cursorMx}px,${cursorMy}px) translate(-50%,-50%)`;
  });

  /* Hover sobre elementos interactivos */
  document.querySelectorAll('a, button, .project-card, .tag, .card, input, textarea')
    .forEach(el => {
      el.addEventListener('mouseenter', () => dot && dot.classList.add('is-hovering'));
      el.addEventListener('mouseleave', () => dot && dot.classList.remove('is-hovering'));
    });

  animateCursor();
}

/* Bucle del anillo — lerp independiente de Three.js */
function animateCursor() {
  ringX += (cursorMx - ringX) * RING_LERP;
  ringY += (cursorMy - ringY) * RING_LERP;

  const ring = document.getElementById('cursorRing');
  if (ring) ring.style.transform =
    `translate(${ringX.toFixed(1)}px,${ringY.toFixed(1)}px) translate(-50%,-50%)`;

  requestAnimationFrame(animateCursor);
}

/* ── Toggle tap foto About Me (solo mobile) ── */
function setupAboutPhotoToggle() {
  if (window.innerWidth > 768) return;   /* solo mobile — desktop usa hover CSS */
  const wrap = document.querySelector('.about__photo-wrap');
  if (!wrap) return;
  wrap.addEventListener('click', () => {
    wrap.classList.toggle('is-color');
  });
}

/* ── Menú hamburguesa (mobile) ── */
function setupMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav  = document.getElementById('mobileNav');
  if (!hamburger || !mobileNav) return;

  const open  = () => {
    hamburger.classList.add('is-open');
    mobileNav.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileNav.setAttribute('aria-hidden',   'false');
  };
  const close = () => {
    hamburger.classList.remove('is-open');
    mobileNav.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden',   'true');
  };

  hamburger.addEventListener('click', () =>
    hamburger.classList.contains('is-open') ? close() : open()
  );

  /* Cerrar al hacer click en cualquier link — scroll suave sigue funcionando */
  mobileNav.querySelectorAll('.mobile-nav__link').forEach(link => {
    link.addEventListener('click', close);
  });

  /* Cerrar con Escape */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

/* ── Selector de idioma ── */
function setupLangSwitcher() {
  const btnES = document.getElementById('btnES');
  const btnEN = document.getElementById('btnEN');
  if (!btnES || !btnEN) return;
  /* Restaurar estado visual del botón activo */
  if (currentLang === 'en') {
    btnEN.classList.add('is-active');
    btnES.classList.remove('is-active');
  } else {
    btnES.classList.add('is-active');
    btnEN.classList.remove('is-active');
  }
  btnES.addEventListener('click', () => switchLang('es', btnES, btnEN));
  btnEN.addEventListener('click', () => switchLang('en', btnEN, btnES));
}

function switchLang(lang, active, inactive) {
  applyTranslations(lang);
  active.classList.add('is-active');
  inactive.classList.remove('is-active');
  const fb = document.getElementById('formFeedback');
  if (fb) fb.textContent = '';
  /* Re-dividir los títulos: applyTranslations reemplazó el textContent */
  if (typeof reinitScramble === 'function') reinitScramble();
}

/* ── Scroll suave a anclas internas ── */
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ── Resize ── */
function onResize() {
  if (typeof resizeParticles === 'function') resizeParticles();

  const isMobile = window.innerWidth <= 768;
  document.body.style.cursor = isMobile ? 'auto' : 'none';
  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  if (dot)  dot.style.display  = isMobile ? 'none' : 'block';
  if (ring) ring.style.display = isMobile ? 'none' : 'block';
}

function debounce(fn, ms) {
  let id;
  return (...args) => { clearTimeout(id); id = setTimeout(() => fn(...args), ms); };
}

/* ═══════════════════════════════════════════════
   SLIDER DE PROYECTOS (desktop ≥ 1101px)

   Layout: una card grande centrada + dos laterales
   que asoman ~19 % del contenedor a cada lado.
   Auto-avance cada 5 s, pausado al hacer hover.
   Navegación: flechas, dots, drag/swipe.
   En mobile/tablet la función sale de inmediato y
   el grid normal permanece intacto.
   ═══════════════════════════════════════════════ */
function initProjSlider() {
  if (window.innerWidth <= 1100) return;

  const slider = document.getElementById('projSlider');
  const dotsEl = document.getElementById('projDots');
  if (!slider || !dotsEl) return;

  const cards = Array.from(slider.querySelectorAll('.project-card'));
  if (!cards.length) return;

  const total = cards.length;
  let current  = 0;
  let autoTimer = null;
  let isDragging = false;
  let dragStartX = 0;
  let dragMoved  = false;

  /* ── Limpiar clases reveal para evitar conflictos con IntersectionObserver ── */
  cards.forEach(c => {
    c.classList.remove('reveal', 'reveal-delay-1', 'reveal-delay-2', 'is-visible');
    c.style.opacity   = '';
    c.style.transform = '';
  });

  /* ── Crear dots ────────────────────────────────────────── */
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'proj-slider__dot';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Proyecto ${i + 1}`);
    dot.addEventListener('click', () => { goTo(i); resetAuto(); });
    dotsEl.appendChild(dot);
  });

  /* ── Calcular clase de cada card según índice activo ────── */
  function stateOf(i) {
    const diff = ((i - current) % total + total) % total;
    if (diff === 0)         return 'ps-active';
    if (diff === 1)         return 'ps-next';
    if (diff === total - 1) return 'ps-prev';
    if (diff === 2)         return 'ps-far-next';
    return 'ps-far-prev';
  }

  /* ── Aplicar estado a todas las cards y dots ────────────── */
  function updateCards() {
    cards.forEach((card, i) => {
      card.classList.remove('ps-active', 'ps-prev', 'ps-next', 'ps-far-prev', 'ps-far-next');
      card.classList.add(stateOf(i));
    });
    dotsEl.querySelectorAll('.proj-slider__dot').forEach((dot, i) => {
      dot.classList.toggle('is-active', i === current);
      dot.setAttribute('aria-selected', i === current ? 'true' : 'false');
    });
  }

  /* ── Navegación ─────────────────────────────────────────── */
  function goTo(index) {
    current = ((index % total) + total) % total;
    updateCards();
  }
  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  /* ── Click en cards laterales: avanza el slider sin navegar ─ */
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (dragMoved) { e.preventDefault(); return; }
      if (card.classList.contains('ps-prev')) {
        e.preventDefault(); prev(); resetAuto(); return;
      }
      if (card.classList.contains('ps-next')) {
        e.preventDefault(); next(); resetAuto(); return;
      }
      /* ps-active → navegación normal al proyecto */
    });
  });

  /* ── Auto-avance ─────────────────────────────────────────── */
  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(next, 5000);
  }
  function stopAuto()  { clearInterval(autoTimer); }
  function resetAuto() { stopAuto(); startAuto(); }

  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);

  /* ── Flechas ────────────────────────────────────────────── */
  document.getElementById('projPrev')
    ?.addEventListener('click', () => { prev(); resetAuto(); });
  document.getElementById('projNext')
    ?.addEventListener('click', () => { next(); resetAuto(); });

  /* ── Drag (mouse) ───────────────────────────────────────── */
  slider.addEventListener('mousedown', (e) => {
    dragStartX = e.clientX;
    dragMoved  = false;
    slider.classList.add('is-dragging');
  });
  document.addEventListener('mouseup', (e) => {
    if (!slider.classList.contains('is-dragging')) return;
    slider.classList.remove('is-dragging');
    const delta = e.clientX - dragStartX;
    if (Math.abs(delta) > 48) {
      dragMoved = true;
      delta < 0 ? next() : prev();
      resetAuto();
      /* Limpiar flag después del ciclo de eventos para no bloquear el click */
      setTimeout(() => { dragMoved = false; }, 80);
    }
  });

  /* ── Swipe (touch) ──────────────────────────────────────── */
  let touchStartX = 0;
  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  slider.addEventListener('touchend', (e) => {
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 48) {
      delta < 0 ? next() : prev();
      resetAuto();
    }
  });

  /* ── Teclado (accesibilidad) ────────────────────────────── */
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  { prev(); resetAuto(); }
    if (e.key === 'ArrowRight') { next(); resetAuto(); }
  });

  /* ── Arranque ───────────────────────────────────────────── */
  updateCards();
  startAuto();
}

/* ═══════════════════════════════════════════════
   LISTEN SEQUENCE
   Avanza automáticamente por fotos (4 s c/u) y
   videos (hasta el final). Loop infinito.
   ═══════════════════════════════════════════════ */
function initListenSequence() {
  const items = Array.from(document.querySelectorAll('.listen-seq__item'));
  if (!items.length) return;

  let current = 0;
  let photoTimer = null;

  /* Mostrar solo el primer ítem, ocultar el resto */
  items.forEach((item, i) => {
    item.classList.toggle('is-active', i === 0);
  });

  function advance() {
    clearTimeout(photoTimer);

    /* Ocultar ítem actual y detener video si lo hay */
    const prev = items[current];
    prev.classList.remove('is-active');
    const prevVid = prev.querySelector('video');
    if (prevVid) { prevVid.pause(); prevVid.currentTime = 0; }

    /* Avanzar al siguiente (loop) */
    current = (current + 1) % items.length;
    const item = items[current];
    item.classList.add('is-active');

    const vid = item.querySelector('video');
    if (vid) {
      /* ── Ítem de video ── */
      const src = vid.querySelector('source')?.getAttribute('src') || '';
      if (!src.trim()) {
        /* Sin archivo: saltar como foto de 4 s */
        photoTimer = setTimeout(advance, 4000);
        return;
      }
      vid.currentTime = 0;
      vid.play().catch(() => { photoTimer = setTimeout(advance, 4000); });
      vid.addEventListener('ended', advance, { once: true });
    } else {
      /* ── Ítem de foto ── */
      photoTimer = setTimeout(advance, parseInt(item.dataset.duration, 10) || 4000);
    }
  }

  /* Arrancar: el primer ítem ya es visible, lanzar timer para avanzar */
  photoTimer = setTimeout(advance, parseInt(items[0].dataset.duration, 10) || 4000);
}
