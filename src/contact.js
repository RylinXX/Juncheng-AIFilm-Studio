const requiredFields = [
  ['company', '公司'],
  ['contact', '联系方式'],
  ['need', '合作需求']
];

const normalize = (value) => String(value ?? '').trim();

const formatMissingFields = (fields) => {
  if (fields.length <= 1) {
    return fields.join('');
  }

  return `${fields.slice(0, -1).join('、')}和${fields.at(-1)}`;
};

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
      message: `请填写${formatMissingFields(missing)}，方便我们安排 AI 影视能力演示。`
    };
  }

  return { valid: true, data };
};

export const formatDemoSuccess = (data) =>
  `已收到预约请求。我们会围绕「${data.company}」的合作需求准备 AI 影视能力演示，并通过 ${data.contact} 尽快联系你。`;

export const handleDemoSubmit = ({ form, message, data }) => {
  const result = validateDemoRequest(data);

  message.classList.remove('is-error', 'is-success');
  if (!result.valid) {
    message.textContent = result.message;
    message.classList.add('is-error');
    return result;
  }

  message.textContent = formatDemoSuccess(result.data);
  message.classList.add('is-success');
  form.reset();
  return result;
};
