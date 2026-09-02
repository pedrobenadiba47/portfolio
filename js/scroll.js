/* ============================================================
   scroll.js — Estado de partículas + fase de color de fondo.

   Fase de color (0 → 1 → 2):
     0   negro    — hero, about, projects
     0→1 negro→amarillo — sección listen
     1   amarillo — sección process
     1→2 amarillo→blanco — sección design
     2   blanco   — sección contact

   Estado de partículas (0 → 2):
     0: caos  |  1: ondas  |  2: espiral
   ============================================================ */

const SECTION_STATES = [
  0.0,   /* 0: hero */
  0.2,   /* 1: about */
  0.5,   /* 2: projects */
  0.8,   /* 3: listen */
  1.0,   /* 4: process */
  1.7,   /* 5: design */
  2.0,   /* 6: contact */
];

/* Paletas por fase: dark → yellow → white (contact) */
const PHASE_SCHEMES = [
  { bg: [8,8,8],       text: [232,232,232], accent: [212,225,116], muted: [115,115,115] },
  { bg: [212,225,116], text: [20,20,20],    accent: [20,20,20],   muted: [80,60,20]   },
  { bg: [255,255,255], text: [17,17,17],    accent: [17,17,17],   muted: [100,100,100] },
];

let _lastScrollY = 0;

function initScroll() {
  document.querySelectorAll('.section__title, .section__title--xl, .section__body, .hero__name, .hero__tagline, .card, .tag, .about__photo-wrap, .contact__phrase, .contact__form, .contact__links')
    .forEach(el => el.classList.add('reveal'));

  _lastScrollY = window.scrollY;
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  initRevealObserver();
}

function onScroll() {
  const viewH    = window.innerHeight;
  const sections = document.querySelectorAll('[data-section]');
  const curScrollY = window.scrollY;
  const scrollDelta = curScrollY - _lastScrollY;
  _lastScrollY = curScrollY;

  let activeSectionIdx = 0;
  sections.forEach(sec => {
    const rect      = sec.getBoundingClientRect();
    const secCenter = rect.top + rect.height * 0.5;
    if (secCenter <= viewH * 0.5 + viewH * 0.5) {
      activeSectionIdx = parseInt(sec.getAttribute('data-section'), 10);
    }
  });

  /* ── Fase de color ── */
  const phase = computeScrollPhase(viewH);
  applyColorPhase(phase, viewH);
  if (typeof setParticlePhase === 'function') setParticlePhase(phase);

  /* ── Scroll velocity para galaxia ── */
  if (typeof setParticleScrollVelocity === 'function') setParticleScrollVelocity(scrollDelta);

  /* ── Estado de partículas ── */
  const targetState = getParticleStateFromScroll(sections, activeSectionIdx, viewH);
  if (typeof setParticleState === 'function') setParticleState(targetState);
}

/* ── Calcula la fase 0-2 según posición de las secciones ──
   Momento 1 (negro):   Hero → About → Projects
   Momento 2 (amarillo): Listen → Process → Design  ← design permanece amarillo
   Momento 3 (blanco):  Contact                      ← cambio recién aquí
   ── */
function computeScrollPhase(viewH) {
  const listen  = document.getElementById('listen');
  const contact = document.getElementById('contact');
  if (!listen || !contact) return 0;

  const listenTop  = listen.getBoundingClientRect().top;
  const contactTop = contact.getBoundingClientRect().top;

  /* phase 0→1: negro→amarillo al entrar Listen */
  const phase01 = sSmoothStep(1 - Math.max(0, Math.min(1, listenTop / viewH)));

  /* phase 1→2: amarillo→negro al entrar Contact (no al entrar Design) */
  const phase12 = sSmoothStep(1 - Math.max(0, Math.min(1, contactTop / viewH)));

  return Math.min(2, phase01 + phase12);
}

/* ── Aplica las variables CSS según la fase ── */
function applyColorPhase(phase, viewH) {
  const clamped = Math.max(0, Math.min(2, phase));
  const idx     = Math.min(1, Math.floor(clamped));
  const t       = sSmoothStep(clamped - idx);

  const A = PHASE_SCHEMES[idx];
  const B = PHASE_SCHEMES[idx + 1];

  const lc  = (a, b) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
  const rgb  = c => `rgb(${c[0]},${c[1]},${c[2]})`;
  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

  const bg     = lc(A.bg,     B.bg);
  const text   = lc(A.text,   B.text);
  const accent = lc(A.accent, B.accent);
  const muted  = lc(A.muted,  B.muted);

  /* Canvas opacity: fade out as contact section comes into view */
  let canvasOpacity = 1;
  const contact = document.getElementById('contact');
  if (contact && viewH) {
    const contactTop = contact.getBoundingClientRect().top;
    const fadeProgress = sSmoothStep(1 - Math.max(0, Math.min(1, contactTop / viewH)));
    canvasOpacity = 1 - fadeProgress;
  }

  const root = document.documentElement;
  root.style.setProperty('--bg',             rgb(bg));
  root.style.setProperty('--text',           rgb(text));
  root.style.setProperty('--accent',         rgb(accent));
  root.style.setProperty('--muted',          rgb(muted));
  root.style.setProperty('--text-dim',       rgba(text, 0.90));
  root.style.setProperty('--border',         rgba(text, 0.18));
  root.style.setProperty('--accent-dim',     rgba(accent, 0.25));
  root.style.setProperty('--nav-bg',         rgba(bg, 0.92));
  root.style.setProperty('--bg-overlay',     rgba(bg, 0.18));
  root.style.setProperty('--cursor-color',        rgb(accent));
  root.style.setProperty('--canvas-opacity',      canvasOpacity.toFixed(3));

  /* Logo personaje: verde en fase 0 (fondo oscuro), B/N desde fase 1 en adelante.
     Se cruza de forma continua junto con el resto de la paleta. */
  root.style.setProperty('--logo-green', (1 - Math.min(1, clamped)).toFixed(3));

  /* Side-nav chips — usan --text como base para adaptar a cada fase */
  root.style.setProperty('--chip-text',         rgb(text));
  root.style.setProperty('--chip-bg',           rgba(text, 0.13));
  root.style.setProperty('--chip-border',       rgba(text, 0.22));
  root.style.setProperty('--chip-bg-hover',     rgba(text, 0.26));
  root.style.setProperty('--chip-border-hover', rgba(text, 0.42));
}

/* ── Estado de partículas interpolado entre secciones ── */
function getParticleStateFromScroll(sections, activeIdx, viewH) {
  if (activeIdx >= sections.length - 1) return SECTION_STATES[SECTION_STATES.length - 1];

  const current = sections[activeIdx];
  const next    = sections[activeIdx + 1];
  if (!current || !next) return SECTION_STATES[activeIdx] || 0;

  const currentTop = current.getBoundingClientRect().top;
  const nextTop    = next.getBoundingClientRect().top;

  const totalDist = nextTop - currentTop;
  const traveled  = viewH * 0.5 - currentTop;
  const progress  = totalDist > 0 ? Math.max(0, Math.min(1, traveled / totalDist)) : 0;

  const stateA = SECTION_STATES[activeIdx]     || 0;
  const stateB = SECTION_STATES[activeIdx + 1] || stateA;

  return stateA + (stateB - stateA) * sSmoothStep(progress);
}

function sSmoothStep(x) {
  x = Math.max(0, Math.min(1, x));
  return x * x * (3 - 2 * x);
}

/* ── IntersectionObserver para animaciones de entrada ── */
function initRevealObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('is-visible'), idx * 60);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
