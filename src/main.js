import { siteContent } from './content.js';
import { renderSite } from './render.js';

const app = document.querySelector('#app');
app.innerHTML = renderSite(siteContent);
