import React from "react";

function PopupZoom({ card, onClose }) {
  return (
    <div className={`popup popup_type_image ${card && 'popup_visible'}`}>
      <figure className="album">
        <button
          className="popup__close-btn popup__close-btn_type_image"
          type="button"
          onClick={onClose}
        />
        <img
          className="album__image"
          src={card ? card.link : ''}
          alt={card ? card.name : ''} />
        <figcaption className="album__image-capture">
          {card ? card.name : ''}
        </figcaption>
      </figure>
    </div>
  )
}

export default PopupZoom;
