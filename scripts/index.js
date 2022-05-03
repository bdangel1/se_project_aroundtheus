//  modals
const profileModal = document.querySelector(".popup_type_profile");
const addCardModal = document.querySelector(".popup_type_add-card");
const previewModal = document.querySelector(".popup_type_preview");

// buttons and other DOM elements
const openEditModalButton = document.querySelector(".profile__name-button");
const openAddCardModalButton = document.querySelector(".profile__button-add");
const openPreviewModalButton = document.querySelector(".card__image");
const closeEditModalButton = document.querySelector(".popup_close_profile");
const closeaddCardModalButton = document.querySelector(".popup_close_add-card");
const closePreviewModalButton = document.querySelector(".popup_close_preview");
const profileName = document.querySelector(".profile__name-info");
const profileJob = document.querySelector(".profile__info-job");
const addCardName = document.querySelector(".card__title");
const addCardImage = document.querySelector(".card__image");

// functions
const onImagePreview = function openPreviewModal(card) {
  const popupImage = previewModal.querySelector(".popup__image");
  popupImage.src = card.link;
  previewModal.classList.add("popup_open");
};

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
  addCardModalForm.reset();
});
closeEditModalButton.addEventListener("click", () => {
  toggleModal(profileModal);
});
closeaddCardModalButton.addEventListener("click", () => {
  toggleModal(addCardModal);
});
closePreviewModalButton.addEventListener("click", () => {
  toggleModal(previewModal);
});

// Forms
const ProfileModalForm = document.querySelector(".popup__form_profile");
const addCardModalForm = document.querySelector(".popup__form_card");
const inputName = document.querySelector(".form__input_type_name");
const inputJob = document.querySelector(".form__input_type_job");
const inputTitle = document.querySelector(".form__input_type_title");
const inputUrl = document.querySelector(".form__input_type_url");

ProfileModalForm.addEventListener("submit", function (event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  toggleModal(profileModal);
});
addCardModalForm.addEventListener("submit", function (event) {
  event.preventDefault();
  toggleModal(addCardModal);
});

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

// wrappers
const cardsList = document.querySelector(".cards__list");

initialCards.forEach(function (card) {
  const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".cards__item");
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__trash-button");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardImage.style.backgroundImage = `url(${card.link})`;
  cardTitle.textContent = card.name;

  cardsList.append(cardElement);
  cardImage.addEventListener("click", () => onImagePreview(card));
  cardDeleteButton.addEventListener("click", () => cardElement.remove());
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_filled");
  });
});
