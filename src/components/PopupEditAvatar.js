import React, { useContext, useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../utils/CurrentUser";

function PopupEditAvatar(props) {

  const currentUser = useContext(CurrentUserContext);

  //Life cycle of edit avatar window
  const avatarSrc = useRef('');

  useEffect(() => {
    avatarSrc.current.value = currentUser.avatar;
  },
    [currentUser]);

  useEffect(() => {
    avatarSrc.current.value = '';
  },
    [props.isOpen])

  function handleFormSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarSrc.current.value
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      bText='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleFormSubmit}
    >
      <input
        name="link"
        type="url"
        id="avatar-url-input"
        className="popup__form-item popup__form-item_type_avatar"
        placeholder="Ссылка"
        required=""
        ref={avatarSrc}
      />
      <span className="popup__error avatar-url-input-error" />
    </PopupWithForm>
  )
}

export default PopupEditAvatar;
