// imports
import { api } from "../scripts/Api.js";
import "./index.css";
import FormValidator from "../scripts/FormValidator.js";
import { Card } from "../scripts/Card.js";
import { PopupWithForm } from "../scripts/PopupWithForm.js";
import { PopupWithImage } from "../scripts/PopupWithImage.js";
import { Section } from "../scripts/Section.js";
import { UserInfo } from "../scripts/UserInfo.js";
import {
  openEditModalButton,
  openAddCardModalButton,
  cardsList,
  profileModalForm,
  addCardModalForm,
  inputName,
  inputJob,
  avatar,
  avatarWindow,
} from "../utils/constants.js";

const settings = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type-error",
  errorClass: "form__input-error",
};

// promise
let userId;
Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData.name, userData.about);
    section.renderItems(cards);
  })
  .catch(console.log);

// Handlers
const handleAddCardSubmit = (data) => {
  addCardPopup.changeText("saving...");
  api
    .addCard({ name: data["title"], link: data.link })
    .then((res) => {
      renderCard(res, cardsList);
      addCardPopup.changeText("save");
    })
    .catch(console.log);
  addCardPopup.close();
};

const handleProfileFormSubmit = (data) => {
  addProfilePopup.changeText("saving...");
  api
    .editProfile({ name: data.name, about: data.job })
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
      addProfilePopup.changeText("save");
    })
    .catch(console.log)
    .finally(() => {
      addProfilePopup.close();
    });
};

const handleAvatarFormSubmit = (data) => {
  console.log("data =>", data);
  api
    .editAvatar(data.link)
    .then((res) => {
      console.log("res =>", res);
      userInfo.setUserInfo(res.name, res.about, res.avatar);
    })
    .catch(console.log)
    .finally(() => {
      avatarChangePopup.close();
    });
};

const handleDeleteClick = (card) => {
  confirmDeletePopup.open();
  confirmDeletePopup.changeHandleSubmit(() => {
    api.deleteCard(card.getId()).then(() => {
      card.cardRemove();
      confirmDeletePopup.close();
    });
  });
};

const handleLikeClick = (card) => {
  if (card.isLiked()) {
    api.removeLike(card.getId()).then((res) => {
      card.setLikes(res.likes);
    });
  } else {
    api.addLike(card.getId()).then((res) => {
      card.setLikes(res.likes);
    });
  }
};

// instances
const addCardPopup = new PopupWithForm(
  ".popup_type_add-card",
  handleAddCardSubmit
);

const addProfilePopup = new PopupWithForm(
  ".popup_type_profile",
  handleProfileFormSubmit
);

const imagePopup = new PopupWithImage(".popup_type_preview");

const avatarChangePopup = new PopupWithForm(
  ".popup_type_avatar-change",
  handleAvatarFormSubmit
);

const confirmDeletePopup = new PopupWithForm(".popup_type_confirm-delete");

const userInfo = new UserInfo({
  profileNameSelector: ".profile__name-info",
  profileJobSelector: ".profile__info-job",
  userAvatarSelector: ".profile__image",
});

// rendercard
const cardTemplateSelector = "#card-template";
const renderCard = (data) => {
  const card = new Card(
    data,
    userId,
    cardTemplateSelector,
    () => {
      imagePopup.open(data.name, data.link);
    },
    () => handleLikeClick(card),
    () => handleDeleteClick(card)
  );

  const cardElement = card.createCard();
  section.addItem(cardElement);
};
const section = new Section({ renderer: renderCard }, ".cards__list");

// setEvenListeners
avatarChangePopup.setEventListeners();
imagePopup.setEventListeners();
confirmDeletePopup.setEventListeners();
addProfilePopup.setEventListeners();
addCardPopup.setEventListeners();

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
avatar.addEventListener("click", () => {
  avatarChangePopup.open();
});

// form
const profileFormValidator = new FormValidator(settings, profileModalForm);
const addCardFormValidator = new FormValidator(settings, addCardModalForm);
const avatarFormValidator = new FormValidator(settings, avatarWindow);

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
avatarFormValidator.enableValidation();
