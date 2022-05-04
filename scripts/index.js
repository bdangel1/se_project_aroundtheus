// declarations
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

//  modals
const profileModal = document.querySelector(".popup_type_profile");
const addCardModal = document.querySelector(".popup_type_add-card");
const previewModal = document.querySelector(".popup_type_preview");

// buttons and other DOM elements
const openEditModalButton = document.querySelector(".profile__name-button");
const openAddCardModalButton = document.querySelector(".profile__button-add");
const openPreviewModalButton = document.querySelector(".card__image");
const closeEditModalButton = document.querySelector(".popup__close_profile");
const closeAddCardModalButton = document.querySelector(".popup__close_card");
const closePreviewModalButton = document.querySelector(".popup__close_preview");
const profileName = document.querySelector(".profile__name-info");
const profileJob = document.querySelector(".profile__info-job");

// functions
function onImagePreview(card) {
  const popupImage = previewModal.querySelector(".popup__image");
  popupImage.src = card.link;
  popupImage.alt = `image preview${card.name}`;
  toggleModal(previewModal);
}

function toggleModal(modal) {
  modal.classList.toggle("popup_open");
}

// eventHandlers
openEditModalButton.addEventListener("click", function () {
  toggleModal(profileModal);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
});
openAddCardModalButton.addEventListener("click", function () {
  toggleModal(addCardModal);
});
closeEditModalButton.addEventListener("click", () => {
  toggleModal(profileModal);
});
closeAddCardModalButton.addEventListener("click", () => {
  toggleModal(addCardModal);
});
closePreviewModalButton.addEventListener("click", () => {
  toggleModal(previewModal);
});

// Forms
const profileModalForm = document.querySelector(".popup__form_profile");
const addCardModalForm = document.querySelector(".popup__form_card");
const inputName = document.querySelector(".form__input_type_name");
const inputJob = document.querySelector(".form__input_type_job");
const inputTitle = document.querySelector(".form__input_type_title");
const inputLink = document.querySelector(".form__input_type_url");

profileModalForm.addEventListener("submit", function (event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  toggleModal(profileModal);
});
addCardModalForm.addEventListener("submit", function (e) {
  e.preventDefault();
  renderCard({ name: inputTitle.value, link: inputLink.value });
  addCardModalForm.reset();
  toggleModal(addCardModal);
});

// wrappers
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

//  card create
const createCard = (card) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__trash-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardImage.style.backgroundImage = `url(${card.link})`;
  cardTitle.textContent = card.name;
  cardImage.addEventListener("click", () => onImagePreview(card));
  cardDeleteButton.addEventListener("click", () => cardElement.remove());
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_filled");
  });
  return cardElement;
};

const renderCard = (card) => {
  const cardElement = createCard(card);
  cardsList.prepend(cardElement);
};
initialCards.forEach(renderCard);
