import { Popup } from "./Popup";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._submitButton = this._popup.querySelector(".form__button");
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleSubmit();
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
