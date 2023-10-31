import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect, useState } from 'react';
import { loadMovies } from '../../utils/MoviesApi';
import { useToast } from '../../contexts/ToastContext';
import { filterMovies } from '../../utils/helpers';
import { deleteMovie, getSavedMovies, saveMovie } from '../../utils/MainApi';
import { MOVIES_BASE_URL } from '../../utils/constants';
import { useMovies } from '../../contexts/MoviesContext';

function Movies () {
    const { addToast } = useToast();
    const { movies, setMovies, savedMovies, setSavedMovies } = useMovies();

    const [keyword, setKeyword] = useState(localStorage.getItem('searchKeyword') || '');
    const [cardLimit, setCardLimit] = useState(16);
    const [cards, setCards] = useState([]);
    const [savedCards, setSavedCards] = useState([]);
    const [perPage, setPerPage] = useState(4);
    const [canLoadMore, setCanLoadMore] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isShort, setIsShort] = useState(localStorage.getItem('isShort') === 'true');
    const [errorMessage, setErrorMessage] = useState('');
    const [isNotFound, setIsNotFound] = useState(false);

    useEffect(() => {
        localStorage.setItem('isShort', isShort);
    }, [isShort]);

    useEffect(() => {
        localStorage.setItem('searchKeyword', keyword);
    }, [keyword]);

    useEffect(() => {
        localStorage.setItem('moviesData', JSON.stringify(movies));
    }, [movies]);

    const loadMore = () => {
        setCardLimit((prev) => prev + perPage);
    };

    useEffect(() => {
        setCanLoadMore(cardLimit < movies.length);
    }, [cardLimit, movies]);

    useEffect(() => {
        Promise.all([
            loadMovies(),
            getSavedMovies(localStorage.getItem('token'))
        ]).then(([loadCards, loadSavedCards]) => {
            setCards(loadCards);
            setSavedCards(loadSavedCards);
            setSavedMovies(loadSavedCards);
        }).catch((err) => {
            addToast(`${err.message || err}`, 'error');
        });
    }, [addToast, setSavedMovies]);

    const onSubmit = async (searchTerm) => {
        setErrorMessage('');
        setKeyword(searchTerm);
        setIsNotFound(false);
        setIsLoading(true);
        try {
            const moviesWithLikes = cards.map(movie => ({
                ...movie,
                isLiked: savedCards.some(savedMovie => savedMovie.movieId === movie.id)
            }));

            const filtered = filterMovies(moviesWithLikes, searchTerm, isShort);
            if (filtered.length === 0) {
                setIsNotFound(true);
            } else {
                setMovies(filtered);
            }
        } catch (err) {
            setErrorMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLike = async (movie) => {
        return movie.isLiked ? await handleDeleteMovie(movie) : await handleSaveMovie(movie);
    };

    const handleSaveMovie = async (movie) => {
        try {
            const savedMovie = await saveMovie({
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: MOVIES_BASE_URL + movie.image.url,
                trailer: movie.trailerLink,
                thumbnail: MOVIES_BASE_URL + movie.image.formats.thumbnail.url,
                movieId: movie.id,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
            }, localStorage.getItem('token'));
            addToast('Фильм успешно сохранён', 'success');
            const updatedMovies = movies.map(m => m.id === movie.id ? { ...m, isLiked: true } : m);
            setMovies(updatedMovies);
            setSavedMovies([...savedMovies, savedMovie]);
        } catch (err) {
            addToast(`${err.message || err}`);
        }
    };

    const handleDeleteMovie = async (movie) => {
        const likedId = savedMovies.find(savedMovie => savedMovie.movieId === movie.id)._id;
        try {
            await deleteMovie(likedId, localStorage.getItem('token'));
            addToast('Фильм успешно удалён', 'success');
            const updatedMovies = movies.map(m => m.id === movie.id ? { ...m, isLiked: false } : m);
            setMovies(updatedMovies);
            setSavedMovies(savedMovies.filter(savedMovie => savedMovie.movieId !== movie.id));
        } catch (err) {
            addToast(`${err.message || err}`);
        }
    };

    const handleShort = () => {
        setIsShort(!isShort);
    };

    useEffect(() => {
        const savedKeyword = localStorage.getItem('searchKeyword');
        const savedMoviesData = JSON.parse(localStorage.getItem('moviesData')) || [];

        if (savedKeyword && savedMoviesData.length > 0) {
            setMovies(savedMoviesData);
        }
    }, [setMovies]);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width > 1279) {
                setCardLimit(16);
                setPerPage(4);
            } else if (width <= 1279 && width >= 768) {
                setCardLimit(8);
                setPerPage(2);
            } else {
                setCardLimit(5);
                setPerPage(2);
            }
        };

        const timer = setTimeout(() => {
            window.addEventListener('resize', handleResize);
        }, 300);

        handleResize();
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <SearchForm errorMessage={errorMessage} onSubmit={onSubmit} keyword={keyword} isShort={isShort}
                        setIsShort={handleShort}
                        onKeywordChange={setKeyword}/>
            <MoviesCardList
                movies={movies.slice(0, cardLimit)}
                savedMovies={savedMovies}
                isLoading={isLoading}
                onLoadMore={loadMore}
                canLoadMore={canLoadMore}
                handleLike={handleLike}
                isNotFound={isNotFound}
            />
        </>
    );
}

export default Movies;
