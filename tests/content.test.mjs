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
  const forbiddenAbsoluteClaims = [
    '行业第一',
    '唯一',
    '已获批',
    '最强',
    '最佳',
    '顶级',
    '领先',
    '100%',
    '保证',
    '第一'
  ];
  const forbiddenHighTechClaims = [
    '国家高新技术企业认证已',
    '已通过国家高新技术企业认证',
    '国家高新技术企业认证通过',
    '已获国家高新技术企业认证',
    '获得国家高新技术企业认证'
  ];
  const publicClientFields = ['client', 'customer', 'clientName', 'customerName'];

  assert.match(serialized, /国家高新技术企业认证申报筹备中/);

  for (const claim of forbiddenAbsoluteClaims) {
    assert.doesNotMatch(serialized, new RegExp(claim), `copy must not include ${claim}`);
  }

  for (const claim of forbiddenHighTechClaims) {
    assert.doesNotMatch(serialized, new RegExp(claim), `copy must not include ${claim}`);
  }

  for (const item of siteContent.caseStudies) {
    assert.equal(item.anonymous, true);
    assert.match(item.title, /某/);

    for (const field of publicClientFields) {
      assert.equal(Object.hasOwn(item, field), false, `case study must not expose ${field}`);
    }
  }
});
