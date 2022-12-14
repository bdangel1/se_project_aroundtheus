// imports
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { api } from "../utils/Api.js";
import "./index.css";
import FormValidator from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
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
    userInfo.setAvatar(userData.avatar);
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
      addCardPopup.close();
    })
    .catch(console.log)
    .finally(() => {
      addCardPopup.changeText("save");
    });
};

const handleProfileFormSubmit = (data) => {
  addProfilePopup.changeText("saving...");
  api
    .editProfile({ name: data.name, about: data.job })
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
      addProfilePopup.close();
    })
    .catch(console.log)
    .finally(() => {
      addProfilePopup.changeText("save");
    });
};

const handleAvatarFormSubmit = (data) => {
  avatarChangePopup.changeText("loading...");
  api
    .editAvatar(data.link)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
      avatarChangePopup.close();
    })
    .catch(console.log)
    .finally(() => {
      avatarChangePopup.changeText("save");
    });
};

const handleDeleteClick = (card) => {
  confirmDeletePopup.open();
  confirmDeletePopup.changeHandleSubmit(() => {
    confirmDeletePopup.changeText("deleting...");
    api
      .deleteCard(card.getId())
      .then(() => {
        card.removeCard();
        confirmDeletePopup.close();
      })
      .finally(() => {
        confirmDeletePopup.changeText("yes");
      });
  });
};

const handleLikeClick = (card) => {
  if (card.isLiked()) {
    api
      .removeLike(card.getId())
      .then((res) => {
        card.setLikes(res.likes);
      })
      .catch(console.log);
  } else {
    api
      .addLike(card.getId())
      .then((res) => {
        card.setLikes(res.likes);
      })
      .catch(console.log);
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

const confirmDeletePopup = new PopupWithConfirmation(
  ".popup_type_confirm-delete"
);

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

// form
const profileFormValidator = new FormValidator(settings, profileModalForm);
const addCardFormValidator = new FormValidator(settings, addCardModalForm);
const avatarFormValidator = new FormValidator(settings, avatarWindow);

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

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

openAddCardModalButton.addEventListener("click", function () {
  addCardFormValidator.disableButton();
  addCardPopup.open();
  addCardFormValidator.resetFormErrors(addCardModalForm, settings);
});
avatar.addEventListener("click", () => {
  avatarChangePopup.open();

  avatarFormValidator.resetFormErrors();
});
