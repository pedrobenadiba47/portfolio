/* ============================================================
   scramble.js — Efecto scramble de texto al acercar el cursor
   Requiere: GSAP 3.12+ con SplitText y ScrambleTextPlugin (CDN)

   Lógica:
   - SplitText divide cada título en spans por carácter
   - En cada frame de mousemove se calcula la distancia cursor↔carácter
   - Si dist < RADIUS → gsap.to con ScrambleText hacia el char original
   - overwrite:'auto' evita acumulación de tweens sobre el mismo char
   ============================================================ */

(function () {

  /* ── Parámetros ── */
  const RADIUS   = 100;   // px — radio de activación
  const CHARS    = '.:';  // caracteres usados en el scramble
  const DURATION = 1.2;   // segundos de animación por char
  const SPEED    = 0.5;   // 0→1 — qué tan rápido se estabilizan los chars

  /* ── Selectores de los títulos objetivo ── */
  const SELECTORS = [
    '.hero__name',
    '#about   .section__title--xl',
    '#listen  .section__title--xl',
    '#process .section__title--xl',
    '#design  .section__title--xl',
  ];

  /* Estado interno */
  const splitMap  = new Map(); // element → SplitText instance
  let   mouseX    = -9999;
  let   mouseY    = -9999;
  let   rafPending = false;

  /* ─────────────────────────────────────────────────────────
     splitAll — (re)divide todos los títulos en chars
     Se llama al init y al cambiar idioma o al resize
     ───────────────────────────────────────────────────────── */
  function splitAll() {
    SELECTORS.forEach(sel => {
      const el = document.querySelector(sel);
      if (!el) return;

      /* Revertir split anterior para no duplicar spans */
      if (splitMap.has(el)) {
        try { splitMap.get(el).revert(); } catch (_) { /* ignore */ }
      }

      const split = new SplitText(el, {
        type: 'chars',
        charsClass: 'scramble__char',
        /* Preservar el estilo del padre — SplitText lo hereda automáticamente */
      });

      /* Guardar texto original en cada char; saltar espacios */
      split.chars.forEach(ch => {
        if (ch.textContent.trim() !== '') {
          ch.dataset.orig = ch.textContent;
        }
      });

      splitMap.set(el, split);
    });
  }

  /* ─────────────────────────────────────────────────────────
     onFrame — se ejecuta una vez por mousemove vía rAF
     ───────────────────────────────────────────────────────── */
  function onFrame() {
    rafPending = false;

    splitMap.forEach(split => {
      split.chars.forEach(ch => {
        /* Omitir espacios (no tienen dataset.orig) */
        if (!ch.dataset.orig) return;

        const r  = ch.getBoundingClientRect();
        const cx = r.left + r.width  * 0.5;
        const cy = r.top  + r.height * 0.5;
        const d  = Math.hypot(mouseX - cx, mouseY - cy);

        if (d < RADIUS) {
          gsap.to(ch, {
            duration: DURATION,
            scrambleText: {
              text:  ch.dataset.orig, /* destino: el carácter original */
              chars: CHARS,
              speed: SPEED,
            },
            overwrite: 'auto',        /* cancela tweens previos en este char */
          });
        }
      });
    });
  }

  /* ─────────────────────────────────────────────────────────
     Debounce local — no depende de app.js
     ───────────────────────────────────────────────────────── */
  function _debounce(fn, ms) {
    let t;
    return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
  }

  /* ─────────────────────────────────────────────────────────
     API pública
     ───────────────────────────────────────────────────────── */

  /**
   * initScramble() — llamar desde app.js DOMContentLoaded,
   * DESPUÉS de applyTranslations() para que el texto ya esté en el idioma correcto.
   */
  window.initScramble = function () {

    /* Verificar que GSAP y los plugins estén cargados */
    if (typeof gsap === 'undefined' ||
        typeof SplitText === 'undefined' ||
        typeof ScrambleTextPlugin === 'undefined') {
      console.warn('scramble.js: GSAP o sus plugins no están disponibles. ' +
                   'Verificar los CDN scripts en index.html.');
      return;
    }

    /* El efecto solo aplica en desktop (mouse) */
    if (window.innerWidth <= 768) return;

    gsap.registerPlugin(SplitText, ScrambleTextPlugin);

    splitAll();

    /* Mousemove con throttle vía rAF */
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!rafPending) {
        rafPending = true;
        requestAnimationFrame(onFrame);
      }
    });

    /* Resize → re-split (las posiciones de los chars cambian) */
    window.addEventListener('resize', _debounce(() => {
      if (window.innerWidth > 768) splitAll();
    }, 300));
  };

  /**
   * reinitScramble() — llamar desde switchLang() en app.js
   * para re-dividir los títulos después de que el texto cambió.
   */
  window.reinitScramble = function () {
    if (splitMap.size > 0) splitAll();
  };

})();
