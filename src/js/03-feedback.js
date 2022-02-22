import throttle from 'lodash/throttle';

const form = document.querySelector('.feedback-form');
const LOCAL_STORAGE = 'feedback-form-state';
let items = {};

const formSubmit = e => {
  e.preventDefault();

  if (form.email.value === '' || form.message.value === '') {
    e.currentTarget.reset();
    alert('All fields are required!');
  } else {
    console.log(items);

    e.currentTarget.reset();
    localStorage.removeItem(LOCAL_STORAGE);
    items = {};
  }
};
const textAreaInput = e => {
  items[e.target.name] = e.target.value;
  localStorage.setItem(LOCAL_STORAGE, JSON.stringify(items));
};
const populateForm = () => {
  const saveObj = JSON.parse(localStorage.getItem(LOCAL_STORAGE));

  for (const key in saveObj) {
    if (key) {
      form[key].value = populateForm[key];
      items = saveObj;
    }
  }
};
form.addEventListener('submit', formSubmit);
form.addEventListener('input', throttle(textAreaInput, 500));
populateForm();
