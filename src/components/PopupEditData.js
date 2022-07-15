import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../utils/CurrentUser";

function PopupEditData(props) {

  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

//Life cycle of edit profile data window
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [props.isOpen, currentUser]);

  const handleNameInput = (evt) => {
    setName(evt.target.value);
  }


  const handleDescriptionInput = (evt) => {
    setDescription(evt.target.value);
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();

    props.onUpdateData({
      name: name,
      about: description
    });
  }

  return (
    <PopupWithForm
      name='edit'
      title='Редактировать профиль'
      bText={props.bText}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleFormSubmit}
    >
      <input
        name="name"
        type="text"
        id="name-input"
        className="popup__form-item popup__form-item_type_name"
        placeholder="Имя"
        required=""
        minLength={2}
        maxLength={40}
        value={name}
        onChange={handleNameInput}
      />
      <span className="popup__error name-input-error" />
      <input
        name="about"
        type="text"
        id="description-input"
        className="popup__form-item popup__form-item_type_description"
        placeholder="Описание"
        required=""
        minLength={2}
        maxLength={200}
        value={description}
        onChange={handleDescriptionInput}
      />
      <span className="popup__error description-input-error" />

    </PopupWithForm>
  );

}

export default PopupEditData;
