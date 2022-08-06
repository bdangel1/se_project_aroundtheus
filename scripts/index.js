// imports

import FormValidator from "./FormValidator.js";
import { Card } from "./Card.js";
import { closeModal, openModal } from "./utils.js";
import { PopupWithForm } from "./popupwithform.js";
import { popupWithImage } from "./popupWithImage.js";
import { Section } from "./Section.js";
import { UserInfo } from "./UserInfo.js";

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

// eventHandlers
openEditModalButton.addEventListener("click", function () {
  const profileData = userInfo.getUserInfo();
  openModal(profileModal);
  // addProfilePopup.open();
  inputName.value = profileData.name;
  inputJob.value = profileData.job;
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
const profileFormValidator = new FormValidator(settings, profileModalForm);
const addCardFormValidator = new FormValidator(settings, addCardModalForm);
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

const handleAddCardSubmit = (data) => {
  renderCard({ name: data["title"], name: link["link"] }, cardsList);
  addCardPopup.close();
};

const handleProfileFormSubmit = (data) => {
  userInfo.setUserInfo(data.name, data.job);
  addProfilePopup.close();
};

const addCardPopup = new PopupWithForm(
  ".popup__form_card",
  handleAddCardSubmit
);
addCardPopup.setEventListeners();

const addProfilePopup = new PopupWithForm(
  ".popup__form_profile",
  handleProfileFormSubmit
);
addProfilePopup.setEventListeners();

const imagePopup = new popupWithImage(".popup__image");
imagePopup.addEventListener();

// wrappers

const cardTemplateSelector = "#card-template";
const renderCard = (data) => {
  const card = new Card(data, cardTemplateSelector, () => {
    imagePopup.open(data.name, data.link);
  });

  const cardElement = card.createCard();
  section.addItems(cardElement);
};

const section = new Section(
  { items: initialCards, renderer: renderCard },
  ".cards__list"
);
section.renderItems();
const userInfo = new UserInfo({
  profileNameSelector: ".profile__name-info",
  profileJobSelector: ".profile__info-job",
});

// submit
// profileModalForm.addEventListener("submit", function (event) {
//   event.preventDefault();
//   console.log("mmm");
//   closeModal(profileModal);
// });

// addCardModalForm.addEventListener("submit", function (e) {
//   e.preventDefault();
//   closeModal(addCardModal);
// });
