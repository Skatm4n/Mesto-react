import React, { useContext } from "react";
import { CurrentUserContext } from "../utils/CurrentUser";
import Card from "./Card";
import Load from "./Load";

function Main(props) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">

      <section className="profile">
        <div className="avatar">
          <div className="avatar__image-edit">
            <img
              src={currentUser.avatar}
              alt="аватарка пользователя"
              className="avatar__image"
              onClick={props.onEditAvatar}
            />

          </div>
          <div className="avatar__info">
            <h1 className="avatar__name">{currentUser.name}</h1>
            <p className="avatar__description">{currentUser.about}</p>
            <button
              name="changeInfo"
              type="button"
              className="avatar__edit-button"
              onClick={props.onEditData}
            />
          </div>
        </div>
        <button
          name="addNew"
          type="button"
          className="profile__add-button"
          onClick={props.onAddCard}
        />
      </section>

      <section className="posts">
        {
          props.isLoad ?
            <Load />
            :
            <ul className="posts__items">
              {
                props.cards.map((card) => (
                  <Card
                    card={card}
                    key={card._id}
                    onClick={props.onCardClick}
                    onLikeClick={props.onLikeClick}
                    onDeleteClick={props.onDeleteClick}
                  />
                ))
              }
            </ul>
        }
      </section>
    </main>
  );
}

export default Main;
