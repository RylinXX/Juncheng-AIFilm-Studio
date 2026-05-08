import test from 'node:test';
import assert from 'node:assert/strict';
import { siteContent } from '../src/content.js';
import { renderSite } from '../src/render.js';

test('renderSite outputs the required homepage sections', () => {
  const html = renderSite(siteContent);
  for (const id of ['hero', 'qualifications', 'pipeline', 'solutions', 'cases', 'demo']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
});

test('renderSite includes primary conversion and compliance wording', () => {
  const html = renderSite(siteContent);
  assert.match(html, /预约 AI 影视能力演示/);
  assert.match(html, /国家高新技术企业认证申报筹备中/);
  assert.match(html, /某消费品牌视觉升级项目/);
  assert.doesNotMatch(html, /国家高新技术企业认证已通过/);
});
