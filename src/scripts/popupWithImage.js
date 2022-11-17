import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._image = document.querySelector(".popup__image");
    this._caption = document.querySelector(".popup__image-caption");
  }
  open(name, link) {
    this._image.src = link;
    this._image.alt = "image view";
    this._caption.textContent = name;
    super.open();
  }
}
