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
