// imports
class FormValidator {
  constructor(settings, formElement, inputSelector) {
    this.settings = settings;
    this.formElement = formElement;
    this._inputList = inputSelector;
    this._buttonEl = this.formElement.querySelector(
      this.settings.submitButtonSelector
    );
  }
  resetFormErrors() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  }

  _hasValidInputs = () =>
    this._inputList.every((input) => input.validity.valid === true);

  _enableButton(button) {
    button.classList.remove(this.settings.inactiveButtonClass);
    button.disabled = false;
  }
  disableButton(button) {
    button.classList.add(this.settings.inactiveButtonClass);
    button.disabled = true;
  }
  _toggleButton = () => {
    if (this._hasValidInputs()) {
      this._enableButton(this._buttonEl);
    } else {
      this.disableButton(this._buttonEl);
    }
  };
  _showInputError = (input) => {
    const { inputErrorClass } = this.settings;
    const errorEl = this.formElement.querySelector(`#${input.id}-error`);
    errorEl.textContent = input.validationMessage;
    input.classList.add(inputErrorClass);
  };
  _hideInputError = (input) => {
    const { inputErrorClass } = this.settings;
    const errorEl = this.formElement.querySelector(`#${input.id}-error`);
    errorEl.textContent = "";
    input.classList.remove(inputErrorClass);
  };
  _checkInputValidity = (input) => {
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input, input.validationMessage);
    }
  };
  _setEventListener = () => {
    const { inputSelector } = this.settings;
    this._inputList = [...this.formElement.querySelectorAll(inputSelector)];

    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButton();
      });
    });
  };
  enableValidation() {
    this.formElement.addEventListener("submit", (evt) => evt.preventDefault());
    this._setEventListener(this.formElement, this.settings);
  }
}

export default FormValidator;
