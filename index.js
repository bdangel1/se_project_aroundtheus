const openEditModalButton = document.querySelector(".profile__button-edit");
const modal = document.querySelector(".modal");
const closeEditModalButton = document.querySelector(".modal__button");
const inputName = document.querySelector(".form__input_type_name");
const inputJob = document.querySelector(".form__input_type_job");
const profileName = document.querySelector(".profile__info-name");
const profileJob = document.querySelector(".profile__info-job");
const form = document.querySelector(".form");

function openModal() {
  modal.classList.add("modal_open");
}
function closeModal() {
  modal.classList.remove("modal_open");
}

openEditModalButton.addEventListener("click", function () {
  openModal();
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
});
form.addEventListener("submit", function (event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closeModal();
});
closeEditModalButton.addEventListener("click", closeModal);
