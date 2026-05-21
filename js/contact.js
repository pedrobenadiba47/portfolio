/* ============================================================
   contact.js — Formulario de contacto con EmailJS

   INSTRUCCIONES DE CONFIGURACIÓN:
   ─────────────────────────────────────────────────────────
   1. Crear una cuenta en https://www.emailjs.com
   2. Crear un servicio de email (Gmail, Outlook, etc.)
   3. Crear una plantilla con las variables:
        {{from_name}}, {{reply_to}}, {{message}}
   4. Reemplazar los tres valores de abajo con tus credenciales:
   ─────────────────────────────────────────────────────────
   ============================================================ */

const EMAILJS_PUBLIC_KEY  = 'TU_PUBLIC_KEY_AQUI';   /* ← reemplazar */
const EMAILJS_SERVICE_ID  = 'TU_SERVICE_ID_AQUI';   /* ← reemplazar */
const EMAILJS_TEMPLATE_ID = 'TU_TEMPLATE_ID_AQUI';  /* ← reemplazar */

/* Dirección de destino (ya configurada en la plantilla de EmailJS) */
/* Recordatorio: la plantilla debe enviar a pedrobenadiba4@gmail.com */

function initContact() {
  /* Inicializar EmailJS con la clave pública */
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  const form     = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    /* Validación básica del lado del cliente */
    const name  = document.getElementById('fieldName').value.trim();
    const email = document.getElementById('fieldEmail').value.trim();
    const msg   = document.getElementById('fieldMsg').value.trim();

    if (!name || !email || !msg) return;

    /* Estado de carga */
    submitBtn.disabled = true;
    feedback.textContent = t('contact.sending');

    if (typeof emailjs === 'undefined') {
      /* EmailJS no está disponible (ej. sin conexión o credenciales vacías) */
      feedback.textContent = t('contact.error');
      submitBtn.disabled = false;
      return;
    }

    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
      feedback.textContent = t('contact.success');
      form.reset();
      /* Devuelve los labels a su posición original */
      form.querySelectorAll('.form__input').forEach(inp => inp.blur());
    } catch (err) {
      console.error('EmailJS error:', err);
      feedback.textContent = t('contact.error');
    } finally {
      submitBtn.disabled = false;
    }
  });
}
