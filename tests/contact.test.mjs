import test from 'node:test';
import assert from 'node:assert/strict';
import { validateDemoRequest, formatDemoSuccess } from '../src/contact.js';

test('validateDemoRequest rejects missing required fields', () => {
  const result = validateDemoRequest({ name: '张三', company: '', contact: '', need: '' });
  assert.equal(result.valid, false);
  assert.match(result.message, /请填写公司、联系方式和合作需求/);
});

test('validateDemoRequest accepts a complete request and trims values', () => {
  const result = validateDemoRequest({
    name: ' 李四 ',
    company: ' 合作伙伴公司 ',
    contact: ' partner@example.com ',
    need: ' 希望预约演示影视 Agent 流程 '
  });
  assert.equal(result.valid, true);
  assert.equal(result.data.name, '李四');
  assert.equal(result.data.company, '合作伙伴公司');
});

test('formatDemoSuccess names the company in the response', () => {
  const message = formatDemoSuccess({
    name: '李四',
    company: '合作伙伴公司',
    contact: 'partner@example.com',
    need: '预约演示'
  });
  assert.match(message, /合作伙伴公司/);
  assert.match(message, /已收到预约请求/);
});
