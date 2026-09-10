/* ═══════════════════════════════════════════════════════════════
   THEME — Dark / Light mode toggle with system preference
   ═══════════════════════════════════════════════════════════════ */

const html = document.documentElement;
const STORAGE_KEY = 'portfolio-theme';

/**
 * Initialize theme from: localStorage > system preference > default (dark)
 */
export function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    html.setAttribute('data-theme', saved);
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    html.setAttribute('data-theme', 'light');
  } else {
    html.setAttribute('data-theme', 'dark');
  }

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });
}

/**
 * Toggle between dark and light themes
 */
export function toggleTheme() {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem(STORAGE_KEY, next);
}

/**
 * Get current theme
 * @returns {'dark' | 'light'}
 */
export function getTheme() {
  return html.getAttribute('data-theme') || 'dark';
}
