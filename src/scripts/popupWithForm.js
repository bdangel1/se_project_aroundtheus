import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._submitButton = this._popup.querySelector(".form__button");
    this._initialButtonText = this._submitButton.textContent;
  }
  _getInputValues() {
    const values = {};
    const inputs = [...this._form.querySelectorAll(".form__input")];
    inputs.forEach((input) => {
      const key = input.name;
      const value = input.value;
      values[key] = value;
    });
    return values;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  }
  changeHandleSubmit(newSubmit) {
    this._handleSubmit = newSubmit;
  }
  changeText(text) {
    this._submitButton.textContent = text;
  }
  close() {
    super.close();
    this._form.reset();
  }
}
