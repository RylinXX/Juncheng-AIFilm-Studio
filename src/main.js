import { siteContent } from './content.js';
import { renderSite } from './render.js';
import { handleDemoSubmit } from './contact.js';

const app = document.querySelector('#app');
app.innerHTML = renderSite(siteContent);

const form = document.querySelector('.demo-form');
const message = document.querySelector('.form-message');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  handleDemoSubmit({ form, message, data });
});
