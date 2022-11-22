// imports
class FormValidator {
  constructor(settings, formElement) {
    this.settings = settings;
    this._formElement = formElement;
    this._inputList = [...this._formElement.querySelectorAll(".form__input")];
    this._buttonEl = this._formElement.querySelector(
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

  _enableButton() {
    this._buttonEl.classList.remove(this.settings.inactiveButtonClass);
    this._buttonEl.disabled = false;
  }
  disableButton() {
    this._buttonEl.classList.add(this.settings.inactiveButtonClass);
    this._buttonEl.disabled = true;
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
    const errorEl = this._formElement.querySelector(`#${input.id}-error`);
    errorEl.textContent = input.validationMessage;
    input.classList.add(inputErrorClass);
  };
  _hideInputError = (input) => {
    const { inputErrorClass } = this.settings;
    const errorEl = this._formElement.querySelector(`#${input.id}-error`);
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
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButton();
      });
    });
  };
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => evt.preventDefault());
    this._setEventListener(this._formElement, this.settings);
  }
}

export default FormValidator;
