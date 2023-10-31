import { createContext, useContext, useState } from 'react';

const MoviesContext = createContext(null);

export const useMovies = () => {
    const context = useContext(MoviesContext);
    if (!context) {
        throw new Error('useMovies must be used within a MoviesProvider');
    }
    return context;
};

export const MoviesProvider = ({ children }) => {
    const [movies, setMovies] = useState(JSON.parse(localStorage.getItem('moviesData')) || []);
    const [savedMovies, setSavedMovies] = useState([]);

    return (
        <MoviesContext.Provider value={{ movies, setMovies, savedMovies, setSavedMovies }}>
            {children}
        </MoviesContext.Provider>
    );
};
