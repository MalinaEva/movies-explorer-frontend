import './MoviesCard.css';
import { MOVIES_BASE_URL } from '../../utils/constants';
import { convertDuration } from '../../utils/helpers';

function MoviesCard ({ card, handleLike, isSaved = false }) {

    const handleCardClick = () => {
        window.open(card.trailerLink || card.trailer, '_blank');
    };

    return (
        <div onClick={handleCardClick} className="card">
            <img
                className="card__image"
                src={card.image.url ? MOVIES_BASE_URL + card.image.url : card.image}
                alt={card.nameRU}
            />
            <div className="card__row">
                <h2 className="card__title">{card.nameRU}</h2>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleLike(card);
                    }}
                    type="button"
                    className={`${isSaved ? 'card__unlike' : 'card__like'}
                        ${card.isLiked && 'card__like_active'}`}
                ></button>
            </div>
            <div className="card__footer">
                {convertDuration(card.duration)}
            </div>
        </div>
    );
}

export default MoviesCard;
