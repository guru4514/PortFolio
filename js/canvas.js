/* ═══════════════════════════════════════════════════════════════
   CANVAS — Neural network particle animation (optimized)
   ═══════════════════════════════════════════════════════════════ */

import { getTheme } from './theme.js';

/**
 * Initialize the neural network canvas animation
 * Pauses when tab is hidden to save resources
 */
export function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;

  // Skip animation for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    drawStaticNodes(canvas);
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let W, H;
  let nodes = [];
  let mouseX = 0, mouseY = 0;
  let animationId = null;
  let isVisible = true;

  const CONNECTION_DISTANCE = 120;
  const NODE_COUNT_FACTOR = 10000; // Higher = fewer nodes

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    W = canvas.width = rect.width;
    H = canvas.height = rect.height;
  }

  function createNodes() {
    nodes = [];
    const count = Math.max(15, Math.floor((W * H) / NODE_COUNT_FACTOR));

    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 0.8,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  function draw() {
    if (!isVisible) return;

    ctx.clearRect(0, 0, W, H);

    // Background matches theme
    const isDark = getTheme() === 'dark';
    ctx.fillStyle = isDark ? '#09090b' : '#fafaf9';
    ctx.fillRect(0, 0, W, H);

    // Update positions
    for (const n of nodes) {
      n.x += n.vx + (mouseX / W - 0.5) * 0.08;
      n.y += n.vy + (mouseY / H - 0.5) * 0.08;
      n.phase += 0.015;

      // Wrap around edges
      if (n.x < -5) n.x = W + 5;
      if (n.x > W + 5) n.x = -5;
      if (n.y < -5) n.y = H + 5;
      if (n.y > H + 5) n.y = -5;
    }

    // Draw connections
    const accentR = 99, accentG = 102, accentB = 241; // --accent color

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        const dist = Math.hypot(dx, dy);

        if (dist < CONNECTION_DISTANCE) {
          const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.2;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(${accentR},${accentG},${accentB},${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    for (const n of nodes) {
      const alpha = 0.4 + 0.5 * Math.sin(n.phase);
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${accentR},${accentG},${accentB},${alpha})`;
      ctx.fill();
    }

    animationId = requestAnimationFrame(draw);
  }

  // Mouse interaction
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  // Visibility handling — pause when tab is hidden
  document.addEventListener('visibilitychange', () => {
    isVisible = !document.hidden;
    if (isVisible && !animationId) {
      animationId = requestAnimationFrame(draw);
    }
  });

  // Resize handling
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      createNodes();
    }, 150);
  });

  // Init
  resize();
  createNodes();
  animationId = requestAnimationFrame(draw);
}

/**
 * Draw static nodes (no animation) for reduced-motion users
 */
function drawStaticNodes(canvas) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const rect = canvas.parentElement.getBoundingClientRect();
  const W = canvas.width = rect.width;
  const H = canvas.height = rect.height;

  const isDark = getTheme() === 'dark';
  ctx.fillStyle = isDark ? '#09090b' : '#fafaf9';
  ctx.fillRect(0, 0, W, H);

  const count = Math.max(12, Math.floor((W * H) / 12000));
  const nodes = [];

  for (let i = 0; i < count; i++) {
    nodes.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 1,
    });
  }

  // Draw connections
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dist = Math.hypot(nodes[j].x - nodes[i].x, nodes[j].y - nodes[i].y);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = `rgba(99,102,241,${(1 - dist / 120) * 0.15})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }

  // Draw nodes
  for (const n of nodes) {
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(99,102,241,0.5)';
    ctx.fill();
  }
}
