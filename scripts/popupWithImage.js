import { Popup } from "./popup.js";
export class popupWithImage extends Popup {
  open(name, link) {
    // const caption = document.querySelector(".popup__caption");
    const image = document.querySelector(".popup__image");
    // caption.textContent = name;
    image.src = link;
    super.open();
  }
}
