import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};

const LOCALSTORAGE_KEY = 'feedback-form-state';

refs.form.addEventListener('input', throttle(savedDataToLocal, 500));
refs.form.addEventListener('submit', submitForm);

let formData = {};
readFormData();

function savedDataToLocal(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

function readFormData() {
  const savedData = localStorage.getItem(LOCALSTORAGE_KEY);
  if (savedData) {
    let savedFormData = {};

    try {
      savedFormData = JSON.parse(savedData);
    } catch (error) {
      console.log('Ошибка:', error);
    }
    formData.email = savedFormData.email || '';
    formData.message = savedFormData.message || '';

    refs.email.value = savedFormData.email || '';
    refs.textarea.value = savedFormData.message || '';
  }
}

function submitForm(e) {
  e.preventDefault();
  if (refs.email.value === '' || refs.textarea.value === '') {
    return alert('Все поля должны быть заполнены!');
  }
  e.currentTarget.reset();
  console.log(formData);
  localStorage.removeItem(LOCALSTORAGE_KEY);
}
