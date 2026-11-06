import { initContactForm } from './form.js';
import { initExperiences } from './experience.js';

const root = document.documentElement;
root.classList.add('js-ready');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton.hidden = false;
function closeMenu(returnFocus = false) {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
navigation.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link) return;
  if (menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    if (link.pathname === location.pathname && link.hash) {
      const target = document.getElementById(link.hash.slice(1));
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    }
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-header')) closeMenu();
});
window.matchMedia('(min-width: 681px)').addEventListener('change', () => closeMenu());

const themeButton = document.querySelector('.theme-toggle');
themeButton.hidden = false;
function updateThemeButton() {
  const light = root.dataset.theme === 'light';
  themeButton.setAttribute('aria-pressed', String(light));
  themeButton.setAttribute('aria-label', `Switch to ${light ? 'dark' : 'light'} theme`);
  document.querySelector('meta[name="theme-color"]').content = light ? '#f7f7f0' : '#101513';
}
updateThemeButton();
themeButton.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
  try { localStorage.setItem('gk-theme', root.dataset.theme); } catch { /* In-memory preference still works. */ }
  updateThemeButton();
});

const filters = document.querySelector('.project-filters');
const projects = [...document.querySelectorAll('.project')];
if (filters) filters.hidden = false;
function filterProjects(filter) {
  for (const button of filters?.querySelectorAll('button') || []) button.setAttribute('aria-pressed', String(button.dataset.filter === filter));
  let visible = 0;
  for (const project of projects) {
    project.hidden = filter !== 'all' && project.dataset.category !== filter;
    if (!project.hidden) visible++;
  }
  const status = document.querySelector('#filter-status');
  if (status) status.textContent = `${visible} projects shown.`;
}
filters?.addEventListener('click', (event) => {
  const button = event.target.closest('[data-filter]');
  if (button) filterProjects(button.dataset.filter);
});
function revealLinkedProject() {
  const project = projects.find((item) => `#${item.id}` === location.hash);
  if (project?.hidden) {
    filterProjects('all');
    project.scrollIntoView();
  }
}
window.addEventListener('hashchange', revealLinkedProject);
revealLinkedProject();

if ('IntersectionObserver' in window) {
  const navLinks = [...navigation.querySelectorAll('a')];
  const observer = new IntersectionObserver((entries) => {
    const current = entries.find((entry) => entry.isIntersecting);
    if (!current) return;
    for (const link of navLinks) {
      if (link.hash === `#${current.target.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }, { rootMargin: '-15% 0px -65% 0px' });
  for (const id of ['hero', 'projects', 'about', 'journey', 'contact']) {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  }
}

const copyButton = document.querySelector('#copy-email');
if (copyButton) copyButton.hidden = false;
copyButton?.addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText('gurubk321@gmail.com');
    status.textContent = 'Email address copied.';
  } catch {
    status.textContent = 'Copy unavailable — use the email link or select the address above.';
  }
});
document.querySelector('#year').textContent = String(new Date().getFullYear());
initContactForm();
initExperiences();
