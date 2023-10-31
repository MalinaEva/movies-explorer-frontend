import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import SectionComponent from '../SectionComponent/SectionComponent';
import Preloader from '../Preloader/Preloader';

function MoviesCardList ({ movies, isLoading, onLoadMore, canLoadMore, handleLike, savedMovies, isNotFound = false }) {
    return (
        <>
            {isLoading ? (
                <Preloader />
            ) : (
                <>
                    <SectionComponent type="cards">
                        {isNotFound ? <p className="not_found">Ничего не найдено</p>
                            : <ul className="cards-list">
                                {movies.map((card) => (
                                <li className="cards-list__item" key={card.id}>
                                    <MoviesCard isLiked={savedMovies.includes(card.id)} card={card}
                                                handleLike={handleLike}/>
                                </li>
                            ))}
                            </ul>}
                    </SectionComponent>
                    {canLoadMore && (
                        <SectionComponent type="more">
                            <button type="button" className="section__button-more" onClick={onLoadMore}>Ещё</button>
                        </SectionComponent>
                    )}
                </>
            )}
        </>
    );
}

export default MoviesCardList;
