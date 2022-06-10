// imports

import FormValidator from "./FormValidator.js";
import { Card } from "./Card.js";
import { closeModal, handleImagePreview, openModal } from "./utils.js";

const settings = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type-error",
  errorClass: "form__input-error",
};

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
const closeEditModalButton = document.querySelector(".popup__close_profile");
const closeAddCardModalButton = document.querySelector(".popup__close_card");
const closePreviewModalButton = document.querySelector(".popup__close_preview");
const profileName = document.querySelector(".profile__name-info");
const profileJob = document.querySelector(".profile__info-job");

// eventHandlers
openEditModalButton.addEventListener("click", function () {
  openModal(profileModal);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  profileFormValidator.resetFormErrors();
});
const addCardSubmitButton = document.querySelector(".form__button_disabled");
openAddCardModalButton.addEventListener("click", function () {
  openModal(addCardModal);
  addCardModalForm.reset();
  addCardFormValidator._disableButton(addCardSubmitButton, settings);

  addCardFormValidator.resetFormErrors(addCardModalForm, settings);
});
closeEditModalButton.addEventListener("click", () => {
  closeModal(profileModal);
  profileModalForm.reset();
});

closeAddCardModalButton.addEventListener("click", () => {
  closeModal(addCardModal);
});
closePreviewModalButton.addEventListener("click", () => {
  closeModal(previewModal);
});

// Forms
const profileModalForm = document.querySelector(".popup__form_profile");
const addCardModalForm = document.querySelector(".popup__form_card");
const inputName = document.querySelector(".form__input_type_name");
const inputJob = document.querySelector(".form__input_type_job");
const inputTitle = document.querySelector(".form__input_type_title");
const inputLink = document.querySelector(".form__input_type_url");
const profileFormValidator = new FormValidator(settings, profileModalForm);
const addCardFormValidator = new FormValidator(settings, addCardModalForm);
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
profileModalForm.addEventListener("submit", function (event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closeModal(profileModal);
});

// Card Create

addCardModalForm.addEventListener("submit", function (e) {
  e.preventDefault();
  renderCard({ name: inputTitle.value, link: inputLink.value }, cardsList);
  closeModal(addCardModal);
});

// wrappers

const cardsList = document.querySelector(".cards__list");

const cardTemplateSelector = "#card-template";
const renderCard = (data, cardsList) => {
  const card = new Card(data, cardTemplateSelector, handleImagePreview);
  const cardElement = card.createCard();
  cardsList.prepend(cardElement);
};
initialCards.forEach((data) => {
  renderCard(data, cardsList);
});
