/* ═══════════════════════════════════════════════════════════════
   APP — Main orchestrator, event bindings, custom cursor
   ═══════════════════════════════════════════════════════════════ */

import { initTheme, toggleTheme } from './theme.js';
import { initRevealAnimations, initCounters, initStatRings, initSidebarTracking } from './animations.js';
import { initNeuralCanvas } from './canvas.js';
import { initTerminal, openTerminalFromExternal } from './terminal.js';
import { initContactForm } from './form.js';
import { renderSkills, renderTools, renderProjects, renderTimeline, renderCommandPalette } from './render.js';

/* ── Initialize Everything ─────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme (must be first for correct canvas colors)
  initTheme();

  // 2. Render dynamic content
  renderSkills();
  renderTools();
  renderProjects();
  renderTimeline();
  renderCommandPalette();

  // 3. Animations & interactivity
  initRevealAnimations();
  initCounters();
  initStatRings();
  initSidebarTracking();

  // 4. Canvas
  initNeuralCanvas();

  // 5. Terminal
  initTerminal();

  // 6. Contact form
  initContactForm();

  // 7. Custom cursor (desktop only)
  initCursor();

  // 8. Mobile navigation
  initMobileNav();

  // 9. Dark mode toggle
  initDarkModeToggle();

  // 10. Command palette
  initCommandPalette();
});


/* ── Custom Cursor ─────────────────────────────────────────────── */

function initCursor() {
  const cursor = document.getElementById('cursor');
  if (!cursor) return;

  // Only enable on devices with fine pointer (not touch)
  if (!window.matchMedia('(pointer: fine)').matches) return;

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // Hover effect on interactive elements
  const hoverTargets = 'a, button, .project-card, .element, .tool-pill, .cf-input, .cf-textarea, #dm-toggle, .c-card, .cmd-item';

  document.querySelectorAll(hoverTargets).forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  // Also handle dynamically rendered elements
  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest(hoverTargets);
    if (target) cursor.classList.add('hover');
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest(hoverTargets);
    if (target) cursor.classList.remove('hover');
  });
}


/* ── Mobile Navigation ─────────────────────────────────────────── */

function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('mobile-drawer');

  if (!hamburger || !drawer) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    drawer.classList.toggle('open');

    const isOpen = drawer.classList.contains('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close drawer when a link is clicked
  drawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}


/* ── Dark Mode Toggle ──────────────────────────────────────────── */

function initDarkModeToggle() {
  const toggle = document.getElementById('dm-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    toggleTheme();
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    toggle.setAttribute('aria-pressed', isDark);
  });
}


/* ── Command Palette ───────────────────────────────────────────── */

function initCommandPalette() {
  const palette = document.getElementById('cmd-palette');
  const searchInput = document.getElementById('cmd-search-input');
  const list = document.getElementById('cmd-list');

  if (!palette || !searchInput || !list) return;

  // Keyboard shortcut: Ctrl+K / Cmd+K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openPalette();
    }
    if (e.key === 'Escape' && palette.classList.contains('open')) {
      closePalette();
    }
  });

  // Close on backdrop click
  palette.addEventListener('click', (e) => {
    if (e.target === palette) closePalette();
  });

  // Filter items on search
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    list.querySelectorAll('.cmd-item').forEach((item) => {
      const label = item.querySelector('.cmd-item__label').textContent.toLowerCase();
      item.style.display = label.includes(query) ? '' : 'none';
    });
  });

  // Handle item clicks
  list.addEventListener('click', (e) => {
    const item = e.target.closest('.cmd-item');
    if (!item) return;

    const action = item.dataset.action;
    const target = item.dataset.target;

    switch (action) {
      case 'goto':
        closePalette();
        const section = document.getElementById(target);
        if (section) section.scrollIntoView({ behavior: 'smooth' });
        break;

      case 'download':
        const link = document.createElement('a');
        link.href = target;
        link.download = 'Gururaj_B_Kandagal_Resume.pdf';
        link.click();
        closePalette();
        break;

      case 'copy':
        navigator.clipboard.writeText(target).then(() => {
          const label = item.querySelector('.cmd-item__label');
          const orig = label.textContent;
          label.textContent = 'Copied!';
          setTimeout(() => { label.textContent = orig; }, 1500);
        });
        break;

      case 'theme':
        toggleTheme();
        closePalette();
        break;

      case 'terminal':
        closePalette();
        setTimeout(() => openTerminalFromExternal(), 200);
        break;
    }
  });

  function openPalette() {
    palette.classList.add('open');
    searchInput.value = '';
    searchInput.focus();
    // Show all items
    list.querySelectorAll('.cmd-item').forEach((item) => {
      item.style.display = '';
    });
  }

  function closePalette() {
    palette.classList.remove('open');
  }
}
