const formData = {
  email: "",
  message: ""
};

const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageTextarea = form.elements.message;

const STORAGE_KEY = "feedback-form-state";

const saveDataToLocalStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

const loadDataFromLocalStorage = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    emailInput.value = parsedData.email || "";
    messageTextarea.value = parsedData.message || "";
    formData.email = parsedData.email || "";
    formData.message = parsedData.message || "";
  }
};

form.addEventListener('input', (event) => {
  formData[event.target.name] = event.target.value;
  saveDataToLocalStorage();
});

window.addEventListener('DOMContentLoaded', loadDataFromLocalStorage);

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  formData.email = "";
  formData.message = "";
  form.reset();
});