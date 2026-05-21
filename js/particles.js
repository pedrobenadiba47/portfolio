/* ============================================================
   particles.js — Canvas de fondo completo (100vw × 100vh).
   Partículas circulares con efecto granulado.
   Dos grupos: caos permanente (45%) + formación evolutiva (55%).
   Sin grises: blanco/amarillo en fondo oscuro, negro en amarillo.
   ============================================================ */

/* ── Simplex Noise 2D ── */
const SN = (() => {
  const _s = [
    151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,
    140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,
    247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,
    57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,
    74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,
    60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,
    65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,
    200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,
    52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,
    207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,
    119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,
    129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,
    218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,
    81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,
    184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,
    222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180
  ];
  const p = new Uint8Array(512);
  for (let i = 0; i < 512; i++) p[i] = _s[i & 255];
  const G  = [[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]];
  const G2 = (3 - Math.sqrt(3)) / 6;
  function noise(xin, yin) {
    const s  = xin + yin, si = Math.floor(xin + s), sj = Math.floor(yin + s);
    const t  = (si + sj) * G2, x0 = xin-(si-t), y0 = yin-(sj-t);
    const i1 = x0 > y0 ? 1 : 0, j1 = 1 - i1;
    const x1 = x0-i1+G2, y1 = y0-j1+G2, x2 = x0-1+2*G2, y2 = y0-1+2*G2;
    const ii = si&255, jj = sj&255;
    const g0=p[ii+p[jj]]&7, g1=p[ii+i1+p[jj+j1]]&7, g2=p[ii+1+p[jj+1]]&7;
    let n0=0,n1=0,n2=0,t0,t1,t2;
    t0=0.5-x0*x0-y0*y0; if(t0>=0){t0*=t0; n0=t0*t0*(G[g0][0]*x0+G[g0][1]*y0);}
    t1=0.5-x1*x1-y1*y1; if(t1>=0){t1*=t1; n1=t1*t1*(G[g1][0]*x1+G[g1][1]*y1);}
    t2=0.5-x2*x2-y2*y2; if(t2>=0){t2*=t2; n2=t2*t2*(G[g2][0]*x2+G[g2][1]*y2);}
    return 70*(n0+n1+n2);
  }
  return { noise };
})();

/* ── Globals ── */
let pScene, pCamera, pRenderer, pFadeMesh, pFadeMat;
let pGeoFine, pGeoMid, pGeoCoarse;
let pParticlesFine, pParticlesMid, pParticlesCoarse;
let pPosAttr, pColAttr;

/* Film grain overlay */
let pGrainCanvas, pGrainCtx, pGrainBuf, pGrainFrame = 0;

let pPositions, pColors, pGroups, pInitIsYellow;
let pCount = 0, pFineCnt = 0, pMidCnt = 0, pCoarseCnt = 0;
let pIsMobile = false;
let pCanvasW = 0, pCanvasH = 0;
let pStateCurrent = 0, pStateTarget = 0;
let pPhase = 0, pPhaseTarget = 0;
let pMouseX = 0, pMouseY = 0, pMouseActive = false;
let pTouchX = 0, pTouchY = 0, pTouchActive = false;
let pScrollVelocity = 0;
/* Densidad dinámica: 1.0 al inicio/final, se reduce en el medio */
let pDensityFactor = 1.0;

/* 45% always chaotic, 55% form evolving patterns */
const CHAOS_RATIO = 0.45;
const FINE_RATIO  = 0.55;
const MID_RATIO   = 0.30;

/* ── Particle texture — sharp (blurRadius=0) or soft-blurred (blurRadius>0) ── */
function createParticleTexture(blurRadius = 0) {
  const size = 64;
  const cv   = document.createElement('canvas');
  cv.width   = cv.height = size;
  const ctx  = cv.getContext('2d');
  const half = size / 2;

  if (blurRadius > 0) {
    /* Draw disc on temp canvas, then copy with blur → soft/out-of-focus disc */
    const tmp = document.createElement('canvas');
    tmp.width = tmp.height = size;
    const tc = tmp.getContext('2d');
    const g = tc.createRadialGradient(half, half, 0, half, half, half);
    g.addColorStop(0.00, 'rgba(255,255,255,1.0)');
    g.addColorStop(0.40, 'rgba(255,255,255,0.85)');
    g.addColorStop(0.70, 'rgba(255,255,255,0.45)');
    g.addColorStop(1.00, 'rgba(255,255,255,0.00)');
    tc.fillStyle = g;
    tc.fillRect(0, 0, size, size);
    ctx.filter = `blur(${blurRadius}px)`;
    ctx.drawImage(tmp, 0, 0);
    ctx.filter = 'none';
  } else {
    /* Sharp disc with grainy core — fine layer */
    const grad = ctx.createRadialGradient(half, half, 0, half, half, half);
    grad.addColorStop(0.00, 'rgba(255,255,255,1.0)');
    grad.addColorStop(0.50, 'rgba(255,255,255,1.0)');
    grad.addColorStop(0.75, 'rgba(255,255,255,0.60)');
    grad.addColorStop(1.00, 'rgba(255,255,255,0.00)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    /* grain sutil en partículas nítidas */
    const img  = ctx.getImageData(0, 0, size, size);
    const data = img.data;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] > 12) {
        const n = (Math.random() - 0.5) * 30;
        data[i]   = Math.min(255, Math.max(0, data[i]   + n));
        data[i+1] = Math.min(255, Math.max(0, data[i+1] + n));
        data[i+2] = Math.min(255, Math.max(0, data[i+2] + n));
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  const tex = new THREE.Texture(cv);
  tex.needsUpdate = true;
  return tex;
}

/* ── Film grain overlay canvas ── */
function initGrainCanvas() {
  const GW = 320, GH = 180;
  pGrainCanvas = document.createElement('canvas');
  pGrainCanvas.width  = GW;
  pGrainCanvas.height = GH;
  Object.assign(pGrainCanvas.style, {
    position:      'fixed',
    top:           '0', right: '0', bottom: '0', left: '0',
    width:         '100%',
    height:        '100%',
    pointerEvents: 'none',
    zIndex:        '9999',
    opacity:       '0.045',
  });
  document.body.appendChild(pGrainCanvas);
  pGrainCtx = pGrainCanvas.getContext('2d');
  pGrainBuf = pGrainCtx.createImageData(GW, GH);
  /* pre-fill alpha channel fully opaque — never changes */
  const d = pGrainBuf.data;
  for (let i = 3; i < d.length; i += 4) d[i] = 255;
}



/* ── Init ── */
function initParticles() {
  const canvas = document.getElementById('particlesCanvas');
  pIsMobile = window.innerWidth <= 768;

  pCanvasW = window.innerWidth;
  pCanvasH = window.innerHeight;

  pCount     = pIsMobile ? 4000 : 22000;
  pFineCnt   = Math.round(pCount * FINE_RATIO);
  pMidCnt    = Math.round(pCount * MID_RATIO);
  pCoarseCnt = pCount - pFineCnt - pMidCnt;

  pScene  = new THREE.Scene();
  pCamera = new THREE.OrthographicCamera(
    -pCanvasW/2, pCanvasW/2, pCanvasH/2, -pCanvasH/2, 0.1, 100
  );
  pCamera.position.z = 10;

  /* alpha: true → canvas WebGL transparente; bgLayer (CSS) maneja el color de fondo */
  pRenderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, premultipliedAlpha: false });
  pRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  pRenderer.setSize(pCanvasW, pCanvasH);
  pRenderer.autoClear = false;
  pRenderer.setClearColor(0x000000, 0); /* limpiar a transparente */
  pRenderer.clear();

  /* Fade plane — reduce la alpha de los píxeles existentes → efecto de estela.
     Con canvas transparente usamos CustomBlending:
       result = dst * (1 - fadeOpacity)
     Los píxeles de partículas viejas se vuelven transparentes gradualmente
     y el bgLayer (CSS) se ve a través del canvas. */
  const fadeGeo = new THREE.PlaneGeometry(pCanvasW * 3, pCanvasH * 3);
  /* Estela: reduce SOLO la alpha de los píxeles existentes (no su color RGB).
     Partículas viejas mantienen brillo pero se vuelven transparentes gradualmente.
     blendDst=ONE mantiene el RGB; blendDstAlpha=ONE_MINUS_SRC_ALPHA reduce la alpha. */
  const fadeOpacity = pIsMobile ? 0.12 : 0.030;
  pFadeMat = new THREE.MeshBasicMaterial({
    color:        new THREE.Color(0, 0, 0),
    transparent:  true,
    opacity:      fadeOpacity,
    depthTest:    false,
    depthWrite:   false,
    blending:     THREE.CustomBlending,
    blendEquation:      THREE.AddEquation,
    blendSrc:           THREE.ZeroFactor,
    blendDst:           THREE.OneFactor,              /* RGB sin cambio */
    blendEquationAlpha: THREE.AddEquation,
    blendSrcAlpha:      THREE.ZeroFactor,
    blendDstAlpha:      THREE.OneMinusSrcAlphaFactor, /* alpha se reduce */
  });
  pFadeMesh = new THREE.Mesh(fadeGeo, pFadeMat);
  pFadeMesh.renderOrder = 0;
  pFadeMesh.position.z  = -1;
  pScene.add(pFadeMesh);

  /* Shared buffers */
  pPositions    = new Float32Array(pCount * 3);
  pColors       = new Float32Array(pCount * 3);
  pGroups       = new Uint8Array(pCount);
  pInitIsYellow = new Uint8Array(pCount);

  for (let i = 0; i < pCount; i++) {
    pPositions[i*3]   = (Math.random() - 0.5) * pCanvasW;
    pPositions[i*3+1] = (Math.random() - 0.5) * pCanvasH;
    pPositions[i*3+2] = 0;
    pGroups[i]        = Math.random() < CHAOS_RATIO ? 0 : 1;
    pInitIsYellow[i]  = Math.random() < 0.40 ? 1 : 0;
    setParticleColorAt(i, 0);
  }

  pPosAttr = new THREE.BufferAttribute(pPositions, 3);
  pPosAttr.setUsage(THREE.DynamicDrawUsage);
  pColAttr = new THREE.BufferAttribute(pColors, 3);
  pColAttr.setUsage(THREE.DynamicDrawUsage);

  /* Three geometries share the same attribute objects */
  pGeoFine = new THREE.BufferGeometry();
  pGeoFine.setAttribute('position', pPosAttr);
  pGeoFine.setAttribute('color',    pColAttr);
  pGeoFine.setDrawRange(0, pFineCnt);

  pGeoMid = new THREE.BufferGeometry();
  pGeoMid.setAttribute('position', pPosAttr);
  pGeoMid.setAttribute('color',    pColAttr);
  pGeoMid.setDrawRange(pFineCnt, pMidCnt);

  pGeoCoarse = new THREE.BufferGeometry();
  pGeoCoarse.setAttribute('position', pPosAttr);
  pGeoCoarse.setAttribute('color',    pColAttr);
  pGeoCoarse.setDrawRange(pFineCnt + pMidCnt, pCoarseCnt);

  /* Three textures: sharp (fine), soft-blur (mid), diffuse-blur (coarse) — depth of field */
  const pTexSharp = createParticleTexture(0);
  const pTexSoft  = createParticleTexture(2);
  const pTexBlur  = createParticleTexture(4);

  const mkMat = (size, tex) => new THREE.PointsMaterial({
    size,
    map:             tex,
    vertexColors:    true,
    transparent:     true,
    opacity:         1.0,
    sizeAttenuation: false,
    depthTest:       false,
    depthWrite:      false,
    blending:        THREE.NormalBlending,
    alphaTest:       0.01,
  });

  pParticlesFine   = new THREE.Points(pGeoFine,   mkMat(1.8, pTexSharp));
  pParticlesMid    = new THREE.Points(pGeoMid,    mkMat(4.5, pTexSoft));
  pParticlesCoarse = new THREE.Points(pGeoCoarse, mkMat(9.0, pTexBlur));

  pParticlesFine.renderOrder   = 1;
  pParticlesMid.renderOrder    = 2;
  pParticlesCoarse.renderOrder = 3;

  pScene.add(pParticlesFine);
  pScene.add(pParticlesMid);
  pScene.add(pParticlesCoarse);

  if (!pIsMobile) window.addEventListener('mousemove', onParticleMouseMove);

  /* Reactive touch on mobile — experimental, passive for performance */
  if (pIsMobile) {
    window.addEventListener('touchmove', onParticleTouchMove, { passive: true });
    window.addEventListener('touchend',  () => { pTouchActive = false; }, { passive: true });
  }

  initGrainCanvas();
  requestAnimationFrame(pAnimate);
}

/* ── Vertex color — blanco puro en fondo oscuro, negro en amarillo/blanco ── */
function setParticleColorAt(i, phase) {
  /* Momento 1 (fondo negro): todas las partículas blancas */
  const bR = 1.0, bG = 1.0, bB = 1.0;

  /* Fondo amarillo/blanco: negro puro */
  const dR = 0.0, dG = 0.0, dB = 0.0;

  let r, g, b;
  if (phase <= 1) {
    /* phase 0→1: oscuro→amarillo — partículas brillantes→oscuras */
    const t = pSS(phase);
    r = pLerp(bR, dR, t);
    g = pLerp(bG, dG, t);
    b = pLerp(bB, dB, t);
  } else {
    /* phase 1→2: amarillo→blanco — partículas permanecen oscuras (canvas se va de todas formas) */
    r = dR; g = dG; b = dB;
  }

  pColors[i*3]   = r;
  pColors[i*3+1] = g;
  pColors[i*3+2] = b;
}

function refreshParticleColors() {
  for (let i = 0; i < pCount; i++) setParticleColorAt(i, pPhase);
  pColAttr.needsUpdate = true;
}

/* ── Mouse (desktop only) ── */
function onParticleMouseMove(e) {
  pMouseActive = true;
  pMouseX =  e.clientX - pCanvasW * 0.5;
  pMouseY = -e.clientY + pCanvasH * 0.5;
}

/* ── Touch (mobile only — experimental) ── */
function onParticleTouchMove(e) {
  if (!e.touches || !e.touches[0]) return;
  pTouchActive = true;
  pTouchX =  e.touches[0].clientX - pCanvasW * 0.5;
  pTouchY = -e.touches[0].clientY + pCanvasH * 0.5;
}

/* ── Scroll velocity (galaxy upward drift on scroll) ── */
function setParticleScrollVelocity(delta) {
  pScrollVelocity += delta * 0.18;
  /* clamp to avoid extreme jumps */
  pScrollVelocity = Math.max(-80, Math.min(80, pScrollVelocity));
}

/* ═══════════════════════════════════════════════
   FLOW FIELD
   ═══════════════════════════════════════════════ */
function getFlowAngle(x, y, t, state) {
  const sc   = 0.0018;
  const nx   = x * sc, ny = y * sc;
  const dist = Math.sqrt(x*x + y*y);

  /* Chaos */
  const bn = SN.noise(nx*3.2 + t*0.55, ny*3.2 + t*0.38) * Math.PI * 3.8;

  const v1x = Math.cos(t * 0.22) * pCanvasW * 0.20;
  const v1y = Math.sin(t * 0.18) * pCanvasH * 0.20;
  const v1dx = x-v1x, v1dy = y-v1y;
  const v1d  = Math.sqrt(v1dx*v1dx + v1dy*v1dy) + 1;
  const v1s  = Math.max(0, 1 - v1d / (pCanvasW * 0.30));

  const v2x = Math.cos(t*0.15 + Math.PI) * pCanvasW * 0.18;
  const v2y = Math.sin(t*0.19 + 1.2)    * pCanvasH * 0.18;
  const v2dx = x-v2x, v2dy = y-v2y;
  const v2d  = Math.sqrt(v2dx*v2dx + v2dy*v2dy) + 1;
  const v2s  = Math.max(0, 1 - v2d / (pCanvasW * 0.26));

  const vAng1 = Math.atan2(v1dy, v1dx) + Math.PI * 0.5;
  const vAng2 = Math.atan2(v2dy, v2dx) - Math.PI * 0.5;
  const chaos = bn * (1 - v1s*0.55 - v2s*0.45)
              + vAng1 * v1s * 0.55
              + vAng2 * v2s * 0.45;

  /* Waves */
  const waves = Math.PI * 0.5
              + Math.sin(ny * 4.0 + t * 0.65) * 1.15
              + Math.sin(ny * 2.0 + t * 0.40) * 0.50
              + SN.noise(nx * 0.5 + t * 0.15, ny * 0.5) * 0.25;

  /* Spiral */
  const bA   = Math.atan2(y, x);
  const arm  = Math.sin(bA * 3 + dist * 0.008 + t * 0.35) * 0.4;
  const sprl = bA + Math.PI*0.5 + arm + dist*0.007
             + SN.noise(dist*0.003 + t*0.08, t*0.12) * 0.3;

  if (state <= 1) return pLA(chaos, waves, pSS(state));
  return pLA(waves, sprl, pSS(state - 1));
}

/* ── Math helpers ── */
function pLA(a, b, t) {
  let d = b - a;
  while (d >  Math.PI) d -= Math.PI*2;
  while (d < -Math.PI) d += Math.PI*2;
  return a + d*t;
}
function pSS(x)         { x = Math.max(0, Math.min(1, x)); return x*x*(3-2*x); }
function pLerp(a, b, t) { return a + (b-a)*t; }

/* ── Animation loop ── */
function pAnimate(ts) {
  requestAnimationFrame(pAnimate);
  const t = ts * 0.001;

  pStateCurrent += (pStateTarget - pStateCurrent) * 0.028;

  /* Formation oscillation: state pulses between current and +0.8 over ~15s */
  const oscAmp = Math.max(0, Math.sin(t * 0.42)) * 0.85;

  /* Scroll velocity decay */
  pScrollVelocity *= 0.88;

  const speed = pIsMobile ? 0.85 : 1.2 + pStateCurrent * 0.4;
  const hw    = pCanvasW * 0.5 + 20;
  const hh    = pCanvasH * 0.5 + 20;
  const pos   = pPositions;

  for (let i = 0; i < pCount; i++) {
    let px = pos[i*3], py = pos[i*3+1];

    /* Formation group gets oscillating state; chaos stays at 0 */
    const isFormation = pGroups[i] === 1;
    const st = isFormation
      ? Math.min(2, pStateCurrent + oscAmp)
      : 0;

    const angle = getFlowAngle(px, py, t, st);
    px += Math.cos(angle) * speed;
    py += Math.sin(angle) * speed;

    /* Upward drift from scroll — galaxy effect */
    py -= pScrollVelocity * 0.05;

    /* Mouse repulsion (desktop only) */
    if (!pIsMobile && pMouseActive) {
      const dx = px - pMouseX, dy = py - pMouseY;
      const d2 = dx*dx + dy*dy;
      if (d2 < 16900) {
        const d = Math.sqrt(d2) + 0.001;
        const f = (1 - d/130) * 7;
        px += (dx/d) * f;
        py += (dy/d) * f;
      }
    }

    /* Touch repulsion (mobile only — experimental, softer radius) */
    if (pIsMobile && pTouchActive) {
      const dx = px - pTouchX, dy = py - pTouchY;
      const d2 = dx*dx + dy*dy;
      if (d2 < 22500) {  /* radius 150px — slightly larger for fingers */
        const d = Math.sqrt(d2) + 0.001;
        const f = (1 - d/150) * 5;  /* softer force than mouse */
        px += (dx/d) * f;
        py += (dy/d) * f;
      }
    }

    /* Wrap */
    if (px >  hw) px = -hw; else if (px < -hw) px =  hw;
    if (py >  hh) py = -hh; else if (py < -hh) py =  hh;

    pos[i*3] = px; pos[i*3+1] = py;
  }

  pPosAttr.needsUpdate = true;

  /* Aplicar densidad dinámica: ajusta cuántas partículas se renderizan */
  const vFine   = Math.round(pFineCnt   * pDensityFactor);
  const vMid    = Math.round(pMidCnt    * pDensityFactor);
  const vCoarse = Math.round(pCoarseCnt * pDensityFactor);
  pGeoFine.setDrawRange(0, vFine);
  pGeoMid.setDrawRange(pFineCnt, vMid);
  pGeoCoarse.setDrawRange(pFineCnt + pMidCnt, vCoarse);

  pRenderer.render(pScene, pCamera);
  drawGrain();
}

/* ── Public API ── */
function setParticleState(stateFloat) {
  pStateTarget = Math.max(0, Math.min(2, stateFloat));
}

function setParticlePhase(phase) {
  const prev = pPhase;
  pPhase = pPhaseTarget = Math.max(0, Math.min(2, phase));
  refreshParticleColors();

  /* Densidad: caos completo hasta phase ~0.82, luego reduce al mínimo en phase 1, regresa en phase 2 */
  if (phase <= 1) {
    const t = pSS(Math.max(0, Math.min(1, (phase - 0.82) / 0.18)));
    pDensityFactor = pLerp(1.0, 0.55, t);
  } else {
    pDensityFactor = pLerp(0.55, 1.0, pSS(phase - 1));
  }

  if (Math.abs(pPhase - prev) > 0.25 && pRenderer) pRenderer.clear();
}

function resizeParticles() {
  pIsMobile = window.innerWidth <= 768;
  pCanvasW  = window.innerWidth;
  pCanvasH  = window.innerHeight;
  pCamera.left   = -pCanvasW/2; pCamera.right  = pCanvasW/2;
  pCamera.top    =  pCanvasH/2; pCamera.bottom = -pCanvasH/2;
  pCamera.updateProjectionMatrix();
  pRenderer.setSize(pCanvasW, pCanvasH);
  pRenderer.setClearColor(0x000000, 0);
  pRenderer.clear();
}
