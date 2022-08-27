export class Card {
  constructor(data, cardTemplateSelector, handleImageClick) {
    this._data = data;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleImageClick = handleImageClick;
  }
  _getTemplate() {
    return document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector(".card");
  }
  _handleCardDeleteButton = () => this._cardElement.remove();

  _handleLikeButton = (evt) => {
    evt.target.classList.toggle("card__like-button_filled");
  };

  _addEventListener() {
    this._cardImage.addEventListener("click", () => this._handleImageClick());
    this._cardDeleteButton.addEventListener(
      "click",
      this._handleCardDeleteButton
    );
    this._cardLikeButton.addEventListener("click", this._handleLikeButton);
  }

  createCard = () => {
    this._cardElement = this._getTemplate().cloneNode(true);
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardDeleteButton = this._cardElement.querySelector(
      ".card__trash-button"
    );
    this._cardLikeButton =
      this._cardElement.querySelector(".card__like-button");
    this._cardImage.style.backgroundImage = `url(${this._data.link})`;
    this._cardElement.querySelector(".card__title").textContent =
      this._data.name;
    this._addEventListener();
    return this._cardElement;
  };
}
