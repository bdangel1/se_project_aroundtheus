export function resetFormErrors(formEl, settings) {
  const inputList = Array.from(formEl.querySelectorAll(settings.inputSelector));
  inputList.forEach((input) => {
    hideInputError(inputList, formEl, settings);
  });
}
const showInputError = (input, formEl, { inputErrorClass }) => {
  const ErrorSpan = formEl.querySelector(`#${input.id}-error`);
  ErrorSpan.textContent = input.validationMessage;
  input.classList.add(inputErrorClass);
};
const hideInputError = (input, formEl, { inputErrorClass }) => {
  const ErrorSpan = formEl.querySelector(`#${input.id}-error`);
  ErrorSpan.textContent = "";
  input.classList.remove(inputErrorClass);
};
const checkInputValidity = (input, formEl, settings) => {
  if (input.validity.valid) {
    hideInputError(input, formEl, settings);
  } else {
    showInputError(input, formEl, settings);
  }
};
const hasValidInputs = (inputList) =>
  inputList.every((input) => input.validity.valid === true);

function enableButton(button, settings) {
  button.classList.remove(settings.inactiveButtonClass);
  button.disabled = false;
}
export function disableButton(button, settings) {
  button.classList.add(settings.inactiveButtonClass);
  button.disabled = true;
}
const toggleButton = (inputList, button, settings) => {
  if (hasValidInputs(inputList)) {
    enableButton(button, settings);
  } else {
    disableButton(button, settings);
  }
};
const setEventListener = (formEl, settings) => {
  const inputList = Array.from(formEl.querySelectorAll(settings.inputSelector));
  const submitButton = formEl.querySelector(settings.submitButtonSelector);
  inputList.forEach((input) => {
    input.addEventListener("input", (evt) => {
      checkInputValidity(input, formEl, settings);
      toggleButton(inputList, submitButton, settings);
    });
  });
};
export function enableValidation(settings) {
  const formElements = Array.from(
    document.querySelectorAll(settings.formSelector)
  );
  formElements.forEach((formEl) => {
    formEl.addEventListener("submit", (evt) => evt.preventDefault());
    setEventListener(formEl, settings);
  });
}

export const settings = {
  formSelector: ".popup__form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type-error",
  errorClass: "form__error_visible",
};
