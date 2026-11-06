import { mkdir, copyFile, rm, lstat, readdir } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import assert from 'node:assert/strict';

// Deliberate allowlist: local resumes, research notes, and repository files stay out.
export const publicFiles = [
  'index.html', '404.html', 'robots.txt', 'sitemap.xml', 'css/style.css', 'css/experience.css',
  'js/app.js', 'js/theme.js', 'js/form.js', 'js/experience.js', 'assets/favicon.svg',
  'assets/profile.webp', 'assets/profile.jpg', 'assets/resume.pdf', 'assets/social-card.png',
  'assets/projects/pigmie-current.webp', 'assets/projects/talentrank.webp',
  'assets/projects/drowsiness-alert.webp', 'assets/projects/drowsiness-yawn.webp',
  'assets/projects/agroconnect.webp',
  'assets/projects/pigmie-dashboard.webp', 'assets/projects/drowsiness-eyes-closing.webp',
  'work/pigmie.html', 'work/talentrank.html', 'work/drowseguard.html', 'work/agroconnect.html',
];
const root = resolve('.');
const output = resolve(root, 'dist');
assert.equal(dirname(output), root, 'Output must be directly inside the project');
assert.notEqual(output, root, 'Never remove the project root');
const existing = await lstat(output).catch(error => { if (error.code !== 'ENOENT') throw error; });
assert(!existing?.isSymbolicLink(), 'Refusing to clean a linked output directory');
await rm(output, { recursive: true, force: true });
for (const file of publicFiles) {
  const destination = resolve(output, file);
  await mkdir(dirname(destination), { recursive: true });
  await copyFile(resolve(file), destination);
}
async function listFiles(directory, prefix = '') {
  const result = [];
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const relative = prefix + item.name;
    if (item.isDirectory()) result.push(...await listFiles(join(directory, item.name), relative + '/'));
    else result.push(relative);
  }
  return result;
}
assert.deepEqual((await listFiles(output)).sort(), [...publicFiles].sort(), 'Build output must match the public allowlist');
console.log(`Built ${publicFiles.length} public files in dist/. No runtime dependencies.`);
