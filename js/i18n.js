/* ============================================================
   i18n.js — Sistema de internacionalización ES / EN
   El inglés usa un tono más formal que el español.
   ============================================================ */

const TRANSLATIONS = {

  es: {
    'nav.contact': 'Contacto',

    'hero.tagline': 'Diseñador integral de Buenos Aires, especializado en la comunicación visual, entornos multimediales y herramientas de inteligencia artificial.',

    'projects.title': 'Proyectos',
    'projects.p1.name': 'TABÚ',       'projects.p1.cat': 'Mobiliario / Diseño Industrial',
    'projects.p2.name': 'MULO', 'projects.p2.cat': 'Branding — Gestión Cultural',
    'projects.p3.name': 'VIDAMÍ',     'projects.p3.cat': 'Entorno Inmersivo',
    'projects.p4.name': 'AMIGOS TIPINES', 'projects.p4.cat': 'Inteligencia Artificial Generativa',
    'projects.p5.name': 'THE MONKEY', 'projects.p5.cat': 'Diseño Sonoro — Foley',
    'projects.p6.name': 'ABISAL',     'projects.p6.cat': 'Diseño 3D — Realidad Virtual',

    'listen.title': 'Escucho',
    'listen.text': 'Me caracteriza una fuerte creatividad, una mirada integral del diseño y facilidad para trabajar en equipos multidisciplinarios. Me interesa explorar nuevas ideas, desarrollar proyectos con identidad y seguir creciendo tanto profesional como personalmente.',

    'process.title': 'Proceso',
    'process.text': 'Mi forma de trabajar se construye desde la comunicación, la empatía y la capacidad para adaptarme a distintos contextos y equipos.',
    'process.c1.title': 'Vinculación',
    'process.c1.text': 'Capacidad para expresar ideas con claridad y facilitar el intercambio dentro de diferentes dinámicas y equipos.',
    'process.c2.title': 'Iniciativa y curiosidad',
    'process.c2.text': 'Predisposición e interés constante tanto para proponer, accionar y mejorar procesos, como para aprender, explorar y expandir mis conocimientos.',
    'process.c3.title': 'Adaptabilidad emocional',
    'process.c3.text': 'Capacidad para responder a distintos contextos, desafíos y necesidades del proyecto; y sensibilidad para comprender personas y climas de trabajos colaborativos.',

    'design.title': 'Diseño',
    'design.text': 'Desarrollo proyectos que buscan articular distintas disciplinas para construir propuestas con identidad, coherencia y sentido con la actualidad. Fusiono diseño con inteligencia artificial para optimizar mi trabajo.',
    'tags.t1': 'Mirada integradora',
    'tags.t2': 'Problem-solving',
    'tags.t3': 'Trabajo en equipo',
    'tags.t4': 'Buena comunicación',
    'tags.t5': 'Comunicación visual',
    'tags.t6': 'Branding',
    'tags.t7': 'Entornos digitales',
    'tags.t8': 'Inteligencia Artificial',

    'about.title': '¡Qué onda! Soy Pedro',
    'about.text': 'Diseñador integral formado en la Universidad Torcuato Di Tella, en Buenos Aires, Argentina. Trabajo desarrollando proyectos que integran distintas disciplinas del diseño para construir propuestas innovadoras, dándole una mirada contemporánea.',
    'about.btn': 'Contactame',

    'contact.title': 'Contacto',
    'contact.phrase': 'Si querés colaborar, trabajar juntos o conocer más sobre mí, charlemos un rato.',
    'contact.name': 'Nombre',
    'contact.email': 'Email',
    'contact.message': 'Mensaje',
    'contact.send': 'Enviar',
    'contact.success': '¡Mensaje enviado! Te respondo a la brevedad.',
    'contact.error': 'Algo salió mal. Intentá de nuevo o escribime directo.',
    'contact.sending': 'Enviando…',
    'contact.phone': 'Teléfono',
    'contact.location': 'Ubicación',
    'contact.education': 'Formación',
    'contact.placeholder': 'Hola Pedro! ¿Qué tal?',

    'proj.btn.book':      'Ver libro',
    'proj.btn.room':      'Ver sala',
    'proj.btn.short':     'Ver corto',
    'proj.btn.vr':        'Ver entorno VR',
    'proj.btn.teaser':    'Ver teaser',
    'proj.btn.fanzine':   'Ver fanzine',
    'proj.btn.web':       'Ver web',
    'proj.nav.back':      'Volver al inicio',
    'proj.nav.portfolio': 'Volver al portfolio',
    'proj.nav.next.tabu':   'Siguiente: MULO',
    'proj.nav.next.p2':     'Siguiente: VIDAMÍ',
    'proj.nav.next.vidami': 'Siguiente: AMIGOS TIPINES',
    'proj.nav.next.at':     'Siguiente: The Monkey',
    'proj.nav.next.p5':     'Siguiente: ABISAL',
  },

  en: {
    'nav.contact': 'Contact',

    'hero.tagline': 'Buenos Aires-based multidisciplinary designer, specialising in visual communication, multimedia environments and artificial intelligence tools.',

    'projects.title': 'Projects',
    'projects.p1.name': 'TABÚ',       'projects.p1.cat': 'Furniture / Industrial Design',
    'projects.p2.name': 'MULO', 'projects.p2.cat': 'Branding — Cultural Management',
    'projects.p3.name': 'VIDAMÍ',    'projects.p3.cat': 'Immersive Environment',
    'projects.p4.name': 'AMIGOS TIPINES', 'projects.p4.cat': 'Generative Artificial Intelligence',
    'projects.p5.name': 'THE MONKEY', 'projects.p5.cat': 'Sound Design — Foley',
    'projects.p6.name': 'ABISAL',    'projects.p6.cat': '3D Design — Virtual Reality',

    'listen.title': 'I Listen',
    'listen.text': 'I am characterised by a strong creative sensibility, an integral vision of design, and a natural ability to collaborate within multidisciplinary teams. I am driven to explore new ideas, develop projects with distinct identity, and continue growing both professionally and personally.',

    'process.title': 'Process',
    'process.text': 'My working methodology is grounded in communication, empathy and the capacity to adapt to diverse contexts and collaborative environments.',
    'process.c1.title': 'Connection',
    'process.c1.text': 'The ability to articulate ideas with clarity and to facilitate meaningful exchange within different team dynamics and working structures.',
    'process.c2.title': 'Initiative & Curiosity',
    'process.c2.text': 'A constant disposition to propose, act and improve processes, as well as to learn, explore and continuously expand my knowledge base.',
    'process.c3.title': 'Emotional Adaptability',
    'process.c3.text': 'The capacity to respond effectively to diverse contexts, challenges and project requirements, along with a sensitivity to understand people and collaborative work environments.',

    'design.title': 'Design',
    'design.text': 'I develop projects that seek to articulate diverse disciplines to build proposals with identity, coherence and contemporary relevance. I integrate design with artificial intelligence to optimise my practice.',
    'tags.t1': 'Integrative vision',
    'tags.t2': 'Problem-solving',
    'tags.t3': 'Teamwork',
    'tags.t4': 'Clear communication',
    'tags.t5': 'Visual communication',
    'tags.t6': 'Branding',
    'tags.t7': 'Digital environments',
    'tags.t8': 'Artificial Intelligence',

    'about.title': 'Hey! I\'m Pedro',
    'about.text': 'Multidisciplinary designer trained at Universidad Torcuato Di Tella in Buenos Aires, Argentina. I develop projects that integrate diverse design disciplines to build innovative proposals with a contemporary perspective.',
    'about.btn': 'Contact me',

    'contact.title': 'Contact',
    'contact.phrase': 'If you\'d like to collaborate, work together or learn more about me, let\'s have a conversation.',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send',
    'contact.success': 'Message sent! I\'ll get back to you shortly.',
    'contact.error': 'Something went wrong. Please try again or reach out directly.',
    'contact.sending': 'Sending…',
    'contact.phone': 'Phone',
    'contact.location': 'Location',
    'contact.education': 'Education',
    'contact.placeholder': 'Hey Pedro! How\'s it going?',

    'proj.btn.book':      'View book',
    'proj.btn.room':      'View room',
    'proj.btn.short':     'Watch short',
    'proj.btn.vr':        'View VR environment',
    'proj.btn.teaser':    'View teaser',
    'proj.btn.fanzine':   'View fanzine',
    'proj.btn.web':       'View web',
    'proj.nav.back':      'Back to home',
    'proj.nav.portfolio': 'Back to portfolio',
    'proj.nav.next.tabu':   'Next: MULO',
    'proj.nav.next.p2':     'Next: VIDAMÍ',
    'proj.nav.next.vidami': 'Next: AMIGOS TIPINES',
    'proj.nav.next.at':     'Next: The Monkey',
    'proj.nav.next.p5':     'Next: ABISAL',
  }
};

/* ── Estado de idioma activo ── */
let currentLang = localStorage.getItem('lang') || 'es';

/* Aplica todas las traducciones al DOM */
function applyTranslations(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  const t = TRANSLATIONS[lang];
  if (!t) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });

  /* Placeholders traducibles vía data-i18n-placeholder */
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key] !== undefined) el.setAttribute('placeholder', t[key]);
  });

  /* Actualiza el atributo lang del HTML para accesibilidad */
  document.documentElement.setAttribute('lang', lang);
}

/* Devuelve un string traducido (útil para JS dinámico) */
function t(key) {
  return (TRANSLATIONS[currentLang] || TRANSLATIONS['es'])[key] || key;
}
