const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const renderHeroTitle = (title) => {
  const rawTitle = String(title);
  const [lead, agentRest] = rawTitle.split('Agent');

  if (!agentRest) {
    return `<h1 class="hero-title">${escapeHtml(rawTitle)}</h1>`;
  }

  const [flowLabel, tailLabel] = agentRest.split('，');
  const kicker = lead.replace(/^用/, '').trim();

  return `
      <h1 class="hero-title" aria-label="${escapeHtml(rawTitle)}">
        <span class="hero-title-line">
          <span class="hero-title-kicker">${escapeHtml(kicker)}</span>
          <span class="hero-title-accent">Agent</span>
          <span class="hero-title-tail">${escapeHtml(flowLabel.trim())}</span>
        </span>
        <span class="hero-title-line">${escapeHtml((tailLabel ?? '').trim())}</span>
      </h1>
    `;
};

const renderNav = (content) => `
  <header class="site-header">
    <a class="brand" href="#hero" aria-label="${escapeHtml(content.company.name)}">
      <img class="brand-logo" src="./public/assets/logo-jc-b.png" alt="${escapeHtml(content.company.name)} logo" />
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
      ${renderHeroTitle(content.hero.title)}
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
    <div class="agent-cockpit" aria-label="影视 Agent 动态驾驶舱">
      <div class="cockpit-shell" aria-hidden="true">
        <span class="cockpit-orbit cockpit-orbit-one"></span>
        <span class="cockpit-orbit cockpit-orbit-two"></span>
        <span class="signal-path signal-path-one"></span>
        <span class="signal-path signal-path-two"></span>
      </div>
      <div class="cockpit-topline">
        <span>Agent Command</span>
        <span>Live Render</span>
      </div>
      <div class="storyboard-preview">
        <img class="storyboard-art" src="./public/assets/storyboard-agent-collage.png" alt="" aria-hidden="true" />
        <span class="preview-scan" aria-hidden="true"></span>
        <div class="cockpit-status">
          <span>镜头规划</span>
          <strong>同步中</strong>
        </div>
      </div>
      ${content.pipeline
        .map(
          (item, index) => `
            <article class="agent-card" style="--node-index: ${index}">
              <span>${escapeHtml(item.step)}</span>
              <div>
                <strong>${escapeHtml(item.title)}</strong>
                <small>${escapeHtml(item.text)}</small>
              </div>
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
              <div class="solution-visual">
                <img src="${escapeHtml(item.visual)}" alt="${escapeHtml(item.visualAlt)}" loading="lazy" />
              </div>
              <div class="solution-body">
                <h3>${escapeHtml(item.title)}</h3>
                <p><strong>适用场景：</strong>${escapeHtml(item.audience)}</p>
                <p><strong>交付内容：</strong>${escapeHtml(item.delivery)}</p>
                <p><strong>AI 提效点：</strong>${escapeHtml(item.aiValue)}</p>
              </div>
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

const demoFieldConfigs = [
  { name: 'name', autocomplete: 'name' },
  { name: 'company', autocomplete: 'organization' },
  { name: 'contact', autocomplete: 'email' },
  { name: 'need', multiline: true }
];

const renderDemo = (content) => `
  <section class="section-shell demo-section" id="demo">
    <div>
      <p class="eyebrow">BOOK A DEMO</p>
      <h2>${escapeHtml(content.demo.title)}</h2>
      <p>${escapeHtml(content.demo.text)}</p>
      <p class="demo-fallback">${escapeHtml(content.demo.fallback)}</p>
    </div>
    <form class="demo-form" novalidate>
      ${demoFieldConfigs
        .map((field, index) => {
          const label = content.demo.fields[index] ?? '';
          if (field.multiline) {
            return `
              <label>
                <span>${escapeHtml(label)}</span>
                <textarea name="${escapeHtml(field.name)}" rows="4"></textarea>
              </label>
            `;
          }

          return `
            <label>
              <span>${escapeHtml(label)}</span>
              <input name="${escapeHtml(field.name)}" autocomplete="${escapeHtml(field.autocomplete)}" />
            </label>
          `;
        })
        .join('')}
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
