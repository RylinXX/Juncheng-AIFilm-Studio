import test from 'node:test';
import assert from 'node:assert/strict';
import { siteContent } from '../src/content.js';
import { renderSite } from '../src/render.js';

const createAdversarialContent = () => ({
  ...siteContent,
  company: {
    ...siteContent.company,
    name: '北京<script>alert("x")</script> & "属性"',
    shortName: '君成 <script>short</script> & Co.',
    englishName: 'JC "Agent" & Partners'
  },
  navigation: [
    {
      label: '演示 <script>alert("nav")</script> & "跳转"',
      href: '#demo" onclick="alert(1)&next=<script>'
    }
  ],
  hero: {
    ...siteContent.hero,
    title: '标题 <script>alert("hero")</script> & "引号"',
    primaryCta: '预约 "AI" & <script>能力</script>',
    metrics: [{ value: '1<script>', label: '指标 & "安全"' }]
  },
  pipeline: [
    {
      step: '01<script>',
      title: '节点 "A" & <script>',
      text: '流程 <script>alert("pipe")</script> & "文本"'
    },
    {
      step: '02',
      title: '节点 B',
      text: '第二步'
    }
  ],
  demo: {
    ...siteContent.demo,
    fields: ['访客姓名', '所在公司', '联系邮箱', '项目需求']
  }
});

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

test('renderSite escapes adversarial text and attribute content', () => {
  const html = renderSite(createAdversarialContent());
  assert.doesNotMatch(html, /<script>/i);
  assert.doesNotMatch(html, /<\/script>/i);
  assert.doesNotMatch(html, /onclick="/i);
  assert.match(html, /北京&lt;script&gt;alert\(&quot;x&quot;\)&lt;\/script&gt; &amp; &quot;属性&quot;/);
  assert.match(html, /href="#demo&quot; onclick=&quot;alert\(1\)&amp;next=&lt;script&gt;"/);
  assert.match(html, /预约 &quot;AI&quot; &amp; &lt;script&gt;能力&lt;\/script&gt;/);
});

test('renderSite outputs generated pipeline console node indices', () => {
  const html = renderSite(siteContent);
  for (const index of siteContent.pipeline.keys()) {
    assert.match(html, new RegExp(`style="--node-index: ${index}"`));
  }
});

test('renderSite derives demo form labels from content fields', () => {
  const html = renderSite(createAdversarialContent());
  for (const field of ['访客姓名', '所在公司', '联系邮箱', '项目需求']) {
    assert.match(html, new RegExp(`<span>${field}</span>`));
  }
  for (const hardCodedLabel of ['姓名', '公司', '联系方式', '合作需求']) {
    assert.doesNotMatch(html, new RegExp(`<span>${hardCodedLabel}</span>`));
  }
});
