import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../utils/CurrentUser';
import api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupForm from './PopupForm';
import PopupEditData from './PopupEditData';
import PopupEditAvatar from './PopupEditAvatar';
import PopupAddCard from './PopupAddCard';
import PopupZoom from './PopupZoom';
import './../index.css';


function App() {

  const [currentUser, setCurrentUser] = useState({
    name: '',
    description: '',
    link: ''
  });
  const [isPopupEditDataOpen, setPopupEditDataOpen] = useState(false);
  const [isPopupEditAvatarOpen, setPopupEditAvatarOpen] = useState(false);
  const [isPopupAddCardOpen, setPopupAddCardOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [cardSelect, setCardSelect] = useState(null);
  const [isLoad, setIsLoad] = useState(false);

  //initial cards loadiiiiiiing...
  useEffect(() => {
    Promise.all([api.takeUserInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch(err => {
        console.log(`Ошибка получения данных ${err}`);
      })
      .finally(() => {
        setIsLoad(false);
      });
  }, [])

  function handleUserData(data) {
    api.editUserInfo(data)
      .then(res => {
        setCurrentUser(res);
      })
      .then(() => {
        setPopupEditDataOpen(false);
      })
      .catch(err => {
        console.log(`Ошибка отправки данных пользователя ${err}`);
      })
  }

  function handleAvatarUpdate(data) {
    api.editAvatar(data)
      .then(res => {
        setCurrentUser(res);
      })
      .then(() => {
        setPopupEditAvatarOpen(false);
      })
      .catch(err => {
        console.log(`Ошибка загрузки аватара ${err}`)
      })
  }

  function handleAddCard(data) {
    api.addCard(data)
      .then(newCard => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        setPopupAddCardOpen(false);
      })
      .catch(err => {
        console.log(`Ошибка публикации ${err}`);
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((cardOld) => cardOld._id !== card._id))
      })
      .catch((err) => {
        console.log(`${err}`);
      })
  }

  /*function handleCardLike(card) {

    const isLiked = card.like.some(like => like._id === currentUser._id);

    if(isLiked) {
      api.reduceCardLike
    }
  }*/



  function handlePopupEditData() {
    setPopupEditDataOpen(!isPopupEditDataOpen);
  }

  function handlePopupEditAvatar() {
    setPopupEditAvatarOpen(!isPopupEditAvatarOpen);
  }

  function handlePopupAddCard() {
    setPopupAddCardOpen(!isPopupAddCardOpen);
  }

  function handleCardclick(card) {
    setCardSelect(card);
  }

  function closeAllPopups() {
    setPopupEditDataOpen(false);
    setPopupEditAvatarOpen(false);
    setPopupAddCardOpen(false);
    setCardSelect(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>

        <Header />

        <Main
          isLoad={isLoad}
          cards={cards}
          onEditData={handlePopupEditData}
          onEditAvatar={handlePopupEditAvatar}
          onAddCard={handlePopupAddCard}
          onCardClick={handleCardclick}
          onDeleteClick={handleCardDelete}
        />

        <Footer />

        <PopupEditData
          isOpen={isPopupEditDataOpen}
          onClose={closeAllPopups}
          onUpdateData={handleUserData}
          bText='Сохранить'
        />

        <PopupEditAvatar
          isOpen={isPopupEditAvatarOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleAvatarUpdate}
          bText='Сохранить'
        />

        <PopupForm
          name='submit-deleting'
          title='Вы уверены?'
          bText='Да'
          onClose={closeAllPopups}
        />

        <PopupAddCard
          isOpen={isPopupAddCardOpen}
          onAddCard={handleAddCard}
          bText='Сохранить'
          onClose={closeAllPopups}
        />

        <PopupZoom
          card={cardSelect}
          onClose={closeAllPopups}
        />

      </div>
    </CurrentUserContext.Provider>
  );

}

export default App;
