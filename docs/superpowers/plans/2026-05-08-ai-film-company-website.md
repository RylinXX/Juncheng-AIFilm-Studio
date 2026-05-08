# AI Film Company Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished, responsive, static brand website for Beijing Juncheng Era Technology Co., Ltd. that presents AI film capabilities, qualifications, anonymous project experience, and a clear demo-booking conversion path.

**Architecture:** Use a lightweight static site with small ES modules: one content module, one renderer, one contact-validation module, one browser entrypoint, and one stylesheet. Tests run with Node's built-in test runner and validate content compliance, rendered structure, contact validation, and required motion/accessibility CSS.

**Tech Stack:** HTML, CSS, vanilla JavaScript ES modules, Node.js `node:test`, local static serving via `python3 -m http.server`.

---

## File Structure

- Create: `package.json` for scripts and ESM mode.
- Create: `index.html` for document shell and SEO metadata.
- Create: `src/content.js` for all website copy, credentials, pipeline steps, solutions, and anonymous project data.
- Create: `src/render.js` for converting content data into semantic HTML.
- Create: `src/contact.js` for demo-request validation and success-message formatting.
- Create: `src/main.js` for rendering the site and wiring form interactions.
- Create: `src/styles.css` for the full visual system, responsive layout, hero animation, and reduced-motion fallback.
- Create: `tests/content.test.mjs` to guard compliance-critical copy and data.
- Create: `tests/render.test.mjs` to guard rendered section structure and conversion text.
- Create: `tests/contact.test.mjs` to guard demo-request validation.
- Create: `tests/styles.test.mjs` to guard motion CSS and accessibility fallbacks.

## Task 1: Project Scripts And Content Model

**Files:**
- Create: `package.json`
- Create: `src/content.js`
- Test: `tests/content.test.mjs`

- [ ] **Step 1: Write the failing content test**

Create `tests/content.test.mjs`:

```js
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm test -- tests/content.test.mjs
```

Expected: FAIL because `package.json` and `src/content.js` do not exist yet.

- [ ] **Step 3: Add scripts and the content model**

Create `package.json`:

```json
{
  "name": "juncheng-era-ai-film-website",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "node --test",
    "serve": "python3 -m http.server 4173"
  }
}
```

Create `src/content.js`:

```js
export const siteContent = {
  company: {
    name: '北京君成时代科技有限公司',
    shortName: '君成时代',
    englishName: 'Juncheng Era',
    tagline: 'AI Film Intelligence for Commercial Production'
  },
  navigation: [
    { label: '能力体系', href: '#pipeline' },
    { label: '资质背书', href: '#qualifications' },
    { label: '商业方案', href: '#solutions' },
    { label: '项目经验', href: '#cases' },
    { label: '预约演示', href: '#demo' }
  ],
  hero: {
    eyebrow: 'AI FILM INTELLIGENCE',
    title: '用自研影视 Agent 流程，驱动商业影像智能化生产',
    description:
      '北京君成时代科技有限公司专注 AI 影视技术与商业化内容方案，面向品牌、机构与产业合作伙伴提供从创意开发到影像交付的智能化流程能力。',
    primaryCta: '预约 AI 影视能力演示',
    secondaryCta: '了解影视 Agent 流程',
    metrics: [
      { value: '3', label: '内容产业资质方向' },
      { value: '5', label: 'Agent 流程节点' },
      { value: '30min', label: '演示沟通建议时长' }
    ]
  },
  qualifications: [
    {
      name: '网文网',
      label: '网络文化经营相关资质',
      note: '最终以实际证照全称与证照状态为准'
    },
    {
      name: 'ICP',
      label: '互联网信息服务相关资质',
      note: '最终以实际备案或许可证信息为准'
    },
    {
      name: '广电',
      label: '影视/视听业务相关资质',
      note: '最终以实际证照全称与证照状态为准'
    },
    {
      name: '专利布局',
      label: '围绕 AI 影视流程形成技术资产',
      note: '按实际授权或申请状态标注'
    },
    {
      name: '软件著作权',
      label: '沉淀系统化软件能力',
      note: '按实际软著名称与登记状态填写'
    },
    {
      name: '国高新筹备',
      label: '国家高新技术企业认证申报筹备中',
      note: '不得写成已认证或已通过'
    }
  ],
  pipeline: [
    {
      step: '01',
      title: '剧本理解',
      text: '识别主题、角色、场景和镜头目标，把商业需求转译成可执行创意结构。'
    },
    {
      step: '02',
      title: '分镜规划',
      text: '生成镜头节奏、画面构图和叙事顺序，让前期创意进入可审阅状态。'
    },
    {
      step: '03',
      title: '影像资产生成',
      text: '调度图像、视频、声音和虚拟人物能力，为不同传播场景生成素材资产。'
    },
    {
      step: '04',
      title: '剪辑包装',
      text: '围绕节奏、字幕、包装和多版本适配形成可交付内容。'
    },
    {
      step: '05',
      title: '交付评估',
      text: '结合商业目标、渠道场景和质量反馈，持续优化影视内容方案。'
    }
  ],
  solutions: [
    {
      title: '品牌宣传片',
      audience: '企业品牌、产业园区、机构发布',
      delivery: '创意脚本、分镜方案、成片包装、多渠道版本',
      aiValue: '缩短前期创意验证周期，提升多版本生产效率'
    },
    {
      title: '广告视觉',
      audience: '消费品牌、活动营销、产品发布',
      delivery: '视觉概念、影像素材、短视频广告、社媒切条',
      aiValue: '快速探索多种视觉方向，降低试错成本'
    },
    {
      title: '虚拟人物内容',
      audience: '品牌 IP、知识内容、直播与短视频账号',
      delivery: '人设方案、脚本模板、视觉资产、内容样片',
      aiValue: '把虚拟人物从形象资产推进到持续内容生产'
    },
    {
      title: '短剧/短视频矩阵',
      audience: '内容团队、MCN、商业宣发项目',
      delivery: '内容结构、分镜模板、批量剪辑包装、渠道适配',
      aiValue: '提高系列化内容产出速度和风格一致性'
    }
  ],
  caseStudies: [
    {
      anonymous: true,
      industry: '消费品牌',
      title: '某消费品牌视觉升级项目',
      goal: '为新品传播验证更具科技感和情绪张力的视觉表达。',
      delivery: '完成视觉概念、短片分镜、AI 影像素材和社媒版本建议。',
      result: '形成可用于进一步拍摄或生成验证的品牌影像方向。'
    },
    {
      anonymous: true,
      industry: '产业园区',
      title: '某产业园招商宣传项目',
      goal: '将园区定位、产业资源和未来场景转化为更易理解的招商影像。',
      delivery: '完成叙事结构、镜头脚本、场景视觉方案和宣发视频结构。',
      result: '形成面向投资人与企业客户的招商内容方案。'
    },
    {
      anonymous: true,
      industry: '教育内容',
      title: '某教育内容短视频项目',
      goal: '提升知识内容的视频化表达效率，降低系列化制作门槛。',
      delivery: '完成脚本模板、虚拟讲述场景、剪辑节奏和批量内容结构。',
      result: '形成可复用的短视频生产流程验证。'
    }
  ],
  demo: {
    title: '预约一次 AI 影视能力演示',
    text: '用 30 分钟了解君成时代如何把 AI 影视 Agent 流程应用到真实商业内容生产中。',
    fields: ['姓名', '公司', '联系方式', '合作需求'],
    fallback: '也可以通过邮箱或企业微信联系团队获取公司介绍材料。'
  }
};
```

- [ ] **Step 4: Run the test to verify it passes**

Run:

```bash
npm test -- tests/content.test.mjs
```

Expected: PASS with one test file and three passing assertions groups.

- [ ] **Step 5: Commit**

```bash
git add package.json src/content.js tests/content.test.mjs
git commit -m "feat: add website content model"
```

## Task 2: Semantic Page Renderer

**Files:**
- Create: `index.html`
- Create: `src/render.js`
- Create: `src/main.js`
- Test: `tests/render.test.mjs`

- [ ] **Step 1: Write the failing render test**

Create `tests/render.test.mjs`:

```js
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm test -- tests/render.test.mjs
```

Expected: FAIL because `src/render.js` does not exist yet.

- [ ] **Step 3: Add the document shell and renderer**

Create `index.html`:

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="北京君成时代科技有限公司专注 AI 影视技术与商业化内容方案，提供自研影视 Agent 流程与商业影像智能化生产能力。"
    />
    <title>北京君成时代科技有限公司 | AI影视科技</title>
    <link rel="stylesheet" href="./src/styles.css" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="./src/main.js"></script>
  </body>
</html>
```

Create `src/render.js`:

```js
const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const renderNav = (content) => `
  <header class="site-header">
    <a class="brand" href="#hero" aria-label="${escapeHtml(content.company.name)}">
      <span class="brand-mark">JC</span>
      <span>
        <strong>${escapeHtml(content.company.shortName)}</strong>
        <small>${escapeHtml(content.company.englishName)}</small>
      </span>
    </a>
    <nav class="nav-links" aria-label="主导航">
      ${content.navigation
        .map((item) => `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`)
        .join('')}
    </nav>
  </header>
`;

const renderHero = (content) => `
  <section class="hero section-shell" id="hero">
    <div class="hero-grid" aria-hidden="true"></div>
    <div class="hero-orb hero-orb-one" aria-hidden="true"></div>
    <div class="hero-orb hero-orb-two" aria-hidden="true"></div>
    <div class="hero-copy">
      <p class="eyebrow">${escapeHtml(content.hero.eyebrow)}</p>
      <h1>${escapeHtml(content.hero.title)}</h1>
      <p class="hero-description">${escapeHtml(content.hero.description)}</p>
      <div class="hero-actions">
        <a class="button button-primary" href="#demo">${escapeHtml(content.hero.primaryCta)}</a>
        <a class="button button-secondary" href="#pipeline">${escapeHtml(content.hero.secondaryCta)}</a>
      </div>
      <dl class="metric-row">
        ${content.hero.metrics
          .map(
            (metric) => `
              <div>
                <dt>${escapeHtml(metric.value)}</dt>
                <dd>${escapeHtml(metric.label)}</dd>
              </div>
            `
          )
          .join('')}
      </dl>
    </div>
    <div class="pipeline-console" aria-label="影视 Agent 流程预览">
      <div class="console-topline">
        <span>Agent Pipeline</span>
        <span>Live Preview</span>
      </div>
      <div class="console-beam" aria-hidden="true"></div>
      ${content.pipeline
        .map(
          (item, index) => `
            <article class="console-node" style="--node-index: ${index}">
              <span>${escapeHtml(item.step)}</span>
              <strong>${escapeHtml(item.title)}</strong>
            </article>
          `
        )
        .join('')}
    </div>
  </section>
`;

const renderQualifications = (content) => `
  <section class="section-shell" id="qualifications">
    <div class="section-heading">
      <p class="eyebrow">QUALIFICATIONS</p>
      <h2>内容产业资质与技术资产</h2>
      <p>用明确资质、技术资产和申报状态建立可信度，避免模糊或过度承诺。</p>
    </div>
    <div class="qualification-grid">
      ${content.qualifications
        .map(
          (item) => `
            <article class="glass-card">
              <h3>${escapeHtml(item.name)}</h3>
              <p>${escapeHtml(item.label)}</p>
              <small>${escapeHtml(item.note)}</small>
            </article>
          `
        )
        .join('')}
    </div>
  </section>
`;

const renderPipeline = (content) => `
  <section class="section-shell dark-section" id="pipeline">
    <div class="section-heading">
      <p class="eyebrow">AGENT WORKFLOW</p>
      <h2>把影视创意生产拆成可调度、可复用、可演示的智能工作流</h2>
    </div>
    <div class="timeline">
      ${content.pipeline
        .map(
          (item) => `
            <article class="timeline-item">
              <span>${escapeHtml(item.step)}</span>
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.text)}</p>
            </article>
          `
        )
        .join('')}
    </div>
  </section>
`;

const renderSolutions = (content) => `
  <section class="section-shell" id="solutions">
    <div class="section-heading">
      <p class="eyebrow">COMMERCIAL SOLUTIONS</p>
      <h2>从 AI 能力到可交付的商业影像方案</h2>
    </div>
    <div class="solution-grid">
      ${content.solutions
        .map(
          (item) => `
            <article class="solution-card">
              <h3>${escapeHtml(item.title)}</h3>
              <p><strong>适用场景：</strong>${escapeHtml(item.audience)}</p>
              <p><strong>交付内容：</strong>${escapeHtml(item.delivery)}</p>
              <p><strong>AI 提效点：</strong>${escapeHtml(item.aiValue)}</p>
            </article>
          `
        )
        .join('')}
    </div>
  </section>
`;

const renderCases = (content) => `
  <section class="section-shell" id="cases">
    <div class="section-heading">
      <p class="eyebrow">ANONYMOUS EXPERIENCE</p>
      <h2>匿名项目经验</h2>
      <p>以行业、目标、交付内容和阶段性成果表达成熟度，不虚构公开客户名称。</p>
    </div>
    <div class="case-grid">
      ${content.caseStudies
        .map(
          (item) => `
            <article class="case-card">
              <span>${escapeHtml(item.industry)}</span>
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.goal)}</p>
              <p>${escapeHtml(item.delivery)}</p>
              <strong>${escapeHtml(item.result)}</strong>
            </article>
          `
        )
        .join('')}
    </div>
  </section>
`;

const renderDemo = (content) => `
  <section class="section-shell demo-section" id="demo">
    <div>
      <p class="eyebrow">BOOK A DEMO</p>
      <h2>${escapeHtml(content.demo.title)}</h2>
      <p>${escapeHtml(content.demo.text)}</p>
      <p class="demo-fallback">${escapeHtml(content.demo.fallback)}</p>
    </div>
    <form class="demo-form" novalidate>
      <label>
        <span>姓名</span>
        <input name="name" autocomplete="name" />
      </label>
      <label>
        <span>公司</span>
        <input name="company" autocomplete="organization" />
      </label>
      <label>
        <span>联系方式</span>
        <input name="contact" autocomplete="email" />
      </label>
      <label>
        <span>合作需求</span>
        <textarea name="need" rows="4"></textarea>
      </label>
      <button class="button button-primary" type="submit">${escapeHtml(content.hero.primaryCta)}</button>
      <p class="form-message" role="status" aria-live="polite"></p>
    </form>
  </section>
`;

export const renderSite = (content) => `
  ${renderNav(content)}
  <main>
    ${renderHero(content)}
    ${renderQualifications(content)}
    ${renderPipeline(content)}
    ${renderSolutions(content)}
    ${renderCases(content)}
    ${renderDemo(content)}
  </main>
`;
```

Create `src/main.js`:

```js
import { siteContent } from './content.js';
import { renderSite } from './render.js';

const app = document.querySelector('#app');
app.innerHTML = renderSite(siteContent);
```

- [ ] **Step 4: Run the test to verify it passes**

Run:

```bash
npm test -- tests/render.test.mjs
```

Expected: PASS with two render tests.

- [ ] **Step 5: Commit**

```bash
git add index.html src/render.js src/main.js tests/render.test.mjs
git commit -m "feat: render website sections"
```

## Task 3: Contact Validation

**Files:**
- Create: `src/contact.js`
- Test: `tests/contact.test.mjs`

- [ ] **Step 1: Write the failing contact test**

Create `tests/contact.test.mjs`:

```js
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm test -- tests/contact.test.mjs
```

Expected: FAIL because `src/contact.js` does not exist yet.

- [ ] **Step 3: Add contact validation**

Create `src/contact.js`:

```js
const requiredFields = [
  ['company', '公司'],
  ['contact', '联系方式'],
  ['need', '合作需求']
];

const normalize = (value) => String(value ?? '').trim();

export const validateDemoRequest = (input) => {
  const data = {
    name: normalize(input.name) || '访客',
    company: normalize(input.company),
    contact: normalize(input.contact),
    need: normalize(input.need)
  };

  const missing = requiredFields
    .filter(([field]) => data[field].length === 0)
    .map(([, label]) => label);

  if (missing.length > 0) {
    return {
      valid: false,
      message: `请填写${missing.join('、')}，方便我们安排 AI 影视能力演示。`
    };
  }

  return { valid: true, data };
};

export const formatDemoSuccess = (data) =>
  `已收到预约请求。我们会围绕「${data.company}」的合作需求准备 AI 影视能力演示，并通过 ${data.contact} 尽快联系你。`;
```

Replace `src/main.js`:

```js
import { siteContent } from './content.js';
import { renderSite } from './render.js';
import { validateDemoRequest, formatDemoSuccess } from './contact.js';

const app = document.querySelector('#app');
app.innerHTML = renderSite(siteContent);

const form = document.querySelector('.demo-form');
const message = document.querySelector('.form-message');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  const result = validateDemoRequest(data);

  message.classList.remove('is-error', 'is-success');
  if (!result.valid) {
    message.textContent = result.message;
    message.classList.add('is-error');
    return;
  }

  message.textContent = formatDemoSuccess(result.data);
  message.classList.add('is-success');
  form.reset();
});
```

- [ ] **Step 4: Run contact and render tests**

Run:

```bash
npm test -- tests/contact.test.mjs tests/render.test.mjs
```

Expected: PASS for contact and render tests.

- [ ] **Step 5: Commit**

```bash
git add src/contact.js tests/contact.test.mjs src/main.js
git commit -m "feat: add demo request validation"
```

## Task 4: Visual System And Hero Motion

**Files:**
- Create: `src/styles.css`
- Test: `tests/styles.test.mjs`

- [ ] **Step 1: Write the failing styles test**

Create `tests/styles.test.mjs`:

```js
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm test -- tests/styles.test.mjs
```

Expected: FAIL because `src/styles.css` does not exist yet.

- [ ] **Step 3: Add the full visual system**

Create `src/styles.css`:

```css
:root {
  color-scheme: light;
  --ink: #071421;
  --ink-soft: #29445f;
  --deep: #0c2a45;
  --blue: #3aa8ff;
  --blue-soft: #d9efff;
  --ice: #f7fbff;
  --line: rgba(58, 168, 255, 0.24);
  --card: rgba(255, 255, 255, 0.78);
  --shadow: 0 24px 80px rgba(26, 86, 138, 0.16);
  font-family: "Aptos", "PingFang SC", "Microsoft YaHei", sans-serif;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  color: var(--ink);
  background:
    radial-gradient(circle at 12% 8%, rgba(58, 168, 255, 0.2), transparent 30rem),
    radial-gradient(circle at 88% 18%, rgba(217, 239, 255, 0.9), transparent 28rem),
    linear-gradient(180deg, #f9fcff 0%, #edf6ff 42%, #f7fbff 100%);
}

a {
  color: inherit;
  text-decoration: none;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: min(1180px, calc(100% - 32px));
  margin: 16px auto 0;
  padding: 12px 14px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 999px;
  background: rgba(247, 251, 255, 0.78);
  backdrop-filter: blur(18px);
  box-shadow: 0 16px 50px rgba(30, 82, 130, 0.12);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.brand-mark {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border-radius: 14px;
  color: white;
  background: linear-gradient(135deg, var(--ink), var(--blue));
  font-weight: 800;
  letter-spacing: -0.08em;
}

.brand strong,
.brand small {
  display: block;
}

.brand small {
  color: #5f7890;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
  color: #37536d;
  font-size: 0.92rem;
}

.section-shell {
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  padding: 88px 0;
}

.hero {
  position: relative;
  display: grid;
  min-height: calc(100vh - 84px);
  grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
  gap: 48px;
  align-items: center;
  overflow: hidden;
}

.hero-grid {
  position: absolute;
  inset: 18px -20px;
  z-index: -3;
  background-image:
    linear-gradient(var(--line) 1px, transparent 1px),
    linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: 34px 34px;
  mask-image: radial-gradient(circle at 50% 40%, black, transparent 72%);
  animation: gridDrift 16s linear infinite;
}

.hero-orb {
  position: absolute;
  z-index: -2;
  border-radius: 999px;
  filter: blur(4px);
  opacity: 0.72;
}

.hero-orb-one {
  width: 280px;
  height: 280px;
  right: 12%;
  top: 18%;
  background: radial-gradient(circle, rgba(58, 168, 255, 0.44), transparent 68%);
  animation: floatOrb 7s ease-in-out infinite;
}

.hero-orb-two {
  width: 420px;
  height: 420px;
  right: -10%;
  bottom: 6%;
  background: radial-gradient(circle, rgba(217, 239, 255, 0.9), transparent 66%);
  animation: floatOrb 9s ease-in-out infinite reverse;
}

.hero-copy {
  animation: revealUp 900ms ease both;
}

.eyebrow {
  margin: 0 0 14px;
  color: #2c83c8;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  max-width: 760px;
  margin-bottom: 22px;
  font-size: clamp(3.1rem, 8vw, 6.8rem);
  line-height: 0.94;
  letter-spacing: -0.075em;
}

h2 {
  max-width: 780px;
  font-size: clamp(2rem, 5vw, 4.5rem);
  line-height: 1;
  letter-spacing: -0.055em;
}

h3 {
  font-size: 1.15rem;
}

.hero-description,
.section-heading p,
.demo-section p {
  color: #4f6a84;
  font-size: 1.05rem;
  line-height: 1.8;
}

.hero-actions,
.metric-row {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
}

.button {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: 999px;
  padding: 0 22px;
  font-weight: 800;
}

.button-primary {
  color: white;
  background: linear-gradient(135deg, var(--ink), var(--blue));
  box-shadow: 0 18px 40px rgba(18, 111, 191, 0.24);
}

.button-secondary {
  color: var(--deep);
  background: rgba(255, 255, 255, 0.72);
  border-color: rgba(58, 168, 255, 0.28);
}

.metric-row {
  margin: 34px 0 0;
}

.metric-row div {
  min-width: 130px;
  padding: 14px 16px;
  border: 1px solid rgba(58, 168, 255, 0.2);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.64);
}

.metric-row dt {
  color: var(--deep);
  font-size: 1.5rem;
  font-weight: 900;
}

.metric-row dd {
  margin: 4px 0 0;
  color: #607890;
  font-size: 0.84rem;
}

.pipeline-console {
  position: relative;
  padding: 22px;
  border: 1px solid rgba(183, 225, 255, 0.24);
  border-radius: 30px;
  color: white;
  background:
    linear-gradient(145deg, rgba(7, 20, 33, 0.96), rgba(12, 42, 69, 0.92)),
    radial-gradient(circle at 30% 20%, rgba(58, 168, 255, 0.28), transparent 28rem);
  box-shadow: var(--shadow);
  overflow: hidden;
  animation: revealUp 1100ms 160ms ease both, consoleFloat 5s ease-in-out infinite;
}

.console-topline {
  display: flex;
  justify-content: space-between;
  color: #9ed7ff;
  font-size: 0.76rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.console-beam {
  position: absolute;
  inset: 0;
  background: linear-gradient(115deg, transparent 0%, rgba(89, 190, 255, 0.08) 45%, rgba(255, 255, 255, 0.24) 50%, transparent 58%);
  transform: translateX(-80%);
  animation: beamSweep 4.6s ease-in-out infinite;
}

.console-node {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 14px;
  padding: 18px;
  border: 1px solid rgba(158, 215, 255, 0.18);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.075);
  animation: nodePulse 4s ease-in-out infinite;
  animation-delay: calc(var(--node-index) * 260ms);
}

.console-node span {
  color: #69c1ff;
  font-weight: 900;
}

.section-heading {
  margin-bottom: 30px;
}

.qualification-grid,
.solution-grid,
.case-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.glass-card,
.solution-card,
.case-card {
  min-height: 220px;
  padding: 24px;
  border: 1px solid rgba(58, 168, 255, 0.18);
  border-radius: 26px;
  background: var(--card);
  box-shadow: 0 18px 55px rgba(43, 98, 146, 0.1);
  transition: transform 220ms ease, box-shadow 220ms ease;
}

.glass-card:hover,
.solution-card:hover,
.case-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 26px 70px rgba(43, 98, 146, 0.16);
}

.glass-card small,
.case-card span {
  color: #2d83c9;
  font-weight: 800;
}

.glass-card p,
.solution-card p,
.case-card p {
  color: #536d86;
  line-height: 1.7;
}

.dark-section {
  width: 100%;
  max-width: none;
  padding-right: max(16px, calc((100vw - 1180px) / 2));
  padding-left: max(16px, calc((100vw - 1180px) / 2));
  color: white;
  background:
    radial-gradient(circle at 12% 20%, rgba(58, 168, 255, 0.22), transparent 28rem),
    linear-gradient(135deg, #071421, #0c2a45);
}

.dark-section .section-heading p,
.dark-section p {
  color: #bed7ec;
}

.timeline {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;
}

.timeline-item {
  padding: 22px;
  border: 1px solid rgba(158, 215, 255, 0.24);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.08);
}

.timeline-item span {
  color: #81ceff;
  font-weight: 900;
}

.demo-section {
  display: grid;
  grid-template-columns: 0.85fr 1fr;
  gap: 36px;
  align-items: start;
  margin-bottom: 64px;
  padding: 48px;
  border-radius: 34px;
  color: white;
  background:
    radial-gradient(circle at 85% 20%, rgba(58, 168, 255, 0.3), transparent 30rem),
    linear-gradient(135deg, #071421, #0d3254);
}

.demo-section h2,
.demo-section .eyebrow {
  color: white;
}

.demo-section p {
  color: #c6ddf0;
}

.demo-form {
  display: grid;
  gap: 14px;
  padding: 22px;
  border: 1px solid rgba(158, 215, 255, 0.22);
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.08);
}

.demo-form label {
  display: grid;
  gap: 8px;
  color: #d9efff;
  font-weight: 800;
}

.demo-form input,
.demo-form textarea {
  width: 100%;
  border: 1px solid rgba(158, 215, 255, 0.3);
  border-radius: 16px;
  padding: 13px 14px;
  color: white;
  background: rgba(7, 20, 33, 0.58);
  font: inherit;
}

.demo-form textarea {
  resize: vertical;
}

.form-message {
  min-height: 1.5em;
  margin: 0;
  font-weight: 800;
}

.form-message.is-success {
  color: #95ffda;
}

.form-message.is-error {
  color: #ffd2a8;
}

@keyframes gridDrift {
  from {
    background-position: 0 0, 0 0;
  }
  to {
    background-position: 68px 34px, 68px 34px;
  }
}

@keyframes beamSweep {
  0%,
  42% {
    transform: translateX(-80%);
  }
  76%,
  100% {
    transform: translateX(80%);
  }
}

@keyframes nodePulse {
  0%,
  100% {
    border-color: rgba(158, 215, 255, 0.18);
    box-shadow: none;
  }
  45% {
    border-color: rgba(105, 193, 255, 0.62);
    box-shadow: 0 0 28px rgba(58, 168, 255, 0.16);
  }
}

@keyframes revealUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes consoleFloat {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes floatOrb {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(14px, -18px, 0) scale(1.04);
  }
}

@media (max-width: 980px) {
  .hero,
  .demo-section {
    grid-template-columns: 1fr;
  }

  .qualification-grid,
  .solution-grid,
  .case-grid,
  .timeline {
    grid-template-columns: repeat(2, 1fr);
  }

  .nav-links {
    display: none;
  }
}

@media (max-width: 760px) {
  .site-header,
  .section-shell {
    width: min(100% - 24px, 1180px);
  }

  .hero {
    min-height: auto;
    padding-top: 72px;
  }

  h1 {
    font-size: clamp(2.8rem, 15vw, 4.6rem);
  }

  .qualification-grid,
  .solution-grid,
  .case-grid,
  .timeline {
    grid-template-columns: 1fr;
  }

  .demo-section {
    padding: 28px 18px;
  }

  .pipeline-console {
    padding: 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 4: Run the full test suite**

Run:

```bash
npm test
```

Expected: PASS for content, render, contact, and styles tests.

- [ ] **Step 5: Commit**

```bash
git add src/styles.css tests/styles.test.mjs index.html
git commit -m "feat: add visual system and hero motion"
```

## Task 5: Local Verification And Polish

**Files:**
- Modify only if verification exposes a concrete issue: `index.html`, `src/*.js`, `src/styles.css`, `tests/*.test.mjs`

- [ ] **Step 1: Run all automated checks**

Run:

```bash
npm test
```

Expected: PASS for all tests.

- [ ] **Step 2: Start the static server**

Run:

```bash
npm run serve
```

Expected: local server available at `http://127.0.0.1:4173/`.

- [ ] **Step 3: Verify desktop in browser**

Open `http://127.0.0.1:4173/` and check:

- Hero headline is visible without horizontal scrolling.
- Primary CTA says `预约 AI 影视能力演示`.
- Agent Pipeline nodes animate in the hero.
- Qualification cards include `网文网`, `ICP`, `广电`, `专利布局`, `软件著作权`, and `国高新筹备`.
- Anonymous project section does not present public customer names.

- [ ] **Step 4: Verify mobile layout**

Set viewport near `390px` wide and check:

- Navigation collapses by hiding the long desktop nav.
- Hero headline and buttons fit within the viewport.
- Pipeline console remains readable.
- Qualification, solution, and case cards stack as one column.
- Demo form fields are tappable and not clipped.

- [ ] **Step 5: Verify demo form behavior**

Submit an empty form.

Expected message:

```text
请填写公司、联系方式和合作需求，方便我们安排 AI 影视能力演示。
```

Submit:

```text
姓名：李四
公司：合作伙伴公司
联系方式：partner@example.com
合作需求：希望预约演示影视 Agent 流程
```

Expected message includes:

```text
已收到预约请求
合作伙伴公司
partner@example.com
```

- [ ] **Step 6: Commit verification fixes if any were made**

If no files changed after verification, do not create an empty commit.

If fixes were made:

```bash
git add index.html src tests
git commit -m "fix: polish website verification issues"
```
