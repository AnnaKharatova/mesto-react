import PopupWithForm from "./PopupWithForm";

function EditPopupWithProfile(props) {
    return (
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            buttonName="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
        >
            <input className="popup__input" id="popup-profile-name" type="text" name="name" placeholder="Введите имя"
                minLength="2" maxLength="40" required />
            <span className="popup__input-error popup-profile-name-error"></span>
            <input className="popup__input" id="popup-profile-profession" type="text" placeholder="Введите сферу деятельности"
                name="profession" minLength="2" maxLength="200" required />
            <span className="popup__input-error popup-profile-profession-error"></span>
        </PopupWithForm>
    )
}

export default EditPopupWithProfile;