import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const LOCALE_STORAGE_KEY = 'contact-form-key';
import localStorage from './storage';

const onFormInput = event => {
  const { name, value } = event.target;

  let saveData = localStorage.load(LOCALE_STORAGE_KEY);
  saveData = saveData ? saveData : {};

  saveData[name] = value;

  localStorage.save(LOCALE_STORAGE_KEY, saveData);
};

const throttledOnFormInput = throttle(onFormInput, 500);
formRef.addEventListener('input', throttledOnFormInput);

function initPage() {
  const saveData = localStorage.load(LOCALE_STORAGE_KEY);

  if (!saveData) {
    return;
  }
  Object.entries(saveData).forEach(([name, value]) => {
    formRef.elements[name].value = value;
  });
}

initPage();

const handleSubmit = event => {
  event.preventDefault();

  const {
    elements: { email, message },
  } = event.currentTarget;

  console.log({ email: email.value, message: message.value });
  event.currentTarget.reset();
  localStorage.remove(LOCALE_STORAGE_KEY);
};

formRef.addEventListener('submit', handleSubmit);