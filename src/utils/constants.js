export const initialCards = [
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

// buttons and other DOM elements

export const openEditModalButton = document.querySelector(
  ".profile__name-button"
);
export const openAddCardModalButton = document.querySelector(
  ".profile__button-add"
);
export const cardsList = document.querySelector(".cards__list");

// Forms

export const profileModalForm = document.querySelector(".popup__form_profile");
export const addCardModalForm = document.querySelector(".popup__form_card");
export const inputName = document.querySelector(".form__input_type_name");
export const inputJob = document.querySelector(".form__input_type_job");
export const avatar = document.querySelector(".profile__image");
export const avatarWindow = document.querySelector(".popup_type_avatar-change");
