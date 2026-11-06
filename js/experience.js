const spotlights = {
  pigmie: { title: 'Pigmie', category: 'OFFLINE STORAGE / SHARED WORKFLOWS', image: 'pigmie-current.webp', width: 877, height: 906, description: 'A finance ledger with local records, team permissions, and an Android target.' },
  talentrank: { title: 'TalentRank Studio', category: 'APPLIED NLP / EXPLAINABLE SCORING', image: 'talentrank.webp', width: 1376, height: 1079, description: 'Resume analysis that brings skill matches, gaps, and scoring evidence into view.' },
  drowseguard: { title: 'DrowseGuard', category: 'COMPUTER VISION / LIVE SIGNALS', image: 'drowsiness-alert.webp', width: 440, height: 636, description: 'A webcam pipeline that turns facial geometry into a visible detector state.' },
};

export function initExperiences() {
  initSpotlight();
  initViewer();
  initArchitecture();
  initReadingProgress();
  initCaseNavigation();
  initEntranceMotion();
}

function initSpotlight() {
  const tabs = document.querySelector('.spotlight-tabs');
  if (!tabs) return;
  tabs.hidden = false;
  const buttons = [...tabs.querySelectorAll('[data-spotlight]')];
  function select(button, focus = false) {
    const key = button.dataset.spotlight;
    const project = spotlights[key];
    if (!project) return;
    buttons.forEach(tab => {
      const active = tab === button;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    const panel = document.getElementById('spotlight-panel');
    panel.setAttribute('aria-labelledby', button.id);
    const image = document.getElementById('spotlight-image');
    image.src = `assets/projects/${project.image}`;
    image.alt = `${project.title} project interface`;
    image.width = project.width;
    image.height = project.height;
    image.style.objectPosition = key === 'talentrank' ? 'center 30%' : 'center top';
    const imageLink = document.getElementById('spotlight-image-link');
    imageLink.href = image.src;
    imageLink.dataset.caption = `${project.title} · project interface`;
    imageLink.setAttribute('aria-label', `Enlarge ${project.title} project screenshot`);
    document.getElementById('spotlight-category').textContent = project.category;
    const title = document.getElementById('spotlight-title');
    title.textContent = project.title;
    const dot = document.createElement('span');
    dot.textContent = '.';
    title.append(dot);
    document.getElementById('spotlight-description').textContent = project.description;
    const link = document.getElementById('spotlight-case-link');
    link.href = `work/${key}.html`;
    link.setAttribute('aria-label', `Read the ${project.title} case study`);
    document.querySelector('.spotlight-counter').textContent = `0${buttons.indexOf(button) + 1} / 03`;
    if (focus) button.focus();
  }
  tabs.addEventListener('click', event => {
    const button = event.target.closest('[data-spotlight]');
    if (button) select(button);
  });
  tabs.addEventListener('keydown', event => {
    const index = buttons.indexOf(document.activeElement);
    if (index < 0) return;
    const keys = { ArrowRight: (index + 1) % buttons.length, ArrowLeft: (index + buttons.length - 1) % buttons.length, Home: 0, End: buttons.length - 1 };
    if (event.key in keys) {
      event.preventDefault();
      select(buttons[keys[event.key]], true);
    }
  });
}

function initViewer() {
  const dialog = document.getElementById('image-viewer');
  if (!dialog || !dialog.showModal) return;
  const stage = dialog.querySelector('.viewer-stage');
  const caption = dialog.querySelector('.viewer-caption');
  const previous = dialog.querySelector('.viewer-prev');
  const next = dialog.querySelector('.viewer-next');
  let links = [];
  let current = 0;
  let opener;
  let originalOverflow = '';
  function render() {
    const focusedControl = document.activeElement;
    const link = links[current];
    const image = new Image();
    image.src = link.href;
    image.alt = link.querySelector('img')?.alt || link.dataset.caption || 'Project interface';
    stage.replaceChildren(image);
    caption.textContent = `${current + 1} / ${links.length} — ${link.dataset.caption || image.alt}`;
    previous.disabled = current === 0;
    next.disabled = current === links.length - 1;
    if (focusedControl === next && next.disabled && !previous.disabled) previous.focus();
    else if (focusedControl === previous && previous.disabled && !next.disabled) next.focus();
  }
  document.addEventListener('click', event => {
    const link = event.target.closest('a[data-viewer-group]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    links = [...document.querySelectorAll('a[data-viewer-group]')].filter(item => item.dataset.viewerGroup === link.dataset.viewerGroup);
    current = links.indexOf(link);
    opener = link;
    render();
    originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
  });
  function move(delta) {
    const index = current + delta;
    if (index >= 0 && index < links.length) { current = index; render(); }
  }
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  dialog.querySelector('.viewer-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    }
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = originalOverflow;
    stage.replaceChildren();
    opener?.focus({ preventScroll: true });
  });
}

function initArchitecture() {
  for (const explorer of document.querySelectorAll('.architecture-explorer')) {
    const buttons = [...explorer.querySelectorAll('[data-flow-step]')];
    function activate(button) {
      for (const item of buttons) {
        const active = item === button;
        item.setAttribute('aria-expanded', String(active));
        document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
      }
    }
    buttons.forEach(button => button.addEventListener('click', () => activate(button)));
    activate(buttons[0]);
  }
}

function initReadingProgress() {
  const bar = document.querySelector('.reading-progress');
  if (!bar) return;
  let pending = false;
  function update() {
    const available = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${available > 0 ? Math.max(0, Math.min(1, scrollY / available)) : 0})`;
    pending = false;
  }
  function schedule() { if (!pending) { pending = true; requestAnimationFrame(update); } }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  update();
}

function initCaseNavigation() {
  if (!('IntersectionObserver' in window)) return;
  const links = [...document.querySelectorAll('.case-toc a')];
  if (!links.length) return;
  const observer = new IntersectionObserver(entries => {
    const visible = entries.find(entry => entry.isIntersecting);
    if (!visible) return;
    links.forEach(link => {
      if (link.hash === `#${visible.target.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-15% 0px -65% 0px' });
  links.forEach(link => { const section = document.querySelector(link.hash); if (section) observer.observe(section); });
}

function initEntranceMotion() {
  // Never hide content in CSS. Animation is an optional enhancement, not a gate.
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches || !('IntersectionObserver' in window) || !Element.prototype.animate) return;
  const animations = new Set();
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      if (motion.matches) continue;
      const animation = entry.target.animate([{ opacity: .55, transform: 'translateY(15px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 500, easing: 'cubic-bezier(.2,.7,.3,1)' });
      animations.add(animation);
      animation.finished.then(() => animations.delete(animation)).catch(() => animations.delete(animation));
    }
  }, { threshold: .08 });
  document.querySelectorAll('.project,.practice-list>a,.decision,.case-hero h1').forEach(element => observer.observe(element));
  motion.addEventListener('change', () => { if (motion.matches) { observer.disconnect(); animations.forEach(animation => animation.cancel()); animations.clear(); } });
}
