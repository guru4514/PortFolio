import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, copyFile, writeFile, access, rm, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

test('a production build removes stale output and keeps local drafts outside the bundle', async () => {
  const fixture = await mkdtemp(join(tmpdir(), 'portfolio-build-'));
  // Exercise the real build in an isolated fixture with small stand-in assets.
  const source = await readFile(new URL('../scripts/build.mjs', import.meta.url), 'utf8');
  const list = source.match(/export const publicFiles = \[([\s\S]*?)\];/)[1];
  const files = [...list.matchAll(/'([^']+)'/g)].map(match => match[1]);
  try {
    for (const file of files) {
      await mkdir(dirname(join(fixture, file)), { recursive: true });
      await writeFile(join(fixture, file), 'public fixture');
    }
    await writeFile(join(fixture, 'assets', 'private-draft.docx'), 'local draft');
    await mkdir(join(fixture, 'dist', 'old'), { recursive: true });
    await writeFile(join(fixture, 'dist', 'old', 'removed.html'), 'stale output');
    await copyFile(new URL('../scripts/build.mjs', import.meta.url), join(fixture, 'build.mjs'));
    const result = spawnSync(process.execPath, ['build.mjs'], { cwd: fixture, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    await assert.rejects(access(join(fixture, 'dist', 'old', 'removed.html')), { code: 'ENOENT' });
    await assert.rejects(access(join(fixture, 'dist', 'assets', 'private-draft.docx')), { code: 'ENOENT' });
    assert.equal(await readFile(join(fixture, 'assets', 'private-draft.docx'), 'utf8'), 'local draft');
    await access(join(fixture, 'dist', '404.html'));
  } finally {
    assert.equal(dirname(resolve(fixture)), resolve(tmpdir()));
    await rm(fixture, { recursive: true, force: true });
  }
});
