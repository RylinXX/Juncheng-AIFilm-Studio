import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('styles include the required hero motion system', async () => {
  const css = await readFile(new URL('../src/styles.css', import.meta.url), 'utf8');
  assert.match(css, /@keyframes gridDrift/);
  assert.match(css, /@keyframes beamSweep/);
  assert.match(css, /@keyframes nodePulse/);
  assert.match(css, /prefers-reduced-motion: reduce/);
});

test('styles include responsive sections and demo form states', async () => {
  const css = await readFile(new URL('../src/styles.css', import.meta.url), 'utf8');
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /\.demo-form/);
  assert.match(css, /\.form-message\.is-success/);
  assert.match(css, /\.form-message\.is-error/);
});
