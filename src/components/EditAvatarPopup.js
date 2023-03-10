import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            buttonName="Создать"
            isOpen={props.isOpen}
            onClose={props.onClose}
        >
            <input className="popup__input" id="popup-avatar-url" type="url"
                placeholder="https://somewebsite.com/someimage.jpg" name="link" required />
            <span className="popup__input-error popup-avatar-url-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;