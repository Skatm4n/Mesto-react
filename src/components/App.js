import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../utils/CurrentUser';
import api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import PopupEditData from './PopupEditData';
import PopupEditAvatar from './PopupEditAvatar';
import PopupAddCard from './PopupAddCard';
import ImagePopup from './ImagePopup';
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
        setCards(cards.filter((cardOld) => cardOld !== card))
      })
      .catch((err) => {
        console.log(`${err}`);
      })
  }

  function handleCardLike(card) {

    const isLiked = card.likes.some(like => like._id === currentUser._id);

    api.changeCardLikeStatus(card._id, !isLiked)
      .then(newCard => {
        setCards(state =>
          state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch(err => {
        console.log(`${err}`);
      })
  }

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
          onLikeClick={handleCardLike}
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

        <PopupWithForm
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

        <ImagePopup
          card={cardSelect}
          onClose={closeAllPopups}
        />

      </div>
    </CurrentUserContext.Provider>
  );

}

export default App;

