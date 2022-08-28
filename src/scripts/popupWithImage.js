import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  open(name, link) {
    const image = document.querySelector(".popup__image");
    image.src = link;
    image.alt = name;
    super.open();
  }
}
