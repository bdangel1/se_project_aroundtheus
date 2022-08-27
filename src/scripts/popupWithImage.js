import { Popup } from "./popup.js";
export class popupWithImage extends Popup {
  open(link) {
    const image = document.querySelector(".popup__image");
    image.src = link;
    super.open();
  }
}
