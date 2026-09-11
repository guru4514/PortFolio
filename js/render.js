/* ═══════════════════════════════════════════════════════════════
   RENDER — DOM rendering for dynamic content sections
   ═══════════════════════════════════════════════════════════════ */

import { SKILLS, TOOLS, PROJECTS, TIMELINE, THOUGHTS, CMD_PALETTE_ITEMS } from './data.js';

/**
 * Render the periodic table skills grid
 */
export function renderSkills() {
  const grid = document.getElementById('periodic-grid');
  if (!grid) return;

  SKILLS.forEach((s) => {
    const catClass = s.type === 'ml' ? 'cat-ml' : s.type === 'lang' ? 'cat-lang' : 'cat-db';

    const el = document.createElement('div');
    el.className = `element ${catClass}`;
    el.setAttribute('role', 'listitem');
    el.setAttribute('aria-label', `${s.name} — ${s.cat}`);

    el.innerHTML = `
      <div class="element-inner">
        <div class="el-front">
          <span class="el-num">${s.num}</span>
          <span class="el-symbol">${s.sym}</span>
          <span class="el-name">${s.name}</span>
          <span class="el-cat">${s.cat}</span>
        </div>
        <div class="el-back">
          ${s.tags.map((t) => `<span class="el-tag">${t}</span>`).join('')}
        </div>
      </div>`;

    grid.appendChild(el);
  });
}

/**
 * Render the tools/platforms pill grid
 */
export function renderTools() {
  const grid = document.getElementById('tools-grid');
  if (!grid) return;

  TOOLS.forEach((t) => {
    const el = document.createElement('div');
    el.className = 'tool-pill';
    el.setAttribute('role', 'listitem');
    el.innerHTML = `<span class="tool-dot ${t.dot}"></span>${t.name}`;
    grid.appendChild(el);
  });
}

/**
 * Render project cards with P-T-I layout
 */
export function renderProjects() {
  const container = document.getElementById('project-list');
  if (!container) return;

  PROJECTS.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = `project-card spotlight-card${p.flagship ? ' project-card--flagship' : ''}`;
    card.setAttribute('role', 'article');
    card.setAttribute('aria-label', p.title);

    const detailId = `detail-${i}`;

    card.innerHTML = `
      <div class="project-card__header">
        <span class="project-card__num">${p.num} /</span>
        <h3 class="project-card__title">${p.title}</h3>
        <span class="project-card__arrow" id="arrow-${i}" aria-hidden="true">↗</span>
      </div>

      ${p.images && p.images.length ? `
        <div class="project-gallery">
          ${p.images.map((src) => `<img class="project-gallery__img" src="${src}" alt="${p.title} screenshot" loading="lazy">`).join('')}
        </div>` : ''}

      <div class="pti-grid">
        <div class="pti-item">
          <div class="pti-item__label">Problem</div>
          <div class="pti-item__text">${p.problem}</div>
        </div>
        <div class="pti-item">
          <div class="pti-item__label">Approach</div>
          <div class="pti-item__text">${p.approach}</div>
        </div>
        <div class="pti-item">
          <div class="pti-item__label">Impact</div>
          <div class="pti-item__text">${p.impact}</div>
        </div>
      </div>

      <div class="project-tags">
        ${p.tags.map((t) => `<span class="tag-pill">${t}</span>`).join('')}
      </div>

      <div class="project-links">
        <a href="${p.github}" target="_blank" rel="noopener" class="project-link"
           aria-label="View ${p.title} on GitHub">
          ⌥ GitHub ↗
        </a>
        ${p.demo ? `
          <a href="${p.demo}" target="_blank" rel="noopener" class="project-link project-link--demo"
             aria-label="View ${p.title} live demo">
            ◉ Live Demo ↗
          </a>` : ''}
        <button class="project-link" aria-expanded="false"
                aria-controls="${detailId}" data-detail="${i}">
          ▸ Details
        </button>
      </div>

      <div class="project-detail" id="${detailId}" role="region"
           aria-label="${p.title} details">
        ${p.architecture ? `
          <div class="project-arch">
            <div class="project-arch__label">Architecture</div>
            <pre class="project-arch__diagram">${p.architecture}</pre>
          </div>` : ''}
        <ul>
          ${p.details.map((d) => `<li>${d}</li>`).join('')}
        </ul>
      </div>`;

    // Detail toggle
    const detailBtn = card.querySelector(`[data-detail="${i}"]`);
    if (detailBtn) {
      detailBtn.addEventListener('click', () => {
        const detail = document.getElementById(detailId);
        const arrow = document.getElementById(`arrow-${i}`);
        const isOpen = detail.classList.toggle('open');

        detailBtn.setAttribute('aria-expanded', isOpen);
        detailBtn.textContent = isOpen ? '▾ Collapse' : '▸ Details';

        if (arrow) {
          arrow.style.color = isOpen ? 'var(--accent)' : '';
        }
      });
    }

    container.appendChild(card);
  });
}

/**
 * Render the journey timeline
 */
export function renderTimeline() {
  const container = document.getElementById('timeline');
  if (!container) return;

  TIMELINE.forEach((t) => {
    const entry = document.createElement('div');
    entry.className = `t-entry${t.isNext ? ' t-entry--next' : ''}`;

    const dateHtml = t.date.replace('\n', '<br>');
    const badgeHtml = t.badge
      ? `<span class="t-badge">${t.badge}</span>`
      : '';

    entry.innerHTML = `
      <div class="t-date">${dateHtml}</div>
      <div class="t-body">
        <div class="t-role">${t.role}${badgeHtml}</div>
        <div class="t-org">${t.org}</div>
        <div class="t-desc">${t.desc}</div>
      </div>`;

    container.appendChild(entry);
  });
}

/**
 * Render the command palette items
 */
export function renderCommandPalette() {
  const list = document.getElementById('cmd-list');
  if (!list) return;

  CMD_PALETTE_ITEMS.forEach((item) => {
    const el = document.createElement('div');
    el.className = 'cmd-item';
    el.setAttribute('role', 'option');
    el.setAttribute('data-action', item.action);
    el.setAttribute('data-target', item.target || '');

    el.innerHTML = `
      <span class="cmd-item__icon">${item.icon}</span>
      <span class="cmd-item__label">${item.label}</span>`;

    list.appendChild(el);
  });
}


/**
 * Render infinite marquee tech strip
 * Content is duplicated for seamless CSS loop
 */
export function renderMarquee() {
  const track = document.getElementById('marquee-track');
  if (!track) return;

  // Combine all skill and tool names
  const names = [
    ...SKILLS.map((s) => s.name),
    ...TOOLS.map((t) => t.name),
  ];

  // Build one set of items
  function buildItems() {
    return names.map((name) => `
      <span class="marquee-item">
        <span class="marquee-dot"></span>
        ${name}
      </span>
    `).join('');
  }

  // Duplicate content for seamless infinite scroll
  track.innerHTML = buildItems() + buildItems();
}

/**
 * Render the Thoughts / blog section
 */
export function renderThoughts() {
  const grid = document.getElementById('thoughts-grid');
  if (!grid) return;

  THOUGHTS.forEach((t) => {
    const card = document.createElement('a');
    card.className = 'thought-card spotlight-card';
    card.href = t.link;
    card.target = '_blank';
    card.rel = 'noopener';
    card.setAttribute('aria-label', t.title);

    card.innerHTML = `
      <div class="thought-card__date">${t.date}</div>
      <h3 class="thought-card__title">${t.title}</h3>
      <p class="thought-card__excerpt">${t.excerpt}</p>
      <div class="thought-card__tags">
        ${t.tags.map((tag) => `<span class="tag-pill">${tag}</span>`).join('')}
      </div>
      <span class="thought-card__read">Read on GitHub ↗</span>`;

    grid.appendChild(card);
  });
}
