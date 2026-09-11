/* ═══════════════════════════════════════════════════════════════
   AUDIO — Web Audio API micro-sounds system
   Generates short synthesized UI sound effects programmatically
   without any external audio files.
   ═══════════════════════════════════════════════════════════════ */

const STORAGE_KEY = 'sound-enabled';

let audioCtx = null;
let soundEnabled = false;
let noiseBuffer = null;

/**
 * Lazily retrieve or instantiate the AudioContext upon user gesture
 * @returns {AudioContext|null}
 */
function getAudioContext() {
  if (typeof window === 'undefined') return null;

  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }

  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }

  return audioCtx;
}

/**
 * Check if sound effects are currently enabled.
 * Automatically disabled if user prefers reduced motion.
 * @returns {boolean}
 */
export function isSoundEnabled() {
  if (typeof window === 'undefined') return false;

  // Respect prefers-reduced-motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return false;
  }

  return soundEnabled;
}

/**
 * Update the sound toggle button attributes and icons
 * @param {boolean} enabled
 */
function updateToggleUI(enabled) {
  const toggleBtn = document.getElementById('sound-toggle');
  if (!toggleBtn) return;

  toggleBtn.setAttribute('aria-pressed', enabled ? 'true' : 'false');
  const onIcon = toggleBtn.querySelector('.sound-on');
  const offIcon = toggleBtn.querySelector('.sound-off');

  if (onIcon) onIcon.style.display = enabled ? 'inline' : 'none';
  if (offIcon) offIcon.style.display = enabled ? 'none' : 'inline';
}

/**
 * Initialize audio system, preferences, and toggle button
 */
export function initAudio() {
  const toggleBtn = document.getElementById('sound-toggle');
  const motionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

  // Read stored preference (default 'false')
  const saved = localStorage.getItem(STORAGE_KEY);
  soundEnabled = saved === 'true';

  // Check reduced motion preference
  if (motionQuery && motionQuery.matches) {
    soundEnabled = false;
    if (toggleBtn) toggleBtn.style.display = 'none';
  } else {
    updateToggleUI(soundEnabled);
  }

  // React to reduced motion setting changes
  if (motionQuery) {
    motionQuery.addEventListener('change', (e) => {
      if (e.matches) {
        soundEnabled = false;
        if (toggleBtn) toggleBtn.style.display = 'none';
        updateToggleUI(false);
      } else {
        if (toggleBtn) toggleBtn.style.display = '';
        soundEnabled = localStorage.getItem(STORAGE_KEY) === 'true';
        updateToggleUI(soundEnabled);
      }
    });
  }

  // Toggle button click listener
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      try {
        localStorage.setItem(STORAGE_KEY, String(soundEnabled));
      } catch {
        // Handle localStorage quota or permission error
      }
      updateToggleUI(soundEnabled);

      if (soundEnabled) {
        getAudioContext();
        playClick();
      }
    });
  }

  // Setup lazy AudioContext creation on first user interaction gesture
  const unlockAudio = () => {
    if (isSoundEnabled()) {
      getAudioContext();
    }
    window.removeEventListener('click', unlockAudio);
    window.removeEventListener('keydown', unlockAudio);
    window.removeEventListener('touchstart', unlockAudio);
    window.removeEventListener('pointerdown', unlockAudio);
  };

  window.addEventListener('click', unlockAudio, { passive: true, once: true });
  window.addEventListener('keydown', unlockAudio, { passive: true, once: true });
  window.addEventListener('touchstart', unlockAudio, { passive: true, once: true });
  window.addEventListener('pointerdown', unlockAudio, { passive: true, once: true });
}

/**
 * Soft switch click: ~80ms, sine wave 800Hz, fast decay
 */
export function playClick() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, now);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(0.10, now + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.08);

  osc.onended = () => {
    osc.disconnect();
    gain.disconnect();
  };
}

/**
 * Soft pop: ~60ms, sine wave 400Hz→200Hz frequency sweep, fast decay
 */
export function playPop() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(400, now);
  osc.frequency.exponentialRampToValueAtTime(200, now + 0.06);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(0.12, now + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.06);

  osc.onended = () => {
    osc.disconnect();
    gain.disconnect();
  };
}

/**
 * Typewriter bell: ~120ms, sine wave 1200Hz, medium decay
 */
export function playBell() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(1200, now);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(0.10, now + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.12);

  osc.onended = () => {
    osc.disconnect();
    gain.disconnect();
  };
}

/**
 * Generate or get cached white noise buffer for keystroke
 * @param {AudioContext} ctx
 * @returns {AudioBuffer}
 */
function getNoiseBuffer(ctx) {
  if (noiseBuffer && noiseBuffer.sampleRate === ctx.sampleRate) {
    return noiseBuffer;
  }
  const bufferSize = Math.floor(ctx.sampleRate * 0.05); // ~50ms
  noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const channelData = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    channelData[i] = Math.random() * 2 - 1;
  }
  return noiseBuffer;
}

/**
 * Soft keystroke: ~50ms, white noise burst, very fast decay
 */
export function playKeystroke() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const buffer = getNoiseBuffer(ctx);

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1000, now);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);
  noise.stop(now + 0.05);

  noise.onended = () => {
    noise.disconnect();
    filter.disconnect();
    gain.disconnect();
  };
}
