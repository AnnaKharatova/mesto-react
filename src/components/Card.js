function Card({ card, onCardClick }) {

    function handleClick() {
        onCardClick(card);
    }

    return (
        <article className="element" key={card._id}>
            <button className="element__delete-button"></button>
            <img onClick={handleClick} className="element__image" src={card.link} alt={`Пейзаж ${card.name}`} />
            <h2 className="element__title">{card.name}</h2>
            <div className="element__like">
                <button className="element__button" type="button"></button>
                <div className="element__count">{card.likes.length}</div>
            </div>
        </article>
    )
}

export default Card;