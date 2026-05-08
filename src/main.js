import { siteContent } from './content.js';
import { renderSite } from './render.js';
import { handleDemoSubmit } from './contact.js';

export const wireDemoForm = ({ form, message, formDataFactory = (currentForm) => new FormData(currentForm) }) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = formDataFactory(form);
    const data = Object.fromEntries(formData.entries());
    handleDemoSubmit({ form, message, data });
  });
};

export const bootSite = (documentLike) => {
  const app = documentLike.querySelector('#app');
  app.innerHTML = renderSite(siteContent);

  const form = documentLike.querySelector('.demo-form');
  const message = documentLike.querySelector('.form-message');
  wireDemoForm({ form, message });
};

if (typeof document !== 'undefined') {
  bootSite(document);
}
