export class Card {
  constructor(
    data,
    userId,
    cardTemplateSelector,
    handleImageClick,
    handleLikeButton,
    handleDeleteClick
  ) {
    this._data = data;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleImageClick = handleImageClick;
    this._likes = data.likes;
    this._id = data._id;
    this._handleLikeButton = handleLikeButton;
    this._userId = userId;
    this._handleDeleteClick = handleDeleteClick;
    this._ownerId = data.owner._id;
  }
  getId() {
    return this._id;
  }
  _getTemplate() {
    return document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector(".card");
  }
  removeCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  isLiked() {
    return this._likes.some((user) => user._id === this._userId);
  }

  renderLikes(newLikes) {
    this._likes = newLikes;
    const cardLikedByCurrentUser = this.isLiked();
    if (cardLikedByCurrentUser) {
      this._cardLikeButton.classList.add("card__like-button_filled");
    } else {
      this._cardLikeButton.classList.remove("card__like-button_filled");
    }
  }

  // create card
  createCard = () => {
    this._cardElement = this._getTemplate().cloneNode(true);
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardDeleteButton = this._cardElement.querySelector(
      ".card__trash-button"
    );
    this._cardLikeButton =
      this._cardElement.querySelector(".card__like-button");
    const likesAmount = this._likes.length;
    const cardLikeCount = this._cardElement.querySelector(".card__likes-count");
    cardLikeCount.textContent = likesAmount;
    this._cardImage.style.backgroundImage = `url(${this._data.link})`;
    this._cardElement.querySelector(".card__title").textContent =
      this._data.name;
    this._addEventListeners();

    this.renderLikes(this._likes);
    if (this._userId !== this._ownerId) {
      this._cardElement.querySelector(".card__trash-button").style.display =
        "none";
    }
    return this._cardElement;
  };

  // private events
  _addEventListeners = () => {
    this._cardImage.addEventListener("click", () => this._handleImageClick());
    this._cardDeleteButton.addEventListener("click", () =>
      this._handleDeleteClick(this)
    );

    this._cardLikeButton.addEventListener("click", this._handleLikeButton);
  };
}
