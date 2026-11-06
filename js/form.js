export function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;
  const button = form.querySelector('button[type="submit"]');
  const status = form.querySelector('.form-status');
  const originalLabel = button.innerHTML;
  let sending = false;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending || !form.reportValidity() || form.elements.botcheck.checked) return;
    if (!form.elements.name.value.trim() || !form.elements.message.value.trim()) {
      status.dataset.state = 'error';
      status.textContent = 'Please enter your name and a message.';
      return;
    }
    sending = true;
    button.disabled = true;
    button.textContent = 'Sending…';
    form.setAttribute('aria-busy', 'true');
    status.dataset.state = 'pending';
    status.textContent = 'Sending your message…';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const data = new FormData(form);
      // The hidden field supplies the key once, including for non-JS submissions.
      data.set('subject', `Portfolio enquiry from ${form.elements.name.value.trim()}`);
      data.set('from_name', 'Gururaj’s portfolio');
      const response = await fetch(form.action, { method: 'POST', body: data, signal: controller.signal });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error('Message was not accepted');
      status.dataset.state = 'success';
      status.textContent = 'Thanks — your message was sent. I’ll get back to you by email.';
      form.reset();
    } catch (error) {
      status.dataset.state = 'error';
      status.textContent = error.name === 'AbortError'
        ? 'Delivery could not be confirmed. Your message is still here; email gurubk321@gmail.com directly if needed.'
        : 'Message could not be sent. Your message is still here; try again or email gurubk321@gmail.com.';
    } finally {
      clearTimeout(timeout);
      sending = false;
      button.disabled = false;
      button.innerHTML = originalLabel;
      form.removeAttribute('aria-busy');
    }
  });
}
