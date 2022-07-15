import React, { useContext } from "react";
import { CurrentUserContext } from "../utils/CurrentUser";

function Card({ card, onClick, onDelete, onLike }) {

  const currentUser = useContext(CurrentUserContext);

  const isOwned = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(like => like._id === currentUser._id);

  const cardDeleteBtnClass = `card__delete-btn ${isOwned ? '' : 'card__delete-btn_disabled'}`;
  const cardLikeBtnClass = `card__like-btn ${isLiked ? 'card__like-btn_active' : ''}`;

  function handleCardClick() {
    onClick(card);
  }

  function handleLikeClick() {
    onLike(card);
  }

  function handleDeleteClick() {
    onDelete(card);
  }

  return (
    <li className="card">
      <img
        onClick={handleCardClick}
        src={card.link}
        alt={card.name}
        className="card__image" />
      <div className="card__info">
        <h2 className="card__title">
          {card.name}
        </h2>
        <div className="card__like">
          <button
            name="like"
            type="button"
            className={cardLikeBtnClass}
            onClick={handleLikeClick}
          />
          <p className="card__like-count">
            {card.likes.length}
          </p>
        </div>
      </div>
      <button
        name="delete"
        type="button"
        className={cardDeleteBtnClass}
        onClick={handleDeleteClick}
      />
    </li>
  );
}

export default Card;
