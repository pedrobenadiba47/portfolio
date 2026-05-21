---
name: Portfolio Pedro Benadiba
description: Portfolio web personal single-page con Three.js, scroll narrativo, split-screen y i18n ES/EN
type: project
---

Portfolio web completo construido en mayo 2026.

**Why:** Pedro Benadiba necesitaba un portfolio profesional como diseñador integral de Buenos Aires (UTDT).

**Estructura de archivos:**
- `index.html` — estructura completa con 7 secciones
- `css/styles.css` — variables CSS animables para inversión de color, split-screen layout
- `js/i18n.js` — sistema ES/EN con función `t()` y `applyTranslations()`
- `js/particles.js` — Three.js r0.134, Simplex Noise, 3 estados (caos→ondas→espiral), estelas via fade plane
- `js/scroll.js` — inversión de color scrolleada, estados de partículas, IntersectionObserver reveals
- `js/contact.js` — EmailJS con constantes `EMAILJS_PUBLIC_KEY / SERVICE_ID / TEMPLATE_ID`
- `js/app.js` — cursor personalizado, lang switcher, smooth scroll, debounce resize
- `proyecto.html` — placeholder para páginas de proyecto

**Pendiente del usuario:**
- Agregar `images/logo.png`, `images/foto.jpg`, `images/trama.jpg`, `images/project1-6.jpg`
- Configurar EmailJS: reemplazar las 3 constantes en `js/contact.js`

**How to apply:** Al retomar este proyecto, recordar la paleta (blanco/negro + acento `#C8A94A`), tipografía Space Grotesk, y que el canvas Three.js ocupa la mitad derecha en desktop y es fondo ambiental en mobile.
