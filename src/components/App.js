import React from 'react';
import { useState, useEffect } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditPopupWithProfile from './EditPopupWithProfile'
import AddCardPopup from './AddCardPopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import ConfirmationPopup from './ConfirmationPopup.js'
import ImagePopup from './ImagePopup.js'
import api from '../utils/Api.js'


function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [userData, getUserData] = useState({
    name: '',
    about: '',
    avatar: ''
  });
  const [cards, getCardsData] = useState([])
  const [selectedCard, showSelectedCard] = useState()

  useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        getCardsData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        getUserData(data);
      })
      .catch((err) => console.log(err));
  }, []);

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
    showSelectedCard(false)
  }

  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarPopupOpen}
          onEditProfile={handleEditProfilePopupOpen}
          onAddPlace={handleAddPlacePopupOpen}
          userName={userData.name}
          userDescription={userData.about}
          userAvatar={userData.avatar}
          onCardClick={handleCardClick}
          cards={cards}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups} />
        <EditPopupWithProfile
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups} />
        <AddCardPopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups} />
        <ConfirmationPopup />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups} />
        <Footer />
      </div>
    </div>
  )
}

export default App;