/* ============================================================
   preloader.js — Pantalla de carga con el personaje.

   El personaje arranca muy desenfocado y se va revelando
   mientras la barra sube de 0 a 100 (~7.5 s). Al llegar a 100
   queda nítido un instante y la capa se desvanece.

   Se muestra una sola vez por sesión: al recargar o volver
   desde otra página no vuelve a aparecer. Se puede saltar
   con un click o cualquier tecla.
   ============================================================ */

const PRELOADER_DURACION = 7500;  /* ms que tarda en llegar a 100 */
const PRELOADER_NITIDO   = 550;   /* ms de imagen nitida antes de la firma */
const PRELOADER_FIRMA    = 1050;  /* ms que queda la firma antes de entrar */

function initPreloader() {
  const el   = document.getElementById('preloader');
  if (!el) return;

  const fill = document.getElementById('preloaderFill');
  const pct  = document.getElementById('preloaderPct');
  const bicho = document.getElementById('preloaderBicho');
  const firma = document.getElementById('preloaderFirma');

  /* Ya se vio en esta sesión → saltar sin animar */
  let yaVisto = false;
  try { yaVisto = sessionStorage.getItem('preloaderVisto') === '1'; } catch (e) {}

  if (yaVisto) {
    el.classList.add('is-hidden');
    return;
  }

  document.body.classList.add('is-loading');

  let terminado = false;
  let inicio    = null;

  function cerrar() {
    if (terminado) return;
    terminado = true;
    try { sessionStorage.setItem('preloaderVisto', '1'); } catch (e) {}

    el.classList.add('is-done');
    document.body.classList.remove('is-loading');
    /* Sacarlo del DOM visual una vez terminada la transición */
    setTimeout(() => el.classList.add('is-hidden'), 800);
  }

  /* Saltar con click o tecla */
  function saltar() {
    if (terminado) return;
    aplicar(1);
    if (firma) firma.classList.add('is-caida');
    cerrar();
  }
  el.addEventListener('click', saltar);
  document.addEventListener('keydown', saltar, { once: true });

  function aplicar(p) {
    el.style.setProperty('--p', p.toFixed(4));
    if (fill) fill.style.width = (p * 100).toFixed(1) + '%';
    if (pct)  pct.textContent  = Math.round(p * 100);
  }

  /* Easing: arranca decidido y desacelera cerca del final,
     así el enfoque final se aprecia mejor. */
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function tick(ahora) {
    if (terminado) return;
    if (inicio === null) inicio = ahora;

    const t = Math.min(1, (ahora - inicio) / PRELOADER_DURACION);
    aplicar(easeOutCubic(t));

    if (t < 1) {
      requestAnimationFrame(tick);
    } else {
      /* 100%: un instante nitido, cae la firma, y recien ahi entra al sitio */
      setTimeout(() => {
        if (terminado) return;
        if (firma) firma.classList.add('is-caida');
        setTimeout(cerrar, PRELOADER_FIRMA);
      }, PRELOADER_NITIDO);
    }
  }

  aplicar(0);

  /* Red de seguridad: si requestAnimationFrame no corre (pestana abierta
     en segundo plano, por ejemplo), nadie debe quedar atrapado aca.
     Este timer cierra igual pasado el tiempo total con margen. */
  setTimeout(() => {
    if (!terminado) { aplicar(1); cerrar(); }
  }, PRELOADER_DURACION + PRELOADER_NITIDO + PRELOADER_FIRMA + 4000);

  /* Arrancar recién cuando el dibujo esté cargado, para que no
     se vea el salto de una imagen apareciendo a mitad de camino. */
  let arrancado = false;
  function arrancar() {
    if (arrancado) return;   /* el load y el timeout compiten: solo gana el primero */
    arrancado = true;
    requestAnimationFrame(tick);
  }

  if (bicho && !bicho.complete) {
    bicho.addEventListener('load',  arrancar, { once: true });
    bicho.addEventListener('error', arrancar, { once: true });
    /* Red muy lenta: no dejar la pantalla trabada esperando */
    setTimeout(arrancar, 2500);
  } else {
    arrancar();
  }
}
