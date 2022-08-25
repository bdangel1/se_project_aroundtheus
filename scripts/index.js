// imports

import FormValidator from "./formValidator.js";
import { Card } from "./card.js";
import { PopupWithForm } from "./popupWithForm.js";
import { popupWithImage } from "./popupWithImage.js";
import { Section } from "./section.js";
import { UserInfo } from "./userInfo.js";
import {
  initialCards,
  openEditModalButton,
  openAddCardModalButton,
  cardsList,
  profileModalForm,
  addCardModalForm,
  inputName,
  inputJob,
} from "./constants.js";

const settings = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type-error",
  errorClass: "form__input-error",
};

// instances

const handleAddCardSubmit = (data) => {
  renderCard({ name: data["title"], link: data["link"] }, cardsList);
  addCardPopup.close();
};
const addCardPopup = new PopupWithForm(
  ".popup_type_add-card",
  handleAddCardSubmit
);
addCardPopup.setEventListeners();

const handleProfileFormSubmit = (data) => {
  userInfo.setUserInfo(data.name, data.job);
  addProfilePopup.close();
};

const addProfilePopup = new PopupWithForm(
  ".popup_type_profile",
  handleProfileFormSubmit
);
addProfilePopup.setEventListeners();

const imagePopup = new popupWithImage(".popup_type_preview");
imagePopup.setEventListeners();

// rendercard
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
// eventHandlers
openEditModalButton.addEventListener("click", function () {
  const profileData = userInfo.getUserInfo();
  addProfilePopup.open();

  inputName.value = profileData.name;
  inputJob.value = profileData.job;
  profileFormValidator.resetFormErrors();
});

const addCardSubmitButton = document.querySelector(".form__button_disabled");
openAddCardModalButton.addEventListener("click", function () {
  addCardPopup.open();
  addCardFormValidator._disableButton(addCardSubmitButton, settings);

  addCardFormValidator.resetFormErrors(addCardModalForm, settings);
});

// form
const profileFormValidator = new FormValidator(settings, profileModalForm);
const addCardFormValidator = new FormValidator(settings, addCardModalForm);
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
