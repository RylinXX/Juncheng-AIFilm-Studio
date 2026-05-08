import test from 'node:test';
import assert from 'node:assert/strict';
import { validateDemoRequest, formatDemoSuccess, handleDemoSubmit } from '../src/contact.js';

const createSubmitTarget = (initialClasses = []) => {
  const classes = new Set(initialClasses);
  let resetCount = 0;

  return {
    form: {
      reset: () => {
        resetCount += 1;
      },
      get resetCount() {
        return resetCount;
      }
    },
    message: {
      textContent: '',
      classList: {
        add: (...names) => {
          for (const name of names) {
            classes.add(name);
          }
        },
        remove: (...names) => {
          for (const name of names) {
            classes.delete(name);
          }
        },
        contains: (name) => classes.has(name)
      }
    }
  };
};

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
  assert.equal(result.data.contact, 'partner@example.com');
  assert.equal(result.data.need, '希望预约演示影视 Agent 流程');
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

test('handleDemoSubmit shows an error message without resetting invalid forms', () => {
  const target = createSubmitTarget(['is-success']);

  handleDemoSubmit({
    ...target,
    data: { name: '张三', company: '', contact: '', need: '' }
  });

  assert.equal(target.message.classList.contains('is-error'), true);
  assert.equal(target.message.classList.contains('is-success'), false);
  assert.match(target.message.textContent, /请填写公司、联系方式和合作需求/);
  assert.equal(target.form.resetCount, 0);
});

test('handleDemoSubmit shows success and resets valid forms exactly once', () => {
  const target = createSubmitTarget(['is-error']);

  handleDemoSubmit({
    ...target,
    data: {
      name: '李四',
      company: '合作伙伴公司',
      contact: 'partner@example.com',
      need: '预约演示'
    }
  });

  assert.equal(target.message.classList.contains('is-success'), true);
  assert.equal(target.message.classList.contains('is-error'), false);
  assert.match(target.message.textContent, /合作伙伴公司/);
  assert.match(target.message.textContent, /partner@example\.com/);
  assert.equal(target.form.resetCount, 1);
});
