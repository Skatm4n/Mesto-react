
const btnEditProfile = document.querySelector('.avatar__edit-button');
const btnAddCard = document.querySelector('.profile__add-button');
const btnEditAvatar = document.querySelector('.avatar__image-edit');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');

const popupImage = '.popup_type_image';
const popupEditSelector = '.popup_type_edit';
const popupAddSelector = '.popup_type_add';
const popupEditAvatarSelector = '.popup_type_edit-avatar';
const popupDeleteCardSelector = '.popup_type_submit-deleting'
const cardSectionSelector = '.posts';
const cardTemplateSelector = '.card-template';
const profileNameSelector = '.avatar__name';
const profileDescriptionSelector = '.avatar__description';
const profileAvatarSelector = '.avatar__image';

const cardSection = document.querySelector('.posts');
const nameValue = document.querySelector('.popup__form-item_type_name');
const descriptionValue = document.querySelector('.popup__form-item_type_description');

const paramConfig = {
  formElement: '.popup__form',
  inputElement: '.popup__form-item',
  inputError: 'popup__form-item_error',
  error: 'popup__error_active',
  submitButton: '.popup__form-btn',
  submitBtnDisabled: 'popup__form-btn_disabled'
};

export {
  btnEditProfile,
  btnAddCard,
  btnEditAvatar,
  popupEdit,
  popupAdd,
  popupEditAvatar,
  popupImage,
  cardSectionSelector,
  cardTemplateSelector,
  profileNameSelector,
  profileDescriptionSelector,
  profileAvatarSelector,
  popupEditAvatarSelector,
  nameValue,
  descriptionValue,
  paramConfig,
  popupAddSelector,
  popupEditSelector,
  popupDeleteCardSelector,
  cardSection
}
