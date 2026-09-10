/* ═══════════════════════════════════════════════════════════════
   TERMINAL — Easter egg terminal with enhanced commands
   ═══════════════════════════════════════════════════════════════ */

import { TERM_CMDS, ASCII_BANNER } from './data.js';
import { toggleTheme } from './theme.js';

let termOverlay, termOutput, termInput;

/**
 * Initialize the terminal easter egg
 */
export function initTerminal() {
  termOverlay = document.getElementById('terminal-overlay');
  termOutput = document.getElementById('term-output');
  termInput = document.getElementById('term-input');

  if (!termOverlay || !termOutput || !termInput) return;

  // Set initial ASCII banner
  termOutput.innerHTML = ASCII_BANNER;

  // Close button
  const closeBtn = document.getElementById('term-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeTerm);
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    const tag = document.activeElement.tagName;
    const isEditing = tag === 'INPUT' || tag === 'TEXTAREA';

    // Open terminal with 'T' (when not editing)
    if ((e.key === 't' || e.key === 'T') && !isEditing && !e.ctrlKey && !e.metaKey) {
      // Don't open if command palette is open
      const cmdPalette = document.getElementById('cmd-palette');
      if (cmdPalette && cmdPalette.classList.contains('open')) return;

      openTerm();
    }

    // Close with Escape
    if (e.key === 'Escape') {
      closeTerm();
    }
  });

  // Handle command input
  termInput.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;

    const raw = termInput.value.trim();
    const cmd = raw.toLowerCase();
    termInput.value = '';

    // Echo the command
    termOutput.innerHTML += `<div><span class="t-prompt-c">guru@portfolio:~$&nbsp;</span>${escapeHtml(raw) || ''}</div>`;

    if (!cmd) return;

    // Handle commands
    if (cmd === 'clear') {
      termOutput.innerHTML = '';
      return;
    }

    if (cmd === 'exit') {
      closeTerm();
      return;
    }

    if (cmd === 'resume') {
      termOutput.innerHTML += `<div class="t-out"><br>Downloading resume...<br><br></div>`;
      const link = document.createElement('a');
      link.href = 'assets/resume.pdf';
      link.download = 'Gururaj_B_Kandagal_Resume.pdf';
      link.click();
      scrollTerminal();
      return;
    }

    if (cmd === 'theme') {
      toggleTheme();
      const current = document.documentElement.getAttribute('data-theme');
      termOutput.innerHTML += `<div class="t-out"><br>Switched to ${current} mode.<br><br></div>`;
      scrollTerminal();
      return;
    }

    if (cmd.startsWith('goto ')) {
      const target = cmd.replace('goto ', '').trim();
      const validSections = ['hero', 'about', 'skills', 'projects', 'journey', 'contact'];

      if (validSections.includes(target)) {
        closeTerm();
        setTimeout(() => {
          const el = document.getElementById(target);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 200);
        return;
      } else {
        termOutput.innerHTML += `<div class="t-out"><br>Unknown section: ${escapeHtml(target)}<br>Available: ${validSections.join(', ')}<br><br></div>`;
        scrollTerminal();
        return;
      }
    }

    // Look up in predefined commands
    if (TERM_CMDS[cmd]) {
      termOutput.innerHTML += TERM_CMDS[cmd];
    } else {
      termOutput.innerHTML += `<div class="t-out">zsh: command not found: ${escapeHtml(cmd)} (try <span style="color:#A3E635">help</span>)<br></div>`;
    }

    scrollTerminal();
  });
}

function openTerm() {
  if (!termOverlay) return;
  termOverlay.classList.add('open');
  setTimeout(() => {
    if (termInput) termInput.focus();
  }, 80);
}

function closeTerm() {
  if (!termOverlay) return;
  termOverlay.classList.remove('open');
}

function scrollTerminal() {
  if (termOutput) {
    termOutput.scrollTop = termOutput.scrollHeight;
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Programmatically open the terminal (for command palette)
 */
export function openTerminalFromExternal() {
  openTerm();
}
