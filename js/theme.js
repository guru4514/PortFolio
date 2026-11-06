// Apply a saved preference before paint; keep working if storage is unavailable.
try {
  const theme = localStorage.getItem('gk-theme');
  if (theme === 'light' || theme === 'dark') document.documentElement.dataset.theme = theme;
} catch { /* Default dark theme. */ }
