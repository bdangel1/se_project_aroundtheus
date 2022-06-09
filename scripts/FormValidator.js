class FormValidator {
  constructor(settings, formElements) {
    this.settings = settings;
    this.formElements = formElements;
  }
  resetFormErrors() {
    this.inputList.forEach((input) => {
      this._hideInputError(input);
    });
  }

  _hasValidInputs = () =>
    this.inputList.every((input) => input.validity.valid === true);

  _enableButton(button) {
    button.classList.remove(this.settings.inactiveButtonClass);
    button.disabled = false;
  }
  _disableButton(button) {
    button.classList.add(this.settings.inactiveButtonClass);
    button.disabled = true;
  }
  _toggleButton = () => {
    const button = this.formElements.querySelector(
      this.settings.submitButtonSelector
    );
    if (this._hasValidInputs()) {
      this._enableButton(button);
    } else {
      this._disableButton(button);
    }
  };
  _showInputError = (input) => {
    const { inputErrorClass } = this.settings;
    const errorSpan = this.formElements.querySelector(`#${input.id}-error`);
    errorSpan.textContent = input.validationMessage;
    input.classList.add(inputErrorClass);
  };
  _hideInputError = (input) => {
    const { inputErrorClass } = this.settings;
    const ErrorSpan = this.formElements.querySelector(`#${input.id}-error`);
    ErrorSpan.textContent = "";
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
    this.inputList = Array.from(
      this.formElements.querySelectorAll(inputSelector)
    );

    this.inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButton();
      });
    });
  };
  enableValidation() {
    this.formElements.addEventListener("submit", (evt) => evt.preventDefault());
    this._setEventListener(this.formElements, this.settings);
  }
}

export default FormValidator;
