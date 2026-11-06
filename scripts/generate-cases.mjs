import { mkdir, writeFile } from 'node:fs/promises';
import { cases } from '../data/case-studies.mjs';

const origin = 'https://gururaj-portfolio-roan.vercel.app';
const escape = text => String(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const themeControl = `<button class="theme-toggle" type="button" aria-label="Switch to light theme" aria-pressed="false" hidden><svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg></button>`;
export const viewer = `<dialog id="image-viewer" class="image-viewer" aria-label="Project screenshot viewer"><div class="viewer-toolbar"><span class="mono">PROJECT GALLERY</span><button type="button" class="viewer-close" aria-label="Close screenshot viewer">Close <span aria-hidden="true">×</span></button></div><div class="viewer-stage"></div><div class="viewer-footer"><button type="button" class="viewer-prev" aria-label="Previous screenshot">←</button><p class="viewer-caption" aria-live="polite"></p><button type="button" class="viewer-next" aria-label="Next screenshot">→</button></div></dialog>`;

await mkdir('work', { recursive: true });
for (const [index, project] of cases.entries()) {
  const next = cases[(index + 1) % cases.length];
  const url = `${origin}/work/${project.slug}.html`;
  const data = { '@context': 'https://schema.org', '@type': 'WebPage', name: project.title, description: project.intro, url, author: { '@type': 'Person', name: 'Gururaj B Kandagal', url: origin }, about: { '@type': 'SoftwareSourceCode', name: project.title, codeRepository: project.repo } };
  const html = `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="dark light">
  <meta name="theme-color" content="#101513">
  <title>${escape(project.title)} — Engineering case study · Gururaj B Kandagal</title>
  <meta name="description" content="${escape(project.intro)}">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${escape(project.title)} — Behind the build">
  <meta property="og:description" content="${escape(project.intro)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${origin}/assets/social-card.png">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&amp;family=DM+Serif+Display:ital@0;1&amp;family=IBM+Plex+Mono:wght@400;500&amp;display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" href="../css/experience.css">
  <script src="../js/theme.js"></script>
  <script type="module" src="../js/app.js"></script>
  <script type="application/ld+json">${JSON.stringify(data).replaceAll('<', '\\u003c')}</script>
</head>
<body class="case-page case-${project.slug}">
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="reading-progress" aria-hidden="true"></div>
  <header class="site-header"><div class="nav-shell wrap">
    <a class="wordmark" href="../index.html" aria-label="Gururaj, home">gk<span>.</span></a>
    <nav id="navigation" aria-label="Main navigation"><a href="../index.html#projects">All work <span>04</span></a><a href="../index.html#about">About</a><a href="../index.html#contact">Contact</a></nav>
    <div class="nav-actions">${themeControl}<a class="nav-resume" href="../assets/resume.pdf" target="_blank" rel="noopener">Résumé ↗</a><button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="navigation" hidden><span></span><span></span></button></div>
  </div></header>
  <main id="main">
    <section class="case-hero wrap">
      <a class="case-back" href="../index.html#${project.slug}">← Back to selected work</a>
      <div class="case-title-row"><p class="eyebrow"><span>${project.number} /</span> ${escape(project.category.toUpperCase())}</p><span class="case-status">${escape(project.status)}</span></div>
      <p class="case-project-name">${escape(project.title)}</p>
      <h1>${project.headline}</h1>
      <div class="case-intro-row"><p>${escape(project.intro)}</p><div class="case-hero-actions"><a class="button button-primary" href="${project.repo}" target="_blank" rel="noopener">Explore the code <span aria-hidden="true">↗</span></a>${project.demo ? `<a class="text-link" href="${project.demo}" target="_blank" rel="noopener">Visit project <span aria-hidden="true">↗</span></a>` : `<a class="text-link" href="${project.repo}#readme" target="_blank" rel="noopener">Setup instructions <span aria-hidden="true">↗</span></a>`}</div></div>
      <div class="case-facts"><div><span>PROJECT FOCUS</span><p>${escape(project.category)}</p></div><div><span>BUILT WITH</span><p>${project.stack.map(escape).join(' · ')}</p></div><div><span>INSIDE THIS STORY</span><p>Problem · Architecture · Decisions</p></div></div>
    </section>
    <div class="case-layout wrap">
      <aside class="case-toc" aria-label="Case study sections"><span class="mono">IN THIS CASE STUDY</span><a href="#context">01 &nbsp; The context</a><a href="#architecture">02 &nbsp; How it works</a><a href="#decisions">03 &nbsp; The decisions</a><a href="#gallery">04 &nbsp; The interface</a><a href="#evidence">05 &nbsp; Explore the source</a><a href="#reflection">06 &nbsp; Scope &amp; next steps</a></aside>
      <div class="case-content">
        <section id="context" class="case-section"><p class="eyebrow">01 / THE CONTEXT</p><h2>A problem worth<br><em>working through.</em></h2><div class="case-problem"><h3>The problem</h3><p>${escape(project.problem)}</p></div><div class="case-problem"><h3>The approach</h3><p>${escape(project.approach)}</p></div></section>
        <section id="architecture" class="case-section"><p class="eyebrow">02 / HOW IT WORKS</p><h2>${escape(project.flowTitle)}</h2><p class="flow-instruction">Follow the path through the application.</p><div class="architecture-explorer"><ol class="flow-steps">${project.flow.map((step, i) => `<li><button type="button" data-flow-step="${i}" aria-controls="flow-panel-${i}" aria-expanded="true"><span class="flow-number">0${i + 1}</span><span><strong>${escape(step[0])}</strong><small>${escape(step[1])}</small></span><span class="flow-arrow" aria-hidden="true">↗</span></button></li>`).join('')}</ol><div class="flow-panels">${project.flow.map((step, i) => `<section id="flow-panel-${i}" class="flow-panel"><span class="mono">STEP 0${i + 1} / 04</span><h3>${escape(step[0])}</h3><p>${escape(step[2])}</p></section>`).join('')}</div></div></section>
        <section id="decisions" class="case-section"><p class="eyebrow">03 / THE DECISIONS</p><h2>The choices<br><em>inside the code.</em></h2><div class="decision-list">${project.decisions.map((decision, i) => `<article class="decision"><span class="decision-number">0${i + 1}</span><div><h3>${escape(decision.title)}</h3><p>${escape(decision.body)}</p><div class="tradeoff"><span>THE TRADEOFF</span><p>${escape(decision.tradeoff)}</p></div></div></article>`).join('')}</div></section>
        <section id="gallery" class="case-section"><p class="eyebrow">04 / THE INTERFACE</p><h2>A closer <em>look.</em></h2><p class="gallery-note">Actual project screenshots. Select an image to inspect it.</p><div class="case-gallery ${project.images.length === 1 ? 'gallery-single' : ''}">${project.images.map((asset, i) => `<figure><a class="gallery-image" data-viewer-group="${project.slug}" data-caption="${escape(asset.caption)}" href="../assets/projects/${asset.src}" aria-label="Enlarge ${escape(asset.caption)}"><img src="../assets/projects/${asset.src}" alt="${escape(asset.alt)}" width="${asset.width}" height="${asset.height}" loading="lazy"><span class="image-expand" aria-hidden="true">↗</span></a><figcaption><span>0${i + 1}</span> ${escape(asset.caption)}</figcaption></figure>`).join('')}</div></section>
        <section id="evidence" class="case-section"><p class="eyebrow">05 / EXPLORE THE SOURCE</p><h2>See the <em>implementation.</em></h2><div class="source-list">${project.evidence.map(([label, path, description]) => `<a href="${project.repo}/blob/main/${path}" target="_blank" rel="noopener"><div><h3>${escape(label)}</h3><p>${escape(description)}</p><code>${escape(path)}</code></div><span aria-hidden="true">↗</span></a>`).join('')}</div></section>
        <section id="reflection" class="case-section"><p class="eyebrow">06 / SCOPE &amp; NEXT STEPS</p><h2>Good engineering<br>leaves room to <em>improve.</em></h2><p>${escape(project.boundaries)}</p><div class="next-evidence"><span class="mono">WHAT WOULD MAKE IT STRONGER</span><p>${escape(project.next)}</p></div><a class="text-link" href="mailto:gurubk321@gmail.com?subject=${encodeURIComponent(`Let's talk about ${project.title}`)}">Discuss this project <span aria-hidden="true">↗</span></a></section>
      </div>
    </div>
    <a class="next-project wrap" href="${next.slug}.html"><div><p class="eyebrow">NEXT CASE STUDY / ${next.number}</p><h2>${escape(next.title)}</h2></div><span aria-hidden="true">↗</span></a>
  </main>
  <footer class="wrap site-footer"><a class="wordmark" href="../index.html" aria-label="Gururaj, home">gk<span>.</span></a><p>© <span id="year">2026</span> Gururaj B Kandagal</p><a class="back-top" href="../index.html#contact">Let’s talk ↗</a></footer>
  ${viewer}
</body>
</html>`;
  await writeFile(`work/${project.slug}.html`, html);
}
await writeFile('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[`${origin}/`, ...cases.map(item => `${origin}/work/${item.slug}.html`)].map(url => `  <url><loc>${url}</loc></url>`).join('\n')}\n</urlset>\n`);
console.log(`Generated ${cases.length} static project case studies and sitemap.`);
