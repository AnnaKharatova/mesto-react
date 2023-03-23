import { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup'
import AddPlacePopup from './AddPlacePopup'
import EditAvatarPopup from './EditAvatarPopup'
import ConfirmationPopup from './ConfirmationPopup'
import ImagePopup from './ImagePopup'
import api from '../utils/api.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [cards, setCards] = useState([])
  const [selectedCard, showSelectedCard] = useState(null)
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then((data) => {
        setCurrentUser(data[0])
        setCards([...data[1]]);
      })
      .catch((err) => console.log(err));
  }, []);

  function addPlace(data) {
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateAvatar(data) {
    api.editAvatar(data)
      .then((newAvatar) => {
        setCurrentUser(newAvatar)
        closeAllPopups()
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateUser(data) {
    api.editUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData)
        closeAllPopups()
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((items) => items.filter((c) => c._id !== card._id && c));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      api.addLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
        .catch((err) => {
          console.error(err);
        });
    } else {
      api.deleteLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  function handleCardClick(card) {
    showSelectedCard(card)
  }
  function handleEditAvatarPopupOpen() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }
  function handleEditProfilePopupOpen() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
  }
  function handleAddPlacePopupOpen() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    showSelectedCard(null)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header />
          <Main
            onEditAvatar={handleEditAvatarPopupOpen}
            onEditProfile={handleEditProfilePopupOpen}
            onAddPlace={handleAddPlacePopupOpen}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser} />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={addPlace} />
          <ConfirmationPopup />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups} />
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
