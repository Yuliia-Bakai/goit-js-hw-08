import throttle from 'lodash.throttle';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({
  width: '400px',
  position: 'center-top',
  fontSize: '18px',
});

const form = document.querySelector('.feedback-form');
// const email = document.querySelector('.feedback-form input');
// const message = document.querySelector('.feedback-form textarea');

const formDataObj = {};
const FORM_DATA = 'feedback-form-state';

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

dataRecovery();

function onFormSubmit(e) {
  e.preventDefault();
  let isEmptyField = false;
  let messageFields = '';
  const formData = new FormData(form);
  formData.forEach((value, name) => {
    if (value === '') {
      messageFields += form.elements[name].parentNode.textContent.trim() + ', ';
      isEmptyField = true;
      formDataObj[name] = value;
    }
  });
  if (isEmptyField) {
    Notify.failure(`Fields ${messageFields} must be filled!`);
    // alert(`Fields ${messageFields} must be filled!`);
    return;
  }

  console.log(formDataObj);
  e.currentTarget.reset();
  localStorage.removeItem(FORM_DATA);
}

function onFormInput(e) {
  const formData = new FormData(form);
  formData.forEach((value, name) => {
    formDataObj[name] = value;
  });

  localStorage.setItem(FORM_DATA, JSON.stringify(formDataObj));
}

function dataRecovery() {
  const data = JSON.parse(localStorage.getItem(FORM_DATA));
  if (data) {
    Object.entries(data).forEach(([name, value]) => {
      form.elements[name].value = value;
    });
  }
}