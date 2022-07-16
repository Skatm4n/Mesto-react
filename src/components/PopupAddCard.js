import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function PopupAddCard(props) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleNameInput(evt) {
    setName(evt.target.value);
  }

  function handleLinkInput(evt) {
    setLink(evt.target.value);
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();

    props.onAddCard({
      name: name,
      link: link
    });
  }

  //Clear
  useEffect(() => {
    setName('');
    setLink('');
  },
    [props.isOpen])

  return (
    <PopupWithForm
      name='add'
      title="Новое место"
      bText='Создать'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleFormSubmit}
    >
      <input
        name="name"
        type="text"
        id="image-title-input"
        className="popup__form-item popup__form-item_type_place"
        placeholder="Название"
        required=""
        minLength={2}
        maxLength={30}
        value={name}
        onChange={handleNameInput}
      />
      <span className="popup__error image-title-input-error" />
      <input
        name="link"
        type="url"
        id="image-url-input"
        className="popup__form-item popup__form-item_type_link"
        placeholder="Ссылка на картинку"
        required=""
        value={link}
        onChange={handleLinkInput}
      />
      <span className="popup__error image-url-input-error" />
    </PopupWithForm>
  )
}

export default PopupAddCard;
