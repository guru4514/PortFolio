/* ═══════════════════════════════════════════════════════════════
   APP — Main orchestrator, event bindings, custom cursor
   ═══════════════════════════════════════════════════════════════ */

import { initTheme, toggleTheme } from './theme.js';
import { initRevealAnimations, initCounters, initStatRings, initSidebarTracking, initStickyCards } from './animations.js';
import { initNeuralCanvas } from './canvas.js';
import { initTerminal, openTerminalFromExternal } from './terminal.js';
import { initContactForm } from './form.js';
import { renderSkills, renderTools, renderProjects, renderTimeline, renderCommandPalette, renderMarquee, renderThoughts } from './render.js';
import { initAudio, playClick, playPop, playBell } from './audio.js';

/* ── Initialize Everything ─────────────────────────────────────── */

function boot() {
  // 1. Theme (must be first for correct canvas colors)
  initTheme();

  // 2. Render dynamic content
  renderSkills();
  renderTools();
  renderProjects();
  renderTimeline();
  renderCommandPalette();
  renderMarquee();
  renderThoughts();

  // 3. Animations & interactivity
  initRevealAnimations();
  initCounters();
  initStatRings();
  initSidebarTracking();
  initStickyCards();

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

  // 11. Lenis smooth scroll
  initLenis();

  // 12. Split-text hero reveal
  initSplitTextReveal();

  // 13. Magnetic buttons
  initMagneticButtons();

  // 14. Character scramble on nav
  initCharScramble();

  // 15. Cursor spotlight on cards
  initCursorSpotlight();

  // 16. Audio micro-sounds
  initAudio();
}

document.addEventListener('DOMContentLoaded', boot);


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
    playClick();
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
        playClick();
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
    playPop();
    // Show all items
    list.querySelectorAll('.cmd-item').forEach((item) => {
      item.style.display = '';
    });
  }

  function closePalette() {
    palette.classList.remove('open');
  }
}


/* ── Lenis Smooth Scroll ───────────────────────────────────────── */
/* Disabled: native CSS scroll-behavior: smooth (in base.css) feels
   more natural for a content-heavy portfolio. Lenis overrides
   trackpad/mouse physics which can feel wrong on many devices.
   The lib is still loaded — re-enable by uncommenting if desired. */

function initLenis() {
  // Intentionally disabled — using native smooth scroll instead.
  // To re-enable: remove the early return below.
  return;

  /* eslint-disable no-unreachable */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (typeof Lenis === 'undefined') return;

  const lenis = new Lenis({
    duration: 1.0,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    touchMultiplier: 1.0,
    wheelMultiplier: 1.0,
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  window.__lenis = lenis;
  /* eslint-enable no-unreachable */
}


/* ── Split-Text Hero Reveal ────────────────────────────────────── */
/* Refined: snappier 40ms stagger, subtle scale growth on reveal */

function initSplitTextReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const headline = document.querySelector('.hero-headline');
  if (!headline) return;

  // Get the raw HTML and split while preserving tags
  const html = headline.innerHTML;

  // Split into lines by <br> tags
  const lines = html.split(/<br\s*\/?>/i);

  let wordIndex = 0; // Global index for stagger timing across all lines

  headline.innerHTML = lines.map((line) => {
    // Split line into words, preserving HTML tags
    const words = line.trim().split(/(\s+)/).filter(Boolean);
    const wrappedWords = words.map((word) => {
      if (/^\s+$/.test(word)) return word; // preserve spaces
      const delay = wordIndex * 0.04; // 40ms stagger — snappier than 60ms
      wordIndex++;
      return `<span class="split-word" style="transition-delay: ${delay}s">${word}</span>`;
    }).join('');
    return `<span class="split-line">${wrappedWords}</span>`;
  }).join('<br>');

  // Trigger reveal after a short delay for paint
  requestAnimationFrame(() => {
    setTimeout(() => {
      headline.querySelectorAll('.split-word').forEach((word) => {
        word.classList.add('revealed');
      });
    }, 150);
  });
}


/* ── Magnetic Buttons ──────────────────────────────────────────── */
/* Refined spring physics: smooth lerp approach + animated spring-back */

function initMagneticButtons() {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('.magnetic').forEach((btn) => {
    const strength = 0.3;       // How strongly the button follows cursor (0–1)
    const lerpFactor = 0.15;    // Smoothing factor for approach (lower = smoother)
    const returnSpeed = 0.12;   // Smoothing factor for spring-back
    const activationPadding = 40; // Extra px around the button that activates the effect

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let isHovering = false;
    let rafId = null;

    function lerp(start, end, factor) {
      return start + (end - start) * factor;
    }

    function animate() {
      const factor = isHovering ? lerpFactor : returnSpeed;
      currentX = lerp(currentX, targetX, factor);
      currentY = lerp(currentY, targetY, factor);

      // Stop animating when close enough to target (< 0.1px)
      if (Math.abs(currentX - targetX) < 0.1 && Math.abs(currentY - targetY) < 0.1) {
        currentX = targetX;
        currentY = targetY;
        btn.style.transform = currentX === 0 && currentY === 0
          ? ''
          : `translate(${currentX}px, ${currentY}px)`;
        rafId = null;
        return;
      }

      btn.style.transform = `translate(${currentX}px, ${currentY}px)`;
      rafId = requestAnimationFrame(animate);
    }

    function startAnimation() {
      if (!rafId) {
        rafId = requestAnimationFrame(animate);
      }
    }

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Check if cursor is within activation zone
      const distX = Math.abs(e.clientX - centerX) - rect.width / 2;
      const distY = Math.abs(e.clientY - centerY) - rect.height / 2;
      const isInRange = distX < activationPadding && distY < activationPadding;

      if (isInRange) {
        isHovering = true;
        targetX = (e.clientX - centerX) * strength;
        targetY = (e.clientY - centerY) * strength;
        startAnimation();
      }
    });

    btn.addEventListener('mouseleave', () => {
      isHovering = false;
      targetX = 0;
      targetY = 0;
      startAnimation(); // Animate back to origin
    });
  });
}


/* ── Character Scramble on Nav Links ───────────────────────────── */

function initCharScramble() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach((link) => {
    const original = link.textContent;
    let interval = null;

    link.addEventListener('mouseenter', () => {
      let iteration = 0;
      link.classList.add('scrambling');

      clearInterval(interval);
      interval = setInterval(() => {
        link.textContent = original
          .split('')
          .map((char, i) => {
            if (i < iteration) return original[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');

        iteration += 1 / 2; // Speed: resolves 1 char every 2 frames

        if (iteration >= original.length) {
          clearInterval(interval);
          link.textContent = original;
          link.classList.remove('scrambling');
        }
      }, 30);
    });

    link.addEventListener('mouseleave', () => {
      clearInterval(interval);
      link.textContent = original;
      link.classList.remove('scrambling');
    });
  });
}


/* ── Cursor Spotlight on Cards ─────────────────────────────────── */

function initCursorSpotlight() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  document.addEventListener('mousemove', (e) => {
    const card = e.target.closest('.spotlight-card');
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
}
