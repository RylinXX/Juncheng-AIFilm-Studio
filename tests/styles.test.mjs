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

test('styles use the selected image logo and a restrained hero headline scale', async () => {
  const css = await readFile(new URL('../src/styles.css', import.meta.url), 'utf8');
  assert.match(css, /\.brand-logo/);
  assert.match(css, /font-size: clamp\(2\.25rem, 4vw, 3\.8rem\)/);
  assert.match(css, /font-size: clamp\(1\.95rem, 7vw, 2\.65rem\)/);
  assert.match(css, /font-size: clamp\(2\.05rem, 3\.6vw, 3\.35rem\)/);
  assert.doesNotMatch(css, /6\.8rem/);
});

test('styles keep section titles below hero headline scale', async () => {
  const css = await readFile(new URL('../src/styles.css', import.meta.url), 'utf8');
  assert.match(css, /h2 \{\n  max-width: 780px;\n  font-size: clamp\(1\.75rem, 3\.2vw, 3\.2rem\);\n  line-height: 1\.08;\n  letter-spacing: -0\.04em;\n\}/);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*h2 \{\n    font-size: clamp\(1\.7rem, 7vw, 2\.05rem\);\n  \}/);
  assert.doesNotMatch(css, /font-size: clamp\(2rem, 5vw, 4\.5rem\)/);
});

test('styles keep the hero Agent word and primary CTA visually intact', async () => {
  const css = await readFile(new URL('../src/styles.css', import.meta.url), 'utf8');
  assert.match(css, /\.hero-title-accent \{[\s\S]*display: inline-block/);
  assert.match(css, /\.hero-title-accent \{[\s\S]*padding-right: 0\.14em/);
  assert.match(css, /\.hero-title-accent \{[\s\S]*letter-spacing: -0\.035em/);
  assert.match(css, /\.button-primary \{[\s\S]*linear-gradient\(135deg, #1d8fe9 0%, var\(--blue\) 52%, #82d4ff 100%\)/);
  assert.doesNotMatch(css, /\.button-primary \{[\s\S]*linear-gradient\(135deg, var\(--ink\), var\(--blue\)\)/);
});

test('styles include generated hero assets and advanced cockpit motion', async () => {
  const css = await readFile(new URL('../src/styles.css', import.meta.url), 'utf8');
  assert.match(css, /cinematic-light-ribbon\.png/);
  assert.match(css, /\.hero-title-accent/);
  assert.match(css, /\.agent-cockpit/);
  assert.match(css, /\.signal-path-one/);
  assert.match(css, /@keyframes orbitPulse/);
  assert.match(css, /@keyframes routeDash/);
  assert.match(css, /@keyframes previewScan/);
  assert.doesNotMatch(css, /hero-ai-cockpit\.png/);
  assert.doesNotMatch(css, /hero-backdrop-art/);
});

test('styles make commercial solutions a balanced image-led grid', async () => {
  const css = await readFile(new URL('../src/styles.css', import.meta.url), 'utf8');
  assert.match(css, /\.solution-grid \{\n  display: grid;\n  grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(css, /\.solution-visual \{/);
  assert.match(css, /aspect-ratio: 16 \/ 10/);
  assert.match(css, /\.solution-visual img \{/);
  assert.match(css, /object-fit: cover/);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*\.solution-grid \{\n    grid-template-columns: 1fr;\n  \}/);
});

test('styles constrain the hero and cockpit proportions across viewports', async () => {
  const css = await readFile(new URL('../src/styles.css', import.meta.url), 'utf8');
  assert.match(css, /main \{\n  margin-top: -96px;\n\}/);
  assert.match(css, /width: 100%/);
  assert.match(css, /max-width: none/);
  assert.match(css, /min-height: 100svh/);
  assert.match(css, /grid-template-columns: minmax\(0, 0\.9fr\) minmax\(340px, 0\.72fr\)/);
  assert.match(css, /padding: calc\(clamp\(36px, 5vw, 64px\) \+ 112px\) max\(20px, calc\(\(100vw - 1180px\) \/ 2\)\) clamp\(36px, 5vw, 64px\)/);
  assert.match(css, /border-radius: 0/);
  assert.match(css, /height: min\(620px, calc\(100svh - 190px\)\)/);
  assert.match(css, /aspect-ratio: 0\.8 \/ 1/);
  assert.match(css, /height: auto/);
  assert.doesNotMatch(css, /min-height: calc\(100vh - 84px\)/);
  assert.doesNotMatch(css, /min-height: calc\(100svh - 96px\)/);
  assert.doesNotMatch(css, /min-height: min\(720px, calc\(100svh - 132px\)\)/);
});
