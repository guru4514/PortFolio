// Establish the enhanced header layout before first paint; restore navigation if the module fails.
document.documentElement.classList.add('js-ready');
window.portfolioEnhancementFallback = setTimeout(() => {
  document.documentElement.classList.remove('js-ready');
}, 5000);
// Apply a saved preference before paint; keep working if storage is unavailable.
try {
  const theme = localStorage.getItem('gk-theme');
  if (theme === 'light' || theme === 'dark') document.documentElement.dataset.theme = theme;
} catch { /* Default dark theme. */ }
