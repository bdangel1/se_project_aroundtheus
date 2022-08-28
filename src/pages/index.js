// imports
import "./index.css";
import FormValidator from "../scripts/FormValidator.js";
import { Card } from "../scripts/Card.js";
import { PopupWithForm } from "../scripts/PopupWithForm.js";
import { PopupWithImage } from "../scripts/PopupWithImage.js";
import { Section } from "../scripts/Section.js";
import { UserInfo } from "../scripts/UserInfo.js";
import {
  initialCards,
  openEditModalButton,
  openAddCardModalButton,
  cardsList,
  profileModalForm,
  addCardModalForm,
  inputName,
  inputJob,
} from "../utils/constants.js";

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

const imagePopup = new PopupWithImage(".popup_type_preview");
imagePopup.setEventListeners();

// rendercard
const cardTemplateSelector = "#card-template";
const renderCard = (data) => {
  const card = new Card(data, cardTemplateSelector, () => {
    imagePopup.open(data.name, data.link);
  });

  const cardElement = card.createCard();
  section.addItem(cardElement);
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
  addCardFormValidator.disableButton(addCardSubmitButton, settings);

  addCardFormValidator.resetFormErrors(addCardModalForm, settings);
});

// form
const profileFormValidator = new FormValidator(settings, profileModalForm);
const addCardFormValidator = new FormValidator(settings, addCardModalForm);
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
