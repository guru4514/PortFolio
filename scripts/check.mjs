import { readFile, access } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { resolve, dirname } from 'node:path';
import { cases } from '../data/case-studies.mjs';

const pages = ['index.html', '404.html', ...cases.map(project => `work/${project.slug}.html`)];
const cache = new Map();
const getHtml = async path => {
  const fullPath = resolve(path);
  if (!cache.has(fullPath)) cache.set(fullPath, await readFile(fullPath, 'utf8'));
  return cache.get(fullPath);
};
let assetCount = 0;
for (const page of pages) {
  const html = await getHtml(page);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, new Set(ids).size, `${page}: duplicate ids`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${page}: use one primary heading`);
  const localFiles = new Set();
  for (const [, raw] of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
    if (/^(?:https?:|mailto:|tel:)/.test(raw)) continue;
    const [filePart, fragment] = raw.split('#');
    const cleanPath = decodeURIComponent(filePart.split('?')[0]);
    const file = filePart ? (cleanPath.startsWith('/') ? resolve('.' + cleanPath) : resolve(dirname(page), cleanPath)) : resolve(page);
    if (filePart) localFiles.add(file);
    if (fragment) {
      const destination = file === resolve(page) ? html : await getHtml(cleanPath === '/' ? resolve('index.html') : file);
      assert(destination.includes(`id="${decodeURIComponent(fragment)}"`), `${page}: broken fragment ${raw}`);
    }
  }
  for (const path of localFiles) await access(path);
  assetCount += localFiles.size;
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    assert(/\balt="[^"]*"/.test(tag), `${page}: image needs an alt attribute`);
    assert(/\bwidth="\d+"/.test(tag) && /\bheight="\d+"/.test(tag), `${page}: image needs dimensions`);
  }
  for (const [tag] of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) assert(/\brel="[^"]*noopener/.test(tag), `${page}: external tab needs noopener`);
  if (page === '404.html') assert(html.includes('name="robots" content="noindex"'), 'Keep the error page out of search');
  else JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert(!html.includes('gururajkandagal.dev'), 'Use the verified deployment domain');
  assert(!/Play Store|December 2026|upcoming app/i.test(html), 'The unannounced application must stay out of public pages');
  for (const [, target] of html.matchAll(/aria-controls="([^"]+)"/g)) assert(ids.includes(target), `${page}: missing controlled element ${target}`);
}
const home = await getHtml('index.html');
assert.equal((home.match(/name="access_key"/g) || []).length, 1, 'Form key must occur once');
assert.equal((home.match(/class="project(?: |")/g) || []).length, 4, 'Keep four static public projects');
console.log(`Checked ${pages.length} pages, ${assetCount} local references, cross-page anchors, metadata, images, and disclosure scope.`);
