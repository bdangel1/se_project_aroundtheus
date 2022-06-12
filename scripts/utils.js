// imports
export const openModal = (modal) => {
  modal.classList.add("popup_open");
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("mousedown", handleMouseDown);
};

// functions
const previewModal = document.querySelector(".popup_type_preview");

const popupImage = previewModal.querySelector(".popup__image");
export function handleImagePreview(data) {
  popupImage.src = data.link;
  popupImage.alt = `image preview${data.name}`;
  openModal(previewModal);
}
const handleKeyDown = (evt) => {
  const openModal = document.querySelector(".popup_open");
  if (evt.key === "Escape" && openModal) {
    closeModal(openModal);
  }
};
const handleMouseDown = (evt) => {
  const openModal = document.querySelector(".popup_open");
  if (evt.target.classList.contains("popup_open")) {
    closeModal(openModal);
  }
};
export const closeModal = (modal) => {
  modal.classList.remove("popup_open");
  document.removeEventListener("keydown", handleKeyDown);
  document.removeEventListener("mousedown", handleMouseDown);
};
