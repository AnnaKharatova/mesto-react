import Card from './Card.js'

function Main(props) {

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__info">
                    <div className="profile__avatar-edit">
                        <img className="profile__avatar" src={props.userAvatar} alt="Фото пользователя" />
                        <button onClick={props.onEditAvatar} className="profile__avatar-button " type="button" id="profile__avatar-button"></button>
                    </div>
                    <div className="profile__about">
                        <h1 className="profile__name" id="profile__name">{props.userName}</h1>
                        <p className="profile__profession" id="profile__profession">{props.userDescription}</p>
                    </div>
                </div>
                <button onClick={props.onEditProfile} className="profile__edit-button" type="button"></button>
                <button onClick={props.onAddPlace} className="profile__add-button" type="button" id="profile__add-button"></button>
            </section>
            <section>
                <div className="elements">
                    {props.cards.map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={props.onCardClick} />
                    ))}
                </div>
            </section>
        </main>
    )
}


export default Main;
