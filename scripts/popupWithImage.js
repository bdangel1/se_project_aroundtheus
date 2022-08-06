import { Popup } from "./popup.js";
export class popupWithImage extends Popup {
  open(name, link) {
    const caption = this._popup.querySelector(".popup__caption");
    const image = this._popup.querySelector(".popup__image");

    caption.textContent = name;
    image.src = link;
    super.open();
  }
}
