/* ============================================================
   linewaves.js — Líneas onduladas animadas para la sección Contacto
   Canvas 2D nativo. No toca el canvas de Three.js ni las partículas.

   Parámetros basados en los valores de referencia del usuario:
     speed 0.3 · innerLineCount 19 · outerLineCount 28
     warpIntensity 2.1 · rotation -26° · edgeFadeWidth 0.05

   El canvas ocupa el 100 % de la sección, position absolute z-index 0.
   El contenido (.section__inner z-index 1) va encima.
   Se activa con IntersectionObserver y se pausa al salir.
   ============================================================ */

(function () {

  /* ── Parámetros del efecto ── */
  const CFG = {
    speed:         0.3,
    innerCount:    19,
    outerCount:    28,
    warpIntensity: 2.1,
    rotation:      -26 * Math.PI / 180,
    edgeFade:      0.05,
    mouseRadius:   220,     /* px — radio de influencia del cursor */
    innerAmp:      22,      /* px de amplitud máxima, grupo interior */
    outerAmp:      14,      /* px de amplitud máxima, grupo exterior */
    innerFreq:     0.0085,  /* frecuencia espacial interior */
    outerFreq:     0.0055,  /* frecuencia espacial exterior */
    lineWidth:     1.0,
    lineR: 0, lineG: 0, lineB: 0, /* color base — opacidad controlada por línea */
  };

  /* ── Estado interno ── */
  let canvas, ctx;
  let W = 0, H = 0;
  let mouseX = -99999, mouseY = -99999;   /* en coords del canvas */
  let time   = 0;
  let rafId  = null;
  let active = false;

  /* ─────────────────────────────────────────────────────────
     Smoothstep — para fades suaves
  ───────────────────────────────────────────────────────── */
  function ss(e0, e1, x) {
    const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
    return t * t * (3 - 2 * t);
  }

  /* ─────────────────────────────────────────────────────────
     Inicialización — crea el canvas dentro de #contact
  ───────────────────────────────────────────────────────── */
  function setup() {
    const section = document.getElementById('contact');
    if (!section) return;

    canvas = document.createElement('canvas');
    canvas.id = 'linewavesCanvas';
    canvas.style.cssText =
      'position:absolute;top:0;left:0;width:100%;height:100%;' +
      'pointer-events:none;z-index:0;';
    section.insertBefore(canvas, section.firstChild);
    ctx = canvas.getContext('2d');

    resize();

    /* Posición del mouse relativa al canvas */
    window.addEventListener('mousemove', onMouseMove);

    /* Resize con debounce local */
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 200);
    });

    /* Activar / pausar según visibilidad de la sección */
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => (e.isIntersecting ? startAnim : stopAnim)()),
      { threshold: 0.05 }
    );
    obs.observe(section);
  }

  function onMouseMove(e) {
    if (!canvas) return;
    const r = canvas.getBoundingClientRect();
    mouseX = e.clientX - r.left;
    mouseY = e.clientY - r.top;
  }

  function resize() {
    if (!canvas) return;
    const r = canvas.parentElement.getBoundingClientRect();
    W = canvas.width  = Math.round(r.width)  || window.innerWidth;
    H = canvas.height = Math.round(r.height) || window.innerHeight;
  }

  /* ─────────────────────────────────────────────────────────
     Dibujo de una ola individual
     Parámetros en espacio rotado (ctx ya tiene rotate aplicado)
  ───────────────────────────────────────────────────────── */
  function drawWave(lineY, amp, freq, phase, opacity, halfX, mxR, myR) {
    const { lineR: r, lineG: g, lineB: b } = CFG;
    const step = 3; /* px entre puntos del path */

    ctx.beginPath();
    let moved = false;

    for (let xi = -halfX; xi <= halfX; xi += step) {
      /* Fade en los bordes horizontales del canvas (espacio rotado) */
      const xNorm = (xi + halfX) / (halfX * 2);
      const xFade = Math.min(
        ss(0,              CFG.edgeFade,      xNorm),
        ss(1,  1 - CFG.edgeFade,             xNorm)
      );
      if (xFade < 0.001) { moved = false; continue; }

      /* Deformación por el mouse — gaussiana en espacio rotado */
      const dX   = xi - mxR;
      const dY   = lineY - myR;
      const warp = Math.exp(-(dX * dX + dY * dY) /
                            (CFG.mouseRadius * CFG.mouseRadius))
                   * CFG.warpIntensity * 16;

      const yy = lineY +
        (Math.sin(xi * freq + phase + time) * amp + warp) * xFade;

      if (!moved) { ctx.moveTo(xi, yy); moved = true; }
      else          ctx.lineTo(xi, yy);
    }

    ctx.strokeStyle = `rgba(${r},${g},${b},${opacity.toFixed(3)})`;
    ctx.stroke();
  }

  /* ─────────────────────────────────────────────────────────
     Frame principal
  ───────────────────────────────────────────────────────── */
  function draw() {
    if (!active) return;

    /* Avance de fase: speed × factor → ~0.005–0.015 por frame */
    time += CFG.speed * 0.016;

    ctx.clearRect(0, 0, W, H);

    /* Transformar posición del mouse al espacio rotado */
    const cosR = Math.cos(-CFG.rotation);
    const sinR = Math.sin(-CFG.rotation);
    const mxC  = mouseX - W * 0.5;
    const myC  = mouseY - H * 0.5;
    const mxR  = mxC * cosR - myC * sinR;
    const myR  = mxC * sinR + myC * cosR;

    /* Extensión horizontal que cubre las esquinas tras la rotación */
    const diag  = Math.ceil(Math.sqrt(W * W + H * H));
    const halfX = diag * 0.62;

    ctx.save();
    ctx.translate(W * 0.5, H * 0.5);
    ctx.rotate(CFG.rotation);
    ctx.lineWidth = CFG.lineWidth;

    /* ── Grupo INTERIOR — 19 líneas, mayor amplitud, zona central ── */
    const innerSpan = diag * 0.68;

    for (let i = 0; i < CFG.innerCount; i++) {
      const t     = CFG.innerCount > 1 ? i / (CFG.innerCount - 1) : 0.5;
      const lineY = (t - 0.5) * innerSpan;
      const phase = i * 0.523;

      /* Opacidad máxima en centro, decrece hacia los extremos del grupo */
      const edgeFactor = 1 - Math.abs(t - 0.5) * 2;  /* 1=centro, 0=borde */
      const opacity = 0.08 + 0.20 * ss(0, 1, edgeFactor);

      drawWave(lineY, CFG.innerAmp, CFG.innerFreq, phase, opacity, halfX, mxR, myR);
    }

    /* ── Grupo EXTERIOR — 28 líneas, menor amplitud, zona extendida ── */
    const outerSpan = diag * 1.08;

    for (let i = 0; i < CFG.outerCount; i++) {
      const t     = CFG.outerCount > 1 ? i / (CFG.outerCount - 1) : 0.5;
      const lineY = (t - 0.5) * outerSpan;
      const phase = i * 0.314 + 1.8;

      /* Outer: mayor opacidad hacia los extremos (complementa al interior) */
      const distToCenter = Math.abs(t - 0.5) * 2;  /* 0=centro, 1=extremo */
      const opacity = 0.03 + 0.07 * ss(0.2, 0.85, distToCenter);

      if (opacity < 0.015) continue;

      drawWave(lineY, CFG.outerAmp, CFG.outerFreq, phase, opacity, halfX, mxR, myR);
    }

    ctx.restore();

    rafId = requestAnimationFrame(draw);
  }

  /* ─────────────────────────────────────────────────────────
     Control de animación
  ───────────────────────────────────────────────────────── */
  function startAnim() {
    if (active) return;
    active = true;
    draw();
  }

  function stopAnim() {
    active = false;
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  }

  /* ─────────────────────────────────────────────────────────
     API pública — llamar desde app.js
  ───────────────────────────────────────────────────────── */
  window.initLineWaves = function () {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setup);
    } else {
      setup();
    }
  };

})();
