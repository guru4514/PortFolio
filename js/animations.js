/* ═══════════════════════════════════════════════════════════════
   ANIMATIONS — Scroll reveals, counters, stat rings, sidebar
   ═══════════════════════════════════════════════════════════════ */

/**
 * Initialize IntersectionObserver-based scroll reveal animations
 */
export function initRevealAnimations() {
  // Skip all animation setup if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Make everything visible immediately
    document.querySelectorAll('.reveal, .ticker-item, .t-entry').forEach((el) => {
      el.classList.add('visible');
    });
    return;
  }

  // General reveal observer
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal, .ticker-item, .t-entry').forEach((el) => {
    revealObserver.observe(el);
  });

  // Stagger ticker items
  document.querySelectorAll('.ticker-item').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.08}s`;
  });

  // Stagger timeline entries
  document.querySelectorAll('.t-entry').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.06}s`;
  });
}


/**
 * Initialize animated number counters for stat elements
 */
export function initCounters() {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = parseFloat(el.dataset.target);
        const decimals = target % 1 !== 0 ? 1 : 0;
        const duration = 1400; // ms
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          // Ease out cubic
          const ease = 1 - Math.pow(1 - progress, 3);
          el.textContent = (target * ease).toFixed(decimals);

          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            el.textContent = target % 1 !== 0 ? target.toFixed(1) : String(target);
          }
        }

        requestAnimationFrame(tick);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );

  document.querySelectorAll('[data-target]').forEach((el) => {
    // Only animate elements with numeric targets (skip command palette items etc.)
    if (!isNaN(parseFloat(el.dataset.target))) {
      counterObserver.observe(el);
    }
  });
}


/**
 * Initialize SVG stat ring animations
 * Animates stroke-dashoffset when ring scrolls into view
 */
export function initStatRings() {
  const circumference = 2 * Math.PI * 45; // radius = 45

  const ringObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const ring = entry.target;
        const percent = parseFloat(ring.dataset.percent) || 0;
        const fill = ring.querySelector('.stat-ring__fill');

        if (fill) {
          const offset = circumference * (1 - percent / 100);
          fill.style.strokeDashoffset = offset;
        }

        ringObserver.unobserve(ring);
      });
    },
    { threshold: 0.4 }
  );

  document.querySelectorAll('.stat-ring').forEach((el) => {
    ringObserver.observe(el);
  });
}


/**
 * Initialize sidebar active section tracking
 */
export function initSidebarTracking() {
  const SECTIONS = ['hero', 'about', 'skills', 'projects', 'journey', 'thoughts', 'contact'];

  function updateSideNav() {
    const mid = window.scrollY + window.innerHeight * 0.45;

    SECTIONS.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;

      const link = document.querySelector(`[data-section="${id}"]`);
      if (!link) return;

      if (mid >= section.offsetTop && mid < section.offsetTop + section.offsetHeight) {
        document.querySelectorAll('.nav-roman').forEach((l) => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateSideNav, { passive: true });
  // Run once on load
  updateSideNav();
}


/**
 * Initialize sticky card stacking effect for project cards
 * Cards get scale dampening as they stack
 */
export function initStickyCards() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  
  const cards = document.querySelectorAll('.project-card');
  if (!cards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const card = entry.target;
        const idx = Array.from(cards).indexOf(card);
        
        if (!entry.isIntersecting) {
          // Card hasn't entered viewport yet — don't mark it as stacked
          return;
        }

        if (entry.intersectionRatio < 0.85) {
          // Card is being covered — scale it down slightly
          const scale = 0.98 - (0.02 * idx);
          card.style.setProperty('--stack-scale', Math.max(scale, 0.92));
          card.classList.add('stacked');
        } else {
          card.style.removeProperty('--stack-scale');
          card.classList.remove('stacked');
        }
      });
    },
    { threshold: [0.1, 0.5, 0.85, 1.0] }
  );

  cards.forEach((card) => observer.observe(card));
}

