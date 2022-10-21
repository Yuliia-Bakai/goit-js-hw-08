import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const nameRef = formRef.querySelector('input');
const messageRef = formRef.querySelector('textarea');

const LOCALE_STORAGE_KEY = 'feedback-form-state';

formRef.addEventListener('submit', onFormSubmit);
formRef.addEventListener('input', throttle(onInputChanges, 500));

onPageReload();

function onInputChanges() {
  const email = nameRef.value;
  const message = messageRef.value;

  const formData = {
    email,
    message,
  };

  localStorage.setItem(LOCALE_STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  evt.preventDefault();

  const formData = {
    email: evt.currentTarget.elements.email.value,
    message: evt.currentTarget.elements.message.value,
  };

  console.log('onFormSubmit : formData', formData);

  evt.currentTarget.reset();

  localStorage.removeItem(LOCALE_STORAGE_KEY);
}

function onPageReload() {
  const savedData = localStorage.getItem(LOCALE_STORAGE_KEY);
  const parsedData = JSON.parse(savedData);

  if (parsedData) {
    nameRef.value = parsedData.email;
    messageRef.value = parsedData.message;
  }
}