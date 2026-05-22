/* ============================================================
   i18n.js — Sistema de internacionalización ES / EN
   El inglés usa un tono más formal que el español.
   ============================================================ */

const TRANSLATIONS = {

  es: {
    'nav.contact': 'Contacto',
    'nav.projects': 'Proyectos',
    'nav.about':    '¿Quién soy?',
    'nav.analysis': 'Análisis',

    'contact.placeholder.name':  'Tu Nombre',
    'contact.placeholder.email': 'tu@correo.com',

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
    'contact.phrase': 'Si querés colaborar, trabajar juntos o conocer más sobre mí, charlemos un rato!',
    'contact.name': 'Nombre',
    'contact.email': 'Correo',
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
    'proj.nav.next.p6':     'Volver a TABÚ',

    /* ── Labels compartidos ── */
    'proj.label.desc':    'Descripción del Proyecto',
    'proj.label.idea':    'La Idea',
    'proj.label.members': 'Integrantes',
    'proj.label.team':    'Equipo',
    'proj.label.purpose': 'Propósito',
    'proj.label.tools':   'Herramientas Utilizadas',

    /* ── TABÚ (p1) ── */
    'proj.p1.subtitle': 'Pedro Benadiba  ·  2025  ·  Mobiliario / Diseño Industrial  ·  Diseño de Mobiliario Modlar — UTDT',
    'proj.p1.desc.h':   'Silla Contracultural.',
    'proj.p1.desc.p1':  'El proyecto consistió en el diseño de una silla a partir de un concepto contracultural. El punto de partida fue una investigación profunda sobre una temática asignada, que luego debía traducirse en decisiones formales y conceptuales concretas para el diseño del mobiliario. El objetivo era que la silla no fuera solo un objeto funcional, sino la materialización de una idea: que cada decisión de diseño respondiera a un posicionamiento cultural y conceptual claro.',
    'proj.p1.desc.p2':  'El trabajo fue seleccionado para ser expuesto en el Museo Proa21, donde formó parte de una muestra colectiva que se extendió del 30 de noviembre al 14 de diciembre de 2025.',
    'proj.p1.idea.h':   'La "Silla Sexo".',
    'proj.p1.idea.p1':  'Para diseñar una silla contracultural, primero hay que definir qué es la contracultura. Es así como identificamos dos características principales: la resignificación de elementos cotidianos y el sexo. La propuesta conceptual se enfoca en manifestar el sexo, ya que es algo que a medida que pasa el tiempo nunca deja de ser tabú. La silla resignifica sus componentes, para lograr la búsqueda de remitir a lo sexual.',
    'proj.p1.idea.p2':  'Una silla que su connotación y propuesta se ven reflejadas en la forma de sentarse que debe adoptar el usuario para usarla. Como condición, y para reflejar nuestro concepto, las piernas deben quedar abiertas y la espalda ligeramente recostada, para dejar en una posición expuesta al usuario.',
    'proj.p1.purpose':  'Diseño de Mobiliario Modlar — UTDT',
    'proj.p1.tool.t2':  'Corte de chapa',
    'proj.p1.tool.t3':  'Cilindrado de chapa',
    'proj.p1.tool.t4':  'Pintura al horno — Enlacado',
    'proj.p1.tool.t5':  'Impresión 3D',

    /* ── MULO (p2) ── */
    'proj.p2.subtitle': 'Pedro Benadiba  ·  2025  ·  Branding  ·  Gestión Cultural  ·  Desarrollo de Identidad',
    'proj.p2.desc.h':   'Diseño y Gestión Cultural.',
    'proj.p2.desc.p1':  'MULO es un proyecto de branding desarrollado para un espacio de gestión cultural independiente. El proyecto abarca el diseño de identidad visual completo: desde la construcción del sistema de marca hasta sus aplicaciones en piezas editoriales, comunicación digital y materiales de difusión. La identidad busca equilibrar la fuerza gráfica con una estética que refleje el carácter autónomo, irreverente y comprometido del espacio.',
    'proj.p2.desc.p2':  'El proceso incluyó el desarrollo de un fanzine impreso que funciona como manifiesto y carta de presentación del proyecto, un teaser audiovisual y un sitio web que consolida la propuesta online. Cada pieza fue pensada como parte de un ecosistema coherente, con reglas visuales claras que permiten su extensión y adaptación a distintos formatos y soportes.',
    'proj.p2.idea.h':   'MULO.',
    'proj.p2.idea.p1':  'MULO es una palabra que proviene del lunfardo argentino, cuyo significado alude al engaño o la trampa. El nombre surgió de nuestra selección de objetos de diseño argentino que emplean un juego provocativo, donde las formas se exageran sin perjudicar la funcionalidad. El hilo que une a todas las piezas de la selección es la priorización de la forma: ya sea mobiliario con apariencia escultórica o afiches con predominancia gráfica, la experimentación con la técnica y la morfología siempre está presente.',
    'proj.p2.idea.p2':  'Nuestra colección reúne piezas de diseño argentino en las que la función se vuelve excusa para construir otro lenguaje. Provocación, juego, gesto estético, deformaciones. En lugar de ocultar lo artificial, se celebra. Las formas se exageran, los materiales se hacen visibles, los signos se multiplican. Desde ese universo construimos una identidad completa: logotipo, afiches y piezas gráficas, piezas editoriales, diseño web, prototipos de aplicación y renders espaciales para la exhibición de la colección en contexto museístico.',
    'proj.p2.purpose':  'Branding y Gestión Cultural — Lic. en Diseño — UTDT',

    /* ── VIDAMÍ (p3) ── */
    'proj.p3.subtitle': 'Pedro Benadiba  ·  2024  ·  Entorno Inmersivo  ·  Laboratorio de Diseño VI',
    'proj.p3.desc.h':   'Entorno Inmersivo 360°.',
    'proj.p3.desc.p1':  'El proyecto consistió en el diseño y producción de una experiencia inmersiva dentro de una sala 360°, con el objetivo de construir una atmósfera específica a partir de una narrativa propia. Para lograrlo, trabajamos con tres elementos en simultáneo: imagen, sonido y luz. La sala cuenta con cuatro pantallas que conforman un entorno visual de 360 grados, sonido cuadrafónico que envuelve al espectador desde todos los ángulos, y una grilla de 36 focos de luz que cubren el espacio.',
    'proj.p3.desc.p2':  'El desafío central fue aprender a manipular estos tres estados de manera integrada, logrando que cada uno reforzara a los otros en función de la atmósfera buscada. Más allá del dominio técnico de cada herramienta, el proyecto exigió pensar en términos de experiencia total: cómo el espectador percibe, siente y se sitúa dentro de un espacio diseñado desde cero.',
    'proj.p3.idea.h':   'Un viaje entre dos atmósferas.',
    'proj.p3.idea.p1':  'La idea central fue trazar un viaje en esta experiencia. Partir de una atmósfera cruda, hostil y realista, y luego conducir al espectador hacia un entorno encantador donde todas las energías convergen en algo positivo. Una exploración de la dualidad emocional y física, narrada a través de los sentidos.',
    'proj.p3.idea.p2':  'Para construir ese viaje desde adentro, decidimos que el contenido visual tenía que ser completamente nuestro. Pintamos a mano, sobre papel, un catálogo de formas y texturas propias, y fue ese material analógico el que luego digitalizamos y llevamos a la sala inmersiva.',
    'proj.p3.purpose':  'Laboratorio de Diseño VI — Entornos Inmersivos',
    'proj.p3.tool.t5':  'Pinturas a mano',

    /* ── AMIGOS TIPINES (p4) ── */
    'proj.p4.subtitle': 'Pedro Benadiba  ·  2026  ·  Inteligencia Artificial Generativa  ·  Diseño Editorial',
    'proj.p4.desc.h':   'Un libro ilustrado generado con inteligencia artificial.',
    'proj.p4.desc.p1':  '"Amigos Tipines" es un libro de búsqueda visual —del género Search & Find, popularizado por títulos como ¿Dónde está Wally?— desarrollado íntegramente a partir de generación de contenido con inteligencia artificial. El proyecto explora el uso de herramientas de IA como motor creativo principal, aplicado al diseño editorial infantil.',
    'proj.p4.desc.p2':  'Desde la creación de los personajes y la construcción de los escenarios hasta la narrativa, la paleta cromática y la estética visual, cada decisión fue tomada en diálogo constante con distintas IAs, iterando y refinando los resultados hasta lograr un producto cohesivo, original y con identidad propia. El desafío central fue demostrar que la IA no solo puede ejecutar instrucciones técnicas, sino participar activamente en la construcción de un universo creativo complejo, con personajes consistentes, escenarios densos y una historia con principio y final.',
    'proj.p4.idea.h':   'Amigos Tipines.',
    'proj.p4.idea.p1':  'El libro sigue la rutina de un día completo en la vida de un niño, acompañado por sus tres juguetes favoritos: Peppi, Matti y Gatti, tres muñequitos de plastilina que él mismo construyó con sus manos. Cada uno tiene una personalidad bien definida y lo divertido del libro es precisamente eso: encontrarlos escondidos en cada escenario haciendo cosas completamente típicas de su carácter.',
    'proj.p4.idea.p2':  'A lo largo de distintas situaciones cotidianas de la vida de un niño, el lector debe buscarlos a ellos y a los objetos que los delatan, sabiendo que cada uno va a estar haciendo exactamente lo que mejor sabe hacer. El recorrido culmina en los sueños del niño, donde cada tipín cumple su máximo deseo. Pero como todo buen juego tiene un final, al despertar el niño los toma entre sus manos, los amasa con cariño y los vuelve a convertir en una simple bola de plastilina —dándole cierre a la narrativa de esta historia.',
    'proj.p4.purpose':  'IA Generativa y Diseño — Lic. en Diseño — UTDT',

    /* ── THE MONKEY (p5) ── */
    'proj.p5.subtitle': 'Pedro Benadiba  ·  2025  ·  Diseño Sonoro — Foley  ·  Diseño Sonoro — UTDT',
    'proj.p5.desc.h':   'Foley.',
    'proj.p5.desc.p1':  'La consigna consistía en seleccionar clips de una película hasta completar diez minutos de material, eliminar la pista de audio original y reconstruir todo el diseño sonoro mediante la técnica foley. Sin el uso de voces, solo los sonidos del mundo físico de la escena: pasos, texturas, objetos, ambiente. El objetivo era aprender a manipular y editar técnicamente el sonido para el mundo del cine, entendiendo cómo se construye un proyecto de diseño sonoro desde cero.',
    'proj.p5.idea.h':   'The Monkey.',
    'proj.p5.idea.p1':  'Para nuestro proyecto elegimos The Monkey (2025), una película de horror y gore que nos pareció una oportunidad ideal para trabajar el foley en un territorio poco convencional. Las escenas de este género presentan un desafío sonoro específico. Eso fue exactamente lo que buscamos explotar, y lo que terminó siendo el elemento distintivo de nuestro proyecto.',
    'proj.p5.purpose':  'Diseño Sonoro — UTDT',

    /* ── ABISAL (p6) ── */
    'proj.p6.subtitle': 'Pedro Benadiba  ·  2024  ·  Diseño 3D — Realidad Virtual  ·  Laboratorio de Diseño VI — UTDT',
    'proj.p6.desc.h':   'Entorno VR — 360°.',
    'proj.p6.desc.p1':  'El proyecto consistió en construir un entorno de realidad virtual en un mundo 3D. La consigna exigía desarrollar una narrativa propia como base para la construcción de este mundo digital, combinando imagen y audio cuadrafónico para generar una experiencia inmersiva total. El objetivo era aprender a integrar estos dos elementos de manera que se potenciaran mutuamente, logrando que el espectador se sintiera dentro de un entorno coherente y envolvente en 360 grados.',
    'proj.p6.idea.h':   'El lado "Abisal".',
    'proj.p6.idea.p1':  'Un ambiente desolado y lúgubre en las profundidades del océano, donde los ecos de sonidos distantes chocan con la presencia de figuras exóticas. Sumergido en un abismo angustiante, del que no hay retorno posible a la superficie, se genera una sensación de aturdimiento y desorientación.',
    'proj.p6.hint':     '(Abrir Video en YouTube para ver el entorno 360°)',
    'proj.p6.purpose':  'Laboratorio de Diseño VI — Entorno 3D (VR) — UTDT',
  },

  en: {
    'nav.contact': 'Contact',
    'nav.projects': 'Projects',
    'nav.about':    'Who am I?',
    'nav.analysis': 'Analysis',

    'contact.placeholder.name':  'Your Name',
    'contact.placeholder.email': 'your@email.com',

    'hero.tagline': 'Buenos Aires-based multidisciplinary designer, specialized in visual communication, multimedia and artificial intelligence.',

    'projects.title': 'Projects',
    'projects.p1.name': 'TABÚ',       'projects.p1.cat': 'Furniture / Industrial Design',
    'projects.p2.name': 'MULO', 'projects.p2.cat': 'Branding — Cultural Management',
    'projects.p3.name': 'VIDAMÍ',    'projects.p3.cat': 'Immersive Environment',
    'projects.p4.name': 'AMIGOS TIPINES', 'projects.p4.cat': 'Generative Artificial Intelligence',
    'projects.p5.name': 'THE MONKEY', 'projects.p5.cat': 'Sound Design — Foley',
    'projects.p6.name': 'ABISAL',    'projects.p6.cat': '3D Design — Virtual Reality',

    'listen.title': 'Listenitng',
    'listen.text': 'I am defined by a strong creative drive, a holistic approach to design, and an ease for working in multidisciplinary teams. Drawn to exploring new ideas, developing projects with a distinct identity, and continuing to grow both professionally and personally.',

    'process.title': 'Processing',
    'process.text': 'My working methodology  is built on communication, empathy, and the ability to adapt to different contexts and teams.',
    'process.c1.title': 'Connection',
    'process.c1.text': 'The ability to articulate ideas with clarity and facilitate exchange within different dynamics and teams.',
    'process.c2.title': 'Initiative & Curiosity',
    'process.c2.text': 'Constant drive and interest to propose, act on, and improve processes, as well as to learn, explore, and expand my knowledge.',
    'process.c3.title': 'Emotional Adaptability',
    'process.c3.text': 'Ability to respond to different contexts, challenges, and project needs; sensitivity understanding people and the dynamics of collaborative work environments.',

    'design.title': 'Designing',
    'design.text': 'I develop projects that seek to articulate different disciplines to build proposals with identity, coherence, and relevance to the present. I fuse design with artificial intelligence to optimize my work.',
    'tags.t1': 'Integrative vision',
    'tags.t2': 'Problem-solving',
    'tags.t3': 'Teamwork',
    'tags.t4': 'Clear communication',
    'tags.t5': 'Visual communication',
    'tags.t6': 'Branding',
    'tags.t7': 'Digital environments',
    'tags.t8': 'Artificial Intelligence',

    'about.title': 'Hey! I\'m Pedro',
    'about.text': 'Multidisciplinary designer graduated Universidad Torcuato Di Tella in Buenos Aires, Argentina. I work developing projects that integrate different design disciplines to build innovative proposals, bringing a contemporary perspective.',
    'about.btn': 'Contact me',

    'contact.title': 'Contact',
    'contact.phrase': 'If you\'d like to collaborate, work together or just get to know me better, let\'s have a talk!',
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
    'proj.nav.next.p6':     'Back to TABÚ',

    /* ── Shared labels ── */
    'proj.label.desc':    'Project Description',
    'proj.label.idea':    'The Concept',
    'proj.label.members': 'Team Members',
    'proj.label.team':    'Team',
    'proj.label.purpose': 'Purpose',
    'proj.label.tools':   'Tools Used',

    /* ── TABÚ (p1) ── */
    'proj.p1.subtitle': 'Pedro Benadiba  ·  2025  ·  Furniture / Industrial Design  ·  Modlar Furniture Design — UTDT',
    'proj.p1.desc.h':   'Counter-Cultural Chair.',
    'proj.p1.desc.p1':  'The project consisted in the design of a chair based on a counter-cultural concept. The starting point was an in-depth investigation of an assigned theme, which then had to be translated into concrete formal and conceptual decisions for the furniture design. The goal was for the chair to be not merely a functional object, but the materialization of an idea: one in which every design decision reflected a clear cultural and conceptual stance.',
    'proj.p1.desc.p2':  'The work was selected for exhibition at Museo Proa21, where it was part of a collective show that ran from November 30 to December 14, 2025.',
    'proj.p1.idea.h':   'The "Sex Chair".',
    'proj.p1.idea.p1':  'To design a counter-cultural chair, one must first define what counterculture is. In doing so, we identified two defining characteristics: the resignification of everyday elements, and sex. The conceptual proposal focuses on manifesting sex — something that, as time passes, never ceases to be taboo. The chair resignifies its components in pursuit of sexual allusion.',
    'proj.p1.idea.p2':  'The chair\'s connotation and proposition are reflected in the posture the user must adopt to use it. As a condition — and to embody the concept — the legs must remain open and the back slightly reclined, placing the user in an exposed position.',
    'proj.p1.purpose':  'Modlar Furniture Design — UTDT',
    'proj.p1.tool.t2':  'Sheet Metal Cutting',
    'proj.p1.tool.t3':  'Sheet Metal Rolling',
    'proj.p1.tool.t4':  'Oven Lacquer Paint',
    'proj.p1.tool.t5':  '3D Printing',

    /* ── MULO (p2) ── */
    'proj.p2.subtitle': 'Pedro Benadiba  ·  2025  ·  Branding  ·  Cultural Management  ·  Identity Development',
    'proj.p2.desc.h':   'Design and Cultural Management.',
    'proj.p2.desc.p1':  'MULO is a branding project developed for an independent cultural management space. The project encompasses a complete visual identity design: from the construction of the brand system to its applications in editorial pieces, digital communication, and promotional materials. The identity seeks to balance graphic strength with an aesthetic that reflects the space\'s autonomous, irreverent, and committed character.',
    'proj.p2.desc.p2':  'The process included the development of a printed fanzine that functions as both manifesto and introductory document for the project, an audiovisual teaser, and a website that consolidates the proposal online. Each piece was conceived as part of a coherent ecosystem, with clear visual rules that allow for its extension and adaptation across different formats and media.',
    'proj.p2.idea.h':   'MULO.',
    'proj.p2.idea.p1':  'MULO is a word from Argentine lunfardo slang whose meaning alludes to deception or trickery. The name emerged from our selection of Argentine design objects that employ a provocative game, where forms are exaggerated without compromising functionality. The thread connecting all selected pieces is the prioritization of form: whether furniture with a sculptural appearance or posters with graphic predominance, experimentation with technique and morphology is always present.',
    'proj.p2.idea.p2':  'Our collection brings together Argentine design pieces in which function becomes a pretext for building another language. Provocation, play, aesthetic gesture, deformation. Rather than concealing the artificial, it is celebrated. Forms are exaggerated, materials made visible, signs multiplied. From that universe, we built a complete identity: logotype, posters and graphic pieces, editorial pieces, web design, application prototypes, and spatial renders for the exhibition of the collection in a museum context.',
    'proj.p2.purpose':  'Branding and Cultural Management — B.A. in Design — UTDT',

    /* ── VIDAMÍ (p3) ── */
    'proj.p3.subtitle': 'Pedro Benadiba  ·  2024  ·  Immersive Environment  ·  Design Lab VI',
    'proj.p3.desc.h':   '360° Immersive Environment.',
    'proj.p3.desc.p1':  'The project consisted in the design and production of an immersive experience within a 360° room, with the goal of constructing a specific atmosphere from an original narrative. To achieve this, we worked with three simultaneous elements: image, sound, and light. The room features four screens forming a 360-degree visual environment, quadraphonic sound that envelops the viewer from every angle, and a grid of 36 light fixtures covering the space.',
    'proj.p3.desc.p2':  'The central challenge was learning to manipulate these three states in an integrated way — ensuring that each reinforced the others in service of the intended atmosphere. Beyond technical mastery of each tool, the project demanded thinking in terms of total experience: how the viewer perceives, feels, and situates themselves within a space designed from scratch.',
    'proj.p3.idea.h':   'A Journey Between Two Atmospheres.',
    'proj.p3.idea.p1':  'The central idea was to trace a journey within this experience: beginning with a raw, hostile, and realistic atmosphere, then guiding the viewer toward an enchanting environment where all energies converge into something positive. An exploration of emotional and physical duality, narrated through the senses.',
    'proj.p3.idea.p2':  'To build that journey from within, we decided the visual content had to be entirely our own. We painted by hand, on paper, a catalogue of original forms and textures — and it was that analog material that we later digitized and brought into the immersive room.',
    'proj.p3.purpose':  'Design Lab VI — Immersive Environments',
    'proj.p3.tool.t5':  'Hand Painting',

    /* ── AMIGOS TIPINES (p4) ── */
    'proj.p4.subtitle': 'Pedro Benadiba  ·  2026  ·  Generative Artificial Intelligence  ·  Editorial Design',
    'proj.p4.desc.h':   'An illustrated book generated with artificial intelligence.',
    'proj.p4.desc.p1':  '"Amigos Tipines" is a visual search book — of the Search & Find genre, popularized by titles such as Where\'s Waldo? — developed entirely through AI-generated content. The project explores the use of AI tools as the primary creative engine, applied to children\'s editorial design.',
    'proj.p4.desc.p2':  'From character creation and scenario building to the narrative, color palette, and visual aesthetic, every decision was made in constant dialogue with different AIs, iterating and refining results until achieving a cohesive, original product with its own identity. The central challenge was to demonstrate that AI can not only execute technical instructions, but actively participate in the construction of a complex creative universe — with consistent characters, dense scenarios, and a story with a beginning and an end.',
    'proj.p4.idea.h':   'Amigos Tipines.',
    'proj.p4.idea.p1':  'The book follows the routine of a full day in the life of a child, accompanied by his three favorite toys: Peppi, Matti, and Gatti — three small plasticine figures he built with his own hands. Each has a well-defined personality, and that is precisely what makes the book enjoyable: finding them hidden in each scene doing things completely typical of their character.',
    'proj.p4.idea.p2':  'Across different everyday situations in a child\'s life, the reader must search for them and the objects that give them away, knowing that each one will be doing exactly what they do best. The journey culminates in the child\'s dreams, where each tipín fulfills their greatest wish. But as every good game must come to an end, upon waking the child takes them in his hands, kneads them with care, and turns them back into a simple ball of plasticine — bringing the story to a close.',
    'proj.p4.purpose':  'Generative AI and Design — B.A. in Design — UTDT',

    /* ── THE MONKEY (p5) ── */
    'proj.p5.subtitle': 'Pedro Benadiba  ·  2025  ·  Sound Design — Foley  ·  Sound Design — UTDT',
    'proj.p5.desc.h':   'Foley.',
    'proj.p5.desc.p1':  'The assignment consisted in selecting clips from a film to compile ten minutes of material, removing the original audio track and reconstructing the entire sound design using foley technique. Without the use of voices — only the sounds of the physical world within the scene: footsteps, textures, objects, ambience. The objective was to learn how to technically manipulate and edit sound for the world of cinema, understanding how a sound design project is built from scratch.',
    'proj.p5.idea.h':   'The Monkey.',
    'proj.p5.idea.p1':  'For our project, we chose The Monkey (2025), a horror and gore film that struck us as an ideal opportunity to explore foley in unconventional territory. Scenes from this genre present a specific sonic challenge. That was precisely what we sought to exploit — and what ultimately became the defining element of our project.',
    'proj.p5.purpose':  'Sound Design — UTDT',

    /* ── ABISAL (p6) ── */
    'proj.p6.subtitle': 'Pedro Benadiba  ·  2024  ·  3D Design — Virtual Reality  ·  Design Lab VI — UTDT',
    'proj.p6.desc.h':   'VR Environment — 360°.',
    'proj.p6.desc.p1':  'The project consisted in building a virtual reality environment within a 3D world. The assignment required developing an original narrative as the foundation for the construction of this digital world, combining image and quadraphonic audio to generate a total immersive experience. The goal was to learn to integrate these two elements in such a way that they mutually reinforced each other, allowing the viewer to feel fully inside a coherent and enveloping 360-degree environment.',
    'proj.p6.idea.h':   'The "Abyssal" Side.',
    'proj.p6.idea.p1':  'A desolate and somber setting in the depths of the ocean, where the echoes of distant sounds collide with the presence of exotic figures. Submerged in an anguishing abyss from which there is no possible return to the surface, a sensation of disorientation and bewilderment takes hold.',
    'proj.p6.hint':     '(Open the Video on YouTube to experience the 360° environment)',
    'proj.p6.purpose':  'Design Lab VI — 3D Environment (VR) — UTDT',
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
