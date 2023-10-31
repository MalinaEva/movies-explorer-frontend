import SectionComponent from '../SectionComponent/SectionComponent';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import { deleteMovie, getSavedMovies } from '../../utils/MainApi';
import { useToast } from '../../contexts/ToastContext';
import { filterMovies } from '../../utils/helpers';
import { useMovies } from '../../contexts/MoviesContext';

function SavedMovies () {
    const [isLoading, setIsLoading] = useState(false);
    const { movies, setMovies, savedMovies, setSavedMovies } = useMovies();
    const [cards, setCards] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [isShort, setIsShort] = useState(false);
    const { addToast } = useToast();

    const handleDelete = async (movie) => {
        try {
            await deleteMovie(movie._id, localStorage.getItem('token'));
            addToast('Фильм успешно удалён', 'success');
        } catch (err) {
            addToast(`${err.message || err}`, 'error');
            return;
        }
        setSavedMovies(savedMovies.filter(savedMovie => savedMovie._id !== movie._id));
        setMovies(movies.map((item) => {
            if (item.id === movie.movieId) {
                return {
                    ...item,
                    isLiked: false
                };
            }
            return item;
        }));
        setCards(cards.filter((item) => item._id !== movie._id));
    };

    useEffect(() => {
        setIsLoading(true);
        getSavedMovies(localStorage.getItem('token'))
        .then((cards) => {
            setCards(cards);
            setSavedMovies(cards);
        })
        .catch((err) => {
            addToast(`${err.message || err}`);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [addToast, setSavedMovies]);

    const handleSubmit = async () => {
        const filtered = filterMovies(cards, keyword, isShort);
        setSavedMovies(filtered);
    };

    return (
        <>
            <SearchForm keyword={keyword} onKeywordChange={setKeyword} onSubmit={handleSubmit} isShort={isShort}
                        setIsShort={setIsShort}/>
            {isLoading ? (
                <Preloader/>
            ) : (
                <SectionComponent type="cards">
                    <ul className="cards-list">
                        {savedMovies.map((card) => (
                            <li className="cards-list__item" key={card._id}>
                                <MoviesCard card={card} isSaved={true} handleLike={handleDelete}/>
                            </li>
                        ))}
                    </ul>
                </SectionComponent>

            )}
        </>
    );
}

export default SavedMovies;
