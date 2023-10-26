import './MoviesCard.css';

function MoviesCard ({ id, name, liked, isSaved = false }) {
    return (
        <div className="card">
            <img className="card__image" src={require(`../../images/${id}.jpeg`)} alt={name}/>
            <div className="card__row">
                <h2 className="card__title">{name}</h2>
                {isSaved
                    ? <button type="button" className="card__unlike"></button>
                    : <button type="button" className={`card__like ${liked ? 'card__like_active' : ''}`}></button>
                }
            </div>
            <div className="card__footer">
                1ч 42м
            </div>
        </div>
    );
}

export default MoviesCard;
