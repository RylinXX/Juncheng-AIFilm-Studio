# 北京君成时代科技有限公司官网

北京君成时代科技有限公司 AI 影视官网静态站点，面向品牌、机构与产业合作伙伴展示公司定位、自研影视 Agent 流程、内容产业资质方向、商业影像方案和预约演示入口。

## 项目特点

- AI 影视科技公司首页，围绕“自研影视 Agent 流程”建立品牌主叙事。
- 包含首屏动态驾驶舱、资质背书、Agent 工作流、商业方案、匿名项目经验和预约演示表单。
- 商业方案区使用 image2 生成的影视场景素材，形成对称的 2×2 图片卡片布局。
- 静态前端实现，无后端依赖，可直接部署到 Nginx、宝塔、GitHub Pages 或任意静态站点服务。

## 技术栈

- 原生 HTML/CSS/JavaScript
- Node.js 内置测试框架 `node:test`
- 静态资源目录：`public/assets`
- 页面内容配置：`src/content.js`

## 本地运行

```bash
npm run serve
```

默认访问：

```text
http://127.0.0.1:4173/
```

## 测试

```bash
npm test
```

测试覆盖内容包括：

- 首页主要区块渲染
- 文案合规边界
- 表单校验逻辑
- 首屏与商业方案区样式约束
- 生成素材和 Logo 资源引用

## 目录结构

```text
.
├── index.html
├── public/
│   └── assets/
├── src/
│   ├── contact.js
│   ├── content.js
│   ├── main.js
│   ├── render.js
│   └── styles.css
└── tests/
```

## 部署说明

当前站点可作为静态文件部署。Nginx 推荐配置：

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

线上域名示例：

```text
https://xingtian.net/
```

## 内容维护

- 公司名称、资质、商业方案和案例内容集中维护在 `src/content.js`。
- 资质、专利、软著、国高新申报状态等信息应以公司真实证照和实际状态为准。
- 匿名案例为展示型内容，如用于正式对外传播，应替换为已授权或可公开披露的项目材料。
