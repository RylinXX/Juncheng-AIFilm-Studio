import test from 'node:test';
import assert from 'node:assert/strict';
import { siteContent } from '../src/content.js';

test('company identity and conversion goal are explicit', () => {
  assert.equal(siteContent.company.name, '北京君成时代科技有限公司');
  assert.equal(siteContent.company.shortName, '君成时代');
  assert.match(siteContent.hero.primaryCta, /预约 AI 影视能力演示/);
});

test('qualifications name the three content credentials specifically', () => {
  const names = siteContent.qualifications.map((item) => item.name);
  assert.deepEqual(names.slice(0, 3), ['网文网', 'ICP', '广电']);
});

test('copy keeps high-tech certification and cases compliant', () => {
  const serialized = JSON.stringify(siteContent);
  assert.match(serialized, /国家高新技术企业认证申报筹备中/);
  assert.doesNotMatch(serialized, /国家高新技术企业认证已/);
  assert.doesNotMatch(serialized, /行业第一|唯一|已获批/);
  assert.ok(siteContent.caseStudies.every((item) => item.anonymous === true));
});
