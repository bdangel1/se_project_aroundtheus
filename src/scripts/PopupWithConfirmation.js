import { Popup } from "./Popup";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = this._popup.querySelector(".popup__form");
    this._submitButton = this._popup.querySelector(".form__button");
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (e) => {
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
  }
}
