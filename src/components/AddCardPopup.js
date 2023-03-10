import PopupWithForm from "./PopupWithForm";

function AddCardPopup(props) {
    return (
        <PopupWithForm
            name="card"
            title="Новое место"
            buttonName="Создать"
            isOpen={props.isOpen}
            onClose={props.onClose}
        >
            <input className="popup__input" id="popup-card-place" type="text" name="name" placeholder="Название" minLength="2"
                maxLength="30" required />
            <span className="popup__input-error popup-card-place-error "></span>
            <input className="popup__input" id="popup-card-url" type="url" placeholder="Ссылка на картинку" name="link"
                required />
            <span className="popup__input-error popup-card-url-error"></span>
        </PopupWithForm>
    )
}

export default AddCardPopup;

