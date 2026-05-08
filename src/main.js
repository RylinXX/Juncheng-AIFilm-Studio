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
