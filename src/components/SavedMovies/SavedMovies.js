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
    const [isNotFound, setIsNotFound] = useState(false);
    const { addToast } = useToast();

    const handleDelete = async (movie) => {
        try {
            await deleteMovie(movie._id, localStorage.getItem('token'));
            addToast('Фильм успешно удалён', 'success');
        } catch (err) {
            addToast(err.message);
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
        const filtered = cards.filter((item) => item._id !== movie._id);
        setCards(filtered);
        if (filtered.length === 0) {
            setIsNotFound(true);
        }
    };

    useEffect(() => {
        if (savedMovies.length > 0) {
            setCards(savedMovies);
            return;
        }
        setIsLoading(true);
        getSavedMovies(localStorage.getItem('token'))
        .then((fetchedCards) => {
            setCards(fetchedCards);
            setSavedMovies(fetchedCards);
        })
        .catch((err) => {
            addToast(err.message);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, []);

    const handleSubmit = (searchTerm, isShortFilter) => {
        setIsNotFound(false);
        const filtered = filterMovies(savedMovies, searchTerm, isShortFilter);
        setCards(filtered);
        if (filtered.length === 0) {
            setIsNotFound(true);
        }
    };

    const onFilter = (isShortFilter) => {
        setIsShort(isShortFilter);
        handleSubmit(keyword, isShortFilter);
    };

    return (
        <>
            <SearchForm
                keyword={keyword}
                onKeywordChange={setKeyword}
                onSubmit={handleSubmit}
                isShort={isShort}
                onFilter={onFilter}
            />
            {isLoading ? (
                <Preloader/>
            ) : (
                <SectionComponent type="cards">
                    {
                        isNotFound
                            ? <p className="not_found">Ничего не найдено</p>
                            : <ul className="cards-list">
                                {cards.map((card) => (
                                    <li className="cards-list__item" key={card._id}>
                                        <MoviesCard card={card} isSaved={true} handleLike={handleDelete}/>
                                    </li>
                                ))}
                            </ul>
                    }
                </SectionComponent>

            )}
        </>
    );
}

export default SavedMovies;
