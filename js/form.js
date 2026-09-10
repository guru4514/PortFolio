/* ═══════════════════════════════════════════════════════════════
   FORM — Web3Forms contact form handler
   ═══════════════════════════════════════════════════════════════ */

// Replace this with your actual Web3Forms access key
const WEB3FORMS_KEY = '1c29e1dc-ccc2-4085-a166-9ef828178d75';

/**
 * Initialize contact form with Web3Forms integration
 */
export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const btn = form.querySelector('.cf-btn');
  const statusEl = form.querySelector('.cf-status');
  const originalBtnText = btn ? btn.textContent : 'Send it →';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!btn || !statusEl) return;

    // Validate required fields
    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const message = form.querySelector('[name="message"]');

    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      showStatus(statusEl, 'error', 'Please fill in all fields.');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      showStatus(statusEl, 'error', 'Please enter a valid email address.');
      return;
    }

    // Disable button during submission
    btn.disabled = true;
    btn.textContent = 'Sending...';

    try {
      const formData = new FormData(form);
      formData.append('access_key', WEB3FORMS_KEY);
      formData.append('subject', `Portfolio Contact: ${name.value.trim()}`);
      formData.append('from_name', 'Portfolio Contact Form');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        btn.textContent = 'Sent ✓';
        btn.classList.add('cf-btn--success');
        showStatus(statusEl, 'success', 'Message sent successfully! I\'ll get back to you soon.');
        form.reset();

        // Reset button after delay
        setTimeout(() => {
          btn.textContent = originalBtnText;
          btn.classList.remove('cf-btn--success');
          btn.disabled = false;
          hideStatus(statusEl);
        }, 4000);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      btn.textContent = 'Failed ✕';
      btn.classList.add('cf-btn--error');
      showStatus(statusEl, 'error', 'Something went wrong. Please email me directly at gurubk321@gmail.com');

      // Reset button after delay
      setTimeout(() => {
        btn.textContent = originalBtnText;
        btn.classList.remove('cf-btn--error');
        btn.disabled = false;
      }, 3000);
    }
  });
}

function showStatus(el, type, message) {
  el.textContent = message;
  el.className = `cf-status cf-status--${type}`;
}

function hideStatus(el) {
  el.className = 'cf-status';
  el.textContent = '';
}
